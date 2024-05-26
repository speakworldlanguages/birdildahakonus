"use strict";
// Code written by Manheart Earthman=B. A. Bilgekılınç Topraksoy=土本 智一勇夫剛志
// UNAUTHORIZED MODIFICATION IS PROHIBITED: You may not change this file without consent


/* __ SAVE PROGRESS TO LOCAL STORAGE __ */
// See js_for_the_parent_all_browsers_all_devices to find how savedProgress.ja savedProgress.zh savedProgress.tr etc are created
const studiedLang = parent.langCodeForTeachingFilePaths.substr(0,2); // en_east en_west will use the same save-slot
// !!! VERY CAREFUL: Watch the lesson name!!!
parent.savedProgress[studiedLang].lesson_TAKEBREAD_IsViewed=true; // Create and add... or overwrite the same thing
parent.saveJSON = JSON.stringify(parent.savedProgress); // Convert
localStorage.setItem("memoryCard", parent.saveJSON); // Save

/* __ TEXT TO BE INJECTED INTO EXPLANATION/TRANSLATION SUBTITLE/BOX __ */
const explanationPathA = "/user_interface/text/"+userInterfaceLanguage+"/1-1-4a.txt"; // The translation of what is being said, to be put into the helpbox/subtitles.
const explanationPathB = "/user_interface/text/"+userInterfaceLanguage+"/1-1-4b.txt"; // The translation of what is being said, to be put into the helpbox/subtitles.
let explanationA = "…"; // Warning: Without an initial value it returns UNDEFINED before fetch() actually gets the file.
let explanationB = "…"; // Warning: Without an initial value it returns UNDEFINED before fetch() actually gets the file.
fetch(explanationPathA,myHeaders).then(function(response){return response.text();}).then(function(contentOfTheTxtFile){ explanationA = contentOfTheTxtFile; });
fetch(explanationPathB,myHeaders).then(function(response){return response.text();}).then(function(contentOfTheTxtFile){ explanationB = contentOfTheTxtFile; });
/* __ TEXT TO BE INJECTED INTO NOTIFICATION BOX AT THE END __ */
// DEPRECATE let couldYouFigureOutHowToSayEat = null; // Will be displayed for all languages // See window-load below

/* ___AUDIO ELEMENTS___ */ //...Sound player (Howler) exists in the parent html. So the path must be relative to the parent html. Not to the framed html.
// Find soundFileFormat in js_for_all_iframed_lesson_htmls
let say1Path = "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_1/lesson_4/take_bread_1_normal."+soundFileFormat;
let say2Path = "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_1/lesson_4/take_bread_2_normal."+soundFileFormat;
let say3Path = "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_1/lesson_4/take_bread_1_slow."+soundFileFormat;
let say4Path = "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_1/lesson_4/take_bread_2_slow."+soundFileFormat;
let say5Path = "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_1/lesson_4/eat_normal."+soundFileFormat;
let say6Path = "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_1/lesson_4/eat_bread_normal."+soundFileFormat;
let say7Path = "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_1/lesson_4/eat_slow."+soundFileFormat;
let say8Path = "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_1/lesson_4/eat_bread_slow."+soundFileFormat;

if (parent.userIsFemaleSoUseFemaleConjugation) { // See js_for_the_parent_all_browsers_all_devices
  say1Path = say1Path.split(".")[0] + "_tofemale."+soundFileFormat;
  say2Path = say2Path.split(".")[0] + "_tofemale."+soundFileFormat;
  say3Path = say3Path.split(".")[0] + "_tofemale."+soundFileFormat;
  say4Path = say4Path.split(".")[0] + "_tofemale."+soundFileFormat;
  say5Path = say5Path.split(".")[0] + "_tofemale."+soundFileFormat;
  say6Path = say6Path.split(".")[0] + "_tofemale."+soundFileFormat;
  say7Path = say7Path.split(".")[0] + "_tofemale."+soundFileFormat;
  say8Path = say8Path.split(".")[0] + "_tofemale."+soundFileFormat;
}
let isNowSayingTheSecondSet = false; // First set is say1 + say2,,, second set is say3 + say4
const say1 = new parent.Howl({  src: [say1Path]  });
const say2 = new parent.Howl({  src: [say2Path]  });
const say3 = new parent.Howl({  src: [say3Path]  });
const say4 = new parent.Howl({  src: [say4Path]  });
const say5 = new parent.Howl({  src: [say5Path]  });
const say6 = new parent.Howl({  src: [say6Path]  });
const say7 = new parent.Howl({  src: [say7Path]  });
const say8 = new parent.Howl({  src: [say8Path]  });

const touchClickBreadSound = new parent.Howl({  src: ["/lessons_in_iframes/level_1/unit_1/lesson_4/user_contacts_bread."+soundFileFormat]  });
const startDraggingBreadSound = new parent.Howl({  src: ["/lessons_in_iframes/level_1/unit_1/lesson_4/user_starts_dragging_bread."+soundFileFormat]  });
const bitingSound0 = new parent.Howl({  src: ["/lessons_in_iframes/level_1/unit_1/lesson_4/bite_0."+soundFileFormat]  });
const bitingSound1 = new parent.Howl({  src: ["/lessons_in_iframes/level_1/unit_1/lesson_4/bite_1."+soundFileFormat]  });
const bitingSound2 = new parent.Howl({  src: ["/lessons_in_iframes/level_1/unit_1/lesson_4/bite_2."+soundFileFormat]  });
const bitingSound3 = new parent.Howl({  src: ["/lessons_in_iframes/level_1/unit_1/lesson_4/bite_3."+soundFileFormat]  });
const winSound1 = new parent.Howl({  src: ["/lessons_in_iframes/level_1/unit_1/lesson_4/user_takes_the_bread."+soundFileFormat]  });
const finalSuccessSound = new parent.Howl({  src: ["/lessons_in_iframes/level_1/unit_1/lesson_4/user_has_eaten_bread."+soundFileFormat]  });
/* Sound initialization happens on the parent but the consts exist in frame. SEE js_for_all_iframed_lesson_htmls » FIND onbeforeunload. */
// listOfAllSoundsInThisLesson is also used by pauseTheAppFunction in js_for_the_sliding_navigation_menu
var listOfAllSoundsInThisLesson = [
  // finalSuccessSound, // EXCEPTION: See unloadThatLastSoundWhichCannotBeUnloadedNormally
  winSound1,
  bitingSound3,
  bitingSound2,
  bitingSound1,
  bitingSound0,
  startDraggingBreadSound,
  touchClickBreadSound,
  say8, say7, say6, say5, say4, say3, say2, say1
];
function unloadTheSoundsOfThisLesson() {
  for (let i = 0; i < listOfAllSoundsInThisLesson.length; i++) {
      const snd = listOfAllSoundsInThisLesson[i]; snd.unload();
  }
  parent.unloadThatLastSoundWhichCannotBeUnloadedNormally(finalSuccessSound); // Exists in js_for_navigation_handling,,, unloads the sound after 5s
}

/* Declare js variables to manipulate the elements */
const main = document.getElementsByTagName('MAIN')[0];
const pictogramDiv = document.getElementById("pictogramDivID");
const movingEyesDiv = document.getElementById("movingEyesDivID");
const breadsFarAndNearDiv = document.getElementById("breadsFarAndNearID");
let skip_b_and_c = false;
//---
const antigoofingDiv = document.getElementById("antigoofingID");
const dimmer = document.querySelector(".dimmer");
// ---
// DEPRECATE: let isParentBlurred = null; // CAUTION: Clicking on iframe blurs the parent AND vice versa
let isFrameBlurred = null; // CAUTION: Clicking on iframe blurs the parent AND vice versa
// ---
// See index.html for aGreaterTouchStartArea aBetterClickArea swipeInstructionPart1 swipeInstructionPart2 pinchInstruction aGreaterTouchMoveArea thePinchArea handCursor upperTeeth lowerTeeth keyboardInstructionPart1 keyboardInstructionPart2

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
  if (studiedLang == "zh") { // Display note about the importance of intonation in RENMEN.
    const pathOfNotificationAboutIntonation = "/user_interface/text/"+userInterfaceLanguage+"/1-1-4_ren_attention_to_intonation.txt";
    fetch(pathOfNotificationAboutIntonation,myHeaders).then(function(response){return response.text();}).then(function(contentOfTheTxtFile){
      new SuperTimeout(function(){ createAndHandleInfoBoxType1BeforeLessonStarts(); putNotificationTxtIntoThisP1.innerHTML = contentOfTheTxtFile; },501); // See js_for_info_boxes_in_lessons.js
      // createAndHandleInfoBoxType1BeforeLessonStarts will fire startTheLesson 1.5 seconds after its OK button is clicked/touched
    });
  }
  else if (studiedLang == "??") {

  }
  else {
    startTheLesson(); // Call it now if it was not to be called from within createAndHandleInfoBoxType1BeforeLessonStarts() in js_for_info_boxes_in_lessons.js
  }
  //---
  // By the way: Get the end of lesson text ready
  /* DEPRECATE
  setTimeout(function () { // We don't want a SuperTimeout in this case
    // Will show for all languages
    const noteAtTheEndOfLessonPath = "/user_interface/text/"+userInterfaceLanguage+"/1-1-4_end_of_lesson.txt"; // Could you figure out how to say eat
    fetch(noteAtTheEndOfLessonPath,myHeaders).then(function(response){return response.text();}).then(function(contentOfTheTxtFile){ couldYouFigureOutHowToSayEat = contentOfTheTxtFile; });
  }, 5000);
  */
}

