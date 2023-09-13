"use strict";
// Code written by Manheart Earthman=B. A. Bilgekılınç Topraksoy=土本 智一勇夫剛志
// This file MAY NOT BE MODIFIED by unauthorized people = This file may be modified by AUTHORIZED PEOPLE ONLY

/*-----*/
// TYPE1: Generic info box » Watch how 1 of 2 possible texts is injected into the button

// Function that creates a div for [special case/unique feature/untranslatable thing] info NOTIFICATIONS
/* VARIABLES AND CONSTANTS*/
const putNotificationTxtIntoThisP1 = document.createElement("P");
const putNotificationTxtIntoThisP2 = document.createElement("P");
const okButtonToCloseInfoBoxType1 = document.createElement("DIV");
const okButtonToCloseInfoBoxType1AmidLesson = document.createElement("DIV");
// Put something like [OK], [Got it], [I see], [Oh really?], [Wow], [That's interesting] etc into the button.
let okTexts = "&#10004;|&#10004;"; // Default content of the OK box is a "tick ✔" mark to be shown in case fetch fails
okButtonToCloseInfoBoxType1.innerHTML = okTexts.split("|")[0];
okButtonToCloseInfoBoxType1AmidLesson.innerHTML = okTexts.split("|")[1];
const pathOfOkCloseTheBox = "/user_interface/text/"+userInterfaceLanguage+"/0lesson-ok_i_understand.txt";
fetch(pathOfOkCloseTheBox,myHeaders).then(function(response){return response.text();}).then(function(contentOfTheTxtFile){ okTexts=contentOfTheTxtFile; assignOKButtonText(); });
function assignOKButtonText() {
  if(Math.random()<0.5) { // Heads or tails
    okButtonToCloseInfoBoxType1.innerHTML = okTexts.split("|")[0];
    okButtonToCloseInfoBoxType1AmidLesson.innerHTML = okTexts.split("|")[1];
  } else {
    okButtonToCloseInfoBoxType1.innerHTML = okTexts.split("|")[1];
    okButtonToCloseInfoBoxType1AmidLesson.innerHTML = okTexts.split("|")[0];
  }
}
let popUpNotificationType1Sound;
let dismissNotificationType1Sound;
window.addEventListener("DOMContentLoaded",loadNotificationType1Sounds,{once:true});
function loadNotificationType1Sounds() {
  // soundFileFormat exists in js_for_all_iframed_lesson_htmls where it is copied from the parent in js_for_different_browsers_and_devices
  popUpNotificationType1Sound = new parent.Howl({  src: ["/user_interface/sounds/notification1_appear."+soundFileFormat]  }); // See js_for_all_iframed_lesson_htmls
  dismissNotificationType1Sound = new parent.Howl({  src: ["/user_interface/sounds/notification1_close."+soundFileFormat]  }); // See js_for_all_iframed_lesson_htmls
  /* DEPRECATE
  if (isApple) { // isApple is copied from the parent window by js_for_all_iframed_lesson_htmls
    popUpNotificationType1Sound = new parent.Howl({  src: ["/user_interface/sounds/notification1_appear.mp3"]  });
    dismissNotificationType1Sound = new parent.Howl({  src: ["/user_interface/sounds/notification1_close.mp3"]  });
  } else {
    popUpNotificationType1Sound = new parent.Howl({  src: ["/user_interface/sounds/notification1_appear.webm"]  });
    dismissNotificationType1Sound = new parent.Howl({  src: ["/user_interface/sounds/notification1_close.webm"]  });
  }
  */
}
window.addEventListener("beforeunload",unloadNotificationType1Sounds,{once:true});
function unloadNotificationType1Sounds() {
  popUpNotificationType1Sound.unload();
  dismissNotificationType1Sound.unload();
}

