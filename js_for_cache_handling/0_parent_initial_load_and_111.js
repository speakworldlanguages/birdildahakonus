"use strict";
// Code written by Manheart Earthman=B. A. Bilgekılınç Topraksoy=土本 智一勇夫剛志

// Note that: If service-worker.js intervention is enabled it must also be handled after things are updated here i.e. adding/removing/changing files/assets
// As of SUMMER 2023 The main purpose of caching files to shorten the waiting time between lessons
// Caching for offline mode is not a priority as Speech Recognition doesn't work when offline (even though there might be a hack using const speechRecognitionList = new SpeechGrammarList();)
// As of August 2023 Safari (17.0) does not support SpeechGrammarList
// Check https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition#examples
// Check https://stackoverflow.com/questions/73237370/how-to-chain-caching-cache-your-assets-set-by-set-according-to-their-priority
// For future ideas check adderAll() by Talat Er

// Variables from other js files are used below
// therefore it must fire at least after DOMContentLoaded,,, See -> js_for_different_browsers_and_devices.js
// Better wait for window load for safety
window.addEventListener("load",welcomeScreenCacheHandling,{once:true});
async function welcomeScreenCacheHandling() {
  // ---
  // --- See https://web.dev/cache-api-quick-guide/
  // ---
  if (localStorage.getItem("progressChartShouldBeOfflineCompatibleNow")) {
    // Previously cached » BUT! If it needs to be updated then uncomment the following
    // const august2023cacheIsDeleted = await caches.delete('progress-chart-assets-August2023'); // Uncomment if update is necessary
    if (false /* When new files are ready, replace false with august2023cacheIsDeleted */) {
      // So that the browser will NOT display files from the outdated cache to returning users.
      localStorage.removeItem("progressChartShouldBeOfflineCompatibleNow");
      makeProgressChartOfflineCompatible(); // Recache with the new files
    }
  } else {
    // A previous cache never existed, so try now (either for the first time or retry after failure)
    // Probably OK without setTimeout(afterSomeMilliseconds1,500);
    makeProgressChartOfflineCompatible();
  }
  // ---
  // ---
  // ---
  if (localStorage.getItem("commonJSandCSSfilesForAllLessonsCachedSuccessfully")) {
    // Previously cached » BUT! If it needs to be updated then uncomment the following
    // const august2023cacheIsDeleted = await caches.delete('common-js-css-txt-used-by-lessons-August2023'); // Uncomment if update is necessary
    if (false /* When new files are ready, replace false with august2023cacheIsDeleted */) {
      // So that the browser will NOT display files from the outdated cache to returning users.
      localStorage.removeItem("commonJSandCSSfilesForAllLessonsCachedSuccessfully");
      cacheCommonJSandCSSfilesForAllLessons(); // Recache with the new files
    }
  } else {
    // A previous cache never existed, so try now (either for the first time or retry after failure)
    // Probably OK without setTimeout(afterSomeMilliseconds1,500);
    cacheCommonJSandCSSfilesForAllLessons();
  }
  // ---
  // ---
  // ---
  if (localStorage.getItem("lesson111CommonFilesCachedSuccessfully")) { // Condition: Either no previous attempt exists or none of the previous attempts were successful
    // Previously cached » BUT! If it needs to be updated then uncomment the following
    // const august2023primaryCacheIsDeleted = await caches.delete('1-1-1-primary-assets-for-all-languages-August2023');
    // const august2023secondaryCacheIsDeleted = await caches.delete('1-1-1-secondary-assets-for-all-languages-August2023');
    if (false /* When new files are ready, replace false with august2023primaryCacheIsDeleted || august2023secondaryCacheIsDeleted*/) {
      // So that the browser will NOT display files from the outdated cache to returning users.
      localStorage.removeItem("lesson111CommonFilesCachedSuccessfully");
      cacheLesson111CommonAssetsForAllLanguages(); // Recache with the new files
    }
  } else {
    // Probably OK without setTimeout(afterSomeMilliseconds2,1000);
    cacheLesson111CommonAssetsForAllLanguages(); // Try to cache for the first time or if the previous attempts were unsuccessful
  }
  // ---
  // ---
  // ---
  if (localStorage.getItem("lesson111FilesFor-"+langCodeForTeachingFilePaths+"-CachedSuccessfully")) {
    // Previously cached » BUT! If it needs to be updated then uncomment the following
    // const august2023cacheIsDeleted = caches.delete('1-1-1-assets-for-'+langCodeForTeachingFilePaths+'-August2023');
    if (false /* When new files are ready, replace false with august2023cacheIsDeleted */) {
      // So that the browser will NOT display files from the outdated cache to returning users.
      if (langCodeForTeachingFilePaths) { // If exists and is ready (will be so for returning users)
        localStorage.removeItem("lesson111FilesFor-"+langCodeForTeachingFilePaths+"-CachedSuccessfully")
        cacheLesson111AssetsForTheTargetLanguage(); // Recache with the new files
      }
    }
  } else {
    // Wait for a button touch|click which will eventually call cacheLesson111AssetsForTheTargetLanguage()
    // See js_for_the_parent_all_browsers_all_devices and find setLangCodeForFilePathsAndCacheTheFirstTeachingAssets
  }
  // ---
  // ---
  // ---
} // END OF welcomeScreenCacheHandling

