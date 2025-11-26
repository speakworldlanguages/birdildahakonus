"use strict";
// Code written by Manheart Earthman=B. A. Bilgekılınç Topraksoy=土本 智一勇夫剛志
// This file MAY NOT BE MODIFIED WITHOUT CONSENT i.e. OFFICIAL AUTHORIZATION

/*-----*/
// TYPE1: Generic info box » Watch how 1 of 2 possible texts is injected into the button

// Function that creates a div for [special case/unique feature/untranslatable thing] info NOTIFICATIONS
/* VARIABLES AND CONSTANTS*/
const putNotificationTxtIntoThisP1 = document.createElement("P");
const putNotificationTxtIntoThisP2 = document.createElement("P");
const putNotificationTxtIntoThisP3 = document.createElement("P");
const okButtonToCloseInfoBoxType1 = document.createElement("DIV");
const okButtonToCloseInfoBoxType1AmidLesson = document.createElement("DIV");
const okButtonToCloseInfoBoxType1BeforeSpeechRecognition = document.createElement("DIV");
// Put something like [OK], [Got it], [I see], [Oh really?], [Wow], [That's interesting] etc into the button.
let okTexts = "&#10004;|&#10004;"; // Default content of the OK box is a "tick ✔" mark to be shown in case fetch fails
okButtonToCloseInfoBoxType1.innerHTML = okTexts.split("|")[0];
okButtonToCloseInfoBoxType1AmidLesson.innerHTML = okTexts.split("|")[0];
okButtonToCloseInfoBoxType1BeforeSpeechRecognition.innerHTML = okTexts.split("|")[0];
const pathOfOkCloseTheBox = "/user_interface/text/"+userInterfaceLanguage+"/0lesson-ok_i_understand.txt";
fetch(pathOfOkCloseTheBox,myHeaders).then(function(response){return response.text();}).then(function(contentOfTheTxtFile){ okTexts=contentOfTheTxtFile; assignOKButtonText(); });
function assignOKButtonText() {
  if(Math.random()<0.5) { // Heads or tails
    okButtonToCloseInfoBoxType1.innerHTML = okTexts.split("|")[0];
    okButtonToCloseInfoBoxType1AmidLesson.innerHTML = okTexts.split("|")[1];
    okButtonToCloseInfoBoxType1BeforeSpeechRecognition.innerHTML = okTexts.split("|")[0];
  } else {
    okButtonToCloseInfoBoxType1.innerHTML = okTexts.split("|")[1];
    okButtonToCloseInfoBoxType1AmidLesson.innerHTML = okTexts.split("|")[0];
    okButtonToCloseInfoBoxType1BeforeSpeechRecognition.innerHTML = okTexts.split("|")[0];
  }
}
let popUpNotificationType1Sound;
let dismissNotificationType1Sound;
window.addEventListener("DOMContentLoaded",loadNotificationType1Sounds,{once:true});
function loadNotificationType1Sounds() {
  // soundFileFormat exists in js_for_all_iframed_lesson_htmls where it is copied from the parent in js_for_different_browsers_and_devices
  popUpNotificationType1Sound = new parent.Howl({  src: ["/user_interface/sounds/notification1_appear."+soundFileFormat]  });
  dismissNotificationType1Sound = new parent.Howl({  src: ["/user_interface/sounds/notification1_close."+soundFileFormat]  });
  // NO BIG DEAL IF: These sounds are loaded even if they are not used in the lesson
}
window.addEventListener("beforeunload",unloadNotificationType1Sounds,{once:true});
function unloadNotificationType1Sounds() {
  popUpNotificationType1Sound.unload();
  dismissNotificationType1Sound.unload();
}

/*Info box with only one [OK] button to show at the beginning of the lesson*/
function createAndHandleInfoBoxType1BeforeLessonStarts() {
  popUpNotificationType1Sound.play();
  const notificationBoxContainer1 = document.createElement("DIV");
  notificationBoxContainer1.classList.add("notificationBG"); // See css_for_info_boxes_in_lessons
  document.body.appendChild(notificationBoxContainer1);
  const notificationBoxItself = document.createElement("DIV");
  notificationBoxItself.classList.add("notificationRoundedBox"); // See css_for_info_boxes_in_lessons
  notificationBoxContainer1.appendChild(notificationBoxItself);

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
    notificationBoxContainer1.classList.add("addThisToAButtonForPlayStationStyleClick"); // See css_for_every_single_html_css
    setTimeout(function () {     notificationBoxContainer1.parentNode.removeChild(notificationBoxContainer1);     },1000); // The animation completes in 600ms
    if (typeof startTheLesson === "function") {
      setTimeout(function () {     startTheLesson();     }, 1500);
    } else { parent.console.error("Error: createAndHandleInfoBoxType1BeforeLessonStarts() needs startTheLesson() function which doesn't exist???"); }
  }
}