function startTheLesson() {
  // User must listen to pronunciation-teacher vocabulary box no matter what language he/she is studying
  // In case of "ar" pronunciation-teacher-box will play the verb root in male conjugation even if the user is female
  const filePathOfTheAudio1 = "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_1/lesson_4/take_listenbox_1."+soundFileFormat;
  const filePathOfTheAudio2 = "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_1/lesson_4/take_listenbox_2."+soundFileFormat;
  const filePathOfTheAudio3 = "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_1/lesson_4/take_listenbox_3."+soundFileFormat;
  const filePathOfLipSyncJSON1 = "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_1/lesson_4/take_listenbox_1.json";
  const filePathOfLipSyncJSON2 = "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_1/lesson_4/take_listenbox_2.json";
  const filePathOfLipSyncJSON3 = "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_1/lesson_4/take_listenbox_3.json";
  // NOTE: The lip-sync json file names better be THE SAME with the audio file names that will be played in the listen-many-times box » See js_for_info_boxes_in_lessons
  const listenBoxP1P2Path = "/user_interface/text/"+userInterfaceLanguage+"/1-1-4_vocabulary_p1_p2.txt"; // UI lang depends on domain (hostname) » See js_for_every_single_html
  fetch(listenBoxP1P2Path,myHeaders).then(function(response){return response.text();}).then(function(contentOfTheTxtFile){  handleP1P2ActualText(contentOfTheTxtFile);  });
  // See js_for_info_boxes_in_lessons » iframe-lesson level
  new SuperTimeout(function(){    createAndHandleListenManyTimesBox(filePathOfTheAudio1,filePathOfLipSyncJSON1,filePathOfTheAudio2,filePathOfLipSyncJSON2,filePathOfTheAudio3,filePathOfLipSyncJSON3);    },501); // Wait for preloader to disappear or give a brief break after notification
}

function vocabularyBoxIsClosed(x,y) { // Will fire from within createAndHandleListenManyTimesBox with touch/click coordinate values passed » vocabularyBoxIsClosed(lastPointerX,lastPointerY)
  // --
  let unblurTime;  switch (parent.speedAdjustmentSetting) {  case "slow": unblurTime = 2.0; break;  case "fast": unblurTime = 0.5; break;  default: unblurTime = 0.9;  }
  main.style.transitionDuration = String(unblurTime)+"s";
  main.style.filter = "blur(0px)";
  new SuperTimeout(function () { playPictogramLoop(); }, unblurTime*550);
  new SuperTimeout(function () { main.style.filter = "none"; }, unblurTime*1100);
  //---
  waitForFirstTouchOrClickOnBread(); // Start waiting for a click or touch without waiting for unblur to complete
  //--- BIG HAND IMG AS CUSTOM CURSOR
  if (deviceDetector.device == "desktop") {
    main.classList.remove("defaultCursor"); main.classList.add("noCursor"); // Unconditionally hide the custom arrow cursor
    handCursor.style.left = x +"px"; // x and y come from createAndHandleListenManyTimesBox in js_for_info_boxes_in_lessons
    handCursor.style.top = y +"px"; // x and y come from createAndHandleListenManyTimesBox in js_for_info_boxes_in_lessons
    document.body.appendChild(handCursor);
    main.addEventListener("mousemove",updateHandCursorPosition);
    ////parent.window.addEventListener("mousemove",checkExitThroughTop);
    let mouseIsOnNavMenu = false;
    parent.containerDivOfTheNavigationMenu.addEventListener("mouseenter",function () { mouseIsOnNavMenu = true; handCursor.style.display = "none"; });
    parent.containerDivOfTheNavigationMenu.addEventListener("mouseleave",function () { mouseIsOnNavMenu = false; });
    clickToRevealSubtitlesDiv.addEventListener("mouseenter",handCursorDisappear);
    clickToRevealSubtitlesDiv.addEventListener("mouseleave",handCursorReappear);
    antigoofingDiv.addEventListener("mouseover",handCursorDisappear);
    antigoofingDiv.addEventListener("mouseout",handCursorReappear);
    parent.rightClickMenu.addEventListener("mouseenter",handCursorDisappear);
    parent.rightClickMenu.addEventListener("mouseleave",handCursorReappear);
    aBetterClickArea.addEventListener("mousedown",handCursorDisappear);
    main.addEventListener("mouseup",handCursorReappear);

    function updateHandCursorPosition(event) {
      handCursor.style.left = event.clientX +"px";
      handCursor.style.top = event.clientY +"px";
      /*Left-Right limits*/
      if (event.clientX<10) { handCursor.style.visibility = "hidden"; }
      else if (event.clientX >= 10 && event.clientX <= (parent.lastRecordedWindowWidth-10)) {        handCursor.style.visibility = "visible";      }
      else {        handCursor.style.visibility = "hidden";      }
      /*top limit handled by mouseenter on sliding nav menu*/
      if (event.clientY>(parent.lastRecordedWindowHeight-10)) { handCursor.style.display = "none"; }
      else {
        if (!mouseIsOnNavMenu) { handCursor.style.display = "block"; } // Works
      }
    }
    function handCursorDisappear() { handCursor.style.opacity = "0"; }
    function handCursorReappear() { handCursor.style.opacity = "1";  }
    // -
    // Detect if keyboard is active(usable) or not
    if (document.hasFocus()) { isFrameBlurred = false; console.log("frame has focus"); }
    else { isFrameBlurred = true; console.log("frame is blurred,,, BUT HOW???"); main.classList.add("grayAway"); }
    // DEPRECATE: if (parent.document.hasFocus()) { isParentBlurred = false; console.log("parent has focus"); } else { isParentBlurred = true; console.log("parent is blurred"); }
    // Since clicking on vocabulary box will definitely bring focus to the frame
    // isFrameBlurred = false; isParentBlurred = true; // Initialize
    window.addEventListener("blur",frameIsBlurred);
    window.addEventListener("focus",frameIsFocused);
    // DEPRECATE: parent.window.addEventListener("blur",parentIsBlurred);
    // DEPRECATE: parent.window.addEventListener("focus",parentIsFocused);
    function frameIsBlurred() {   isFrameBlurred = true;   console.log("frame lost focus");     main.classList.remove("colorBack"); main.classList.add("grayAway");    } // css_for_every_single_html
    function frameIsFocused() {   isFrameBlurred = false;  console.log("frame regained focus"); main.classList.remove("grayAway");  main.classList.add("colorBack");   } // css_for_every_single_html
    // DEPRECATE: function parentIsBlurred() {  isParentBlurred = true;  console.log("parent lost focus");  checkBothBlurs();  }
    // DEPRECATE: function parentIsFocused() {  isParentBlurred = false; console.log("parent regained focus"); checkBothBlurs();  }
    /*
    function checkBlurFocus() {
      if (!win2HasHappened) {
        new SuperTimeout(function () {
          if (isFrameBlurred) { // grey out if both are blurred // DEPRECATE: if (isParentBlurred && isFrameBlurred)
            main.classList.remove("colorBack"); main.classList.add("grayAway"); // css_for_every_single_html
            // DEPRECATE: NO BIG DEAL WITHOUT: parent.containerDivOfTheNavigationMenu.classList.remove("colorBack"); parent.containerDivOfTheNavigationMenu.classList.add("grayAway");
            // UNNECESSARY WITH THE NEW METHOD main.classList.remove("noCursor");  main.classList.add("defaultCursor");
          } else { // color back in all other cases
            main.classList.remove("grayAway");  main.classList.add("colorBack"); // css_for_every_single_html
            // DEPRECATE: NO BIG DEAL WITHOUT: parent.containerDivOfTheNavigationMenu.classList.remove("grayAway"); parent.containerDivOfTheNavigationMenu.classList.add("colorBack");
          }
        }, 30);
      }
    }
    */
    // -
  }

}

