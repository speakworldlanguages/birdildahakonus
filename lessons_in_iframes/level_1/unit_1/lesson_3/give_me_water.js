/* This js file must be DEFERRED in order to be able to use const outside DOMContentLoaded */

/* __ SAVE PROGRESS TO LOCAL STORAGE __ */
// See js_for_every_single_html to find savedProgress saveJSON loadJSON
// See js_for_all_container_parent_htmls to find how savedProgress.ja savedProgress.zh savedProgress.tr savedProgress.ar savedProgress.en are created
const studiedLang = parent.theLanguageUserIsLearningNowToSetFilePaths;
// !!! VERY CAREFUL: Watch the lesson name!!!
savedProgress[studiedLang].lesson_GIVEMEWATER_IsViewed=true; // Create and add... or overwrite the same thing
saveJSON = JSON.stringify(savedProgress); // Convert
localStorage.setItem("memoryCard", saveJSON); // Save

/* __ TEXT TO BE INJECTED INTO EXPLANATION BOX __ */
const explanationPathA = "../../../../user_interface/text/"+userInterfaceLanguage+"/1-1-3a.txt"; // The translation of what is being said, to be put into the helpbox/subtitles.
const explanationPathB = "../../../../user_interface/text/"+userInterfaceLanguage+"/1-1-3b.txt"; // The translation of what is being said, to be put into the helpbox/subtitles.
let explanationA = "No internet connection?"; // Warning: Returns UNDEFINED before fetch() actually gets the file.
let explanationB = "No internet connection?"; // Warning: Returns UNDEFINED before fetch() actually gets the file.
fetch(explanationPathA,myHeaders).then(function(response){return response.text();}).then(function(contentOfTheTxtFile){ explanationA = contentOfTheTxtFile; });
fetch(explanationPathB,myHeaders).then(function(response){return response.text();}).then(function(contentOfTheTxtFile){ explanationB = contentOfTheTxtFile; });
/* __ TEXT TO BE INJECTED INTO iOS ALLOW deviceorientation BUTTON __ */
const getPermissionPath = "../../../../user_interface/text/"+userInterfaceLanguage+"/0-you_must_touch_click_allow.txt";
const ifNoPermissionPath = "../../../../user_interface/text/"+userInterfaceLanguage+"/0-you_didnt_touch_click_allow.txt";
let getPermission = "No internet connection?";
let ifNoPermission = "No internet connection?";
fetch(getPermissionPath,myHeaders).then(function(response){return response.text();}).then(function(contentOfTheTxtFile){ getPermission = contentOfTheTxtFile; });
fetch(ifNoPermissionPath,myHeaders).then(function(response){return response.text();}).then(function(contentOfTheTxtFile){ ifNoPermission = contentOfTheTxtFile; });

/* ___AUDIO ELEMENTS___ */ //...Sound player (Howler) exists in the parent html. So the path must be relative to the parent html. Not to the framed html.
const say1Path = "audio_files_for_listening/"+parent.theLanguageUserIsLearningNowToSetFilePaths+"/level_1/unit_1/lesson_3/give_me_water_1."+parent.audioFileExtension;
const say2Path = "audio_files_for_listening/"+parent.theLanguageUserIsLearningNowToSetFilePaths+"/level_1/unit_1/lesson_3/give_me_water_2."+parent.audioFileExtension;
const say3Path = "audio_files_for_listening/"+parent.theLanguageUserIsLearningNowToSetFilePaths+"/level_1/unit_1/lesson_3/give_me_water_3."+parent.audioFileExtension;
const say4Path = "audio_files_for_listening/"+parent.theLanguageUserIsLearningNowToSetFilePaths+"/level_1/unit_1/lesson_3/give_me_water_4."+parent.audioFileExtension;
const say5Path = "audio_files_for_listening/"+parent.theLanguageUserIsLearningNowToSetFilePaths+"/level_1/unit_1/lesson_3/thank_you."+parent.audioFileExtension;

