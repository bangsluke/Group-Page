// jMainFunction.js JavaScript Functions

"use strict";

// Main Function scripts used across many pages

// Site Theme Functions

// Change the site theme style based on user selection.
function changeSiteTheme(siteThemeName) {
  //console.log("changeSiteTheme clicked."); // Log that the function has been called.
  sessionStorage.setItem("siteThemeName", siteThemeName); // Save the variable to session storage.
  var siteThemeHref;
  var siteThemeMainStyleHexColour;
  var siteThemeBackgroundHexColour;
  // Add the border class to the selected theeme button in the side menu and remove the border from the others.
  if (siteThemeName == "1") {
    // Check which site theme has been selected and provide the href link to the CSS sheet.
    siteThemeHref = "OriginalTheme.css";
    siteThemeMainStyleHexColour = "#FF3CAC";
    siteThemeBackgroundHexColour = "#784BA0";
  } else if (siteThemeName == "2") {
    siteThemeHref = "DarkGreyOrange.css";
    siteThemeMainStyleHexColour = "#F7573A";
    siteThemeBackgroundHexColour = "#222129";
  } else if (siteThemeName == "3") {
    siteThemeHref = "BlueGreen.css";
    siteThemeMainStyleHexColour = "#419D78";
    siteThemeBackgroundHexColour = "#010619";
  } else {
    siteThemeHref = "DarkGreyOrange.css"; // Default back to orange if any issues.
    siteThemeMainStyleHexColour = "#F7573A";
    siteThemeBackgroundHexColour = "#222129";
  }
  getSideMenuSiteThemeSelection(); // Call the getSideMenuSiteThemeSelection() function.
  console.log(
    "%c" +
      "> Site theme changed: siteThemeName = " +
      siteThemeName +
      ", siteThemeHref = " +
      siteThemeHref,
    " background-color:" +
      siteThemeBackgroundHexColour +
      "; color:" +
      siteThemeMainStyleHexColour +
      "; padding: 0.5em 0em; font-weight: bold;"
  ); // Log the selected site name and href.
  siteThemeHref = "/pages/Group-Page/assets/css/Themes/" + siteThemeHref; // Create the full siteThemeHref link.
  sessionStorage.setItem("siteThemeHref", siteThemeHref); // Save the variable to session storage.
  sessionStorage.setItem(
    "siteThemeMainStyleHexColour",
    siteThemeMainStyleHexColour
  ); // Save the variable to session storage.
  sessionStorage.setItem(
    "siteThemeBackgroundHexColour",
    siteThemeBackgroundHexColour
  ); // Save the variable to session storage.
  document.getElementById("css-theme").href = siteThemeHref; // Change the CSS stylesheet used on the page.
  closeNav(); // Close the side navigation that the function was called from.
  //console.log("Site theme changed."); // Log a final success message.
}

// For each page, start by getting the site theme.
function getSiteTheme() {
  var siteThemeName = sessionStorage.getItem("siteThemeName"); // Retrieve the variable passed to session storage.
  var siteThemeHref = sessionStorage.getItem("siteThemeHref"); // Retrieve the variable passed to session storage.
  var siteThemeMainStyleHexColour = sessionStorage.getItem(
    "siteThemeMainStyleHexColour"
  ); // Retrieve the variable passed to session storage.
  var siteThemeBackgroundHexColour = sessionStorage.getItem(
    "siteThemeBackgroundHexColour"
  ); // Retrieve the variable passed to session storage.
  // Default back to the original if any issues.
  if (siteThemeName == null) {
    siteThemeName = 2;
    siteThemeHref = "DarkGreyOrange.css";
    siteThemeHref = "/pages/Group-Page/assets/css/Themes/" + siteThemeHref; // Create the full siteThemeHref link.
    siteThemeMainStyleHexColour = "#F7573A";
    siteThemeBackgroundHexColour = "#222129";
  }
  getSideMenuSiteThemeSelection(); // Call the getSideMenuSiteThemeSelection() function.
  document.getElementById("css-theme").href = siteThemeHref; // Update the site theme to the defined theme.
  console.log(
    "%c" +
      "> siteThemeName = " +
      siteThemeName +
      ", siteThemeMainStyleHexColour = " +
      siteThemeMainStyleHexColour,
    " background-color:" +
      siteThemeBackgroundHexColour +
      "; color:" +
      siteThemeMainStyleHexColour +
      "; padding: 0.5em 0em; font-weight: bold;"
  ); // Log the selected site name and href.
}