let userAlreadyKnowsHowToSwipe = false;
let to1,ticker1,ticker2,to2,to3,to4,to5,to6,to7,toDisplayHowToSwipe,to8,to9,to10,to11,to12,to13,to14,to15,to16,to17,to18,to19,to20,timeoutCursorHide,timeoutHearSinewave,clearIfInstructionShouldNotBeSeen;
let loopCounter=1; let waitTime = 0;
function playPictogramLoop() { // Fires when blur has 55% cleared towards focus to open the scene
  let changeTime;  switch (parent.speedAdjustmentSetting) {  case "slow": changeTime = 2700; break;  case "fast": changeTime = 1200; break;  default: changeTime = 1900;  }
  to1 = new SuperTimeout(proceedToNext_1,(changeTime+500)); // Rotate the head & arm does its first pointing movement
  function proceedToNext_1(){
    movingEyesDiv.style.left = "3.0%"; movingEyesDiv.style.top = "0.5%"; // Moving the eyes looks like rotating the head
    // NOTE: Element.children includes only element nodes (i.e. skips comments).
    switch (parent.speedAdjustmentSetting) {  case "slow": changeTime = 2700; break;  case "fast": changeTime = 1200; break;  default: changeTime = 1900;  }
    to2 = new SuperTimeout(proceedToNext_2,(changeTime+100)); // Arm does its second pointing movement
  }
  function proceedToNext_2(){
    if (!skip_b_and_c) {
      pictogramDiv.children[0].style.display = "none"; // a- Natural standing
      pictogramDiv.children[1].style.display = "block"; // b- Pointing hand 1
      pictogramDiv.children[2].style.display = "none"; // c- Pointing hand 2
      let pointCounter = 1;
      ticker1 = new SuperInterval(function () {
        if (pointCounter%3 != 0) {
          pictogramDiv.children[0].style.display = "none"; // a- Natural standing
          pictogramDiv.children[1].style.display = "block"; // b- Pointing hand 1
          pictogramDiv.children[2].style.display = "none"; // c- Pointing hand 2
        }
      }, changeTime/5);
      ticker2 = new SuperInterval(function () {
        to3 = new SuperTimeout(function () {
          if (pointCounter%4 != 0) {
            pictogramDiv.children[0].style.display = "none"; // a- Natural standing
            pictogramDiv.children[1].style.display = "none"; // b- Pointing hand 1
            pictogramDiv.children[2].style.display = "block"; // c- Pointing hand 2
          }
        }, changeTime/12);
        pointCounter++;
      }, changeTime/5);
      new SuperTimeout(function () {
        if (ticker1) { ticker1.clear(); } // clearInterval(ticker1);
        if (ticker2) { ticker2.clear(); } // clearInterval(ticker2);
      }, changeTime*1.6);
    } else {
      pictogramDiv.children[0].style.display = "block"; // a- Natural standing
      pictogramDiv.children[1].style.display = "none"; // b- Pointing hand 1
      pictogramDiv.children[2].style.display = "none"; // c- Pointing hand 2
    }
    // -
    switch (parent.speedAdjustmentSetting) {  case "slow": changeTime = 2700; break;  case "fast": changeTime = 1200; break;  default: changeTime = 1900;  }
    to4 = new SuperTimeout(proceedToNext_3,(changeTime-100)); // Look at the camera again
  } // END OF proceedToNext_2
  // -
  function proceedToNext_3(){
    movingEyesDiv.style.left = "0%"; movingEyesDiv.style.top = "0%"; // Look at the camera again
    switch (parent.speedAdjustmentSetting) {  case "slow": changeTime = 2700; break;  case "fast": changeTime = 1200; break;  default: changeTime = 1900;  }
    to5 = new SuperTimeout(proceedToNext_4,(changeTime-300)); // Bubble 1 appears
  }
  // -
  function proceedToNext_4(){
    pictogramDiv.children[3].classList.add("fadeIn"); to6 = new SuperTimeout(function(){ pictogramDiv.children[3].classList.remove("fadeIn"); },601); // Speech bubble 1 appears
    pictogramDiv.children[3].style.display = "block"; // speech bubble with bread+hand
    injectTextIntoTheHelpBoxP.innerHTML = explanationA;
    to7 = new SuperTimeout(talk1,750);
    function talk1() { if (isNowSayingTheSecondSet) {  say3.play();  } else {  say1.play();  } }

    // Show how to do SWIPE-DOWN gesture to mobile user » Only once in a session!
    if (deviceDetector.isMobile) {
      if (loopCounter >= 4) { sessionStorage.level114SwipeInstructionHasBeenDisplayedThreeTimes = "yes"; }

      if (sessionStorage.level114SwipeInstructionHasBeenDisplayedThreeTimes) { waitTime = 0; } // No instructions and no waiting » 4th lap and on
      else { // First three laps
        if (!userAlreadyKnowsHowToSwipe) { // Sets to true as soon as ~=75px swipe is accomplished
          toDisplayHowToSwipe = new SuperTimeout(displaySwipeInstruction, 4500); // After first say ,,, timeout clears if win1 happens
          function displaySwipeInstruction() {
            document.body.appendChild(swipeInstructionPart1); // 9x50ms + 1x900ms + 4x350 + 1x99999 = 2750 + 99999
            new SuperTimeout(function () {
              document.body.removeChild(swipeInstructionPart1); resetWebp(swipeInstructionPart1); // resetWebp() is in js_for_every_single_html
              document.body.appendChild(swipeInstructionPart2); //50ms x 14 frames = 700ms
              new SuperTimeout(function () {
                swipeInstructionPart2.classList.add("itDisappears"); //1500 ms
                new SuperTimeout(function () { document.body.removeChild(swipeInstructionPart2); swipeInstructionPart2.classList.remove("itDisappears"); resetWebp(swipeInstructionPart2); }, 1501); // resetWebp() is in js_for_every_single_html
              }, changeTime+550);
            }, changeTime+1600); // Just in case we decide that speedAdjustmentSetting should be available in mobile too (in the future) Until then it's 1900+1600=3500 fixed,,, 3500-2750=750ms stay time
          }
          //---
          if (loopCounter == 1) { waitTime = 5500 + changeTime/5; } // Make teacher wait during the first lap
          else { waitTime = 0; } // Let teacher speak normally without waiting but still show the swipe instruction on lap 2 and 3
          //---
        } else { waitTime = 0; } // No instructions and no waiting if user figured out how to swipe
      } // END OF what to do on first three laps
    } else { waitTime = 0; } // Desktops show no drag instructions
    // -
    switch (parent.speedAdjustmentSetting) {  case "slow": changeTime = 2700; break;  case "fast": changeTime = 1200; break;  default: changeTime = 1900;  }
    to8 = new SuperTimeout(proceedToNext_5,(changeTime+4900+waitTime)); // From bubble 1 to bubble 2
  } // END OF proceedToNext_4
  // -
  function proceedToNext_5(){
    pictogramDiv.children[3].style.display = "none"; // speech bubble with bread+hand
    resetWebp(pictogramDiv.children[3]); // js_for_every_single_html
    pictogramDiv.children[4].style.display = "block"; // speech bubble with bread+[pull]arrow

    to9 = new SuperTimeout(talk2,1250);
    function talk2() {   if (isNowSayingTheSecondSet) {  say4.play();  } else {  say2.play();  }   }

    switch (parent.speedAdjustmentSetting) {  case "slow": changeTime = 2700; break;  case "fast": changeTime = 1200; break;  default: changeTime = 1900;  }
    to10 = new SuperTimeout(proceedToNext_6,(changeTime+3000)); // Bubble disappears
  }
  // -
  function proceedToNext_6(){
    pictogramDiv.children[4].classList.add("fadeOut"); // speech bubble disappears
    to11 = new SuperTimeout(function(){ pictogramDiv.children[4].classList.remove("fadeOut"); pictogramDiv.children[4].style.display = "none"; resetWebp(pictogramDiv.children[4]); },601);
    //---
    switch (parent.speedAdjustmentSetting) {  case "slow": changeTime = 2700; break;  case "fast": changeTime = 1200; break;  default: changeTime = 1900;  }
    to12 = new SuperTimeout(proceedToNext_7,(changeTime-600)); // Back to initial pose
  }
  // -
  function proceedToNext_7(){
    pictogramDiv.children[0].style.display = "block"; // a- Natural standing
    pictogramDiv.children[1].style.display = "none"; // b- Pointing hand 1
    pictogramDiv.children[2].style.display = "none"; // c- Pointing hand 2
    injectTextIntoTheHelpBoxP.innerHTML = "…";
    switch (parent.speedAdjustmentSetting) {  case "slow": changeTime = 2700; break;  case "fast": changeTime = 1200; break;  default: changeTime = 1900;  }
    to13 = new SuperTimeout(proceedToNext_8,(changeTime-400)); // back to start
  }
  // -
  function proceedToNext_8(){
    isNowSayingTheSecondSet = !isNowSayingTheSecondSet; // Toggle between first set of says and second set of says
    if (loopCounter<4) { playPictogramLoop(); } // Repeat limit: 4 times max
    loopCounter++;
  }
} // End of function playPictogramLoop()


