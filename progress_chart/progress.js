// Either defer or use DOMContentLoaded: DEFERRED
// parent.isOrWasViewingProgressChart = true; // Deprecated - See js_for_all_container_parent_htmls and js_for_all_iframed_lesson_htmls

/* Deprecated - MOVED THIS TASK TO js_for_all_iframed_lesson_htmls: Remove PAUSE THE APP ceramic nav button */
// if (parent.containerDivOfTheNavigationMenu.contains(parent.clickToPauseTheAppDiv)) { // Don't break the app
//   parent.containerDivOfTheNavigationMenu.removeChild(parent.clickToPauseTheAppDiv); // TESTED: It works. ,,, also see we_are_working_for_new_levels
// }

const allNavElements = document.getElementsByTagName('NAV');
const hoverProgress = new parent.Howl({  src: ["user_interface/sounds/progress_chart_hover."+parent.audioFileExtension]  });
const clickProgress = new parent.Howl({  src: ["user_interface/sounds/progress_chart_click."+parent.audioFileExtension]  });
let local_i;
for (local_i = 0; local_i < allNavElements.length; local_i++)
{
  if (deviceDetector.device == "desktop") {
    allNavElements[local_i].addEventListener("mouseenter", mouseEnterProgressF);
    allNavElements[local_i].addEventListener("mousedown", mouseDownProgressF);
  } else {
    allNavElements[local_i].addEventListener("touchstart", mouseDownProgressF);
  }
}
function mouseEnterProgressF() { if (firstUserGestureHasUnleashedAudio) {hoverProgress.play();} } // See js_for_every_single_html.js
function mouseDownProgressF() {   clickProgress.play();  }

/* ---
DON'T UNLOAD: In this case click sound needs time to finish playing.
window.addEventListener("beforeunload",unloadSoundsF); // TESTED: On desktops it really fires as expected
function unloadSoundsF() { hoverProgress.unload(); clickProgress.unload(); }
--- */

/* ___See js_for_every_single_html.js to find how MEMORY CARD IS READ___ */
const studiedLangCode = parent.theLanguageUserIsLearningNowToSetFilePaths;
const mainInProgress = document.getElementsByTagName('MAIN')[0];
const lesson111 = document.getElementById('1_1_1');
const lesson112 = document.getElementById('1_1_2');
const lesson113 = document.getElementById('1_1_3');

if (savedProgress[studiedLangCode].lesson_BREAD_IsViewed) {  lesson111.classList.add("thisLessonHasBeenViewedButNotCompleted");  }
if (savedProgress[studiedLangCode].lesson_BREAD_IsCompleted) {  lesson111.classList.add("thisLessonHasBeenCompleted");  } // Override background-color

if (savedProgress[studiedLangCode].lesson_WATER_IsViewed) {  lesson112.classList.add("thisLessonHasBeenViewedButNotCompleted");  }
if (savedProgress[studiedLangCode].lesson_WATER_IsCompleted) {  lesson112.classList.add("thisLessonHasBeenCompleted");  } // Override background-color

if (savedProgress[studiedLangCode].lesson_GIVEMEWATER_IsViewed) {  lesson113.classList.add("thisLessonHasBeenViewedButNotCompleted");  }
if (savedProgress[studiedLangCode].lesson_GIVEMEWATER_IsCompleted) {  lesson113.classList.add("thisLessonHasBeenCompleted");  } // Override background-color

/*__Handle Mobile and Desktop separately__*/
// See js_for_all_iframed_lesson_htmls to find how the "everyThingFadesToBlack" class is removed with "load"
// 700ms "everyThingFadesToBlack" css class must exist at parent level » NOT in this document's css
// See js_for_preload_handling to find handleFadingAndNavigation
if (deviceDetector.isMobile) {
  lesson111.addEventListener("touchstart",function () {
    window.parent.handleFadingAndNavigation('../lessons_in_iframes/level_1/unit_1/lesson_1/index.html');
  });
  lesson112.addEventListener("touchstart",function () {
    window.parent.handleFadingAndNavigation('../lessons_in_iframes/level_1/unit_1/lesson_2/index.html');
  });
  lesson113.addEventListener("touchstart",function () {
    window.parent.handleFadingAndNavigation('../lessons_in_iframes/level_1/unit_1/lesson_3/index.html');
  });
} else {
  lesson111.addEventListener("mouseup",function () {
    window.parent.handleFadingAndNavigation('../lessons_in_iframes/level_1/unit_1/lesson_1/index.html');
  });
  lesson112.addEventListener("mouseup",function () {
    window.parent.handleFadingAndNavigation('../lessons_in_iframes/level_1/unit_1/lesson_2/index.html');
  });
  lesson113.addEventListener("mouseup",function () {
    window.parent.handleFadingAndNavigation('../lessons_in_iframes/level_1/unit_1/lesson_3/index.html');
  });
}

/* MOVED THIS TO js_for_preload_handling because load event doesn't fire as src change terminates the script execution
function handleFadingAndNavigation(srcPath) {
  window.parent.ayFreym.classList.add("everyThingFadesToBlack");
  const orbitingCircles = window.parent.document.getElementById('orbitingCirclesDivID');
  setTimeout(function () {   orbitingCircles.style.display = "flex";   },701);
  setTimeout(function() {
    window.parent.ayFreym.addEventListener('load',frameIsLoadedByProgressChartNav,{ once: true });
    setTimeout(function() {  window.parent.ayFreym.src = srcPath;  },100);
    function frameIsLoadedByProgressChartNav() {
      alert("work?");
      orbitingCircles.style.display = "none";
      window.parent.ayFreym.classList.remove("everyThingFadesToBlack"); window.parent.ayFreym.classList.add("everyThingComesFromBlack");
      setTimeout(function() {  window.parent.ayFreym.classList.remove("everyThingComesFromBlack");  },2701); // 701ms was not enough???
    }
  },750);
}
*/
