"use strict";
// Code written by Manheart Earthman=B. A. Bilgekılınç Topraksoy=土本 智一勇夫剛志
// UNAUTHORIZED MODIFICATION IS PROHIBITED: You may not change this file without consent


/* __ SAVE PROGRESS TO LOCAL STORAGE __ */
// See js_for_the_parent_all_browsers_all_devices to find how savedProgress.ja savedProgress.zh savedProgress.tr etc are created
const studiedLang = parent.langCodeForTeachingFilePaths.substr(0,2); // en_east en_west will use the same save-slot
// !!! VERY CAREFUL: Watch the lesson name!!!
parent.savedProgress[studiedLang].lesson_DRINKWATERFROMGLASS_IsViewed=true; // Create and add... or overwrite the same thing
parent.saveJSON = JSON.stringify(parent.savedProgress); // Convert
localStorage.setItem("memoryCard", parent.saveJSON); // Save

/* __ TEXT TO BE INJECTED INTO EXPLANATION/TRANSLATION SUBTITLE/BOX __ */
const translationPath = "/user_interface/text/"+userInterfaceLanguage+"/1-2-2.txt"; // The translation of what is being said, to be put into the helpbox/subtitles.
let translation1 = "…"; // Warning: Without an initial value it returns UNDEFINED before fetch() actually gets the file.
let translation2 = "…"; // Warning: Without an initial value it returns UNDEFINED before fetch() actually gets the file.
let translation3 = "…"; // Warning: Without an initial value it returns UNDEFINED before fetch() actually gets the file.
// OPTIONAL: fetches can happen after window load unless it is an immediate info box to be displayed at the beginning of the lesson
fetch(translationPath,myHeaders).then(function(response){return response.text();}).then(function(contentOfTheTxtFile){
  translation1 = contentOfTheTxtFile.split("|")[0];
  translation2 = contentOfTheTxtFile.split("|")[1];
  translation3 = contentOfTheTxtFile.split("|")[2];
});

/* ___AUDIO ELEMENTS___ */ //...Sound player (Howler) exists in the parent html. So the path must be relative to the parent html. Not to the framed html.
// Find soundFileFormat in js_for_all_iframed_lesson_htmls
let say1Path = "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_2/lesson_2/drink_normal."+soundFileFormat;
let say2Path = "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_2/lesson_2/drink_slow."+soundFileFormat;
let say3Path = "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_2/lesson_2/drink_water_normal."+soundFileFormat;
let say4Path = "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_2/lesson_2/drink_water_slow."+soundFileFormat;
let say5Path = "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_2/lesson_2/drink_water_from_the_glass_normal."+soundFileFormat;
let say6Path = "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_2/lesson_2/drink_water_from_the_glass_slow."+soundFileFormat;

if (parent.userIsFemaleSoUseFemaleConjugation) { // See js_for_the_parent_all_browsers_all_devices
  say1Path = say1Path.split(".")[0] + "_tofemale."+soundFileFormat;
  say2Path = say2Path.split(".")[0] + "_tofemale."+soundFileFormat;
  say3Path = say3Path.split(".")[0] + "_tofemale."+soundFileFormat;
  say4Path = say4Path.split(".")[0] + "_tofemale."+soundFileFormat;
  say5Path = say5Path.split(".")[0] + "_tofemale."+soundFileFormat;
  say6Path = say6Path.split(".")[0] + "_tofemale."+soundFileFormat;
}
let isNowSayingTheSecondSet = false;
const say1 = new parent.Howl({  src: [say1Path]  });
const say2 = new parent.Howl({  src: [say2Path]  });
const say3 = new parent.Howl({  src: [say3Path]  });
const say4 = new parent.Howl({  src: [say4Path]  });
const say5 = new parent.Howl({  src: [say5Path]  });
const say6 = new parent.Howl({  src: [say6Path]  });

