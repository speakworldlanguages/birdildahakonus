// All settings here will depend on the content of the lesson
let theNewWordUserIsLearningNowAndPossibleMishaps; // Get this from txt file
const filePathForTheWordOrPhrase = "../../../../speech_recognition_dictionary/"+parent.theLanguageUserIsLearningNowToSetFilePaths+"/1-6-1-sun.txt";
// See js_for_fetch_api_character_encoding.js for the headers setting.
fetch(filePathForTheWordOrPhrase,myHeaders).then(function(response){return response.text();}).then(function(contentOfTheTxtFile){ theNewWordUserIsLearningNowAndPossibleMishaps = contentOfTheTxtFile; });

/* ___AUDIO ELEMENTS___ */
const say1Path = "audio_files_for_listening/"+parent.theLanguageUserIsLearningNowToSetFilePaths+"/level_1/unit_6/lesson_1/sun_1.mp3";
const say2Path = "audio_files_for_listening/"+parent.theLanguageUserIsLearningNowToSetFilePaths+"/level_1/unit_6/lesson_1/sun_2.mp3";
const say3Path = "audio_files_for_listening/"+parent.theLanguageUserIsLearningNowToSetFilePaths+"/level_1/unit_6/lesson_1/sun_3.mp3";
const say4Path = "audio_files_for_listening/"+parent.theLanguageUserIsLearningNowToSetFilePaths+"/level_1/unit_6/lesson_1/sun_4.mp3";

const sayA = new parent.Howl({  src: [say1Path]  });
const sayB = new parent.Howl({  src: [say2Path]  });
const sayC = new parent.Howl({  src: [say3Path]  });
const sayD = new parent.Howl({  src: [say4Path]  });

const theSoundOfBurningSun = new parent.Howl({  src: ["lessons_in_iframes/level_1/unit_6/lesson_1/the_sun_is_burning.mp3"] , loop:true });
const impactSound1 = new parent.Howl({  src: ["lessons_in_iframes/level_1/unit_6/lesson_1/impact_1.mp3"]  });
const impactSound2 = new parent.Howl({  src: ["lessons_in_iframes/level_1/unit_6/lesson_1/impact_2.mp3"]  });
const impactSound3 = new parent.Howl({  src: ["lessons_in_iframes/level_1/unit_6/lesson_1/impact_3.mp3"]  });
const impactSound4 = new parent.Howl({  src: ["lessons_in_iframes/level_1/unit_6/lesson_1/impact_4.mp3"]  });

const successTone = new parent.Howl({  src: ['user_interface/sounds/success1.mp3']  });
const notificationDingTone = new parent.Howl({  src: ['user_interface/sounds/ding.mp3']  });
function unloadTheSoundsOfThisLesson() { // Call this as the last thing before leaving.
  notificationDingTone.unload();
  successTone.unload();
  impactSound1.unload();
  impactSound2.unload();
  impactSound3.unload();
  impactSound4.unload();
  theSoundOfBurningSun.unload();
  sayD.unload();
  sayC.unload();
  sayB.unload();
  sayA.unload();
}

/* ___VISUAL ELEMENTS___ */
const landscapeImgA = document.getElementById("landscapeImage1");
const landscapeImgB = document.getElementById("landscapeImage2");
const landscapeImgC = document.getElementById("landscapeImage3");
const landscapeImgD = document.getElementById("landscapeImage4");
const landscapeImgE = document.getElementById("landscapeImage5");
const portraitImgA = document.getElementById("portraitImage1");
const portraitImgB = document.getElementById("portraitImage2");
const portraitImgC = document.getElementById("portraitImage3");
const portraitImgD = document.getElementById("portraitImage4");
const portraitImgE = document.getElementById("portraitImage5");
const the1stDivThatWillAppearWhenMicrophoneStartsListening = document.getElementById('idOfTheFullViewportDivWithNOWYOUSAYITAnimationInsideLayer1');
const the2ndDivThatWillAppearWhenMicrophoneStartsListening = document.getElementById('idOfTheFullViewportDivWithNOWYOUSAYITAnimationInsideLayer2');
const the1stImgOfNOWYOUSAYITwebpThatMustBeResetToFrameOne = document.getElementById('idOfTheNowYouSayItAnimationLayer1');
const the2ndImgOfNOWYOUSAYITwebpThatMustBeResetToFrameOne = document.getElementById('idOfTheNowYouSayItAnimationLayer2');
const giveUpAndContinueButtonIsInsideThisDiv = document.getElementById('giveUpSkipNextContinueButtonDivID');

