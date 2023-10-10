"use strict";
// Code written by Manheart Earthman=B. A. Bilgekılınç Topraksoy=土本 智一勇夫剛志
// UNAUTHORIZED MODIFICATION IS PROHIBITED: You may not change this file without consent
function acceptAndHandleMouseClicks(theCardThatIsAlreadyFlipped) {


  let counter = 0;
  allCards.forEach((element) => { // Those who have containerForRoundedColorCards
    if (element != theCardThatIsAlreadyFlipped) {
      element.addEventListener("mouseenter",addClassWhenHovered); // ENHANCE UX with mousemove
      element.addEventListener("mousemove",addClassWhenHovered); // ENHANCING UX by combining mouseenter+mousemove
      element.addEventListener("mouseleave",removeClassWhenUnhovered);
      element.addEventListener("mousedown", niceClick,{once:true});
      counter++;
      console.log("mouse events are ready for " + counter + " elements");
    }
  });


  function addClassWhenHovered(event) {
    const card = event.target;
    if (card.classList.contains("scaleUp")) { } // Already hovered » do nothing
    else {  mouseEnterTouchStartSound.play(); card.classList.add("scaleUp");  }
  }
  function removeClassWhenUnhovered(event) {  event.target.classList.remove("scaleUp");  } // WARNING: scaleUp must be removed manually after mousedown

  function niceClick(event) {
    mouseDownTouchEndSound.play();
    const card = event.target;
    // POSSIBLE CASE: WHAT IF NEITHER mouseenter NOR mousemove HAPPENED SO FAR » Handle that one too
    if (card.classList.contains("scaleUp")) { } // Already hovered » do nothing
    else {  card.classList.add("scaleUp");  }
    // Anyhow
    card.classList.add("whenItIsClicked");
    console.log("z-index when mousedown fired: "+card.parentNode.style.zIndex);
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
    allCards.forEach((element) => { // Those who have containerForRoundedColorCards
      element.removeEventListener("mouseenter",addClassWhenHovered);
      element.removeEventListener("mousemove",addClassWhenHovered);
      element.removeEventListener("mouseleave",removeClassWhenUnhovered);
      element.removeEventListener("mousedown", niceClick);
    });
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
      seeIfUserIsAbleToPronounce(eachWordArray,recognitionFailTime).then((response) => { _check(response); }).catch((error) => { console.error(error); }); // See js_for_speech_recognition_algorithm


      // IDEA: Display countdown timer :: simulated hourglass

      // ---
      /*CANCEL if (typeof startUniqueAudioInputVisualization === 'function') {
        startUniqueAudioInputVisualization(); // See js_for_microphone_input_visualization
      } else { console.warn('startUniqueAudioInputVisualization function does not exist???'); }*/
      if (typeof startStandardAudioInputVisualization === 'function') {
        startStandardAudioInputVisualization(); // See js_for_microphone_input_visualization
        driveTheRotationOfThisWithMicVolume = card.parentNode;
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
          driveTheRotationOfThisWithMicVolume.style.transform = "translateX(0vw) translateY(0vh)" ; // Reset back to initial value so that transitions can work
          driveTheRotationOfThisWithMicVolume = null;
        } else { console.warn('stopStandardAudioInputVisualization function does not exist???'); }
      }
      // Do these if it resolves with "pass"
      function flipThatCardNow() {
        if (!theCardThatIsAlreadyFlipped) { // Such a card doesn't exist
          whenCorrectColorIsUtteredForThe_FIRST_Card(card,zIndexReversion);
        } else { // There exists a previously flipped card
          whenCorrectColorIsUtteredForThe_SECOND_Card(card,zIndexReversion);
        }
      }
      // Do these if it resolves with "fail"
      function letTheCardGoBackToItsNormalState() {
        failSound.play();
        // Reset the card without flipping it
        card.classList.remove("scaleUp");
        card.classList.remove("whenItIsClicked");
        fullVpDarkBlue.onanimationend = () => {
          // Revert zIndex
          card.parentNode.style.zIndex = zIndexReversion;

          fullVpDarkBlue.classList.remove("darkenLightenBackground"); // Clean up and get ready to restart
          // Restore the event listeners
          allCards.forEach((element) => { // Those who have containerForRoundedColorCards
            if (element != theCardThatIsAlreadyFlipped) {
              element.addEventListener("mouseenter",addClassWhenHovered); // ENHANCE UX with mousemove
              element.addEventListener("mousemove",addClassWhenHovered); // ENHANCING UX by combining mouseenter+mousemove
              element.addEventListener("mouseleave",removeClassWhenUnhovered);
              element.addEventListener("mousedown", niceClick,{once:true});
              if (theCardThatIsAlreadyFlipped) {
                console.log("mouse events are restored for all except " + theCardThatIsAlreadyFlipped.id); // Works OK
              } else {
                console.log("mouse events are restored for all cards without any exceptions"); // Works OK
              }

            }
          });
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
            console.log("Speech Recognition ended for 134 desktop");
        }
      }

    }, listenTime);

  } // End of nice click


} // End of acceptAndHandleMouseClicks
