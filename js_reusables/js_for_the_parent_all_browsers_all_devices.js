"use strict";
// Code written by Manheart Earthman=B. A. Bilgekılınç Topraksoy=土本 智一勇夫剛志
// This file MAY NOT BE MODIFIED by unauthorized people = This file may be modified by AUTHORIZED PEOPLE ONLY

// DYNAMIC WINDOW SIZE: Needed by game levels
var lastRecordedWindowWidth = window.innerWidth; var lastRecordedWindowHeight = window.innerHeight;
var lastRecordedScreenWidth = window.screen.width; var lastRecordedScreenHeight = window.screen.height;
window.addEventListener('resize', updateWindowProperties);
function updateWindowProperties() {
  lastRecordedWindowWidth = window.innerWidth; lastRecordedWindowHeight = window.innerHeight; // Update the values
  lastRecordedScreenWidth = window.screen.width; lastRecordedScreenHeight = window.screen.height; // Update the values
  setTimeout(function () {
    lastRecordedWindowWidth = window.innerWidth; lastRecordedWindowHeight = window.innerHeight; // Double check for retarded browsers
    lastRecordedScreenWidth = window.screen.width; lastRecordedScreenHeight = window.screen.height; // Double check for retarded browsers
  },100);
}

// See js_for_all_iframed_lesson_htmls AND blank.html
var userIsOrWasJustViewing = "welcome-screen"; // First time users will stay at welcome-screen,,, continuing user's will teleport to progress-chart
//

/*________________LOAD/SAVE___________________*/
var savedProgress; // This used to be in js_for_every_single_html BUT it made two DANGEROUS DUPLICATE vars exist [1- container parent level] [2- iframed lesson level] // LET'S avoid trouble
var saveJSON, loadJSON; // Same as savedProgress
// Load all previous progress data
if (localStorage.memoryCard) {  // https://www.w3schools.com/jsref/tryit.asp?filename=tryjson_store
  loadJSON = localStorage.getItem("memoryCard");
  savedProgress = JSON.parse(loadJSON);
} else {
  savedProgress = {}; // It is the user's first time using the app. So we create an empty object to be able to fill it.
  saveJSON = JSON.stringify(savedProgress); // Convert
  localStorage.setItem("memoryCard", saveJSON); // Save
  // Now we must create savedProgress.tr = {}; savedProgress.ja = {}; savedProgress.en = {}; ... in js_for_the_parent_all_browsers_all_devices letTheIframeTeach..
}

/*_____CAN PLAY SOUND??? ___using howler.js*/
// Detect first click/first user gesture that unlocks sounds
// REMEMBER: Sliding menu buttons also need this. Handle separately.
// ALSO REMEMBER: mousedown DOESN'T UNLOCK SOUND --- mouseup DOES
var firstUserGestureHasUnleashedAudio = false; // Used in js_for_the_sliding_navigation_menu.js
window.addEventListener("mouseup",function () {  firstUserGestureHasUnleashedAudio = true;  }, {once:true}); // Prevent sound flooding (otherwise hover sounds that accumulate may explode with the first user gesture).

// NOTE: Chrome does not count an alert box click as a user gesture. Only the first element click or touch will unlock sound. Must be silent until then.
// _________________

