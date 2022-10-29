let winZoneRightLimit;
let winZoneLeftLimit;

let portraitLandscapeForceAdjuster = 1;
/*_____________*/
function startTheGameWithTabletOrPhone() {
  //console.log("starting the game for tablet or phone");

  viewportWidth = document.documentElement.clientWidth; viewportHeight = document.documentElement.clientHeight;
  if (viewportHeight>viewportWidth) {
    main.classList.add("adjustScaleOfMainOnMobiles","slightZoomIn");
    portraitLandscapeForceAdjuster = 1;
    winZoneRightLimit=9; winZoneLeftLimit=-9;
  }
  else {
    portraitLandscapeForceAdjuster = 0.5;
    winZoneRightLimit=4; winZoneLeftLimit=-6;
  }

  window.addEventListener("resize", handlePortraitLandscapeChangeF); // Update numbers if orientation is changed ,,, DON'T FORGET the small delay for Samsung Browser
  function handlePortraitLandscapeChangeF() {
    setTimeout(function () {
      viewportWidth = document.documentElement.clientWidth; viewportHeight = document.documentElement.clientHeight; // Update when resize happens
      if (viewportHeight>viewportWidth) {
        main.classList.add("adjustScaleOfMainOnMobiles","slightZoomIn");
        portraitLandscapeForceAdjuster = 1;
        winZoneRightLimit=9; winZoneLeftLimit=-9;
      }
      else {
        main.classList.remove("slightZoomIn");
        portraitLandscapeForceAdjuster = 0.5;
        winZoneRightLimit=4; winZoneLeftLimit=-6;
      }
    },50);
  }

  setTimeout(function () {
    theMovingTrayOnHandDiv.classList.add("raiseTheTrayALittle");
    glassThatCanFallDiv.classList.add("raiseTheGlassALittle");

    theMovingTrayOnHandDiv.removeChild(theMovingTrayOnHandDiv.firstElementChild); // CAUTION: firstChild lastChild counts html comments as children. Use firstElementChild instead
    theMovingTrayOnHandDiv.firstElementChild.style.display = "block"; // REMEMBER: What used to be the [1st] is now the [0th]
  },2500);

  // Let SCRIPT take control of position from vmin value in CSS
  if (viewportWidth>viewportHeight) {
    xPositionOfTray = 100 - 50*window.innerHeight/window.innerWidth; // (100vw-50vmin) Used to be 35 when it was right:15vmin and width:20vmin CHANGED TO right:0 width:50vmin
  } else {
    xPositionOfTray = 50; /* Fixed because now 100vw = 100vmin */
  }

  startReadingTilt(); // As of 2021 there may still be devices that won't read deviceorientation such as a Samsung phone »»» gamma and beta return null
  // According to tests: It could take a moment for beta and gamma to NOT RETURN null. Not sure how many milliseconds actually.
  setTimeout(function () {
    // Check Availability Of Tilt // This didn't work (misfired) summer 2022 !!!
      if (b == null && g == null) { // b & g are declared in tilt-to-steer.js // Note that (0 == null) returns false // (undefined == null) returns true
        //// Use stopPropagation instead of parent.swipeNavMenuIsLocked = false;
        const internationalErrorMsg = "↺ ❌\n↻ ❌\n:-(\n❌😞📱\n(-_-)\n" + parent.detectedBrandName;
        alert(internationalErrorMsg);
        setTimeout(function () {  parent.ayFreym.src = "/progress_chart/index.html";  },1000);
      } else {
        gameLoopForPhoneOrTablet();
        leftHalf.addEventListener("touchstart", detectIfBothThumbsAreTouching2);
        rightHalf.addEventListener("touchstart", detectIfBothThumbsAreTouching2);
      }
  },5000);
}

function detectIfBothThumbsAreTouching2() {
  if (leftIsTouching&&rightIsTouching) { return true; }
  else { return false; }
}


let rotationForceFromTouches = 0;
let rotationSpeedFromTouches = 0;
let rotationDegFromTouches = 0;
let newRotation = 0;

