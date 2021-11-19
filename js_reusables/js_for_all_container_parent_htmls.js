// This is deferred.
// Redirection based on browser language is handled with inline script in index.html which should fire before anything here.
// var isOrWasViewingProgressChart = false; // DEPRECATED? See js_for_all_iframed_lesson_htmls AND progress.js

/*Prevent screen turn off on mobiles*/
const preventSleepModeOrScreenTurnOffWithFakeVideo = document.createElement("VIDEO");
document.body.appendChild(preventSleepModeOrScreenTurnOffWithFakeVideo); // TESTED: It works
preventSleepModeOrScreenTurnOffWithFakeVideo.autoplay=true;
preventSleepModeOrScreenTurnOffWithFakeVideo.muted=true;
preventSleepModeOrScreenTurnOffWithFakeVideo.loop=true; // Don't forget this otherwise the screen will still turn off after 1 single play.
preventSleepModeOrScreenTurnOffWithFakeVideo.src="user_interface/16x16_anti_sleep_mode.mp4";
preventSleepModeOrScreenTurnOffWithFakeVideo.style.opacity="0"; // Can't be too safe

// NOTE: Chrome does not count an alert box click as a user gesture. The first click or touch will unlock sound. Must be silent until then.

/*_____*/
const welcomeMessageDiv = document.getElementById('idOfTheWelcomeMenuDiv');
function userHasClickedOrTouchedWelcomeAnswerA() {
  // Remove the element but display it again next time
  welcomeMessageDiv.classList.add("addThisToAButtonForPlayStationStyleClick");
  setTimeout(function () {     welcomeMessageDiv.parentNode.removeChild(welcomeMessageDiv);    },1000);
}
function userHasClickedOrTouchedWelcomeAnswerB() { // The user has claimed that he/she is a member of the crowd.
  // Remove the element and don't display it anymore
  welcomeMessageDiv.classList.add("addThisToAButtonForPlayStationStyleClick");
  setTimeout(function () {     welcomeMessageDiv.parentNode.removeChild(welcomeMessageDiv);    },1000);
  localStorage.theUserHasSaidHeOrSheIsAMemberOfTheCrowd = "yes";
}

var genderOfTheUser;
var theLanguageUserIsLearningNowToSetFilePaths;
var theLanguageUserIsLearningNowToSetAnnyang;
var ayFreym = document.getElementById('theIdOfTheIframe'); // Access to ayFreym from » progress.js, js_for_different_browsers_and_devices, js_for_the_sliding_navigation_menu

window.addEventListener('DOMContentLoaded', function(){
  // Skip the crowdfunding (welcome screen) message if user says he she is a member.
  if (localStorage.theUserHasSaidHeOrSheIsAMemberOfTheCrowd == "yes") {
    welcomeMessageDiv.parentNode.removeChild(welcomeMessageDiv);
  }
}, { once: true });

