// jUser.js JavaScript Functions

"use strict";

// User Page scripts

console.time(); // Start the console timer.

// Ready Events
// First add a DOMContentLoaded event to fire when the HTML DOM is in place and then add a load event listener for when all images and other resources are loaded.

window.addEventListener("DOMContentLoaded", init); // Wait for the window to load and then run the init function below.

// Add a load event listener (https://eager.io/blog/how-to-decide-when-your-code-should-run/).
window.addEventListener("load", function () {
  console.log(
    "%c" + "> User page images and other resources all loaded.",
    "background-color: black; color: white; padding: 0.5em 0em; font-weight: bold;"
  ); // Provide an initial load message.
  hideLoaderDots("loader-div"); // Hide the loader dots. See LoaderDots.js.
  console.timeEnd(); // End the console timer.
});

// Other Functions

// The intial function does the initial work required on the page, as soon as the DOM has loaded.
function init() {
  console.log(
    "%c" + "> User page DOM content loaded.",
    "background-color: black; color: white; padding: 0.5em 0em; font-weight: bold;"
  ); // Provide an initial load message.
  getSiteTheme(); // Update the site theme to what the user has selected.
}

// Pass the User Name by setting it in session storage.
function passUserName(user) {
  // Set the user variable to "this" - see the calling function in the HTML.
  // https://lage.us/Javascript-Pass-Variables-to-Another-Page.html
  var selectedUserName = user.id; // Get the id of the element that called the function. https://stackoverflow.com/questions/7627161/get-id-of-element-that-called-a-function
  sessionStorage.setItem("selectedUserName", selectedUserName); // Save the variable to session storage.
  console.log(selectedUserName);
}