if (parent.theLanguageUserIsLearningNowToSetFilePaths=="ar" && parent.genderOfTheUser=="female") {
  say1Path = say1Path.split(".")[0] + "_female."+parent.audioFileExtension;
  say2Path = say2Path.split(".")[0] + "_female."+parent.audioFileExtension;
  say3Path = say3Path.split(".")[0] + "_female."+parent.audioFileExtension;
  say4Path = say4Path.split(".")[0] + "_female."+parent.audioFileExtension;
  say5Path = say5Path.split(".")[0] + "_female."+parent.audioFileExtension; // Shukran lak-a lak-e
}
let saySlow = false;
const say1 = new parent.Howl({  src: [say1Path]  });
const say2 = new parent.Howl({  src: [say2Path]  });
const say3 = new parent.Howl({  src: [say3Path]  });
const say4 = new parent.Howl({  src: [say4Path]  });
const say5 = new parent.Howl({  src: [say5Path]  });

const winSound = new parent.Howl({  src: ['lessons_in_iframes/level_1/unit_1/lesson_3/he_gets_the_water.'+parent.audioFileExtension]  });
const glassBreak = new parent.Howl({  src: ['lessons_in_iframes/level_1/unit_1/lesson_3/glass_breaks_into_pieces.'+parent.audioFileExtension]  });

const notificationSoundAboutControllerDevice = new parent.Howl({  src: ['user_interface/sounds/notification2_appear.'+parent.audioFileExtension]  });
const notificationSoundCloseControlDevice = new parent.Howl({  src: ['user_interface/sounds/notification2_close.'+parent.audioFileExtension]  });
/* Sounds exist on the parent. So they will NOT UNLOAD when iframe src is changed. We must manually unload them before exiting. */
function unloadTheSoundsOfThisLesson() { // Either call this as the last thing before leaving or let it be called by window.onbeforeunload in js_for_all_iframed_lesson_htmls
  notificationSoundCloseControlDevice.unload();
  notificationSoundAboutControllerDevice.unload();
  glassBreak.unload();
  winSound.unload();
  say5.unload();  say4.unload();  say3.unload();  say2.unload();  say1.unload();
}

/* ___GET DIV ELEMENTS (main included)___ */
const chooseInputDiv = document.getElementById("chooseInputDeviceDESKTOPDivID"); // WARNING: This will be undefined on mobiles
let showTouchControlsDiv;
if (deviceDetector.device == "tablet") {
  showTouchControlsDiv = document.getElementById("showHowToUseTouchAndTiltTABLETDivID"); // WARNING: This will be undefined unless user is on a tablet
} else if (deviceDetector.device == "phone") {
  showTouchControlsDiv = document.getElementById("showHowToUseTouchAndTiltPHONEDivID"); // WARNING: This will be undefined unless user is on a tablet
}
let iOSUserTouchAndAllow;
if (parent.detectedOS.name == "iOS") {
  iOSUserTouchAndAllow = document.getElementById('iOSpermissionButtonDivID');
}

const pictogramDiv1 = document.getElementById("pictogram1DivID");
const movingEyesDiv1 = document.getElementById("movingEyes1DivID");
const pictogramDiv2 = document.getElementById("pictogram2DivID");
const movingEyesDiv2 = document.getElementById("movingEyes2DivID");
const tableDiv = document.getElementById("tableDivID");
const clickableArea = document.getElementById("clickableAreaDivID");
const main = document.getElementById("mainID");
const theGround = document.getElementById("theGroundDivID");
const theMovingTrayOnHandDiv = document.getElementById("trayOnHandDivID");
const glassThatCanFallDiv = document.getElementById("glassOuterContainerDivID");
const glassThatCanSlideDiv = document.getElementById("glassMiddleContainerDivID");
const glassThatCanRotateDiv = document.getElementById("glassInnerContainerDivID");
/* ___GET IMG ELEMENTS___ */
const imgChooseInput = document.getElementById("gamepadOrMouseImgID");
const imgGamepad = document.getElementById("chooseGamepadImgID");
const imgMouse = document.getElementById("chooseMouseImgID");
const imgGlassBreakLeft  = document.createElement("IMG"); imgGlassBreakLeft.src = "breaking_glass_fallen_from_left.webp";
const imgGlassBreakRight  = document.createElement("IMG"); imgGlassBreakRight.src = "breaking_glass_fallen_from_right.webp";
const imgGlassBreakCenter  = document.createElement("IMG"); imgGlassBreakCenter.src = "breaking_glass_fallen_from_center.webp";
imgGlassBreakLeft.classList.add("breakingGlass");
imgGlassBreakRight.classList.add("breakingGlass");
imgGlassBreakCenter.classList.add("breakingGlass");

