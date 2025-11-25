"use strict";
// Code written by Manheart Earthman=B. A. Bilgekılınç Topraksoy=土本 智一勇夫剛志

// FACT: There are two main reasons why one would want to cache files
// Reason1: Load files in advance to shorten the waiting time for the user
// Reason2: Offer the user offline functionality as caching files can be similar to installing a native app by copying files to disk (not to be confused with pwa service-worker install)
// Note that: As of April 2024 we are focusing only on reason #1
// Caching for offline mode is not a priority as Speech Recognition doesn't work when offline (even though there might be a hack using const speechRecognitionList = new SpeechGrammarList();)
// As of August 2023 Safari (17.0) does not support SpeechGrammarList
// Check https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition#examples

// ANYHOW: If service-worker.js intervention is enabled check if it needs any updates after things are updated here i.e. adding/removing/changing files/assets
// Check https://stackoverflow.com/questions/73237370/how-to-chain-caching-cache-your-assets-set-by-set-according-to-their-priority
// For future ideas we can take a look at adderAll() by Talat Er

var maximumRetries = 6; // Also to be used in every lesson's own cache handler js i.e. 112.js,113.js,114.js etc
var delayTimeBeforeTryingAgain = 2000; // ms // Also to be used in every lesson's own cache handler js i.e. 112.js,113.js,114.js etc
// Variables from other js files are used below
// therefore it must fire at least after DOMContentLoaded,,, See -> js_for_different_browsers_and_devices.js
// Better wait for window load for safety
window.addEventListener("load",welcomeScreenCacheHandling_proceed0,{once:true});
// To be able to use «await» inside a function we declare it async
// As of April 2024 await hasn't been used yet BUT it may be used in the future, so we better stay ready
async function welcomeScreenCacheHandling_proceed0() {
  // --- See https://web.dev/cache-api-quick-guide/
  // LOOKS LIKE IMPOSSIBLE: Make progress_chart offline compatible without introducing the obligation of deleting outdated caches
  // -
  // IMPORTANT: The following localStorage key names MUST FOLLOW the naming STANDARDS of the app
  // ALSO: See js_for_the_parent_all_browsers_all_devices » goToProgressChart AND js_for_the_sliding_navigation_menu » goToMainMenuFunction
  if (localStorage.getItem("progressChartShouldBeAlmostOrFullyOfflineCompatibleNow")) { console.log("ALREADY CACHED: Files needed to make the progress_chart «almost or fully» offline compatible should be ready");
    // Previously cached » BUT! If it needs to be updated then uncomment the following
    // REMEMBER: Once a deletion is uncommented it must stay uncommented forever!
    // const april2024cacheIsDeleted = await caches.delete('progress-chart-assets-April2024'); // Ready to be uncommented when files are updated
    // With every update, this block should get longer and longer like » if (april2024cacheIsDeleted || someOtherCacheIsDeleted || oneMoreCacheIsDeleted)
    if (false) {
      // So that the browser will NOT display files from the outdated cache to returning users.
      localStorage.removeItem("progressChartShouldBeAlmostOrFullyOfflineCompatibleNow");
      console.log("BUT IS OUTDATED: Files needed to make the progress_chart «almost or fully» offline compatible will now be updated");
      cacheProgressChartCommonFiles().then(proceed1); // Recache with the new files
    }
  } else {
    cacheProgressChartCommonFiles().then(proceed1); // Caching for the very first time
  }
  // ---
} // END OF welcomeScreenCacheHandling_proceed0
async function proceed1() {
  // ---
  // IMPORTANT: The following localStorage key names MUST FOLLOW the naming STANDARDS of the app
  // BECAUSE: See js_for_all_iframed_lesson_htmls » checkIfNextLessonIsCachedAndRedirectIfNot
  // ALSO: See js_for_the_parent_all_browsers_all_devices » goToProgressChart,openFirstLesson AND js_for_the_sliding_navigation_menu » goToMainMenuFunction
  if (localStorage.getItem("commonFilesForAllLessonsCachedSuccessfully")) { console.log("ALREADY CACHED: Common files for all lessons should be ready");
    // Previously cached » BUT! If it needs to be updated then uncomment the following
    // const april2024cacheIsDeleted = await caches.delete('common-js-css-txt-etc-used-by-lessons-April2024'); // Uncomment if update is necessary
    if (false /* When new files are ready, replace false with april2024cacheIsDeleted */) {
      // So that the browser will NOT display files from the outdated cache to returning users.
      localStorage.removeItem("commonFilesForAllLessonsCachedSuccessfully");
      console.log("BUT IS OUTDATED: Common files for all lessons will now be updated");
      cacheCommonFilesForAllLessons().then(proceed2); // Recache with the new files
    }
  } else {
    cacheCommonFilesForAllLessons().then(proceed2); // Caching for the very first time
  }
  // ---
}
async function proceed2() {
  // ---
  // IMPORTANT: The following localStorage key names MUST FOLLOW the naming STANDARDS of the app
  // BECAUSE: See js_for_all_iframed_lesson_htmls » checkIfNextLessonIsCachedAndRedirectIfNot
  // ALSO: See js_for_the_parent_all_browsers_all_devices » openFirstLesson
  if (localStorage.getItem("lesson111CommonFilesCachedSuccessfully")) { console.log("ALREADY CACHED: Lesson 111 common files for all languages should be ready");
    // Previously cached » BUT! If it needs to be updated then uncomment the following
    // const april2024primaryCacheIsDeleted = await caches.delete('1-1-1-primary-assets-for-all-languages-April2024');
    // const april2024secondaryCacheIsDeleted = await caches.delete('1-1-1-secondary-assets-for-all-languages-April2024');
    if (false /* When new files are ready, replace false with april2024primaryCacheIsDeleted || april2024secondaryCacheIsDeleted*/) {
      // So that the browser will NOT display files from the outdated cache to returning users.
      localStorage.removeItem("lesson111CommonFilesCachedSuccessfully");
      console.log("BUT IS OUTDATED: Lesson 111 common files for all languages will now be updated");
      cacheLesson111CommonAssetsForAllLanguages().then(proceed3); // Recache with the new files
    }
  } else {
    cacheLesson111CommonAssetsForAllLanguages().then(proceed3); // Caching for the very first time
  }
  // ---
}
async function proceed3() {
  // ---
  // langCodeForTeachingFilePaths exists/is declared in js_for_the_parent_all_browsers_all_devices
  // REMEMBER: cacheLesson111AssetsForTheTargetLanguage() is an EXCEPTION
  // NORMALLY: cacheLesson111AssetsForTheTargetLanguage() does not fire at window-load-event i.e. HERE
  // WILL ONLY FIRE HERE IF: It is previously cached but needs to be updated
  // -
  // IMPORTANT: The following localStorage key names MUST FOLLOW the naming STANDARDS of the app
  // BECAUSE: See js_for_all_iframed_lesson_htmls » checkIfNextLessonIsCachedAndRedirectIfNot
  // ALSO: See js_for_the_parent_all_browsers_all_devices » openFirstLesson
  if (localStorage.getItem("lesson111FilesFor-"+langCodeForTeachingFilePaths+"-CachedSuccessfully")) { console.log("ALREADY CACHED: Lesson 111 "+langCodeForTeachingFilePaths+" files should be ready");
    // PREVIOUSLY CACHED » BUT! If it needs to be updated then uncomment the following
    // const april2024cacheIsDeleted = await caches.delete('1-1-1-assets-for-'+langCodeForTeachingFilePaths+'-April2024');
    if (false /* When new files are ready, replace false with april2024cacheIsDeleted */) {
      // So that the browser will NOT display files from the outdated cache to returning users.
      if (langCodeForTeachingFilePaths) { // If exists and is ready (will be so for returning users)
        localStorage.removeItem("lesson111FilesFor-"+langCodeForTeachingFilePaths+"-CachedSuccessfully")
        console.log("BUT IS OUTDATED: Lesson 111 "+langCodeForTeachingFilePaths+" files will now be updated");
        cacheLesson111AssetsForTheTargetLanguage(); // Recache with the new files
      }
    }
  } else {
    console.log("Waiting for the user to choose the language he|she wants to learn");
    // CAUTION: CANNOT CACHE WITHOUT langCodeForTeachingFilePaths
    // THEREFORE: Let the normal procedure be: Wait for a button touch|click which will eventually call cacheLesson111AssetsForTheTargetLanguage()
    // cacheLesson111AssetsForTheTargetLanguage() will be called from js_for_the_parent_all_browsers_all_devices » Find an see setLangCodeForFilePathsAndCacheTheFirstTeachingAssets
  }
  // ---
}