// ASYNC FUNCTIONS FOR GETTING THE FILES READY
// ____________
async function makeProgressChartOfflineCompatible() {
  // Create the folder-like storage slots
  const cacheForTheProgressChart = await caches.open('progress-chart-assets-August2023');
  const listOfEverythingInProgressChart = [
    "/progress_chart/images/1_1_1_water.webp",
    "/progress_chart/images/1_1_2_givemewater.webp",
    "/progress_chart/images/1_1_3_bread.webp",
    "/progress_chart/images/1_1_4_takebread.webp",
    "/progress_chart/images/1_2_1_glass.webp",
    "/progress_chart/images/1_2_2_drinkwaterfromglass.webp",
    "/progress_chart/images/1_2_3_spoon.webp",
    "/progress_chart/images/1_2_4_eatwithspoon.webp",
    "/progress_chart/images/1_3_1_fish.webp",
    "/progress_chart/images/1_3_2_thereexists.webp",
    "/progress_chart/images/not_published_yet.webp",
    "/progress_chart/bilinguals.css",
    "/progress_chart/index.html",
    "/progress_chart/js_for_the_bilingual_return_button.js",
    "/progress_chart/progress.css",
    "/progress_chart/progress.js"
  ];
  // -
  let errorHappened = false;
  try {
    console.log("makeProgressChartOfflineCompatible() will try to cache files...");
    // load
    await cacheForTheProgressChart.addAll(listOfEverythingInProgressChart); console.log("assets for progress chart done");
  } catch (err) {
    console.error(err);
    errorHappened = true;
  } finally {
    if (!errorHappened) {
      console.log("...all files for progress chart have been cached successfully");
      localStorage.setItem("progressChartShouldBeOfflineCompatibleNow", "verygood");
      // Anything else to do?
    }
  } // End of try-catch-finally
}

