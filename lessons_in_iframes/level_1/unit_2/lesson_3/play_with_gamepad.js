// Here we will use variables that already exist in play_with_mouse.js
// But will declare new ones when necessary



/*_____________*/
function startTheGameWithTheGamepad() {
  //console.log("starting the game with the gamepad");

  viewportWidth = document.documentElement.clientWidth; viewportHeight = document.documentElement.clientHeight;
  if (viewportWidth>viewportHeight) { vpHeightWidthVminVwConvert = viewportHeight/viewportWidth; } else { vpHeightWidthVminVwConvert = 1; } // Calculate,,, vmin to px ???

  window.addEventListener("resize", handleNewWidthAndHeightF); // Update numbers if browser window is resized
  function handleNewWidthAndHeightF() {
    setTimeout(function () {
      viewportWidth = document.documentElement.clientWidth; viewportHeight = document.documentElement.clientHeight; // Update when resize happens
      if (viewportWidth>viewportHeight) { vpHeightWidthVminVwConvert = viewportHeight/viewportWidth; } else { vpHeightWidthVminVwConvert = 1; } // Calculate,,, vmin to px ???
    },50);
  }

  theMovingTrayOnHandDiv.classList.add("raiseTheTrayALittle");
  glassThatCanFallDiv.classList.add("raiseTheGlassALittle");

  theMovingTrayOnHandDiv.removeChild(theMovingTrayOnHandDiv.firstElementChild); // CAUTION: firstChild lastChild counts html comments as children. Use firstElementChild instead
  theMovingTrayOnHandDiv.firstElementChild.style.display = "block"; // REMEMBER: What used to be the [1st] is now the [0th]
  // Let SCRIPT take control of position from vmin value in CSS
  if (viewportWidth>viewportHeight) {
    xPositionOfTray = 100 - 50*window.innerHeight/window.innerWidth; // (100vw-50vmin) Used to be 35 when it was right:15vmin and width:20vmin CHANGED TO right:0 width:50vmin
  } else {
    xPositionOfTray = 50; /* Fixed because now 100vw = 100vmin */
  }

  setTimeout(function () {
    gameLoopForGamepad();
  },1500);
}

let xForceGamepad=0;
//xSpeedOfTray xPositionOfTray  ...already exist in play_with_mouse.js
const frictionOfAirForGamepad = 0.3; /* Adjust to taste through trial&error */

let tiltForceGamepad=0; let tiltSpeedGamepad=0; let tiltDegGamepad=0;
const frictionOfWristGamepad = 0.2; /* Adjust to taste through trial&error */
// trigonometrySin trigonometryCos ...already exist in play_with_mouse.js

/* USE OTHER CONSTANTS AND VARIABLES FROM play_with_mouse.js */

