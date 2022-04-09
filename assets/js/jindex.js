// jindex.js JavaScript Functions

"use strict";

// Code

// Start the console timer.
console.time();

window.onload = function () {
  // Initially define the selection element.
  var userSelection = document.getElementById("userdropdown");

  // React when the user changes the userSelection.
  userSelection.onchange = function () {
    // Get the picked user from the userSelection.
    var userSelection = document.getElementById("userdropdown");
    var selectedUserName =
      userSelection.options[userSelection.selectedIndex].value; // Get the option selected.
    var selectedUserNameText =
      userSelection.options[userSelection.selectedIndex].text; // Get the corresponding value from the option selected.
    sessionStorage.setItem("selectedUserName", selectedUserName); // Save the variable to session storage.
    console.log(
      "Selected Name: " +
        selectedUserNameText +
        ", Passed Variable: " +
        selectedUserName
    );
  };
};

// End the console timer.
console.timeEnd();
