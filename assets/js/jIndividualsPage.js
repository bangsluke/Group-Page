// jIndividualsPage.js JavaScript Functions

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
    "%c" + "> Individuals page images and other resources all loaded.",
    "background-color: black; color: white; padding: 0.5em 0em; font-weight: bold;"
  ); // Provide an initial load message.
  //hideLoaderDots('loader-div'); // Note, this now comes later.
  console.timeEnd(); // End the console timer.
});

// Other Functions

// Define the location of the Google Sheet. Link to the tblStatsConfig first before selecting which stat to show.
var individualsPageUrlCSV =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vTHooCS-JL0ScJZ5ugygKMhP5vY_3QknMdzaEkAw8hZ5OLIXASxByceszcjvEv7P9ecV1QMVrCv3ty3/pub?gid=1451461694&single=true&output=csv";
var statsSummaryUrlCSV =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vTHooCS-JL0ScJZ5ugygKMhP5vY_3QknMdzaEkAw8hZ5OLIXASxByceszcjvEv7P9ecV1QMVrCv3ty3/pub?gid=327910275&single=true&output=csv";
var titanSummaryUrlCSV =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vTHooCS-JL0ScJZ5ugygKMhP5vY_3QknMdzaEkAw8hZ5OLIXASxByceszcjvEv7P9ecV1QMVrCv3ty3/pub?gid=1702753145&single=true&output=csv";

// Define the foundColumn variable used later.
var foundColumn;

// The intial function does the initial work required on the page, as soon as the DOM has loaded.
function init() {
  console.log(
    "%c" + "> Individuals page DOM content loaded.",
    "background-color: black; color: white; padding: 0.5em 0em; font-weight: bold;"
  ); // Provide an initial load message.
  getSiteTheme(); // Update the site theme to what the user has selected.
  showLoaderDots("football-loader"); // Show the loader dots. See LoaderDots.js.
  // Initially call the data in from Google Sheets tab "IndividualsPage" using Papa Parse.
  Papa.parse(individualsPageUrlCSV, {
    download: true, // If true, this indicates that the string you passed as the first argument to parse() is actually a URL from which to download a file and parse its contents.
    header: true, // If true, the first row of parsed data will be interpreted as field names. An array of field names will be returned in meta, and each row of data will be an object of values keyed by field name instead of a simple array. Rows with a different number of fields from the header row will produce an error. Warning: Duplicate field names will overwrite values in previous fields having the same name.
    fastmode: true, // Fast mode speeds up parsing significantly for large inputs. However, it only works when the input has no quoted fields. Fast mode will automatically be enabled if no " characters appear in the input. You can force fast mode either way by setting it to true or false.
    complete: showSelectedInfo, // The callback to execute when parsing is complete. Once done, call the showInfo function.
  });
  // Note that the Individual Stats table and Titan Status table are called from within showSelectedInfo.
}

// Pass the results output from Papa Parse (see - https://www.papaparse.com/docs#csv-to-json) into a function to display the contents of the data.
function showSelectedInfo(results) {
  var data = results.data;
  //alert("Successfully processed " + data.length + " rows!") // Provide an alert that the data has been processed.
  //console.log(data); // Log the data in the console.
  // Initially receive the clicked user name from the User Page or Login Page. https://lage.us/Javascript-Pass-Variables-to-Another-Page.html
  var selectedUserName = sessionStorage.getItem("selectedUserName"); // Retrieve the variable passed to session storage.
  if (selectedUserName == null) {
    selectedUserName = "Alex";
  } // Deal with initial load of the page where no user has been selected.
  console.log("Passed user name = " + selectedUserName); // Log the passed user name.
  getData(data, selectedUserName); // Pass the data to the getData function to be processed.
}