let dismissNotificationSound1, clickSound; //BETTER WITHOUT: hoverSound
window.addEventListener("load",function () {


  // ALL BUTTONS - Kishi Language, Hito Lanuage, Renmen Language etc.
  const allParentButtonElementsAreInThisArray = document.getElementsByTagName("BUTTON"); //All of them in container parents,,, NOT THE IFRAMED LESSON BUTTONS
  let i;
  for (i = 0; i < allParentButtonElementsAreInThisArray.length; i++)
  {
    if (deviceDetector.device == "desktop") { // CAUTION! DOMContentLoaded is too early for deviceDetector
      // BETTER WITHOUT: allParentButtonElementsAreInThisArray[i].addEventListener("mouseenter", mouseEnterMenuButtonF); // Cannot use a hover sound because sound is locked until first click
      allParentButtonElementsAreInThisArray[i].addEventListener("mousedown", mouseDownMenuButtonF);
    } else {
      allParentButtonElementsAreInThisArray[i].addEventListener("touchend", touchEndMenuButtonF); // Not touchstart because it may have to be scrollable
    }
  }


  // ---
  dismissNotificationSound1 = new Howl({  src: ["/user_interface/sounds/notification1_close.webm"]  });
  clickSound = new Howl({  src: ["/user_interface/sounds/illuminant_button_click.webm"]  });
  // ---

  // Skip the welcome screen and continue progress from last unit / last saved position
  if (Object.keys(savedProgress).length>0) { // See if a previously saved checkpoint exists.
    // See openFirstLesson() below in this js file to find the first storage of theLanguageUserIsLearningNow...
    langCodeForTeachingFilePaths = localStorage.theLanguageUserWasLearningLastTimeToSetFilePaths; // This will certainly exist as long as there has been a "memory card" save.
    langCodeForAnnyang = localStorage.theLanguageUserWasLearningLastTimeToSetAnnyang; // Same situation.
    targetLanguageReadsLeftToRightOrRightToLeft = localStorage.theLanguageUserWasLearningReadsLTRorRTL; // Same situation.
    // CANCELLED targetLanguageIsWrittenWithoutSpaces = localStorage.theLanguageUserWasLearningIsWrittenWithoutSpaces;
    if (annyang) {
        annyang.setLanguage(langCodeForAnnyang); // Firefox v60's and v70's won't let buttons function unless this is wrapped in an if (annyang){} like this.
        // SAFARI BUG: Safari does not update the recognition.lang before returning at least one wrong result >>> Keeps listening for the last language that was set before being changed with setLanguage()
        if (isApple) {
          annyang.abort();
          setTimeout(function () { annyang.start(); }, 150); // NOTE: annyang.resume() equals annyang.start()
          setTimeout(function () { annyang.setLanguage(langCodeForAnnyang); }, 300);
          setTimeout(function () { annyang.abort();  }, 450); //Try to force update
        }
    }
    if (localStorage.genderOfTheUserSavedToLocalStorage) { // Retrieve
        genderOfTheUser = localStorage.genderOfTheUserSavedToLocalStorage;
        if (genderOfTheUser=="female") {         userIsFemaleSoUseFemaleConjugation = true;        }
    }
    // As soon as blank.html is loaded
    ayFreym.addEventListener('load',goToProgressChart,{ once: true }); // goToProgressChart() handles the situation if device is offline

  } else {
    // First time users will proceed via openFirstLesson() which fires when any of the letTheIframeTeach functions is called depending on button name.
    // localStorage.memoryCard is created as soon as one of the letTheIframeTeach...() fires as a result of the function chain that starts with a button being clicked or touched.
  }

},{once:true});

/*
window.addEventListener("DOMContentLoaded",function() {
   // NOTE! DOMContentLoaded is too early for deviceDetector
}, { once: true });
*/

var blockOtherWelcomeScreenButtonsUntilItIsSafe = false; // prevent touch or click chaos,,, See blank.html to find how it is set back to the initial value

