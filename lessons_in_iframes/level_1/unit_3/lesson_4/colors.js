"use strict";
// Code written by Manheart Earthman=B. A. Bilgekılınç Topraksoy=土本 智一勇夫剛志
// UNAUTHORIZED MODIFICATION IS PROHIBITED: You may not change this file without consent



/* __ SAVE PROGRESS TO LOCAL STORAGE __ */
// See js_for_the_parent_all_browsers_all_devices to find how savedProgress.ja savedProgress.zh savedProgress.tr etc are created
const studiedLang = parent.langCodeForTeachingFilePaths.substr(0,2); // en_east en_west will use the same save-slot
// !!! VERY CAREFUL: Watch the lesson name!!!
parent.savedProgress[studiedLang].lesson_PRIMARYCOLORS_IsViewed=true; // Create and add... or overwrite the same thing
parent.saveJSON = JSON.stringify(parent.savedProgress); // Convert
localStorage.setItem("memoryCard", parent.saveJSON); // Save

/* __ TEXT TO BE INJECTED INTO EXPLANATION BOX AT THE END OF LESSON __ */
let whatMustBeKnownAboutColorsAtTheEnd = null; // See what follows after window-load below and also find exitLesson function at the end

// All settings here will depend on the content of the lesson
// SHORTEN CODE by omitting let answerWhite,answerGreen,answerBlue,answerYellow,answerRed,answerBlack; // Get them from txt files
var whiteAndPossibleMisrecognitions;
var greenAndPossibleMisrecognitions;
var blueAndPossibleMisrecognitions;
var yellowAndPossibleMisrecognitions;
var redAndPossibleMisrecognitions;
var blackAndPossibleMisrecognitions;
// CAUTION: parent.langCodeForTeachingFilePaths variable depends on localStorage data being available. See js_for_the_parent_all_browsers_all_devices.js
const filePathForWhite  = "/speech_recognition_answer_key/"+parent.langCodeForTeachingFilePaths+"/1-3-4-white.txt";
const filePathForGreen  = "/speech_recognition_answer_key/"+parent.langCodeForTeachingFilePaths+"/1-3-4-green.txt";
const filePathForBlue   = "/speech_recognition_answer_key/"+parent.langCodeForTeachingFilePaths+"/1-3-4-blue.txt";
const filePathForYellow = "/speech_recognition_answer_key/"+parent.langCodeForTeachingFilePaths+"/1-3-4-yellow.txt";
const filePathForRed    = "/speech_recognition_answer_key/"+parent.langCodeForTeachingFilePaths+"/1-3-4-red.txt";
const filePathForBlack  = "/speech_recognition_answer_key/"+parent.langCodeForTeachingFilePaths+"/1-3-4-black.txt";
// See js_for_every_single_html.js for the headers setting.
fetch(filePathForWhite, myHeaders).then(function(response){return response.text();}).then(function(contentOfTheTxtFile){  whiteAndPossibleMisrecognitions =  contentOfTheTxtFile.split("|");  });
fetch(filePathForGreen, myHeaders).then(function(response){return response.text();}).then(function(contentOfTheTxtFile){  greenAndPossibleMisrecognitions =  contentOfTheTxtFile.split("|");  });
fetch(filePathForBlue,  myHeaders).then(function(response){return response.text();}).then(function(contentOfTheTxtFile){  blueAndPossibleMisrecognitions =   contentOfTheTxtFile.split("|");  });
fetch(filePathForYellow,myHeaders).then(function(response){return response.text();}).then(function(contentOfTheTxtFile){  yellowAndPossibleMisrecognitions = contentOfTheTxtFile.split("|");  });
fetch(filePathForRed,   myHeaders).then(function(response){return response.text();}).then(function(contentOfTheTxtFile){  redAndPossibleMisrecognitions =    contentOfTheTxtFile.split("|");  });
fetch(filePathForBlack, myHeaders).then(function(response){return response.text();}).then(function(contentOfTheTxtFile){  blackAndPossibleMisrecognitions =  contentOfTheTxtFile.split("|");  });

/* ___AUDIO ELEMENTS___ */ //...Sound player (Howler) exists in the parent html. So the path must be relative to the parent html. Not to the framed html.
// Find soundFileFormat in js_for_all_iframed_lesson_htmls
const sayWhite1APath  = "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_3/lesson_4/white_1a."+soundFileFormat;
const sayGreen1APath  = "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_3/lesson_4/green_1a."+soundFileFormat;
const sayBlue1APath   = "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_3/lesson_4/blue_1a."+soundFileFormat;
const sayYellow1APath = "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_3/lesson_4/yellow_1a."+soundFileFormat;
const sayRed1APath    = "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_3/lesson_4/red_1a."+soundFileFormat;
const sayBlack1APath  = "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_3/lesson_4/black_1a."+soundFileFormat;
const sayWhite1A  = new parent.Howl({ src: [sayWhite1APath]  });
const sayGreen1A  = new parent.Howl({ src: [sayGreen1APath]  });
const sayBlue1A   = new parent.Howl({ src: [sayBlue1APath]   });
const sayYellow1A = new parent.Howl({ src: [sayYellow1APath] });
const sayRed1A    = new parent.Howl({ src: [sayRed1APath]    });
const sayBlack1A  = new parent.Howl({ src: [sayBlack1APath]  });

const sayWhite1BPath  = "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_3/lesson_4/white_1b."+soundFileFormat;
const sayGreen1BPath  = "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_3/lesson_4/green_1b."+soundFileFormat;
const sayBlue1BPath   = "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_3/lesson_4/blue_1b."+soundFileFormat;
const sayYellow1BPath = "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_3/lesson_4/yellow_1b."+soundFileFormat;
const sayRed1BPath    = "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_3/lesson_4/red_1b."+soundFileFormat;
const sayBlack1BPath  = "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_3/lesson_4/black_1b."+soundFileFormat;
const sayWhite1B  = new parent.Howl({ src: [sayWhite1BPath]  });
const sayGreen1B  = new parent.Howl({ src: [sayGreen1BPath]  });
const sayBlue1B   = new parent.Howl({ src: [sayBlue1BPath]   });
const sayYellow1B = new parent.Howl({ src: [sayYellow1BPath] });
const sayRed1B    = new parent.Howl({ src: [sayRed1BPath]    });
const sayBlack1B  = new parent.Howl({ src: [sayBlack1BPath]  });

const sayWhite1CPath  = "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_3/lesson_4/white_1c."+soundFileFormat;
const sayGreen1CPath  = "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_3/lesson_4/green_1c."+soundFileFormat;
const sayBlue1CPath   = "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_3/lesson_4/blue_1c."+soundFileFormat;
const sayYellow1CPath = "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_3/lesson_4/yellow_1c."+soundFileFormat;
const sayRed1CPath    = "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_3/lesson_4/red_1c."+soundFileFormat;
const sayBlack1CPath  = "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_3/lesson_4/black_1c."+soundFileFormat;
const sayWhite1C  = new parent.Howl({ src: [sayWhite1CPath]  });
const sayGreen1C  = new parent.Howl({ src: [sayGreen1CPath]  });
const sayBlue1C   = new parent.Howl({ src: [sayBlue1CPath]   });
const sayYellow1C = new parent.Howl({ src: [sayYellow1CPath] });
const sayRed1C    = new parent.Howl({ src: [sayRed1CPath]    });
const sayBlack1C  = new parent.Howl({ src: [sayBlack1CPath]  });

const sayWhite2APath  = "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_3/lesson_4/white_2a."+soundFileFormat;
const sayGreen2APath  = "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_3/lesson_4/green_2a."+soundFileFormat;
const sayBlue2APath   = "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_3/lesson_4/blue_2a."+soundFileFormat;
const sayYellow2APath = "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_3/lesson_4/yellow_2a."+soundFileFormat;
const sayRed2APath    = "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_3/lesson_4/red_2a."+soundFileFormat;
const sayBlack2APath  = "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_3/lesson_4/black_2a."+soundFileFormat;
const sayWhite2A  = new parent.Howl({ src: [sayWhite2APath]  });
const sayGreen2A  = new parent.Howl({ src: [sayGreen2APath]  });
const sayBlue2A   = new parent.Howl({ src: [sayBlue2APath]   });
const sayYellow2A = new parent.Howl({ src: [sayYellow2APath] });
const sayRed2A    = new parent.Howl({ src: [sayRed2APath]    });
const sayBlack2A  = new parent.Howl({ src: [sayBlack2APath]  });

