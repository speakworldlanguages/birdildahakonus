// Either defer or use DOMContentLoaded: DEFERRED
parent.wasViewingProgressChart = true; // See js_for_all_container_parent_htmls and

/* Remove PAUSE THE APP ceramic nav button */
if (parent.containerDivOfTheNavigationMenu.contains(parent.clickToPauseTheAppDiv)) { // Don't break the app
  parent.containerDivOfTheNavigationMenu.removeChild(parent.clickToPauseTheAppDiv); // TESTED: It works. ,,, also see we_are_working_for_new_levels
}

const allNavElements = document.getElementsByTagName('NAV');
const hoverProgress = new parent.Howl({  src: ["user_interface/sounds/progress_chart_hover."+parent.audioFileExtension]  });
const clickProgress = new parent.Howl({  src: ["user_interface/sounds/progress_chart_click."+parent.audioFileExtension]  });
let i;
for (i = 0; i < allNavElements.length; i++)
{
  if (deviceDetector.device == "desktop") {
    allNavElements[i].addEventListener("mouseenter", mouseEnterProgressF);
    allNavElements[i].addEventListener("mousedown", mouseDownProgressF);
  } else {
    allNavElements[i].addEventListener("touchstart", mouseDownProgressF);
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
if (deviceDetector.isMobile) {
  lesson111.addEventListener("touchstart",function () {
    parent.ayFreym.classList.add("everyThingFadesToBlack");
    setTimeout(function() { parent.ayFreym.src = '../lessons_in_iframes/level_1/unit_1/lesson_1/index.html'; },701);
  });
  lesson112.addEventListener("touchstart",function () {
    parent.ayFreym.classList.add("everyThingFadesToBlack");
    setTimeout(function() { parent.ayFreym.src = '../lessons_in_iframes/level_1/unit_1/lesson_2/index.html'; },701);
  });
  lesson113.addEventListener("touchstart",function () {
    parent.ayFreym.classList.add("everyThingFadesToBlack");
    setTimeout(function() { parent.ayFreym.src = '../lessons_in_iframes/level_1/unit_1/lesson_3/index.html'; },701);
  });
} else {
  lesson111.addEventListener("mouseup",function () {
    parent.ayFreym.classList.add("everyThingFadesToBlack");
    setTimeout(function() { parent.ayFreym.src = '../lessons_in_iframes/level_1/unit_1/lesson_1/index.html'; },701);
  });
  lesson112.addEventListener("mouseup",function () {
    parent.ayFreym.classList.add("everyThingFadesToBlack");
    setTimeout(function() { parent.ayFreym.src = '../lessons_in_iframes/level_1/unit_1/lesson_2/index.html'; },701);
  });
  lesson113.addEventListener("mouseup",function () {
    parent.ayFreym.classList.add("everyThingFadesToBlack");
    setTimeout(function() { parent.ayFreym.src = '../lessons_in_iframes/level_1/unit_1/lesson_3/index.html'; },701);
  });
}
