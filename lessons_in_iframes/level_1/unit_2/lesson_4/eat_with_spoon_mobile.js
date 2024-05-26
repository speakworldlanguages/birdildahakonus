// MOBILES
let initialDistanceToLeft = 0; let initialDistanceToTop = 0;
let touchmoveDistanceX = 0; let touchmoveDistanceY = 0;
let tooEarlyToPickUpAgain = false;
let isHoldingTheSpoon = false; // Which means isBeingDragged

//-
let currentTouchPositionX = 0; let currentTouchPositionY = 0;
let initialTouchRadiusX = 1; let initialTouchRadiusY = 1;
// For this game it is OK to go without calling lockOrientation()

// Prevent swipe menu if user touches somewhere near the plate
document.addEventListener('readystatechange', (e) => {
  if (e.target.readyState === 'complete') {

    // WHAT WE WANT IS: Let the chain of functions be triggered ONLY and ONLY if the touch is within the precise curved shape that exists inside the svg
    // WE CAN achieve that easily by getting the path and adding a touchstart listener to it, (not to the svg that contains the path but the path itself)
    // PROBLEM IS: We need to get finger coordinates via touchmove wherever the finger might be.
    // In Chrome we tested and saw that touchmove keeps firing even if finger leaves the boundaries of the element that it has the listener
    // BUT according to ChatGPT, Safari does not do that and no more firing of touchmove once finger leaves the element
    // ACTUAL TEXT from ChatGPT: Safari on iOS is more strict about touch events and typically stops firing touchmove events once the finger leaves the boundaries of the element that initially received the touchstart event.

    // CASE 1 - fullTouchAreaOfTheGame does not contain the svg and the elliptical div
    // THE PROBLEM IS THAT: If we add touchstart events to elements that are layered on top of fullTouchAreaOfTheGame
    // HOPING THAT if those smaller elements let propagation they will allow fullTouchAreaOfTheGame to catch the touch
    // BUT INSTEAD what they do is they create TOUCH HOLES that will allow touches to pass through fullTouchAreaOfTheGame
    // EVEN IF fullTouchAreaOfTheGame has stopPropagation which means stopPropagation does not honor z-index
    // AND YET: If we do stopPropagation for smaller elements then fullTouchAreaOfTheGame CANNOT RECEIVE THE TOUCH so touchmove won't work
    // Adding event listeners to smaller elements WON'T WORK IN EITHER CASE » With or without stopPropagation

    // CASE 2 - fullTouchAreaOfTheGame contains the svg and the elliptical div
    // As of May 2024 this case is not tested. Question: Could any scenario work with it? Answer: UNCERTAIN

    // QUESTION: Will elementFromPoint work with the precise curved path inside the svg?
    // ANSWER: NO. Too bad we cannot use elementFromPoint directly for the accurate PATH » It returns the svg itself not the path inside svg

    // THE SOLUTION THAT IS THE TRICKIEST: https://developer.mozilla.org/en-US/docs/Web/API/SVGGeometryElement/isPointInFill
    // Use isPointInFill() without coordinates being broken by css when width and height in pixels are overridden by values in vmins

    // May 2024 UPDATE: Will try using mobileTouchAreaID (fullTouchAreaOfTheGame) div for RECEIVING AND HANDLING ALL TOUCHES ALONE as well as the prevention of sliding navigation menu
    // THEREFORE: ALL LAYERS ABOVE fullTouchAreaOfTheGame must have pointer events set to NONE to let fullTouchAreaOfTheGame get all the touches
    // fullTouchAreaOfTheGame.addEventListener("touchstart",function (event) { event.preventDefault(); event.stopPropagation(); });
    // QUESTION: Is stopping propagation for touchstart enough to prevent sliding navigation menu or do we have to handle touchmove too?
    // ANSWER: touchstart is enough,,, no need to stop propagation for touchmove

  }
});

// NOTE THAT as of 2023 WE CANNOT REPLACE all touchmove events with pointerrawupdate events due to lack of browser support
// THE USAGE must be like a BONUS FEATURE that works if is available and the app should still be perfectly usable without it
function getReadyToStartTheGameOnMobiles() {

  if ('onpointerrawupdate' in window) {    window.addEventListener("pointerrawupdate",getFingerPressure);  } // NOTE: pointerrawupdate fires more frequently than touchmove
  else { /* DO NOTHING as pointerrawupdate is not supported in user's current browser */ }
  // ---
  // CAREFUL!!! iOS sensor permission can only be triggered with a touchend i.e. touchstart won't work
  // ---

  fullTouchAreaOfTheGame.addEventListener("touchstart",checkIfSpoonIsTouched); // Will be removed when finger enters HIT AREA then will be added again after animations play
  fullTouchAreaOfTheGame.addEventListener("touchmove",updateTouchCoordinatesDueToTOUCHMOVE); // Will NOT be removed!
  fullTouchAreaOfTheGame.addEventListener("touchend",updateTouchCoordinatesDueToTOUCHEND); // Will NOT be removed!
}
function updateTouchCoordinatesDueToTOUCHMOVE(event) { event.preventDefault(); event.stopPropagation();
  let touch = event.touches[0]; currentTouchPositionX = touch.clientX; currentTouchPositionY = touch.clientY;
  if (isHoldingTheSpoon) {
    whatToDoWhenSpoonIsDragged();
  }
}
function updateTouchCoordinatesDueToTOUCHEND(event) { event.preventDefault(); event.stopPropagation();
  let touch = event.changedTouches[0]; currentTouchPositionX = touch.clientX; currentTouchPositionY = touch.clientY;
}