const sayWhite2BPath  = "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_3/lesson_4/white_2b."+soundFileFormat;
const sayGreen2BPath  = "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_3/lesson_4/green_2b."+soundFileFormat;
const sayBlue2BPath   = "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_3/lesson_4/blue_2b."+soundFileFormat;
const sayYellow2BPath = "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_3/lesson_4/yellow_2b."+soundFileFormat;
const sayRed2BPath    = "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_3/lesson_4/red_2b."+soundFileFormat;
const sayBlack2BPath  = "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_3/lesson_4/black_2b."+soundFileFormat;
const sayWhite2B  = new parent.Howl({ src: [sayWhite2BPath]  });
const sayGreen2B  = new parent.Howl({ src: [sayGreen2BPath]  });
const sayBlue2B   = new parent.Howl({ src: [sayBlue2BPath]   });
const sayYellow2B = new parent.Howl({ src: [sayYellow2BPath] });
const sayRed2B    = new parent.Howl({ src: [sayRed2BPath]    });
const sayBlack2B  = new parent.Howl({ src: [sayBlack2BPath]  });

const sayWhite2CPath  = "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_3/lesson_4/white_2c."+soundFileFormat;
const sayGreen2CPath  = "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_3/lesson_4/green_2c."+soundFileFormat;
const sayBlue2CPath   = "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_3/lesson_4/blue_2c."+soundFileFormat;
const sayYellow2CPath = "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_3/lesson_4/yellow_2c."+soundFileFormat;
const sayRed2CPath    = "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_3/lesson_4/red_2c."+soundFileFormat;
const sayBlack2CPath  = "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_3/lesson_4/black_2c."+soundFileFormat;
const sayWhite2C  = new parent.Howl({ src: [sayWhite2CPath]  });
const sayGreen2C  = new parent.Howl({ src: [sayGreen2CPath]  });
const sayBlue2C   = new parent.Howl({ src: [sayBlue2CPath]   });
const sayYellow2C = new parent.Howl({ src: [sayYellow2CPath] });
const sayRed2C    = new parent.Howl({ src: [sayRed2CPath]    });
const sayBlack2C  = new parent.Howl({ src: [sayBlack2CPath]  });

const sayWhite3Path  = "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_3/lesson_4/white_3."+soundFileFormat;
const sayGreen3Path  = "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_3/lesson_4/green_3."+soundFileFormat;
const sayBlue3Path   = "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_3/lesson_4/blue_3."+soundFileFormat;
const sayYellow3Path = "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_3/lesson_4/yellow_3."+soundFileFormat;
const sayRed3Path    = "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_3/lesson_4/red_3."+soundFileFormat;
const sayBlack3Path  = "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_3/lesson_4/black_3."+soundFileFormat;
const sayWhite3  = new parent.Howl({ src: [sayWhite3Path]  });
const sayGreen3  = new parent.Howl({ src: [sayGreen3Path]  });
const sayBlue3   = new parent.Howl({ src: [sayBlue3Path]   });
const sayYellow3 = new parent.Howl({ src: [sayYellow3Path] });
const sayRed3    = new parent.Howl({ src: [sayRed3Path]    });
const sayBlack3  = new parent.Howl({ src: [sayBlack3Path]  });

const mouseEnterTouchStartSound = new parent.Howl({  src: ["/lessons_in_iframes/level_1/unit_3/lesson_4/mouseenter_touchstart."+soundFileFormat]  });
const mouseDownTouchEndSound = new parent.Howl({  src: ["/lessons_in_iframes/level_1/unit_3/lesson_4/mousedown_touchend."+soundFileFormat]  });
const turnSound = new parent.Howl({  src: ["/lessons_in_iframes/level_1/unit_3/lesson_4/turn."+soundFileFormat]  });
const failSound = new parent.Howl({  src: ["/lessons_in_iframes/level_1/unit_3/lesson_4/fail."+soundFileFormat]  });
const findSound = new parent.Howl({  src: ["/lessons_in_iframes/level_1/unit_3/lesson_4/find."+soundFileFormat]  });
const explodeSound = new parent.Howl({  src: ["/lessons_in_iframes/level_1/unit_3/lesson_4/explosion."+soundFileFormat]  });
const setOffSound1 = new parent.Howl({  src: ["/lessons_in_iframes/level_1/unit_3/lesson_4/set_off_1."+soundFileFormat]  });
const setOffSound2 = new parent.Howl({  src: ["/lessons_in_iframes/level_1/unit_3/lesson_4/set_off_2."+soundFileFormat]  });
const setOffSound3 = new parent.Howl({  src: ["/lessons_in_iframes/level_1/unit_3/lesson_4/set_off_3."+soundFileFormat]  });
const finalWinSound = new parent.Howl({  src: ["/lessons_in_iframes/level_1/unit_3/lesson_4/win."+soundFileFormat]  });

/* Sound initialization happens on the parent but the consts exist in frame. SEE js_for_all_iframed_lesson_htmls » FIND onbeforeunload. */
// listOfAllSoundsInThisLesson is also used by pauseTheAppFunction in js_for_the_sliding_navigation_menu
var listOfAllSoundsInThisLesson = [
  //finalWinSound, // EXCEPTION: See unloadThatLastSoundWhichCannotBeUnloadedNormally
  setOffSound3,setOffSound2,setOffSound1,explodeSound,findSound,failSound,turnSound,
  mouseDownTouchEndSound,mouseEnterTouchStartSound,
  sayBlack3,sayRed3,sayYellow3,sayBlue3,sayGreen3,sayWhite3,
  sayBlack2C,sayRed2C,sayYellow2C,sayBlue2C,sayGreen2C,sayWhite2C,
  sayBlack2B,sayRed2B,sayYellow2B,sayBlue2B,sayGreen2B,sayWhite2B,
  sayBlack2A,sayRed2A,sayYellow2A,sayBlue2A,sayGreen2A,sayWhite2A,
  sayBlack1C,sayRed1C,sayYellow1C,sayBlue1C,sayGreen1C,sayWhite1C,
  sayBlack1B,sayRed1B,sayYellow1B,sayBlue1B,sayGreen1B,sayWhite1B,
  sayBlack1A,sayRed1A,sayYellow1A,sayBlue1A,sayGreen1A,sayWhite1A

];
function unloadTheSoundsOfThisLesson() { // See onbeforeunload in js_for_all_iframed_lesson_htmls
  for (let i = 0; i < listOfAllSoundsInThisLesson.length; i++) {
      const snd = listOfAllSoundsInThisLesson[i]; snd.unload();
  }
  parent.unloadThatLastSoundWhichCannotBeUnloadedNormally(finalWinSound); // Exists in js_for_navigation_handling,,, unloads the sound after 5s
}

// List of backside visuals
const imageFiles = [
  '/lessons_in_iframes/level_1/unit_3/lesson_4/gamecard/fish.avif',
  '/lessons_in_iframes/level_1/unit_3/lesson_4/gamecard/bird.avif',
  '/lessons_in_iframes/level_1/unit_3/lesson_4/gamecard/water.avif',
  '/lessons_in_iframes/level_1/unit_3/lesson_4/gamecard/fish.avif',
  '/lessons_in_iframes/level_1/unit_3/lesson_4/gamecard/bird.avif',
  '/lessons_in_iframes/level_1/unit_3/lesson_4/gamecard/water.avif'
];

/* __CONTAINER DIVS__ */
// const main = document.getElementsByTagName('MAIN')[0]; // Cannot use touchstart touchmove listeners with main
// See index.html » const touchArea = document.getElementById('mobileTouchAreaID');
const fullVpDarkBlue = document.getElementById('coverForTheUnchosenOnesID');
const containerOfSingles_A = document.getElementById('singlesDiv1ID');
const containerOfSingles_B = document.getElementById('singlesDiv2ID');
const allSinglesOfFirstSet = containerOfSingles_A.children; // Use children instead of childNodes to ignore HTML comments
const allSinglesOfSecondSet = containerOfSingles_B.children; // Use children instead of childNodes to ignore HTML comments
const theTwoOptions = document.getElementById('chooseRepeatOrPlayDivID');
const listenAgainButton = document.getElementsByTagName('SECTION')[0];
const playTheGameButton = document.getElementsByTagName('SECTION')[1];
const listenAgainTextP = document.getElementById('p1ID');
const areYouSureTextH = document.getElementsByTagName('HEADER')[0];
const playTheGameTextP = document.getElementById('p2ID');