/*___VARIABLES FOR ALL___*/
/* Decrease difficulty little by little every time user fails during the first 5 tries */
let howManyTries;
if (sessionStorage.giveMeWaterTries) {
  howManyTries = Number(sessionStorage.giveMeWaterTries) + 1;
  if (howManyTries<6) {    sessionStorage.giveMeWaterTries = howManyTries.toString();   } // Don't get any easier after the 5th try.
} else {
  howManyTries = 1;
  sessionStorage.giveMeWaterTries = "1";
}

/*___FUNCTIONS FOR ALL___*/
function unblurAndGetReady() {
  pictogramDiv1.classList.add("unblurThingsLaterWithThis"); // See give_me_water.css
  tableDiv.classList.add("unblurThingsLaterWithThis"); // See give_me_water.css
  theMovingTrayOnHandDiv.classList.add("unblurThingsLaterWithThis"); // See give_me_water.css
  glassThatCanFallDiv.classList.add("unblurThingsLaterWithThis"); // See give_me_water.css
  theGround.classList.add("unblurThingsLaterWithThis"); // See give_me_water.css
  setTimeout(function () {
    pictogramDiv1.classList.remove("unblurThingsLaterWithThis","blurThingsAtStartWithThis");
    tableDiv.classList.remove("unblurThingsLaterWithThis","blurThingsAtStartWithThis");
    theMovingTrayOnHandDiv.classList.remove("unblurThingsLaterWithThis","blurThingsAtStartWithThis");
    glassThatCanFallDiv.classList.remove("unblurThingsLaterWithThis","blurThingsAtStartWithThis");
    theGround.classList.remove("unblurThingsLaterWithThis","blurThingsAtStartWithThis");
  },4501);
}

/* SET OFF */
// MAYBE: The [select your input device] should appear every single time on desktop when fail-and-refresh happens.
// BECAUSE: The user may want to try it with another device next time.
window.addEventListener('DOMContentLoaded', domContentLoadedFunction, { once: true });
function domContentLoadedFunction() {
  // Place code that should run before all imgs are ready
}

// ALWAYS: Use window load to be safe with timing
window.addEventListener('load', loadingIsCompleteFunction, { once: true });
function loadingIsCompleteFunction() {
  if (parent.theLanguageUserIsLearningNowToSetFilePaths == "ar") { // Display an info box about gender difference in Arabic.
    const pathOfNotificationAboutMaleFemaleCommand = "../../../../user_interface/text/"+userInterfaceLanguage+"/1-1-3_arabic_male_female.txt";
    fetch(pathOfNotificationAboutMaleFemaleCommand,myHeaders).then(function(response){return response.text();}).then(function(contentOfTheTxtFile){
      setTimeout(function(){ createAndHandleNotificationBox(); putNotificationTxtIntoThisP.innerHTML = contentOfTheTxtFile; },501); // See js_for_notification_or_such_boxes.js
      // createAndHandleNotificationBox will fire startTheLesson 1.5 seconds after its OK button is clicked/touched
    });
  }
  else {
    startTheLesson(); // This can also be called from within createAndHandleNotificationBox() in js_for_all_iframed_lesson_htmls.js
  }
}

function startTheLesson() {
  // User must listen to wavesurfer vocabulary box no matter what language he/she is studying
  const filePathOfTheAudioFile = "../../../../audio_files_for_listening/"+parent.theLanguageUserIsLearningNowToSetFilePaths+"/level_1/unit_1/lesson_3/give."+parent.audioFileExtension;
  const wavesurferP1P2Path = "../../../../user_interface/text/"+userInterfaceLanguage+"/1-1-3_vocabulary_p1_p2.txt";
  fetch(wavesurferP1P2Path,myHeaders).then(function(response){return response.text();}).then(function(contentOfTheTxtFile){  handleP1P2ActualText(contentOfTheTxtFile);  });
  // See js_for_notification_or_such_boxes » iframe-lesson level
  setTimeout(function(){    createAndHandleVocabularyBox(filePathOfTheAudioFile);    },501); // Wait for preloader to disappear or give a brief break after notification
}