function unloadTheImagesOfThisLesson(){ // Call this as the last thing before leaving.
  landscapeImgA.src = onePixelTransparentGif;
  landscapeImgB.src = onePixelTransparentGif;
  landscapeImgC.src = onePixelTransparentGif;
  landscapeImgD.src = onePixelTransparentGif;
  landscapeImgE.src = onePixelTransparentGif;
  portraitImgA.src = onePixelTransparentGif;
  portraitImgB.src = onePixelTransparentGif;
  portraitImgC.src = onePixelTransparentGif;
  portraitImgD.src = onePixelTransparentGif;
  portraitImgE.src = onePixelTransparentGif;
}
// These are already hidden with display: none and here we get them ready to fade in using classList.remove() when it’s time.
landscapeImgB.classList.add("toZeroOpacity");
landscapeImgC.classList.add("toZeroOpacity");
landscapeImgD.classList.add("toZeroOpacity");
landscapeImgE.classList.add("toZeroOpacity");
portraitImgB.classList.add("toZeroOpacity");
portraitImgC.classList.add("toZeroOpacity");
portraitImgD.classList.add("toZeroOpacity");
portraitImgE.classList.add("toZeroOpacity");
// These are already hidden with left: -9999px and here we get them ready to fade in using classList.remove() when it’s time.
the1stDivThatWillAppearWhenMicrophoneStartsListening.classList.add("toZeroOpacity");
the2ndDivThatWillAppearWhenMicrophoneStartsListening.classList.add("toZeroOpacity");

/* ___PROGRESSION___ */
window.addEventListener("load",function(){   loadingIsCompleteFunction();   }, { once: true });
// Gradually speed up to avoid boredom.
function loadingIsCompleteFunction()
{
  // Display notifications if there are any.
  startTheLesson();
}

function startTheLesson()
{
  theSoundOfBurningSun.play();
  theSoundOfBurningSun.fade(0,1,1000);
  setTimeout(function(){ impactSound1.play(); }, 4250);
  setTimeout(function(){ sayA.play(); }, 6250); // 1000 + 5250 = 6250
  // WEBP ANIMATION MUST START FROM FIRST FRAME WHEN THIS IS FIRED ,,, DISPLAY NONE TO INITIAL WORKS ONCE. WOULD NEED SRC CHANGE IF IT HAD TO REPEAT.
  landscapeImgA.style.display = "initial";
  portraitImgA.style.display = "initial";
  setTimeout(goFromAtoB,6000*parent.speedAdjustmentCoefficient+3000); // TIMING IS DIFFERENT FROM STANDARD
}

function goFromAtoB()
{
  setTimeout(function(){ impactSound2.play(); }, 2250);
  setTimeout(function(){ sayB.play(); }, 5000); // 2000 + 3000 // after 1s fade out plus 1s fade in
  landscapeImgA.classList.add("toZeroOpacity");
  portraitImgA.classList.add("toZeroOpacity");
  setTimeout(betweenAandB,1000);
}

function betweenAandB()
{
    landscapeImgA.style.display = "none";
    portraitImgA.style.display = "none";
    landscapeImgB.style.display = "initial";
    portraitImgB.style.display = "initial";
    setTimeout(waitALittleFunc,100);
    function waitALittleFunc(){
    landscapeImgB.classList.remove("toZeroOpacity");
    portraitImgB.classList.remove("toZeroOpacity");
    }

    setTimeout(goFromBtoC,6250*parent.speedAdjustmentCoefficient);
}