// See index.html » const containerOfTheWholeGame = document.getElementById('allOfTheGameDivID');
const allSixPerfectFitSquares = document.querySelectorAll(".containerForOneOfSixPerfectFitPieces");
const allBackFaces = document.querySelectorAll(".theCardsBackFace");
const allCards = document.querySelectorAll(".containerForRoundedColorCards");

window.addEventListener("DOMContentLoaded",function(){   assignVisualsFunction();   }, { once: true });
function assignVisualsFunction() {
  // Shuffle the imagePairs array to randomize the assignment.
  // parent.console.log(imageFiles); // Works OK
  shuffleArray(imageFiles);
  // parent.console.log(imageFiles); // Works OK
  // Function to shuffle an array using the Fisher-Yates algorithm.
  function shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
      }
  }
  for (let i = 0; i < 6; i++) {
    allBackFaces[i].src = imageFiles[i];
  }
}

/* ___PROGRESSION___ */
// Desktop users can change the speed; mobile users can't. Because the mobile GUI has to stay simple.
window.addEventListener("load",checkIfAppIsPaused, { once: true });
function checkIfAppIsPaused() {
  if (parent.theAppIsPaused) { // See js_for_the_sliding_navigation_menu
    parent.pleaseAllowSound.play(); // Let the wandering user know that the lesson is now ready // See js_for_different_browsers_and_devices
    let unpauseDetector = setInterval(() => {    if (!parent.theAppIsPaused) { clearInterval(unpauseDetector); loadingIsCompleteFunction(); }    }, 500); // NEVER use a SuperInterval here!
  } else { loadingIsCompleteFunction(); }
}

function loadingIsCompleteFunction() {
  if (studiedLang == "ar") { // Display the note about adjectives' GENDER in Arabic.
    const pathOfNotificationAboutGender = "/user_interface/text/"+userInterfaceLanguage+"/1-3-4_arabic_gender.txt";
    fetch(pathOfNotificationAboutGender,myHeaders).then(function(response){return response.text();}).then(function(contentOfTheTxtFile){
      new SuperTimeout(function(){ createAndHandleInfoBoxType1BeforeLessonStarts(); putNotificationTxtIntoThisP1.innerHTML = contentOfTheTxtFile; },501); // See js_for_info_boxes_in_lessons.js
      // createAndHandleInfoBoxType1BeforeLessonStarts() will fire startTheLesson() 1.5 seconds after its OK button is clicked/touched
    });
  } else if (studiedLang == "ja") { // Display the note about adjectives Type1 (i) Type2 (no/na) in Hito. // Ao » Aoi - Aka » Akai - Midori » Midori
    const pathOfNotificationAboutAdjectiveTypes = "/user_interface/text/"+userInterfaceLanguage+"/1-3-4_hito_adjectives.txt";
    fetch(pathOfNotificationAboutAdjectiveTypes,myHeaders).then(function(response){return response.text();}).then(function(contentOfTheTxtFile){
      new SuperTimeout(function(){ createAndHandleInfoBoxType1BeforeLessonStarts(); putNotificationTxtIntoThisP1.innerHTML = contentOfTheTxtFile; },501); // See js_for_info_boxes_in_lessons.js
      // createAndHandleInfoBoxType1BeforeLessonStarts() will fire startTheLesson() 1.5 seconds after its OK button is clicked/touched
    });
  } else if (studiedLang == "??") { // Add other notifications for other languages

  } else {
    startTheLesson(); // Call it now if it was not called from within createAndHandleInfoBoxType1BeforeLessonStarts() in js_for_info_boxes_in_lessons.js
  }
  // ---
  // Get the lesson navigation texts ready ,,, Note: THESE WILL BE VISIBLE WAY AFTER window load
  setTimeout(function () {
    // listenAgainTextP    // areYouSureTextH    // playTheGameTextP
    const pathOfLessonNavigationTexts = "/user_interface/text/"+userInterfaceLanguage+"/1-3-4.txt";
    fetch(pathOfLessonNavigationTexts,myHeaders).then(function(response){return response.text();}).then(function(contentOfTheTxtFile){
      listenAgainTextP.innerHTML = contentOfTheTxtFile.split("|")[0];
      areYouSureTextH.innerHTML = contentOfTheTxtFile.split("|")[1];
      playTheGameTextP.innerHTML = contentOfTheTxtFile.split("|")[2];
      if (needHitoicJapaneseFonts) {
        areYouSureTextH.classList.add("toUseWBR_withCJK","cjkLineHeightAndLetterSpacing"); // See css_for_every_single_html
      }
      // Function to compare and adjust widths of paragraphs to make the buttons equal in size
      function compareAndAdjustWidths() {
          const paragraph1 = listenAgainTextP; const paragraph1Width = paragraph1.clientWidth;
          const paragraph2 = playTheGameTextP; const paragraph2Width = paragraph2.clientWidth;
          // Compare the widths
          if (paragraph1Width > paragraph2Width) {
              paragraph2.style.width = paragraph1Width + 'px'; // Set width of paragraph2 to match paragraph1
          } else if (paragraph1Width < paragraph2Width) {
              paragraph1.style.width = paragraph2Width + 'px'; // Set width of paragraph1 to match paragraph2
          } else {
              // They are the same already! Wow!
          }
      }
      requestAnimationFrame(compareAndAdjustWidths); // Call the function initially // with RAF it is delayed by one frame-moment
      window.addEventListener('resize', compareAndAdjustWidths); // Call the function when window is resized
    });
  }, 3000);
  // ---
  // By the way: Get the end-of-lesson texts ready
  setTimeout(function () { // We don't want a SuperTimeout in this case
    if (studiedLang == "ja") {
      const pathOfLessonEndingNoteAboutColors = "/user_interface/text/"+userInterfaceLanguage+"/1-3-4_on_spectrum_of_colors_ja.txt";
      fetch(pathOfLessonEndingNoteAboutColors,myHeaders).then(function(response){return response.text();}).then(function(contentOfTheTxtFile){
        whatMustBeKnownAboutColorsAtTheEnd = contentOfTheTxtFile;
      });
    } else if (studiedLang == "??") {

    } else {
      // No explanation box will be created as a result of letting whatMustBeKnownAboutColorsAtTheEnd stay null
    }
  }, 5000);
}

function hideThemAllWithTheExceptionOf(array,whoseTurn) {
  for (let i = 0; i < array.length; i++) {   array[i].style.visibility = "hidden";   }
  array[whoseTurn].style.visibility = "visible";
}

let displayingFirstSet = true;
let nowShowingTheSecondSixInsideSecondSet = false;
function startTheLesson() {
  // White is the first color then comes green » blue » yellow » red » black
  // Give time to the preloader to clear
  let initialWait; let proceedTime;
  switch (parent.speedAdjustmentSetting) {
    case "slow": initialWait = 3003; proceedTime = 11000; break;
    case "fast": initialWait = 1001; proceedTime = 5000;  break;
    default:     initialWait = 2002; proceedTime = 8000;
  }
  // -
  if (displayingFirstSet) {
    // NO NEED TO HIDE/UNHIDE as fabrics i.e. the-first-set will never be visible again ,,, first image already visible in index.html
    new SuperTimeout(function () { sayWhite1A.play(); }, initialWait);
    new SuperTimeout(function () { sayWhite1B.play(); }, initialWait + proceedTime*0.33); // 5000 x 0.33 = 1650 // 8000 x 0.33 = 2640 // 11000 x 0.33 = 3630
    new SuperTimeout(function () { sayWhite1C.play(); }, initialWait + proceedTime*0.66);
  }
  else {
    if (!nowShowingTheSecondSixInsideSecondSet) {
      // See listenAgainFunction to find HIDE/UNHIDE algorithm
      new SuperTimeout(function () { sayWhite2A.play(); }, initialWait);
      new SuperTimeout(function () { sayWhite2B.play(); }, initialWait + proceedTime*0.33);
      new SuperTimeout(function () { sayWhite2C.play(); }, initialWait + proceedTime*0.66);
    } else {
      // See listenAgainFunction to find HIDE/UNHIDE algorithm
      new SuperTimeout(function () { sayWhite3.play(); }, initialWait);
      proceedTime = proceedTime * 0.25; // 8000 x 0.25 = 2000
    }
  }
  // -
  new SuperTimeout(showGreen, proceedTime + initialWait);
}