async function mouseDownMenuButtonF(event) { event.preventDefault();
  if (!blockOtherWelcomeScreenButtonsUntilItIsSafe) { // Prevention of touch/click chaos » Do not let clicking one language and another one immediately after
    blockOtherWelcomeScreenButtonsUntilItIsSafe = true; // Set this back to false if confirm box is cancelled
    clickSound.play();
    event.target.classList.add("buttonMousedownOrTouchend"); // Make it blink: See css_for_the_container_parent_html
    let userWantsToLearnWhichLanguage;
    let chosenLanguageWasPreviouslyStudied;
    if (event.target.name) {
      userWantsToLearnWhichLanguage = event.target.name;
      chosenLanguageWasPreviouslyStudied = checkIfThisLanguageWasPreviouslyStudied(userWantsToLearnWhichLanguage);
    } else { console.error("The selected button has no name???"); }
    // --
    let folderName;
    // Using await could be a good idea where letUserChooseAnAccentOrDialect returns a promise
    if (event.target.id == "userMustChooseOneOfTheDialects") { folderName = await letUserChooseAnAccentOrDialect(userWantsToLearnWhichLanguage); }
    else { folderName = userWantsToLearnWhichLanguage; }

    setLangCodeForFilePathsAndCacheTheFirstTeachingAssets(folderName);
    setTimeout(function () { event.target.classList.remove("buttonMousedownOrTouchend"); },1201); // See css_for_the_container_parent_html
    setTimeout(function () {
      if (!chosenLanguageWasPreviouslyStudied) {
        // Use the app's modal box instead of the browser's native confirm box » reason1 it's much nicer, reason2 Safari mutes unmutes sound after native alert/confirm boxes
        // See js_for_info_boxes_in_parent
        createAndHandleGoBackOrProceedBox().then(function () { // Note: There was a time when this threw an error when removeChild was used the second time, said: Failed to execute 'removeChild' on 'Node'
          //console.log("promise resolved");
          setTimeout(function () { testAnnyangAndAllowMic(userWantsToLearnWhichLanguage); },700); // 300+1501=1801ms??? See js_for_different_browsers_and_devices
          // blockOtherWelcomeScreenButtonsUntilItIsSafe will be set to false bl user_interface/blank.html onbeforeunload
        }).catch(function () {
          //console.log("promise rejected"); // Works OK
          blockOtherWelcomeScreenButtonsUntilItIsSafe = false; // User changed his/her mind and wants to stay
        });
      } else { console.log("skip testAnnyangAndAllowMic and proceed with startTeaching");
        // Go to progress_chart via startTeaching » letTheIframeTeach... » openFirstLesson
        startTeaching(userWantsToLearnWhichLanguage); // Pass the two letter button name
      }
    },1500); // Let user watch the blinking animation and listen to the nice button sound
  }
}
async function touchEndMenuButtonF(event) { event.preventDefault();
  if (!blockOtherWelcomeScreenButtonsUntilItIsSafe) { // Prevention of touch/click chaos » Do not let clicking one language and another one immediately after
    // Better use changedTouches[] when listening for touchend
    const changedTouch = event.changedTouches[0]; // https://patrickhlauke.github.io/touch/touchlist-objects/
    const theThingThatWasChosen = document.elementFromPoint(changedTouch.clientX, changedTouch.clientY);
    if(theThingThatWasChosen.tagName.toLowerCase() == "button" ){
      blockOtherWelcomeScreenButtonsUntilItIsSafe = true; // Set this back to false if confirm box is cancelled
      clickSound.play();
      theThingThatWasChosen.classList.add("buttonMousedownOrTouchend"); // Make it blink: See css_for_the_container_parent_html
      let userWantsToLearnWhichLanguage; // Here it is certain that theThingThatWasChosen is a BUTTON
      let chosenLanguageWasPreviouslyStudied;
      if (theThingThatWasChosen.name) {
        userWantsToLearnWhichLanguage = theThingThatWasChosen.name;
        chosenLanguageWasPreviouslyStudied = checkIfThisLanguageWasPreviouslyStudied(userWantsToLearnWhichLanguage);
      } else { console.error("The selected button has no name???"); }
      // --
      let folderName;
      // Using await could be a good idea where letUserChooseAnAccentOrDialect returns a promise
      if (theThingThatWasChosen.id == "userMustChooseOneOfTheDialects") { folderName = await letUserChooseAnAccentOrDialect(userWantsToLearnWhichLanguage); }
      else { folderName = userWantsToLearnWhichLanguage; }

      setLangCodeForFilePathsAndCacheTheFirstTeachingAssets(folderName);
      setTimeout(function () { theThingThatWasChosen.classList.remove("buttonMousedownOrTouchend"); },1201); // See css_for_the_container_parent_html
      setTimeout(function () {
        if (!chosenLanguageWasPreviouslyStudied) {
          // Use the app's modal box instead of the browser's native confirm box » reason1 it's much nicer, reason2 Safari mutes unmutes sound after native alert/confirm boxes
          // See js_for_info_boxes_in_parent
          createAndHandleGoBackOrProceedBox().then(function () {
            setTimeout(function () { testAnnyangAndAllowMic(userWantsToLearnWhichLanguage); },500); // See js_for_different_browsers_and_devices
            // blockOtherWelcomeScreenButtonsUntilItIsSafe will be set to false by user_interface/blank.html when beforeunload fires
          }).catch(function () {
            blockOtherWelcomeScreenButtonsUntilItIsSafe = false; // User changed his|her mind and wants to stay at [select language] screen
          });
        } else { console.log("skip testAnnyangAndAllowMic and proceed with startTeaching");
          // Go to progress_chart via startTeaching » letTheIframeTeach... » openFirstLesson
          startTeaching(userWantsToLearnWhichLanguage); // Pass the two letter button name
        }
      },1500); // Let user watch the blinking animation and listen to the nice button sound
    }
  }
}
// ---
function checkIfThisLanguageWasPreviouslyStudied(twoLetterCodeOfLanguageToBeChecked) {
  if (savedProgress[twoLetterCodeOfLanguageToBeChecked]) { return true; console.log(".::This is a previously studied language::."); } // if it exists
  else { return false; console.log(".::This language was never studied before::."); }
}
// ---
function letUserChooseAnAccentOrDialect(theButtonNameWas) { // This function should return a promise which will pass the user's answer when resolves
  return new Promise(resolve => {
    console.log("User must choose a dialect (i.e. unless auto-chosen) so that the correct file paths can be set");
    switch (theButtonNameWas) {
      // NOTE THAT: As of August 2023 letUserChooseAnAccentOrDialect() is never called unless button id equals "userMustChooseOneOfTheDialects" in the parent-index.html
      case "ja": break; // Only one (standard) dialect available
      case "ko": break; // Only one (standard) dialect available
      case "zh": resolve("zh_putonghua"); break; // auto set without prompt
      case "tr": resolve("tr_istanbul");  break; // auto set without prompt
      case "ar": break; // Only one (standard) dialect available
      case "de": break; // Only one (standard) dialect available
      case "fr": break; // Only one (standard) dialect available
      case "en": resolve(chooseBetweenBritishAndAmerican); break;

      default: console.error("letUserChooseAnAccentOrDialect function couldn't find a match for the button name!");
    }
  });
}
// ---
function setLangCodeForFilePathsAndCacheTheFirstTeachingAssets(nameOfFolderThatWasPassedHere) {
  console.log("On welcome screen user has chosen: "+nameOfFolderThatWasPassedHere);
  langCodeForTeachingFilePaths = nameOfFolderThatWasPassedHere; // MUST NOT USE substring(0,2) here
  if (typeof cacheLesson111AssetsForTheTargetLanguage === "function") { cacheLesson111AssetsForTheTargetLanguage(); }
  // User will spend at least 10 seconds or so through the [allow microphone] procedure. That should be enough to cache all teaching-speech files
  // So we cache the audio files that contain the teacher's voice for the very first lesson » See js_for_cache_handling/0_parent_initial_load_and_111
}
// ---


