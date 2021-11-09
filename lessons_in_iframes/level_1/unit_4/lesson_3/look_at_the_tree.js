// All settings here will depend on the content of the lesson
// See js_for_every_single_html.js for userInterfaceLanguage
const filePathA = "../../../../user_interface/text/"+userInterfaceLanguage+"/1-4-3a.txt";
const filePathB = "../../../../user_interface/text/"+userInterfaceLanguage+"/1-4-3b.txt";
const filePathC = "../../../../user_interface/text/"+userInterfaceLanguage+"/1-4-3c.txt";
const filePathD = "../../../../user_interface/text/"+userInterfaceLanguage+"/1-4-3d.txt";
const filePathE = "../../../../user_interface/text/"+userInterfaceLanguage+"/1-4-3e.txt";
let textA; // Warning. Returns UNDEFINED before fetch() actually gets the file.
let textB;
let textC;
let textD;
let textE;
fetch(filePathA,myHeaders).then(function(response){return response.text();}).then(function(contentOfTheTxtFile){ textA = contentOfTheTxtFile; putTranslationIntoThisHelpAreaFromFileP.innerHTML = textA; });
fetch(filePathB,myHeaders).then(function(response){return response.text();}).then(function(contentOfTheTxtFile){ textB = contentOfTheTxtFile; });
fetch(filePathC,myHeaders).then(function(response){return response.text();}).then(function(contentOfTheTxtFile){ textC = contentOfTheTxtFile; });
fetch(filePathD,myHeaders).then(function(response){return response.text();}).then(function(contentOfTheTxtFile){ textD = contentOfTheTxtFile; });
fetch(filePathE,myHeaders).then(function(response){return response.text();}).then(function(contentOfTheTxtFile){ textE = contentOfTheTxtFile; });

/* ___AUDIO ELEMENTS___ */
let say1Path = "audio_files_for_listening/"+parent.theLanguageUserIsLearningNowToSetFilePaths+"/level_1/unit_4/lesson_3/look.mp3";
if (parent.theLanguageUserIsLearningNowToSetFilePaths=="ar" && parent.genderOfTheUser=="female") { say1Path = say1Path.split(".")[0] + "_female.mp3"; }
const say1 = new parent.Howl({  src: [say1Path]  });
let say2Path = "audio_files_for_listening/"+parent.theLanguageUserIsLearningNowToSetFilePaths+"/level_1/unit_4/lesson_3/look_at_the_tree.mp3";
if (parent.theLanguageUserIsLearningNowToSetFilePaths=="ar" && parent.genderOfTheUser=="female") { say2Path = say2Path.split(".")[0] + "_female.mp3"; }
const say2 = new parent.Howl({  src: [say2Path]  });
let say3Path = "audio_files_for_listening/"+parent.theLanguageUserIsLearningNowToSetFilePaths+"/level_1/unit_4/lesson_3/look_at_the_tree_slow.mp3";
if (parent.theLanguageUserIsLearningNowToSetFilePaths=="ar" && parent.genderOfTheUser=="female") { say3Path = say3Path.split(".")[0] + "_female.mp3"; }
const say3 = new parent.Howl({  src: [say3Path]  });
const say4Path = "audio_files_for_listening/"+parent.theLanguageUserIsLearningNowToSetFilePaths+"/level_1/unit_4/lesson_3/there_is_a_bird.mp3";
const say4 = new parent.Howl({  src: [say4Path]  });
const say5Path = "audio_files_for_listening/"+parent.theLanguageUserIsLearningNowToSetFilePaths+"/level_1/unit_4/lesson_3/there_is_a_bird_in_the_tree.mp3";
const say5 = new parent.Howl({  src: [say5Path]  });
const say6Path = "audio_files_for_listening/"+parent.theLanguageUserIsLearningNowToSetFilePaths+"/level_1/unit_4/lesson_3/there_is_a_bird_in_the_tree_slow.mp3";
const say6 = new parent.Howl({  src: [say6Path]  });
let say7Path = "audio_files_for_listening/"+parent.theLanguageUserIsLearningNowToSetFilePaths+"/level_1/unit_4/lesson_3/listen.mp3";
if (parent.theLanguageUserIsLearningNowToSetFilePaths=="ar" && parent.genderOfTheUser=="female") { say7Path = say7Path.split(".")[0] + "_female.mp3"; }
const say7 = new parent.Howl({  src: [say7Path]  });
let say8Path = "audio_files_for_listening/"+parent.theLanguageUserIsLearningNowToSetFilePaths+"/level_1/unit_4/lesson_3/listen_to_the_bird.mp3";
if (parent.theLanguageUserIsLearningNowToSetFilePaths=="ar" && parent.genderOfTheUser=="female") { say8Path = say8Path.split(".")[0] + "_female.mp3"; }
const say8 = new parent.Howl({  src: [say8Path]  });
let say9Path = "audio_files_for_listening/"+parent.theLanguageUserIsLearningNowToSetFilePaths+"/level_1/unit_4/lesson_3/listen_to_the_bird_slow.mp3";
if (parent.theLanguageUserIsLearningNowToSetFilePaths=="ar" && parent.genderOfTheUser=="female") { say9Path = say9Path.split(".")[0] + "_female.mp3"; }
const say9 = new parent.Howl({  src: [say9Path]  });

