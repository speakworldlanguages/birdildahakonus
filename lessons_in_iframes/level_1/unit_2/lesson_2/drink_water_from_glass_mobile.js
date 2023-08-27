"use strict";
// Code written by Manheart Earthman=B. A. Bilgekılınç Topraksoy=土本 智一勇夫剛志
// UNAUTHORIZED MODIFICATION IS PROHIBITED: You may not change this file without obtaining permission

// Screen orientation will be locked on Android by the time showHowToPlayOnMobile() fires
// But that is not the case with iOS as of 2022
// So if iOS user changes the screen orientation the game must either end or must switch to being played by another method
// The last option is to hope that the user will switch back to the orientation where the game started
let hideInstructionTimeout = null;
function hideTabletInstruction() {  showHowTablet.classList.remove("appearQuickly"); showHowTablet.classList.add("disappearSlowly"); hideInstructionTimeout = null; }
function hidePhoneInstruction() {  showHowPhone.classList.remove("appearQuickly"); showHowPhone.classList.add("disappearSlowly"); hideInstructionTimeout = null; }
//---
function showHowToPlayOnMobile(deviceorientationDidNotWorkIsTrueOrFalse) {
  // ---
  getHowTheDeviceIsBeingHeld(); // Results will be ready after 100ms and set to theDeviceIsRotated
  if (screen.orientation) {
    window.screen.orientation.addEventListener('change',getHowTheDeviceIsBeingHeld); // https://whatwebcando.today/screen-orientation.html
  } else {
    window.addEventListener("orientationchange",getHowTheDeviceIsBeingHeld); // https://developer.mozilla.org/en-US/docs/Web/API/Window/orientationchange_event
  }
  // ---
  // Show how to play
  // --
  if (deviceorientationDidNotWorkIsTrueOrFalse) {
    // Show finger movement instruction webp
    if (deviceDetector.device == "tablet") {
      if (!sessionStorage.mobileDevicePlayInstruction122HasBeenShown) {
        showHowTablet.style.display = "block"; showHowTablet.children[0].style.display = "block"; // swipe a 1500 + 222x4 + 999999
        showHowTablet.classList.add("appearQuickly");
        new SuperTimeout(function () { // switch from a to b
          showHowTablet.children[0].style.display = "none"; showHowTablet.children[1].style.display = "block";
        }, 3500);
        hideInstructionTimeout = new SuperTimeout(hideTabletInstruction, 12000);
        sessionStorage.mobileDevicePlayInstruction122HasBeenShown = "yes"; // Create the key-value pair so that it will return true inside if()
      }
    } else { // phone
      if (!sessionStorage.mobileDevicePlayInstruction122HasBeenShown) {
        showHowPhone.style.display = "block"; showHowPhone.children[0].style.display = "block"; // swipe a 1500 + 222x4 + 999999
        showHowPhone.classList.add("appearQuickly");
        new SuperTimeout(function () { // switch from a to b
          showHowPhone.children[0].style.display = "none"; showHowPhone.children[1].style.display = "block";
        }, 3500);
        hideInstructionTimeout = new SuperTimeout(hidePhoneInstruction, 12000);
        sessionStorage.mobileDevicePlayInstruction122HasBeenShown = "yes"; // Create the key-value pair so that it will return true inside if()
      }
    }
    // -
    console.log("can not use deviceorientation,,, will play with touch");
    new SuperTimeout(function () {
      main.addEventListener("touchstart",updateGlassTiltMobileWithoutDeviceOrientationUntilFirstGulp);
      main.addEventListener("touchmove",updateGlassTiltMobileWithoutDeviceOrientationUntilFirstGulp);
      main.addEventListener("touchend",updateGlassTiltMobileWithoutDeviceOrientationUntilFirstGulp);
    }, 300);
  } else {
    // Show how to tilt webp
    if (deviceDetector.device == "tablet") {
      if (!sessionStorage.mobileDevicePlayInstruction122HasBeenShown) {
        showHowTablet.style.display = "block"; showHowTablet.children[2].style.display = "block"; // looping tilt animation
        showHowTablet.classList.add("appearQuickly");
        hideInstructionTimeout = new SuperTimeout(hideTabletInstruction, 8500);
        sessionStorage.mobileDevicePlayInstruction122HasBeenShown = "yes"; // Create the key-value pair so that it will return true inside if()
      }
    } else { // phone
      if (!sessionStorage.mobileDevicePlayInstruction122HasBeenShown) {
        showHowPhone.style.display = "block"; showHowPhone.children[2].style.display = "block"; // looping tilt animation
        showHowPhone.classList.add("appearQuickly");
        hideInstructionTimeout = new SuperTimeout(hidePhoneInstruction, 8500);
        sessionStorage.mobileDevicePlayInstruction122HasBeenShown = "yes"; // Create the key-value pair so that it will return true inside if()
      }
    }
    // -
    new SuperTimeout(function () {
      window.addEventListener("deviceorientation",updateGlassTiltMobileUntilFirstGulp);
    }, 300);
  }

  //------
  glassContainerDuringGameGulp0.classList.add("firstZoomWithKeyframes"); // WORKS! 4s=4000ms
  glassContainerDuringGameGulp1.classList.remove("alreadyAtTheCenter"); glassContainerDuringGameGulp1.classList.add("alreadyZoomedAtTheCenter");
  glassContainerDuringGameGulp2.classList.remove("alreadyAtTheCenter"); glassContainerDuringGameGulp2.classList.add("alreadyZoomedAtTheCenter");
  glassContainerDuringGameGulp3.classList.remove("alreadyAtTheCenter"); glassContainerDuringGameGulp3.classList.add("alreadyZoomedAtTheCenter");
  glassContainerDuringGameGulp4.classList.remove("alreadyAtTheCenter"); glassContainerDuringGameGulp4.classList.add("alreadyZoomedAtTheCenter");
}


