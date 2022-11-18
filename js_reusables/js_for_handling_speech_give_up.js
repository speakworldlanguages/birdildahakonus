"use strict";
// Code written by Manheart Earthman=B. A. Bilgekılınç Topraksoy=土本 智一勇夫剛志
// May be modified by AUTHORIZED PEOPLE ONLY

// ASIDE elements are used as a new/other TYPE OF BUTTON
window.addEventListener('DOMContentLoaded', function(){

  const theButtonForSkippingSpeechInputVocabularyTest = document.getElementById('theTextInsideSkipNextButtonID');
  const filePathForGiveUpButtonInnerHTML = "/user_interface/text/"+userInterfaceLanguage+"/0-give_up_and_skip.txt"; // Seems to be OK without DOMContentLoaded
  const filePathForNextButtonInnerHTML = "/user_interface/text/"+userInterfaceLanguage+"/0-continue_to_next.txt"; // Seems to be OK without DOMContentLoaded

  // Let “no web-speech browser” users quickly skip to the speech recognition cancellation
  // See each lesson’s own js to find how long the app will wait before displaying the give-up-skip button -> Find countdownForGiveUpSkipOrGoToNext
  if (parent.willUserTalkToSpeechRecognition) { // See js_for_different_browsers_and_devices
    fetch(filePathForGiveUpButtonInnerHTML,myHeaders).then(function(response){return response.text();}).then(function(contentOfTheTxtFile){ theButtonForSkippingSpeechInputVocabularyTest.innerHTML = contentOfTheTxtFile; }); // See js_for_every_single_html for headers
  } else {
    fetch(filePathForNextButtonInnerHTML,myHeaders).then(function(response){return response.text();}).then(function(contentOfTheTxtFile){ theButtonForSkippingSpeechInputVocabularyTest.innerHTML = contentOfTheTxtFile; }); // See js_for_every_single_html for headers
  }

  // BUTTON TYPE 2: Glassy button with glassy sounds
  const giveUpButtonASIDE = document.getElementsByTagName('ASIDE')[0];
  if (deviceDetector.isMobile) {
    giveUpButtonASIDE.classList.add('glassmorphismOnMobiles'); // See css_for_all_iframed_lesson_htmls.css
    giveUpButtonASIDE.addEventListener("touchstart", giveUpButtonIsTouchedFunction, { once: true });
  } else {
    giveUpButtonASIDE.classList.add('glassmorphismOnDesktops'); // See css_for_all_iframed_lesson_htmls.css
    giveUpButtonASIDE.addEventListener("mousedown", giveUpButtonIsClickedFunction, { once: true });
    giveUpButtonASIDE.addEventListener("mouseenter", mouseEnterGlassy);
  }

  // Glassy sounds for hover and click
  const hoverSoundForGlassyButtons = new parent.Howl({  src: ["/user_interface/sounds/glass_button_hover.webm"]  }); // DESKTOPS ONLY! Could add code to disable it on mobile but guess it just works when left like this.
  const clickSoundForGlassyButtons = new parent.Howl({  src: ["/user_interface/sounds/glass_button_click.webm"]  });

  function mouseEnterGlassy() {
    hoverSoundForGlassyButtons.play();
  }

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
  }

}, { once: true });