const mouseHoverAndTouchStartSound = new parent.Howl({  src: ["/lessons_in_iframes/level_1/unit_2/lesson_2/mouseenter_touchstart."+soundFileFormat]  });
const mouseDownAndTouchEndSound = new parent.Howl({  src: ["/lessons_in_iframes/level_1/unit_2/lesson_2/mousedown_touchend."+soundFileFormat]  });
const sipSound = new parent.Howl({  src: ["/lessons_in_iframes/level_1/unit_2/lesson_2/sipping."+soundFileFormat]  });
const gulpSound1 = new parent.Howl({  src: ["/lessons_in_iframes/level_1/unit_2/lesson_2/gulp1."+soundFileFormat]  });
const gulpSound2 = new parent.Howl({  src: ["/lessons_in_iframes/level_1/unit_2/lesson_2/gulp2."+soundFileFormat]  });
const gulpSound3 = new parent.Howl({  src: ["/lessons_in_iframes/level_1/unit_2/lesson_2/gulp3."+soundFileFormat]  });
const gulpSound4 = new parent.Howl({  src: ["/lessons_in_iframes/level_1/unit_2/lesson_2/gulp4."+soundFileFormat]  });
const winSound = new parent.Howl({  src: ["/lessons_in_iframes/level_1/unit_2/lesson_2/successfully_drunk."+soundFileFormat]  });
/* Sound initialization happens on the parent but the consts exist in frame. SEE js_for_all_iframed_lesson_htmls » FIND onbeforeunload. */
// listOfAllSoundsInThisLesson is also used by pauseTheAppFunction in js_for_the_sliding_navigation_menu
var listOfAllSoundsInThisLesson = [
  // winSound, // EXCEPTION: See unloadThatLastSoundWhichCannotBeUnloadedNormally
  gulpSound4,
  gulpSound3,
  gulpSound2,
  gulpSound1,
  sipSound,
  mouseDownAndTouchEndSound,
  mouseHoverAndTouchStartSound,
  say6, say5,  say4,  say3,  say2,  say1
];
function unloadTheSoundsOfThisLesson() {
  for (let i = 0; i < listOfAllSoundsInThisLesson.length; i++) {
      const snd = listOfAllSoundsInThisLesson[i]; snd.unload();
  }
  parent.unloadThatLastSoundWhichCannotBeUnloadedNormally(winSound); // Exists in js_for_navigation_handling,,, unloads the sound after 5s
}

/* Declare js variables to manipulate the elements */
const main = document.getElementsByTagName('MAIN')[0];
const pictogramContainer = document.querySelector('.pictogramDrinkingWaterPose');
const glassContainerBeforeGame = document.querySelectorAll('.tiltTheGlassGulpGulpGulp')[0];
const glassContainerDuringGameGulp0 = document.querySelectorAll('.alreadyAtTheCenter')[0];
const glassContainerDuringGameGulp1 = document.querySelectorAll('.alreadyAtTheCenter')[1];
const glassContainerDuringGameGulp2 = document.querySelectorAll('.alreadyAtTheCenter')[2];
const glassContainerDuringGameGulp3 = document.querySelectorAll('.alreadyAtTheCenter')[3];
const glassContainerDuringGameGulp4 = document.querySelectorAll('.alreadyAtTheCenter')[4];
const preciseTouchClickArea = document.getElementById('exactAreaID');
const svg = document.getElementsByTagName('svg')[0];
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

function loadingIsCompleteFunction() {
  // Stop and notify the user if necessary; otherwise just continue.
  if (false) {
    // Create a notification box if there is a special case with any particular target language
  } else {
    startTheLesson(); // Call it now if it was not to be called from within createAndHandleInfoBoxType1BeforeLessonStarts() in js_for_info_boxes_in_lessons.js
  }
  // ---
  // As of April 2024 there is nothing to be displayed at the end of this lesson
}

