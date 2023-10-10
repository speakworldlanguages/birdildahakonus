"use strict";
// Code written by Manheart Earthman=B. A. Bilgekılınç Topraksoy=土本 智一勇夫剛志
// UNAUTHORIZED MODIFICATION IS PROHIBITED: You may not change this file without consent
let elementFromPoint = null;
let lastHoveredElement = null;
function acceptAndHandleScreenTouches(theCardThatIsAlreadyFlipped) {

  parent.console.log("«*----Activating touch controls----*»");

  // ENHANCING UX: Let SLIDING-NAV-MENU stay usable BY LISTENIG on A DIV with height calc(100% - 40px)
  touchArea.addEventListener("touchstart",detectFingerHover);
  touchArea.addEventListener("touchmove",detectFingerHover);
  document.addEventListener("touchend",detectFingerRelease);

  // CAUTION: roundedColorCards and theCardsBackFace have pointer-events set to none so they are invisible to touches

  function detectFingerHover(event) { event.preventDefault(); event.stopPropagation();
    //parent.console.log("Touch detected... on touchArea");
    let touch = event.touches[0];
    elementFromPoint = document.elementFromPoint(touch.clientX, touch.clientY); // DON'T NEED: touch.pageX - window.pageXOffset, touch.pageY - window.pageYOffset // because there is no scrolling in window or body
    // Note that elementFromPoint will not be null anymore

    // Simulation of touchleave like mouseleave
    if (lastHoveredElement) {
      if (lastHoveredElement !== elementFromPoint) {
        if (lastHoveredElement.classList.contains("whenFingerIsOnIt")) { // theCardThatIsAlreadyFlipped DOES NOT HAVE whenFingerIsOnIt » it only has whenItIsTouched applied and colorCardFlipMobile applied
          lastHoveredElement.classList.remove("whenFingerIsOnIt");
          lastHoveredElement.classList.add("whenFingerIsOffIt"); // SIMULATE TOUCHLEAVE - Will it work without RAF? Yes, it does.
        }
        else {   } // Already unhovered » do nothing
      }
    }
    lastHoveredElement = elementFromPoint;

    // mouseenter shall not work on a card that is already flipped
    if (elementFromPoint === theCardThatIsAlreadyFlipped) { return; } // Break function execution and quit if finger is over a card that is already flipped


    // Simulation of touchenter like mouseenter
    if (elementFromPoint.classList.contains("containerForRoundedColorCards")) {
      if (elementFromPoint.classList.contains("whenFingerIsOnIt"))      { } // Already hovered » do nothing
      else {
        mouseEnterTouchStartSound.play();
        elementFromPoint.classList.remove("whenFingerIsOffIt"); // It should be OK to skip checking if it contains
        elementFromPoint.classList.add("whenFingerIsOnIt"); // SIMULATE TOUCHENTER
      }
    } else {
      // parent.console.log("That which is touched is not a color card");
    }


  }

  function detectFingerRelease(event) { // event.preventDefault(); event.stopPropagation(); // Looks like we don't need to preventDefault or stopPropagation
    // parent.console.log("Touch END detected"); // Works but touch.clientX touch.clientY had some weird inaccuracy due to an unknown reason
    lastHoveredElement = null;
    // Detect which card was chosen without touch.clientX touch.clientY
    if (theCardThatIsAlreadyFlipped) { // There exists one card that is already flipped
      if (elementFromPoint !== theCardThatIsAlreadyFlipped) { // And it is not the one that was previously flipped
        checkIfReleaseHappenedOnACard();
      } else {
        // Ignore it if user touched and released finger on a card that is already flipped
      }
    } else { // No card has been flipped yet
      checkIfReleaseHappenedOnACard();
    }
    // --
    function checkIfReleaseHappenedOnACard() {
      if (elementFromPoint.classList.contains("containerForRoundedColorCards")) {
        if (elementFromPoint.classList.contains("whenFingerIsOnIt")) {
          // At this point transform scale is 1.12
          // NOTE THAT: Without "transition:transform" this will cause an abrupt change unless another class is immediately applied to take over seamlessly
          elementFromPoint.classList.remove("whenFingerIsOnIt"); // See below to see how we make whenItIsTouched take over immediately for seamless animation

          touchArea.removeEventListener("touchstart",detectFingerHover);
          touchArea.removeEventListener("touchmove",detectFingerHover);
          document.removeEventListener("touchend",detectFingerRelease);

          whatToDoWithTheChosenCard(elementFromPoint);

          // If the chosen card is the first one of two, then we make it NOT RESPOND to touches ... until???
          // Until
          // A-) Speech Recog fails to detect the name of the color and THAT ONE CARD is reset
          // B-) Two cards don't match and the game is reset
          // C-) ?
        }
      }
    }
  } // End of detectFingerRelease

  function whatToDoWithTheChosenCard(card) { //event.preventDefault(); event.stopPropagation();
    parent.console.log("The chosen card was: " + card.id);
    mouseDownTouchEndSound.play();
    // AT THIS POINT: It is certain that whenFingerIsOnIt is removed
    // AT THIS POINT: It is uncertain if whenFingerIsOffIt is removed or not » Maybe it is and maybe it isn't
    card.classList.remove("whenFingerIsOffIt"); // We make sure it is removed now so that the animation will play when added by letTheCardGoBackToItsNormalState, see below
    card.classList.add("whenItIsTouched"); // Stops where transform is set to scale(1.12) » Completes in 250ms
    parent.console.log("z-index when touch event fired: "+card.parentNode.style.zIndex);
    // Save original zIndex to be able to revert
    const zIndexReversion = card.parentNode.style.zIndex;
    /*Not needed after bugfix: if (zIndexReversion.endsWith("00")) {  } // Already set » Do not add unnecessary zeros
    else {  }*/
    card.parentNode.style.zIndex = zIndexReversion+"0"; console.log("z-index has been changed into: "+card.parentNode.style.zIndex);
    // -
    fullVpDarkBlue.style.display = "block";
    let appearTime;
    switch (parent.speedAdjustmentSetting) {   case "slow": appearTime = 3; break; case "fast": appearTime = 1; break; default: appearTime = 2;   }
    fullVpDarkBlue.classList.add("darkenLightenBackground"); fullVpDarkBlue.style.animationDuration = String(appearTime*2)+"s"; // 4s for default speed
    new SuperTimeout(function(){ fullVpDarkBlue.style.animationPlayState = "paused"; }, appearTime*1000); // Paused at halfway » 2000ms at default speed
    // ....
    // Play teacher's voice if user has never succeeded in saying it so far
    let sayTime; let listenTime; let recognitionFailTime;
    switch (parent.speedAdjustmentSetting) {
      case "slow": sayTime = 4000; listenTime = 8000; recognitionFailTime = 15000; break;
      case "fast": sayTime = 1000; listenTime = 2000; recognitionFailTime = 7500;  break;
      default:     sayTime = 2500; listenTime = 5000; recognitionFailTime = 10000;
    }
    if (listOfSuccessfulPronunciations.includes(card.id)) {
      // Skipping teacher's say now that user was able to pronounce it at least once » challenge user to re-accomplish, this time without teacher's help
      listenTime = listenTime/2;
    } else {
      new SuperTimeout(function () {
        switch (card.id) {
          case "white":  sayWhite2.play();  break;
          case "green":  sayGreen2.play();  break;
          case "blue":   sayBlue2.play();   break;
          case "yellow": sayYellow2.play(); break;
          case "red":    sayRed2.play();    break;
          case "black":  sayBlack2.play();  break;
          default:
        }
      }, sayTime);
    }
    //-

    //-
    new SuperTimeout(function () {
      // Start speech recognition
      let eachWordArray;
      switch (card.id) {
        case "white":  if(whiteAndPossibleMisrecognitions) { eachWordArray = whiteAndPossibleMisrecognitions; }   break;
        case "green":  if(greenAndPossibleMisrecognitions) { eachWordArray = greenAndPossibleMisrecognitions; }   break;
        case "blue":   if(blueAndPossibleMisrecognitions)  { eachWordArray = blueAndPossibleMisrecognitions; }    break;
        case "yellow": if(yellowAndPossibleMisrecognitions){ eachWordArray = yellowAndPossibleMisrecognitions; }  break;
        case "red":    if(redAndPossibleMisrecognitions)   { eachWordArray = redAndPossibleMisrecognitions; }     break;
        case "black":  if(blackAndPossibleMisrecognitions) { eachWordArray = blackAndPossibleMisrecognitions; }   break;
        default:
      }

      // Let speechRecognition session either resolve or reject
      if (isAndroid) { // Apply no time limit but a retry limit
        seeIfUserIsAbleToPronounce(eachWordArray,null,2).then((response) => { _check(response); }).catch((error) => { console.error(error); }); // See js_for_speech_recognition_algorithm
        // Visual indication already exists for Android » See annyang.js onstart onend » See js_for_different_browsers_and_devices microphoneOnOffVisualIndicator
      } else { // iOS (probably) // Apply time limit similar to desktop
        seeIfUserIsAbleToPronounce(eachWordArray,recognitionFailTime).then((response) => { _check(response); }).catch((error) => { console.error(error); }); // See js_for_speech_recognition_algorithm
        // IDEA: Display countdown timer :: simulated hourglass

      }
      // ---
      /*CANCEL if (typeof startUniqueAudioInputVisualization === 'function') {
        startUniqueAudioInputVisualization(); // See js_for_microphone_input_visualization
      } else { console.warn('startUniqueAudioInputVisualization function does not exist???'); }*/
      if (typeof startStandardAudioInputVisualization === 'function') {
        startStandardAudioInputVisualization(); // See js_for_microphone_input_visualization
        // UNCOMMENT THE FOLLOWING IF the cool audiometer becomes usable on iOS or Android in the future
        // driveTheRotationOfThisWithMicVolume = card.parentNode;
      } else { console.warn('startStandardAudioInputVisualization function does not exist???'); }
      // ---
      function _check(passOrFail) {
        if (passOrFail == "pass") { flipThatCardNow(); listOfSuccessfulPronunciations.push(card.id); }
        else { letTheCardGoBackToItsNormalState();     }
        stopSpeechRecognitionSession(); // See below
        // ---
        /*CANCEL if (typeof stopUniqueAudioInputVisualization === 'function') {
          stopUniqueAudioInputVisualization(); // See js_for_microphone_input_visualization
        } else { console.warn('stopUniqueAudioInputVisualization function does not exist???'); }*/
        if (typeof stopStandardAudioInputVisualization === 'function') {
          stopStandardAudioInputVisualization(); // See js_for_microphone_input_visualization
          // See colors.css » containerForOneOfSixPerfectFitPieces
          // UNCOMMENT THE FOLLOWING IF the cool audiometer becomes usable on iOS or Android in the future
          // driveTheRotationOfThisWithMicVolume.style.transform = "translateX(0vw) translateY(0vh)" ; // Reset back to initial value so that transitions can work
          // driveTheRotationOfThisWithMicVolume = null;
        } else { console.warn('stopStandardAudioInputVisualization function does not exist???'); }
      }
      // Do these if it resolves with "pass"
      function flipThatCardNow() {
        if (!theCardThatIsAlreadyFlipped) { // Now it's time to flip the first one of the two cards
          whenCorrectColorIsUtteredForThe_FIRST_Card(card,zIndexReversion);
        } else { // Now it's time to flip the second one of the two cards and then check if they match
          whenCorrectColorIsUtteredForThe_SECOND_Card(card,zIndexReversion); // Will either «not match and fail» or «match and disappear»
        }
      }
      // Do these if it resolves with "fail"
      function letTheCardGoBackToItsNormalState() {
        failSound.play();
        // Reset the card without flipping it
        // At this point it is certain that whenItIsTouched is added so we remove it
        card.classList.remove("whenItIsTouched"); // Had final scale value at 1.12
        // At this point it is certain that whenFingerIsOnIt is removed so we don't remove it
        // Thanks to whatToDoWithTheChosenCard we know that whenFingerIsOffIt is removed, so we can safely expect that it will take over from where whenItIsTouched left » 1.12
        card.classList.add("whenFingerIsOffIt"); // Scale from 1.12 to 1 // Even though it is not a simulation of touch-leave here
        // -
        fullVpDarkBlue.onanimationend = () => {
          // Revert zIndex
          card.parentNode.style.zIndex = zIndexReversion;
          card.classList.remove("whenFingerIsOffIt"); // Reset for the next touch

          fullVpDarkBlue.classList.remove("darkenLightenBackground"); // Clean up and get ready to restart
          // Restore the event listeners
          touchArea.addEventListener("touchstart",detectFingerHover);
          touchArea.addEventListener("touchmove",detectFingerHover);
          document.addEventListener("touchend",detectFingerRelease);
          parent.console.log("touch events are restored");
          // IMPORTANT: To make sure this block is run only and only once, we deactivate the event listener
          fullVpDarkBlue.onanimationend = null;
        };
        fullVpDarkBlue.style.animationPlayState = "running"; // The darkening layer disappears
      }
      // End SpeechRecognition
      function stopSpeechRecognitionSession() {
        if (parent.annyang) { // DO NOT OMIT! Firefox and other no-speech browsers need this "if (parent.annyang)" to let the app work without Web Speech API.
            parent.annyang.removeCallback();
            if (isApple) { parent.annyang.pause(); }
            else { parent.annyang.abort(); }
            parent.console.log("Speech Recognition ended for 134 mobile");
        }
      }

    }, listenTime);

  } // End of whatToDoWithTheChosenCard


} // End of acceptAndHandleScreenTouches