let xForceThrustAdjustmentForTilt = (45 + 55*howManyTries);
let releaseTheHandsEffect = 1;

function gameLoopForPhoneOrTablet() {
  //document.getElementById('devWindowDivID').innerHTML = newRotation.toFixed(1);
  /* ROTATION */
  // Do not let rotation happen unless user has both thumbs on the screen
  if (detectIfBothThumbsAreTouching2()) { // Apply force
    newRotation = (finalRightY - finalLeftY)/10;
    rotationDegFromTouches = (rotationDegFromTouches*9 + newRotation)/10;
    if (rotationDegFromTouches<-33) {  rotationDegFromTouches = -33;  }
    if (rotationDegFromTouches>33)  {  rotationDegFromTouches = 33;  }
    releaseTheHandsEffect = 1;
  } else { // Come to rest due to friction
    rotationSpeedFromTouches = rotationSpeedFromTouches - rotationSpeedFromTouches*frictionOfWrist;
    rotationDegFromTouches = Number((rotationDegFromTouches + rotationSpeedFromTouches).toFixed(2));
    if (rotationDegFromTouches<-33) {  rotationDegFromTouches = -33;  }
    if (rotationDegFromTouches>33)  {  rotationDegFromTouches = 33;  }
    if (howManyTries == 1) { releaseTheHandsEffect = 1.25; }
    else if (howManyTries == 2) { releaseTheHandsEffect = 1.125; }
    else { releaseTheHandsEffect = 1.05; }
  }

  let transformForTrayAndGlassDeg = "rotate("+rotationDegFromTouches.toFixed(1)+"deg)"; /*No need to use « toString() » because toFixed() converts it already.*/
  theMovingTrayOnHandDiv.style.transform = transformForTrayAndGlassDeg; // THIS ROTATES THE TRAY ONLY,,, NOT THE GLASS
  if (!fallingHasStarted) {
    glassThatCanFallDiv.style.transform = transformForTrayAndGlassDeg; // THIS ROTATES THE GLASS ONLY,,, NOT THE TRAY
    updateWaterAngleInsideTheGlassForPhoneOrTablet();
  }

  /* LEFT-RIGHT MOVEMENT WITH DEVICE TILT */
  xForceThrust=smoothSteerDeg*portraitLandscapeForceAdjuster; // See tilt-to-steer.js for smoothSteerDeg
  xSpeedOfTray = xSpeedOfTray + xForceThrust/xForceThrustAdjustmentForTilt - xSpeedOfTray*frictionOfAir;
  xSpeedOfTray = xSpeedOfTray*releaseTheHandsEffect;
  xSpeedOfTray = Number(xSpeedOfTray.toFixed(4));
  if (xSpeedOfTray<-22) {  xSpeedOfTray = -22;  } // Speed limit
  if (xSpeedOfTray>22)  {  xSpeedOfTray = 22;   } // Speed limit
  if (Math.abs(xSpeedOfTray)<0.0005) { xSpeedOfTray = 0; } // Fix bugginess ... Is it necessary even if we did toFixed(3) instead of toFixed(4) ??? YES! Still need it.
  xPositionOfTray = xPositionOfTray + xSpeedOfTray;
  if (xPositionOfTray<-30) {  xPositionOfTray = -30;  } // Left travel limit
  if (xPositionOfTray>100) {  xPositionOfTray = 100;  } // Right travel limit

  distanceToTheLeft = xPositionOfTray.toFixed(3) + "vw"; /*No need to use « toString() » because toFixed() converts it already.*/
  theMovingTrayOnHandDiv.style.left = distanceToTheLeft;
  calculationForEyes = Math.pow((xPositionOfTray/100), 0.2);
  if (!fallingHasStarted) {
    glassThatCanFallDiv.style.left = distanceToTheLeft;
    if (!winOrLoseHappened) {
        movingEyesDiv2.style.left = (1.6*calculationForEyes).toFixed(3) + "vmin";
    }
  } // Only until falling starts

  /* TRIGONOMETRY */
  trigonometrySin = Number((Math.sin(toRadians(rotationDegFromTouches))).toFixed(4));
  trigonometryCos = Number((Math.cos(toRadians(rotationDegFromTouches))).toFixed(4)); // CAN: Double this it to get cartoon exaggaration

  /*TILT*/  // Gravity causes movement due to angle
  if (!fallingHasStarted) { //Lavish usage of if blocks,,, yet easier to read
    horizontalForceFromGravityAtTilt = Number((trigonometrySin*gravity).toFixed(4)); // sin(0) is 0
  }

  /*SIMULATE STATIC FRICTION FOR TILT*/  //Make it feel natural or cartoonify it.
  if (!fallingHasStarted) {
    if (!glassIsMovingTilt) { // Start and do until glass stops
      if (Math.abs(rotationDegFromTouches)>3) { // Ignore force at start when there isn't enough tilt
        // Unleash the physics but do not change glass-Is-Moving until it is fast enough
        tiltedGlassSpeedX = tiltedGlassSpeedX + horizontalForceFromGravityAtTilt*1.2 - tiltedGlassSpeedX*actualAmountOfFrictionWithForces; // CAN: Do cartoon exaggaration
        tiltedGlassSpeedX = Number((tiltedGlassSpeedX).toFixed(4));
        //glassThatCanSlideDiv.innerHTML = "aha !!!!!!";
      } else { // It is now ALMOST FLAT and the glass has PROBABLY already stopped but...
        //glassThatCanSlideDiv.innerHTML = "waiting";
        // ...but,,, WELL: During tests there were occasions where it didn't stop but was very slow.
        // Perhaps there is a slight chance of smth like 0.000001 so...
        tiltedGlassSpeedX=0; // ...to fix that
      }

      if (Math.abs(tiltedGlassSpeedX)>=0.07) {
        glassIsMovingTilt = true; // Break out of [waiting for threshold level] and let special rules apply
        // How do we switch to excited eyes and unmute friction sound loop?
      }
    } else { // Glass is now moving
      // Let normal physics apply when moving fast but
      // If it is slow enough then apply extra brakes to stop -> cartoonification
      if (Math.abs(tiltedGlassSpeedX)>=0.07) {
        // Unmute slide sound loop & mute others
        // set tiltMovement="fast" Create a function handleGlassSounds() { if(tiltMovement == "fast" || thrustMovement == "fast"){} }
        tiltedGlassSpeedX = tiltedGlassSpeedX + horizontalForceFromGravityAtTilt*1.4 - tiltedGlassSpeedX*actualAmountOfFrictionWithForces; // CAN: Do cartoon exaggaration
        tiltedGlassSpeedX = Number((tiltedGlassSpeedX).toFixed(4));
        glassIsMovingTilt = true;
        //glassThatCanSlideDiv.innerHTML = tiltedGlassSpeedX +" vmin fast";
      } else if (Math.abs(tiltedGlassSpeedX)>0.015 && Math.abs(tiltedGlassSpeedX)<0.07) {
        // Unmute break sound loop & mute others
        // set tiltMovement="slowing" Create a function handleGlassSounds() { if(tiltMovement == "slowing" && thrustMovement == "slowing"){} }
        tiltedGlassSpeedX = tiltedGlassSpeedX + horizontalForceFromGravityAtTilt - tiltedGlassSpeedX*actualAmountOfFrictionWithForces*2; // CAN: Do cartoon exaggaration
        tiltedGlassSpeedX = Number((tiltedGlassSpeedX).toFixed(4));
        glassIsMovingTilt = true;
        //glassThatCanSlideDiv.innerHTML = tiltedGlassSpeedX +" SLOWING";
      } else { // Sudden stop once it is really slow
        // Mute slide and brake [looping] sounds
        tiltedGlassSpeedX=0;
        //console.log("tilt stopping happened");
        glassIsMovingTilt = false;
      }
    }
  }

  /*THRUST*/  //Movement of tray creates an opposite force
  // The force IS NOT what moves the glass wrt tray. It is the SPEED of tray that opposes the glass. So the speed now becomes the force.
  let magicVector = 1;
  if (!fallingHasStarted) {
    /*ANGULAR INFLUENCE OF THAT OPPOSITE FORCE*/
    xForceOppositionTransferredToGlass = Number((xSpeedOfTray*trigonometryCos*(-1/oppositionAdjustment)).toFixed(4)); // Minus to go in opposite direction,,, adjust denominator to taste
    magicVector = Number((1+trigonometrySin*xSpeedOfTray*(3)).toFixed(4));
    let bonus = 0.005;
    if (magicVector>1) {
      bonus=Number((magicVector*magicVector/100).toFixed(4));
    } else {
      bonus = 0.005;
    }
    actualAmountOfFrictionWithForces = frictionCoefficientTrayVsGlass*magicVector + bonus;
    if (magicVector<0.7 && !winOrLoseHappened) {
      //glassThatCanSlideDiv.innerHTML = "start free fall";
      //console.log("Fall from center");
      fallingHasStarted = true;
      movingEyesDiv2.children[0].style.visibility = "hidden"; movingEyesDiv2.children[2].style.visibility = "hidden";
      movingEyesDiv2.children[1].style.visibility = "visible";
      horizontalForceAtLastMomentOfContact = (xSpeedOfTray + tiltedGlassSpeedX + thrustedGlassSpeedX)*0.85;
    }
  }


  /*STATIC FRICTION MAKES IT FEEL NATURAL - SET A MINIMUM THRUST*/
  if (!fallingHasStarted) {
    if (!glassIsMovingThrust) {

      if (Math.abs(xForceOppositionTransferredToGlass)>0.003) { // Ignore force at start when there isn't enough thrust
        // Unleash the physics but do not change glass-Is-Moving until it is fast enough
        thrustedGlassSpeedX = thrustedGlassSpeedX + xForceOppositionTransferredToGlass*3 - thrustedGlassSpeedX*(actualAmountOfFrictionWithForces+frictionOfAirForGamepad*1.1); // CAN: Do cartoon exaggaration
        thrustedGlassSpeedX = Number((thrustedGlassSpeedX).toFixed(4));
        //glassThatCanSlideDiv.innerHTML = "moving at "+thrustedGlassSpeedX;
      } else {
        //glassThatCanSlideDiv.innerHTML = "nothing yet";
        thrustedGlassSpeedX=0;
      }
      // Decide how much speed is enough to admit that the glass is moving
      if (Math.abs(thrustedGlassSpeedX)>0.026) {
        glassIsMovingThrust = true; // Break out of [waiting for threshold level] and let special rules apply
        //glassThatCanSlideDiv.innerHTML = "enough speed";
      }

    } else { // Glass is now moving
      if (Math.abs(thrustedGlassSpeedX)>=0.025) {
        // Continue movement
        thrustedGlassSpeedX = thrustedGlassSpeedX + xForceOppositionTransferredToGlass*3 - thrustedGlassSpeedX*(actualAmountOfFrictionWithForces+frictionOfAirForGamepad*1.1); // CAN: Do cartoon exaggaration
        thrustedGlassSpeedX = Number((thrustedGlassSpeedX).toFixed(4));
        glassIsMovingThrust = true; // CAN: Use this to play foley sounds
        //glassThatCanSlideDiv.innerHTML = thrustedGlassSpeedX +" vmin";
      } else { // Sudden stop once it is really slow
        thrustedGlassSpeedX=0;
        //console.log("thrust stopping happened");
        glassIsMovingThrust = false; // CAN: Use this to play foley sounds
      }
    }
  }

  /* FINE TUNING FRICTION */
  if (magicVector>1.03 && magicVector<=1.07) {
    // glassThatCanSlideDiv.innerHTML = "Half speed";
    tiltedGlassSpeedX = tiltedGlassSpeedX/2;
    thrustedGlassSpeedX = tiltedGlassSpeedX/2;
  } else if (magicVector>1.07 && magicVector<=1.11) {
    // glassThatCanSlideDiv.innerHTML = "Quarter speed";
    tiltedGlassSpeedX = tiltedGlassSpeedX/4;
    thrustedGlassSpeedX = tiltedGlassSpeedX/4;
  } else if (magicVector>1.11) {
    // glassThatCanSlideDiv.innerHTML = "Sticky fix!";
    tiltedGlassSpeedX = 0;
    thrustedGlassSpeedX = 0;
  } else {
    // glassThatCanSlideDiv.innerHTML = "Normal movement..";
  }

  /*MOVEMENT OF GLASS ON THE TRAY*/
  if (!fallingHasStarted) {
    tiltedGlassPositionX = tiltedGlassPositionX + tiltedGlassSpeedX;
    /*____ !!! ____*/ // translateX OR marginLeft USE ONE for tilt physics AND THE OTHER FOR thrust physics
    glassThatCanSlideDiv.style.marginLeft = tiltedGlassPositionX+"vmin"; // CAN: Bypass TILT temporarily to check THRUST
    /*MOVEMENT OF GLASS ON THE TRAY DUE TO THRUST*/
    thrustedGlassPositionX = thrustedGlassPositionX + thrustedGlassSpeedX;
    /*____ !!! ____*/ // translateX OR marginLeft USE ONE for tilt physics AND THE OTHER FOR thrust physics
    glassThatCanSlideDiv.style.transform = "translateX("+thrustedGlassPositionX+"vmin)"; // CAN: Bypass THRUST temporarily to check TILT
  }

  /*FREE FALL DUE TO GRAVITY*/
  function callThisGravityAdjusterOnlyOnce() {
      let i = 0;
      aFewTimes = setInterval(function () {
        i++;
        cartoonGravity = cartoonGravity + gravity/10;
        if (i>5){ clearInterval(aFewTimes); }
      },100);
  }

  if (fallingHasStarted) {
    if (firstTimeSoAdjustGravity) {
      firstTimeSoAdjustGravity = false;
      callThisGravityAdjusterOnlyOnce();
    }
    verticalSpeedOfFallingGlass = verticalSpeedOfFallingGlass + cartoonGravity; // Free fall
    fallingGlassVerticalPosition = fallingGlassVerticalPosition + verticalSpeedOfFallingGlass;
    glassThatCanFallDiv.style.marginBottom = (fallingGlassVerticalPosition*(-1)).toFixed(2)+"vmin";
    // New friction. New forces.
    horizontalSpeedOfFallingGlass = horizontalSpeedOfFallingGlass + horizontalForceAtLastMomentOfContact - horizontalSpeedOfFallingGlass*frictionOfAirForGamepad*3.3;
    fallingGlassHorizontalPosition = fallingGlassHorizontalPosition + horizontalSpeedOfFallingGlass;
    glassThatCanFallDiv.style.marginLeft = fallingGlassHorizontalPosition+"vmin";
    horizontalForceAtLastMomentOfContact = horizontalForceAtLastMomentOfContact*0.992; // CARTOON IT  0.996
  }

  /*GLASS - FALLS OFF THE EDGE*/
  //glassThatCanSlideDiv.innerHTML = tiltedGlassPositionX + thrustedGlassPositionX; // vmins »» 0 ~ containerOfTrayOnHand-width & outerContainerOfTheGlass-width
  glassHasThisMuchSlideX = tiltedGlassPositionX + thrustedGlassPositionX;
  glassHasThisMuchSlideX = Number(glassHasThisMuchSlideX.toFixed(1));
  if (glassHasThisMuchSlideX<-10 && !fallingHasStarted && !winOrLoseHappened) {
    //console.log("Fall from left");
    fallingHasStarted = true;
    movingEyesDiv2.children[0].style.visibility = "hidden"; movingEyesDiv2.children[2].style.visibility = "hidden";
    movingEyesDiv2.children[1].style.visibility = "visible";
    fellFromLeft = true;
    glassThatCanRotateDiv.classList.add("addWhenFallingFromLeft");
    horizontalForceAtLastMomentOfContact = (xSpeedOfTray + tiltedGlassSpeedX + thrustedGlassSpeedX)*0.85;
  } else if (glassHasThisMuchSlideX>10 && !fallingHasStarted && !winOrLoseHappened) {
    //console.log("Fall from right");
    fallingHasStarted = true;
    movingEyesDiv2.children[0].style.visibility = "hidden"; movingEyesDiv2.children[2].style.visibility = "hidden";
    movingEyesDiv2.children[1].style.visibility = "visible";
    fellFromRight = true;
    glassThatCanRotateDiv.classList.add("addWhenFallingFromRight");
    horizontalForceAtLastMomentOfContact = (xSpeedOfTray + tiltedGlassSpeedX + thrustedGlassSpeedX)*0.85;
  } else {
    // Staying on tray
  }

  /*EXCLAMATION SOUNDS AND WINNING CONDITION*/
  if (!fallingHasStarted) {
    /*YOU MUST SLOW DOWN!*/
    //document.getElementById('devWindowDivID').innerHTML = xPositionOfTray.toFixed(1);
    if (xPositionOfTray>6 && Math.abs(xSpeedOfTray)> 0.8 && canNowPlayAnExclamation) { // max speed is ???
      canNowPlayAnExclamation = false;
      pictogramDiv2.children[2].classList.add("fadeIn"); setTimeout(function(){  pictogramDiv2.children[2].classList.remove("fadeIn");  },601);
      pictogramDiv2.children[2].style.display = "block"; // Race car and snail 4400ms loop
      setTimeout(function(){  pictogramDiv2.children[2].classList.add("fadeOut");  },3799);
      setTimeout(function(){  pictogramDiv2.children[2].classList.remove("fadeOut"); pictogramDiv2.children[2].style.display = "none";  },4400);
      // console.log("YAVAŞ OL");
      setTimeout(function () {  canNowPlayAnExclamation = true;  },4401);
    }
    /*YOU MUST BE CAREFUL*/
    if (Math.abs(glassHasThisMuchSlideX)>6.5 && canNowPlayAnExclamation && because_HeyWatchIt_MayPlayOnlyOnce) {
      canNowPlayAnExclamation = false;
      because_HeyWatchIt_MayPlayOnlyOnce = false;
      // Change eyes briefly
      movingEyesDiv2.children[0].style.visibility = "hidden"; movingEyesDiv2.children[1].style.visibility = "hidden";
      movingEyesDiv2.children[2].style.visibility = "visible"; // Switch to uneasy eyes
      setTimeout(function () {  movingEyesDiv2.children[2].style.visibility = "hidden"; movingEyesDiv2.children[1].style.visibility = "hidden";
      movingEyesDiv2.children[0].style.visibility = "visible";  },1500); // Back to normal eyes
      // console.log("AMAN DİKKAT");
      setTimeout(function () {  canNowPlayAnExclamation = true;  },2500);
    }
    /*WIN OR HEY YOU ARE TOO FAST!*/
    let perceivedX = xPositionOfTray+glassHasThisMuchSlideX*0.5; //
    //document.getElementById('devWindowDivID').innerHTML = perceivedX.toFixed(0);
    if (perceivedX<winZoneRightLimit && perceivedX>winZoneLeftLimit) {
      hasEnteredWinZone = true;
      //document.getElementById('devWindowDivID').innerHTML = "win zone!";
    } else {
      hasEnteredWinZone = false;
      //document.getElementById('devWindowDivID').innerHTML = shortTermMaxSpeed + " out of win zone";
    }

    if (hasEnteredWinZone && !winOrLoseHappened && shortTermMaxSpeed<0.08 && !speedLimitPenalty) {
      //console.log("WIN happened: VICTORY");
      whenWinHappens();
      pictogramDiv2.children[0].style.display = "none"; pictogramDiv2.children[1].style.display = "block"; // Now he is holding the glass
      /**/
      movingEyesDiv2.children[0].style.visibility = "hidden"; movingEyesDiv2.children[1].style.visibility = "hidden"; movingEyesDiv2.children[2].style.visibility = "hidden";
      movingEyesDiv2.children[3].style.visibility = "visible"; // Change to happy blinking eyes
      movingEyesDiv2.style.left = "0vmin"; movingEyesDiv2.style.top = "0vmin";
      glassThatCanFallDiv.parentNode.removeChild(glassThatCanFallDiv);      // remove glass
      winOrLoseHappened = true;
      canNowPlayAnExclamation = false; // No more [Be careful!, Easy!, Hey stop!] sounds even if tray moves.
      //// Use stopPropagation instead of parent.swipeNavMenuIsLocked = false; // NOTE THAT: the touch conflict is now over !!! !!! !!!

      /* Save progress */
      parent.savedProgress[studiedLang].lesson_GIVEMEWATER_IsCompleted=true; // WATCH THE NAME OF THE LESSON!!!
      parent.saveJSON = JSON.stringify(parent.savedProgress); // Convert
      localStorage.setItem("memoryCard", parent.saveJSON); // Save
    }

    //document.getElementById('devWindowDivID').innerHTML = (Math.abs(xSpeedOfTray)).toFixed(2);
    if (hasEnteredWinZone && !winOrLoseHappened && Math.abs(xSpeedOfTray)>0.9 && !speedLimitPenalty) {
      //document.getElementById('devWindowDivID').innerHTML = "2.5s -wait before can win- penalty";
      speedLimitPenalty = true; setTimeout(function () {  speedLimitPenalty = false;  },1500);
      if (because_HeyStop_MayPlayOnlyOnce && canNowPlayAnExclamation) {
        console.log("Hey! STOP");
        canNowPlayAnExclamation = false;
        because_HeyStop_MayPlayOnlyOnce = false;
        setTimeout(function () {  canNowPlayAnExclamation = true;  },1000);
      }
    }
  } /*END OF exclamations and winning*/

  /*LOSE AND RETRY*/
  if (fallingGlassVerticalPosition>49 && !winOrLoseHappened) { // in vmins
    winOrLoseHappened = true;
    //// Use stopPropagation instead of parent.swipeNavMenuIsLocked = false; // NOTE THAT: the touch conflict is now over !!! !!! !!!
    movingEyesDiv2.children[1].style.visibility = "hidden"; movingEyesDiv2.children[0].style.visibility = "hidden"; // From shocked eyes
    movingEyesDiv2.children[2].style.visibility = "visible"; // to squinting eyes
    movingEyesDiv2.classList.add("verySlowEyeMovement");
    movingEyesDiv2.style.left = "0vmin";
    movingEyesDiv2.style.top = "0vmin";

    // No stereo on mobiles
    glassBreak.play();
    if (canVibrate) {   navigator.vibrate([64,50,32,100,16,200,8,400,4,800,2]);    }
    //console.log("Şangırrr sesi");

    cartoonGravity = 0;
    verticalSpeedOfFallingGlass = 0;
    horizontalForceAtLastMomentOfContact = 0;
    horizontalSpeedOfFallingGlass = 0;
    glassThatCanRotateDiv.classList.remove("addWhenFallingFromLeft");
    glassThatCanRotateDiv.classList.remove("addWhenFallingFromRight");
    glassThatCanFallDiv.style.transform = "rotate("+0+"deg)";
    if (fellFromLeft) {
      glassThatCanRotateDiv.style.marginTop = "5vmin"; // Compensation for change in webps
      glassThatCanRotateDiv.innerHTML = ""; // Clear-empty
      glassThatCanRotateDiv.appendChild(imgGlassBreakLeft);
    } else if (fellFromRight) {
      glassThatCanRotateDiv.style.marginTop = "5vmin";  // Compensation for change in webps
      glassThatCanRotateDiv.innerHTML = ""; // Clear-empty
      glassThatCanRotateDiv.appendChild(imgGlassBreakRight);
    } else {
      // It fell from center because of too much thrust
      glassThatCanRotateDiv.style.marginTop = "5vmin";  // Compensation for change in webps
      glassThatCanRotateDiv.innerHTML = ""; // Clear-empty
      glassThatCanRotateDiv.appendChild(imgGlassBreakCenter);
    }

    setTimeout(function () {    main.classList.add("blurAllAtTheEnd");    },4500); // Blur
    setTimeout(function () {    location.reload();    },5000);
  }

  requestAnimationFrame(gameLoopForPhoneOrTablet);
}