function waitForFirstTouchOrClickOnBread() {
  if (deviceDetector.isMobile) {
    aGreaterTouchStartArea.addEventListener("touchstart",startTheGameA,{once:true});
    // Since there is no such thing like overlocking the orientation it is OK to fire it multiple times
    // TOUCHSTART will block propagation (no bubbling),,, listen to touchend » Remember that openfullscreen works with touchend only; not touchstart
    window.addEventListener("touchend",lockOrientation,{ once:true }); // Will unlock with onbeforeunload » See js_for_all_iframed_lesson_htmls
    // ISSUE: if user exits fullscreen he/she will be able to change orientation
    // Solution use window resize to add another listener
    window.addEventListener("resize",function () {  window.addEventListener("touchend",lockOrientation,{ once:true });  });
  } else {
    aBetterClickArea.addEventListener("mousedown",startTheGameA,{once:true});
    aBetterClickArea.addEventListener("mouseup",function () { breadsFarAndNearDiv.classList.remove("breadGlow"); });
  }
}

let deltaY = 0; let lastY;
const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioCtx = new AudioContext();
const oscillator = audioCtx.createOscillator();
const gainNode = audioCtx.createGain();
// MISUNDERSTOOD: minValue cannot be changed. It's readonly. // Do not: gainNode.gain.minValue = 0; // https://developer.mozilla.org/en-US/docs/Web/API/BaseAudioContext/createGain
// MISUNDERSTOOD: gainNode.gain.maxValue = 1; //https://developer.mozilla.org/en-US/docs/Web/API/AudioParam/maxValue
// when Howler is 1 (FULL volume), this must be at a lower value (a macthing good LUFS value),,, i.e. not FULL volume
gainNode.gain.value = 0; // Range is 0 to 1 // https://developer.mozilla.org/en-US/docs/Web/API/BaseAudioContext/createGain#example
oscillator.connect(gainNode);
let startingFrequency = 98; // G2 is 98 under 440Hz standard,,, G4 is 392Hz // DESKTOP
let octaveMultiplier = 294/244.352; // 392-98 = 294 // DESKTOP
oscillator.frequency.value = startingFrequency;
oscillator.start();
gainNode.connect(audioCtx.destination);

let sineWaveIsAudibleNow = false;
let farBreadOpacity = 1;
let nearBreadOpacity = 0;
let waitingForBreadDrag = true;
//---

//---
function startTheGameA(event) { event.preventDefault(); event.stopPropagation(); // aGreaterTouchStartArea will block the touchstart against aGreaterTouchMoveArea
  touchClickBreadSound.play(); // Crunch crisp
  if (canVibrate) { navigator.vibrate(10); } // Is there a desktop computer in the world that can vibrate?
  breadsFarAndNearDiv.classList.add("breadGlow");
  new SuperTimeout(function () { breadsFarAndNearDiv.classList.remove("breadGlow"); }, 3000);
  // In case pictogram man was pointing to the bread when user clicked/touched
  if (ticker1) { ticker1.clear(); } if (ticker2) { ticker2.clear(); } /*clearInterval(ticker1);*/ /*clearInterval(ticker2);*/
  if (to2) { to2.clear(); } // clearTimeout(to2);
  if (to3) { to3.clear(); } // clearTimeout(to3);
  pictogramDiv.children[0].style.display = "block"; // a- Natural standing
  pictogramDiv.children[1].style.display = "none"; // b- Pointing hand 1
  pictogramDiv.children[2].style.display = "none"; // c- Pointing hand 2
  skip_b_and_c = true; // Prevent pointing pose
  timeoutHearSinewave = new SuperTimeout(function () {
    gainNode.gain.value = parent.Howler.volume()/10; // Sine wave oscillator glitch-cracking gets worse with step by step fading
    sineWaveIsAudibleNow = true;
  }, 1300); // crunch:1280 + porcelain:1464

  //---
  if (deviceDetector.isMobile) {
    breadsFarAndNearDiv.style.transform = "translateY(-7.5vmin)";
    // Porcelain sound is heard without waiting for first little drag movement (unlike desktop)
    new SuperTimeout(function () { startDraggingBreadSound.play(); }, 250); // Note: user_contacts_bread is 1280ms long
    // With stopPropagation we DON'T NEED parent.preventTouchConflictWithTheSlidingNavMenu(main); // Exists in js_for_the_sliding_navigation_menu
    lastY = event.touches[0].clientY;
    aGreaterTouchMoveArea.addEventListener("touchmove",updateTheBreadTaking);
    aGreaterTouchStartArea.addEventListener("touchend",handleLettingGoBeforeSuccess);
    startingFrequency = 196; // G3 is 196 under 440Hz standard,,, G5 is 783.99 // MOBILE speakers are not good at bass frequencies
    octaveMultiplier = 588/244.352; // 784-196 = 588 // MOBILE speakers are not good at bass frequencies
  } else {
    lastY = event.clientY;
    window.addEventListener("mousemove",updateTheBreadTaking);
    window.addEventListener("mouseup",handleLettingGoBeforeSuccess);
  }
  timeoutCursorHide = new SuperTimeout(function () { handCursor.style.marginTop = "-100vh"; },300); // NECESSARY: Must guarantee invisibility» even though it already disappears with opacity transition via event listeners added in vocabularyBoxIsClosed()
}
let goodNumberInVhOrVmins=0;
function updateTheBreadTaking(event) { // No need to stopPropagation of touchmove because sliding nav menu first requires touchstart on window (which is blocked by stopPropagation in startTheGameA)

  if (deviceDetector.isMobile) {
    deltaY = event.touches[0].clientY - lastY; // Downward movement yields positive values

    if (waitingForBreadDrag) {
      new SuperTimeout(function () {  if (canVibrate) { navigator.vibrate([12,110,7]); }  },100);
      waitingForBreadDrag = false;
    }
  } else {
    deltaY = event.clientY - lastY; // Downward movement yields positive values
    if (waitingForBreadDrag) {
      // Porcelain sound is heard after waiting for the first little drag movement (unlike mobile)
      new SuperTimeout(function () { startDraggingBreadSound.play(); }, 750); // Note: user_contacts_bread is 1280ms long
      waitingForBreadDrag = false;
    }
  }

  if (deltaY<=0) {  deltaY = 0;  } // min
  else if (deltaY>0 && deltaY <150) {
    deltaY = Number(deltaY.toFixed(2));
  } else {  deltaY = 150;  } // max

  const goodNumberInPixels = Math.pow(((deltaY+1)/20),2.72); // For 150 » 244.352

  if (goodNumberInPixels<65) { // Midpoint is not 122.176 (half of 244.352) // Set it by experiment
    farBreadOpacity = 1;
    nearBreadOpacity = goodNumberInPixels/65;
  } else {
    farBreadOpacity = Math.pow((1 - (goodNumberInPixels-65)/(244.352-65)),4); // Curve to fade it faster-earlier
    nearBreadOpacity = 1;
  }

  goodNumberInVhOrVmins = Number((goodNumberInPixels*100/parent.lastRecordedWindowHeight).toFixed(2));

  goodNumberInVhOrVmins = goodNumberInVhOrVmins/2;
  breadsFarAndNearDiv.children[0].style.marginTop = goodNumberInVhOrVmins + "vmin"; // children[1] is position relative so its marginTop will follow children[0] // Try vmin instead of vh
  breadsFarAndNearDiv.children[0].style.opacity = farBreadOpacity.toFixed(1);
  breadsFarAndNearDiv.children[1].style.opacity = nearBreadOpacity.toFixed(1);
  breadsFarAndNearDiv.children[0].style.transform = "scale("+(100 + (goodNumberInPixels/244.352)*203.03).toFixed(2)+"%)";
  breadsFarAndNearDiv.children[1].style.transform = "scale("+(33 + (goodNumberInPixels/244.352)*67).toFixed(2)+"%)";
  oscillator.frequency.value = startingFrequency + goodNumberInPixels*octaveMultiplier; // Adjust to match winSound1 in G
  dimmer.style.opacity = String(goodNumberInPixels/3000); // From 0 to about 0.08

  if (goodNumberInPixels>75) {   userAlreadyKnowsHowToSwipe = true;  }

  if (goodNumberInPixels>243) {
    //First win happened
    if (deviceDetector.isMobile) {
      aGreaterTouchMoveArea.removeEventListener("touchmove",updateTheBreadTaking);
      aGreaterTouchStartArea.removeEventListener("touchend",handleLettingGoBeforeSuccess);
    } else {
      window.removeEventListener("mousemove",updateTheBreadTaking);
      window.removeEventListener("mouseup",handleLettingGoBeforeSuccess);
      handCursor.parentNode.removeChild(handCursor); // Even though it was hidden with marginTop -100vh
    }
    say1.stop(); say2.stop(); say3.stop(); say4.stop();
    /*clearTimeout(to1); clearTimeout(to2); clearTimeout(to3); clearTimeout(to4); clearTimeout(to5); clearTimeout(to6); clearTimeout(to7); clearTimeout(toDisplayHowToSwipe);
    clearTimeout(to8); clearTimeout(to9); clearTimeout(to10); clearTimeout(to11); clearTimeout(to12); clearTimeout(to13);*/
    if (to1) { to1.clear(); } if (to2) { to2.clear(); } if (to3) { to3.clear(); } if (to4) { to4.clear(); } if (to5) { to5.clear(); }
    if (to6) { to6.clear(); } if (to7) { to7.clear(); } if (to8) { to8.clear(); } if (to9) { to9.clear(); } if (to10) { to10.clear(); }
    if (to11) { to11.clear(); } if (to12) { to12.clear(); }  if (to13) { to13.clear(); }
    if (toDisplayHowToSwipe) { toDisplayHowToSwipe.clear(); }
    if (ticker1) { ticker1.clear(); } // clearInterval(ticker1);
    if (ticker2) { ticker2.clear(); } // clearInterval(ticker2);
    injectTextIntoTheHelpBoxP.innerHTML = "…";
    whatToDoWhenBreadIsTaken();
  }
}
function handleLettingGoBeforeSuccess() { // Allow propagation in this case so that window touchend can lock screen orientation » See waitForFirstTouchOrClickOnBread()
  new SuperTimeout(function () {  if (canVibrate) { navigator.vibrate([13,90,10,110,7,130,5]); }  },30);
  waitingForBreadDrag = true;
  skip_b_and_c = false;
  timeoutCursorHide.clear(); // clearTimeout(timeoutCursorHide);
  timeoutHearSinewave.clear(); // clearTimeout(timeoutHearSinewave);
  handCursor.style.marginTop = "0vh";
  //---
  if (deviceDetector.isMobile) {
    breadsFarAndNearDiv.style.transform = "translateY(0vmin)";
    aGreaterTouchMoveArea.removeEventListener("touchmove",updateTheBreadTaking);
    aGreaterTouchStartArea.removeEventListener("touchend",handleLettingGoBeforeSuccess);
  } else {
    window.removeEventListener("mousemove",updateTheBreadTaking);
    window.removeEventListener("mouseup",handleLettingGoBeforeSuccess);
  }
  //---
  breadsFarAndNearDiv.children[0].style.marginTop = "0vmin"; // Try vmin instead of vh
  breadsFarAndNearDiv.children[0].style.transform = "scale(100%)";
  breadsFarAndNearDiv.children[1].style.transform = "scale(33%)";
  breadsFarAndNearDiv.children[0].style.opacity = "1";
  new SuperTimeout(function () { breadsFarAndNearDiv.children[1].style.opacity = "0"; },500);
  dimmer.style.opacity = "0";
  const lastFrequency = oscillator.frequency.value;
  let i=0;
  let newValue;
  const subtractiveProcess = new SuperInterval(function () {
    if (sineWaveIsAudibleNow) {
      newValue = lastFrequency-i*1.7;
      if (newValue<startingFrequency) { newValue = startingFrequency; } // limit
      oscillator.frequency.value = newValue;
      i++;
    }
  },10); // Fire 100 times within 1s
  new SuperTimeout(function () { subtractiveProcess.clear(); /*clearInterval(subtractiveProcess);*/ gainNode.gain.value = 0; sineWaveIsAudibleNow = false; oscillator.frequency.value = startingFrequency; waitForFirstTouchOrClickOnBread(); },1000);
  // Sine wave oscillator glitch-cracking gets worse with fade
}