// ASYNC FUNCTIONS FOR GETTING THE FILES READY
// ____________
let triesForProgressChartFiles = 0;
function cacheProgressChartCommonFiles() { // LOOKS LIKE IMPOSSIBLE: Make progress_chart offline compatible without introducing the obligation of deleting outdated caches
  return new Promise(async (resolve,reject) => { // Do the «async» here to be able to make use of «await»
    // Create the folder-like storage slots
    const cacheForTheProgressChart = await caches.open('progress-chart-assets-April2024'); // Note the name to be able to delete the older cache // WILL THROW ERROR WITHOUT HTTPS
    // When older files are updated OR new files are added THE PREVIOUS CACHE MUST BE DELETED
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
      "/progress_chart/images/1_3_3_tree.webp",
      "/progress_chart/images/1_3_4_palette.webp",
      "/progress_chart/images/2_1_1_bird.webp",
      // Add new image here

      "/progress_chart/images/not_published_yet.webp",

      "/user_interface/images/arrow_right.webp", // Same file used both for progress chart (via progress.css) and at parent level » See the parent index.html
      // Note: arrow_right is also used in 1-3-4
      "/user_interface/images/arrow_left.webp", // Same file used both for progress chart (via progress.css) and at parent level » See the parent index.html


      "/progress_chart/bilinguals.css", // This could be mature enough to stay unchanged for a longer while
      "/progress_chart/index.html", // FREQUENT UPDATES EXPECTED
      "/progress_chart/js_for_the_bilingual_return_button.js", // This is mature but remember that there are 6 txt files called from within
      "/progress_chart/progress.css", // Mature: updates not expected
      "/progress_chart/progress.js", // FREQUENT UPDATES EXPECTED

      // Bilingual buttons in progress_chart require BOTH 0-you_are_learning_??.txt AND 0-learn_another_language.txt
      // The buttons will contain text BOTH in userInterfaceLanguage AND langCodeForTeachingFilePaths.substr(0,2)
      // There is also the bilingual alert box that needs 0-author_gives_sleep_advice.txt BOTH in userInterfaceLanguage AND langCodeForTeachingFilePaths.substr(0,2)
      // That makes 6 txt files. Question: SHOULD WE BE CACHING THOSE and if so then HOW DO WE CACHE THOSE?
      // WELL: We expect that if fetch cannot get the actual texts then some international default simple strings will be displayed


      // Other files that must be cached to make progress_chart offline compatible
      "/user_interface/images/preload_globe_100x150_frame0.webp"
      /*
      "/css_reusables/css_for_every_single_html.css" // CACHED BY cacheCommonFilesForAllLessons
      "/css_reusables/css_for_all_iframed_lesson_htmls.css" // CACHED BY cacheCommonFilesForAllLessons
      "/css_reusables/css_for_photos_and_videos_teach_a_new_word.css" // CACHED BY cacheCommonFilesForAllLessons
      "/js_reusables/js_for_every_single_html.js" // CACHED BY cacheCommonFilesForAllLessons
      "/js_reusables/js_for_all_iframed_lesson_htmls.js" // CACHED BY cacheCommonFilesForAllLessons
      "/user_interface/sounds/progress_chart_hover."+soundFileFormat // CACHED BY cacheCommonFilesForAllLessons
      "/user_interface/sounds/progress_chart_click."+soundFileFormat // CACHED BY cacheCommonFilesForAllLessons
      */
    ];
    // -
    let errorHappened = false;
    try {
      console.log("Will try to cache files via cacheProgressChartCommonFiles()...");
      // load
      await cacheForTheProgressChart.addAll(listOfEverythingInProgressChart); //console.log("assets for progress chart done");
    } catch (err) {
      console.error(err);
      errorHappened = true;
    } finally {
      if (!errorHappened) {
        console.log("...cacheProgressChartCommonFiles() was successful");
        localStorage.setItem("progressChartShouldBeAlmostOrFullyOfflineCompatibleNow", "verygood");
        resolve("done");
      } else {
        triesForProgressChartFiles++;
        // Try to cache if the number of maximum retries is not reached
        if (triesForProgressChartFiles<=maximumRetries) {     setTimeout(function () { cacheProgressChartCommonFiles(); reject("ready to try again"); }, delayTimeBeforeTryingAgain);    } // Use reject to destroy the promise and free up memory
        else {    console.warn("Gave up on trying to cache: cacheProgressChartCommonFiles"); resolve("could not");    }
      }
    } // End of try-catch-finally
  }); // End of Promise
} // END OF cacheProgressChartCommonFiles

