"use strict";
/* This js file must be DEFERRED to be able to declare consts for elements without DOMContentLoaded */

/* __ SAVE PROGRESS TO LOCAL STORAGE __ */
// See js_for_app_initialization_in_parent to find how savedProgress.ja savedProgress.zh savedProgress.tr savedProgress.ar savedProgress.en are created
const studiedLang = parent.langCodeForTeachingFilePaths;
// !!! VERY CAREFUL: Watch the lesson name!!!
parent.savedProgress[studiedLang].lesson_TAKEBREAD_IsViewed=true; // Create and add... or overwrite the same thing
parent.saveJSON = JSON.stringify(parent.savedProgress); // Convert
localStorage.setItem("memoryCard", parent.saveJSON); // Save

/* __ TEXT TO BE INJECTED INTO EXPLANATION BOX __ */
const explanationPathA = "/user_interface/text/"+userInterfaceLanguage+"/1-1-4a.txt"; // The translation of what is being said, to be put into the helpbox/subtitles.
const explanationPathB = "/user_interface/text/"+userInterfaceLanguage+"/1-1-4b.txt"; // The translation of what is being said, to be put into the helpbox/subtitles.
let explanationA = "…"; // Warning: Without an initial value it returns UNDEFINED before fetch() actually gets the file.
let explanationB = "…"; // Warning: Without an initial value it returns UNDEFINED before fetch() actually gets the file.
fetch(explanationPathA,myHeaders).then(function(response){return response.text();}).then(function(contentOfTheTxtFile){ explanationA = contentOfTheTxtFile; });
fetch(explanationPathB,myHeaders).then(function(response){return response.text();}).then(function(contentOfTheTxtFile){ explanationB = contentOfTheTxtFile; });

/* ___AUDIO ELEMENTS___ */ //...Sound player (Howler) exists in the parent html. So the path must be relative to the parent html. Not to the framed html.
let say1Path = "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_1/lesson_4/take_bread_1_normal.webm";
let say2Path = "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_1/lesson_4/take_bread_1_slow.webm";
let say3Path = "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_1/lesson_4/take_bread_2_normal.webm";
let say4Path = "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_1/lesson_4/take_bread_2_slow.webm";
let say5Path = "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_1/lesson_4/eat_normal.webm";
let say6Path = "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_1/lesson_4/eat_bread_normal.webm";
let say7Path = "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_1/lesson_4/eat_slow.webm";
let say8Path = "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_1/lesson_4/eat_bread_slow.webm";

if (parent.mustUseFemaleConjugationForCommandVerbs) { // See js_for_app_initialization_in_parent
  say1Path = say1Path.split(".")[0] + "_tofemale.webm";
  say2Path = say2Path.split(".")[0] + "_tofemale.webm";
  say3Path = say3Path.split(".")[0] + "_tofemale.webm";
  say4Path = say4Path.split(".")[0] + "_tofemale.webm";
  say5Path = say5Path.split(".")[0] + "_tofemale.webm";
  say6Path = say6Path.split(".")[0] + "_tofemale.webm";
  say7Path = say7Path.split(".")[0] + "_tofemale.webm";
  say8Path = say8Path.split(".")[0] + "_tofemale.webm";
}
let saySecondSet = false; // First set is say1 + say2,,, second set is say3 + say4
const say1 = new parent.Howl({  src: [say1Path]  });
const say2 = new parent.Howl({  src: [say2Path]  });
const say3 = new parent.Howl({  src: [say3Path]  });
const say4 = new parent.Howl({  src: [say4Path]  });
const say5 = new parent.Howl({  src: [say5Path]  });
const say6 = new parent.Howl({  src: [say6Path]  });
const say7 = new parent.Howl({  src: [say7Path]  });
const say8 = new parent.Howl({  src: [say8Path]  });

const touchClickBreadSound = new parent.Howl({  src: ["/lessons_in_iframes/level_1/unit_1/lesson_4/user_contacts_bread.webm"]  });
const startDraggingBreadSound = new parent.Howl({  src: ["/lessons_in_iframes/level_1/unit_1/lesson_4/user_starts_dragging_bread.webm"]  });
const bitingSound0 = new parent.Howl({  src: ["/lessons_in_iframes/level_1/unit_1/lesson_4/bite_0.webm"]  });
const bitingSound1 = new parent.Howl({  src: ["/lessons_in_iframes/level_1/unit_1/lesson_4/bite_1.webm"]  });
const bitingSound2 = new parent.Howl({  src: ["/lessons_in_iframes/level_1/unit_1/lesson_4/bite_2.webm"]  });
const bitingSound3 = new parent.Howl({  src: ["/lessons_in_iframes/level_1/unit_1/lesson_4/bite_3.webm"]  });
const winSound1 = new parent.Howl({  src: ["/lessons_in_iframes/level_1/unit_1/lesson_4/user_takes_the_bread.webm"]  });
const finalSuccessSound = new parent.Howl({  src: ["/lessons_in_iframes/level_1/unit_1/lesson_4/user_has_eaten_bread.webm"]  });

/* Sound init code is linked on the parent but the consts exist in frame. SEE js_for_all_iframed_lesson_htmls » FIND onbeforeunload. */
function unloadTheSoundsOfThisLesson() {
  finalSuccessSound.unload();
  winSound1.unload();
  bitingSound3.unload();
  bitingSound2.unload();
  bitingSound1.unload();
  bitingSound0.unload();
  startDraggingBreadSound.unload();
  touchClickBreadSound.unload();
  say8.unload(); say7.unload(); say6.unload(); say5.unload(); say4.unload(); say3.unload(); say2.unload(); say1.unload();
}

