// DESKTOPS
let initialX = 0; let initialY = 0; let firstRecordedX = 0; let firstRecordedY = 0;
let immediateX, immediateY, lateX, lateY;
let currentPixelX, currentPixelY, previousPixelX, previousPixelY;
let spoonRotation = -90; let latestMouseDirection = -90; let earlierMouseDirection = -90;
let firstHoverHasHappenedAlready = false;
function getReadyToStartTheGameOnDesktops() {
  spoonHoverExactAreaOnDesktops.addEventListener("mouseenter",whatToDoWhenSpoonIsHovered);
  spoonHoverExactAreaOnDesktops.addEventListener("mouseleave",whatToDoWhenSpoonIsUnhovered);
  spoonHoverExactAreaOnDesktops.addEventListener("mousedown",whatToDoWhenSpoonIsClicked, { once: true });
  spoonHoverExactAreaOnDesktops.addEventListener("mousemove",handleTheCaseWhereArrowWasAlreadyHovering, { once: true });
}
function whatToDoWhenSpoonIsHovered() { mouseEnterTouchStartSound.play();  theLongSpoonContainerDivWithStates.classList.add("instantHighlightToTheSpoon"); firstHoverHasHappenedAlready = true; }
function whatToDoWhenSpoonIsUnhovered() { theLongSpoonContainerDivWithStates.classList.remove("instantHighlightToTheSpoon"); }
function handleTheCaseWhereArrowWasAlreadyHovering() { // We cannot expect the user to understand that he/she must leave the area and reenter to trigger the event, therefore
  if (firstHoverHasHappenedAlready) { /*Do nothing*/ } else { whatToDoWhenSpoonIsHovered(); }
}
function whatToDoWhenSpoonIsClicked(event) {
  window.addEventListener('resize', recalculateClickCorrection);
  mouseDownTouchEndSound.play();
  spoonHoverExactAreaOnDesktops.removeEventListener("mouseenter",whatToDoWhenSpoonIsHovered);
  spoonHoverExactAreaOnDesktops.removeEventListener("mouseleave",whatToDoWhenSpoonIsUnhovered);
  /*clearTimeout(to1); clearTimeout(to2); clearTimeout(to3); clearTimeout(to4);*/
  if (to1) { to1.clear(); } if (to2) { to2.clear(); } if (to3) { to3.clear(); } if (to4) { to4.clear(); }
  injectTextIntoTheHelpBoxP.innerHTML = "…";
  main.classList.remove("defaultCursor");
  main.classList.add("noCursor"); // Temporarily disable to check if everything is working properly
  firstRecordedX = event.clientX;
  firstRecordedY = event.clientY;
  calculateClickCorrection();
  // UNNECESSARY: Because it will change only once and never again »»» new SuperTimeout(function () { theLongSpoonContainerDivWithStates.style.transition = "margin-left 0.2s ease-in-out, margin-top 0.2s ease-in-out"; }, 2000);
  // ---
  immediateX = 100*event.clientX/parent.lastRecordedWindowWidth - initialX; lateX = immediateX;   // vw vh vmin
  immediateY = 100*event.clientY/parent.lastRecordedWindowHeight - initialY; lateY = immediateY;  // vw vh vmin
  currentPixelX = event.clientX; previousPixelX = currentPixelX; // px
  currentPixelY = event.clientY; previousPixelY = currentPixelY; // px
  // START THE GAME
  main.addEventListener("mousemove",updateSpoonPositionAndRotationOnDesktops);
  plateHoverAreaOnDesktops.addEventListener("mouseenter", spoonIsOverThePlate);
  plateHoverAreaOnDesktops.addEventListener("mouseleave", spoonIsAwayFromThePlate);
  plateHoverAreaOnDesktops.addEventListener("mousedown", loadTheSpoonIfIsEmptyAndIsOverThePlate);
  main.addEventListener("wheel",eatIfCan);
}