let initialBeta = null; let initialGamma = null;
let beta; let gamma;
let angleChange=0; let previousAngleChangeWas = 0; let evenOlderAngleChangeWas = 0;
let frameToBeDisplayed = 0;
let sipSoundHasBeenPlayedAlready = false;
let counterForPointOfNoReturn = 0;
function updateGlassTiltMobileUntilFirstGulp(event) {
  beta = event.beta; // Using Math.round makes it jitter at 0.5 1.5 2.5 ... needs smoothing
  gamma = event.gamma;
  // Get initial angles » Only here in gulp zero
  if (!initialBeta) { initialBeta = beta; }
  if (!initialGamma) { initialGamma = gamma; }
  // ---
  if (theDeviceIsRotated == "no") {
    if (beta > -90) {      angleChange = Math.round(beta - initialBeta);    }
    else {      angleChange = Math.round(beta + 360 - initialBeta);    }
    calculate();
  } else if (theDeviceIsRotated == "toTheLeft") {
    if (Math.abs(beta)<90) {      angleChange = Math.round(initialGamma - gamma);    }
    else {      angleChange = Math.round(initialGamma + 180 - gamma);    }
    calculate();
  } else if (theDeviceIsRotated == "toTheRight") {
    if (Math.abs(beta)<90) {      angleChange = Math.round(gamma - initialGamma);    }
    else {      angleChange = Math.round(180 + gamma - initialGamma);    }
    calculate();
  } else if (theDeviceIsRotated == "upsideDown") {
    angleChange = Math.round(initialBeta - beta);
    calculate();
  } else {
    // Couldn't get theDeviceIsRotated
  }
  // ---
  if (frameToBeDisplayed>8 && !sipSoundHasBeenPlayedAlready) {
    sipSound.play(); sipSoundHasBeenPlayedAlready = true;
    if (hideInstructionTimeout) { // If was visible
      hideInstructionTimeout.clear(); // clearTimeout(hideInstructionTimeout);
      if (deviceDetector.device == "tablet") { hideTabletInstruction(); }
      else { hidePhoneInstruction(); } // phone
    }
  }
  // ---
  if (counterForPointOfNoReturn>4) { // Proceed to next gulp
    window.removeEventListener("deviceorientation",updateGlassTiltMobileUntilFirstGulp);
    window.addEventListener("deviceorientation",updateGlassTiltMobileUntilSecondGulp);
    counterForPointOfNoReturn = 0; // reset
    glassContainerDuringGameGulp0.style.visibility = "hidden";
    glassContainerDuringGameGulp1.style.visibility = "visible";
    gulpSound1.play();
  }
  // ---
  function calculate() {
    frameToBeDisplayed = Math.round((angleChange + previousAngleChangeWas + evenOlderAngleChangeWas)/3); // Try to make it smoother
    evenOlderAngleChangeWas = previousAngleChangeWas;
    previousAngleChangeWas = angleChange;
    // Apply limits
    if (frameToBeDisplayed>=0 && frameToBeDisplayed<=16) { update(frameToBeDisplayed); counterForPointOfNoReturn=0; }
    else if (frameToBeDisplayed<0) { update(0); }
    else { update(16); counterForPointOfNoReturn++; }
  }
  // ---
  function update(onlyThisMustShow) {
    for (let i = 0; i < glassContainerDuringGameGulp0.children.length; i++) {
      glassContainerDuringGameGulp0.children[i].style.display = "none";
    }
    glassContainerDuringGameGulp0.children[onlyThisMustShow].style.display = "block";
  }
}

