// All settings here will depend on the content of the lesson
// See js_for_every_single_html.js for userInterfaceLanguage
const filePathA = "../../../../user_interface/text/"+userInterfaceLanguage+"/1-2-3.txt";
/* This lesson has no textB*/
let textA; // Warning. Returns UNDEFINED before fetch() actually gets the file.
/* This lesson has no textB*/
fetch(filePathA,myHeaders).then(function(response){return response.text();}).then(function(contentOfTheTxtFile){ textA = contentOfTheTxtFile; putTranslationIntoThisHelpAreaFromFileP.innerHTML = textA; });
/* This lesson has no textB*/

/* ___AUDIO ELEMENTS___ */
// The following say1 say2 and say3 are not slow vs fast. Just 3 different intonations to make it feel less “robotic”.
let say1Path = "audio_files_for_listening/"+parent.theLanguageUserIsLearningNowToSetFilePaths+"/level_1/unit_2/lesson_3/eat.mp3";
if (parent.theLanguageUserIsLearningNowToSetFilePaths=="ar" && parent.genderOfTheUser=="female") { say1Path = say1Path.split(".")[0] + "_female.mp3"; }
const say1 = new parent.Howl({  src: [say1Path]  });
let say2Path = "audio_files_for_listening/"+parent.theLanguageUserIsLearningNowToSetFilePaths+"/level_1/unit_2/lesson_3/eat_with_the_spoon.mp3";
if (parent.theLanguageUserIsLearningNowToSetFilePaths=="ar" && parent.genderOfTheUser=="female") { say2Path = say2Path.split(".")[0] + "_female.mp3"; }
const say2 = new parent.Howl({  src: [say2Path]  });
let say3Path = "audio_files_for_listening/"+parent.theLanguageUserIsLearningNowToSetFilePaths+"/level_1/unit_2/lesson_3/eat_with_the_spoon_slow.mp3";
if (parent.theLanguageUserIsLearningNowToSetFilePaths=="ar" && parent.genderOfTheUser=="female") { say3Path = say3Path.split(".")[0] + "_female.mp3"; }
const say3 = new parent.Howl({  src: [say3Path]  });
const clickTone = new parent.Howl({  src: ['lessons_in_iframes/level_1/unit_2/lesson_3/spoon_is_clicked.mp3'] });
const videoSoundTrack = new parent.Howl({  src: ['lessons_in_iframes/level_1/unit_2/lesson_3/eat_with_the_spoon_state_b.mp3'] });
const successTone = new parent.Howl({  src: ['lessons_in_iframes/level_1/unit_2/lesson_3/meal_is_finished.mp3'] });
function unloadTheSoundsOfThisLesson() { // Call this as the last thing before leaving.
  successTone.unload();
  videoSoundTrack.unload();
  clickTone.unload();
  say3.unload();
  say2.unload();
  say1.unload();
}

/* ___VISUAL ELEMENTS___ */
const imgA = document.getElementById("imageA");
const imgB = document.getElementById("imageB");

const clickableArea = document.getElementById("idOfTheLittleInvisibleClickableDiv");

function unloadTheImagesOfThisLesson() { // Call this as the last thing before leaving.
  imgA.src = onePixelTransparentGif;
  imgB.src = onePixelTransparentGif;
}

// ALWAYS: Use window load to be safe with timing.
window.addEventListener('load', function(){  loadingIsCompleteFunction();  }, { once: true });
var looping;
let counter = 1;
function loadingIsCompleteFunction()
{
  // Stop and notify the user if necessary; otherwise just continue.
  if (parent.theLanguageUserIsLearningNowToSetFilePaths == "ar") { // Kul or Tanaawal
    const pathOfNotificationArabicEat = "../../../../user_interface/text/"+userInterfaceLanguage+"/1-2-3_special_case_for_ar.txt";
    fetch(pathOfNotificationArabicEat,myHeaders).then(function(response){return response.text();}).then(function(contentOfTheTxtFile){
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
  } else {
    startTheLesson();
  }
}

function startTheLesson()
{
  // In this case the audio loop doesn’t have to sync with the visual (animation) loop.
  looping = setInterval(loopFunction,22000*((parent.speedAdjustmentCoefficient + 1)/2));
  function loopFunction() {
    setTimeout(function () {  say1.play();  },2000*((parent.speedAdjustmentCoefficient + 1)/2));
    setTimeout(function () {  say2.play();  },7000*((parent.speedAdjustmentCoefficient + 1)/2));
    setTimeout(function () {  say3.play();  },14000*((parent.speedAdjustmentCoefficient + 1)/2));
    if (counter == 3) {  clearInterval(looping);  }   // 3 will make the user hear it 9 times.
    counter++;
  }
  loopFunction();

  // Add clickability AFTER the instructions are given!
  setTimeout(function () {
      // touchstart is the equivalent of mousedown for mobile
      if (deviceDetector.isMobile) {
        clickableArea.addEventListener("touchstart",goFromAtoB,{once:true});
      } else {
        clickableArea.addEventListener("mousedown",goFromAtoB,{once:true});
      }
   },5000);
}

function goFromAtoB()
{
  clearInterval(looping); say1.fade(1,0,1500); say2.fade(1,0,1500); say3.fade(1,0,1500);
  clickTone.play();
  if(parent.detectedOS.name != "iOS" && parent.detectedOS.name != "Mac OS") {parent.navigator.vibrate([10,60,10,60,10,60,10]);}
  videoSoundTrack.play();
  imgA.style.display = "none";
  imgB.style.display = "initial";
  putTranslationIntoThisHelpAreaFromFileP.innerHTML = " ";
  setTimeout(function () { successTone.play(); },11300); // IMPORTANT! Timing must be accurate.
  /* END OF ACTIVITY */
  /* GET READY TO EXIT THIS LESSON */
  setTimeout(function() {
    parent.preloadHandlingDiv.classList.remove("addThisClassToHideThePreloader");
    parent.preloadHandlingDiv.classList.add("addThisClassToRevealThePreloader");
  },13000); // 14500-1500 = 13000 See css_for_every_single_html
  setTimeout(function() {
    unloadTheSoundsOfThisLesson();
    unloadTheImagesOfThisLesson();
  },14400); // Also see js_for_all_iframed_lesson_htmls about unloadTheSoundsOfThisLesson() unloadTheImagesOfThisLesson()
  setTimeout(function () { self.location.href = "../lesson_4/index.html"; },14500);
}