// Get the data out into usable values to be passed to the HTML elements.
function getData(data, selectedUserName) {
  // console.log(data);

  // Loop through data array and match the user to return the row in the array of objects that relates to the user.
  for (let x = 0; x < data.length; x++) {
    //console.log("x = " + x + ", data[x].fullName = " + data[x].fullName); // Show the looping process.
    if (data[x].Name === selectedUserName) {
      var foundRow = x; // The found row containing the correct user object.
    }
  }
  // console.log("Found Row = " + foundRow);

  // Modify HTML elements with the found data.

  // document.getElementById("height").innerHTML = document.getElementById("height").innerHTML.replace("--",data[foundRow].height); // This is an alternative way of replacing the data using the replace function.

  // Profile Tab
  document.getElementById("profilePicture").src =
    data[foundRow].profilePictureURL; // Modify the source of the image.
  document.getElementById("fullName").innerHTML = data[foundRow].funName; // Modify the text inside the element.
  if (data[foundRow].funName == "Andrew Higgins") {
    // Unhide Andy's titles if it's his page being loaded.
    document.getElementById("andyTitles").classList.remove("hidden"); // Remove the hidden CSS class to show the titles.
  }
  document.getElementById("height").innerHTML = data[foundRow].height; // Modify the text inside the element.
  document.getElementById("weight").innerHTML = data[foundRow].weight; // Modify the text inside the element.
  document.getElementById("phone").innerHTML = data[foundRow].phone; // Modify the text inside the element.
  document.getElementById("email").innerHTML = data[foundRow].email; // Modify the text inside the element.
  // console.log('mailto:' + data[foundRow].email);
  document
    .getElementById("email")
    .setAttribute("href", "mailto:" + data[foundRow].email); // Update the href of the link dynamically.
  document.getElementById("facebook").innerHTML = data[foundRow].facebookHandle; // Modify the text inside the element.
  document
    .getElementById("facebook")
    .setAttribute("href", data[foundRow].facebookURL); // Update the href of the link dynamically.
  document.getElementById("twitter").innerHTML = data[foundRow].twitterHandle; // Modify the text inside the element.
  document
    .getElementById("twitter")
    .setAttribute("href", data[foundRow].twitterURL); // Update the href of the link dynamically.
  document.getElementById("instagram").innerHTML =
    data[foundRow].instagramHandle; // Modify the text inside the element.
  document
    .getElementById("instagram")
    .setAttribute("href", data[foundRow].instagramURL); // Update the href of the link dynamically.

  // Weather Widget
  //document.querySelector(".weatherwidget-io").innerHTML = data[foundRow].weatherWidgetHomeTown; // Modify the text inside the element.
  document
    .querySelector(".weatherwidget-io")
    .setAttribute("href", data[foundRow].weatherWidgetURL); // Update the href of the link dynamically to the correct URL.
  document
    .querySelector(".weatherwidget-io")
    .setAttribute("data-label_1", data[foundRow].weatherWidgetHomeTown); // Update the data label 1 dynamically to read the town name.

  // Once the widget has been updated with the new attributes, re-run the JavaScript for the widget (copied directly from 'https://weatherwidget.io/js/widget.min.js').
  ("use strict");
  function __weatherwidget_init() {
    var a = document.getElementsByClassName("weatherwidget-io"),
      i = [];
    if (0 !== a.length) {
      for (
        var t = function (t) {
            var e = a[t],
              o = {};
            (o.id = "weatherwidget-io-" + t),
              (o.href = e.href),
              (o.label_1 = e.getAttribute("data-label_1")),
              (o.label_2 = e.getAttribute("data-label_2")),
              (o.font = e.getAttribute("data-font")),
              (o.icons = e.getAttribute("data-icons")),
              (o.mode = e.getAttribute("data-mode")),
              (o.days = e.getAttribute("data-days")),
              (o.theme = e.getAttribute("data-theme")),
              (o.basecolor = e.getAttribute("data-basecolor")),
              (o.accent = e.getAttribute("data-accent")),
              (o.textcolor = e.getAttribute("data-textcolor")),
              (o.textAccent = e.getAttribute("data-textAccent")),
              (o.highcolor = e.getAttribute("data-highcolor")),
              (o.lowcolor = e.getAttribute("data-lowcolor")),
              (o.suncolor = e.getAttribute("data-suncolor")),
              (o.mooncolor = e.getAttribute("data-mooncolor")),
              (o.cloudcolor = e.getAttribute("data-cloudcolor")),
              (o.cloudfill = e.getAttribute("data-cloudfill")),
              (o.raincolor = e.getAttribute("data-raincolor")),
              (o.snowcolor = e.getAttribute("data-snowcolor")),
              (o.windcolor = e.getAttribute("data-windcolor")),
              (o.fogcolor = e.getAttribute("data-fogcolor")),
              (o.thundercolor = e.getAttribute("data-thundercolor")),
              (o.hailcolor = e.getAttribute("data-hailcolor")),
              (o.dayscolor = e.getAttribute("data-dayscolor")),
              (o.tempcolor = e.getAttribute("data-tempcolor")),
              (o.desccolor = e.getAttribute("data-desccolor")),
              (o.label1color = e.getAttribute("data-label1color")),
              (o.label2color = e.getAttribute("data-label2color")),
              (o.shadow = e.getAttribute("data-shadow")),
              (o.scale = e.getAttribute("data-scale")),
              (r = document.getElementById(o.id)) && e.removeChild(r),
              (i[o.id] = document.createElement("iframe")),
              i[o.id].setAttribute("id", o.id),
              i[o.id].setAttribute("class", "weatherwidget-io-frame"),
              i[o.id].setAttribute("title", "Weather Widget"),
              i[o.id].setAttribute("scrolling", "no"),
              i[o.id].setAttribute("frameBorder", "0"),
              i[o.id].setAttribute("width", "100%"),
              i[o.id].setAttribute("src", "https://weatherwidget.io/w/"),
              (i[o.id].style.display = "block"),
              (i[o.id].style.position = "absolute"),
              (i[o.id].style.top = "0"),
              (i[o.id].onload = function () {
                i[o.id].contentWindow.postMessage(
                  o,
                  "https://weatherwidget.io"
                );
              }),
              (e.style.display = "block"),
              (e.style.position = "relative"),
              (e.style.height = "150px"),
              (e.style.padding = "0"),
              (e.style.overflow = "hidden"),
              (e.style.textAlign = "left"),
              (e.style.textIndent = "-299rem"),
              e.appendChild(i[o.id]);
          },
          e = 0,
          o = Math.min(a.length, 10);
        e < o;
        e++
      ) {
        var r;
        t(e);
      }
      window.addEventListener("message", function (t) {
        "https://weatherwidget.io" === t.origin &&
          i[t.data.wwId] &&
          i[t.data.wwId].parentNode &&
          ((i[t.data.wwId].style.height = t.data.wwHeight + "px"),
          (i[t.data.wwId].parentNode.style.height = t.data.wwHeight + "px"));
      });
    } else setTimeout(__weatherwidget_init, 1500);
  }
  setTimeout(__weatherwidget_init, 100);

  // Football Tab

  /// Football Header
  document.getElementById("footballHeader").src =
    data[foundRow].footballHeaderImagePath; // Modify the source of the image.

  /// Pro Team
  document.getElementById("proTeamLeagueLogo").src =
    data[foundRow].proTeamLeagueLogoImagePath; // Modify the source of the image.
  var proTeam = data[foundRow].proTeam; // Get the proTeam from the IndividualsPage table.
  sessionStorage.setItem("proTeam", proTeam); // Save the variable to session storage.
  var proTeamRank = data[foundRow].proTeamLeaguePosition; // Get the proTeamLeaguePosition from the IndividualsPage table.
  sessionStorage.setItem("proTeamRank", proTeamRank); // Save the variable to session storage.
  var proTeamLeague = data[foundRow].proTeamLeague; // Get the proTeamLeague from the IndividualsPage table.
  sessionStorage.setItem("proTeamLeague", proTeamLeague); // Save the variable to session storage.
  if (proTeamLeague == "premierLeague") {
    // Invert the logo colour if it's the Premier League.
    document.getElementById("proTeamLeagueLogo").classList.add("colour-invert"); // Add the correct CSS class to the ProTeamLeagueLogo to style it correctly.
  }
  getProTeamTable(); // Call the getProTeamTable() function from jIndividualsPageProTeam.js to get the league table into the sheet.
  var proTeamLeague = data[foundRow].proTeamLeague; // Get the proTeamLeague from the IndividualsPage table.
  document.getElementById("pro-team-table").classList.add(proTeamLeague); // Add the correct CSS class to the ProTeamTable to style it correctly.
  document
    .getElementById("proTeamLeagueURL")
    .setAttribute("href", data[foundRow].proTeamLeagueURL); // Update the href of the link dynamically.

  /// Dorkinians

  // Old code solution.
  //var lrcode = data[foundRow].dorkiniansLeagueCode;
  //getDorkiniansTable(lrcode);
  document.getElementById("dorkiniansMainHeaderText").innerHTML =
    "Dorkinians " + data[foundRow].dorkiniansTeam + "s"; // Modify the text inside the element.

  // Add code here to show hide tables.
  var DorkiniansTeam = parseInt(data[foundRow].dorkiniansTeam);
  //console.log("DorkiniansTeam = " + DorkiniansTeam);
  for (let x = 1; x <= 8; x++) {
    // Loop through the 8 teams.
    if (x == DorkiniansTeam) {
      // Do nothing as want to leave this table visible.
    } else {
      // Hide this teams table.
      document
        .getElementById("dorkinians" + x + "sTable")
        .classList.add("hidden"); // Add the hidden CSS class to hide the table.
      document
        .getElementById("dorkinians" + x + "sResultsAndFixtures")
        .classList.add("hidden"); // Add the hidden CSS class to hide the table.
    }
  }

  // History Tab

  /// Ashcombe
  document.getElementById("ashcombeYear11YearBookQuote").innerHTML =
    data[foundRow].ashcombeYear11YearBookQuote; // Modify the text inside the element.
  document.getElementById("ashcombeSixthFormYearBookQuote").innerHTML =
    data[foundRow].ashcombeSixthFormYearBookQuote; // Modify the text inside the element.

  /// Brockham Badgers
  document.getElementById("brockhamBadgersPicture").src =
    data[foundRow].brockhamBadgersImagePath; // Modify the source of the image.
  document.getElementById("BBsU11sQuote").innerHTML =
    data[foundRow].BBsU11sQuote; // Modify the text inside the element.
  document.getElementById("BBsU11sCite").innerHTML = data[foundRow].BBsU11sCite; // Modify the text inside the element.
  document.getElementById("BBsU12sQuote").innerHTML =
    data[foundRow].BBsU12sQuote; // Modify the text inside the element.
  document.getElementById("BBsU12sCite").innerHTML = data[foundRow].BBsU12sCite; // Modify the text inside the element.
  document.getElementById("BBsU13sQuote").innerHTML =
    data[foundRow].BBsU13sQuote; // Modify the text inside the element.
  document.getElementById("BBsU13sCite").innerHTML = data[foundRow].BBsU13sCite; // Modify the text inside the element.
  document.getElementById("BBsU14sQuote").innerHTML =
    data[foundRow].BBsU14sQuote; // Modify the text inside the element.
  document.getElementById("BBsU14sCite").innerHTML = data[foundRow].BBsU14sCite; // Modify the text inside the element.
  document.getElementById("BBsU15sQuote").innerHTML =
    data[foundRow].BBsU15sQuote; // Modify the text inside the element.
  document.getElementById("BBsU15sCite").innerHTML = data[foundRow].BBsU15sCite; // Modify the text inside the element.
  document.getElementById("BBsU16sQuote").innerHTML =
    data[foundRow].BBsU16sQuote; // Modify the text inside the element.
  document.getElementById("BBsU16sCite").innerHTML = data[foundRow].BBsU16sCite; // Modify the text inside the element.
  document.getElementById("BBsAwards").innerHTML = data[foundRow].BBsAwards; // Modify the text inside the element.

  // Stats and Titans Tab

  /// Individual Stats
  // Call the data in from Google Sheets tab "StatsSummary" using Papa Parse.
  Papa.parse(statsSummaryUrlCSV, {
    download: true, // If true, this indicates that the string you passed as the first argument to parse() is actually a URL from which to download a file and parse its contents.
    header: false, // If true, the first row of parsed data will be interpreted as field names. An array of field names will be returned in meta, and each row of data will be an object of values keyed by field name instead of a simple array. Rows with a different number of fields from the header row will produce an error. Warning: Duplicate field names will overwrite values in previous fields having the same name.
    fastmode: true, // Fast mode speeds up parsing significantly for large inputs. However, it only works when the input has no quoted fields. Fast mode will automatically be enabled if no " characters appear in the input. You can force fast mode either way by setting it to true or false.
    complete: showIndividualsStatsInfo, // The callback to execute when parsing is complete. Once done, call the showIndividualsStatsInfo function.
  });

  /// Titan Status
  // The Titan data is parsed and triggered at the end of showIndividualsStatsInfo.

  // Update the Top Titan Titles below the table.
  document.getElementById("top-titan-titles").innerHTML =
    data[foundRow].TopTitanCategories; // Modify the text inside the element.

  hideLoaderDots("loader-div"); // Hide the loader dots. See LoaderDots.js.
}

