"use strict";
// This is DEFERRED in html
// IMPORTANT: Find countdownForGiveUpSkipOrGoToNext because we must adjust its value for each lesson

/* __ SAVE PROGRESS TO LOCAL STORAGE __ */
// See js_for_app_initialization_in_parent to find how savedProgress.ja savedProgress.zh savedProgress.tr savedProgress.ar savedProgress.en are created
const studiedLang = parent.langCodeForTeachingFilePaths;
// !!! VERY CAREFUL: Watch the lesson name!!!
parent.savedProgress[studiedLang].lesson_BREAD_IsViewed=true; // Create and add... or overwrite the same thing
parent.saveJSON = JSON.stringify(parent.savedProgress); // Convert
localStorage.setItem("memoryCard", parent.saveJSON); // Save

// All settings here will depend on the content of the lesson
let theNewWordUserIsLearningNowAndPossibleMishaps; // Get this from txt file
// CAUTION: parent.langCodeForTeachingFilePaths variable depends on localStorage data being available. See js_for_app_initialization_in_parent.js
const filePathForTheWordOrPhrase = "/speech_recognition_answer_key/"+parent.langCodeForTeachingFilePaths+"/1-1-1-bread.txt";
// See js_for_every_single_html.js for the headers setting.
fetch(filePathForTheWordOrPhrase,myHeaders).then(function(response){return response.text();}).then(function(contentOfTheTxtFile){ theNewWordUserIsLearningNowAndPossibleMishaps = contentOfTheTxtFile; });

/* ___AUDIO ELEMENTS___ */ //...Sound player (Howler) exists in the parent html. So the path must be relative to the parent html. Not to the framed html.
const say1say2Path = "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_1/lesson_1/bread_1-2.webm";
const say3Path     = "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_1/lesson_1/bread_3.webm";
const say4say5Path = "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_1/lesson_1/bread_4-5.webm";
const say6Path     = "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_1/lesson_1/bread_6.webm";
const say7say8Path = "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_1/lesson_1/bread_7-8.webm";

const sayAB = new parent.Howl({  src: [say1say2Path]  });
const sayC  = new parent.Howl({  src: [say3Path]      });
const sayDE = new parent.Howl({  src: [say4say5Path]  });
const sayF  = new parent.Howl({  src: [say6Path]      });
const sayGH = new parent.Howl({  src: [say7say8Path]  });

//const whatBreadSoundsLike1 = new parent.Howl({  src: ["/lessons_in_iframes/level_1/unit_1/lesson_1/what_bread_sounds_like_1.webm"]  });
//const whatBreadSoundsLike2 = new parent.Howl({  src: ["/lessons_in_iframes/level_1/unit_1/lesson_1/what_bread_sounds_like_2.webm"]  });
//3
//4
//5
const successTone = new parent.Howl({  src: ["/user_interface/sounds/success1.webm"]  });
const notificationDingTone = new parent.Howl({  src: ["/user_interface/sounds/ding.webm"]  });
/* Sound initialization happens on the parent but the consts exist in frame. SEE js_for_all_iframed_lesson_htmls » FIND onbeforeunload. */
function unloadTheSoundsOfThisLesson() {
  notificationDingTone.unload();
  successTone.unload();
  //5
  //4
  //3
  //whatBreadSoundsLike2.unload();
  //whatBreadSoundsLike1.unload();
  sayGH.unload();  sayF.unload();  sayDE.unload();  sayC.unload();  sayAB.unload();
}
/* It looks like unloadTheImagesOfThisLesson() is unnecessary because imgs get destroyed when iframe.src is changed */
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
const nowYouSayIt = document.getElementById('nowYouSayItIMG');
const containerOfSingles = document.getElementById('singlesDivID');