function checkIfSpoonIsTouched(event) { event.preventDefault(); event.stopPropagation();
  let touch = event.touches[0]; currentTouchPositionX = touch.clientX; currentTouchPositionY = touch.clientY; // updateTouchCoordinates due to touchstart
  initialTouchRadiusX= event.targetTouches[0].radiusX; initialTouchRadiusY= event.targetTouches[0].radiusY; // Get the initial value to normalize it
  // -
  // Magic calculation that can do shape perfect detection which is what elementFromPoint cannot do
  let rect = svgMobileShapeForSpoon.getBoundingClientRect();
  let x = (currentTouchPositionX - rect.left) * (svgMobileShapeForSpoon.width.baseVal.value / rect.width);
  let y = (currentTouchPositionY - rect.top) * (svgMobileShapeForSpoon.height.baseVal.value / rect.height);
  if (isPointInsideSpoonPath(x, y)) {        // console.log('Touch inside the path!');
      whatToDoWhenSpoonIsTouched(); // If was necessary: We could send|pass the event as it is to the next function
  } else {        // console.log('Touch outside the path.');
  }
}
// -
function isPointInsideSpoonPath(x, y) {
    let pt = svgMobileShapeForSpoon.createSVGPoint(); // See index.html
    pt.x = x;
    pt.y = y;
    return spoonFatTouchAreaOnMobiles.isPointInFill(pt); // See eat_with_spoon.js
}


// Copied from touch-normalizer.js
function normalizeTouchDiameter(touchWidth,touchHeight) {
  return (touchWidth*touchHeight*1000000000)/Math.pow(screen.width*screen.height,2.2);
}

function getFingerPressure(event) { event.preventDefault(); //event.stopPropagation(); // Let it propagate ???
  let usefulNumber = normalizeTouchDiameter(event.width,event.height); // Range is approximately from 0 to 5 on Sony Experia and 0 to 3 on Asus Nexus
  if (isHoldingTheSpoon) {
    theLongSpoonContainerDivWithStates.style.scale = (1+usefulNumber/15).toFixed(3);
    theLongSpoonContainerDivWithStates.style.translate = (usefulNumber/2).toFixed(3) + "vmin 0 0";
  }
}

let measureSpoonHoldTimeInterval = null; let heldMilliseconds = 0;

function whatToDoWhenSpoonIsTouched() { // event.preventDefault(); event.stopPropagation();
  // May 2024 UPDATE: event handling relocated to checkIfSpoonIsTouched  » so it should be OK to remove "event"
  // --
  if (!tooEarlyToPickUpAgain) {
    isHoldingTheSpoon = true; measureSpoonHoldTimeInterval = new SuperInterval(function () { heldMilliseconds += 10; }, 10);
    mouseEnterTouchStartSound.play();
    if (canVibrate) { navigator.vibrate(12); }
    /* deprecate and use currentTouchPosition live values
    initialDistanceToLeft = event.targetTouches[0].clientX; // Record coordinates to calculate distance in touchmove
    initialDistanceToTop = event.targetTouches[0].clientY; // Record coordinates to calculate distance in touchmove
    */
    initialDistanceToLeft = currentTouchPositionX;
    initialDistanceToTop = currentTouchPositionY;

    theSquareSpoonContainerDiv.style.transition = "none"; // Reset to none BECAUSE it was set, by touchend, to "margin-left ?.??s, margin-top ?.??s"
    parent.console.log("READY FOR TOUCHMOVE");
    /* Deprecate and use is-Being-Dragged i.e. isHoldingTheSpoon
    fullTouchAreaOfTheGame.addEventListener("touchmove",whatToDoWhenSpoonIsDragged);
    */
    theLongSpoonContainerDivWithStates.style.transform = "rotate(-90deg) translate(100%,-50%)"; // See eat_with_spoon.css to find the constant transition settings
    // Looks like getBoundingClientRect yields different results on different screens for SVG area
    // let ooo = event.target.getBoundingClientRect();
    // theLongSpoonContainerDivWithStates.style.marginLeft = (initialDistanceToLeft - ooo.x - ooo.width/2).toFixed(1) +"px";
    // theLongSpoonContainerDivWithStates.style.marginTop = (initialDistanceToTop - ooo.y - ooo.height/2).toFixed(1) + "px";
    // Try a more absolute-ish way
    let iii = theSquareSpoonContainerDiv.getBoundingClientRect();
    // parent.console.log(iii.width); parent.console.log(iii.x); parent.console.log(iii.height); parent.console.log(iii.y); // Works OK
    theLongSpoonContainerDivWithStates.style.marginLeft = (initialDistanceToLeft - iii.x - iii.width*0.775).toFixed(1) +"px"; // Accroding to photoshop center of spoon is at 77.5%
    theLongSpoonContainerDivWithStates.style.marginTop = (initialDistanceToTop - iii.y - iii.height*0.545).toFixed(1) + "px"; // Accroding to photoshop center of spoon is at 54.5%
    // ---

    fullTouchAreaOfTheGame.addEventListener("touchend",whatToDoWhenSpoonTouchIsReleased,{once:true});

    // Respond to touch radius/touch diameter
    let usefulNumber = normalizeTouchDiameter(initialTouchRadiusX*2,initialTouchRadiusY*2); // Range is approximately from 0 to 5
    theLongSpoonContainerDivWithStates.style.scale = (1+usefulNumber/15).toFixed(3);
    theLongSpoonContainerDivWithStates.style.translate = (usefulNumber/2).toFixed(3) + "vmin 0 0";
    // ---
  }
}
function whatToDoWhenSpoonTouchIsReleased() { //event.preventDefault(); //event.stopPropagation();
  // May 2024 UPDATE: event handling done above
  // --
  isHoldingTheSpoon = false;
  mouseDownTouchEndSound.play();
  if (canVibrate) { navigator.vibrate(12); }
  /* deprecate and use is-Being-Dragged i.e. isHoldingTheSpoon
  fullTouchAreaOfTheGame.removeEventListener("touchmove",whatToDoWhenSpoonIsDragged);
  */
  theLongSpoonContainerDivWithStates.style.transform = "rotate(-0deg) translate(0%,-0%)";//translateY(-0%) // Reset back to initial rotation and remove finger offset
  theLongSpoonContainerDivWithStates.style.marginLeft = "0px"; // Reset back to initial position
  theLongSpoonContainerDivWithStates.style.marginTop = "0px"; // Reset back to initial position
  theSquareSpoonContainerDiv.style.transition = "margin-left 1.33s ease-out, margin-top 1.33s ease-out"; // Temporarily enable the square div's transition until touchstart resets it to none
  theSquareSpoonContainerDiv.style.marginLeft = "0px"; // Reset back to initial position if value was changed via touchmove
  theSquareSpoonContainerDiv.style.marginTop = "0px"; // Reset back to initial position if value was changed via touchmove

  // ---
  tooEarlyToPickUpAgain = true;
  if (heldMilliseconds>1500) {  tooEarlyToPickUpAgain = false;  }
  else {  new SuperTimeout(function () { tooEarlyToPickUpAgain = false; }, heldMilliseconds);  }
  heldMilliseconds = 0;
  if (measureSpoonHoldTimeInterval) { measureSpoonHoldTimeInterval.clear(); } //clearInterval(measureSpoonHoldTimeInterval);

  // Use {once:true} instead of fullTouchAreaOfTheGame.removeEventListener("touchend",whatToDoWhenSpoonTouchIsReleased);
  // ---
  theLongSpoonContainerDivWithStates.style.scale = "1"; // Reset appearance that was changed by touch pressure
  theLongSpoonContainerDivWithStates.style.translate = "0 0 0"; // Reset appearance that was changed by touch pressure
  // ---
  plateSoundIsUnleashed = true;
  // ---
}
let plateSoundIsUnleashed = true;
let elementFromPoint;