function dataMessage() {
  // Add an alert message when a user tries to complain about how their personal data is being used.
  alert("Get fucked you Signal prick"); // Add alert.
}

function toggleResultsAndFixturesSection() {
  // Toggle between showing and hiding the results and fixtures section.
  var toggleButton = document.getElementById("toggleResultsAndFixtures"); // Get the toggle button by its ID.
  var element = document.getElementById("results-and-fixtures-section"); // Get the id of the section to be shown/hidden.
  if (toggleButton.innerText == "Show results and fixtures details") {
    element.classList.remove("hidden"); // Remove the hidden class. https://www.w3schools.com/howto/howto_js_remove_class.asp.
    toggleButton.innerText = "Hide results and fixtures details"; // Set the button text to change.
    // Also remove the "page-section-added-bottom-margin" class for the page-section above results and fixtures section.
    document
      .getElementById("dorkinians-tables-section")
      .classList.remove("page-section-added-bottom-margin"); // Remove the page-section-added-bottom-margin class.
  } else {
    element.classList.add("hidden"); // Add the hidden class. https://www.w3schools.com/howto/howto_js_remove_class.asp.
    toggleButton.innerText = "Show results and fixtures details"; // Set the button text to change.
    // Also re-add the "page-section-added-bottom-margin" class for the page-section above results and fixtures section.
    document
      .getElementById("dorkinians-tables-section")
      .classList.add("page-section-added-bottom-margin"); // Add the page-section-added-bottom-margin class.
  }
}