/*Info box with only one [OK] button to show in the middle or at the end of the lesson*/
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

/*Info box with only one [OK] button to show just before speech recognition*/
function createAndHandleInfoBoxType1JustBeforeSpeechRecognition() {
  popUpNotificationType1Sound.play();
  const notificationBoxContainer3 = document.createElement("DIV");
  notificationBoxContainer3.classList.add("notificationBG"); // See css_for_info_boxes_in_lessons
  document.body.appendChild(notificationBoxContainer3);
  const notificationBoxItself3 = document.createElement("DIV");
  notificationBoxItself3.classList.add("notificationRoundedBox"); // See css_for_info_boxes_in_lessons
  notificationBoxContainer3.appendChild(notificationBoxItself3);

  notificationBoxItself3.appendChild(putNotificationTxtIntoThisP3);

  okButtonToCloseInfoBoxType1BeforeSpeechRecognition.classList.add("okButtonUnderNotification"); // See css_for_info_boxes_in_lessons
  if (needLatinFonts) {
    okButtonToCloseInfoBoxType1BeforeSpeechRecognition.style.fontFamily = '"Oxanium SemiBold", sans-serif';
    notificationBoxItself3.classList.add("textAlignJustifyLTR","latinLineHeightAndLetterSpacing"); // See css_for_every_single_html
    putNotificationTxtIntoThisP3.classList.add("latinLineHeightAndLetterSpacing"); // See css_for_every_single_html
  }
  if (needHitoicJapaneseFonts) {
    notificationBoxItself3.classList.add("textAlignLeft","cjkLineHeightAndLetterSpacing"); // See css_for_every_single_html
    putNotificationTxtIntoThisP3.classList.add("toUseWBR_withCJK","cjkLineHeightAndLetterSpacing"); // See css_for_every_single_html
  }
  notificationBoxItself3.appendChild(okButtonToCloseInfoBoxType1BeforeSpeechRecognition);

  if (deviceDetector.isMobile) { okButtonToCloseInfoBoxType1BeforeSpeechRecognition.addEventListener("touchstart",okButtonIsClickedToContinueLesson); }
  else { okButtonToCloseInfoBoxType1BeforeSpeechRecognition.addEventListener("mousedown",okButtonIsClickedToContinueLesson); }
  function okButtonIsClickedToContinueLesson(event) { event.preventDefault(); event.stopPropagation();
    dismissNotificationType1Sound.play();
    notificationBoxContainer3.classList.add("addThisToAButtonForPlayStationStyleClick"); // See css_for_every_single_html_css
    setTimeout(function () {     notificationBoxContainer3.parentNode.removeChild(notificationBoxContainer3);  },1000); // The animation completes in 600ms
    if (typeof display_nowItsYourTurn_animation === "function") {
      setTimeout(function () {     display_nowItsYourTurn_animation();     }, 1500);
    } else { parent.console.error("Error: createAndHandleInfoBoxType1JustBeforeSpeechRecognition() needs display_nowItsYourTurn_animation() function which doesn't exist???"); }
  }
}

/*-----*/
// TYPE2 used to be the deprecated [choose input device] thingy.
/*-----*/