function showGreen() {

  let initialWait; let proceedTime;
  switch (parent.speedAdjustmentSetting) {
    case "slow": initialWait = 3003; proceedTime = 11000; break;
    case "fast": initialWait = 1001; proceedTime = 5000;  break;
    default:     initialWait = 2002; proceedTime = 8000;
  }
  // -
  if (displayingFirstSet) {
    hideThemAllWithTheExceptionOf(allSinglesOfFirstSet,1);
    new SuperTimeout(function () { sayGreen1A.play(); }, initialWait);
    new SuperTimeout(function () { sayGreen1B.play(); }, initialWait + proceedTime*0.33);
    new SuperTimeout(function () { sayGreen1C.play(); }, initialWait + proceedTime*0.66);
  }
  else {
    if (!nowShowingTheSecondSixInsideSecondSet) {
      hideThemAllWithTheExceptionOf(allSinglesOfSecondSet,1);
      new SuperTimeout(function () { sayGreen2A.play(); }, initialWait);
      new SuperTimeout(function () { sayGreen2B.play(); }, initialWait + proceedTime*0.33);
      new SuperTimeout(function () { sayGreen2C.play(); }, initialWait + proceedTime*0.66);
    } else {
      hideThemAllWithTheExceptionOf(allSinglesOfSecondSet,7);
      new SuperTimeout(function () { sayGreen3.play(); }, initialWait);
      proceedTime = proceedTime * 0.25;
    }
  }
  // -
  new SuperTimeout(showBlue, proceedTime + initialWait);
}

function showBlue() {

  let initialWait; let proceedTime;
  switch (parent.speedAdjustmentSetting) {
    case "slow": initialWait = 3003; proceedTime = 11000; break;
    case "fast": initialWait = 1001; proceedTime = 5000;  break;
    default:     initialWait = 2002; proceedTime = 8000;
  }
  // -
  if (displayingFirstSet) {
    hideThemAllWithTheExceptionOf(allSinglesOfFirstSet,2);
    new SuperTimeout(function () { sayBlue1A.play(); }, initialWait);
    new SuperTimeout(function () { sayBlue1B.play(); }, initialWait + proceedTime*0.33);
    new SuperTimeout(function () { sayBlue1C.play(); }, initialWait + proceedTime*0.66);
  }
  else {
    if (!nowShowingTheSecondSixInsideSecondSet) {
      hideThemAllWithTheExceptionOf(allSinglesOfSecondSet,2);
      new SuperTimeout(function () { sayBlue2A.play(); }, initialWait);
      new SuperTimeout(function () { sayBlue2B.play(); }, initialWait + proceedTime*0.33);
      new SuperTimeout(function () { sayBlue2C.play(); }, initialWait + proceedTime*0.66);
    } else {
      hideThemAllWithTheExceptionOf(allSinglesOfSecondSet,8);
      new SuperTimeout(function () { sayBlue3.play(); }, initialWait);
      proceedTime = proceedTime * 0.25;
    }
  }
  // -
  new SuperTimeout(showYellow, proceedTime + initialWait);
}

function showYellow() {

  let initialWait; let proceedTime;
  switch (parent.speedAdjustmentSetting) {
    case "slow": initialWait = 3003; proceedTime = 11000; break;
    case "fast": initialWait = 1001; proceedTime = 5000;  break;
    default:     initialWait = 2002; proceedTime = 8000;
  }
  // -
  if (displayingFirstSet) {
    hideThemAllWithTheExceptionOf(allSinglesOfFirstSet,3);
    new SuperTimeout(function () { sayYellow1A.play(); }, initialWait);
    new SuperTimeout(function () { sayYellow1B.play(); }, initialWait + proceedTime*0.33);
    new SuperTimeout(function () { sayYellow1C.play(); }, initialWait + proceedTime*0.66);
  }
  else {
    if (!nowShowingTheSecondSixInsideSecondSet) {
      hideThemAllWithTheExceptionOf(allSinglesOfSecondSet,3);
      new SuperTimeout(function () { sayYellow2A.play(); }, initialWait);
      new SuperTimeout(function () { sayYellow2B.play(); }, initialWait + proceedTime*0.33);
      new SuperTimeout(function () { sayYellow2C.play(); }, initialWait + proceedTime*0.66);
    } else {
      hideThemAllWithTheExceptionOf(allSinglesOfSecondSet,9);
      new SuperTimeout(function () { sayYellow3.play(); }, initialWait);
      proceedTime = proceedTime * 0.25;
    }
  }
  // -
  new SuperTimeout(showRed, proceedTime + initialWait);
}

function showRed() {

  let initialWait; let proceedTime;
  switch (parent.speedAdjustmentSetting) {
    case "slow": initialWait = 3003; proceedTime = 11000; break;
    case "fast": initialWait = 1001; proceedTime = 5000;  break;
    default:     initialWait = 2002; proceedTime = 8000;
  }
  // -
  if (displayingFirstSet) {
    hideThemAllWithTheExceptionOf(allSinglesOfFirstSet,4);
    new SuperTimeout(function () { sayRed1A.play(); }, initialWait);
    new SuperTimeout(function () { sayRed1B.play(); }, initialWait + proceedTime*0.33);
    new SuperTimeout(function () { sayRed1C.play(); }, initialWait + proceedTime*0.66);
  }
  else {
    if (!nowShowingTheSecondSixInsideSecondSet) {
      hideThemAllWithTheExceptionOf(allSinglesOfSecondSet,4);
      new SuperTimeout(function () { sayRed2A.play(); }, initialWait);
      new SuperTimeout(function () { sayRed2B.play(); }, initialWait + proceedTime*0.33);
      new SuperTimeout(function () { sayRed2C.play(); }, initialWait + proceedTime*0.66);
    } else {
      hideThemAllWithTheExceptionOf(allSinglesOfSecondSet,10);
      new SuperTimeout(function () { sayRed3.play(); }, initialWait);
      proceedTime = proceedTime * 0.25;
    }
  }
  // -
  new SuperTimeout(showBlack, proceedTime + initialWait);
}

function showBlack() {

  let initialWait; let proceedTime;
  switch (parent.speedAdjustmentSetting) {
    case "slow": initialWait = 3003; proceedTime = 11000; break;
    case "fast": initialWait = 1001; proceedTime = 5000;  break;
    default:     initialWait = 2002; proceedTime = 8000;
  }
  // -
  if (displayingFirstSet) {
    hideThemAllWithTheExceptionOf(allSinglesOfFirstSet,5);
    new SuperTimeout(function () { sayBlack1A.play(); }, initialWait);
    new SuperTimeout(function () { sayBlack1B.play(); }, initialWait + proceedTime*0.33);
    new SuperTimeout(function () { sayBlack1C.play(); }, initialWait + proceedTime*0.66);
    new SuperTimeout(startDisplayingTheSecondSet, proceedTime + initialWait);
  }
  else {
    if (!nowShowingTheSecondSixInsideSecondSet) {
      hideThemAllWithTheExceptionOf(allSinglesOfSecondSet,5);
      new SuperTimeout(function () { sayBlack2A.play(); }, initialWait);
      new SuperTimeout(function () { sayBlack2B.play(); }, initialWait + proceedTime*0.33);
      new SuperTimeout(function () { sayBlack2C.play(); }, initialWait + proceedTime*0.66);
    } else {
      hideThemAllWithTheExceptionOf(allSinglesOfSecondSet,11);
      new SuperTimeout(function () { sayBlack3.play(); }, initialWait);
      proceedTime = proceedTime * 0.25;
    }
    new SuperTimeout(goToRepeatOrPlayTheGameChoice, proceedTime + initialWait);
  }
  // -
}