// Load in data for the Individual Stats section.
// Pass the results output from Papa Parse (see - https://www.papaparse.com/docs#csv-to-json) into a function to display the contents of the data.
function showIndividualsStatsInfo(results) {
  var data = results.data; // Define the passed data.
  //console.log(data); // Log the data in the console.
  // Initially receive the clicked user name from the User Page or Login Page. https://lage.us/Javascript-Pass-Variables-to-Another-Page.html
  var selectedUserName = sessionStorage.getItem("selectedUserName"); // Retrieve the variable passed to session storage.
  if (selectedUserName == null) {
    selectedUserName = "Alex";
  } // Deal with initial load of the page where no user has been selected.
  getIndividualsStatsDataColumn(data, selectedUserName); // Pass the data to the getData function to be processed.
  clearTableIndividualsStats(); // Call the clearTable function to empty the table.
  createFullTableIndividualsStats(data, foundColumn); // Call the createFullTable function, passing the data from PapaParse and the foundColumn.

  // After the individuals stats are done, move to Titan.
  // Call the data in from Google Sheets tab "TitanStatusSummary" using Papa Parse.
  Papa.parse(titanSummaryUrlCSV, {
    download: true, // If true, this indicates that the string you passed as the first argument to parse() is actually a URL from which to download a file and parse its contents.
    header: false, // If true, the first row of parsed data will be interpreted as field names. An array of field names will be returned in meta, and each row of data will be an object of values keyed by field name instead of a simple array. Rows with a different number of fields from the header row will produce an error. Warning: Duplicate field names will overwrite values in previous fields having the same name.
    fastmode: true, // Fast mode speeds up parsing significantly for large inputs. However, it only works when the input has no quoted fields. Fast mode will automatically be enabled if no " characters appear in the input. You can force fast mode either way by setting it to true or false.
    complete: showIndividualsTitansInfo, // The callback to execute when parsing is complete. Once done, call the showIndividualsTitansInfo function.
  });
}