async function cacheCommonJSandCSSfilesForAllLessons() {
  // Create the folder-like storage slots
  const cacheForCommonJSandCSSandTXTfilesUsedByLessonHTMLs = await caches.open('common-js-css-txt-used-by-lessons-August2023');
  const u = "/user_interface/text/"+userInterfaceLanguage; // See js_for_every_single_html
  // ---
  let listOfCommonJSandCSSandTXTfilesUsedByLessonHTMLs = [
    // Needed in 1-1-1
    "/css_reusables/css_for_every_single_html.css",
    "/css_reusables/css_for_all_iframed_lesson_htmls.css",
    "/css_reusables/css_for_photos_and_videos_teach_a_new_word.css",
    "/css_reusables/css_for_the_glassy_give_up_button.css",
    "/css_reusables/css_for_wavesurfer_microphone_divs.css",
    "/css_reusables/css_for_info_boxes_in_lessons.css",
    "/js_reusables/js_for_every_single_html.js", // CAREFUL!!! It is expected to be updated
    "/js_reusables/js_for_all_iframed_lesson_htmls.js",
    "/js_reusables/js_for_handling_speech_give_up.js",
    "/third_party_js/wavesurfer.min.js",
    "/third_party_js/wavesurfer.microphone.min.js",
    "/js_reusables/js_for_microphone_input_visualization.js",
    "/js_reusables/js_for_info_boxes_in_lessons.js",
    "/js_reusables/supertimeout.js",
    // Needed in 1-1-2
    "/css_reusables/css_for_lessons_with_interactables.css",
    "/css_reusables/css_for_displaying_translation_help.css",
    "/js_reusables/js_for_displaying_translation_help.js",
    // Needed in notice 1
    "/css_reusables/css_for_proceed_buttons.css",
    "/js_reusables/js_for_proceed_buttons.js",
    // user_interface
    // txt
    u+"/0lesson-continue_to_next.txt",
    u+"/0lesson-give_up_and_skip.txt",
    u+"/0lesson-is_paused_message_and_unpause_button.txt",
    u+"/0lesson-ok_i_understand.txt",
    u+"/0lesson-vocabulary_button1_button2.txt",
    // sounds for lessons with speech recognition
    "/user_interface/sounds/glass_button_hover.webm",
    "/user_interface/sounds/glass_button_click.webm",
    // sounds for notice1 and notice2
    "/user_interface/sounds/looping_bgm_stereo_therapy.webm",
    "/user_interface/sounds/section_as_button_hover.webm",
    "/user_interface/sounds/section_as_button_click.webm",
    // info boxes in lessons
    "/user_interface/sounds/notification1_appear.webm",
    "/user_interface/sounds/notification1_close.webm",
    "/user_interface/sounds/notification3_appear.webm",
    "/user_interface/sounds/notification3_close.webm",
    // js_for_proceed_buttons
    "/user_interface/sounds/address_as_button_hover.webm",
    "/user_interface/sounds/address_as_button_click.webm",
    // sounds for progress_chart - OTHER ASSETS FOR progress_chart ARE EXPECTED TO BE UPDATED FREQUENTLY
    "/user_interface/sounds/progress_chart_click.webm",
    "/user_interface/sounds/progress_chart_hover.webm",

    // fonts
    // ???
    // images added conditionally depending on device
    // screens
    "/user_interface/screens/"+userInterfaceLanguage+"/you_are_offline.html",
    // blank html
    "/user_interface/blank.html"
  ];
  if (isAndroid) { listOfCommonJSandCSSandTXTfilesUsedByLessonHTMLs.push(u+"/0lesson-android_speech_timing.txt"); }
  if (deviceDetector.isMobile) {
    listOfCommonJSandCSSandTXTfilesUsedByLessonHTMLs.push(
      "/user_interface/images/touch_and_drag_man_2x_scale.webp" // js_for_displaying_translation_help
    );
  } else { // desktop
    listOfCommonJSandCSSandTXTfilesUsedByLessonHTMLs.push(
      "/user_interface/images/cursor/default_cursor.png", // css_for_every_single_html and js_for_every_single_html and js_for_all_iframed_lesson_htmls and css_for_photos_and_videos_teach_a_new_word and css_for_proceed_buttons
      "/user_interface/images/cursor/button_cursor.png", // css_for_displaying_translation_help and css_for_the_glassy_give_up_button
      "/user_interface/images/cursor/vibrant_cursor.png", // css_for_info_boxes_in_lessons
      "/user_interface/images/cursor/glow_cursor.png", // css_for_info_boxes_in_lessons
      "/user_interface/images/reveal_help_desktop_teacher_off.webp", // js_for_displaying_translation_help
      "/user_interface/images/reveal_help_desktop_teacher_on.webp" // js_for_displaying_translation_help
    );
  }
  // ----
  if (isApple) {
    listOfCommonJSandCSSandTXTfilesUsedByLessonHTMLs.push("/user_interface/images/now_you_say_it_to_speech_recognition.avif");
  } else {
    listOfCommonJSandCSSandTXTfilesUsedByLessonHTMLs.push("/user_interface/images/now_you_say_it_to_speech_recognition.webp");
  }
  // -
  let errorHappened = false;
  try {
    console.log("cacheCommonJSandCSSfilesForAllLessons() will try to cache files...");
    // load
    await cacheForCommonJSandCSSandTXTfilesUsedByLessonHTMLs.addAll(listOfCommonJSandCSSandTXTfilesUsedByLessonHTMLs); console.log("common JS&CSS for lessons done");
  } catch (err) {
    console.error(err);
    errorHappened = true;
  } finally {
    if (!errorHappened) {
      console.log("all js&css for lessons have been cached successfully");
      localStorage.setItem("commonJSandCSSfilesForAllLessonsCachedSuccessfully", "verygood");
      // Anything else to do?
    }
  } // End of try-catch-finally

} // End of cacheCommonJSandCSSfilesForAllLessons