/* Declare js variables to manipulate the elements */
const main = document.getElementsByTagName('MAIN')[0];
const pictogramDiv = document.getElementById("pictogramDivID");
const movingEyesDiv = document.getElementById("movingEyesDivID");
const breadsFarAndNearDiv = document.getElementById("breadsFarAndNearID");
let skip_b_and_c = false;
//---
const handCursor = document.createElement("IMG");
const antigoofingDiv = document.getElementById("antigoofingID");
const aBetterClickArea = document.querySelector(".clickArea");
const aGreaterTouchMoveArea = document.querySelector(".touchMoveArea");
const aGreaterTouchStartArea = document.querySelector(".touchStartArea");
const thePinchArea = document.querySelector(".pinchArea");
const dimmer = document.querySelector(".dimmer");
const upperTeeth = document.querySelector(".upperTeethContainer");
const lowerTeeth = document.querySelector(".lowerTeethContainer");
//---
const swipeInstructionPart1 = document.createElement("IMG");
const swipeInstructionPart2 = document.createElement("IMG");
const keyboardInstructionPart1 = document.createElement("IMG");
const keyboardInstructionPart2 = document.createElement("IMG");
const pinchInstruction = document.createElement("IMG");

////window.addEventListener('DOMContentLoaded', whatMustBeDoneAtFirstOnThisDevice, { once: true });
document.addEventListener('readystatechange', (event) => {
  if (event.target.readyState === 'complete') {    whatMustBeDoneAtFirstOnThisDevice();  }
});
function whatMustBeDoneAtFirstOnThisDevice() {
  if (deviceDetector.device == "tablet") { //swipeInstructionPosition
    // TABLETS - TABLETS - TABLETS
    aBetterClickArea.parentNode.removeChild(aBetterClickArea);
    upperTeeth.children[1].classList.add("teethSizeMobile");
    lowerTeeth.children[1].classList.add("teethSizeMobile");
    swipeInstructionPart1.src = "tablet_swipe_a.webp"; // Fade in included in webp
    swipeInstructionPart1.classList.add("swipeInstructionPosition"); //// swipeInstructionPart1.style.opacity = "0.01";
    swipeInstructionPart2.src = "tablet_swipe_b.webp";
    swipeInstructionPart2.classList.add("swipeInstructionPosition");
    pinchInstruction.src = "tablet_pinch.webp";
    pinchInstruction.classList.add("swipeInstructionPosition");
  } else if (deviceDetector.device == "phone") {
    // PHONES - PHONES - PHONES
    aBetterClickArea.parentNode.removeChild(aBetterClickArea);
    upperTeeth.children[1].classList.add("teethSizeMobile");
    lowerTeeth.children[1].classList.add("teethSizeMobile");
    swipeInstructionPart1.src = "phone_swipe_a.webp"; // Fade in included in webp
    swipeInstructionPart1.classList.add("swipeInstructionPosition");   //// swipeInstructionPart1.style.opacity = "0.01";
    swipeInstructionPart2.src = "phone_swipe_b.webp";
    swipeInstructionPart2.classList.add("swipeInstructionPosition");
    pinchInstruction.src = "phone_pinch.webp";
    pinchInstruction.classList.add("swipeInstructionPosition");
  } else {
    // DESKTOPS - DESKTOPS - DESKTOPS
    aGreaterTouchMoveArea.parentNode.removeChild(aGreaterTouchMoveArea); //aGreaterTouchStartArea will also be removed since it is contained by aGreaterTouchMoveArea
    thePinchArea.parentNode.removeChild(thePinchArea); // Even though it's set to display none and will never turn to block on desktops
    handCursor.src = "/user_interface/images/cursor/hand_cursor.webp";
    handCursor.classList.add("handCursorSize");
    upperTeeth.children[1].classList.add("teethSizeDesktop");
    lowerTeeth.children[1].classList.add("teethSizeDesktop");
    keyboardInstructionPart1.src = "keyboard_whole.webp"; // Fade in included in webp
    keyboardInstructionPart1.classList.add("swipeInstructionPosition"); //// keyboardInstructionPart1.style.opacity = "0.01";
    keyboardInstructionPart2.src = "keyboard_down_arrow.webp";
    keyboardInstructionPart2.classList.add("swipeInstructionPosition");  // Try to get away with applying class for mobile
    keyboardInstructionPart1.style.width = "55vmin";  keyboardInstructionPart2.style.width = "55vmin"; // Override value in css // Looks good enough
  }
}

let lastRecordedWidth = window.innerWidth; let lastRecordedHeight = window.innerHeight;
window.addEventListener('resize', updateWindowProperties);
function updateWindowProperties() {
  lastRecordedWidth = window.innerWidth; lastRecordedHeight = window.innerHeight; // Update the values
  setTimeout(function () { lastRecordedWidth = window.innerWidth; lastRecordedHeight = window.innerHeight; },100); // Double check
}

