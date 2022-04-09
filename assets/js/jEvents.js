// jEvents.js JavaScript Functions

"use strict";

// Events Page scripts

console.time(); // Start the console timer.

// Ready Events
// First add a DOMContentLoaded event to fire when the HTML DOM is in place and then add a load event listener for when all images and other resources are loaded.

window.addEventListener("DOMContentLoaded", init); // Wait for the window to load and then run the init function below.

// Add a load event listener (https://eager.io/blog/how-to-decide-when-your-code-should-run/).
window.addEventListener("load", function () {
  console.log(
    "%c" + "> Events page images and other resources all loaded.",
    "background-color: black; color: white; padding: 0.5em 0em; font-weight: bold;"
  ); // Provide an initial load message.
  hideLoaderDots("loader-div"); // Hide the loader dots. See LoaderDots.js.
  console.timeEnd(); // End the console timer.
});

// Other Functions

var peterGriffinAudio = new Audio(
  "/pages/Group-Page/assets/audio/DecoysLois.mp3"
); // Define the audio file to be played for the Peter Griffin image.

// The intial function does the initial work required on the page, as soon as the DOM has loaded.
function init() {
  console.log(
    "%c" + "> Events page DOM content loaded.",
    "background-color: black; color: white; padding: 0.5em 0em; font-weight: bold;"
  ); // Provide an initial load message.
  getSiteTheme(); // Update the site theme to what the user has selected.
}

// When the Peter Griffin button is clicked, hide the main Events page content, and flash up the Peter Griffin image for a second.
function peterButtonClick() {
  console.log("Peter button clicked."); // Log the function in the console.
  document.getElementById("peterAlertButton").classList.add("hidden"); // Add the hidden class to the clicked button.
  document.getElementById("peterAlertImage").classList.remove("hidden"); // Remove the hidden class on the Peter Griffin image.
  peterGriffinAudio.play(); // Trigger the audio file.
  document.getElementById("main-events-section").classList.add("hidden"); // Add the hidden class to the main-events-section.
  window.setTimeout(resetEventsPage, 1000); // Wait 1 second and then call the reset page function. (https://www.w3schools.com/js/js_timing.asp).
}

// Reset the page as if nothing has happened.
function resetEventsPage() {
  console.log("Events page reset."); // Log the function in the console.
  document.getElementById("peterAlertImage").classList.add("hidden"); // Add the hidden class on the Peter Griffin image.
  document.getElementById("main-events-section").classList.remove("hidden"); // Remove the hidden class to the main-events-section.
}
