"use strict";
// Code written by Manheart Earthman=B. A. Bilgekılınç Topraksoy=土本 智一勇夫剛志
// UNAUTHORIZED MODIFICATION IS PROHIBITED: You may not change this file without obtaining permission

// IMPORTANT: Find countdownForGiveUpSkipOrGoToNext and adjust its value for each lesson depending on the number of c1 c2 c3 ... visuals

/* __ SAVE PROGRESS TO LOCAL STORAGE __ */
// See js_for_the_parent_all_browsers_all_devices to find how savedProgress.ja savedProgress.zh savedProgress.tr savedProgress.ar savedProgress.en are created
const studiedLang = parent.langCodeForTeachingFilePaths.substr(0,2); // en_east en_west will use the same save-slot
// !!! VERY CAREFUL: Watch the lesson name!!!
parent.savedProgress[studiedLang].lesson_SPOON_IsViewed=true; // Create and add... or overwrite the same thing
parent.saveJSON = JSON.stringify(parent.savedProgress); // Convert
localStorage.setItem("memoryCard", parent.saveJSON); // Save

// All settings here will depend on the content of the lesson
let theNewWordUserIsLearningNowAndPossibleMishaps; // Get this from txt file
// CAUTION: parent.langCodeForTeachingFilePaths variable depends on localStorage data being available. See js_for_the_parent_all_browsers_all_devices.js
const filePathForTheWordOrPhrase = "/speech_recognition_answer_key/"+parent.langCodeForTeachingFilePaths+"/1-2-3-spoon.txt";
// See js_for_every_single_html.js for the headers setting.
fetch(filePathForTheWordOrPhrase,myHeaders).then(function(response){return response.text();}).then(function(contentOfTheTxtFile){ theNewWordUserIsLearningNowAndPossibleMishaps = contentOfTheTxtFile; });

/* ___AUDIO ELEMENTS___ */ //...Sound player (Howler) exists in the parent html. So the path must be relative to the parent html. Not to the framed html.
// Find soundFileFormat in js_for_all_iframed_lesson_htmls
const say1say2Path = "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_2/lesson_3/spoon_1-2."+soundFileFormat;
const say3Path     = "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_2/lesson_3/spoon_3."+soundFileFormat;
const say4say5Path = "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_2/lesson_3/spoon_4-5."+soundFileFormat;
const say6Path     = "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_2/lesson_3/spoon_6."+soundFileFormat;
const say7say8Path = "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_2/lesson_3/spoon_7-8."+soundFileFormat;

const sayAB = new parent.Howl({  src: [say1say2Path]  });
const sayC  = new parent.Howl({  src: [say3Path]      });
const sayDE = new parent.Howl({  src: [say4say5Path]  });
const sayF  = new parent.Howl({  src: [say6Path]      });
const sayGH = new parent.Howl({  src: [say7say8Path]  });

