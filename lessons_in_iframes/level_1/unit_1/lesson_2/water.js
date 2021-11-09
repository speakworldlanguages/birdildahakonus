// This is DEFERRED in html
// IMPORTANT: Find revealGiveUpSkipOrGoToNextCountdown because we must adjust its value for each lesson

/* __ SAVE PROGRESS TO LOCAL STORAGE __ */
// See js_for_every_single_html to find savedProgress saveJSON loadJSON
// See js_for_all_container_parent_htmls to find how savedProgress.ja savedProgress.zh savedProgress.tr savedProgress.ar savedProgress.en are created
const studiedLang = parent.theLanguageUserIsLearningNowToSetFilePaths;
// !!! VERY CAREFUL: Watch the lesson name!!!
savedProgress[studiedLang].lesson_WATER_IsViewed=true; // Create and add... or overwrite the same thing
saveJSON = JSON.stringify(savedProgress); // Convert
localStorage.setItem("memoryCard", saveJSON); // Save

// All settings here will depend on the content of the lesson
let theNewWordUserIsLearningNowAndPossibleMishaps; // Get this from txt file
// CAUTION: parent.theLanguageUserIsLearningNowToSetFilePaths variable depends on localStorage data being available. See js_for_all_container_parent_htmls.js
const filePathForTheWordOrPhrase = "../../../../speech_recognition_dictionary/"+parent.theLanguageUserIsLearningNowToSetFilePaths+"/1-1-2-water.txt";
// See js_for_fetch_api_character_encoding.js for the headers setting.
fetch(filePathForTheWordOrPhrase,myHeaders).then(function(response){return response.text();}).then(function(contentOfTheTxtFile){ theNewWordUserIsLearningNowAndPossibleMishaps = contentOfTheTxtFile; });

/* ___AUDIO ELEMENTS___ */ //...Sound player (Howler) exists in the parent html. So the path must be relative to the parent html. Not to the framed html.
const say1say2Path = "audio_files_for_listening/"+parent.theLanguageUserIsLearningNowToSetFilePaths+"/level_1/unit_1/lesson_2/water_1-2."+parent.audioFileExtension;
const say3Path     = "audio_files_for_listening/"+parent.theLanguageUserIsLearningNowToSetFilePaths+"/level_1/unit_1/lesson_2/water_3."+parent.audioFileExtension;
const say4say5Path = "audio_files_for_listening/"+parent.theLanguageUserIsLearningNowToSetFilePaths+"/level_1/unit_1/lesson_2/water_4-5."+parent.audioFileExtension;
const say6Path     = "audio_files_for_listening/"+parent.theLanguageUserIsLearningNowToSetFilePaths+"/level_1/unit_1/lesson_2/water_6."+parent.audioFileExtension;
const say7say8Path = "audio_files_for_listening/"+parent.theLanguageUserIsLearningNowToSetFilePaths+"/level_1/unit_1/lesson_2/water_7-8."+parent.audioFileExtension;

const sayAB = new parent.Howl({  src: [say1say2Path]  });
const sayC  = new parent.Howl({  src: [say3Path]      });
const sayDE = new parent.Howl({  src: [say4say5Path]  });
const sayF  = new parent.Howl({  src: [say6Path]      });
const sayGH = new parent.Howl({  src: [say7say8Path]  });

const whatWaterSoundsLike1 = new parent.Howl({  src: ['lessons_in_iframes/level_1/unit_1/lesson_2/what_water_sounds_like_1.'+parent.audioFileExtension]  });
const whatWaterSoundsLike2 = new parent.Howl({  src: ['lessons_in_iframes/level_1/unit_1/lesson_2/what_water_sounds_like_2.'+parent.audioFileExtension]  });
const whatWaterSoundsLike3 = new parent.Howl({  src: ['lessons_in_iframes/level_1/unit_1/lesson_2/what_water_sounds_like_3.'+parent.audioFileExtension]  });
const whatWaterSoundsLike4 = new parent.Howl({  src: ['lessons_in_iframes/level_1/unit_1/lesson_2/what_water_sounds_like_4.'+parent.audioFileExtension]  });
const whatWaterSoundsLike5 = new parent.Howl({  src: ['lessons_in_iframes/level_1/unit_1/lesson_2/what_water_sounds_like_5.'+parent.audioFileExtension]  });
const successTone = new parent.Howl({  src: ['user_interface/sounds/success2.'+parent.audioFileExtension]  });
const notificationDingTone = new parent.Howl({  src: ['user_interface/sounds/ding.'+parent.audioFileExtension]  });

