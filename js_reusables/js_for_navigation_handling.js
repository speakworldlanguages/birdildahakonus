"use strict";
let userIsAwaySound;
let userIsBackSound;
// Code written by Manheart Earthman=B. A. Bilgekılınç Topraksoy=土本 智一勇夫剛志
// This file MAY NOT BE MODIFIED WITHOUT CONSENT i.e. OFFICIAL AUTHORIZATION
window.addEventListener('DOMContentLoaded', function(){ // NOTE: Do not access deviceDetector before DOMContentLoaded in js_for_different_browsers_and_devices
  // --
  // soundFileFormat exists in js_for_different_browsers_and_devices
  userIsAwaySound = new Howl({  src: ["/user_interface/sounds/user_is_away."+soundFileFormat]  }); // See js_for_different_browsers_and_devices
  userIsBackSound = new Howl({  src: ["/user_interface/sounds/user_is_back."+soundFileFormat]  }); // See js_for_different_browsers_and_devices

  // Handle lesson PAUSE with visibility change on mobile devices for return after tab navigation or when on/off button is pressed etc.
  // Use “var” (not “const”) for things that need to be accessible from elsewhere.

}, { once: true }); // END OF DOMContentLoaded

window.addEventListener('load', function(){

  // Note: Using alert() to pause the app when OFF button is pressed: 1-It breaks down Firefox Mobile 2-It mutes/unmutes Web Audio on Safari

  // Note: The following enables annyang to restart after a PAUSE when user has been AWAY or has turned off his mobile device's screen. Desktops don't need any handling for that.
  // Note: Annyang's behaviour is similar to the "visibilitychange" event. That is different from window "blur/focus" event. See https://stackoverflow.com/questions/58148482/document-visibilitychange-versus-window-blur-focus-what-is-the-difference-when/58148483#58148483

  if (deviceDetector.isMobile) { // NOTE: DOMContentLoaded is (or can be) too early for deviceDetector
    // ON MOBILES
    document.addEventListener("visibilitychange", handleVisibilityChangeOnMobilesFunction);
    function handleVisibilityChangeOnMobilesFunction()
    {
      if (document.visibilityState === 'hidden') { // document.hidden is historical??? https://developer.mozilla.org/en-US/docs/Web/API/Document/hidden
          // console.log("hidden means user is gone"); // This fires when ON-OFF button of the device is pressed.
          userIsAwaySound.play(); // It can't flood can it?
          const iFrameInTabNavigationHandling = document.getElementsByTagName('IFRAME')[0];
          const iFrameWindowInTabNavigationHandling = iFrameInTabNavigationHandling.contentWindow;
          if (!theAppIsPaused) { // See js_for_the_sliding_navigation_menu
            if (iFrameWindowInTabNavigationHandling.listOfAllTickingSuperTimers) { // This way we do not trigger pauseTheAppFunction when viewing the progress chart or information etc
              pauseTheAppFunction("becauseUserNavigatedAwayFromTheApp"); // See js_for_the_sliding_navigation_menu
            }
          }
      } else { // When mobile user navigates back to the app
          // NICE ENOUGH
          setTimeout(function() { userIsBackSound.play(); },130); // lag cannot be too long
          // console.log("visible means user is back");
          // IS THIS WRONG OR RIGHT?: Returning from AUTO-SLEEP DOES NOT MAKE THIS FIRE! - LATER DOUBT: really? (It is not like user pressing ON/OFF button twice)
          // AUTO-SLEEP is not counted as user being away according to document.hidden
          // This works only in case user presses ON/OFF button twice
          // MUST CHECK IF that is still the case with document.visibilityState === 'hidden' instead of document.hidden
          if ('wakeLock' in navigator) {  tryToKeepTheScreenON();  } // See js_for_different_browsers_and_devices
      }
    }
    // Using window blur focus to handle sounds DOES NOT WORK... Double-fires, misfires etc... No easy solution.
  } else {
    // ON DESKTOPS
    document.addEventListener("visibilitychange", handleVisibilityChangeOnDesktopsFunction);
    function handleVisibilityChangeOnDesktopsFunction()
    {
            if (document.visibilityState === 'hidden') {
                // console.log("hidden means user is gone");
                if (firstUserGestureHasUnleashedAudio) { userIsAwaySound.play(); }
                const iFrameInTabNavigationHandling = document.getElementsByTagName('IFRAME')[0];
                const iFrameWindowInTabNavigationHandling = iFrameInTabNavigationHandling.contentWindow;
                if (!theAppIsPaused) { // See js_for_the_sliding_navigation_menu
                  if (iFrameWindowInTabNavigationHandling.listOfAllTickingSuperTimers) { // This way we do not trigger pauseTheAppFunction when viewing the progress chart or information etc
                    pauseTheAppFunction("becauseUserNavigatedAwayFromTheApp"); // See js_for_the_sliding_navigation_menu
                  }
                }
            } else {
                // console.log("visible means user is back");
                if (firstUserGestureHasUnleashedAudio) { userIsBackSound.play(); }
            }
    }
  } // End of else
}, { once: true });