const whatSpoonSoundsLike1 = new parent.Howl({  src: ["/lessons_in_iframes/level_1/unit_2/lesson_3/what_spoon_sounds_like_1."+soundFileFormat]  });
const whatSpoonSoundsLike2 = new parent.Howl({  src: ["/lessons_in_iframes/level_1/unit_2/lesson_3/what_spoon_sounds_like_2."+soundFileFormat]  });
//3
//4
//5
const successTone = new parent.Howl({  src: ["/user_interface/sounds/success1b."+soundFileFormat]  });
const notificationDingTone = new parent.Howl({  src: ["/user_interface/sounds/ding."+soundFileFormat]  });
/* Sound initialization happens on the parent but the consts exist in frame. SEE js_for_all_iframed_lesson_htmls » FIND onbeforeunload. */
// listOfAllSoundsInThisLesson is also used by pauseTheAppFunction in js_for_the_sliding_navigation_menu
var listOfAllSoundsInThisLesson = [
  notificationDingTone,
  //successTone, // EXCEPTION: See unloadThatLastSoundWhichCannotBeUnloadedNormally
  whatSpoonSoundsLike2,
  whatSpoonSoundsLike1,
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

/* ___PROGRESSION___ */
window.addEventListener("load",function(){   loadingIsCompleteFunction();   }, { once: true });
// Desktop users can change the speed; mobile users can't. Because the mobile GUI has to stay simple.
function loadingIsCompleteFunction()
{
  // Stop and notify the user if necessary; otherwise just continue.
  startTheLesson(); // Call it now if it was not called from within createAndHandleInfoBoxType1BeforeLessonStarts() in js_for_info_boxes_in_lessons.js
}
// NOTE: The preloader disappears in 500ms » See css_for_preloader_and_orbiting_circles
// For speedAdjustmentSetting see js_for_the_sliding_navigation_menu.js
function startTheLesson()
{
  let sayTime, proceedTime;
  switch (parent.speedAdjustmentSetting) {
    case "slow": sayTime = 3500; proceedTime = 9500; break;
    case "fast": sayTime = 1200; proceedTime = 6500; break;
    default:     sayTime = 2200; proceedTime = 8100;
  }
  // No fade time for fx sound
  // No SFX
  // No fading away for fx sound
  new SuperTimeout(function(){ sayAB.play(); }, sayTime); // Assume that teacher will be talking for 5000ms
  // No fading back for fx sound
  new SuperTimeout(function () { blurABandBringVid1OverAB();   /* No fade-to-zero for fx sound */   }, proceedTime); // slow, normal, fast
}

function blurABandBringVid1OverAB() {
  let blurTime, sayTime, proceedTime;
  switch (parent.speedAdjustmentSetting) {
    case "slow": blurTime = 4.60; sayTime = 5500; proceedTime = 11000;  break; // proceedTime must depend on video length
    case "fast": blurTime = 2.00; sayTime = 3500; proceedTime = 7500;   break; // proceedTime must depend on video length
    default:     blurTime = 3.30; sayTime = 4500; proceedTime = 8750;   // proceedTime must depend on video length
  }

  main.style.animationDuration = String(blurTime)+"s"; // Blur+Unblur paused at mid » See css_for_photos_and_videos_teach_a_new_word
  if (deviceDetector.isMobile){ main.classList.add("grayscaleUngrayscalePauseUnpauseAtMid"); } /*Easy on CPU*/
  else { main.classList.add("blurUnblurPauseUnpauseAtMid"); }

  new SuperTimeout(function(){ main.style.animationPlayState = "paused"; }, blurTime*500); // Full blur in fast:1s, normal:1.75s, slow:2.5s // Using "paused" can give inaccurate results, but in this case it is usable even if it can't stop at exactly 50%
  // Bring the 1st video
  vidsContainer.classList.add("videoAppearsOverPhotos");
  vidsContainer.style.animationDuration = (blurTime/3).toFixed(2)+"s";
  vidsContainer.style.display = "block";
  new SuperTimeout(function(){
    vid1.play(); // Let video play and then go back to double photos (still image pairs),,, total video length ~ ???s.
    //sfx
    new SuperTimeout(function(){ sayC.play(); }, sayTime);
    new SuperTimeout(function(){ removeVid1AndReturnToAB(); }, proceedTime);
  }, blurTime*500 - 900); // Video will start playing 0.9s before it is unblurred
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
    case "slow": changeTime = 3; sayTime = 6000; proceedTime = 13000;  break;
    case "fast": changeTime = 1; sayTime = 4000; proceedTime = 8000;  break;
    default:     changeTime = 2; sayTime = 5500; proceedTime = 10500;
  }
  // No fade time
  imgA.classList.add("makePhotosDisappear");  imgA.style.animationDuration = String(changeTime)+"s";
  imgB.classList.add("makePhotosDisappear");  imgB.style.animationDuration = String(changeTime)+"s";

  new SuperTimeout(function(){
    imgC.style.display = "block ";   imgC.classList.add("makePhotosAppear");   imgC.style.animationDuration = String(changeTime)+"s";
    imgD.style.display = "block ";   imgD.classList.add("makePhotosAppear");   imgD.style.animationDuration = String(changeTime)+"s";
    // sfx
    // No fade time
  }, changeTime*500); // Overlap images instead of to-white-from-white
  new SuperTimeout(function(){ whatSpoonSoundsLike1.play(); }, changeTime*500 + 1500);
  new SuperTimeout(function(){ sayDE.play(); }, changeTime*500 + sayTime);
  // No fading back-to-full-volume for fx sound
  new SuperTimeout(function(){ blurCDandBringVid2OverCD(); }, changeTime*500 + proceedTime);
}