// ____________
async function cacheLesson111CommonAssetsForAllLanguages() {
  // Create the folder-like storage slots
  const primaryCacheForLesson_1_1_1 = await caches.open('1-1-1-primary-assets-for-all-languages-August2023');
  const secondaryCacheForLesson_1_1_1 = await caches.open('1-1-1-secondary-assets-for-all-languages-August2023');

  const listOfPrimaryAssetsForLesson_1_1_1 = [
    "/lessons_in_iframes/level_1/unit_1/lesson_1/1a.avif",
    "/lessons_in_iframes/level_1/unit_1/lesson_1/1b.avif",
    "/lessons_in_iframes/level_1/unit_1/lesson_1/2a.avif",
    "/lessons_in_iframes/level_1/unit_1/lesson_1/2b.avif",
    "/lessons_in_iframes/level_1/unit_1/lesson_1/3a.avif",
    "/lessons_in_iframes/level_1/unit_1/lesson_1/3b.avif",
    "/lessons_in_iframes/level_1/unit_1/lesson_1/c1.avif",
    "/lessons_in_iframes/level_1/unit_1/lesson_1/c2.avif",
    "/lessons_in_iframes/level_1/unit_1/lesson_1/c3.avif",
    "/lessons_in_iframes/level_1/unit_1/lesson_1/c4.avif",
    "/lessons_in_iframes/level_1/unit_1/lesson_1/c5.avif",
    "/lessons_in_iframes/level_1/unit_1/lesson_1/c6.avif",
    "/lessons_in_iframes/level_1/unit_1/lesson_1/c7.avif",
    "/lessons_in_iframes/level_1/unit_1/lesson_1/c8.avif",
    "/lessons_in_iframes/level_1/unit_1/lesson_1/c9.avif",
    "/lessons_in_iframes/level_1/unit_1/lesson_1/c10.avif",
    "/lessons_in_iframes/level_1/unit_1/lesson_1/index.html",
    "/lessons_in_iframes/level_1/unit_1/lesson_1/water.js",
    "/lessons_in_iframes/level_1/unit_1/lesson_1/what_water_sounds_like_1.webm",
    "/lessons_in_iframes/level_1/unit_1/lesson_1/what_water_sounds_like_2.webm",
    "/lessons_in_iframes/level_1/unit_1/lesson_1/what_water_sounds_like_3.webm",
    "/lessons_in_iframes/level_1/unit_1/lesson_1/what_water_sounds_like_4.webm",
    "/lessons_in_iframes/level_1/unit_1/lesson_1/what_water_sounds_like_5.webm"
  ];

  let listOfSecondaryAssetsForLesson_1_1_1 = [
    "/lessons_in_iframes/level_1/unit_1/lesson_1/waterfall1.webp",
    "/lessons_in_iframes/level_1/unit_1/lesson_1/waterfall2.webp"
  ];
  if (isApple || isFirefox) { // See js_for_all_iframed_lesson_htmls and then js_for_different_browsers_and_devices
    listOfSecondaryAssetsForLesson_1_1_1.push(
      "/lessons_in_iframes/level_1/unit_1/lesson_1/v1_h264.mp4",
      "/lessons_in_iframes/level_1/unit_1/lesson_1/v2_h264.mp4"
    );
  } else {
    listOfSecondaryAssetsForLesson_1_1_1.push(
      "/lessons_in_iframes/level_1/unit_1/lesson_1/v1_vp9.webm",
      "/lessons_in_iframes/level_1/unit_1/lesson_1/v2_vp9.webm"
    );
  }
  // ---
  let errorHappened = false;
  try {
    console.log("cacheLesson111CommonAssetsForAllLanguages() will try to cache TWO groups of files...");
    // load first group
    await primaryCacheForLesson_1_1_1.addAll(listOfPrimaryAssetsForLesson_1_1_1); console.log("group 1 done");
    // then load next group
    await secondaryCacheForLesson_1_1_1.addAll(listOfSecondaryAssetsForLesson_1_1_1); console.log("group 2 done");
  } catch(err) {
    console.error(err);
    errorHappened = true;
  } finally {
    if (!errorHappened) {
      console.log("...and all groups have been cached successfully");
      localStorage.setItem("lesson111CommonFilesCachedSuccessfully", "great"); // OR localStorage.lesson111CommonFilesCachedSuccessfully = "cool";
      // Anything else to do?
    }
  } // End of try-catch-finally

} // END OF cacheLesson111CommonAssetsForAllLanguages()