function startDisplayingTheSecondSet() {
  displayingFirstSet = false;
  containerOfSingles_A.classList.add("moveUpAndGoAboveScreenLimit"); // Standard 2s animation » See colors.css
  containerOfSingles_B.classList.add("moveUpFromBelowScreenToCenter"); // Standard 2s animation » See colors.css
  // ??? remove ??? initialPositionBelowTheScreen
  new SuperTimeout(startTheLesson, 2000); // Now that displayingFirstSet is set to false it will display the second set (with white painter)
}
let userHasChosenToListenAgain = false;
let desktopEventListenersAlreadyAdded = false;
function goToRepeatOrPlayTheGameChoice() {
  if (!userHasChosenToListenAgain) {
    containerOfSingles_B.classList.remove("moveUpFromBelowScreenToCenter");
  } else {
    containerOfSingles_B.classList.remove("moveDownFromAboveScreenToCenter");
    theTwoOptions.classList.remove("moveDownFromCenterToBelowScreen");
  }
  containerOfSingles_B.classList.add("moveUpAndGoAboveScreenLimit"); // Standard 2s animation » See colors.css
  theTwoOptions.classList.add("moveUpFromBelowScreenToCenter"); // Standard 2s animation » See colors.css

  if (deviceDetector.isMobile) {
    document.addEventListener('touchend',seeIfFingerLiftWasOnSectionButton);
    function seeIfFingerLiftWasOnSectionButton(event) { event.preventDefault(); // let it propagate
      // parent.console.log("----A finger lift happened----");
      // touches[0] won't work with touchend » ChatGPT says try using changedTouches[0] instead
      // Could easily detect if a section-as-button was hovered or not by checking its classList IF IT WASN'T TOO LATE FOR THAT at the moment of touchend
      const touchX = event.changedTouches[0].clientX;
      const touchY = event.changedTouches[0].clientY;
      const fingerLiftHappenedOnWhateverThisIs = document.elementFromPoint(touchX, touchY);
      // parent.console.log(fingerLiftHappenedOnWhateverThisIs.id + " was the last thing finger touched");
      if (fingerLiftHappenedOnWhateverThisIs.id == "listenAgainButtonID") {
        document.removeEventListener('touchend',seeIfFingerLiftWasOnSectionButton);
        setTimeout(()=> {  listenAgainFunction();  }, 555);
      }
      else if (fingerLiftHappenedOnWhateverThisIs.id == "playTheGameButtonID") {
        document.removeEventListener('touchend',seeIfFingerLiftWasOnSectionButton);
        setTimeout(()=> {  playTheGameFunction();  }, 555);
      }
      else {  } // Do nothing
    }
  } else { // Desktop
    if (!desktopEventListenersAlreadyAdded) { // Fix: Wrap it into a condition block
      listenAgainButton.addEventListener("mouseup", listenAgainFunction); // Bug: Even with once:true it double fires as it keeps adding new instances of the event listener
      playTheGameButton.addEventListener("mouseup", playTheGameFunction,{once:true}); // Bug: Even with once:true it double fires as it keeps adding new instances of the event listener
      desktopEventListenersAlreadyAdded = true;
    }
  }
  // If user clicks|touches REPEAT
  function listenAgainFunction() { // e.stopPropagation(); e.preventDefault(); » Handled in js_for_proceed_buttons
    userHasChosenToListenAgain = true;
    theTwoOptions.classList.remove("moveUpFromBelowScreenToCenter");
    theTwoOptions.classList.add("moveDownFromCenterToBelowScreen"); // 2s animation
    containerOfSingles_B.classList.remove("moveUpAndGoAboveScreenLimit");
    containerOfSingles_B.classList.add("moveDownFromAboveScreenToCenter"); // 2s animation
    // Leave displayingFirstSet unchanged i.e. let it remain false
    // allSinglesOfSecondSet[5].style.visibility = "hidden"; // Reset back from "black" to "white"
    // allSinglesOfSecondSet[0].style.visibility = "visible"; // Reset back from "black" to "white"
    parent.console.log("nowShowingTheSecondSixInsideSecondSet was " + nowShowingTheSecondSixInsideSecondSet);
    nowShowingTheSecondSixInsideSecondSet = !nowShowingTheSecondSixInsideSecondSet; // flip
    parent.console.log("nowShowingTheSecondSixInsideSecondSet is " + nowShowingTheSecondSixInsideSecondSet);
    if (nowShowingTheSecondSixInsideSecondSet) { hideThemAllWithTheExceptionOf(allSinglesOfSecondSet,6); }
    else { hideThemAllWithTheExceptionOf(allSinglesOfSecondSet,0); }

    new SuperTimeout(startTheLesson, 2000);
  }
  // containerOfSingles_A will never be seen again in this session

  // If user clicks|touches PLAY
  function playTheGameFunction() { // e.stopPropagation(); e.preventDefault(); » Handled in js_for_proceed_buttons
    theTwoOptions.classList.remove("moveUpFromBelowScreenToCenter");
    theTwoOptions.classList.add("moveUpAndGoAboveScreenLimit");// 2s animation
    if (document.body.contains(touchArea)) {    touchArea.style.display = "block";    } // MOBILES
    parent.console.log("Get ready to start...");
    sendTheCardsToTheirNewPositions();
    new SuperTimeout(bringTheGameToTheScene, 900);
  }
}

function bringTheGameToTheScene() {
  parent.console.log("...the game");
  // Note: On mobiles containerOfTheWholeGame will be contained by touchArea » On desktops it will be a direct child of document.body
  containerOfTheWholeGame.classList.add("moveUpAndComeToTheCenterOfScreenNORETURN"); // NON-STANDARD 3.5s animation » See colors.css

  if (deviceDetector.isMobile) { // Phones and tablets
    acceptAndHandleScreenTouches(); // See mobile.js
  } else { // Desktops
    acceptAndHandleMouseClicks(); // See desktop.js
  }
}

var driveTheRotationOfThisWithMicVolume = null;
function updateUniqueGraphicsWithNumbersRangingFromZeroToTwenty(useThisToSetRotateY) { // Will fire continuously once startStandardAudioInputVisualization is called
  // Apply transform to the chosen one of allSixPerfectFitSquares » containerForOneOfSixPerfectFitPieces
  // Initial value in css is transform: translateX(0vw) translateY(0vh)
  // TESTED TO SEE if transitionDuration should be decreased » initial value in css is 0.6s // RESULT: Looks OK on Windows-Chrome
  // WATCH THE FUNCTIONS disperse & undoTheDispersion
  if (driveTheRotationOfThisWithMicVolume) { // Prevent console error if the function fires too early
    driveTheRotationOfThisWithMicVolume.style.transform = "rotateY("+(useThisToSetRotateY*4).toFixed(2)+"deg)";
  }
}


