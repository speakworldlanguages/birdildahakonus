"use strict";

if (localStorage.getItem("authorsNotice2FilesCachedSuccessfully")) {  }
else { cacheAuthorsNotice2Assets(); }

if (localStorage.getItem("lesson131CommonFilesCachedSuccessfully")) { parent.console.log("Common files for 131 already cached"); }
else { cacheLesson131CommonAssetsForAllLanguages(); }

if (localStorage.getItem("lesson131FilesFor-"+parent.langCodeForTeachingFilePaths+"-CachedSuccessfully")) { parent.console.log("Files for "+parent.langCodeForTeachingFilePaths+" 131 already cached"); }
else { cacheLesson131AssetsForTheTargetLanguage(); }

// ---
let triesForNotice2Assets = 0;
async function cacheAuthorsNotice2Assets() {
  const cacheSlot = await caches.open('assets-for-bakernotice2-August2023');
  let list = [
    "/lessons_in_iframes/level_1/unit_2/notice_2/earthman_topraksoy_tsuchimoto.webp",
    "/lessons_in_iframes/level_1/unit_2/notice_2/index.html",
    "/lessons_in_iframes/level_1/unit_2/notice_2/notice.css",
    "/lessons_in_iframes/level_1/unit_2/notice_2/notice.js",
    "/user_interface/text/"+userInterfaceLanguage+"/1-2-notice_author_says.txt"
    // FOLLOWING FILES ARE USED both in notice1 and notice2 but they are cached by cacheCommonFilesForAllLessons in js_for_cache_handling/0_parent_initial_load_and_111
    // "/user_interface/sounds/looping_bgm_stereo_therapy."+soundFileFormat
    // "/user_interface/sounds/authors_notice_next_button_hover."+soundFileFormat
    // "/user_interface/sounds/authors_notice_next_button_click."+soundFileFormat
  ];
  if (deviceDetector.device == "tablet") {
    list.push("/lessons_in_iframes/level_1/unit_2/notice_2/global_circulation_tablet.webp");
  } else if (deviceDetector.device == "phone") {
    list.push("/lessons_in_iframes/level_1/unit_2/notice_2/global_circulation_phone.webp");
  } else { // desktop
    list.push("/lessons_in_iframes/level_1/unit_2/notice_2/global_circulation_desktop.webp");
  }
  // ---
  let errorHappened = false;
  try {
    await cacheSlot.addAll(list);
  } catch(err) {
    parent.console.error(err);
    errorHappened = true;
  } finally {
    if (!errorHappened) {
      localStorage.setItem("authorsNotice2FilesCachedSuccessfully", "marvelous");
    } else {
      triesForNotice2Assets++;
      // Try again if the number of maximum retries is not reached
      // «maximumRetries» and «delayTimeBeforeTryingAgain» exists in 0_parent_initial_load_and_111.js
      if (triesForNotice2Assets<=parent.maximumRetries) {   setTimeout(function () {  cacheAuthorsNotice2Assets();  }, parent.delayTimeBeforeTryingAgain);   }
      else {   parent.console.warn("Gave up on trying to cache: cacheAuthorsNotice2Assets");   }
    }
  } // End of try-catch-finally
} // END OF cacheAuthorsNotice2Assets