function whatToDoWhenSpoonIsDragged(event) { // event.preventDefault(); //event.stopPropagation(); // May 2024: Let it propagate ???
  // May 2024 UPDATE: Let's use currentTouchPosition values and not pass the event here
  parent.console.log("-::DRAGGING::-");
  /* deprecate and use currentTouchPosition values
  touchmoveDistanceX = event.changedTouches[0].clientX - initialDistanceToLeft;
  touchmoveDistanceY = event.changedTouches[0].clientY - initialDistanceToTop;
  */
  touchmoveDistanceX = currentTouchPositionX - initialDistanceToLeft;
  touchmoveDistanceY = currentTouchPositionY - initialDistanceToTop;
  // --
  theSquareSpoonContainerDiv.style.marginLeft = touchmoveDistanceX + "px";
  theSquareSpoonContainerDiv.style.marginTop = touchmoveDistanceY + "px";
  // Chrome introduces a delibarate ignorance about finger movement before firing the very first touchmove » must be a design choice
  if (plateSoundIsUnleashed) { // This will happen only once with the very first tiny (or not so tiny) finger movement
    spoonOnPlateSound.play(); plateSoundIsUnleashed = false;
    // TRIED AND QUIT: Used to introduce a temporary transition to make the initial movement smoother until touchmove starts firing continuously
    new SuperTimeout(function () {     canLoadTheSpoonNow = true;    }, 1800); // Until May 2024 this used to be 2400ms » Was there a solid reason for that number or was it a guesstimation?
  }

  // ---
  /* deprecate and use currentTouchPosition values
  elementFromPoint = document.elementFromPoint(event.touches[0].clientX, event.touches[0].clientY);
  */
  // ATTENTION: elementFromPoint will ignore those that are pointer-events:none
  /* deprecate MAY2024 use isPointInFill with getBoundingClientRect instead of elementFromPoint so that all touches are listened on ONE SINGLE element
  elementFromPoint = document.elementFromPoint(currentTouchPositionX, currentTouchPositionY);
  parent.console.log(elementFromPoint.id);
  */
  let rect = svgMobileShapeForPlate.getBoundingClientRect();
  let x = (currentTouchPositionX - rect.left) * (svgMobileShapeForPlate.width.baseVal.value / rect.width);
  let y = (currentTouchPositionY - rect.top) * (svgMobileShapeForPlate.height.baseVal.value / rect.height);
  if (isPointInsidePlatePath(x, y)) {        // console.log('Touch inside the path!');
      whatToDoWhenPlateIsHit(); // If was necessary: We could send|pass the event as it is to the next function
  } else {        // console.log('Touch outside the path.');
  }
  // -
  function isPointInsidePlatePath(x, y) {
      let pt = svgMobileShapeForPlate.createSVGPoint(); // See index.html
      pt.x = x;
      pt.y = y;
      return plateTouchHitAreaOnMobiles.isPointInFill(pt); // See eat_with_spoon.js
  }
  // -
  function whatToDoWhenPlateIsHit() {        if (canLoadTheSpoonNow) {    getReadyToSwallow();    }        } // HIT DETECTED
  // THE POINT OF NO RETURN
  /* deprecated as of May 2024
  if (elementFromPoint.id == "plateHoverAreaMobileID" && canLoadTheSpoonNow)
  */
  function getReadyToSwallow() { // Proceed with the scooping
      // Feels like it is better without if (canVibrate) { navigator.vibrate(12); }

      fullTouchAreaOfTheGame.removeEventListener("touchstart",checkIfSpoonIsTouched); // Do not allow touch interaction during animation play
      fullTouchAreaOfTheGame.removeEventListener("touchend",whatToDoWhenSpoonTouchIsReleased); // UNCERTAIN: Do we have to remove the listener even if {once:true} is applied

      // Since touchend won't fire, we must do all the resetting here
      isHoldingTheSpoon = false; // Set it to false now because whatToDoWhenSpoonTouchIsReleased() won't fire
      plateSoundIsUnleashed = true; // Reset so that it can play in the next round after swallowing this one
      canLoadTheSpoonNow = false;
      // Try NOT resetting scale and translate to here preserve tne appearance by last finger pressure » Instead, do it when first swallow is successful
      // So, either bringTheSpoonWithArmMovement() or swallowWithTheUnpinchGesture() must execute style.scale = "1" and style.translate = "0 0 0"
      // theLongSpoonContainerDivWithStates.style.scale = "1"; // Touch pressure
      // theLongSpoonContainerDivWithStates.style.translate = "0 0 0"; // Touch pressure
      // --
      // With touchstart longSpoon margins were changed to move the spoon to center of touch
      // But now it must go to the center of plate
      theLongSpoonContainerDivWithStates.style.transform = "rotate(-90deg) translate(0%,-0%)";
      theLongSpoonContainerDivWithStates.style.marginLeft = "-33vmin"; // See eat_with_spoon.css to find transition settings
      theLongSpoonContainerDivWithStates.style.marginTop = "7vmin"; // See eat_with_spoon.css to find transition settings

      // Extra nice animation
      new SuperTimeout(function () { theLongSpoonContainerDivWithStates.style.marginTop = "9vmin"; }, 2500);
      new SuperTimeout(function () { theLongSpoonContainerDivWithStates.style.marginTop = "11.5vmin"; }, 3000);
      new SuperTimeout(function () { theLongSpoonContainerDivWithStates.style.marginTop = "12.5vmin"; }, 3500);
      new SuperTimeout(function () { theLongSpoonContainerDivWithStates.style.marginTop = "13vmin"; }, 4000);
      new SuperTimeout(function () { theLongSpoonContainerDivWithStates.style.marginTop = "13.25vmin"; }, 4500);
      // Reset the square container to its starting position » this will undo the movement that touchmove has done
      theSquareSpoonContainerDiv.style.transition = "margin-left 1.33s ease-out, margin-top 1.33s ease-out"; // Temporarily enable transition in parent div accordance with the child div
      theSquareSpoonContainerDiv.style.marginLeft = "0px"; // Stay at the center of the plate
      theSquareSpoonContainerDiv.style.marginTop = "0px"; // Stay at the center of the plate
      // TRANSITION WILL BE OVERWRITTEN BY the next touchstart » therefore need not execute: new SuperTimeout(function () { theSquareSpoonContainerDiv.style.transition = "none"; }, 2222);

      scoop();

      // ---
      if (yumNumber == 1) {
        fullTouchAreaOfTheGame.addEventListener("touchend",handleSensorPermissions,{once:true});
      }
      else {
        // yumNumber 2 and 3
        if (motionIsNotAvailableSoWillPlayWithTouchmove) {
          fullTouchAreaOfTheGame.addEventListener("touchstart",getTouchesAndCheck);
          fullTouchAreaOfTheGame.addEventListener("touchmove",getTouchesAndCheck);
          fullTouchAreaOfTheGame.addEventListener("touchend",getTouchesAndCheck);
        } else {
          window.addEventListener("devicemotion",getAccelerationDataAndCheck);
        }
      }
      // -

  } // END OF elementFromPoint HIT DETECTED
} // END OF whatToDoWhenSpoonIsDragged


