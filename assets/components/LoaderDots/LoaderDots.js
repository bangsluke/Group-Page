// LoaderDots.js JavaScript

// Keep in separate file as need to call the function at the top of each HTML page. Don't add to Main Functions.

// Hide the loader dots when all images loaded.
function hideLoaderDots(loaderDotsElementID) {
    document.getElementById(loaderDotsElementID).classList.add("hidden"); // Add the hidden class to the loader dots.
    console.log("> Loader dots id (" + loaderDotsElementID + ") hidden."); // Log that the loader dots have been hidden.
}

// Show the loader dots when required.
function showLoaderDots(loaderDotsElementID) {
    document.getElementById(loaderDotsElementID).classList.remove("hidden"); // Remove the hidden class to the loader dots.
    console.log("> Loader dots id (" + loaderDotsElementID + ") shown."); // Log that the loader dots have been displayed.
}