window.addEventListener('load', function(){
  // Fire if new stuff has appeared in the iframe. CAUTION: Do not use ayFreym.onload = function... Because it overwrites the one inside js_for_the_sliding_navigation_menu
  ayFreym.addEventListener('load',frameIsLoaded);
  function frameIsLoaded() { // This will fire at the first launch (for empty src blank.html) too (that is before 1-1-1 index.html)
    // Preloader will disappear in 500ms.
    // console.log("frameIsLoaded has fired"); // TESTED: It works.
    setTimeout(function () {   setPreloadCoverIsShowingNowToFalse();   },505); // See js_for_preload_handling
  }

  // Continue progress from last unit / last saved position
  if (localStorage.memoryCard) { // See if a previously saved checkpoint exists.
    // See openFirstLesson() down in line 200+smth to find the first storage of theLanguageUserIsLearningNow...
    theLanguageUserIsLearningNowToSetFilePaths = localStorage.theLanguageUserWasLearningLastTimeToSetFilePaths; // This will certainly exist as long as there has been a "memory card" save.
    theLanguageUserIsLearningNowToSetAnnyang = localStorage.theLanguageUserWasLearningLastTimeToSetAnnyang; // Same situation.
    if (annyang) {
        annyang.setLanguage(theLanguageUserIsLearningNowToSetAnnyang); // Firefox v60's and v70's won't let buttons function unless this is wrapped in an if (annyang){} like this.
    }
    if (localStorage.genderOfTheUserSavedToLocalStorage) {
        genderOfTheUser = localStorage.genderOfTheUserSavedToLocalStorage;
    }

    ayFreym.addEventListener('load',blankFrameIsLoaded,{ once: true }); // The right-click (context menu) won't function properly if ayFreym.src is changed too early
    function blankFrameIsLoaded() {
      ayFreym.src = "progress_chart"; // QUESTION: Immediately or as soon as OK is touchclicked in "Auto-saved progress has been loaded"
      // Probably must do addEventListener load for iframe before hiding MAIN
      // NOTE: 8K is 7680x4320  »  8000px should be enough for any display
      document.getElementsByTagName('MAIN')[0].style.left = "8000px"; // Hide the "Choose the language you want to learn" screen
    }

    //
    // HANDLE: addHomeButtonToTheNavigationMenu(); addGoBackToPreviousButtonToTheNavigationMenu(); handleTheFirstGoingFullscreenOnMobiles();
    // HANDLE: preloadHandlingDiv setPreloadCoverIsShowingNowToTrue();

    // DEPRECATED CODE
    // function whenLoadLastLessonOkButtonIsClickedOrTapped() { // See a parent document like index.html, ja.html, tr.html to find that button.
    //       // Used to be document.getElementById('fullViewportPositionFixedDivAsContainerOfTheMenu').style.left = "8000px";
    //   ayFreym.src = localStorage.theLastCheckpointSavedInLocalStorage;
    //   //document.getElementById('fullViewportPositionFixedDivAsContainerOfLoadCheckpointPrompt').classList.add("addThisForOpacityAnimationFadeOut");
    //   // Small navigation menu buttons... See js_for_the_sliding_navigation_menu.js
    //   if (ayFreym.src.substring(ayFreym.src.length - 34, ayFreym.src.length)=="level_1/unit_1/lesson_1/index.html") {
    //     // add only HOME button to the left when going to the first lesson
    //     addHomeButtonToTheNavigationMenu(); // WITH PROGRESS CHART: this must be moved to progress.js
    //   } else {
    //     // add both home and go back buttons when going to any lesson except for the very first (i.e. bread)
    //     addHomeButtonToTheNavigationMenu(); // WITH PROGRESS CHART: this must be moved to progress.js
    //     addGoBackToPreviousButtonToTheNavigationMenu(); // WITH PROGRESS CHART: this must be moved to progress.js
    //   }
    //   handleTheFirstGoingFullscreenOnMobiles(); // WITH PROGRESS CHART: this must be moved to progress.js
    //
    //   // Make the loading animation appear (i.e. bring the preloader)
    //   preloadHandlingDiv.classList.remove("addThisClassToHideThePreloader"); // See css_for_every_single_html,,, Should be 500ms if not changed.
    //   setPreloadCoverIsShowingNowToTrue(); // See js_for_preload_handling
    // }
  } else {
    // First time users will proceed via openFirstLesson() which fires when any of the letTheIframeTeach buttons is used.
    // localStorage.memoryCard is created as soon as one of the letTheIframeTeach buttons is clicked or touched.
  }

}, { once: true });
// For languages like Arabic we need to know the user's gender.
// Let the webp img files be downloaded and ready before the button to reveal them is clicked/touched.
const malesIcon = document.createElement("IMG");
const femalesIcon = document.createElement("IMG");
malesIcon.src = "user_interface/images/gender_gentlemen.webp"; // Less than 1KB
femalesIcon.src = "user_interface/images/gender_ladies.webp"; // Only 1,5KB

