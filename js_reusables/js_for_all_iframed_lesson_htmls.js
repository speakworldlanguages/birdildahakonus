"use strict";
// CAREFUL! DEFER or NOT DEFER

// The following can be used to prompt the user to add the app to HOMESCREEN and/or get Push Notifications AS SOON AS he/she seems to be seriously using the app
/*
if (sessionStorage.iFrameLoadHasHappenedThisManyTimes) {  sessionStorage.iFrameLoadHasHappenedThisManyTimes = Number(sessionStorage.iFrameLoadHasHappenedThisManyTimes) + 1;  }
else {  sessionStorage.iFrameLoadHasHappenedThisManyTimes = 1;  } // CAN: Use modulus to repeat things every two or three times.

// REMEMBER: Store user's choice in localStorage if he/she accepts and never propmt again » If he/she rejects do not prompt until next session
*/

function lockOrientation() { // Better if this exists here and is not placed in js_for_every_single_html, yes or no? Probably yes.
  setTimeout(function () {
    if (screen.orientation) { // HOPEFULLY mobile user didn't exit fullscreen mode » TRY ANYHOW
      // Is mozilla.org WRONG? https://developer.mozilla.org/en-US/docs/Web/API/ScreenOrientation/lock
      // Is mozilla.org WRONG? https://developer.mozilla.org/en-US/docs/Web/API/Screen/orientation
      const lastOrientation = screen.orientation.type; // This works on Windows and Android » it returns a string
      parent.window.screen.orientation.lock(lastOrientation); // Works! // Unlocking is in js_for_all_iframed_lesson_htmls
      // console.log("lockOrientation fires correctly, no?"); // IT DOUBLE FIRES after window resize (see 1-1-4) is triggered BUT does not create a major problem
    } else {
      // Maybe transform rotate(90deg) scale(...) etc to imitate screen locking on Safari
    }
  }, 100); // Small delay as a safety measure
}

function showPreloaderBeforeExit() { // Call this at the end of every lesson
  parent.preloadHandlingDiv.classList.remove("addThisClassToHideThePreloader"); // 1500 ms » See css_for_preloader_and_orbiting_circles
  parent.preloadHandlingDiv.classList.add("addThisClassToRevealThePreloader"); // 1500 ms » See css_for_preloader_and_orbiting_circles
}

/**/
window.addEventListener('DOMContentLoaded', function(){
  function getConnection() {return navigator.connection || navigator.mozConnection || navigator.webkitConnection || navigator.msConnection;}
  var internet = getConnection();
  if(internet){ // Chrome, Edge, Opera, SamsungInternet » Check how fast the internet is now, thanks to the NetworkInformation API
    if(internet.downlink<0.5){ // Too slow,, Get ready to let the user know that Speech Recognition may not work
      if (sessionStorage.internetIsTooSlowNotificationHasBeenDisplayed) {
        // Do nothing. Connection is still slow but the user has already been notified.
      } else {
        // fetch txt in userInterfaceLanguage and display it with an alert box
        const filePathForHeyYourConnectionIsTooSlow = "/user_interface/text/"+userInterfaceLanguage+"/0-network_connection_too_slow.txt";
        fetch(filePathForHeyYourConnectionIsTooSlow,myHeaders).then(function(response){return response.text();}).then(function(contentOfTheTxtFile){
          alert(contentOfTheTxtFile); sessionStorage.internetIsTooSlowNotificationHasBeenDisplayed = "yes"; // Prevent all alerts from now on.
        });
      }
    }
  } else {  } // Firefox, Safari » No information about network speed ,,, NetworkInformation API is not supported

  const whereAreWe = window.location.pathname;
  if (whereAreWe.search("progress_chart") != -1) { parent.userIsOrWasJustViewing = "progress-chart"; } // See blank.html
  else if (whereAreWe.search("information") != -1) { parent.userIsOrWasJustViewing = "info-screen"; } // See blank.html
  else { parent.userIsOrWasJustViewing = "some-lesson"; } // See blank.html

}, { once: true });