function vocabluaryBoxIsClosed() { // Will fire from within createAndHandleVocabularyBox
  // Unblur
  unblurAndGetReady(); // 2500ms to complete focus
  if (sessionStorage.giveMeWaterTries == "2" || sessionStorage.giveMeWaterTries == "4" || sessionStorage.giveMeWaterTries == "5") {
    setTimeout(function(){    proceedDependingOnTheDevice();     },1500); // Try to make it less boring for those who fail
  } else {
    // Play pictogram
    playPictogramLoop();
  }
}

let thisIsTheFirstTimeOfPictogramLoop = true;
var pictogramMustStopLooping = false;
function playPictogramLoop() {
  let c = parent.speedAdjustmentCoefficient;
  let changeTime;  switch (c) {  case 0.0: changeTime = 2400; break;  case 2.0: changeTime = 1200; break;  default: changeTime = 1800;  }
  setTimeout(function(){
    movingEyesDiv1.style.left = "1.6vmin"; movingEyesDiv1.style.top = "0.3vmin";
    setTimeout(function(){
      pictogramDiv1.children[0].style.display = "none"; // a- Natural standing
      pictogramDiv1.children[1].style.display = "block"; // b0- Pointing hand 1 without movement
    },500); // Let the arm wait for the eyes
    setTimeout(function(){
      pictogramDiv1.children[1].style.display = "none"; // b0- Pointing hand 1 without movement
      pictogramDiv1.children[2].style.display = "block"; // b1- Pointing hand with movement loop 600ms
      setTimeout(function(){
        pictogramDiv1.children[2].style.display = "none"; // b1- Pointing hand with movement loop 600ms
        pictogramDiv1.children[3].style.display = "block"; // b2- Pointing hand 2 without movement
        setTimeout(function(){
          movingEyesDiv1.style.left = "0vmin"; movingEyesDiv1.style.top = "0vmin";
          setTimeout(function(){
            pictogramDiv1.children[3].style.display = "none"; // b2- Pointing hand 2 without movement
            pictogramDiv1.children[4].style.display = "block"; // c- Points to himself
            setTimeout(function(){
              pictogramDiv1.children[6].classList.add("fadeIn"); setTimeout(function(){  pictogramDiv1.children[6].classList.remove("fadeIn");  },601);
              pictogramDiv1.children[6].style.display = "block"; // speech bubble with water droplet
              setTimeout(talk1,1000);
              function talk1() {   if (saySlow) {  say3.play();  } else {  say1.play();  }   }
              injectTextIntoTheHelpBoxP.innerHTML = explanationA;
              setTimeout(function(){
                pictogramDiv1.children[6].style.display = "none"; // speech bubble with water droplet
                pictogramDiv1.children[7].style.display = "block"; // speech bubble with hand gesture give me
                setTimeout(talk2,1000);
                function talk2() {   if (saySlow) {  say4.play();  } else {  say2.play();  }   }
                setTimeout(function(){
                  pictogramDiv1.children[4].style.display = "none"; // c- Pointing to himself
                  pictogramDiv1.children[0].style.display = "block"; // a- Natural standing
                  setTimeout(function(){
                    pictogramDiv1.children[7].classList.add("fadeOut");
                    setTimeout(function(){
                      pictogramDiv1.children[7].classList.remove("fadeOut"); pictogramDiv1.children[7].style.display = "none";
                      saySlow = !saySlow; // Toggle between normal says and slow says
                      injectTextIntoTheHelpBoxP.innerHTML = " ";
                      if (!pictogramMustStopLooping) {
                        playPictogramLoop();
                      }
                      if (thisIsTheFirstTimeOfPictogramLoop) {
                        proceedDependingOnTheDevice();
                        thisIsTheFirstTimeOfPictogramLoop = false;
                      }
                    },601); // back to start
                  },((changeTime*2)+1600)); // speech bubble disappears
                },(changeTime+1000)); // to idle stance while hands-give-me plays
              },(changeTime+3300)); // from droplet to hands-give-me
            },(changeTime/2)); // droplet in bubble appears
          },350); // Let the arm wait for the eyes
        },(changeTime+100));  // From pointing 2 to pointing to the self
      },(changeTime-100)); // From pointing loop to pointing 2
    },(changeTime+100)); // From pointing 1 to pointing loop
  },(changeTime+500)); // From idle-stand to pointing 1
}