/*What language will be taught via the iframe*/
/* JA - Hito */
function letTheIFrameTeachJapanese(){ //See index.html to find the button that triggers this via onclick.
  theLanguageUserIsLearningNowToSetFilePaths = "ja"; //"ja" seemed to be OK with both iOS and Android in summer 2021
  theLanguageUserIsLearningNowToSetAnnyang = "ja";
  if (isApple) { // See js_for_different_browsers_and_devices
    theLanguageUserIsLearningNowToSetAnnyang = "ja-JP"; // Overwrite
  }
  if (!savedProgress.ja) { // if it doesn't exist
    savedProgress.ja = {}; // Create an object to fill and save later ,,, Will exist AT PARENT LEVEL unless passed and shared via localStorage!
  } // else » don't touch the data, leave it alone, do not overwrite-erase if something already exists,, perhaps user studies more than 1 language
  saveJSON = JSON.stringify(savedProgress);
  localStorage.setItem("memoryCard", saveJSON); // Now it exists on the memory card, accessible by both parent and iframe
  openFirstLesson();
}
/* ZH - Ren */
function letTheIFrameTeachChinese(){ //See index.html to find the button that triggers this via onclick.
  theLanguageUserIsLearningNowToSetFilePaths = "zh"; // Android is OK with "zh" but iOS needs "zh-TW"
  theLanguageUserIsLearningNowToSetAnnyang = "zh"; // We may still want to pass "zh" instead of "zh-TW" on Android and Windows. Because Android turns the mic on and off too quickly in some less supported languages.
  if (isApple) {
    theLanguageUserIsLearningNowToSetAnnyang = "zh-TW"; // Overwrite
  }
  if (!savedProgress.zh) { // if it doesn't exist
    savedProgress.zh = {}; // Create an object to fill and save later ,,, Will exist AT PARENT LEVEL unless passed and shared via localStorage!
  } // else » don't touch the data, leave it alone, do not overwrite-erase if something already exists,, perhaps user studies more than 1 language
  saveJSON = JSON.stringify(savedProgress);
  localStorage.setItem("memoryCard", saveJSON); // Now it exists on the memory card, accessible by both parent and iframe
  openFirstLesson();
}
/* TR - Kişi */
function letTheIFrameTeachTurkish(){ //See index.html to find the button that triggers this via onclick.
  theLanguageUserIsLearningNowToSetFilePaths = "tr"; //"tr" is OK with both iOS and Android
  theLanguageUserIsLearningNowToSetAnnyang = "tr"; // UNCLEAR: SHOULD THIS BE tr-TR on iOS? // tr-TR
  if (isApple) {
    theLanguageUserIsLearningNowToSetAnnyang = "tr-TR"; // Overwrite
  }
  if (!savedProgress.tr) { // if it doesn't exist
    savedProgress.tr = {}; // Create an object to fill and save later ,,, Will exist AT PARENT LEVEL unless passed and shared via localStorage!
  } // else » don't touch the data, leave it alone, do not overwrite-erase if something already exists,, perhaps user studies more than 1 language
  saveJSON = JSON.stringify(savedProgress);
  localStorage.setItem("memoryCard", saveJSON); // Now it exists on the memory card, accessible by both parent and iframe
  openFirstLesson();
}
/* AR Arabic */
function letTheIFrameTeachArabic(){ //See index.html to find the button that triggers this via onclick.
  theLanguageUserIsLearningNowToSetFilePaths = "ar"; // Android is OK with "ar" but iOS needs "ar-SA" or "ar-QA" etc
  theLanguageUserIsLearningNowToSetAnnyang = "ar"; // We still want "ar" instead of "ar-SA" on Android for better performance (frequency of the mic turn on&off thing).
  if (isApple) {
    theLanguageUserIsLearningNowToSetAnnyang = "ar-SA"; // Overwrite... Don't know which is better: ar-SA ar-JO ar-KW ar-QA
  }
  if (!savedProgress.ar) { // if it doesn't exist
    savedProgress.ar = {}; // Create an object to fill and save later ,,, Will exist AT PARENT LEVEL unless passed and shared via localStorage!
  } // else » don't touch the data, leave it alone, do not overwrite-erase if something already exists,, perhaps user studies more than 1 language
  saveJSON = JSON.stringify(savedProgress);
  localStorage.setItem("memoryCard", saveJSON); // Now it exists on the memory card, accessible by both parent and iframe
  // Get user's gender
  const darkenWholeViewportDiv = document.createElement("DIV");
  darkenWholeViewportDiv.classList.add("darkenTheWholeViewportClass");
  document.body.appendChild(darkenWholeViewportDiv);
  const gentlemenButtonDiv = document.createElement("DIV");
  const ladiesButtonDiv = document.createElement("DIV");
  gentlemenButtonDiv.appendChild(malesIcon);
  ladiesButtonDiv.appendChild(femalesIcon);
  malesIcon.style.width = "160px";
  malesIcon.style.height = "160px";
  femalesIcon.style.width = "160px";
  femalesIcon.style.height = "160px";
  gentlemenButtonDiv.classList.add("gentlemenAndLadiesButtonClass");
  gentlemenButtonDiv.classList.add("gentlemenButtonClass");
  ladiesButtonDiv.classList.add("gentlemenAndLadiesButtonClass");
  ladiesButtonDiv.classList.add("ladiesButtonClass");
  document.body.appendChild(gentlemenButtonDiv);
  document.body.appendChild(ladiesButtonDiv);
  if (deviceDetector.isMobile) {
    gentlemenButtonDiv.addEventListener("touchstart",theUserIsMaleFunction,{once:true});
    ladiesButtonDiv.addEventListener("touchstart",theUserIsFemaleFunction,{once:true});
  } else {
    gentlemenButtonDiv.addEventListener("mousedown",theUserIsMaleFunction,{once:true});
    ladiesButtonDiv.addEventListener("mousedown",theUserIsFemaleFunction,{once:true});
  }
  function theUserIsMaleFunction() {
    gentlemenButtonDiv.classList.remove("gentlemenButtonClass");
    gentlemenButtonDiv.classList.add("bringGenderButtonToVerticalCenter");
    ladiesButtonDiv.classList.add("fadeGenderButtonToZeroOpacity");
    setTimeout( function ()  {  ladiesButtonDiv.style.display="none";  },500);
    genderOfTheUser = "male"; // Set it...
    localStorage.genderOfTheUserSavedToLocalStorage = "male"; // ...and save it
    setTimeout( function ()  {
      openFirstLesson();
      document.body.removeChild(darkenWholeViewportDiv);
      document.body.removeChild(gentlemenButtonDiv);
      document.body.removeChild(ladiesButtonDiv);
    },1500);
  }
  function theUserIsFemaleFunction() {
    ladiesButtonDiv.classList.remove("ladiesButtonClass");
    ladiesButtonDiv.classList.add("bringGenderButtonToVerticalCenter");
    gentlemenButtonDiv.classList.add("fadeGenderButtonToZeroOpacity");
    setTimeout( function ()  {  gentlemenButtonDiv.style.display="none";  },500);
    genderOfTheUser = "female"; // Set it...
    localStorage.genderOfTheUserSavedToLocalStorage = "female"; // ...and save it
    setTimeout( function ()  {
      openFirstLesson();
      document.body.removeChild(darkenWholeViewportDiv);
      document.body.removeChild(gentlemenButtonDiv);
      document.body.removeChild(ladiesButtonDiv);
    },1500);
  }
}
/* EN - People */
function letTheIFrameTeachEnglish(){ //See index.html to find the button that triggers this via onclick.
  theLanguageUserIsLearningNowToSetFilePaths = "en"; // "en" alone works well both on Android and iOS. No need for "en-US" or "en-GB"
  theLanguageUserIsLearningNowToSetAnnyang = "en";
  if (!savedProgress.en) { // if it doesn't exist
    savedProgress.en = {}; // Create an object to fill and save later ,,, Will exist AT PARENT LEVEL unless passed and shared via localStorage!
  } // else » don't touch the data, leave it alone, do not overwrite-erase if something already exists,, perhaps user studies more than 1 language
  saveJSON = JSON.stringify(savedProgress);
  localStorage.setItem("memoryCard", saveJSON); // Now it exists on the memory card, accessible by both parent and iframe
  openFirstLesson();
}


