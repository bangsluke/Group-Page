// jGallerySubPage.js JavaScript Functions

"use strict";

// Gallery SubPage scripts

console.time(); // Start the console timer.

// Ready Events
// First add a DOMContentLoaded event to fire when the HTML DOM is in place and then add a load event listener for when all images and other resources are loaded.

window.addEventListener("DOMContentLoaded", init); // Wait for the window to load and then run the init function below.

// Add a load event listener (https://eager.io/blog/how-to-decide-when-your-code-should-run/).
window.addEventListener("load", function () {
  console.log(
    "%c" + "> Gallery Subpage images and other resources all loaded.",
    "background-color: black; color: white; padding: 0.5em 0em; font-weight: bold;"
  ); // Provide an initial load message.
  hideLoaderDots("loader-div"); // Hide the loader dots. See LoaderDots.js.
  console.timeEnd(); // End the console timer.
});

// Other Functions

// Define a maximum number of possible photos in any one gallery folder.
var maxImageCount = 20;

// The intial function does the initial work required on the page, as soon as the DOM has loaded.
function init() {
  console.log(
    "%c" + "> Gallery Subpage DOM content loaded.",
    "background-color: black; color: white; padding: 0.5em 0em; font-weight: bold;"
  ); // Provide an initial load message.
  getSiteTheme(); // Update the site theme to what the user has selected.
  setGalleryHeaderName(); // Change the header name to reflect which Gallery is being shown.
  populateImageSources(); // Loop through the images populating their sources correctly.
  showVideoSection(); // Show the Video Section at the bottom of the Gallery Subpage if the gallery is Football.
}

// Change the header names to reflect which Gallery is being shown.
function setGalleryHeaderName() {
  var clickedAlbumName = sessionStorage.getItem(
    "clickedAlbumName",
    clickedAlbumName
  ); // Get the saved variable from session storage.
  if (clickedAlbumName == null) {
    // Update clickedAlbumName to be General by deafult if error.
    clickedAlbumName = "General";
  }
  //console.log(clickedAlbumName);
  document.getElementById("pageMainHeader").innerHTML = clickedAlbumName; // Modify the text inside the header component element.
  //document.getElementById("subpageHeader").innerHTML = clickedAlbumName + " Gallery."; // Modify the text inside the subpage header element.
}

// Loop through the images populating their sources correctly.
function populateImageSources() {
  var clickedAlbumName = sessionStorage.getItem(
    "clickedAlbumName",
    clickedAlbumName
  ); // Get the saved variable from session storage.
  if (clickedAlbumName == null) {
    // Update clickedAlbumName to be General by deafult if error.
    clickedAlbumName = "General";
  }
  var albumSize;
  switch (
    clickedAlbumName // Add a switch statement to define how many images are in the Gallery.
  ) {
    case "Big Nights Out":
      albumSize = 10;
      break;
    case "Croatia":
      albumSize = 10;
      break;
    case "Edinburgh":
      albumSize = 13;
      break;
    case "Football":
      albumSize = 20;
      break;
    case "General":
      albumSize = 20;
      break;
    case "Glastonbury":
      albumSize = 20;
      break;
    case "Lockdown":
      albumSize = 16;
      break;
    case "Pagham":
      albumSize = 12;
      break;
    case "Portugal":
      albumSize = 10;
      break;
    case "Skiing":
      albumSize = 18;
      break;
    default: // Default statement or expression;
      albumSize = 10;
  }
  //console.log(clickedAlbumName + ' album size is ' + albumSize); // Log the album size to be used.
  sessionStorage.setItem("albumSize", albumSize); // Save the variable to session storage.
  var x; // Define the variable for looping.
  for (x = 1; x <= maxImageCount; x++) {
    // Loop through all images.
    //console.log(x);
    if (x <= albumSize) {
      // If the image number falls within the album size, update the source of the image.
      var sourcePath =
        "/pages/Group-Page/assets/images/GalleryImages/" +
        clickedAlbumName +
        "/" +
        clickedAlbumName +
        x +
        ".jpg"; // Define the source path used for both images.
      document.getElementById("image" + x).src = sourcePath; // Set the source of the image dynamically.
      //document.getElementById("modalimage" + x).src = sourcePath; // Set the source of the modal image dynamically.
    } else {
      // If the image number is larger than the album size, hide the placeholder.
      document.getElementById("image" + x).classList.add("hidden"); // Add the hidden class to the image.
      //document.getElementById("modalimage" + x).classList.add("hidden"); // Add the hidden class to the modal image.
    }
  }
  document.getElementById("modalimage").src = sourcePath; // Set the source of the modal image dynamically.
}

// Show the Video Section at the bottom of the Gallery Subpage if the gallery is Football.
function showVideoSection() {
  var clickedAlbumName = sessionStorage.getItem(
    "clickedAlbumName",
    clickedAlbumName
  ); // Get the saved variable from session storage.
  if (clickedAlbumName == "Football") {
    // React if the gallery selected is Football.
    document
      .getElementById("gallery-subpage-video-section")
      .classList.remove("hidden"); // Remove the hidden class for the video section.
  }
}

// https://www.w3schools.com/howto/howto_js_lightbox.asp

// Open the Modal
function openModal() {
  document.getElementById("myModal").style.display = "block"; // Turn on the modal display.
}

