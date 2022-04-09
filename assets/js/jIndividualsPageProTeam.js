// jIndividualsPageProTeam.js JavaScript Functions

"use strict";

// Papa Parse (previously TableTop) Google Sheets Database scripts
// Papa Parse - https://www.papaparse.com/docs#csv-to-json
// How to use Papa Parse - https://dev.to/bornfightcompany/using-google-sheets-as-a-simple-database-with-papa-parse-2k7o
// TableTop - https://github.com/jsoma/tabletop

// Code

// Define the location of the Google Sheet. Link to the tblStatsConfig first before selecting which stat to show.
var publicSpreadsheetUrlCSV =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vTHooCS-JL0ScJZ5ugygKMhP5vY_3QknMdzaEkAw8hZ5OLIXASxByceszcjvEv7P9ecV1QMVrCv3ty3/pub?gid=114011454&single=true&output=csv";

// Add callable function "getProTeamTable" to be called in "jIndividualsPage.js". Initially call the data in from Google Sheets using Papa Parse.
function getProTeamTable() {
  Papa.parse(publicSpreadsheetUrlCSV, {
    download: true, // If true, this indicates that the string you passed as the first argument to parse() is actually a URL from which to download a file and parse its contents.
    header: true, // If true, the first row of parsed data will be interpreted as field names. An array of field names will be returned in meta, and each row of data will be an object of values keyed by field name instead of a simple array. Rows with a different number of fields from the header row will produce an error. Warning: Duplicate field names will overwrite values in previous fields having the same name.
    fastmode: true, // Fast mode speeds up parsing significantly for large inputs. However, it only works when the input has no quoted fields. Fast mode will automatically be enabled if no " characters appear in the input. You can force fast mode either way by setting it to true or false.
    complete: selectProTable, // The callback to execute when parsing is complete. Once done, call the selectProTable function.
  });
}

// Pass the results output from Papa Parse (see - https://www.papaparse.com/docs#csv-to-json) into a function to display the contents of the data.
function selectProTable(results) {
  // Note that a parse result always contains three objects: data, errors, and meta. Data and errors are arrays, and meta is an object. In the step callback, the data array will only contain one element.
  var data = results.data; // Read carefully: data is an array of rows. If header is false, rows are arrays; otherwise they are objects of data keyed by the field name.
  //alert("Successfully processed " + data.length + " rows!") // Provide an alert that the data has been processed.
  //console.log(data); // Log the data in the console.
  var proTeam = sessionStorage.getItem("proTeam"); // Retrieve the variable passed to session storage.
  //console.log("getProTeamTable() called with team " + proTeam + " passed.") // Pass a message to show the value has been successfully retrieved.
  // Loop through data array and match the proTeam value to find the relevant table URL to get data from.
  for (let x = 0; x < data.length; x++) {
    //console.log("x = " + x + ", data[x].TableName = " + data[x].TableName); // Show the looping process.
    if (data[x].TableName == proTeam) {
      var selectedURL = data[x].URL;
      //console.log(selectedURL);
    }
  }
  getPapaData(selectedURL); // Call the function getPapaData to return the data from that table.
}

// Get the data of the selected proTeam table by using the selected URL.
function getPapaData(selectedURL) {
  Papa.parse(selectedURL, {
    download: true, // If true, this indicates that the string you passed as the first argument to parse() is actually a URL from which to download a file and parse its contents.
    header: true, // If true, the first row of parsed data will be interpreted as field names. An array of field names will be returned in meta, and each row of data will be an object of values keyed by field name instead of a simple array. Rows with a different number of fields from the header row will produce an error. Warning: Duplicate field names will overwrite values in previous fields having the same name.
    fastmode: true, // Fast mode speeds up parsing significantly for large inputs. However, it only works when the input has no quoted fields. Fast mode will automatically be enabled if no " characters appear in the input. You can force fast mode either way by setting it to true or false.
    complete: showProTable, // The callback to execute when parsing is complete. Once done, call the showProTable function.
  });
}

// Pass the results output from Papa Parse (see - https://www.papaparse.com/docs#csv-to-json) into a function to display the contents of the data.
function showProTable(results) {
  var data = results.data;
  toolTipBoolean = false; // Set the toolTipBoolean to be false.
  //alert("Successfully processed " + data.length + " rows!") // Provide an alert that the data has been processed.
  //console.log(data); // Log the data in the console.
  clearTable("#pro-team-table"); // Call the clearTable function to empty the table.
  createFullTableProTeam(data, "#pro-team-table", toolTipBoolean); // Call the createFullTable function, passing the data from PapaParse.
  hideLoaderDots("football-loader"); // Hide the loader dots. See LoaderDots.js.
}

// Specific Pro Team table functions.

