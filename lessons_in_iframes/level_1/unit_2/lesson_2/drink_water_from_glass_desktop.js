"use strict";
// Code written by Manheart Earthman=B. A. Bilgekılınç Topraksoy=土本 智一勇夫剛志
// UNAUTHORIZED MODIFICATION IS PROHIBITED: You may not change this file without obtaining permission

let frameNumber = 0;
let directionIsDown;
let insistence = 0;
let sipSoundHasBeenHeard = false;

function updateGlassTiltDesktopUntilFirstGulp(event) { // fires with every mousewheel movement » event is listened on MAIN (whole viewport)
  event.preventDefault();
  // ----- Unfortunately we cannot handle the MacOS two fingered reverse scroll gesture. Because we cannot detect if user has a mouse or is using the touchpad
  if (event.deltaY > 0) { console.log("down"); frameNumber++; directionIsDown = true; }
  else { console.log("up"); frameNumber--; directionIsDown = false; }
  // Limits
  if (frameNumber<0) { frameNumber = 0; }
  else if (frameNumber>16) { frameNumber = 16; }
  // Movement and threshold points
  if (frameNumber>8 && !sipSoundHasBeenHeard) {
    sipSound.play(); sipSoundHasBeenHeard = true;
  }
  // ------
  if (directionIsDown) {    glassContainerDuringGameGulp0.children[frameNumber-1].style.visibility = "hidden";  }
  else {    glassContainerDuringGameGulp0.children[frameNumber+1].style.visibility = "hidden";  }
  // Regardless of direction
  glassContainerDuringGameGulp0.children[frameNumber].style.visibility = "visible";
  if (frameNumber == 16) {
    if (isApple) { insistence += 0.1; } else { insistence++; }
  }
  if (insistence >= 2) {
    main.removeEventListener("wheel",updateGlassTiltDesktopUntilFirstGulp);
    main.addEventListener("wheel",updateGlassTiltDesktopUntilSecondGulp);
    insistence = 0;
    glassContainerDuringGameGulp0.style.visibility = "hidden";
    glassContainerDuringGameGulp1.style.visibility = "visible";
    gulpSound1.play();
  }
}
function updateGlassTiltDesktopUntilSecondGulp(event) { event.preventDefault();
  if (event.deltaY > 0) { console.log("down"); frameNumber++; directionIsDown = true; }
  else { console.log("up"); frameNumber--; directionIsDown = false; }
  // Limits
  if (frameNumber<0) { frameNumber = 0; }
  else if (frameNumber>28) { frameNumber = 28; }
  // ------
  if (directionIsDown) {    glassContainerDuringGameGulp1.children[frameNumber-1].style.visibility = "hidden";  }
  else {    glassContainerDuringGameGulp1.children[frameNumber+1].style.visibility = "hidden";  }
  // Regardless of direction
  glassContainerDuringGameGulp1.children[frameNumber].style.visibility = "visible";
  if (frameNumber == 28) {
    if (isApple) { insistence += 0.1; } else { insistence++; }
  }
  if (insistence >= 2) {
    main.removeEventListener("wheel",updateGlassTiltDesktopUntilSecondGulp);
    main.addEventListener("wheel",updateGlassTiltDesktopUntilThirdGulp);
    insistence = 0;
    glassContainerDuringGameGulp1.style.visibility = "hidden";
    glassContainerDuringGameGulp2.style.visibility = "visible";
    gulpSound2.play();
  }
}

function updateGlassTiltDesktopUntilThirdGulp(event) { event.preventDefault();
  if (event.deltaY > 0) { console.log("down"); frameNumber++; directionIsDown = true; }
  else { console.log("up"); frameNumber--; directionIsDown = false; }
  // Limits
  if (frameNumber<0) { frameNumber = 0; }
  else if (frameNumber>40) { frameNumber = 40; }
  // ------
  if (directionIsDown) {    glassContainerDuringGameGulp2.children[frameNumber-1].style.visibility = "hidden";  }
  else {    glassContainerDuringGameGulp2.children[frameNumber+1].style.visibility = "hidden";  }
  // Regardless of direction
  glassContainerDuringGameGulp2.children[frameNumber].style.visibility = "visible";
  if (frameNumber == 40) {
    if (isApple) { insistence += 0.1; } else { insistence++; }
  }
  if (insistence >= 2) {
    main.removeEventListener("wheel",updateGlassTiltDesktopUntilThirdGulp);
    main.addEventListener("wheel",updateGlassTiltDesktopUntilFourthGulp);
    insistence = 0;
    glassContainerDuringGameGulp2.style.visibility = "hidden";
    glassContainerDuringGameGulp3.style.visibility = "visible";
    gulpSound3.play();
  }
}

