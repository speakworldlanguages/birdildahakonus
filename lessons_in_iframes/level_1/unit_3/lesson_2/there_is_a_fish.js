"use strict";
// Code written by Manheart Earthman=B. A. Bilgekılınç Topraksoy=土本 智一勇夫剛志
// UNAUTHORIZED MODIFICATION IS PROHIBITED: You may not change this file without obtaining permission


/* __ SAVE PROGRESS TO LOCAL STORAGE __ */
// See js_for_the_parent_all_browsers_all_devices to find how savedProgress.ja savedProgress.zh savedProgress.tr savedProgress.ar savedProgress.en are created
const studiedLang = parent.langCodeForTeachingFilePaths.substr(0,2); // en_east en_west will use the same save-slot
// !!! VERY CAREFUL: Watch the lesson name!!!
parent.savedProgress[studiedLang].lesson_THEREISAFISHINTHEWATER_IsViewed=true; // Create and add... or overwrite the same thing
parent.saveJSON = JSON.stringify(parent.savedProgress); // Convert
localStorage.setItem("memoryCard", parent.saveJSON); // Save

/* __ TEXT TO BE INJECTED INTO EXPLANATION/TRANSLATION SUBTITLE/BOX __ */
const translationPath = "/user_interface/text/"+userInterfaceLanguage+"/1-3-2.txt"; // The translation of what is being said, to be put into the helpbox/subtitles.
let translation1 = "…"; // Warning: Without an initial value it returns UNDEFINED before fetch() actually gets the file.
let translation2 = "…"; // Warning: Without an initial value it returns UNDEFINED before fetch() actually gets the file.
let translation3 = "…"; // Warning: Without an initial value it returns UNDEFINED before fetch() actually gets the file.
// OPTIONAL: fetches can happen after window load unless it is an immediate info box to be displayed at the beginning of the lesson
fetch(translationPath,myHeaders).then(function(response){return response.text();}).then(function(contentOfTheTxtFile){
  translation1 = contentOfTheTxtFile.split("|")[0];
  translation2 = contentOfTheTxtFile.split("|")[1];
  translation3 = contentOfTheTxtFile.split("|")[2];
});
/* __ TEXT TO BE INJECTED INTO NOTIFICATION BOX AT THE END __ */
const noteAtTheEndOfLessonPath = "/user_interface/text/"+userInterfaceLanguage+"/1-3-2_arabic_ma_shayunma.txt"; // ONLY 1 KB
let differenceBetweenWaterMaAndWhatMa = " ";
if (studiedLang == "ar") {
  fetch(noteAtTheEndOfLessonPath,myHeaders).then(function(response){return response.text();}).then(function(contentOfTheTxtFile){ differenceBetweenWaterMaAndWhatMa = contentOfTheTxtFile; });
}

/* ___AUDIO ELEMENTS___ */ //...Sound player (Howler) exists in the parent html. So the path must be relative to the parent html. Not to the framed html.
// Find soundFileFormat in js_for_all_iframed_lesson_htmls
let say1Path = "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_3/lesson_2/there_is_something_in_the_water."+soundFileFormat;
let say2Path = "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_3/lesson_2/there_is_something_in_the_water_slow."+soundFileFormat;
let say3Path = "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_3/lesson_2/huh."+soundFileFormat;
let say4Path = "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_3/lesson_2/it_is_a_fish."+soundFileFormat;
let say5Path = "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_3/lesson_2/there_is_a_fish_in_the_water."+soundFileFormat;

const say1 = new parent.Howl({  src: [say1Path]  });
const say2 = new parent.Howl({  src: [say2Path]  });
const say3 = new parent.Howl({  src: [say3Path]  });
const say4 = new parent.Howl({  src: [say4Path]  });
const say5 = new parent.Howl({  src: [say5Path]  });