function goFromBtoC()
{
  setTimeout(function(){ impactSound3.play(); }, 2700);
  setTimeout(function(){ sayC.play(); }, 5750); // 2000 + 3750 = 5750 // after 1s fade out plus 1s fade in
  landscapeImgB.classList.add("toZeroOpacity");
  portraitImgB.classList.add("toZeroOpacity");
  setTimeout(betweenBandC,1000);
}

function betweenBandC()
{
  landscapeImgB.style.display = "none";
  portraitImgB.style.display = "none";
  landscapeImgC.style.display = "initial";
  portraitImgC.style.display = "initial";
  setTimeout(waitALittleFunc,100);
  function waitALittleFunc(){
  landscapeImgC.classList.remove("toZeroOpacity");
  portraitImgC.classList.remove("toZeroOpacity");
  }
  setTimeout(goFromCtoD,6500*parent.speedAdjustmentCoefficient);
}

function goFromCtoD()
{
  setTimeout(function(){ impactSound4.play(); }, 1950);
  setTimeout(function(){ sayD.play(); }, 5750); // 2000 + 3750 = 5750 // after 1s fade out plus 1s fade in
  theSoundOfBurningSun.fade(1,0,12000);
  theSoundOfBurningSun.once('fade', function(){      theSoundOfBurningSun.stop();       });
  landscapeImgC.classList.add("toZeroOpacity");
  portraitImgC.classList.add("toZeroOpacity");
  setTimeout(betweenCandD,1000);
}

function betweenCandD()
{
  landscapeImgC.style.display = "none";
  portraitImgC.style.display = "none";
  landscapeImgD.style.display = "initial";
  portraitImgD.style.display = "initial";
  setTimeout(waitALittleFunc,100);
  function waitALittleFunc(){
  landscapeImgD.classList.remove("toZeroOpacity");
  portraitImgD.classList.remove("toZeroOpacity");
  }
  setTimeout(goFromDtoE,6750*parent.speedAdjustmentCoefficient);
}

function goFromDtoE()
{
  landscapeImgD.classList.add("toZeroOpacity");
  portraitImgD.classList.add("toZeroOpacity");
  setTimeout(betweenDandE,1000);
}

function betweenDandE()
{
  landscapeImgD.style.display = "none";
  portraitImgD.style.display = "none";
  landscapeImgE.style.display = "initial";
  portraitImgE.style.display = "initial";
  landscapeImgE.classList.add("addThisClassToStartZoomingIn");
  portraitImgE.classList.add("addThisClassToStartZoomingIn");
  setTimeout(waitALittleFunc,100);
  function waitALittleFunc(){
  landscapeImgE.classList.remove("toZeroOpacity");
  portraitImgE.classList.remove("toZeroOpacity");
  }
  setTimeout(speakToTheMic,1900*parent.speedAdjustmentCoefficient+1500);
}