// ____________
// This must not fire before langCodeForTeachingFilePaths in js_for_the_parent_all_browsers_all_devices has a value set and ready
async function cacheLesson111AssetsForTheTargetLanguage() {
  // See js_for_the_parent_all_browsers_all_devices and find setLangCodeForFilePathsAndCacheTheFirstTeachingAssets

  if (localStorage.getItem("lesson111FilesFor-"+langCodeForTeachingFilePaths+"-CachedSuccessfully")) {
    // Already cached
  } else {

    const cacheForTargetLanguage_1_1_1 = await caches.open('1-1-1-assets-for-'+langCodeForTeachingFilePaths+'-August2023'); // Create a new slot

    let listOfFilesForTargetLanguage_1_1_1 = [
      "/audio_files_for_listening/"+langCodeForTeachingFilePaths+"/level_1/unit_1/lesson_1/water_1-2.webm",
      "/audio_files_for_listening/"+langCodeForTeachingFilePaths+"/level_1/unit_1/lesson_1/water_3.webm",
      "/audio_files_for_listening/"+langCodeForTeachingFilePaths+"/level_1/unit_1/lesson_1/water_4-5.webm",
      "/audio_files_for_listening/"+langCodeForTeachingFilePaths+"/level_1/unit_1/lesson_1/water_6.webm",
      "/audio_files_for_listening/"+langCodeForTeachingFilePaths+"/level_1/unit_1/lesson_1/water_7-8.webm",
      "/speech_recognition_answer_key/"+langCodeForTeachingFilePaths+"/1-1-1-water.txt"
    ];
    const u = "/user_interface/text/"+userInterfaceLanguage; // See js_for_every_single_html
    switch (langCodeForTeachingFilePaths.substring(0,2)) { // Using substring, we trim "tr_istanbul" to "tr", "zh_putonghua" to "zh" etc
      case "ar":
        listOfFilesForTargetLanguage_1_1_1.push(u+"/1-1-1_arabic_tanween.txt");
        break;
      case "ja":
        listOfFilesForTargetLanguage_1_1_1.push(u+"/1-1-1_hito_mizu_omizu.txt");
        break;
      case "zh":
        listOfFilesForTargetLanguage_1_1_1.push(u+"/1-1-1_ren_intonation.txt");
        break;
      default: // Nothing
    }

    let errorHappened = false;
    try {
      console.log("Caching files for 1-1-1 "+langCodeForTeachingFilePaths+" ...");
      await cacheForTargetLanguage_1_1_1.addAll(listOfFilesForTargetLanguage_1_1_1); console.log("done");
    } catch(err) {
      console.error(err);
      errorHappened = true;
    } finally {
      if (!errorHappened) {
        console.log("... and files for 1-1-1 "+langCodeForTeachingFilePaths+" are ready");
        // So that it will skip cache search and never recache
        localStorage.setItem("lesson111FilesFor-"+langCodeForTeachingFilePaths+"-CachedSuccessfully", "cool"); // CANNOT USE THE DOT NOTATION localStorage.lesson111FilesForTargetLanguageCachedSuccessfully = "cool";
      }
    } // End of try-catch-finally

  } // END OF else

} // END OF cacheLesson111AssetsForTheTargetLanguage()




