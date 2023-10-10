"use strict";
// Code written by Manheart Earthman=B. A. Bilgekılınç Topraksoy=土本 智一勇夫剛志
// This file MAY NOT BE MODIFIED WITHOUT CONSENT VIA OFFICIAL AUTHORIZATION

const allNavElements = document.getElementsByTagName('NAV');
// -
let hoverProgress;
let clickProgress;
let listOfAllSoundsInThisLesson;
window.addEventListener("DOMContentLoaded",function () { // ACTUALLY: We don't need DOMContentLoaded as long as progress.js is listed after js_for_all_iframed_lesson_htmls.js, yet here we make it double safe
  // -
  // soundFileFormat exists in js_for_all_iframed_lesson_htmls and is copied from js_for_different_browsers_and_devices which is at the parent level
  hoverProgress = new parent.Howl({  src: ["/user_interface/sounds/progress_chart_hover."+soundFileFormat]  });
  clickProgress = new parent.Howl({  src: ["/user_interface/sounds/progress_chart_click."+soundFileFormat]  });
  //
  listOfAllSoundsInThisLesson = [
    hoverProgress,
    //clickProgress // EXCEPTION: See unloadThatLastSoundWhichCannotBeUnloadedNormally
  ];

  // Unload sounds » Same method with every lesson's own js
  function unloadTheSoundsOfThisLesson() { // See onbeforeunload in js_for_all_iframed_lesson_htmls
    for (let i = 0; i < listOfAllSoundsInThisLesson.length; i++) {
        const snd = listOfAllSoundsInThisLesson[i]; snd.unload();
        // As of August 2023 there is only one sound but that may change when [SHOW NEXT/PREVIOUS SCREEN] buttons are added
    }
    parent.unloadThatLastSoundWhichCannotBeUnloadedNormally(clickProgress); // Exists in js_for_navigation_handling,,, unloads the sound after 5s
  }

  // HANDLE ALL SOUNDS
  let local_i_in_progress; // var i was already or could be declared somewhere else
  for (local_i_in_progress = 0; local_i_in_progress < allNavElements.length; local_i_in_progress++)
  {
    if (deviceDetector.device == "desktop") {
      allNavElements[local_i_in_progress].addEventListener("mouseenter", mouseEnterProgressF);
      allNavElements[local_i_in_progress].addEventListener("mousedown", mouseDownProgressF);
    } else {
      allNavElements[local_i_in_progress].addEventListener("touchstart", touchStartProgressF);
      allNavElements[local_i_in_progress].addEventListener("touchend", touchEndProgressF);
    }
  }
  // HANDLE ALL NAVIGATIONS


  if (deviceDetector.isMobile) {
    //handleAllNavigationsByTOUCHENDs(); // Deprecate?
    handleAllNavigationToLessons("touchend");
  } else {
    //handleAllNavigationsByMOUSEUPs(); // Deprecate?
    handleAllNavigationToLessons("mouseup");
  }

  // -
},{once:true});

function mouseEnterProgressF() { hoverProgress.play(); } // Must display "YOUR PREVIOUS PROGRESS HAS BEEN LOADED" to unlock sound and prevent [sound flood-explosions]
function mouseDownProgressF()  { clickProgress.play(); }
function touchStartProgressF(event) { event.preventDefault(); // See stopPropagation INLINE
  hoverProgress.play();
} // Use mouseenter sound for touchstart
function touchEndProgressF(event)   { event.preventDefault(); // See stopPropagation INLINE
  clickProgress.play();
}

/* ___ Viewing the progress_chart RESETS difficulty adjustment for whatever game user was trying to win ___ */
// NEVER USED as of August 2023: sessionStorage.userHasTriedToWinButFailedThisManyTimesAlready = "0"; // Not used in any lesson as of March 2023

/* ___See js_for_every_single_html.js to find how MEMORY CARD IS READ___ */
const studiedLangCode = parent.langCodeForTeachingFilePaths.substr(0,2);
// NEVER USED as of August 2023: const mainInProgress = document.getElementsByTagName('MAIN')[0];
const lesson111 = document.getElementById('1_1_1');
const lesson112 = document.getElementById('1_1_2');
const lesson113 = document.getElementById('1_1_3');
const lesson114 = document.getElementById('1_1_4');
const lesson121 = document.getElementById('1_2_1');
const lesson122 = document.getElementById('1_2_2');
const lesson123 = document.getElementById('1_2_3');
const lesson124 = document.getElementById('1_2_4');
const lesson131 = document.getElementById('1_3_1');
const lesson132 = document.getElementById('1_3_2');
const lesson133 = document.getElementById('1_3_3');
const lesson134 = document.getElementById('1_3_4');