function blurCDandBringVid2OverCD() {
  let blurTime, startTime, sayTime, proceedTime;
  switch (parent.speedAdjustmentSetting) {
    case "slow": blurTime = 4.60; startTime = 0; sayTime = 6000; proceedTime = 11000;  break; // proceedTime must depend on video length
    case "fast": blurTime = 2.00; startTime = 2; sayTime = 3000; proceedTime = 7000;   break; // proceedTime must depend on video length
    default:     blurTime = 3.30; startTime = 1; sayTime = 4500; proceedTime = 7750;  // proceedTime must depend on video length
  }

  main.style.animationDuration = String(blurTime)+"s"; // Blur+Unblur paused at mid » See css_for_photos_and_videos_teach_a_new_word
  if (deviceDetector.isMobile){ main.classList.add("grayscaleUngrayscalePauseUnpauseAtMid"); } /*Easy on CPU*/
  else { main.classList.add("blurUnblurPauseUnpauseAtMid"); }

  new SuperTimeout(function(){ main.style.animationPlayState = "paused"; }, blurTime*500); // To full blur in fast:1s, normal:1.75s, slow:2.5s
  // Bring the 2nd video
  vidsContainer.classList.add("videoAppearsOverPhotos");
  vidsContainer.style.animationDuration = (blurTime/3).toFixed(2)+"s";
  vidsContainer.style.display = "block"; vid2.currentTime = startTime;
  new SuperTimeout(function(){
    vid2.play(); // total video length ~ ???s.
    //sfx
    new SuperTimeout(function(){ sayF.play(); }, sayTime);
    new SuperTimeout(function(){ removeVid2AndReturnToCD(); }, proceedTime);
  }, blurTime*500 - 900); // Video will start playing 0.9s before it is unblurred
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
    case "slow": changeTime = 3; sayTime = 6000; proceedTime = 13000; break;
    case "fast": changeTime = 1; sayTime = 4000; proceedTime = 8000; break;
    default:     changeTime = 2; sayTime = 5500; proceedTime = 10500;
  }
  // No fade time
  imgC.classList.remove("makePhotosAppear");  imgC.classList.add("makePhotosDisappear");  imgC.style.animationDuration = String(changeTime)+"s";
  imgD.classList.remove("makePhotosAppear");  imgD.classList.add("makePhotosDisappear");  imgD.style.animationDuration = String(changeTime)+"s";

  new SuperTimeout(function(){
    imgE.style.display = "block ";   imgE.classList.add("makePhotosAppear");   imgE.style.animationDuration = String(changeTime)+"s";
    imgF.style.display = "block ";   imgF.classList.add("makePhotosAppear");   imgF.style.animationDuration = String(changeTime)+"s";
    // sfx
    // No fade time
  }, changeTime*500); // Overlap images instead of to-white-from-white
  new SuperTimeout(function(){ whatSpoonSoundsLike2.play(); }, changeTime*500 + 1500);
  new SuperTimeout(function(){ sayGH.play(); }, changeTime*500 + sayTime);
  // No more videos to bring
  // No fading back-to-full-volume
  new SuperTimeout(function () {
    continueLesson();
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
      if (nowYouSayIt.children[0].src.includes(".avif")) {        nowYouSayIt.children[0].classList.add("animateAvifSprite");      }
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
  new SuperInterval(bringTheNext, changeTime*1000); // Minor issue: Changing speedAdjustmentSetting will not take effect after this starts ticking
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
    // The GIVE-UP-BUTTON appears (which turns into a Go-To-Next-Button on Firefox2021 etc).
    // If speech is recognized, use clearTimeout to prevent its "showing-up".
    preventGiveUpButtonIfSuccessHappens = new SuperTimeout(function () { // This must start ticking only after countdownForGiveUpSkipOrGoToNext is updated.
      giveUpAndContinueButtonASIDE.classList.add("addThisToGlassButtonToUnhide");
    },countdownForGiveUpSkipOrGoToNext); // This must start ticking only after countdownForGiveUpSkipOrGoToNext is updated.
  },120);

  // setLanguage() for annyang is in /js_reusables/js_for_the_parent_all_browsers_all_devices.js
  const eachWordArray = theNewWordUserIsLearningNowAndPossibleMishaps.split("|"); // The text files in speech_recognition_answer_key must be written with the | (bar) character as the separator between phrases.

  if (parent.annyang) { parent.console.log("Starting speech recognition for: "+eachWordArray[0]);

    if (!parent.isAndroid) { // See js_for_different_browsers_and_devices
        notificationDingTone.play(); // Android has its native DING tone. So let this DING tone play on desktops and iOS devices.
    }
    // Start listening.
    new SuperTimeout(function() {  parent.annyang.start({ autoRestart: true });  },500);
    new SuperTimeout(function() {  startAudioInputVisualization();  },600); // Will work only on devices that can handle it. See js_for_microphone_input_visualization.js
    // New method of detecting matches
    parent.annyang.addCallback('result', compareAndSeeIfTheAnswerIsCorrect);
    function compareAndSeeIfTheAnswerIsCorrect(phrasesArray) {
      parent.console.log('Speech recognized. Possibly said: '+phrasesArray);
      // Check if there is a match
      let j;
      for(j=0;j<eachWordArray.length;j++) {
        let k;
        for (k = 0; k < phrasesArray.length; k++) {
          const fromPhraseToSingleWords = phrasesArray[k].split(" "); // Note that in "spaceless" languages like Renmen-Hito phrases will not be split into words
          let z;
          for (z = 0; z < fromPhraseToSingleWords.length; z++) {
            let searchResult = false;
            if (fromPhraseToSingleWords[z].toLowerCase() == eachWordArray[j].toLowerCase()) { searchResult = true; } // For some reason this fails for Arabic in Safari >>> Works without any problems in Chrome though
            else if (isApple) {
              if (parent.annyang.getSpeechRecognizer().lang == "ar") { parent.console.warn("Listening for Arabic on Safari/Apple");
                // Use string search to try and find it within the phrase and not individual words
                if (phrasesArray[k].search(eachWordArray[j]) >= 0) { searchResult = true; }
              }
            }
            // -
            if (!aMatchWasFound && searchResult) {
              aMatchWasFound = true; // Using this, we make sure that stopListeningAndProceedToNext fires only and only once
              if (parent.annyang.getSpeechRecognizer().interimResults) { parent.console.log("Correct answer detected with interimResults enabled");
                setTimeout(function () { stopListeningAndProceedToNext(); }, 250); // Interim results is or can be too quick (especially on Windows)
              } else { parent.console.log("Correct answer detected without interimResults");
                stopListeningAndProceedToNext();
              }
            } else {
              // Prevent a possible second firing (or any further firings) of stopListeningAndProceedToNext by doing nothing
            }
          } // End of for z
        } // End of for k
      } // End of for j
    } // END OF compareAndSeeIfTheAnswerIsCorrect
  }

} /* END OF speakToTheMic */

