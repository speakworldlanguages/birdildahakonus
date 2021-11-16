// Replace default cursor (not the OS cursor but our own awesome arrow) with a living hand.
const handContainerDiv1st = document.createElement("DIV"); const handContainerDiv2nd = document.createElement("DIV"); const handContainerDiv3rd = document.createElement("DIV");
const handCursorImg1 = document.createElement("IMG"); const handCursorImg2 = document.createElement("IMG"); const handCursorImg3 = document.createElement("IMG");
const moveTheMouseImg = document.createElement("IMG");
/* ___VARIABLES___ */
let x0, x1, x2, y0, y1, y2, viewportWidth, viewportHeight, vpHeightWidthVminVwConvert, deadZone, aCertainAmountForCursor=0.15; // See give_me_water.css
let cancelMouseStage1LoopWithThis;
// No need to use cancelMouseStage2LoopWithThis because the last loop will end with a refresh or location change when WIN or LOSE happens.
let hasEnteredWinZone = false;
// Once "Give. Give me water. Give me water" is heard, give the user "A HAND".
function startTheGameWithTheMouse()
{
  //console.log("starting the game with the mouse");
  handCursorImg1.src = "hand_cursor.webp"; handCursorImg1.style.width = "15vmin"; handContainerDiv1st.appendChild(handCursorImg1); // See CSS and find bigHandInsteadOfArrowCursorContainer
  handCursorImg2.src = "hand_cursor.webp"; handCursorImg2.style.width = "15vmin"; handContainerDiv2nd.appendChild(handCursorImg2);
  handCursorImg3.src = "hand_cursor.webp"; handCursorImg3.style.width = "15vmin"; handContainerDiv3rd.appendChild(handCursorImg3);
  moveTheMouseImg.src = "move_the_mouse.webp";
  moveTheMouseImg.classList.add("addThisToFadeInWithSharpen"); // See give_me_water.css
  main.appendChild(moveTheMouseImg);
  // Before revealing the HAND-cursors we must get X and Y coords
  window.addEventListener("mousemove", firstMouseMovementHasHappened, { once: true }); // Prevent an unwanted appearance at the top left corner
  function firstMouseMovementHasHappened(event) {
    x0 = event.clientX;  y0 = event.clientY;
    x1 = event.clientX;  y1 = event.clientY;
    x2 = event.clientX;  y2 = event.clientY;
    moveTheMouseImg.classList.add("addThisToFadeOutWithBlur"); // See give_me_water.css
    setTimeout(function () {  main.removeChild(moveTheMouseImg);  },707);

    revealTheHandF();
  }

  function revealTheHandF() {
    handContainerDiv1st.classList.add("bigHandInsteadOfArrowCursorContainer","opacityZeroToFull");
    handContainerDiv2nd.classList.add("bigHandInsteadOfArrowCursorContainer","opacityZeroToHalf","mixBlendSoftLight");
    handContainerDiv3rd.classList.add("bigHandInsteadOfArrowCursorContainer","opacityZeroToQuarter","mixBlendSoftLight");
    document.body.appendChild(handContainerDiv3rd);
    document.body.appendChild(handContainerDiv2nd);
    document.body.appendChild(handContainerDiv1st);

    window.addEventListener("mousemove", mouseIsMovingF);
  }

  function mouseIsMovingF(event) {
    x0 = event.clientX;  y0 = event.clientY;
    setTimeout(function () {  x1 = event.clientX;  y1 = event.clientY;  },200);
    setTimeout(function () {  x2 = event.clientX;  y2 = event.clientY;  },400);
    if (x0<(window.innerWidth*0.18) || x0>(window.innerWidth-8) || y0<159 || y0>(window.innerHeight-8)) { // Height of nav menu is 140px
      handContainerDiv1st.style.visibility = "hidden"; handContainerDiv2nd.style.visibility = "hidden"; handContainerDiv3rd.style.visibility = "hidden";
    } else {
      handContainerDiv1st.style.visibility = "visible"; handContainerDiv2nd.style.visibility = "visible"; handContainerDiv3rd.style.visibility = "visible";
    }
  }

  viewportWidth = document.documentElement.clientWidth;  viewportHeight = document.documentElement.clientHeight;
  if (viewportWidth>viewportHeight) {
    vpHeightWidthVminVwConvert = viewportHeight/viewportWidth;
    deadZone = Math.round(viewportHeight*aCertainAmountForCursor);
  } else {
    vpHeightWidthVminVwConvert = 1;
    deadZone = Math.round(viewportWidth*aCertainAmountForCursor);
  } // Calculate,,, vmin to vw or px ???

  window.addEventListener("resize", handleNewWidthAndHeightF); // Update numbers if browser window is resized
  function handleNewWidthAndHeightF() {
    setTimeout(function () {
      viewportWidth = document.documentElement.clientWidth;  viewportHeight = document.documentElement.clientHeight; // Update when resize happens
      if (viewportWidth>viewportHeight) {
        vpHeightWidthVminVwConvert = viewportHeight/viewportWidth;
        deadZone = Math.round(viewportHeight*aCertainAmountForCursor);
      } else {
        vpHeightWidthVminVwConvert = 1;
        deadZone = Math.round(viewportWidth*aCertainAmountForCursor);
      } // Calculate,,, vmin to vw or px ???
    },50);
  }

  clickableArea.addEventListener("mouseenter", function () { handCursorImg1.classList.add("filterGlow"); });
  clickableArea.addEventListener("mouseleave", function () { handCursorImg1.classList.remove("filterGlow"); });
  clickableArea.addEventListener("mousedown", letTheHandStartCarryingF, { once: true })
  function letTheHandStartCarryingF() {
    //console.log("the game begins");
    theMovingTrayOnHandDiv.removeChild(theMovingTrayOnHandDiv.firstElementChild); // CAUTION: firstChild lastChild counts comments as children
    theMovingTrayOnHandDiv.firstElementChild.style.display = "block"; // REMEMBER: What used to be the [1st] is now the [0th]
    // Let SCRIPT take control of position from vmin value in CSS
    if (viewportWidth>viewportHeight) {
      xPositionOfTray = 100 - 50*window.innerHeight/window.innerWidth; // (100vw-50vmin) Used to be 35 when it was right:15vmin and width:20vmin CHANGED TO right:0 width:50vmin
    } else {
      xPositionOfTray = 50; /* Fixed because now 100vw = 100vmin */
    }
    /* Fade to zero opacity and then remove the three-hands-cursor and start the physics*/
    handContainerDiv1st.classList.add("opacityFullToZero");
    handContainerDiv2nd.classList.add("opacityHalfToZero");
    handContainerDiv3rd.classList.add("opacityQuarterToZero");
    setTimeout(function () {
      document.body.removeChild(handContainerDiv1st);
      document.body.removeChild(handContainerDiv2nd);
      document.body.removeChild(handContainerDiv3rd);
      theMovingTrayOnHandDiv.classList.add("raiseTheTrayALittle");
      glassThatCanFallDiv.classList.add("raiseTheGlassALittle");
      cancelAnimationFrame(cancelMouseStage1LoopWithThis);
    },2000);
    setTimeout(function () {  gameLoopStage2ForMouse()  },2002);


  }
  gameLoopStage1ForMouse();
}