let triesForAllLessonsCommonFiles = 0;
function cacheCommonFilesForAllLessons() {
  return new Promise(async (resolve,reject) => { // Do the «async» here to be able to make use of «await»
    // Create the folder-like storage slots
    const cacheForCommonJSandCSSandTXTandOtherFilesUsedByLessonHTMLs = await caches.open('common-js-css-txt-etc-used-by-lessons-April2024');
    const u = "/user_interface/text/"+userInterfaceLanguage; // See js_for_every_single_html
    // ---
    // soundFileFormat exists in js_for_different_browsers_and_devices
    let listOfCommonJSandCSSandTXTandOtherFilesUsedByLessonHTMLs = [
      // Needed in 1-1-1
      "/css_reusables/css_for_every_single_html.css",
      "/css_reusables/css_for_all_iframed_lesson_htmls.css",
      "/css_reusables/css_for_photos_and_videos_teach_a_new_word.css",
      "/css_reusables/css_for_the_glassy_give_up_button.css",
      "/css_reusables/css_for_info_boxes_in_lessons.css",
      "/js_reusables/js_for_every_single_html.js", // CAREFUL!!! It is expected to be updated
      "/js_reusables/js_for_all_iframed_lesson_htmls.js",
      "/js_reusables/js_for_handling_speech_give_up.js",
      // DEPRECATED: "/third_party_js/wavesurfer.min.js",
      "/js_reusables/js_for_microphone_input_visualization.js",
      "/js_reusables/js_for_mic_input_vis_web_worker.js",
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
      // images
      // "/user_interface/images/internet_is_found.avif", // Caching these will DEFINITELY NOT speed up anything as these will be downloaded as soon as parent window fires load event » See js_for_info_boxes_in_parent
      // "/user_interface/images/internet_is_needed.avif", // Caching these will DEFINITELY NOT speed up anything as these will be downloaded as soon as parent window fires load event » See js_for_info_boxes_in_parent
      // txt
      u+"/0lesson-continue_to_next.txt",
      u+"/0lesson-give_up_and_skip.txt",
      // u+"/0-is_paused_message_and_unpause_button.txt", // Caching this will DEFINITELY NOT speed up anything as this will be downloaded as soon as parent window fires load event » See js_for_info_boxes_in_parent
      u+"/0lesson-ok_i_understand.txt",
      u+"/0lesson-vocabulary_button1_button2.txt",
      // sounds for lessons with speech recognition
      "/user_interface/sounds/glass_button_hover."+soundFileFormat,
      "/user_interface/sounds/glass_button_click."+soundFileFormat,
      // sounds for notice1 and notice2 etc
      "/user_interface/sounds/looping_bgm_stereo_therapy."+soundFileFormat,
      "/user_interface/sounds/authors_notice_next_button_hover."+soundFileFormat,
      "/user_interface/sounds/authors_notice_next_button_click."+soundFileFormat,
      // info boxes in lessons
      "/user_interface/sounds/notification1_appear."+soundFileFormat,
      "/user_interface/sounds/notification1_close."+soundFileFormat,
      "/user_interface/sounds/notification3_appear."+soundFileFormat,
      "/user_interface/sounds/notification3_close."+soundFileFormat,
      // js_for_proceed_buttons
      "/user_interface/sounds/address_as_button_hover."+soundFileFormat,
      "/user_interface/sounds/address_as_button_click."+soundFileFormat,
      // sounds for progress_chart - OTHER ASSETS FOR progress_chart ARE EXPECTED TO BE UPDATED FREQUENTLY
      "/user_interface/sounds/progress_chart_click."+soundFileFormat,
      "/user_interface/sounds/progress_chart_hover."+soundFileFormat,
      // DEPRECATED: CRUCIAL WARNING !!!
      // DEPRECATED: There aren't any video webm files here as of August 2023 so it is safe to change all webm file paths to mp3 with an array map (for apple devices)
      // DEPRECATED: EXTREMELY IMPORTANT !!!
      // DEPRECATED: In case there has to be a video webm here cache it separately, otherwise the app will break when its extension is set to mp3 with the array map function below

      // fonts
      // Mouth states for the listen many times box
      "/user_interface/images/rhubarb_lip_sync/a.webp",
      "/user_interface/images/rhubarb_lip_sync/b.webp",
      "/user_interface/images/rhubarb_lip_sync/c.webp",
      "/user_interface/images/rhubarb_lip_sync/d.webp",
      "/user_interface/images/rhubarb_lip_sync/e.webp",
      "/user_interface/images/rhubarb_lip_sync/f.webp",
      "/user_interface/images/rhubarb_lip_sync/g.webp",
      "/user_interface/images/rhubarb_lip_sync/h.webp",
      "/user_interface/images/rhubarb_lip_sync/x.webp",

      // images added conditionally depending on device
      // screens
      "/user_interface/screens/"+userInterfaceLanguage+"/you_are_offline.html",
      // blank html
      "/user_interface/blank.html"
    ];
    // soundFileFormat in js_for_different_browsers_and_devices

    if (isAndroid) { listOfCommonJSandCSSandTXTandOtherFilesUsedByLessonHTMLs.push(u+"/0lesson-android_speech_timing.txt"); }
    if (deviceDetector.isMobile) {
      listOfCommonJSandCSSandTXTandOtherFilesUsedByLessonHTMLs.push(
        "/user_interface/images/touch_and_drag_man_2x_scale.webp" // js_for_displaying_translation_help
      );
    } else { // desktop
      listOfCommonJSandCSSandTXTandOtherFilesUsedByLessonHTMLs.push(
        "/user_interface/images/cursor/default_cursor.png", // css_for_every_single_html and js_for_every_single_html and js_for_all_iframed_lesson_htmls and css_for_photos_and_videos_teach_a_new_word and css_for_proceed_buttons
        "/user_interface/images/cursor/button_cursor.png", // css_for_displaying_translation_help and css_for_the_glassy_give_up_button
        "/user_interface/images/cursor/vibrant_cursor.png", // css_for_info_boxes_in_lessons
        "/user_interface/images/cursor/glow_cursor.png", // css_for_info_boxes_in_lessons
        "/user_interface/images/reveal_help_desktop_teacher_off.webp", // js_for_displaying_translation_help
        "/user_interface/images/reveal_help_desktop_teacher_on.webp" // js_for_displaying_translation_help
      );
    }
    // ----
    if (isApple) { // Do not access isApple before DOMContentLoaded in js_for_different_browsers_and_devices
      listOfCommonJSandCSSandTXTandOtherFilesUsedByLessonHTMLs.push("/user_interface/images/now_you_say_it_to_speech_recognition.avif");
    } else {
      listOfCommonJSandCSSandTXTandOtherFilesUsedByLessonHTMLs.push("/user_interface/images/now_you_say_it_to_speech_recognition.webp");
    }
    // -
    let errorHappened = false;
    try {
      console.log("Will try to cache files via cacheCommonFilesForAllLessons()...");
      // load
      await cacheForCommonJSandCSSandTXTandOtherFilesUsedByLessonHTMLs.addAll(listOfCommonJSandCSSandTXTandOtherFilesUsedByLessonHTMLs); //console.log("common JS&CSS for lessons done");
    } catch (err) {
      console.error(err);
      errorHappened = true;
    } finally {
      if (!errorHappened) {
        console.log("...cacheCommonFilesForAllLessons() was successful");
        localStorage.setItem("commonFilesForAllLessonsCachedSuccessfully", "verygood");
        resolve("done");
      } else {
        triesForAllLessonsCommonFiles++;
        // Try to cache if the number of maximum retries is not reached
        if (triesForAllLessonsCommonFiles<=maximumRetries) {     setTimeout(function () { cacheCommonFilesForAllLessons(); reject("ready to try again"); }, delayTimeBeforeTryingAgain);    } // Use reject to destroy the promise and free up memory
        else {    console.warn("Gave up on trying to cache: cacheCommonFilesForAllLessons"); resolve("could not");    }
      }
    } // End of try-catch-finally
  }); // End of Promise
} // END OF cacheCommonFilesForAllLessons

