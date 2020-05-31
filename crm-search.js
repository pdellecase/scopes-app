
import { success, failure } from "./libs/response-lib";

export async function main(event, context) {

  // Load CRM Middleware URL and Token from the  environment variables
  const crmMiddlewareUrl = process.env.crmMiddewareUrl;
  const crmMiddlewareToken = process.env.crmMiddlewareToken;

  // Get parameters from API Call

  const clientKey = event.pathParameters.clientKey;
  const searchString = event.pathParameters.searchString;
  const servicesOnly = event.pathParameters.servicesOnly;
  const scopingContact = event.pathParameters.scopingContact;

  try {
    console.log("CRM-SEARCH Received:crmMiddlewareUrl=" + crmMiddlewareUrl +", crmMiddlewareToken=" + crmMiddlewareToken );
    console.log("CRM-SEARCH Received:clientKey=" + clientKey +", searchString=" + searchString + ", servicesOnly=" + servicesOnly + ", scopingContact=" + scopingContact );
    //const result = await dynamoDbLib.call("scan", params);
    // Return the matching list of items in response body
    //return success(result.Items);
    return success("");
  } catch (e) {
    console.log(e);
    return failure({ status: false });
  }
}