// Get the stats data into a table form to be shown on the page.
function getIndividualsStatsDataColumn(data, selectedUserName) {
  //console.log("getIndividualsStatsDataColumn function called."); // Log an initial message to show the function has been called.
  //console.log("number of columns for Stats data is = " + data[0].length); // Log how many columns of data the array has.
  // Loop through data array and match the user to return the column in the array of objects that relates to the user.
  for (let x = 0; x < data[0].length; x++) {
    //console.log("x = " + x + ", data[x] = " + data[x]); // Show the looping process.
    if (data[0][x] === selectedUserName) {
      foundColumn = x; // The found column containing the correct user. This is defined at global scope at the very top of this page.
    }
  }
  //console.log("User = " + selectedUserName + ", Found Column = " + foundColumn); // Log a final completion message.
  //return foundColumn; // Return the foundColumn value for later use.
}

// Load in data for the Individual Titan section.
// Pass the results output from Papa Parse (see - https://www.papaparse.com/docs#csv-to-json) into a function to display the contents of the data.
function showIndividualsTitansInfo(results) {
  var data = results.data; // Define the passed data.
  //console.log(data); // Log the data in the console.
  clearTableIndividualsTitans(); // Call the clearTable function to empty the table.
  createFullTableIndividualsTitans(data, foundColumn); // Call the createFullTable function, passing the data from PapaParse and the foundColumn.
}

