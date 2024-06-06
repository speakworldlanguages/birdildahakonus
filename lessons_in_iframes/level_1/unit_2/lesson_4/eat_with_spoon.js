"use strict";
// Code written by Manheart Earthman=B. A. Bilgekılınç Topraksoy=土本 智一勇夫剛志
// UNAUTHORIZED MODIFICATION IS PROHIBITED: You may not change this file without consent


/* __ SAVE PROGRESS TO LOCAL STORAGE __ */
// See js_for_the_parent_all_browsers_all_devices to find how savedProgress.ja savedProgress.zh savedProgress.tr etc are created
const studiedLang = parent.langCodeForTeachingFilePaths.substr(0,2); // en_east en_west will use the same save-slot
// !!! VERY CAREFUL: Watch the lesson name!!!
parent.savedProgress[studiedLang].lesson_EATWITHSPOON_IsViewed=true; // Create and add... or overwrite the same thing
parent.saveJSON = JSON.stringify(parent.savedProgress); // Convert
localStorage.setItem("memoryCard", parent.saveJSON); // Save

/* __ TEXT TO BE INJECTED INTO EXPLANATION/TRANSLATION SUBTITLE/BOX __ */
const translationPath = "/user_interface/text/"+userInterfaceLanguage+"/1-2-4.txt"; // The translation of what is being said, to be put into the helpbox/subtitles.
let translation = "…"; // Warning: Without an initial value it returns UNDEFINED before fetch() actually gets the file.
// OPTIONAL: fetches can happen after window load unless it is an immediate info box to be displayed at the beginning of the lesson
fetch(translationPath,myHeaders).then(function(response){return response.text();}).then(function(contentOfTheTxtFile){ translation = contentOfTheTxtFile; });
// ---
let onWhatToSayAfterEating = null; // See what follows after window-load below // Will show only for certain languages

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
var spoonFatTouchAreaOnMobiles = document.getElementById('shoeLikeTouchAreaForSpoonID'); // Accurate path with curved edges » See eat_with_spoon_mobile.js
var plateTouchHitAreaOnMobiles = document.getElementById('ellipticalTouchAreaForPlateID'); // Approximate path with curved edges » See eat_with_spoon_mobile.js

var plateHoverAreaOnDesktops = document.getElementById('plateHoverAreaDesktopID');
// See index.html to find theLongSpoonContainerDivWithStates
var theSquareSpoonContainerDiv = document.querySelector('.squareContainerOfTheLongSpoonContainer');
var plateStates = document.getElementById('thePlateStatesDivID');
// See index.html to find showHowDesktop showHowTablet showHowPhone

// See js_for_the_parent_all_browsers_all_devices for lastRecordedWindowWidth lastRecordedWindowHeight

/* SET OFF */
window.addEventListener('load',checkIfAppIsPaused, { once: true });
function checkIfAppIsPaused() {
  if (parent.theAppIsPaused) { // See js_for_the_sliding_navigation_menu
    parent.pleaseAllowSound.play(); // Let the wandering user know that the lesson is now ready // See js_for_different_browsers_and_devices
    let unpauseDetector = setInterval(() => {    if (!parent.theAppIsPaused) { clearInterval(unpauseDetector); loadingIsCompleteFunction(); }    }, 500); // NEVER use a SuperInterval here!
  } else { loadingIsCompleteFunction(); }
}
// NOTE THAT: In this case the grammar [info box] must appear AFTER the pronunciation-teacher-box [listen box]
function loadingIsCompleteFunction() {
  // User must listen to pronunciation-teacher vocabulary box no matter what language he/she is studying
  // In case of "ar" listen-many-times-box will play the verb root in male conjugation even if the user is female
  const filePathOfTheAudio1 = "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_2/lesson_4/with_listenbox_1."+soundFileFormat;
  const filePathOfTheAudio2 = "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_2/lesson_4/with_listenbox_2."+soundFileFormat;
  const filePathOfTheAudio3 = "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_2/lesson_4/with_listenbox_3."+soundFileFormat;
  const filePathOfLipSyncJSON1 = "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_2/lesson_4/with_listenbox_1.json";
  const filePathOfLipSyncJSON2 = "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_2/lesson_4/with_listenbox_2.json";
  const filePathOfLipSyncJSON3 = "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_2/lesson_4/with_listenbox_3.json";
  // NOTE: The lip-sync json file names better be THE SAME with the audio file names that will be played in the listen-many-times box » See js_for_info_boxes_in_lessons
  const listenBoxP1P2Path = "/user_interface/text/"+userInterfaceLanguage+"/1-2-4_vocabulary_p1_p2.txt"; // UI lang depends on domain (hostname) » See js_for_every_single_html
  fetch(listenBoxP1P2Path,myHeaders).then(function(response){return response.text();}).then(function(contentOfTheTxtFile){  handleP1P2ActualText(contentOfTheTxtFile);  });
  // See js_for_info_boxes_in_lessons » iframe-lesson level
  new SuperTimeout(function(){    createAndHandleListenManyTimesBox(filePathOfTheAudio1,filePathOfLipSyncJSON1,filePathOfTheAudio2,filePathOfLipSyncJSON2,filePathOfTheAudio3,filePathOfLipSyncJSON3);    },501); // Wait for preloader to disappear or give a brief break after notification
}

