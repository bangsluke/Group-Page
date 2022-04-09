"use strict";

// https://developers.strava.com/docs/reference/#api-Athletes-getStats

var StravaApiV3 = require("strava_api_v3");
var defaultClient = StravaApiV3.ApiClient.instance;

// Configure OAuth2 access token for authorization: strava_oauth
var strava_oauth = defaultClient.authentications["strava_oauth"];
strava_oauth.accessToken = "YOUR ACCESS TOKEN";

var api = new StravaApiV3.AthletesApi();

var id = 789; // {Long} The identifier of the athlete. Must match the authenticated athlete.

var callback = function (error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log("API called successfully. Returned data: " + data);
  }
};
api.getStats(id, callback);