// Create the table by passing the data to the function.
function createFullTableProTeam(data, selector, toolTipBoolean) {
  console.log(
    "%c" +
      ">> Re-usable Function: createFullTableProTeam(data, selector, toolTipBoolean) called. Passed variables: data = shown below, selector = " +
      selector +
      ", toolTipBoolean = " +
      toolTipBoolean,
    " background-color: lightgreen; color:black; padding: 0.5em 0em; font-weight: bold;"
  ); // Log the selected site name and href.
  console.log(data); // Log the passed data to the console.
  let table = document.querySelector(selector); // Select the parent element from which to build the table. Modified the selector to be dynamic and accept any type of selector. Previously, defining as "table" meant that it only works if the HTML page has only one table element.
  // If the toolTipBoolean is true, define header data as from the array, instead of the keys of an object.
  if (toolTipBoolean == true) {
    // Define the header data as from the array.
    //console.log("toolTipBoolean = " + toolTipBoolean + " therefore pass through data as the first row of data of the array."); // Log if the toolTipBoolean is in play or not.
    var headerdata = data[0]; // Get the header data from the first element of the array.
    //console.log("headerdata printed below:");
    //console.log(headerdata);
  } else {
    // Define the header data as the keys of the object.
    var headerdata = Object.keys(data[0]); // Create an array of the object headers from the array data received.
  }
  generateTableHead(table, headerdata, data, toolTipBoolean); // Call the generateTableHead function to create the table headers. Note that headerdata contains the headers only, array contains the full data.
  generateTableProTeam(table, data, toolTipBoolean); // Call the generateTable function to populate the rest of the table data.
  //console.log("Function: createFullTable finished.") // Log a final message to show the function is complete.
}

function generateTableProTeam(table, data) {
  //console.log("generateTable called.") // Log an initial message to show the function has been called.
  var proTeamRank = sessionStorage.getItem("proTeamRank"); // Retrieve the variable passed to session storage.
  var proTeamLeague = sessionStorage.getItem("proTeamLeague"); // Retrieve the variable passed to session storage.
  //console.log("Pro Team Rank is = " + proTeamRank + ", and is proTeamLeague = " + proTeamLeague); // Log the proTeamRank and proTeamLeague.
  let counter = 0; // Initially define a counter.
  let rowCounter = 1; // Initially define a row counter.
  let foundRowNumber = 0; // Initially define a foundRowNumber.
  //console.log("counter intially = " + counter + " and rowCounter initially = " + rowCounter); // Log to the console.
  for (let element of data) {
    // Loop through each row of the data.
    let row = table.insertRow(); // Insert a row for each bit of table data.
    for (key in element) {
      // Loop through each cell in each row.
      counter = counter + 1; // Increment the counter.
      let cell = row.insertCell(); // Create the cell.
      let text = document.createTextNode(element[key]); // Add the cell text.
      if (counter == 1 && element[key] == proTeamRank) {
        // If the counter is 1 and the element[key] is equal to the proTeamRank, this is the row to highlight.
        //console.log("counter = " + counter + ", and element[key] = " + element[key] + " which is equal to proTeamRank = " + proTeamRank) // Log to the console.
        foundRowNumber = rowCounter; // Set up the foundRowNumber.
        //console.log("foundRowNumber = " + foundRowNumber); // Log the foundRowNumber to the console.
      }
      if (rowCounter == foundRowNumber) {
        // If the row counter matches the foundRowNumber, apply the style to the row.
        //console.log("rowCounter = " + rowCounter + ", foundRowNumber = " + foundRowNumber); // Log the foundRowNumber to the console.
        if (proTeamLeague == "premierLeague") {
          // Format the found row depending on which league the team is in.
          cell.classList.add("premierLeague-highlight-row"); // Add the premierLeague-highlight-row class to the cell.
        } else {
          cell.classList.add("championship-highlight-row"); // Add the championship-highlight-row class to the cell.
        }
        //console.log("Counter = " + counter + ", cell value = " + element[key] + ", rowCounter = " + rowCounter + " and so added formatting."); // Log to the console.
      } else {
        // Add the data without adding the highlighting class.
        // Do nothing extra to the cell.
        //console.log("Counter = " + counter + ", cell value = " + element[key] + ", rowCounter = " + rowCounter); // Log to the console.
      }
      cell.appendChild(text); // Append the text to the cell.
      if (counter % 10 == 0) {
        // Reset the counter backdown to 0 if the counter is divisible by 10 as its a new row.
        counter = 0; // Reset the counter backdown.
        rowCounter = rowCounter + 1; // Increment the rowCounter.
        //console.log("counter now = " + counter + " and rowCounter = " + rowCounter); // Log to the console.
      }
    }
  }
  //console.log("generateTable finished.") // Log a final message to show the function is complete.
}