// Change the side menu theme selection based on the selected theme.
function getSideMenuSiteThemeSelection() {
  var siteThemeName = sessionStorage.getItem("siteThemeName"); // Retrieve the variable passed to session storage.
  // Add the border class to the selected theeme button in the side menu and remove the border from the others.
  if (siteThemeName == "1") {
    document
      .getElementsByTagName("side-menu-component")[0]
      .shadowRoot.getElementById("button-container-theme-1")
      .classList.add("sideMenu-Button-Container-Border"); // Add the sideMenu-Button-Container-Border class.
    document
      .getElementsByTagName("side-menu-component")[0]
      .shadowRoot.getElementById("button-container-theme-2")
      .classList.remove("sideMenu-Button-Container-Border"); // Remove the sideMenu-Button-Container-Border class.
    document
      .getElementsByTagName("side-menu-component")[0]
      .shadowRoot.getElementById("button-container-theme-3")
      .classList.remove("sideMenu-Button-Container-Border"); // Remove the sideMenu-Button-Container-Border class.
  } else if (siteThemeName == "2") {
    document
      .getElementsByTagName("side-menu-component")[0]
      .shadowRoot.getElementById("button-container-theme-1")
      .classList.remove("sideMenu-Button-Container-Border"); // Remove the sideMenu-Button-Container-Border class.
    document
      .getElementsByTagName("side-menu-component")[0]
      .shadowRoot.getElementById("button-container-theme-2")
      .classList.add("sideMenu-Button-Container-Border"); // Add the sideMenu-Button-Container-Border class.
    document
      .getElementsByTagName("side-menu-component")[0]
      .shadowRoot.getElementById("button-container-theme-3")
      .classList.remove("sideMenu-Button-Container-Border"); // Remove the sideMenu-Button-Container-Border class.
  } else if (siteThemeName == "3") {
    document
      .getElementsByTagName("side-menu-component")[0]
      .shadowRoot.getElementById("button-container-theme-1")
      .classList.remove("sideMenu-Button-Container-Border"); // Remove the sideMenu-Button-Container-Border class.
    document
      .getElementsByTagName("side-menu-component")[0]
      .shadowRoot.getElementById("button-container-theme-2")
      .classList.remove("sideMenu-Button-Container-Border"); // Remove the sideMenu-Button-Container-Border class.
    document
      .getElementsByTagName("side-menu-component")[0]
      .shadowRoot.getElementById("button-container-theme-3")
      .classList.add("sideMenu-Button-Container-Border"); // Add the sideMenu-Button-Container-Border class.
  } else {
    document
      .getElementsByTagName("side-menu-component")[0]
      .shadowRoot.getElementById("button-container-theme-1")
      .classList.remove("sideMenu-Button-Container-Border"); // Remove the sideMenu-Button-Container-Border class.
    document
      .getElementsByTagName("side-menu-component")[0]
      .shadowRoot.getElementById("button-container-theme-2")
      .classList.add("sideMenu-Button-Container-Border"); // Add the sideMenu-Button-Container-Border class.
    document
      .getElementsByTagName("side-menu-component")[0]
      .shadowRoot.getElementById("button-container-theme-3")
      .classList.remove("sideMenu-Button-Container-Border"); // Remove the sideMenu-Button-Container-Border class.
  }
}

// Table Functions