/*-----*/
// TYPE3 LISTEN-MANY-TIMES-BOX.
// Function that creates a div box for pronunciation (Hitonokaochan; formerly wavesurfer) NOTIFICATIONS
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
const listenBoxButton1Button2Path = "/user_interface/text/"+userInterfaceLanguage+"/0lesson-vocabulary_button1_button2.txt";
let primaryFetchIsStillTryingToGetTheFile = true;
fetch(listenBoxButton1Button2Path,myHeaders).then(function(response){return response.text();}).then(function(contentOfTheTxtFile){
  listenButtonTxt = contentOfTheTxtFile.split("|")[0];
  listenAgainButtonTxt = contentOfTheTxtFile.split("|")[1];
  startButtonTxt = contentOfTheTxtFile.split("|")[2];
  nextButtonTxt = contentOfTheTxtFile.split("|")[3];
}).finally(  ()=>{ primaryFetchIsStillTryingToGetTheFile = false; }  );
// -
let popUpVocabularySound;
let dismissVocabularySound;
window.addEventListener("DOMContentLoaded",loadVocabularyBoxButtonSounds,{once:true});
function loadVocabularyBoxButtonSounds() {
  // soundFileFormat exists in js_for_all_iframed_lesson_htmls where it is copied from the parent in js_for_different_browsers_and_devices
  popUpVocabularySound = new parent.Howl({  src: ["/user_interface/sounds/notification3_appear."+soundFileFormat]  });
  dismissVocabularySound = new parent.Howl({  src: ["/user_interface/sounds/notification3_close."+soundFileFormat]  });
  // NO BIG DEAL IF: These sounds are loaded even if they are not used in the lesson
}
window.addEventListener("beforeunload",unloadVocabularyBoxButtonSounds,{once:true});
function unloadVocabularyBoxButtonSounds() {
  popUpVocabularySound.unload();
  dismissVocabularySound.unload();
}

/*FUNCTION DECLARATION*/
// IN THE PAST WE SAID: IN THE FUTURE WE WILL HOPEFULLY USE RHUBARB LIP-SYNC TO PLAY AN ANIMATED MOUTH ILLUSTRATION ALONG WITH WAVESURFER
// AND NOW THIS IS APRIL 2024: We have deprecated wavesurfer entirely and have replaced it with Hitonokaochan
// See » https://github.com/DanielSWolf/rhubarb-lip-sync