/* ___SPEECH RECOGNITION___ */
var userHasGivenUp = false;
var preventGiveUpButtonIfSuccessHappens;
function speakToTheMic() {

  the1stDivThatWillAppearWhenMicrophoneStartsListening.style.left=0; // See css_for_new_vocabulary_with_photos
  the2ndDivThatWillAppearWhenMicrophoneStartsListening.style.left=0; // See css_for_new_vocabulary_with_photos
  // Reset the webp animation
  const srcOfNowYouSayItImg = the1stImgOfNOWYOUSAYITwebpThatMustBeResetToFrameOne.src;
  the1stImgOfNOWYOUSAYITwebpThatMustBeResetToFrameOne.src = onePixelTransparentGif; // See js_for_every_single_html
  the2ndImgOfNOWYOUSAYITwebpThatMustBeResetToFrameOne.src = onePixelTransparentGif; // See js_for_every_single_html
  setTimeout(function () {
    the1stImgOfNOWYOUSAYITwebpThatMustBeResetToFrameOne.src = srcOfNowYouSayItImg;
    the2ndImgOfNOWYOUSAYITwebpThatMustBeResetToFrameOne.src = srcOfNowYouSayItImg;
  },250);
  // Display the “It's your turn” animation if the user's browser is whitelisted.
  if (parent.isTheUsersBrowserWhitelisted) {
    the1stDivThatWillAppearWhenMicrophoneStartsListening.classList.remove("toZeroOpacity"); // MAKE IT APPEAR
    the2ndDivThatWillAppearWhenMicrophoneStartsListening.classList.remove("toZeroOpacity"); // MAKE IT APPEAR
    setTimeout(function () {
      the1stDivThatWillAppearWhenMicrophoneStartsListening.classList.add("toZeroOpacity");
      the2ndDivThatWillAppearWhenMicrophoneStartsListening.classList.add("toZeroOpacity");
    },4800); // AND DISAPPEAR AS SOON AS ANIMATION ENDS
  }
  // A slight whiteout and then the GIVE-UP-BUTTON (Go-To-Next-Button on Safari2021,Firefox2021 etc) appears SLOWLY.
  // Use clearTimeout before it appears to prevent it accordingly.
  // For sake of GUI simplicity the Speed Adjustment Slider is available on desktops only as well as the Global Volume Slider.
  preventGiveUpButtonIfSuccessHappens = setTimeout(function () {
    setTimeout(function () {  giveUpAndContinueButtonIsInsideThisDiv.classList.add("addThisToGlassButtonToUnhide");  },1000);
  },howLongBeforeGiveUpButtonAppears);

  // REMEMBER: To find “what language the browser will listen to (via annyang)” see the code in js_for_all_container_parent_htmls.js
  var commands = {};
  const eachWordArray = theNewWordUserIsLearningNowAndPossibleMishaps.split("|"); // The text files in speech_recognition_dictionary must be written with the | (bar) character as the separator between phrases.
  for(i=0;i<eachWordArray.length;i++)
  {
    let oneOfTheWords = eachWordArray[i];
    commands[oneOfTheWords] = stopListeningAndProceedToNext;
  }

  if (parent.annyang) {
    // Add commands to annyang
    parent.annyang.addCommands(commands);
    if (deviceDetector.device == "desktop" || parent.detectedOS.name == "iOS") {
        notificationDingTone.play(); // Android has its native DING tone. So let this DING tone play on desktops and iOS devices.
    }
    // Start listening.
    setTimeout(function() {  parent.annyang.start();  },200);
    setTimeout(function() {  startAudioInputVisualization();  },300); // Will work only on desktops. See js_for_microphone_input_visualization.js
  }

} /* END OF speakToTheMic */

// stopListeningAndProceedToNext
var stopListeningAndProceedToNext = function () {
  if (!userHasGivenUp) {
    successTone.play();
    clearTimeout(preventGiveUpButtonIfSuccessHappens);
    giveUpAndContinueButtonIsInsideThisDiv.classList.add("addThisToGlassButtonWhenSuccessHappens");
  }
  if (parent.annyang) {
    parent.annyang.removeCommands();
    parent.annyang.abort();
  }
  stopAudioInputVisualization();
  /* GET READY TO EXIT THIS LESSON */
  setTimeout(function() {
    parent.preloadHandlingDiv.classList.remove("addThisClassToHideThePreloader");
    parent.preloadHandlingDiv.classList.add("addThisClassToRevealThePreloader");
  },2100); // 3600-1500 = 2100 See css_for_every_single_html
  setTimeout(function() {
    unloadTheSoundsOfThisLesson();
    unloadTheImagesOfThisLesson();
  },3500); // Also see js_for_all_iframed_lesson_htmls about unloadTheSoundsOfThisLesson() unloadTheImagesOfThisLesson()
  setTimeout(function() { self.location.href = '../lesson_2/index.html'; },3600);
};
