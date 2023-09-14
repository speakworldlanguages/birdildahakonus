"use strict";
// Code written by Manheart Earthman=B. A. Bilgekılınç Topraksoy=土本 智一勇夫剛志
// This file MAY NOT BE MODIFIED by unauthorized people = This file may be modified by AUTHORIZED PEOPLE ONLY

var willUserTalkToSpeechRecognition = false;
var detectedBrowserName;
let detectedBrowserVersion = 0;
var detectedOS_name;
var detectedBrandName = "unknown manufacturer";
var deviceDetector = {device:"desktop",isMobile:false}; // Defaults
var isApple = false;
var isSafari = false;
var isSamsungBrowser = false;
var soundFileFormat = "____";
var isAndroid = false;
var isWebViewOnAndroid = false; // Even though it is never used as of August 2023
var isFirefox = false;
let isUnknownBrowserInTermsOfSpeechRecognition = false;

// if (annyang) {
//   annyang.debug(); // Uncomment to activate debug mode for speech recognition
// }


// Prevent screen dimming -> handles the Android case -> Starting with Safari 16.4 it is supported on iOS too
// Only Firefox is the one who still won't do it as of August 2023
// See https://w3c.github.io/screen-wake-lock/ AND ALSO See https://web.dev/wake-lock/
const stayAwakeForThisManyMinutes = 3;
function tryToKeepTheScreenON() {
  navigator.wakeLock.request("screen").then(lock => {
    setTimeout(() => lock.release(), stayAwakeForThisManyMinutes * 60000); // Looks like it's working
  }).catch(error => {console.log(error);});
}

if ('wakeLock' in navigator) {  tryToKeepTheScreenON();  } // Also see js_for_all_iframed_lesson_htmls and find window.onload
// Also see visibilitychange below to see how wake-lock is reacquired after being lost due to tab navigation or pressing the OFF button