////let desktopUserAlreadyKnowsHowToBite = false;
////let mobileUserAlreadyKnowsHowToBite = false;
let noBiteAttemptHasHappenedSoFar = true;
function whatToDoWhenBreadIsTaken() {
  // brightness-bread-flash-blink
  breadsFarAndNearDiv.children[1].classList.add("flashBlinkingBread");
  // Play grabbing the bread webp
  new SuperTimeout(function () {
    breadsFarAndNearDiv.children[0].style.visibility = "hidden"; // Don't use display none because position relative needs the occupied space
    breadsFarAndNearDiv.children[1].style.visibility = "hidden"; // Don't use display none because position relative needs the occupied space
    breadsFarAndNearDiv.children[2].style.display = "block";
    breadsFarAndNearDiv.children[2].classList.add("getExtraLarge"); // getExtraLarge
  },1250);
  // Sounds
  new SuperTimeout(function () {  if (canVibrate) { navigator.vibrate([15,150,50]); }  },350);
  new SuperTimeout(function () { winSound1.play(); },500);
  new SuperTimeout(function () { gainNode.disconnect(audioCtx.destination); sineWaveIsAudibleNow = false; },2010);
  // Separate foreground from background with a drop-shadow
  new SuperTimeout(function () {
    breadsFarAndNearDiv.classList.add("breadHeldInHandsDropShadow");
  }, 600);

  // Cursor

  if (deviceDetector.device == "desktop") {
    new SuperTimeout(function () {
      // UNNECESSARY WITH THE NEW METHOD main.classList.remove("noCursor"); main.classList.add("defaultCursor");
      hideTheCursorAndHandleAutoUnhideAutoHide(); // js_for_all_iframed_lesson_htmls
    },1500); // Bring cursor back,,, make it visible again
  } else {  }

  // Pictogram happy eyes
  new SuperTimeout(function () {
    pictogramDiv.children[1].style.display = "none"; // state b
    pictogramDiv.children[2].style.display = "none"; // state c
    pictogramDiv.children[3].style.display = "none"; // speech bubble (hand + bread)
    pictogramDiv.children[4].style.display = "none"; // speech bubble (arrow + bread)
    pictogramDiv.children[0].style.display = "block"; // state a
    // Either reset "eyes" if were looking away
    movingEyesDiv.style.left = "0%"; movingEyesDiv.style.top = "0%"; // Look at the camera
    new SuperTimeout(function () {
      movingEyesDiv.children[0].style.display = "none"; movingEyesDiv.children[1].style.display = "block"; // big happy eyes
    }, 200);
  },100);

  let changeTime;  switch (parent.speedAdjustmentSetting) {  case "slow": changeTime = 6000; break;  case "fast": changeTime = 3000; break;  default: changeTime = 4500;  }
  // Pictogram normal eyes
  new SuperTimeout(function () {
    movingEyesDiv.children[1].style.display = "none";
    movingEyesDiv.children[0].style.display = "block"; // back to natural blinking eyes
  },changeTime+500);

  // Show pacman
  new SuperTimeout(function () {
    pictogramDiv.children[5].classList.add("fadeIn"); to14 = new SuperTimeout(function(){ pictogramDiv.children[5].classList.remove("fadeIn"); },601); // Speech bubble 3 appears
    pictogramDiv.children[5].style.display = "block"; // speech bubble PACMAN eating
    startTalkingAgain();
    startTheGameB();
    injectTextIntoTheHelpBoxP.innerHTML = explanationB;
  },1500+changeTime);

  // set-Interval doesn't work for updating changeTime because timeouts get set only once when startTalkingAgain() fires
  let lapNumberOfLoop = 1;
  function startTalkingAgain() {
    if (lapNumberOfLoop>3) {    return;   } // Stop talking after 3 laps
    switch (parent.speedAdjustmentSetting) {  case "slow": changeTime = 6000; break;  case "fast": changeTime = 3000; break;  default: changeTime = 4500;  } // In case desktop user moves the slider to adjust speed setting
    to15 = new SuperTimeout(function () { say5.play(); console.log("Says «eat»"); },1000); // Eat
    to16 = new SuperTimeout(function () { say6.play(); console.log("Says «eat bread»"); },1000+changeTime); // Eat bread

    if (lapNumberOfLoop == 1) { // First lap
      to19 = new SuperTimeout(function () { showHowToBite(); },1500+changeTime*1.5); // Show how to play BITE game » About 9s
      to17 = new SuperTimeout(function () { say7.play(); console.log("Slower «eat» 1"); },6000+changeTime*2); // Eat (slow)
      to18 = new SuperTimeout(function () { say8.play(); console.log("Slower «eat bread» 1"); },6000+changeTime*3); // Eat bread (slow)
      to20 = new SuperTimeout(function () { startTalkingAgain(); console.log("Restart talk cycle 1"); },8000+changeTime*4); // and restart
    } else if(lapNumberOfLoop == 2) { // Second lap
      // to19 = new SuperTimeout(function () { showHowToBite(); },1500+changeTime*1.5); // Show how to play BITE game » About 9s
      to17 = new SuperTimeout(function () { say7.play(); console.log("Slower «eat» 2"); },2000+changeTime*2); // Eat (slow)
      to18 = new SuperTimeout(function () { say8.play(); console.log("Slower «eat bread» 2"); },2000+changeTime*3); // Eat bread (slow)
      to20 = new SuperTimeout(function () { startTalkingAgain(); console.log("Restart talk cycle 2"); },4000+changeTime*4); // Restart
    } else { // Third (final) lap
      to19 = new SuperTimeout(function () { showHowToBite(); },1500+changeTime*1.5); // Show how to play BITE game » About 9s
      to17 = new SuperTimeout(function () { say7.play(); console.log("Slower «eat» 3"); },6000+changeTime*2); // Eat (slow)
      to18 = new SuperTimeout(function () { say8.play(); console.log("Slower «eat bread» 3"); },6000+changeTime*3); // Eat bread (slow)
      to20 = new SuperTimeout(function () { startTalkingAgain(); console.log("Restart talk cycle 3"); },8000+changeTime*4); // Restart
    }
    lapNumberOfLoop++;
  }

  function showHowToBite() {
    //console.log("let's show how it's done");
    let showTime;  switch (parent.speedAdjustmentSetting) {  case "slow": showTime = 2400; break;  case "fast": showTime = 1200; break;  default: showTime = 1800;  }
    // animate in
    if (deviceDetector.isMobile) { // MOBILE - MOBILE - MOBILE
      if (noBiteAttemptHasHappenedSoFar) {
          document.body.appendChild(pinchInstruction); //10x70ms + 1x500ms + 13x70ms + 99999 = 2180ms + 99999
          new SuperTimeout(function () {
            pinchInstruction.classList.add("itDisappears"); //1500 ms
            new SuperTimeout(function () { document.body.removeChild(pinchInstruction); pinchInstruction.classList.remove("itDisappears"); resetWebp(pinchInstruction); }, 1501);
          }, showTime+2400); // Just in case we decide that speedAdjustmentSetting should be available in mobile too (wrt possibility in the future)
      }
    } else { // DESKTOP - DESKTOP - DESKTOP
      if (noBiteAttemptHasHappenedSoFar) {
        document.body.appendChild(keyboardInstructionPart1); // 10x50ms = 500ms fade in
        clearIfInstructionShouldNotBeSeen = new SuperTimeout(function () {
          if (document.body.contains(keyboardInstructionPart1)) {
            document.body.removeChild(keyboardInstructionPart1); resetWebp(keyboardInstructionPart1);
            document.body.appendChild(keyboardInstructionPart2); // 400+400+400+400+ 8*250 + 999999 = 3600(animation) + stay + fade(1500)
          }
          new SuperTimeout(function () {
            if (document.body.contains(keyboardInstructionPart2)) {
              keyboardInstructionPart2.classList.add("itDisappears"); //1500 ms
              // FOR SOME REASON the following line throws an error which says »»» DOMException: Failed to execute 'removeChild' on 'Node': The node to be removed is not a child of this node.
              //// INSTEAD OF THIS TRY THE FOLLOWING set-Timeout(function () { document.body.removeChild(keyboardInstructionPart2); keyboardInstructionPart2.classList.remove("itDisappears"); resetWebp(keyboardInstructionPart2); }, 1501);
              new SuperTimeout(function () { keyboardInstructionPart2.classList.remove("itDisappears"); resetWebp(keyboardInstructionPart2); keyboardInstructionPart2.remove(); }, 1501);
            }
          }, showTime+4000); // ARROW KEYS WEBP starts fading to nothingness in 1800+4000 = 5800,,, 5800-3600 = 2200 last frame stay time at normal speed
        }, showTime); // From whole keyboard webp to ARROW KEYS WEBP
      }
    }
  } // End of showHowToBite

  function startTheGameB() {
    upperTeeth.style.visibility = "visible";
    lowerTeeth.style.visibility = "visible";
    if (deviceDetector.isMobile) {
      activateInteractionMOBILE();
    } else {
      activateInteractionDESKTOP();
    }
  }

} // END OF whatToDoWhenBreadIsTaken


