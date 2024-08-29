"use strict";
// Code written by Manheart Earthman=B. A. Bilgekılınç Topraksoy=土本 智一勇夫剛志
// This file MAY NOT BE MODIFIED WITHOUT CONSENT i.e. OFFICIAL AUTHORIZATION

// NOTE THAT: THERE ARE 2 EXCEPTIONS where js_for_all_iframed_lesson_htmls is not used: blank.html & user_interface/screens/??/you_are_offline.html

if (parent.langCodeForTeachingFilePaths) {
  if (parent.langCodeForTeachingFilePaths.substring(0,2)=="tr") { // See js_for_the_parent_all_browsers_all_devices
    myHeaders.append('Content-Type','text/plain; charset=iso-8859-9'); // See js_for_every_single_html
    // NOT CERTAIN IF NECESSARY: By using set() rather than append() we could make sure that previous values get overwritten instead of creating a duplicate
    // ALSO NOT CERTAIN IF that would overwrite some default Content-Type which then would break something
  }
}

// DETECT USAGE OF native android back button or browser's back button
if (window.location.href == parent.ayFreym.src) {
  //console.log("EXPECTED NORMAL NAVIGATION");
} else {
  console.log("POSSIBLE USE OF BROWSER BUTTONS\nframe src will be updated to prevent navigation errors");
  parent.ayFreym.src = window.location.href;
}

// ___ THESE SHOULD BE OK WITHOUT window load or DOMContentLoaded
// See js_for_different_browsers_and_devices
var deviceDetector = parent.deviceDetector;
var isApple = parent.isApple;
var isSafari = parent.isSafari;
var isAndroid = parent.isAndroid;
var isWebViewOnAndroid = parent.isWebViewOnAndroid; // Even though it is never used as of August 2023
var isFirefox = parent.isFirefox;
// CAREFUL: All webm sounds shall change into mp3 on Apple. Make sure webm videos are excluded from change mapping.
var soundFileFormat = parent.soundFileFormat; // See js_for_different_browsers_and_devices
// GET FROM PARENT INSTEAD: if (isApple) {  soundFileFormat = "mp3";  } else {  soundFileFormat = "webm";  }

// DISABLE ALL LONG-TOUCH-MENUs on mobiles
// NOTE THAT: window.oncontextmenu IS NO GOOD - BECAUSE IT TRIGGERS AN ANNOYING VIBRATION everytime a long touch happens USE-pointer events none carefully or prevent default for touchstart
if (deviceDetector.isMobile) { // Let's allow bubbling by omitting event.stopPropagation();
  window.ontouchstart = function(event) {     event.preventDefault();     return false;    }; // It looks like this is working...
} else { } // We need the right click menu on desktops » it opens the [start-fullscreen-mode] box

// ---
let hideCursorTimeout = null;
// Used by lesson [114 take bread] and [132 there is a fish]
function hideTheCursorAndHandleAutoUnhideAutoHide() { // Must improve this in case it needs to be cancellable
  hideTheCursor(); //console.log("Will auto-hide the cursor when idle for 3 seconds");
  function hideTheCursor() { // As soon as or shortly after pronunciation-teacher-box is closed
    main.classList.remove("defaultCursor"); main.classList.add("noCursor"); // Hide the cursor
    setTimeout(function () { main.classList.remove("defaultCursor"); main.classList.add("noCursor"); }, 75); // Double-checking could be necessary
    setTimeout(function () { document.addEventListener("mousemove",showTheCursor,{once:true}); }, 100);
  }
  function showTheCursor() {
    document.removeEventListener("mousemove",showTheCursor); // Even though once is true
    setTimeout(function () { main.classList.remove("noCursor"); main.classList.add("defaultCursor"); }, 100); // Show the cursor not immediately but quickly
    hideCursorTimeout = setTimeout(function () { hideTheCursor(); }, 3000); // Whenever cursor is showing wait 3 seconds and hide again if no movement happens
    document.addEventListener("mousemove",mouseHasMoved,{once:true}); // If movement does happen reset the timer
    function mouseHasMoved() { clearTimeout(hideCursorTimeout); hideCursorTimeout = setTimeout(function () { hideTheCursor(); }, 3000); }
  }
}

// The following can be used to prompt the user to add the app to HOMESCREEN and/or get Push Notifications AS SOON AS he/she seems to be seriously using the app
/*
if (sessionStorage.iFrameLoadHasHappenedThisManyTimes) {  sessionStorage.iFrameLoadHasHappenedThisManyTimes = Number(sessionStorage.iFrameLoadHasHappenedThisManyTimes) + 1;  }
else {  sessionStorage.iFrameLoadHasHappenedThisManyTimes = 1;  } // CAN: Use modulus to repeat things every two or three times.

// REMEMBER: Store user's choice in localStorage if he/she accepts and never propmt again » If he/she rejects do not prompt until next session
*/