// _________________
var genderOfTheUser; // CODING CHOICE: Should we make it "unknown" at this point???
var userIsFemaleSoUseFemaleConjugation = false;
var langCodeForTeachingFilePaths = undefined; // Will be undefined until setLangCodeForFilePathsAndCacheTheFirstTeachingAssets() is called
var langCodeForAnnyang;
var targetLanguageReadsLeftToRightOrRightToLeft; // Without setting a default here we must make sure it is set in every related function
// CANCELLED var targetLanguageIsWrittenWithoutSpaces = false;
// Looks like we don't have to wrap this in DOMContentLoaded thanks to defer, no?
var ayFreym = document.getElementsByTagName('IFRAME')[0]; // Used to be getElementById('theIdOfTheIframe'); // Access to ayFreym from » progress.js, js_for_different_browsers_and_devices, js_for_the_sliding_navigation_menu
var ayFreymWindow = ayFreym.contentWindow; // Used in js_for_different_browsers_and_devices AND js_for_the_sliding_navigation_menu
const mainInParent = document.getElementsByTagName('MAIN')[0];

// handleFadingAndNavigation is called from within progress.js in progress_chart
function handleFadingAndNavigation(srcPath,theLessonIsReadyForOffline) { // This used to be in DEPRECATEDjs_for_preload_handling.js and before that it was in progress.js (it has to stay at parent level because script execution must continue even if a frame is unloaded)
  if (!internetConnectivityIsNiceAndUsable) { console.warn("-The device seems to be OFFLINE- (detected by handleFadingAndNavigation)"); // No internet
    if (theLessonIsReadyForOffline !== true) { console.warn(srcPath+"\nis not ready for offline"); // No cached files available
      pathOfWhatWillBeDisplayedUnlessInternetConnectivityIsLost = srcPath; // See js_for_online_and_offline_modes
      ayFreym.src = "/user_interface/screens/"+userInterfaceLanguage+"/you_are_offline.html";
      return; // Quit without executing the normal navigation code
    } else { console.warn(srcPath+"\nis READY for offline"); /*No internet but the cache is ready, so let service-worker do its offline magic*/ }
  }
  ayFreym.classList.add("everyThingFadesToBlack"); // Exists in css_for_preloader_and_orbiting_circles,,, PREVIOUSLY WAS IN css_for_the_sliding_navigation_menu
  const orbitingCircles =  document.getElementById('orbitingCirclesDivID');
  setTimeout(function () {   orbitingCircles.style.display = "flex";   },701); // From display none;
  setTimeout(function () {
    ayFreym.addEventListener('load',frameIsLoadedByProgressChartNav,{ once: true });
    setTimeout(function() {   ayFreym.src = srcPath;  },100);
    function frameIsLoadedByProgressChartNav() {
      orbitingCircles.style.display = "none";
      ayFreym.classList.remove("everyThingFadesToBlack");  ayFreym.classList.add("everyThingComesFromBlack");  // Exists in css_for_preloader_and_orbiting_circles
      setTimeout(function() {   ayFreym.classList.remove("everyThingComesFromBlack");   },2701); // 701ms was not enough???
    }
  },750);
}