/**/
window.onload = function() { // DANGER: Do not use window.onload anywhere else. Use addEventListener "load" instead in order to avoid overwriting.
  // Clear timeout for [would you like to wait or refresh] box
  // WORKS MOST OF THE TIME BUT occasionally it either doesn't fire or fire too soon. Try adding a small delay to solve that.
  // Try to make sure beforeunload from previous html doesn't get late and fire after the load event of this html
  setTimeout(function () { parent.stopTheTimerToSeeIfNextLessonLoadedFastEnough(); }, 1000); // A small delay: Try to fix beforeunload from previous lesson (probably) firing too late

  // Restart anti sleep timer
  if (deviceDetector.isMobile) {
    if ('wakeLock' in navigator) {  parent.tryToKeepTheScreenON();  } // See js_for_different_browsers_and_devices
  }
  // ---
  if (parent.topContainerDivOfTheSlidingNavMenuForMobiles) { // Check if it exists like this or use deviceDetector.isMobile
    parent.topContainerDivOfTheSlidingNavMenuForMobiles.style.visibility = "visible"; // In case it was hidden by inline script in /about/index.html
  }
  // --- DETECT WHAT IS BEING SHOWN THROUGH THE FRAME
  const whereAreWe = window.location.pathname;
  // progress_chart
  if (whereAreWe.search("progress_chart") != -1) { // This means we have landed on the progress_chart
    if (deviceDetector.isMobile) {
      setTimeout(function () { parent.handleMenuUpDownStateOnMobiles(); },500); // See js_for_the_sliding_navigation_menu
    }

    /* Handle NAV MENU - Remove PAUSE THE APP ceramic button */
    if (parent.containerDivOfTheNavigationMenu.contains(parent.clickToPauseTheAppDiv)) { // Used to be in progress.js
      parent.containerDivOfTheNavigationMenu.removeChild(parent.clickToPauseTheAppDiv); //
    }

  // information
  } else if (whereAreWe.search("information") != -1) { // information means author's photo and Good People's License
    if (deviceDetector.isMobile) {
      setTimeout(function () { parent.handleMenuUpDownStateOnMobiles(); },500); // See js_for_the_sliding_navigation_menu
    }
    // To handle native back button of browser what do we do?

    if (parent.containerDivOfTheNavigationMenu.contains(parent.clickToPauseTheAppDiv)) { // Used to be in progress.js
      parent.containerDivOfTheNavigationMenu.removeChild(parent.clickToPauseTheAppDiv); // Should we use display none instead???
    }
  } else { // We have landed on a lesson // REMEMBER: blank.html does not link to this js_for_all_iframed_lesson_htmls
    // It is better not to see the slidingNavMenu every time a new lesson is opened » so don't use parent.handleMenuUpDownStateOnMobiles();
    // Instead just hide the slidingNavMenu if it was visible (like when starting 1-1-1 bread)
    setTimeout(function () { parent.makeTheNavMenuGoDownOnMobiles("slow"); },1500); // See js_for_the_sliding_navigation_menu

    /* Handle NAV MENU - Add PAUSE THE APP ceramic button */
    setTimeout(afterATinyDelay,100); // So that it won't come before HOME button // NOTE: The number in we_are_working page must be greater than 100
    function afterATinyDelay() {
      // LET'S TRY HTML5 audio // if (!parent.isApple) { // Alert boxes on Safari mutes and unmutes sounds,,, so apple user's won't be able to use the pause feature
        if (!parent.containerDivOfTheNavigationMenu.contains(parent.clickToPauseTheAppDiv)) {
          parent.containerDivOfTheNavigationMenu.insertBefore(parent.clickToPauseTheAppDiv,parent.clickToFinanceDiv);
        }
      // LET'S TRY HTML5 audio // }
    }
  } // Progress from one lesson to the next with the rotating-globe-preloader of parent


  // What to do with window.load continued
  /* Handle NAV MENU - HOME OF PROGRESS ceramic button */
  if (!parent.containerDivOfTheNavigationMenu.contains(parent.clickToGoToMainMenuDiv)) { // If never existed in the beginning or perhaps was removed
    if (!parent.containerDivOfTheNavigationMenu.contains(parent.clickToGoToPreviousDiv)) { // If user is not coming directly from [Choose the language you want to learn] screen
      parent.containerDivOfTheNavigationMenu.insertBefore(parent.clickToGoToMainMenuDiv,parent.clickToFinanceDiv); // TESTED: Looks like it’s working.
    }
  }


  // Hide the preloader whenever a new lesson is ready to be shown through the iFrame
  parent.preloadHandlingDiv.classList.remove("addThisClassToRevealThePreloader"); // See css_for_the_container_parent_html
  parent.preloadHandlingDiv.classList.add("addThisClassToHideThePreloader"); // See css_for_the_container_parent_html

};



