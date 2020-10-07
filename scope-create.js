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
      crmSyncedAt: data.crmSyncedAt,
      crmMainOppId: data.crmMainOppId,
      crmMainOppName: data.crmMainOppName,
      crmMainOppType: data.crmMainOppType,
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
      crmMainOppMRRinUSD: data.crmMainOppMRRinUSD,
      crmMainOppCurrency: data.crmMainOppCurrency,
      crmMainOppDiscount: data.crmMainOppDiscount,
      crmMainOppMEDDPICC: data.crmMainOppMEDDPICC,
      crmMainOppDScore: data.crmMainOppDScore,
      crmMainOppSupportAgents: data.crmMainOppSupportAgents,
      crmMainOppSupportPlan: data.crmMainOppSupportPlan,
      crmMainOppChatAgents: data.crmMainOppChatAgents,
      crmMainOppChatPlan: data.crmMainOppChatPlan,
      crmMainOppTalkAgents: data.crmMainOppTalkAgents,
      crmMainOppTalkPlan: data.crmMainOppTalkPlan,
      crmMainOppGuideAgents: data.crmMainOppGuideAgents,
      crmMainOppGuidePlan: data.crmMainOppGuidePlan,
      crmMainOppExploreAgents: data.crmMainOppExploreAgents,
      crmMainOppExplorePlan: data.crmMainOppExplorePlan,
      crmMainOppSellAgents: data.crmMainOppSellAgents,
      crmMainOppSellPlan: data.crmMainOppSellPlan,
      crmMainOppSCNotes: data.crmMainOppSCNotes,
      crmMainOppManagerNotes: data.crmMainOppManagerNotes,
      crmMainOppAENextSteps: data.crmMainOppAENextSteps,
      crmMainOppCompellingEvent: data.crmMainOppCompellingEvent,
      crmMainOppAccountWeb: data.crmMainOppAccountWeb,
      crmMainOppAccountIndustry: data.crmMainOppAccountIndustry,
      crmMainOppAccountDesc: data.crmMainOppAccountDesc,
      crmMainOppAccountOwnerMarketSegment: data.crmMainOppAccountOwnerMarketSegment,
      crmMainOppAccountAssignedTerritory: data.crmMainOppAccountAssignedTerritory,
      crmMainOppAccountMgrTeam: data.crmMainOppAccountMgrTeam,
      crmMainOppSCName: data.crmMainOppSCName,
      crmServicesOppId: data.crmServicesOppId,
      crmServicesOppName: data.crmServicesOppName,
      crmServicesOppStage: data.crmServicesOppStage,
      crmServicesOppCloseDate: data.crmServicesOppCloseDate,
      crmServicesOppProbability: data.crmServicesOppProbability,
      crmServicesOppLastModifDate: data.crmServicesOppLastModifDate,
      crmScopingContactId: data.crmScopingContactId,
      crmServicesEstimates: data.crmServicesEstimates,
      crmServicesPlanSubTotal: data.crmServicesPlanSubTotal,
      crmServicesPlanTotal: data.crmServicesPlanTotal,
      crmServicesProbability: data.crmServicesProbability,
      crmServicesPartnerDue: data.crmServicesPartnerDue,
      crmServicesDue: data.crmServicesDue,
      crmServicesSOWType: data.crmServicesSOWType,
      crmServicesContractType: data.crmServicesContractType,
      crmServicesNotes: data.crmServicesNotes,
      crmServicesScopingNextSteps: data.crmServicesScopingNextSteps,
      crmServicesSAName: data.crmServicesSAName,
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