function goToProgressChart() { // Called either from within openFirstLesson() or window load event here in this js file » js_for_the_sliding_navigation_menu has its own separate function
  pathOfWhatWillBeDisplayedUnlessInternetConnectivityIsLost = "/progress_chart/index.html"; // See js_for_online_and_offline_modes
  if (internetConnectivityIsNiceAndUsable) {
    ayFreym.src = pathOfWhatWillBeDisplayedUnlessInternetConnectivityIsLost; // Load immediately; don't wait for [Ok, that's good] being touched/clicked in the dialog/info-box
  } else { console.warn("The device seems to be OFFLINE");
    if (localStorage.getItem("progressChartShouldBeOfflineCompatibleNow") && localStorage.getItem("commonJSandCSSfilesForAllLessonsCachedSuccessfully")) {
      console.warn("But all necessities of the PROGRESS CHART are cached, therefore will try to display");
      ayFreym.src = pathOfWhatWillBeDisplayedUnlessInternetConnectivityIsLost; // Let service-worker do its offline magic
    } else {
      ayFreym.src = "/user_interface/screens/"+userInterfaceLanguage+"/you_are_offline.html";
    }
  }
  // Probably must do addEventListener load for iframe before hiding MAIN
  // NOTE: 8K is 7680x4320  »  8000px should be enough for any display
  mainInParent.style.left = "8000px"; // Hide the "Choose the language you want to learn" screen
  createAndHandleProgressHasBeenLoadedBox(); // See js_for_info_boxes_in_parent
}

// ____________
function startTeaching(usersChoice) { // Normally called from within testAnnyangAndAllowMic() » See js_for_different_browsers_and_devices
  console.log("startTeaching() fired; will try to proceed via one of letTheIframeTeach...()");
  switch (usersChoice) {
    case "ja": letTheIFrameTeachJapanese();  break;
    case "ko": letTheIFrameTeachKorean();    break;
    case "zh": letTheIFrameTeachChinese();   break;
    case "tr": letTheIFrameTeachTurkish();   break;
    case "ar": letTheIFrameTeachArabic();    break;
    case "de": letTheIFrameTeachGerman();    break;
    case "fr": letTheIFrameTeachFrench();    break;
    case "en": letTheIFrameTeachEnglish();   break;

    default: console.error("startTeaching function couldn't find a match for the button name!");
  }
}

// For languages like Arabic we need to know the user's gender.
// Let the webp img files be downloaded and ready before the button to reveal them is clicked/touched.
const malesIcon = document.createElement("IMG");
const femalesIcon = document.createElement("IMG");
malesIcon.src = "/user_interface/images/gender_gentlemen.webp"; // Less than 1KB
femalesIcon.src = "/user_interface/images/gender_ladies.webp"; // Only 1,5KB