// Table Functions.

// Clear the table to make space for new data.
function clearTableIndividualsStats() {
  //console.log("Function: clearTableIndividualsStats() called.") // Log an initial message to show the function has been called.
  // https://stackoverflow.com/a/3955238/14290169
  const myNode = document.querySelector("#individuals-stats-table"); // Select the parent from which to delete all child elements from.
  while (myNode.firstChild) {
    // Loop through all child elements.
    myNode.removeChild(myNode.lastChild); // Remove each child element.
  }
  //console.log("Function: Table Cleared.") // Log a final message to show the function is complete.
}

// Create the table by passing the data array to the function. No need to create a table header for this table.
function createFullTableIndividualsStats(array, foundColumn) {
  //console.log("Function: createFullTableIndividualsStats(array) called.") // Log an initial message to show the function has been called.
  let table = document.querySelector("#individuals-stats-table"); // Select the parent element from which to build the table.
  //let data = Object.keys(array[0]); // Create a data variable from the array data received.
  //generateTableHeadIndividualsStats(table, data, foundColumn); // Call the generateTableHeadIndividualsStats function to create the table headers.
  generateTableIndividualsStats(table, array, foundColumn); // Call the generateTableIndividualsStats function to populate the rest of the table data.
  //console.log("Function: createFullTable finished.") // Log a final message to show the function is complete.
}

// Create a table of data from the received data.
// Back To The Basics: How To Generate a Table With JavaScript - https://www.valentinog.com/blog/html-table/