function proceedDependingOnTheDevice() {
  if (deviceDetector.isMobile) {
    // Check iOS as users must allow "Access Motion and Orientation" // USE: parent.detectedOS.name == "iOS"
    if (parent.detectedOS.name == "iOS") {
      // Check localStorage to see if the permission issue is already solved
      if (localStorage.iOSpermissionThingIsSolved != "yes") {
        const theButtonReads = document.getElementById('theTextInsidePermissionButtonPID');
        theButtonReads.innerHTML = getPermission; // Inject from txt file
        /**/
        main.classList.add("darkenEverythingInMain"); // See give_me_water.css
        setTimeout(function(){       iOSUserTouchAndAllow.classList.add("marginTopZero");       },800); // 1s. See give_me_water.css
        // handle as explained at https://dev.to/li/how-to-requestpermission-for-devicemotion-and-deviceorientation-events-in-ios-13-46g2
        // also https://developer.apple.com/forums/thread/128376
        iOSUserTouchAndAllow.addEventListener("touchend",iOSPermissionHandling,{once:true});
        function iOSPermissionHandling() {
          if (typeof DeviceOrientationEvent.requestPermission === 'function') {
            DeviceOrientationEvent.requestPermission().then(permissionState => {
                if (permissionState === 'granted') {
                  iOSUserTouchAndAllow.classList.remove("marginTopZero");
                  setTimeout(function(){  iOSUserTouchAndAllow.parentNode.removeChild(iOSUserTouchAndAllow);  },1001);
                  setTimeout(function(){  main.classList.remove("darkenEverythingInMain"); main.classList.add("undarkenEverythingInMain");  },250); // See give_me_water.css
                  setTimeout(function(){  withOrWithoutPermission();  },1002);
                  localStorage.iOSpermissionThingIsSolved = "yes";
                } else {
                  iOSUserTouchAndAllow.classList.remove("marginTopZero");
                  setTimeout(function(){  main.classList.remove("darkenEverythingInMain"); main.classList.add("undarkenEverythingInMain");  },250); // See give_me_water.css
                  setTimeout(function(){        alert(ifNoPermission);         },1003);
                }
              })
              .catch(console.error);
          }
        } // END OF function definition iOSPermissionHandling
      } // Do nothing if localStorage.iOSpermissionThingIsSolved is "yes"
    } else { // Goodness in Android: No need to get permission on regular non iOS 13+ devices
      withOrWithoutPermission();
    }
    function withOrWithoutPermission() {
      notificationSoundAboutControllerDevice.play();
      showTouchControlsDiv.classList.add("toNormalOpacityAndScale");
      /**/
      const url = "../../../../js_reusables/tilt-to-steer.js";
      const script = document.createElement('script');
      script.async = true;
      script.onload = () => getReadyToPlayTheGameOnMobileF();
      script.onerror = () => tiltToSteerJsCouldNotBeLoaded(); // Improve later if can
      script.src = url;
      document.head.appendChild(script);
    }
  } else { // Desktops
    hideCursorPermanently(); // See js_for_disappearing_custom_cursor.js
    notificationSoundAboutControllerDevice.play();
    chooseInputDiv.classList.add("toNormalOpacityAndScale");
    getReadyToPlayTheGameOnDesktopF();
  }
}
/*__TOUCHSCREEN__*/
let leftIsTouching = false; let rightIsTouching = false;
let beginTouchLY,beginTouchRY,moveTouchLY,moveTouchRY;
var finalLeftY=0; var finalRightY=0;
let dLeft=0; let dRight=0;
const leftHalf = document.createElement("DIV");
const rightHalf = document.createElement("DIV");
function tiltToSteerJsCouldNotBeLoaded() {  alert("Connection problem!");  } // Improve later if can
function getReadyToPlayTheGameOnMobileF() {

  leftHalf.classList.add("leftThumbTouchArea"); document.body.appendChild(leftHalf);
  rightHalf.classList.add("rightThumbTouchArea"); document.body.appendChild(rightHalf);
  leftHalf.addEventListener("touchstart", leftThumbStartsContactF);
  rightHalf.addEventListener("touchstart", rightThumbStartsContactF);
  /* THESE MUST NOT CREATE CONFLICT WITH THE NAV MENU SWIPE UP-DOWN */ // Find: parent.swipeMenuIsDisabled = true;
  function leftThumbStartsContactF(e) {    e.preventDefault(); leftIsTouching = true;
    beginTouchLY = event.targetTouches[0].clientY; dLeft=0;
    finalLeftY = beginTouchLY;
    leftHalf.addEventListener("touchmove", leftThumbIsMovingF);
    function leftThumbIsMovingF(e) {   e.preventDefault();
      moveTouchLY = event.targetTouches[0].clientY;
      finalLeftY = moveTouchLY;
      dLeft = moveTouchLY - beginTouchLY;
    }
    leftHalf.addEventListener("touchend", leftThumbIsReleasedF, { once: true });
    function leftThumbIsReleasedF(e) {   e.preventDefault();   leftHalf.removeEventListener("touchmove", leftThumbIsMovingF); leftIsTouching = false; }
  }
  function rightThumbStartsContactF(e) {    e.preventDefault(); rightIsTouching = true;
    beginTouchRY = event.targetTouches[0].clientY; dRight=0;
    finalRightY = beginTouchRY;
    rightHalf.addEventListener("touchmove", rightThumbIsMovingF);
    function rightThumbIsMovingF(e) {   e.preventDefault();
      moveTouchRY = event.targetTouches[0].clientY;
      finalRightY = moveTouchRY;
      dRight = moveTouchRY - beginTouchRY;
    }
    rightHalf.addEventListener("touchend", rightThumbIsReleasedF, { once: true });
    function rightThumbIsReleasedF(e) {   e.preventDefault();   rightHalf.removeEventListener("touchmove", rightThumbIsMovingF); rightIsTouching = false; }
  }

  leftHalf.addEventListener("touchstart", detectIfBothThumbsAreTouching1);
  rightHalf.addEventListener("touchstart", detectIfBothThumbsAreTouching1);
  function detectIfBothThumbsAreTouching1() {    //e.preventDefault(); // Necessary???
    if (leftIsTouching&&rightIsTouching) {
        parent.swipeMenuIsDisabled = true; // CAREFUL: Don't forget to enable it at the end of the game once the conflict is over !!! !!! !!!
        // REMEMBER: Must re-enable swipe menu when either "lose" or "win" happens (not only one but both cases)
        notificationSoundCloseControlDevice.play();
        showTouchControlsDiv.children[0].style.display = "none";
        showTouchControlsDiv.children[1].style.display = "block";
        if (sessionStorage.selectedInputDevice == "touchscreen") {
          showTouchControlsDiv.children[1].classList.add("hideTiltInstructionQuick");
        } else {
          showTouchControlsDiv.children[1].classList.add("hideTiltInstructionSlow");
          sessionStorage.selectedInputDevice = "touchscreen";
        }
        switchFromTalkingManToWatchingMan();
        leftHalf.removeEventListener("touchstart", detectIfBothThumbsAreTouching1);
        rightHalf.removeEventListener("touchstart", detectIfBothThumbsAreTouching1);
        // Give user some time to figure out tilt controls
        setTimeout(startTheGameWithTabletOrPhone,3500);
    }
  }
}
/*__GAMEPAD_OR_MOUSE__*/
function getReadyToPlayTheGameOnDesktopF() {
  // Choose gamepad or mouse to play the game.
  window.addEventListener("mouseup", userHasChosenMouse, { once: true });
  function userHasChosenMouse() {
    imgChooseInput.style.display = "none"; imgMouse.style.display = "block"; notificationSoundCloseControlDevice.play();
    switchFromTalkingManToWatchingMan();
    if (sessionStorage.selectedInputDevice == "mouse") { // User has already tried and failed with mouse
      imgMouse.classList.add("addThisToHideTheSelectedDeviceQuick");
      setTimeout(function () {  chooseInputDiv.parentNode.removeChild(chooseInputDiv);  },1001);
      setTimeout(function () {  startTheGameWithTheMouse();  },1111);
    } else {                                             // User is going to play for the first time with mouse
      setTimeout(function () {  imgMouse.classList.add("addThisToHideTheSelectedDeviceSlow");  },1000); // 1000+2500 = 3500
      setTimeout(function () {  chooseInputDiv.parentNode.removeChild(chooseInputDiv);  },3501);
      setTimeout(function () {  startTheGameWithTheMouse();  },3333);
    }
    window.removeEventListener("gamepadconnected", userHasChosenGamepad); // Remove unnecessary listeners
    window.removeEventListener("gamepaddisconnected", gamepadIsGoneF); // Remove unnecessary listeners
    sessionStorage.selectedInputDevice = "mouse";
  }
  window.addEventListener("gamepadconnected", userHasChosenGamepad, { once: true });
  function userHasChosenGamepad() {
    imgChooseInput.style.display = "none"; imgGamepad.style.display = "block"; notificationSoundCloseControlDevice.play();
    switchFromTalkingManToWatchingMan();
    if (sessionStorage.selectedInputDevice == "gamepad") { // User has already tried and failed with gamepad
      imgGamepad.classList.add("addThisToHideTheSelectedDeviceQuick"); // webp animation duration 4819 ms
      setTimeout(function () {  chooseInputDiv.parentNode.removeChild(chooseInputDiv);  },5005); // css animation takes 5s
      setTimeout(function () {  startTheGameWithTheGamepad();  },3000);
    } else {                                               // User is going to play for the first time with gamepad
      imgGamepad.classList.add("addThisToHideTheSelectedDeviceSlow");
      setTimeout(function () {  chooseInputDiv.parentNode.removeChild(chooseInputDiv);  },7007); // css animation takes 7s
      setTimeout(function () {  startTheGameWithTheGamepad();  },5000);
    }
    window.removeEventListener("mouseup", userHasChosenMouse); // Remove unnecessary listeners
    sessionStorage.selectedInputDevice = "gamepad";
  }
  window.addEventListener("gamepaddisconnected", gamepadIsGoneF, { once: true });
  function gamepadIsGoneF() { // Delete sessionStorage.selectedInputDevice
    sessionStorage.removeItem("selectedInputDevice");
    setTimeout(function () {        alert("⚠ 🎮 🔃 ❔");   location.reload();    },1500);
    // RATHER NOT: let answer = confirm("⚠ 🎮 ❔ 🔃\n↺\n↻");  if (answer == true) {  location.reload();  }
  }
}

/*___PROGRESS HANDLING FUNCTIONS___*/
function switchFromTalkingManToWatchingMan() {
  say1.fade(1,0,888); say2.fade(1,0,888); say3.fade(1,0,888); say4.fade(1,0,888);
  pictogramMustStopLooping=true;
  injectTextIntoTheHelpBoxP.innerHTML = " ";
  pictogramDiv1.parentNode.removeChild(pictogramDiv1);
  pictogramDiv2.style.display = "block";
  setTimeout(makeTheEyesLookAtTheGlass,2222);
}

function makeTheEyesLookAtTheGlass() {
  movingEyesDiv2.style.left = "1.6"+"vmin";
  movingEyesDiv2.style.top = "0.3"+"vmin";
  setTimeout(function(){ movingEyesDiv2.classList.remove("delayedEyeMovement"); },500);
}

function whenWinHappens() {
  winSound.play();
  if (canVibrate) {   navigator.vibrate([20,50,20,50,20]);    }
  //setTimeout(function () { say5.play(); injectTextIntoTheHelpBoxP.innerHTML = explanationB; },2000);
  setTimeout(function () {  parent.ayFreym.src = 'lessons_in_iframes/we_are_working_for_new_levels';  },5000);
}