let theFirstChoice = null;
let original_zIndex1 = null;
var listOfSuccessfulPronunciations = [];
// let remainingPieces = 6; // Using an array to perform specific checklist is more reliable than counting vague numbers in terms of getting bugproof
let listOfRemainingCards = ["white","green","blue","yellow","red","black"];
function whenCorrectColorIsUtteredForThe_FIRST_Card(theChosenCard,saveThis_zIndex1) {
  turnSound.play();
  if (deviceDetector.isMobile) { // Phones and tablets
    // whenItIsTouched is added at this point but we don't want to remove it yet because of border-width and outline-width
    // Due to whenItIsTouched, the transform scale is 1.12 at this point
    theChosenCard.classList.add("colorCardFlipMobile"); // Is applied to the card that has » containerForRoundedColorCards
    // colorCardFlipMobile picks transform scale from the same final value in whenItIsTouched that is 1.12 » Completes in 1600ms without changing scale
  } else { // Desktops
    // whenItIsClicked is added at this point but we don't want to remove it yet because of border-width and outline-width
    // theChosenCard.classList.remove("whenItIsClicked");
    theChosenCard.classList.add("colorCardFlipDesktop"); // Is applied to the card that has » containerForRoundedColorCards
  }
  // MOVE THIS TO THE TRY AGAIN BLOCK » theChosenCard.firstElementChild.firstElementChild.classList.remove("disappearAtFiftyPercent");
  theChosenCard.firstElementChild.firstElementChild.classList.add("appearAtFiftyPercent");
  theFirstChoice = theChosenCard; // Store
  //parent.console.log("the first choice src is " + theFirstChoice.firstElementChild.firstElementChild.src); // Works OK
  theChosenCard.addEventListener("animationend", (event) => {
    fullVpDarkBlue.onanimationend = () => {
      fullVpDarkBlue.classList.remove("darkenLightenBackground"); // Clean up and get ready to restart
      original_zIndex1 = saveThis_zIndex1; // Only save and do not revert yet » Will revert after the second piece is checked
      parent.console.log("stored z-index value for reversion: " + original_zIndex1);
      // Add event listeners to the remaining elements
      if (deviceDetector.isMobile) { // Phones and tablets
        acceptAndHandleScreenTouches(theChosenCard); // See mobile.js
      } else { // Desktops
        acceptAndHandleMouseClicks(theChosenCard); // See desktop.js
      }
      // IMPORTANT: Make sure this block is run only and only once by removing the event listener
      fullVpDarkBlue.onanimationend = null; // BUGPROOFING: Prevent misfiring multiple times
    };
    fullVpDarkBlue.style.animationPlayState = "running"; // The darkening layer disappears

  },{once:true});
}
function whenCorrectColorIsUtteredForThe_SECOND_Card(theOtherChosenCard,revertToThis_zIndex2) {
  turnSound.play();
  if (deviceDetector.isMobile) { // Phones and tablets
    // whenItIsTouched is added at this point but we don't want to remove it yet because of border-width and outline-width
    // theOtherChosenCard.classList.remove("whenItIsTouched"); // BOTH cards have transform scale 1.12 at this point
    theOtherChosenCard.classList.add("colorCardFlipMobile"); // Is applied to the card that has » containerForRoundedColorCards
    // colorCardFlipMobile picks transform scale from the same final value in whenItIsTouched that is 1.12 » Completes in 1600ms without changing scale
  } else { // Desktops
    // whenItIsClicked is added at this point but we don't want to remove it yet because of border-width and outline-width
    // theOtherChosenCard.classList.remove("whenItIsClicked");
    theOtherChosenCard.classList.add("colorCardFlipDesktop"); // Is applied to the card that has » containerForRoundedColorCards
  }
  // MOVE THIS TO THE TRY AGAIN BLOCK » theOtherChosenCard.firstElementChild.firstElementChild.classList.remove("disappearAtFiftyPercent");
  theOtherChosenCard.firstElementChild.firstElementChild.classList.add("appearAtFiftyPercent");
  //parent.console.log("the second choice src is " + theOtherChosenCard.firstElementChild.firstElementChild.src); // Works OK
  theOtherChosenCard.addEventListener("animationend", (event) => {
    fullVpDarkBlue.onanimationend = () => {
      fullVpDarkBlue.classList.remove("darkenLightenBackground"); // Clean up and get ready to restart
      parent.console.log("Reverting to original_zIndex1: " + original_zIndex1);
      parent.console.log("Reverting to revertToThis_zIndex2: " + revertToThis_zIndex2);
      theFirstChoice.parentNode.style.zIndex = original_zIndex1; // Push back to initial layer order
      theOtherChosenCard.parentNode.style.zIndex = revertToThis_zIndex2; // Push back to initial layer order

      parent.console.log("TIME TO CHECK IF PAIRS MATCH");

      if (theOtherChosenCard.firstElementChild.firstElementChild.src == theFirstChoice.firstElementChild.firstElementChild.src) {
        parent.console.log("CORRECT");
        // play partial success sound
        findSound.play();
        // Reset classes
        // theFirstChoice.classList.remove("scaleUp"); // Looks like it is OK skip this now that both cards will get small and disappear
        // theOtherChosenCard.classList.remove("scaleUp"); // Looks like it is OK skip this now that both cards will get small and disappear
        theFirstChoice.classList.remove("whenItIsClicked"); theFirstChoice.classList.remove("whenItIsTouched"); // Whichever was applied
        theOtherChosenCard.classList.remove("whenItIsClicked"); theOtherChosenCard.classList.remove("whenItIsTouched"); // Whichever was applied
        // ON MOBILE: Now that «whenItIsTouched» is removed «colorCardFlipMobile» is the only thing that is keeping the scale at 1.12 at this point
        // Go to far far away
        requestAnimationFrame(function () {
          requestAnimationFrame(function () {
            parent.console.log("Send the matching pair to far far away");
            // REMEMBER: DUE TO colorCardFlip_______ THE CARDS ARE ALREADY FLIPPED AND MUST STAY FLIPPED
            // SO: whenPairIsFound must start the animation flipped » See colors.css
            theFirstChoice.classList.remove("colorCardFlipDesktop"); theFirstChoice.classList.remove("colorCardFlipMobile"); // Whichever was applied
            theOtherChosenCard.classList.remove("colorCardFlipDesktop"); theOtherChosenCard.classList.remove("colorCardFlipMobile"); // Whichever was applied
            // At this point we must either use transitions or a dedicated animation for mobiles to avoid abrupt change in scale value
            if (deviceDetector.isMobile) {
              theFirstChoice.classList.add("whenPairIsFoundMobile"); // 900ms
              theOtherChosenCard.classList.add("whenPairIsFoundMobile"); // 900ms
            } else {
              theFirstChoice.classList.add("whenPairIsFoundDesktop"); // 900ms
              theOtherChosenCard.classList.add("whenPairIsFoundDesktop"); // 900ms
            }
            // It is OK to let whenPairIsFound stay applied and never get removed from classList
          });
        });

        // No need to remove appearAtFiftyPercent as it will be hidden and will never reapear in this session

        // DANGER! During tests onanimationend fired multiple times due to buggy browser behavior
        theFirstChoice.onanimationend = () => {
          parent.console.log("Setting visibility of the TWO solved pieces to hidden");
          theFirstChoice.parentNode.style.visibility = "hidden"; // To avoid errors we do not change the DOM with something like divElement.remove() here
          theOtherChosenCard.parentNode.style.visibility = "hidden"; // To avoid errors we do not change the DOM with something like divElement.remove() here
          // remainingPieces -= 2; // Use array and perform checklisting to get bugproof
          parent.console.log("Checklist: " + listOfRemainingCards);
          let indexA = listOfRemainingCards.indexOf(theFirstChoice.id);
          if (indexA !== -1) {
              listOfRemainingCards.splice(indexA, 1); // Remove the item if it exists in the array
              parent.console.log(theFirstChoice.id + " has been removed from the list.");
          } else {
              parent.console.warn(theFirstChoice.id + " is not in the array ???"); // This should be impossible
          }
          // -
          let indexB = listOfRemainingCards.indexOf(theOtherChosenCard.id);
          if (indexB !== -1) {
              listOfRemainingCards.splice(indexB, 1); // Remove the item if it exists in the array
              parent.console.log(theOtherChosenCard.id + " has been removed from the list.");
          } else {
              parent.console.warn(theOtherChosenCard.id + " is not in the array ???"); // This should be impossible
          }
          // -
          parent.console.log("Remaining cards are "+listOfRemainingCards);
          checkForWin();
          // IMPORTANT: Make sure this block is run only and only once by removing the event listener
          theFirstChoice.onanimationend = null; // BUGPROOFING: Prevent misfiring multiple times
        };
        // --
        function checkForWin() {
          if (/*remainingPieces*/listOfRemainingCards.length) { // Either 4 or 2 pieces left
            // parent.console.log("There are "+remainingPieces+" unmatched pieces left");
            parent.console.log("There are "+listOfRemainingCards.length+" unmatched pieces left");
            if (/*remainingPieces*/listOfRemainingCards.length == 2) { // No need to shuffle as there are only two cards left
              //---
              if (deviceDetector.isMobile) { acceptAndHandleScreenTouches(); } // See mobile.js
              else { acceptAndHandleMouseClicks(); } // See desktop.js
              //---
            } else { // Shuffle the cards
              //---
              setTimeout(function () { disperse(); }, 1500);
              setTimeout(function () { collectAllCardsAtTheCenter(); }, 1800); // +300
              setTimeout(function () { undoTheDispersion(); }, 2200); // +400
              setTimeout(function () { sendTheCardsToTheirNewPositions(); }, 2500); // +300
              setTimeout(function () {
                if (deviceDetector.isMobile) { // Phones and tablets
                  acceptAndHandleScreenTouches(); // See mobile.js
                } else { // Desktops
                  acceptAndHandleMouseClicks(); // See desktop.js
                }
              }, 2900); // +400
              //---
            }
          } else { // No pieces left
            // WIN
            parent.console.log("WIN!");
            setTimeout(function () {  finalWinSound.play();  }, 1250);

            /* Save progress */
            parent.savedProgress[studiedLang].lesson_PRIMARYCOLORS_IsCompleted=true; // WATCH THE NAME OF THE LESSON!!!
            parent.saveJSON = JSON.stringify(parent.savedProgress); // Convert
            localStorage.setItem("memoryCard", parent.saveJSON); // Save

            activateTheCanvas(); // Get ready to display the fireworks

            let appearTime;
            switch (parent.speedAdjustmentSetting) {   case "slow": appearTime = 3; break; case "fast": appearTime = 1; break; default: appearTime = 2;   }
            fullVpDarkBlue.classList.add("darkenLightenBackground"); fullVpDarkBlue.style.animationDuration = String(appearTime*2)+"s"; // 4s for default speed
            new SuperTimeout(function(){ startTheFireworks(); }, appearTime*500);
            new SuperTimeout(function(){ fullVpDarkBlue.style.animationPlayState = "paused"; }, appearTime*1000); // Paused at halfway » 2000ms at default speed
            // Safety overkill
            setTimeout(function () {
              if (!fireWorksHaveSuccessfullyMade_exitLesson_fire) {
                parent.console.warn("Proceeding to the next lesson with timeout instead of explosion detection");
                exitLesson(true); // true will make it exit asap
              }
            }, 25000);
          }
        }
        // ---

      } else { // THE CHOSEN TWO CARDS HAVE DIFFERENT BACKFACE VISUALS
        parent.console.log("TRY AGAIN");
        failSound.play();
        // Reset classes
        theFirstChoice.classList.remove("scaleUp");
        theOtherChosenCard.classList.remove("scaleUp");
        theFirstChoice.classList.remove("whenItIsClicked"); theFirstChoice.classList.remove("whenItIsTouched"); // Whichever was applied
        theOtherChosenCard.classList.remove("whenItIsClicked"); theOtherChosenCard.classList.remove("whenItIsTouched"); // Whichever was applied
        theFirstChoice.classList.remove("colorCardFlipDesktop"); theFirstChoice.classList.remove("colorCardFlipMobile"); // Whichever was applied
        theOtherChosenCard.classList.remove("colorCardFlipDesktop"); theOtherChosenCard.classList.remove("colorCardFlipMobile"); // Whichever was applied
        // ON MOBILE: When whenItIsTouched and colorCardFlipMobile are both removed, nothing will be left to keep the scale et 1.12
        // Therefore we must either use transition for transform or use a dedicated class for mobile to pick from 1.12
        // Return to normal
        if (deviceDetector.isMobile) {
          theFirstChoice.classList.add("returnToNormalMobile"); // rotateY goes back from 180 to 0
          theOtherChosenCard.classList.add("returnToNormalMobile"); // rotateY goes back from 180 to 0
        } else {
          theFirstChoice.classList.add("returnToNormalDesktop"); // rotateY goes back from 180 to 0
          theOtherChosenCard.classList.add("returnToNormalDesktop"); // rotateY goes back from 180 to 0
        }

        theFirstChoice.firstElementChild.firstElementChild.classList.remove("appearAtFiftyPercent"); // opacity only
        theOtherChosenCard.firstElementChild.firstElementChild.classList.remove("appearAtFiftyPercent"); // opacity only
        theFirstChoice.firstElementChild.firstElementChild.classList.add("disappearAtFiftyPercent"); // opacity only
        theOtherChosenCard.firstElementChild.firstElementChild.classList.add("disappearAtFiftyPercent"); // opacity only

        // Shuffle the cards // See colors.css and find returnToNormal » September2023 it takes 1600ms to complete
        setTimeout(function () { disperse(); }, 2000);
        setTimeout(function () { collectAllCardsAtTheCenter(); }, 2300); // +300
        setTimeout(function () { undoTheDispersion(); }, 2700); // +400
        setTimeout(function () { sendTheCardsToTheirNewPositions(); }, 3000); // +300
        setTimeout(function () {
          if (deviceDetector.isMobile) { // Phones and tablets
            acceptAndHandleScreenTouches(); // See mobile.js
          } else { // Desktops
            acceptAndHandleMouseClicks(); // See desktop.js
          }
          // ---
          theFirstChoice.classList.remove("returnToNormalDesktop"); theFirstChoice.classList.remove("returnToNormalMobile"); // Ready to restart
          theOtherChosenCard.classList.remove("returnToNormalDesktop"); theOtherChosenCard.classList.remove("returnToNormalMobile"); // Ready to restart
          theFirstChoice.firstElementChild.firstElementChild.classList.remove("disappearAtFiftyPercent"); // Ready to restart
          theOtherChosenCard.firstElementChild.firstElementChild.classList.remove("disappearAtFiftyPercent"); // Ready to restart
        }, 3400); // +400
      }
      // BUGPROOFING: Prevent misfiring multiple times
      fullVpDarkBlue.onanimationend = null; // IMPORTANT: Make sure this block is run only and only once by removing the event listener
    }; // End of fullVpDarkBlue.onanimationend
    fullVpDarkBlue.style.animationPlayState = "running"; // The darkening layer disappears
  },{once:true});
}