// Clear the table to make space for new data.
function clearTable(selector) {
  console.log(
    "%c" +
      ">> Re-usable Function: clearTable() called. Passed variables: selector = " +
      selector,
    " background-color: lightblue; color:black; padding: 0.5em 0em; font-weight: bold;"
  ); // Log the selected site name and href.
  // https://stackoverflow.com/a/3955238/14290169
  const myNode = document.querySelector(selector); // Select the parent from which to delete all child elements from. Modified the selector to be dynamic and accept any type of selector. Previously, defining as "table" meant that it only works if the HTML page has only one table element.
  while (myNode.firstChild) {
    // Loop through all child elements.
    myNode.removeChild(myNode.lastChild); // Remove each child element.
  }
  //console.log("Function: Table Cleared.") // Log a final message to show the function is complete.
}

// Create the table by passing the data to the function.
function createFullTable(data, selector, toolTipBoolean, dataForm) {
  console.log(
    "%c" +
      ">> Re-usable Function: createFullTable(data, selector, toolTipBoolean, dataForm) called. Passed variables: data = shown below, selector = " +
      selector +
      ", toolTipBoolean = " +
      toolTipBoolean +
      ", dataForm = " +
      dataForm,
    " background-color: lightgreen; color:black; padding: 0.5em 0em; font-weight: bold;"
  ); // Log the selected site name and href.
  console.log(data); // Log the passed data to the console.
  let table = document.querySelector(selector); // Select the parent element from which to build the table. Modified the selector to be dynamic and accept any type of selector. Previously, defining as "table" meant that it only works if the HTML page has only one table element.
  // If the toolTipBoolean is true, define header data as from the array, instead of the keys of an object.
  if (dataForm == "array") {
    // Define the header data as from the array.
    console.log(
      "dataForm = " +
        dataForm +
        " therefore data is in array form, so pass through data as the first row of data of the array."
    ); // Log if the toolTipBoolean is in play or not.
    var headerdata = data[0]; // Get the header data from the first element of the array.
    console.log("headerdata printed below:");
    console.log(headerdata);
  } else if (dataForm == "object") {
    // Define the header data as the keys of the object.
    console.log(
      "dataForm = " +
        dataForm +
        " therefore data is in object form, so pass through the header data as the first keys of the object."
    ); // Log if the toolTipBoolean is in play or not.
    var headerdata = Object.keys(data[0]); // Create an array of the object headers from the array data received.
    console.log("headerdata printed below:");
    console.log(headerdata);
  } else {
    alert(
      "Error - No dataForm passed to 'createFullTable' in jMainFunctions.js."
    );
  }
  generateTableHead(table, headerdata, data, toolTipBoolean); // Call the generateTableHead function to create the table headers. Note that headerdata contains the headers only, array contains the full data.
  generateTable(table, data, toolTipBoolean); // Call the generateTable function to populate the rest of the table data.
  //console.log("Function: createFullTable finished.") // Log a final message to show the function is complete.
}

// Create a table of data from the received data.
// Back To The Basics: How To Generate a Table With JavaScript - https://www.valentinog.com/blog/html-table/