// According to https://stackoverflow.com/questions/76208581/ios-safari-screen-orientation-lock-is-not-working
// Safari 16.4 supports ScreenOrientation.type, ScreenOrientation.angle, and ScreenOrientation.onchange
// but lock() is still not supported on iOS
var screenOrientationCanBeLocked;
// MUST: Experiment with the possible use of transform rotate(90deg) scale(...) etc to imitate screen locking on Safari
if (typeof screen.orientation.lock === "function") { screenOrientationCanBeLocked = true; }
else { screenOrientationCanBeLocked = false; }
// ---
function lockOrientation() { // Better if this exists here and is not placed in js_for_every_single_html, yes or no? Probably yes.
  setTimeout(function () {
    if (screenOrientationCanBeLocked) { // HOPEFULLY mobile user didn't exit fullscreen mode » TRY ANYHOW
      // setTimeout(function () {  alert("screen.orientation.lock exists");  }, 500); // TESTING - Fires OK
      // Is mozilla.org WRONG? https://developer.mozilla.org/en-US/docs/Web/API/ScreenOrientation/lock
      // Is mozilla.org WRONG? https://developer.mozilla.org/en-US/docs/Web/API/Screen/orientation
      const currentOrientation = screen.orientation.type; // This works on Windows and Android » it returns a string
      parent.window.screen.orientation.lock(currentOrientation); // Works! // Unlocking is in js_for_all_iframed_lesson_htmls
      // console.log("lockOrientation fires correctly, no?"); // IT DOUBLE FIRES after window resize (see 1-1-4) is triggered BUT does not create a major problem
    } else {    }
  }, 100); // Small delay as a safety measure
}

function showGlobyPreloaderBeforeExit() { // Call this at the end of every lesson » Must fire 1500ms before changing parent.ayFreym.src
  // No need for if contains
  parent.preloadHandlingDiv.classList.remove("addThisClassToHideThePreloader"); // 1500 ms » See css_for_preloader_and_orbiting_circles
  parent.preloadHandlingDiv.classList.add("addThisClassToRevealThePreloader"); // 1500 ms » See css_for_preloader_and_orbiting_circles
}