const clickTone1 = new parent.Howl({  src: ['lessons_in_iframes/level_1/unit_4/lesson_3/click_on_tree.mp3'] });
const clickTone2 = new parent.Howl({  src: ['lessons_in_iframes/level_1/unit_4/lesson_3/bird_tweet_tweet.mp3'] });
const videoSoundTrack = new parent.Howl({  src: ['lessons_in_iframes/level_1/unit_4/lesson_3/state_g_soundtrack.mp3'] });
function unloadTheSoundsOfThisLesson() { // Call this as the last thing before leaving.
  videoSoundTrack.unload();
  clickTone2.unload();
  clickTone1.unload();
  say9.unload();
  say8.unload();
  say7.unload();
  say6.unload();
  say5.unload();
  say4.unload();
  say3.unload();
  say2.unload();
  say1.unload();
}

/* ___VISUAL ELEMENTS___ */
const imgA = document.getElementById("imageA");
const layerOverImgA = document.getElementById("layerOverImageA");
const imgB = document.getElementById("imageB");
const imgC = document.getElementById("imageC");
const imgD = document.getElementById("imageD");
const imgE = document.getElementById("imageE");
const imgF = document.getElementById("imageF");
const imgG = document.getElementById("imageG");
const layerOverImgG = document.getElementById("layerOverImageG");
const imgBackground1 = document.getElementById("background1");
const imgBackground2 = document.getElementById("background2");

const clickableArea1 = document.getElementById("idOfTheLittleInvisibleClickableDiv1");
const clickableArea2 = document.getElementById("idOfTheLittleInvisibleClickableDiv2");
const clickableArea3 = document.getElementById("idOfTheLittleInvisibleClickableDiv3");

function unloadTheImagesOfThisLesson() { // Call this as the last thing before leaving.
  imgA.src = onePixelTransparentGif;
  layerOverImgA.src = onePixelTransparentGif;
  imgB.src = onePixelTransparentGif;
  imgC.src = onePixelTransparentGif;
  imgD.src = onePixelTransparentGif;
  imgE.src = onePixelTransparentGif;
  imgF.src = onePixelTransparentGif;
  imgG.src = onePixelTransparentGif;
  layerOverImgG.src = onePixelTransparentGif;
  imgBackground1.src = onePixelTransparentGif;
  imgBackground2.src = onePixelTransparentGif;
}

// ALWAYS: Use window load to be safe with timing.
window.addEventListener('load', function(){  loadingIsCompleteFunction();  }, { once: true });
var looping1;
let counter1 = 1;
function loadingIsCompleteFunction()
{
  // Display notifications if there are any.
  startTheLesson();
}

function startTheLesson()
{
  // No need to sync. The timing must just feel nice enough.
  looping1 = setInterval(loopFunction1,20000*((parent.speedAdjustmentCoefficient + 1)/2));
  function loopFunction1() {
    setTimeout(function () {  say1.play();  },5000*((parent.speedAdjustmentCoefficient + 1)/2));
    setTimeout(function () {  say2.play();  },9000*((parent.speedAdjustmentCoefficient + 1)/2));
    setTimeout(function () {  say3.play();  },15000*((parent.speedAdjustmentCoefficient + 1)/2));
    if (counter1 == 3) {  clearInterval(looping1);  }
    counter1++;
  }
  loopFunction1();
  // Add clickability!
  setTimeout(function () {
      // touchstart is the equivalent of mousedown for mobile
      if (deviceDetector.isMobile) {
        clickableArea1.addEventListener("touchstart",goFromAtoB,{once:true});
      } else {
        clickableArea1.addEventListener("mousedown",goFromAtoB,{once:true});
      }
   },5000);
}

function goFromAtoB()
{
  clearInterval(looping1); say1.fade(1,0,1500); say2.fade(1,0,1500); say3.fade(1,0,1500);
  clickableArea1.style.display = "none"; // NOTICE: Yes, these divs are already invisible yet we still have to add/remove them because when they overlap the lower z-indexed ones are blocked and user can't click.
  clickTone1.play();
  if(parent.detectedOS.name != "iOS" && parent.detectedOS.name != "Mac OS") {parent.navigator.vibrate([17,40,15,40,13]);}
  imgA.style.display = "none";
  layerOverImgA.style.display = "none";
  imgB.style.display = "initial";
  setTimeout(function () {  goFromBtoC();  },2100); // IMPORTANT! Timing must be accurate.
}