function startTheLesson() {
  // User must listen to pronunciation-teacher vocabulary box no matter what language he/she is studying
  // In case of "ar" pronunciation-teacher-box will play the verb root in male conjugation even if the user is female
  const filePathOfTheAudio1 = "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_2/lesson_2/drink_listenbox_1."+soundFileFormat;
  const filePathOfTheAudio2 = "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_2/lesson_2/drink_listenbox_2."+soundFileFormat;
  const filePathOfTheAudio3 = "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_2/lesson_2/drink_listenbox_3."+soundFileFormat;
  const filePathOfLipSyncJSON1 = "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_2/lesson_2/drink_listenbox_1.json";
  const filePathOfLipSyncJSON2 = "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_2/lesson_2/drink_listenbox_2.json";
  const filePathOfLipSyncJSON3 = "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_2/lesson_2/drink_listenbox_3.json";
  // NOTE: The lip-sync json file names better be THE SAME with the audio file names that will be played in the listen-many-times box » See js_for_info_boxes_in_lessons
  const listenBoxP1P2Path = "/user_interface/text/"+userInterfaceLanguage+"/1-2-2_vocabulary_p1_p2.txt"; // UI lang depends on domain (hostname) » See js_for_every_single_html
  fetch(listenBoxP1P2Path,myHeaders).then(function(response){return response.text();}).then(function(contentOfTheTxtFile){  handleP1P2ActualText(contentOfTheTxtFile);  });
  // See js_for_info_boxes_in_lessons » iframe-lesson level
  new SuperTimeout(function(){    createAndHandleListenManyTimesBox(filePathOfTheAudio1,filePathOfLipSyncJSON1,filePathOfTheAudio2,filePathOfLipSyncJSON2,filePathOfTheAudio3,filePathOfLipSyncJSON3);    },501); // Wait for preloader to disappear or give a brief break after notification
}

function vocabularyBoxIsClosed(x,y) { // Will fire from within createAndHandleListenManyTimesBox with touch/click coordinate values passed » vocabularyBoxIsClosed(lastPointerX,lastPointerY)
  let unblurTime;  switch (parent.speedAdjustmentSetting) {  case "slow": unblurTime = 2.0; break;  case "fast": unblurTime = 0.5; break;  default: unblurTime = 0.9;  }
  main.style.transitionDuration = String(unblurTime)+"s";
  main.style.filter = "blur(0px)";
  new SuperTimeout(function () { playPictogramLoop1(); }, unblurTime*2000);
  new SuperTimeout(function () { main.style.filter = "none"; }, unblurTime*1100);
  // No use for last mouse or touch coordinates: x, y
}

let isFirstTimeLooping = true;
let to1,to2,to3,to4,to5,to6,to7,to8,to9,to10,to11,to12,to13,to14,to15;
function playPictogramLoop1() {
  let proceedTime;  switch (parent.speedAdjustmentSetting) {  case "slow": proceedTime = 3600; break;  case "fast": proceedTime = 1200; break;  default: proceedTime = 2400;  }
  pictogramContainer.children[0].style.display = "none"; // To be never seen again » Do not remove() because the function will fire more than once
  glassContainerBeforeGame.children[0].style.display = "none"; // Will be seen again with touchstart mousedown

  pictogramContainer.children[2].style.display = "none"; resetWebp(pictogramContainer.children[2]); // In case of returning from Loop2
  pictogramContainer.children[1].style.display = "block";

  glassContainerBeforeGame.children[3].style.display = "none"; resetWebp(glassContainerBeforeGame.children[3]); // In case of returning from Loop2
  glassContainerBeforeGame.children[1].style.display = "block"; // GLASS from focus to blur
  to1 = new SuperTimeout(function () { // Drink!
    console.log("Teacher says: Drink!");
    injectTextIntoTheHelpBoxP.innerHTML = translation1;
    if (isNowSayingTheSecondSet) {      say2.play(); proceedTime = proceedTime + 1000;   } else {      say1.play();    }
    to2 = new SuperTimeout(andThen1, 1000 + proceedTime);
  }, proceedTime);
  function andThen1() {
    pictogramContainer.children[1].style.display = "none"; resetWebp(pictogramContainer.children[1]);
    pictogramContainer.children[2].style.display = "block";
    glassContainerBeforeGame.children[1].style.display = "none"; resetWebp(glassContainerBeforeGame.children[1]);
    glassContainerBeforeGame.children[2].style.display = "block"; // GLASS from blur to focus
    if (!isFirstTimeLooping) {
      to13 = new SuperTimeout(function () {
        glassContainerBeforeGame.children[2].style.display = "none"; resetWebp(glassContainerBeforeGame.children[2]);
        glassContainerBeforeGame.children[3].style.display = "block"; // GLASS flashing
      }, 1000);
    } else {
      preciseTouchClickArea.addEventListener("mousemove",function () {   handleHoveringON();   },{ once:true });
      waitForFirstTouchOrClickOnGlass(); // Start waiting for a click or touch
    }
    to3 = new SuperTimeout(function () { // Drink water!
      console.log("Teacher says: Drink water!");
      injectTextIntoTheHelpBoxP.innerHTML = translation2;
      if (isNowSayingTheSecondSet) {      say4.play(); proceedTime = proceedTime + 1500;   } else {      say3.play();    }
      to4 = new SuperTimeout(andThen2, 2000 + proceedTime);
    }, proceedTime);
  }
  function andThen2() {
    pictogramContainer.children[2].style.display = "none"; resetWebp(pictogramContainer.children[2]);
    pictogramContainer.children[1].style.display = "block";
    glassContainerBeforeGame.children[3].style.display = "none"; resetWebp(glassContainerBeforeGame.children[3]); // Even though it loops forever
    glassContainerBeforeGame.children[2].style.display = "none"; resetWebp(glassContainerBeforeGame.children[2]); // Only for the "First Time Of Looping"
    glassContainerBeforeGame.children[1].style.display = "block";
    to5 = new SuperTimeout(function () { // Drink water from the glass!
      console.log("Teacher says: Drink water from the glass!");
      injectTextIntoTheHelpBoxP.innerHTML = translation3;
      if (isNowSayingTheSecondSet) {      say6.play(); proceedTime = proceedTime + 2000;   } else {      say5.play();    }
      to6 = new SuperTimeout(andThen3, 3000 + proceedTime);
    }, proceedTime);
  }
  function andThen3() {
    isNowSayingTheSecondSet = !isNowSayingTheSecondSet;
    isFirstTimeLooping = false;
    playPictogramLoop2();
  }
}