const lesson211 = document.getElementById('2_1_1');
const lesson212 = document.getElementById('2_1_2');
const lesson213 = document.getElementById('2_1_3');
const lesson214 = document.getElementById('2_1_4');
const lesson221 = document.getElementById('2_2_1');
const lesson222 = document.getElementById('2_2_2');
const lesson223 = document.getElementById('2_2_3');
const lesson224 = document.getElementById('2_2_4');
const lesson231 = document.getElementById('2_3_1');
const lesson232 = document.getElementById('2_3_2');
const lesson233 = document.getElementById('2_3_3');
const lesson234 = document.getElementById('2_3_4');

const lesson311 = document.getElementById('3_1_1');
const lesson312 = document.getElementById('3_1_2');
const lesson313 = document.getElementById('3_1_3');
const lesson314 = document.getElementById('3_1_4');
const lesson321 = document.getElementById('3_2_1');
const lesson322 = document.getElementById('3_2_2');
const lesson323 = document.getElementById('3_2_3');
const lesson324 = document.getElementById('3_2_4');
const lesson331 = document.getElementById('3_3_1');
const lesson332 = document.getElementById('3_3_2');
const lesson333 = document.getElementById('3_3_3');
const lesson334 = document.getElementById('3_3_4');

if (parent.savedProgress[studiedLangCode].lesson_WATER_IsViewed) {  lesson111.classList.add("thisLessonHasBeenViewedButNotCompleted");  }
if (parent.savedProgress[studiedLangCode].lesson_WATER_IsCompleted) {  lesson111.classList.add("thisLessonHasBeenCompleted");  } // Override background-color
if (parent.savedProgress[studiedLangCode].lesson_GIVEMEWATER_IsViewed) {  lesson112.classList.add("thisLessonHasBeenViewedButNotCompleted");  }
if (parent.savedProgress[studiedLangCode].lesson_GIVEMEWATER_IsCompleted) {  lesson112.classList.add("thisLessonHasBeenCompleted");  } // Override background-color
if (parent.savedProgress[studiedLangCode].lesson_BREAD_IsViewed) {  lesson113.classList.add("thisLessonHasBeenViewedButNotCompleted");  }
if (parent.savedProgress[studiedLangCode].lesson_BREAD_IsCompleted) {  lesson113.classList.add("thisLessonHasBeenCompleted");  } // Override background-color
if (parent.savedProgress[studiedLangCode].lesson_TAKEBREAD_IsViewed) {  lesson114.classList.add("thisLessonHasBeenViewedButNotCompleted");  }
if (parent.savedProgress[studiedLangCode].lesson_TAKEBREAD_IsCompleted) {  lesson114.classList.add("thisLessonHasBeenCompleted");  } // Override background-color
if (parent.savedProgress[studiedLangCode].lesson_GLASS_IsViewed) {  lesson121.classList.add("thisLessonHasBeenViewedButNotCompleted");  }
if (parent.savedProgress[studiedLangCode].lesson_GLASS_IsCompleted) {  lesson121.classList.add("thisLessonHasBeenCompleted");  }
if (parent.savedProgress[studiedLangCode].lesson_DRINKWATERFROMGLASS_IsViewed) {  lesson122.classList.add("thisLessonHasBeenViewedButNotCompleted");  }
if (parent.savedProgress[studiedLangCode].lesson_DRINKWATERFROMGLASS_IsCompleted) {  lesson122.classList.add("thisLessonHasBeenCompleted");  }
if (parent.savedProgress[studiedLangCode].lesson_SPOON_IsViewed) {  lesson123.classList.add("thisLessonHasBeenViewedButNotCompleted");  }
if (parent.savedProgress[studiedLangCode].lesson_SPOON_IsCompleted) {  lesson123.classList.add("thisLessonHasBeenCompleted");  }
if (parent.savedProgress[studiedLangCode].lesson_EATWITHSPOON_IsViewed) {  lesson124.classList.add("thisLessonHasBeenViewedButNotCompleted");  }
if (parent.savedProgress[studiedLangCode].lesson_EATWITHSPOON_IsCompleted) {  lesson124.classList.add("thisLessonHasBeenCompleted");  }
if (parent.savedProgress[studiedLangCode].lesson_FISH_IsViewed) {  lesson131.classList.add("thisLessonHasBeenViewedButNotCompleted");  }
if (parent.savedProgress[studiedLangCode].lesson_FISH_IsCompleted) {  lesson131.classList.add("thisLessonHasBeenCompleted");  }
if (parent.savedProgress[studiedLangCode].lesson_THEREISAFISHINTHEWATER_IsViewed) {  lesson132.classList.add("thisLessonHasBeenViewedButNotCompleted");  }
if (parent.savedProgress[studiedLangCode].lesson_THEREISAFISHINTHEWATER_IsCompleted) {  lesson132.classList.add("thisLessonHasBeenCompleted");  }
if (parent.savedProgress[studiedLangCode].lesson_TREE_IsViewed) {  lesson133.classList.add("thisLessonHasBeenViewedButNotCompleted");  }
if (parent.savedProgress[studiedLangCode].lesson_TREE_IsCompleted) {  lesson133.classList.add("thisLessonHasBeenCompleted");  }
if (parent.savedProgress[studiedLangCode].lesson_PRIMARYCOLORS_IsViewed) {  lesson134.classList.add("thisLessonHasBeenViewedButNotCompleted");  }
if (parent.savedProgress[studiedLangCode].lesson_PRIMARYCOLORS_IsCompleted) {  lesson134.classList.add("thisLessonHasBeenCompleted");  }
// --------