// allGlasses is a const that exists in play_with_mouse.js
function updateWaterAngleInsideTheGlassForPhoneOrTablet() {
  for (var j = 0; j < allGlasses.length; j++) {
    allGlasses[j].style.display="none";
  }
  let i = 0;
  if (rotationDegFromTouches>=18)                            {  i=11;  allGlasses[i+11].style.display="block"; }
  else if (rotationDegFromTouches>=16  && rotationDegFromTouches<18)    {  i=10;  allGlasses[i+11].style.display="block"; }
  else if (rotationDegFromTouches>=14  && rotationDegFromTouches<16)    {  i=9;  allGlasses[i+11].style.display="block"; }
  else if (rotationDegFromTouches>=12  && rotationDegFromTouches<14)    {  i=8;  allGlasses[i+11].style.display="block"; }
  else if (rotationDegFromTouches>=10  && rotationDegFromTouches<12)    {  i=7;  allGlasses[i+11].style.display="block"; }
  else if (rotationDegFromTouches>=8   && rotationDegFromTouches<10)    {  i=6;  allGlasses[i+11].style.display="block"; }
  else if (rotationDegFromTouches>=6   && rotationDegFromTouches<8)     {  i=5;  allGlasses[i+11].style.display="block"; }
  else if (rotationDegFromTouches>=4   && rotationDegFromTouches<6)     {  i=4;  allGlasses[i+11].style.display="block"; }
  else if (rotationDegFromTouches>=3   && rotationDegFromTouches<4)     {  i=3;  allGlasses[i+11].style.display="block"; }
  else if (rotationDegFromTouches>=2   && rotationDegFromTouches<3)     {  i=2;  allGlasses[i+11].style.display="block"; }
  else if (rotationDegFromTouches>=1   && rotationDegFromTouches<2)     {  i=1;  allGlasses[i+11].style.display="block"; }
  else if (rotationDegFromTouches>=-1  && rotationDegFromTouches<1)     {  i=0;  allGlasses[i+11].style.display="block"; }
  else if (rotationDegFromTouches>-2   && rotationDegFromTouches<=-1 )  {  i=-1; allGlasses[i+11].style.display="block";  }
  else if (rotationDegFromTouches>-3   && rotationDegFromTouches<=-2 )  {  i=-2; allGlasses[i+11].style.display="block";  }
  else if (rotationDegFromTouches>-4   && rotationDegFromTouches<=-3 )  {  i=-3; allGlasses[i+11].style.display="block";  }
  else if (rotationDegFromTouches>-6   && rotationDegFromTouches<=-4 )  {  i=-4; allGlasses[i+11].style.display="block";  }
  else if (rotationDegFromTouches>-8   && rotationDegFromTouches<=-6 )  {  i=-5; allGlasses[i+11].style.display="block";  }
  else if (rotationDegFromTouches>-10  && rotationDegFromTouches<=-8 )  {  i=-6; allGlasses[i+11].style.display="block";  }
  else if (rotationDegFromTouches>-12  && rotationDegFromTouches<=-10)  {  i=-7; allGlasses[i+11].style.display="block";  }
  else if (rotationDegFromTouches>-14  && rotationDegFromTouches<=-12)  {  i=-8; allGlasses[i+11].style.display="block";  }
  else if (rotationDegFromTouches>-16  && rotationDegFromTouches<=-14)  {  i=-9; allGlasses[i+11].style.display="block";  }
  else if (rotationDegFromTouches>-18  && rotationDegFromTouches<=-16)  {  i=-10; allGlasses[i+11].style.display="block";  }
  else if (rotationDegFromTouches<=-18)                      {  i=-11; allGlasses[i+11].style.display="block";  }
  else {    console.log("Impossible?");    }
}