function playPictogramLoop2() {
  let proceedTime;  switch (parent.speedAdjustmentSetting) {  case "slow": proceedTime = 3600; break;  case "fast": proceedTime = 1200; break;  default: proceedTime = 2400;  }
  pictogramContainer.children[1].style.display = "none"; resetWebp(pictogramContainer.children[1]);
  pictogramContainer.children[2].style.display = "block";
  glassContainerBeforeGame.children[1].style.display = "none"; resetWebp(glassContainerBeforeGame.children[1]);
  glassContainerBeforeGame.children[2].style.display = "block";
  to14 = new SuperTimeout(function () {
    glassContainerBeforeGame.children[2].style.display = "none"; resetWebp(glassContainerBeforeGame.children[2]);
    glassContainerBeforeGame.children[3].style.display = "block";
  }, 1000);
  to7 = new SuperTimeout(function () { // Drink!
    console.log("Teacher says: Drink!!!");
    injectTextIntoTheHelpBoxP.innerHTML = translation1;
    if (isNowSayingTheSecondSet) {      say2.play(); proceedTime = proceedTime + 1000;   } else {      say1.play();    }
    to8 = new SuperTimeout(andThen1, 1000 + proceedTime);
  }, proceedTime);
  function andThen1() {
    pictogramContainer.children[2].style.display = "none"; resetWebp(pictogramContainer.children[2]);
    pictogramContainer.children[1].style.display = "block";
    glassContainerBeforeGame.children[3].style.display = "none"; resetWebp(glassContainerBeforeGame.children[3]);
    glassContainerBeforeGame.children[1].style.display = "block";
    to9 = new SuperTimeout(function () { // Drink water!
      console.log("Teacher says: Drink water!!!");
      injectTextIntoTheHelpBoxP.innerHTML = translation2;
      if (isNowSayingTheSecondSet) {      say4.play(); proceedTime = proceedTime + 1500;   } else {      say3.play();    }
      to10 = new SuperTimeout(andThen2, 2000 + proceedTime);
    }, proceedTime);
  }
  function andThen2() {
    pictogramContainer.children[1].style.display = "none"; resetWebp(pictogramContainer.children[1]);
    pictogramContainer.children[2].style.display = "block";
    glassContainerBeforeGame.children[1].style.display = "none"; resetWebp(glassContainerBeforeGame.children[1]);
    glassContainerBeforeGame.children[2].style.display = "block";
    to15 = new SuperTimeout(function () {
      glassContainerBeforeGame.children[2].style.display = "none"; resetWebp(glassContainerBeforeGame.children[2]);
      glassContainerBeforeGame.children[3].style.display = "block";
    }, 1000);
    to11 = new SuperTimeout(function () { // Drink water from the glass!
      console.log("Teacher says: Drink water from the glass!!!");
      injectTextIntoTheHelpBoxP.innerHTML = translation3;
      if (isNowSayingTheSecondSet) {      say6.play(); proceedTime = proceedTime + 2000;   } else {      say5.play();    }
      to12 = new SuperTimeout(andThen3, 3000 + proceedTime);
    }, proceedTime);
  }
  function andThen3() {
    isNowSayingTheSecondSet = !isNowSayingTheSecondSet;
    playPictogramLoop1();
  }
}