function gameLoopForGamepad() {
  var gamepads = navigator.getGamepads();
  var gp = gamepads[0];
  /*HORIZONTAL MOVEMENT OF TRAY*/
  xForceGamepad = gp.axes[2];
  if (Math.abs(gp.axes[2])<0.15) { // According to tests with a 16-year-old Logitech Cordless RumblePad2 0.18 = (1 - 0.82) looks like a good threshold
    xForceGamepad = 0; // Deadzone
  } else if (gp.axes[2]>=0.15) {    // from 0.15 to 1.00
    xForceGamepad = (xForceGamepad-0.15)/0.85; Math.pow(xForceGamepad, 7); xForceGamepad=Number(xForceGamepad.toFixed(2)); // Smooth power
  } else if (gp.axes[2]<=-0.15) {  // from -0.15 to -1.00
    xForceGamepad = (xForceGamepad+0.15)/0.85; Math.pow(xForceGamepad, 7); xForceGamepad=Number(xForceGamepad.toFixed(2)); // Smooth power
  } else {
    console.log("Impossible left stick?");
  }
  //glassThatCanFallDiv.innerHTML = xForceGamepad;
  xSpeedOfTray = xSpeedOfTray + xForceGamepad - xSpeedOfTray*frictionOfAirForGamepad;
  xSpeedOfTray = Number(xSpeedOfTray.toFixed(3));
  if (Math.abs(xSpeedOfTray)<0.005) { xSpeedOfTray = 0; } // Fix bugginess ... Is it necessary even if we did toFixed(3) instead of toFixed(4) ??? YES! We still need it.
  //glassThatCanFallDiv.innerHTML = xSpeedOfTray;
  xPositionOfTray = xPositionOfTray + xSpeedOfTray/3;
  if (xPositionOfTray<-26) {  xPositionOfTray = -26;  }
  if (xPositionOfTray>101) {  xPositionOfTray = 101;  }
  //glassThatCanFallDiv.innerHTML = xPositionOfTray;
  distanceToTheLeft = xPositionOfTray.toFixed(3) + "vw"; /*No need to use « toString() » because toFixed() converts it already.*/
  theMovingTrayOnHandDiv.style.left = distanceToTheLeft;
  calculationForEyes = Math.pow((xPositionOfTray/100), 0.2);
  if (!fallingHasStarted) {
    glassThatCanFallDiv.style.left = distanceToTheLeft;
    if (!winOrLoseHappened) {
      movingEyesDiv2.style.left = (1.6*calculationForEyes).toFixed(3) + "vmin";
    }
  } // Only until falling starts

  /*ROTATION OF THE WRIST*/
  tiltForceGamepad = gp.axes[0];
  if (Math.abs(gp.axes[0])<0.15) {
    tiltForceGamepad = 0; // Deadzone
  } else if (gp.axes[0]>=0.15) {
    tiltForceGamepad = (tiltForceGamepad-0.15)/0.85; Math.pow(tiltForceGamepad, 7); tiltForceGamepad=Number(tiltForceGamepad.toFixed(2)); // Smooth power
  } else if (gp.axes[0]<=-0.15) {
    tiltForceGamepad = (tiltForceGamepad+0.15)/0.85; Math.pow(tiltForceGamepad, 7); tiltForceGamepad=Number(tiltForceGamepad.toFixed(2)); // Smooth power
  } else {
    console.log("Impossible right stick?");
  }
  tiltSpeedGamepad = tiltSpeedGamepad + tiltForceGamepad - tiltSpeedGamepad*frictionOfWristGamepad; //frictionOfWristGamepad
  tiltDegGamepad = Number((tiltSpeedGamepad*8).toFixed(4));
  //glassThatCanFallDiv.innerHTML = tiltDegGamepad;
  let transformForTrayAndGlassDeg = "rotate("+tiltDegGamepad.toFixed(1)+"deg)"; /*No need to use « toString() » because toFixed() converts it already.*/
  theMovingTrayOnHandDiv.style.transform = transformForTrayAndGlassDeg; // THIS ROTATES THE TRAY ONLY,,, NOT THE GLASS
  if (!fallingHasStarted) {
    glassThatCanFallDiv.style.transform = transformForTrayAndGlassDeg; // THIS ROTATES THE GLASS ONLY,,, NOT THE TRAY
    updateWaterAngleInsideTheGlassForGamepad();
  }

  /* TRIGONOMETRY */
  trigonometrySin = Number((Math.sin(toRadians(tiltDegGamepad))).toFixed(4));
  trigonometryCos = Number((Math.cos(toRadians(tiltDegGamepad))).toFixed(4)); // CAN: Double this it to get cartoon exaggaration

  /*TILT*/  // Gravity causes movement due to angle
  if (!fallingHasStarted) { //Lavish usage of if blocks,,, yet easier to read
    horizontalForceFromGravityAtTilt = Number((trigonometrySin*gravity).toFixed(4)); // sin(0) is 0
  }

  /*SIMULATE STATIC FRICTION FOR TILT*/  //Make it feel natural or cartoonify it.
  if (!fallingHasStarted) {
    if (!glassIsMovingTilt) { // Start and do until glass stops
      if (Math.abs(tiltDegGamepad)>3) { // Ignore force at start when there isn't enough tilt
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

  //glassThatCanSlideDiv.innerHTML = xForceOppositionTransferredToGlass; // Have used this to find the nicest threshold.
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
    if (xPositionOfTray>22 && Math.abs(xSpeedOfTray)> 3 && canNowPlayAnExclamation) { // max speed is about 3.3
      canNowPlayAnExclamation = false;
      pictogramDiv2.children[2].classList.add("fadeIn"); setTimeout(function(){  pictogramDiv2.children[2].classList.remove("fadeIn");  },601);
      pictogramDiv2.children[2].style.display = "block"; // Race car and snail 4400ms loop
      setTimeout(function(){  pictogramDiv2.children[2].classList.add("fadeOut");  },3799);
      setTimeout(function(){  pictogramDiv2.children[2].classList.remove("fadeOut"); pictogramDiv2.children[2].style.display = "none";  },4400);
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
    let perceivedX = xPositionOfTray+glassHasThisMuchSlideX*vpHeightWidthVminVwConvert*0.75; // vw + vmin LANDSCAPE
    if (perceivedX>-5*vpHeightWidthVminVwConvert && perceivedX<10*vpHeightWidthVminVwConvert) {
      hasEnteredWinZone = true;
      //console.log("win zone!");
    } else {
      hasEnteredWinZone = false;
    }

    if (hasEnteredWinZone && !winOrLoseHappened && shortTermMaxSpeed<1.2 && !speedLimitPenalty) {
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


      /* Save progress */
      parent.savedProgress[studiedLang].lesson_GIVEMEWATER_IsCompleted=true; // WATCH THE NAME OF THE LESSON!!!
      parent.saveJSON = JSON.stringify(parent.savedProgress); // Convert
      localStorage.setItem("memoryCard", parent.saveJSON); // Save
    }
    if (hasEnteredWinZone && !winOrLoseHappened && Math.abs(xSpeedOfTray)>2.5 && !speedLimitPenalty) {
      // console.log("penalty speed: "+ Math.abs(xSpeedOfTray) );
      speedLimitPenalty = true; setTimeout(function () {  speedLimitPenalty = false;  },2500);
      if (because_HeyStop_MayPlayOnlyOnce && canNowPlayAnExclamation) {
        console.log("Hey! STOP");
        canNowPlayAnExclamation = false;
        because_HeyStop_MayPlayOnlyOnce = false;
        /*sound.onend -> canNowPlayAnExclamation = true;*/  setTimeout(function () {  canNowPlayAnExclamation = true;  },1000);
      }
    }
  } /*END OF exclamations and winning*/

  soundPanningFromXPosition = (xPositionOfTray-37.5)/50;
  //document.getElementById('devWindowDivID').innerHTML = soundPanningFromXPosition.toFixed(2);
  /*LOSE AND RETRY*/
  if (fallingGlassVerticalPosition>49 && !winOrLoseHappened) { // in vmins
    winOrLoseHappened = true;
    movingEyesDiv2.children[1].style.visibility = "hidden"; movingEyesDiv2.children[0].style.visibility = "hidden"; // From shocked eyes
    movingEyesDiv2.children[2].style.visibility = "visible"; // to squinting eyes
    movingEyesDiv2.classList.add("verySlowEyeMovement");
    movingEyesDiv2.style.left = "0vmin";
    movingEyesDiv2.style.top = "0vmin";

    if (soundPanningFromXPosition<-1) {    soundPanningFromXPosition = -1;    }
    else if (soundPanningFromXPosition>1) {     soundPanningFromXPosition = 1;    }
    glassBreak.stereo(soundPanningFromXPosition); glassBreak.play();
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


  requestAnimationFrame(gameLoopForGamepad);
}



// allGlasses is a const that exists in play_with_mouse.js
function updateWaterAngleInsideTheGlassForGamepad() {
  for (var j = 0; j < allGlasses.length; j++) {
    allGlasses[j].style.display="none";
  }
  let i = 0;
  if (tiltDegGamepad>=18)                            {  i=11;  allGlasses[i+11].style.display="block"; }
  else if (tiltDegGamepad>=16  && tiltDegGamepad<18)    {  i=10;  allGlasses[i+11].style.display="block"; }
  else if (tiltDegGamepad>=14  && tiltDegGamepad<16)    {  i=9;  allGlasses[i+11].style.display="block"; }
  else if (tiltDegGamepad>=12  && tiltDegGamepad<14)    {  i=8;  allGlasses[i+11].style.display="block"; }
  else if (tiltDegGamepad>=10  && tiltDegGamepad<12)    {  i=7;  allGlasses[i+11].style.display="block"; }
  else if (tiltDegGamepad>=8   && tiltDegGamepad<10)    {  i=6;  allGlasses[i+11].style.display="block"; }
  else if (tiltDegGamepad>=6   && tiltDegGamepad<8)     {  i=5;  allGlasses[i+11].style.display="block"; }
  else if (tiltDegGamepad>=4   && tiltDegGamepad<6)     {  i=4;  allGlasses[i+11].style.display="block"; }
  else if (tiltDegGamepad>=3   && tiltDegGamepad<4)     {  i=3;  allGlasses[i+11].style.display="block"; }
  else if (tiltDegGamepad>=2   && tiltDegGamepad<3)     {  i=2;  allGlasses[i+11].style.display="block"; }
  else if (tiltDegGamepad>=1   && tiltDegGamepad<2)     {  i=1;  allGlasses[i+11].style.display="block"; }
  else if (tiltDegGamepad>=-1  && tiltDegGamepad<1)     {  i=0;  allGlasses[i+11].style.display="block"; }
  else if (tiltDegGamepad>-2   && tiltDegGamepad<=-1 )  {  i=-1; allGlasses[i+11].style.display="block";  }
  else if (tiltDegGamepad>-3   && tiltDegGamepad<=-2 )  {  i=-2; allGlasses[i+11].style.display="block";  }
  else if (tiltDegGamepad>-4   && tiltDegGamepad<=-3 )  {  i=-3; allGlasses[i+11].style.display="block";  }
  else if (tiltDegGamepad>-6   && tiltDegGamepad<=-4 )  {  i=-4; allGlasses[i+11].style.display="block";  }
  else if (tiltDegGamepad>-8   && tiltDegGamepad<=-6 )  {  i=-5; allGlasses[i+11].style.display="block";  }
  else if (tiltDegGamepad>-10  && tiltDegGamepad<=-8 )  {  i=-6; allGlasses[i+11].style.display="block";  }
  else if (tiltDegGamepad>-12  && tiltDegGamepad<=-10)  {  i=-7; allGlasses[i+11].style.display="block";  }
  else if (tiltDegGamepad>-14  && tiltDegGamepad<=-12)  {  i=-8; allGlasses[i+11].style.display="block";  }
  else if (tiltDegGamepad>-16  && tiltDegGamepad<=-14)  {  i=-9; allGlasses[i+11].style.display="block";  }
  else if (tiltDegGamepad>-18  && tiltDegGamepad<=-16)  {  i=-10; allGlasses[i+11].style.display="block";  }
  else if (tiltDegGamepad<=-18)                      {  i=-11; allGlasses[i+11].style.display="block";  }
  else {    console.log("Impossible?");    }
}
