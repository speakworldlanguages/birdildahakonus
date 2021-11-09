// All settings here will depend on the content of the lesson
let theNewWordUserIsLearningNowAndPossibleMishaps; // Get this from txt file
const filePathForTheWordOrPhrase = "../../../../speech_recognition_dictionary/"+parent.theLanguageUserIsLearningNowToSetFilePaths+"/1-2-1-spoon.txt";
// See js_for_fetch_api_character_encoding.js for the headers setting.
fetch(filePathForTheWordOrPhrase,myHeaders).then(function(response){return response.text();}).then(function(contentOfTheTxtFile){ theNewWordUserIsLearningNowAndPossibleMishaps = contentOfTheTxtFile; });

/* ___AUDIO ELEMENTS___ */
const say1say2Path = "audio_files_for_listening/"+parent.theLanguageUserIsLearningNowToSetFilePaths+"/level_1/unit_2/lesson_1/spoon_1-2.mp3";
const say3say4Path = "audio_files_for_listening/"+parent.theLanguageUserIsLearningNowToSetFilePaths+"/level_1/unit_2/lesson_1/spoon_3-4.mp3";
const say5say6Path = "audio_files_for_listening/"+parent.theLanguageUserIsLearningNowToSetFilePaths+"/level_1/unit_2/lesson_1/spoon_5-6.mp3";
const say7say8Path = "audio_files_for_listening/"+parent.theLanguageUserIsLearningNowToSetFilePaths+"/level_1/unit_2/lesson_1/spoon_7-8.mp3";

const sayAB = new parent.Howl({  src: [say1say2Path]  });
const sayCD = new parent.Howl({  src: [say3say4Path]  });
const sayEF = new parent.Howl({  src: [say5say6Path]  });
const sayGH = new parent.Howl({  src: [say7say8Path]  });

const tablewareSoundAB = new parent.Howl({  src: ["lessons_in_iframes/level_1/unit_2/lesson_1/tableware_1-2.mp3"]  });
const tablewareSoundCD = new parent.Howl({  src: ["lessons_in_iframes/level_1/unit_2/lesson_1/tableware_3-4.mp3"]  });
const tablewareSoundEF = new parent.Howl({  src: ["lessons_in_iframes/level_1/unit_2/lesson_1/tableware_5-6.mp3"]  });
const tablewareSoundGH = new parent.Howl({  src: ["lessons_in_iframes/level_1/unit_2/lesson_1/tableware_7-8.mp3"]  });

const successTone = new parent.Howl({  src: ['user_interface/sounds/success1.mp3']  });
const notificationDingTone = new parent.Howl({  src: ['user_interface/sounds/ding.mp3']  });
function unloadTheSoundsOfThisLesson() { // Call this as the last thing before leaving.
  notificationDingTone.unload();
  successTone.unload();
  tablewareSoundGH.unload();
  tablewareSoundEF.unload();
  tablewareSoundCD.unload();
  tablewareSoundAB.unload();
  sayGH.unload();
  sayEF.unload();
  sayCD.unload();
  sayAB.unload();
}

/* ___VISUAL ELEMENTS___ */
const imgA = document.getElementById("imageA");
const imgB = document.getElementById("imageB");
const imgC = document.getElementById("imageC");
const imgD = document.getElementById("imageD");
const imgE = document.getElementById("imageE");
const imgF = document.getElementById("imageF");
const imgG = document.getElementById("imageG");
const imgH = document.getElementById("imageH");
const imgI = document.getElementById("imageI");
const imgJ = document.getElementById("imageJ");
const the1stDivThatWillAppearWhenMicrophoneStartsListening = document.getElementById('idOfTheFullViewportDivWithNOWYOUSAYITAnimationInsideLayer1');
const the2ndDivThatWillAppearWhenMicrophoneStartsListening = document.getElementById('idOfTheFullViewportDivWithNOWYOUSAYITAnimationInsideLayer2');
const the1stImgOfNOWYOUSAYITwebpThatMustBeResetToFrameOne = document.getElementById('idOfTheNowYouSayItAnimationLayer1');
const the2ndImgOfNOWYOUSAYITwebpThatMustBeResetToFrameOne = document.getElementById('idOfTheNowYouSayItAnimationLayer2');
const giveUpAndContinueButtonIsInsideThisDiv = document.getElementById('giveUpSkipNextContinueButtonDivID');

function unloadTheImagesOfThisLesson() { // Call this as the last thing before leaving.
  imgA.src = onePixelTransparentGif;
  imgB.src = onePixelTransparentGif;
  imgC.src = onePixelTransparentGif;
  imgD.src = onePixelTransparentGif;
  imgE.src = onePixelTransparentGif;
  imgF.src = onePixelTransparentGif;
  imgG.src = onePixelTransparentGif;
  imgH.src = onePixelTransparentGif;
  imgI.src = onePixelTransparentGif;
  imgJ.src = onePixelTransparentGif;
}
// These are already hidden with display: none and here we get them ready to fade in using classList.remove() when it’s time.
imgC.classList.add("toZeroOpacity");
imgD.classList.add("toZeroOpacity");
imgE.classList.add("toZeroOpacity");
imgF.classList.add("toZeroOpacity");
imgG.classList.add("toZeroOpacity");
imgH.classList.add("toZeroOpacity");
imgI.classList.add("toZeroOpacity");
imgJ.classList.add("toZeroOpacity");
// These are already hidden with left: -9999px and here we get them ready to fade in using classList.remove() when it’s time.
the1stDivThatWillAppearWhenMicrophoneStartsListening.classList.add("toZeroOpacity");
the2ndDivThatWillAppearWhenMicrophoneStartsListening.classList.add("toZeroOpacity");

