"use strict";
// Code written by Manheart Earthman=B. A. Bilgekılınç Topraksoy=土本 智一勇夫剛志
// UNAUTHORIZED MODIFICATION IS PROHIBITED: You may not change this file without consent

// IMPORTANT: Find countdownForGiveUpSkipOrGoToNext and adjust its value for each lesson depending on the number of c1 c2 c3 ... visuals

/* __ SAVE PROGRESS TO LOCAL STORAGE __ */
// See js_for_the_parent_all_browsers_all_devices to find how savedProgress.ja savedProgress.zh savedProgress.tr etc are created
const studiedLang = parent.langCodeForTeachingFilePaths.substr(0,2); // en_east en_west will use the same save-slot
// !!! VERY CAREFUL: Watch the lesson name!!!
parent.savedProgress[studiedLang].lesson_WATER_IsViewed=true; // Create and add... or overwrite the same thing
parent.saveJSON = JSON.stringify(parent.savedProgress); // Convert
localStorage.setItem("memoryCard", parent.saveJSON); // Save

// All settings here will depend on the content of the lesson
let theNewWordUserIsLearningNowAndPossibleMishaps = null; // Get this from txt file
// CAUTION: parent.langCodeForTeachingFilePaths variable depends on localStorage data being available. See js_for_the_parent_all_browsers_all_devices.js
const filePathForTheWordOrPhrase = "/speech_recognition_answer_key/"+parent.langCodeForTeachingFilePaths+"/1-1-1-water.txt";
// See js_for_every_single_html.js for the headers setting.
fetch(filePathForTheWordOrPhrase,myHeaders).then(function(response){return response.text();}).then(function(contentOfTheTxtFile){ theNewWordUserIsLearningNowAndPossibleMishaps = contentOfTheTxtFile; });

/* ___AUDIO ELEMENTS___ */ //...Sound player (Howler) exists in the parent html. So the path must be relative to the parent html. Not to the framed html.
// Find soundFileFormat in js_for_all_iframed_lesson_htmls
const say1say2Path = "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_1/lesson_1/water_1-2."+soundFileFormat;
const say3Path     = "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_1/lesson_1/water_3."+soundFileFormat;
const say4say5Path = "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_1/lesson_1/water_4-5."+soundFileFormat;
const say6Path     = "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_1/lesson_1/water_6."+soundFileFormat;
const say7say8Path = "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_1/lesson_1/water_7-8."+soundFileFormat;

const sayAB = new parent.Howl({  src: [say1say2Path]  });
const sayC  = new parent.Howl({  src: [say3Path]      });
const sayDE = new parent.Howl({  src: [say4say5Path]  });
const sayF  = new parent.Howl({  src: [say6Path]      });
const sayGH = new parent.Howl({  src: [say7say8Path]  });

const whatWaterSoundsLike1 = new parent.Howl({  src: ["/lessons_in_iframes/level_1/unit_1/lesson_1/what_water_sounds_like_1."+soundFileFormat]  });
const whatWaterSoundsLike2 = new parent.Howl({  src: ["/lessons_in_iframes/level_1/unit_1/lesson_1/what_water_sounds_like_2."+soundFileFormat]  });
const whatWaterSoundsLike3 = new parent.Howl({  src: ["/lessons_in_iframes/level_1/unit_1/lesson_1/what_water_sounds_like_3."+soundFileFormat]  });
const whatWaterSoundsLike4 = new parent.Howl({  src: ["/lessons_in_iframes/level_1/unit_1/lesson_1/what_water_sounds_like_4."+soundFileFormat]  });
const whatWaterSoundsLike5 = new parent.Howl({  src: ["/lessons_in_iframes/level_1/unit_1/lesson_1/what_water_sounds_like_5."+soundFileFormat]  });
const successTone = new parent.Howl({  src: ["/user_interface/sounds/success1a."+soundFileFormat]  });
// NOTE: Sound initialization happens on the parent but the consts exist in frame. SEE js_for_all_iframed_lesson_htmls » FIND onbeforeunload.
// NOTE: For DING and DONDING sounds see js_for_speech_recognition_algorithm
// NOTE: listOfAllSoundsInThisLesson is also used by pauseTheAppFunction in js_for_the_sliding_navigation_menu
var listOfAllSoundsInThisLesson = [
  //successTone, // EXCEPTION: See unloadThatLastSoundWhichCannotBeUnloadedNormally
  whatWaterSoundsLike5, whatWaterSoundsLike4, whatWaterSoundsLike3, whatWaterSoundsLike2, whatWaterSoundsLike1,
  sayGH, sayF, sayDE, sayC, sayAB
];
function unloadTheSoundsOfThisLesson() { // See onbeforeunload in js_for_all_iframed_lesson_htmls
  for (let i = 0; i < listOfAllSoundsInThisLesson.length; i++) {
      const snd = listOfAllSoundsInThisLesson[i]; snd.unload();
  }
  parent.unloadThatLastSoundWhichCannotBeUnloadedNormally(successTone); // Exists in js_for_navigation_handling,,, unloads the sound after 5s
}

