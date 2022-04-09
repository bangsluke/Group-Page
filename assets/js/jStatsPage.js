// jStatsPage.js JavaScript Functions

"use strict";

// Papa Parse (previously TableTop) Google Sheets Database scripts
// Papa Parse - https://www.papaparse.com/docs#csv-to-json
// How to use Papa Parse - https://dev.to/bornfightcompany/using-google-sheets-as-a-simple-database-with-papa-parse-2k7o
// TableTop - https://github.com/jsoma/tabletop

// Code

console.time(); // Start the console timer.

// Ready Events
// First add a DOMContentLoaded event to fire when the HTML DOM is in place and then add a load event listener for when all images and other resources are loaded.

window.addEventListener("DOMContentLoaded", init); // Wait for the window to load and then run the init function below.

// Add a load event listener (https://eager.io/blog/how-to-decide-when-your-code-should-run/).
window.addEventListener("load", function () {
  console.log(
    "%c" + "> Stats page images and other resources all loaded.",
    "background-color: black; color: white; padding: 0.5em 0em; font-weight: bold;"
  ); // Provide an initial load message.
  hideLoaderDots("loader-div"); // Hide the loader dots. See LoaderDots.js.
  console.timeEnd(); // End the console timer.
});

// Other Functions

// Publically define the location of the Google Sheet. Link to the tblStatsConfig first before selecting which stat to show.
var publicSpreadsheetUrlCSV =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vTHooCS-JL0ScJZ5ugygKMhP5vY_3QknMdzaEkAw8hZ5OLIXASxByceszcjvEv7P9ecV1QMVrCv3ty3/pub?gid=114011454&single=true&output=csv";

// Log the file location.
console.log(
  "   The published spreadsheet is located at " + publicSpreadsheetUrlCSV
); // Log the file location.

// Define an initial stats table to be loaded in as default.
var InitialStatsTableName = "COD - Multiplayer Kills";
// var InitialStatsTableName = "Brockham Badgers B's - Overall Stats";

// Define a global toolTipBoolean and titanBoolean. Change based on the table selected.
var toolTipBoolean = true; // Set the toolTipBoolean to be true as default for the initial stats table.
var titanBoolean = true; // Set the titanBoolean to be true as default for the initial stats table.

// New Stats