function createAndHandleListenManyTimesBox(pathToTheAudio1,pathToJSON1,pathToTheAudio2,pathToJSON2,pathToTheAudio3,pathToJSON3,isLessonOutro) {
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

  // -
  let introVocabulary1,introVocabulary2,introVocabulary3; let introSound1IsReady = false; let introSound2IsReady = false; let introSound3IsReady = false; let introSoundIsPlaying = false;
  let outroVocabulary1,outroVocabulary2,outroVocabulary3; let outroSound1IsReady = false; let outroSound2IsReady = false; let outroSound3IsReady = false; let outroSoundIsPlaying = false;
  if (!isLessonOutro) {
    introVocabulary1 = new parent.Howl({  src: [pathToTheAudio1]  });
    introVocabulary1.once('load', function(){  introSound1IsReady = true; getJSON(pathToJSON1,1);  });
    introVocabulary1.on('end', function(){  introSoundIsPlaying = false; pseudoReactivationOfPlayButton();  });

    introVocabulary2 = new parent.Howl({  src: [pathToTheAudio2]  });
    introVocabulary2.once('load', function(){  introSound2IsReady = true; getJSON(pathToJSON2,2);  });
    introVocabulary2.on('end', function(){  introSoundIsPlaying = false; pseudoReactivationOfPlayButton();  });

    introVocabulary3 = new parent.Howl({  src: [pathToTheAudio3]  });
    introVocabulary3.once('load', function(){  introSound3IsReady = true; getJSON(pathToJSON3,3);  });
    introVocabulary3.on('end', function(){  introSoundIsPlaying = false; pseudoReactivationOfPlayButton();  });
  }
  else {
    outroVocabulary1 = new parent.Howl({  src: [pathToTheAudio1]  });
    outroVocabulary1.once('load', function(){  outroSound1IsReady = true; getJSON(pathToJSON1,1);  });
    outroVocabulary1.on('end', function(){  outroSoundIsPlaying = false; pseudoReactivationOfPlayButton();  });

    outroVocabulary2 = new parent.Howl({  src: [pathToTheAudio2]  });
    outroVocabulary2.once('load', function(){  outroSound2IsReady = true; getJSON(pathToJSON2,2);  });
    outroVocabulary2.on('end', function(){  outroSoundIsPlaying = false; pseudoReactivationOfPlayButton();  });

    outroVocabulary3 = new parent.Howl({  src: [pathToTheAudio3]  });
    outroVocabulary3.once('load', function(){  outroSound3IsReady = true; getJSON(pathToJSON3,3);  });
    outroVocabulary3.on('end', function(){  outroSoundIsPlaying = false; pseudoReactivationOfPlayButton();  });
  }
  // -
  window.addEventListener("beforeunload",unloadListenBoxVocabularySounds,{once:true});
  function unloadListenBoxVocabularySounds() {
    if (introSound1IsReady) { introVocabulary1.unload(); } if (introSound2IsReady) { introVocabulary2.unload(); } if (introSound3IsReady) { introVocabulary3.unload(); }
    if (outroSound1IsReady) { outroVocabulary1.unload(); } if (outroSound2IsReady) { outroVocabulary2.unload(); } if (outroSound3IsReady) { outroVocabulary3.unload(); }
  }
  // DEPRECATE: Get json file that is supposed to be named exactly the same as the audio file
  // Deprecate: const theFileExtensionIsRemoved_1 = pathToTheAudio1.split(".")[0];
  // Deprecate: const jsonFilePath_1 = theFileExtensionIsRemoved_1 + ".json"; // Cached by 112.js 114.js etc in js_for_cache_handling
  let lipSyncJSON_1 = null; let lipSyncJSON_2 = null; let lipSyncJSON_3 = null;
  //INSTEAD OF STARTING HIDDEN let's show an animated «loading» text
  pseudoDeactivationOfPlayButton(); //Same as » listenButtonOfTheVocabulary.style.opacity = "0.4"; // Low opacity until fetch gets json // Here used to be listenButtonOfTheVocabulary.style.visibility = "hidden"; // Its class is added down below
  // NOTE THAT: Nothing will happen if user clicks|touches the button before the sounds are loaded because the playintroVocabulary functions will check if sound is loaded before trying to play
  let to1,to2,to3,to4,to5,to6;
  function getJSON(jsonFilePath,whichOne) { // Will fire only if the sound has successfully loaded
    fetch(jsonFilePath).then(response => {  if (!response.ok) { throw new Error('Network response was not ok'); }  return response.json();  })
    .then(data => {
      switch (whichOne) {
        case 1: lipSyncJSON_1 = data; break;
        case 2: lipSyncJSON_2 = data; break;
        case 3: lipSyncJSON_3 = data; break;
        default:
      }
    }).catch(error => { parent.console.error('Fetch error:', error); parent.console.warn("Was trying to get:\n" + jsonFilePath); })
    .finally(()=>{ // Even if json fails the app will proceed and play sounds without lip sync animation
      if (introSound1IsReady || outroSound1IsReady) {
        //stop the loading animation by clearing all timeouts
        clearTimeout(to1); clearTimeout(to2); clearTimeout(to3); clearTimeout(to4); clearTimeout(to5); clearTimeout(to6);
        // Put "Listen" text into the button by overwriting the last state of the loading animation
        listenButtonOfTheVocabulary.innerHTML = listenButtonTxt;
        // Before the implementation of animated text, here used to be » listenButtonOfTheVocabulary.style.visibility = "visible";
        pseudoReactivationOfPlayButton(); // Same as » listenButtonOfTheVocabulary.style.opacity = "1";
      } else {
        // THIS IS IMPOSSIBLE since get getJSON will never fire without sound being fully loaded by Howler first
      }
    });
  }

  // --
  const hitonokaochanContainer = document.createElement("DIV");
  hitonokaochanContainer.classList.add("listenBoxHitonokaochan");
  const hitonokaochanA = document.createElement("IMG"); hitonokaochanA.src = "/user_interface/images/rhubarb_lip_sync/a.webp"; hitonokaochanA.style.display = "none"; hitonokaochanContainer.appendChild(hitonokaochanA);
  const hitonokaochanB = document.createElement("IMG"); hitonokaochanB.src = "/user_interface/images/rhubarb_lip_sync/b.webp"; hitonokaochanB.style.display = "none"; hitonokaochanContainer.appendChild(hitonokaochanB);
  const hitonokaochanC = document.createElement("IMG"); hitonokaochanC.src = "/user_interface/images/rhubarb_lip_sync/c.webp"; hitonokaochanC.style.display = "none"; hitonokaochanContainer.appendChild(hitonokaochanC);
  const hitonokaochanD = document.createElement("IMG"); hitonokaochanD.src = "/user_interface/images/rhubarb_lip_sync/d.webp"; hitonokaochanD.style.display = "none"; hitonokaochanContainer.appendChild(hitonokaochanD);
  const hitonokaochanE = document.createElement("IMG"); hitonokaochanE.src = "/user_interface/images/rhubarb_lip_sync/e.webp"; hitonokaochanE.style.display = "none"; hitonokaochanContainer.appendChild(hitonokaochanE);
  const hitonokaochanF = document.createElement("IMG"); hitonokaochanF.src = "/user_interface/images/rhubarb_lip_sync/f.webp"; hitonokaochanF.style.display = "none"; hitonokaochanContainer.appendChild(hitonokaochanF);
  const hitonokaochanG = document.createElement("IMG"); hitonokaochanG.src = "/user_interface/images/rhubarb_lip_sync/g.webp"; hitonokaochanG.style.display = "none"; hitonokaochanContainer.appendChild(hitonokaochanG);
  const hitonokaochanH = document.createElement("IMG"); hitonokaochanH.src = "/user_interface/images/rhubarb_lip_sync/h.webp"; hitonokaochanH.style.display = "none"; hitonokaochanContainer.appendChild(hitonokaochanH);
  const hitonokaochanN = document.createElement("IMG"); hitonokaochanN.src = "/user_interface/images/rhubarb_lip_sync/n.webp"; hitonokaochanN.style.display = "none"; hitonokaochanContainer.appendChild(hitonokaochanN); // Added on April 21st 2024
  const hitonokaochanX = document.createElement("IMG"); hitonokaochanX.src = "/user_interface/images/rhubarb_lip_sync/x.webp"; hitonokaochanX.style.display = "block";hitonokaochanContainer.appendChild(hitonokaochanX);
  const allMouthStates = [hitonokaochanA,hitonokaochanB,hitonokaochanC,hitonokaochanD,hitonokaochanE,hitonokaochanF,hitonokaochanG,hitonokaochanH,hitonokaochanN,hitonokaochanX];
  // QUESTION: Within startButtonF Hitonokaochan img container must be removed OR NOT? ANSWER: NOT IF we check whether it already exists before adding it
  if (vocabularyBoxItself.contains(hitonokaochanContainer)) {  } // This way we don't have to remove it inside startButtonF
  else {  vocabularyBoxItself.appendChild(hitonokaochanContainer);  } // Will add it only when called as intro
  // -
  function animateHitonokachan(jsonData) {
    const mouthCues = jsonData.mouthCues;
    let counter = 0;
    mouthCues.forEach(cue => {
      if (counter>0) { // Skip setting the very first timeout at 0000ms
        setTimeout(() => {
          allMouthStates.forEach(frame => { frame.style.display = "none"; }); // Same for all
          switch (cue.value) {
            // Rhubarb standard alphabetic reference PLUS the addition of "N" for «nnn» sound
            case "A":  hitonokaochanA.style.display = "block"; break;
            case "B":  hitonokaochanB.style.display = "block"; break;
            case "C":  hitonokaochanC.style.display = "block"; break;
            case "D":  hitonokaochanD.style.display = "block"; break;
            case "E":  hitonokaochanE.style.display = "block"; break;
            case "F":  hitonokaochanF.style.display = "block"; break;
            case "G":  hitonokaochanG.style.display = "block"; break;
            case "H":  hitonokaochanH.style.display = "block"; break;
            case "N":  hitonokaochanN.style.display = "block"; break;
            case "X":  hitonokaochanX.style.display = "block"; break;
            // Leavidence Design reference
            case "MM": hitonokaochanA.style.display = "block"; break;
            case "SS": hitonokaochanB.style.display = "block"; break;
            case "EE": hitonokaochanC.style.display = "block"; break;
            case "AA": hitonokaochanD.style.display = "block"; break;
            case "OO": hitonokaochanE.style.display = "block"; break;
            case "UU": hitonokaochanF.style.display = "block"; break;
            case "FF": hitonokaochanG.style.display = "block"; break;
            case "LL": hitonokaochanH.style.display = "block"; break;
            case "NN": hitonokaochanN.style.display = "block"; break;
            case "XX": hitonokaochanX.style.display = "block"; break;

            default:
          }
          // It works!
        }, cue.start * 1000); // Convert seconds to milliseconds
      }
      // -
      counter++;
    });
  }

  function playintroVocabulary1() {
    if (introSound1IsReady && !introSoundIsPlaying) {
      introVocabulary1.play(); introSoundIsPlaying = true; pseudoDeactivationOfPlayButton();
      if (lipSyncJSON_1) { animateHitonokachan(lipSyncJSON_1); } // Handle lip-sync
    }
  }
  function playintroVocabulary2() {
    if (introSound2IsReady && !introSoundIsPlaying) {
      introVocabulary2.play(); introSoundIsPlaying = true; pseudoDeactivationOfPlayButton();
      if (lipSyncJSON_2) { animateHitonokachan(lipSyncJSON_2); } // Handle lip-sync
    }
  }
  function playintroVocabulary3() {
    if (introSound3IsReady && !introSoundIsPlaying) {
      introVocabulary3.play(); introSoundIsPlaying = true; pseudoDeactivationOfPlayButton();
      if (lipSyncJSON_3) { animateHitonokachan(lipSyncJSON_3); } // Handle lip-sync
    }
  }
  function playoutroVocabulary1() {
    if (outroSound1IsReady && !outroSoundIsPlaying) {
      outroVocabulary1.play(); outroSoundIsPlaying = true; pseudoDeactivationOfPlayButton();
      if (lipSyncJSON_1) { animateHitonokachan(lipSyncJSON_1); } // Handle lip-sync
    }
  }
  function playoutroVocabulary2() {
    if (outroSound2IsReady && !outroSoundIsPlaying) {
      outroVocabulary2.play(); outroSoundIsPlaying = true; pseudoDeactivationOfPlayButton();
      if (lipSyncJSON_2) { animateHitonokachan(lipSyncJSON_2); } // Handle lip-sync
    }
  }
  function playoutroVocabulary3() {
    if (outroSound3IsReady && !outroSoundIsPlaying) {
      outroVocabulary3.play(); outroSoundIsPlaying = true; pseudoDeactivationOfPlayButton();
      if (lipSyncJSON_3) { animateHitonokachan(lipSyncJSON_3); } // Handle lip-sync
    }
  }

  function pseudoDeactivationOfPlayButton() { listenButtonOfTheVocabulary.style.opacity = "0.4"; } // Event listeners will stay » callback functions will decide if the button will do something or nothing
  function pseudoReactivationOfPlayButton() { listenButtonOfTheVocabulary.style.opacity = "1"; } // Event listeners will stay » callback functions will decide if the button will do something or nothing

  // APPEND txt2
  if (!isLessonOutro) {    vocabularyBoxItself.appendChild(putVocabularyTxtIntoThisP2);  }
  else {    vocabularyBoxItself.appendChild(putVocabularyTxtIntoThisP2OUTRO);  }
  // Try to fix Safari and Firefox as they ignore text align justify although the container div has it in its class
  // putVocabularyTxtIntoThisP1.style.textAlign = "justify"; putVocabularyTxtIntoThisP2.style.textAlign = "justify"; // DIDN'T WORK!

  listenButtonOfTheVocabulary.classList.add("buttonsAtTheBottomOfThePronunciationBox"); loadingAnimation(); // &#128259; is a "refresh 🔃" mark

  function loadingAnimation() {
    listenButtonOfTheVocabulary.innerHTML = "...::...";
    to1 = setTimeout(function () { listenButtonOfTheVocabulary.innerHTML = "..:··:..";  }, 100);
    to2 = setTimeout(function () { listenButtonOfTheVocabulary.innerHTML = ".:····:.";  }, 200);
    to3 = setTimeout(function () { listenButtonOfTheVocabulary.innerHTML = ":······:";  }, 300);
    to4 = setTimeout(function () { listenButtonOfTheVocabulary.innerHTML = ".:····:.";  }, 400);
    to5 = setTimeout(function () { listenButtonOfTheVocabulary.innerHTML = "..:··:..";  }, 500);
    to6 = setTimeout(loadingAnimation, 600);
  }

  startButtonToCloseTheVocabulary.classList.add("buttonsAtTheBottomOfThePronunciationBox");  startButtonToCloseTheVocabulary.innerHTML = "&#9658;"; // &#127918; is a "gamepad 🎮" mark // &#9658; is a "play ►" mark
  if (deviceDetector.isMobile) {
    listenButtonOfTheVocabulary.classList.add("buttonsAtTheBottomOfThePronunciationBoxMOBILE");
    startButtonToCloseTheVocabulary.classList.add("buttonsAtTheBottomOfThePronunciationBoxMOBILE");
  } else {
    listenButtonOfTheVocabulary.classList.add("buttonsAtTheBottomOfThePronunciationBoxDESKTOP");
    startButtonToCloseTheVocabulary.classList.add("buttonsAtTheBottomOfThePronunciationBoxDESKTOP");
  }
  // ---
  if (listenButtonTxt) { // If the primary fetch (the one that fires at global level even before window load) has already finished downloading the txt file
    // LET listenButtonTxt STAY READY AND WAIT UNTIL THE SOUNDS AND JSONS LOAD » Before the implementation of animated text here used to be » listenButtonOfTheVocabulary.innerHTML = listenButtonTxt;
    if (!isLessonOutro) { startButtonToCloseTheVocabulary.innerHTML = startButtonTxt; }
    else { startButtonToCloseTheVocabulary.innerHTML = nextButtonTxt; }
  } else { // Restart fetch but this time update buttonTxts as soon as the file is ready
    if (primaryFetchIsStillTryingToGetTheFile) {
      // Let it keep working
    } else {
      // Retry getting the file one single more time i.e. this is the second and the last try
      fetch(listenBoxButton1Button2Path,myHeaders).then(function(response){return response.text();}).then(function(contentOfTheTxtFile){
        listenButtonTxt = contentOfTheTxtFile.split("|")[0]; listenButtonOfTheVocabulary.innerHTML = listenButtonTxt;
        listenAgainButtonTxt = contentOfTheTxtFile.split("|")[1];
        if (!isLessonOutro) { startButtonTxt = contentOfTheTxtFile.split("|")[2]; startButtonToCloseTheVocabulary.innerHTML = startButtonTxt; }
        else { nextButtonTxt = contentOfTheTxtFile.split("|")[3]; startButtonToCloseTheVocabulary.innerHTML = nextButtonTxt; }
      });
    }
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
  let clickOrTouchCount=0;
  function playButtonF(event) { event.preventDefault(); event.stopPropagation();
    if (introSoundIsPlaying || outroSoundIsPlaying) {  return;  } // Prevent multiple instances of the sound overlap and be heard at the same time
    // Use stopPropagation instead of parent.preventTouchConflictWithTheSlidingNavMenu(listenButtonOfTheVocabulary); // Exists in js_for_the_sliding_navigation_menu
    clickOrTouchCount++;
    // -
    checkClickTouchModulus(clickOrTouchCount);
  }
  function checkClickTouchModulus(nthPlay) {
    // -
    if (nthPlay==1) {
      if (listenAgainButtonTxt) { listenButtonOfTheVocabulary.innerHTML = listenAgainButtonTxt; } // Change button innerHTML from [Listen] to [Listen again]
    } else if (nthPlay==2) {
      // No change
    } else if (nthPlay==3) {
      startButtonToCloseTheVocabulary.classList.add("startButtonUnderListenBox"); twoButtonsContainer.appendChild(startButtonToCloseTheVocabulary); // Reveal the [Start] button
    }
    if (nthPlay%3 == 1) {    if (!isLessonOutro) {  playintroVocabulary1();  } else {  playoutroVocabulary1();  }    }
    if (nthPlay%3 == 2) {    if (!isLessonOutro) {  playintroVocabulary2();  } else {  playoutroVocabulary2();  }    }
    if (nthPlay%3 == 0) {    if (!isLessonOutro) {  playintroVocabulary3();  } else {  playoutroVocabulary3();  }    }
  }
  let spaceKeyIsBeingHeldDown = false;
  function checkIfSpaceKeyWasPressed(event) { event.preventDefault(); // Can't be too safe
    if (!spaceKeyIsBeingHeldDown) {
      if (event.key == " " || event.code == "Space") {
        spaceKeyIsBeingHeldDown = true;
        // -
        if (introSoundIsPlaying || outroSoundIsPlaying) {  return;  } // Prevent multiple instances of the sound overlap and be heard at the same time
        // -
        clickOrTouchCount++;
        // -
        checkClickTouchModulus(clickOrTouchCount);
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
    vocabularyBoxItself.style.animationName = "vocabularyListenBoxDisappears";
    vocabularyBoxContainer.style.animationName = "vocabularyPronunciationDisappearsBG";
    setTimeout(function(){
      // DEPRECATED document.body.removeChild(vocabularyBoxContainer);
      startButtonToCloseTheVocabulary.remove();
      listenButtonOfTheVocabulary.remove();
      twoButtonsContainer.remove();
      if (vocabularyBoxItself.contains(putVocabularyTxtIntoThisP2)) { putVocabularyTxtIntoThisP2.remove(); }
      if (vocabularyBoxItself.contains(putVocabularyTxtIntoThisP2OUTRO)) { putVocabularyTxtIntoThisP2OUTRO.remove(); }
      // No need to remove hitonokaochanContainer when using «contains()»
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