/* ___VISUAL ELEMENTS THAT REQUIRE TIMING___ */
const imgA = document.getElementById("imageA");
const imgB = document.getElementById("imageB");
const imgC = document.getElementById("imageC");
const imgD = document.getElementById("imageD");
const imgE = document.getElementById("imageE");
const imgF = document.getElementById("imageF");
const vid1 = document.getElementById("video1");
const vid2 = document.getElementById("video2");

/* __CONTAINER DIVS__ */
const main = document.getElementsByTagName('MAIN')[0];
const vidsContainer = document.getElementById('containerOfVideosDivID');
const containerOfDoubles = document.getElementById('doublesDivID');
const fullVpDarkBlue = document.getElementById('fullVpDarkBlueDivID');
const nowYouSayIt = document.querySelector('.nowYouSayItImgContainer');
const containerOfSingles = document.getElementById('singlesDivID');

const giveUpAndContinueButtonASIDE = document.getElementsByTagName('ASIDE')[0];
let androidSpeechTimingInfoTxt = null;

/* ___PROGRESSION___ */
// Desktop users can change the speed; mobile users can't. Because the mobile GUI has to stay simple.
window.addEventListener("load",checkIfAppIsPaused, { once: true });
function checkIfAppIsPaused() {
  if (parent.theAppIsPaused) { // See js_for_the_sliding_navigation_menu
    parent.pleaseAllowSound.play(); // Let the wandering user know that the lesson is now ready // See js_for_different_browsers_and_devices
    let unpauseDetector = setInterval(() => {    if (!parent.theAppIsPaused) { clearInterval(unpauseDetector); loadingIsCompleteFunction(); }    }, 500); // NEVER use a SuperInterval here!
  } else { loadingIsCompleteFunction(); }
}

function loadingIsCompleteFunction() {
  // Stop and notify the user if necessary; otherwise just continue.
  if (studiedLang == "zh") { // Display the warning about intonations to users who want to learn the Renmen language.
    const pathOfNotificationAboutRenIntonation = "/user_interface/text/"+userInterfaceLanguage+"/1-1-1_ren_intonation.txt";
    fetch(pathOfNotificationAboutRenIntonation,myHeaders).then(function(response){return response.text();}).then(function(contentOfTheTxtFile){
      new SuperTimeout(function(){ createAndHandleInfoBoxType1BeforeLessonStarts(); putNotificationTxtIntoThisP1.innerHTML = contentOfTheTxtFile; },501); // See js_for_info_boxes_in_lessons.js
      // createAndHandleInfoBoxType1BeforeLessonStarts() will fire startTheLesson() 1.5 seconds after its OK button is clicked/touched
    });
  }
  else if (studiedLang == "ar") { // Display the warning about TANWEEN to users who want to learn the Standard Arabic.
    const pathOfNotificationAboutTanween = "/user_interface/text/"+userInterfaceLanguage+"/1-1-1_arabic_tanween.txt";
    fetch(pathOfNotificationAboutTanween,myHeaders).then(function(response){return response.text();}).then(function(contentOfTheTxtFile){
      new SuperTimeout(function(){ createAndHandleInfoBoxType1BeforeLessonStarts(); putNotificationTxtIntoThisP1.innerHTML = contentOfTheTxtFile; },501); // See js_for_info_boxes_in_lessons.js
      // createAndHandleInfoBoxType1BeforeLessonStarts() will fire startTheLesson() 1.5 seconds after its OK button is clicked/touched
    });
  }
  else if (studiedLang == "ja") { // Display the explanation about "mizu" and "omizu".
    const pathOfNotificationAboutMizuOmizu = "/user_interface/text/"+userInterfaceLanguage+"/1-1-1_hito_mizu_omizu.txt"; // See js_for_every_single_html to find userInterfaceLanguage
    fetch(pathOfNotificationAboutMizuOmizu,myHeaders).then(function(response){return response.text();}).then(function(contentOfTheTxtFile){
      new SuperTimeout(function(){ createAndHandleInfoBoxType1BeforeLessonStarts(); putNotificationTxtIntoThisP1.innerHTML = contentOfTheTxtFile; },501); // See js_for_info_boxes_in_lessons.js
      // createAndHandleInfoBoxType1BeforeLessonStarts() will fire startTheLesson() 1.5 seconds after its OK button is clicked/touched
    });
  }
  else if (studiedLang == "??") {

  }
  else {
    startTheLesson(); // Call it now if it was not called from within createAndHandleInfoBoxType1BeforeLessonStarts() in js_for_info_boxes_in_lessons.js
  }
  //--- By the way: Get the android-speech-timing-notification text ready
  if (isAndroid) { // See js_for_different_browsers_and_devices AND js_for_all_iframed_lesson_htmls
    setTimeout(function () { // We don't want a SuperTimeout in this case
      // Will show for all languages but only on Android
      const pathOfNotificationAboutAndroidTiming = "/user_interface/text/"+userInterfaceLanguage+"/0lesson-android_speech_timing.txt";
      fetch(pathOfNotificationAboutAndroidTiming,myHeaders).then(function(response){return response.text();}).then(function(contentOfTheTxtFile){
        androidSpeechTimingInfoTxt = contentOfTheTxtFile;
      });
    }, 5000);
  }
}
// NOTE: The preloader disappears in 500ms » See css_for_preloader_and_orbiting_circles
// For speedAdjustmentSetting see js_for_the_sliding_navigation_menu.js
function startTheLesson() {
  let sayTime, proceedTime;
  switch (parent.speedAdjustmentSetting) {
    case "slow": sayTime = 4500; proceedTime = 10500; break; // Leave room for sfx
    case "fast": sayTime = 2500; proceedTime = 7500;  break; // Leave room for sfx
    default:     sayTime = 3400; proceedTime = 9100; // Leave room for sfx
  }
  //---
  whatWaterSoundsLike1.play(); whatWaterSoundsLike1.fade(0,1,2000); //8607ms           // Play for a few seconds at full volume
  new SuperTimeout(function(){ whatWaterSoundsLike1.fade(1,0.33,1000); }, sayTime - 1000); // and then fade down volume to about half to make room for teacher's voice
  new SuperTimeout(function(){      sayAB.play();      sayAB.once("end", function(){  whatWaterSoundsLike1.fade(0.33,1,1000);  });      }, sayTime); // Assume that teacher will be talking for 5000ms
  new SuperTimeout(function(){ blurABandBringVid1OverAB(); }, proceedTime); // slow, normal, fast
}