// Create the table head including the table headers.
function generateTableHead(table, headerdata, array, toolTipBoolean) {
  console.log(
    "%c" +
      ">> Re-usable Function: generateTableHead(table, data) called. Passed variables: table = not shown, headerdata = shown below, array = shown below, toolTipBoolean = " +
      toolTipBoolean,
    " background-color: lightyellow; color:black; padding: 0.5em 0em; font-weight: bold;"
  ); // Log the selected site name and href.
  console.log(headerdata); // Log the passed headerdata to the console.
  console.log(array); // Log the passed array to the console.
  let thead = table.createTHead(); // Create table headers.
  let row = thead.insertRow(); // Insert a row for the table headers.
  var counter = 0; // Define a counter for checking which column to apply stick-col rule to.
  for (let key of headerdata) {
    // Loop through each column header of the headerdata.
    let th = document.createElement("th"); // Create the th element.
    // If the toolTipBoolean is true, create the headers to also include the tool tips.
    if (toolTipBoolean == true) {
      // Define how to add the text depending on if toolTips are enabled for the table.
      //console.log("toolTipBoolean is true so adding tooltip.");
      var text = document.createTextNode(key); // Create a text node from the header data key to be apended.
      th.appendChild(text); // Append the text to the table header.
      // Skip the first column.
      if (counter == 0) {
        // If the counter = 0, it's the first column.
        // Do nothing.
      } else {
        // For all other columns, add the tool tip.
        th.classList.add("tooltip"); // Add the tooltip class to the th element (the container element).
        var toolTip = document.createElement("p"); // Create a paragraph element to be appended.
        toolTip.innerHTML = array[1][counter]; // Add the text of the second row, counter column to the new paragraph element.
        toolTip.classList.add("tooltiptext"); // Add the tooltiptext class to the new paragraph element.
        toolTip.classList.add("wordwrap"); // Add the wordwrap class to the new paragraph element.
        th.appendChild(toolTip); // Append the toolTip paragraph element as a child to the th element.
      }
    } else {
      // Add text the normal way.
      //console.log("toolTipBoolean is false so not adding tooltip.");
      var text = document.createTextNode(key); // Create a text node from the header data key to be apended.
      th.appendChild(text); // Append the text to the table header.
    }
    if (counter == 0) {
      // If the counter = 0, it's the first column.
      th.classList.add("sticky-col"); // Add the sticky-col class to the first column.
      th.classList.add("first-col"); // Add the first-col class to the first column.
      th.classList.add("first-cell"); // Add the first-cell class to the first column. This only applies to the top left cell of the table.
    } else {
      // Do nothing as not first column.
    }
    th.classList.add("textleft"); // Add the textleft class to all column headers.
    row.appendChild(th); // Append the new table header to the table.
    counter = counter + 1; // Increment the counter.
  }
  //console.log("Function: generateTableHead finished.") // Log a final message to show the function is complete.
}