function gameLoopStage1ForMouse() {
  handContainerDiv1st.style.left = x0+"px";  handContainerDiv1st.style.top = y0+"px";
  handContainerDiv2nd.style.left = (x0+x1)/2+"px";  handContainerDiv2nd.style.top = (y0+y1)/2+"px";
  handContainerDiv3rd.style.left = (x0+x1+x2)/3+"px";  handContainerDiv3rd.style.top = (y0+y1+y2)/3+"px";
  if (x0 > viewportWidth-deadZone) { handContainerDiv1st.style.left = viewportWidth-deadZone + "px"; }
  if (y0 > viewportHeight-deadZone) { handContainerDiv1st.style.top = viewportHeight-deadZone + "px"; }
  if (x1 > viewportWidth-deadZone) { handContainerDiv2nd.style.left = viewportWidth-deadZone + "px"; }
  if (y1 > viewportHeight-deadZone) { handContainerDiv2nd.style.top = viewportHeight-deadZone + "px"; }
  if (x2 > viewportWidth-deadZone) { handContainerDiv3rd.style.left = viewportWidth-deadZone + "px"; }
  if (y2 > viewportHeight-deadZone) { handContainerDiv3rd.style.top = viewportHeight-deadZone + "px"; }
  //console.log("Looping with requestAnimationFrame (only from start until glass is clicked)");
  cancelMouseStage1LoopWithThis = requestAnimationFrame(gameLoopStage1ForMouse);
}