// handleFadingAndNavigation exists in js_for_the_parent_all_browsers_all_devices
// handleFadingAndNavigation(pathString,true) » true as second parameter means that lesson is offline ready
let lessonCodes = [
  111,112,113,114,
  121,122,123,124,
  131,132,133,134,
  211,212,213,214,
  221,222,223,224,
  231,232,233,234,
  311,312,313,314,
  321,322,323,324,
  331,332,333,334
];
let lessonsAndTheirReadinessForOffline = {
  111:false, 112:false, 113:false, 114:false,
  121:false, 122:false, 123:false, 124:false,
  131:false, 132:false, 133:false, 134:false,
  211:false, 212:false, 213:false, 214:false,
  221:false, 222:false, 223:false, 224:false,
  231:false, 232:false, 233:false, 234:false,
  311:false, 312:false, 313:false, 314:false,
  321:false, 322:false, 323:false, 324:false,
  331:false, 332:false, 333:false, 334:false
};

// Check each lessons readiness for offline
if (localStorage.getItem("commonJSandCSSfilesForAllLessonsCachedSuccessfully")) {
  for (let i = 0; i < lessonCodes.length; i++) {
    if (localStorage.getItem("lesson"+lessonCodes[i]+"CommonFilesCachedSuccessfully")) {
      if (localStorage.getItem("lesson"+lessonCodes[i]+"FilesFor-"+parent.langCodeForTeachingFilePaths+"-CachedSuccessfully")) {
        lessonsAndTheirReadinessForOffline[lessonCodes[i]] = true; // See js_for_the_parent_all_browsers_all_devices » find theLessonIsReadyForOffline
      }
    }
  }
}