/* ___PROGRESSION___ */
window.addEventListener("load",function(){   loadingIsCompleteFunction();   }, { once: true });
// Desktop users can change the speed; mobile users can't. Because the mobile GUI has to stay simple.
function loadingIsCompleteFunction()
{
  // Stop and notify the user if necessary; otherwise just continue.
  if (parent.theLanguageUserIsLearningNowToSetFilePaths == "en") { // Display notification about the usage of the indefinite article "A" in English.
    const pathOfNotificationAboutIndefiniteArticle = "../../../../user_interface/text/"+userInterfaceLanguage+"/1-2-1_eng_indefinite_article.txt";
    fetch(pathOfNotificationAboutIndefiniteArticle,myHeaders).then(function(response){return response.text();}).then(function(contentOfTheTxtFile){
      // Display notification instead of alert(contentOfTheTxtFile);
      createAndHandleNotificationBox(); // See js_for_all_iframed_lesson_htmls.js
      putNotificationTxtIntoThisP.innerHTML = contentOfTheTxtFile;
      // Continue when user clicks or touches OK
      // createAndHandleNotificationBox() will start the lesson 1.5 seconds after the button is clicked
      // ---
      // Put something like [OK], [Got it], [I see], [Oh really?], [Wow], [That's interesting] etc into the button.
      const pathOfOkCloseTheBox = "../../../../user_interface/text/"+userInterfaceLanguage+"/0-ok_i_understand.txt";
      fetch(pathOfOkCloseTheBox,myHeaders).then(function(response){return response.text();}).then(function(contentOfTheTxtFile){
        okButtonToCloseTheNotification.innerHTML = contentOfTheTxtFile;
      });
    });
  }
  else {
    startTheLesson();
  }
}

function startTheLesson()
{
  setTimeout(function(){ tablewareSoundAB.play(); }, 1450);
  setTimeout(function(){ sayAB.play(); }, 4450); //1000+3000=4000
  setTimeout(goFromABtoCD,6500*parent.speedAdjustmentCoefficient+3000); // See js_for_the_sliding_navigation_menu.js
}

function goFromABtoCD()
{
  setTimeout(function(){ tablewareSoundCD.play(); }, 2450); // after 1s fade out plus 1s fade in
  setTimeout(function(){ sayCD.play(); }, 5450); // 2000+3000=5000 // after 1s fade out plus 1s fade in
  imgA.classList.add("toZeroOpacity");
  imgB.classList.add("toZeroOpacity");
  setTimeout(betweenABandCD,1000);
}

function betweenABandCD()
{
    imgA.style.display = "none";
    imgB.style.display = "none";
    imgC.style.display = "initial";
    imgD.style.display = "initial";
    setTimeout(waitALittleFunc,100);
    function waitALittleFunc(){
    imgC.classList.remove("toZeroOpacity");
    imgD.classList.remove("toZeroOpacity");
    }
    setTimeout(goFromCDtoEF,7500*parent.speedAdjustmentCoefficient+3000);
}

function goFromCDtoEF()
{
  setTimeout(function(){ tablewareSoundEF.play(); }, 2450);
  setTimeout(function(){ sayEF.play(); }, 5450); // 2000 + 3000 = 5000
  imgC.classList.add("toZeroOpacity");
  imgD.classList.add("toZeroOpacity");
  setTimeout(betweenCDandEF,1000);
}

function betweenCDandEF()
{
  imgC.style.display = "none";
  imgD.style.display = "none";
  imgE.style.display = "initial";
  imgF.style.display = "initial";
  setTimeout(waitALittleFunc,100);
  function waitALittleFunc(){
  imgE.classList.remove("toZeroOpacity");
  imgF.classList.remove("toZeroOpacity");
  }
  setTimeout(goFromEFtoGH,6600*parent.speedAdjustmentCoefficient+3000);
}

function goFromEFtoGH()
{
  setTimeout(function(){ tablewareSoundGH.play(); }, 2450);
  setTimeout(function(){ sayGH.play(); }, 5750); // 2000 + 3300 = 5300
  imgE.classList.add("toZeroOpacity");
  imgF.classList.add("toZeroOpacity");
  setTimeout(betweenEFandGH,1000);
}

function betweenEFandGH()
{
  imgE.style.display = "none";
  imgF.style.display = "none";
  imgG.style.display = "initial";
  imgH.style.display = "initial";
  setTimeout(waitALittleFunc,100);
  function waitALittleFunc(){
  imgG.classList.remove("toZeroOpacity");
  imgH.classList.remove("toZeroOpacity");
  }
  setTimeout(goFromGHtoIJ,8500*((parent.speedAdjustmentCoefficient+1)/2)+3300); // See js_for_the_sliding_navigation_menu.js
}

function goFromGHtoIJ()
{
  imgG.classList.add("toZeroOpacity");
  imgH.classList.add("toZeroOpacity");
  setTimeout(betweenGHandIJ,1000);
}

function betweenGHandIJ()
{
  imgG.style.display = "none";
  imgH.style.display = "none";
  imgI.style.display = "initial";
  imgJ.style.display = "initial";
  setTimeout(waitALittleFunc,100);
  function waitALittleFunc(){
  imgI.classList.remove("toZeroOpacity");
  imgJ.classList.remove("toZeroOpacity");
  }
  setTimeout(speakToTheMic,1900*parent.speedAdjustmentCoefficient);
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