function updateGlassTiltDesktopUntilFourthGulp(event) { event.preventDefault();
  if (event.deltaY > 0) { console.log("down"); frameNumber++; directionIsDown = true; }
  else { console.log("up"); frameNumber--; directionIsDown = false; }
  // Limits
  if (frameNumber<0) { frameNumber = 0; }
  else if (frameNumber>51) { frameNumber = 51; }
  // ------
  if (directionIsDown) {    glassContainerDuringGameGulp3.children[frameNumber-1].style.visibility = "hidden";  }
  else {    glassContainerDuringGameGulp3.children[frameNumber+1].style.visibility = "hidden";  }
  // Regardless of direction
  glassContainerDuringGameGulp3.children[frameNumber].style.visibility = "visible";
  if (frameNumber == 51) {
    if (isApple) { insistence += 0.1; } else { insistence++; }
  }
  if (insistence >= 2) {
    main.removeEventListener("wheel",updateGlassTiltDesktopUntilFourthGulp);
    main.addEventListener("wheel",updateGlassTiltDesktopNowIsEmpty);
    insistence = 0;
    glassContainerDuringGameGulp3.style.visibility = "hidden";
    glassContainerDuringGameGulp4.style.visibility = "visible";
    gulpSound4.play();
    let winTime;  switch (parent.speedAdjustmentSetting) {  case "slow": winTime = 3000; break;  case "fast": winTime = 1000; break;  default: winTime = 2000;  }
    new SuperTimeout(function () {
      winSound.play();
      winHappenedOnDesktop();
    }, winTime);
  }
}

function updateGlassTiltDesktopNowIsEmpty(event) { event.preventDefault();
  if (event.deltaY > 0) { console.log("down"); frameNumber++; directionIsDown = true; }
  else { console.log("up"); frameNumber--; directionIsDown = false; }
  // Limits
  if (frameNumber<0) { frameNumber = 0; }
  else if (frameNumber>59) { frameNumber = 59; }
  // ------
  if (directionIsDown) {    glassContainerDuringGameGulp4.children[frameNumber-1].style.visibility = "hidden";  }
  else {    glassContainerDuringGameGulp4.children[frameNumber+1].style.visibility = "hidden";  }
  // Regardless of direction
  glassContainerDuringGameGulp4.children[frameNumber].style.visibility = "visible";
}

// ------------- WITHOUT MOUSEWHEEL ---------------
let pointerToTopWas = 0;
let mouseMovedInY = 0; let previousY = 0; let differenceInY = 0;
let toCalculateCurrentFrame = 0;
let gearRatio = 2; // Should this depend on screen window height?
function clickAndDragToDrinkWithoutWheel(firstCoord) {
  console.log("Game will be played with mouseY at " + firstCoord);
  pointerToTopWas = firstCoord;
  main.addEventListener("mousemove",updateGlassTiltWithoutWheelUntilFirstGulp);
}
function updateGlassTiltWithoutWheelUntilFirstGulp(event) {
  mouseMovedInY = Math.round(event.clientY) - pointerToTopWas;
  differenceInY = mouseMovedInY - previousY;
  previousY = mouseMovedInY;
  if (differenceInY > 0) { console.log("down"); toCalculateCurrentFrame++; directionIsDown = true; }
  else if (differenceInY < 0) { console.log("up"); toCalculateCurrentFrame--; directionIsDown = false; }
  else {  /*horizontal movement that we don't need in this case*/  }
  // Gear ratio
  frameNumber = Math.round(toCalculateCurrentFrame / gearRatio);
  // Limits
  if (frameNumber<0) { frameNumber = 0; toCalculateCurrentFrame = 0; }
  else if (frameNumber>16) { frameNumber = 16; toCalculateCurrentFrame = frameNumber*gearRatio; }
  // Movement and threshold points
  if (frameNumber>8 && !sipSoundHasBeenHeard) {
    sipSound.play(); sipSoundHasBeenHeard = true;
  }
  // With extra safety measures
  if (directionIsDown) {
    if (frameNumber > 0) {    glassContainerDuringGameGulp0.children[frameNumber-1].style.visibility = "hidden";  }
  }
  else {
    if (frameNumber < 16) {   glassContainerDuringGameGulp0.children[frameNumber+1].style.visibility = "hidden";  }
  }
  // Regardless of direction
  // console.log("current fr: "+frameNumber);
  glassContainerDuringGameGulp0.children[frameNumber].style.visibility = "visible";

  if (frameNumber == 16) {  insistence++;  }
  if (insistence == 5) {
    main.removeEventListener("mousemove",updateGlassTiltWithoutWheelUntilFirstGulp);
    insistence = 0;
    glassContainerDuringGameGulp0.style.visibility = "hidden";
    glassContainerDuringGameGulp1.style.visibility = "visible";
    gulpSound1.play();
    console.log("First gulp without mouse wheel");
    toCalculateCurrentFrame = frameNumber*gearRatio; // Undo the overdrive during insistence incrementation
    main.addEventListener("mousemove",updateGlassTiltWithoutWheelUntilSecondGulp);
  }
}