function updateGlassTiltMobileUntilSecondGulp() {
  beta = event.beta;
  gamma = event.gamma;
  // ---
  if (theDeviceIsRotated == "no") {
    if (beta > -90) {      angleChange = Math.round(beta - initialBeta);    }
    else {      angleChange = Math.round(beta + 360 - initialBeta);    }
    calculate();
  } else if (theDeviceIsRotated == "toTheLeft") {
    if (Math.abs(beta)<90) {      angleChange = Math.round(initialGamma - gamma);    }
    else {      angleChange = Math.round(initialGamma + 180 - gamma);    }
    calculate();
  } else if (theDeviceIsRotated == "toTheRight") {
    if (Math.abs(beta)<90) {      angleChange = Math.round(gamma - initialGamma);    }
    else {      angleChange = Math.round(180 + gamma - initialGamma);    }
    calculate();
  } else if (theDeviceIsRotated == "upsideDown") {
    angleChange = Math.round(initialBeta - beta);
    calculate();
  } else {
    // Couldn't get theDeviceIsRotated
  }
  // ---
  if (counterForPointOfNoReturn>4) { // Proceed to next gulp
    window.removeEventListener("deviceorientation",updateGlassTiltMobileUntilSecondGulp);
    window.addEventListener("deviceorientation",updateGlassTiltMobileUntilThirdGulp);
    counterForPointOfNoReturn = 0; // reset
    glassContainerDuringGameGulp1.style.visibility = "hidden";
    glassContainerDuringGameGulp2.style.visibility = "visible";
    gulpSound2.play();
  }
  // ---
  function calculate() {
    frameToBeDisplayed = Math.round((angleChange + previousAngleChangeWas + evenOlderAngleChangeWas)/3); // Try to make it smoother
    evenOlderAngleChangeWas = previousAngleChangeWas;
    previousAngleChangeWas = angleChange;
    // Apply limits
    if (frameToBeDisplayed>=0 && frameToBeDisplayed<=28) { update(frameToBeDisplayed); counterForPointOfNoReturn=0; }
    else if (frameToBeDisplayed<0) { update(0); }
    else { update(28); counterForPointOfNoReturn++; }
  }
  // ---
  function update(onlyThisMustShow) {
    for (let i = 0; i < glassContainerDuringGameGulp1.children.length; i++) {
      glassContainerDuringGameGulp1.children[i].style.display = "none";
    }
    glassContainerDuringGameGulp1.children[onlyThisMustShow].style.display = "block";
  }
}

function updateGlassTiltMobileUntilThirdGulp() {
  beta = event.beta;
  gamma = event.gamma;
  // ---
  if (theDeviceIsRotated == "no") {
    if (beta > -90) {      angleChange = Math.round(beta - initialBeta);    }
    else {      angleChange = Math.round(beta + 360 - initialBeta);    }
    calculate();
  } else if (theDeviceIsRotated == "toTheLeft") {
    if (Math.abs(beta)<90) {      angleChange = Math.round(initialGamma - gamma);    }
    else {      angleChange = Math.round(initialGamma + 180 - gamma);    }
    calculate();
  } else if (theDeviceIsRotated == "toTheRight") {
    if (Math.abs(beta)<90) {      angleChange = Math.round(gamma - initialGamma);    }
    else {      angleChange = Math.round(180 + gamma - initialGamma);    }
    calculate();
  } else if (theDeviceIsRotated == "upsideDown") {
    angleChange = Math.round(initialBeta - beta);
    calculate();
  } else {
    // Couldn't get theDeviceIsRotated
  }
  // ---
  if (counterForPointOfNoReturn>4) { // Proceed to next gulp
    window.removeEventListener("deviceorientation",updateGlassTiltMobileUntilThirdGulp);
    window.addEventListener("deviceorientation",updateGlassTiltMobileUntilFourthGulp);
    counterForPointOfNoReturn = 0; // reset
    glassContainerDuringGameGulp2.style.visibility = "hidden";
    glassContainerDuringGameGulp3.style.visibility = "visible";
    gulpSound3.play();
  }
  // ---
  function calculate() {
    frameToBeDisplayed = Math.round((angleChange + previousAngleChangeWas + evenOlderAngleChangeWas)/3); // Try to make it smoother
    evenOlderAngleChangeWas = previousAngleChangeWas;
    previousAngleChangeWas = angleChange;
    // Apply limits
    if (frameToBeDisplayed>=0 && frameToBeDisplayed<=40) { update(frameToBeDisplayed); counterForPointOfNoReturn=0; }
    else if (frameToBeDisplayed<0) { update(0); }
    else { update(40); counterForPointOfNoReturn++; }
  }
  // ---
  function update(onlyThisMustShow) {
    for (let i = 0; i < glassContainerDuringGameGulp2.children.length; i++) {
      glassContainerDuringGameGulp2.children[i].style.display = "none";
    }
    glassContainerDuringGameGulp2.children[onlyThisMustShow].style.display = "block";
  }
}