/*const mouseHoverAndTouchStartSound = new parent.Howl({  src: ["/lessons_in_iframes/level_1/unit_3/lesson_2/mouseenter_touchstart."+soundFileFormat]  });
const mouseDownAndTouchEndSound = new parent.Howl({  src: ["/lessons_in_iframes/level_1/unit_3/lesson_2/mousedown_touchend."+soundFileFormat]  });*/
const waterfallSound = new parent.Howl({  src: ["/lessons_in_iframes/level_1/unit_3/lesson_2/waterfall_loop."+soundFileFormat] , loop:true });
const fishswimSound = new parent.Howl({  src: ["/lessons_in_iframes/level_1/unit_3/lesson_2/fishswim_loop."+soundFileFormat] , loop:true });
const fishJump1 = new parent.Howl({  src: ["/lessons_in_iframes/level_1/unit_3/lesson_2/fish_jumps_1."+soundFileFormat]  });
const fishJump2 = new parent.Howl({  src: ["/lessons_in_iframes/level_1/unit_3/lesson_2/fish_jumps_2."+soundFileFormat]  });
const winSound = new parent.Howl({  src: ["/lessons_in_iframes/level_1/unit_3/lesson_2/successfully_observed_the_fish."+soundFileFormat]  });
/* Sound initialization happens on the parent but the consts exist in frame. SEE js_for_all_iframed_lesson_htmls » FIND onbeforeunload. */
// listOfAllSoundsInThisLesson is also used by pauseTheAppFunction in js_for_the_sliding_navigation_menu
var listOfAllSoundsInThisLesson = [
  // winSound, // Common practice » unload the last heard sound after iframe.src change so that it won't stop playing in the middle
  fishswimSound,
  waterfallSound,
  /*mouseDownAndTouchEndSound,
  mouseHoverAndTouchStartSound,*/
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
const firstCloud = document.getElementById("cloud1ID");
const secondCloud = document.getElementById("cloud2ID");
if (parent.lastRecordedWindowWidth>parent.lastRecordedWindowHeight) { // Apply settings only once if the viewport/window is landscape at the beginning
  /* DEPRECATE
  firstCloud.style.marginLeft = "-40vmin"; // Move the starting position of the clouds a little to the left
  secondCloud.style.marginLeft = "-65vmin"; // Move the starting position of the clouds a little to the left
  */
  firstCloud.classList.add("cloud1Landscape"); secondCloud.classList.add("cloud2Landscape");
  firstCloud.style.animationName = "cloud1StartLandscape"; secondCloud.style.animationName = "cloud2StartLandscape";
} else {
  firstCloud.classList.add("cloud1Portrait"); secondCloud.classList.add("cloud2Portrait");
  firstCloud.style.animationName = "cloud1StartPortait"; secondCloud.style.animationName = "cloud2StartPortait";
}
requestAnimationFrame(function () { requestAnimationFrame(detectEndOfAnimation); });
function detectEndOfAnimation() { firstCloud.addEventListener("animationend", regenerateClouds); }
function regenerateClouds() { //parent.console.log("New clouds on their way...");
  firstCloud.style.animationName = "none"; secondCloud.style.animationName = "none";
  setTimeout(function () {
    if (parent.lastRecordedWindowWidth>parent.lastRecordedWindowHeight) {
      firstCloud.style.animationName = "regeneratedCloud1StartLandscape"; secondCloud.style.animationName = "regeneratedCloud2StartLandscape";
    } else {
      firstCloud.style.animationName = "regeneratedCloud1StartPortait"; secondCloud.style.animationName = "regeneratedCloud2StartPortait";
    }
  }, 250);
}

const swimmingFishContainer = document.getElementById("swimmingFishContainerID");
const swimmingFishImg = document.getElementById("swimmingFishID");
const jumpingFishImg = document.getElementById("jumpingFishID");
const rippleWavesContainer0 = document.getElementById("rippleWavesContainer0ID");
const rippleWavesImg0 = document.getElementById("rippleWavesImg0ID"); // This ripple appears every 7 seconds if both of the other ripples are not showing
const rippleWavesContainer1 = document.getElementById("rippleWavesContainer1ID");
const rippleWavesImg1 = document.getElementById("rippleWavesImg1ID"); // This ripple appears when a key is pressed
const rippleWavesContainer2 = document.getElementById("rippleWavesContainer2ID");
const rippleWavesImg2 = document.getElementById("rippleWavesImg2ID"); // This ripple appears when a key is released

const pictogramStates = document.getElementById("pictogramStatesID");
const fourEyes = document.getElementById("fourEyesID");
const elderEyes = document.getElementById("elderEyesID");
const youngerEyes = document.getElementById("youngerEyesID");

const startingPositionOfTheFish = 18; // vmin
// ---

/* SET OFF */
window.addEventListener('load', loadingIsCompleteFunction, { once: true });
// NOTE THAT: In this case the grammar [info box] must appear after the wavesurfer [listen box]
function loadingIsCompleteFunction() {
  swimmingFishContainer.style.transform = "translateX("+(0+startingPositionOfTheFish).toFixed(3)+"vmin)";
  // --
  // Create a notification box if there is a special case with any particular target language
  if (studiedLang == "ja") {
    // ja » iru aru difference |
    const pathOfNotificationAboutIruAru = "/user_interface/text/"+userInterfaceLanguage+"/1-3-2_hito_animals_plants_inanimates.txt";
    fetch(pathOfNotificationAboutIruAru,myHeaders).then(function(response){return response.text();}).then(function(contentOfTheTxtFile){
      new SuperTimeout(function(){ createAndHandleInfoBoxType1BeforeLessonStarts(); putNotificationTxtIntoThisP1.innerHTML = contentOfTheTxtFile; },501); // See js_for_info_boxes_in_lessons.js
      // createAndHandleInfoBoxType1BeforeLessonStarts will fire startTheLesson 1.5 seconds after its OK button is clicked/touched
    });
  }
  else if (studiedLang == "en") {
    // en » there is there are
    const pathOfNotificationAboutIruAru = "/user_interface/text/"+userInterfaceLanguage+"/1-3-2_eng_singular_plural.txt";
    fetch(pathOfNotificationAboutIruAru,myHeaders).then(function(response){return response.text();}).then(function(contentOfTheTxtFile){
      new SuperTimeout(function(){ createAndHandleInfoBoxType1BeforeLessonStarts(); putNotificationTxtIntoThisP1.innerHTML = contentOfTheTxtFile; },501); // See js_for_info_boxes_in_lessons.js
      // createAndHandleInfoBoxType1BeforeLessonStarts will fire startTheLesson 1.5 seconds after its OK button is clicked/touched
    });
  }
  else if (false) { // Add another here if necessary

  }
  else {
    startTheLesson(); // Call it now if it was not to be called from within createAndHandleInfoBoxType1BeforeLessonStarts() in js_for_all_iframed_lesson_htmls.js
  }
}

function startTheLesson() {
  // User must listen to wavesurfer vocabulary box no matter what language he/she is studying
  const filePathOfTheAudioFile = "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_3/lesson_2/there_is_listenbox."+soundFileFormat;
  const wavesurferP1P2Path = "/user_interface/text/"+userInterfaceLanguage+"/1-3-2_vocabulary_p1_p2.txt"; // UI lang depends on domain (hostname) » See js_for_every_single_html
  fetch(wavesurferP1P2Path,myHeaders).then(function(response){return response.text();}).then(function(contentOfTheTxtFile){  handleP1P2ActualText(contentOfTheTxtFile);  });
  // See js_for_info_boxes_in_lessons » iframe-lesson level
  new SuperTimeout(function(){    createAndHandleListenManyTimesBox(filePathOfTheAudioFile);    },501); // Wait for preloader to disappear or give a brief break after notification
}

let isParentBlurred = true; // Clicking on iframe blurs/deselects the parent,,, so start blurred as the only way to proceed is to click the buttons of the wavesurfer box
let isFrameBlurred = false; // Clicking on iframe brings-focus-to/selects the frame,,, so start focused
function vocabularyBoxIsClosed(x,y) { // Will fire from within createAndHandleListenManyTimesBox with touch/click coordinate values passed » vocabularyBoxIsClosed(lastPointerX,lastPointerY)
  // console.log("lesson intro listenbox is closed");
  // No use for last mouse or touch coordinates: x, y
  isParentBlurred = true; // Clicking on iframe blurs the parent,,, so start blurred
  isFrameBlurred = false; //
  // --
  firstCloud.style.animationPlayState = "running"; secondCloud.style.animationPlayState = "running";
  // --
  unblurAndZoomIn();
}
// See pauseTheAppFunction and unpauseAndContinueFunction in js_for_the_sliding_navigation_menu
function pauseCSSAnimations() { firstCloud.style.animationPlayState = "paused"; secondCloud.style.animationPlayState = "paused"; }
function unpauseCSSAnimations() { firstCloud.style.animationPlayState = "running"; secondCloud.style.animationPlayState = "running"; }

function unblurAndZoomIn() {
  let unblurTime;  switch (parent.speedAdjustmentSetting) {  case "slow": unblurTime = 2.0; break;  case "fast": unblurTime = 0.5; break;  default: unblurTime = 0.9;  }
  main.style.transitionDuration = String(unblurTime)+"s";
  main.style.filter = "blur(0px)";
  new SuperTimeout(function () { main.style.filter = "none"; }, unblurTime*1100);
  main.classList.add("startZoomingIn");
  // --
  waterfallSound.play(); waterfallSound.fade(0,1,3500);
  fishswimSound.play(); fishswimSound.volume(0);
  // --
  new SuperInterval(function () { createRipple0(); }, 7000); // Looks like keydown event can somehow stop or slow down the ticking of set-Interval or there is smth else going on
  window.requestAnimationFrame(updateTheScene);
  // --
  if (deviceDetector.isMobile) {
    // Mobile CPU too weak for requestAnimationFrame???
    // Mobile CPU too weak to handle huge avif sprite???
    // Both the movement of the clouds and the fish will be done with R.A.F. as well as the dynamic eye movement of the pictograms
    // DEPRECATE: Use united function window.requestAnimationFrame(updateTheSceneMOBILE); // set-Interval appears to be slightly less CPU intensive than requestAnimationFrame BUT can give an unsmooth result
    handleInputForPlayingTheFishGameWithTouchscreen();
    new SuperTimeout(function () { showHowToSwimMOBILE(); }, 8750); // Zoom takes 8.75s See there_is_a_fish.css » startZoomingIn
  } else {

    //window.requestAnimationFrame(updateTheScene);
    // Both the movement of the clouds and the fish will be done with R.A.F. as well as the dynamic eye movement of the pictograms
    // DEPRECATE: Use united function window.requestAnimationFrame(updateTheSceneDESKTOP); // set-Interval appears to be slightly less CPU intensive than requestAnimationFrame BUT can give an unsmooth result
    hideTheCursorAndHandleAutoUnhideAutoHide(); // See js_for_all_iframed_lesson_htmls
    handleInputForPlayingTheFishGameWithTheKeyboard();
    new SuperTimeout(function () { if (!looksLikeUserAlreadyKnowsHowToSwim) { showHowToSwimDESTKOP(); } }, 8750); // Zoom takes 8.75s See there_is_a_fish.css » startZoomingIn
  }
} // END OF unblurAndZoomIn

let fishIsHearing = false; // Not listening but just hearing the underwater sound
function changeSoundToFishswim() {  waterfallSound.fade(1,0,500);  fishswimSound.fade(0,1,500); fishIsHearing = true; }
function changeSoundToWaterfall() {  waterfallSound.fade(0,1,500);  fishswimSound.fade(1,0,500); fishIsHearing = false; }

let start, previousTimeStamp;
let fishSpeed = 0;
let thePositionDifferenceOfTheFish = 0; let firstThresholdIsPassed = false; let secondThresholdIsPassed = false;
let looksLikeUserAlreadyKnowsHowToSwim = false;
let eyesMayFollowTheFish = false;
let fishIsInTheAir = false;
let winHasHappened = false;
function updateTheScene(timestamp) {
  if (anOutroBoxIsNowShowing) { return; }
  if (start === undefined) {    start = timestamp;  }
  let elapsed = timestamp - start;
  // --
  if (previousTimeStamp !== timestamp) { // As suggested by Mozilla
/* DEPRECATED
    if (!winHasHappened) { // Skip cloud calculations after win happens to reduce demand on hardware
      const cloud1Coordinates = firstCloud.getBoundingClientRect();
      const cloud2Coordinates = secondCloud.getBoundingClientRect();
      // See js_for_the_parent_all_browsers_all_devices for lastRecordedWindowWidth lastRecordedWindowHeight
      // Measure position of clouds in webps with Shotofop
      if ((parent.lastRecordedWindowWidth - cloud1Coordinates.width/2.66)<cloud1Coordinates.left && (parent.lastRecordedWindowWidth - cloud2Coordinates.width/16)<cloud2Coordinates.left) {
        // console.log("Bring the new clouds"); // Works OK
        start = timestamp; // Use the old clouds anew!
        firstCloud.style.marginLeft = ((0 - (parent.lastRecordedWindowWidth/2 - cloud1Coordinates.width/2) - cloud1Coordinates.width/1.43)*2).toFixed(1)+"px";
        secondCloud.style.marginLeft = ((0 - (parent.lastRecordedWindowWidth/2 - cloud1Coordinates.width/2) - cloud1Coordinates.width/1.43)*2).toFixed(1)+"px";
        // --
        elapsed = 0; // Glitch prevention
      }
      // Update the clouds
      firstCloud.style.transform = "translateX("+(elapsed/1750).toFixed(4)+"vmin)";
      secondCloud.style.transform = "translateX("+(elapsed/1250).toFixed(4)+"vmin)";
    }
*/
    // Calculate fish speed and position
    if (leftArrowIsAlreadyPressed && !rightArrowIsAlreadyPressed) {
      if (fishSpeed<=0) { fishSpeed = fishSpeed-0.004; } // Normal acceleration
      else { fishSpeed = fishSpeed-0.040; } // Emergency brake when pressed arrow is in the opposite direction of movement
    }
    if (rightArrowIsAlreadyPressed && !leftArrowIsAlreadyPressed) {
      if (fishSpeed>=0) { fishSpeed = fishSpeed+0.004; } // Normal acceleration
      else { fishSpeed = fishSpeed+0.040; } // Emergency brake when pressed arrow is in the opposite direction of movement
    }
    if (!rightArrowIsAlreadyPressed && !leftArrowIsAlreadyPressed) { fishSpeed = fishSpeed*0.95; } // No keys
    if (rightArrowIsAlreadyPressed && leftArrowIsAlreadyPressed) { fishSpeed = fishSpeed*0.80; } // Both keys
    // _________
    if (fishSpeed>0.25) { fishSpeed = 0.25; } // Speed limit
    if (fishSpeed<-0.25) { fishSpeed = -0.25; } // Speed limit
    if (thePositionDifferenceOfTheFish>4.6) { thePositionDifferenceOfTheFish = 4.6; } // Left and right edges limit
    if (thePositionDifferenceOfTheFish<-18) { thePositionDifferenceOfTheFish = -18; } // Left and right edges limit
    thePositionDifferenceOfTheFish = thePositionDifferenceOfTheFish + fishSpeed;
    // from -18 to 4.6 » full range is 22.6 » half is 11.3
    // Therefore midpoint should be located where thePositionDifferenceOfTheFish is -18+11.3 = 4.6-11.3 = -6.7
    // --
    if (fishSpeed>0 && !swimmingFishImg.parentNode.classList.contains("flipTheFish")) {
      swimmingFishImg.parentNode.classList.add("flipTheFish"); jumpingFishImg.parentNode.classList.add("flipTheFish");
    } // Face right
    else if (fishSpeed<0 && swimmingFishImg.parentNode.classList.contains("flipTheFish")) {
      swimmingFishImg.parentNode.classList.remove("flipTheFish"); jumpingFishImg.parentNode.classList.remove("flipTheFish");
    } // Face left
    else {    } // No change
    // --
    // First threshold at -5 » START EYE MOVEMENT
    if (thePositionDifferenceOfTheFish<-1.5 && !firstThresholdIsPassed) {
      firstThresholdIsPassed = true; // The point of no-return
      // Move with transition only once and then remove transition to switch to live update
      fourEyes.style.marginLeft = (0.4+((thePositionDifferenceOfTheFish+5)/75)).toFixed(4)+"vmin";
      fourEyes.style.marginTop = "0.5vmin"; youngerEyes.style.marginBottom = "0.1vmin";
      new SuperTimeout(function () { fourEyes.classList.remove("ezMuv"); eyesMayFollowTheFish = true; }, 1000);
    }
    if (firstThresholdIsPassed && eyesMayFollowTheFish) { letTheEyesFollowTheFish(); }
    // Second threshold at -8 » START POINTING FINGER
    if (thePositionDifferenceOfTheFish<-12 && !secondThresholdIsPassed) {
      secondThresholdIsPassed = true; // The point of no-return
      letThePictogramStartTalking();
    }
    // Update the fish
    swimmingFishContainer.style.transform = "translateX("+(0+startingPositionOfTheFish+thePositionDifferenceOfTheFish).toFixed(3)+"vmin)";
    // --
    // Check if show-how-to-swim should be prevented
    if (!looksLikeUserAlreadyKnowsHowToSwim && Math.abs(thePositionDifferenceOfTheFish)>0.8) {
      looksLikeUserAlreadyKnowsHowToSwim = true; hideTheKeyboardVisualsEarlierThanNormalIfWasShowing();
    }
  }
  // --
  previousTimeStamp = timestamp;
  window.requestAnimationFrame(updateTheScene);
} // End of updateTheScene
// ---
function letTheEyesFollowTheFish() { // Tested: NICE ENOUGH
  fourEyes.style.marginLeft = (0.4+((thePositionDifferenceOfTheFish+5)/75)).toFixed(4)+"vmin";
  // No need to update a value that is already fixed: fourEyes.style.marginTop = "0.5vmin";
}
function hideAllStatesOfPictograms() {
  pictogramStates.children[0].style.display = "none";
  pictogramStates.children[1].style.display = "none";
  pictogramStates.children[2].style.display = "none";
  pictogramStates.children[3].style.display = "none";
  pictogramStates.children[4].style.display = "none";
  pictogramStates.children[5].style.display = "none";
  pictogramStates.children[6].style.display = "none";
  pictogramStates.children[7].style.display = "none";
  pictogramStates.children[8].style.display = "none";
}
// ---
let repeatSay2Timeout = null; let keyboardTimeout3 = null; let keyboardTimeout4 = null;
let theFishMayJumpNow = false;
function letThePictogramStartTalking() {
  let nextImageTime;  switch (parent.speedAdjustmentSetting) {  case "slow": nextImageTime = 5000; break;  case "fast": nextImageTime = 3000; break;  default: nextImageTime = 4000;  }
  pictogramStates.children[0].style.display = "none"; elderEyes.style.visibility = "hidden"; // DO NOT USE display none because position:relative top:100vmin
  pictogramStates.children[1].style.display = "block"; // Points his finger to water // 7 x 70ms = 490ms
  new SuperTimeout(function () { say1.play(); injectTextIntoTheHelpBoxP.innerHTML = translation1; parent.console.log("Says..."); }, nextImageTime/5); // This is the quicker say
  new SuperTimeout(function () { parent.console.log("Younger one stops watching the fish");
    pictogramStates.children[1].style.display = "none"; resetWebp(pictogramStates.children[1]); youngerEyes.style.visibility = "hidden";
    pictogramStates.children[2].style.display = "block"; // Younger one turns his head
  }, nextImageTime*1.6);
  new SuperTimeout(function () { parent.console.log("Says again...");
    pictogramStates.children[2].style.display = "none"; // Static webp » no animation
    pictogramStates.children[3].style.display = "block"; // Fish to question mark <-> Question mark back to fish
    say2.play(); injectTextIntoTheHelpBoxP.innerHTML = translation1; // This is the slower say
  }, nextImageTime*2);
  if (deviceDetector.isMobile) {
    new SuperTimeout(function () { showHowToJumpMOBILE(); theFishMayJumpNow = true; }, nextImageTime*4.1);
  } else {
    keyboardTimeout3 = new SuperTimeout(function () { showHowToJumpDESKTOP(); console.log("Arrow keys appear"); theFishMayJumpNow = true; }, nextImageTime*4.1);
  }
  repeatSay2Timeout = new SuperTimeout(function () { say2.play(); injectTextIntoTheHelpBoxP.innerHTML = translation1; parent.console.log("Says again one last time..."); }, nextImageTime*6.3);
}
// ---
function showHowToSwimMOBILE() {
  let showTime;  switch (parent.speedAdjustmentSetting) {  case "slow": showTime = 2800; break;  case "fast": showTime = 1200; break;  default: showTime = 2000;  }
  new SuperTimeout(function () {  touchscreenControls.classList.add("itAppears");  }, showTime);
}
function showHowToJumpMOBILE(option) {
  let showTime;  switch (parent.speedAdjustmentSetting) {  case "slow": showTime = 900; break;  case "fast": showTime = 300; break;  default: showTime = 600;  }
  fishJumpButton.style.visibility = "visible";
  setTimeout(function () { fishJumpButton.style.visibility = "hidden";  }, showTime);
  setTimeout(function () { fishJumpButton.style.visibility = "visible"; }, showTime*2);
  if (option == "shorter_blink") { return; }
  setTimeout(function () { fishJumpButton.style.visibility = "hidden";  }, showTime*3);
  setTimeout(function () { fishJumpButton.style.visibility = "visible"; }, showTime*4);
  setTimeout(function () { fishJumpButton.style.visibility = "hidden";  }, showTime*5);
  setTimeout(function () { fishJumpButton.style.visibility = "visible"; }, showTime*6);
}
let keyboardTimeout1,keyboardTimeout2;
function showHowToSwimDESTKOP() {
  let showTime;  switch (parent.speedAdjustmentSetting) {  case "slow": showTime = 2800; break;  case "fast": showTime = 1200; break;  default: showTime = 2000;  }
  // Show
  document.body.appendChild(keyboardInstructionPart1); // 10x50ms = 500ms fade in
  // Change and then hide
  keyboardTimeout1 = new SuperTimeout(function () {
    // Switch from 1 to 2
    if (document.body.contains(keyboardInstructionPart1)) {
      resetWebp(keyboardInstructionPart1);
      requestAnimationFrame(function () { keyboardInstructionPart1.remove(); });
      document.body.appendChild(keyboardInstructionPart2); // 400+400+400+400+ 8*250 + 999999 = 3600(animation) + stay + fade(1500)
    }
    // Hide
    keyboardTimeout2 = new SuperTimeout(function () {
      if (document.body.contains(keyboardInstructionPart2)) {
        keyboardInstructionPart2.classList.add("itDisappears"); //1500 ms
        new SuperTimeout(function () { keyboardInstructionPart2.classList.remove("itDisappears");
        resetWebp(keyboardInstructionPart2); requestAnimationFrame(function () { keyboardInstructionPart2.remove(); });
      }, 1501);
      }
    }, showTime+4000); // ARROW KEYS WEBP starts fading to nothingness in 1800+4000 = 5800,,, 5800-3600 = 2200 last frame stay time at normal speed
  }, showTime); // From whole keyboard webp to ARROW KEYS WEBP

} // END OF showHowToSwimDESTKOP
function showHowToJumpDESKTOP() {
  let showTime;  switch (parent.speedAdjustmentSetting) {  case "slow": showTime = 2800; break;  case "fast": showTime = 1200; break;  default: showTime = 2000;  }
  // Show
  document.body.appendChild(keyboardInstructionPart3);
  // Hide
  keyboardTimeout4 = new SuperTimeout(function () {
    if (document.body.contains(keyboardInstructionPart3)) { console.log("Arrow keys disappear");
      keyboardInstructionPart3.classList.add("itDisappears"); //1500 ms
      new SuperTimeout(function () { keyboardInstructionPart3.classList.remove("itDisappears");
      resetWebp(keyboardInstructionPart3);
      requestAnimationFrame(function () { keyboardInstructionPart3.remove(); });
    }, 1501);
    }
  }, showTime+4000);
}
function hideTheKeyboardVisualsEarlierThanNormalIfWasShowing() {
  if (keyboardTimeout1) { keyboardTimeout1.clear(); }
  if (keyboardTimeout2) { keyboardTimeout2.clear(); }
  if (document.body.contains(keyboardInstructionPart1)) {
    keyboardInstructionPart1.classList.add("itDisappears"); //1500 ms
    new SuperTimeout(function () { keyboardInstructionPart1.classList.remove("itDisappears");
    resetWebp(keyboardInstructionPart1);
    requestAnimationFrame(function () { keyboardInstructionPart1.remove(); });
  }, 1501);
  }
  if (document.body.contains(keyboardInstructionPart2)) {
    keyboardInstructionPart2.classList.add("itDisappears"); //1500 ms
    new SuperTimeout(function () { keyboardInstructionPart2.classList.remove("itDisappears");
    resetWebp(keyboardInstructionPart2);
    requestAnimationFrame(function () { keyboardInstructionPart2.remove(); });
  }, 1501);
  }
}

// ---
let numberOfJumps = 0;
function makeTheFishJumpOutOfWater() {
  injectTextIntoTheHelpBoxP.innerHTML = "…";
  if (repeatSay2Timeout) { repeatSay2Timeout.clear(); }
  say2.stop(); // It should be OK if we don't check whether say2.playing() is true or false
  if (document.body.contains(keyboardInstructionPart3)) {
    resetWebp(keyboardInstructionPart3);
    requestAnimationFrame(function () { keyboardInstructionPart3.remove(); });
  }
  // Make the fish actually jump
  swimmingFishImg.style.display = "none"; jumpingFishImg.style.display = "block";
  numberOfJumps++;
  // --
  if (thePositionDifferenceOfTheFish<-6.7) { // If the fish is closer to the left side of the screen, make it jump towards right
    let interval = setInterval(function () {      fishSpeed += 0.052;    }, 100); // See fishSpeed max
    setTimeout(function () {      clearInterval(interval);    }, 1600);
  } else { // Otherwise make it jump towards left
    let interval = setInterval(function () {      fishSpeed -= 0.052;    }, 100); // See fishSpeed max
    setTimeout(function () {      clearInterval(interval);    }, 1600);
  }

  // -- Play splash sounds: Alternate one every other time
  if (numberOfJumps % 2 === 1) { fishJump1.play(); } else { fishJump2.play(); }
  // -- Create ripples
  if (canVibrate) { navigator.vibrate([8,100,8,100,8]); }
  setTimeout(function () {    if (!rippleOneIsAlreadyShowing) { createRipple1(); }  if (canVibrate) { navigator.vibrate([14,40,14,40,14,40,14,40,14]); }    }, 700);
  setTimeout(function () {    if (!rippleTwoIsAlreadyShowing) { createRipple2(); }  if (canVibrate) { navigator.vibrate([13,40,12,50,11,65,10,85,9,110,8,140,7]); }    }, 1300);
  // --
  if (numberOfJumps === 1) {
    theFishMayJumpNow = false; // Prevent the second jump until it's time
    hideAllStatesOfPictograms();
    // Speech bubble (with question) shrinks
    pictogramStates.children[4].style.display = "block"; // 7 x 70ms = 490ms
    new SuperTimeout(function () {
      // Play Huh? surprise sound like plants vs zombies squash
      say3.play(); parent.console.log("Huh? What's that?");
      // Make both pictograms look at the fish
      pictogramStates.children[4].style.display = "none"; resetWebp(pictogramStates.children[4]);
      pictogramStates.children[0].style.display = "block";
      elderEyes.style.visibility = "visible"; youngerEyes.style.visibility = "visible";
    },1100);
    let reactionTime;  switch (parent.speedAdjustmentSetting) {  case "slow": reactionTime = 5250; break;  case "fast": reactionTime = 3250; break;  default: reactionTime = 4250;  }
    new SuperTimeout(function () {
      // Make pictograms look at each other
      elderEyes.style.visibility = "hidden"; youngerEyes.style.visibility = "hidden";
      // Show state d: speech bubble grows with fish in it
      pictogramStates.children[0].style.display = "none"; // Static webp » no animation
      pictogramStates.children[5].style.display = "block"; // 7 x 70ms = 490ms
      new SuperTimeout(function () { say4.play(); injectTextIntoTheHelpBoxP.innerHTML = translation2; parent.console.log("It´s a fish!"); }, reactionTime/5);
      let nextActionTime;  switch (parent.speedAdjustmentSetting) {  case "slow": nextActionTime = 7500; break;  case "fast": nextActionTime = 4500; break;  default: nextActionTime = 6000;  }
      new SuperTimeout(function () {
        // Speech bubble (with question) shrinks
        pictogramStates.children[5].style.display = "none"; resetWebp(pictogramStates.children[5]);
        pictogramStates.children[6].style.display = "block"; // 7 x 70ms = 490ms
        new SuperTimeout(function () { parent.console.log("Both look at the fish again");
          injectTextIntoTheHelpBoxP.innerHTML = "…";
          // Make both pictograms watch the fish again
          pictogramStates.children[6].style.display = "none"; resetWebp(pictogramStates.children[6]);
          pictogramStates.children[0].style.display = "block";
          elderEyes.style.visibility = "visible"; youngerEyes.style.visibility = "visible";
          theFishMayJumpNow = true;
          if (deviceDetector.isMobile) {         showHowToJumpMOBILE("shorter_blink");          }
          // We will expect desktop user to be smart enough to try and jump at least one more time
        }, 500);
      },nextActionTime);
    },reactionTime);
    // --
  } else if (numberOfJumps === 2) {
    // No need to prevent the third jump or any of the following
    new SuperTimeout(function () {
      hideAllStatesOfPictograms();
      // Make pictograms look at each other
      elderEyes.style.visibility = "hidden"; youngerEyes.style.visibility = "hidden";
      // Show state e: speech bubble grows with fish and water in it
      pictogramStates.children[7].style.display = "block";
    },2000);
    let reactionTime;  switch (parent.speedAdjustmentSetting) {  case "slow": reactionTime = 5000; break;  case "fast": reactionTime = 3000; break;  default: reactionTime = 4000;  }
    new SuperTimeout(function () {
      say5.play(); injectTextIntoTheHelpBoxP.innerHTML = translation3; parent.console.log("There is a fish in the water!");
      let endingActionTime;  switch (parent.speedAdjustmentSetting) {  case "slow": endingActionTime = 7000; break;  case "fast": endingActionTime = 4000; break;  default: endingActionTime = 5500;  }
      new SuperTimeout(function () { parent.console.log("Both smile and then look at the camera");
        setTimeout(function () { winSound.play(); }, 2800); // respect the timing in webp
        // Make pictograms look at the camera
        elderEyes.style.visibility = "hidden"; youngerEyes.style.visibility = "hidden";
        // Show state f: speech bubble with fish (and water) shrinks and then pictograms do their smiles
        pictogramStates.children[7].style.display = "none"; resetWebp(pictogramStates.children[7]);
        pictogramStates.children[8].style.display = "block"; // This also needs resetting at the end of the lesson but it's not that big of a deal...
        let proceedTime;  switch (parent.speedAdjustmentSetting) {  case "slow": proceedTime = 6500; break;  case "fast": proceedTime = 3500; break;  default: proceedTime = 5000;  }
        new SuperTimeout(function () { parent.console.log("End of this lesson");
          injectTextIntoTheHelpBoxP.innerHTML = "…";
          // if (fishIsHearing) { fishswimSound.fade(0.75,0,1500); } else { waterfallSound.fade(0.75,0,1500); }
          fishswimSound.fade(0.5,0,1500);
          waterfallSound.fade(0.5,0,1500);
          handleWinning();
        }, proceedTime);
      },endingActionTime);
    },reactionTime);
  }

  // fish_jumps.webp 50x50ms = 2500ms
  setTimeout(function () {    swimmingFishImg.style.display = "block"; jumpingFishImg.style.display = "none"; resetWebp(jumpingFishImg); fishIsInTheAir = false;   }, 2500);
}
let anOutroBoxIsNowShowing = false; // 1 - To block keyboard input when needed 2 - To exit RAF loop
function handleWinning() {
  // Display wavesurfer box about the meaning of "a thing" or "something"
  const filePathOfTheAudioFile = "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_3/lesson_2/something_listenbox."+soundFileFormat;
  const wavesurferP1P2Path = "/user_interface/text/"+userInterfaceLanguage+"/1-3-2_vocabulary_outro_p1_p2.txt"; // UI lang depends on domain (hostname) » See js_for_every_single_html
  fetch(wavesurferP1P2Path,myHeaders).then(function(response){return response.text();}).then(function(contentOfTheTxtFile){
    handleP1P2ActualTextOUTRO(contentOfTheTxtFile); // CAUTION: It's outro
  });
  // See js_for_info_boxes_in_lessons » iframe-lesson level
  new SuperTimeout(function(){
    createAndHandleListenManyTimesBox(filePathOfTheAudioFile,true); // true as second parameter turns it into an outro box
    anOutroBoxIsNowShowing = true; // Disable keyboard and quit RAF
    winHasHappened = true;
    // ---
    // ---
    let cloudOpacity = 1;
    let makeCloudsDisappearInterval = setInterval(function () {
      if (cloudOpacity>=0.05) { cloudOpacity -= 0.05; firstCloud.parentNode.style.opacity = String(cloudOpacity); }
      else {   cloudOpacity=0; firstCloud.remove(); secondCloud.remove(); clearInterval(makeCloudsDisappearInterval);  }
    }, 250);
  },501); // If fetch cannot get the file within 501 ms the default content of the box (with emojis icons etc) will be visible until fetch gets the file
}
let checkFishSpeedInterval; let countElapsed = 0;
function vocabularyBoxIsClosed_LESSON_OUTRO() { // Called from createAndHandleListenManyTimesBox with outro enabled by second parameter
  if (studiedLang == "ar") {
    // something shay-un ma & water ma » MA-MA difference
    let boxAppearTime; switch (parent.speedAdjustmentSetting) { case "slow": boxAppearTime = 3500; break;    case "fast": boxAppearTime = 1500; break;    default: boxAppearTime = 2500; }
    new SuperTimeout(function () {
      if (differenceBetweenWaterMaAndWhatMa.length > 2) { // This means fetch successfully got the text
        createAndHandleInfoBoxType1AmidLesson(); putNotificationTxtIntoThisP2.innerHTML = differenceBetweenWaterMaAndWhatMa;
        // continueLesson() will be fired from within createAndHandleInfoBoxType1AmidLesson()
      } else { continueLesson(); } // Hopefull will never happen » Proceed without the end of lesson info box about arabic because fetch couldn't get the file
    }, boxAppearTime);
  } else {
    continueLesson();
  }
} // End of vocabularyBoxIsClosed_LESSON_OUTRO
// ---
function continueLesson() {
  waterfallSound.fade(0,0.5,1500);
  /* Save progress */
  parent.savedProgress[studiedLang].lesson_THEREISAFISHINTHEWATER_IsCompleted=true; // WATCH THE NAME OF THE LESSON!!!
  parent.saveJSON = JSON.stringify(parent.savedProgress); // Convert
  localStorage.setItem("memoryCard", parent.saveJSON); // Save
  // ---
  anOutroBoxIsNowShowing = false;
  window.requestAnimationFrame(updateTheScene); // Restart the loop
  // IDEA: In case user wants to play around and keep swimming let him|her keep swimming
  // Detect if user wants to swim for a while by checking fish speed
  // Go to next lesson if fish speed is near zero for more than 4.5 seconds
  let enoughWaitTime;  switch (parent.speedAdjustmentSetting) {  case "slow": enoughWaitTime = 6; break;  case "fast": enoughWaitTime = 3; break;  default: enoughWaitTime = 4.5;  }
  checkFishSpeedInterval = setInterval(everyHundredMilliseconds,100);
  function everyHundredMilliseconds() {
    if (Math.abs(fishSpeed)<0.05) { countElapsed += 0.1; } else { countElapsed = 0; }
    if (countElapsed>=enoughWaitTime) { clearInterval(checkFishSpeedInterval); goToTheNextLesson(); }
  }
}
// ---
function goToTheNextLesson() { parent.console.log("Proceeding to the next lesson...");

  waterfallSound.fade(0.5,0,1500);
  let proceedTime;  switch (parent.speedAdjustmentSetting) {  case "slow": proceedTime = 500; break;  case "fast": proceedTime = 100; break;  default: proceedTime = 300;  }
  parent.pathOfWhatWillBeDisplayedUnlessInternetConnectivityIsLost = "/lessons_in_iframes/level_1/unit_3/lesson_3/index.html"; // See js_for_online_and_offline_modes
  new SuperTimeout(function () {
    // ---
    showGlobyPreloaderBeforeExit(); // 1500ms » See js_for_all_iframed_lesson_htmls AND See css_for_preloader_and_orbiting_circles
    // REMEMBER: iframe.src change makes window.onbeforeunload fire in js_for_all_iframed_lesson_htmls.js which then calls unloadTheSoundsOfThisLesson();
    if (parent.internetConnectivityIsNiceAndUsable) { // See js_for_online_and_offline_modes.js
      new SuperTimeout(function () { parent.ayFreym.src = parent.pathOfWhatWillBeDisplayedUnlessInternetConnectivityIsLost; }, 1500);
    } else { parent.console.warn("THE DEVICE IS OFFLINE (detected at the end of lesson");
      const isCached = checkIfNextLessonIsCachedAndRedirectIfNot(133); // See js_for_all_iframed_lesson_htmls
      if (isCached) { parent.console.warn("WILL TRY TO CONTINUE OFFLINE");
        new SuperTimeout(function() { parent.ayFreym.src = parent.pathOfWhatWillBeDisplayedUnlessInternetConnectivityIsLost; }, 1500);
      }
    }
    // ---
  },proceedTime); // If there was a final dialog box then better let it disappear completely before preloader starts appearing

} // FINISH




// ---
let leftArrowIsAlreadyPressed = false; let rightArrowIsAlreadyPressed = false; let upArrowIsAlreadyPressed = false;
function handleInputForPlayingTheFishGameWithTheKeyboard() {
  // The focus will start with being ON the frame as user clicks the button inside vocabularyBox
  window.addEventListener("blur",frameIsBlurred);
  window.addEventListener("focus",frameIsFocused);
  parent.window.addEventListener("blur",parentIsBlurred);
  parent.window.addEventListener("focus",parentIsFocused);
  // CAREFUL: keyboard must be listened at both parent and frame level! So we cannot use {once:true} method to avoid turbo firing when key is held down
  parent.window.addEventListener("keydown",aKeyWasPressed);
  window.addEventListener("keydown",aKeyWasPressed);
  parent.window.addEventListener("keyup",aKeyWasReleased);
  window.addEventListener("keyup",aKeyWasReleased);
  // --
  function aKeyWasPressed(event) { event.preventDefault(); // We need this to prevent volume range slider movement
    // event.stopPropagation(); // This didn't work for unblocking timeouts and intervals ticking »»» Holding a key down seemed to pause all timeouts and intervals
    // NOTE THAT
    // event.key respects OS keyboard type settings ,,, event.code ignores OS and returns QWERTY
    if (!leftArrowIsAlreadyPressed && !parent.theAppIsPaused && !anOutroBoxIsNowShowing) { // See js_for_the_sliding_navigation_menu
      if (event.key == "ArrowLeft" || event.code == "ArrowLeft") {
        leftArrowIsAlreadyPressed = true;
        if (!rippleOneIsAlreadyShowing) { createRipple1(); }
      }
    }
    if (!rightArrowIsAlreadyPressed && !parent.theAppIsPaused && !anOutroBoxIsNowShowing) { // See js_for_the_sliding_navigation_menu
      if (event.key == "ArrowRight" || event.code == "ArrowRight") {
        rightArrowIsAlreadyPressed = true;
        if (!rippleOneIsAlreadyShowing) { createRipple1(); }
      }
    }
    if (!upArrowIsAlreadyPressed && !parent.theAppIsPaused && !anOutroBoxIsNowShowing) { // See js_for_the_sliding_navigation_menu
      if (event.key == "ArrowUp" || event.code == "ArrowUp") {
        upArrowIsAlreadyPressed = true;
        // Check if fish can jump
        if (theFishMayJumpNow && !fishIsInTheAir) {
          if (Math.abs(fishSpeed)<0.1) { // Jump only if the fish isn't moving too fast already
            fishIsInTheAir = true;
            makeTheFishJumpOutOfWater();
          }
        }
      }
    }
    // Any key on the keyboard will make the fish HEAR the water
    if (!fishIsHearing && !anOutroBoxIsNowShowing) { changeSoundToFishswim(); }
  }
  // --
  function aKeyWasReleased(event) { event.preventDefault(); // IMPORTANT! We need this to prevent volume range slider movement
    if (leftArrowIsAlreadyPressed && !parent.theAppIsPaused && !anOutroBoxIsNowShowing) { // See js_for_the_sliding_navigation_menu
      if (event.key == "ArrowLeft" || event.code == "ArrowLeft") {
        leftArrowIsAlreadyPressed = false;
        if (!rippleTwoIsAlreadyShowing) { createRipple2(); }
      }
    }
    if (rightArrowIsAlreadyPressed && !parent.theAppIsPaused && !anOutroBoxIsNowShowing) { // See js_for_the_sliding_navigation_menu
      if (event.key == "ArrowRight" || event.code == "ArrowRight") {
        rightArrowIsAlreadyPressed = false;
        if (!rippleTwoIsAlreadyShowing) { createRipple2(); }
      }
    }
    if (upArrowIsAlreadyPressed && !parent.theAppIsPaused && !anOutroBoxIsNowShowing) { // See js_for_the_sliding_navigation_menu
      if (event.key == "ArrowUp" || event.code == "ArrowUp") {
        upArrowIsAlreadyPressed = false;
      }
    }
    // Stop hearing the water from the fish's perspective
    if (!leftArrowIsAlreadyPressed && !rightArrowIsAlreadyPressed && fishIsHearing && !anOutroBoxIsNowShowing) { changeSoundToWaterfall(); }
  }
  // --
  function frameIsBlurred() {   isFrameBlurred = true;   checkBothBlurs(); console.log("blur was detected over frame");  }
  function frameIsFocused() {   isFrameBlurred = false;  checkBothBlurs(); console.log("focus was detected over frame");  }
  function parentIsBlurred() {  isParentBlurred = true;  checkBothBlurs(); console.log("blur was detected over parent");  }
  function parentIsFocused() {  isParentBlurred = false; checkBothBlurs(); console.log("focus was detected over parent");  }
  function checkBothBlurs() {
    if (true) { // or !winHasHappened
      setTimeout(function () {
        if (isParentBlurred && isFrameBlurred) { // grey out if both are blurred
          //console.log("Both the frame and the parent are blurred");
          // zoomCamera animation is already applied to main
          // We cannot apply a second animation to main
          // main.parentNode.classList.remove("colorBack"); main.parentNode.classList.add("grayAway"); // css_for_every_single_html
          // So we do it without fading
          main.style.filter = "grayscale(100%)";
          parent.containerDivOfTheNavigationMenu.classList.remove("colorBack"); parent.containerDivOfTheNavigationMenu.classList.add("grayAway");
          // UNNECESSARY WITH THE NEW METHOD main.classList.remove("noCursor");  main.classList.add("defaultCursor"); // css_for_every_single_html
        } else { // color back in all other cases
          //console.log("Either one of parent and frame is focused"); // IMPOSSIBLE: parent and frame cannot share focus
          // main.parentNode.classList.remove("grayAway");  main.parentNode.classList.add("colorBack"); // css_for_every_single_html
          // So we do it without fading
          main.style.filter = "grayscale(0%)";
          parent.containerDivOfTheNavigationMenu.classList.remove("grayAway"); parent.containerDivOfTheNavigationMenu.classList.add("colorBack");
        }
      }, 60);
    }
  } // End of checkBothBlurs

} // END OF handleInputForPlayingTheFishGameWithTheKeyboard()
// --
/* NOT USABLE
function removeKeyboardListeners() { //
  parent.window.removeEventListener("keydown",aKeyWasPressed);
  window.removeEventListener("keydown",aKeyWasPressed);
  parent.window.removeEventListener("keyup",aKeyWasReleased);
  window.removeEventListener("keyup",aKeyWasReleased);
  window.removeEventListener("blur",frameIsBlurred);
  window.removeEventListener("focus",frameIsFocused);
  parent.window.removeEventListener("blur",parentIsBlurred);
  parent.window.removeEventListener("focus",parentIsFocused);
}
*/
// --

//__________MOBILE__________
function handleInputForPlayingTheFishGameWithTouchscreen() {
  // alert("fires ok"); //tested ok
  fishJumpButton.addEventListener("touchstart",fishUp);
  fishJumpButton.addEventListener("touchend",hideUntilTheFishCanJumpAgain,{once:true});
  swimLeftButton.addEventListener("touchstart",fishLeft);
  swimRightButton.addEventListener("touchstart",fishRight);
  function hideUntilTheFishCanJumpAgain() { setTimeout(function () { fishJumpButton.style.visibility = "hidden"; }, 500); }
  function fishUp(event) { event.preventDefault(); event.stopPropagation();
    fishJumpButton.children[0].style.display = "none"; fishJumpButton.children[1].style.display = "block";
    // NOT NECESSARY FOR MOBILE upArrowIsAlreadyPressed = true;
    // Check if fish can jump
    if (theFishMayJumpNow && !fishIsInTheAir) {
      if (Math.abs(fishSpeed)<0.1) { // Jump only if the fish isn't moving too fast already
        fishIsInTheAir = true;
        makeTheFishJumpOutOfWater();
      }
    }
  }
  function fishLeft(event) { event.preventDefault(); event.stopPropagation();
    swimLeftButton.children[0].style.display = "none"; swimLeftButton.children[1].style.display = "block";
    leftArrowIsAlreadyPressed = true;
    if (!rippleOneIsAlreadyShowing) { createRipple1(); }
    if (!fishIsHearing && !anOutroBoxIsNowShowing) { changeSoundToFishswim(); }
  }
  function fishRight(event) { event.preventDefault(); event.stopPropagation();
    swimRightButton.children[0].style.display = "none"; swimRightButton.children[1].style.display = "block";
    rightArrowIsAlreadyPressed = true;
    if (!rippleOneIsAlreadyShowing) { createRipple1(); }
    if (!fishIsHearing && !anOutroBoxIsNowShowing) { changeSoundToFishswim(); }
  }
  fishJumpButton.addEventListener("touchend",fishUpCancel);
  swimLeftButton.addEventListener("touchend",fishLeftCancel);
  swimRightButton.addEventListener("touchend",fishRightCancel);
  function fishUpCancel(event) { event.preventDefault(); event.stopPropagation();
    fishJumpButton.children[1].style.display = "none"; fishJumpButton.children[0].style.display = "block";
    // NOT NECESSARY FOR MOBILE upArrowIsAlreadyPressed = false;
  }
  function fishLeftCancel(event) { event.preventDefault(); event.stopPropagation();
    swimLeftButton.children[1].style.display = "none"; swimLeftButton.children[0].style.display = "block";
    leftArrowIsAlreadyPressed = false;
    if (!rippleTwoIsAlreadyShowing) { createRipple2(); }
    if (fishIsHearing && !anOutroBoxIsNowShowing) { changeSoundToWaterfall(); }
  }
  function fishRightCancel(event) { event.preventDefault(); event.stopPropagation();
    swimRightButton.children[1].style.display = "none"; swimRightButton.children[0].style.display = "block";
    rightArrowIsAlreadyPressed = false;
    if (!rippleTwoIsAlreadyShowing) { createRipple2(); }
    if (fishIsHearing && !anOutroBoxIsNowShowing) { changeSoundToWaterfall(); }
  }
}









// RIPPLE CREATION WITHOUT CANVAS
let rippleOneIsAlreadyShowing = false; let rippleTwoIsAlreadyShowing = false;
// When using an animated webp there is the clone-sync issue: Chrome won't play the animations separately even if webps exist in different DIVs and IMGs
// We can duplicate the webp and call different copies of the same webp as a quick fix but not that is not elegant
function createRipple0() {
  if (!rippleOneIsAlreadyShowing || !rippleTwoIsAlreadyShowing) { // Every 7 seconds and only if ripple1 and ripple2 are not showing at the same time
    rippleWavesContainer0.style.visibility = "visible";
    rippleWavesImg0.classList.add("animateSpriteOfRipples");
    // --
    rippleWavesContainer0.children[0].style.transform = "translateX("+(0+startingPositionOfTheFish+thePositionDifferenceOfTheFish).toFixed(3)+"vmin)";
    // Move the mask in the opposite direction of movement to keep it stationary
    rippleWavesContainer0.children[0].style.webkitMaskPosition = (0-startingPositionOfTheFish-thePositionDifferenceOfTheFish).toFixed(3)+"vmin";
    rippleWavesContainer0.children[0].style.maskPosition = (0-startingPositionOfTheFish-thePositionDifferenceOfTheFish).toFixed(3)+"vmin";
    // --
    new SuperTimeout(function () {
      rippleWavesContainer0.style.visibility = "hidden";
      rippleWavesImg0.classList.remove("animateSpriteOfRipples");
    }, 1900); // Ripple animation is (18+1)frames X 100ms = 1800ms + 100ms
  }
} // End of createRipple0
function createRipple1() {
  rippleWavesContainer1.style.visibility = "visible";
  rippleWavesImg1.classList.add("animateSpriteOfRipples");
  rippleOneIsAlreadyShowing = true;
  // --
  rippleWavesContainer1.children[0].style.transform = "translateX("+(0+startingPositionOfTheFish+thePositionDifferenceOfTheFish).toFixed(3)+"vmin)";
  rippleWavesContainer1.children[0].style.webkitMaskPosition = (0-startingPositionOfTheFish-thePositionDifferenceOfTheFish).toFixed(3)+"vmin";
  rippleWavesContainer1.children[0].style.maskPosition = (0-startingPositionOfTheFish-thePositionDifferenceOfTheFish).toFixed(3)+"vmin";
  // --
  new SuperTimeout(function () {
    rippleWavesContainer1.style.visibility = "hidden";
    rippleWavesImg1.classList.remove("animateSpriteOfRipples");
    rippleOneIsAlreadyShowing = false;
  }, 1900);
} // End of createRipple1
function createRipple2() {
  rippleWavesContainer2.style.visibility = "visible";
  rippleWavesImg2.classList.add("animateSpriteOfRipples");
  rippleTwoIsAlreadyShowing = true;
  // --
  rippleWavesContainer2.children[0].style.transform = "translateX("+(0+startingPositionOfTheFish+thePositionDifferenceOfTheFish).toFixed(3)+"vmin)";
  rippleWavesContainer2.children[0].style.webkitMaskPosition = (0-startingPositionOfTheFish-thePositionDifferenceOfTheFish).toFixed(3)+"vmin";
  rippleWavesContainer2.children[0].style.maskPosition = (0-startingPositionOfTheFish-thePositionDifferenceOfTheFish).toFixed(3)+"vmin";
  // --
  new SuperTimeout(function () {
    rippleWavesContainer2.style.visibility = "hidden";
    rippleWavesImg2.classList.remove("animateSpriteOfRipples");
    rippleTwoIsAlreadyShowing = false;
  }, 1900);
} // End of createRipple2