function blurABandBringVid1OverAB() {
  let blurTime, startTime, sayTime, proceedTime;
  switch (parent.speedAdjustmentSetting) {
    case "slow": blurTime = 4.60; startTime = 0; sayTime = 8000; proceedTime = 11000; break; // proceedTime must depend on video length
    case "fast": blurTime = 2.00; startTime = 0; sayTime = 6000; proceedTime = 9000;  break; // proceedTime must depend on video length
    default:     blurTime = 3.30; startTime = 0; sayTime = 7000; proceedTime = 10000; // proceedTime must depend on video length
  }

  main.style.animationDuration = String(blurTime)+"s"; // Blur+Unblur paused at mid » See css_for_photos_and_videos_teach_a_new_word
  if (deviceDetector.isMobile){ main.classList.add("grayscaleUngrayscalePauseUnpauseAtMid"); } /*Easy on CPU*/
  else { main.classList.add("blurUnblurPauseUnpauseAtMid"); }

  new SuperTimeout(function(){ main.style.animationPlayState = "paused"; }, blurTime*500); // Full blur in fast:1s, normal:1.75s, slow:2.5s // Using "paused" can give inaccurate results, but in this case it is usable even if it can't stop at exactly 50%
  // Bring the 1st video
  vidsContainer.classList.add("videoAppearsOverPhotos");
  vidsContainer.style.animationDuration = (blurTime/3).toFixed(2)+"s";
  vidsContainer.style.display = "block";
  new SuperTimeout(checkIfVid1CanPlayNiceAndSmooth, blurTime*500 - 500); // Video will start playing 0.5s before it is unblurred
  function checkIfVid1CanPlayNiceAndSmooth() {
    if (vid1.readyState === 4) { // The video is (mostly) loaded and ready to play. We cannot rely on canplaythrough event as it might never fire when added after the video is fully (or mostly) loaded.
      playVid1NowThatItCanPlayThrough(); parent.console.log("1st video was already loaded and so it will now play");
    } else if (vid1.readyState === 0) { // There must be a serious problem with reading the file
      removeVid1AndReturnToAB(); // TOO BAD: Skip the video
      parent.console.error("There seems a problem with the 1st video. Will skip it.");
    } else { // The video is still loading or buffering
      parent.console.log("Waiting for the 1st video to be playable");
      // Looks like NEITHER loadeddata event NOR canplaythrough event is guaranteed to fire in this case which means we have to do it with an interval check.
      // We are expecting that the poster images will be showing until readyState is 3
      const thisKeepsCheckingVid1 = new SuperInterval(playVid1IfCanAndRemoveTheEventListenerToo,250);
      function playVid1IfCanAndRemoveTheEventListenerToo() {
        if (vid1.readyState === 4) { playVid1NowThatItCanPlayThrough(); thisKeepsCheckingVid1.clear(); parent.console.log("1st video is now playable"); }
      }
    }
  }
  function playVid1NowThatItCanPlayThrough(){ // Video of glass being filled with water
    // NOT NEEDED IN THIS CASE: if (startTime !== 0) { vid1.currentTime = startTime; }
    vid1.play(); // Let video play and then go back to double photos (still image pairs),,, total video length ~ ???s.
    whatWaterSoundsLike2.play(); // Audio sync is not ideal but let's call it good enough
    new SuperTimeout(function(){ whatWaterSoundsLike2.fade(1,0.33,1000); }, sayTime - 1000);
    new SuperTimeout(function(){      sayC.play();      sayC.once("end", function(){ whatWaterSoundsLike2.fade(0.33,1,1000);  });      }, sayTime);
    new SuperTimeout(function(){ removeVid1AndReturnToAB(); }, proceedTime);
  }
} // End of blurABandBringVid1OverAB