/*Info box with only one [OK] button*/
function createAndHandleInfoBoxType1BeforeLessonStarts() {
  popUpNotificationType1Sound.play();
  const notificationBoxContainer = document.createElement("DIV");
  notificationBoxContainer.classList.add("notificationBG"); // See css_for_info_boxes_in_lessons
  document.body.appendChild(notificationBoxContainer);
  const notificationBoxItself = document.createElement("DIV");
  notificationBoxItself.classList.add("notificationRoundedBox"); // See css_for_info_boxes_in_lessons
  notificationBoxContainer.appendChild(notificationBoxItself);

  notificationBoxItself.appendChild(putNotificationTxtIntoThisP1);

  okButtonToCloseInfoBoxType1.classList.add("okButtonUnderNotification"); // See css_for_info_boxes_in_lessons
  if (needLatinFonts) {
    okButtonToCloseInfoBoxType1.style.fontFamily = '"Oxanium SemiBold", sans-serif';
    notificationBoxItself.classList.add("textAlignJustifyLTR","latinLineHeightAndLetterSpacing"); // See css_for_every_single_html
    putNotificationTxtIntoThisP1.classList.add("latinLineHeightAndLetterSpacing"); // See css_for_every_single_html
  }
  if (needHitoicJapaneseFonts) {
    notificationBoxItself.classList.add("textAlignLeft","cjkLineHeightAndLetterSpacing"); // See css_for_every_single_html
    putNotificationTxtIntoThisP1.classList.add("toUseWBR_withCJK","cjkLineHeightAndLetterSpacing"); // See css_for_every_single_html
  }
  notificationBoxItself.appendChild(okButtonToCloseInfoBoxType1);


  if (deviceDetector.isMobile) { okButtonToCloseInfoBoxType1.addEventListener("touchstart",okButtonIsClickedToStartLesson); }
  else { okButtonToCloseInfoBoxType1.addEventListener("mousedown",okButtonIsClickedToStartLesson); }
  function okButtonIsClickedToStartLesson(event) { event.preventDefault(); event.stopPropagation();
    dismissNotificationType1Sound.play();
    notificationBoxContainer.classList.add("addThisToAButtonForPlayStationStyleClick"); // See css_for_every_single_html_css
    setTimeout(function () {     notificationBoxContainer.parentNode.removeChild(notificationBoxContainer);     },1000); // The animation completes in 600ms
    if (typeof startTheLesson === "function") {
      setTimeout(function () {     startTheLesson();     }, 1500);
    } else { parent.console.error("Error: createAndHandleInfoBoxType1BeforeLessonStarts() needs startTheLesson() function which doesn't exist???"); }
  }
}

function createAndHandleInfoBoxType1AmidLesson() {
  popUpNotificationType1Sound.play();
  const notificationBoxContainer2 = document.createElement("DIV");
  notificationBoxContainer2.classList.add("notificationBG"); // See css_for_info_boxes_in_lessons
  document.body.appendChild(notificationBoxContainer2);
  const notificationBoxItself2 = document.createElement("DIV");
  notificationBoxItself2.classList.add("notificationRoundedBox"); // See css_for_info_boxes_in_lessons
  notificationBoxContainer2.appendChild(notificationBoxItself2);

  notificationBoxItself2.appendChild(putNotificationTxtIntoThisP2);

  okButtonToCloseInfoBoxType1AmidLesson.classList.add("okButtonUnderNotification"); // See css_for_info_boxes_in_lessons
  if (needLatinFonts) {
    okButtonToCloseInfoBoxType1AmidLesson.style.fontFamily = '"Oxanium SemiBold", sans-serif';
    notificationBoxItself2.classList.add("textAlignJustifyLTR","latinLineHeightAndLetterSpacing"); // See css_for_every_single_html
    putNotificationTxtIntoThisP2.classList.add("latinLineHeightAndLetterSpacing"); // See css_for_every_single_html
  }
  if (needHitoicJapaneseFonts) {
    notificationBoxItself2.classList.add("textAlignLeft","cjkLineHeightAndLetterSpacing"); // See css_for_every_single_html
    putNotificationTxtIntoThisP2.classList.add("toUseWBR_withCJK","cjkLineHeightAndLetterSpacing"); // See css_for_every_single_html
  }
  notificationBoxItself2.appendChild(okButtonToCloseInfoBoxType1AmidLesson);

  if (deviceDetector.isMobile) { okButtonToCloseInfoBoxType1AmidLesson.addEventListener("touchstart",okButtonIsClickedToContinueLesson); }
  else { okButtonToCloseInfoBoxType1AmidLesson.addEventListener("mousedown",okButtonIsClickedToContinueLesson); }
  function okButtonIsClickedToContinueLesson(event) { event.preventDefault(); event.stopPropagation();
    dismissNotificationType1Sound.play();
    notificationBoxContainer2.classList.add("addThisToAButtonForPlayStationStyleClick"); // See css_for_every_single_html_css
    setTimeout(function () {     notificationBoxContainer2.parentNode.removeChild(notificationBoxContainer2);  },1000); // The animation completes in 600ms
    if (typeof continueLesson === "function") {
      setTimeout(function () {     continueLesson();     }, 1500);
    } else { parent.console.error("Error: createAndHandleInfoBoxType1AmidLesson() needs continueLesson() function which doesn't exist???"); }
  }
}

