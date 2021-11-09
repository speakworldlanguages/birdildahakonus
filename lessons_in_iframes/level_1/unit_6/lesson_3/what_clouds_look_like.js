// All settings here will depend on the content of the lesson
// See js_for_every_single_html.js for userInterfaceLanguage
const filePathA = "../../../../user_interface/text/"+userInterfaceLanguage+"/1-6-3a.txt";
const filePathB = "../../../../user_interface/text/"+userInterfaceLanguage+"/1-6-3b.txt";
const filePathC = "../../../../user_interface/text/"+userInterfaceLanguage+"/1-6-3c.txt";
const filePathD = "../../../../user_interface/text/"+userInterfaceLanguage+"/1-6-3d.txt";
let textA; // Warning. Returns UNDEFINED before fetch() actually gets the file.
let textB;
let textC;
let textD;
fetch(filePathA,myHeaders).then(function(response){return response.text();}).then(function(contentOfTheTxtFile){ textA = contentOfTheTxtFile; });
fetch(filePathB,myHeaders).then(function(response){return response.text();}).then(function(contentOfTheTxtFile){ textB = contentOfTheTxtFile; });
fetch(filePathC,myHeaders).then(function(response){return response.text();}).then(function(contentOfTheTxtFile){ textC = contentOfTheTxtFile; });
fetch(filePathD,myHeaders).then(function(response){return response.text();}).then(function(contentOfTheTxtFile){ textD = contentOfTheTxtFile; });

/* ___AUDIO ELEMENTS___ */
const say1NaturalPath = "audio_files_for_listening/"+parent.theLanguageUserIsLearningNowToSetFilePaths+"/level_1/unit_6/lesson_3/that_cloud_is_like_a_bird.mp3";
const say1Natural = new parent.Howl({  src: [say1NaturalPath]  });
const say1SlowPath = "audio_files_for_listening/"+parent.theLanguageUserIsLearningNowToSetFilePaths+"/level_1/unit_6/lesson_3/that_cloud_is_like_a_bird_slow.mp3";
const say1Slow = new parent.Howl({  src: [say1SlowPath]  });
const say2NaturalPath = "audio_files_for_listening/"+parent.theLanguageUserIsLearningNowToSetFilePaths+"/level_1/unit_6/lesson_3/that_cloud_is_like_a_fish.mp3";
const say2Natural = new parent.Howl({  src: [say2NaturalPath]  });
const say2SlowPath = "audio_files_for_listening/"+parent.theLanguageUserIsLearningNowToSetFilePaths+"/level_1/unit_6/lesson_3/that_cloud_is_like_a_fish_slow.mp3";
const say2Slow = new parent.Howl({  src: [say2SlowPath]  });
const say3NaturalPath = "audio_files_for_listening/"+parent.theLanguageUserIsLearningNowToSetFilePaths+"/level_1/unit_6/lesson_3/where_is_the_sun.mp3";
const say3Natural = new parent.Howl({  src: [say3NaturalPath]  });
const say3SlowPath = "audio_files_for_listening/"+parent.theLanguageUserIsLearningNowToSetFilePaths+"/level_1/unit_6/lesson_3/where_is_the_sun_slow.mp3";
const say3Slow = new parent.Howl({  src: [say3SlowPath]  });
const say4Path = "audio_files_for_listening/"+parent.theLanguageUserIsLearningNowToSetFilePaths+"/level_1/unit_6/lesson_3/the_sun_is_there.mp3";
const say4 = new parent.Howl({  src: [say4Path]  });

const loopingBackgroundSound = new parent.Howl({  src: ['lessons_in_iframes/level_1/unit_6/lesson_3/forest_sound_loop.mp3']  , loop:true });
const loopingBackgroundMusic = new parent.Howl({  src: ['lessons_in_iframes/level_1/unit_6/lesson_3/where_is_the_sun_bgm_loop.mp3']  , loop:true });
const videoSoundTrack = new parent.Howl({  src: ['lessons_in_iframes/level_1/unit_6/lesson_3/state_e_soundtrack.mp3']  });
function unloadTheSoundsOfThisLesson() { // Call this as the last thing before leaving.
  videoSoundTrack.unload();
  loopingBackgroundMusic.unload();
  loopingBackgroundSound.unload();
  say4.unload();
  say3Slow.unload();
  say3Natural.unload();
  say2Slow.unload();
  say2Natural.unload();
  say1Slow.unload();
  say1Natural.unload();
}

/* ___VISUAL ELEMENTS___ */
const imgA = document.getElementById("imageA");
const imgB = document.getElementById("imageB");
const imgC = document.getElementById("imageC");
const imgD = document.getElementById("imageD");
const imgE = document.getElementById("imageE");

const clickToProceed = document.getElementById("clickThisForTheNextActionBtnDIV");
const theImgInsideTheDivThatFunctionsAsAButton = document.getElementById("changeTheSrcOfThisIMG");

function unloadTheImagesOfThisLesson() { // Call this as the last thing before leaving.
  imgA.src = onePixelTransparentGif;
  imgB.src = onePixelTransparentGif;
  imgC.src = onePixelTransparentGif;
  imgD.src = onePixelTransparentGif;
  imgE.src = onePixelTransparentGif;
}