// --- DESKTOP ---
let downArrowIsAlreadyPressed = false;
let countDownToValidifyTheBite;
let win2HasHappened = false;
let howManyBitesNow = 0;
function activateInteractionDESKTOP() {
  // CAREFUL: keyboard must be listened at both parent and frame level! So we cannot use {once:true} method to avoid turbo firing when key is held down
  // DEPRECATE: parent.window.addEventListener("keydown",aKeyWasPressed);
  window.addEventListener("keydown",aKeyWasPressed);
  // DEPRECATE: parent.window.addEventListener("keyup",aKeyWasReleased);
  window.addEventListener("keyup",aKeyWasReleased);
  // DEPRECATE let countDownUntilCursorReappear;
  function aKeyWasPressed(event) { event.preventDefault(); // We need this to prevent volume range slider movement
    // event.key respects OS keyboard type settings ,,, event.code ignores OS and returns QWERTY
    if (!downArrowIsAlreadyPressed && !parent.theAppIsPaused) { // See js_for_the_sliding_navigation_menu
      if (event.key == "ArrowDown" || event.code == "ArrowDown") { // No need to check if event.keyCode is 40 as keyCode is for veeery old browsers
        main.classList.remove("defaultCursor"); main.classList.add("noCursor"); // Immediately hide cursor in case it was visible due to hideTheCursorAndHandleAutoUnhideAutoHide
        /* DEPRECATE
        if (countDownUntilCursorReappear) { countDownUntilCursorReappear.clear(); } // Reset timer // clearTimeout(countDownUntilCursorReappear);
        countDownUntilCursorReappear = new SuperTimeout(function () { main.classList.remove("noCursor");  main.classList.add("defaultCursor"); }, 4000);
        */
        noBiteAttemptHasHappenedSoFar = false;
        // --
        if (clearIfInstructionShouldNotBeSeen) { clearIfInstructionShouldNotBeSeen.clear(); } // clearTimeout(clearIfInstructionShouldNotBeSeen);
        if (document.body.contains(keyboardInstructionPart1)) { document.body.removeChild(keyboardInstructionPart1); }
        if (document.body.contains(keyboardInstructionPart2)) { document.body.removeChild(keyboardInstructionPart2); }
        // --
        bitingSound0.play();
        downArrowIsAlreadyPressed = true;
        countDownToValidifyTheBite = new SuperTimeout(function () {
          countBitesAndMakeProgress();
        }, 111); // It takes 0.1s to complete teethContainer transition top in css
        letTheTeethSinkIntoBread();

      }
    }
  }
  function aKeyWasReleased(event) { event.preventDefault(); // We need this to prevent volume range slider movement
    if (downArrowIsAlreadyPressed && !parent.theAppIsPaused) { // See js_for_the_sliding_navigation_menu
      if (event.key == "ArrowDown" || event.code == "ArrowDown") { // No need to check if event.keyCode is 40 as keyCode is for veeery old browsers
        downArrowIsAlreadyPressed = false;
        countDownToValidifyTheBite.clear(); // clearTimeout(countDownToValidifyTheBite);
        reopenTheMouth();
        if (win2HasHappened) {
          removeKeyboardListeners();
          // Remove teeth against the possibility of window resize firing (which makes them show)
          new SuperTimeout(function () { upperTeeth.parentNode.removeChild(upperTeeth); lowerTeeth.parentNode.removeChild(lowerTeeth); }, 1000);
          new SuperTimeout(function () { finalSuccessSound.play(); finalEyeBlink(); }, 800); // See fastBiteSlowBiteToggle 750ms
        }
      }
    }
  }

  function removeKeyboardListeners() {
    // DEPRECATE: parent.window.removeEventListener("keydown",aKeyWasPressed);
    window.removeEventListener("keydown",aKeyWasPressed);
    // DEPRECATE: parent.window.removeEventListener("keyup",aKeyWasReleased);
    window.removeEventListener("keyup",aKeyWasReleased);
  }

  // -


} // END OF activateInteractionDESKTOP