// Define a statsObjects that defines the drop down values within the first drop down options on the page. https://www.w3schools.com/howto/howto_js_cascading_dropdown.asp.
var statsObject = {
  "Brockham Badgers B's": {
    "Overall Stats": ["n/a"],
    "U11 Table": ["n/a"],
    "U11 Stats": ["n/a"],
    "U12 Table": ["n/a"],
    "U12 Stats": ["n/a"],
    "U13 Table": ["n/a"],
    "U13 Stats": ["n/a"],
    "U14 Table": ["n/a"],
    "U14 Stats": ["n/a"],
    "U15 Table": ["n/a"],
    "U15 Stats": ["n/a"],
    "U16 Table": ["n/a"],
    "U16 Stats": ["n/a"],
  },
  COD: {
    "Overall Stats": ["n/a"],
    "Multiplayer Kills": ["n/a"],
    "Multiplayer Score": ["n/a"],
    "Multiplayer Wins": ["n/a"],
    "Warzone Kills": ["n/a"],
    "Warzone Score": ["n/a"],
    "Warzone Wins": ["n/a"],
  },
  Dorkinians: {
    "Overall Stats": ["n/a"],
    "2020/21": ["n/a"],
    "2019/20": ["n/a"],
    "2018/19": ["n/a"],
    "2017/18": ["n/a"],
    "2016/17": ["n/a"],
  },
  Fantasy: {
    "Overall Fantasy": ["n/a"],
    "2007/08 Season": ["n/a"],
    "2008/09 Season": ["n/a"],
    "2010/11 Season": ["n/a"],
    "2011/12 Season": ["n/a"],
    "2012/13 Season": ["n/a"],
    "2013/14 Season": ["n/a"],
    "2014/15 Season": ["n/a"],
    "2015/16 Season": ["n/a"],
    "2016/17 Season": ["n/a"],
    "2017/18 Season": ["n/a"],
    "2018/19 Season": ["n/a"],
    "2019/20 Season": ["n/a"],
    "2020/21 Season": ["n/a"],
  },
  Football: {
    "Jelly Legs": ["n/a"],
    "Two Touch": ["n/a"],
    "Overall Season Long Bets": ["n/a"],
    "2020/21 Season Long Bets Stats": ["n/a"],
    "2021/22 Season Long Bets Stats": ["n/a"],
    "2020/21 Bets List": ["n/a"],
    "2021/22 Bets List": ["n/a"],
    "Premier League Table": ["n/a"],
    "Championship Table": ["n/a"],
  },
  Footgolf: {
    "Overall Stats": ["n/a"],
    "Initial Game": ["n/a"],
    "August 2018": ["n/a"],
    "August 2019": ["n/a"],
    "April 2021": ["n/a"],
  },
  Karting: {
    "Overall Karting": ["n/a"],
    Qualification: ["n/a"],
    Race: ["n/a"],
    "Fastest Lap": ["n/a"],
  },
  "Skills, Games and Misc": {
    "Breakfast Cooking": ["n/a"],
    Driving: ["n/a"],
    Fifa: ["n/a"],
    "Mario Kart": ["n/a"],
    Mashed: ["n/a"],
    Molkky: ["n/a"],
    Perudo: ["n/a"],
    Poker: ["n/a"],
    Punctuality: ["n/a"],
    Shuffleboard: ["n/a"],
    "Spike Ball": ["n/a"],
    "Thumb Rating": ["n/a"],
    WhatsApp: ["n/a"],
  },
  Sport: {
    Boxing: ["n/a"],
    Chess: ["n/a"],
    Cricket: ["n/a"],
    Darts: ["n/a"],
    Golf: ["n/a"],
    Skiing: ["n/a"],
    "Table Tennis": ["n/a"],
    Tennis: ["n/a"],
  },
  "Strava Stats": {
    "Overall Strava": ["n/a"],
    "1k Times": ["n/a"],
    "5k Times": ["n/a"],
    "10k Times": ["n/a"],
    "Half Marathon Times": ["n/a"],
    "2021 Distance": ["n/a"],
    "All Time Distance": ["n/a"],
  },

  // Keep as example.
  //"Backend": {
  //"HTML": ["Links", "Images", "Tables", "Lists"],
  //"CSS": ["Borders", "Margins", "Backgrounds", "Float"],
  //"JavaScript": ["Variables", "Operators", "Functions", "Conditions"]
  //}
};
console.log(statsObject);