function updateGlassTiltWithoutWheelUntilSecondGulp() {
  mouseMovedInY = Math.round(event.clientY) - pointerToTopWas;
  differenceInY = mouseMovedInY - previousY;
  previousY = mouseMovedInY;
  if (differenceInY > 0) { console.log("down"); toCalculateCurrentFrame++; directionIsDown = true; }
  else if (differenceInY < 0) { console.log("up"); toCalculateCurrentFrame -= 0.75; directionIsDown = false; }
  else {  /*horizontal movement*/  }
  // Gear ratio
  frameNumber = Math.round(toCalculateCurrentFrame / gearRatio);
  // Limits
  if (frameNumber<0) { frameNumber = 0; toCalculateCurrentFrame = 0; }
  else if (frameNumber>28) { frameNumber = 28; toCalculateCurrentFrame = frameNumber*gearRatio; } // 28x3.5 = 98 is the RANGE in pixels » Depends on gear ratio
  // Movement and threshold points
  // With extra safety measures
  if (directionIsDown) {
    if (frameNumber > 0) {    glassContainerDuringGameGulp1.children[frameNumber-1].style.visibility = "hidden";  }
  }
  else {
    if (frameNumber < 28) {   glassContainerDuringGameGulp1.children[frameNumber+1].style.visibility = "hidden";  }
  }
  // Regardless of direction
  glassContainerDuringGameGulp1.children[frameNumber].style.visibility = "visible";

  if (frameNumber == 28) {  insistence++;  }
  if (insistence == 4) {
    main.removeEventListener("mousemove",updateGlassTiltWithoutWheelUntilSecondGulp);
    insistence = 0;
    glassContainerDuringGameGulp1.style.visibility = "hidden";
    glassContainerDuringGameGulp2.style.visibility = "visible";
    gulpSound2.play();
    console.log("Second gulp without mouse wheel");
    toCalculateCurrentFrame = frameNumber*gearRatio;
    main.addEventListener("mousemove",updateGlassTiltWithoutWheelUntilThirdGulp);
  }
}
function updateGlassTiltWithoutWheelUntilThirdGulp() {
  mouseMovedInY = Math.round(event.clientY) - pointerToTopWas;
  differenceInY = mouseMovedInY - previousY;
  previousY = mouseMovedInY;
  if (differenceInY > 0) { console.log("down"); toCalculateCurrentFrame++; directionIsDown = true; }
  else if (differenceInY < 0) { console.log("up"); toCalculateCurrentFrame -= 0.75; directionIsDown = false; }
  else {  /*horizontal movement*/  }
  // Gear ratio
  frameNumber = Math.round(toCalculateCurrentFrame / gearRatio);
  // Limits
  if (frameNumber<0) { frameNumber = 0; toCalculateCurrentFrame = 0; }
  else if (frameNumber>40) { frameNumber = 40; toCalculateCurrentFrame = frameNumber*gearRatio; } // 40x3=120 is the RANGE in pixels » Depends on gear ratio
  // Movement and threshold points
  // With extra safety measures
  if (directionIsDown) {
    if (frameNumber > 0) {    glassContainerDuringGameGulp2.children[frameNumber-1].style.visibility = "hidden";  }
  }
  else {
    if (frameNumber < 40) {   glassContainerDuringGameGulp2.children[frameNumber+1].style.visibility = "hidden";  }
  }
  // Regardless of direction
  glassContainerDuringGameGulp2.children[frameNumber].style.visibility = "visible";

  if (frameNumber == 40) {  insistence++;  }
  if (insistence == 3) {
    main.removeEventListener("mousemove",updateGlassTiltWithoutWheelUntilThirdGulp);
    insistence = 0;
    glassContainerDuringGameGulp2.style.visibility = "hidden";
    glassContainerDuringGameGulp3.style.visibility = "visible";
    gulpSound3.play();
    console.log("Third gulp without mouse wheel");
    toCalculateCurrentFrame = frameNumber*gearRatio;
    main.addEventListener("mousemove",updateGlassTiltWithoutWheelUntilFourthGulp);
  }
}
function updateGlassTiltWithoutWheelUntilFourthGulp() {
  mouseMovedInY = Math.round(event.clientY) - pointerToTopWas;
  differenceInY = mouseMovedInY - previousY;
  previousY = mouseMovedInY;
  if (differenceInY > 0) { console.log("down"); toCalculateCurrentFrame++; directionIsDown = true; }
  else if (differenceInY < 0) { console.log("up"); toCalculateCurrentFrame -= 0.75; directionIsDown = false; }
  else {  /*horizontal movement*/  }
  // Gear ratio
  frameNumber = Math.round(toCalculateCurrentFrame / gearRatio);
  // Limits
  if (frameNumber<0) { frameNumber = 0; toCalculateCurrentFrame = 0; }
  else if (frameNumber>51) { frameNumber = 51; toCalculateCurrentFrame = frameNumber*gearRatio; } // 51x2.5=127.5 is the RANGE in pixels » Depends on gear ratio
  // Movement and threshold points
  // With extra safety measures
  if (directionIsDown) {
    if (frameNumber > 0) {    glassContainerDuringGameGulp3.children[frameNumber-1].style.visibility = "hidden";  }
  }
  else {
    if (frameNumber < 51) {   glassContainerDuringGameGulp3.children[frameNumber+1].style.visibility = "hidden";  }
  }
  // Regardless of direction
  glassContainerDuringGameGulp3.children[frameNumber].style.visibility = "visible";

  if (frameNumber == 51) {  insistence++;  }
  if (insistence == 3) {
    main.removeEventListener("mousemove",updateGlassTiltWithoutWheelUntilFourthGulp);
    insistence = 0;
    glassContainerDuringGameGulp3.style.visibility = "hidden";
    glassContainerDuringGameGulp4.style.visibility = "visible";
    gulpSound4.play();
    console.log("Last (4th) gulp without mouse wheel");
    toCalculateCurrentFrame = frameNumber*gearRatio;
    main.addEventListener("mousemove",updateGlassTiltWithoutWheelThatNowIsEmpty);
    let winTime;  switch (parent.speedAdjustmentSetting) {  case "slow": winTime = 3000; break;  case "fast": winTime = 1000; break;  default: winTime = 2000;  }
    new SuperTimeout(function () {
      winSound.play();
      winHappenedOnDesktop();
    }, winTime);
  }
}
function updateGlassTiltWithoutWheelThatNowIsEmpty() {
  mouseMovedInY = Math.round(event.clientY) - pointerToTopWas;
  differenceInY = mouseMovedInY - previousY;
  previousY = mouseMovedInY;
  if (differenceInY > 0) { console.log("down"); toCalculateCurrentFrame++; directionIsDown = true; }
  else if (differenceInY < 0) { console.log("up"); toCalculateCurrentFrame -= 0.75; directionIsDown = false; }
  else {  /*horizontal movement*/  }
  // Gear ratio
  frameNumber = Math.round(toCalculateCurrentFrame / gearRatio);
  // Limits
  if (frameNumber<0) { frameNumber = 0; toCalculateCurrentFrame = 0; }
  else if (frameNumber>59) { frameNumber = 59; toCalculateCurrentFrame = frameNumber*gearRatio; } // 59x2.3=135.7 is the RANGE in pixels » Depends on gear ratio
  // Movement and threshold points
  // With extra safety measures
  if (directionIsDown) {
    if (frameNumber > 0) {    glassContainerDuringGameGulp4.children[frameNumber-1].style.visibility = "hidden";  }
  }
  else {
    if (frameNumber < 59) {   glassContainerDuringGameGulp4.children[frameNumber+1].style.visibility = "hidden";  }
  }
  // Regardless of direction
  glassContainerDuringGameGulp4.children[frameNumber].style.visibility = "visible";
}

function winHappenedOnDesktop() {
  /* Save progress */
  parent.savedProgress[studiedLang].lesson_DRINKWATERFROMGLASS_IsCompleted=true; // WATCH THE NAME OF THE LESSON!!!
  parent.saveJSON = JSON.stringify(parent.savedProgress); // Convert
  localStorage.setItem("memoryCard", parent.saveJSON); // Save
  goToTheNextLessonDesktop();
}

function goToTheNextLessonDesktop() { // Same with goToTheNextLessonMobile

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