// DEPRECATE or REVIEW const myCache0 = await caches.open('primary-assets-for-running-the-app');
/* DEPRECATE or REVIEW
const myCache2 = await caches.open('primary-assets-for-information-and-about');
const myCache3 = await caches.open('primary-assets-for-progress-chart');
const myCache4 = await caches.open('secondary-assets-for-running-the-app');
const myCache5 = await caches.open('not-for-speed-but-for-offline-support');
*/

/* DEPRECATE or REVIEW
// List of what to download and store in advance
const groupZero = [
  // "/", // New buttons are expected to be added so we want the latest thing to show i.e. don't keep serving a stale outdated version while a fresh thing is available
  // "/index.html", // New buttons are expected to be added so we want the latest thing to show i.e. don't keep serving a stale outdated version while a fresh thing is available

  // CSS files
  "/css_reusables/css_for_info_boxes_in_parent.css",
  "/css_reusables/css_for_preloader_and_orbiting_circles.css",
  "/css_reusables/css_for_sliding_navigation_menu.css",
  "/css_reusables/css_for_the_container_parent_html.css",

  // JS files
  // CONSIDER: if these js files are mature enough to be cached then cache them,,, otherwise let the browser get the latest/freshest version from the server
  // If frequently updated files must be cached for offline support then we must use cache versioning and delete the older ones

  // "/js_reusables/js_for_the_parent_all_browsers_all_devices.js", // Could be updated frequently
  // WARNING: NEVER CACHE THE js_for_handling_cache.js FILE and such files!!!
  // "/js_reusables/js_for_different_browsers_and_devices.js", // Could be updated even though rarely

  "/js_reusables/js_for_handling_fullscreen_mode.js",
  "/js_reusables/js_for_hover_simulation_and_scrollglobe.js",
  "/js_reusables/js_for_icon_and_title_animation.js",
  "/js_reusables/js_for_info_boxes_in_parent.js",
  // "/js_reusables/js_for_redirection_to_the_proper_domain.js", // Let's skip this one because it is expected to be updated many times and we want updates to take effect immediately
  "/js_reusables/js_for_the_sliding_navigation_menu.js",

  // QUESTION: HOW SHOULD three.js and ammo.js be cached ???

  "/third_party_js/annyang.js",
  //USE NON-MINIFIED FULL VERSION of annyang "/third_party_js/annyang.js.map",
  "/third_party_js/howler.min.js",
  "/third_party_js/ua-parser.min.js",

];
*/