window.addEventListener('DOMContentLoaded', function(){
  const ua = navigator.userAgent;
  const parser = new UAParser(ua);
  // Check for browser name on every device
  detectedBrowserName = parser.getBrowser().name.toLowerCase();
  // Manipulate the browser version string so that "greater than" (>) and "smaller than" (<) comparison operators can be used
  if (parser.getBrowser().version) {
    const versionString = parser.getBrowser().version;
    function removeNonNumbersAndKeepDot(inputString) {    return inputString.replace(/[^0-9.]/g, '');    }
    let versionNumberWithDots = 0.0;
    if (versionString) { versionNumberWithDots = removeNonNumbersAndKeepDot(versionString); }
    // NOTE_THAT: Number() returns 0 when the string is empty
    if (typeof versionNumberWithDots.split(".")[1] === 'undefined') {
      if (typeof versionNumberWithDots.split(".")[0] === 'undefined') { // Example: The string contains no numbers but is only "." or is empty
        detectedBrowserVersion = 0;
      } else { // Example: If "15" then assume that it is "15.0" so » 150
        detectedBrowserVersion = Number(  versionNumberWithDots.split(".")[0]  )*10;
      }
    } else { // Example: If "15.6" then » 156 ,,, If "15.78" then ignore the less significant digits » 157
      detectedBrowserVersion = Number(  versionNumberWithDots.split(".")[0]  )*10 + Number(  versionNumberWithDots.split(".")[1].substring(0,1)  );
    }
  }
  detectedOS_name = parser.getOS().name.toLowerCase();
  if (parser.getDevice().vendor) { detectedBrandName = parser.getDevice().vendor.toLowerCase(); }
  console.log("This is "+detectedBrowserName+" "+detectedBrowserVersion+" on "+detectedOS_name+" running on a device by "+detectedBrandName);
  // Use the same logic from Maarten Belmans deviceDetector » https://github.com/PoeHaH/devicedetector
  if (parser.getDevice().type) { // Check if is available » Otherwise throws an error like: Cannot use toLowerCase with undefined
    if (parser.getDevice().type.toLowerCase() == "tablet") {
      deviceDetector.device = "tablet"; deviceDetector.isMobile = true;
    } else if (parser.getDevice().type.toLowerCase() == "mobile") {
      deviceDetector.device = "phone"; deviceDetector.isMobile = true;
    } else { } // Do not change the defaults and assume that it is a desktop
  }

  // DISABLE ALL LONG-TOUCH-MENUs on mobiles
  // NOTE THAT: window.oncontextmenu IS NO GOOD - BECAUSE IT TRIGGERS AN ANNOYING VIBRATION everytime a long touch happens USE-pointer events none carefully or prevent default for touchstart
  // HERE WE DON'T NEED TO WAIT FOR window.load to correctly access deviceDetector
  if (deviceDetector.isMobile) { // Let's allow bubbling by omitting event.stopPropagation();
    window.ontouchstart = function(event) {     event.preventDefault();     return false;    }; // It looks like this is working...
  } else { } // We need the right click menu on desktops » it opens the [start-fullscreen-mode] box

  /* DESPITE: Being sick of writing extra code to handle Apple */
  if (detectedOS_name == "ios" || detectedOS_name == "macos" || detectedBrandName == "apple") {
    isApple=true;
    // Set the sound file format for the entire app
    soundFileFormat = "mp3"; // CAUTION: Parent level only! See js_for_all_iframed_lesson_htmls to find how it's passed to the iframe level
    // We don't want to put this into js_for_every_single_html because that precedes all js files
  } else {
    // Set the sound file format for the entire app
    soundFileFormat = "webm"; // CAUTION: Parent level only! See js_for_all_iframed_lesson_htmls to find how it's passed to the iframe level
    // We don't want to put this into js_for_every_single_html because that precedes all js files
  }
  // -
  if (detectedOS_name == "macos") {
    // DECIDE: Desktop Safari supports playing webm but Mobile Safari doesn't.
    // Should we use mp3 for Desktop Safari too???? ???? ???? YES IF it runs faster and hover sounds are accurate
    console.warn("Will use HTML5 Audio instead of Web Audio on Mac OS");
    try {
      Howler.usingWebAudio = false; // force html5 // Otherwise every alert mutes and unmutes all the sounds and it keeps toggling like that
    } catch (e) {
      console.error(e);
    }
  }

  if (detectedBrowserName.search("safari") >= 0) {
    isSafari = true;
  }

  if (detectedBrowserName.search("samsung") >= 0) {
    isSamsungBrowser = true; // Necessary for preventing fullscreen mode before mic permission prompt shows otherwise fullscreen blocks the prompt
  }

  if (detectedBrowserName.search("firefox") >= 0) {
    isFirefox = true;
  }
  // Android Chrome and Webview on Android are different // Like support for change event is not the same in 2022 >>> https://developer.mozilla.org/en-US/docs/Web/API/PermissionStatus/change_event
  // UNCERTAIN: What would the detectedBrowserName be on iOS if it was installed as PWA or was downloaded as standalone from app store?
  if (detectedBrowserName.search("webview") >= 0) {
    isWebViewOnAndroid = true; // Even though it is never used as of August 2023
  }

  if (detectedOS_name.search("android") >= 0) {
    isAndroid=true; // Primary use case: In lesson 1-1-1 lesson.js to notify user about microphone timing
    if (annyang) {
      annyangRestartDelayTime = 2750;
      // CANNOT turn off interimResults here because annyang is not initialized
      // Instead we will manipulate a variable so that annyang will be initialized without interimResults
      annyangBetterIfInterimResultsAreDisabled = true;
      // THROWS ERROR: let recog = annyang.getSpeechRecognizer(); recog.interimResults = false; // Turn off interimResults on all Android devices regardless of browser
      // NOTE: When interimResults are ON, speech recognition throws an error on Samsung Browser, says it has already started.
      // NOTE: Chrome actually DOES NOT throw an error but it looks like it starts later than expected when interimResults are ON.
    } // Override the default value of 100
    else {console.warn("annyang doesn't exist???");}
  }


  // Samsung Browser PROBLEM SOLVED: See js_for_the_sliding_navigation_menu.js to find the function hideOrUnhideTheNavigationMenuOnMOBILES()
  // Sliding navigation menu used to be triggered oppositely because resize and fullscreenchange events fired at a different order in Chrome than the order it fired in Samsung Browser.
  // The solution was introducing a small delay with setTimeout() so that events fire in the same order on different devices/browsers.

  // See https://github.com/faisalman/ua-parser-js
  if (detectedBrowserName.includes("chrom")) { // omit the letter 'e' to check for Chromium too
    willUserTalkToSpeechRecognition = true; // Chrome, Mobile Chrome, Chrome Headless, Chrome WebView, Chromium
  } else if (detectedBrowserName.includes("safari")) {
    willUserTalkToSpeechRecognition = true; // Safari or Mobile Safari
  } else if (detectedBrowserName.includes("samsung")) {
    willUserTalkToSpeechRecognition = true;
  } else if (detectedBrowserName.includes("edge")) {
    willUserTalkToSpeechRecognition = true;
  } else if (detectedBrowserName.includes("baidu")) {
    willUserTalkToSpeechRecognition = true;
  } else if (detectedBrowserName.startsWith("qq")) {
    willUserTalkToSpeechRecognition = true; // QQ, QQBrowser, QQBrowserLite
  } else if (detectedBrowserName.startsWith("opera")) { // WHY DO PEOPLE IN KENYA USE OPERA???
    if (detectedBrowserName.length > 5) {      willUserTalkToSpeechRecognition = true;     } // Opera [Mini/Mobi/Tablet]
    else {      willUserTalkToSpeechRecognition = false;    } // Desktop Opera (hopefully & probably)
  } else if (detectedBrowserName.startsWith("ie")) {
    willUserTalkToSpeechRecognition = false; // QQ, QQBrowser, QQBrowserLite
    alert("(⊙_⊙)\nWhat? Internet Explorer?\nThis device is like a software museum!");
  } else { // Everything else including Firefox
    handleUnknownBrowser();
  }

  function handleUnknownBrowser() {
    isUnknownBrowserInTermsOfSpeechRecognition = true;
    // ---
    if (localStorage.browserIsNotWhitelistedNotificationHasAlreadyBeenDisplayed) {
      // DO NOTNING here means “NEVER ANNOY with repeating alert boxes; do not display anymore”
    } else {
      setTimeout(function () {
        // A crude alert box is shown on less common browsers like Dolphin, DuckDuckGo, etc.
        const filePath = "/user_interface/text/"+userInterfaceLanguage+"/0-if_browser_support_is_unknown.txt";
        fetch(filePath,myHeaders).then(function(response){return response.text();}).then(function(contentOfTheTxtFile){
          localStorage.browserIsNotWhitelistedNotificationHasAlreadyBeenDisplayed = "yes"; // Let the notification appear only once and never again.
          // Display in UI language: “You are using X browser... Let's see if it can do speech recognition”
          alert( parser.getBrowser().name + contentOfTheTxtFile );
          // Search through the code below to find 0-if_something_is_not_working.txt
        });
      },500);
    }
  }

  // CHECK IF USER MUST UPDATE OR CHANGE THE BROWSER
  if ("permissions" in navigator) {
    // According to caniuse
    // Safari 16.0 ~ 16.3 SUPPORT Permissions API without supporting [PermissionStatus change event]
    // Safari 16.4 has full support with the change event
    // Get the current status for mic from the browser
    const micPermissionPromise = navigator.permissions.query({name:'microphone'});
    micPermissionPromise.then(function(result1) { // Handle Windows & Android ...mainly Chrome
      console.log("Permissions API supported including microphone permission");
      // In case PermissionStatus API: change event is NOT SUPPORTED » Instead of onchange, we can check if the permission-state has actually changed with a setInterval and then clearInterval once user's answer is detected.
      if (result1.state == 'granted') {
        willUserTalkToSpeechRecognition = true; // Necessary: In case user is on an unknown browser that supports "Speech Recognition"
        console.log("Microphone permission is already set to GRANTED");
      } else if (result1.state == 'denied') {
        willUserTalkToSpeechRecognition = false; // Shorten the waiting time when showing c1 c2 c3 visuals and change the button from SKIP to NEXT
        console.warn("Microphone permission is already set to DENIED");
        // Maybe give an alert(); box like "You will not be able to play the games in this app without giving microphone permission"

        // WEIRD SITUATION: This block sometimes gets executed on mobile Chrome version 106 and the app functions normally after a reload
        // When this problem happens console says "Script error at 0 0"
        if (!sessionStorage.remedyForScriptErrorZeroZeroHasBeenTried) { alert("🔃"); setTimeout(function () { location.reload(); }, 2500); }
        sessionStorage.remedyForScriptErrorZeroZeroHasBeenTried = "yes";
      } else {
        // Which means (result1.state == 'prompt') // Please allow will be showing unless removed
        localStorage.removeItem("allowMicrophoneDialogHasAlreadyBeenDisplayed"); // IDEA: Instead of removing it, we can actually use it to work around annoying permission policies of Safari.
        console.log("Microphone permission is currently set to PROMPT i.e. ask the user to choose");
      }
    }).catch(function () {
      // User's browser has permissions API but it does not let us check microphone permissions!
      console.warn("This browser supports permissions API but microphone permission is not available");
      // According to caniuse the browsers that will fall here are,
      // Chrome 43 to 63
      // Firefox 46 to 117(and probably further)
      // Opera 30 to 50
      // Samsung 4 to 9.1
      // NOTE THAT Safari will never fall here because with 16.0 Permissions API came with microphone included.

      tellTheUserToChangeOrUpdateTheBrowser();

    });
  } else {
    // User's browser doesn't have permissions API at all which happens on
    // Safari 15.x and earlier
    // and very very old browsers
    // and Webview on Android
    console.warn("This browser doesn't have permissions API at all");
    // EVEN THOUGH Safari started supporting speech recognition with 14.1 on Mac and 14.5 on iOS, it didn't support PermissionStatus API until 16.0 and it didn't support change event before 16.4
    // As a result, an iPad with Safari 15.6 fell here in October 2022. Note that desktop Safari and mobile Safari are different.
    // Best practice seems to be: Show an alert box that tells the user to either update his/her browser or open the app on a Windows/Android device with Chrome.

    tellTheUserToChangeOrUpdateTheBrowser();

    // Safari 15.x does not support avif files so those will be notified here
    // Safari has partially started supporting avif files during 16.0~16.3 and full support came with 16.4
    // So it is necessary to warn older Safari users and force them to update
  }

}, { once: true });
// END OF DOMContentLoaded