var distanceToTheLeft;
var calculationForEyes;
var soundPanningFromXPosition;
var xForceThrust = 0;
let xForceThrustAdjustment = 200 + 150*howManyTries; // The game gets easier every time user fails
var xSpeedOfTray = 0;
var xPositionOfTray; // Convert right-vmin to left-vw when game starts,,, Find that in: letTheHandStartCarryingF()
const frictionOfAir = 0.25; /* Adjust to taste through trial&error */

let yForceThrust
let yForceThrustAdjustment = 240 + 280*howManyTries; // The game gets easier every time user fails
let rotationSpeedFromMouseY = 0;
let rotationDeg = 0;
const frictionOfWrist = 0.1; /* Adjust to taste through trial&error */
let trigonometrySin;
let trigonometryCos;

let xForceOppositionTransferredToGlass = 0, oppositionAdjustment = 50;
let tiltedGlassSpeedX = 0; let thrustedGlassSpeedX = 0;
let tiltedGlassPositionX = 0; let thrustedGlassPositionX = 0;
let glassHasThisMuchSlideX = 0;
const frictionCoefficientTrayVsGlass = 0.050; // No effect when falling starts
let actualAmountOfFrictionWithForces = frictionCoefficientTrayVsGlass; // initial value will change

let horizontalForceFromGravityAtTilt = 0;
let glassIsMovingTilt = false, glassIsMovingThrust = false;
let fallingHasStarted = false; // falling off the edge vs falling with loss of contact
let fellFromLeft = false; let fellFromRight = false;

const gravity = 0.07; // 0.06 is slower than real life but not too unnatural so that's good.
let verticalSpeedOfFallingGlass=0;
let fallingGlassVerticalPosition = 0;// Must think in vmins
let horizontalForceAtLastMomentOfContact;
let horizontalSpeedOfFallingGlass = 0;
let fallingGlassHorizontalPosition=0;
let firstTimeSoAdjustGravity = true;
let cartoonGravity = gravity/5;

function toRadians (angle) {  return angle * (Math.PI / 180);  }

let canNowPlayAnExclamation = true; let because_HeyWatchIt_MayPlayOnlyOnce = true; let because_HeyStop_MayPlayOnlyOnce = true;
let winOrLoseHappened = false;
let shortTermMaxSpeed = 0; let speedLimitPenalty = false;

/*This will tick all lesson long if left here,,, will probably always have enough CPU for that*/
setInterval(function () { // Also used in play_with_gamepad.js
  if (Math.abs(xSpeedOfTray)>shortTermMaxSpeed) {    shortTermMaxSpeed = Math.abs(xSpeedOfTray);  }
  else {    shortTermMaxSpeed = shortTermMaxSpeed - shortTermMaxSpeed*0.05;  }
},60);