// ____________
let triesForLesson111AllLangFiles = 0;
function cacheLesson111CommonAssetsForAllLanguages() {
  return new Promise(async (resolve,reject) => { // Do the «async» here to be able to make use of «await»
    // Create the folder-like storage slots
    const primaryCacheForLesson_1_1_1 = await caches.open('1-1-1-primary-assets-for-all-languages-April2024');
    const secondaryCacheForLesson_1_1_1 = await caches.open('1-1-1-secondary-assets-for-all-languages-April2024');

    // --------
    let listOfPrimaryAssetsForLesson_1_1_1 = [
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
      "/lessons_in_iframes/level_1/unit_1/lesson_1/what_water_sounds_like_1."+soundFileFormat,
      "/lessons_in_iframes/level_1/unit_1/lesson_1/what_water_sounds_like_2."+soundFileFormat,
      "/lessons_in_iframes/level_1/unit_1/lesson_1/what_water_sounds_like_3."+soundFileFormat,
      "/lessons_in_iframes/level_1/unit_1/lesson_1/what_water_sounds_like_4."+soundFileFormat,
      "/lessons_in_iframes/level_1/unit_1/lesson_1/what_water_sounds_like_5."+soundFileFormat
    ];
    // soundFileFormat exists in js_for_different_browsers_and_devices

    // NOTE: Do not access isApple before DOMContentLoaded in js_for_different_browsers_and_devices

    // --------
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
        "/lessons_in_iframes/level_1/unit_1/lesson_1/v1_vp9.webm", // This is a VIDEO webm and not AUDIO webm !!!
        "/lessons_in_iframes/level_1/unit_1/lesson_1/v2_vp9.webm"  // This is a VIDEO webm and not AUDIO webm !!!
      );
    }
    // ---
    let errorHappened = false;
    try {
      console.log("Will try to cache primary and then secondary files via cacheLesson111CommonAssetsForAllLanguages()...");
      // load first group
      await primaryCacheForLesson_1_1_1.addAll(listOfPrimaryAssetsForLesson_1_1_1); //console.log("group 1 done");
      // then load next group
      await secondaryCacheForLesson_1_1_1.addAll(listOfSecondaryAssetsForLesson_1_1_1); //console.log("group 2 done");
    } catch(err) {
      console.error(err);
      errorHappened = true;
    } finally {
      if (!errorHappened) {
        console.log("...cacheLesson111CommonAssetsForAllLanguages() was successful");
        localStorage.setItem("lesson111CommonFilesCachedSuccessfully", "great");
        resolve("done");
      } else {
        triesForLesson111AllLangFiles++;
        // Try to cache if the number of maximum retries is not reached
        if (triesForLesson111AllLangFiles<=maximumRetries) {     setTimeout(function () { cacheLesson111CommonAssetsForAllLanguages(); reject("ready to try again"); }, delayTimeBeforeTryingAgain);    } // Use reject to destroy the promise and free up memory
        else {    console.warn("Gave up on trying to cache: cacheLesson111CommonAssetsForAllLanguages"); resolve("could not");    }
      }
    } // End of try-catch-finally
  }); // End of Promise
} // END OF cacheLesson111CommonAssetsForAllLanguages()