/*What language will be taught via the iframe*/
/* JA - Hito */
function letTheIFrameTeachJapanese(){ // Called from within startTeaching()
  targetLanguageReadsLeftToRightOrRightToLeft = "ltr"; // See openFirstLesson() to find how this is saved to localStorage
  langCodeForAnnyang = "ja";
  if (!savedProgress.ja) { // if it doesn't exist
    savedProgress.ja = {}; console.log("Create a new save slot for "+langCodeForTeachingFilePaths.substring(0,2)); // Create an object to fill and save later ,,, Will exist AT PARENT LEVEL unless passed and shared via localStorage!
    saveJSON = JSON.stringify(savedProgress); // See js_for_every_single_html
    localStorage.setItem("memoryCard", saveJSON); // Now it exists on the memory card, accessible by both parent and iframe
    openFirstLesson();
  } else { // User must have used the [learn another language] bilingual button and now wants to continue a previously studied language
    openFirstLesson("returning"); console.log("Previously saved progress exists for "+langCodeForTeachingFilePaths.substring(0,2));
  }
}
/* KO - Saram */
function letTheIFrameTeachKorean(){ // Called from within startTeaching()
  targetLanguageReadsLeftToRightOrRightToLeft = "ltr"; // See openFirstLesson() to find how this is saved to localStorage
  langCodeForAnnyang = "ko";
  if (!savedProgress.ko) { // if it doesn't exist
    savedProgress.ko = {}; console.log("Create a new save slot for "+langCodeForTeachingFilePaths.substring(0,2)); // Create an object to fill and save later ,,, Will exist AT PARENT LEVEL unless passed and shared via localStorage!
    saveJSON = JSON.stringify(savedProgress); // See js_for_every_single_html
    localStorage.setItem("memoryCard", saveJSON); // Now it exists on the memory card, accessible by both parent and iframe
    openFirstLesson();
  } else { // User must have used the [learn another language] bilingual button and now wants to continue a previously studied language
    openFirstLesson("returning"); console.log("Previously saved progress exists for "+langCodeForTeachingFilePaths.substring(0,2));
  }
}
/* ZH - Renmen */
function letTheIFrameTeachChinese(){ // Called from within startTeaching()
  targetLanguageReadsLeftToRightOrRightToLeft = "ltr"; // See openFirstLesson() to find how this is saved to localStorage
  langCodeForAnnyang = "zh"; // "zh" alone works on Android. UNCERTAIN: Would it still be better with "zh-CN" or "zh-TW" or vice-versa on Android and Windows? Because Android turns the mic on and off too quickly in some less supported languages even though we want longer listens.
  // Mac Safari works with zh only // Does not work with "zh-Hans"!
  if (!savedProgress.zh) { // if it doesn't exist
    savedProgress.zh = {}; console.log("Create a new save slot for "+langCodeForTeachingFilePaths.substring(0,2)); // Create an object to fill and save later ,,, Will exist AT PARENT LEVEL unless passed and shared via localStorage!
    saveJSON = JSON.stringify(savedProgress);
    localStorage.setItem("memoryCard", saveJSON); // Now it exists on the memory card, accessible by both parent and iframe
    openFirstLesson();
  } else { // User must have used the [learn another language] bilingual button and now wants to continue a previously studied language
    openFirstLesson("returning"); console.log("Previously saved progress exists for "+langCodeForTeachingFilePaths.substring(0,2));
  }
}
/* TR - Kişi */
function letTheIFrameTeachTurkish(){ // Called from within startTeaching()
  targetLanguageReadsLeftToRightOrRightToLeft = "ltr"; // See openFirstLesson() to find how this is saved to localStorage
  langCodeForAnnyang = "tr";
  if (!savedProgress.tr) { // if it doesn't exist
    savedProgress.tr = {}; console.log("Create a new save slot for "+langCodeForTeachingFilePaths.substring(0,2)); // Create an object to fill and save later ,,, Will exist AT PARENT LEVEL unless passed and shared via localStorage!
    saveJSON = JSON.stringify(savedProgress);
    localStorage.setItem("memoryCard", saveJSON); // Now it exists on the memory card, accessible by both parent and iframe
    openFirstLesson();
  } else { // User must have used the [learn another language] bilingual button and now wants to continue a previously studied language
    openFirstLesson("returning"); console.log("Previously saved progress exists for "+langCodeForTeachingFilePaths.substring(0,2));
  }
}
/* AR - Annaas */
function letTheIFrameTeachArabic(){ // Called from within startTeaching()
  targetLanguageReadsLeftToRightOrRightToLeft = "rtl"; // See openFirstLesson() to find how this is saved to localStorage
  langCodeForAnnyang = "ar"; // We still want "ar" instead of "ar-SA" on Android for better performance (frequency of the mic turn on&off thing).
  // SOLVED: Safari problem with ar: the word is detected correctly and matches the answer key but for some reason the commands object still won't fire the default annyang function
  if (!savedProgress.ar) { // if it doesn't exist
    // Get user's gender
    const darkenWholeViewportDiv = document.createElement("DIV");
    darkenWholeViewportDiv.classList.add("darkenTheWholeViewportClass"); // css_for_the_container_parent_html
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
      createSaveSlotInMemoryCardForArabic();
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
      createSaveSlotInMemoryCardForArabic();
      userIsFemaleSoUseFemaleConjugation = true;
      setTimeout( function ()  {
        openFirstLesson();
        document.body.removeChild(darkenWholeViewportDiv);
        document.body.removeChild(gentlemenButtonDiv);
        document.body.removeChild(ladiesButtonDiv);
      },1500);
    }
    function createSaveSlotInMemoryCardForArabic() {
      savedProgress.ar = {}; console.log("Create a new save slot for "+langCodeForTeachingFilePaths.substring(0,2)); // Create an object to fill and save later ,,, Will exist AT PARENT LEVEL unless passed and shared via localStorage!
      saveJSON = JSON.stringify(savedProgress);
      localStorage.setItem("memoryCard", saveJSON); // Now it exists on the memory card, accessible by both parent and iframe
    }
  } else { // User must have used the [learn another language] bilingual button and now wants to continue a previously studied language
    openFirstLesson("returning"); console.log("Previously saved progress exists for "+langCodeForTeachingFilePaths.substring(0,2));
  }
} // END OF letTheIFrameTeachArabic