/*___________Navigate to first lesson_____________*/
function openFirstLesson() {
  hideNotificationAndInstallation_2in1_button(); // See js_for_pwa
  // Save language choice
  localStorage.theLanguageUserWasLearningLastTimeToSetFilePaths = theLanguageUserIsLearningNowToSetFilePaths;
  localStorage.theLanguageUserWasLearningLastTimeToSetAnnyang = theLanguageUserIsLearningNowToSetAnnyang;
  // Set language
  if (annyang) {
    annyang.setLanguage(theLanguageUserIsLearningNowToSetAnnyang); // Firefox v60's and v70's won't let buttons function unless this is wrapped in an if (annyang){} like this.
  }

  if (canVibrate) { navigator.vibrate(10); } // Note that this may make mobile Firefox ask for permission to allow vibration

  setTimeout(function() {
    // Hide the welcome screen ( <<choose the language you want to learn>> screen's menu-div)
    document.getElementsByTagName('MAIN')[0].style.left = "8000px";   // Used to be    document.getElementById('fullViewportPositionFixedDivAsContainerOfTheMenu').style.left = "8000px";
    // Display the first lesson
    ayFreym.src = "lessons_in_iframes/level_1/unit_1/lesson_1/index.html";
  },50); // Unnoticable tiny delay

  // Make the loading animation appear (i.e. bring the preloader)
  preloadHandlingDiv.classList.remove("addThisClassToHideThePreloader"); // See css_for_every_single_html,,, Should be 500ms if not changed.
  setPreloadCoverIsShowingNowToTrue(); // See js_for_preload_handling
}