// ---
function tellTheUserToChangeOrUpdateTheBrowser() {

  let alertTime;
  if (isUnknownBrowserInTermsOfSpeechRecognition) { alertTime = 5555; } // An alert box has already been displayed therefore we must delay the second alert to avoid flooding
  else { alertTime = 500; }
  setTimeout(function () {
    const filePath = "/user_interface/text/"+userInterfaceLanguage+"/0-if_something_is_not_working.txt"; // A plain [Better if you use Chrome on a PC] msg
    fetch(filePath,myHeaders).then(function(response){return response.text();}).then(function(contentOfTheTxtFile){  alert(contentOfTheTxtFile.split("|")[1]);  });
  },alertTime);

}

/*________________window LOAD___________________*/
let allowMicrophoneBlinker;
let pleaseAllowSound; // See js_for_info_boxes_in_parent for the preceding box sounds
let micPermissionHasChangedToGrantedSound; // See js_for_info_boxes_in_parent for the preceding box sounds

window.addEventListener("load",function() {
  pleaseAllowSound = new Howl({  src: ["/user_interface/sounds/notification2_appear."+soundFileFormat]  }); // See above to find soundFileFormat
  micPermissionHasChangedToGrantedSound = new Howl({  src: ["/user_interface/sounds/notification2_close."+soundFileFormat]  }); // See above to find soundFileFormat
  allowMicrophoneBlinker = document.getElementById('allowMicrophoneDivID'); // See index.html
  const filePathForAllowMicrophoneText = "/user_interface/text/"+userInterfaceLanguage+"/0-allow_microphone.txt";
  fetch(filePathForAllowMicrophoneText,myHeaders).then(function(response){return response.text();}).then(function(contentOfTheTxtFile){ allowMicrophoneBlinker.children[1].innerHTML =  contentOfTheTxtFile; });

}, { once: true });

