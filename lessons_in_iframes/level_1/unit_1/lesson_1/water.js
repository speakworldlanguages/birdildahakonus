"use strict";
// Code written by Manheart Earthman=B. A. Bilgekılınç Topraksoy=土本 智一勇夫剛志
// UNAUTHORIZED MODIFICATION IS PROHIBITED: You may not change this file without obtaining permission

// IMPORTANT: Find countdownForGiveUpSkipOrGoToNext and adjust its value for each lesson depending on the number of c1 c2 c3 ... visuals

/* __ SAVE PROGRESS TO LOCAL STORAGE __ */
// See js_for_the_parent_all_browsers_all_devices to find how savedProgress.ja savedProgress.zh savedProgress.tr savedProgress.ar savedProgress.en are created
const studiedLang = parent.langCodeForTeachingFilePaths.substr(0,2); // en_east en_west will use the same save-slot
// !!! VERY CAREFUL: Watch the lesson name!!!
parent.savedProgress[studiedLang].lesson_WATER_IsViewed=true; // Create and add... or overwrite the same thing
parent.saveJSON = JSON.stringify(parent.savedProgress); // Convert
localStorage.setItem("memoryCard", parent.saveJSON); // Save

// All settings here will depend on the content of the lesson
let theNewWordUserIsLearningNowAndPossibleMishaps; // Get this from txt file
// CAUTION: parent.langCodeForTeachingFilePaths variable depends on localStorage data being available. See js_for_the_parent_all_browsers_all_devices.js
const filePathForTheWordOrPhrase = "/speech_recognition_answer_key/"+parent.langCodeForTeachingFilePaths+"/1-1-1-water.txt";
// See js_for_every_single_html.js for the headers setting.
fetch(filePathForTheWordOrPhrase,myHeaders).then(function(response){return response.text();}).then(function(contentOfTheTxtFile){ theNewWordUserIsLearningNowAndPossibleMishaps = contentOfTheTxtFile; });

/* ___AUDIO ELEMENTS___ */ //...Sound player (Howler) exists in the parent html. So the path must be relative to the parent html. Not to the framed html.
const say1say2Path = "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_1/lesson_1/water_1-2.webm";
const say3Path     = "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_1/lesson_1/water_3.webm";
const say4say5Path = "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_1/lesson_1/water_4-5.webm";
const say6Path     = "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_1/lesson_1/water_6.webm";
const say7say8Path = "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_1/lesson_1/water_7-8.webm";

const sayAB = new parent.Howl({  src: [say1say2Path]  });
const sayC  = new parent.Howl({  src: [say3Path]      });
const sayDE = new parent.Howl({  src: [say4say5Path]  });
const sayF  = new parent.Howl({  src: [say6Path]      });
const sayGH = new parent.Howl({  src: [say7say8Path]  });

