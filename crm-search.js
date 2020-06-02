
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

    var https = require('https');
    console.log("YO 1");
      var params = {
                    host: crmMiddlewareUrl,
                    path: "?client-key=" + clientKey + "&search-string=" + searchString + "&services-only" + servicesOnly,
                    method: 'GET',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded',
                               'x-csrf-token': 'PYGLj6gMaQCZ3r7Ur5OrPgp3ePvzKzCD' },
                   };

      var req = https.request(params, function(res) {
        console.log("YO 2");
        let data = '';
        console.log('STATUS: ' + res.statusCode);
        res.setEncoding('utf8');
        res.on('data', function(chunk) {
          data += chunk;
        });
        res.on('end', function() {
        console.log("DONE");
        console.log(JSON.parse(data));
        });
      });
      req.end();
    //const result = await dynamoDbLib.call("scan", params);
    // Return the matching list of items in response body
    //return success(result.Items);
    return success("");
  } catch (e) {
    console.log(e);
    return failure({ status: false });
  }
}