// ---
let hideInstructionTimeout = null;
function hideTabletInstruction() {  showHowTablet.classList.remove("appearQuickly"); showHowTablet.classList.add("disappearSlowly"); hideInstructionTimeout = null; }
function hidePhoneInstruction() {  showHowPhone.classList.remove("appearQuickly"); showHowPhone.classList.add("disappearSlowly"); hideInstructionTimeout = null; }
function scoop() {
  scoopingFoodSound.play();
  theLongSpoonContainerDivWithStates.children[yumNumber].style.opacity="1"; // See eat_with_spoon.css to find transition durations
  plateStates.children[yumNumber].style.opacity="1"; // See eat_with_spoon.css to find transition durations
  // ---
  new SuperTimeout(function () {
    // LEAVE THE UNDERLYING EMPTY SPOON VISIBLE » SO DO NOT: theLongSpoonContainerDivWithStates.children[0].style.opacity="0";
    // FADE THE PREVIOUS PLATE TO ZERO OPACITY
    plateStates.children[yumNumber-1].style.opacity="0";
  }, 2000);
  //---
}

// ---
let motionIsNotAvailableSoWillPlayWithTouchmove = false;
function handleSensorPermissions(event) { event.preventDefault(); //event.stopPropagation(); // May 2024: Let it propagate ??? - This fires with a touchend
  // By using {once:true} we eliminate the need to execute fullTouchAreaOfTheGame.removeEventListener("touchend",handleSensorPermissions);
  // Feature detect
  parent.console.log("Check if DeviceMotionEvent.requestPermission exists");
  if (typeof DeviceMotionEvent.requestPermission === 'function') {
    // iOS
    parent.console.log("Yes, DeviceMotionEvent.requestPermission exists");
    // unclear: CAN WE MAKE PERMISSIONS PERMANENT AND WHAT HAPPENS IF IT IS ALREADY GIVEN???
    DeviceMotionEvent.requestPermission()
      .then(permissionState => {
        if (permissionState === 'granted') { // Good and now let's test it
          testDevicemotion();
          new SuperTimeout(function () {
            showHowToMoveTheSpoonInOrderToSwallow(motionIsNotAvailableSoWillPlayWithTouchmove); // See drink_water_from_glass_mobile.js
          }, 2200);
        } else {
          motionIsNotAvailableSoWillPlayWithTouchmove = true;
          new SuperTimeout(function () {
            showHowToMoveTheSpoonInOrderToSwallow(motionIsNotAvailableSoWillPlayWithTouchmove); // See drink_water_from_glass_mobile.js
          }, 2200);
        }
      })
      .catch(parent.console.error);
  } else {
    // Android
    parent.console.log("No, DeviceMotionEvent.requestPermission does not exist");
    testDevicemotion();
    new SuperTimeout(function () {
      showHowToMoveTheSpoonInOrderToSwallow(motionIsNotAvailableSoWillPlayWithTouchmove); // See drink_water_from_glass_mobile.js
    }, 2200);
  }
}
// ---
let devicemotionHasNeverFired = true;
function testDevicemotion() {
  parent.console.log("testing devicemotion");
  window.addEventListener("devicemotion",tryToReadAcceleration,{once:true});
  function tryToReadAcceleration(event) {
    devicemotionHasNeverFired = false;
    let x = null; let y = null; let z = null;
    try {
      x = event.accelerationIncludingGravity.x; y = event.accelerationIncludingGravity.y; z = event.accelerationIncludingGravity.z;
    } catch (e) {
      motionIsNotAvailableSoWillPlayWithTouchmove = true; parent.console.log("devicemotion fired but event.accelerationIncludingGravity threw an error");
    } finally {
      if (x || y || z) {
        parent.console.log("devicemotion is working");
      } else {
        motionIsNotAvailableSoWillPlayWithTouchmove = true; parent.console.log("devicemotion fired but cannot read x y z values from the event");
      }
    }
  }
  new SuperTimeout(check, 2000);
  function check() {
    if (devicemotionHasNeverFired) {
      motionIsNotAvailableSoWillPlayWithTouchmove = true; parent.console.log("devicemotion doesn't fire at all");
      window.removeEventListener("devicemotion",tryToReadAcceleration); // Even though {once:true} was enabled
    } else {
      parent.console.log("can play the game with devicemotion");
    }
  }
}
// ---
let looksLikeMOBILEUserAlreadyKnowsHowToEat = false;
function showHowToMoveTheSpoonInOrderToSwallow(devicemotionDidNotWorkIsTrueOrFalse) {
  // Show how to use the accelerometer or how to unpinch » display only once
  // --
  if (devicemotionDidNotWorkIsTrueOrFalse) {
    // Show finger movement instruction webp
    if (deviceDetector.device == "tablet") {
      if (!sessionStorage.mobileDeviceHowToPlay124HasBeenShown && !looksLikeMOBILEUserAlreadyKnowsHowToEat) {
        showHowTablet.style.display = "block"; showHowTablet.children[0].style.display = "block";
        showHowTablet.classList.add("appearQuickly");
        hideInstructionTimeout = new SuperTimeout(hideTabletInstruction, 4444); // Webp duration is 5380 (March2023)
        sessionStorage.mobileDeviceHowToPlay124HasBeenShown = "yes"; // Create the key-value pair so that it will return true inside if()
      }
    } else { // phone
      if (!sessionStorage.mobileDeviceHowToPlay124HasBeenShown && !looksLikeMOBILEUserAlreadyKnowsHowToEat) {
        showHowPhone.style.display = "block"; showHowPhone.children[0].style.display = "block";
        showHowPhone.classList.add("appearQuickly");
        hideInstructionTimeout = new SuperTimeout(hidePhoneInstruction, 4444); // Webp duration is 5380 (March2023)
        sessionStorage.mobileDeviceHowToPlay124HasBeenShown = "yes"; // Create the key-value pair so that it will return true inside if()
      }
    }
    //---
    parent.console.log("can not use devicemotion,,, will play with touch-unpinch");
    new SuperTimeout(function () {
      fullTouchAreaOfTheGame.addEventListener("touchstart",getTouchesAndCheck);
      fullTouchAreaOfTheGame.addEventListener("touchmove",getTouchesAndCheck);
      fullTouchAreaOfTheGame.addEventListener("touchend",getTouchesAndCheck);
    }, 300);
  } else {
    // Show how to use acceleration webp
    if (deviceDetector.device == "tablet") {
      if (!sessionStorage.mobileDeviceHowToPlay124HasBeenShown && !looksLikeMOBILEUserAlreadyKnowsHowToEat) {
        showHowTablet.style.display = "block"; showHowTablet.children[1].style.display = "block";
        showHowTablet.classList.add("appearQuickly");
        hideInstructionTimeout = new SuperTimeout(hideTabletInstruction, 7500);
        sessionStorage.mobileDeviceHowToPlay124HasBeenShown = "yes"; // Create the key-value pair so that it will return true inside if()
      }
    } else { // phone
      if (!sessionStorage.mobileDeviceHowToPlay124HasBeenShown && !looksLikeMOBILEUserAlreadyKnowsHowToEat) {
        showHowPhone.style.display = "block"; showHowPhone.children[1].style.display = "block";
        showHowPhone.classList.add("appearQuickly");
        hideInstructionTimeout = new SuperTimeout(hidePhoneInstruction, 7500);
        sessionStorage.mobileDeviceHowToPlay124HasBeenShown = "yes"; // Create the key-value pair so that it will return true inside if()
      }
    }
    // ---
    parent.console.log("devicemotion is available,,, will play with movement-acceleration");
    new SuperTimeout(function () {
      window.addEventListener("devicemotion",getAccelerationDataAndCheck);
    }, 300);
  }
}