function vocabularyBoxIsClosed(x,y) { // 500ms after OK is touched/clicked, it will fire from within createAndHandleListenManyTimesBox with touch/click coordinate values passed » vocabularyBoxIsClosed(lastPointerX,lastPointerY)
  // In this case there is no use for last mouse or touch coordinates: x, y
  if (studiedLang == "ar") { // Display notice about TANAAWAL and QULL difference in Arabic
    /* DEPRECATED: Will use OUTRO listenbox instead of white-info-box
    const pathOfNotificationAboutTanaawal = "/user_interface/text/"+userInterfaceLanguage+"/1-2-4_arabic_tanaawal.txt";
    fetch(pathOfNotificationAboutTanaawal,myHeaders).then(function(response){return response.text();}).then(function(contentOfTheTxtFile){
      new SuperTimeout(function(){ createAndHandleInfoBoxType1BeforeLessonStarts(); putNotificationTxtIntoThisP1.innerHTML = contentOfTheTxtFile; },501); // See js_for_info_boxes_in_lessons.js
      // createAndHandleInfoBoxType1BeforeLessonStarts will fire startTheLesson 1.5 seconds after its OK button is clicked/touched
    });
    */
  }
  else if (studiedLang == "tr") {
    const pathOfNotificationAboutHarmony = "/user_interface/text/"+userInterfaceLanguage+"/1-2-4_kishi_harmony.txt";
    fetch(pathOfNotificationAboutHarmony,myHeaders).then(function(response){return response.text();}).then(function(contentOfTheTxtFile){
      new SuperTimeout(function(){ createAndHandleInfoBoxType1BeforeLessonStarts(); putNotificationTxtIntoThisP1.innerHTML = contentOfTheTxtFile; },501); // See js_for_info_boxes_in_lessons.js
      // createAndHandleInfoBoxType1BeforeLessonStarts will fire startTheLesson 1.5 seconds after its OK button is clicked/touched
    });
  }
  else if (studiedLang == "??") {

  }
  else {
    startTheLesson(); // Call it now if it was not to be called from within createAndHandleInfoBoxType1BeforeLessonStarts() in js_for_info_boxes_in_lessons.js
  }
  // ---
  // By the way: Get the end of lesson texts ready
  setTimeout(function () { // We don't want a SuperTimeout in this case
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
    } else if (studiedLang == "??") {

    } else {
      // Let onWhatToSayAfterEating stay null in order to skip the end of lesson info box
    }
  }, 5000);
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
  let sayTime; // Use an average value and run tests to fine adjust via trial error
  function updateSayTime() { switch (parent.speedAdjustmentSetting) {  case "slow": sayTime = 6000; break;  case "fast": sayTime = 3000; break;  default: sayTime = 4500;  }  }
  loopingTalk();
  function loopingTalk() {
    updateSayTime(); // Use an average value and run tests to fine adjust via trial error
    say1.play(); injectTextIntoTheHelpBoxP.innerHTML = translation; console.log("Says «eat!»");
    to1 = new SuperTimeout(proceed_1, sayTime-500); // Clear this timeout as soon as the gameplay starts
    function proceed_1() { say2.play(); updateSayTime();
      to2 = new SuperTimeout(proceed_2, sayTime+2500); // Clear this timeout as soon as the gameplay starts
    }
    function proceed_2() { say3.play(); updateSayTime();
      to3 = new SuperTimeout(proceed_3, sayTime+111); // Clear this timeout as soon as the gameplay starts
    }
    function proceed_3() { say4.play(); updateSayTime();
      to4 = new SuperTimeout(restartIfMust, sayTime+3500); // Clear this timeout as soon as the gameplay starts
    }
    function restartIfMust() {
      howManySaysFinished++; //parent.console.log("howManySaysFinished=" + howManySaysFinished);
      if (howManySaysFinished<4) {  loopingTalk();  } else {  } // Exit the loop by not calling any further repetition
    }
  }
}

// ---
let spoonIsTooFarFromPlate = true;
var canLoadTheSpoonNow = false;
let spoonIsLoaded = false; let isSwallowing = false; let yumNumber = 1;

// ---
// See eat_with_spoon_desktop.js and eat_with_spoon_mobile.js
// ---