function removeVid1AndReturnToAB() {
  let blurTime;
  switch (parent.speedAdjustmentSetting) {
    case "slow": blurTime = 5.00; break;
    case "fast": blurTime = 2.00; break;
    default:     blurTime = 3.50;
  }
  // Blur it away ...
  vidsContainer.classList.remove("videoAppearsOverPhotos"); vidsContainer.classList.add("videoDisappearsOverPhotos"); // CONSIDER: animationDuration
  vidsContainer.style.animationDuration = (blurTime/2).toFixed(2)+"s";
  new SuperTimeout(function(){
    vidsContainer.removeChild(vid1);  vidsContainer.style.display = "none";  vidsContainer.classList.remove("videoDisappearsOverPhotos"); // Reset
    vid2.style.display = "block"; // Get ready for the next one
  }, 2750); // Longest it can take is 5000/2=2500
  main.style.animationPlayState = "running"; // Unblur back in
  new SuperTimeout(function(){ main.classList.remove("blurUnblurPauseUnpauseAtMid"); main.classList.remove("grayscaleUngrayscalePauseUnpauseAtMid"); }, 3500); // 2500+750 = 3250 is the longest possible // To be able to restart // It's OK to omit if (isMobile)
  new SuperTimeout(function(){ goFromABtoCD(); }, blurTime*500); // Half of the value in milliseconds
}

function goFromABtoCD() {
  let changeTime, sayTime, proceedTime;
  switch (parent.speedAdjustmentSetting) {
    case "slow": changeTime = 3; sayTime = 5500; proceedTime = 11500; break; // Leave room for sfx
    case "fast": changeTime = 1; sayTime = 3500; proceedTime = 8500;  break; // Leave room for sfx
    default:     changeTime = 2; sayTime = 4400; proceedTime = 10100; // Leave room for sfx
  }
  imgA.classList.add("makePhotosDisappear");  imgA.style.animationDuration = String(changeTime)+"s";
  imgB.classList.add("makePhotosDisappear");  imgB.style.animationDuration = String(changeTime)+"s";

  new SuperTimeout(function(){
    imgC.style.display = "block ";   imgC.classList.add("makePhotosAppear");   imgC.style.animationDuration = String(changeTime)+"s";
    imgD.style.display = "block ";   imgD.classList.add("makePhotosAppear");   imgD.style.animationDuration = String(changeTime)+"s";
    whatWaterSoundsLike3.play(); // 8808ms
    new SuperTimeout(function(){ whatWaterSoundsLike3.fade(1,0.33,1000); }, sayTime - 1000); // Start fading 1000ms before teacher talks
    new SuperTimeout(function(){      sayDE.play();     sayDE.once("end", function(){  whatWaterSoundsLike3.fade(0.33,1,1000);  });      }, sayTime);
  }, changeTime*500); // Overlap images instead of to-white-from-white
  new SuperTimeout(function(){ blurCDandBringVid2OverCD(); }, changeTime*500 + proceedTime);
}