// ---------------- PLAY WITH ACCELERATION -------------
let unrestCounter = 0; let isAtRest = true;
let currentAccelerationFloorCeil = 0; let previousAccelerationOne = 0; let previousAccelerationTwo = 0; let previousAccelerationThree = 0; let previousAccelerationFour = 0;
let toIgnoreTheFirstTenReadings = 0;
let hasProbablyMovedBackwards = false; let shortWaitTimeout = null;
let firstConditionMet = false; let secondConditionMet = false; let thirdConditionMet = false; let fourthConditionMet = false;
function getAccelerationDataAndCheck(event) {
  if (toIgnoreTheFirstTenReadings <= 10) { // First few readings were observed to be crazy on Sony Experia
    toIgnoreTheFirstTenReadings++; // So we ignore them by not doing anything here (except increasing the counter)
  } else {
    // SAFE ZONE
    if (event.acceleration.z>0) {
      currentAccelerationFloorCeil = Math.floor(event.acceleration.z*10);
    } else {
      currentAccelerationFloorCeil = Math.ceil(event.acceleration.z*10);
    }
    // --------
    if ((currentAccelerationFloorCeil+previousAccelerationOne+previousAccelerationTwo+previousAccelerationThree+previousAccelerationFour)<=-2) {
      // parent.console.log("The sum of latest 5 is <=-2");
      // Possibly backward movement
      backwardMovementPreventsSuccess();
    }
    function backwardMovementPreventsSuccess() {
      hasProbablyMovedBackwards = true;
      if (!shortWaitTimeout) { // Countdown was not ticking
        shortWaitTimeout = new SuperTimeout(function () { hasProbablyMovedBackwards = false; shortWaitTimeout = null; }, 777);
        parent.console.log("Prevent success for 777ms");
      } else { // Countdown was already ticking
        if (shortWaitTimeout) {  shortWaitTimeout.clear();  } //clearTimeout(shortWaitTimeout);
        shortWaitTimeout = new SuperTimeout(function () { hasProbablyMovedBackwards = false; shortWaitTimeout = null; }, 777);
      }
    }
    // --------
    if (currentAccelerationFloorCeil>0 && previousAccelerationOne>0 && previousAccelerationTwo>0 && previousAccelerationThree>0){
      if (!hasProbablyMovedBackwards) {
        // The latest four are all positive
        parent.console.log("All latest four are at least 1");
        // Count that as success
        firstConditionMet = true;
      }
    }

    // --------
    if (Math.min(currentAccelerationFloorCeil, previousAccelerationOne, previousAccelerationTwo, previousAccelerationThree)>=0) {
      if ((currentAccelerationFloorCeil+previousAccelerationOne+previousAccelerationTwo)>=4) {
        if (!hasProbablyMovedBackwards) {
          parent.console.log("4/4 are at least ZERO and sum of latest 3 is >= 4");
          // Count that as success
          secondConditionMet = true;
        }
      }
    }
    // ----
    if ((currentAccelerationFloorCeil+previousAccelerationOne+previousAccelerationTwo+previousAccelerationThree+previousAccelerationFour)>=7) {
      parent.console.log("The sum of latest 5 is >=7");
      // Count that as success
      thirdConditionMet = true;
    }
    // --------
    if (currentAccelerationFloorCeil==0 && previousAccelerationOne==0 && previousAccelerationTwo==0 && previousAccelerationThree==0 && previousAccelerationFour==0) {
      if (!isAtRest) { parent.console.log("Is at rest"); }
      isAtRest = true;
      unrestCounter = 0;
      hasProbablyMovedBackwards = false;
    } else {
      unrestCounter++;
      // ---
      if (unrestCounter == 1) { // The very first reading after rest was negative
        if (currentAccelerationFloorCeil<0) {
          parent.console.log("First value was negative");
          backwardMovementPreventsSuccess();
        }
      }
      // ---
      if (unrestCounter>=3) {
        isAtRest = false;
        if (Math.min(currentAccelerationFloorCeil, previousAccelerationOne, previousAccelerationTwo, previousAccelerationThree, previousAccelerationFour)>=-1) {
          // The latest 5 are all at least -1
          if ((currentAccelerationFloorCeil+previousAccelerationOne+previousAccelerationTwo+previousAccelerationThree+previousAccelerationFour)>=4) {
            if (!hasProbablyMovedBackwards) {
              parent.console.log("5/5 are at least -1 AND the sum of latest 5 is >=4");
              // Count that as success
              fourthConditionMet = true;
            }
          }
        }
      }
      // There is MOVEMENT
      parent.console.log(currentAccelerationFloorCeil+" "+previousAccelerationOne+" "+previousAccelerationTwo+" "+previousAccelerationThree+" "+previousAccelerationFour);
    }

    // firstConditionMet || secondConditionMet || thirdConditionMet || fourthConditionMet
    if (firstConditionMet || secondConditionMet || thirdConditionMet || fourthConditionMet) {
      // Stop reading acceleration
      window.removeEventListener("devicemotion",getAccelerationDataAndCheck);
      // Make teacher stop talking
      /*clearTimeout(to1); clearTimeout(to2); clearTimeout(to3); clearTimeout(to4);*/
      if (to1) { to1.clear(); } if (to2) { to2.clear(); } if (to3) { to3.clear(); } if (to4) { to4.clear(); }
      injectTextIntoTheHelpBoxP.innerHTML = "…";
      // Do the move
      bringTheSpoonWithArmMovement();
      // Reset to initial values
      toIgnoreTheFirstTenReadings = 0; // Reset and get ready for the next round
      isAtRest = true; unrestCounter = 0; firstConditionMet = false; secondConditionMet = false; thirdConditionMet = false; fourthConditionMet = false;
      currentAccelerationFloorCeil = 0; previousAccelerationOne = 0; previousAccelerationTwo = 0; previousAccelerationThree = 0; previousAccelerationFour = 0;
    }
    // ---- Save the latest five values
    previousAccelerationFour = previousAccelerationThree;
    previousAccelerationThree = previousAccelerationTwo;
    previousAccelerationTwo = previousAccelerationOne;
    previousAccelerationOne = currentAccelerationFloorCeil;
  } // END OF SAFE ZONE via toIgnoreTheFirstTenReadings
} // END OF function getAccelerationDataAndCheck