/* DEPRECATE OR REVIEW
if (localStorage.getItem("filesThatMustBeLoadedASAP_allCachedSuccessfully")) {
  // Already cached
} else {
  // If we had to wait for DOMContentLoaded, we could use -> // window.addEventListener("DOMContentLoaded",getTheseReadyFirst,{once:true});
  getTheseReadyFirst();
}
async function getTheseReadyFirst() {
  const urgentCache = await caches.open('asap');
  const topPriorityfiles = [
    "/user_interface/html_icon/animated_globe_icon_39.png",
    "/user_interface/images/scrolly_globe_frames/250px_white_globe_60.webp",
    "/user_interface/sounds/ceramic_button_click.webm",
    "/user_interface/sounds/ceramic_button_hover.webm",
    "/user_interface/sounds/fullscreen_exit.webm",
    "/user_interface/sounds/fullscreen_open.webm",
    "/user_interface/sounds/illuminant_button_click.webm",
    "/user_interface/sounds/notification3_close.webm",
    "/user_interface/sounds/user_is_away.webm",
    "/user_interface/sounds/user_is_back.webm"
  ];
  let errorHappened = false;
  try {
    console.log("Begin caching the most urgent assets");
    await urgentCache.addAll(topPriorityfiles);
  } catch(err) {
    console.error(err);
    errorHappened = true;
  } finally {
    if (!errorHappened) {
      console.log("Urgent assets cached successfully");
      localStorage.setItem("filesThatMustBeLoadedASAP_allCachedSuccessfully", "cool");
    }
  }
}
*/




