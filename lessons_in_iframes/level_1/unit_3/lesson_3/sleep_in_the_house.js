// All settings here will depend on the content of the lesson
// See js_for_every_single_html.js for userInterfaceLanguage
const filePathA = "../../../../user_interface/text/"+userInterfaceLanguage+"/1-3-3.txt";
/* This lesson has no textB*/
let textA; // Warning. Returns UNDEFINED before fetch() actually gets the file.
/* This lesson has no textB*/
fetch(filePathA,myHeaders).then(function(response){return response.text();}).then(function(contentOfTheTxtFile){ textA = contentOfTheTxtFile; putTranslationIntoThisHelpAreaFromFileP.innerHTML = textA; });
/* This lesson has no textB*/

/* ___AUDIO ELEMENTS___ */
let say1Path = "audio_files_for_listening/"+parent.theLanguageUserIsLearningNowToSetFilePaths+"/level_1/unit_3/lesson_3/go_to_sleep.mp3";
if (parent.theLanguageUserIsLearningNowToSetFilePaths=="ar" && parent.genderOfTheUser=="female") { say1Path = say1Path.split(".")[0] + "_female.mp3"; }
const say1 = new parent.Howl({  src: [say1Path]  });
let say2Path = "audio_files_for_listening/"+parent.theLanguageUserIsLearningNowToSetFilePaths+"/level_1/unit_3/lesson_3/go_to_sleep_in_the_house.mp3";
if (parent.theLanguageUserIsLearningNowToSetFilePaths=="ar" && parent.genderOfTheUser=="female") { say2Path = say2Path.split(".")[0] + "_female.mp3"; }
const say2 = new parent.Howl({  src: [say2Path]  });
let say3Path = "audio_files_for_listening/"+parent.theLanguageUserIsLearningNowToSetFilePaths+"/level_1/unit_3/lesson_3/go_to_sleep_in_the_house_slow.mp3";
if (parent.theLanguageUserIsLearningNowToSetFilePaths=="ar" && parent.genderOfTheUser=="female") { say3Path = say3Path.split(".")[0] + "_female.mp3"; }
const say3 = new parent.Howl({  src: [say3Path]  });
const clickTone = new parent.Howl({  src: ['lessons_in_iframes/level_1/unit_3/lesson_3/click_on_house.mp3'] });
const videoSoundTrack = new parent.Howl({  src: ['lessons_in_iframes/level_1/unit_3/lesson_3/night_time_crickets.mp3'] });
const successTone = new parent.Howl({  src: ['lessons_in_iframes/level_1/unit_3/lesson_3/sleep_success_and_clock_tick.mp3'] });
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
  // Display notifications if there are any.
  startTheLesson();
}

function startTheLesson()
{
  // No syncing necessary.
  looping = setInterval(loopFunction,20000*((parent.speedAdjustmentCoefficient + 1)/2));
  function loopFunction() {
    setTimeout(function () {  say1.play();  },5000*((parent.speedAdjustmentCoefficient + 1)/2));
    setTimeout(function () {  say2.play();  },9000*((parent.speedAdjustmentCoefficient + 1)/2));
    setTimeout(function () {  say3.play();  },15000*((parent.speedAdjustmentCoefficient + 1)/2));
    if (counter == 3) {  clearInterval(looping);  }
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
  if(parent.detectedOS.name != "iOS" && parent.detectedOS.name != "Mac OS") {parent.navigator.vibrate([15,60,13,60,11,60,9]);}
  videoSoundTrack.play();
  imgA.style.display = "none";
  imgB.style.display = "initial";
  putTranslationIntoThisHelpAreaFromFileP.innerHTML = " ";
  setTimeout(function () { successTone.play();  },8800); // IMPORTANT! Timing must be accurate.
  /* END OF ACTIVITY */
  /* GET READY TO EXIT THIS LESSON */
  setTimeout(function() {
    parent.preloadHandlingDiv.classList.remove("addThisClassToHideThePreloader");
    parent.preloadHandlingDiv.classList.add("addThisClassToRevealThePreloader");
  },18000); // 19500-1500 = 18000 See css_for_every_single_html
  setTimeout(function() {
    unloadTheSoundsOfThisLesson();
    unloadTheImagesOfThisLesson();
  },19400); // Also see js_for_all_iframed_lesson_htmls about unloadTheSoundsOfThisLesson() unloadTheImagesOfThisLesson()
  setTimeout(function () { self.location.href = "../lesson_4/index.html";  },19500);
}