/* SAFETY MEASURE */
// CHECK IF ACCESS IS GOOD and block (or just fix) direct linking!
// MUST REVIEW if masked forwarding is implemented.
if (parent.thisIsTheParentWhichContainsAllIFramedLessons == "yes") {
  // This lesson html is inside its parent html as it is supposed to. That is good!
  // console.log("Safely parented!");
} else {
  // Someone is trying to access this lesson with a direct link. Must put it inside its parent html.
  alert("Redirecting to main...")
  // CONSIDER: Discontinue using reference to the root with "/" in case deep-iframing or domain masking causes a navigation problem.
  window.open("/","_top"); // Has been tested. It works.
  // RESULT: If one tries to open "https://myproject.github.io/forbidden/folder/index.html" this will force it to open "https://myproject.github.io/index.html"
}

// HANDLE PAGE UNLOAD IF THE BROWSER'S “BACK” BUTTON IS USED
// WARNING: onbeforeunload doesn't fire when src of the iframe changes nor does hashchange on mobile chrome (or are we misunderstanding something?)
window.onbeforeunload = function() {
  // parent.console.log("iframe onbeforeunload has been fired -> js_for_all_iframed_lesson_htmls");

  // CAUTION: THESE ARE MAINLY FOR THE CASE WHERE USER NAVIGATES AWAY FROM THE LESSON WITHOUT NEITHER SUCCESS NOR GIVEUPSKIP
  // (like using the HOME button to go to progress chart or browser's back button)
  // Turn OFF annyang if it was ON
  // ISSUE THAT NEEDS SERIOUS CARE: Safari doesn't allow mic permanently; it allows for only 1 listening session and prompts for permission everytime mic restarts
  if (parent.annyang) { // DO NOT OMIT! Firefox and other no-speech browsers need this "if (parent.annyang)" to let the app work without Web Speech API.
    // This is like a "making it double-safe" thing // stopListeningAndProceedToNext() already has parent.annyang.abort();
    if (parent.annyang.isListening()) {
      parent.annyang.removeCallback();
      parent.annyang.abort(); // OR // if (!parent.isApple) {  parent.annyang.abort();  }
    }
  }
  // Check if the functions exist in the lessons own js (like bread.js, water.js etc) before trying to call them.
  if (typeof stopAudioInputVisualization === "function") {
    stopAudioInputVisualization(); // Stop Wavesurfer and turn off the microphone. See js_for_microphone_input...
  }
  if (typeof unloadTheSoundsOfThisLesson === "function") {
    unloadTheSoundsOfThisLesson(); // Every time defined with a different list in the lesson. See the unique js file of each lesson.
  }

  // Unlock swipe menu in case it was locked
  parent.swipeNavMenuIsLocked = false; // As of September 2022 it's only locked by bigSlideTowardsLeft in information.js
  // Unlock screen orientation if it was locked
  if (screen.orientation) {
    parent.window.screen.orientation.unlock();
  }
  //---
  parent.startTheTimerToSeeIfNextLessonLoadsFastEnough(); // Also fires from openFirstLesson() in js_for_app_initialization_in_parent
};

/* See usage of ASIDE element as another type of button in js_for_handling_speech_give_up */
/* See usage of SECTION & ADDRESS elements as other types of buttons in js_for_proceed_buttons.js */