function recalculateClickCorrection() {  new SuperTimeout(function () { calculateClickCorrection(); }, 200);  }
function calculateClickCorrection() { // ONLY FOR THE VERY FIRST CLICK
  initialX = 100*firstRecordedX/parent.lastRecordedWindowWidth;  // vw
  initialY = 100*firstRecordedY/parent.lastRecordedWindowHeight; // vh
  // To be able to bring the head of the spoon to the click coordinates
  // we must first find the distance between the click and the center of the head in vmins
  // According to the webp, the center of the spoon head is at 76.284 and 54.585 wrt its container
  let clickCorrectionX=0; let clickCorrectionY=0;
  if (parent.lastRecordedWindowWidth>parent.lastRecordedWindowHeight) { // LANDSCAPE so vh equals vmin
    clickCorrectionX = initialX - (50 + (76.284 - 50)*parent.lastRecordedWindowHeight/parent.lastRecordedWindowWidth);
    clickCorrectionY = initialY - 54.585;
  } else { // PORTRAIT so vw equals vmin
    clickCorrectionX = initialX - 76.284;
    clickCorrectionY = initialY - (50 + (54.585 - 50)*parent.lastRecordedWindowWidth/parent.lastRecordedWindowHeight);
  }
  // and then move the spoon head to the INITIAL click position
  theLongSpoonContainerDivWithStates.style.marginLeft = clickCorrectionX.toFixed(3)+"vw";
  theLongSpoonContainerDivWithStates.style.marginTop  = clickCorrectionY.toFixed(3)+"vh";
}

function updateSpoonPositionAndRotationOnDesktops(event) {
   // THE POSITION OF THE SPOON
   immediateX = 100*event.clientX/parent.lastRecordedWindowWidth - initialX;
   immediateY = 100*event.clientY/parent.lastRecordedWindowHeight - initialY;
   theSquareSpoonContainerDiv.style.marginLeft = lateX.toFixed(3) + "vw";
   theSquareSpoonContainerDiv.style.marginTop = lateY.toFixed(3) + "vh";
   theSquareSpoonContainerDiv.style.perspectiveOrigin = (lateX*2 + 105).toFixed(1) + "% " + (lateY*2 + 15).toFixed(1) + "%";
   lateX = immediateX*0.04 + lateX*0.96;
   lateY = immediateY*0.04 + lateY*0.96;
   // THE ROTATION OF THE SPOON
   currentPixelX = event.clientX;
   currentPixelY = event.clientY;
   latestMouseDirection = calcAngleDegrees(currentPixelX-previousPixelX, currentPixelY-previousPixelY);
   // Handle 3 cases: NO OVERLAP - CLOCKWISE OVERLAP - COUNTERCLOCKWISE OVERLAP
   if (latestMouseDirection < earlierMouseDirection - 180) {
     latestMouseDirection += 360;
     // console.log("TURN+360");
   } else if (latestMouseDirection > earlierMouseDirection + 180) {
     latestMouseDirection -= 360;
     // console.log("TURN-360");
   } else {
     // No change zone
   }
   // console.log(latestMouseDirection.toFixed(2));
   spoonRotation = latestMouseDirection*0.02 + spoonRotation*0.98;
   theLongSpoonContainerDivWithStates.style.rotate = spoonRotation+"deg";
   // Update the past
   earlierMouseDirection = latestMouseDirection;
   previousPixelX = currentPixelX;
   previousPixelY = currentPixelY;
}

function calcAngleDegrees(x, y) {
  return ((Math.atan2(y, x) * 180 / Math.PI));
}