//--- MOBILE ---
let initialDistance = 0; let newDistance = 0; let movement = 0;
let biteThresholdIsPassed = false;
function activateInteractionMOBILE() {
  // EVEN THOUGH: We are using stopPropagation to block touchlistener on window element which triggers the sliding nav menu
  // GET EXTRA-SAFE: by preventing all accidental swipe menu triggerings
  if (parent.topContainerDivOfTheSlidingNavMenuForMobiles) { // Check if it exists like this or use deviceDetector.isMobile
    parent.topContainerDivOfTheSlidingNavMenuForMobiles.style.visibility = "hidden";
    // It will be set to visible either when win2 happens below
    // or via js_for_all_iframed_lesson_htmls if user leaves the lesson before win2 happens
  }
  // ---
  thePinchArea.style.display = "block";
  thePinchArea.addEventListener("touchstart",handlePinchStartPinchEnd);
  thePinchArea.addEventListener("touchend",handlePinchStartPinchEnd);
  function handlePinchStartPinchEnd(event) { event.preventDefault(); event.stopPropagation(); // So that sliding nav menu won't be triggered
    if (event.touches.length == 2) {
      initialDistance = Math.abs(event.touches[0].clientY - event.touches[1].clientY);
      newDistance = initialDistance;
      main.addEventListener("touchmove",pinch);
    }
    else {
      main.removeEventListener("touchmove",pinch);
      // Reset teeth position if bite threshold was not passed
      if (!biteThresholdIsPassed) {
        resetMouthWithoutBite();
      }
    }
  }
  function pinch(event) {
    biteThresholdIsPassed = false;
    newDistance = Math.abs(event.touches[0].clientY - event.touches[1].clientY);
    movement = initialDistance - newDistance;
    if (movement<0) { movement=0; }
    else if (movement<95) {
      if (movement>50) { noBiteAttemptHasHappenedSoFar = false; }
      // show teeth slowly
      upperTeeth.style.top = ((movement/3.8) - 100).toFixed(2) +"vh";
      lowerTeeth.style.top = (100 - (movement/3.8)).toFixed(2) +"vh";
      // reset mouth if any of the touches ends before full bite happens
      // Wouldn't it be nicer if we checked hasEventListener so that it would add the listener only once? Or is it totally OK to overwrite on the same thing?
      ////document.addEventListener("touchend",resetMouthWithoutBite); // Open the mouth quickly without slowing down transition
    } else {
      ////document.removeEventListener("touchend",resetMouthWithoutBite);
      biteThresholdIsPassed = true;
      removeTouchListeners();
      if (document.body.contains(pinchInstruction)) {
        pinchInstruction.style.display = "none"; // Don't use removeChild here because there is a removeChild inside set-Timeout already and it will fire shortly
      }
      // To full bite
      letTheTeethSinkIntoBread();
      new SuperTimeout(function () {
        // play completeBite1 completeBite2 completeBite3
        // console.log("WELL BIT");
        countBitesAndMakeProgress();
      }, 111); // It takes 0.1s to complete teethContainer transition top in css

      new SuperTimeout(function () {
        reopenTheMouth(); // 2-After 500ms or so, slowly open the mouth » takes 0.75s in css
        new SuperTimeout(function () {
          if (!win2HasHappened) {
            thePinchArea.addEventListener("touchstart",handlePinchStartPinchEnd);
            thePinchArea.addEventListener("touchend",handlePinchStartPinchEnd);
          }
        }, 751); // 3-Get ready to restart pinching
      }, 600); // 1-Wait a moment as jaw is closed
    }
  }
  function removeTouchListeners() {
    thePinchArea.removeEventListener("touchstart",handlePinchStartPinchEnd);
    thePinchArea.removeEventListener("touchend",handlePinchStartPinchEnd);
    main.removeEventListener("touchmove",pinch);
  }

} // END OF activateInteractionMOBILE


function countBitesAndMakeProgress() {
  if (howManyBitesNow == 0) {
    breadsFarAndNearDiv.children[2].style.visibility = "hidden";
    breadsFarAndNearDiv.children[3].style.display = "block";
    new SuperTimeout(function () { bitingSound1.play(); }, 30); // Fine-tune the timing
    if (canVibrate) { navigator.vibrate([10,50,40,100,20,150,12,200,8]); }
    // stop all audio inside startTalkingAgain
    /*clearTimeout(to15); clearTimeout(to16); clearTimeout(to17); clearTimeout(to18); clearTimeout(to19); clearTimeout(to20);*/
    to15.clear();  to16.clear();  to17.clear();  to18.clear();  to19.clear();  to20.clear();
    injectTextIntoTheHelpBoxP.innerHTML = "…"; // Remove text from translation helpbox|subtitles
  } else if (howManyBitesNow == 1) {
    breadsFarAndNearDiv.children[3].style.visibility = "hidden";
    breadsFarAndNearDiv.children[4].style.display = "block";
    new SuperTimeout(function () { bitingSound2.play(); }, 30); // Fine-tune the timing
    if (canVibrate) { navigator.vibrate([10,50,40,100,20,150,12,200,8]); }
  } else if (howManyBitesNow == 2) {
    breadsFarAndNearDiv.children[4].style.visibility = "hidden";
    breadsFarAndNearDiv.children[5].style.display = "block"; // Three bite marks on bread
    new SuperTimeout(function () { bitingSound3.play(); }, 30); // Fine-tune the timing
    if (canVibrate) { navigator.vibrate([10,50,40,100,20,150,13,200,11,250,9,300,7]); }
    // WIN
    win2HasHappened = true; // So that we can remove keyboard listeners via aKeyWasReleased
    if (deviceDetector.isMobile) {
      new SuperTimeout(function () { upperTeeth.parentNode.removeChild(upperTeeth); lowerTeeth.parentNode.removeChild(lowerTeeth); }, 1500);
    } else {
      // On desktop it must wait until keyup » See aKeyWasReleased()
    }
    whenWin2happens();
  } else {
    // No more bread
  }
  howManyBitesNow++;
}

function resetMouthWithoutBite() {
  upperTeeth.style.top = "-100vh";
  lowerTeeth.style.top = "100vh";
}

function letTheTeethSinkIntoBread() {

  if (parent.lastRecordedWindowWidth >= parent.lastRecordedWindowHeight) { // LANDSCAPE - Use calc to get as accurate and nice as possible
    ////const moveThisMuch = (parent.lastRecordedWindowWidth - parent.lastRecordedWindowHeight)*2/parent.lastRecordedWindowHeight;
    //console.log(goodNumberInVhOrVmins);
    upperTeeth.style.top = "calc(0vh - "+(37-goodNumberInVhOrVmins/4).toFixed(1)+"vmin)";
    lowerTeeth.style.top = "calc(100vh - "+(37-goodNumberInVhOrVmins/4).toFixed(1)+"vmin)";
  } else { // PORTRAIT - Use calc to try and get a bit more accurate
    ////const moveThisMuch = 0;//(parent.lastRecordedWindowHeight - parent.lastRecordedWindowWidth)/parent.lastRecordedWindowWidth;
    //console.log(goodNumberInVhOrVmins);
    upperTeeth.style.top = "calc(0vh - "+(35+8.6+goodNumberInVhOrVmins/4).toFixed(1)+"vmin)";
    lowerTeeth.style.top = "calc(100vh - "+(35+8.6+goodNumberInVhOrVmins/4).toFixed(1)+"vmin)";
  }
  upperTeeth.classList.toggle("fastBiteSlowBiteToggle");
  lowerTeeth.classList.toggle("fastBiteSlowBiteToggle");
  if (deviceDetector.isMobile) {
    bitingSound0.play(); // On desktops it plays as soon as down arrow is pressed on keyboard
    upperTeeth.style.transform = "translateY(-8vmin)";
    lowerTeeth.style.transform = "translateY(-8vmin)";
    new SuperTimeout(function () {
      upperTeeth.style.transform = "translateY(-7vmin)";
      lowerTeeth.style.transform = "translateY(-7vmin)";
    }, 200);
    new SuperTimeout(function () {
      upperTeeth.style.transform = "translateY(-7.5vmin)";
      lowerTeeth.style.transform = "translateY(-7.5vmin)";
    }, 400);
  }
}