function blurCDandBringVid2OverCD() {
  let blurTime, startTime, sayTime, proceedTime;
  switch (parent.speedAdjustmentSetting) {
    case "slow": blurTime = 4.60; startTime = 0; sayTime = 9000; proceedTime = 13000; break; // proceedTime must depend on video length
    case "fast": blurTime = 2.00; startTime = 0; sayTime = 7750; proceedTime = 9750;  break; // proceedTime must depend on video length
    default:     blurTime = 3.30; startTime = 0; sayTime = 8000; proceedTime = 11000; // proceedTime must depend on video length
  }

  main.style.animationDuration = String(blurTime)+"s"; // Blur+Unblur paused at mid » See css_for_photos_and_videos_teach_a_new_word
  if (deviceDetector.isMobile){ main.classList.add("grayscaleUngrayscalePauseUnpauseAtMid"); } /*Easy on CPU*/
  else { main.classList.add("blurUnblurPauseUnpauseAtMid"); }

  new SuperTimeout(function(){ main.style.animationPlayState = "paused"; }, blurTime*500); // To full blur in fast:1s, normal:1.75s, slow:2.5s
  // Bring the 2nd video
  vidsContainer.classList.add("videoAppearsOverPhotos");
  vidsContainer.style.animationDuration = (blurTime/3).toFixed(2)+"s";
  vidsContainer.style.display = "block";
  new SuperTimeout(checkIfVid2CanPlayNiceAndSmooth, blurTime*500 - 500); // Video will start playing 0.5s before it is unblurred
  function checkIfVid2CanPlayNiceAndSmooth() {
    if (vid2.readyState === 4) { // The video is (mostly) loaded and ready to play. We cannot rely on canplaythrough event as it might never fire when added after the video is fully loaded.
      playVid2NowThatItCanPlayThrough(); parent.console.log("2nd video was already loaded and so it will now play");
    } else if (vid2.readyState === 0) { // There must be a serious problem with reading the file
      removeVid2AndReturnToCD(); // TOO BAD: Skip the video
      parent.console.error("There seems a problem with the 2nd video. Will skip it.");
    } else { // The video is still loading or buffering
      parent.console.log("Waiting for the 2nd video to be playable");
      // Looks like NEITHER loadeddata event NOR canplaythrough event is guaranteed to fire in this case which means we have to do it with an interval check.
      // We are expecting that the poster images will be showing until readyState is 3
      const thisKeepsCheckingVid2 = new SuperInterval(playVid2IfCanAndRemoveTheEventListenerToo,250);
      function playVid2IfCanAndRemoveTheEventListenerToo() {
        if (vid2.readyState === 4) { playVid2NowThatItCanPlayThrough(); thisKeepsCheckingVid2.clear(); parent.console.log("2nd video is now playable"); }
      }
    }
  }
  function playVid2NowThatItCanPlayThrough(){
    // NOT NEEDED IN THIS CASE: if (startTime !== 0) { vid2.currentTime = startTime; }
    vid2.play(); // Let video play and then go back to double photos (still image pairs),,, total video length ~ ???s.
    whatWaterSoundsLike4.play(); // 9048ms
    new SuperTimeout(function(){ whatWaterSoundsLike4.fade(1,0.33,1000); }, sayTime - 1000);
    new SuperTimeout(function(){      sayF.play();      sayF.once("end", function(){ whatWaterSoundsLike4.fade(0.33,1,1000);  });      }, sayTime);
    new SuperTimeout(function(){ removeVid2AndReturnToCD(); }, proceedTime);
  }
}

function removeVid2AndReturnToCD() {
  let blurTime;
  switch (parent.speedAdjustmentSetting) {
    case "slow": blurTime = 5.00; break;
    case "fast": blurTime = 2.00; break;
    default:     blurTime = 3.50;
  }
  // Blur it away ...
  vidsContainer.classList.remove("videoAppearsOverPhotos"); vidsContainer.classList.add("videoDisappearsOverPhotos"); // Watch animationDuration
  vidsContainer.style.animationDuration = (blurTime/2).toFixed(2)+"s";
  new SuperTimeout(function(){
    vidsContainer.removeChild(vid2);  vidsContainer.style.display = "none";
    // There is no 3rd video so there is no need to remove("videoDisappearsOverPhotos")
  }, 2750); // Longest it can take is 5000/2=2500
  main.style.animationPlayState = "running"; // Unblur back in
  new SuperTimeout(function(){ main.classList.remove("blurUnblurPauseUnpauseAtMid"); main.classList.remove("grayscaleUngrayscalePauseUnpauseAtMid"); }, 3500); // 2500+750 = 3250 is the longest possible // Not necessary as there won't be any other animations on MAIN BUT: Just to keep things tidy
  new SuperTimeout(function(){ goFromCDtoEF(); }, blurTime*500); // Half of the value in milliseconds
}

