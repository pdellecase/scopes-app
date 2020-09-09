import { success, failure } from "./libs/response-lib";

export async function main(event, context) {

  console.log("CRM-GET initiated ...");
  // Load CRM Middleware URL and Token from the  environment variables
  const crmMiddewareReadEndpoint = process.env.crmMiddewareReadEndpoint;
  const crmMiddlewareToken = process.env.crmMiddlewareToken;

  // Get parameters from API Call

  const clientKey = event.pathParameters.clientKey;
  const id = event.pathParameters.id;
  var full = event.pathParameters.full;
  const searchString = event.pathParameters.searchString;
  var servicesOnly = event.pathParameters.servicesOnly;
  const scopingContact = event.pathParameters.scopingContact;

  // ** Build the API path based on the parameter provided **
  let crmMiddlewarePath = '';

  if((clientKey === null)||(clientKey ===undefined)||(clientKey === 'null')){
    return failure({ error: "No Client Key provided" });
  }
  // search use case
  if((id === null)||(id ===undefined)||(id === 'null')){
    if((scopingContact === null)||(scopingContact ===undefined)||(scopingContact === 'null')){
      if((searchString === null)||(searchString ===undefined)||(searchString === 'null')) { return failure({ error: "No Search String provided" }); }
      if((servicesOnly === null)||(servicesOnly ===undefined)||(servicesOnly === 'null')) { servicesOnly='no'; }
      crmMiddlewarePath = "/?client-key=" + clientKey + "&search-string=" + searchString + "&services-only=" + servicesOnly;
    } else {
      crmMiddlewarePath = "/?client-key=" + clientKey + "&scoping-contact=" + scopingContact;
    }
  }
  // get use case
  else {
    if((full === null)||(full ===undefined)||(full === 'null')) { full='no'; }
    crmMiddlewarePath = "/?client-key=" + clientKey + "&id=" + id + "&full=" + full;
  }

  console.log("CRM-GET crmMiddeware URI = " + crmMiddewareReadEndpoint + crmMiddlewarePath);

  const http = require('https');

  return httprequest().then((data) => {
    console.log("CRM-GET Success: statusCode 200");
    return success(data);
  });


  function httprequest() {
    return new Promise((resolve, reject) => {
      const options = {
          host: crmMiddewareReadEndpoint,
          path: crmMiddlewarePath,
          port: 443,
          method: 'GET',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded',
               'x-csrf-token': crmMiddlewareToken}
      };
      const req = http.request(options, (res) => {
        if (res.statusCode < 200 || res.statusCode >= 300) {
          console.log("CRM Http Request Error = " + res.statusCode);
          //return reject(new Error('statusCode=' + res.statusCode));
          return reject(failure({ error: res.statusCode }));
        }
        var body = [];
        res.on('data', function(chunk) {
          body.push(chunk);
        });
        res.on('end', function() {
          try {
            body = JSON.parse(Buffer.concat(body).toString());
          } catch(e) {
            console.log("Error = " + e.message);
            reject(e);
          }
          resolve(body);
        });
      });

      req.on('error', (e) => {
        console.log("Error = " + e.message);
        return failure({ error: e.message });
      });
      // send the request
      req.end();
    });
  }

}