function updateGlassTiltMobileUntilFourthGulp() {
  beta = event.beta;
  gamma = event.gamma;
  // ---
  if (theDeviceIsRotated == "no") {
    if (beta > -90) {      angleChange = Math.round(beta - initialBeta);    }
    else {      angleChange = Math.round(beta + 360 - initialBeta);    }
    calculate();
  } else if (theDeviceIsRotated == "toTheLeft") {
    if (Math.abs(beta)<90) {      angleChange = Math.round(initialGamma - gamma);    }
    else {      angleChange = Math.round(initialGamma + 180 - gamma);    }
    calculate();
  } else if (theDeviceIsRotated == "toTheRight") {
    if (Math.abs(beta)<90) {      angleChange = Math.round(gamma - initialGamma);    }
    else {      angleChange = Math.round(180 + gamma - initialGamma);    }
    calculate();
  } else if (theDeviceIsRotated == "upsideDown") {
    angleChange = Math.round(initialBeta - beta);
    calculate();
  } else {
    // Couldn't get theDeviceIsRotated
  }
  // ---
  if (counterForPointOfNoReturn>4) { // Proceed to next gulp
    window.removeEventListener("deviceorientation",updateGlassTiltMobileUntilFourthGulp);
    window.addEventListener("deviceorientation",updateGlassTiltMobileWhichIsNowEmpty);
    counterForPointOfNoReturn = 0; // reset
    glassContainerDuringGameGulp3.style.visibility = "hidden";
    glassContainerDuringGameGulp4.style.visibility = "visible";
    gulpSound4.play();
    let winTime;  switch (parent.speedAdjustmentSetting) {  case "slow": winTime = 3000; break;  case "fast": winTime = 1000; break;  default: winTime = 2000;  }
    new SuperTimeout(function () {
      winSound.play();
      winHappenedOnMobile();
    }, winTime);
  }
  // ---
  function calculate() {
    frameToBeDisplayed = Math.round((angleChange + previousAngleChangeWas + evenOlderAngleChangeWas)/3); // Try to make it smoother
    evenOlderAngleChangeWas = previousAngleChangeWas;
    previousAngleChangeWas = angleChange;
    // Apply limits
    if (frameToBeDisplayed>=0 && frameToBeDisplayed<=51) { update(frameToBeDisplayed); counterForPointOfNoReturn=0; }
    else if (frameToBeDisplayed<0) { update(0); }
    else { update(51); counterForPointOfNoReturn++; }
  }
  // ---
  function update(onlyThisMustShow) {
    for (let i = 0; i < glassContainerDuringGameGulp3.children.length; i++) {
      glassContainerDuringGameGulp3.children[i].style.display = "none";
    }
    glassContainerDuringGameGulp3.children[onlyThisMustShow].style.display = "block";
  }
}

function updateGlassTiltMobileWhichIsNowEmpty() {
  beta = event.beta;
  gamma = event.gamma;
  // ---
  if (theDeviceIsRotated == "no") {
    if (beta > -90) {      angleChange = Math.round(beta - initialBeta);    }
    else {      angleChange = Math.round(beta + 360 - initialBeta);    }
    calculate();
  } else if (theDeviceIsRotated == "toTheLeft") {
    if (Math.abs(beta)<90) {      angleChange = Math.round(initialGamma - gamma);    }
    else {      angleChange = Math.round(initialGamma + 180 - gamma);    }
    calculate();
  } else if (theDeviceIsRotated == "toTheRight") {
    if (Math.abs(beta)<90) {      angleChange = Math.round(gamma - initialGamma);    }
    else {      angleChange = Math.round(180 + gamma - initialGamma);    }
    calculate();
  } else if (theDeviceIsRotated == "upsideDown") {
    angleChange = Math.round(initialBeta - beta);
    calculate();
  } else {
    // Couldn't get theDeviceIsRotated
  }
  // ---
  function calculate() {
    frameToBeDisplayed = Math.round((angleChange + previousAngleChangeWas + evenOlderAngleChangeWas)/3); // Try to make it smoother
    evenOlderAngleChangeWas = previousAngleChangeWas;
    previousAngleChangeWas = angleChange;
    // Apply limits
    if (frameToBeDisplayed>=0 && frameToBeDisplayed<=59) { update(frameToBeDisplayed); counterForPointOfNoReturn=0; }
    else if (frameToBeDisplayed<0) { update(0); }
    else { update(59); counterForPointOfNoReturn++; }
  }
  // ---
  function update(onlyThisMustShow) {
    for (let i = 0; i < glassContainerDuringGameGulp4.children.length; i++) {
      glassContainerDuringGameGulp4.children[i].style.display = "none";
    }
    glassContainerDuringGameGulp4.children[onlyThisMustShow].style.display = "block";
  }
}

