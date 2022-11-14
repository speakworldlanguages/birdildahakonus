"use strict";
var willUserTalkToSpeechRecognition = false;
var detectedBrowser, detectedBrowserName;
var detectedOS;
var detectedBrand, detectedBrandName;
// DEPRECATED var audioFileExtension = "ogg"; // Default to ogg except for Safari // Ogg is better than mp3 but Safari won't play it.
var isApple = false;
var isSafari = false;
var isAndroid = false;
var isWebViewOnAndroid = false;
let wasListeningJustBeforeUserLeft = false; // annyang mic input
let userIsAwaySound, userIsBackSound;

// Prevent screen dimming -> handles the Android case -> doesn't work on iOS as of Oct 2022
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

  var parser = new UAParser();
  // Check for browser name on every device
  detectedBrowser = parser.getBrowser(); detectedBrowserName = detectedBrowser.name;
  detectedOS = parser.getOS();
  detectedBrand = parser.getDevice();  detectedBrandName = detectedBrand.vendor;
  /* DESPITE: Being sick of writing special code for Apple */
  if (detectedOS.name == "iOS" || detectedOS.name == "Mac OS" || detectedBrandName == "Apple") {
    Howler.usingWebAudio = false; // force html5 // Otherwise every alert mutes and unmutes all the sounds and it keeps toggling like that
    // DEPRECATED audioFileExtension = "mp3";
    isApple=true;
  }

  if (detectedBrowserName.search("Safari") >= 0) {
    isSafari = true;
  }

  // Android Chrome and Webview on Android are different // Like support for change event is not the same in 2022 >>> https://developer.mozilla.org/en-US/docs/Web/API/PermissionStatus/change_event
  if (detectedBrowserName.search("WebView") >= 0) {
    isWebViewOnAndroid = true;
  }

  const searchable_OS_name = detectedOS.name;
  if (searchable_OS_name.search("Android") >= 0) {
    isAndroid=true; // Primary use case: In lesson 1-1-1 bread.js to notify user about microphone timing
  }

  userIsAwaySound = new Howl({  src: ["/user_interface/sounds/user_is_away.webm"]  });
  userIsBackSound = new Howl({  src: ["/user_interface/sounds/user_is_back.webm"]  });

  // See caniuse.com
  // Samsung Browser PROBLEM SOLVED: See js_for_the_sliding_navigation_menu.js to find the function hideOrUnhideTheNavigationMenuOnMOBILES()
  // Sliding navigation menu used to be triggered oppositely because resize and fullscreenchange events fired at different times in Chrome and in Samsung Browser.
  // The solution was introducing a small delay with setTimeout() so that events fire in the same order on different devices/browsers.

  /*______SWITCH_______*/
  switch (detectedBrowser.name) { // See https://github.com/faisalman/ua-parser-js
    case "Chrome": willUserTalkToSpeechRecognition = true;
      break;
    case "Chromium": willUserTalkToSpeechRecognition = true;
      break;
    case "Chrome WebView": willUserTalkToSpeechRecognition = true;
      break;
    case "Chrome Headless": willUserTalkToSpeechRecognition = true;
      break;
    case "Samsung Browser": willUserTalkToSpeechRecognition = true;
      break;
    case "Safari": willUserTalkToSpeechRecognition = true;
      break;
    case "Mobile Safari": willUserTalkToSpeechRecognition = true;
      break;
    case "Baidu": willUserTalkToSpeechRecognition = true;
      break;
    case "baidu": willUserTalkToSpeechRecognition = true;
      break;
    case "QQ": willUserTalkToSpeechRecognition = true;
      break;
    case "QQBrowser": willUserTalkToSpeechRecognition = true;
      break;
    case "QQBrowserLite": willUserTalkToSpeechRecognition = true;
      break;
    /* __ For IE users __ */
    case "IE": alert("(⊙_⊙)\nWhat? Internet Explorer?\nIs this a computer or is it a software museum?"); willUserTalkToSpeechRecognition = false;
      break;
    case "IEMobile": alert("(⊙_⊙)\nWhat? Internet Explorer?\nThis device is like a software museum!"); willUserTalkToSpeechRecognition = false;
      break;
    /* __ For Edge users __ */
    case "Edge": willUserTalkToSpeechRecognition = true;
      break;
    /* __ For Opera users __ */
    case "Opera": // alert("Opera ↹ Chrome");
      /*break;*/ // NOTE-THAT: Skipping break will make defaults fire in any case

    // Opera mobile is like Chrome with an Opera skin. So it may be whitelisted.

    /* __ Everything else including Firefox __ */
    default: // What to do if the browser is not whitelisted
      if (localStorage.browserIsNotWhitelistedNotificationHasAlreadyBeenDisplayed == "yes") {
        // DO NOTNING here means “Don't display the annoying alert boxes anymore.”
      } else {
        localStorage.browserIsNotWhitelistedNotificationHasAlreadyBeenDisplayed = "yes"; // Display the notifications only once by using this.
        setTimeout(function () {
          // A crude alert box is shown if the user's browser is not Chrome or another Web Speech API compatible one.
          const filePath = "/user_interface/text/"+userInterfaceLanguage+"/0-if_browser_support_is_unknown.txt";
          fetch(filePath,myHeaders).then(function(response){return response.text();}).then(function(contentOfTheTxtFile){
            // Display in UI language: “You are using X browser... Let's see if it can do speech recognition”
            alert(detectedBrowser.name+contentOfTheTxtFile);
            // See line 420~430 below to see what msg is displayed like: Oh no, your browser does not support speech recognition
          });
        },1500);
      }
  }
  /*______END OF SWITCH_______*/

  // NOT TO SET BUT TO GET THE LAST permission SETTINGS
  if ("permissions" in navigator) {
    // Read the last setting
    const micPermissionPromise = navigator.permissions.query({name:'microphone'});
    micPermissionPromise.then(function(result1) { // Handle Windows & Android ...mainly Chrome
      console.log("This is a good browser that supports permissions API along with microphone permissions");
      // Mac OS Safari 16.0 falls in here but it doesn't support the onchange event, so we cannot immediately react to user's choice
      // In that case, instead of onchange, we can check if the permission-state has actually changed with a setInterval and then clearInterval once user's answer is detected.
      if (result1.state == 'granted') {
        willUserTalkToSpeechRecognition = true;
        console.log("Microphone permission already granted i.e. previously taken");
      } else if (result1.state == 'denied') {
        willUserTalkToSpeechRecognition = false;
        console.log("Microphone permission is already set to DENIED");
      } else {
        // Which means (result1.state == 'prompt') // Please allow will be showing unless removed
        localStorage.removeItem("allowMicrophoneDialogHasAlreadyBeenDisplayed"); // IDEA: Instead of removing it, we can actually use it to work around annoying permission policies of Safari.
        console.log("Microphone permission must be taken");
      }
    }).catch(function () { // Handle Firefox? ...hopefully
      // User's browser has permissions API but it does not let us check microphone permissions!
      console.log("This browser supports permissions API but microphone permissions are not available");
    });
  } else {
    // User's browser doesn't have permissions API at all.
    console.log("This browser doesn't have permissions API at all");
    // During tests, an iPad with Safari 15.6 fell here in October 2022
    // Best practice seems to be: Show an alert box that tells the user to open the app on a PC with Chrome.
    setTimeout(function () {
      const filePath = "/user_interface/text/"+userInterfaceLanguage+"/0-if_something_is_not_working.txt"; // A plain [Better if you use Chrome on a PC] msg
      fetch(filePath,myHeaders).then(function(response){return response.text();}).then(function(contentOfTheTxtFile){  alert(contentOfTheTxtFile.split("|")[1]);  });
    },500);
  }


  /*________________________________________*/
  // Handle lesson PAUSE with visibility change on mobile devices for return after tab navigation or when on/off button is pressed etc.
  // Use “var” (not “const”) for things that need to be accessible from elsewhere.

  /* Using alert() to pause the app when OFF button is pressed: It breaks down Firefox Mobile, but other browsers seem to be OK */
  let continueAfterPauseMsgFromTxtFileInUILanguage = "Continue?"; // Or maybe something like WELCOME BACK can also work: Get the actual text from .txt file and use it instead of this default.
  const filePathForTheContinueLessonText = "/user_interface/text/"+userInterfaceLanguage+"/0-paused_by_document_hidden.txt";
  fetch(filePathForTheContinueLessonText,myHeaders).then(function(response){return response.text();}).then(function(contentOfTheTxtFile){ continueAfterPauseMsgFromTxtFileInUILanguage = contentOfTheTxtFile; }); // See js_for_every_single_html.js for the headers thingy.


  // Note: The following enables annyang to restart after a PAUSE when user has been AWAY or has turned off his mobile device's screen. Desktops don't need any handling for that.
  // Note: Annyang's behaviour is similar to the "visibilitychange" event. That is different from window "blur/focus" event. See https://stackoverflow.com/questions/58148482/document-visibilitychange-versus-window-blur-focus-what-is-the-difference-when/58148483#58148483

  if (deviceDetector.isMobile) {
    // ON MOBILES
    /**/
    document.addEventListener("visibilitychange", handleVisibilityChangeOnMobilesFunction);
    function handleVisibilityChangeOnMobilesFunction()
    {
      let newVolume;
      let i = 1;
      if (document.visibilityState === 'hidden') { // document.hidden is historical??? https://developer.mozilla.org/en-US/docs/Web/API/Document/hidden
          // console.log("hidden means user is gone"); // This fires when ON-OFF button of the device is pressed.
          userIsAwaySound.play(); // It can't flood can it?
          // Handle audio.
          // REMEMBER: On mobiles Howler.volume() always starts at 1 and is never changed. User adjusts OS volume natively with the device buttons.
          // Custom FADE-DOWN for global volume
          let nineteenSteps = setInterval(littleByLittle,49);
          function littleByLittle() {
            newVolume = 1 - i*0.05; // The last one will be 1- 19*0.05 = 1 - 0.95 = 0.05
            newVolume = Number(newVolume.toFixed(2)); // Some kind of bugginess in Chrome makes this necessary. // No need to use Math.abs() to prevent falling below zero.
            Howler.volume(newVolume);
            if (i > 18) {     Howler.volume(0); clearInterval(nineteenSteps);   }
            i++;
          }
          // Handle microphone
          if (annyang) {
            wasListeningJustBeforeUserLeft = annyang.isListening();
            annyang.abort(); // OR should we??? // if (!isApple) {  annyang.abort();  } // without this annyang.start() won't function.
          }
          // Try to make the app pause when ON/OFF button of the phone/tablet is pressed, but do not block annyang restart.
          // MAYBE IT'S OK TO USE alert-pausing on Apple too now that we use html5 audio on Howler with Safari
          // MUST TEST on iOS LATER
          if (!isApple) { // WEIRD: alert boxes mute and unmute sounds and keep toggling in Safari
            // MUST WATCH THE LATEST updates in Safari and iOS
            setTimeout(function() { alert(continueAfterPauseMsgFromTxtFileInUILanguage); },999);
          }

      } else {
          // console.log("visible means user is back");
          // IS THIS WRONG OR RIGHT?: Returning from AUTO-SLEEP DOES NOT MAKE THIS FIRE! - LATER DOUBT: really? (It is not like user pressing ON/OFF button twice)
          // AUTO-SLEEP is not counted as user being away according to document.hidden
          // This works only in case user presses ON/OFF button twice
          // MUST CHECK IF that is still the case with document.visibilityState === 'hidden' instead of document.hidden
          if ('wakeLock' in navigator) {  tryToKeepTheScreenON();  }

          // Handle audio
          // REMEMBER: On mobiles Howler.volume() is always 1 and is never changed. User adjusts OS volume natively with the device buttons.
          // Custom FADE-UP for global volume
          let nineteenSteps = setInterval(littleByLittle,10);
          function littleByLittle() {
            newVolume = i*0.05; // The last one will be 0.95
            newVolume = Number(newVolume.toFixed(2)); // Some kind of bugginess in Chrome makes this necessary. // No need to use Math.round() to make sure it never goes above 1
            Howler.volume(newVolume);
            if (i > 18) {     Howler.volume(1); clearInterval(nineteenSteps);   }
            i++;
          }

          // NICE ENOUGH
          setTimeout(function() { userIsBackSound.play(); },130); // lag cannot be too long

          // Handle microphone
          // MUST restart annyang if was listening!
          if (wasListeningJustBeforeUserLeft) {
            setTimeout(function() {          if (annyang){ annyang.start(); }           },1500); // used to be 1001
          }
          // On mobiles, we want to go back to fullscreen because the alert box has made the browser exit fullscreen
          // Unfortunately requestFullscreen gets blocked because Chrome does not count an alert box click as a valid user gesture
          // See https://stackoverflow.com/questions/66242084/chrome-does-not-count-closing-an-alert-box-as-a-valid-user-gesture-therefore-unl
          // if (deviceDetector.isMobile){ // CANNOT USE
          //   setTimeout(function () {  o-p-e-n-F-u-l-l-s-c-r-e-e-n();  },100); // CANNOT USE
          // } // CANNOT USE
      }
    }
    // Using window blur focus to handle sounds DOES NOT WORK... Double-fires, misfires etc... No easy solution.
  }
  else {
    // ON DESKTOPS
    document.addEventListener("visibilitychange", handleVisibilityChangeOnDesktopsFunction);
    function handleVisibilityChangeOnDesktopsFunction()
          {
            if (document.visibilityState === 'hidden') {
                // console.log("hidden means user is gone");
                if (firstUserGestureHasUnleashedAudio) { userIsAwaySound.play(); }
            } else {
                // console.log("visible means user is back");
                if (firstUserGestureHasUnleashedAudio) { userIsBackSound.play(); }
            }
          }
  }

}, { once: true });
// END OF DOMContentLoaded