// ---
let triesFor131CommonAssets = 0;
async function cacheLesson131CommonAssetsForAllLanguages() {
  const cacheForAllLanguages_1_3_1 = await caches.open('1-3-1-assets-for-all-languages-August2023');
  // ---
  let listOfFilesForAllLanguages_1_3_1 = [
    "/lessons_in_iframes/level_1/unit_3/lesson_1/1a.avif",
    "/lessons_in_iframes/level_1/unit_3/lesson_1/1b.avif",
    "/lessons_in_iframes/level_1/unit_3/lesson_1/2a.avif",
    "/lessons_in_iframes/level_1/unit_3/lesson_1/2b.avif",
    "/lessons_in_iframes/level_1/unit_3/lesson_1/3a.avif",
    "/lessons_in_iframes/level_1/unit_3/lesson_1/3b.avif",
    "/lessons_in_iframes/level_1/unit_3/lesson_1/c1.avif",
    "/lessons_in_iframes/level_1/unit_3/lesson_1/c2.avif",
    "/lessons_in_iframes/level_1/unit_3/lesson_1/c3.avif",
    "/lessons_in_iframes/level_1/unit_3/lesson_1/c4.avif",
    "/lessons_in_iframes/level_1/unit_3/lesson_1/c5.avif",
    "/lessons_in_iframes/level_1/unit_3/lesson_1/c6.avif",
    "/lessons_in_iframes/level_1/unit_3/lesson_1/c7.avif",
    "/lessons_in_iframes/level_1/unit_3/lesson_1/c8.avif",
    "/lessons_in_iframes/level_1/unit_3/lesson_1/c9.avif",
    "/lessons_in_iframes/level_1/unit_3/lesson_1/c10.avif",
    "/lessons_in_iframes/level_1/unit_3/lesson_1/fish.css",
    "/lessons_in_iframes/level_1/unit_3/lesson_1/fish.js",
    "/lessons_in_iframes/level_1/unit_3/lesson_1/index.html",
    "/lessons_in_iframes/level_1/unit_3/lesson_1/what_fish_sounds_like_1."+soundFileFormat,
    "/lessons_in_iframes/level_1/unit_3/lesson_1/what_fish_sounds_like_2."+soundFileFormat
  ];
  // soundFileFormat exists in js_for_all_iframed_lesson_htmls where it is copied from the parent in js_for_different_browsers_and_devices

  if (isApple || isFirefox) { // See js_for_all_iframed_lesson_htmls and then js_for_different_browsers_and_devices
    listOfFilesForAllLanguages_1_3_1.push(
      "/lessons_in_iframes/level_1/unit_3/lesson_1/v1_h264.mp4",
      "/lessons_in_iframes/level_1/unit_3/lesson_1/v2_h264.mp4"
    );
  } else {
    listOfFilesForAllLanguages_1_3_1.push(
      "/lessons_in_iframes/level_1/unit_3/lesson_1/v1_vp9.webm",
      "/lessons_in_iframes/level_1/unit_3/lesson_1/v2_vp9.webm"
    );
  }
  // ---
  let errorHappened = false;
  try {
    parent.console.log("Caching common files for 1-3-1 ..."); // eruda console displays either the parent window only or the iframe window only
    await cacheForAllLanguages_1_3_1.addAll(listOfFilesForAllLanguages_1_3_1); //parent.console.log("done");
  } catch(err) {
    parent.console.error(err);
    errorHappened = true;
  } finally {
    if (!errorHappened) {
      parent.console.log("... and common files for 1-3-1 are ready");
      localStorage.setItem("lesson131CommonFilesCachedSuccessfully", "spectacular");
    } else {
      triesFor131CommonAssets++;
      // Try again if the number of maximum retries is not reached
      // «maximumRetries» and «delayTimeBeforeTryingAgain» exists in 0_parent_initial_load_and_111.js
      if (triesFor131CommonAssets<=parent.maximumRetries) {   setTimeout(function () {  cacheLesson131CommonAssetsForAllLanguages();  }, parent.delayTimeBeforeTryingAgain);   }
      else {   parent.console.warn("Gave up on trying to cache: cacheLesson131CommonAssetsForAllLanguages");   }
    }
  } // End of try-catch-finally

} // END OF cacheLesson131CommonAssetsForAllLanguages


// ---
let triesFor131TargetLangAssets = 0;
async function cacheLesson131AssetsForTheTargetLanguage() {
  const cacheForTargetLanguage_1_3_1 = await caches.open('1-3-1-assets-for-'+parent.langCodeForTeachingFilePaths+'-August2023');
  // ---
  // soundFileFormat exists in js_for_all_iframed_lesson_htmls where it is copied from the parent in js_for_different_browsers_and_devices
  let listOfFilesForTargetLanguage_1_3_1 = [
    "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_3/lesson_1/fish_1-2."+soundFileFormat,
    "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_3/lesson_1/fish_3."+soundFileFormat,
    "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_3/lesson_1/fish_4-5."+soundFileFormat,
    "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_3/lesson_1/fish_6."+soundFileFormat,
    "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_3/lesson_1/fish_7-8."+soundFileFormat,
    "/speech_recognition_answer_key/"+parent.langCodeForTeachingFilePaths+"/1-3-1-fish.txt"
  ];

  /*
  const u = "/user_interface/text/"+userInterfaceLanguage; // See js_for_every_single_html
  switch (parent.langCodeForTeachingFilePaths.substring(0,2)) { // Using substring, we trim "tr_istanbul" to "tr", "zh_putonghua" to "zh" etc
    case "??":
      listOfFilesForTargetLanguage_1_3_1.push(u+"/1-3-1_???.txt");
      break;
    default: // Nothing
  }
  */

  // ---
  let errorHappened = false;
  try {
    parent.console.log("Caching files for 1-3-1 "+parent.langCodeForTeachingFilePaths+" ...");
    await cacheForTargetLanguage_1_3_1.addAll(listOfFilesForTargetLanguage_1_3_1); //parent.console.log("done");
  } catch(err) {
    parent.console.error(err);
    errorHappened = true;
  } finally {
    if (!errorHappened) {
      parent.console.log("... and files for 1-3-1 "+parent.langCodeForTeachingFilePaths+" are ready");
      localStorage.setItem("lesson131FilesFor-"+parent.langCodeForTeachingFilePaths+"-CachedSuccessfully", "fabulous");
    } else {
      triesFor131TargetLangAssets++;
      // Try again if the number of maximum retries is not reached
      // «maximumRetries» and «delayTimeBeforeTryingAgain» exists in 0_parent_initial_load_and_111.js
      if (triesFor131TargetLangAssets<=parent.maximumRetries) {   setTimeout(function () {  cacheLesson131AssetsForTheTargetLanguage();  }, parent.delayTimeBeforeTryingAgain);   }
      else {   parent.console.warn("Gave up on trying to cache: cacheLesson131AssetsForTheTargetLanguage");   }
    }
  } // End of try-catch-finally

} // END OF cacheLesson131AssetsForTheTargetLanguage