// The intial function does the initial work required on the page, as soon as the DOM has loaded.
function init() {
  console.log(
    "%c" + "> Stats page DOM content loaded.",
    "background-color: black; color: white; padding: 0.5em 0em; font-weight: bold;"
  ); // Provide an initial load message.
  getSiteTheme(); // Update the site theme to what the user has selected.
  // Initially add a default table and then populate the statistic category dropdown and create the onchange functions for each dropdown.

  // Log the function call to the console.
  console.log(
    "> NEW 0. init() called. Initial stats loaded and statsCategoryDropdown populated with values."
  );

  Papa.parse(publicSpreadsheetUrlCSV, {
    download: true, // If true, this indicates that the string you passed as the first argument to parse() is actually a URL from which to download a file and parse its contents.
    header: true, // If true, the first row of parsed data will be interpreted as field names. An array of field names will be returned in meta, and each row of data will be an object of values keyed by field name instead of a simple array. Rows with a different number of fields from the header row will produce an error. Warning: Duplicate field names will overwrite values in previous fields having the same name.
    fastmode: true, // Fast mode speeds up parsing significantly for large inputs. However, it only works when the input has no quoted fields. Fast mode will automatically be enabled if no " characters appear in the input. You can force fast mode either way by setting it to true or false.
    complete: showInitiallyLoadedInfo, // The callback to execute when parsing is complete. Once done, call the showInfo function.
  });

  // Initially define the selection dropdown elements.
  var statsCategoryDropdown = document.getElementById("stats-category-option"); // Get the stat category.
  var statsSelectionDropdown = document.getElementById("stat-selection-option"); // Get the selected stat.
  var filterHeaderSelectionDropdown = document.getElementById("stats-filter"); // Get the filter header detail.
  var filterValueSelectionDropdown =
    document.getElementById("stats-filter-value"); // Get the value to be used in the filter.

  // Initially set the focus onto the first dropdown box.
  // document.getElementById("stats-category-option").focus();

  // Loop through the statsObject and populate the top level categories into the statsCategoryDropdown.
  for (var x in statsObject) {
    statsCategoryDropdown.options[statsCategoryDropdown.options.length] =
      new Option(x, x);
  }

  // 1st Dropdown - React when the user changes the statsCategoryDropdown.
  statsCategoryDropdown.onchange = function () {
    console.log(
      "> NEW 1. statsCategoryDropdown.onchange called. statsSelectionDropdown populated with values."
    ); // Log the function call to the console.
    statsSelectionDropdown.length = 1; // Empty the stat selection dropdown.
    for (var y in statsObject[this.value]) {
      // Display correct values in statsSelectionDropdown.
      statsSelectionDropdown.options[statsSelectionDropdown.options.length] =
        new Option(y, y);
    }
    document
      .getElementById("stat-selection-option")
      .classList.remove("deactivated"); // Remove the deactivated class.
    document.getElementById("stat-selection-option").focus(); // Set the focus onto the next dropdown box.
  };

  // 2nd Dropdown - React when the user changes the statsSelectionDropdown.
  statsSelectionDropdown.onchange = function (data) {
    // Log the function call to the console.
    console.log(
      "> NEW 2. statsSelectionDropdown.onchange called. Selected stats loaded in."
    );

    // Empty the filter header dropdown.
    filterHeaderSelectionDropdown.length = 1;
    // Display correct values in filterHeaderSelectionDropdown.
    for (var y in statsObject[this.value]) {
      filterHeaderSelectionDropdown.options[
        filterHeaderSelectionDropdown.options.length
      ] = new Option(y, y);
    }

    // Set the focus onto the next dropdown box.
    //document.getElementById("stats-filter").focus();

    // Get the selected stat catgeory and statistic and concatenate the names.
    // Category Selection.
    var categoryText =
      statsCategoryDropdown.options[statsCategoryDropdown.selectedIndex].text; // Get the corresponding value from the category selected.
    //console.log("Category Selection: Value = " + categoryValue + ", Text = " + categoryText); // Display what the category selection box is showing.
    console.log("   Category Selection = " + categoryText); // Display what the category selection box is showing.
    if (categoryText == "Select category") {
      // Check if the category selection box is empty or not (considered empty if the text is still "Select category").
      return; // Early return from function.
    }
    // Stat Selection.
    var selectionText =
      statsSelectionDropdown.options[statsSelectionDropdown.selectedIndex].text; // Get the corresponding value from the option selected.
    //console.log("Stat Selection: Value = " + selectionValue + ", Text = " + selectionText); // Display what the stat selection box is showing.
    console.log("   Stat Selection = " + selectionText); // Display what the stat selection box is showing.
    if (selectionText == "Select stat") {
      // Check if the stat selection box is empty or not (considered empty if the text is still "Select stat").
      return; // Early return from function.
    }
    // Concat the category text and selection text to produce a fullSelectionName, used to look up the correct data set from the Group Data Page.
    var fullSelectionName = categoryText + " - " + selectionText;
    console.log("   Full selection name = " + fullSelectionName); // Display what the full selection name is from the combined drop downs.
    sessionStorage.setItem("fullSelectionName", fullSelectionName); // Save the variable fullSelectionName to session storage.
    console.log(
      "   Full selection name (" +
        fullSelectionName +
        ") saved to local session storage."
    );
    //console.log("Try to call statsSelected and pass fullSelectionName through to it via local session storage.")
    clearTable("#stats-table"); // Call the clearTable function to empty the table.
    showLoaderDots("stats-loader"); // Show the loader dots. See LoaderDots.js.
    statSelected(); // Call the statSelected function to display the data on the site.
    // zoomOutMobile(); // Ignore for now as not needed?
  };

  // Early return until the filtering code is written.
  return;

  // 3rd Dropdown - React when the user changes the filterHeaderSelectionDropdown.
  filterHeaderSelectionDropdown.onchange = function () {
    // Log the function call to the console.
    console.log(
      "> NEW 3. filterHeaderSelectionDropdown.onchange called. Filter header selected."
    );

    // Create code to highlight the relevant selected header?

    // Empty the filter header dropdown.
    filterValueSelectionDropdown.length = 1;
    // Display correct values in filterValueSelectionDropdown.
    for (var y in statsObject[this.value]) {
      filterValueSelectionDropdown.options[
        filterValueSelectionDropdown.options.length
      ] = new Option(y, y);
    }

    // Set the focus onto the next dropdown box.
    document.getElementById("stats-filter-value").focus();
  };

  // 4th Dropdown - React when the user changes the filterValueSelectionDropdown.
  filterValueSelectionDropdown.onchange = function () {
    // Log the function call to the console.
    console.log(
      "> NEW 4. filterValueSelectionDropdown.onchange called. Data filtered and displayed."
    );

    // Create code to filter and display the data?
  };
}