function goFromCDtoEF() {
  let changeTime, sayTime, proceedTime;
  switch (parent.speedAdjustmentSetting) {
    case "slow": changeTime = 3; sayTime = 4500; proceedTime = 13500;  break;  // Leave room for sfx - Consider special case WATERFALLS
    case "fast": changeTime = 1; sayTime = 2500; proceedTime = 10500;  break; // Leave room for sfx - Consider special case WATERFALLS
    default:     changeTime = 2; sayTime = 3400; proceedTime = 12000; // Leave room for sfx - Consider special case WATERFALLS
  }
  // ---
  imgC.classList.remove("makePhotosAppear");  imgC.classList.add("makePhotosDisappear");  imgC.style.animationDuration = String(changeTime)+"s";
  imgD.classList.remove("makePhotosAppear");  imgD.classList.add("makePhotosDisappear");  imgD.style.animationDuration = String(changeTime)+"s";

  new SuperTimeout(function(){
    imgE.style.display = "block ";   imgE.classList.add("makePhotosAppear");   imgE.style.animationDuration = String(changeTime)+"s";
    imgF.style.display = "block ";   imgF.classList.add("makePhotosAppear");   imgF.style.animationDuration = String(changeTime)+"s";
    whatWaterSoundsLike5.play(); // 13944ms audio
    new SuperTimeout(function(){ whatWaterSoundsLike5.fade(1,0.33,1000); }, sayTime - 1000);
    new SuperTimeout(function(){      sayGH.play();     sayGH.once("end", function(){  whatWaterSoundsLike5.fade(0.33,1,1000);  });      }, sayTime);
  }, changeTime*500); // Overlap images instead of to-white-from-white

  // No more videos to bring

  // ---
  new SuperTimeout(function () {
    // Special situation for Android users when viewing the first lesson (water.js)
    if (isAndroid && androidSpeechTimingInfoTxt) { // User's device is Android and fetch has successfully got the text from file
      putNotificationTxtIntoThisP2.innerHTML = androidSpeechTimingInfoTxt;
      createAndHandleInfoBoxType1AmidLesson(); // continueLesson() will be fired from within -> See js_for_info_boxes_in_lessons
    } else { // Either not Android or a mishap of 0.01% chance occured and fetch couldn't get the txt file
      continueLesson();
    }
  }, changeTime*500 + proceedTime);
}

function continueLesson() {
  display_nowItsYourTurn_animation();
}

/* Get ready for speech recognition */
let countdownForGiveUpSkipOrGoToNext = 3300; // This value is for non-whitelisted browsers or when microphone is not allowed » it will be overwritten if parent.willUserTalkToSpeechRecognition is true
function display_nowItsYourTurn_animation() {
  let changeTime, dingTimeMeansProceedTime;
  switch (parent.speedAdjustmentSetting) {
    case "slow": changeTime = 3; dingTimeMeansProceedTime = 4600; break;
    case "fast": changeTime = 1; dingTimeMeansProceedTime = 3000; break;
    default:     changeTime = 2; dingTimeMeansProceedTime = 3600;
  }
  containerOfDoubles.classList.add("makePhotosDisappear"); containerOfDoubles.style.animationDuration = String(changeTime)+"s";
  new SuperTimeout(function(){ containerOfDoubles.parentNode.removeChild(containerOfDoubles); }, changeTime*1000 + 250); // Remove shortly after opacity hits zero

  fullVpDarkBlue.style.display = "block"; fullVpDarkBlue.classList.add("darkenLightenBackground"); fullVpDarkBlue.style.animationDuration = String(changeTime*2)+"s";
  new SuperTimeout(function(){ fullVpDarkBlue.style.animationPlayState = "paused"; }, changeTime*1000); // Pause at halfway
  // nowYouSayIt takes 5100ms
  // Display the “It's your turn” animation if the user's browser is whitelisted.
  new SuperTimeout(function(){
    if (parent.willUserTalkToSpeechRecognition) {
      countdownForGiveUpSkipOrGoToNext = 40000; // For whitelisted browsers » Should depend on how many photos there are!
      if (parent.internetConnectivityIsNiceAndUsable) {
        // Now-you-say-it animation will be skipped when there is no connectivity
        nowYouSayIt.style.display = "block"; // See » css_for_photos_and_videos_teach_a_new_word » to find how it is centered
        if (nowYouSayIt.children[0].src.includes(".avif")) {   nowYouSayIt.children[0].classList.add("animateAvifSprite");   }
        new SuperTimeout(function(){ resetWebp(nowYouSayIt.children[0]); nowYouSayIt.style.display = "none"; }, 5101);
      } // DEPRECATE and use createAndHandleInternetConnectivityIsLostBox instead: else if (typeof warnUserAboutSlowNetwork === "function") {  warnUserAboutSlowNetwork();  } // Exists in js_for_all_iframed_lesson_htmls
    }
  }, changeTime*1000 - 600);
  // --
  new SuperTimeout(function(){ speakToTheMic(); }, dingTimeMeansProceedTime); // Makes the DING tone play
  new SuperTimeout(function(){
    containerOfSingles.style.display = "block"; containerOfSingles.classList.add("singlesContainerAppears"); // Fixed animation duration (1.5s) to avoid conflict
    numberOfThoseThatAreYetToBeShown = allSingles.length - 1;
    new SuperTimeout(function(){ showSinglesOneByOne(); }, 1500);
  }, dingTimeMeansProceedTime + changeTime*300);
}
// -
let tickUntilSuccessHappens;
const allSingles = containerOfSingles.children; // Use children instead of childNodes to ignore HTML comments
let numberOfThoseThatAreYetToBeShown;
function showSinglesOneByOne() {
  let i = 0; const modulus = allSingles.length;
  let changeTime;  switch (parent.speedAdjustmentSetting) {
    case "slow": changeTime = 5.00; break;
    case "fast": changeTime = 2.00; break;
    default:     changeTime = 3.50;
  }
  tickUntilSuccessHappens = new SuperInterval(bringTheNext, changeTime*1000); // Minor issue: Changing speedAdjustmentSetting will not take effect once this starts ticking
  function bringTheNext() {
    const current = i%modulus; const next = (i+1)%modulus;
    allSingles[current].classList.remove("simpleFadeIn");  allSingles[current].classList.add("simpleFadeOut");  allSingles[current].style.animationDuration  = String(changeTime/2)+"s";
    allSingles[next].classList.remove("simpleFadeOut");    allSingles[next].classList.add("simpleFadeIn");      allSingles[next].style.animationDuration = String(changeTime/2)+"s";
    allSingles[current].style.zIndex = String(i+50);
    allSingles[next].style.zIndex = String(i+51);
    if (numberOfThoseThatAreYetToBeShown>0) { numberOfThoseThatAreYetToBeShown--; }
    i++;
  }
}