function bringTheSpoonWithArmMovement() {
  looksLikeMOBILEUserAlreadyKnowsHowToEat = true;
  switch(yumNumber) {
    case 1:          loadFoodSound1.play();   if (canVibrate) { navigator.vibrate([12,60,12,60,12]); }   break;
    case 2:          loadFoodSound2.play();   if (canVibrate) { navigator.vibrate([12,60,12,60,12]); }   break;
    default:         loadFoodSound3.play();   if (canVibrate) { navigator.vibrate([12,120,12,120,12]); }
  }
  // --
  theLongSpoonContainerDivWithStates.style.transform = "rotate(-90deg) translate(0%,4vmin) translateZ(150px)";
  theSquareSpoonContainerDiv.classList.add("brightenTheSpoon");
  new SuperTimeout(function () {
    switch(yumNumber) {
      case 1:          firstSwallowSound.play();          break;
      case 2:          secondSwallowSound.play();         break;
      default:         thirdSwallowSound.play();
    }
    theLongSpoonContainerDivWithStates.children[yumNumber].style.opacity="0"; // Reveal empty spoon
    yumNumber++;
    if (yumNumber == 4) {
      new SuperTimeout(function () { winHappenedOnMobile(); }, 2500);
    } else {
      new SuperTimeout(function () {
        fullTouchAreaOfTheGame.addEventListener("touchstart",checkIfSpoonIsTouched); // Ready to repick the spoon
      }, 3000);
    }
    // ---
    // Reset the spoon
    new SuperTimeout(function () {
      theLongSpoonContainerDivWithStates.style.transform = "rotate(-0deg) translate(0%,-0%) translateZ(0px)"; // Transition values are constant at eat_with_spoon.css
      theLongSpoonContainerDivWithStates.style.marginLeft = "0px";
      theLongSpoonContainerDivWithStates.style.marginTop = "0px";
      theSquareSpoonContainerDiv.classList.remove("brightenTheSpoon");
      theSquareSpoonContainerDiv.classList.add("unbrightenTheSpoon");
      new SuperTimeout(function () { theSquareSpoonContainerDiv.classList.remove("unbrightenTheSpoon"); }, 1500);
      theLongSpoonContainerDivWithStates.style.scale = "1"; // Touch pressure needs to be reset because we've chosen not to do it when touchHasEnteredThePlateArea
      theLongSpoonContainerDivWithStates.style.translate = "0 0 0"; // Touch pressure needs to be reset because we've chosen not to do it when touchHasEnteredThePlateArea
    }, 2500);
  }, 1750);
}


