import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";

export async function main(event, context) {
  const getParams = {
    TableName: process.env.usersTableName,
    // 'Key' defines the partition key and sort key of the item to be retrieved
    // - 'userId': Identity Pool identity id of the authenticated user
    Key: {
      userId: event.requestContext.identity.cognitoIdentityId,
    }
  };

  const updateParams = {
    TableName: process.env.usersTableName,
    // 'Key' defines the partition key and sort key of the item to be updated
    // - 'userId': Identity Pool identity id of the authenticated user
    Key: {
      userId: event.requestContext.identity.cognitoIdentityId,
    },
    // 'UpdateExpression' defines the attributes to be updated
    // 'ExpressionAttributeValues' defines the value in the update expression
    ExpressionAttributeValues: {
      ":lastLogin": Date.now()
    },
    // 'ReturnValues' specifies if and how to return the item's attributes,
    // where ALL_NEW returns all attributes of the item after the update; you
    // can inspect 'result' below to see how it works with different settings
    ReturnValues: "ALL_NEW"
  };

  try {

    // Get user
    const result = await dynamoDbLib.call("get", getParams);
    if (result.Item) {

      // update user record with last login date
      await dynamoDbLib.call("update", updateParams);

      // Return the retrieved user
      return success(result.Item);
    } else {
      return failure({ status: false, error: "User not found." });
    }
  } catch (e) {
    console.log(e);
    return failure({ status: false });
  }
}