/* DE - Leute */
function letTheIFrameTeachGerman(){ // Called from within startTeaching()
  targetLanguageReadsLeftToRightOrRightToLeft = "ltr"; // See openFirstLesson() to find how this is saved to localStorage
  langCodeForAnnyang = "de";
  if (!savedProgress.de) { // if it doesn't exist
    savedProgress.de = {}; console.log("Create a new save slot for "+langCodeForTeachingFilePaths.substring(0,2)); // Create an object to fill and save later ,,, Will exist AT PARENT LEVEL unless passed and shared via localStorage!
    saveJSON = JSON.stringify(savedProgress);
    localStorage.setItem("memoryCard", saveJSON); // Now it exists on the memory card, accessible by both parent and iframe
    openFirstLesson();
  } else { // User must have used the [learn another language] bilingual button and now wants to continue a previously studied language
    openFirstLesson("returning"); console.log("Previously saved progress exists for "+langCodeForTeachingFilePaths.substring(0,2));
  }
}
/* FR - Gens */
function letTheIFrameTeachFrench(){ // Called from within startTeaching()
  targetLanguageReadsLeftToRightOrRightToLeft = "ltr"; // See openFirstLesson() to find how this is saved to localStorage
  langCodeForAnnyang = "fr";
  if (!savedProgress.fr) { // if it doesn't exist
    savedProgress.fr = {}; console.log("Create a new save slot for "+langCodeForTeachingFilePaths.substring(0,2)); // Create an object to fill and save later ,,, Will exist AT PARENT LEVEL unless passed and shared via localStorage!
    saveJSON = JSON.stringify(savedProgress);
    localStorage.setItem("memoryCard", saveJSON); // Now it exists on the memory card, accessible by both parent and iframe
    openFirstLesson();
  } else { // User must have used the [learn another language] bilingual button and now wants to continue a previously studied language
    openFirstLesson("returning"); console.log("Previously saved progress exists for "+langCodeForTeachingFilePaths.substring(0,2));
  }
}
/* EN - People */
// LET'S TRY AND TEACH AMERICAN AND BRITISH separately
// IDEA: As soon as the user chooses English, the app displays a prompt and asks if the user wants to hear British or American
function chooseBetweenBritishAndAmerican() { // See letUserChooseAnAccentOrDialect
  return new Promise(resolve => {
    // Create a nice custom prompt box
    // The returned/resolved value will become the folder name for audio files
    // "en_east"; // British
    // "en_west"; // American
  });
}
function letTheIFrameTeachEnglish(){ // Called from within startTeaching()
  targetLanguageReadsLeftToRightOrRightToLeft = "ltr"; // See openFirstLesson() to find how this is saved to localStorage
  langCodeForAnnyang = "en";
  // DECIDE!!! Should different dialects|accents of the same language use the same progress save slot???
  // DECISION: Yes.
  if (!savedProgress.en) { // if it doesn't exist » CAUTION: The key name must match langCodeForTeachingFilePaths
    savedProgress.en = {}; console.log("Create a new save slot for "+langCodeForTeachingFilePaths.substring(0,2)); // Create an object to fill and save later ,,, Will exist AT PARENT LEVEL unless passed and shared via localStorage!
    saveJSON = JSON.stringify(savedProgress);
    localStorage.setItem("memoryCard", saveJSON); // Now it exists on the memory card, accessible by both parent and iframe
    openFirstLesson();
  } else { // User must have used the [learn another language] bilingual button and now wants to continue a previously studied language
    openFirstLesson("returning"); console.log("Previously saved progress exists for "+langCodeForTeachingFilePaths.substring(0,2));
  }
}


