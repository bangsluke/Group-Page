// jTableTop.js JavaScript Functions

// TableTop Google Sheets Database scripts
// https://medium.com/@jaejohns/how-to-use-google-sheets-as-your-website-database-b0f2f13d0396
// https://github.com/jsoma/tabletop


var publicSpreadsheetUrl = 'https://docs.google.com/spreadsheets/d/1nMirJYChG8t2DC_C_esM7zeviuQ9YtIQLKDQ5LbuP-w/edit?usp=sharing';

function init() {
  Tabletop.init({
    key: publicSpreadsheetUrl,
    callback: showInfo,
    simpleSheet: true,
    // debug: true
  })
}

// https://github.com/jsoma/tabletop/blob/master/examples/multiple/index.html
// var count = 0;
// function showInfo(data, tabletop) {
//   // data comes through as a simple array since simpleSheet is turned on
//   var div = document.getElementById('test-div'),
//       html = "<h1>SHEET " + (++count) + "</h1>",
//       prop, i;
//   for(i = 0; i < data.length; i++) {
//     for(prop in data[i]) {
//       html = html + "&nbsp;-&nbsp;" + data[i][prop];
//     }
//     html = html + "<hr><br>";
//   }
//   div.innerHTML = div.innerHTML + html;
//   console.log(data);
// }

function showInfo(data) {
  // data comes through as a simple array since simpleSheet is turned on
  document.getElementById("test-div").innerHTML = JSON.stringify(data);
  console.log(data);
  console.log(data[0]["id"]);
  console.log(data[0].userFirstName);
}


// function showInfo(data, tabletop) {
//   // alert('Successfully processed!')
//   console.log(data);
// }

window.addEventListener('DOMContentLoaded', init)



// function init() {
//     Papa.parse('https://docs.google.com/spreadsheets/d/e/2PACX-1vRB4E_6RnpLP1wWMjqcwsUvotNATB8Np3OntlXb7066ULcAHI9oqqRhucltFifPTYNd7DRNRE56oTdt/pub?output=csv', {
//     download: true,
//     header: true,
//     complete: function(results) {
//       var data = results.data
//       console.log(data)
//     }
//   })
// window.addEventListener('DOMContentLoaded', init)