const giveUpAndContinueButtonASIDE = document.getElementsByTagName('ASIDE')[0];
let androidSpeechTimingInfoTxt = "…";
/* ___PROGRESSION___ */
window.addEventListener("load",function(){   loadingIsCompleteFunction();   }, { once: true });
// Desktop users can change the speed; mobile users can't. Because the mobile GUI has to stay simple.
function loadingIsCompleteFunction()
{
  // Stop and notify the user if necessary; otherwise just continue.
  if (parent.langCodeForTeachingFilePaths == "en") { // Display the explanation about accents for users who want to learn English.
    const pathOfNotificationAboutBritishVsAmerican = "/user_interface/text/"+userInterfaceLanguage+"/1-1-1_british_vs_american.txt";
    fetch(pathOfNotificationAboutBritishVsAmerican,myHeaders).then(function(response){return response.text();}).then(function(contentOfTheTxtFile){
      setTimeout(function(){ createAndHandleInfoBoxType1BeforeLessonStarts(); putNotificationTxtIntoThisP1.innerHTML = contentOfTheTxtFile; },501); // See js_for_info_boxes_in_lessons.js
      // createAndHandleInfoBoxType1BeforeLessonStarts() will fire startTheLesson() 1.5 seconds after its OK button is clicked/touched
    });
  }
  else if (parent.langCodeForTeachingFilePaths == "zh") { // Display the warning about intonations to users who want to learn the Ren language.
    const pathOfNotificationAboutRenIntonation = "/user_interface/text/"+userInterfaceLanguage+"/1-1-1_ren_intonation.txt";
    fetch(pathOfNotificationAboutRenIntonation,myHeaders).then(function(response){return response.text();}).then(function(contentOfTheTxtFile){
      setTimeout(function(){ createAndHandleInfoBoxType1BeforeLessonStarts(); putNotificationTxtIntoThisP1.innerHTML = contentOfTheTxtFile; },501); // See js_for_info_boxes_in_lessons.js
      // createAndHandleInfoBoxType1BeforeLessonStarts() will fire startTheLesson() 1.5 seconds after its OK button is clicked/touched
    });
  }
  else if (parent.langCodeForTeachingFilePaths == "ar") { // Display the warning about TANWEEN to users who want to learn the Standard Arabic.
    const pathOfNotificationAboutTanween = "/user_interface/text/"+userInterfaceLanguage+"/1-1-1_arabic_tanween.txt";
    fetch(pathOfNotificationAboutTanween,myHeaders).then(function(response){return response.text();}).then(function(contentOfTheTxtFile){
      setTimeout(function(){ createAndHandleInfoBoxType1BeforeLessonStarts(); putNotificationTxtIntoThisP1.innerHTML = contentOfTheTxtFile; },501); // See js_for_info_boxes_in_lessons.js
      // createAndHandleInfoBoxType1BeforeLessonStarts() will fire startTheLesson() 1.5 seconds after its OK button is clicked/touched
    });
  }
  else {
    startTheLesson(); // Call it now if it was not called from within createAndHandleInfoBoxType1BeforeLessonStarts() in js_for_info_boxes_in_lessons.js
  }
  //--- By the way: Get the android-speech-timing-notification text ready
  if (parent.isAndroid) {
    const pathOfNotificationAboutAndroidTiming = "/user_interface/text/"+userInterfaceLanguage+"/0-android_speech_timing.txt";
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
    case "slow": sayTime = 3300; proceedTime = 9500; break;
    case "fast": sayTime = 1000; proceedTime = 6500; break;
    default:     sayTime = 2000; proceedTime = 8100;
  }
  // No fade time for fx sound
  // No SFX
  // No fading away for fx sound
  setTimeout(function(){ sayAB.play(); }, sayTime); // Assume that teacher will be talking for 5000ms
  // No fading back for fx sound
  setTimeout(function () { blurABandBringVid1OverAB();   /* No fade-to-zero for fx sound */   }, proceedTime); // slow, normal, fast
}