// Create the table without headers by looping through the array and picking the right user data to display.
function generateTableIndividualsStats(table, data, foundColumn) {
  //console.log("Function: generateTableIndividualsStats(table, data) called.") // Log an initial message to show the function has been called.
  var columnCounter; // Define a columnCounter for checking which column to apply stick-col rule to.
  var rowCounter = 0; // Define a rowCounter for checking which row we're on.
  var testedValue; // Define a variable for parsing each element through.
  var dataType; // Define a variable to store the data variable type.
  let tbody = table.createTBody(); // Create table body - https://stackoverflow.com/a/6483237/14290169.
  for (let element of data) {
    // Loop through each row of the data array.
    let row = tbody.insertRow(); // Insert a row for each bit of table data.
    columnCounter = 0; // Define a columnCounter for checking which column to apply stick-col rule to.
    for (key in element) {
      // Loop through each cell in each row.
      // Check if the data is not the first row (0), and is either the first column or the correct user column (foundColumn).
      if (
        rowCounter >= 1 &&
        (columnCounter == 0 || columnCounter == foundColumn)
      ) {
        //console.log("CRITERIA MET: column is " + columnCounter + " which = 0 or foundColumn (" + foundColumn + "), row is " + rowCounter + " which >= 1");
        let cell = row.insertCell(); // Create the cell.
        let text = document.createTextNode(element[key]); // Add the cell text.
        cell.appendChild(text); // Append the text to the cell.
        if (rowCounter == 1 && columnCounter == 0) {
          // Check if its the very first cell.
          cell.classList.add("first-cell"); // Add the first-cell class to the first column. This only applies to the top left cell of the table.
        }
        // Loop through the columns to apply styling.
        if (columnCounter == 0) {
          // If the columnCounter = 0, it's the first column.
          cell.classList.add("sticky-col"); // Add the sticky-col class to the first column.
          cell.classList.add("first-col"); // Add the first-col class to the first column.
          cell.classList.add("first-col-individuals-stats"); // Add the first-col-individuals-stats class to the first column.
        } else {
          cell.classList.add("data-col-individuals-stats"); // Add the data-col-individuals-stats class to all other columns.
        }
        // Get the data type of the value being added to the cell.
        //console.log("Data type of untested value '" + element[key] + "' is '" + dataType + "'.")
        testedValue = parseInt(element[key]); // First, parseInt the value.
        if (isNaN(testedValue) == true) {
          // If the parseInt returns "NaN", it's a string.
          dataType = "string";
          cell.classList.add("textleft"); // Add the textleft class to the cell.
        } else {
          // If not NaN, get the typeof of the value.
          dataType = typeof testedValue;
          cell.classList.add("textcenter"); // Add the textcenter class to the cell.
        }
        //console.log("Data type of tested value '" + element[key] + "' is '" + dataType + "'. Data length is " + element[key].length)
        //console.log("-");
      } else {
        // For all other cases, log a message as to why the data was not included.
        //console.log("CRITERIA NOT MET: column is " + columnCounter + " which /= 0 or foundColumn (" + foundColumn + "), row is " + rowCounter + " which />= 1");
      }
      columnCounter = columnCounter + 1; // Increment the columnCounter.
    }
    rowCounter = rowCounter + 1; // Increment the rowCounter.
  }
  //console.log("Function: generateTableIndividualsStats finished.") // Log a final message to show the function is complete.
  hideLoaderDots("individuals-stats-table-loader"); // Hide the loader dots. See LoaderDots.js.
}

// Clear the table to make space for new data.
function clearTableIndividualsTitans() {
  //console.log("Function: clearTableIndividualsTitans() called.") // Log an initial message to show the function has been called.
  // https://stackoverflow.com/a/3955238/14290169
  const myNode = document.querySelector("#individuals-titan-table"); // Select the parent from which to delete all child elements from.
  while (myNode.firstChild) {
    // Loop through all child elements.
    myNode.removeChild(myNode.lastChild); // Remove each child element.
  }
  //console.log("Function: Table Cleared.") // Log a final message to show the function is complete.
}

// Create the table by passing the data array to the function. No need to create a table header for this table.
function createFullTableIndividualsTitans(array, foundColumn) {
  //console.log("Function: createFullTableIndividualsTitans(array) called.") // Log an initial message to show the function has been called.
  let table = document.querySelector("#individuals-titan-table"); // Select the parent element from which to build the table.
  //let data = Object.keys(array[0]); // Create a data variable from the array data received.
  //generateTableHeadIndividualsStats(table, data, foundColumn); // Call the generateTableHeadIndividualsStats function to create the table headers.
  generateTableIndividualsTitans(table, array, foundColumn); // Call the generateTableIndividualsStats function to populate the rest of the table data.
  //console.log("Function: createFullTable finished.") // Log a final message to show the function is complete.
}

// Create a table of data from the received data.
// Back To The Basics: How To Generate a Table With JavaScript - https://www.valentinog.com/blog/html-table/