function gameLoopStage2ForMouse() {
  /*HORIZONTAL MOVEMENT OF TRAY*/
  xForceThrust = x0-x2; // distance in 400ms
  xSpeedOfTray = xSpeedOfTray + xForceThrust/xForceThrustAdjustment - xSpeedOfTray*frictionOfAir;
  xSpeedOfTray = Number(xSpeedOfTray.toFixed(4));
  if (Math.abs(xSpeedOfTray)<0.0005) { xSpeedOfTray = 0; } // Fix bugginess ... Is it necessary even if we did toFixed(3) instead of toFixed(4) ??? YES! Still need it.
  xPositionOfTray = xPositionOfTray + xSpeedOfTray;
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
  yForceThrust = y0-y1; //distance in 200ms
  rotationSpeedFromMouseY = rotationSpeedFromMouseY + yForceThrust/yForceThrustAdjustment - rotationSpeedFromMouseY*frictionOfWrist;
  rotationDeg = Number((rotationDeg - rotationSpeedFromMouseY).toFixed(4));
  if (rotationDeg<-30) {    rotationDeg=-30;  } else if (rotationDeg>30) {  rotationDeg=30;  } else {  /*Can rotate*/  }
  //glassThatCanSlideDiv.innerHTML = rotationDeg;
  let transformForTrayAndGlassDeg = "rotate("+rotationDeg.toFixed(1)+"deg)"; /*No need to use « toString() » because toFixed() converts it already.*/
  theMovingTrayOnHandDiv.style.transform = transformForTrayAndGlassDeg; // THIS ROTATES THE TRAY ONLY,,, NOT THE GLASS
  if (!fallingHasStarted) {
    glassThatCanFallDiv.style.transform = transformForTrayAndGlassDeg; // THIS ROTATES THE GLASS ONLY,,, NOT THE TRAY
    updateWaterAngleInsideTheGlassForMouse();
  }

  /* TRIGONOMETRY */
  trigonometrySin = Number((Math.sin(toRadians(rotationDeg))).toFixed(4));
  trigonometryCos = Number((Math.cos(toRadians(rotationDeg))).toFixed(4)); // CAN: Double this it to get cartoon exaggaration

  /*TILT*/  // Gravity causes movement due to angle
  if (!fallingHasStarted) { //Lavish usage of if blocks,,, yet easier to read
    horizontalForceFromGravityAtTilt = Number((trigonometrySin*gravity).toFixed(4)); // sin(0) is 0
  }

  /*SIMULATE STATIC FRICTION FOR TILT*/  //Make it feel natural or cartoonify it.
  if (!fallingHasStarted) {
    if (!glassIsMovingTilt) { // Start and do until glass stops
      if (Math.abs(rotationDeg)>3) { // Ignore force at start when there isn't enough tilt
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
  // The mouse force IS NOT what moves the glass wrt tray. It is the SPEED of tray that opposes the glass. So the speed now becomes the force.
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
    //glassThatCanSlideDiv.innerHTML = magicVector.toFixed(4);
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
        thrustedGlassSpeedX = thrustedGlassSpeedX + xForceOppositionTransferredToGlass*3 - thrustedGlassSpeedX*(actualAmountOfFrictionWithForces+frictionOfAir); // CAN: Do cartoon exaggaration
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
        thrustedGlassSpeedX = thrustedGlassSpeedX + xForceOppositionTransferredToGlass*3 - thrustedGlassSpeedX*(actualAmountOfFrictionWithForces+frictionOfAir); // CAN: Do cartoon exaggaration
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
    horizontalSpeedOfFallingGlass = horizontalSpeedOfFallingGlass + horizontalForceAtLastMomentOfContact - horizontalSpeedOfFallingGlass*frictionOfAir*3;
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
    //sessionStorage.iFrameLoadHasHappenedThisManyTimes see js_for_all_iframed_lesson_htmls.js
    /*YOU MUST SLOW DOWN!*/
    if (xPositionOfTray>22 && Math.abs(xSpeedOfTray)> 0.88 && canNowPlayAnExclamation) {
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

    if (hasEnteredWinZone && !winOrLoseHappened && shortTermMaxSpeed<0.075 && !speedLimitPenalty) {
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
      savedProgress[studiedLang].lesson_GIVEMEWATER_IsCompleted=true; // WATCH THE NAME OF THE LESSON!!!
      saveJSON = JSON.stringify(savedProgress); // Convert
      localStorage.setItem("memoryCard", saveJSON); // Save
    }
    if (hasEnteredWinZone && !winOrLoseHappened && Math.abs(xSpeedOfTray)>0.35 && !speedLimitPenalty) {
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


  requestAnimationFrame(gameLoopStage2ForMouse); // No need to use cancelMouseStage2LoopWithThis because this loop will end with location change when WIN or LOSE happens.
}



const allGlasses = glassThatCanRotateDiv.children;
function updateWaterAngleInsideTheGlassForMouse() {
  for (var j = 0; j < allGlasses.length; j++) {
    allGlasses[j].style.display="none";
  }
  let i = 0;
  if (rotationDeg>=18)                            {  i=11;  allGlasses[i+11].style.display="block"; }
  else if (rotationDeg>=16  && rotationDeg<18)    {  i=10;  allGlasses[i+11].style.display="block"; }
  else if (rotationDeg>=14  && rotationDeg<16)    {  i=9;  allGlasses[i+11].style.display="block"; }
  else if (rotationDeg>=12  && rotationDeg<14)    {  i=8;  allGlasses[i+11].style.display="block"; }
  else if (rotationDeg>=10  && rotationDeg<12)    {  i=7;  allGlasses[i+11].style.display="block"; }
  else if (rotationDeg>=8   && rotationDeg<10)    {  i=6;  allGlasses[i+11].style.display="block"; }
  else if (rotationDeg>=6   && rotationDeg<8)     {  i=5;  allGlasses[i+11].style.display="block"; }
  else if (rotationDeg>=4   && rotationDeg<6)     {  i=4;  allGlasses[i+11].style.display="block"; }
  else if (rotationDeg>=3   && rotationDeg<4)     {  i=3;  allGlasses[i+11].style.display="block"; }
  else if (rotationDeg>=2   && rotationDeg<3)     {  i=2;  allGlasses[i+11].style.display="block"; }
  else if (rotationDeg>=1   && rotationDeg<2)     {  i=1;  allGlasses[i+11].style.display="block"; }
  else if (rotationDeg>=-1  && rotationDeg<1)     {  i=0;  allGlasses[i+11].style.display="block"; }
  else if (rotationDeg>-2   && rotationDeg<=-1 )  {  i=-1; allGlasses[i+11].style.display="block";  }
  else if (rotationDeg>-3   && rotationDeg<=-2 )  {  i=-2; allGlasses[i+11].style.display="block";  }
  else if (rotationDeg>-4   && rotationDeg<=-3 )  {  i=-3; allGlasses[i+11].style.display="block";  }
  else if (rotationDeg>-6   && rotationDeg<=-4 )  {  i=-4; allGlasses[i+11].style.display="block";  }
  else if (rotationDeg>-8   && rotationDeg<=-6 )  {  i=-5; allGlasses[i+11].style.display="block";  }
  else if (rotationDeg>-10  && rotationDeg<=-8 )  {  i=-6; allGlasses[i+11].style.display="block";  }
  else if (rotationDeg>-12  && rotationDeg<=-10)  {  i=-7; allGlasses[i+11].style.display="block";  }
  else if (rotationDeg>-14  && rotationDeg<=-12)  {  i=-8; allGlasses[i+11].style.display="block";  }
  else if (rotationDeg>-16  && rotationDeg<=-14)  {  i=-9; allGlasses[i+11].style.display="block";  }
  else if (rotationDeg>-18  && rotationDeg<=-16)  {  i=-10; allGlasses[i+11].style.display="block";  }
  else if (rotationDeg<=-18)                      {  i=-11; allGlasses[i+11].style.display="block";  }
  else {    console.log("Impossible?");    }
}
