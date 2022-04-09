// jIndividualsPageDorkinians.js JavaScript Functions

"use strict";

// https://fulltime-league.thefa.com/client/api/cs1.js

// Code

// Add callable function "getDorkiniansTable" to be called in "jIndividualsPage.js".
function getDorkiniansTable(lrcode) {
  var randno = Math.random();
  var el = document.createElement("script");
  el.src =
    "https://fulltime-league.thefa.com/js/cs1.html?cs=" +
    lrcode +
    "&random=" +
    randno;
  el.type = "text/javascript";
  document.getElementsByTagName("head")[0].appendChild(el);
}
