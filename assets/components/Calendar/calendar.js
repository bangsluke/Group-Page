// Calendar.js JavaScript

// https://stackoverflow.com/a/28393656/14290169

console.log("Calendar.js initiated");

// Initially define required variables.

// The two keys (clientId and apiKey) are generated from the 'enable apis' section of your project in the google developers console (https://console.cloud.google.com/apis/dashboard?project=tits-group-page&folder=) and you're looking for the "create credentials" dropdown to create an API key and an OAuth Client ID.
var clientId = "556098195944-b67uttdh8ogmoln1cglqrnt23rtr1rpi.apps.googleusercontent.com"; // Choose web app client Id, redirect URI and Javascript origin set to http://localhost.
var apiKey = "AIzaSyAiguB1wMSswLe082_-Uf0Lq7dii8640c4"; // Choose public apiKey, any IP allowed (leave blank the allowed IP boxes in Google Dev Console).

var userEmail = "tits.group.page@gmail.com"; //your calendar Id
var userTimeZone = "London"; //example "Rome" "Los_Angeles" ecc...
var maxRows = 10; //events to shown
var calName = "TITS CALENDAR"; //name of calendar (write what you want, doesn't matter)

var scopes = 'https://www.googleapis.com/auth/calendar';

//--------------------- Add a 0 to numbers
function padNum(num) {
    console.log("Function: padNum(num) called."); // Log the function to the console.
    if (num <= 9) {
        return "0" + num;
    }
    return num;
}
//--------------------- end    

//--------------------- From 24h to Am/Pm
function AmPm(num) {
    console.log("Function: AmPm(num) called."); // Log the function to the console.
    if (num <= 12) { return "am " + num; }
    return "pm " + padNum(num - 12);
}
//--------------------- end    

//--------------------- num Month to String
function monthString(num) {
    console.log("Function: monthString(num) called."); // Log the function to the console.
    if (num === "01") { return "JAN"; }
    else if (num === "02") { return "FEB"; }
    else if (num === "03") { return "MAR"; }
    else if (num === "04") { return "APR"; }
    else if (num === "05") { return "MAJ"; }
    else if (num === "06") { return "JUN"; }
    else if (num === "07") { return "JUL"; }
    else if (num === "08") { return "AUG"; }
    else if (num === "09") { return "SEP"; }
    else if (num === "10") { return "OCT"; }
    else if (num === "11") { return "NOV"; }
    else if (num === "12") { return "DEC"; }
}
//--------------------- end

//--------------------- from num to day of week
function dayString(num) {
    console.log("Function: dayString(num) called."); // Log the function to the console.
    if (num == "1") { return "mon" }
    else if (num == "2") { return "tue" }
    else if (num == "3") { return "wed" }
    else if (num == "4") { return "thu" }
    else if (num == "5") { return "fri" }
    else if (num == "6") { return "sat" }
    else if (num == "0") { return "sun" }
}
//--------------------- end

//--------------------- client CALL
function handleClientLoad() {
    console.log("Function: handleClientLoad()) called."); // Log the function to the console.
    gapi.client.setApiKey(apiKey);
    checkAuth();
}
//--------------------- end

//--------------------- check Auth
function checkAuth() {
    console.log("Function: checkAuth() called."); // Log the function to the console.
    
    console.log("clientId = " + clientId);
    console.log("scopes = " + scopes);
    
    gapi.auth.authorize({
        client_id: clientId,
        scope: scopes,
        immediate: true
    }, handleAuthResult);
}
//--------------------- end

//--------------------- handle result and make CALL
function handleAuthResult(authResult) {
    console.log("Function: handleAuthResult(authResult) called."); // Log the function to the console.
    if (authResult) {
        makeApiCall();
    }
}
//--------------------- end

//--------------------- API CALL itself
function makeApiCall() {
    console.log("Function: makeApiCall() called."); // Log the function to the console.
    var today = new Date(); // Today date
    gapi.client.load('calendar', 'v3', function () {
        var request = gapi.client.calendar.events.list({
            'calendarId': userEmail,
            'timeZone': userTimeZone,
            'singleEvents': true,
            'timeMin': today.toISOString(), //gathers only events not happened yet
            'maxResults': maxRows,
            'orderBy': 'startTime'
        });
        request.execute(function (resp) {
            for (var i = 0; i < resp.items.length; i++) {
                var li = document.createElement('li');
                var item = resp.items[i];
                var classes = [];
                var allDay = item.start.date ? true : false;
                var startDT = allDay ? item.start.date : item.start.dateTime;
                var dateTime = startDT.split("T"); //split date from time
                var date = dateTime[0].split("-"); //split yyyy mm dd
                var startYear = date[0];
                var startMonth = monthString(date[1]);
                var startDay = date[2];
                var startDateISO = new Date(startMonth + " " + startDay + ", " + startYear + " 00:00:00");
                var startDayWeek = dayString(startDateISO.getDay());
                if (allDay == true) { //change this to match your needs
                    var str = [
                        '<font size="4" face="courier">',
                        startDayWeek, ' ',
                        startMonth, ' ',
                        startDay, ' ',
                        startYear, '</font><font size="5" face="courier"> @ ', item.summary, '</font><br><br>'
                    ];
                }
                else {
                    var time = dateTime[1].split(":"); //split hh ss etc...
                    var startHour = AmPm(time[0]);
                    var startMin = time[1];
                    var str = [ //change this to match your needs
                        '<font size="4" face="courier">',
                        startDayWeek, ' ',
                        startMonth, ' ',
                        startDay, ' ',
                        startYear, ' - ',
                        startHour, ':', startMin, '</font><font size="5" face="courier"> @ ', item.summary, '</font><br><br>'
                    ];
                }
                li.innerHTML = str.join('');
                li.setAttribute('class', classes.join(' '));
                document.getElementById('events').appendChild(li);
            }
            document.getElementById('updated').innerHTML = "updated " + today;
            document.getElementById('calendar').innerHTML = calName;
        });
    });
}