function blurABandBringVid1OverAB() {
  let blurTime, startTime, sayTime, proceedTime;
  switch (parent.speedAdjustmentSetting) {
    case "slow": blurTime = 4.60; startTime = 0; sayTime = 7000; proceedTime = 10000;  break; // proceedTime must depend on video length
    case "fast": blurTime = 2.00; startTime = 2; sayTime = 4500; proceedTime = 7000;   break; // proceedTime must depend on video length
    default:     blurTime = 3.30; startTime = 1; sayTime = 5500; proceedTime = 9000;   // proceedTime must depend on video length
  }

  main.style.animationDuration = String(blurTime)+"s"; // Blur+Unblur paused at mid » See css_for_photos_and_videos_teach_a_new_word
  if (deviceDetector.isMobile){ main.classList.add("grayscaleUngrayscalePauseUnpauseAtMid"); } /*Easy on CPU*/
  else { main.classList.add("blurUnblurPauseUnpauseAtMid"); }

  setTimeout(function(){ main.style.animationPlayState = "paused"; }, blurTime*500); // Full blur in fast:1s, normal:1.75s, slow:2.5s // Using "paused" can give inaccurate results, but in this case it is usable even if it can't stop at exactly 50%
  // Bring the 1st video
  vidsContainer.classList.add("videoAppearsOverPhotos");
  vidsContainer.style.animationDuration = (blurTime/3).toFixed(2)+"s";
  vidsContainer.style.display = "block"; vid1.currentTime = startTime;
  setTimeout(function(){
    vid1.play(); // Let video play and then go back to double photos (still image pairs),,, total video length ~ ???s.
    //Bread SFX soundtrack??? // // REMEMBER: Audio WILL NOT sync unless startTime is applied to audio too » no big deal for the oven scene though
    setTimeout(function(){ sayC.play(); }, sayTime);
    setTimeout(function(){ removeVid1AndReturnToAB(); }, proceedTime);
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
  setTimeout(function(){
    vidsContainer.removeChild(vid1);  vidsContainer.style.display = "none";  vidsContainer.classList.remove("videoDisappearsOverPhotos"); // Reset
    vid2.style.display = "block"; // Get ready for the next one
  }, 2750); // Longest it can take is 5000/2=2500
  main.style.animationPlayState = "running"; // Unblur back in
  setTimeout(function(){ main.classList.remove("blurUnblurPauseUnpauseAtMid"); main.classList.remove("grayscaleUngrayscalePauseUnpauseAtMid"); }, 3500); // 2500+750 = 3250 is the longest possible // To be able to restart // It's OK to omit if (isMobile)
  setTimeout(function(){ goFromABtoCD(); }, blurTime*500); // Half of the value in milliseconds
}

function goFromABtoCD() {
  let changeTime, sayTime, proceedTime;
  switch (parent.speedAdjustmentSetting) {
    case "slow": changeTime = 3; sayTime = 3500; proceedTime = 9500;  break;
    case "fast": changeTime = 1; sayTime = 1500; proceedTime = 6500;  break;
    default:     changeTime = 2; sayTime = 2800; proceedTime = 8100;
  }
  // No fade time
  imgA.classList.add("makePhotosDisappear");  imgA.style.animationDuration = String(changeTime)+"s";
  imgB.classList.add("makePhotosDisappear");  imgB.style.animationDuration = String(changeTime)+"s";

  setTimeout(function(){
    imgC.style.display = "block ";   imgC.classList.add("makePhotosAppear");   imgC.style.animationDuration = String(changeTime)+"s";
    imgD.style.display = "block ";   imgD.classList.add("makePhotosAppear");   imgD.style.animationDuration = String(changeTime)+"s";
    // No fx sound
    // No fade time
  }, changeTime*500); // Overlap images instead of to-white-from-white
  setTimeout(function(){ sayDE.play(); }, changeTime*500 + sayTime);
  // No fading back-to-full-volume for fx sound
  setTimeout(function(){ blurCDandBringVid2OverCD(); }, changeTime*500 + proceedTime);
}

function blurCDandBringVid2OverCD() {
  let blurTime, startTime, sayTime, proceedTime;
  switch (parent.speedAdjustmentSetting) {
    case "slow": blurTime = 4.60; startTime = 0; sayTime = 7000; proceedTime = 10000;  break; // proceedTime must depend on video length
    case "fast": blurTime = 2.00; startTime = 2; sayTime = 5000; proceedTime = 7000;   break; // proceedTime must depend on video length
    default:     blurTime = 3.30; startTime = 1; sayTime = 6500; proceedTime = 9000;  // proceedTime must depend on video length
  }

  main.style.animationDuration = String(blurTime)+"s"; // Blur+Unblur paused at mid » See css_for_photos_and_videos_teach_a_new_word
  if (deviceDetector.isMobile){ main.classList.add("grayscaleUngrayscalePauseUnpauseAtMid"); } /*Easy on CPU*/
  else { main.classList.add("blurUnblurPauseUnpauseAtMid"); }

  setTimeout(function(){ main.style.animationPlayState = "paused"; }, blurTime*500); // To full blur in fast:1s, normal:1.75s, slow:2.5s
  // Bring the 2nd video
  vidsContainer.classList.add("videoAppearsOverPhotos");
  vidsContainer.style.animationDuration = (blurTime/3).toFixed(2)+"s";
  vidsContainer.style.display = "block"; vid2.currentTime = startTime;
  setTimeout(function(){
    vid2.play(); // total video length ~ ???s.
    // No videosoundtracks to play // // REMEMBER: Audio WILL NOT sync unless startTime is applied to audio too » that is a big deal for bread breaking scene
    setTimeout(function(){ sayF.play(); }, sayTime);
    setTimeout(function(){ removeVid2AndReturnToCD(); }, proceedTime);
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
  setTimeout(function(){
    vidsContainer.removeChild(vid2);  vidsContainer.style.display = "none";
    // There is no 3rd video so there is no need to remove("videoDisappearsOverPhotos")
  }, 2750); // Longest it can take is 5000/2=2500
  main.style.animationPlayState = "running"; // Unblur back in
  setTimeout(function(){ main.classList.remove("blurUnblurPauseUnpauseAtMid"); main.classList.remove("grayscaleUngrayscalePauseUnpauseAtMid"); }, 3500); // 2500+750 = 3250 is the longest possible // Not necessary as there won't be any other animations on MAIN BUT: Just to keep things tidy
  setTimeout(function(){ goFromCDtoEF(); }, blurTime*500); // Half of the value in milliseconds
}

function goFromCDtoEF() {
  let changeTime, sayTime, proceedTime;
  switch (parent.speedAdjustmentSetting) {
    case "slow": changeTime = 3; sayTime = 3500; proceedTime = 9500; break;
    case "fast": changeTime = 1; sayTime = 1500; proceedTime = 6500; break;
    default:     changeTime = 2; sayTime = 2400; proceedTime = 8100;
  }
  // No fade time
  imgC.classList.remove("makePhotosAppear");  imgC.classList.add("makePhotosDisappear");  imgC.style.animationDuration = String(changeTime)+"s";
  imgD.classList.remove("makePhotosAppear");  imgD.classList.add("makePhotosDisappear");  imgD.style.animationDuration = String(changeTime)+"s";

  setTimeout(function(){
    imgE.style.display = "block ";   imgE.classList.add("makePhotosAppear");   imgE.style.animationDuration = String(changeTime)+"s";
    imgF.style.display = "block ";   imgF.classList.add("makePhotosAppear");   imgF.style.animationDuration = String(changeTime)+"s";
    // No fx sound
    // No fade time
  }, changeTime*500); // Overlap images instead of to-white-from-white
  setTimeout(function(){ sayGH.play(); }, changeTime*500 + sayTime);
  // No more videos to bring
  // No fading back-to-full-volume
  setTimeout(function () {
    // Special situation for Android users when viewing the first lesson (bread.js)
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
  setTimeout(function(){ containerOfDoubles.parentNode.removeChild(containerOfDoubles); }, changeTime*1000 + 250); // Remove shortly after opacity hits zero

  fullVpDarkBlue.style.display = "block"; fullVpDarkBlue.classList.add("darkenLightenBackground"); fullVpDarkBlue.style.animationDuration = String(changeTime*2)+"s";
  setTimeout(function(){ fullVpDarkBlue.style.animationPlayState = "paused"; }, changeTime*1000); // Paused at halfway
  // nowYouSayIt takes 5100ms
  // Display the “It's your turn” animation if the user's browser is whitelisted.
  setTimeout(function(){
    if (parent.willUserTalkToSpeechRecognition) {
      nowYouSayIt.style.display = "block"; // See » css_for_photos_and_videos_teach_a_new_word » to find how it is centered
      setTimeout(function(){ nowYouSayIt.src = onePixelTransparentGif; nowYouSayIt.parentNode.removeChild(nowYouSayIt); }, 5101);
      countdownForGiveUpSkipOrGoToNext = 40000; // For whitelisted browsers » Should depend on how many photos there are!
    }
  }, changeTime*1000 - 600);
  setTimeout(function(){ speakToTheMic(); }, dingTimeMeansProceedTime); // Makes the DING tone play
  setTimeout(function(){
    containerOfSingles.style.display = "block"; containerOfSingles.classList.add("singlesContainerAppears"); // Fixed animation duration (1.5s) to avoid conflict
    setTimeout(function(){ showSinglesOneByOne(); }, 1500);
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
  setInterval(bringTheNext, changeTime*1000); // Minor issue: Changing speedAdjustmentSetting will not take effect after this starts ticking
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

  setTimeout(function () {
    // The GIVE-UP-BUTTON appears (which turns into a Go-To-Next-Button on Firefox2021 etc).
    // If speech is recognized, use clearTimeout to prevent its "showing-up".
    preventGiveUpButtonIfSuccessHappens = setTimeout(function () { // This must start ticking only after countdownForGiveUpSkipOrGoToNext is updated.
      giveUpAndContinueButtonASIDE.classList.add("addThisToGlassButtonToUnhide");
    },countdownForGiveUpSkipOrGoToNext); // This must start ticking only after countdownForGiveUpSkipOrGoToNext is updated.
  },120);

  // setLanguage() for annyang is in /js_reusables/js_for_app_initialization_in_parent.js
  // DEPRECATED var commands = {}; // Let's keep the older code for reference only here in bread.js to remember how we started out
  const eachWordArray = theNewWordUserIsLearningNowAndPossibleMishaps.split("|"); // The text files in speech_recognition_answer_key must be written with the | (bar) character as the separator between phrases.
  parent.console.log("Speech recognition is waiting for: "+eachWordArray[0]);
  /* DEPRECATED // Let's keep the older code for reference only here in bread.js to remember how we started out
  let i;
  for(i=0;i<eachWordArray.length;i++)
  {
    let oneOfTheWords = eachWordArray[i];
    commands[oneOfTheWords] = stopListeningAndProceedToNext;
  }
  */

  if (parent.annyang) {
    // October 2022 policy change: Stop using commands object with annyang
    // DEPRECATED parent.annyang.addCommands(commands);
    if (!parent.isAndroid) { // See js_for_different_browsers_and_devices
        notificationDingTone.play(); // Android has its native DING tone. So let this DING tone play on desktops and iOS devices.
    }
    // Start listening.
    setTimeout(function() {  parent.annyang.start();  },500);
    setTimeout(function() {  startAudioInputVisualization();  },600); // Will work everywhere except on Android. See js_for_microphone_input_visualization.js
    // New method of detecting matches
    parent.annyang.addCallback('result', compareAndSeeIfTheAnswerIsCorrect);
    function compareAndSeeIfTheAnswerIsCorrect(phrasesArray) {
      parent.console.log('Speech recognized. Possibly said: '+phrasesArray);
      // Check if there is a match // Maybe this is better than adding commands, no?
      let j;
      for(j=0;j<eachWordArray.length;j++)
      {
        let k;
        for (k = 0; k < phrasesArray.length; k++) {
          // BULGULAR: toLowerCase() Windows'ta büyük Ş yi küçük ş ye çeviriyor ama Mac OS üzerinde çevirmiyor
          // Onun yerine toLocaleLowerCase() kullanılırsa büyük I İngilizcedeki gibi küçük i ye dönüşmek yerine küçük ı ya dönüşüyor
          // Seçenek1: toLocaleLowerCase() KULLANMAYIP speech_recognition_answer_key içindeki cevapları buna dikkat ederek girmek
          // Seçenek2: tr için özel koşul yazmak -> OLMADI NEDEN ÇÜNKÜ büyük [İ] yi [i̇] ye yanlış dönüştürüyor. İki farklı küçük i çıkıyor ve ("i̇" == "i") false veriyor
          /* Doğru çevirseydi şöyle bir şey yapabilirdik
          let searchResult;
          if (parent.langCodeForTeachingFilePaths == "tr") { searchResult = phrasesArray[k].toLocaleLowerCase().search(eachWordArray[j].toLocaleLowerCase()); }
          else { searchResult = phrasesArray[k].toLowerCase().search(eachWordArray[j].toLowerCase()); }
          */
          // Note: We don't need toLocaleLowerCase() for Cyrillic script (confirmed on Windows), toLowerCase() does the job right already
          if (phrasesArray[k].toLowerCase().search(eachWordArray[j].toLowerCase()) >= 0) {
            if (!aMatchWasFound) {
              aMatchWasFound = true;
              stopListeningAndProceedToNext();
            } else {
              // Prevent double firing by doing nothing
            }
          }
        }
      }
    }
  }

} /* END OF speakToTheMic */

// stopListeningAndProceedToNext >>> Used to be: var stopListeningAndProceedToNext = function () {};
function stopListeningAndProceedToNext() {
  if (!userHasGivenUp) { // Real success of speech recognition
    successTone.play(); fullVpDarkBlue.style.animationPlayState = "running"; containerOfSingles.classList.add("brightenUp");
    if (canVibrate) {  navigator.vibrate([14, 133, 12, 111, 12, 133, 20]);  } // See js_for_every_single_html.js for canVibrate
    clearTimeout(preventGiveUpButtonIfSuccessHappens);
    giveUpAndContinueButtonASIDE.classList.add("addThisToGlassButtonWhenSuccessHappens");
  } else { // Give up and continue
    containerOfSingles.classList.add("darkenDown");
    if (canVibrate) {  navigator.vibrate([13]);  } // See js_for_every_single_html.js for canVibrate
  }
  // Stop all microphone activity as soon as success happens and don’t wait until “beforeunload” fires. See js_for_all_iframed_lesson_htmls to find what happens with window.onbeforeunload
  if (parent.annyang) { // As of 2021, Firefox says annyang is undefined. But the app still has to work without Web Speech API so the code must be wrapped in if(parent.annyang).
    parent.annyang.removeCallback(); // Remove all script activity // Instead of DEPRECATED parent.annyang.removeCommands();
    parent.annyang.abort(); // OR should we??? //if (!parent.isApple) {  parent.annyang.abort();  } // ISSUE THAT NEEDS SERIOUS CARE: Safari doesn't allow mic permanently; it allows for only 1 listening session and prompts for permission everytime mic restarts
  }
  // Stop Wavesurfer microphone: Don't wait for "beforeunload" and kill it immediately even though it will fire one more time with window.onbeforeunload
  // SINCE: user could navigate away in the middle of mic session » it has to exist both in js_for_all_iframed_lesson_htmls and here
  stopAudioInputVisualization();
  /* GET READY TO EXIT THIS LESSON */
  let endTime;
  switch (parent.speedAdjustmentSetting) { case "slow": endTime = 4600; break;    case "fast": endTime = 3000; break;    default: endTime = 3600; }
  setTimeout(function() { showPreloaderBeforeExit(); },endTime-1500); // See js_for_all_iframed_lesson_htmls AND See css_for_preloader_and_orbiting_circles
  // REMEMBER: iframe.src change makes window.onbeforeunload fire in js_for_all_iframed_lesson_htmls.js which has unloadTheSoundsOfThisLesson();
  setTimeout(function() { parent.ayFreym.src = "/lessons_in_iframes/level_1/unit_1/lesson_2/index.html"; },endTime);
  /* Save progress */
  parent.savedProgress[studiedLang].lesson_BREAD_IsCompleted=true; // WATCH THE NAME OF THE LESSON!!!
  parent.saveJSON = JSON.stringify(parent.savedProgress); // Convert
  localStorage.setItem("memoryCard", parent.saveJSON); // Save
}