// GAME LOGIC
let hideTheMouseWheelInstructionTimeout = null;
function spoonIsOverThePlate() {
  if (!spoonIsLoaded) {  spoonOnPlateSound.play();  }
  canLoadTheSpoonNow = true;
  spoonIsTooFarFromPlate = false;
}
function spoonIsAwayFromThePlate() {
  if (!spoonIsLoaded) {  canLoadTheSpoonNow = false;  }
  spoonIsTooFarFromPlate = true;
}
function loadTheSpoonIfIsEmptyAndIsOverThePlate() {
  if (canLoadTheSpoonNow && !spoonIsLoaded) {
    scoopingFoodSound.play();
    spoonIsLoaded = true;
    canLoadTheSpoonNow = false; // As is already full
    theLongSpoonContainerDivWithStates.children[yumNumber].style.opacity="1";
    plateStates.children[yumNumber].style.opacity="1";
    new SuperTimeout(function () {
      // LEAVE THE UNDERLYING EMPTY SPOON VISIBLE » SO DO NOT: theLongSpoonContainerDivWithStates.children[0].style.opacity="0";
      // FADE THE PREVIOUS PLATE TO ZERO OPACITY
      plateStates.children[yumNumber-1].style.opacity="0";
    }, 2000);
  }
  // Show how to use the wheel only once
  if (!sessionStorage.mouseWheelInstruction124HasBeenShown) {
    new SuperTimeout(function () {
      showHowDesktop.style.display = "block"; showHowDesktop.classList.add("appearQuickly");
      hideTheMouseWheelInstructionTimeout = new SuperTimeout(function () { showHowDesktop.classList.remove("appearQuickly"); showHowDesktop.classList.add("disappearSlowly"); }, 6000);
      window.addEventListener("wheel",makeItDisappearSooner,{once:true});
      function makeItDisappearSooner() { showHowDesktop.classList.remove("appearQuickly"); showHowDesktop.classList.add("disappearSlowly"); }
    }, 2500);
    // --
    sessionStorage.mouseWheelInstruction124HasBeenShown = "yes";
  }
  else {
    // Do nothing
  }
}
function eatIfCan(event) {
  event.preventDefault();
  if (spoonIsLoaded && event.deltaY!=0 && !isSwallowing) { // Doesn't matter if is away from the plate
    isSwallowing = true; // Prevent multiple firing with boolean instead of once:true
    switch(yumNumber) {
      case 1:        loadFoodSound1.play();        break;
      case 2:        loadFoodSound2.play();        break;
      default:       loadFoodSound3.play();
    }

    // Bring the spoon towards camera » bringTheSpoonAnimation
    // THE NICENESS of 3D movement is achieved with perspectiveOrigin in updateSpoonPositionAndRotationOnDesktops
    theLongSpoonContainerDivWithStates.classList.add("bringTheSpoonAnimation");
    new SuperTimeout(function () {
      switch(yumNumber) {
        case 1:          firstSwallowSound.play();          break;
        case 2:          secondSwallowSound.play();         break;
        default:         thirdSwallowSound.play();
      }
      theLongSpoonContainerDivWithStates.children[yumNumber].style.opacity="0";
      yumNumber++;
      if (yumNumber == 4) {
        new SuperTimeout(function () { winHappenedOnDesktop(); }, 2500);
      }
    }, 1750);
    // Reset for the next scooping
    new SuperTimeout(function () {
      theLongSpoonContainerDivWithStates.classList.remove("bringTheSpoonAnimation");
      isSwallowing = false;
      spoonIsLoaded = false;
      if (!spoonIsTooFarFromPlate) {
        canLoadTheSpoonNow = true; // Was set to false as soon as the empty spoon was loaded
        // and if mouse pointer never left the area then user won't have to mouse-out mouse-in to trigger the correct setting
      }
    }, 5000);
  }
}

function winHappenedOnDesktop() {
  winSound.play(); console.log("Meal was successfully eaten!");
  if (canVibrate) { navigator.vibrate([100,100,800]); } // Even though desktops usually don't vibrate
  plateHoverAreaOnDesktops.removeEventListener("mouseenter", spoonIsOverThePlate);
  plateHoverAreaOnDesktops.removeEventListener("mouseleave", spoonIsAwayFromThePlate);
  plateHoverAreaOnDesktops.removeEventListener("mousedown", loadTheSpoonIfIsEmptyAndIsOverThePlate);
  main.removeEventListener("wheel",eatIfCan);
  let proceedTime;  switch (parent.speedAdjustmentSetting) {  case "slow": proceedTime = 5000; break;  case "fast": proceedTime = 3000; break;  default: proceedTime = 4000;  }
  new SuperTimeout(function () {
    main.classList.remove("noCursor");
    main.classList.add("defaultCursor");
    // Say the end of meal phrase if it exists
    say5.play(); // No need to wrap this inside a condition as it will play pure silence if there is no such custom in the studied language

    displayNoticeOrMoveAlong(proceedTime);

  }, proceedTime-1000);

}