/*___________Navigate to first lesson_____________*/
function openFirstLesson(freshNewOrReturning) {
  console.log("openFirstLesson() fired - navigating to...");
  ////startTheTimerToSeeIfNextLessonLoadsFastEnough(); // Don't need this because blank.html beforeunload will handle it instead
  // Save language choice
  localStorage.theLanguageUserWasLearningLastTimeToSetFilePaths = langCodeForTeachingFilePaths;
  localStorage.theLanguageUserWasLearningLastTimeToSetAnnyang = langCodeForAnnyang;
  localStorage.theLanguageUserWasLearningReadsLTRorRTL = targetLanguageReadsLeftToRightOrRightToLeft;
  // CANCELLED localStorage.theLanguageUserWasLearningIsWrittenWithoutSpaces = targetLanguageIsWrittenWithoutSpaces;

  // Set language
  if (annyang) {
    annyang.setLanguage(langCodeForAnnyang); // Firefox v60's and v70's won't let buttons function unless this is wrapped in an if (annyang){} like this.
    // SAFARI BUG: Safari does not update the recognition.lang before returning at least one wrong result >>> Keeps listening for the last language that was set before being changed with setLanguage()
    if (isApple) {
      annyang.abort();
      setTimeout(function () { annyang.start(); }, 150); // NOTE: annyang.resume() equals annyang.start()
      setTimeout(function () { annyang.setLanguage(langCodeForAnnyang); }, 300);
      setTimeout(function () { annyang.abort();  }, 450); //Try to force update
    }
  }

  setTimeout(function() {
    // Hide the welcome screen ( <<choose the language you want to learn>> screen's menu-div)
    mainInParent.style.left = "8000px";   // Used to be    document.getElementById('fullViewportPositionFixedDivAsContainerOfTheMenu').style.left = "8000px";
    // Check if this particular language was studied or viewed before
    if (freshNewOrReturning == "returning") {
      console.log("...the progress screen");
      goToProgressChart(); // goToProgressChart() handles the situation if device is offline
    } else { // fresh new user
      console.log("...the first lesson");
      // Display the first lesson
      pathOfWhatWillBeDisplayedUnlessInternetConnectivityIsLost = "/lessons_in_iframes/level_1/unit_1/lesson_1/index.html"; // See js_for_online_and_offline_modes
      if (internetConnectivityIsNiceAndUsable) {
        ayFreym.src = pathOfWhatWillBeDisplayedUnlessInternetConnectivityIsLost; // Load immediately; don't wait for [Ok, that's good] being touched/clicked in the dialog/info-box
      } else { console.warn("Navigation attempt to LESSON111 despite being OFFLINE (detected by openFirstLesson)");
        if (localStorage.getItem("commonJSandCSSfilesForAllLessonsCachedSuccessfully")) { // See js_for_cache_handling/0_parent_initial_load_and_111
          if (localStorage.getItem("lesson111CommonFilesCachedSuccessfully")) { // See js_for_cache_handling/0_parent_initial_load_and_111
            if (localStorage.getItem("lesson111FilesFor-"+langCodeForTeachingFilePaths+"-CachedSuccessfully")) { // See js_for_cache_handling/0_parent_initial_load_and_111
               console.warn("All assets for lesson 111 are cached and READY! Therefore, will try to proceed");
              ayFreym.src = pathOfWhatWillBeDisplayedUnlessInternetConnectivityIsLost; // Try the service-worker offline magic
            } else { goToSorryPage(); }
          } else { goToSorryPage(); }
        } else { goToSorryPage(); }
        // --
        function goToSorryPage() { ayFreym.src = "/user_interface/screens/"+userInterfaceLanguage+"/you_are_offline.html"; }
      }



      /* DEPRECATE or not?
      if (isSafari && !localStorage.safariHowToPermanentlyAllowMicAlertIsAlreadyDisplayed) {
        // HANDLE LATER: When iPhone user runs the app from his homescreen THERE IS NO ADDRESS BAR and it's FULLSCREEN
        // So THE MESSAGE MUST NOT be about specific single web site mic allow method
        // Another way to permanently allow mic is by going to iPhone device settings->Safari settings->Microphone and allowing mic for all web sites BUT THAT'S TROUBLESOME
        alert(safariHowToPermanentlyAllowMicP.innerHTML); // See js_for_info_boxes_in_parent
        localStorage.safariHowToPermanentlyAllowMicAlertIsAlreadyDisplayed = "yes";
        ayFreym.src = "/lessons_in_iframes/level_1/unit_1/lesson_1/index.html";
      } else {
        ayFreym.src = "/lessons_in_iframes/level_1/unit_1/lesson_1/index.html";
      }
      */
    }
  },50); // Unnoticable tiny delay

  // Make the loading animation appear (i.e. bring the preloader) immediately without fading
  // add("addThisClassToRevealThePreloader") is not used here because user is about to see the very first lesson (water) and we want that to happen asap (not after 1.5s of animation time)
  // removing "addThisClassToHideThePreloader" is enough to display it suddenly
  preloadHandlingDiv.classList.remove("addThisClassToHideThePreloader"); // It was added with window.load See css_for_the_container_parent_html,,, Should be 500ms if not changed.

} // End of openFirstLesson
