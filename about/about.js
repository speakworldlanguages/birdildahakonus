"use strict";
// Code written by Manheart Earthman=B. A. Bilgekılınç Topraksoy=土本 智一勇夫剛志
// This file MAY NOT BE MODIFIED WITHOUT CONSENT VIA OFFICIAL AUTHORIZATION

window.addEventListener('load', function(){

  if (needLatinFonts) {
    /*GET FONTS*/
    let kanitFont;
    kanitFont = new FontFace('kanit', "url(/user_interface/fonts/Kanit-ExtraLight.ttf)");
    kanitFont.load().then(function(loaded_face) {
        document.fonts.add(loaded_face);
    }).catch(function(error) {    console.error("Unable to get the font: " + error);  });

    /*Will be using PATUA loaded by js_for_every_single_html*/
  }
  // ---
  if (needLatinFonts) {
    if (deviceDetector.device == "desktop") {
      document.getElementById('goBackToInfoP').classList.add("patua");
    } else {
      // Let Titillium be
    }
  }

  // REMEMBER: Wait for “userInterfaceLanguage” variable to be ready. See js_for_every_single_html.js
  // ------- Fill the divs with text depending on the user interface language --------
  // WARNING: Error will happen due to inexistence of goBackToInfoP on mobiles unless handled with if(deviceDetector.device == "desktop"){}
  const filePathForGoBackButton = "/user_interface/text/"+userInterfaceLanguage+"/info-go_back_button.txt";
  if (deviceDetector.isMobile) {
    fetch(filePathForGoBackButton,myHeaders).then(function(response){return response.text();}).then(function(contentOfTheTxtFile){ document.getElementById('goBackToInfoP').innerHTML = contentOfTheTxtFile;  });
  } else {
    fetch(filePathForGoBackButton,myHeaders).then(function(response){return response.text();}).then(function(contentOfTheTxtFile){ document.getElementById('goBackToInfoP').innerHTML = contentOfTheTxtFile.toUpperCase();  });
  }


}, { once: true });
// END OF load EVENT

/*
window.addEventListener('DOMContentLoaded', function(){
 // DOMContentLoaded is (or can be) too early for deviceDetector
}, { once: true });
*/