// CREATE AN OUTRO LISTENBOX
// For Arabic «kul كل vs tanaawal تناول » situation
// For Korean «먹어요 vs 드세요» situation
let makeProceedTimeGlobal;
function displayNoticeOrMoveAlong(milliseconds) { // Will fire from either eat_with_spoon_desktop.js or eat_with_spoon_mobile.js
  makeProceedTimeGlobal = milliseconds;
  if (studiedLang == "ar") {
    new SuperTimeout(function () {
      // Display pronunciation-teacher-box to play how to say "TANAAWAL"
      const filePathOfTheAudio1 = "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_2/lesson_4/tanaawal_listenbox_1."+soundFileFormat;
      const filePathOfTheAudio2 = "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_2/lesson_4/tanaawal_listenbox_2."+soundFileFormat;
      const filePathOfTheAudio3 = "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_2/lesson_4/tanaawal_listenbox_3."+soundFileFormat;
      const filePathOfLipSyncJSON1 = "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_2/lesson_4/tanaawal_listenbox_1.json";
      const filePathOfLipSyncJSON2 = "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_2/lesson_4/tanaawal_listenbox_2.json";
      const filePathOfLipSyncJSON3 = "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_2/lesson_4/tanaawal_listenbox_3.json";
      // NOTE: The lip-sync json file names better be THE SAME with the audio file names that will be played in the listen-many-times box » See js_for_info_boxes_in_lessons
      const listenBoxP1P2Path = "/user_interface/text/"+userInterfaceLanguage+"/1-2-4_vocabulary_outro_p1_p2_ar.txt"; // UI lang depends on domain (hostname) » See js_for_every_single_html
      fetch(listenBoxP1P2Path,myHeaders).then(function(response){return response.text();}).then(function(contentOfTheTxtFile){
        handleP1P2ActualTextOUTRO(contentOfTheTxtFile); // CAUTION: It's outro
      });
      // See js_for_info_boxes_in_lessons » iframe-lesson level
      new SuperTimeout(function(){
        createAndHandleListenManyTimesBox(filePathOfTheAudio1,filePathOfLipSyncJSON1,filePathOfTheAudio2,filePathOfLipSyncJSON2,filePathOfTheAudio3,filePathOfLipSyncJSON3,true); // true as seventh parameter turns it into an outro box
      },501); // If fetch cannot get the file within 501 ms the default content of the box (with emojis icons etc) will be visible until fetch gets the file
    }, milliseconds);
  } else if (studiedLang == "ko") {
    new SuperTimeout(function () {
      // Display pronunciation-teacher-box to play how to say "드세요"
      const filePathOfTheAudio1 = "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_2/lesson_4/deuseyo_listenbox_1."+soundFileFormat;
      const filePathOfTheAudio2 = "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_2/lesson_4/deuseyo_listenbox_2."+soundFileFormat;
      const filePathOfTheAudio3 = "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_2/lesson_4/deuseyo_listenbox_3."+soundFileFormat;
      const filePathOfLipSyncJSON1 = "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_2/lesson_4/deuseyo_listenbox_1.json";
      const filePathOfLipSyncJSON2 = "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_2/lesson_4/deuseyo_listenbox_2.json";
      const filePathOfLipSyncJSON3 = "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_2/lesson_4/deuseyo_listenbox_3.json";
      // NOTE: The lip-sync json file names better be THE SAME with the audio file names that will be played in the listen-many-times box » See js_for_info_boxes_in_lessons
      const listenBoxP1P2Path = "/user_interface/text/"+userInterfaceLanguage+"/1-2-4_vocabulary_outro_p1_p2_ko.txt"; // UI lang depends on domain (hostname) » See js_for_every_single_html
      fetch(listenBoxP1P2Path,myHeaders).then(function(response){return response.text();}).then(function(contentOfTheTxtFile){
        handleP1P2ActualTextOUTRO(contentOfTheTxtFile); // CAUTION: It's outro
      });
      // See js_for_info_boxes_in_lessons » iframe-lesson level
      new SuperTimeout(function(){
        createAndHandleListenManyTimesBox(filePathOfTheAudio1,filePathOfLipSyncJSON1,filePathOfTheAudio2,filePathOfLipSyncJSON2,filePathOfTheAudio3,filePathOfLipSyncJSON3,true); // true as seventh parameter turns it into an outro box
      },501); // If fetch cannot get the file within 501 ms the default content of the box (with emojis icons etc) will be visible until fetch gets the file
    }, milliseconds);
  } else {
    isThereAnEndOfLessonNote();
  }

}
function vocabularyBoxIsClosed_LESSON_OUTRO() {
  new SuperTimeout(isThereAnEndOfLessonNote,1000);
}

function isThereAnEndOfLessonNote() {
  if (onWhatToSayAfterEating) { // Check if fetch did indeed get the file » Note that by using onWhatToSayAfterEating we don't need to recheck studiedLang here
    // Display notice about GO-CHI-SO-U-SA-MA
    // Display notice about AAFIYET OLSUN
    new SuperTimeout(function () {
      createAndHandleInfoBoxType1AmidLesson(); putNotificationTxtIntoThisP2.innerHTML = onWhatToSayAfterEating;
      // continueLesson() will be fired from within createAndHandleInfoBoxType1AmidLesson()
    }, makeProceedTimeGlobal-1000);
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
      // As of October 2023 we are not making 100% certain if assets for author's notice are cached » We expect it will be cached 99.99% of the time if everything for 131 is cached
      if (isCached) { parent.console.warn("WILL TRY TO CONTINUE OFFLINE");
        new SuperTimeout(function() { parent.ayFreym.src = parent.pathOfWhatWillBeDisplayedUnlessInternetConnectivityIsLost; }, 1500);
      }
    }
    // ---
  }, endTime); // If there was a final dialog box then better let it disappear completely before preloader starts appearing
}
