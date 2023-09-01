"use strict";
// Code written by Manheart Earthman=B. A. Bilgekılınç Topraksoy=土本 智一勇夫剛志
// UNAUTHORIZED MODIFICATION IS PROHIBITED: You may not change this file without obtaining permission


/* __ SAVE PROGRESS TO LOCAL STORAGE __ */
// See js_for_the_parent_all_browsers_all_devices to find how savedProgress.ja savedProgress.zh savedProgress.tr savedProgress.ar savedProgress.en are created
const studiedLang = parent.langCodeForTeachingFilePaths.substr(0,2); // en_east en_west will use the same save-slot
// !!! VERY CAREFUL: Watch the lesson name!!!
parent.savedProgress[studiedLang].lesson_EATWITHSPOON_IsViewed=true; // Create and add... or overwrite the same thing
parent.saveJSON = JSON.stringify(parent.savedProgress); // Convert
localStorage.setItem("memoryCard", parent.saveJSON); // Save

/* __ TEXT TO BE INJECTED INTO EXPLANATION/TRANSLATION SUBTITLE/BOX __ */
const translationPath = "/user_interface/text/"+userInterfaceLanguage+"/1-2-4.txt"; // The translation of what is being said, to be put into the helpbox/subtitles.
let translation = "…"; // Warning: Without an initial value it returns UNDEFINED before fetch() actually gets the file.
let onWhatToSayAfterEating = "…";
// OPTIONAL: fetches can happen after window load unless it is an immediate info box to be displayed at the beginning of the lesson
fetch(translationPath,myHeaders).then(function(response){return response.text();}).then(function(contentOfTheTxtFile){ translation = contentOfTheTxtFile; });
if (studiedLang == "ja") {
  const pathOfLessonNoteAboutCompletionOfMeal = "/user_interface/text/"+userInterfaceLanguage+"/1-2-4_end_of_meal_ja.txt";
  fetch(pathOfLessonNoteAboutCompletionOfMeal,myHeaders).then(function(response){return response.text();}).then(function(contentOfTheTxtFile){
    onWhatToSayAfterEating = contentOfTheTxtFile;
  });
} else if (studiedLang == "tr") {
  const pathOfLessonNoteAboutCompletionOfMeal = "/user_interface/text/"+userInterfaceLanguage+"/1-2-4_end_of_meal_tr.txt";
  fetch(pathOfLessonNoteAboutCompletionOfMeal,myHeaders).then(function(response){return response.text();}).then(function(contentOfTheTxtFile){
    onWhatToSayAfterEating = contentOfTheTxtFile;
  });
}

/* ___AUDIO ELEMENTS___ */ //...Sound player (Howler) exists in the parent html. So the path must be relative to the parent html. Not to the framed html.
// Find soundFileFormat in js_for_all_iframed_lesson_htmls
let say1Path = "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_2/lesson_4/eat_normal."+soundFileFormat;
let say2Path = "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_2/lesson_4/eat_with_spoon_normal."+soundFileFormat;
let say3Path = "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_2/lesson_4/eat_slow."+soundFileFormat;
let say4Path = "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_2/lesson_4/eat_with_spoon_slow."+soundFileFormat;
let say5Path = "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_2/lesson_4/say_when_meal_is_finished."+soundFileFormat;

if (parent.userIsFemaleSoUseFemaleConjugation) { // See js_for_the_parent_all_browsers_all_devices
  say1Path = say1Path.split(".")[0] + "_tofemale."+soundFileFormat;
  say2Path = say2Path.split(".")[0] + "_tofemale."+soundFileFormat;
  say3Path = say3Path.split(".")[0] + "_tofemale."+soundFileFormat;
  say4Path = say4Path.split(".")[0] + "_tofemale."+soundFileFormat;
  say5Path = say5Path.split(".")[0] + "_tofemale."+soundFileFormat;
}

const say1 = new parent.Howl({  src: [say1Path]  });
const say2 = new parent.Howl({  src: [say2Path]  });
const say3 = new parent.Howl({  src: [say3Path]  });
const say4 = new parent.Howl({  src: [say4Path]  });
const say5 = new parent.Howl({  src: [say5Path]  });

