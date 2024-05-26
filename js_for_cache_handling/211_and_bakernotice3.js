"use strict";

if (localStorage.getItem("authorsNotice3FilesCachedSuccessfully")) {  }
else { cacheAuthorsNotice3Assets(); }

if (localStorage.getItem("lesson211CommonFilesCachedSuccessfully")) { parent.console.log("Common files for 211 already cached"); }
else { cacheLesson211CommonAssetsForAllLanguages(); }

if (localStorage.getItem("lesson211FilesFor-"+parent.langCodeForTeachingFilePaths+"-CachedSuccessfully")) { parent.console.log("Files for "+parent.langCodeForTeachingFilePaths+" 211 already cached"); }
else { cacheLesson211AssetsForTheTargetLanguage(); }

// ---
let triesForNotice3Assets = 0;
async function cacheAuthorsNotice3Assets() {
  const cacheSlot = await caches.open('assets-for-bakernotice3-April2024');
  let list = [
    "/lessons_in_iframes/level_1/unit_3/notice_3/earthman_topraksoy_tsuchimoto.webp",
    "/lessons_in_iframes/level_1/unit_3/notice_3/index.html",
    "/lessons_in_iframes/level_1/unit_3/notice_3/notice.css",
    "/lessons_in_iframes/level_1/unit_3/notice_3/notice.js",
    "/user_interface/text/"+userInterfaceLanguage+"/1-3-notice_author_says.txt"
    // FOLLOWING FILES ARE USED both in notice1 and notice2 and notice3 but they are cached by cacheCommonFilesForAllLessons in js_for_cache_handling/0_parent_initial_load_and_111
    // "/user_interface/sounds/looping_bgm_stereo_therapy."+soundFileFormat
    // "/user_interface/sounds/authors_notice_next_button_hover."+soundFileFormat
    // "/user_interface/sounds/authors_notice_next_button_click."+soundFileFormat
  ];
  if (deviceDetector.device == "tablet") {
    list.push("/lessons_in_iframes/level_1/unit_3/notice_3/global_circulation_tablet.webp");
  } else if (deviceDetector.device == "phone") {
    list.push("/lessons_in_iframes/level_1/unit_3/notice_3/global_circulation_phone.webp");
  } else { // desktop
    list.push("/lessons_in_iframes/level_1/unit_3/notice_3/global_circulation_desktop.webp");
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
      localStorage.setItem("authorsNotice3FilesCachedSuccessfully", "marvelous");
    } else {
      triesForNotice3Assets++;
      // Try again if the number of maximum retries is not reached
      // «maximumRetries» and «delayTimeBeforeTryingAgain» exists in 0_parent_initial_load_and_111.js
      if (triesForNotice3Assets<=parent.maximumRetries) {   setTimeout(function () {  cacheAuthorsNotice3Assets();  }, parent.delayTimeBeforeTryingAgain);   }
      else {   parent.console.warn("Gave up on trying to cache: cacheAuthorsNotice3Assets");   }
    }
  } // End of try-catch-finally
} // END OF cacheAuthorsNotice3Assets

// ---
let triesFor211CommonAssets = 0;
async function cacheLesson211CommonAssetsForAllLanguages() {
  const cacheForAllLanguages_2_1_1 = await caches.open('2-1-1-assets-for-all-languages-April2024');
  // ---
  let listOfFilesForAllLanguages_2_1_1 = [
    "/lessons_in_iframes/level_2/unit_1/lesson_1/1a.avif",
    "/lessons_in_iframes/level_2/unit_1/lesson_1/1b.avif",
    "/lessons_in_iframes/level_2/unit_1/lesson_1/2a.avif",
    "/lessons_in_iframes/level_2/unit_1/lesson_1/2b.avif",
    "/lessons_in_iframes/level_2/unit_1/lesson_1/3a.avif",
    "/lessons_in_iframes/level_2/unit_1/lesson_1/3b.avif",
    "/lessons_in_iframes/level_2/unit_1/lesson_1/c1.avif",
    "/lessons_in_iframes/level_2/unit_1/lesson_1/c1v.webp",
    "/lessons_in_iframes/level_2/unit_1/lesson_1/c2.avif",
    "/lessons_in_iframes/level_2/unit_1/lesson_1/c3.avif",
    "/lessons_in_iframes/level_2/unit_1/lesson_1/c4.avif",
    "/lessons_in_iframes/level_2/unit_1/lesson_1/c5.avif",
    "/lessons_in_iframes/level_2/unit_1/lesson_1/c6.avif",
    "/lessons_in_iframes/level_2/unit_1/lesson_1/c7.avif",
    "/lessons_in_iframes/level_2/unit_1/lesson_1/c8.avif",
    "/lessons_in_iframes/level_2/unit_1/lesson_1/c9.avif",
    "/lessons_in_iframes/level_2/unit_1/lesson_1/c10.avif",
    "/lessons_in_iframes/level_2/unit_1/lesson_1/c11.avif",
    "/lessons_in_iframes/level_2/unit_1/lesson_1/bird.css",
    "/lessons_in_iframes/level_2/unit_1/lesson_1/bird.js",
    "/lessons_in_iframes/level_2/unit_1/lesson_1/index.html",
    "/lessons_in_iframes/level_2/unit_1/lesson_1/what_bird_sounds_like_1."+soundFileFormat,
    "/lessons_in_iframes/level_2/unit_1/lesson_1/what_bird_sounds_like_2."+soundFileFormat,
    "/lessons_in_iframes/level_2/unit_1/lesson_1/what_bird_sounds_like_3."+soundFileFormat
  ];
  // soundFileFormat exists in js_for_all_iframed_lesson_htmls where it is copied from the parent in js_for_different_browsers_and_devices

  if (isApple || isFirefox) { // See js_for_all_iframed_lesson_htmls and then js_for_different_browsers_and_devices
    listOfFilesForAllLanguages_2_1_1.push(
      "/lessons_in_iframes/level_2/unit_1/lesson_1/v1_h264.mp4",
      "/lessons_in_iframes/level_2/unit_1/lesson_1/v2_h264.mp4"
    );
  } else {
    listOfFilesForAllLanguages_2_1_1.push(
      "/lessons_in_iframes/level_2/unit_1/lesson_1/v1_vp9.webm",
      "/lessons_in_iframes/level_2/unit_1/lesson_1/v2_vp9.webm"
    );
  }
  // ---
  let errorHappened = false;
  try {
    parent.console.log("Caching common files for 2-1-1 ..."); // eruda console displays either the parent window only or the iframe window only
    await cacheForAllLanguages_2_1_1.addAll(listOfFilesForAllLanguages_2_1_1); //parent.console.log("done");
  } catch(err) {
    parent.console.error(err);
    errorHappened = true;
  } finally {
    if (!errorHappened) {
      parent.console.log("... and common files for 2-1-1 are ready");
      localStorage.setItem("lesson211CommonFilesCachedSuccessfully", "splendid");
    } else {
      triesFor211CommonAssets++;
      // Try again if the number of maximum retries is not reached
      // «maximumRetries» and «delayTimeBeforeTryingAgain» exists in 0_parent_initial_load_and_111.js
      if (triesFor211CommonAssets<=parent.maximumRetries) {   setTimeout(function () {  cacheLesson211CommonAssetsForAllLanguages();  }, parent.delayTimeBeforeTryingAgain);   }
      else {   parent.console.warn("Gave up on trying to cache: cacheLesson211CommonAssetsForAllLanguages");   }
    }
  } // End of try-catch-finally

} // END OF cacheLesson211CommonAssetsForAllLanguages