// ------------- WITHOUT DEVICEORIENTATION ---------------
let touchDistanceFromTopWas = 0;
let touchMovedInY = 0; let touchPreviousY = 0; let touchDifferenceInY = 0;
let beforeCalculatingCurrentFrame = 0;
let touchGearRatio = 3;
let isMovingDownwards;
function updateGlassTiltMobileWithoutDeviceOrientationUntilFirstGulp(event) { event.preventDefault(); event.stopPropagation();
  // Since we combine touchstart+touchmove+touchend into a single handler we must use changedTouches[] instead of targetTouches[] or touches[]
  // Because only changedTouches[] will remember the last contact point and therefore is compatible with touchend
  touchMovedInY = Math.round(event.changedTouches[0].clientY) - touchDistanceFromTopWas;
  touchDifferenceInY = touchMovedInY - touchPreviousY;
  touchPreviousY = touchMovedInY;
  if (touchDifferenceInY > 0) { console.log("down"); beforeCalculatingCurrentFrame++; isMovingDownwards = true; }
  else if (touchDifferenceInY < 0) { console.log("up"); beforeCalculatingCurrentFrame--; isMovingDownwards = false; }
  else {  /*horizontal movement that we don't need in this case*/  }
  // Gear ratio
  frameToBeDisplayed = Math.round(beforeCalculatingCurrentFrame / touchGearRatio);
  // Limits
  if (frameToBeDisplayed<0) { frameToBeDisplayed = 0; beforeCalculatingCurrentFrame = 0; }
  else if (frameToBeDisplayed>16) { frameToBeDisplayed = 16; beforeCalculatingCurrentFrame = frameToBeDisplayed*touchGearRatio; }
  // Movement and threshold points
  if (frameToBeDisplayed>8 && !sipSoundHasBeenPlayedAlready) {
    sipSound.play(); sipSoundHasBeenPlayedAlready = true;
    if (hideInstructionTimeout) { // If was visible
      hideInstructionTimeout.clear(); // clearTimeout(hideInstructionTimeout);
      if (deviceDetector.device == "tablet") { hideTabletInstruction(); }
      else { hidePhoneInstruction(); } // phone
    }
  }
  // With extra safety measures
  if (isMovingDownwards) {
    if (frameToBeDisplayed > 0) {    glassContainerDuringGameGulp0.children[frameToBeDisplayed-1].style.display = "none";  }
  }
  else {
    if (frameToBeDisplayed < 16) {   glassContainerDuringGameGulp0.children[frameToBeDisplayed+1].style.display = "none";  }
  }
  // Regardless of direction
  // console.log("current fr: "+frameToBeDisplayed);
  glassContainerDuringGameGulp0.children[frameToBeDisplayed].style.display = "block";

  if (frameToBeDisplayed == 16) {  counterForPointOfNoReturn++;  }
  if (counterForPointOfNoReturn == 4) {
    main.removeEventListener("touchstart",updateGlassTiltMobileWithoutDeviceOrientationUntilFirstGulp);
    main.removeEventListener("touchmove",updateGlassTiltMobileWithoutDeviceOrientationUntilFirstGulp);
    main.removeEventListener("touchend",updateGlassTiltMobileWithoutDeviceOrientationUntilFirstGulp);
    counterForPointOfNoReturn = 0;
    glassContainerDuringGameGulp0.style.visibility = "hidden";
    glassContainerDuringGameGulp1.style.visibility = "visible";
    gulpSound1.play();
    console.log("First gulp without deviceorientation");
    beforeCalculatingCurrentFrame = frameToBeDisplayed*touchGearRatio; // Undo the overdrive during insistence incrementation
    main.addEventListener("touchstart",updateGlassTiltMobileWithoutDeviceOrientationUntilSecondGulp);
    main.addEventListener("touchmove",updateGlassTiltMobileWithoutDeviceOrientationUntilSecondGulp);
    main.addEventListener("touchend",updateGlassTiltMobileWithoutDeviceOrientationUntilSecondGulp);
  }
}
function updateGlassTiltMobileWithoutDeviceOrientationUntilSecondGulp(event) { event.preventDefault(); event.stopPropagation();
  touchMovedInY = Math.round(event.changedTouches[0].clientY) - touchDistanceFromTopWas;
  touchDifferenceInY = touchMovedInY - touchPreviousY;
  touchPreviousY = touchMovedInY;
  if (touchDifferenceInY > 0) { console.log("down"); beforeCalculatingCurrentFrame++; isMovingDownwards = true; }
  else if (touchDifferenceInY < 0) { console.log("up"); beforeCalculatingCurrentFrame--; isMovingDownwards = false; }
  else {  /*horizontal movement that we don't need in this case*/  }
  // Gear ratio
  frameToBeDisplayed = Math.round(beforeCalculatingCurrentFrame / touchGearRatio);
  // Limits
  if (frameToBeDisplayed<0) { frameToBeDisplayed = 0; beforeCalculatingCurrentFrame = 0; }
  else if (frameToBeDisplayed>28) { frameToBeDisplayed = 28; beforeCalculatingCurrentFrame = frameToBeDisplayed*touchGearRatio; }
  // With extra safety measures
  if (isMovingDownwards) {
    if (frameToBeDisplayed > 0) {    glassContainerDuringGameGulp1.children[frameToBeDisplayed-1].style.display = "none";  }
  }
  else {
    if (frameToBeDisplayed < 28) {   glassContainerDuringGameGulp1.children[frameToBeDisplayed+1].style.display = "none";  }
  }
  // Regardless of direction
  glassContainerDuringGameGulp1.children[frameToBeDisplayed].style.display = "block";

  if (frameToBeDisplayed == 28) {  counterForPointOfNoReturn++;  }
  if (counterForPointOfNoReturn == 4) {
    main.removeEventListener("touchstart",updateGlassTiltMobileWithoutDeviceOrientationUntilSecondGulp);
    main.removeEventListener("touchmove",updateGlassTiltMobileWithoutDeviceOrientationUntilSecondGulp);
    main.removeEventListener("touchend",updateGlassTiltMobileWithoutDeviceOrientationUntilSecondGulp);
    counterForPointOfNoReturn = 0;
    glassContainerDuringGameGulp1.style.visibility = "hidden";
    glassContainerDuringGameGulp2.style.visibility = "visible";
    gulpSound2.play();
    console.log("2nd gulp without deviceorientation");
    beforeCalculatingCurrentFrame = frameToBeDisplayed*touchGearRatio; // Undo the overdrive during insistence incrementation
    main.addEventListener("touchstart",updateGlassTiltMobileWithoutDeviceOrientationUntilThirdGulp);
    main.addEventListener("touchmove",updateGlassTiltMobileWithoutDeviceOrientationUntilThirdGulp);
    main.addEventListener("touchend",updateGlassTiltMobileWithoutDeviceOrientationUntilThirdGulp);
  }
}
function updateGlassTiltMobileWithoutDeviceOrientationUntilThirdGulp(event) { event.preventDefault(); event.stopPropagation();
  touchMovedInY = Math.round(event.changedTouches[0].clientY) - touchDistanceFromTopWas;
  touchDifferenceInY = touchMovedInY - touchPreviousY;
  touchPreviousY = touchMovedInY;
  if (touchDifferenceInY > 0) { console.log("down"); beforeCalculatingCurrentFrame++; isMovingDownwards = true; }
  else if (touchDifferenceInY < 0) { console.log("up"); beforeCalculatingCurrentFrame--; isMovingDownwards = false; }
  else {  /*horizontal movement that we don't need in this case*/  }
  // Gear ratio
  frameToBeDisplayed = Math.round(beforeCalculatingCurrentFrame / touchGearRatio);
  // Limits
  if (frameToBeDisplayed<0) { frameToBeDisplayed = 0; beforeCalculatingCurrentFrame = 0; }
  else if (frameToBeDisplayed>40) { frameToBeDisplayed = 40; beforeCalculatingCurrentFrame = frameToBeDisplayed*touchGearRatio; }
  // With extra safety measures
  if (isMovingDownwards) {
    if (frameToBeDisplayed > 0) {    glassContainerDuringGameGulp2.children[frameToBeDisplayed-1].style.display = "none";  }
  }
  else {
    if (frameToBeDisplayed < 40) {   glassContainerDuringGameGulp2.children[frameToBeDisplayed+1].style.display = "none";  }
  }
  // Regardless of direction
  glassContainerDuringGameGulp2.children[frameToBeDisplayed].style.display = "block";

  if (frameToBeDisplayed == 40) {  counterForPointOfNoReturn++;  }
  if (counterForPointOfNoReturn == 4) {
    main.removeEventListener("touchstart",updateGlassTiltMobileWithoutDeviceOrientationUntilThirdGulp);
    main.removeEventListener("touchmove",updateGlassTiltMobileWithoutDeviceOrientationUntilThirdGulp);
    main.removeEventListener("touchend",updateGlassTiltMobileWithoutDeviceOrientationUntilThirdGulp);
    counterForPointOfNoReturn = 0;
    glassContainerDuringGameGulp2.style.visibility = "hidden";
    glassContainerDuringGameGulp3.style.visibility = "visible";
    gulpSound3.play();
    console.log("3rd gulp without deviceorientation");
    beforeCalculatingCurrentFrame = frameToBeDisplayed*touchGearRatio; // Undo the overdrive during insistence incrementation
    main.addEventListener("touchstart",updateGlassTiltMobileWithoutDeviceOrientationUntilFourthGulp);
    main.addEventListener("touchmove",updateGlassTiltMobileWithoutDeviceOrientationUntilFourthGulp);
    main.addEventListener("touchend",updateGlassTiltMobileWithoutDeviceOrientationUntilFourthGulp);
  }
}
function updateGlassTiltMobileWithoutDeviceOrientationUntilFourthGulp(event) { event.preventDefault(); event.stopPropagation();
  touchMovedInY = Math.round(event.changedTouches[0].clientY) - touchDistanceFromTopWas;
  touchDifferenceInY = touchMovedInY - touchPreviousY;
  touchPreviousY = touchMovedInY;
  if (touchDifferenceInY > 0) { console.log("down"); beforeCalculatingCurrentFrame++; isMovingDownwards = true; }
  else if (touchDifferenceInY < 0) { console.log("up"); beforeCalculatingCurrentFrame--; isMovingDownwards = false; }
  else {  /*horizontal movement that we don't need in this case*/  }
  // Gear ratio
  frameToBeDisplayed = Math.round(beforeCalculatingCurrentFrame / touchGearRatio);
  // Limits
  if (frameToBeDisplayed<0) { frameToBeDisplayed = 0; beforeCalculatingCurrentFrame = 0; }
  else if (frameToBeDisplayed>51) { frameToBeDisplayed = 51; beforeCalculatingCurrentFrame = frameToBeDisplayed*touchGearRatio; }
  // With extra safety measures
  if (isMovingDownwards) {
    if (frameToBeDisplayed > 0) {    glassContainerDuringGameGulp3.children[frameToBeDisplayed-1].style.display = "none";  }
  }
  else {
    if (frameToBeDisplayed < 51) {   glassContainerDuringGameGulp3.children[frameToBeDisplayed+1].style.display = "none";  }
  }
  // Regardless of direction
  glassContainerDuringGameGulp3.children[frameToBeDisplayed].style.display = "block";

  if (frameToBeDisplayed == 51) {  counterForPointOfNoReturn++;  }
  if (counterForPointOfNoReturn == 4) {
    main.removeEventListener("touchstart",updateGlassTiltMobileWithoutDeviceOrientationUntilFourthGulp);
    main.removeEventListener("touchmove",updateGlassTiltMobileWithoutDeviceOrientationUntilFourthGulp);
    main.removeEventListener("touchend",updateGlassTiltMobileWithoutDeviceOrientationUntilFourthGulp);
    counterForPointOfNoReturn = 0;
    glassContainerDuringGameGulp3.style.visibility = "hidden";
    glassContainerDuringGameGulp4.style.visibility = "visible";
    gulpSound4.play();
    let winTime;  switch (parent.speedAdjustmentSetting) {  case "slow": winTime = 3000; break;  case "fast": winTime = 1000; break;  default: winTime = 2000;  }
    new SuperTimeout(function () {
      winSound.play();
      winHappenedOnMobile();
    }, winTime);
    console.log("Last gulp without deviceorientation");
    beforeCalculatingCurrentFrame = frameToBeDisplayed*touchGearRatio; // Undo the overdrive during insistence incrementation
    main.addEventListener("touchstart",updateGlassTiltMobileWithoutDeviceOrientationEmptiedUp);
    main.addEventListener("touchmove",updateGlassTiltMobileWithoutDeviceOrientationEmptiedUp);
    main.addEventListener("touchend",updateGlassTiltMobileWithoutDeviceOrientationEmptiedUp);
  }
}
function updateGlassTiltMobileWithoutDeviceOrientationEmptiedUp(event) { event.preventDefault(); event.stopPropagation();
  touchMovedInY = Math.round(event.changedTouches[0].clientY) - touchDistanceFromTopWas;
  touchDifferenceInY = touchMovedInY - touchPreviousY;
  touchPreviousY = touchMovedInY;
  if (touchDifferenceInY > 0) { console.log("down"); beforeCalculatingCurrentFrame++; isMovingDownwards = true; }
  else if (touchDifferenceInY < 0) { console.log("up"); beforeCalculatingCurrentFrame--; isMovingDownwards = false; }
  else {  /*horizontal movement that we don't need in this case*/  }
  // Gear ratio
  frameToBeDisplayed = Math.round(beforeCalculatingCurrentFrame / touchGearRatio);
  // Limits
  if (frameToBeDisplayed<0) { frameToBeDisplayed = 0; beforeCalculatingCurrentFrame = 0; }
  else if (frameToBeDisplayed>59) { frameToBeDisplayed = 59; beforeCalculatingCurrentFrame = frameToBeDisplayed*touchGearRatio; }
  // With extra safety measures
  if (isMovingDownwards) {
    if (frameToBeDisplayed > 0) {    glassContainerDuringGameGulp4.children[frameToBeDisplayed-1].style.display = "none";  }
  }
  else {
    if (frameToBeDisplayed < 59) {   glassContainerDuringGameGulp4.children[frameToBeDisplayed+1].style.display = "none";  }
  }
  // Regardless of direction
  glassContainerDuringGameGulp4.children[frameToBeDisplayed].style.display = "block";
}