const mouseEnterTouchStartSound = new parent.Howl({  src: ["/lessons_in_iframes/level_1/unit_2/lesson_4/mouseenter_touchstart."+soundFileFormat]  });
const mouseDownTouchEndSound = new parent.Howl({  src: ["/lessons_in_iframes/level_1/unit_2/lesson_4/mousedown_touchend."+soundFileFormat]  });
const scoopingFoodSound = new parent.Howl({  src: ["/lessons_in_iframes/level_1/unit_2/lesson_4/scoop_some_food."+soundFileFormat]  });
const spoonOnPlateSound = new parent.Howl({  src: ["/lessons_in_iframes/level_1/unit_2/lesson_4/spoon_on_porcelain."+soundFileFormat]  });
const loadFoodSound1 = new parent.Howl({  src: ["/lessons_in_iframes/level_1/unit_2/lesson_4/load_1."+soundFileFormat]  });
const loadFoodSound2 = new parent.Howl({  src: ["/lessons_in_iframes/level_1/unit_2/lesson_4/load_2."+soundFileFormat]  });
const loadFoodSound3 = new parent.Howl({  src: ["/lessons_in_iframes/level_1/unit_2/lesson_4/load_3."+soundFileFormat]  });
const firstSwallowSound = new parent.Howl({  src: ["/lessons_in_iframes/level_1/unit_2/lesson_4/swallow_1."+soundFileFormat]  });
const secondSwallowSound = new parent.Howl({  src: ["/lessons_in_iframes/level_1/unit_2/lesson_4/swallow_2."+soundFileFormat]  });
const thirdSwallowSound = new parent.Howl({  src: ["/lessons_in_iframes/level_1/unit_2/lesson_4/swallow_3."+soundFileFormat]  });
const winSound = new parent.Howl({  src: ["/lessons_in_iframes/level_1/unit_2/lesson_4/win."+soundFileFormat]  });
/* Sound initialization happens on the parent but the consts exist in frame. SEE js_for_all_iframed_lesson_htmls » FIND onbeforeunload. */
// listOfAllSoundsInThisLesson is also used by pauseTheAppFunction in js_for_the_sliding_navigation_menu
var listOfAllSoundsInThisLesson = [
  //winSound, // Common practice » unload the last heard sound after iframe.src change so that it won't stop playing in the middle
  thirdSwallowSound,
  secondSwallowSound,
  firstSwallowSound,
  loadFoodSound3,
  loadFoodSound2,
  loadFoodSound1,
  spoonOnPlateSound,
  scoopingFoodSound,
  mouseDownTouchEndSound,
  mouseEnterTouchStartSound,
  say5, say4, say3, say2, say1
];
function unloadTheSoundsOfThisLesson() {
  for (let i = 0; i < listOfAllSoundsInThisLesson.length; i++) {
      const snd = listOfAllSoundsInThisLesson[i]; snd.unload();
  }
  parent.unloadThatLastSoundWhichCannotBeUnloadedNormally(winSound); // Exists in js_for_navigation_handling,,, unloads the sound after 5s
}

/* Declare js variables to manipulate the elements */
const main = document.getElementsByTagName('MAIN')[0];
const spoonHoverExactAreaOnDesktops = document.getElementById('preciseSpoonHoverAreaForDesktopMouseID');
const spoonFatTouchAreaOnMobiles = document.getElementById('niceFatTouchAreaForMobileID');
const preventSwipeMenuOnMobiles = document.getElementById('preventSwipeMenuMobileID');
const plateHoverAreaOnDesktops = document.getElementById('plateHoverAreaDesktopID');
// Better without? Probably yes: const plateHoverAreaOnMobiles = document.getElementById('plateHoverAreaMobileID'); // WARNING: elementFromPoint.id compares to plateHoverAreaMobileID to detect touch hovering
// See index.html to find theLongSpoonContainerDivWithStates
const theSquareSpoonContainerDiv = document.querySelector('.squareContainerOfTheLongSpoonContainer');
const plateStates = document.getElementById('thePlateStatesDivID');
// See index.html to find showHowDesktop showHowTablet showHowPhone

// See js_for_the_parent_all_browsers_all_devices for lastRecordedWindowWidth lastRecordedWindowHeight