/* SET OFF */
window.addEventListener('load', loadingIsCompleteFunction, { once: true });
function loadingIsCompleteFunction() {
  if (parent.langCodeForTeachingFilePaths == "zh") { // Display note about the importance of intonation in RENMEN.
    const pathOfNotificationAboutIntonation = "/user_interface/text/"+userInterfaceLanguage+"/1-1-4_special_case_for_zh.txt";
    fetch(pathOfNotificationAboutIntonation,myHeaders).then(function(response){return response.text();}).then(function(contentOfTheTxtFile){
      setTimeout(function(){ createAndHandleInfoBoxType1BeforeLessonStarts(); putNotificationTxtIntoThisP1.innerHTML = contentOfTheTxtFile; },501); // See js_for_info_boxes_in_lessons.js
      // createAndHandleInfoBoxType1BeforeLessonStarts will fire startTheLesson 1.5 seconds after its OK button is clicked/touched
    });
  }
  else {
    startTheLesson(); // Call it now if it was not to be called from within createAndHandleInfoBoxType1BeforeLessonStarts() in js_for_all_iframed_lesson_htmls.js
  }
}

function startTheLesson() {
  // User must listen to wavesurfer vocabulary box no matter what language he/she is studying
  const filePathOfTheAudioFile = "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_1/lesson_4/take.webm";  // In case of "ar" wavesurfer box will play the verb root in male conjugation even if the user is female
  const wavesurferP1P2Path = "/user_interface/text/"+userInterfaceLanguage+"/1-1-4_vocabulary_p1_p2.txt"; // UI lang depends on domain (hostname) » See js_for_every_single_html
  fetch(wavesurferP1P2Path,myHeaders).then(function(response){return response.text();}).then(function(contentOfTheTxtFile){  handleP1P2ActualText(contentOfTheTxtFile);  });
  // See js_for_info_boxes_in_lessons » iframe-lesson level
  setTimeout(function(){    createAndHandleListenManyTimesBox(filePathOfTheAudioFile);    },501); // Wait for preloader to disappear or give a brief break after notification
}

let isParentBlurred = true; // Clicking on iframe blurs the parent,,, so start blurred
let isFrameBlurred = false; //
function vocabluaryBoxIsClosed(x,y) { // Will fire from within createAndHandleListenManyTimesBox
  //---
  let unblurTime;  switch (parent.speedAdjustmentSetting) {  case "slow": unblurTime = 2.0; break;  case "fast": unblurTime = 0.5; break;  default: unblurTime = 1.0;  }
  main.style.transitionDuration = String(unblurTime)+"s";
  main.style.filter = "blur(0px)";
  setTimeout(function () { playPictogramLoop(); }, unblurTime*550);
  //---
  waitForFirstTouchOrClickOnBread(); // Start waiting for a click or touch without waiting for unblur to complete
  //--- BIG HAND IMG AS CUSTOM CURSOR
  if (deviceDetector.device == "desktop") {
    main.classList.remove("defaultCursor"); main.classList.add("noCursor");
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
      else if (event.clientX >= 10 && event.clientX <= (lastRecordedWidth-10)) {        handCursor.style.visibility = "visible";      }
      else {        handCursor.style.visibility = "hidden";      }
      /*top limit handled by mouseenter on sliding nav menu*/
      if (event.clientY>(lastRecordedHeight-10)) { handCursor.style.display = "none"; }
      else {
        if (!mouseIsOnNavMenu) { handCursor.style.display = "block"; } // Works
      }
    }
    function handCursorDisappear() { handCursor.style.opacity = "0"; }
    function handCursorReappear() { handCursor.style.opacity = "1";  }
  }

}

