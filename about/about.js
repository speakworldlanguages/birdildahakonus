"use strict";
// Code written by Manheart Earthman=B. A. Bilgekılınç Topraksoy=土本 智一勇夫剛志
// May be modified by AUTHORIZED PEOPLE ONLY

window.addEventListener('DOMContentLoaded', function(){
  if (needLatinFonts) {
    /*GET FONTS*/
    let kanitFont;
    kanitFont = new FontFace('kanit', "url(/user_interface/fonts/Kanit-ExtraLight.ttf)");
    kanitFont.load().then(function(loaded_face) {
        document.fonts.add(loaded_face);
    }).catch(function(error) {    console.error("Unable to get the font: " + error);  });

    /*Will be using PATUA loaded by js_for_every_single_html*/
  }

  // ------- Fill the divs with text depending on the user interface language --------
  // WARNING: Error will happen due to inexistence of goBackToInfoP on mobiles unless handled with if(deviceDetector.device == "desktop"){}
  const filePathForGoBackButton = "/user_interface/text/"+userInterfaceLanguage+"/info_go_back_button.txt";
  if (deviceDetector.isMobile) {
    fetch(filePathForGoBackButton,myHeaders).then(function(response){return response.text();}).then(function(contentOfTheTxtFile){ document.getElementById('goBackToInfoP').innerHTML = contentOfTheTxtFile;  });
  } else {
    fetch(filePathForGoBackButton,myHeaders).then(function(response){return response.text();}).then(function(contentOfTheTxtFile){ document.getElementById('goBackToInfoP').innerHTML = contentOfTheTxtFile.toUpperCase();  });
  }


}, { once: true });
// END OF DOMContentLoaded EVENT

// REMEMBER: Wait for “userInterfaceLanguage” variable to be ready. See js_for_every_single_html.js
window.addEventListener('load', function(){
  setTimeout(function () {
    parent.stopTheTimerToSeeIfNextLessonLoadedFastEnough(); // We have to do it manually here because about/index.html does not include js_for_all_iframed_lesson_htmls as an EXCEPTION » See js_for_app_initialization_in_parent
  }, 1000); // Try to make sure beforeunload from previous html doesn't get late and fire after the load event of this html

  if (needLatinFonts) {
    if (deviceDetector.device == "desktop") {
      document.getElementById('goBackToInfoP').classList.add("patua");
    } else {
      // Let Titillium be
    }
  }

}, { once: true });
// END OF load EVENT

window.addEventListener("beforeunload",function() { // TESTED: It fires correctly
  // See js_for_app_initialization_in_parent
  parent.startTheTimerToSeeIfNextLessonLoadsFastEnough(); // Before returning to information
}, { once: true });