// ---------------- PLAY WITH UNPINCH ----------------
let initialX1 = 0; let initialY1 = 0; let initialX2 = 1; let initialY2 = 1;
let initialDistanceBetweenTwoFingers = 0; let currentDistanceBetweenTwoFingers = 0;
let twoFingersDetected = false;
let loadFoodSoundIsUnleashed = true;
function getTouchesAndCheck(event) {  event.preventDefault(); event.stopPropagation();
  if (event.touches.length == 2) {
    // TWO FINGER GESTURE
    if (!twoFingersDetected) { // Save the initial coordinates of both fingers
      initialX1 = event.touches[0].clientX; initialY1 = event.touches[0].clientY;
      initialX2 = event.touches[1].clientX; initialY2 = event.touches[1].clientY;
      let initialDistanceSquared = Math.pow(Math.abs(initialX2 - initialX1),2) + Math.pow(Math.abs(initialY2 - initialY1),2);
      initialDistanceBetweenTwoFingers = Math.pow(initialDistanceSquared,0.5);
      // parent.console.log("initial dist " + initialDistanceBetweenTwoFingers.toFixed(2)); // Works OK
    }
    twoFingersDetected = true;
    // --
    let currentDistanceSquared = Math.pow(Math.abs(event.touches[1].clientX - event.touches[0].clientX),2) + Math.pow(Math.abs(event.touches[1].clientY - event.touches[0].clientY),2);
    currentDistanceBetweenTwoFingers = Math.pow(currentDistanceSquared,0.5);
    let movement = currentDistanceBetweenTwoFingers - initialDistanceBetweenTwoFingers;
    // parent.console.log("moved " + movement.toFixed(2)); // Works OK
    if (movement<0) {
      // If fingers get closer then renew the initialDistanceBetweenTwoFingers
      initialDistanceBetweenTwoFingers = initialDistanceBetweenTwoFingers + movement;
      movement = 0; //Lower limit for pinch-unpinch
    }
    else if (movement<75) { // Swallow threshold
      theLongSpoonContainerDivWithStates.style.transform = "rotate(-90deg) translate(0%,4vmin) translateZ("+movement*2+"px)";
      if (movement>=25 && loadFoodSoundIsUnleashed) {
        looksLikeMOBILEUserAlreadyKnowsHowToEat = true;
        switch(yumNumber) {
          case 1:        loadFoodSound1.play();        break;
          case 2:        loadFoodSound2.play();        break;
          default:       loadFoodSound3.play();
        }
        loadFoodSoundIsUnleashed = false; // Set back to true as soon as swallow happens
      }
    } else { // Threshold is passed
      // No more firings
      fullTouchAreaOfTheGame.removeEventListener("touchstart",getTouchesAndCheck);
      fullTouchAreaOfTheGame.removeEventListener("touchmove",getTouchesAndCheck);
      fullTouchAreaOfTheGame.removeEventListener("touchend",getTouchesAndCheck);
      parent.console.log("Swipe menu should be released now");
      // Make teacher stop talking
      /*clearTimeout(to1); clearTimeout(to2); clearTimeout(to3); clearTimeout(to4);*/
      if (to1) { to1.clear(); } if (to2) { to2.clear(); } if (to3) { to3.clear(); } if (to4) { to4.clear(); }
      injectTextIntoTheHelpBoxP.innerHTML = "…";
      // Swallow
      swallowWithTheUnpinchGesture();
      // -
      loadFoodSoundIsUnleashed = true;
      // Definitely reset
      initialX1 = 0; initialY1 = 0; initialX2 = 1; initialY2 = 1;
      initialDistanceBetweenTwoFingers = 0; currentDistanceBetweenTwoFingers = 0;
      twoFingersDetected = false;
    }
    // END OF TWO FINGER GESTURE
  } else { // Zero, one or three fingers
    // Reset if it is zero or one finger
    if (event.touches.length < 2) {
      initialX1 = 0; initialY1 = 0; initialX2 = 1; initialY2 = 1;
      initialDistanceBetweenTwoFingers = 0; currentDistanceBetweenTwoFingers = 0;
      twoFingersDetected = false;
    }
  }
}
// ---
function swallowWithTheUnpinchGesture() {
  looksLikeMOBILEUserAlreadyKnowsHowToEat = true;
  switch(yumNumber) {
    case 1:          firstSwallowSound.play();          break;
    case 2:          secondSwallowSound.play();         break;
    default:         thirdSwallowSound.play();
  }
  theLongSpoonContainerDivWithStates.children[yumNumber].style.opacity="0"; // Reveal empty spoon
  yumNumber++;
  if (yumNumber == 4) {
    new SuperTimeout(function () { winHappenedOnMobile(); }, 2500);
  } else {
    new SuperTimeout(function () {
      fullTouchAreaOfTheGame.addEventListener("touchstart",checkIfSpoonIsTouched); // Ready to repick the spoon
    }, 3000);
  }
  // ---
  // Reset the spoon
  new SuperTimeout(function () {
    theLongSpoonContainerDivWithStates.style.transform = "rotate(-0deg) translate(0%,-0%) translateZ(0px)"; // Transition values are constant at eat_with_spoon.css
    theLongSpoonContainerDivWithStates.style.marginLeft = "0px";
    theLongSpoonContainerDivWithStates.style.marginTop = "0px";
    theLongSpoonContainerDivWithStates.style.scale = "1"; // Touch pressure needs to be reset because we've chosen not to do it when touchHasEnteredThePlateArea
    theLongSpoonContainerDivWithStates.style.translate = "0 0 0"; // Touch pressure needs to be reset because we've chosen not to do it when touchHasEnteredThePlateArea
  }, 2500);
}

// ----------------
function winHappenedOnMobile() {
  winSound.play(); parent.console.log("Meal was successfully eaten!");
  if (canVibrate) { navigator.vibrate([0,50,60,60,700]); }
  // Speed adjustment is not available on mobiles as of 2023 but will check it anyhow (it could be enabled in the future)
  let proceedTime;  switch (parent.speedAdjustmentSetting) {  case "slow": proceedTime = 5000; break;  case "fast": proceedTime = 3000; break;  default: proceedTime = 4000;  }
  new SuperTimeout(function () {
    say5.play(); // No need to wrap this inside a condition as it will play pure silence if there is no such custom in the studied language
    displayNoticeOrMoveAlong(proceedTime); // See eat_with_spoon.js
  }, proceedTime-1000);
}