// DEPRECATED: function handleTheFirstGoingFullscreenOnMobiles() { // This fires if 1- User selects a language to learn 2- User returns to the last saved point
//   // Try to go fullscreen on mobile devices. Note the exception of iPhones!
//   if (deviceDetector.isMobile) {
//     // Going fullscreen on mobiles will make the nav menu sink down and disappear because
//     // as you can find in js_for_the_sliding_navigation_menu.js -> the resize event triggers DEPRECATED: hideOrUnhideTheNavigationMenuOnMobilesDependingOnFullscreen()
//     openFullscreen(); // See js_for_handling_fullscreen_mode.js
//     // WARNING: iPhone's Safari won't allow fullscreen! caniuse.com says it is allowed on iPads but wasn't able to test it as of July 2021.
//     // So since resize doesn't happen on iPhones we must manually do the first sinking of the nav menu like this.
//     // BETTER SOLUTION: Move the makeTheNavMenuGoDownOnMobiles() function call to iframe.onload and check if landing is a lesson html (not progress_chart)
//     /*if (deviceDetector.device == "phone" && detectedOS.name == "iOS") {
//       // Just hide the nav menu since we are unable to go fullscreen on an iPhone
//       // INSTEAD OF THIS: setTimeout(function () {      makeTheNavMenuGoDownOnMobiles();      },3500); // See js_for_the_sliding_navigation_menu
//       // WE MUST: wait until preloadCoverIsShowingNow is set to false. That change happens in js_for_all_container_parent_htmls
//       let checkEvery350msOrSo = setInterval(isThePreloaderDoneYet, 350);
//       function isThePreloaderDoneYet() {
//         if (preloadCoverIsShowingNow == false) { // Yes, it is now done.
//           clearInterval(checkEvery350msOrSo); // Stop the timer.
//           makeTheNavMenuGoDownOnMobiles(); // Safely hide the nav menu as soon as possible now. // See js_for_the_sliding_navigation_menu
//         }
//       }
//     }*/
//   } // END OF Try to go fullscreen on mobile ...
// }