// stopListeningAndProceedToNext >>> Used to be: var stopListeningAndProceedToNext = function () {};
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
    // parent.annyang.abort(); // OR should we??? //if (!parent.isApple) {  parent.annyang.abort();  } // ISSUE THAT NEEDS SERIOUS CARE: Safari doesn't allow mic permanently; it allows for only 1 listening session and prompts for permission everytime mic restarts
    if (isApple) { parent.annyang.pause(); }
    else { parent.annyang.abort(); }
  }
  // Stop Wavesurfer microphone: We don't want to wait for "beforeunload" so we call the function immediately even though it will fire one more time with window.onbeforeunload
  // We cannot disable "beforeunload" BECAUSE if user navigates away in the middle of a mic session we want the mic turned off
  // Yet, we also want to hide the visualization asap when success happens, therefore it has to be armed both in js_for_all_iframed_lesson_htmls and here
  stopAudioInputVisualization(); // See js_for_microphone_input_visualization

  /* Save progress */
  if (!userHasGivenUp) { // User was successful with speech recognition
    parent.savedProgress[studiedLang].lesson_SPOON_IsCompleted=true; // WATCH THE NAME OF THE LESSON!!!
  } else { // User has given up and wants to continue anyhow
    parent.savedProgress[studiedLang].lesson_SPOON_IsCompleted=false; // WATCH THE NAME OF THE LESSON!!!
  }
  parent.saveJSON = JSON.stringify(parent.savedProgress); // Convert
  localStorage.setItem("memoryCard", parent.saveJSON); // Save

  /* GET READY TO EXIT THIS LESSON */
  let endTime;
  switch (parent.speedAdjustmentSetting) { case "slow": endTime = 5000; break;    case "fast": endTime = 3000; break;    default: endTime = 4000; }
  new SuperTimeout(function() { showGlobyPreloaderBeforeExit(); },endTime-1500); // See js_for_all_iframed_lesson_htmls AND See css_for_preloader_and_orbiting_circles
  // REMEMBER: iframe.src change makes window.onbeforeunload fire in js_for_all_iframed_lesson_htmls.js which then calls unloadTheSoundsOfThisLesson();
  parent.pathOfWhatWillBeDisplayedUnlessInternetConnectivityIsLost = "/lessons_in_iframes/level_1/unit_2/lesson_4/index.html"; // See js_for_online_and_offline_modes
  // --- HANDLE ONLINE and OFFLINE cases
  if (parent.internetConnectivityIsNiceAndUsable) { // See js_for_online_and_offline_modes.js
    new SuperTimeout(function() { parent.ayFreym.src = parent.pathOfWhatWillBeDisplayedUnlessInternetConnectivityIsLost; },endTime); // See js_for_all_iframed_lesson_htmls » onbeforeunload
  } else { parent.console.warn("THE DEVICE IS OFFLINE (detected at the end of lesson");
    const isCached = checkIfNextLessonIsCachedAndRedirectIfNot(124); // See js_for_all_iframed_lesson_htmls
    if (isCached) { parent.console.warn("WILL TRY TO CONTINUE OFFLINE");
      new SuperTimeout(function() { parent.ayFreym.src = parent.pathOfWhatWillBeDisplayedUnlessInternetConnectivityIsLost; },endTime); // See js_for_all_iframed_lesson_htmls » onbeforeunload
    }
  }
  // ---
} // END OF stopListeningAndProceedToNext