function winHappenedOnMobile() {
  glassContainerDuringGameGulp4.classList.add("lastZoomWithKeyframes");
  /* Save progress */
  parent.savedProgress[studiedLang].lesson_DRINKWATERFROMGLASS_IsCompleted=true; // WATCH THE NAME OF THE LESSON!!!
  parent.saveJSON = JSON.stringify(parent.savedProgress); // Convert
  localStorage.setItem("memoryCard", parent.saveJSON); // Save
  goToTheNextLessonMobile();
}

function goToTheNextLessonMobile() { // Same with goToTheNextLessonDesktop

  let proceedTime;  switch (parent.speedAdjustmentSetting) {  case "slow": proceedTime = 6500; break;  case "fast": proceedTime = 3500; break;  default: proceedTime = 5000;  }
  parent.pathOfWhatWillBeDisplayedUnlessInternetConnectivityIsLost = "/lessons_in_iframes/level_1/unit_2/lesson_3/index.html"; // See js_for_online_and_offline_modes
  new SuperTimeout(function () {
    // ---
    showGlobyPreloaderBeforeExit(); // 1500ms » See js_for_all_iframed_lesson_htmls AND See css_for_preloader_and_orbiting_circles
    // REMEMBER: iframe.src change makes window.onbeforeunload fire in js_for_all_iframed_lesson_htmls.js which then calls unloadTheSoundsOfThisLesson();
    if (parent.internetConnectivityIsNiceAndUsable) { // See js_for_online_and_offline_modes.js
      new SuperTimeout(function () { parent.ayFreym.src = parent.pathOfWhatWillBeDisplayedUnlessInternetConnectivityIsLost; }, 1500);
    } else { parent.console.warn("THE DEVICE IS OFFLINE (detected at the end of lesson");
      const isCached = checkIfNextLessonIsCachedAndRedirectIfNot(123); // See js_for_all_iframed_lesson_htmls
      if (isCached) { console.warn("WILL TRY TO CONTINUE OFFLINE");
        new SuperTimeout(function() { parent.ayFreym.src = parent.pathOfWhatWillBeDisplayedUnlessInternetConnectivityIsLost; }, 1500);
      }
    }
    // ---
  },proceedTime); // If there was a final dialog box then better let it disappear completely before preloader starts appearing

}