/* SET OFF */
window.addEventListener('load', loadingIsCompleteFunction, { once: true });
// NOTE THAT: In this case the grammar [info box] must appear after the wavesurfer [listen box]
function loadingIsCompleteFunction() {
  // User must listen to wavesurfer vocabulary box no matter what language he/she is studying
  const filePathOfTheAudioFile = "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_2/lesson_4/with_listenbox."+soundFileFormat; // In case of "ar" wavesurfer box will play the verb root in male conjugation even if the user is female
  const wavesurferP1P2Path = "/user_interface/text/"+userInterfaceLanguage+"/1-2-4_vocabulary_p1_p2.txt"; // UI lang depends on domain (hostname) » See js_for_every_single_html
  fetch(wavesurferP1P2Path,myHeaders).then(function(response){return response.text();}).then(function(contentOfTheTxtFile){  handleP1P2ActualText(contentOfTheTxtFile);  });
  // See js_for_info_boxes_in_lessons » iframe-lesson level
  new SuperTimeout(function(){    createAndHandleListenManyTimesBox(filePathOfTheAudioFile);    },501); // Wait for preloader to disappear or give a brief break after notification
}

function vocabularyBoxIsClosed(x,y) { // 500ms after OK is touched/clicked, it will fire from within createAndHandleListenManyTimesBox with touch/click coordinate values passed » vocabularyBoxIsClosed(lastPointerX,lastPointerY)
  // In this case there is no use for last mouse or touch coordinates: x, y
  if (studiedLang == "ar") { // Display notice about TANAAWAL and QULL difference in Arabic
    const pathOfNotificationAboutTanaawal = "/user_interface/text/"+userInterfaceLanguage+"/1-2-4_arabic_tanaawal.txt";
    fetch(pathOfNotificationAboutTanaawal,myHeaders).then(function(response){return response.text();}).then(function(contentOfTheTxtFile){
      new SuperTimeout(function(){ createAndHandleInfoBoxType1BeforeLessonStarts(); putNotificationTxtIntoThisP1.innerHTML = contentOfTheTxtFile; },501); // See js_for_info_boxes_in_lessons.js
      // createAndHandleInfoBoxType1BeforeLessonStarts will fire startTheLesson 1.5 seconds after its OK button is clicked/touched
    });
  } else if (studiedLang == "tr") {
    const pathOfNotificationAboutHarmony = "/user_interface/text/"+userInterfaceLanguage+"/1-2-4_kishi_harmony.txt";
    fetch(pathOfNotificationAboutHarmony,myHeaders).then(function(response){return response.text();}).then(function(contentOfTheTxtFile){
      new SuperTimeout(function(){ createAndHandleInfoBoxType1BeforeLessonStarts(); putNotificationTxtIntoThisP1.innerHTML = contentOfTheTxtFile; },501); // See js_for_info_boxes_in_lessons.js
      // createAndHandleInfoBoxType1BeforeLessonStarts will fire startTheLesson 1.5 seconds after its OK button is clicked/touched
    });
  } else {
    startTheLesson();
  }
}

function startTheLesson() {
  let unblurTime;  switch (parent.speedAdjustmentSetting) {  case "slow": unblurTime = 2.0; break;  case "fast": unblurTime = 0.5; break;  default: unblurTime = 0.9;  }
  main.style.transitionDuration = String(unblurTime)+"s";
  main.style.filter = "blur(0px)";
  new SuperTimeout(function () {
    playTheLoopingVoiceInstruction();
    // Get ready to start the game with mouse on desktops and with touchscreen on mobiles
    if (deviceDetector.isMobile) {    getReadyToStartTheGameOnMobiles();    }
    else {    getReadyToStartTheGameOnDesktops();    }
  }, unblurTime*2000);
  new SuperTimeout(function () { main.style.filter = "none"; }, unblurTime*1100);
}

