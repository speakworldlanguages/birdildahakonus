"use strict";
// Code written by Manheart Earthman=B. A. Bilgekılınç Topraksoy=土本 智一勇夫剛志
// This file MAY NOT BE MODIFIED WITHOUT CONSENT VIA OFFICIAL AUTHORIZATION
let skipInUserInterfaceLanguage = "⏩";
let nextInUserInterfaceLanguage = "⏩";
let hoverSoundForGlassyButtons;
let clickSoundForGlassyButtons;
// ASIDE elements are used as a new/other TYPE OF BUTTON
let theButtonForSkippingSpeechInputVocabularyTest = null;
window.addEventListener('DOMContentLoaded', function() {

  theButtonForSkippingSpeechInputVocabularyTest = document.getElementById('theTextInsideSkipNextButtonID');
  if (theButtonForSkippingSpeechInputVocabularyTest) {
    window.addEventListener('load', handleGiveUpButton, { once: true });
  }

}, { once: true });
// ---
function handleGiveUpButton() {
  theButtonForSkippingSpeechInputVocabularyTest.innerHTML = skipInUserInterfaceLanguage;
  const filePathForGiveUpButtonInnerHTML = "/user_interface/text/"+userInterfaceLanguage+"/0lesson-give_up_and_skip.txt"; // Seems to be OK without DOMContentLoaded
  const filePathForNextButtonInnerHTML = "/user_interface/text/"+userInterfaceLanguage+"/0lesson-continue_to_next.txt"; // Seems to be OK without DOMContentLoaded

  // Let “no web-speech browser” users quickly skip to the speech recognition cancellation
  // See each lesson’s own js to find how long the app will wait before displaying the give-up-skip button -> Find countdownForGiveUpSkipOrGoToNext
  fetch(filePathForGiveUpButtonInnerHTML,myHeaders).then(function(response){return response.text();}).then(function(contentOfTheTxtFile){ skipInUserInterfaceLanguage = contentOfTheTxtFile; updateButtonText(); }); // See js_for_every_single_html for headers
  fetch(filePathForNextButtonInnerHTML,myHeaders).then(function(response){return response.text();}).then(function(contentOfTheTxtFile){ nextInUserInterfaceLanguage = contentOfTheTxtFile; updateButtonText(); }); // See js_for_every_single_html for headers
  function updateButtonText() {
    if (parent.willUserTalkToSpeechRecognition) { // See js_for_different_browsers_and_devices
      theButtonForSkippingSpeechInputVocabularyTest.innerHTML = skipInUserInterfaceLanguage;
    } else {
      theButtonForSkippingSpeechInputVocabularyTest.innerHTML = nextInUserInterfaceLanguage;
    }
  }

  // ASIDE as BUTTON TYPE: Glassy button with glassy sounds
  const giveUpButtonASIDE = document.getElementsByTagName('ASIDE')[0];
  // Make sure js_for_all_iframed_lesson_htmls is listed before(above) this js file. Otherwise access deviceDetector after window load.
  if (deviceDetector.isMobile) {
    giveUpButtonASIDE.classList.add('glassmorphismOnMobiles'); // See css_for_all_iframed_lesson_htmls.css
    giveUpButtonASIDE.addEventListener("touchstart", giveUpButtonIsTouchedFunction, { once: true });
    // Design choice: no touchend function for this one
    // Glassy sound for touchstart
    // soundFileFormat exists in js_for_all_iframed_lesson_htmls where it is copied from the parent in js_for_different_browsers_and_devices
    clickSoundForGlassyButtons = new parent.Howl({  src: ["/user_interface/sounds/glass_button_click."+soundFileFormat]  }); // See js_for_all_iframed_lesson_htmls
  } else {
    giveUpButtonASIDE.classList.add('glassmorphismOnDesktops'); // See css_for_all_iframed_lesson_htmls.css
    giveUpButtonASIDE.addEventListener("mousedown", giveUpButtonIsClickedFunction, { once: true });
    giveUpButtonASIDE.addEventListener("mouseenter", mouseEnterGlassy);
    // Glassy sounds for hover and click
    hoverSoundForGlassyButtons = new parent.Howl({  src: ["/user_interface/sounds/glass_button_hover."+soundFileFormat]  }); // DESKTOPS ONLY! // See js_for_all_iframed_lesson_htmls to find soundFileFormat
    clickSoundForGlassyButtons = new parent.Howl({  src: ["/user_interface/sounds/glass_button_click."+soundFileFormat]  }); // See js_for_all_iframed_lesson_htmls to find soundFileFormat
  }
  // ---
  function mouseEnterGlassy() {  hoverSoundForGlassyButtons.play();  }

  // Click makes it explode. Touch makes it fade out
  function giveUpButtonIsTouchedFunction(event) { event.preventDefault(); event.stopPropagation();
    // Use event.stopPropagation instead of parent.preventTouchConflictWithTheSlidingNavMenu(giveUpButtonASIDE); // See js_for_the_sliding_navigation_menu
    giveUpButtonASIDE.classList.add('addThisToTheButtonWhenItIsTouchedOnMobiles'); //See css_for_all_iframed_lesson_htmls.css
    giveUpButtonIsEitherTouchedOrClickedFunction();
  }
  function giveUpButtonIsClickedFunction() {
    giveUpButtonASIDE.classList.add('addThisToTheButtonWhenItIsClickedOnDesktops'); //See css_for_all_iframed_lesson_htmls.css
    giveUpButtonASIDE.removeEventListener("mouseenter", mouseEnterGlassy);
    giveUpButtonIsEitherTouchedOrClickedFunction();
  }

  function giveUpButtonIsEitherTouchedOrClickedFunction() {
    clickSoundForGlassyButtons.play();
    userHasGivenUp = true; // Redeclared in each lesson's js » This makes success tone "not play" before proceeding to the next lesson.
    setTimeout(function () { stopListeningAndProceedToNext(); },100); // See each lesson's own js » Might do different things depending on the lesson
    // NOTE THAT typeof might become necessary to detect the existence of variables and functions
  }
}
// End of handleGiveUpButton