const blockAllClicksAndHoversDIV = document.createElement("DIV"); // During mic permission prompt
function removeAllowMicrophoneBlinkerSoftly() {
  allowMicrophoneBlinker.classList.add("letYouMustAllowMicrophoneDialogDisappear"); // No matter what the choice is // Works for both desktop and mobile
  setTimeout(function () {     allowMicrophoneBlinker.parentNode.removeChild(allowMicrophoneBlinker);     },1501);
  if (deviceDetector.device == "desktop") {
    blockAllClicksAndHoversDIV.style.animationName = "theDarkeningBackgroundDisappears"; // See css_for_the_container_parent_html
    setTimeout(function () {     document.body.removeChild(blockAllClicksAndHoversDIV);     },5000); // Keep blocking hovers until first lesson shows
  }
}
function removeAllowMicrophoneBlinkerForcedly() {
  // Immediate HARD REMOVE » Never let anything appear
  allowMicrophoneBlinker.parentNode.removeChild(allowMicrophoneBlinker);
  if (deviceDetector.device == "desktop") { document.body.removeChild(blockAllClicksAndHoversDIV); }
}
/*---*/

/* __Test microphone and get allowed if need be__ */
function testAnnyangAndAllowMic(nameOfButtonIsWhatWillBeTaught) { // See js_for_the_parent_all_browsers_all_devices
  // Check if Speech Recognition API is supported // Note that Opera desktop and Edge have lied by falsely returning true for a while, in 2020 they said yes but didn't.
  if (annyang) {
    // For first-time users, try to get the “allow microphone” issue solved as soon as possible.
    // Skip the allow microphone procedure when the user wants to change the studied language
    if (localStorage.allowMicrophoneDialogHasAlreadyBeenDisplayed) { // There used to be a problem here like a double firing when index.html redirected to ja.html or tr.html shortly after landing because of UI language.
        console.log("Skipping permission queries... Proceed to startTeaching()");
        startTeaching(nameOfButtonIsWhatWillBeTaught); // Not a fresh user: User must be trying to learn a different language
    } else { // What to do for fresh users who have just chosen their first target language

        const httpORhttps = window.location.protocol.toLowerCase(); // the app's custom "please allow" box must appear only on https (not http)
        // In case of testing on http://localhost we don't want "Allow-Deny" dialog to appear
        if (httpORhttps.search("https") >= 0) {
          if (deviceDetector.isMobile) { // PHONES AND TABLETS
            // Mobiles already have a native touch blocker - UNCERTAIN: Does every single mobile browser do that?
            allowMicrophoneBlinker.classList.add("letYouMustAllowMicrophoneDialogAppearMobile"); // 1.5s See css_for_the_container_parent_html
            setTimeout(function () { pleaseAllowSound.play(); }, 300);
          } else { // DESKTOPS
            // On desktops create and display a full viewport half opaque DIV to block all hovering and clicking while native allow box is showing
            blockAllClicksAndHoversDIV.classList.add("allowMicDesktopBackground"); document.body.appendChild(blockAllClicksAndHoversDIV); // See css_for_the_container_parent_html
            allowMicrophoneBlinker.classList.add("letYouMustAllowMicrophoneDialogAppearDesktop"); // 1.5s See css_for_the_container_parent_html
            setTimeout(function () { pleaseAllowSound.play(); }, 300);
          }
        } else {
          willUserTalkToSpeechRecognition = false; // if somehow http instead of https
        }

        // ---Permission handling---
        // These will be executed only when testAnnyangAndAllowMic is called » when a welcome screen button is touched/clicked
        // Safari 16.0 ~ 16.3 SUPPORT Permissions API without supporting [PermissionStatus change event]
        // Safari 16.4 has full support with the change event
        let changeEventIsSupported = true;
        if ("permissions" in navigator) {
            console.log("Both SpeechRecognition and PermissionStatus are supported");
            const micPermissionPromise = navigator.permissions.query({name:'microphone'});
            micPermissionPromise.then(function(result2) { // Handle mic permission

              if (result2.state == 'granted') {
                // This is a very rare case: It can only happen if
                // 1 - This is a browser that allows microphone usage by default
                // 2 - Before choosing his first target language user has changed the browser settings to allow microphone
                console.log("Mic permission was somehow set to GRANTED without a prompt");
                removeAllowMicrophoneBlinkerForcedly(); // Immediate HARD REMOVE » Never let anything appear
                setTimeout(function () {     startTeaching(nameOfButtonIsWhatWillBeTaught);     },2002);
              } else {
                // Let the [Please allow] message appear and stay by doing nothing
                // Use if needed: if (result2.state == 'prompt')
                // Use if needed: if (result2.state == 'denied')
              }
              // https://developer.mozilla.org/en-US/docs/Web/API/Navigator/permissions
              // https://developer.mozilla.org/en-US/docs/Web/API/PermissionStatus/change_event
              // According to mozilla Android Webview cannot fall here because Permissions API is not supported at all in WebView Android

              // Special workaround method is required for Safari 16.0 ~ 16.3 according to caniuse: Check Safari versions that support onchange
              try {
                result2.onchange = function(event) {    proceedAccordingToUsersChoiceAboutMicPermission(event);  return true;  };
              } catch (e) {
                console.error("Couldn't add event listener for mic permission via onchange: " + e);
              } finally {
                if (result2.onchange) {
                  console.log("onchange appears to be supported");
                  // INDEED: Tested Safari 16.6 and it did not respond to the change when [allow] button was clicked!!!
                  if (isSafari) { console.log("but this is Safari and it could be lying");
                    changeEventIsSupported = false; // Thankfully: We can still react to user's choice
                  }
                } else {
                  console.warn("onchange is not supported for PermissionStatus object");
                  tellTheUserToChangeOrUpdateTheBrowser();
                  // Note that Safari 15.x and earlier cannot fall here because this is inside an if ("permissions" in navigator) block
                  // Handle the case where the change event is not supported
                  changeEventIsSupported = false; // So that, when user has made a choice, we can use the setInterval to detect it
                }
              }

              // _______

              function proceedAccordingToUsersChoiceAboutMicPermission(event) {
                console.log("User's answer was detected by listening to the CHANGE event");
                const newPermissionState = event.target.state;
                if (newPermissionState === 'granted') {
                  console.log('Microphone permission STATE has CHANGED TO GRANTED.');
                  micPermissionHasChangedToGrantedSound.play(); // See js_for_info_boxes_in_parent for the accompanying sound
                  localStorage.allowMicrophoneDialogHasAlreadyBeenDisplayed = "yes"; // Prevent all future prompts
                  willUserTalkToSpeechRecognition = true; // Necessary: In case user is on an unknown browser that supports "Speech Recognition"
                } else if (newPermissionState === 'denied') {
                  console.log('Microphone permission STATE has CHANGED TO DENIED.');
                  willUserTalkToSpeechRecognition = false; // Shorten the waiting time when showing c1 c2 c3 visuals and change the button from SKIP to NEXT
                } else {
                  console.log('Microphone permission state has changed, but the user has not made a decision yet???');
                  // Add your logic for handling when the permission state changes but the user hasn't made a decision yet here
                  // Is this ever possible in any browser?
                }

                // When the setting is changed anyhow
                removeAllowMicrophoneBlinkerSoftly(); // With nice animation » Should work both on mobile and desktop
                // The first lesson may start in 1502ms
                setTimeout(function () {     startTeaching(nameOfButtonIsWhatWillBeTaught);     },2002);
              }
            // END OF micPermissionPromise.then

            }).catch(function () {
              // User's browser has both SpeechRecognition API and Permissions API but it does not let us check microphone permissions!
              // According to caniuse the browsers that will fall here are,
              // Chrome 43 to 63
              // Opera desktop 30 to 50
              // Samsung 4 to 9.1
              // NOTE THAT Safari will never fall here because with 16.0 Permissions API came with microphone included.
              // In this case Firefox also cannot fall here as it never supported SpeechRecognition API (as of August 2023)
              // ---
              // Notification for users with these very old browsers already handled above
            });
        } else { // permissions query not supported at all but annyang exists
          console.warn("Permissions API is not supported in this browser even though Speech Recognition API is supported!");
          // Chrome 33 to 42
          // Opera 20 to 29
          // Desktop Safari 14.1 ~ 15.x
          // Mobile Safari 14.5 ~ 15.x

          // tellTheUserToChangeOrUpdateTheBrowser(); // If uncommented, this will be shown for the second time to Safari users between 14.x ~ 15.x
          // Safari users before 14.x will not see this repetition. They will see the "You must update" alert only once as handled above.

          // 28 Ağustos 2023 İstanbul: iPad buraya düşüyor
          // The app is fully functional with speech recognition and even deviceorientation
          // BUT THE rotating-globe preloader sticks to the screen and never disappears
          // NORMALLY: rotating-globe preloader disappers every time window.onload fires in js_for_all_iframed_lesson_htmls
          // POSSIBLY BECAUSE lack of AVIF support breaks something and 'load' never fires
          removeAllowMicrophoneBlinkerForcedly();
          // IN THIS CASE WE HAVE TWO OPTIONS:
          // A- Implement webp fallback for browsers that don't support avif in favor of old-hardware iPad users
          // B- Comment out startTeaching(nameOfButtonIsWhatWillBeTaught) so that the app never starts wherever permissions API doesn't exist
          // setTimeout(function () {     startTeaching(nameOfButtonIsWhatWillBeTaught);     },2002);
        }
        // END OF ---Permission handling---

        // Make the “allow microphone” box appear for fresh new users
        // Here we know that SpeechRecognition is supported
        // To make the mic permission prompt appear we do a quick TURN ON AND THEN OFF
        // Either with or without permissions API
        // UNCERTAIN: We don't know if a browser would pause the script execution during a permission prompt similar to the way it pauses during an alert.
        // LATER: Yes it looks like Samsung Browser ignores the annyang.abort() inside handleMicFirstTurnOn
        // IN CASE: onchange isn't really supported (like Safari 16.x), we start a setInterval before the prompt appears and as a result it doesn't matter if its ticking is paused by the permission box or not.
        // BUT: On Samsung Browser onchange works fine so we don't use the setInterval » so better try calling annyang.abort() shortly after onchange fires
        // SEE: proceedAccordingToUsersChoiceAboutMicPermission() function above
        if (isSamsungBrowser || false || false) { // In Samsung Browser the [Would you like to allow] prompt gets hidden under the fullscreened document element
          if (hasGoneFullscreen) { // To reveal the prompt we have to exit fullscreen temporarily in Samsung Browser
            console.warn("Unblocking the permission prompt in Samsung Browser");
            setTimeout(function () { closeFullscreen(); }, 750); // See js_for_handling_fullscreen_mode
          }
          // Samsung Browser throws an error -> Failed to execute 'start' on 'SpeechRecognition', recognition has already started.
          // Chrome on Android can function with interimResults but it looks like it causes a delay with annyang.start
          // console.warn("SAMSUNG BROWSER: Will now turn off interim results to avoid already started error");
        }
        // ---
        setTimeout(function () {  handleMicFirstTurnOn();  annyang.start({ autoRestart: false });  },1750); // This will make the prompt box appear for allowing microphone usage
        // Note that proceedAccordingToUsersChoiceAboutMicPermission will be armed and ready to fire startTeaching() IF AND ONLY IF change event is supported
        function handleMicFirstTurnOn() {
          // Before the prompt is showing
          if (isApple) { setTimeout(function () { annyang.pause(); },5750); } // Pause without turning the mic off and hope that user will choose OK
          else { setTimeout(function () { annyang.abort(); },5750); } // Turn the mic off and hope that user will choose OK
          // -
          // -
          if (changeEventIsSupported) {
            // Do nothing and let proceedAccordingToUsersChoiceAboutMicPermission() react to the user's answer
          } else {
            // Handle the case in which change event is not actually suppırted
            if ("permissions" in navigator) {
              let previousState, currentState;
              const micPermissionPromiseInit = navigator.permissions.query({name:'microphone'});
              micPermissionPromiseInit.then(function(result3) {
                previousState = result3.state;
                currentState = result3.state;
              });
              const checkInterval = setInterval(function () {
                const micPermissionPromiseCheck = navigator.permissions.query({name:'microphone'});
                micPermissionPromiseCheck.then(function(result4) {
                  currentState = result4.state;
                  if (previousState != currentState) {
                    // Change detected without any event listeners
                    clearInterval(checkInterval);
                    console.log("User's answer was detected by using a setInterval check");
                    if (currentState == 'granted') {
                      micPermissionHasChangedToGrantedSound.play(); // See js_for_info_boxes_in_parent for the accompanying sound
                      willUserTalkToSpeechRecognition = true; // In case user is on an unknown browser that supports "Speech Recognition"
                      console.log("User has chosen OK for microphone");
                      localStorage.allowMicrophoneDialogHasAlreadyBeenDisplayed = "yes"; // Prevent all future prompts
                    }
                    if (currentState == 'denied') {
                      willUserTalkToSpeechRecognition = false; // Shorten the waiting time when showing c1 c2 c3 visuals and change the button from SKIP to NEXT
                      console.log("User has chosen NO for microphone");
                    }
                    // When the setting is changed anyhow
                    removeAllowMicrophoneBlinkerSoftly(); // With nice animation » Should work both on mobile and desktop
                    // The first lesson may start in 1502ms
                    setTimeout(function () {     startTeaching(nameOfButtonIsWhatWillBeTaught);     },2002);
                  }
                });
              }, 1000); // End of checkInterval setInterval
            } // End of if ("permissions" in navigator)
          } // End of else for changeEventIsSupported

        } // End of handleMicFirstTurnOn

    } // End of what to do for fresh users who have just chosen their first target language
  } // End of if (annyang)
  else { // No annyang,,, REMEMBER: Opera desktop and Edge lie and return true even though they don't support it (2022).
    // Show an alert box if speech recognition is not supported (mainly to Firefox users).
    // This will happen shortly after user touches|clicks a button on [choose a language screen]
    setTimeout(function () {
      const filePath = "/user_interface/text/"+userInterfaceLanguage+"/0-if_something_is_not_working.txt"; // Since speech recognition is not available "It's better if you use Chrome" msg
      fetch(filePath,myHeaders).then(function(response){return response.text();}).then(function(contentOfTheTxtFile){  alert(contentOfTheTxtFile.split("|")[0]);  });
    },500);
    // Policy: The app won't proceed without annyang (except for the two liars i.e. Opera and Edge)
  }
}

/*THE END of this js file*/