// Populate the drop down options with values ready for the user to pick from.
// window.onload details - (https://www.javatpoint.com/javascript-onload)
//window.onload = function () {

// INITIAL LOAD FUNCTIONS

// Pass the results output from Papa Parse (see - https://www.papaparse.com/docs#csv-to-json) into a function to display the contents of the data. Note that a parse result always contains three objects: data, errors, and meta. Data and errors are arrays, and meta is an object. In the step callback, the data array will only contain one element.
function showInitiallyLoadedInfo(results) {
  console.log("> Function: showInitiallyLoadedInfo(results) called.");
  var data = results.data; // Read carefully: data is an array of rows. If header is false, rows are arrays; otherwise they are objects of data keyed by the field name.
  getInitiallyLoadedStatSelection(data); // Pass the data as an array of objects (as header is true).
}

// Create a function that returns what the user has selected from the table (see http://corelangs.com/js/progs/options.html for dropdown JavaScript).
function getInitiallyLoadedStatSelection(data) {
  console.log("> Function: getInitiallyLoadedStatSelection(data) called.");
  // Define an initial fullSelectionName, used to look up the correct data set from the Group Data Page.
  var fullSelectionName = InitialStatsTableName;
  //console.log("   Full selection name = " + fullSelectionName); // Display what the full selection name is from the combined drop downs.
  // Loop through the data array from the tblStatsConfig tab and match the selected stat value to find the relevant URL to get data from.
  for (let x = 0; x < data.length; x++) {
    //console.log("x = " + x + ", data[x].TableName = " + data[x].TableName); // Show the looping process.
    if (data[x].FullSelectionName == fullSelectionName) {
      var selectedURL = data[x].URL;
      var lastUpdatedDate = data[x].LastUpdated;
      var sourceText = data[x].Source;
      var titanBoolean = data[x].TitanBoolean;
      // Set the toolTipBoolean to be equal to the value saved in the data sheet stats config sheet.
      if (data[x].ToolTip == "TRUE") {
        // Get the TRUE or FALSE value from the data sheet and process it to be the correct case sizing.
        toolTipBoolean = true; // Set the toolTipBoolean as true.
      } else if (data[x].ToolTip == "FALSE") {
        // Deal with FALSE.
        toolTipBoolean = false; // Set the toolTipBoolean as false.
      } else {
        // Deal with no value in the sheet.
        toolTipBoolean = false; // Set the toolTipBoolean as false by default.
      }
      //console.log("   Table name selected is " + data[x].TableName + " and Selected URL is: " + selectedURL);
    }
  }
  getPapaData(selectedURL); // Call the function getPapaData to return the data from that table.
  updateStatsTitle(fullSelectionName); // Update the stats title text.
  updateAdditionalStatsInformation(lastUpdatedDate, sourceText); // Updates the stats source, last updated text and additional link.
  applyTitanTableFormatting("stats-table", titanBoolean, toolTipBoolean); // Add a border below the 4th person if the table is flagged as a Titan table.
}

// NORMAL LOAD FUNCTIONS

// Call the data in from Google Sheets using Papa Parse once a user has selected a ctageory and statistic to show.
function statSelected() {
  // Log the function call to the console.
  console.log("> Function: statSelected() called.");
  Papa.parse(publicSpreadsheetUrlCSV, {
    download: true, // If true, this indicates that the string you passed as the first argument to parse() is actually a URL from which to download a file and parse its contents.
    header: true, // If true, the first row of parsed data will be interpreted as field names. An array of field names will be returned in meta, and each row of data will be an object of values keyed by field name instead of a simple array. Rows with a different number of fields from the header row will produce an error. Warning: Duplicate field names will overwrite values in previous fields having the same name.
    fastmode: true, // Fast mode speeds up parsing significantly for large inputs. However, it only works when the input has no quoted fields. Fast mode will automatically be enabled if no " characters appear in the input. You can force fast mode either way by setting it to true or false.
    complete: showInfo, // The callback to execute when parsing is complete. Once done, call the showInfo function.
  });
}