// ---
let theDeviceIsRotated;
function getHowTheDeviceIsBeingHeld() {
  new SuperTimeout(afterAnUnnoticableDelay,100); // This solves the wrong-firing-order issue on Samsung Browser.
  function afterAnUnnoticableDelay() {
    // UPDATE Safari 16.4 (at last) supports screen.orientation
    // As of August2023 (without testing) we don't know if screen.orientation.angle returns 270 or -90
    if (screen.orientation) { // Mainly for Android (as of 2022)
      // screen.orientation.angle on Android (as of 2022) returns 0 or 90 or 270 or 180
      if (screen.orientation.angle == 0)   {    theDeviceIsRotated="no";     }
      if (screen.orientation.angle == 90)  {    theDeviceIsRotated="toTheLeft";     }
      if (screen.orientation.angle == 270 || screen.orientation.angle == -90) {    theDeviceIsRotated="toTheRight";     }
      if (screen.orientation.angle == 180) {    theDeviceIsRotated="upsideDown";     }
    } else { // Mainly for iOS (as of 2022) » Safari 16.3 and older
      // window.orientation returns 0 or 90 or -90 or 180
      if (window.orientation == 0)   {    theDeviceIsRotated="no";     }
      if (window.orientation == 90)  {    theDeviceIsRotated="toTheLeft";     }
      if (window.orientation == -90) {    theDeviceIsRotated="toTheRight";     }
      if (window.orientation == 180) {    theDeviceIsRotated="upsideDown";     }
    }
  }
}