function waitForFirstTouchOrClickOnGlass() {
  if (deviceDetector.isMobile) {
    preciseTouchClickArea.addEventListener("touchstart",getReadyToStartTheGameOnMOBILEtouchstart,{ once:true });
    preciseTouchClickArea.addEventListener("touchend",getReadyToStartTheGameOnMOBILEtouchend,{ once:true });
  } else {
    preciseTouchClickArea.addEventListener("mousedown",getReadyToStartTheGameOnDESKTOP,{ once:true });
    preciseTouchClickArea.addEventListener("mouseenter",handleHoveringON);
    preciseTouchClickArea.addEventListener("mouseleave",handleHoveringOFF);
  }
}

function handleHoveringON() {  glassContainerBeforeGame.classList.remove("mouseIsNotHovering"); glassContainerBeforeGame.classList.add("mouseIsHovering"); mouseHoverAndTouchStartSound.play(); }
function handleHoveringOFF() {  glassContainerBeforeGame.classList.remove("mouseIsHovering"); glassContainerBeforeGame.classList.add("mouseIsNotHovering");  }
function stopLoopingAndGetToNewPosition() {
  injectTextIntoTheHelpBoxP.innerHTML = "…";
  // DEPRECATED: /*clearTimeout(to1);clearTimeout(to2);clearTimeout(to3);clearTimeout(to4);clearTimeout(to5);clearTimeout(to6);clearTimeout(to7);clearTimeout(to8);clearTimeout(to9);clearTimeout(to10);clearTimeout(to11);clearTimeout(to12);*/
  if (to1) { to1.clear(); } if (to2) { to2.clear(); } if (to3) { to3.clear(); } if (to4) { to4.clear(); } if (to5) { to5.clear(); }
  if (to6) { to6.clear(); } if (to7) { to7.clear(); } if (to8) { to8.clear(); } if (to9) { to9.clear(); } if (to10) { to10.clear(); }
  if (to11) { to11.clear(); } if (to12) { to12.clear(); } if (to13) { to13.clear(); } if (to14) { to14.clear(); } if (to15) { to15.clear(); }
  let newPositionTime;  switch (parent.speedAdjustmentSetting) {  case "slow": newPositionTime = 7.0; break;  case "fast": newPositionTime = 3.0; break;  default: newPositionTime = 5.0;  }
  pictogramContainer.style.transitionDuration = String(newPositionTime)+"s";
  pictogramContainer.style.animationDuration = String(newPositionTime)+"s";
  glassContainerBeforeGame.style.transitionDuration = String(newPositionTime)+"s";
  svg.style.display = "none";
  new SuperTimeout(function () {
    pictogramContainer.classList.add("pictogramGoesAway");  // For landscape » slide all the way to the left,,, For portrait » slide down just a little
    pictogramContainer.classList.add("pictogramDisappears");  // Both landscape and portrait fade with opacity
    glassContainerBeforeGame.classList.add("glassComesToTheCenter");
    new SuperTimeout(function () {
      pictogramContainer.style.display = "none";
      glassContainerBeforeGame.style.display = "none";
      // DEPRECATE glassContainerDuringGameGulp0.style.display = "block"; // Use opacity instead
      // DEPRECATE glassContainerDuringGameGulp0.style.visibility = "visible"; // Use opacity instead
      glassContainerDuringGameGulp0.style.opacity = "1"; // See if using "opacity" instead of "block" or "visible" solves the skipping problem in Safari
    }, newPositionTime*1000+100);
  }, 100);
  // -
}
// -
function getNormalGlass() {
  // No need to reset any webps at this point because this is the point of no return
  glassContainerBeforeGame.children[1].style.display = "none"; // focus to blur
  glassContainerBeforeGame.children[2].style.display = "none"; // blur to focus
  glassContainerBeforeGame.children[3].style.display = "none"; // flashing as it may have been
  glassContainerBeforeGame.children[0].style.display = "block"; // fixed clear frame in focus
}
// -
let mouseInstructionDisappearTimeout = null;
function getReadyToStartTheGameOnDESKTOP() {
  getNormalGlass(); // Sudden focus will happen if was blurred
  mouseDownAndTouchEndSound.play();
  handleHoveringOFF(); // In case it was on
  preciseTouchClickArea.removeEventListener("mouseenter",handleHoveringON); // svg display is set to none in stopLoopingAndGetToNewPosition
  preciseTouchClickArea.removeEventListener("mouseleave",handleHoveringOFF); // svg display is set to none in stopLoopingAndGetToNewPosition
  stopLoopingAndGetToNewPosition();
  let getReadyTime;  switch (parent.speedAdjustmentSetting) {  case "slow": getReadyTime = 7000; break;  case "fast": getReadyTime = 3000; break;  default: getReadyTime = 5000;  }
  new SuperTimeout(function () {
    // Show how to use mouse wheel
    if (!sessionStorage.showHowToUseMouseWheel122HasBeenShown){
      showHowDesktop.style.display = "block"; showHowDesktop.classList.add("appearQuickly");
      mouseInstructionDisappearTimeout = new SuperTimeout(function () { showHowDesktop.classList.remove("appearQuickly"); showHowDesktop.classList.add("disappearSlowly"); }, 6000);
      sessionStorage.showHowToUseMouseWheel122HasBeenShown = "yes";
    } else {
      // Do nothing
    }
    // Wait for a wheel movement or click&drag
    main.addEventListener("wheel",updateGlassTiltDesktopUntilFirstGulp); // See ____desktop.js
    window.addEventListener("wheel",wheelWorksSoCancelClickAndDrag,{ once:true });
    main.addEventListener("mousedown",checkIfShouldPlayTheDesktopGameWithoutMouseWheel);
    function wheelWorksSoCancelClickAndDrag() { //  event.preventDefault();
      // prevent default THROWS ERROR: Unable to preventDefault inside passive event listener due to target being treated as passive
      if (mouseInstructionDisappearTimeout) { // Hide the instruction earlier than normal if was showing
        mouseInstructionDisappearTimeout.clear(); // clearTimeout(mouseInstructionDisappearTimeout); // Prevent the normal disappearance
        showHowDesktop.classList.remove("appearQuickly"); showHowDesktop.classList.add("disappearSlowly"); // Replace it with an earlier disappearance
      }
      // GAME WILL BE PLAYED WITH MOUSEWHEEL
      console.log("Game will be played with mouse wheel -> Drag will not work");
      main.removeEventListener("mousedown",checkIfShouldPlayTheDesktopGameWithoutMouseWheel);
      // -
    }
    function checkIfShouldPlayTheDesktopGameWithoutMouseWheel() {
      console.log("See if drag will happen");
      main.addEventListener("mousemove",userTriedToDrag,{ once:true });
      main.addEventListener("mouseup",userHasLetGoWithoutDragging,{ once:true });
    }
    function userHasLetGoWithoutDragging() {
      console.log("Nope, drag did not happen");
      main.removeEventListener("mousemove",userTriedToDrag); // Cancel waiting for drag
    }
    function userTriedToDrag(event) {
      console.log("Drag happened -> Wheel will not work");
      main.classList.remove("defaultCursor"); main.classList.add("noCursor");
      main.removeEventListener("wheel",updateGlassTiltDesktopUntilFirstGulp);
      window.removeEventListener("wheel",wheelWorksSoCancelClickAndDrag);
      main.removeEventListener("mousemove",userTriedToDrag); // Cancel waiting for drag
      main.removeEventListener("mousedown",checkIfShouldPlayTheDesktopGameWithoutMouseWheel); // Already confirmed at this point
      main.removeEventListener("mouseup",userHasLetGoWithoutDragging); // EVEN THOUGH mousemove listener is already turned OFF
      // Alternative way to win the game
      let initialPoint = event.clientY;
      initialPoint = Math.round(initialPoint);
      clickAndDragToDrinkWithoutWheel(initialPoint);
    }
  }, getReadyTime);
}