// UI sounds ... also see js_for_different_browsers_and_devices.js
let dismissNotificationSound1, hoverSound, clickSound;
window.addEventListener("load",function () {
  dismissNotificationSound1 = new Howl({  src: ['user_interface/sounds/notification1_close.'+audioFileExtension]  });
  hoverSound = new Howl({  src: ['user_interface/sounds/illuminant_button_hover.'+audioFileExtension]  }); // DESKTOP ONLY!
  clickSound = new Howl({  src: ['user_interface/sounds/illuminant_button_click.'+audioFileExtension]  });
},{once:true})
/* BUTTON - Kishi Language, Hito Lanuage, Ren Language */
let allParentButtonElementsAreInThisArray = document.getElementsByTagName("BUTTON"); /*All of them in container parents,,, NOT THE IFRAMED LESSON BUTTONS*/
let i;
for (i = 0; i < allParentButtonElementsAreInThisArray.length; i++)
{
  if (deviceDetector.device == "desktop") {
    allParentButtonElementsAreInThisArray[i].addEventListener("mouseenter", mouseEnterMenuButtonF);
    allParentButtonElementsAreInThisArray[i].addEventListener("mousedown", mouseDownMenuButtonF);
  } else {
    allParentButtonElementsAreInThisArray[i].addEventListener("touchend", mouseDownMenuButtonF); // Not touchstart because it may have to be scrollable
  }
}
/* ASIDE - I will consider joining */
let allParentAsideElementsAreInThisArray = document.getElementsByTagName("ASIDE"); /*All of them in container parents,,, NOT THE IFRAMED LESSON BUTTONS*/
let j;
for (j = 0; j < allParentAsideElementsAreInThisArray.length; j++)
{
  if (deviceDetector.device == "desktop"){
    allParentAsideElementsAreInThisArray[j].addEventListener("mousedown", mouseDownAsideAsButtonF); // When the [OK I will consider joining...] box is closed.
  } else {
    allParentAsideElementsAreInThisArray[j].addEventListener("touchstart", mouseDownAsideAsButtonF); // When the [OK I will consider joining...] box is closed.
  }
}

// Detect first click/first user gesture that unlocks sounds
// REMEMBER: Sliding menu buttons also need this. Handle separately. See js_for_the_sliding_navigation_menu.js
var soundShouldBeUnlockedNow = false;
window.addEventListener("mousedown",function () {  soundShouldBeUnlockedNow = true;  }, {once:true});
function mouseEnterMenuButtonF() {
  if (soundShouldBeUnlockedNow) { // TESTED: It works.
    hoverSound.play(); // If we don't wrap this in such an if() what can happen: The user can hover many times before the sound is unlocked which then EXPLODES when sound is unlocked.
  }
}
function mouseDownMenuButtonF() {
  clickSound.play();
}
function mouseDownAsideAsButtonF() {
  dismissNotificationSound1.play();
}
/*___________*/
// Domain locking against forks etc.
let firstSevenCharactersOfTheAddress = location.hostname.substring(0,7);
switch (location.hostname) {
  case "speakworldlanguages.github.io": // ALLOW
    break;
  case "speakworldlanguages.app": // ALLOW
    break;
  case "birdildahaogreneyim.com": // ALLOW
    break;
  case "hanaserutoiidesuy.one": // ALLOW
    break;
  case "tingdongshijiederenmen.com": // ALLOW
    break;
  case "localhost": // ALLOW
    break;
  default:
    if (firstSevenCharactersOfTheAddress=="192.168") { // ALLOW
      // Do nothing
    } else {
      document.body.style.display = "none";
      alert(location.hostname + " is UNAUTHORIZED!\n1 - DO NOT modify the source code!\n2 - DELETE this fork from your repositories!");
    }
}

/*___________*/
// Do not allow embedding of this app (no re-serving through an alien iframe)
if (self === top) {
    // Display normally
} else {
    /*top.location = self.location; » This doesn’t work directly because of browser policy. Gets blocked as a pop-up window. Use a confirm box before redirecting. */
    document.body.style.opacity = "0.1";
    setTimeout(function () {
      if (confirm("(×_×) → (⌒▽⌒) ?")) {
        top.location = self.location;
      }
    },7000);
}