const whatWaterSoundsLike1 = new parent.Howl({  src: ["/lessons_in_iframes/level_1/unit_1/lesson_1/what_water_sounds_like_1.webm"]  });
const whatWaterSoundsLike2 = new parent.Howl({  src: ["/lessons_in_iframes/level_1/unit_1/lesson_1/what_water_sounds_like_2.webm"]  });
const whatWaterSoundsLike3 = new parent.Howl({  src: ["/lessons_in_iframes/level_1/unit_1/lesson_1/what_water_sounds_like_3.webm"]  });
const whatWaterSoundsLike4 = new parent.Howl({  src: ["/lessons_in_iframes/level_1/unit_1/lesson_1/what_water_sounds_like_4.webm"]  });
const whatWaterSoundsLike5 = new parent.Howl({  src: ["/lessons_in_iframes/level_1/unit_1/lesson_1/what_water_sounds_like_5.webm"]  });
const successTone = new parent.Howl({  src: ["/user_interface/sounds/success1a.webm"]  });
const notificationDingTone = new parent.Howl({  src: ["/user_interface/sounds/ding.webm"]  });
/* Sound initialization happens on the parent but the consts exist in frame. SEE js_for_all_iframed_lesson_htmls » FIND onbeforeunload. */
// listOfAllSoundsInThisLesson is also used by pauseTheAppFunction in js_for_the_sliding_navigation_menu
var listOfAllSoundsInThisLesson = [
  notificationDingTone,
  //successTone, // EXCEPTION: See unloadThatLastSoundWhichCannotBeUnloadedNormally
  whatWaterSoundsLike5,
  whatWaterSoundsLike4,
  whatWaterSoundsLike3,
  whatWaterSoundsLike2,
  whatWaterSoundsLike1,
  sayGH,
  sayF,
  sayDE,
  sayC,
  sayAB
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
let androidSpeechTimingInfoTxt = "…";
/* ___PROGRESSION___ */
window.addEventListener("load",function(){   loadingIsCompleteFunction();   }, { once: true });
// Desktop users can change the speed; mobile users can't. Because the mobile GUI has to stay simple.
function loadingIsCompleteFunction()
{
  // Stop and notify the user if necessary; otherwise just continue.
  if (studiedLang == "zh") { // Display the warning about intonations to users who want to learn the Ren language.
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
  else {
    startTheLesson(); // Call it now if it was not called from within createAndHandleInfoBoxType1BeforeLessonStarts() in js_for_all_iframed_lesson_htmls.js
  }
  //--- By the way: Get the android-speech-timing-notification text ready
  if (parent.isAndroid) {
    const pathOfNotificationAboutAndroidTiming = "/user_interface/text/"+userInterfaceLanguage+"/0lesson-android_speech_timing.txt";
    fetch(pathOfNotificationAboutAndroidTiming,myHeaders).then(function(response){return response.text();}).then(function(contentOfTheTxtFile){
      androidSpeechTimingInfoTxt = contentOfTheTxtFile;
    });
  }
}
// NOTE: The preloader disappears in 500ms » See css_for_preloader_and_orbiting_circles
// For speedAdjustmentSetting see js_for_the_sliding_navigation_menu.js
function startTheLesson()
{
  let sayTime, proceedTime;
  switch (parent.speedAdjustmentSetting) {
    case "slow": sayTime = 4500; proceedTime = 10500; break; // Leave room for sfx
    case "fast": sayTime = 2500; proceedTime = 7500;  break; // Leave room for sfx
    default:     sayTime = 3400; proceedTime = 9100; // Leave room for sfx
  }
  //---
  whatWaterSoundsLike1.play(); //8607ms           // Play for a few seconds at full volume
  new SuperTimeout(function(){ whatWaterSoundsLike1.fade(1,0.4,500); }, sayTime - 500); // and then fade down volume to about half to make room for teacher's voice
  new SuperTimeout(function(){ sayAB.play(); }, sayTime); // Assume that teacher will be talking for 5000ms
  sayAB.once("end", function(){  whatWaterSoundsLike1.fade(0.4,1,500);  }); // Fade back to full volume quickly even though whatWaterSoundsLike1 (wave file) ends with fade down
  new SuperTimeout(function () { blurABandBringVid1OverAB(); }, proceedTime); // slow, normal, fast
}

function blurABandBringVid1OverAB() {
  let blurTime, sayTime, proceedTime;
  switch (parent.speedAdjustmentSetting) {
    case "slow": blurTime = 4.60; sayTime = 8000; proceedTime = 11000; break; // proceedTime must depend on video length
    case "fast": blurTime = 2.00; sayTime = 7000; proceedTime = 9000;  break; // proceedTime must depend on video length
    default:     blurTime = 3.30; sayTime = 7500; proceedTime = 10000; // proceedTime must depend on video length
  }

  main.style.animationDuration = String(blurTime)+"s"; // Blur+Unblur paused at mid » See css_for_photos_and_videos_teach_a_new_word
  if (deviceDetector.isMobile){ main.classList.add("grayscaleUngrayscalePauseUnpauseAtMid"); } /*Easy on CPU*/
  else { main.classList.add("blurUnblurPauseUnpauseAtMid"); }

  new SuperTimeout(function(){ main.style.animationPlayState = "paused"; }, blurTime*500); // Full blur in fast:1s, normal:1.75s, slow:2.5s // Using "paused" can give inaccurate results, but in this case it is usable even if it can't stop at exactly 50%
  // Bring the 1st video
  vidsContainer.classList.add("videoAppearsOverPhotos");
  vidsContainer.style.animationDuration = (blurTime/3).toFixed(2)+"s";
  vidsContainer.style.display = "block"; vid1.currentTime = 0;
  new SuperTimeout(function(){
    vid1.play(); // Let video play and then go back to double photos (still image pairs),,, total video length ~ 8.5s but action ends at ~7.1s.
    whatWaterSoundsLike2.play(); // Audio sync is not ideal but let's call it good enough
    new SuperTimeout(function(){ sayC.play(); }, sayTime);
    new SuperTimeout(function(){ removeVid1AndReturnToAB(); }, proceedTime);
  }, blurTime*500 - 500); // Video will start playing 0.5s before it is unblurred
}

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
    new SuperTimeout(function(){ whatWaterSoundsLike3.fade(1,0.75,500); }, sayTime - 500); // Start fading 500ms before teacher talks
  }, changeTime*500); // Overlap images instead of to-white-from-white
  new SuperTimeout(function(){ sayDE.play(); }, changeTime*500 + sayTime);
  sayDE.once("end", function(){  whatWaterSoundsLike3.fade(0.75,1,500);  }); //Fade back to full volume quickly
  new SuperTimeout(function(){ blurCDandBringVid2OverCD(); }, changeTime*500 + proceedTime);
}