// See js_for_info_boxes_in_parent to find slowNetworkWarningText
// DEPRECATE: let slowNetworkWarningMustBeDisplayedASAP = false;
// ---
window.addEventListener('DOMContentLoaded', function(){

  function getConnection() {return navigator.connection || navigator.mozConnection || navigator.webkitConnection || navigator.msConnection;}
  var internet = getConnection();
  if(internet){ // Chrome, Edge, Opera, SamsungInternet » Check how fast the internet is now, thanks to the NetworkInformation API
    if(internet.downlink<0.5){ // Too slow,, Get ready to let the user know that Speech Recognition may not work
      if (sessionStorage.internetIsTooSlowNotificationHasBeenDisplayed) {
        // Do nothing. Connection is still slow but the user has already been notified.
      } else {
        // See js_for_info_boxes_in_parent to find how the text is loaded at parent level
        // DEPRECATE: slowNetworkWarningMustBeDisplayedASAP = true;
        if (parent.internetConnectivityIsNiceAndUsable) { // Internet connection actually exists
          warnUserAboutSlowNetwork(); // Works OK. It's nice to have it handled with a simple notification even though for most of the world it should rarely happen.
        }
      }
    }
  } else {  } // Firefox, Safari » No information about network speed ,,, NetworkInformation API is not supported

  // For navigation handling » Second measure: see if native Android BACK button or browser's BACK button was used » See blank.html
  // See above code to find how iframe.src is checked against window.location.href
  const whereAreWe = window.location.pathname;
  if (whereAreWe.search("progress_chart") != -1) { parent.userIsOrWasJustViewing = "progress-chart"; } // See blank.html
  else if (whereAreWe.search("information") != -1) { parent.userIsOrWasJustViewing = "info-screen"; } // See blank.html
  else { parent.userIsOrWasJustViewing = "some-lesson"; } // See blank.html

}, { once: true }); // END OF DOMContentLoaded
// ___
function warnUserAboutSlowNetwork() { // Before April 2024 this used to be called from lessons. In April 2024 createAndHandleInternetConnectivityIsLostBox undertook the handling of total disconnection. See js_for_info_boxes_in_parent and js_for_speech_recognition_algorithm
  alert(parent.slowNetworkWarningText); sessionStorage.internetIsTooSlowNotificationHasBeenDisplayed = "yes"; // Prevent all alerts from now on.
}
// ___
window.onload = function() { // DANGER: Do not use window.onload anywhere else. Use addEventListener "load" instead in order to avoid overwriting.
  // Clear timeout for [would you like to wait or refresh] box
  // WORKS MOST OF THE TIME BUT occasionally it either doesn't fire or fire too soon. Try adding a small delay to solve that.
  // Try to make sure beforeunload from previous html doesn't get late and fire after the load event of this html
  // THERE ARE 2 EXCEPTIONS where js_for_all_iframed_lesson_htmls is not used: blank.html & user_interface/screens/??/you_are_offline.html
  // See js_for_navigation_handling
  setTimeout(function () { parent.stopTheTimerToSeeIfNextLessonLoadedFastEnough(); }, 1000); // A small delay: Try to fix beforeunload from previous lesson (probably) firing too late

  // Restart anti sleep timer
  if (deviceDetector.isMobile) {
    if ('wakeLock' in navigator) {  parent.tryToPreventScreenSleep();  } // See js_for_different_browsers_and_devices
  }
  // ---
  if (parent.topContainerDivOfTheSlidingNavMenuForMobiles) { // Check if it exists like this or use deviceDetector.isMobile
    parent.topContainerDivOfTheSlidingNavMenuForMobiles.style.visibility = "visible"; // In case it was hidden by a lesson script » Like 1-1-4 take bread
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
  } else if (whereAreWe.search("notice") != -1) { // notice means author's silent speech in a speech bubble
    if (deviceDetector.isMobile) {
      setTimeout(function () { parent.handleMenuUpDownStateOnMobiles(); },500); // See js_for_the_sliding_navigation_menu
    }
    // To handle the native back button of browser what do we do?

    if (parent.containerDivOfTheNavigationMenu.contains(parent.clickToPauseTheAppDiv)) { // Used to be in progress.js
      parent.containerDivOfTheNavigationMenu.removeChild(parent.clickToPauseTheAppDiv); // Should we use display none instead???
    }
  } else if (whereAreWe.search("about") != -1) { // notice means author's silent speech in a speech bubble
    if (deviceDetector.isMobile) {
      setTimeout(function () { parent.handleMenuUpDownStateOnMobiles(); },500); // See js_for_the_sliding_navigation_menu
    }
    // To handle the native back button of browser what do we do?

    if (parent.containerDivOfTheNavigationMenu.contains(parent.clickToPauseTheAppDiv)) { // Used to be in progress.js
      parent.containerDivOfTheNavigationMenu.removeChild(parent.clickToPauseTheAppDiv); // Should we use display none instead???
    }
  } else { // We have landed on a lesson // REMEMBER: blank.html does not link to this js_for_all_iframed_lesson_htmls
    // It is better not to see the slidingNavMenu every time a new lesson is opened » so don't use parent.handleMenuUpDownStateOnMobiles();
    // Instead just hide the slidingNavMenu if it was visible (like when starting 1-1-1)
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
  // DO NOT USE!!! if (parent.preloadHandlingDiv.classList.contains("addThisClassToRevealThePreloader")) {}
  // addThisClassToRevealThePreloader is expected to be added at the end of each lessons js file via showGlobyPreloaderBeforeExit()
  // As for you_are_offline.html » the following two lines are (or must be) copied into all of them
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
window.addEventListener('beforeunload', function () {
  // parent.console.log("iframe onbeforeunload has been fired -> js_for_all_iframed_lesson_htmls");

  // CAUTION: THESE ARE MAINLY FOR THE CASE WHERE USER NAVIGATES AWAY FROM THE LESSON WITHOUT NEITHER SUCCESS NOR GIVEUPSKIP
  // (like using the HOME button to go to progress chart or browser's back button)
  // Turn OFF SpeechRecognition if it was ON
  // ISSUE THAT NEEDS SERIOUS CARE: Safari doesn't allow mic permanently; it allows for only 1 listening session and prompts for permission everytime mic restarts
  if (parent.annyang) { // DO NOT OMIT! Firefox and other no-speech browsers need this "if (parent.annyang)" to let the app work without Web Speech API.
    // This is like a "making it double-safe" thing // stopListeningAndProceedToNext() already has parent.annyang.abort();

    // NOTE THAT User may want to navigate from a lesson to the progress_chart in the middle of a SpeechRecognition session
    // Here we can attempt ending the session so that the mic will be turned off (and Android won't DING) as user views progress_chart
    // REMEMBER: annyang continuously turns SpeechRecognition back on everytime it is timed out by the browser and turned off » this causes a problem
    // PROBLEM: annyang.isListening will misreturn false between "onend" and "onstart" where it should theoretically return true
    // WE TRY to remedy that by setting a setInterval inspection in progress/index.html » TESTED: Looks good
    if (parent.annyang.isListening()) { // CHECK! progress/index.html
      parent.console.warn("__SpeechRecognition was still listening as the frame window got unloaded!__\n---");
      parent.annyang.removeCallback();
      parent.annyang.abort(); // Better if we tell or let Safari user figure out how to "permanently allow mic"
    }
  }
  // Check if the functions exist in the lessons own js (like bread.js, water.js etc) before trying to call them.
  if (typeof stopStandardAudioInputVisualization === "function") {
    stopStandardAudioInputVisualization(); // Stop AUDIOMETER and turn off the microphone. See js_for_microphone_input...
  }
  /* CANCEL
  if (typeof stopUniqueAudioInputVisualization === "function") {
    stopUniqueAudioInputVisualization(); // Stop AUDIOMETER and turn off the microphone. See js_for_microphone_input...
  }
  */
  if (typeof unloadTheSoundsOfThisLesson === "function") {
    unloadTheSoundsOfThisLesson(); // Every time defined with a different list in the lesson. See the unique js file of each lesson.
    // Note: Standardized SECTION button and ADDRESS button sounds get unloaded via js_for_proceed_buttons
  }

  // Unlock swipe menu in case it was locked
  parent.swipeNavMenuIsLocked = false; // As of September 2022 it's only locked by bigSlideTowardsLeft in information.js
  // Unlock screen orientation if it was locked
  if (screenOrientationCanBeLocked) { // This means it can also be unlocked
    parent.window.screen.orientation.unlock();
  }
  // --- IN CASE USER IS A HASTY NAVIGATOR: We must prevent double firing. Example: User navigates to some index.html and immediately returns before window.load can clear the timeout
  if (parent.checkIfLoadingIsTakingTooLongTimeout) { // If it was already ticking
    // See js_for_navigation_handling
    parent.stopTheTimerToSeeIfNextLessonLoadedFastEnough(); // stop it so that we can restart it
  }
  // --- Start the load timer only if user's device is currently ONLINE
  if (parent.internetConnectivityIsNiceAndUsable) { // See js_for_online_and_offline_modes.js
    // See js_for_navigation_handling
    parent.startTheTimerToSeeIfNextLessonLoadsFastEnough(); // Also fires via openFirstLesson() which is located in js_for_the_parent_all_browsers_all_devices
  }
}); // End of BEFOREUNLOAD


// ________
function checkIfNextLessonIsCachedAndRedirectIfNot(lessonCode) { // Called at the end of each lesson

  if (localStorage.getItem("commonFilesForAllLessonsCachedSuccessfully")) { // Find the naming pattern in 0_parent_initial_load_and_111.js
    if (localStorage.getItem("lesson"+String(lessonCode)+"CommonFilesCachedSuccessfully")) { // Find the naming pattern in 0_parent_initial_load_and_111.js
      if (localStorage.getItem("lesson"+String(lessonCode)+"FilesFor-"+parent.langCodeForTeachingFilePaths+"-CachedSuccessfully")) { // Find the naming pattern in 0_parent_initial_load_and_111.js
        // Let the service-worker do the magic and show the user new content despite being offline
        // Probably it's better without a box like "YOU ARE OFFLINE but the app will try to continue"
        parent.console.log("BUT NOW THAT CACHES FOR "+String(lessonCode)+" ARE READY");
        return true;
        // NOTE THAT: In case user is leaving lesson 114 and the device is offline
        // there could be one more condition » if (localStorage.getItem("authorsNotice1FilesCachedSuccessfully")) {  }
        // BUT: 99.999 percent of the time that will be true as long as if (localStorage.getItem("lesson121CommonFilesCachedSuccessfully")) and the other ones are both true
        // THEREFORE: We let the app try to display bakernotice1 by doing nothing here and leaving things to service-worker
        // See js_for_cache_handling/121_and_bakernotice1.js
      } else { goToSorryPage(); return false; }
    } else { goToSorryPage(); return false; }
  } else { goToSorryPage(); return false; }
  // --
  function goToSorryPage() {
    parent.console.warn("ONE OR MORE CACHES FOR "+String(lessonCode)+" ARE MISSING\nWill redirect to you_are_offline screen");
    // HOPEFULLY you_are_offline.html will be cached by cacheCommonFilesForAllLessons in 0_parent_initial_load_and_111 » Looks like most of the time it performs well
    parent.ayFreym.src = "/user_interface/screens/"+userInterfaceLanguage+"/you_are_offline.html"; // Will be served by service-worker OFFLINE magic instead of remote host
  }

}



/* See usage of ASIDE element as another type of button in js_for_handling_speech_give_up */
/* See usage of SECTION & ADDRESS elements as other types of buttons in js_for_proceed_buttons.js */