function unloadTheSoundsOfThisLesson() { // Either call this as the last thing before leaving or let it be called by window.onbeforeunload in js_for_all_iframed_lesson_htmls
  notificationDingTone.unload();
  successTone.unload();
  whatWaterSoundsLike5.unload();
  whatWaterSoundsLike4.unload();
  whatWaterSoundsLike3.unload();
  whatWaterSoundsLike2.unload();
  whatWaterSoundsLike1.unload();
  sayGH.unload();  sayF.unload();  sayDE.unload();  sayC.unload();  sayAB.unload();
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
const nowYouSayIt = document.getElementById('nowYouSayItIMG');
const containerOfSingles = document.getElementById('singlesDivID');

const giveUpAndContinueButtonIsInsideThisDiv = document.getElementById('giveUpSkipNextContinueButtonDivID');

/* ___PROGRESSION___ */
window.addEventListener("load",function(){   loadingIsCompleteFunction();   }, { once: true });
// Desktop users can change the speed; mobile users can't. Because the mobile GUI has to stay simple.
function loadingIsCompleteFunction()
{
  // Stop and notify the user if necessary; otherwise just continue.
  if (parent.theLanguageUserIsLearningNowToSetFilePaths == "ja") { // Display the explanation about "mizu" and "omizu".
    const pathOfNotificationAboutMizuOmizu = "../../../../user_interface/text/"+userInterfaceLanguage+"/1-1-2_hito_mizu_omizu.txt";
    fetch(pathOfNotificationAboutMizuOmizu,myHeaders).then(function(response){return response.text();}).then(function(contentOfTheTxtFile){
      setTimeout(function(){ createAndHandleNotificationBox(); putNotificationTxtIntoThisP.innerHTML = contentOfTheTxtFile; },501); // See js_for_notification_or_such_boxes.js
      // createAndHandleNotificationBox() will fire startTheLesson() 1.5 seconds after its OK button is clicked/touched
    });
  }
  else {
    startTheLesson();
  }
}
// NOTE: The preloader disappears in 500ms ,,, CAN: Find addThisClassToHideThePreloader to see
// For speedAdjustmentCoefficient see js_for_the_sliding_navigation_menu.js USED TO BE: 1.4|1.0|0.78 CHANGED TO 2|1|0
function startTheLesson()
{
  let c = parent.speedAdjustmentCoefficient; // slow c=0, fast c=2, normal c=1
  whatWaterSoundsLike1.play(); /*8607ms*/  whatWaterSoundsLike1.fade(1,0.5,2000);
  setTimeout(function(){ sayAB.play(); }, 3500 - c*1000);
  sayAB.once("end", function(){  whatWaterSoundsLike1.fade(0.5,1,2000);  });
  setTimeout(function () { blurABandBringVid1OverAB(); whatWaterSoundsLike1.fade(1,0,999); },10607-c*2000); // slow ...., normal ...., fast ....
}

function blurABandBringVid1OverAB() {
  let c = parent.speedAdjustmentCoefficient; // Note: Speed c might have changed
  if (deviceDetector.isMobile){    main.classList.add("sepiaUnsepiaPauseUnpauseAtMid");   } /*Easy on CPU*/
  else {   main.classList.add("blurUnblurPauseUnpauseAtMid");   }
  let blurTime;  switch (c) {  case 0: blurTime = 2.5; break;  case 2: blurTime = 1.5; break;  default: blurTime = 2.0;  }
  main.style.animationDuration = blurTime+"s";
  setTimeout(function(){ main.style.animationPlayState = "paused"; }, (blurTime*1000)/2 ); // Using "paused" can give inaccurate results, but it's not too bad even if it is inaccurate and can't stop at exactly 50%
  setTimeout(function(){
    // Bring the 1st video
    vidsContainer.classList.add("videoAppearsOverPhotos");   vidsContainer.style.animationDuration = (c+1)/2+"s"; //slow 0.5, fast 1.5, normal 1.0
    vidsContainer.style.display = "block"; vid1.currentTime = 0;
  }, 100);
  setTimeout(function(){
    vid1.play(); // Let video play and go back to double photos - still image pairs after video has played long enough,,, total video length ~ 9s.
    whatWaterSoundsLike2.play(); // Syncing is not always good but will let it be
    setTimeout(function(){ sayC.play(); }, 9000 - c*1000);
    let exitTime;  switch (c) {  case 0: exitTime = 12000; break;  case 2: exitTime = 10000; break;  default: exitTime = 11000;  } // 1000ms difference is good
    setTimeout(function(){ removeVid1AndReturnToAB(); }, exitTime); // High speed .... // Low speed .... // Normal speed ....
  }, 600);
}

function removeVid1AndReturnToAB() {
  // let c = parent.speedAdjustmentCoefficient; // Not using c here
  // Blur it away ...
  vidsContainer.classList.remove("videoAppearsOverPhotos"); vidsContainer.classList.add("videoDisappearsOverPhotos");
  setTimeout(function(){
    vidsContainer.removeChild(vid1);    vidsContainer.style.display = "none";   vidsContainer.classList.remove("videoDisappearsOverPhotos"); // Reset
    vid2.style.display = "block"; // Get ready for the next one
  }, 2002); // 2002 is only to be safe
  setTimeout(function(){ main.style.animationPlayState = "running"; }, 100); // Unblur back in
  setTimeout(function(){ main.classList.remove("blurUnblurPauseUnpauseAtMid"); main.classList.remove("sepiaUnsepiaPauseUnpauseAtMid"); }, 3003);   // To be able to restart // It's OK to omit if (isMobile)
  setTimeout(function(){ goFromABtoCD(); }, 1001);
}

function goFromABtoCD()
{
  let c = parent.speedAdjustmentCoefficient; // slow c=0, fast c=2, normal c=1
  let changeTime;  switch (c) {  case 0: changeTime = 2.5; break;  case 2: changeTime = 1.5; break;  default: changeTime = 2.0;  }
  imgA.classList.add("makePhotosDisappear");  imgA.style.animationDuration = changeTime+"s"; // fast=1.5s normal=2s slow=2.5s
  imgB.classList.add("makePhotosDisappear");  imgB.style.animationDuration = changeTime+"s"; // fast=1.5s normal=2s slow=2.5s

  setTimeout(function(){
    imgC.style.display = "block ";   imgC.classList.add("makePhotosAppear");   imgC.style.animationDuration = changeTime+"s";
    imgD.style.display = "block ";   imgD.classList.add("makePhotosAppear");   imgD.style.animationDuration = changeTime+"s";
    whatWaterSoundsLike3.play(); // 8808ms
  }, 500);
  setTimeout(function(){ sayDE.play(); }, 3500 + changeTime*1000 - c*1000); // ...
  setTimeout(function(){ blurCDandBringVid2OverCD(); }, 11000 - c*2000);
}

function blurCDandBringVid2OverCD() {
  let c = parent.speedAdjustmentCoefficient; // Note: Speed c might have changed
  if (deviceDetector.isMobile){    main.classList.add("sepiaUnsepiaPauseUnpauseAtMid");   } /*Easy on CPU*/
  else {    main.classList.add("blurUnblurPauseUnpauseAtMid");   }
  let blurTime;  switch (c) {  case 0: blurTime = 2.5; break;  case 2: blurTime = 1.5; break;  default: blurTime = 2.0;  }
  main.style.animationDuration = blurTime+"s";
  setTimeout(function(){ main.style.animationPlayState = "paused"; }, (blurTime*1000)/2 );
  setTimeout(function(){
    // Bring the 2nd video
    vidsContainer.classList.add("videoAppearsOverPhotos"); vidsContainer.style.animationDuration = (c+1)/2+"s"; //slow 0.5, fast 1.5, normal 1.0
    vidsContainer.style.display = "block"; vid2.currentTime = 0; // autoplay plays and stops at the end which means all bytes are loaded and ready
  }, 100);
  setTimeout(function(){
    vid2.play(); // Let video play and go back to double photos - still image pairs after video has played long enough,,, total video length ~ ???s.
    whatWaterSoundsLike4.play(); // 9048ms
    setTimeout(function(){ sayF.play(); }, 9000 - c*1000);
    let exitTime;  switch (c) {  case 0: exitTime = 12000; break;  case 2: exitTime = 10000; break;  default: exitTime = 11000;  } // 1000ms difference is good
    setTimeout(function(){ removeVid2AndReturnToCD(); }, exitTime);
  }, 600);
}

function removeVid2AndReturnToCD() {
  // let c = parent.speedAdjustmentCoefficient;
  // Blur it away ...
  vidsContainer.classList.remove("videoAppearsOverPhotos"); vidsContainer.classList.add("videoDisappearsOverPhotos");
  setTimeout(function(){ vidsContainer.removeChild(vid2);  vidsContainer.style.display = "none"; }, 2002); // 2002 is only to be safe
  setTimeout(function(){ main.style.animationPlayState = "running"; }, 100); // Unblur back in
  // There is no 3rd video so there is no need to remove("videoDisappearsOverPhotos")
  setTimeout(function(){ goFromCDtoEF(); }, 1001);
}

function goFromCDtoEF() {
  let c = parent.speedAdjustmentCoefficient;
  let changeTime;  switch (c) {  case 0: changeTime = 2.5; break;  case 2: changeTime = 1.5; break;  default: changeTime = 2.0;  }
  imgC.classList.remove("makePhotosAppear");  imgC.classList.add("makePhotosDisappear");  imgC.style.animationDuration = changeTime+"s";
  imgD.classList.remove("makePhotosAppear");  imgD.classList.add("makePhotosDisappear");  imgD.style.animationDuration = changeTime+"s";

  setTimeout(function(){
    imgE.style.display = "block ";   imgE.classList.add("makePhotosAppear");   imgE.style.animationDuration = changeTime+"s";
    imgF.style.display = "block ";   imgF.classList.add("makePhotosAppear");   imgF.style.animationDuration = changeTime+"s";
    whatWaterSoundsLike5.play(); /* 13944ms*/ whatWaterSoundsLike5.fade(1,0.5,3000);
  }, 500*c);
  setTimeout(function(){ sayGH.play(); }, 3500 + changeTime*1000 - c*1000); // ...
  sayAB.once("end", function(){  whatWaterSoundsLike5.fade(0.5,1,2000);  });
  setTimeout(function () { display_nowItsYourTurn_animation(); whatWaterSoundsLike5.fade(1,0,1999); }, 11000 - c*2000 );
}

let revealGiveUpSkipOrGoToNextCountdown = 3300; // For non-whitelisted browsers
function display_nowItsYourTurn_animation() {
  let c = parent.speedAdjustmentCoefficient;
  let changeTime;  switch (c) {  case 0: changeTime = 2.5; break;  case 2: changeTime = 1.5; break;  default: changeTime = 2.0;  }
  containerOfDoubles.classList.add("makePhotosDisappear"); containerOfDoubles.style.animationDuration = changeTime+"s";
  setTimeout(function(){  containerOfDoubles.parentNode.removeChild(containerOfDoubles);  }, changeTime*1000);

  fullVpDarkBlue.style.display = "block"; fullVpDarkBlue.classList.add("darkenLightenBackground"); fullVpDarkBlue.style.animationDuration = changeTime*2+"s";
  setTimeout(function(){ fullVpDarkBlue.style.animationPlayState = "paused"; }, changeTime*1000); // 4s » half is 2s = 2000ms

  setTimeout(function(){ speakToTheMic(); }, 1111);
  setTimeout(function(){
    containerOfSingles.style.display = "block"; containerOfSingles.classList.add("singlesContainerAppears"); containerOfSingles.style.animationDuration = changeTime*1.5+"s";
    setTimeout(function(){ showSinglesOneByOne(); }, 1000);
  }, changeTime*1000+1000);
  // nowYouSayIt takes 5100ms
  // Display the “It's your turn” animation if the user's browser is whitelisted.
  if (parent.isTheUsersBrowserWhitelisted) {
    nowYouSayIt.style.display = "block";
    setTimeout(function(){ nowYouSayIt.src = onePixelTransparentGif; nowYouSayIt.parentNode.removeChild(nowYouSayIt); }, 5101);
    revealGiveUpSkipOrGoToNextCountdown = 42000 - c*5000; // For whitelisted browsers
  }
}

function showSinglesOneByOne() {
  const allSingles = containerOfSingles.children; // Use children instead of childNodes to ignore HTML comments
  let i = 0; const modulus = allSingles.length;
  let c = parent.speedAdjustmentCoefficient;
  let changeTime;  switch (c) {  case 0: changeTime = 5; break;  case 2: changeTime = 2; break;  default: changeTime = 3.5;  }
  setInterval(bringTheNext, changeTime*1000 );
  function bringTheNext() {
    let now = i%modulus; let next = (i+1)%modulus;
    allSingles[now].classList.remove("simpleFadeIn");    allSingles[now].classList.add("simpleFadeOut");  allSingles[now].style.animationDuration  = changeTime/2+"s";
    allSingles[next].classList.remove("simpleFadeOut");  allSingles[next].classList.add("simpleFadeIn");  allSingles[next].style.animationDuration = changeTime/2+"s";
    allSingles[now].style.zIndex = i+50;
    allSingles[next].style.zIndex = i+51;
    i++;
  }
}

/* ___SPEECH RECOGNITION___ */
var userHasGivenUp = false;
var preventGiveUpButtonIfSuccessHappens;
function speakToTheMic() {
  //let c = parent.speedAdjustmentCoefficient;

  setTimeout(function () {
    // The GIVE-UP-BUTTON (it becomes a Go-To-Next-Button on Firefox2021 etc) appears SLOWLY.
    // If speech is recognized, use clearTimeout before it appears to prevent it accordingly.
    preventGiveUpButtonIfSuccessHappens = setTimeout(function () { // This must start ticking only after revealGiveUpSkipOrGoToNextCountdown is updated.
      giveUpAndContinueButtonIsInsideThisDiv.classList.add("addThisToGlassButtonToUnhide");
    },revealGiveUpSkipOrGoToNextCountdown); // This must start ticking only after revealGiveUpSkipOrGoToNextCountdown is updated.
  },120);

  // NOTE: To find “what language the browser will listen to (via annyang)” see the code in /js_reusables/js_for_all_container_parent_htmls.js
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
    if (deviceDetector.device == "desktop" || parent.detectedOS.name == "iOS") { // Thanks to PoeHaH and faisalman
        notificationDingTone.play(); // Android has its native DING tone. So let this DING tone play on desktops and iOS devices.
    }
    // Start listening.
    setTimeout(function() {  parent.annyang.start();  },200);
    setTimeout(function() {  startAudioInputVisualization();  },300); // Will work only on desktops. See js_for_microphone_input_visualization.js
  }

} /* END OF speakToTheMic */