// ____________
var checkIfLoadingIsTakingTooLongTimeout = 0; // See openFirstLesson in js_for_the_parent_all_browsers_all_devices ALSO used by js_for_all_iframed_lesson_htmls -> onbeforeunload
let maybeYouShouldReloadBoxIsNowBeingDisplayed = false; // Not accessed from any other js file as of Oct 2022
// moved the declaration of itIsAlreadyCertainThatUserWantsToReload to inline in index.html
function startTheTimerToSeeIfNextLessonLoadsFastEnough() { // Called by either beforeunload in blank.html OR by onbeforeunload in js_for_all_iframed_lesson_htmls
  //console.log("window load timeout started ticking"); // Works OK
  checkIfLoadingIsTakingTooLongTimeout = setTimeout(function () {
    // Show the [Wait] or [Reload] box via js_for_info_boxes_in_parent
    createAndHandleMaybeYouShouldReloadBox(); // !!!!!!!!!!!!!!!! Must clear the timeout as soon as window-load happens in a lesson
    // !!!!!!!!!!!!!!!! Must clear the timeout and restart it MANUALLY where js_for_all_iframed_lesson_htmls is not included
    maybeYouShouldReloadBoxIsNowBeingDisplayed = true; // Will be set back to false by hideWouldYouLikeToRestartTheAppBox which fires in all 3 possible cases in js_for_info_boxes_in_parent
  }, 19500); // If new lesson doesn't load in 18~20 seconds the box will appear,,, compare it to the dialog element of pre-preloader that waits for 8 seconds
}
function stopTheTimerToSeeIfNextLessonLoadedFastEnough() { // See blank.html AND js_for_all_iframed_lesson_htmls AND about.js
  // Clear timeout for [would you like to wait or refresh] box
  if (checkIfLoadingIsTakingTooLongTimeout) {
    //console.log("trying to clear the timeout before it's too late"); // Tested: Works OK
    clearTimeout(checkIfLoadingIsTakingTooLongTimeout);
    checkIfLoadingIsTakingTooLongTimeout = 0;
  }
  // If it was too late and the box has been displayed but is no longer necessary because window did load after all, phew!
  if (maybeYouShouldReloadBoxIsNowBeingDisplayed) {
    maybeYouShouldReloadBoxIsNowBeingDisplayed = false; // This must be set to false immediately even though NEVER MIND msg will still be visible for about 2.5 seconds,,, why -> because this is the point of no return
    loadWasSuccessfulDespiteTakingTooLong(); // Display [never mind] and disappear » js_for_info_boxes_in_parent
  }
}


// __________
// UI sounds ... also see js_for_different_browsers_and_devices.js
function unloadThatLastSoundWhichCannotBeUnloadedNormally(passItToMe) { // Used by notice.js and also used in lessons where success-tone must ring beyond the end of lesson
  // Normally unloadTheSoundsOfThisLesson will do the job which fires with beforeunload in js_for_all_iframed_lesson_htmls
  // But in case the sound must play even after beforeunload
  setTimeout(function () {    passItToMe.unload();   }, 5000); // Cool! It works
}



/*___PREVENT IMMEDIATE NAVIGATION TO EMPTY BROWSER TAB___*/
// This makes Chrome show a default prompt: "Leave site? Changes that you made may not be saved [Cancel] [Leave]"
// ...which is better for UX
var isLeavingTheAppToViewFinancialThirdParty = false; // See information.js
window.addEventListener('beforeunload', (event) => { // See » https://stackoverflow.com/questions/821011/prevent-a-webpage-from-navigating-away-using-javascript
  if (itIsAlreadyCertainThatUserWantsToReload || isLeavingTheAppToViewFinancialThirdParty) { // See index.html and js_for_info_boxes_in_parent
    // Proceed normally
  } else {
    // Cancel the event as stated by the standard.
    event.preventDefault();
    // Chrome requires returnValue to be set.
    event.returnValue = '';
  }
});
