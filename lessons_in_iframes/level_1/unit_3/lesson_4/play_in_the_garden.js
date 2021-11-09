// All settings here will depend on the content of the lesson
// See js_for_every_single_html.js for userInterfaceLanguage
const filePathA = "../../../../user_interface/text/"+userInterfaceLanguage+"/1-3-4.txt";
/*There is no textB in this lesson*/
let textA; // Warning! Returns UNDEFINED before fetch() actually gets the file.
/*There is no textB in this lesson*/
fetch(filePathA,myHeaders).then(function(response){return response.text();}).then(function(contentOfTheTxtFile){ textA = contentOfTheTxtFile; putTranslationIntoThisHelpAreaFromFileP.innerHTML = textA; });
/*There is no textB in this lesson*/

/* ___AUDIO ELEMENTS___ */
let say1Path = "audio_files_for_listening/"+parent.theLanguageUserIsLearningNowToSetFilePaths+"/level_1/unit_3/lesson_4/play.mp3";
if (parent.theLanguageUserIsLearningNowToSetFilePaths=="ar" && parent.genderOfTheUser=="female") { say1Path = say1Path.split(".")[0] + "_female.mp3"; }
const say1 = new parent.Howl({  src: [say1Path]  });
let say2Path = "audio_files_for_listening/"+parent.theLanguageUserIsLearningNowToSetFilePaths+"/level_1/unit_3/lesson_4/play_in_the_garden.mp3";
if (parent.theLanguageUserIsLearningNowToSetFilePaths=="ar" && parent.genderOfTheUser=="female") { say2Path = say2Path.split(".")[0] + "_female.mp3"; }
const say2 = new parent.Howl({  src: [say2Path]  });
let say3Path = "audio_files_for_listening/"+parent.theLanguageUserIsLearningNowToSetFilePaths+"/level_1/unit_3/lesson_4/play_in_the_garden_slow.mp3";
if (parent.theLanguageUserIsLearningNowToSetFilePaths=="ar" && parent.genderOfTheUser=="female") { say3Path = say3Path.split(".")[0] + "_female.mp3"; }
const say3 = new parent.Howl({  src: [say3Path]  });
const clickTone = new parent.Howl({  src: ['lessons_in_iframes/level_1/unit_3/lesson_4/click_on_garden.mp3'] });
const videoSoundTrack = new parent.Howl({  src: ['lessons_in_iframes/level_1/unit_3/lesson_4/garden_sound.mp3'] });
const successTone = new parent.Howl({  src: ['lessons_in_iframes/level_1/unit_3/lesson_4/success_in_garden.mp3'] });
const actionSound1 = new parent.Howl({  src: ['lessons_in_iframes/level_1/unit_3/lesson_4/ball_hit.mp3'] });
const actionSound2 = new parent.Howl({  src: ['lessons_in_iframes/level_1/unit_3/lesson_4/bubbles.mp3'] }); // 12850 + 2360
const actionSound3 = new parent.Howl({  src: ['lessons_in_iframes/level_1/unit_3/lesson_4/pop.mp3'] });
function unloadTheSoundsOfThisLesson() { // Call this as the last thing before leaving.
  actionSound3.unload();
  actionSound2.unload();
  actionSound1.unload();
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
const imgC = document.getElementById("imageC");
const imgD = document.getElementById("imageD");

const clickableArea = document.getElementById("idOfTheLittleInvisibleClickableDiv");

function unloadTheImagesOfThisLesson() { // Call this as the last thing before leaving.
  imgA.src = onePixelTransparentGif;
  imgB.src = onePixelTransparentGif;
  imgC.src = onePixelTransparentGif;
  imgD.src = onePixelTransparentGif;
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
  // No syncing necessary in this case. The timing must just feel nice enough!
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
  videoSoundTrack.play();
  if(parent.detectedOS.name != "iOS" && parent.detectedOS.name != "Mac OS") {parent.navigator.vibrate([14,99,11,88,8,77,5]);} // As a response to user's tap
  imgA.style.display = "none";
  imgB.style.display = "initial";
  putTranslationIntoThisHelpAreaFromFileP.innerHTML = " ";
  const imgDivLayerAboveB = document.getElementById('divIdForBallPlayAnimationContainer');
  setTimeout(function () { imgDivLayerAboveB.classList.add("ballPlayersRopeJumpersEtcFadeInToFullOpacity");   },2200); // IMPORTANT! Timing must be accurate.
  setTimeout(function () { actionSound1.play();   if(parent.detectedOS.name != "iOS" && parent.detectedOS.name != "Mac OS") {parent.navigator.vibrate([60,60,20,60,10]);}    },4000); // As players hit the ball
  setTimeout(function () { actionSound1.play();   if(parent.detectedOS.name != "iOS" && parent.detectedOS.name != "Mac OS") {parent.navigator.vibrate([60,60,20,60,10]);}    },6000); // As players hit the ball
  setTimeout(function () { successTone.play(); },4800); // IMPORTANT! Timing must be accurate.
  setTimeout(function () { successTone.play(); },6800); // IMPORTANT! Timing must be accurate.
  setTimeout(function () { imgB.style.display = "none"; imgC.style.display = "initial"; },10200); // IMPORTANT! Timing must be accurate.
  setTimeout(function () { imgC.style.display = "none"; imgD.style.display = "initial"; },15000); // IMPORTANT! Timing must be accurate.
  setTimeout(function () { actionSound2.play(); },13900); // IMPORTANT! Timing must be accurate.
  setTimeout(function () { actionSound3.play(); },16650); // IMPORTANT! Timing must be accurate.
  /* END OF ACTIVITY */
  /* GET READY TO EXIT THIS LESSON */
  setTimeout(function() {
    parent.preloadHandlingDiv.classList.remove("addThisClassToHideThePreloader");
    parent.preloadHandlingDiv.classList.add("addThisClassToRevealThePreloader");
  },15400); // 16900-1500 = 15400 See css_for_every_single_html
  setTimeout(function() {
    unloadTheSoundsOfThisLesson();
    unloadTheImagesOfThisLesson();
  },16800); // Also see js_for_all_iframed_lesson_htmls about unloadTheSoundsOfThisLesson() unloadTheImagesOfThisLesson()
  setTimeout(function () { self.location.href = "../../unit_4/lesson_1/index.html";  },16900);
}
