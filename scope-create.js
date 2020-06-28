import uuid from "uuid";
import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";


export async function main(event, context) {

  // Request body is passed in as a JSON encoded string in 'event.body'
  const data = JSON.parse(event.body);

  const params = {
    TableName: process.env.scopesTableName,
    // 'Item' contains the attributes of the item to be created
    // - 'userId': user identities are federated through the
    //             Cognito Identity Pool, we will use the identity id
    //             as the user id of the authenticated user
    // - 'scopeId': a unique uuid
    // - 'crmXXXX': all CRM data parsed from request body
    // - 'attachment': parsed from request body
    // - 'createdAt': current Unix timestamp
    Item: {
      userId: event.requestContext.identity.cognitoIdentityId,
      scopeId: uuid.v1(),
      scopeName: data.scopeName,
      crmMainOppSyncedAt: data.crmMainOppSyncedAt,
      crmMainOppId: data.crmMainOppId,
      crmMainOppName: data.crmMainOppName,
      crmMainOppStage: data.crmMainOppStage,
      crmMainOppCloseDate: data.crmMainOppCloseDate,
      crmMainOppProbability: data.crmMainOppProbability,
      crmMainOppForecastCat: data.crmMainOppForecastCat,
      crmMainOppServicesReq: data.crmMainOppServicesReq,
      crmMainOppLastModifDate: data.crmMainOppLastModifDate,
      crmMainOppAccountName: data.crmMainOppAccountName,
      crmMainOppRegion: data.crmMainOppRegion,
      crmMainOppOwnerName: data.crmMainOppOwnerName,
      crmMainOppMRR: data.crmMainOppMRR,
      crmMainOppCurrency: data.crmMainOppCurrency,
      crmMainOppDiscount: data.crmMainOppDiscount,
      crmMainOppMEDDPICC: data.crmMainOppMEDDPICC,
      crmMainOppDScore: data.crmMainOppDScore,
      crmServicesOppSyncedAt: data.crmServicesOppSyncedAt,
      crmServicesOppId: data.crmServicesOppId,
      crmServicesOppName: data.crmServicesOppName,
      crmServicesOppStage: data.crmServicesOppStage,
      crmServicesOppCloseDate: data.crmServicesOppCloseDate,
      crmServicesOppProbability: data.crmServicesOppProbability,
      crmServicesOppLastModifDate: data.crmServicesOppLastModifDate,
      crmScopingContact: data.crmScopingContact,
      crmServicesEstimates: data.crmServicesEstimates,
      crmServicesPlanSubTotal: data.crmServicesPlanSubTotal,
      crmServicesPlanTotal: data.crmServicesPlanTotal,
      crmServicesProbability: data.crmServicesProbability,
      crmServicesDue: data.crmServicesDue,
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