// stopListeningAndProceedToNext
var stopListeningAndProceedToNext = function () {
  if (!userHasGivenUp) { // Real success of speech recognition
    successTone.play(); fullVpDarkBlue.style.animationPlayState = "running"; containerOfSingles.classList.add("brightenUp");
    if (canVibrate) {  navigator.vibrate([14, 133, 12, 111, 12, 133, 20]);  }
    clearTimeout(preventGiveUpButtonIfSuccessHappens);
    giveUpAndContinueButtonIsInsideThisDiv.classList.add("addThisToGlassButtonWhenSuccessHappens");
  } else { // Give up and continue
    containerOfSingles.classList.add("darkenDown");
    if (canVibrate) {  navigator.vibrate([13]);  }
  }
  // Stop all microphone activity as soon as success happens and don’t wait until “beforeunload” fires. See js_for_all_iframed_lesson_htmls to find what happens with window.onbeforeunload
  if (parent.annyang) { // As of 2021, Firefox says annyang is undefined. But the app still has to work without Web Speech API so the code must be wrapped in if(parent.annyang).
    parent.annyang.removeCommands();
    parent.annyang.abort();
  }
  // Stop Wavesurfer microphone: Don't wait for "beforeunload" and kill it immediately even though it will fire one more time with window.onbeforeunload » user could navigate away in the middle of mic session
  stopAudioInputVisualization();
  /* GET READY TO EXIT THIS LESSON */
  setTimeout(function() {
    parent.preloadHandlingDiv.classList.remove("addThisClassToHideThePreloader");
    parent.preloadHandlingDiv.classList.add("addThisClassToRevealThePreloader");
  },2100); // 3600-1500 = 2100 See css_for_every_single_html
  // REMEMBER: iframe.src change makes window.onbeforeunload fire in js_for_all_iframed_lesson_htmls.js which has unloadTheSoundsOfThisLesson();
  setTimeout(function() { parent.ayFreym.src = 'lessons_in_iframes/level_1/unit_1/lesson_3'; },3600); // Replace this when lesson 3 is ready
  /* Save progress */
  savedProgress[studiedLang].lesson_WATER_IsCompleted=true; // WATCH THE NAME OF THE LESSON!!!
  saveJSON = JSON.stringify(savedProgress); // Convert
  localStorage.setItem("memoryCard", saveJSON); // Save
};