// Pass the results output from Papa Parse (see - https://www.papaparse.com/docs#csv-to-json) into a function to display the contents of the data. Note that a parse result always contains three objects: data, errors, and meta. Data and errors are arrays, and meta is an object. In the step callback, the data array will only contain one element.
function showInfo(results) {
  console.log("> Function: showInfo(results) called.");
  var data = results.data; // Read carefully: data is an array of rows. If header is false, rows are arrays; otherwise they are objects of data keyed by the field name.
  getStatSelection(data); // Pass the data as an array of objects (as header is true).
}

// Create a function that returns what the user has selected from the table (see http://corelangs.com/js/progs/options.html for dropdown JavaScript).
function getStatSelection(data) {
  console.log("> Function: getStatSelection(data) called.");
  var fullSelectionName = sessionStorage.getItem("fullSelectionName"); // Retrieve the variable fullSelectionName passed earlier to session storage.
  // Loop through the data array from the tblStatsConfig tab and match the selected stat value to find the relevant URL to get data from.
  for (let x = 0; x < data.length; x++) {
    //console.log("x = " + x + ", data[x].TableName = " + data[x].TableName); // Show the looping process.
    if (data[x].FullSelectionName == fullSelectionName) {
      console.log(
        ">> fullSelectionName passed = " +
          fullSelectionName +
          ", which is TableName = " +
          data[x].TableName
      );
      var selectedURL = data[x].URL;
      var lastUpdatedDate = data[x].LastUpdated;
      var sourceText = data[x].Source;
      titanBoolean = data[x].TitanBoolean;
      // Set the toolTipBoolean to be equal to the value saved in the data sheet stats config sheet.
      if (data[x].ToolTip == "TRUE") {
        // Get the TRUE or FALSE value from the data sheet and process it to be the correct case sizing.
        toolTipBoolean = true; // Set the toolTipBoolean as true.
      } else if (data[x].ToolTip == "FALSE") {
        // Deal with FALSE.
        toolTipBoolean = false; // Set the toolTipBoolean as false.
      } else {
        // Deal with no value in the sheet.
        toolTipBoolean = false; // Set the toolTipBoolean as false by default.
      }
      //console.log("   Table name selected is " + data[x].TableName + " and Selected URL is: " + selectedURL);
    }
  }
  getPapaData(selectedURL); // Call the function getPapaData to return the data from that table.
  updateStatsTitle(fullSelectionName); // Update the stats title text.
  updateAdditionalStatsInformation(lastUpdatedDate, sourceText); // Updates the stats source, last updated text and additional link.
  applyTitanTableFormatting("stats-table", titanBoolean, toolTipBoolean); // Add a border below the 4th person if the table is flagged as a Titan table.

  // TODO: BELOW TO BE CODED PROPERLY

  // Populate the Filter Header dropdown from the received data.
  //// Filter Header Selection.
  //var dropdownFilterHeaderSelector = document.getElementById("stats-filter"); // Select the "stats-filter" element by id.
  //var filterHeaderText = dropdownFilterHeaderSelector.options[dropdownFilterHeaderSelector.selectedIndex].text; // Get the corresponding value from the filter header selected.
  //console.log("Filter Header Selection = " + filterHeaderText); // Display what the filter header selection box is showing.
  //// Check if the filter header selection box is empty or not (considered empty if the text is still "Select header").
  //if (filterHeaderText == "Select header") {
  //return; // Early return from function.
  //}
}

// REGULAR LOAD FUNCTIONS

