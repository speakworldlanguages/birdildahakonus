"use strict";
let whatTheAuthorHasToSay = " ";
let clonedButtons0, clonedButtons1;
let speechMustStartImmediately = false;
let theSilentSpeechOfTheAuthor;

window.addEventListener('DOMContentLoaded', function(){
  clonedButtons0 = document.getElementsByTagName('SECTION')[0];
  clonedButtons1 = document.getElementsByTagName('SECTION')[1];

  const filePathForAuthorsMessage = "/user_interface/text/"+userInterfaceLanguage+"/1-1-notice_author_says.txt";
  const filePathForWhatToPutIntoTheButton = "/user_interface/text/"+userInterfaceLanguage+"/0-continue_to_next.txt";
  fetch(filePathForAuthorsMessage,myHeaders).then(function(response){return response.text();}).then(function(contentOfTheTxtFile){
    whatTheAuthorHasToSay = contentOfTheTxtFile;
    // ANIMATE TEXT
    let i = 1;
    function updateTheTextFunction() {
        let visibleText = whatTheAuthorHasToSay.substring(0, i); // CAUTION & WARNING: If fetch() is delayed because of slow network “whatTheAuthorHasToSay” could be UNDEFINED for a while!
        document.getElementById("putTheWordsInHereP").innerHTML = visibleText;
    }
    function startPrintingLetters() {
      let timer = setInterval(function(){
          updateTheTextFunction();
          if (i >= whatTheAuthorHasToSay.length) {
            clearInterval(timer);
            clonedButtons0.classList.add("revealButton");
            clonedButtons1.classList.add("revealButton");
          }
          i++;
      }, 60);
    }
    if (speechMustStartImmediately) {
      startPrintingLetters();
    } else {
      setTimeout(function () { startPrintingLetters(); }, 4000);
    }
  });

  fetch(filePathForWhatToPutIntoTheButton,myHeaders).then(function(response){return response.text();}).then(function(contentOfTheTxtFile){
    clonedButtons0.innerHTML = contentOfTheTxtFile;
    clonedButtons1.innerHTML = contentOfTheTxtFile;
  });

}, { once: true });

let bgmSound, hoverSound, clickSound;
window.addEventListener('load', function(){
  theSilentSpeechOfTheAuthor = document.querySelector('.speechBubble');
  if (userReadsLeftToRightOrRightToLeft == "rtl") { // js_for_every_single_html
    theSilentSpeechOfTheAuthor.classList.add("textAlignRight"); // css_for_every_single_html
  } else {
    theSilentSpeechOfTheAuthor.classList.add("textAlignLeft"); // css_for_every_single_html
  }

  bgmSound = new parent.Howl({ src: ["/user_interface/sounds/looping_bgm_stereo_therapy.webm"], loop: true });
  bgmSound.once('load', function(){
    setTimeout(function () {   bgmSound.play(); bgmSound.fade(0,0.6,15000);   }, 4000);
    setTimeout(function () {   bgmSound.fade(0.6,0,15000);   }, 27000);
  });
  hoverSound = new parent.Howl({  src: ["/user_interface/sounds/section_as_button_hover.webm"]  });
  clickSound = new parent.Howl({  src: ["/user_interface/sounds/section_as_button_click.webm"]  });

  if (deviceDetector.isMobile) {
    clonedButtons0.addEventListener("touchstart",function (event) { event.preventDefault(); event.stopPropagation(); hoverSound.play(); });
    clonedButtons1.addEventListener("touchstart",function (event) { event.preventDefault(); event.stopPropagation(); hoverSound.play(); });
    clonedButtons0.addEventListener("touchend",continueWithTheNextLesson,{once:true});
    clonedButtons1.addEventListener("touchend",continueWithTheNextLesson,{once:true});
  } else {
    clonedButtons0.addEventListener("mouseenter",function () { hoverSound.play(); });
    clonedButtons1.addEventListener("mouseenter",function () { hoverSound.play(); });
    clonedButtons0.addEventListener("mousedown",continueWithTheNextLesson,{once:true});
    clonedButtons1.addEventListener("mousedown",continueWithTheNextLesson,{once:true});
  }
  setTimeout(function () { speechMustStartImmediately = true; }, 4000);
}, { once: true });

function continueWithTheNextLesson(event) { event.preventDefault(); event.stopPropagation();
  bgmSound.stop(); clickSound.play();
  clonedButtons0.classList.remove("revealButton"); clonedButtons0.classList.remove("startHidden");
  clonedButtons1.classList.remove("revealButton"); clonedButtons1.classList.remove("startHidden");
  setTimeout(function () {
    clonedButtons0.classList.add("addThisToAButtonForPlayStationStyleClick");
    clonedButtons1.classList.add("addThisToAButtonForPlayStationStyleClick");
  }, 50);

  setTimeout(function () {
    showPreloaderBeforeExit(); // 1500ms » See js_for_all_iframed_lesson_htmls AND See css_for_preloader_and_orbiting_circles
    setTimeout(function () {   parent.ayFreym.src = "/lessons_in_iframes/level_1/unit_2/lesson_1/index.html";   }, 1500);
  },1400); // Let the button disappear completely before preloader starts appearing
}

function unloadTheSoundsOfThisLesson() { // Standard function called by beforeunload in js_for_all_iframed_lesson_htmls
  bgmSound.unload();
  hoverSound.unload();
  // CANNOT unload click sound even if we do setTimeout(function () {  clickSound.unload();  }, 3000);
  // DOESN'T WORK EITHER: clickSound.on('end', function(){ clickSound.unload(); console.log("does clickSound.unload fire?"); });
  parent.unloadThatLastSoundWhichCannotBeUnloadedNormally(clickSound); // Exists in js_for_app_initialization_in_parent,,, unloads the sound after 5s
}