/*-----*/
// TYPE2 is the [choose input device] thingy.
/*-----*/

/*-----*/
// TYPE3 WAVESURFER.
// Function that creates a div box for pronunciation (wavesurfer) NOTIFICATIONS
/* VARIABLES AND CONSTANTS*/
const putVocabularyTxtIntoThisP1 = document.createElement("P"); const putVocabularyTxtIntoThisP1OUTRO = document.createElement("P");
const putVocabularyTxtIntoThisP2 = document.createElement("P"); const putVocabularyTxtIntoThisP2OUTRO = document.createElement("P");
let txtStringForP1 = null; let txtStringForP1OUTRO = null;
let txtStringForP2 = null; let txtStringForP2OUTRO = null;
function handleP1P2ActualText(receivedTxt) { // Called when fetch gets the file » See the lesson's own js
  txtStringForP1=receivedTxt.split("|")[0]; putVocabularyTxtIntoThisP1.innerHTML= txtStringForP1;
  txtStringForP2=receivedTxt.split("|")[1]; putVocabularyTxtIntoThisP2.innerHTML= txtStringForP2;
}
function handleP1P2ActualTextOUTRO(receivedTxt) { // Called when fetch gets the file » See the lesson's own js
  txtStringForP1OUTRO=receivedTxt.split("|")[0]; putVocabularyTxtIntoThisP1OUTRO.innerHTML= txtStringForP1OUTRO;
  txtStringForP2OUTRO=receivedTxt.split("|")[1]; putVocabularyTxtIntoThisP2OUTRO.innerHTML= txtStringForP2OUTRO;
}
const listenButtonOfTheVocabulary = document.createElement("DIV");
const startButtonToCloseTheVocabulary = document.createElement("DIV");
let listenButtonTxt, listenAgainButtonTxt, startButtonTxt, nextButtonTxt; // [Next] button replaces [Start] button if outro is enabled by the second parameter
const wavesurferButton1Button2Path = "/user_interface/text/"+userInterfaceLanguage+"/0lesson-vocabulary_button1_button2.txt";
fetch(wavesurferButton1Button2Path,myHeaders).then(function(response){return response.text();}).then(function(contentOfTheTxtFile){
  listenButtonTxt = contentOfTheTxtFile.split("|")[0];
  listenAgainButtonTxt = contentOfTheTxtFile.split("|")[1];
  startButtonTxt = contentOfTheTxtFile.split("|")[2];
  nextButtonTxt = contentOfTheTxtFile.split("|")[3];
});
// -
let popUpVocabularySound;
let dismissVocabularySound;
window.addEventListener("DOMContentLoaded",loadVocabularyBoxButtonSounds,{once:true});
function loadVocabularyBoxButtonSounds() {
  // soundFileFormat exists in js_for_all_iframed_lesson_htmls where it is copied from the parent in js_for_different_browsers_and_devices
  popUpVocabularySound = new parent.Howl({  src: ["/user_interface/sounds/notification3_appear."+soundFileFormat]  }); // See js_for_all_iframed_lesson_htmls
  dismissVocabularySound = new parent.Howl({  src: ["/user_interface/sounds/notification3_close."+soundFileFormat]  }); // See js_for_all_iframed_lesson_htmls
  /* DEPRECATE
  if (isApple) {
    popUpVocabularySound = new parent.Howl({  src: ["/user_interface/sounds/notification3_appear.mp3"]  });
    dismissVocabularySound = new parent.Howl({  src: ["/user_interface/sounds/notification3_close.mp3"]  });
  } else {
    popUpVocabularySound = new parent.Howl({  src: ["/user_interface/sounds/notification3_appear.webm"]  });
    dismissVocabularySound = new parent.Howl({  src: ["/user_interface/sounds/notification3_close.webm"]  });
  }
  */
}
window.addEventListener("beforeunload",unloadVocabularyBoxButtonSounds,{once:true});
function unloadVocabularyBoxButtonSounds() {
  popUpVocabularySound.unload();
  dismissVocabularySound.unload();
}