function quicklyShowAllRemainingSingles() {
  return new Promise((resolve) => {
    if (numberOfThoseThatAreYetToBeShown) { // One or more «singles» images have never been displayed
      // Hide all of them
      for (let z = 0; z < allSingles.length; z++) {
        allSingles[z].classList.remove("simpleFadeIn"); allSingles[z].classList.remove("simpleFadeOut"); allSingles[z].style.visibility = "hidden";
      }
      // Start with displaying the one that was showing at the moment of success
      let j = allSingles.length-numberOfThoseThatAreYetToBeShown-1;
      allSingles[j].style.visibility = "visible";
      const modulus = allSingles.length;
      let changeTime;  switch (parent.speedAdjustmentSetting) {
        case "slow": changeTime = 750; break;
        case "fast": changeTime = 250; break;
        default:     changeTime = 500;
      }
      new SuperTimeout(showNextOneImmediately,changeTime*2+1000);
      function showNextOneImmediately() {
        if (numberOfThoseThatAreYetToBeShown>0) { numberOfThoseThatAreYetToBeShown--;
          const current = j%modulus; const next = (j+1)%modulus;
          allSingles[current].style.visibility = "hidden";
          allSingles[next].style.visibility = "visible";
          j++;
          new SuperTimeout(showNextOneImmediately,changeTime);
        } else {  resolve();  }
      }
    } else { // All «singles» images have been displayed at least once
      resolve();
    }
  });
}

/* ___SPEECH RECOGNITION___ */
var userHasGivenUp = false;
var preventGiveUpButtonIfSuccessHappens;

function speakToTheMic() {

  new SuperTimeout(function () {
    // The GIVE-UP-BUTTON appears (which turns into a Go-To-Next-Button on Firefox2021 etc).
    // If speech is recognized, use clearTimeout to prevent its "showing-up".
    preventGiveUpButtonIfSuccessHappens = new SuperTimeout(function () { // This must start ticking only after countdownForGiveUpSkipOrGoToNext is updated.
      giveUpAndContinueButtonASIDE.classList.add("addThisToGlassButtonToUnhide");
    },countdownForGiveUpSkipOrGoToNext); // This must start ticking only after countdownForGiveUpSkipOrGoToNext is updated.
  },120);
  // Timeout may be paused by seeIfUserIsAbleToPronounce in case of connectivity loss » Once paused it must stay paused until connectivity is restored
  new SuperTimeout(function() {  startStandardAudioInputVisualization();  },2500); // Will work only on devices that can handle it. See js_for_microphone_input_visualization.js

  // setLanguage() for annyang|SpeechRecognition is in /js_reusables/js_for_the_parent_all_browsers_all_devices.js
  let eachWordArray;
  if (theNewWordUserIsLearningNowAndPossibleMishaps) { // It means fetch did indeed get the file
    eachWordArray = theNewWordUserIsLearningNowAndPossibleMishaps.split("|"); // The text files in speech_recognition_answer_key must be written with the | (bar) character as the separator between phrases.
    // Do not apply any time-limits or retry-limits
    seeIfUserIsAbleToPronounce(eachWordArray).then(stopListeningAndProceedToNext).catch((error) => { parent.console.error(error); });
    // See js_for_speech_recognition_algorithm
  } else { // fetch has failed to get the file
    // There must have been a terrible connectivity problem
    alert("💢 📶 💢 📶 💢 📶 💢 📶 💢"); // Show an international alert
    parent.ayFreym.src = "/progress_chart/index.html"; // Try to navigate to the progress_chart as the last thing to do
  }

} /* END OF speakToTheMic */

