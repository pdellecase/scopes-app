
import { success, failure } from "./libs/response-lib";

export async function main(event, context) {
  
   // Load CRM Middleware URL and Token from the  environment variables
  const crmMiddlewareUrl = process.env.crmMiddewareUrl;
  const crmMiddlewareToken = process.env.crmMiddlewareToken;

  // Get parameters from API Call
  
  const clientKey = event.pathParameters.client-key;
  const searchString = event.pathParameters.search-string;
  const servicesOnly = event.pathParameters.services-only;
  const scopingContact = event.pathParameters.scoping-contact;

  
  

  try {
    console.log("CRM-SEARCH Received:clientKey=" + clientKey +", searchString=" + searchString + ", servicesOnly=" + servicesOnly + ", scopingContact=" + scopingContact );
    //const result = await dynamoDbLib.call("scan", params);
    // Return the matching list of items in response body
    //return success(result.Items);
  } catch (e) {
    console.log(e);
    return failure({ status: false });
  }
}