/*FUNCTION DECLARATION*/
function createAndHandleListenManyTimesBox(filePathOfTheAudio,isLessonOutro) {
  popUpVocabularySound.play();
  const vocabularyBoxContainer = document.createElement("DIV"); // Maybe a dark theme will look nice
  vocabularyBoxContainer.classList.add("vocabularyBG"); // See css_for_info_boxes_in_lessons
  document.body.appendChild(vocabularyBoxContainer);
  const vocabularyBoxItself = document.createElement("DIV");
  vocabularyBoxItself.classList.add("vocabularyRoundedBox"); // See css_for_info_boxes_in_lessons
  if (needLatinFonts) {
    vocabularyBoxItself.classList.add("textAlignJustifyLTR","latinLineHeightAndLetterSpacing"); // See css_for_every_single_html
    putVocabularyTxtIntoThisP1.classList.add("latinLineHeightAndLetterSpacing"); // See css_for_every_single_html
    putVocabularyTxtIntoThisP2.classList.add("latinLineHeightAndLetterSpacing"); // See css_for_every_single_html
    putVocabularyTxtIntoThisP1OUTRO.classList.add("latinLineHeightAndLetterSpacing");
    putVocabularyTxtIntoThisP2OUTRO.classList.add("latinLineHeightAndLetterSpacing");
  }
  if (needHitoicJapaneseFonts) {
    vocabularyBoxItself.classList.add("textAlignLeft","cjkLineHeightAndLetterSpacing"); // See css_for_every_single_html
    putVocabularyTxtIntoThisP1.classList.add("toUseWBR_withCJK","cjkLineHeightAndLetterSpacing"); // See css_for_every_single_html
    putVocabularyTxtIntoThisP2.classList.add("toUseWBR_withCJK","cjkLineHeightAndLetterSpacing"); // See css_for_every_single_html
    putVocabularyTxtIntoThisP1OUTRO.classList.add("toUseWBR_withCJK","cjkLineHeightAndLetterSpacing");
    putVocabularyTxtIntoThisP2OUTRO.classList.add("toUseWBR_withCJK","cjkLineHeightAndLetterSpacing");
  }
  vocabularyBoxContainer.appendChild(vocabularyBoxItself);
  //
  if (!txtStringForP1) { // If download has failed or not finished yet
    putVocabularyTxtIntoThisP1.innerHTML="📄"; //📄
    putVocabularyTxtIntoThisP2.innerHTML="⏳"; //⏳
  }
  if (!txtStringForP1OUTRO) { // If download has failed or not finished yet
    putVocabularyTxtIntoThisP1OUTRO.innerHTML="📄"; //📄
    putVocabularyTxtIntoThisP2OUTRO.innerHTML="⏳"; //⏳
  }

  // APPEND txt1
  if (!isLessonOutro) {    vocabularyBoxItself.appendChild(putVocabularyTxtIntoThisP1);  }
  else {    vocabularyBoxItself.appendChild(putVocabularyTxtIntoThisP1OUTRO);  }

  // Wavesurfer
  const wavesurferContainer = document.createElement("DIV");
  wavesurferContainer.id = "waveform";
  wavesurferContainer.classList.add("vocabularyWavesurfer");
  vocabularyBoxItself.appendChild(wavesurferContainer);
  // -
  let wavesurferIntro,wavesurferOutro;
  if (!isLessonOutro) {
    wavesurferIntro = WaveSurfer.create({ container: '#waveform', waveColor: 'black', progressColor: '#daecfa', barWidth:3, height:60, barMinHeight:2, barGap:2, responsive:true, cursorWidth:0, hideScrollbar:true   });
    wavesurferIntro.load(filePathOfTheAudio);
  } else {
    wavesurferOutro = WaveSurfer.create({ container: '#waveform', waveColor: 'black', progressColor: '#daecfa', barWidth:3, height:60, barMinHeight:2, barGap:2, responsive:true, cursorWidth:0, hideScrollbar:true   });
    wavesurferOutro.load(filePathOfTheAudio);
  }


  // APPEND txt2
  if (!isLessonOutro) {    vocabularyBoxItself.appendChild(putVocabularyTxtIntoThisP2);  }
  else {    vocabularyBoxItself.appendChild(putVocabularyTxtIntoThisP2OUTRO);  }
  // Try to fix Safari and Firefox as they ignore text align justify although the container div has it in its class
  // putVocabularyTxtIntoThisP1.style.textAlign = "justify"; putVocabularyTxtIntoThisP2.style.textAlign = "justify"; // DIDN'T WORK!

  // buttonsUnderWavesurfer
  listenButtonOfTheVocabulary.classList.add("buttonsUnderWavesurfer");  listenButtonOfTheVocabulary.innerHTML = "&#128259; &#9658;"; // Default content is a "refresh 🔃 + play ►" mark
  startButtonToCloseTheVocabulary.classList.add("buttonsUnderWavesurfer");  startButtonToCloseTheVocabulary.innerHTML = "&#127918;"; // Default content is a "gamepad 🎮" mark
  if (listenButtonTxt) { // If fetch has already finished downloading the txt file
    listenButtonOfTheVocabulary.innerHTML = listenButtonTxt;
    if (!isLessonOutro) { startButtonToCloseTheVocabulary.innerHTML = startButtonTxt; }
    else { startButtonToCloseTheVocabulary.innerHTML = nextButtonTxt; }
  } else { // Restart fetch but this time update buttonTxts as soon as the file is ready
    fetch(wavesurferButton1Button2Path,myHeaders).then(function(response){return response.text();}).then(function(contentOfTheTxtFile){
      listenButtonTxt = contentOfTheTxtFile.split("|")[0]; listenButtonOfTheVocabulary.innerHTML = listenButtonTxt;
      listenAgainButtonTxt = contentOfTheTxtFile.split("|")[1];
      if (!isLessonOutro) { startButtonTxt = contentOfTheTxtFile.split("|")[2]; startButtonToCloseTheVocabulary.innerHTML = startButtonTxt; }
      else { nextButtonTxt = contentOfTheTxtFile.split("|")[3]; startButtonToCloseTheVocabulary.innerHTML = nextButtonTxt; }
    });
  }
  const twoButtonsContainer = document.createElement("DIV"); twoButtonsContainer.classList.add("vocabularyButtonsContainer");
  twoButtonsContainer.appendChild(listenButtonOfTheVocabulary);
  vocabularyBoxItself.appendChild(twoButtonsContainer);
  // Listen button
  if (deviceDetector.isMobile) {   listenButtonOfTheVocabulary.addEventListener("touchstart",playButtonF);   }
  else {   listenButtonOfTheVocabulary.addEventListener("mousedown",playButtonF);
    parent.window.addEventListener("keydown",checkIfSpaceKeyWasPressed); window.addEventListener("keydown",checkIfSpaceKeyWasPressed);
    parent.window.addEventListener("keyup",checkIfSpaceKeyWasReleased);  window.addEventListener("keyup",checkIfSpaceKeyWasReleased);
  }
  let clickOrTouchCount=1;
  function playButtonF(event) { event.preventDefault(); event.stopPropagation();
    // Use stopPropagation instead of parent.preventTouchConflictWithTheSlidingNavMenu(listenButtonOfTheVocabulary); // Exists in js_for_the_sliding_navigation_menu
    if (!isLessonOutro) {  wavesurferIntro.setVolume(parent.Howler.volume()); wavesurferIntro.play();  }
    else {  wavesurferOutro.setVolume(parent.Howler.volume()); wavesurferOutro.play();  }
    // -
    if (clickOrTouchCount==1) {
      if (listenAgainButtonTxt) { listenButtonOfTheVocabulary.innerHTML = listenAgainButtonTxt; } // Change button innerHTML from [Listen] to [Listen again]
    }
    if (clickOrTouchCount==2) {
      startButtonToCloseTheVocabulary.classList.add("startButtonUnderWavesurfer"); twoButtonsContainer.appendChild(startButtonToCloseTheVocabulary); // Reveal the [Start] button
    }
    clickOrTouchCount++;
  }
  let spaceKeyIsBeingHeldDown = false;
  function checkIfSpaceKeyWasPressed(event) { event.preventDefault(); // Can't be too safe
    if (!spaceKeyIsBeingHeldDown) {
      if (event.key == " " || event.code == "Space") {
        spaceKeyIsBeingHeldDown = true;
        // -
        if (!isLessonOutro) {  wavesurferIntro.setVolume(parent.Howler.volume()); wavesurferIntro.play();  }
        else {  wavesurferOutro.setVolume(parent.Howler.volume()); wavesurferOutro.play();  }
        // -
        if (clickOrTouchCount==1) {
          if (listenAgainButtonTxt) { listenButtonOfTheVocabulary.innerHTML = listenAgainButtonTxt; } // Change button innerHTML from [Listen] to [Listen again]
        }
        if (clickOrTouchCount==2) {
          startButtonToCloseTheVocabulary.classList.add("startButtonUnderWavesurfer"); twoButtonsContainer.appendChild(startButtonToCloseTheVocabulary); // Reveal the [Start] button
        }
        clickOrTouchCount++;
      }
    }
  }
  function checkIfSpaceKeyWasReleased(event) { event.preventDefault(); // Can't be too safe
    if (spaceKeyIsBeingHeldDown) {
      if (event.key == " " || event.code == "Space") {
        spaceKeyIsBeingHeldDown = false;
      }
    }
  }
  // Start button
  if (deviceDetector.isMobile) {   startButtonToCloseTheVocabulary.addEventListener("touchstart",startButtonF);   }
  else {   startButtonToCloseTheVocabulary.addEventListener("mousedown",startButtonF);   }
  let lastPointerX, lastPointerY;
  function startButtonF(event) { event.preventDefault(); event.stopPropagation();
    // Use stopPropagation instead of parent.preventTouchConflictWithTheSlidingNavMenu(startButtonToCloseTheVocabulary); // Exists in js_for_the_sliding_navigation_menu
    dismissVocabularySound.play();
    vocabularyBoxItself.style.animationName = "vocabularyWavesurferDisappears";
    vocabularyBoxContainer.style.animationName = "vocabularyWavesurferDisappearsBG";
    setTimeout(function(){
      // DEPRECATED document.body.removeChild(vocabularyBoxContainer);
      startButtonToCloseTheVocabulary.remove();
      listenButtonOfTheVocabulary.remove();
      twoButtonsContainer.remove();
      if (vocabularyBoxItself.contains(putVocabularyTxtIntoThisP2)) { putVocabularyTxtIntoThisP2.remove(); }
      if (vocabularyBoxItself.contains(putVocabularyTxtIntoThisP2OUTRO)) { putVocabularyTxtIntoThisP2OUTRO.remove(); }
      wavesurferContainer.remove();
      if (vocabularyBoxItself.contains(putVocabularyTxtIntoThisP1)) { putVocabularyTxtIntoThisP1.remove(); }
      if (vocabularyBoxItself.contains(putVocabularyTxtIntoThisP1OUTRO)) { putVocabularyTxtIntoThisP1OUTRO.remove(); }
      vocabularyBoxItself.remove();
      vocabularyBoxContainer.remove();
    },501);

    if (deviceDetector.device == "desktop") {
      lastPointerX = event.clientX;
      lastPointerY = event.clientY;
    } else {
      lastPointerX = event.touches[0].clientX;
      lastPointerY = event.touches[0].clientY;
    }
    // ---
    if (!isLessonOutro) { // CASE: Lesson intro
      if (typeof vocabularyBoxIsClosed === "function") {
        setTimeout(function () {     vocabularyBoxIsClosed(lastPointerX,lastPointerY);     }, 500);
      } else { parent.console.error("Error: vocabularyBoxIsClosed() function doesn't exist???"); }
    } else { // CASE: Lesson outro
      if (typeof vocabularyBoxIsClosed_LESSON_OUTRO === "function") {
        setTimeout(function () {     vocabularyBoxIsClosed_LESSON_OUTRO(lastPointerX,lastPointerY);     }, 500);
      } else { parent.console.error("Error: vocabularyBoxIsClosed_LESSON_OUTRO() function doesn't exist???"); }
    }

    // -
    listenButtonOfTheVocabulary.removeEventListener("touchstart",playButtonF);
    listenButtonOfTheVocabulary.removeEventListener("mousedown",playButtonF);
    startButtonToCloseTheVocabulary.removeEventListener("touchstart",startButtonF);
    startButtonToCloseTheVocabulary.removeEventListener("mousedown",startButtonF);
    parent.window.removeEventListener("keydown",checkIfSpaceKeyWasPressed); window.removeEventListener("keydown",checkIfSpaceKeyWasPressed);
    parent.window.removeEventListener("keyup",checkIfSpaceKeyWasReleased);  window.removeEventListener("keyup",checkIfSpaceKeyWasReleased);
  } // END OF startButtonF
}
// END OF createAndHandleListenManyTimesBox DEFINITION