function reopenTheMouth() {
  upperTeeth.style.top = "-100vh";
  lowerTeeth.style.top = "100vh";
  upperTeeth.classList.toggle("fastBiteSlowBiteToggle");
  lowerTeeth.classList.toggle("fastBiteSlowBiteToggle");
  if (deviceDetector.isMobile) {
    upperTeeth.style.transform = "translateY(0vmin)";
    lowerTeeth.style.transform = "translateY(0vmin)";
  }
}

function finalEyeBlink() {
    movingEyesDiv.children[0].style.display = "none"; // To asian smiling eyes
    movingEyesDiv.children[1].style.display = "none"; // To asian smiling eyes
    movingEyesDiv.children[2].style.display = "block"; // To asian smiling eyes
    new SuperTimeout(function () {
      movingEyesDiv.children[2].style.display = "none"; movingEyesDiv.children[1].style.display = "block"; // To big happy eyes
      new SuperTimeout(function () {
        movingEyesDiv.children[1].style.display = "none"; movingEyesDiv.children[2].style.display = "block"; // To asian smiling eyes
        new SuperTimeout(function () {
          movingEyesDiv.children[2].style.display = "none"; movingEyesDiv.children[1].style.display = "block"; // To big happy eyes
        }, 250); // Stay closed
      }, 600); // Stay open
    }, 1700); // Stay closed before open
}
// ---
// ---
function whenWin2happens() {
  if (deviceDetector.isMobile) {
    new SuperTimeout(function () {    finalSuccessSound.play(); finalEyeBlink();    }, 1500); // Sync with vibration
    setTimeout(function () { // Unblock swipe menu
      if (parent.topContainerDivOfTheSlidingNavMenuForMobiles) { // Check if it exists like this or use deviceDetector.isMobile
        parent.topContainerDivOfTheSlidingNavMenuForMobiles.style.visibility = "visible"; // As it was hidden by activateInteractionMOBILE
      }
    },3500);
  } else {
    // On desktops we must wait for keyup before playing finalSuccessSound » See aKeyWasReleased
    // --
    // Unhide cursor as it was in auto-hide mode due to hideTheCursorAndHandleAutoUnhideAutoHide
    new SuperTimeout(function () { main.classList.remove("noCursor"); main.classList.add("defaultCursor"); },4000);
  }
  // --
  pictogramDiv.children[5].classList.add("fadeOut"); // speech bubble disappears
  new SuperTimeout(function(){ pictogramDiv.children[5].style.display = "none"; },601);
  // --
  let proceedTime;
  switch (parent.speedAdjustmentSetting) { case "slow": proceedTime = 8500; break;    case "fast": proceedTime = 5500; break;    default: proceedTime = 7000; }
  new SuperTimeout(function () {
    /* DEPRECATE
    if (couldYouFigureOutHowToSayEat) { // This means fetch successfully got the text
      createAndHandleInfoBoxType1AmidLesson(); putNotificationTxtIntoThisP2.innerHTML = couldYouFigureOutHowToSayEat; // Will show for all languages
      // continueLesson() will be fired from within createAndHandleInfoBoxType1AmidLesson()
    } else {
      continueLesson();
    }
    */
    display_OUTRO_listenBox();
  }, proceedTime);
}

function display_OUTRO_listenBox() {
  // Display pronunciation-teacher-box to play how to say "thank you"
  const filePathOfTheAudio1 = "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_1/lesson_4/eat_listenbox_1."+soundFileFormat;
  const filePathOfTheAudio2 = "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_1/lesson_4/eat_listenbox_2."+soundFileFormat;
  const filePathOfTheAudio3 = "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_1/lesson_4/eat_listenbox_3."+soundFileFormat;
  const filePathOfLipSyncJSON1 = "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_1/lesson_4/eat_listenbox_1.json";
  const filePathOfLipSyncJSON2 = "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_1/lesson_4/eat_listenbox_2.json";
  const filePathOfLipSyncJSON3 = "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_1/lesson_4/eat_listenbox_3.json";
  // NOTE: The lip-sync json file names better be THE SAME with the audio file names that will be played in the listen-many-times box » See js_for_info_boxes_in_lessons
  const listenBoxP1P2Path = "/user_interface/text/"+userInterfaceLanguage+"/1-1-4_vocabulary_outro_p1_p2.txt"; // UI lang depends on domain (hostname) » See js_for_every_single_html
  fetch(listenBoxP1P2Path,myHeaders).then(function(response){return response.text();}).then(function(contentOfTheTxtFile){
    handleP1P2ActualTextOUTRO(contentOfTheTxtFile); // CAUTION: It's outro
  });
  // See js_for_info_boxes_in_lessons » iframe-lesson level
  new SuperTimeout(function(){
    createAndHandleListenManyTimesBox(filePathOfTheAudio1,filePathOfLipSyncJSON1,filePathOfTheAudio2,filePathOfLipSyncJSON2,filePathOfTheAudio3,filePathOfLipSyncJSON3,true); // true as seventh parameter turns it into an outro box
  },501); // If fetch cannot get the file within 501 ms the default content of the box (with emojis icons etc) will be visible until fetch gets the file
}

function vocabularyBoxIsClosed_LESSON_OUTRO() {
  /* Save progress */
  parent.savedProgress[studiedLang].lesson_TAKEBREAD_IsCompleted=true; // WATCH THE NAME OF THE LESSON!!!
  parent.saveJSON = JSON.stringify(parent.savedProgress); // Convert
  localStorage.setItem("memoryCard", parent.saveJSON); // Save
  // -
  // Not used: new SuperTimeout(displayNoteAtTheEndOfLesson,1000);
  new SuperTimeout(continueLesson,1000);
}

/* Not used:
function displayNoteAtTheEndOfLesson() {
  // Is this still NECESSARY?
}
*/


function continueLesson() { // In this case, it means exiting the lesson as there is nothing left to do
  // ---
  let endTime;
  switch (parent.speedAdjustmentSetting) { case "slow": endTime = 2500; break;    case "fast": endTime = 500; break;    default: endTime = 1500; }
  new SuperTimeout(function () {
    // ---
    showGlobyPreloaderBeforeExit(); // 1500ms » See js_for_all_iframed_lesson_htmls AND See css_for_preloader_and_orbiting_circles
    // REMEMBER: iframe.src change makes window.onbeforeunload fire in js_for_all_iframed_lesson_htmls.js which then calls unloadTheSoundsOfThisLesson();
    // Display author's notice1 if this was user's first time finishing this lesson (1-1-4)
    // Otherwise go to lesson 1-2-1
    if (localStorage.breadBakedByAuthorNoticeHasBeenDisplayedAlready) { // See notice_1/index.html
      parent.pathOfWhatWillBeDisplayedUnlessInternetConnectivityIsLost = "/lessons_in_iframes/level_1/unit_2/lesson_1/index.html"; // See js_for_online_and_offline_modes
    } else {
      parent.pathOfWhatWillBeDisplayedUnlessInternetConnectivityIsLost = "/lessons_in_iframes/level_1/unit_1/notice_1/index.html"; // See js_for_online_and_offline_modes
    }
    // ---
    if (parent.internetConnectivityIsNiceAndUsable) { // See js_for_online_and_offline_modes.js
      new SuperTimeout(function () { parent.ayFreym.src = parent.pathOfWhatWillBeDisplayedUnlessInternetConnectivityIsLost; }, 1500);
    } else { parent.console.warn("THE DEVICE IS OFFLINE (detected at the end of lesson");
      const isCached = checkIfNextLessonIsCachedAndRedirectIfNot(121); // See js_for_all_iframed_lesson_htmls
      // As of October 2023 we are not making 100% certain if assets for author's notice are cached » We expect it will be cached 99.99% of the time if everything for 121 is cached
      if (isCached) { parent.console.warn("WILL TRY TO CONTINUE OFFLINE");
        new SuperTimeout(function() { parent.ayFreym.src = parent.pathOfWhatWillBeDisplayedUnlessInternetConnectivityIsLost; }, 1500);
      }
    }
    // ---
  }, endTime); // If there was a final dialog box then better let it disappear completely before preloader starts appearing

} // END OF continueLesson