function blurCDandBringVid2OverCD() {
  let blurTime, sayTime, proceedTime;
  switch (parent.speedAdjustmentSetting) {
    case "slow": blurTime = 4.60; sayTime = 9000; proceedTime = 13000; break; // proceedTime must depend on video length
    case "fast": blurTime = 2.00; sayTime = 7750; proceedTime = 9750;  break; // proceedTime must depend on video length
    default:     blurTime = 3.30; sayTime = 8000; proceedTime = 11000; // proceedTime must depend on video length
  }

  main.style.animationDuration = String(blurTime)+"s"; // Blur+Unblur paused at mid » See css_for_photos_and_videos_teach_a_new_word
  if (deviceDetector.isMobile){ main.classList.add("grayscaleUngrayscalePauseUnpauseAtMid"); } /*Easy on CPU*/
  else { main.classList.add("blurUnblurPauseUnpauseAtMid"); }

  new SuperTimeout(function(){ main.style.animationPlayState = "paused"; }, blurTime*500); // To full blur in fast:1s, normal:1.75s, slow:2.5s
  // Bring the 2nd video
  vidsContainer.classList.add("videoAppearsOverPhotos");
  vidsContainer.style.animationDuration = (blurTime/3).toFixed(2)+"s";
  vidsContainer.style.display = "block"; vid2.currentTime = 0;
  new SuperTimeout(function(){
    vid2.play(); // total video length ~ 9s. Action ends at ~8.0s
    whatWaterSoundsLike4.play(); // 9048ms
    new SuperTimeout(function(){ sayF.play(); }, sayTime);
    new SuperTimeout(function(){ removeVid2AndReturnToCD(); }, proceedTime);
  }, blurTime*500 - 500); // Video will start playing 0.5s before it is unblurred
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
  imgC.classList.remove("makePhotosAppear");  imgC.classList.add("makePhotosDisappear");  imgC.style.animationDuration = String(changeTime)+"s";
  imgD.classList.remove("makePhotosAppear");  imgD.classList.add("makePhotosDisappear");  imgD.style.animationDuration = String(changeTime)+"s";

  new SuperTimeout(function(){
    imgE.style.display = "block ";   imgE.classList.add("makePhotosAppear");   imgE.style.animationDuration = String(changeTime)+"s";
    imgF.style.display = "block ";   imgF.classList.add("makePhotosAppear");   imgF.style.animationDuration = String(changeTime)+"s";
    whatWaterSoundsLike5.play(); /* 13944ms*/
    new SuperTimeout(function(){ whatWaterSoundsLike5.fade(1,0.5,1000); }, changeTime*500 + sayTime - 1100);
  }, changeTime*500); // Overlap images instead of to-white-from-white
  new SuperTimeout(function(){ sayGH.play(); }, changeTime*500 + sayTime);
  // No more videos to bring
  sayGH.once("end", function(){  whatWaterSoundsLike5.fade(0.5,1,1000);  }); // Fade back to full volume in 1 second
  // ---
  new SuperTimeout(function () {
    // Special situation for Android users when viewing the first lesson (water.js)
    if (parent.isAndroid) { // Android
      putNotificationTxtIntoThisP2.innerHTML = androidSpeechTimingInfoTxt;
      createAndHandleInfoBoxType1AmidLesson(); // continueLesson() will be fired from within -> See js_for_info_boxes_in_lessons
    } else { // Not Android
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
  new SuperTimeout(function(){ fullVpDarkBlue.style.animationPlayState = "paused"; }, changeTime*1000); // Paused at halfway
  // nowYouSayIt takes 5100ms
  // Display the “It's your turn” animation if the user's browser is whitelisted.
  new SuperTimeout(function(){
    if (parent.willUserTalkToSpeechRecognition && parent.internetConnectivityIsNiceAndUsable) {
      nowYouSayIt.style.display = "block"; // See » css_for_photos_and_videos_teach_a_new_word » to find how it is centered
      if (nowYouSayIt.children[0].src.includes(".avif")) { nowYouSayIt.children[0].classList.add("animateAvifSprite"); }
      new SuperTimeout(function(){ resetWebp(nowYouSayIt.children[0]); nowYouSayIt.style.display = "none"; }, 5101);
      countdownForGiveUpSkipOrGoToNext = 40000; // For whitelisted browsers » Should depend on how many photos there are!
    }
  }, changeTime*1000 - 600);
  new SuperTimeout(function(){ speakToTheMic(); }, dingTimeMeansProceedTime); // Makes the DING tone play
  new SuperTimeout(function(){
    containerOfSingles.style.display = "block"; containerOfSingles.classList.add("singlesContainerAppears"); // Fixed animation duration (1.5s) to avoid conflict
    new SuperTimeout(function(){ showSinglesOneByOne(); }, 1500);
  }, dingTimeMeansProceedTime + changeTime*200);
}

function showSinglesOneByOne() {
  const allSingles = containerOfSingles.children; // Use children instead of childNodes to ignore HTML comments
  let i = 0; const modulus = allSingles.length;
  let changeTime;  switch (parent.speedAdjustmentSetting) {
    case "slow": changeTime = 5.00; break;
    case "fast": changeTime = 2.00; break;
    default:     changeTime = 3.50;
  }
  new SuperInterval(bringTheNext, changeTime*1000); // Possible issue: Changing speedAdjustmentSetting will not take effect after this starts ticking
  function bringTheNext() {
    let now = i%modulus; let next = (i+1)%modulus;
    allSingles[now].classList.remove("simpleFadeIn");    allSingles[now].classList.add("simpleFadeOut");  allSingles[now].style.animationDuration  = String(changeTime/2)+"s";
    allSingles[next].classList.remove("simpleFadeOut");  allSingles[next].classList.add("simpleFadeIn");  allSingles[next].style.animationDuration = String(changeTime/2)+"s";
    allSingles[now].style.zIndex = String(i+50);
    allSingles[next].style.zIndex = String(i+51);
    i++;
  }
}

/* ___SPEECH RECOGNITION___ */
var userHasGivenUp = false;
var preventGiveUpButtonIfSuccessHappens;
let aMatchWasFound = false;
function speakToTheMic() {

  new SuperTimeout(function () {
    // The GIVE-UP-BUTTON appears (which is a Go-To-Next-Button on Firefox2021 etc).
    // If speech is recognized, use clearTimeout to prevent its "showing-up".
    preventGiveUpButtonIfSuccessHappens = new SuperTimeout(function () { // This must start ticking only after countdownForGiveUpSkipOrGoToNext is updated.
      giveUpAndContinueButtonASIDE.classList.add("addThisToGlassButtonToUnhide");
    },countdownForGiveUpSkipOrGoToNext); // This must start ticking only after countdownForGiveUpSkipOrGoToNext is updated.
  },120);

  // setLanguage() for annyang is in /js_reusables/js_for_the_parent_all_browsers_all_devices.js
  // DEPRECATED var commands = {}; // Let's keep the older code for reference only here to remember how we started out
  const eachWordArray = theNewWordUserIsLearningNowAndPossibleMishaps.split("|"); // The text files in speech_recognition_answer_key must be written with the | (bar) character as the separator between phrases.
  parent.console.log("Speech recognition is waiting for: "+eachWordArray[0]);
  /* DEPRECATED - Let's keep the older code for reference only here in water.js/bread.js to remember how we started out
  let i;
  for(i=0;i<eachWordArray.length;i++)
  {
    let oneOfTheWords = eachWordArray[i];
    commands[oneOfTheWords] = stopListeningAndProceedToNext;
  }
  */

  // Notes about handling non-English string characters
  // BULGULAR: toLowerCase() Windows'ta büyük Ş yi küçük ş ye çeviriyor ama Mac OS üzerinde çevirmiyor
  // Onun yerine toLocaleLowerCase() kullanılırsa büyük I İngilizcedeki gibi küçük i ye dönüşmek yerine küçük ı ya dönüşüyor
  // Seçenek1: toLocaleLowerCase() KULLANMAYIP speech_recognition_answer_key içindeki cevapları buna dikkat ederek girmek
  // Seçenek2: tr için özel koşul yazmak -> OLMADI NEDEN ÇÜNKÜ büyük [İ] yi [i̇] ye yanlış dönüştürüyor. İki farklı küçük i çıkıyor ve ("i̇" == "i") false veriyor
  // Note: We don't need toLocaleLowerCase() for Cyrillic script (confirmed on Windows), toLowerCase() does the job right already

  if (parent.annyang) {
    // October 2022 policy change: Stop using commands object with annyang
    // DEPRECATED parent.annyang.addCommands(commands);
    if (!parent.isAndroid) { // See js_for_different_browsers_and_devices
        notificationDingTone.play(); // Android has its native DING tone. So let this DING tone play on desktops and iOS devices.
    }
    // Start listening.
    new SuperTimeout(function() {  parent.annyang.start();  },500); // NOTE: annyang.resume() equals annyang.start()
    new SuperTimeout(function() {  startAudioInputVisualization();  },600); // Will work everywhere except on Android. See js_for_microphone_input_visualization.js
    // New method of detecting matches
    parent.annyang.addCallback('result', compareAndSeeIfTheAnswerIsCorrect);
    function compareAndSeeIfTheAnswerIsCorrect(phrasesArray) {
      parent.console.log('Speech recognized. Possibly said: '+phrasesArray);
      // Check if there is a match
      let j;
      for(j=0;j<eachWordArray.length;j++) {

        // NOTE THAT: There is also the option of using includes() to perform phrase to phrase comparison
        // BUT we want to split phrases into words and perform word to word comparison
        /*
        if (array.includes(searchString)) {            console.log(`${searchString} exists in the array.`);
        } else {            console.log(`${searchString} does not exist in the array.`);        }
        */
        let k;
        for (k = 0; k < phrasesArray.length; k++) {
          // Which method is better?
          // if (phrasesArray[k].toLowerCase().search(eachWordArray[j].toLowerCase()) >= 0) // This will return true if user utters 'underwater' instead of 'water'
          // if (phrasesArray[k].toLowerCase() == eachWordArray[j].toLowerCase()) // Only with interimResults TURNED ON, this will return true if user utters 'Water is the liquid form of H2O' but false for 'underwater' and also false for 'under water'
          // if (phrasesArray[k].toLowerCase().search(eachWordArray[j].toLowerCase()) == 0) // Accept user's utterance if it starts with the "correct word or phrase" even if interimResults option is turned off like 'watermelon'.
          // To accept 'under water' while rejecting 'underwater' we need to extract individual words from phrases
          /* If we wanted to accept 我要喝水 we could do something like
          if (parent.targetLanguageIsWrittenWithoutSpaces) { //
            if (fromPhraseToSingleWords[z].toLowerCase().search(eachWordArray[j].toLowerCase()) >= 0) { searchResult = true; }
          } else {
            if (fromPhraseToSingleWords[z].toLowerCase() == eachWordArray[j].toLowerCase()) { searchResult = true; }
          }
          But we don't want to do that because we don't want to accept ミミズ when waiting for 水 */
          const fromPhraseToSingleWords = phrasesArray[k].split(" "); // Note that in "spaceless" languages like Renmen-Hito phrases will not be split into words
          let z;
          for (z = 0; z < fromPhraseToSingleWords.length; z++) {

            // Now we can reject 'underwater' and accept 'under water' // NOTE: With interimResults enabled it’s probably impossible to reject 'watermelon'
            let searchResult = false;
            if (fromPhraseToSingleWords[z].toLowerCase() == eachWordArray[j].toLowerCase()) { searchResult = true; } // For some reason this fails for Arabic in Safari >>> Works without any problems in Chrome though
            else if (isApple) {
              if (parent.annyang.getSpeechRecognizer().lang == "ar") { console.warn("Listening for Arabic on Safari/Apple");
                // Use string search to try and find it within the phrase and not individual words
                if (phrasesArray[k].search(eachWordArray[j]) >= 0) { searchResult = true; }
              }
            }
            // -
            if (!aMatchWasFound && searchResult) {
              aMatchWasFound = true; // Using this, we make sure that stopListeningAndProceedToNext fires only and only once
              if (parent.annyang.getSpeechRecognizer().interimResults) { console.log("Correct answer detected with interimResults enabled");
                setTimeout(function () { stopListeningAndProceedToNext(); }, 250); // Interim results is or can be too quick (especially on Windows)
              } else { console.log("Correct answer detected without interimResults");
                stopListeningAndProceedToNext();
              }
            } else {
              // Prevent a possible second firing (or any further firings) of stopListeningAndProceedToNext by doing nothing
            }
          } // End of for z
        } // End of for k


      } // End of for j
    } // END OF compareAndSeeIfTheAnswerIsCorrect
  } // END OF if parent.annyang

} /* END OF speakToTheMic */

function stopListeningAndProceedToNext() {
  if (!userHasGivenUp) { // Real success of speech recognition
    successTone.play(); fullVpDarkBlue.style.animationPlayState = "running"; containerOfSingles.classList.add("brightenUp");
    if (canVibrate) {  navigator.vibrate([14, 133, 12, 111, 12, 133, 20]);  } // See js_for_every_single_html.js for canVibrate
    preventGiveUpButtonIfSuccessHappens.clear(); // Used to be clearTimeout(preventGiveUpButtonIfSuccessHappens); // i.e. without supertimeout.js
    giveUpAndContinueButtonASIDE.classList.add("addThisToGlassButtonWhenSuccessHappens");
  } else { // Give up and continue
    containerOfSingles.classList.add("darkenDown");
    if (canVibrate) {  navigator.vibrate([13]);  } // See js_for_every_single_html.js for canVibrate
  }
  // Stop all microphone activity as soon as success happens and don’t wait until “beforeunload” fires.
  // See js_for_all_iframed_lesson_htmls to find what happens with window.onbeforeunload
  if (parent.annyang) { // As of 2021, Firefox says annyang is undefined. But the app still has to work without Web Speech API so the code must be wrapped in if(parent.annyang).
    parent.annyang.removeCallback(); // Remove all script activity // Instead of DEPRECATED parent.annyang.removeCommands();
    // parent.annyang.abort(); // OR should we??? //if (!parent.isApple) {  parent.annyang.abort();  } // ISSUE THAT NEEDS SERIOUS ATTENTION: Safari doesn't allow mic permanently; it allows for only 1 listening session and prompts for permission everytime mic restarts
    if (isApple) { parent.annyang.pause(); }
    else { parent.annyang.abort(); }
  }
  // Stop Wavesurfer microphone: We don't want to wait for "beforeunload" so we call the function immediately even though it will fire one more time with window.onbeforeunload
  // We cannot disable "beforeunload" BECAUSE if user navigates away in the middle of a mic session we want the mic turned off
  // Yet, we also want to hide the visualization asap when success happens, therefore it has to be armed both in js_for_all_iframed_lesson_htmls and here
  stopAudioInputVisualization(); // See js_for_microphone_input_visualization

  /* Save progress */
  if (!userHasGivenUp) { // User was successful with speech recognition
    parent.savedProgress[studiedLang].lesson_WATER_IsCompleted=true; // WATCH THE NAME OF THE LESSON!!!
  } else { // User has given up and wants to continue anyhow
    parent.savedProgress[studiedLang].lesson_WATER_IsCompleted=false; // WATCH THE NAME OF THE LESSON!!!
  }
  parent.saveJSON = JSON.stringify(parent.savedProgress); // Convert
  localStorage.setItem("memoryCard", parent.saveJSON); // Save

  /* GET READY TO EXIT THIS LESSON */
  let endTime;
  switch (parent.speedAdjustmentSetting) { case "slow": endTime = 5000; break;    case "fast": endTime = 3000; break;    default: endTime = 4000; }
  new SuperTimeout(function() { showGlobyPreloaderBeforeExit(); },endTime-1500); // See js_for_all_iframed_lesson_htmls AND See css_for_preloader_and_orbiting_circles
  // REMEMBER: iframe.src change makes window.onbeforeunload fire in js_for_all_iframed_lesson_htmls.js which then calls unloadTheSoundsOfThisLesson();
  parent.pathOfWhatWillBeDisplayedUnlessInternetConnectivityIsLost = "/lessons_in_iframes/level_1/unit_1/lesson_2/index.html"; // See js_for_online_and_offline_modes
  // --- HANDLE ONLINE and OFFLINE cases
  if (parent.internetConnectivityIsNiceAndUsable) { // See js_for_online_and_offline_modes.js
    new SuperTimeout(function() { parent.ayFreym.src = parent.pathOfWhatWillBeDisplayedUnlessInternetConnectivityIsLost; },endTime);
  } else { parent.console.warn("THE DEVICE IS OFFLINE (detected at the end of lesson");
    const isCached = checkIfNextLessonIsCachedAndRedirectIfNot(112); // See js_for_all_iframed_lesson_htmls
    if (isCached) { console.warn("WILL TRY TO CONTINUE OFFLINE");
      new SuperTimeout(function() { parent.ayFreym.src = parent.pathOfWhatWillBeDisplayedUnlessInternetConnectivityIsLost; },endTime);
    }
  }
  // ---
} // END OF stopListeningAndProceedToNext