let userAlreadyKnowsHowToSwipe = false;
let to1,ticker1,ticker2,to2,to3,to4,to5,to6,to7,toDisplayHowToSwipe,to8,to9,to10,to11,to12,to13,to14,to15,to16,to17,to18,to19,to20,timeoutCursorHide,timeoutHearSinewave,clearIfInstructionShouldNotBeSeen;
let loopCounter=1; let waitTime = 0;
function playPictogramLoop() { // Fires when blur has 55% cleared towards focus to open the scene
  let changeTime;  switch (parent.speedAdjustmentSetting) {  case "slow": changeTime = 2700; break;  case "fast": changeTime = 1200; break;  default: changeTime = 1900;  }
  to1 = setTimeout(function(){
    movingEyesDiv.style.left = "3.0%"; movingEyesDiv.style.top = "0.5%"; // Moving the eyes looks like rotating the head
    // NOTE: Element.children includes only element nodes (i.e. skips comments).
    to2 = setTimeout(function(){
      if (!skip_b_and_c) {
        pictogramDiv.children[0].style.display = "none"; // a- Natural standing
        pictogramDiv.children[1].style.display = "block"; // b- Pointing hand 1
        pictogramDiv.children[2].style.display = "none"; // c- Pointing hand 2
        let pointCounter = 1;
        ticker1 = setInterval(function () {
          if (pointCounter%3 != 0) {
            pictogramDiv.children[0].style.display = "none"; // a- Natural standing
            pictogramDiv.children[1].style.display = "block"; // b- Pointing hand 1
            pictogramDiv.children[2].style.display = "none"; // c- Pointing hand 2
          }
        }, changeTime/5);
        ticker2 = setInterval(function () {
          to3 = setTimeout(function () {
            if (pointCounter%4 != 0) {
              pictogramDiv.children[0].style.display = "none"; // a- Natural standing
              pictogramDiv.children[1].style.display = "none"; // b- Pointing hand 1
              pictogramDiv.children[2].style.display = "block"; // c- Pointing hand 2
            }
          }, changeTime/12);
          pointCounter++;
        }, changeTime/5);
        setTimeout(function () {
          if (ticker1) { clearInterval(ticker1); }
          if (ticker2) { clearInterval(ticker2); }
        }, changeTime*1.6);
      } else {
        pictogramDiv.children[0].style.display = "block"; // a- Natural standing
        pictogramDiv.children[1].style.display = "none"; // b- Pointing hand 1
        pictogramDiv.children[2].style.display = "none"; // c- Pointing hand 2
      }
      to4 = setTimeout(function(){
        movingEyesDiv.style.left = "0%"; movingEyesDiv.style.top = "0%"; // Look at the camera again
        to5 = setTimeout(function(){
          pictogramDiv.children[3].classList.add("fadeIn"); to6 = setTimeout(function(){ pictogramDiv.children[3].classList.remove("fadeIn"); },601); // Speech bubble 1 appears
          pictogramDiv.children[3].style.display = "block"; // speech bubble with bread+hand
          injectTextIntoTheHelpBoxP.innerHTML = explanationA;
          to7 = setTimeout(talk1,1000);
          function talk1() { if (saySecondSet) {  say3.play();  } else {  say1.play();  } }

          // Show how to do SWIPE-DOWN gesture to mobile user » Only once in a session!
          if (deviceDetector.isMobile) {
            if (loopCounter >= 4) { sessionStorage.level114SwipeInstructionHasBeenDisplayedThreeTimes = "yes"; }

            if (sessionStorage.level114SwipeInstructionHasBeenDisplayedThreeTimes) { waitTime = 0; } // No instructions and no waiting » 4th lap and on
            else { // First three laps
              if (!userAlreadyKnowsHowToSwipe) { // Sets to true as soon as ~=75px swipe is accomplished
                toDisplayHowToSwipe = setTimeout(displaySwipeInstruction, 4500); // After first say ,,, timeout clears if win1 happens
                function displaySwipeInstruction() {
                  document.body.appendChild(swipeInstructionPart1); // 9x50ms + 1x900ms + 4x350 + 1x99999 = 2750 + 99999
                  setTimeout(function () {
                    document.body.removeChild(swipeInstructionPart1); resetWebp(swipeInstructionPart1); // resetWebp() is in js_for_every_single_html
                    document.body.appendChild(swipeInstructionPart2); //50ms x 14 frames = 700ms
                    setTimeout(function () {
                      swipeInstructionPart2.classList.add("itDisappears"); //1500 ms
                      setTimeout(function () { document.body.removeChild(swipeInstructionPart2); swipeInstructionPart2.classList.remove("itDisappears"); resetWebp(swipeInstructionPart2); }, 1501); // resetWebp() is in js_for_every_single_html
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

          to8 = setTimeout(function(){
            pictogramDiv.children[3].style.display = "none"; // speech bubble with bread+hand
            pictogramDiv.children[4].style.display = "block"; // speech bubble with bread+[pull]arrow

            to9 = setTimeout(talk2,1250);
            function talk2() {   if (saySecondSet) {  say4.play();  } else {  say2.play();  }   }

            to10 = setTimeout(function(){
              pictogramDiv.children[4].classList.add("fadeOut"); // speech bubble disappears
              to11 = setTimeout(function(){ pictogramDiv.children[4].classList.remove("fadeOut"); pictogramDiv.children[4].style.display = "none"; },601);
              //---
              to12 = setTimeout(function(){
                pictogramDiv.children[0].style.display = "block"; // a- Natural standing
                pictogramDiv.children[1].style.display = "none"; // b- Pointing hand 1
                pictogramDiv.children[2].style.display = "none"; // c- Pointing hand 2
                injectTextIntoTheHelpBoxP.innerHTML = "…";
                to13 = setTimeout(function(){
                  saySecondSet = !saySecondSet; // Toggle between first set of says and second set of says
                  if (loopCounter<4) { playPictogramLoop(); } // Repeat limit: 4 times max
                  loopCounter++;
                },(changeTime-400)); // back to start
              },(changeTime-600)); // Back to initial pose
            },(changeTime+3000)); // Bubble disappears
          },(changeTime+4900+waitTime)); // From bubble 1 to bubble 2
        },(changeTime-300)); // Bubble 1 appears
      },(changeTime-100)); // Look at the camera again
    },(changeTime+100)); // Arm does its second pointing movement
  },(changeTime+500)); // Rotate the head & arm does its first pointing movement
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
  setTimeout(function () { breadsFarAndNearDiv.classList.remove("breadGlow"); }, 3000);
  // In case pictogram man was pointing to the bread when user clicked/touched
  if (ticker1) { clearInterval(ticker1); } if (ticker2) { clearInterval(ticker2); } clearTimeout(to2); clearTimeout(to3);
  pictogramDiv.children[0].style.display = "block"; // a- Natural standing
  pictogramDiv.children[1].style.display = "none"; // b- Pointing hand 1
  pictogramDiv.children[2].style.display = "none"; // c- Pointing hand 2
  skip_b_and_c = true; // Prevent pointing pose
  timeoutHearSinewave = setTimeout(function () {
    gainNode.gain.value = parent.Howler.volume()/10; // Sine wave oscillator glitch-cracking gets worse with step by step fading
    sineWaveIsAudibleNow = true;
  }, 1300); // crunch:1280 + porcelain:1464

  //---
  if (deviceDetector.isMobile) {
    breadsFarAndNearDiv.style.transform = "translateY(-7.5vmin)";
    // Porcelain sound is heard without waiting for first little drag movement (unlike desktop)
    setTimeout(function () { startDraggingBreadSound.play(); }, 250); // Note: user_contacts_bread is 1280ms long
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
  timeoutCursorHide = setTimeout(function () { handCursor.style.marginTop = "-100vh"; },300); // NECESSARY: Must guarantee invisibility» even though it already disappears with opacity transition via event listeners added in vocabluaryBoxIsClosed()
}
let goodNumberInVhOrVmins=0;
function updateTheBreadTaking(event) { // No need to stopPropagation of touchmove because sliding nav menu first requires touchstart on window (which is blocked by stopPropagation in startTheGameA)

  if (deviceDetector.isMobile) {
    deltaY = event.touches[0].clientY - lastY; // Downward movement yields positive values

    if (waitingForBreadDrag) {
      setTimeout(function () {  if (canVibrate) { navigator.vibrate([12,110,7]); }  },100);
      waitingForBreadDrag = false;
    }
  } else {
    deltaY = event.clientY - lastY; // Downward movement yields positive values
    if (waitingForBreadDrag) {
      // Porcelain sound is heard after waiting for the first little drag movement (unlike mobile)
      setTimeout(function () { startDraggingBreadSound.play(); }, 750); // Note: user_contacts_bread is 1280ms long
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

  goodNumberInVhOrVmins = Number((goodNumberInPixels*100/lastRecordedHeight).toFixed(2));

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
    clearTimeout(to1); clearTimeout(to2); clearTimeout(to3); clearTimeout(to4); clearTimeout(to5); clearTimeout(to6); clearTimeout(to7); clearTimeout(toDisplayHowToSwipe);
    clearTimeout(to8); clearTimeout(to9); clearTimeout(to10); clearTimeout(to11); clearTimeout(to12); clearTimeout(to13);
    if (ticker1) { clearInterval(ticker1); }
    if (ticker2) { clearInterval(ticker2); }
    injectTextIntoTheHelpBoxP.innerHTML = "…";
    whatToDoWhenBreadIsTaken();
  }
}
function handleLettingGoBeforeSuccess() { // Allow propagation in this case so that window touchend can lock screen orientation » See waitForFirstTouchOrClickOnBread()
  setTimeout(function () {  if (canVibrate) { navigator.vibrate([13,90,10,110,7,130,5]); }  },30);
  waitingForBreadDrag = true;
  skip_b_and_c = false;
  clearTimeout(timeoutCursorHide); // No need for if(timeoutCursorHide)
  clearTimeout(timeoutHearSinewave);
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
  setTimeout(function () { breadsFarAndNearDiv.children[1].style.opacity = "0"; },500);
  dimmer.style.opacity = "0";
  const lastFrequency = oscillator.frequency.value;
  let i=0;
  let newValue;
  const subtractiveProcess = setInterval(function () {
    if (sineWaveIsAudibleNow) {
      newValue = lastFrequency-i*1.7;
      if (newValue<startingFrequency) { newValue = startingFrequency; } // limit
      oscillator.frequency.value = newValue;
      i++;
    }
  },10); // Fire 100 times within 1s
  setTimeout(function () { clearInterval(subtractiveProcess); gainNode.gain.value = 0; sineWaveIsAudibleNow = false; oscillator.frequency.value = startingFrequency; waitForFirstTouchOrClickOnBread(); },1000);
  // Sine wave oscillator glitch-cracking gets worse with fade
}

////let desktopUserAlreadyKnowsHowToBite = false;
////let mobileUserAlreadyKnowsHowToBite = false;
let noBiteAttemptHasHappenedSoFar = true;
function whatToDoWhenBreadIsTaken() {
  // brightness-bread-flash-blink
  breadsFarAndNearDiv.children[1].classList.add("flashBlinkingBread");
  // Play grabbing the bread webp
  setTimeout(function () {
    breadsFarAndNearDiv.children[0].style.visibility = "hidden"; // Don't use display none because position relative needs the occupied space
    breadsFarAndNearDiv.children[1].style.visibility = "hidden"; // Don't use display none because position relative needs the occupied space
    breadsFarAndNearDiv.children[2].style.display = "block";
    breadsFarAndNearDiv.children[2].classList.add("getExtraLarge"); // getExtraLarge
  },1250);
  // Sounds
  setTimeout(function () {  if (canVibrate) { navigator.vibrate([15,150,50]); }  },350);
  setTimeout(function () { winSound1.play(); },500);
  setTimeout(function () { gainNode.disconnect(audioCtx.destination); sineWaveIsAudibleNow = false; },2010);
  // Separate foreground from background with a drop-shadow
  setTimeout(function () {
    breadsFarAndNearDiv.classList.add("breadHeldInHandsDropShadow");
  }, 600);
  // Cursor
  if (deviceDetector.device == "desktop") {
    setTimeout(function () { main.classList.remove("noCursor"); main.classList.add("defaultCursor"); },1500); // Bring cursor back,,, make it visible again
  } else {

  }
  // Pictogram happy eyes
  setTimeout(function () {
    pictogramDiv.children[1].style.display = "none"; // state b
    pictogramDiv.children[2].style.display = "none"; // state c
    pictogramDiv.children[3].style.display = "none"; // speech bubble (hand + bread)
    pictogramDiv.children[4].style.display = "none"; // speech bubble (arrow + bread)
    pictogramDiv.children[0].style.display = "block"; // state a
    // Either reset "eyes" if were looking away
    movingEyesDiv.style.left = "0%"; movingEyesDiv.style.top = "0%"; // Look at the camera
    setTimeout(function () {
      movingEyesDiv.children[0].style.display = "none"; movingEyesDiv.children[1].style.display = "block"; // big happy eyes
    }, 200);
  },100);

  let changeTime;  switch (parent.speedAdjustmentSetting) {  case "slow": changeTime = 6000; break;  case "fast": changeTime = 3000; break;  default: changeTime = 4500;  }
  // Pictogram normal eyes
  setTimeout(function () {
    movingEyesDiv.children[1].style.display = "none";
    movingEyesDiv.children[0].style.display = "block"; // back to natural blinking eyes
  },changeTime+500);

  // Show pacman
  setTimeout(function () {
    pictogramDiv.children[5].classList.add("fadeIn"); to14 = setTimeout(function(){ pictogramDiv.children[5].classList.remove("fadeIn"); },601); // Speech bubble 3 appears
    pictogramDiv.children[5].style.display = "block"; // speech bubble PACMAN eating
    startTalkingAgain();
    startTheGameB();
    injectTextIntoTheHelpBoxP.innerHTML = explanationB;
  },1500+changeTime);

  // setInterval doesn't work for updating changeTime because timeouts get set only once when startTalkingAgain() fires
  let lapNumberOfLoop = 1;
  function startTalkingAgain() {
    if (lapNumberOfLoop>3) {    return;   } // Stop talking after 3 laps
    switch (parent.speedAdjustmentSetting) {  case "slow": changeTime = 6000; break;  case "fast": changeTime = 3000; break;  default: changeTime = 4500;  } // In case desktop user moves the slider to adjust speed setting
    to15 = setTimeout(function () { say5.play(); },1000); // Eat
    to16 = setTimeout(function () { say6.play(); },1000+changeTime); // Eat bread
    if (lapNumberOfLoop == 1) { // First lap
      to19 = setTimeout(function () { showHowToBite(); },1500+changeTime*1.5); // Show how to play BITE game » About 9s
      to17 = setTimeout(function () { say7.play(); },6000+changeTime*2); // Eat (slow)
      to18 = setTimeout(function () { say8.play(); },6000+changeTime*3); // Eat bread (slow)
      to20 = setTimeout(function () { startTalkingAgain(); },6000+changeTime*4); // and restart
    } else if(lapNumberOfLoop == 2) { // Second lap
      to19 = setTimeout(function () { showHowToBite(); },1000+changeTime*1.5); // Show how to play BITE game » About 9s
      to17 = setTimeout(function () { say7.play(); },1000+changeTime*2); // Eat (slow)
      to18 = setTimeout(function () { say8.play(); },1000+changeTime*3); // Eat bread (slow)
      to20 = setTimeout(function () { startTalkingAgain(); },1000+changeTime*4); // Restart
    } else { // Third (final) lap
      to19 = setTimeout(function () { showHowToBite(); },1000+changeTime*1.5); // Show how to play BITE game » About 9s
      to17 = setTimeout(function () { say7.play(); },1000+changeTime*2); // Eat (slow)
      to18 = setTimeout(function () { say8.play(); },1000+changeTime*3); // Eat bread (slow)
      to20 = setTimeout(function () { startTalkingAgain(); },1000+changeTime*4); // Restart
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
          setTimeout(function () {
            pinchInstruction.classList.add("itDisappears"); //1500 ms
            setTimeout(function () { document.body.removeChild(pinchInstruction); pinchInstruction.classList.remove("itDisappears"); resetWebp(pinchInstruction); }, 1501);
          }, showTime+2400); // Just in case we decide that speedAdjustmentSetting should be available in mobile too (wrt possibility in the future)
      }
    } else { // DESKTOP - DESKTOP - DESKTOP
      if (noBiteAttemptHasHappenedSoFar) {
        document.body.appendChild(keyboardInstructionPart1); // 10x50ms = 500ms fade in
        clearIfInstructionShouldNotBeSeen = setTimeout(function () {
          if (document.body.contains(keyboardInstructionPart1)) {
            document.body.removeChild(keyboardInstructionPart1); resetWebp(keyboardInstructionPart1);
            document.body.appendChild(keyboardInstructionPart2); // 400+400+400+400+ 8*250 + 999999 = 3600(animation) + stay + fade(1500)
          }
          setTimeout(function () {
            if (document.body.contains(keyboardInstructionPart2)) {
              keyboardInstructionPart2.classList.add("itDisappears"); //1500 ms
              setTimeout(function () { document.body.removeChild(keyboardInstructionPart2); keyboardInstructionPart2.classList.remove("itDisappears"); resetWebp(keyboardInstructionPart2); }, 1501);
            }
          }, showTime+4000); // ARROW KEYS WEBP starts fading to nothingness in 1800+4000 = 5800,,, 5800-3600 = 2200 last frame stay time at normal speed
        }, showTime); // From whole keyboard webp to ARROW KEYS WEBP
      }
    }
  }

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
////let isKeyboardGameRunning = false;
function activateInteractionDESKTOP() {
  // Get ready to detect if keyboard is active(usable) or not
  ////isKeyboardGameRunning = true;
  window.addEventListener("blur",frameIsBlurred);
  window.addEventListener("focus",frameIsFocused);
  parent.window.addEventListener("blur",parentIsBlurred);
  parent.window.addEventListener("focus",parentIsFocused);
  // CAREFUL: keyboard must be listened at both parent and frame level! So we cannot use {once:true} method to avoid turbo firing when key is held down
  parent.window.addEventListener("keydown",aKeyWasPressed);
  window.addEventListener("keydown",aKeyWasPressed);
  parent.window.addEventListener("keyup",aKeyWasReleased);
  window.addEventListener("keyup",aKeyWasReleased);
  let countDownUntilCursorReappear;
  function aKeyWasPressed(event) { // event.key respects OS keyboard type settings ,,, event.code ignores OS and returns QWERTY
    if (!downArrowIsAlreadyPressed) {
      if (event.key == "ArrowDown" || event.code == "ArrowDown") {

        main.classList.remove("defaultCursor"); main.classList.add("noCursor"); // Hide the cursor
        if (countDownUntilCursorReappear) { clearTimeout(countDownUntilCursorReappear); } // Reset timer
        countDownUntilCursorReappear = setTimeout(function () { main.classList.remove("noCursor");  main.classList.add("defaultCursor"); }, 4000);
        noBiteAttemptHasHappenedSoFar = false;

        ////if (noBiteAttemptHasHappenedSoFar) {
        ////  desktopUserAlreadyKnowsHowToBite = true; console.log("cancel keyboard instruction");
        ////   // So that this if block will execute only once
        ////}

        if (clearIfInstructionShouldNotBeSeen) { clearTimeout(clearIfInstructionShouldNotBeSeen); }
        if (document.body.contains(keyboardInstructionPart1)) { document.body.removeChild(keyboardInstructionPart1); }
        if (document.body.contains(keyboardInstructionPart2)) { document.body.removeChild(keyboardInstructionPart2); }

        bitingSound0.play();
        downArrowIsAlreadyPressed = true;
        countDownToValidifyTheBite = setTimeout(function () {
          countBitesAndMakeProgress();
        }, 111); // It takes 0.1s to complete teethContainer transition top in css
        letTheTeethSinkIntoBread();

      }
    }
  }
  function aKeyWasReleased(event) {
    if (downArrowIsAlreadyPressed) {
      if (event.key == "ArrowDown" || event.code == "ArrowDown") {
        downArrowIsAlreadyPressed = false;
        clearTimeout(countDownToValidifyTheBite);
        reopenTheMouth();
        if (win2HasHappened) {
          removeKeyboardListeners();
          // Remove teeth against the possibility of window resize firing (which makes them show)
          setTimeout(function () { upperTeeth.parentNode.removeChild(upperTeeth); lowerTeeth.parentNode.removeChild(lowerTeeth); }, 1000);
          setTimeout(function () { finalSuccessSound.play(); finalEyeBlink(); }, 800); // See fastBiteSlowBiteToggle 750ms
        }
      }
    }
  }
  function removeKeyboardListeners() {
    parent.window.removeEventListener("keydown",aKeyWasPressed);
    window.removeEventListener("keydown",aKeyWasPressed);
    parent.window.removeEventListener("keyup",aKeyWasReleased);
    window.removeEventListener("keyup",aKeyWasReleased);
  }

  function frameIsBlurred() {   isFrameBlurred = true;   checkBothBlurs();  }
  function frameIsFocused() {   isFrameBlurred = false;  checkBothBlurs();  }
  function parentIsBlurred() {  isParentBlurred = true;  checkBothBlurs();  }
  function parentIsFocused() {  isParentBlurred = false; checkBothBlurs();  }
  function checkBothBlurs() {
    if (!win2HasHappened) {
      setTimeout(function () {
        if (isParentBlurred && isFrameBlurred) { // grey out if both are blurred
          main.classList.remove("colorBack"); main.classList.add("grayAway"); // css_for_every_single_html
          parent.containerDivOfTheNavigationMenu.classList.remove("colorBack"); parent.containerDivOfTheNavigationMenu.classList.add("grayAway");
          main.classList.remove("noCursor");  main.classList.add("defaultCursor");
        } else { // color back in all other cases
          main.classList.remove("grayAway");  main.classList.add("colorBack"); // css_for_every_single_html
          parent.containerDivOfTheNavigationMenu.classList.remove("grayAway"); parent.containerDivOfTheNavigationMenu.classList.add("colorBack");
          ////if (noBiteAttemptHasHappenedSoFar) {
          ////  // Don't hide the cursor
          ////} else { // Wait! we must let it be visible until keyboard is used again
          ////  setTimeout(function () { main.classList.remove("defaultCursor"); main.classList.add("noCursor"); }, 500);
          ////}
        }
      }, 30);
    }
  }

} // END OF activateInteractionDESKTOP


//--- MOBILE ---
let initialDistance = 0; let newDistance = 0; let movement = 0;
let biteThresholdIsPassed = false;
function activateInteractionMOBILE() {
  /* Use stopPropagation to block touchlistener on window element which triggers the sliding nav menu
  document.body.addEventListener("touchstart",preventTouchConflict); // Would it better to listen on parent.window???
  function preventTouchConflict() { // Works 90% of the time  »  WHY?
    //parent.preventTouchConflictWithTheSlidingNavMenu(document.body); // Exists in js_for_the_sliding_navigation_menu
  }*/
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
        pinchInstruction.style.display = "none"; // Don't use removeChild here because there is a removeChild inside setTimeout already and it will fire shortly
      }
      // To full bite
      letTheTeethSinkIntoBread();
      setTimeout(function () {
        // play completeBite1 completeBite2 completeBite3
        // console.log("WELL BIT");
        countBitesAndMakeProgress();
      }, 111); // It takes 0.1s to complete teethContainer transition top in css

      setTimeout(function () {
        reopenTheMouth(); // 2-After 500ms or so, slowly open the mouth » takes 0.75s in css
        setTimeout(function () {
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
    setTimeout(function () { bitingSound1.play(); }, 30); // Fine-tune the timing
    if (canVibrate) { navigator.vibrate([10,50,40,100,20,150,12,200,8]); }
    // stop all audio inside startTalkingAgain
    clearTimeout(to15); clearTimeout(to16); clearTimeout(to17); clearTimeout(to18); clearTimeout(to19); clearTimeout(to20);
    injectTextIntoTheHelpBoxP.innerHTML = "…"; // Remove text from translation helpbox|subtitles
  } else if (howManyBitesNow == 1) {
    breadsFarAndNearDiv.children[3].style.visibility = "hidden";
    breadsFarAndNearDiv.children[4].style.display = "block";
    setTimeout(function () { bitingSound2.play(); }, 30); // Fine-tune the timing
    if (canVibrate) { navigator.vibrate([10,50,40,100,20,150,12,200,8]); }
  } else if (howManyBitesNow == 2) {
    breadsFarAndNearDiv.children[4].style.visibility = "hidden";
    breadsFarAndNearDiv.children[5].style.display = "block"; // Three bite marks on bread
    setTimeout(function () { bitingSound3.play(); }, 30); // Fine-tune the timing
    if (canVibrate) { navigator.vibrate([10,50,40,100,20,150,13,200,11,250,9,300,7]); }
    // WIN
    win2HasHappened = true; // So that we can remove keyboard listeners via aKeyWasReleased
    if (deviceDetector.isMobile) {
      setTimeout(function () { upperTeeth.parentNode.removeChild(upperTeeth); lowerTeeth.parentNode.removeChild(lowerTeeth); }, 1500);
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

  if (lastRecordedWidth >= lastRecordedHeight) { // LANDSCAPE - Use calc to get as accurate and nice as possible
    ////const moveThisMuch = (lastRecordedWidth - lastRecordedHeight)*2/lastRecordedHeight;
    //console.log(goodNumberInVhOrVmins);
    upperTeeth.style.top = "calc(0vh - "+(37-goodNumberInVhOrVmins/4).toFixed(1)+"vmin)";
    lowerTeeth.style.top = "calc(100vh - "+(37-goodNumberInVhOrVmins/4).toFixed(1)+"vmin)";
  } else { // PORTRAIT - Use calc to try and get a bit more accurate
    ////const moveThisMuch = 0;//(lastRecordedHeight - lastRecordedWidth)/lastRecordedWidth;
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
    setTimeout(function () {
      upperTeeth.style.transform = "translateY(-7vmin)";
      lowerTeeth.style.transform = "translateY(-7vmin)";
    }, 200);
    setTimeout(function () {
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
    setTimeout(function () {
      movingEyesDiv.children[2].style.display = "none"; movingEyesDiv.children[1].style.display = "block"; // To big happy eyes
      setTimeout(function () {
        movingEyesDiv.children[1].style.display = "none"; movingEyesDiv.children[2].style.display = "block"; // To asian smiling eyes
        setTimeout(function () {
          movingEyesDiv.children[2].style.display = "none"; movingEyesDiv.children[1].style.display = "block"; // To big happy eyes
        }, 250); // Stay closed
      }, 600); // Stay open
    }, 1700); // Stay closed before open
}

function whenWin2happens() {

  if (deviceDetector.isMobile) {
    setTimeout(function () { finalSuccessSound.play(); finalEyeBlink(); }, 1500); // Sync with vibration
  } else {
    // On desktops we must wait for keyup before playing finalSuccessSound » See aKeyWasReleased
    setTimeout(function () { main.classList.remove("noCursor"); main.classList.add("defaultCursor"); },3000); // Unhide cursor once again
  }

  pictogramDiv.children[5].classList.add("fadeOut"); // speech bubble disappears
  setTimeout(function(){ pictogramDiv.children[5].style.display = "none"; },601);

  let endTime;
  switch (parent.speedAdjustmentSetting) { case "slow": endTime = 9500; break;    case "fast": endTime = 4500; break;    default: endTime = 7000; }
  setTimeout(function () {
    showPreloaderBeforeExit(); // 1500ms » See js_for_all_iframed_lesson_htmls AND See css_for_preloader_and_orbiting_circles
    if (localStorage.breadBakedByAuthorNoticeHasBeenDisplayedAlready) {
      setTimeout(function () {   parent.ayFreym.src = "/lessons_in_iframes/level_1/unit_2/lesson_1/index.html";   }, 1500);
    } else {
      setTimeout(function () {   parent.ayFreym.src = "/lessons_in_iframes/level_1/unit_1/notice_0/index.html";   }, 1500);
    }
  }, endTime);
  /* Save progress */
  parent.savedProgress[studiedLang].lesson_TAKEBREAD_IsCompleted=true; // WATCH THE NAME OF THE LESSON!!!
  parent.saveJSON = JSON.stringify(parent.savedProgress); // Convert
  localStorage.setItem("memoryCard", parent.saveJSON); // Save

}
