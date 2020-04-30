import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";

export async function main(event, context) {
  const data = JSON.parse(event.body);
  const params = {
    TableName: process.env.usersTableName,
    // 'Key' defines the partition key and sort key of the item to be updated
    // - 'userId': Identity Pool identity id of the authenticated user
    Key: {
      userId: event.requestContext.identity.cognitoIdentityId,
    },
    // 'UpdateExpression' defines the attributes to be updated
    // 'ExpressionAttributeValues' defines the value in the update expression
    UpdateExpression: "SET profile = :profile, firstname = :firstname, lastname = : lastname, initials = :initials, role = :role, region = :region, attachment = :attachment, modifiedAt = :modifiedAt",
    ExpressionAttributeValues: {
      ":profile": data.profile || null,
      ":firstname": data.firstname || null,
      ":lastname": data.lastname || null,
      ":initials": data.initials || null,
      ":role": data.role || null,
      ":region": data.region || null,
      ":attachment": data.attachment || null,
      ":modifiedAt": Date.now()
    },
    // 'ReturnValues' specifies if and how to return the item's attributes,
    // where ALL_NEW returns all attributes of the item after the update; you
    // can inspect 'result' below to see how it works with different settings
    ReturnValues: "ALL_NEW"
  };

  try {
    await dynamoDbLib.call("update", params);
    return success({ status: true });
  } catch (e) {
    console.log(e);
    return failure({ status: false });
  }
}