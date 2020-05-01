import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";


export async function main(event, context) {

  // Request body is passed in as a JSON encoded string in 'event.body'
  const data = JSON.parse(event.body);

  const params = {
    TableName: process.env.usersTableName,
    // 'Item' contains the attributes of the item to be created
    // - 'userId': user identities are federated through the
    //             Cognito Identity Pool, we will use the identity id
    //             as the user id of the authenticated user
    // - 'email': parsed from request body
    // - 'profile': parsed from request body
    // - 'firstname': parsed from request body
    // - 'lastname': parsed from request body
    // - 'initials': parsed from request body
    // - 'role': parsed from request body
    // - 'region': parsed from request body
    // - 'attachment': parsed from request body
    // - 'createdAt': current Unix timestamp
    // - 'modifiedAt': current Unix timestamp
    Item: {
      userId: event.requestContext.identity.cognitoIdentityId,
      email: data.email,
      profile: "Standard User",
      firstname: data.firstname,
      lastname: data.lastname,
      initials: data.initials,
      role: data.role,
      region: data.region,
      attachment: data.attachment,
      createdAt: Date.now(),
      modifiedAt: Date.now()
    }
  };

  try {
    await dynamoDbLib.call("put", params);
    return success(params.Item);
  } catch (e) {
    console.log(e);
    return failure({ status: false });
  }
}