// Create the rest of the table below head including all table rows.
function generateTable(table, data, toolTipBoolean) {
  console.log(
    "%c" +
      ">> Re-usable Function: generateTable(table, data, toolTipBoolean) called. Passed variables: table = not shown, data = shown below, toolTipBoolean = " +
      toolTipBoolean,
    " background-color: lightblue; color:black; padding: 0.5em 0em; font-weight: bold;"
  ); // Log the selected site name and href.
  console.log(data); // Log the passed array to the console.
  var rowCounter = 1; // Define a counter for checking which row to work with.
  var columnCounter;
  var testedValue;
  let tbody = table.createTBody(); // Create table body - https://stackoverflow.com/a/6483237/14290169.

  // console.log("--------------------------------------")
  // console.log("Generate Table Data Start")
  // console.log("Starting Row Counter = " + rowCounter);
  // console.log("toolTipBoolean = " + toolTipBoolean);

  for (let element of data) {
    // Loop through each row of the data.
    let row = tbody.insertRow(); // Insert a row for each bit of table data.
    columnCounter = 0; // Define a counter for checking which column to apply stick-col rule to.

    // console.log("-------------------------------------")
    // console.log("Row data = below")
    // console.log(element)

    if (rowCounter <= 1) {
      // Skip the first row regardless.
      // Do nothing.
      // console.log("Row count " + rowCounter + " skipped as this is the table headers.")
    } else {
      if (toolTipBoolean == true && rowCounter == 2) {
        //if (toolTipBoolean == true && rowCounter <= 1) { // Define how to add the text depending on if toolTips are enabled for the table.
        // Skip doing the first two rows for tables that have tooltips.
        // console.log("toolTipBoolean is true so skipping row = " + rowCounter + ".");
      } else {
        // console.log("toolTipBoolean is false so not skipping row = " + rowCounter + ".");

        for (key in element) {
          // Loop through each cell in each row.
          let cell = row.insertCell(); // Create the cell.
          let text = document.createTextNode(element[key]); // Add the cell text.
          cell.appendChild(text); // Append the text to the cell.

          // Loop through the columns to apply styling.
          if (columnCounter == 0) {
            // If the columnCounter = 0, it's the first column.
            cell.classList.add("sticky-col"); // Add the sticky-col class to the first column.
            cell.classList.add("first-col"); // Add the first-col class to the first column.
          } else {
            // Do nothing as not first column.
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
          //console.log("Data type of tested value '" + element[key] + "' is '" + dataType + "'.")
          //console.log("-");

          columnCounter = columnCounter + 1; // Increment the columnCounter.
        }
      }
    }

    rowCounter = rowCounter + 1; // Increment the rowCounter.
  }
  //console.log("Function: generateTable finished.") // Log a final message to show the function is complete.
}

// Add a border below the 4th person if the table is flagged as a Titan table.
function applyTitanTableFormatting(tableID, titanBoolean, toolTipBoolean) {
  console.log(
    "%c" +
      ">> Re-usable Function: applyTitanTableFormatting(tableID, titanBoolean, toolTipBoolean) called. Passed variables: tableID = " +
      tableID +
      ", titanBoolean = " +
      titanBoolean +
      ", toolTipBoolean = " +
      toolTipBoolean,
    " background-color: lightcyan; color:black; padding: 0.5em 0em; font-weight: bold;"
  ); // Log the selected site name and href.
  if (titanBoolean == "TRUE" || titanBoolean == true) {
    // Check that the titanBoolean is true.
    //console.log("Adding titan4thRow class to the table as titanBoolean is " + titanBoolean);
    if (toolTipBoolean == true) {
      // Tool tip is required so add the special titan5thRow or titan6thRow class that deals with the tool tip.
      document.getElementById(tableID).classList.remove("titan5thRow"); // Remove the titans-table table by id and add the titan4thRow class to the table.
      document.getElementById(tableID).classList.add("titan6thRow"); // Get the titans-table table by id and add the titan6thRow class to the table.
    } else {
      // Tool tip isn't required so add the normal titan4thRow class.
      document.getElementById(tableID).classList.remove("titan6thRow"); // Remove the titans-table table by id and add the titan4thRow class to the table.
      document.getElementById(tableID).classList.add("titan5thRow"); // Get the titans-table table by id and add the titan4thRow class to the table.
    }
  } else {
    // For all non Titan tables, remove the Titan table classes.
    document.getElementById(tableID).classList.remove("titan5thRow"); // Remove the titans-table table by id and add the titan4thRow class to the table.
    document.getElementById(tableID).classList.remove("titan6thRow"); // Remove the titans-table table by id and add the titan4thRow class to the table.
  }
}

// Other Functions

// Full Screen functions (https://stackoverflow.com/a/23971798/14290169).

function isFullScreen() {
  return (
    (document.fullScreenElement && document.fullScreenElement !== null) ||
    document.mozFullScreen ||
    document.webkitIsFullScreen
  );
}

function requestFullScreen(element) {
  if (element.requestFullscreen) element.requestFullscreen();
  else if (element.msRequestFullscreen) element.msRequestFullscreen();
  else if (element.mozRequestFullScreen) element.mozRequestFullScreen();
  else if (element.webkitRequestFullscreen) element.webkitRequestFullscreen();
}

function exitFullScreen() {
  if (document.exitFullscreen) document.exitFullscreen();
  else if (document.msExitFullscreen) document.msExitFullscreen();
  else if (document.mozCancelFullScreen) document.mozCancelFullScreen();
  else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
}

function toggleFullScreen(element) {
  if (isFullScreen()) {
    console.log("Exiting full screen mode.");
    exitFullScreen();
  } else {
    console.log("Entering full screen mode.");
    requestFullScreen(element || document.documentElement);
  }
}

// Not needed for now.
// function zoomOutMobile() {
//     console.log("Zoom back out to initial scale.");

//     const viewport = document.querySelector('meta[name="viewport"]');

//     if (viewport) {
//         viewport.content = 'initial-scale=1';
//         viewport.content = 'width=device-width';
//     }

//     alert("Zoomed back out");
// }