// ----
const minVwOrVh = -30;
const maxVwOrVh = 30;
const minDifference = 8; // Minimum difference between accepted values
let generatedValuesForLEFT = [];
let generatedValuesForTOP = [];
function generateRandomNumber() { // Generate a random number between minVwOrVh and maxVwOrVh (inclusive of minVwOrVh and maxVwOrVh)
  let randomNumber = Math.floor(Math.random() * (maxVwOrVh - minVwOrVh + 1)) + minVwOrVh;
  return randomNumber;
}
function isValidRandomNumberForLEFT(randomNumber) { // Check if the difference between the new randomNumber and all previously generated values is at least minDifference
  for (const value of generatedValuesForLEFT) {
    if (Math.abs(randomNumber - value) < minDifference) {    return false;    }
  }
  return true;
}
function isValidRandomNumberForTOP(randomNumber) { // Check if the difference between the new randomNumber and all previously generated values is at least minDifference
  for (const value of generatedValuesForTOP) {
    if (Math.abs(randomNumber - value) < minDifference) {    return false;    }
  }
  return true;
}
// ---

let attempts = 0;
function disperse() {
  allSixPerfectFitSquares.forEach((element) => {
    let randomNumber1; let randomNumber2;
    do { randomNumber1 = generateRandomNumber(); attempts++; } while (!isValidRandomNumberForLEFT(randomNumber1) && attempts < 50);
    generatedValuesForLEFT.push(randomNumber1); attempts = 0;
    do { randomNumber2 = generateRandomNumber(); attempts++; } while (!isValidRandomNumberForTOP(randomNumber2) && attempts < 50);
    generatedValuesForTOP.push(randomNumber2); attempts = 0;
    element.style.transform = "translateX("+randomNumber1+"vw) translateY("+randomNumber2+"vh)"; // Find transition-duration in colors.css
  });
  generatedValuesForLEFT = []; generatedValuesForTOP = []; // Reset
}
// --
function undoTheDispersion() {
  allSixPerfectFitSquares.forEach((element) => {
    element.style.transform = "translateX("+0+"vw) translateY("+0+"vh)" ;  // Find transition-duration in colors.css
  });
}

// ---- SHUFFLE AND SEND THE CARDS TO THEIR NEW POSITIONS ----
// Fit in the box with a different order
const xLandscape_yPortrait = [0,180,360]; const yLandscape_xPortrait = [0,180];
// Function to generate a random integer from an array of values
function getRandomFromArray(arr) {
  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
}
// -
function sendTheCardsToTheirNewPositions() {
  const uniqueCoordinates = []; // Initialize an array to store unique coordinates
  // Generate 6 random and unique coordinates
  while (uniqueCoordinates.length < 6) {
    let x; let y;
    if (containerOfTheWholeGame.offsetWidth > containerOfTheWholeGame.offsetHeight) { // Landscape
      x = getRandomFromArray(xLandscape_yPortrait);
      y = getRandomFromArray(yLandscape_xPortrait);
    } else { // Portrait
      x = getRandomFromArray(yLandscape_xPortrait);
      y = getRandomFromArray(xLandscape_yPortrait);
    }
    const coordinate = x + ',' + y;
    // Check if the coordinate is unique
    if (!uniqueCoordinates.includes(coordinate)) {
      uniqueCoordinates.push(coordinate);
    }
  }
  // ---
  for (let i = 0; i < 6; i++) {
    const leftValue = uniqueCoordinates[i].split(",")[0];
    const topValue = uniqueCoordinates[i].split(",")[1];
    allSixPerfectFitSquares[i].style.left = leftValue+"px";  // Find transition-duration in colors.css
    allSixPerfectFitSquares[i].style.top  = topValue+"px";  // Find transition-duration in colors.css
  }
}
function collectAllCardsAtTheCenter() {
  for (let i = 0; i < 6; i++) {
    allSixPerfectFitSquares[i].style.left = "calc(50% - 90px)";  // Find transition-duration in colors.css
    allSixPerfectFitSquares[i].style.top  = "calc(50% - 90px)";  // Find transition-duration in colors.css
  }

}

// ---- LANDSCAPE «-» PORTRAIT ----
// Detect orientation change using resize
let lastRecordedWindowWidth = window.innerWidth; let lastRecordedWindowHeight = window.innerHeight;
console.log("lastRecordedWindowWidth "+lastRecordedWindowWidth);
console.log("lastRecordedWindowHeight "+lastRecordedWindowHeight);
let landscapeOrPortrait = null;
if (lastRecordedWindowWidth>lastRecordedWindowHeight) {
  landscapeOrPortrait = "landscape"; console.log("Starting the game in LANDSCAPE");
} else { // Let a square window be treated as portrait
  landscapeOrPortrait = "portrait"; console.log("Starting the game in PORTRAIT");
}