// ---
let triesFor211TargetLangAssets = 0;
async function cacheLesson211AssetsForTheTargetLanguage() {
  const cacheForTargetLanguage_2_1_1 = await caches.open('2-1-1-assets-for-'+parent.langCodeForTeachingFilePaths+'-April2024');
  // ---
  // soundFileFormat exists in js_for_all_iframed_lesson_htmls where it is copied from the parent in js_for_different_browsers_and_devices
  let listOfFilesForTargetLanguage_2_1_1 = [
    "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_2/unit_1/lesson_1/bird_1-2."+soundFileFormat,
    "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_2/unit_1/lesson_1/bird_3."+soundFileFormat,
    "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_2/unit_1/lesson_1/bird_4-5."+soundFileFormat,
    "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_2/unit_1/lesson_1/bird_6."+soundFileFormat,
    "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_2/unit_1/lesson_1/bird_7-8."+soundFileFormat,
    "/speech_recognition_answer_key/"+parent.langCodeForTeachingFilePaths+"/2-1-1-bird.txt"
  ];

  const u = "/user_interface/text/"+userInterfaceLanguage; // See js_for_every_single_html
  switch (parent.langCodeForTeachingFilePaths.substring(0,2)) { // Using substring, we trim "tr_istanbul" to "tr", "zh_putonghua" to "zh" etc
    case "ar":
      listOfFilesForTargetLanguage_2_1_1.push(u+"/2-1-1_vocabulary_p1_p2_ar.txt");
      listOfFilesForTargetLanguage_2_1_1.push("/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_2/unit_1/lesson_1/3sfoor_listenbox_1."+soundFileFormat);
      listOfFilesForTargetLanguage_2_1_1.push("/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_2/unit_1/lesson_1/3sfoor_listenbox_2."+soundFileFormat);
      listOfFilesForTargetLanguage_2_1_1.push("/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_2/unit_1/lesson_1/3sfoor_listenbox_3."+soundFileFormat);
      listOfFilesForTargetLanguage_2_1_1.push("/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_2/unit_1/lesson_1/3sfoor_listenbox_1.json");
      listOfFilesForTargetLanguage_2_1_1.push("/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_2/unit_1/lesson_1/3sfoor_listenbox_2.json");
      listOfFilesForTargetLanguage_2_1_1.push("/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_2/unit_1/lesson_1/3sfoor_listenbox_3.json");
      break;
    case "??":
      // ??
      break;
    default: // Nothing
  }

  // ---
  let errorHappened = false;
  try {
    parent.console.log("Caching files for 2-1-1 "+parent.langCodeForTeachingFilePaths+" ...");
    await cacheForTargetLanguage_2_1_1.addAll(listOfFilesForTargetLanguage_2_1_1); //parent.console.log("done");
  } catch(err) {
    parent.console.error(err);
    errorHappened = true;
  } finally {
    if (!errorHappened) {
      parent.console.log("... and files for 2-1-1 "+parent.langCodeForTeachingFilePaths+" are ready");
      localStorage.setItem("lesson211FilesFor-"+parent.langCodeForTeachingFilePaths+"-CachedSuccessfully", "fabulous");
    } else {
      triesFor211TargetLangAssets++;
      // Try again if the number of maximum retries is not reached
      // «maximumRetries» and «delayTimeBeforeTryingAgain» exists in 0_parent_initial_load_and_111.js
      if (triesFor211TargetLangAssets<=parent.maximumRetries) {   setTimeout(function () {  cacheLesson211AssetsForTheTargetLanguage();  }, parent.delayTimeBeforeTryingAgain);   }
      else {   parent.console.warn("Gave up on trying to cache: cacheLesson211AssetsForTheTargetLanguage");   }
    }
  } // End of try-catch-finally

} // END OF cacheLesson211AssetsForTheTargetLanguage
