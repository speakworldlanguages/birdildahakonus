"use strict";
let whatTheAuthorHasToSay = " ";
let clonedButtons0, clonedButtons1;
let theSilentSpeechOfTheAuthor;
let windowLoadFiredAlready = false;

window.addEventListener('DOMContentLoaded', function(){
  clonedButtons0 = document.getElementsByClassName("goToNextLessonButton")[0];
  clonedButtons1 = document.getElementsByClassName("goToNextLessonButton")[1];
  if (needLatinFonts) {
    clonedButtons0.style.fontFamily = '"Oxanium SemiBold", sans-serif'; // Font loaded via js_for_every_single_html
    clonedButtons1.style.fontFamily = '"Oxanium SemiBold", sans-serif'; // Font loaded via js_for_every_single_html
  }
  if (needHitoicJapaneseFonts) {
    // The text is short: Don't need line break rules
  }

  const filePathForAuthorsMessage = "/user_interface/text/"+userInterfaceLanguage+"/1-2-notice_author_says.txt";
  const filePathForWhatToPutIntoTheButton = "/user_interface/text/"+userInterfaceLanguage+"/0lesson-continue_to_next.txt";
  fetch(filePathForAuthorsMessage,myHeaders).then(function(response){return response.text();}).then(function(contentOfTheTxtFile){
    whatTheAuthorHasToSay = contentOfTheTxtFile;
    if (windowLoadFiredAlready) { // This means window load couldn't fire startPrintingLetters() because fetch was still working to get the text.
      setTimeout(function () { startPrintingLetters(); }, 1500); // So it must be fired now. Now means the moment when fetch successfully got the text.
    }
  });

  fetch(filePathForWhatToPutIntoTheButton,myHeaders).then(function(response){return response.text();}).then(function(contentOfTheTxtFile){
    clonedButtons0.innerHTML = contentOfTheTxtFile;
    clonedButtons1.innerHTML = contentOfTheTxtFile;
  });

}, { once: true });

let bgmSound, hoverSound, clickSound;
window.addEventListener('load',checkIfAppIsPaused, { once: true });
function checkIfAppIsPaused() {
  if (parent.theAppIsPaused) { // See js_for_the_sliding_navigation_menu
    parent.pleaseAllowSound.play(); // Let the wandering user know that the lesson is now ready // See js_for_different_browsers_and_devices
    let unpauseDetector = setInterval(() => {    if (!parent.theAppIsPaused) { clearInterval(unpauseDetector); loadingIsCompleteFunction(); }    }, 500); // NEVER use a SuperInterval here!
  } else { loadingIsCompleteFunction(); }
}

function loadingIsCompleteFunction() {
  // --
  theSilentSpeechOfTheAuthor = document.querySelector('.speechBubble');
  if (userReadsLeftToRightOrRightToLeft == "rtl") { // js_for_every_single_html
    theSilentSpeechOfTheAuthor.classList.add("textAlignRight"); // css_for_every_single_html
  } else {
    theSilentSpeechOfTheAuthor.classList.add("textAlignLeft"); // css_for_every_single_html
  }
  // --
  // Find soundFileFormat in js_for_all_iframed_lesson_htmls
  bgmSound = new parent.Howl({ src: ["/user_interface/sounds/looping_bgm_stereo_therapy."+soundFileFormat], loop: true });
  bgmSound.once('load', function(){
    setTimeout(function () {   bgmSound.play(); bgmSound.fade(0,0.6,15000);   }, 4000);
    setTimeout(function () {   bgmSound.fade(0.6,0,15000);   }, 27000);
  });
  hoverSound = new parent.Howl({  src: ["/user_interface/sounds/authors_notice_next_button_hover."+soundFileFormat]  });
  clickSound = new parent.Howl({  src: ["/user_interface/sounds/authors_notice_next_button_click."+soundFileFormat]  });
  // --
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
  // --
  windowLoadFiredAlready = true;
  if (whatTheAuthorHasToSay.length>2) { // fetch() successfully got the text before window-load
    setTimeout(function () { startPrintingLetters(); }, 3500);
  } else { // fetch() could still be trying to get the text
    // In this case let fetch() fire startPrintingLetters() when it hopefully gets the text
  }
  // --
}


// ANIMATE TEXT
let letterCounter = 1;
function updateTheTextFunction() {
    let visibleText = whatTheAuthorHasToSay.substring(0, letterCounter); // CAUTION & WARNING: If fetch() is delayed because of slow network “whatTheAuthorHasToSay” could be UNDEFINED for a while!
    document.getElementById("putTheWordsInHereP").innerHTML = visibleText;
}
function startPrintingLetters() {
  let timer = setInterval(function(){
      updateTheTextFunction();
      if (letterCounter >= whatTheAuthorHasToSay.length) {
        clearInterval(timer);
        clonedButtons0.classList.add("revealButton");
        clonedButtons1.classList.add("revealButton");
      }
      letterCounter++;
  }, 45);
}
// END OF ANIMATE TEXT

function continueWithTheNextLesson(event) { event.preventDefault(); event.stopPropagation();
  bgmSound.stop(); clickSound.play();
  clonedButtons0.classList.remove("revealButton"); clonedButtons0.classList.remove("startHidden");
  clonedButtons1.classList.remove("revealButton"); clonedButtons1.classList.remove("startHidden");
  setTimeout(function () {
    clonedButtons0.classList.add("addThisToAButtonForPlayStationStyleClick");
    clonedButtons1.classList.add("addThisToAButtonForPlayStationStyleClick");
  }, 50);
  // It should be fine without SuperTimeouts as the next lesson will start paused even if user clicks PAUSE within 2900ms
  setTimeout(function () {
    showGlobyPreloaderBeforeExit(); // 1500ms » See js_for_all_iframed_lesson_htmls AND See css_for_preloader_and_orbiting_circles
    // REMEMBER: iframe.src change makes window.onbeforeunload fire in js_for_all_iframed_lesson_htmls.js which then calls unloadTheSoundsOfThisLesson();
    parent.pathOfWhatWillBeDisplayedUnlessInternetConnectivityIsLost = "/lessons_in_iframes/level_1/unit_3/lesson_1/index.html"; // See js_for_online_and_offline_modes
    // ---
    if (parent.internetConnectivityIsNiceAndUsable) { // See js_for_online_and_offline_modes.js
      setTimeout(function () {   parent.ayFreym.src = parent.pathOfWhatWillBeDisplayedUnlessInternetConnectivityIsLost;   }, 1500);
    } else { parent.console.warn("THE DEVICE IS OFFLINE (detected at the end of notice");
      const isCached = checkIfNextLessonIsCachedAndRedirectIfNot(131); // See js_for_all_iframed_lesson_htmls
      if (isCached) { parent.console.warn("WILL TRY TO CONTINUE OFFLINE");
        setTimeout(function() { parent.ayFreym.src = parent.pathOfWhatWillBeDisplayedUnlessInternetConnectivityIsLost; }, 1500);
      }
    }
  },1400); // Let the button disappear completely before preloader starts appearing
}

function unloadTheSoundsOfThisLesson() { // Standard function called by beforeunload in js_for_all_iframed_lesson_htmls
  bgmSound.unload();
  hoverSound.unload();
  // CANNOT unload click sound even if we do setTimeout(function () {  clickSound.unload();  }, 3000);
  // DOESN'T WORK EITHER: clickSound.on('end', function(){ clickSound.unload(); console.log("does clickSound.unload fire?"); });
  parent.unloadThatLastSoundWhichCannotBeUnloadedNormally(clickSound); // Exists in js_for_navigation_handling,,, unloads the sound after 5s
}