// Close the Modal
function closeModal() {
  document.getElementById("myModal").style.display = "none"; // Turn off the modal display.
}

var slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  console.log("-----------------------------------------------------------");
  console.log("plusSlides called and passed n = " + n); // Log an intial message that the function has been called.
  console.log("slideIndex was = " + slideIndex); // Log the original slideIndex.
  var newSlideIndex = Number(slideIndex) + n; // Define a new variable for the newSlideIndex for use in the console.log below.
  var albumSize = sessionStorage.getItem("albumSize", albumSize); // Get the saved variable from session storage.
  console.log("newSlideIndex is = " + newSlideIndex); // Log the new slideIndex.
  if (newSlideIndex == 0) {
    // If the newSlideIndex is an impossible 0.
    console.log("newSlideIndex = 0 so skipping to album size."); // Log what case has been reached.
    newSlideIndex = albumSize; // Reset the newSlideIndex to the album size.
    console.log("slideIndex is = " + newSlideIndex); // Log the newSlideIndex.
    showSlides(albumSize); // Call the show slides function, passing the next or previous integer.
  } else if (newSlideIndex > albumSize) {
    // If the newSlideIndex is larger than the album size.
    console.log("newSlideIndex > album size so resetting to 1."); // Log what case has been reached.
    newSlideIndex = 1; // Reset the newSlideIndex to 1.
    console.log("slideIndex is = " + newSlideIndex); // Log the newSlideIndex.
    showSlides(1); // Call the show slides function, passing the next or previous integer.
  } else {
    // If the newSlideIndex is any other case.
    console.log(
      "newSlideIndex is not 0 or > album size so moving to next image."
    ); // Log what case has been reached.
    console.log("slideIndex is = " + newSlideIndex); // Log the newSlideIndex.
    showSlides(newSlideIndex); // Call the show slides function, passing the next or previous integer.
  }
  slideIndex = newSlideIndex; // Update the global slideIndex variable to be equal to the new slide index.
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides((slideIndex = n)); // Call the show slides function for the current image.
}

function showSlides(n) {
  console.log("Function showSlides(n) called with n = " + n); // Log an intial message that the function has been called.
  var clickedAlbumName = sessionStorage.getItem(
    "clickedAlbumName",
    clickedAlbumName
  ); // Get the saved variable from session storage.
  var albumSize = sessionStorage.getItem("albumSize", albumSize); // Get the saved variable from session storage.
  if (clickedAlbumName == null) {
    // Update clickedAlbumName to be General by default if error.
    clickedAlbumName = "General"; // Set the default.
  }
  document.getElementById("numbertext").innerHTML = n + "/" + albumSize; // Update the image number text. Modify the text inside the element.
  var img = new Image(); // Get the image height and width from making a new image. https://stackoverflow.com/a/5633302/14290169.
  img.src =
    "/pages/Group-Page/assets/images/GalleryImages/" +
    clickedAlbumName +
    "/" +
    clickedAlbumName +
    n +
    ".jpg"; // Setting the source.
  var width = img.width; // Getting the width.
  var height = img.height; // Getting the height.
  console.log("image width is " + width + "and height is = " + height); // Log the images height and width.
  if (height >= width) {
    // Check if the images height is bigger than the width to define what way round the image should be.
    // Image type is portrait-image.
    console.log(
      "Height is bigger than width so applying portrait-image class."
    );
    document.getElementById("modalimage").classList.remove("landscape-image"); // Remove the landscape-image class to the div housing the image.
    document
      .getElementById("modalimage")
      .classList.remove("portrait-image-reduced-width"); // Remove the portrait-image-reduced-width class to the div housing the image.
    document.getElementById("modalimage").classList.add("portrait-image"); // Add the portrait-image class to the div housing the image.
    var heightToWidthRatio = height / width; // Create a ratio of height to width to decide if to apply reduced width style.
    console.log("heightToWidthRatio is " + heightToWidthRatio); // Log the ratio.
    if (heightToWidthRatio > 1.6) {
      // Check if the ratio is larger than 1.6 and act if so.
      console.log(
        "heightToWidthRatio is big so applying portrait-image-reduced-width class."
      ); // Log that the class will be applied
      document
        .getElementById("modalimage")
        .classList.add("portrait-image-reduced-width"); // Add the portrait-image-reduced-width class to the div housing the image.
    }
  } else {
    // Image type is landscape-image.
    console.log(
      "Width is bigger than height so applying landscape-image class."
    );
    document.getElementById("modalimage").classList.remove("portrait-image"); // Remove the portrait-image class to the div housing the image.
    document
      .getElementById("modalimage")
      .classList.remove("portrait-image-reduced-width"); // Remove the portrait-image-reduced-width class to the div housing the image.
    document.getElementById("modalimage").classList.add("landscape-image"); // Add the landscape-image class to the div housing the image.
  }
  var slides = document.getElementsByClassName("mySlides"); // Get all images with class "mySlides".
  slides[0].style.display = "block"; // Load the selected image.
  var sourcePath =
    "/pages/Group-Page/assets/images/GalleryImages/" +
    clickedAlbumName +
    "/" +
    clickedAlbumName +
    n +
    ".jpg"; // Define the source path used for both images.
  document.getElementById("modalimage").src = sourcePath; // Set the source of the modal image dynamically.
}
