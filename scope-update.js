import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";

export async function main(event, context) {
  const data = JSON.parse(event.body);
  const params = {
    TableName: process.env.scopesTableName,
    // 'Key' defines the partition key and sort key of the item to be updated
    // - 'userId': Identity Pool identity id of the authenticated user
    // - 'scopeId': path parameter
    Key: {
      userId: event.requestContext.identity.cognitoIdentityId,
      scopeId: event.pathParameters.id
    },
    // 'UpdateExpression' defines the attributes to be updated
    // 'ExpressionAttributeValues' defines the value in the update expression
    UpdateExpression: "SET scopeName = :scopeName, " +
    "crmSyncedAt = :crmSyncedAt, crmMainOppId = :crmMainOppId, crmMainOppName = :crmMainOppName, crmMainOppType = :crmMainOppType, crmMainOppStage = :crmMainOppStage, crmMainOppCloseDate = :crmMainOppCloseDate, crmMainOppProbability = :crmMainOppProbability, crmMainOppForecastCat = :crmMainOppForecastCat, crmMainOppServicesReq = :crmMainOppServicesReq, crmMainOppLastModifDate = :crmMainOppLastModifDate, crmMainOppAccountName = :crmMainOppAccountName, crmMainOppRegion = :crmMainOppRegion, crmMainOppOwnerName = :crmMainOppOwnerName, crmMainOppMRR = :crmMainOppMRR, crmMainOppMRRinUSD = :crmMainOppMRRinUSD, crmMainOppCurrency = :crmMainOppCurrency, crmMainOppDiscount = :crmMainOppDiscount, crmMainOppMEDDPICC = :crmMainOppMEDDPICC, crmMainOppDScore = :crmMainOppDScore, crmMainOppSupportAgents= :crmMainOppSupportAgents, crmMainOppSupportPlan= :crmMainOppSupportPlan, crmMainOppChatAgents= :crmMainOppChatAgents, crmMainOppChatPlan= :crmMainOppChatPlan, crmMainOppTalkAgents= :crmMainOppTalkAgents, crmMainOppTalkPlan= :crmMainOppTalkPlan,crmMainOppGuideAgents= :crmMainOppGuideAgents, crmMainOppGuidePlan= :crmMainOppGuidePlan, crmMainOppExploreAgents= :crmMainOppExploreAgents, crmMainOppExplorePlan= :crmMainOppExplorePlan, crmMainOppSellAgents= :crmMainOppSellAgents, crmMainOppSellPlan= :crmMainOppSellPlan, crmMainOppSCNotes= :crmMainOppSCNotes, crmMainOppManagerNotes= :crmMainOppManagerNotes, crmMainOppAENextSteps= :crmMainOppAENextSteps, crmMainOppCompellingEvent= :crmMainOppCompellingEvent, crmMainOppAccountWeb= :crmMainOppAccountWeb, crmMainOppAccountIndustry= :crmMainOppAccountIndustry, crmMainOppAccountDesc= :crmMainOppAccountDesc, crmMainOppAccountOwnerMarketSegment= :crmMainOppAccountOwnerMarketSegment, crmMainOppAccountAssignedTerritory= :crmMainOppAccountAssignedTerritory, crmMainOppAccountMgrTeam= :crmMainOppAccountMgrTeam, crmMainOppAccount= :crmMainOppAccount, crmMainOppSCName= :crmMainOppSCName, crmServicesOppId = :crmServicesOppId, crmServicesOppName = :crmServicesOppName, crmServicesOppStage = :crmServicesOppStage, crmServicesOppCloseDate = :crmServicesOppCloseDate, crmServicesOppProbability = :crmServicesOppProbability, crmServicesOppLastModifDate = :crmServicesOppLastModifDate, crmScopingContactId = :crmScopingContactId, crmServicesEstimates = :crmServicesEstimates, crmServicesPlanSubTotal = :crmServicesPlanSubTotal, crmServicesPlanTotal = :crmServicesPlanTotal, crmServicesProbability = :crmServicesProbability, crmServicesDue = :crmServicesDue, crmServicesNotes= :crmServicesNotes, crmServicesScopingNextSteps= :crmServicesScopingNextSteps, crmServicesSAName= :crmServicesSAName," +
    "attachment = :attachment, modifiedAt = :modifiedAt",
    ExpressionAttributeValues: {
      ":scopeName": data.scopeName || null,
      ":crmSyncedAt": data.crmSyncedAt || null,
      ":crmMainOppId": data.crmMainOppId || null,
      ":crmMainOppName": data.crmMainOppName || null,
      ":crmMainOppType": data.crmMainOppType || null,
      ":crmMainOppStage": data.crmMainOppStage || null,
      ":crmMainOppCloseDate": data.crmMainOppCloseDate || null,
      ":crmMainOppProbability": data.crmMainOppProbability || null,
      ":crmMainOppForecastCat": data.crmMainOppForecastCat || null,
      ":crmMainOppServicesReq": data.crmMainOppServicesReq || null,
      ":crmMainOppLastModifDate": data.crmMainOppLastModifDate || null,
      ":crmMainOppAccountName": data.crmMainOppAccountName || null,
      ":crmMainOppRegion": data.crmMainOppRegion || null,
      ":crmMainOppOwnerName": data.crmMainOppOwnerName || null,
      ":crmMainOppMRR": data.crmMainOppMRR || null,
      ":crmMainOppMRRinUSD": data.crmMainOppMRRinUSD || null,
      ":crmMainOppCurrency": data.crmMainOppCurrency || null,
      ":crmMainOppDiscount": data.crmMainOppDiscount || null,
      ":crmMainOppMEDDPICC": data.crmMainOppMEDDPICC || null,
      ":crmMainOppDScore": data.crmMainOppDScore || null,
      ":crmMainOppSupportAgents": data.crmMainOppSupportAgents || null,
      ":crmMainOppSupportPlan": data.crmMainOppSupportPlan || null,
      ":crmMainOppChatAgents": data.crmMainOppChatAgents || null,
      ":crmMainOppChatPlan": data.crmMainOppChatPlan || null,
      ":crmMainOppTalkAgents": data.crmMainOppTalkAgents || null,
      ":crmMainOppTalkPlan": data.crmMainOppTalkPlan || null,
      ":crmMainOppGuideAgents": data.crmMainOppGuideAgents || null,
      ":crmMainOppGuidePlan": data.crmMainOppGuidePlan || null,
      ":crmMainOppExploreAgents": data.crmMainOppExploreAgents || null,
      ":crmMainOppExplorePlan": data.crmMainOppExplorePlan || null,
      ":crmMainOppSellAgents": data.crmMainOppSellAgents || null,
      ":crmMainOppSellPlan": data.crmMainOppSellPlan || null,
      ":crmMainOppSCNotes": data.crmMainOppSCNotes || null,
      ":crmMainOppManagerNotes": data.crmMainOppManagerNotes || null,
      ":crmMainOppAENextSteps": data.crmMainOppAENextSteps || null,
      ":crmMainOppCompellingEvent": data.crmMainOppCompellingEvent || null,
      ":crmMainOppAccountWeb": data.crmMainOppAccountWeb || null,
      ":crmMainOppAccountIndustry": data.crmMainOppAccountIndustry || null,
      ":crmMainOppAccountDesc": data.crmMainOppAccountDesc || null,
      ":crmMainOppAccountOwnerMarketSegment": data.crmMainOppAccountOwnerMarketSegment || null,
      ":crmMainOppAccountAssignedTerritory": data.crmMainOppAccountAssignedTerritory || null,
      ":crmMainOppAccountMgrTeam": data.crmMainOppAccountMgrTeam || null,
      ":crmMainOppAccount": data.crmMainOppAccount || null,
      ":crmMainOppSCName": data.crmMainOppSCName || null,
      ":crmServicesOppId": data.crmServicesOppId || null,
      ":crmServicesOppName": data.crmServicesOppName || null,
      ":crmServicesOppStage": data.crmServicesOppStage || null,
      ":crmServicesOppCloseDate": data.crmServicesOppCloseDate || null,
      ":crmServicesOppProbability": data.crmServicesOppProbability || null,
      ":crmServicesOppLastModifDate": data.crmServicesOppLastModifDate || null,
      ":crmScopingContactId": data.crmScopingContactId || null,
      ":crmServicesEstimates": data.crmServicesEstimates || null,
      ":crmServicesPlanSubTotal": data.crmServicesPlanSubTotal || null,
      ":crmServicesPlanTotal": data.crmServicesPlanTotal || null,
      ":crmServicesProbability": data.crmServicesProbability || null,
      ":crmServicesDue": data.crmServicesDue || null,
      ":crmServicesNotes": data.crmServicesNotes || null,
      ":crmServicesScopingNextSteps": data.crmServicesScopingNextSteps || null,
      ":crmServicesSAName": data.crmServicesSAName || null,
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