// Create the table without headers by looping through the array and picking the right user data to display.
function generateTableIndividualsTitans(table, data, foundColumn) {
  //console.log("Function: generateTableIndividualsTitans(table, data) called.") // Log an initial message to show the function has been called.
  var columnCounter; // Define a columnCounter for checking which column to apply stick-col rule to.
  var rowCounter = 0; // Define a rowCounter for checking which row we're on.
  var testedValue; // Define a variable for parsing each element through.
  var dataType; // Define a variable to store the data variable type.
  let tbody = table.createTBody(); // Create table body - https://stackoverflow.com/a/6483237/14290169.
  for (let element of data) {
    // Loop through each row of the data array.
    let row = tbody.insertRow(); // Insert a row for each bit of table data.
    columnCounter = 0; // Define a columnCounter for checking which column to apply stick-col rule to.
    for (key in element) {
      // Loop through each cell in each row.
      // Check if the data is not the first row (0), and is either the first column or the correct user column (foundColumn).
      if (
        rowCounter >= 1 &&
        (columnCounter == 0 || columnCounter == foundColumn)
      ) {
        //console.log("CRITERIA MET: column is " + columnCounter + " which = 0 or foundColumn (" + foundColumn + "), row is " + rowCounter + " which >= 1");
        let cell = row.insertCell(); // Create the cell.
        let text = document.createTextNode(element[key]); // Add the cell text.
        cell.appendChild(text); // Append the text to the cell.
        if (rowCounter == 1 && columnCounter == 0) {
          // Check if its the very first cell.
          cell.classList.add("first-cell"); // Add the first-cell class to the first column. This only applies to the top left cell of the table.
        }
        // Loop through the columns to apply styling.
        if (columnCounter == 0) {
          // If the columnCounter = 0, it's the first column.
          cell.classList.add("sticky-col"); // Add the sticky-col class to the first column.
          cell.classList.add("first-col"); // Add the first-col class to the first column.
          cell.classList.add("first-col-individuals-stats"); // Add the first-col-individuals-stats class to the first column.
        } else {
          cell.classList.add("data-col-individuals-stats"); // Add the data-col-individuals-stats class to all other columns.
        }
        // Get the data type of the value being added to the cell.
        //console.log("Data type of untested value '" + element[key] + "' is '" + dataType + "'.")
        testedValue = parseInt(element[key]); // First, parseInt the value.
        if (isNaN(testedValue) == true) {
          // If the parseInt returns "NaN", it's a string.
          dataType = "string";
          cell.classList.add("textleft"); // Add the textleft class to the cell.
        } else {
          // If not NaN, get the typeof of the value.
          dataType = typeof testedValue;
          cell.classList.add("textcenter"); // Add the textcenter class to the cell.
        }
        //console.log("Data type of tested value '" + element[key] + "' is '" + dataType + "'. Data length is " + element[key].length)
        //console.log("-");
      } else {
        // For all other cases, log a message as to why the data was not included.
        //console.log("CRITERIA NOT MET: column is " + columnCounter + " which /= 0 or foundColumn (" + foundColumn + "), row is " + rowCounter + " which />= 1");
      }
      columnCounter = columnCounter + 1; // Increment the columnCounter.
    }
    rowCounter = rowCounter + 1; // Increment the rowCounter.
  }
  //console.log("Function: generateTableIndividualsTitans finished.") // Log a final message to show the function is complete.
  hideLoaderDots("individuals-titans-table-loader"); // Hide the loader dots. See LoaderDots.js.
}

// function scrollToLinkWithOffset(elementID) {

//     console.log("scrollToLinkWithOffset(elementID) called")

//     const element = document.getElementById(elementID);
//     const offset = 90;
//     const bodyRect = document.body.getBoundingClientRect().top;
//     const elementRect = element.getBoundingClientRect().top;
//     const elementPosition = elementRect - bodyRect;
//     const offsetPosition = elementPosition - offset;

//     window.scrollTo({
//         top: offsetPosition,
//         behavior: 'smooth'
//     });
// }