/**/
/*________________window LOAD___________________*/
let allowMicrophoneBlinker;

window.addEventListener("load",function() {

  allowMicrophoneBlinker = document.getElementById('allowMicrophoneDivID');
  const filePathForAllowMicrophoneText = "/user_interface/text/"+userInterfaceLanguage+"/0-allow_microphone.txt";
  fetch(filePathForAllowMicrophoneText,myHeaders).then(function(response){return response.text();}).then(function(contentOfTheTxtFile){ allowMicrophoneBlinker.children[1].innerHTML =  contentOfTheTxtFile; });
  /* UPDATE : Safari 16 finally has almost-full support for permissions including microphone, phew! */
  // HOWEVER: Safari still ignores the eventlistener for a change event -> WORKAROUND: Use setInterval/clearInterval to detect

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
function testAnnyangAndAllowMic(nameOfButtonIsWhatWillBeTaught) {
  // Check if Speech Recognition API is supported (AT LEAST IN THEORY because Opera, in 2020, says yes but doesn't).
  if (annyang) {
    // For first-time users, try to get the “allow microphone” issue solved as soon as possible.
    if (localStorage.allowMicrophoneDialogHasAlreadyBeenDisplayed == "yes") { // There used to be a problem here like a double firing when index.html redirected to ja.html or tr.html shortly after landing because of UI language.
        startTeaching(nameOfButtonIsWhatWillBeTaught); // Not a fresh user: User must be trying to learn a different language
    } else { // A first ever fresh user
        // Make the “allow microphone” box appear for users who have arrived for the first time by a quick TURN ON AND THEN OFF thing.
        const httpORhttps = window.location.protocol.toLowerCase(); // the app's custom "please allow" box must appear only on https (not http)
        // In case of testing on http://localhost we don't want "Allow-Deny" dialog to appear
        if (httpORhttps.search("https") >= 0) {
          if (deviceDetector.isMobile) { // PHONES AND TABLETS
            // Mobiles already have a native touch blocker
            allowMicrophoneBlinker.classList.add("letYouMustAllowMicrophoneDialogAppearMobile"); // 1.5s See css_for_the_container_parent_html
          } else { // DESKTOPS
            // On desktops create and display a full viewport half opaque DIV to block all hovering and clicking while native allow box is showing
            blockAllClicksAndHoversDIV.classList.add("allowMicDesktopBackground"); document.body.appendChild(blockAllClicksAndHoversDIV); // See css_for_the_container_parent_html
            allowMicrophoneBlinker.classList.add("letYouMustAllowMicrophoneDialogAppearDesktop"); // 1.5s See css_for_the_container_parent_html
          }
        } else {
          willUserTalkToSpeechRecognition = false; // if somehow http instead of https
        }

        //
        // ---Permission handling---
        // These will be executed only when testAnnyangAndAllowMic is called » when a welcome screen button is touched/clicked
        // UPDATE: As of late 2022 Safari 16.0 finally has full support for permissions API, phew!
        let changeEventIsNotSupported = false;
        if ("permissions" in navigator) {
            console.log("Can we check microphone permission state...?");
            const micPermissionPromise = navigator.permissions.query({name:'microphone'});
            micPermissionPromise.then(function(result2) { // Handle mic permission
              console.log("...yes and that is good.");
              if (result2.state == 'granted') {
                console.log("Already granted so let's start the app");
                removeAllowMicrophoneBlinkerForcedly(); // Immediate HARD REMOVE » Never let anything appear
                startTeaching(nameOfButtonIsWhatWillBeTaught);
              } else {
                // Use if needed: if (result2.state == 'prompt') // Please allow will be showing unless removed
                // Use if needed: if (result2.state == 'denied') // Please allow will be showing unless removed

                // SAFARI ignores onchange
                // https://developer.mozilla.org/en-US/docs/Web/API/PermissionStatus/change_event
                // According to mozilla Android Webview also acts like Safari rather than Chrome
                // So let's try to make it handleable
                if (isApple || isWebViewOnAndroid) { // IT WOULD BE BETTER IF we could actually detect if browser supports change event!!!
                  changeEventIsNotSupported = true; // So that, when user has made a choice, we can use the setInterval to detect it
                }
              }

              result2.addEventListener('change', proceedAccordingToUsersChoiceAboutMicPermission);
              function proceedAccordingToUsersChoiceAboutMicPermission(event) {
                if (event) { console.log("User's answer was detected by listening to the CHANGE event"); }

                if (result2.state == 'prompt') {} // Is this ever possible in any browser? It could be in Safari 16.0 if proceedAccordingToUsersChoiceAboutMicPermission is called without the CHANGE event and no answer is given
                else { // Was either allowed or denied
                  localStorage.allowMicrophoneDialogHasAlreadyBeenDisplayed = "yes";
                  if (result2.state == 'granted') { willUserTalkToSpeechRecognition = true; console.log("User has chosen OK for microphone"); } // In case user is on an unknown browser that supports "Speech Recognition"
                  if (result2.state == 'denied') { willUserTalkToSpeechRecognition = false; console.log("User has chosen NO for microphone "); } // Even if user's browser supports it
                }
                // When the setting is changed anyhow
                removeAllowMicrophoneBlinkerSoftly(); // With nice animation » Should work both on mobile and desktop
                // The first lesson may start in 1502ms
                setTimeout(function () {     startTeaching(nameOfButtonIsWhatWillBeTaught);     },2002);
              }


            }).catch(function () { // Handle exceptional browsers ...hopefully
              console.log("...no, even though support for permissons API exists."); // Firefox???
              if (nameOfButtonIsWhatWillBeTaught) { // This is expected to be executed when a language button is clicked/touched on Apple devices
                removeAllowMicrophoneBlinkerForcedly(); // Immediate HARD REMOVE » Never let anything appear
                startTeaching(nameOfButtonIsWhatWillBeTaught); // Start the app // See js_for_app_initialization_in_parent
              } else { // This is expected to be executed (1111ms) after window load once at the beginning (no button name passed as parameter) on Safari 16.0
                localStorage.allowMicrophoneDialogHasAlreadyBeenDisplayed = "yes"; // This is a lie. We lie so that it won't be triggered again.
                setTimeout(function () { removeAllowMicrophoneBlinkerSoftly(); },3000); // With nice animation » Should work both on mobile and desktop
              }
            });
        } else { // permissions query not supported at all but annyang exists
          console.log("No permissions API... Even though speech recognition is supported!");
          // What browser could be handled here???
          // According to caniuse July 2022, browsers that have no permissions API: IE & QQ Browser & Baidu browser & Opera Mobile
          setTimeout(function () {    removeAllowMicrophoneBlinkerSoftly();    },3000);
          // The first lesson may start in 1502ms
          setTimeout(function () {     startTeaching(nameOfButtonIsWhatWillBeTaught);     },4500);
        }
        // END OF ---Permission handling---

        // Either with or without permissons API
        setTimeout(function () {     annyang.start();     },1503); // This will make the prompt box appear for allowing microphone usage

        // While the user is viewing the dialog box and deciding whether or not to press OK
        let tryToAbortEveryThreeSeconds = setInterval(function () {
          if (annyang.isListening()) {
            // On Apple we must keep the mic ON, otherwise it will continue asking "Do you want to allow" everytime the mic is turned ON again
            if (!isApple) {   annyang.abort();  } // In this case we don't want the mic to be turned off in Safari + possibly MacOS Chrome BECAUSE we wan't to let the user click the mic icon in the address bar to choose [Always Allow]
            clearInterval(tryToAbortEveryThreeSeconds);
            if (changeEventIsNotSupported) {
              const micPermissionPromise = navigator.permissions.query({name:'microphone'});
              micPermissionPromise.then(function(result3) { // Handle Windows & Android ...mainly Chrome
                console.log("User's answer was NOT detected by any change event but a timeout");
                if (result3.state == 'prompt') { console.log("User did not answer"); }
                else { // Was either allowed or denied
                  localStorage.allowMicrophoneDialogHasAlreadyBeenDisplayed = "yes";
                  if (result3.state == 'granted') { willUserTalkToSpeechRecognition = true; console.log("User has chosen OK for microphone"); } // In case user is on an unknown browser that supports "Speech Recognition"
                  if (result3.state == 'denied') { willUserTalkToSpeechRecognition = false; console.log("User has chosen NO for microphone "); } // Even if user's browser supports it
                }
                removeAllowMicrophoneBlinkerSoftly(); // With nice animation » Should work both on mobile and desktop
                // The first lesson may start in 1502ms
                setTimeout(function () {     startTeaching(nameOfButtonIsWhatWillBeTaught);     },2002);
              });
            }
          }
        },3000);
    } // End of what to do for fresh users who have seen the app first time ever
  } // End of if (annyang)
  else { // No annyang,,, REMEMBER: Opera and Edge lie and return true even though they don't support it (2022).
    // Show an alert box if speech recognition is not supported.
    setTimeout(function () {
      const filePath = "/user_interface/text/"+userInterfaceLanguage+"/0-if_something_is_not_working.txt"; // Because speech recognition is not available "It's better if you use Chrome" msg
      fetch(filePath,myHeaders).then(function(response){return response.text();}).then(function(contentOfTheTxtFile){  alert(contentOfTheTxtFile.split("|")[0]);  });
    },500);
    // Policy: The app won't proceed without annyang (except for the two liars i.e. Opera and Edge)
  }
}

/*THE END of this js file*/