// ALWAYS: Use window load to be safe with timing.
window.addEventListener('load', function(){  loadingIsCompleteFunction();  }, { once: true });
var looping1; // Try var instead of let, not sure if that is the cause of the freezing problem in Safari
let counter1 = 1;
var looping2;
let counter2 = 1;
function loadingIsCompleteFunction()
{
  if (parent.theLanguageUserIsLearningNowToSetFilePaths == "zh") { // Display the warning about intonations to users who want to learn the Ren language.
    const pathOfNotificationAboutRenIntonation = "../../../../user_interface/text/"+userInterfaceLanguage+"/1-6-3_special_case_for_zh.txt";
    fetch(pathOfNotificationAboutRenIntonation,myHeaders).then(function(response){return response.text();}).then(function(contentOfTheTxtFile){
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
  } else {
    startTheLesson(); // PERHAPS: It would be better to use async await in js_for_all_iframed_lesson_htmls
  }
}

function startTheLesson()
{
  imgA.style.display = "initial";
  loopingBackgroundSound.play();
  setTimeout(function () {  goFromAtoB();  },6500);
}

function goFromAtoB()
{
  putTranslationIntoThisHelpAreaFromFileP.innerHTML = textA;
  setTimeout(function () {  putTranslationIntoThisHelpAreaFromFileP.innerHTML = textB;  },12500);
  imgA.style.display = "none";
  imgB.style.display = "initial";
  loopingBackgroundSound.fade(1,0,50000);
  setTimeout(function () { loopingBackgroundSound.stop(); },50000);
  /* EXACT TIMING IS NECESSARY! Find the milliseconds 26375ms per cycle */
  looping1 = setInterval(loopFunction1,52750);
  function loopFunction1() {
    setTimeout(function () {  say1Natural.play();  },4500);
    setTimeout(function () {  say2Natural.play();  },16688); // 3500+13188 =
    setTimeout(function () {  say1Slow.play();  },30875); // 4500+26375 =
    setTimeout(function () {  say2Slow.play();  },43063); // 3500+26375+13188 =
    if (counter1 == 2) {  clearInterval(looping1);  }
    counter1++;
  }
  loopFunction1();

  setTimeout(function () {
    clickToProceed.classList.add("addThisToMakeItAppearFromTop");
    if (deviceDetector.isMobile) {
      clickToProceed.addEventListener("touchstart",goFromBtoC,{once:true});
      clickToProceed.classList.add("addThisToAdjustPositionOnMobiles");
    } else {
      clickToProceed.addEventListener("mousedown",goFromBtoC,{once:true});
      clickToProceed.classList.add("addThisToAdjustPositionOnDesktops");
    }
  },24200); // 24200 ms looks good.
}

function goFromBtoC() {
  clearInterval(looping1); say1Natural.fade(1,0,1500); say2Natural.fade(1,0,1500); say1Slow.fade(1,0,1500); say2Slow.fade(1,0,1500);
  putTranslationIntoThisHelpAreaFromFileP.innerHTML = " ";
  clickToProceed.classList.remove("addThisToMakeItAppearFromTop");

  imgC.style.display = "initial"; imgC.classList.add("addThisForFadeIn2000ms");
  setTimeout(function () { imgB.style.display = "none"; theImgInsideTheDivThatFunctionsAsAButton.src = "make_the_wind_blow_btn_img.webp"; },2000);
  setTimeout(function () { goFromCtoD(); },4000);
}

function goFromCtoD() {
  setTimeout(function () {  putTranslationIntoThisHelpAreaFromFileP.innerHTML = textC;  },1400);
  imgC.style.display = "none";
  imgD.style.display = "initial";

  // No syncing necessary.
  looping2 = setInterval(loopFunction2,19500);
  function loopFunction2() {
    setTimeout(function () {  say3Natural.play();  },1500);
    setTimeout(function () {  say3Slow.play();  },11500);
    if (counter2 == 3) {  clearInterval(looping2);  }
    counter2++;
  }
  loopFunction2();

  loopingBackgroundMusic.play();
  if (deviceDetector.isMobile) {
    clickToProceed.addEventListener("touchstart",goFromDtoE,{once:true});
  } else {
    clickToProceed.addEventListener("mousedown",goFromDtoE,{once:true});
    clickToProceed.classList.remove("addThisToAdjustPositionOnDesktops");
  }
  setTimeout(function () {  clickToProceed.classList.add("addThisToMakeItAppearFromTop");  },8000);
}

function goFromDtoE() {
  clearInterval(looping2); say3Natural.fade(1,0,1500); say3Slow.fade(1,0,1500);
  putTranslationIntoThisHelpAreaFromFileP.innerHTML = " ";
  loopingBackgroundMusic.fade(1,0,1500);
  setTimeout(function () { loopingBackgroundMusic.stop();  },1500);
  imgD.style.display = "none";
  imgE.style.display = "initial";
  videoSoundTrack.play();
  const v = 150;
  if(parent.detectedOS.name != "iOS" && parent.detectedOS.name != "Mac OS") {parent.navigator.vibrate([8,v,13,v,21,v,34,v,55,v,89,v,144,v,89,v,55,v,34,v,21,v,13,v,8]);}
  setTimeout(function () {  clickToProceed.classList.add("addThisToMakeItBlowAwayTowardsRight");  },100);
  setTimeout(function () {  putTranslationIntoThisHelpAreaFromFileP.innerHTML = textD; say4.play(); },11000);
  /* END OF ACTIVITY */
  /* GET READY TO EXIT THIS LESSON */
  setTimeout(function() {
    parent.preloadHandlingDiv.classList.remove("addThisClassToHideThePreloader");
    parent.preloadHandlingDiv.classList.add("addThisClassToRevealThePreloader");
  },16000); // 17500-1500 = 16000 See css_for_every_single_html
  setTimeout(function() {
    unloadTheSoundsOfThisLesson();
    unloadTheImagesOfThisLesson();
  },17400); // Also see js_for_all_iframed_lesson_htmls about unloadTheSoundsOfThisLesson() unloadTheImagesOfThisLesson()
  setTimeout(function () { self.location.href = "../../unit_7/lesson_1/index.html";  },17500);
}