// Get the data of the selected stats by using the selected URL.
function getPapaData(selectedURL) {
  console.log("> Function: getPapaData(selectedURL) called.");
  Papa.parse(selectedURL, {
    download: true, // If true, this indicates that the string you passed as the first argument to parse() is actually a URL from which to download a file and parse its contents.
    header: false, // If true, the first row of parsed data will be interpreted as field names. An array of field names will be returned in meta, and each row of data will be an object of values keyed by field name instead of a simple array. Rows with a different number of fields from the header row will produce an error. Warning: Duplicate field names will overwrite values in previous fields having the same name.
    fastmode: true, // Fast mode speeds up parsing significantly for large inputs. However, it only works when the input has no quoted fields. Fast mode will automatically be enabled if no " characters appear in the input. You can force fast mode either way by setting it to true or false.
    complete: showSelectedInfo, // The callback to execute when parsing is complete. Once done, call the showInfo function.
  });
}

// Pass the results output from Papa Parse (see - https://www.papaparse.com/docs#csv-to-json) into a function to display the contents of the data.
function showSelectedInfo(results) {
  console.log("> Function: showSelectedInfo(results) called.");
  var dataArray = results.data; // Data comes through from results as an array of arrays. This is because the header setting on the above papa parse is set to false.

  console.log("========================================");
  console.log(dataArray);
  console.log("toolTipBoolean = " + toolTipBoolean);
  console.log("titanBoolean = " + titanBoolean);

  //alert("Successfully processed " + data.length + " rows!") // Provide an alert that the data has been processed.
  //console.log(data); // Log the data in the console.
  //var filterHeader = "Name";
  //var filterValue = "Bangs";
  //data = filterData(data, filterHeader, filterValue);
  createFullTable(dataArray, "#stats-table", toolTipBoolean, "array"); // Call the createFullTable function, passing the data from PapaParse.
  applyTitanTableFormatting("stats-table", titanBoolean, toolTipBoolean); // Add a border below the 4th person if the table is flagged as a Titan table.
  hideLoaderDots("stats-loader"); // Hide the loader dots. See LoaderDots.js.
  //populateFilterHeaderDropDown(dataArray) // Call the populateFilterHeaderDropDown function to populate the dropdown list for the Filter Header dropdown.
}

// Other Functions.

// Update the title above the stats table with the selected stats name.
function updateStatsTitle(selectionText) {
  console.log("> Function: updateStatsTitle(selectionText) called.");
  var element = document.getElementById("stats-title"); // Get the stats-title element by id.
  element.innerHTML = selectionText; // Update the text inside the element with the new stats name.
}

// Updates the stats source, last updated text and additional link.
function updateAdditionalStatsInformation(lastUpdatedDate, sourceText) {
  console.log(
    "> Function: updateAdditionalStatsInformation(lastUpdatedDate, sourceText, additionalLink) called."
  );
  var element = document.getElementById("stats-last-updated"); // Get the stats-last-updated element by id.
  element.innerHTML = "Last Updated: " + lastUpdatedDate; // Update the text inside the element with the last updated date.
  element = document.getElementById("stats-source"); // Get the stats-source element by id.
  element.innerHTML = "Source: " + sourceText; // Update the text inside the element with the stats source.
}

// TODO - Code to be written at a later stage.

// Populate the filter header drop down list with the headers of the selected table data.
function populateFilterHeaderDropDown(array) {
  // NOTE: data comes in as an array of objects. Remember this!
  console.log("> Function: populateFilterHeaderDropDown() called.");
  var filterSelection = document.getElementById("stats-filter"); // Get the filter detail.
  filterSelection.length = 1; // Empty the filter selection dropdown.
  let data = Object.keys(array[0]); // The Object.keys() method was introduced in ES6. It takes the object that you want to iterate over as an argument and returns an array containing all properties names (or keys). https://attacomsian.com/blog/javascript-iterate-objects
  //console.log("Table headers = " + data); // Log the headers of the table.
  for (let key of data) {
    // Loop through each value of the data.
    //console.log(key); // Individually log each header.
    filterSelection.options[filterSelection.options.length] = new Option(key); // Populate the filterSelection dropdown with the header values.
  }
  //console.log("Function: populateFilterHeaderDropDown() completed.")
}

// Filter the data if the user has selected a filter.
function filterData(data, filterHeader, filterValue) {
  //console.log("Filter the results - doing nothing yet.")
  console.log(
    "> Function: filterData(data, filterHeader, filterValue) called."
  );
  //console.log("filterHeader = " + filterHeader + ", filterValue = " + filterValue);
  const filteredResults = data.filter(
    (data) => data.filterHeader == filterValue
  );
  //console.log(filteredResults);
  showSelectedInfo(filteredResults);
}
