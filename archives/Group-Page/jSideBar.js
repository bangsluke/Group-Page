// jSideBar.js JavaScript Functions

// Side bar scripts
// https://www.codingflicks.com/2020/12/toggle-sidebar-navigation-html-css-javascript.html

function openNav() {
	document.getElementById("side-menu").style.width = "300px";
    // document.getElementById("side-menu").style.borderleft = '1px solid #000';
	// document.getElementById("content-area").style.marginRight = "300px"; // Re-add if you want the content area to shrink on menu expansion.
    document.getElementById("burgericon").style.display = "none";
}
function closeNav() {
	document.getElementById("side-menu").style.width = "0";
    // document.getElementById("side-menu").style.borderleft = "0";
	// document.getElementById("content-area").style.marginRight = "0"; // Re-add if you want the content area to shrink on menu expansion.
    document.getElementById("burgericon").style.display = "inline";
}