/*__Handle Mobile and Desktop separately__*/
function handleAllNavigationToLessons(touchend_or_mouseup) {
  lesson111.addEventListener(touchend_or_mouseup,function () { window.parent.handleFadingAndNavigation("/lessons_in_iframes/level_1/unit_1/lesson_1/index.html",lessonsAndTheirReadinessForOffline[111]); });
  lesson112.addEventListener(touchend_or_mouseup,function () { window.parent.handleFadingAndNavigation("/lessons_in_iframes/level_1/unit_1/lesson_2/index.html",lessonsAndTheirReadinessForOffline[112]); });
  lesson113.addEventListener(touchend_or_mouseup,function () { window.parent.handleFadingAndNavigation("/lessons_in_iframes/level_1/unit_1/lesson_3/index.html",lessonsAndTheirReadinessForOffline[113]); });
  lesson114.addEventListener(touchend_or_mouseup,function () { window.parent.handleFadingAndNavigation("/lessons_in_iframes/level_1/unit_1/lesson_4/index.html",lessonsAndTheirReadinessForOffline[114]); });
  // -
  lesson121.addEventListener(touchend_or_mouseup,function () { window.parent.handleFadingAndNavigation("/lessons_in_iframes/level_1/unit_2/lesson_1/index.html",lessonsAndTheirReadinessForOffline[121]); });
  lesson122.addEventListener(touchend_or_mouseup,function () { window.parent.handleFadingAndNavigation("/lessons_in_iframes/level_1/unit_2/lesson_2/index.html",lessonsAndTheirReadinessForOffline[122]); });
  lesson123.addEventListener(touchend_or_mouseup,function () { window.parent.handleFadingAndNavigation("/lessons_in_iframes/level_1/unit_2/lesson_3/index.html",lessonsAndTheirReadinessForOffline[123]); });
  lesson124.addEventListener(touchend_or_mouseup,function () { window.parent.handleFadingAndNavigation("/lessons_in_iframes/level_1/unit_2/lesson_4/index.html",lessonsAndTheirReadinessForOffline[124]); });
  // -
  lesson131.addEventListener(touchend_or_mouseup,function () { window.parent.handleFadingAndNavigation("/lessons_in_iframes/level_1/unit_3/lesson_1/index.html",lessonsAndTheirReadinessForOffline[131]); });
  lesson132.addEventListener(touchend_or_mouseup,function () { window.parent.handleFadingAndNavigation("/lessons_in_iframes/level_1/unit_3/lesson_2/index.html",lessonsAndTheirReadinessForOffline[132]); });
  lesson133.addEventListener(touchend_or_mouseup,function () { window.parent.handleFadingAndNavigation("/lessons_in_iframes/level_1/unit_3/lesson_3/index.html",lessonsAndTheirReadinessForOffline[133]); });
  lesson134.addEventListener(touchend_or_mouseup,function () { window.parent.handleFadingAndNavigation("/lessons_in_iframes/level_1/unit_3/lesson_4/index.html",lessonsAndTheirReadinessForOffline[134]); });
  // -----
  lesson211.addEventListener(touchend_or_mouseup,function () { window.parent.handleFadingAndNavigation("/lessons_in_iframes/we_are_working_for_new_levels/index.html",lessonsAndTheirReadinessForOffline[211]); });
  lesson212.addEventListener(touchend_or_mouseup,function () { window.parent.handleFadingAndNavigation("/lessons_in_iframes/we_are_working_for_new_levels/index.html",lessonsAndTheirReadinessForOffline[212]); });
  lesson213.addEventListener(touchend_or_mouseup,function () { window.parent.handleFadingAndNavigation("/lessons_in_iframes/we_are_working_for_new_levels/index.html",lessonsAndTheirReadinessForOffline[213]); });
  lesson214.addEventListener(touchend_or_mouseup,function () { window.parent.handleFadingAndNavigation("/lessons_in_iframes/we_are_working_for_new_levels/index.html",lessonsAndTheirReadinessForOffline[214]); });
  // -
  lesson221.addEventListener(touchend_or_mouseup,function () { window.parent.handleFadingAndNavigation("/lessons_in_iframes/we_are_working_for_new_levels/index.html",lessonsAndTheirReadinessForOffline[221]); });
  lesson222.addEventListener(touchend_or_mouseup,function () { window.parent.handleFadingAndNavigation("/lessons_in_iframes/we_are_working_for_new_levels/index.html",lessonsAndTheirReadinessForOffline[222]); });
  lesson223.addEventListener(touchend_or_mouseup,function () { window.parent.handleFadingAndNavigation("/lessons_in_iframes/we_are_working_for_new_levels/index.html",lessonsAndTheirReadinessForOffline[223]); });
  lesson224.addEventListener(touchend_or_mouseup,function () { window.parent.handleFadingAndNavigation("/lessons_in_iframes/we_are_working_for_new_levels/index.html",lessonsAndTheirReadinessForOffline[224]); });
  // -
  lesson231.addEventListener(touchend_or_mouseup,function () { window.parent.handleFadingAndNavigation("/lessons_in_iframes/we_are_working_for_new_levels/index.html",lessonsAndTheirReadinessForOffline[231]); });
  lesson232.addEventListener(touchend_or_mouseup,function () { window.parent.handleFadingAndNavigation("/lessons_in_iframes/we_are_working_for_new_levels/index.html",lessonsAndTheirReadinessForOffline[232]); });
  lesson233.addEventListener(touchend_or_mouseup,function () { window.parent.handleFadingAndNavigation("/lessons_in_iframes/we_are_working_for_new_levels/index.html",lessonsAndTheirReadinessForOffline[233]); });
  lesson234.addEventListener(touchend_or_mouseup,function () { window.parent.handleFadingAndNavigation("/lessons_in_iframes/we_are_working_for_new_levels/index.html",lessonsAndTheirReadinessForOffline[234]); });
  // -----
  lesson311.addEventListener(touchend_or_mouseup,function () { window.parent.handleFadingAndNavigation("/lessons_in_iframes/we_are_working_for_new_levels/index.html",lessonsAndTheirReadinessForOffline[311]); });
  lesson312.addEventListener(touchend_or_mouseup,function () { window.parent.handleFadingAndNavigation("/lessons_in_iframes/we_are_working_for_new_levels/index.html",lessonsAndTheirReadinessForOffline[312]); });
  lesson313.addEventListener(touchend_or_mouseup,function () { window.parent.handleFadingAndNavigation("/lessons_in_iframes/we_are_working_for_new_levels/index.html",lessonsAndTheirReadinessForOffline[313]); });
  lesson314.addEventListener(touchend_or_mouseup,function () { window.parent.handleFadingAndNavigation("/lessons_in_iframes/we_are_working_for_new_levels/index.html",lessonsAndTheirReadinessForOffline[314]); });
  // -
  lesson321.addEventListener(touchend_or_mouseup,function () { window.parent.handleFadingAndNavigation("/lessons_in_iframes/we_are_working_for_new_levels/index.html",lessonsAndTheirReadinessForOffline[321]); });
  lesson322.addEventListener(touchend_or_mouseup,function () { window.parent.handleFadingAndNavigation("/lessons_in_iframes/we_are_working_for_new_levels/index.html",lessonsAndTheirReadinessForOffline[322]); });
  lesson323.addEventListener(touchend_or_mouseup,function () { window.parent.handleFadingAndNavigation("/lessons_in_iframes/we_are_working_for_new_levels/index.html",lessonsAndTheirReadinessForOffline[323]); });
  lesson324.addEventListener(touchend_or_mouseup,function () { window.parent.handleFadingAndNavigation("/lessons_in_iframes/we_are_working_for_new_levels/index.html",lessonsAndTheirReadinessForOffline[324]); });
  // -
  lesson331.addEventListener(touchend_or_mouseup,function () { window.parent.handleFadingAndNavigation("/lessons_in_iframes/we_are_working_for_new_levels/index.html",lessonsAndTheirReadinessForOffline[331]); });
  lesson332.addEventListener(touchend_or_mouseup,function () { window.parent.handleFadingAndNavigation("/lessons_in_iframes/we_are_working_for_new_levels/index.html",lessonsAndTheirReadinessForOffline[332]); });
  lesson333.addEventListener(touchend_or_mouseup,function () { window.parent.handleFadingAndNavigation("/lessons_in_iframes/we_are_working_for_new_levels/index.html",lessonsAndTheirReadinessForOffline[333]); });
  lesson334.addEventListener(touchend_or_mouseup,function () { window.parent.handleFadingAndNavigation("/lessons_in_iframes/we_are_working_for_new_levels/index.html",lessonsAndTheirReadinessForOffline[334]); });
}
/* try to shorten the code
//Works in Chrome
//DEPRECATE if touchend_or_mouseup works on Safari too
function handleAllNavigationsByTOUCHENDs() {
  lesson111.addEventListener("touchend",function () { window.parent.handleFadingAndNavigation("/lessons_in_iframes/level_1/unit_1/lesson_1/index.html",lessonsAndTheirReadinessForOffline[111]); });
  lesson112.addEventListener("touchend",function () { window.parent.handleFadingAndNavigation("/lessons_in_iframes/level_1/unit_1/lesson_2/index.html",lessonsAndTheirReadinessForOffline[112]); });
  lesson113.addEventListener("touchend",function () { window.parent.handleFadingAndNavigation("/lessons_in_iframes/level_1/unit_1/lesson_3/index.html",lessonsAndTheirReadinessForOffline[113]); });
  lesson114.addEventListener("touchend",function () { window.parent.handleFadingAndNavigation("/lessons_in_iframes/level_1/unit_1/lesson_4/index.html",lessonsAndTheirReadinessForOffline[114]); });
  lesson121.addEventListener("touchend",function () { window.parent.handleFadingAndNavigation("/lessons_in_iframes/level_1/unit_2/lesson_1/index.html",lessonsAndTheirReadinessForOffline[121]); });
  lesson122.addEventListener("touchend",function () { window.parent.handleFadingAndNavigation("/lessons_in_iframes/level_1/unit_2/lesson_2/index.html",lessonsAndTheirReadinessForOffline[122]); });
  lesson123.addEventListener("touchend",function () { window.parent.handleFadingAndNavigation("/lessons_in_iframes/level_1/unit_2/lesson_3/index.html",lessonsAndTheirReadinessForOffline[123]); });
  lesson124.addEventListener("touchend",function () { window.parent.handleFadingAndNavigation("/lessons_in_iframes/level_1/unit_2/lesson_4/index.html",lessonsAndTheirReadinessForOffline[124]); });
  lesson131.addEventListener("touchend",function () { window.parent.handleFadingAndNavigation("/lessons_in_iframes/level_1/unit_3/lesson_1/index.html",lessonsAndTheirReadinessForOffline[131]); });
  lesson132.addEventListener("touchend",function () { window.parent.handleFadingAndNavigation("/lessons_in_iframes/level_1/unit_3/lesson_2/index.html",lessonsAndTheirReadinessForOffline[132]); });
  lesson133.addEventListener("touchend",function () { window.parent.handleFadingAndNavigation("/lessons_in_iframes/level_1/unit_3/lesson_3/index.html",lessonsAndTheirReadinessForOffline[133]); });
  lesson134.addEventListener("touchend",function () { window.parent.handleFadingAndNavigation("/lessons_in_iframes/level_1/unit_3/lesson_4/index.html",lessonsAndTheirReadinessForOffline[134]); });
  lesson211.addEventListener("touchend",function () { window.parent.handleFadingAndNavigation("/lessons_in_iframes/we_are_working_for_new_levels/index.html",lessonsAndTheirReadinessForOffline[211]); });
}

function handleAllNavigationsByMOUSEUPs() {
  lesson111.addEventListener("mouseup",function () { window.parent.handleFadingAndNavigation("/lessons_in_iframes/level_1/unit_1/lesson_1/index.html",lessonsAndTheirReadinessForOffline[111]); });
  lesson112.addEventListener("mouseup",function () { window.parent.handleFadingAndNavigation("/lessons_in_iframes/level_1/unit_1/lesson_2/index.html",lessonsAndTheirReadinessForOffline[112]); });
  lesson113.addEventListener("mouseup",function () { window.parent.handleFadingAndNavigation("/lessons_in_iframes/level_1/unit_1/lesson_3/index.html",lessonsAndTheirReadinessForOffline[113]); });
  lesson114.addEventListener("mouseup",function () { window.parent.handleFadingAndNavigation("/lessons_in_iframes/level_1/unit_1/lesson_4/index.html",lessonsAndTheirReadinessForOffline[114]); });
  lesson121.addEventListener("mouseup",function () { window.parent.handleFadingAndNavigation("/lessons_in_iframes/level_1/unit_2/lesson_1/index.html",lessonsAndTheirReadinessForOffline[121]); });
  lesson122.addEventListener("mouseup",function () { window.parent.handleFadingAndNavigation("/lessons_in_iframes/level_1/unit_2/lesson_2/index.html",lessonsAndTheirReadinessForOffline[122]); });
  lesson123.addEventListener("mouseup",function () { window.parent.handleFadingAndNavigation("/lessons_in_iframes/level_1/unit_2/lesson_3/index.html",lessonsAndTheirReadinessForOffline[123]); });
  lesson124.addEventListener("mouseup",function () { window.parent.handleFadingAndNavigation("/lessons_in_iframes/level_1/unit_2/lesson_4/index.html",lessonsAndTheirReadinessForOffline[124]); });
  lesson131.addEventListener("mouseup",function () { window.parent.handleFadingAndNavigation("/lessons_in_iframes/level_1/unit_3/lesson_1/index.html",lessonsAndTheirReadinessForOffline[131]); });
  lesson132.addEventListener("mouseup",function () { window.parent.handleFadingAndNavigation("/lessons_in_iframes/level_1/unit_3/lesson_2/index.html",lessonsAndTheirReadinessForOffline[132]); });
  lesson133.addEventListener("mouseup",function () { window.parent.handleFadingAndNavigation("/lessons_in_iframes/level_1/unit_3/lesson_3/index.html",lessonsAndTheirReadinessForOffline[133]); });
  lesson134.addEventListener("mouseup",function () { window.parent.handleFadingAndNavigation("/lessons_in_iframes/level_1/unit_3/lesson_4/index.html",lessonsAndTheirReadinessForOffline[134]); });
}
*/