/* DEPRECATE or REVIEW
  // INFORMATION & ABOUT
  const secondGroup = [
    "/information/index.html",
    "/information/information.css",
    "/information/information.js",
    "/information/long_arrow.png",
    "/information/topraksoy_earthman_tsuchimoto.webp",
    "/about/about.css",
    "/about/about.js",
    // "/about/index.html", -> We don't want to cache this as it is expected to be updated once in a while
    "/LICENSE"
  ];

  // PROGRESS CHART
  const thirdGroup = [
    "/progress_chart/images/1_1_1_water.webp",
    "/progress_chart/images/1_1_2_givemewater.webp",
    "/progress_chart/images/1_1_3_bread.webp",
    "/progress_chart/images/1_1_4_takebread.webp",
    "/progress_chart/images/1_2_1_glass.webp",
    "/progress_chart/bilinguals.css",
    // "/progress_chart/index.html", -> We don't want to cache this as it is expected to be updated regularly
    "/progress_chart/js_for_the_bilingual_return_button.js",
    "/progress_chart/progress.css"
    // "/progress_chart/progress.js" -> We don't want to cache this as it is expected to be updated regularly
  ];

  // UI SOUNDS & TEXTS
  let fourthGroup = [
    "/user_interface/sounds/address_as_button_click.webm",
    "/user_interface/sounds/address_as_button_hover.webm",


    "/user_interface/sounds/ding.webm",
    "/user_interface/sounds/financial_thirdparty_click.webm",
    "/user_interface/sounds/financial_thirdparty_hover.webm",


    "/user_interface/sounds/glass_button_click.webm",
    "/user_interface/sounds/glass_button_hover.webm",

    "/user_interface/sounds/looping_bgm_stereo_therapy.webm",
    "/user_interface/sounds/notification1_appear.webm",
    "/user_interface/sounds/notification1_close.webm",
    "/user_interface/sounds/notification2_appear.webm",
    "/user_interface/sounds/notification2_close.webm",
    "/user_interface/sounds/notification3_appear.webm",

    "/user_interface/sounds/progress_chart_click.webm",
    "/user_interface/sounds/progress_chart_hover.webm",
    "/user_interface/sounds/section_as_button_click.webm",
    "/user_interface/sounds/section_as_button_hover.webm",
    "/user_interface/sounds/success1a.webm",
    "/user_interface/sounds/success1b.webm"
  ];
  const o = "/user_interface/text/"+userInterfaceLanguage;
  fourthGroup.push(
    o+"/0-about_saving_loading_users_progress.txt",
    // DEPRECATE or not?
    // o+"/0-allow_microphone_permanently_on_safari.txt",

    o+"/0-allow_microphone.txt",
    o+"/0-author_gives_sleep_advice.txt",
    o+"/info-before_leaving_the_app_to_donate.txt",
    o+"/0-cancel_proceed_good.txt",
    o+"/0-if_browser_support_is_unknown.txt",
    o+"/0-if_something_is_not_working.txt",
    o+"/0-learn_another_language.txt",
    o+"/0-network_connection_too_slow.txt",
    o+"/0-wait_or_reload.txt",
    o+"/0-you_are_learning_ar.txt",
    o+"/0-you_are_learning_en.txt",
    o+"/0-you_are_learning_ja.txt",
    o+"/0-you_are_learning_tr.txt",
    o+"/0-you_are_learning_zh.txt",
    o+"/1-1-1_arabic_tanween.txt",
    o+"/1-1-1_hito_mizu_omizu.txt",
    o+"/1-1-1_ren_intonation.txt",
    o+"/1-1-2_arabic_male_female.txt",
    o+"/1-1-2_end_of_lesson_note.txt",
    o+"/1-1-2_vocabulary_p1_p2.txt",
    o+"/1-1-2a.txt",
    o+"/1-1-2b.txt",
    o+"/1-1-4_ren_attention_to_intonation.txt",
    o+"/1-1-4_vocabulary_p1_p2.txt",
    o+"/1-1-4a.txt",
    o+"/1-1-4b.txt",
    o+"/1-1-notice_author_says.txt",



    o+"/after_last_lesson_button.txt",
    o+"/after_last_lesson_message.txt",
    o+"/info-about_resources.txt",
    o+"/info-go_back_button.txt",
    o+"/info-index_html_title.txt",
    o+"/info-monthly_option_base_usd.txt",
    o+"/info-name_of_author.txt",
    o+"/info-name_of_license.txt",
    o+"/info-view_license_button.txt"
  );

  // SCROLLY GLOBE - these will not quicken the load time in the first session but maybe in the second session and afterwards. May also be necessary for offline support if that ever happens.
  const p = "/user_interface/images/scrolly_globe_frames/250px_white_globe_";
  let fifthGroup = [
    p+"00.webp",p+"01.webp",p+"02.webp",p+"03.webp",p+"04.webp",p+"05.webp",p+"06.webp",p+"07.webp",p+"08.webp",p+"09.webp",
    p+"10.webp",p+"11.webp",p+"12.webp",p+"13.webp",p+"14.webp",p+"15.webp",p+"16.webp",p+"17.webp",p+"18.webp",p+"19.webp",
    p+"20.webp",p+"21.webp",p+"22.webp",p+"23.webp",p+"24.webp",p+"25.webp",p+"26.webp",p+"27.webp",p+"28.webp",p+"29.webp",
    p+"30.webp",p+"31.webp",p+"32.webp",p+"33.webp",p+"34.webp",p+"35.webp",p+"36.webp",p+"37.webp",p+"38.webp",p+"39.webp",
    p+"40.webp",p+"41.webp",p+"42.webp",p+"43.webp",p+"44.webp",p+"45.webp",p+"46.webp",p+"47.webp",p+"48.webp",p+"49.webp",
    p+"50.webp",p+"51.webp",p+"52.webp",p+"53.webp",p+"54.webp",p+"55.webp",p+"56.webp",p+"57.webp",p+"58.webp",p+"59.webp",
                p+"61.webp",p+"62.webp",p+"63.webp",p+"64.webp",p+"65.webp",p+"66.webp",p+"67.webp",p+"68.webp",p+"69.webp",
    p+"70.webp",p+"71.webp",p+"72.webp",p+"73.webp",p+"74.webp",p+"75.webp",p+"76.webp",p+"77.webp",p+"78.webp",p+"79.webp"
  ];
  // REVIEW!!! Note: frame60 (the first visible frame) is loaded asap, see above
*/