setTimeout(function () {  window.addEventListener('resize', updateFrameWindowProperties);  }, 1000);
function updateFrameWindowProperties() {
  setTimeout(function () {
    lastRecordedWindowWidth = window.innerWidth; lastRecordedWindowHeight = window.innerHeight;
    if (lastRecordedWindowWidth>lastRecordedWindowHeight) {
      if (landscapeOrPortrait != "landscape") {  handleOrientationChange();  }
      landscapeOrPortrait = "landscape";
    } else {
      if (landscapeOrPortrait != "portrait") {  handleOrientationChange();  }
      landscapeOrPortrait = "portrait";
    }
    // ---
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
  },100); // Wait for retarded browsers
}
function handleOrientationChange() {  sendTheCardsToTheirNewPositions();  }



// ---
function startTheFireworks() {
  //shootThree();
  setTimeout(shootThree,5250); // Let win sound play at least halfway through
}

const canvas = document.getElementById("fireworksCanvas");
const ctx = canvas.getContext("2d");

// Set canvas size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Function to generate random number within a range
function randomRange(min, max) {  return Math.random() * (max - min) + min;  }

let clearanceAdjustmentInterval = null;
let numberOfExplosionsSoFar = 0;
// Firework class
class Firework {
    constructor(shootFromX,shootToY) {
        this.x = randomRange(shootFromX-5, shootFromX+5);
        this.y = canvas.height;
        this.targetX = randomRange(shootFromX-15, shootFromX+15);
        this.targetY = randomRange(shootToY-15, shootToY+15);
        this.radius = 2;
        this.color = "rgb(255, 255, 255)";
    }

    update() {
        this.x = this.x + (this.targetX - this.x) * 0.01;
        this.y = this.y + (this.targetY - this.y) * 0.01;

        if (Math.abs(this.targetY - this.y) <= 25) {
            fireworks.splice(fireworks.indexOf(this), 1);
            createParticles(this.x, this.y);
            parent.console.log("Boom");
            numberOfExplosionsSoFar++;
            if (numberOfExplosionsSoFar>=3) {     exitLesson();     } // See below to find exit times

            if (canVibrate) { navigator.vibrate([250,60,12,70,11,85,10,105,9,130,8,160,7]); }

            if (!clearanceAdjustmentInterval) {
              clearanceAdjustmentInterval = setInterval(increaseClearance,500); // A SuperInterval is not necessary here, no?
            }
        }
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fillStyle = this.color;
        ctx.fill();
    }
}

// Array to store fireworks
const fireworks = [];
// Array to store particles
const particles = [];
let smokeClearingForce = 0.05;
function increaseClearance() {
	smokeClearingForce += 0.01;
  parent.console.log(smokeClearingForce.toFixed(2));
  if(smokeClearingForce>0.23) { clearInterval(clearanceAdjustmentInterval); }
}
// Main animation loop
function activateTheCanvas() {
    canvas.style.display = "block";
    canvas.style.animationName = "revealCanvas"; // See colors.css
    requestAnimationFrame(activateTheCanvas);
    ctx.fillStyle = "rgba(0,0,0,"+smokeClearingForce.toFixed(2)+")"; // CONTROL ALPHA DYNAMICALLY !
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let i = fireworks.length - 1; i >= 0; i--) {
        fireworks[i].update();
        if(fireworks[i]) {fireworks[i].draw();} // Check if it still exists
    }
    for (let i = 0; i < particles.length; i++) {
        particles[i].draw();
        particles[i].update();

        if (particles[i].radius <= 0.001) {
            particles.splice(i, 1);
            i--;
        }
    }
}


function shootThree() { smokeClearingForce = 0.05;
  fireworks.push(new Firework(canvas.width*0.50,canvas.height*0.22)); setOffSound1.play();
  setTimeout(function(){ fireworks.push(new Firework(canvas.width*0.25,canvas.height*0.44)); setOffSound2.play(); },1400);
  setTimeout(function(){ fireworks.push(new Firework(canvas.width*0.75,canvas.height*0.44)); setOffSound3.play(); },1700);
  // explodeSound is in createParticles function
}


// Create particle class
class Particle {
    constructor(x, y, radius, color, velocity) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.velocity = velocity;
        this.opacity = 1;
        this.gravity = 0.005;
    }

    draw() {
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.restore();
    }

    update() {
    	this.velocity.x *= 0.99;
        this.velocity.y *= 0.99;
        this.x += this.velocity.x;
        this.velocity.y += this.gravity;
        this.y += this.velocity.y;
        if(this.opacity>0.1) {this.opacity -= 0.002;}
        this.radius *= 0.99;
    }
}

function createParticles(x, y) {
    explodeSound.play();
    const numParticles = 90;

    for (let i = 0; i < numParticles; i++) {
        const radius = 2.4 + Math.random() * 0.5;
        const color = 'white';
        const speed = 0.1 + Math.random() * 2.5; // Adjust speed as needed

        const angle = Math.random() * Math.PI * 2;
        const velocity = {
            x: Math.cos(angle) * speed,
            y: Math.sin(angle) * speed
        };

        particles.push(new Particle(x, y, radius, color, velocity));
    }
}



// -----
let fireWorksHaveSuccessfullyMade_exitLesson_fire = false;
function exitLesson(isASAP) {

  fireWorksHaveSuccessfullyMade_exitLesson_fire = true;

  // Let progress-save happen as soon as win happens » See above (search for finalWinSound)

  /* GET READY TO EXIT THIS LESSON */
  let endTime;
  switch (parent.speedAdjustmentSetting) { case "slow": endTime = 10000; break;    case "fast": endTime = 5000; break;    default: endTime = 7500; }
  if (isASAP) {  endTime = 1501;  } // We expect that this will never execute
  if (whatMustBeKnownAboutColorsAtTheEnd) { // This means fetch has successfully got the text
    new SuperTimeout(function () {
      createAndHandleInfoBoxType1AmidLesson(); putNotificationTxtIntoThisP2.innerHTML = whatMustBeKnownAboutColorsAtTheEnd;
      // continueLesson() will be fired from within createAndHandleInfoBoxType1AmidLesson()
    }, endTime);
  } else {
    new SuperTimeout(continueLesson, endTime-1500);
  }

} // End of exitLesson

// continueLesson has to be global, yes or no?
function continueLesson() { // Here it means «continue exiting the lesson» or «continue by proceeding to the next lesson»
  // -
  new SuperTimeout(function () {
    // ---
    showGlobyPreloaderBeforeExit(); // 1500ms » See js_for_all_iframed_lesson_htmls AND See css_for_preloader_and_orbiting_circles
    // REMEMBER: iframe.src change makes window.onbeforeunload fire in js_for_all_iframed_lesson_htmls.js which then calls unloadTheSoundsOfThisLesson();
    // Display author's notice3 if this was user's first time finishing this lesson (1-3-4)
    // Otherwise go to lesson 2-1-1
    if (localStorage.donationsAcceptedNoticeHasBeenDisplayedAlready) { // See notice_3/index.html
      parent.pathOfWhatWillBeDisplayedUnlessInternetConnectivityIsLost = "/lessons_in_iframes/level_2/unit_1/lesson_1/index.html"; // See js_for_online_and_offline_modes
    } else {
      parent.pathOfWhatWillBeDisplayedUnlessInternetConnectivityIsLost = "/lessons_in_iframes/level_1/unit_3/notice_3/index.html"; // See js_for_online_and_offline_modes
    }
    // ---
    if (parent.internetConnectivityIsNiceAndUsable) { // See js_for_online_and_offline_modes.js
      new SuperTimeout(function () { parent.ayFreym.src = parent.pathOfWhatWillBeDisplayedUnlessInternetConnectivityIsLost; }, 1500);
    } else { parent.console.warn("THE DEVICE IS OFFLINE (detected at the end of lesson");
      const isCached = checkIfNextLessonIsCachedAndRedirectIfNot(211); // See js_for_all_iframed_lesson_htmls
      // As of October 2023 we are not making 100% certain if assets for author's notice are cached » We expect it will be cached 99.99% of the time if everything for 211 is cached
      if (isCached) { parent.console.warn("WILL TRY TO CONTINUE OFFLINE");
        new SuperTimeout(function() { parent.ayFreym.src = parent.pathOfWhatWillBeDisplayedUnlessInternetConnectivityIsLost; }, 1500);
      }
    }
    // ---
  }, 1500); // If there was a final dialog box then better let it disappear completely before preloader starts appearing
  // -
} // End of continueLesson