function goFromBtoC() {
  imgBackground1.style.display = "none";
  imgBackground2.style.display = "initial";
  imgB.style.display = "none";
  imgC.style.display = "initial";
  setTimeout(function () {  goFromCtoD();  },2000); // IMPORTANT! Timing must be accurate.
}
var looping2;
let counter2 = 1;
function goFromCtoD() {
  setTimeout(function () {   putTranslationIntoThisHelpAreaFromFileP.innerHTML = textB;   },2500);
  setTimeout(function () {   putTranslationIntoThisHelpAreaFromFileP.innerHTML = textC;   },7500);
  imgC.style.display = "none";
  imgD.style.display = "initial";
  // Loop 2
  looping2 = setInterval(loopFunction2,20000*((parent.speedAdjustmentCoefficient + 1)/2));
  function loopFunction2() {
    setTimeout(function () {  say4.play();  },5000*((parent.speedAdjustmentCoefficient + 1)/2));
    setTimeout(function () {  say5.play();  },9000*((parent.speedAdjustmentCoefficient + 1)/2));
    setTimeout(function () {  say6.play();  },15000*((parent.speedAdjustmentCoefficient + 1)/2));
    if (counter2 == 3) {  clearInterval(looping2);  }
    counter2++;
  }
  loopFunction2();

  // Add clickability!
  clickableArea2.style.display = "initial"; // NOTICE: Yes, these divs are already invisible yet we still have to add/remove them because when they overlap the lower z-indexed ones are blocked and user can't click.
  setTimeout(function () {
      // touchstart is the equivalent of mousedown for mobile
      if (deviceDetector.isMobile) {
        clickableArea2.addEventListener("touchstart",goFromDtoE,{once:true});
      } else {
        clickableArea2.addEventListener("mousedown",goFromDtoE,{once:true});
      }
   },5000);
}

function goFromDtoE() {
  clearInterval(looping2); say4.fade(1,0,1500); say5.fade(1,0,1500); say6.fade(1,0,1500);
  clickableArea2.style.display = "none"; // NOTICE: Yes, these divs are already invisible yet we still have to add/remove them because when they overlap the lower z-indexed ones are blocked and user can't click.
  clickTone2.play();
  imgD.style.display = "none";
  imgE.style.display = "initial";
  setTimeout(function () {  goFromEtoF();  },3000); // IMPORTANT! Timing must be accurate.
}
var looping3;
let counter3 = 1;
function goFromEtoF() {
  setTimeout(function () {  putTranslationIntoThisHelpAreaFromFileP.innerHTML = textD;  },4000);
  setTimeout(function () {  putTranslationIntoThisHelpAreaFromFileP.innerHTML = textE;  },8500);
  imgE.style.display = "none";
  imgF.style.display = "initial";
  // Loop 3
  looping3 = setInterval(loopFunction3,20000*((parent.speedAdjustmentCoefficient + 1)/2));
  function loopFunction3() {
    setTimeout(function () {  say7.play();  },5000*((parent.speedAdjustmentCoefficient + 1)/2));
    setTimeout(function () {  say8.play();  },9000*((parent.speedAdjustmentCoefficient + 1)/2));
    setTimeout(function () {  say9.play();  },15000*((parent.speedAdjustmentCoefficient + 1)/2));
    if (counter3 == 3) {  clearInterval(looping3);  }
    counter3++;
  }
  loopFunction3();

  // Add clickability!
  setTimeout(function () {
      // touchstart is the equivalent of mousedown for mobile
      clickableArea3.style.display = "initial"; // NOTICE: Yes, these divs are already invisible yet we still have to add/remove them because when they overlap the lower z-indexed ones are blocked and user can't click.
      if (deviceDetector.isMobile) {
        clickableArea3.addEventListener("touchstart",goFromFtoG,{once:true});
      } else {
        clickableArea3.addEventListener("mousedown",goFromFtoG,{once:true});
      }
   },5000);
}

function goFromFtoG() {
  clearInterval(looping3); say7.fade(1,0,1500); say8.fade(1,0,1500); say9.fade(1,0,1500);
  imgBackground2.style.display = "none";
  imgBackground1.style.display = "initial";
  imgF.style.display = "none";
  imgG.style.display = "initial";
  putTranslationIntoThisHelpAreaFromFileP.innerHTML = " ";
  layerOverImgG.style.display = "initial";
  videoSoundTrack.play();
  setTimeout(function () { if(parent.detectedOS.name != "iOS" && parent.detectedOS.name != "Mac OS") {parent.navigator.vibrate([19,333,16,333,13,333,10,333,7]);} },16500);  // Exact number of milliseconds from webp
  /* END OF ACTIVITY */
  /* GET READY TO EXIT THIS LESSON */
  setTimeout(function() {
    parent.preloadHandlingDiv.classList.remove("addThisClassToHideThePreloader");
    parent.preloadHandlingDiv.classList.add("addThisClassToRevealThePreloader");
  },20000); // 21500-1500 = 20000 See css_for_every_single_html
  setTimeout(function() {
    unloadTheSoundsOfThisLesson();
    unloadTheImagesOfThisLesson();
  },21400); // Also see js_for_all_iframed_lesson_htmls about unloadTheSoundsOfThisLesson() unloadTheImagesOfThisLesson()
  setTimeout(function () { self.location.href = "../../unit_5/lesson_1/index.html";  },21500);
}