let to1,to2,to3,to4;
let howManySaysFinished = 0;
function playTheLoopingVoiceInstruction() {
  let sayTime;  switch (parent.speedAdjustmentSetting) {  case "slow": sayTime = 8000; break;  case "fast": sayTime = 4000; break;  default: sayTime = 6000;  }
  loopingTalk();
  function loopingTalk() {
    say1.play(); injectTextIntoTheHelpBoxP.innerHTML = translation;
    to1 = new SuperTimeout(function () { say2.play(); }, sayTime); // Clear this timeout as soon as the gameplay starts
    to2 = new SuperTimeout(function () { say3.play(); }, sayTime*2); // Clear this timeout as soon as the gameplay starts
    to3 = new SuperTimeout(function () { say4.play(); }, sayTime*3); // Clear this timeout as soon as the gameplay starts
    // Exit the loop by not calling any further repetition
    to4 = new SuperTimeout(function () {
      howManySaysFinished++; //parent.console.log("howManySaysFinished=" + howManySaysFinished);
      if (howManySaysFinished<4) {  loopingTalk();  }
    }, sayTime*4+2500); // Clear this timeout as soon as the gameplay starts
  }
}

// ---
let spoonIsTooFarFromPlate = true;
var canLoadTheSpoonNow = false;
let spoonIsLoaded = false; let isSwallowing = false; let yumNumber = 1;

// ---
// See eat_with_spoon_desktop.js and eat_with_spoon_mobile.js
// ---

function displayNoticeOrMoveAlong(milliseconds) { // Will fire from either eat_with_spoon_desktop.js or eat_with_spoon_mobile.js
  if (studiedLang == "ja") { // Display notice about GO-CHI-SO-U-SA-MA
    new SuperTimeout(function () {
      createAndHandleInfoBoxType1AmidLesson(); putNotificationTxtIntoThisP2.innerHTML = onWhatToSayAfterEating;
    }, milliseconds);
  } else if (studiedLang == "tr") { // Display notice about AAFIYET OLSUN
    new SuperTimeout(function () {
      createAndHandleInfoBoxType1AmidLesson(); putNotificationTxtIntoThisP2.innerHTML = onWhatToSayAfterEating;
    }, milliseconds);
  } else {
    continueLesson();
  }
}

function continueLesson() {

  /* Save progress */
  parent.savedProgress[studiedLang].lesson_EATWITHSPOON_IsCompleted=true; // WATCH THE NAME OF THE LESSON!!!
  parent.saveJSON = JSON.stringify(parent.savedProgress); // Convert
  localStorage.setItem("memoryCard", parent.saveJSON); // Save

  // ---
  let endTime;
  switch (parent.speedAdjustmentSetting) { case "slow": endTime = 3500; break;    case "fast": endTime = 1500; break;    default: endTime = 2500; }
  new SuperTimeout(function () {
    // ---
    showGlobyPreloaderBeforeExit(); // 1500ms » See js_for_all_iframed_lesson_htmls AND See css_for_preloader_and_orbiting_circles
    // REMEMBER: iframe.src change makes window.onbeforeunload fire in js_for_all_iframed_lesson_htmls.js which then calls unloadTheSoundsOfThisLesson();
    // Display author's notice2 if this was user's first time finishing this lesson (1-2-4)
    // Otherwise go to lesson 1-3-1
    if (localStorage.thisAppWasCreatedForGoodPeopleNoticeHasBeenDisplayedAlready) { // See notice_2/index.html
      parent.pathOfWhatWillBeDisplayedUnlessInternetConnectivityIsLost = "/lessons_in_iframes/level_1/unit_3/lesson_1/index.html"; // See js_for_online_and_offline_modes
    } else {
      parent.pathOfWhatWillBeDisplayedUnlessInternetConnectivityIsLost = "/lessons_in_iframes/level_1/unit_2/notice_2/index.html"; // See js_for_online_and_offline_modes
    }
    // ---
    if (parent.internetConnectivityIsNiceAndUsable) { // See js_for_online_and_offline_modes.js
      new SuperTimeout(function () { parent.ayFreym.src = parent.pathOfWhatWillBeDisplayedUnlessInternetConnectivityIsLost; }, 1500);
    } else { parent.console.warn("THE DEVICE IS OFFLINE (detected at the end of lesson");
      const isCached = checkIfNextLessonIsCachedAndRedirectIfNot(131); // See js_for_all_iframed_lesson_htmls
      if (isCached) { parent.console.warn("WILL TRY TO CONTINUE OFFLINE");
        new SuperTimeout(function() { parent.ayFreym.src = parent.pathOfWhatWillBeDisplayedUnlessInternetConnectivityIsLost; }, 1500);
      }
    }
    // ---
  }, endTime); // If there was a final dialog box then better let it disappear completely before preloader starts appearing
}