// ____________
let triesForLesson111TaughtLangFiles = {};
// This must not fire before langCodeForTeachingFilePaths in js_for_the_parent_all_browsers_all_devices has a value set and ready
// Declare async to be able to use await inside the function
async function cacheLesson111AssetsForTheTargetLanguage() {
  // April 2024: This is the last piece of the chain for caching operations so we don't need to use .then THEREFORE we do not need to return a Promise here
    // See js_for_the_parent_all_browsers_all_devices and find setLangCodeForFilePathsAndCacheTheFirstTeachingAssets

    if (localStorage.getItem("lesson111FilesFor-"+langCodeForTeachingFilePaths+"-CachedSuccessfully")) {
      console.log("CACHED and READY: Lesson 111 .:"+langCodeForTeachingFilePaths+":.");
    } else {

      const cacheForTargetLanguage_1_1_1 = await caches.open('1-1-1-assets-for-'+langCodeForTeachingFilePaths+'-April2024'); // Create a new slot
      // soundFileFormat exists in js_for_different_browsers_and_devices
      let listOfFilesForTargetLanguage_1_1_1 = [
        "/audio_files_for_listening/"+langCodeForTeachingFilePaths+"/level_1/unit_1/lesson_1/water_1-2."+soundFileFormat,
        "/audio_files_for_listening/"+langCodeForTeachingFilePaths+"/level_1/unit_1/lesson_1/water_3."+soundFileFormat,
        "/audio_files_for_listening/"+langCodeForTeachingFilePaths+"/level_1/unit_1/lesson_1/water_4-5."+soundFileFormat,
        "/audio_files_for_listening/"+langCodeForTeachingFilePaths+"/level_1/unit_1/lesson_1/water_6."+soundFileFormat,
        "/audio_files_for_listening/"+langCodeForTeachingFilePaths+"/level_1/unit_1/lesson_1/water_7-8."+soundFileFormat,
        "/speech_recognition_answer_key/"+langCodeForTeachingFilePaths+"/1-1-1-water.txt"
      ];

      // NOTE: Do not access isApple before DOMContentLoaded in js_for_different_browsers_and_devices

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
        console.log("Will try to cache unique files for 1-1-1 "+langCodeForTeachingFilePaths+" via cacheLesson111AssetsForTheTargetLanguage()...");
        await cacheForTargetLanguage_1_1_1.addAll(listOfFilesForTargetLanguage_1_1_1); //console.log("done");
      } catch(err) {
        console.error(err);
        errorHappened = true;
      } finally {
        if (!errorHappened) {
          console.log("...cacheLesson111AssetsForTheTargetLanguage() for "+langCodeForTeachingFilePaths+" was successful");
          // So that it will skip cache search and never recache
          localStorage.setItem("lesson111FilesFor-"+langCodeForTeachingFilePaths+"-CachedSuccessfully", "cool"); // OBVIOUSLY: We CANNOT USE the dot notation LIKE: localStorage.lesson111FilesForTargetLanguageCachedSuccessfully = "cool";
        } else {
          let a = triesForLesson111TaughtLangFiles[langCodeForTeachingFilePaths];
          a++;
          triesForLesson111TaughtLangFiles[langCodeForTeachingFilePaths] = a;
          // Try to cache if the number of maximum retries is not reached
          if (triesForLesson111TaughtLangFiles[langCodeForTeachingFilePaths]<=maximumRetries) {     setTimeout(function () { cacheLesson111AssetsForTheTargetLanguage(); }, delayTimeBeforeTryingAgain);    }
          else {    console.warn("Gave up on trying to cache: cacheLesson111AssetsForTheTargetLanguage");    }
        }
      } // End of try-catch-finally

    } // END OF else
  // No promise needed as of April 2024
} // END OF cacheLesson111AssetsForTheTargetLanguage()