function stopListeningAndProceedToNext() {
  if (!userHasGivenUp) { // Real success of speech recognition
    tickUntilSuccessHappens.clear(); quicklyShowAllRemainingSingles().then(nowItIsOkToExit);
    successTone.play(); fullVpDarkBlue.style.animationPlayState = "running"; containerOfSingles.classList.add("brightenUp");
    if (canVibrate) {  navigator.vibrate([14, 133, 12, 111, 12, 133, 20]);  } // See js_for_every_single_html.js for canVibrate
    preventGiveUpButtonIfSuccessHappens.clear(); // Used to be clearTimeout(preventGiveUpButtonIfSuccessHappens); // i.e. without supertimeout.js
    giveUpAndContinueButtonASIDE.classList.add("addThisToGlassButtonWhenSuccessHappens");
  } else { // Give up and continue
    containerOfSingles.classList.add("darkenDown");
    if (canVibrate) {  navigator.vibrate([13]);  } // See js_for_every_single_html.js for canVibrate
    tickUntilSuccessHappens.clear(); quicklyShowAllRemainingSingles().then(nowItIsOkToExit);
  }
  // Stop all microphone activity as soon as success happens and don’t wait until “beforeunload” fires.
  // See js_for_all_iframed_lesson_htmls to find what happens with window.onbeforeunload
  if (parent.annyang) { // As of 2021, Firefox says annyang is undefined. But the app still has to work without Web Speech API so the code must be wrapped in if(parent.annyang).
    parent.annyang.removeCallback(); // Remove all script activity // Instead of DEPRECATED parent.annyang.removeCommands();
    /* DEPRECATE: Looks like we cannot avoid Safari's repeating "allow mic" annoyance by pausing annyang instead of turning it off.
    if (isApple) { parent.annyang.pause(); } // BESIDES: CPU demand is somewhat too high when MIC is ON. So we want to turn it off whenever it is not in use.
    else { parent.annyang.abort(); }
    */
    parent.annyang.abort(); // Better if we tell or let Safari user figure out how to "permanently allow mic"
  }
  // Stop AUDIOMETER microphone: We don't want to wait for "beforeunload" so we call the function immediately even though it will fire one more time with window.onbeforeunload
  // We cannot disable "beforeunload" BECAUSE if user navigates away in the middle of a mic session we want the mic turned off
  // Yet, we also want to hide the visualization asap when success happens, therefore it has to be armed both in js_for_all_iframed_lesson_htmls and here
  stopStandardAudioInputVisualization(); // See js_for_microphone_input_visualization

  /* Save progress */
  if (!userHasGivenUp) { // User was successful with speech recognition
    parent.savedProgress[studiedLang].lesson_WATER_IsCompleted=true; // WATCH THE NAME OF THE LESSON!!!
  } else { // User has given up and wants to continue anyhow // REVISED AND CHANGED: Count skipping as success
    parent.savedProgress[studiedLang].lesson_WATER_IsCompleted=true; // WATCH THE NAME OF THE LESSON!!!
  }
  parent.saveJSON = JSON.stringify(parent.savedProgress); // Convert
  localStorage.setItem("memoryCard", parent.saveJSON); // Save

  /* GET READY TO EXIT THIS LESSON */
  let endTime;
  switch (parent.speedAdjustmentSetting) { case "slow": endTime = 5000; break;    case "fast": endTime = 3000; break;    default: endTime = 4000; }
  function nowItIsOkToExit() {
    new SuperTimeout(function() { showGlobyPreloaderBeforeExit(); },endTime-1500); // See js_for_all_iframed_lesson_htmls AND See css_for_preloader_and_orbiting_circles
    // REMEMBER: iframe.src change makes window.onbeforeunload fire in js_for_all_iframed_lesson_htmls.js which then calls unloadTheSoundsOfThisLesson();
    parent.pathOfWhatWillBeDisplayedUnlessInternetConnectivityIsLost = "/lessons_in_iframes/level_1/unit_1/lesson_2/index.html"; // See js_for_online_and_offline_modes
    // --- HANDLE ONLINE and OFFLINE cases
    if (parent.internetConnectivityIsNiceAndUsable) { // See js_for_online_and_offline_modes.js
      new SuperTimeout(function() { parent.ayFreym.src = parent.pathOfWhatWillBeDisplayedUnlessInternetConnectivityIsLost; },endTime);
    } else { parent.console.warn("THE DEVICE IS OFFLINE (detected at the end of lesson");
      const isCached = checkIfNextLessonIsCachedAndRedirectIfNot(112); // See js_for_all_iframed_lesson_htmls
      if (isCached) { parent.console.warn("WILL TRY TO CONTINUE OFFLINE");
        new SuperTimeout(function() { parent.ayFreym.src = parent.pathOfWhatWillBeDisplayedUnlessInternetConnectivityIsLost; },endTime);
      }
    }
  }
  // ---
} // END OF stopListeningAndProceedToNext