function getReadyToStartTheGameOnMOBILEtouchstart(event) { event.preventDefault(); event.stopPropagation();
  getNormalGlass(); // Sudden focus will happen if was blurred
  if (canVibrate) { navigator.vibrate(10); }
  parent.console.log("user has started touching preciseTouchClickArea");
  mouseHoverAndTouchStartSound.play();
  // See stopLoopingAndGetToNewPosition where blur unblur is handled
  glassContainerBeforeGame.classList.add("glassFlashesBriefly");
}

var tiltIsNotAvailableSoWillPlayWithTouchmove = false;
function getReadyToStartTheGameOnMOBILEtouchend(event) { event.preventDefault(); event.stopPropagation();
  if (canVibrate) { navigator.vibrate(10); }
  mouseDownAndTouchEndSound.play();
  lockOrientation(); // Will unlock with onbeforeunload » See js_for_all_iframed_lesson_htmls
  let getReadyTime;  switch (parent.speedAdjustmentSetting) {  case "slow": getReadyTime = 7000; break;  case "fast": getReadyTime = 3000; break;  default: getReadyTime = 5000;  }
  // Feature detect
  console.log("Check if DeviceOrientationEvent.requestPermission exists");
  if (typeof DeviceOrientationEvent.requestPermission === 'function') {
    // iOS
    console.log("Yes, DeviceOrientationEvent.requestPermission exists");
    // unclear: CAN WE MAKE PERMISSIONS PERMANENT AND WHAT HAPPENS IF IT IS ALREADY GIVEN???
    DeviceOrientationEvent.requestPermission()
      .then(permissionState => {
        if (permissionState === 'granted') { // Good and now let's test it
          stopLoopingAndGetToNewPosition(); // This will let us have enough time to check if deviceorientation will work
          testDeviceorientation();
          new SuperTimeout(function () {
            console.log("proceed to drink_water_from_glass_mobile.js");
            showHowToPlayOnMobile(tiltIsNotAvailableSoWillPlayWithTouchmove); // See drink_water_from_glass_mobile.js
          }, getReadyTime);
        } else {
          stopLoopingAndGetToNewPosition(); // Proceed anyhow
          tiltIsNotAvailableSoWillPlayWithTouchmove = true;
          new SuperTimeout(function () {
            console.log("proceed to drink_water_from_glass_mobile.js");
            showHowToPlayOnMobile(tiltIsNotAvailableSoWillPlayWithTouchmove); // See drink_water_from_glass_mobile.js
          }, getReadyTime);
        }
      })
      .catch(console.error);
  } else {
    // Android
    console.log("No, DeviceOrientationEvent.requestPermission does not exist");
    stopLoopingAndGetToNewPosition(); // This will let us have enough time to check if deviceorientation will work
    testDeviceorientation();
    new SuperTimeout(function () {
      console.log("proceed to drink_water_from_glass_mobile");
      showHowToPlayOnMobile(tiltIsNotAvailableSoWillPlayWithTouchmove); // See drink_water_from_glass_mobile.js
    }, getReadyTime);
  }
} // END OF getReadyToStartTheGameOnMOBILEtouchend

let deviceorientationHasNeverFired = true;
function testDeviceorientation() {
  console.log("testing deviceorientation");
  window.addEventListener("deviceorientation",tryToReadBetaAndGamma,{once:true});
  function tryToReadBetaAndGamma(event) {
    deviceorientationHasNeverFired = false;
    let b = null;
    let g = null;
    try {
      b = event.beta;
      g = event.gamma;
    } catch (e) {
      tiltIsNotAvailableSoWillPlayWithTouchmove = true; console.log("deviceorientation fired but event.beta and/or event.gamma threw an error");
    } finally {
      if (b || g) {
        console.log("deviceorientation is working");
      } else {
        tiltIsNotAvailableSoWillPlayWithTouchmove = true; console.log("deviceorientation fired but cannot read event.beta and/nor event.gamma");
      }
    }
  }
  new SuperTimeout(check, 2000);
  function check() {
    if (deviceorientationHasNeverFired) {
      tiltIsNotAvailableSoWillPlayWithTouchmove = true; console.log("deviceorientation doesn't fire at all");
      window.removeEventListener("deviceorientation",tryToReadBetaAndGamma);
    } else {
      console.log("can play the game with deviceorientation");
    }
  }
}


// Continue with DESKTOP or MOBILE
