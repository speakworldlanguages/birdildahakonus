"use strict";

if (localStorage.getItem("authorsNotice1FilesCachedSuccessfully")) {  }
else { cacheAuthorsNotice1Assets(); }

if (localStorage.getItem("lesson121CommonFilesCachedSuccessfully")) { parent.console.log("Common files for 121 already cached"); }
else { cacheLesson121CommonAssetsForAllLanguages(); }

if (localStorage.getItem("lesson121FilesFor-"+parent.langCodeForTeachingFilePaths+"-CachedSuccessfully")) { parent.console.log("Files for "+parent.langCodeForTeachingFilePaths+" 121 already cached"); }
else { cacheLesson121AssetsForTheTargetLanguage(); }

// ---
let triesForNotice1Assets = 0;
async function cacheAuthorsNotice1Assets() {
  const cacheSlot = await caches.open('assets-for-bakernotice1-August2023');
  const list = [
    "/lessons_in_iframes/level_1/unit_1/notice_1/baked_by_the_author_himself.webp",
    "/lessons_in_iframes/level_1/unit_1/notice_1/earthman_topraksoy_tsuchimoto.webp",
    "/lessons_in_iframes/level_1/unit_1/notice_1/index.html",
    "/lessons_in_iframes/level_1/unit_1/notice_1/notice.css",
    "/lessons_in_iframes/level_1/unit_1/notice_1/notice.js",
    "/user_interface/text/"+userInterfaceLanguage+"/1-1-notice_author_says.txt"
    // FOLLOWING FILES ARE ALSO USED IN notice1 but cached by cacheCommonFilesForAllLessons() in js_for_cache_handling/0_parent_initial_load_and_111
    // "/user_interface/sounds/looping_bgm_stereo_therapy."+soundFileFormat
    // "/user_interface/sounds/authors_notice_next_button_hover."+soundFileFormat
    // "/user_interface/sounds/authors_notice_next_button_click."+soundFileFormat
  ];
  // ---
  let errorHappened = false;
  try {
    await cacheSlot.addAll(list);
  } catch(err) {
    parent.console.error(err);
    errorHappened = true;
  } finally {
    if (!errorHappened) {
      localStorage.setItem("authorsNotice1FilesCachedSuccessfully", "beautiful");
    } else {
      triesForNotice1Assets++;
      // Try again if the number of maximum retries is not reached
      // «maximumRetries» and «delayTimeBeforeTryingAgain» exists in 0_parent_initial_load_and_111.js
      if (triesForNotice1Assets<=parent.maximumRetries) {   setTimeout(function () {  cacheAuthorsNotice1Assets();  }, parent.delayTimeBeforeTryingAgain);   }
      else {   parent.console.warn("Gave up on trying to cache: cacheAuthorsNotice1Assets");   }
    }
  } // End of try-catch-finally
} // END OF cacheAuthorsNotice1Assets

// ---
let triesFor121CommonAssets = 0;
async function cacheLesson121CommonAssetsForAllLanguages() {
  const cacheForAllLanguages_1_2_1 = await caches.open('1-2-1-assets-for-all-languages-August2023');
  // ---
  let listOfFilesForAllLanguages_1_2_1 = [
    "/lessons_in_iframes/level_1/unit_2/lesson_1/1a.avif",
    "/lessons_in_iframes/level_1/unit_2/lesson_1/1b.avif",
    "/lessons_in_iframes/level_1/unit_2/lesson_1/2a.avif",
    "/lessons_in_iframes/level_1/unit_2/lesson_1/2b.avif",
    "/lessons_in_iframes/level_1/unit_2/lesson_1/3a.avif",
    "/lessons_in_iframes/level_1/unit_2/lesson_1/3b.avif",
    "/lessons_in_iframes/level_1/unit_2/lesson_1/c1.avif",
    "/lessons_in_iframes/level_1/unit_2/lesson_1/c2.avif",
    "/lessons_in_iframes/level_1/unit_2/lesson_1/c3.avif",
    "/lessons_in_iframes/level_1/unit_2/lesson_1/c4.avif",
    "/lessons_in_iframes/level_1/unit_2/lesson_1/c5.avif",
    "/lessons_in_iframes/level_1/unit_2/lesson_1/c6.avif",
    "/lessons_in_iframes/level_1/unit_2/lesson_1/c7.avif",
    "/lessons_in_iframes/level_1/unit_2/lesson_1/c8.avif",
    "/lessons_in_iframes/level_1/unit_2/lesson_1/c9.avif",
    "/lessons_in_iframes/level_1/unit_2/lesson_1/c10.avif",
    "/lessons_in_iframes/level_1/unit_2/lesson_1/glass.js",
    "/lessons_in_iframes/level_1/unit_2/lesson_1/index.html",
    "/lessons_in_iframes/level_1/unit_2/lesson_1/what_glass_sounds_like_1."+soundFileFormat,
    "/lessons_in_iframes/level_1/unit_2/lesson_1/what_glass_sounds_like_2."+soundFileFormat
  ];
  // soundFileFormat exists in js_for_all_iframed_lesson_htmls where it is copied from the parent in js_for_different_browsers_and_devices

  if (isApple || isFirefox) { // See js_for_all_iframed_lesson_htmls and then js_for_different_browsers_and_devices
    listOfFilesForAllLanguages_1_2_1.push(
      "/lessons_in_iframes/level_1/unit_2/lesson_1/v1_h264.mp4",
      "/lessons_in_iframes/level_1/unit_2/lesson_1/v2_h264.mp4"
    );
  } else {
    listOfFilesForAllLanguages_1_2_1.push(
      "/lessons_in_iframes/level_1/unit_2/lesson_1/v1_vp9.webm",
      "/lessons_in_iframes/level_1/unit_2/lesson_1/v2_vp9.webm"
    );
  }
  // ---
  let errorHappened = false;
  try {
    parent.console.log("Caching common files for 1-2-1 ..."); // eruda console displays either the parent window only or the iframe window only
    await cacheForAllLanguages_1_2_1.addAll(listOfFilesForAllLanguages_1_2_1); //parent.console.log("done");
  } catch(err) {
    parent.console.error(err);
    errorHappened = true;
  } finally {
    if (!errorHappened) {
      parent.console.log("... and common files for 1-2-1 are ready");
      localStorage.setItem("lesson121CommonFilesCachedSuccessfully", "freshmint");
    } else {
      triesFor121CommonAssets++;
      // Try again if the number of maximum retries is not reached
      // «maximumRetries» and «delayTimeBeforeTryingAgain» exists in 0_parent_initial_load_and_111.js
      if (triesFor121CommonAssets<=parent.maximumRetries) {   setTimeout(function () {  cacheLesson121CommonAssetsForAllLanguages();  }, parent.delayTimeBeforeTryingAgain);   }
      else {   parent.console.warn("Gave up on trying to cache: cacheLesson121CommonAssetsForAllLanguages");   }
    }
  } // End of try-catch-finally

} // END OF cacheLesson121CommonAssetsForAllLanguages


// ---
let triesFor121TargetLangAssets = 0;
async function cacheLesson121AssetsForTheTargetLanguage() {
  const cacheForTargetLanguage_1_2_1 = await caches.open('1-2-1-assets-for-'+parent.langCodeForTeachingFilePaths+'-August2023');
  // ---
  // soundFileFormat exists in js_for_all_iframed_lesson_htmls where it is copied from the parent in js_for_different_browsers_and_devices
  let listOfFilesForTargetLanguage_1_2_1 = [
    "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_2/lesson_1/glass_1-2."+soundFileFormat,
    "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_2/lesson_1/glass_3."+soundFileFormat,
    "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_2/lesson_1/glass_4-5."+soundFileFormat,
    "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_2/lesson_1/glass_6."+soundFileFormat,
    "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_2/lesson_1/glass_7-8."+soundFileFormat,
    "/speech_recognition_answer_key/"+parent.langCodeForTeachingFilePaths+"/1-2-1-glass.txt"
  ];


  const u = "/user_interface/text/"+userInterfaceLanguage; // See js_for_every_single_html
  switch (parent.langCodeForTeachingFilePaths.substring(0,2)) { // Using substring, we trim "tr_istanbul" to "tr", "zh_putonghua" to "zh" etc
    case "ar":
      listOfFilesForTargetLanguage_1_2_1.push(u+"/1-2-1_vocabulary_p1_p2_ar.txt");
      listOfFilesForTargetLanguage_1_2_1.push("/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_2/lesson_1/kaas_listenbox_1."+soundFileFormat);
      listOfFilesForTargetLanguage_1_2_1.push("/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_2/lesson_1/kaas_listenbox_2."+soundFileFormat);
      listOfFilesForTargetLanguage_1_2_1.push("/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_2/lesson_1/kaas_listenbox_3."+soundFileFormat);
      listOfFilesForTargetLanguage_1_2_1.push("/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_2/lesson_1/kaas_listenbox_1.json");
      listOfFilesForTargetLanguage_1_2_1.push("/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_2/lesson_1/kaas_listenbox_2.json");
      listOfFilesForTargetLanguage_1_2_1.push("/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_2/lesson_1/kaas_listenbox_3.json");
      break;
    case "ko":
      listOfFilesForTargetLanguage_1_2_1.push(u+"/1-2-1_vocabulary_p1_p2_ko.txt");
      listOfFilesForTargetLanguage_1_2_1.push("/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_2/lesson_1/jan_listenbox_1."+soundFileFormat);
      listOfFilesForTargetLanguage_1_2_1.push("/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_2/lesson_1/jan_listenbox_2."+soundFileFormat);
      listOfFilesForTargetLanguage_1_2_1.push("/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_2/lesson_1/jan_listenbox_3."+soundFileFormat);
      listOfFilesForTargetLanguage_1_2_1.push("/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_2/lesson_1/jan_listenbox_1.json");
      listOfFilesForTargetLanguage_1_2_1.push("/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_2/lesson_1/jan_listenbox_2.json");
      listOfFilesForTargetLanguage_1_2_1.push("/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_2/lesson_1/jan_listenbox_3.json");
      break;
    default: // Nothing
  }


  // ---
  let errorHappened = false;
  try {
    parent.console.log("Caching files for 1-2-1 "+parent.langCodeForTeachingFilePaths+" ...");
    await cacheForTargetLanguage_1_2_1.addAll(listOfFilesForTargetLanguage_1_2_1); //parent.console.log("done");
  } catch(err) {
    parent.console.error(err);
    errorHappened = true;
  } finally {
    if (!errorHappened) {
      parent.console.log("... and files for 1-2-1 "+parent.langCodeForTeachingFilePaths+" are ready");
      localStorage.setItem("lesson121FilesFor-"+parent.langCodeForTeachingFilePaths+"-CachedSuccessfully", "brilliant");
    } else {
      triesFor121TargetLangAssets++;
      // Try again if the number of maximum retries is not reached
      // «maximumRetries» and «delayTimeBeforeTryingAgain» exists in 0_parent_initial_load_and_111.js
      if (triesFor121TargetLangAssets<=parent.maximumRetries) {   setTimeout(function () {  cacheLesson121AssetsForTheTargetLanguage();  }, parent.delayTimeBeforeTryingAgain);   }
      else {   parent.console.warn("Gave up on trying to cache: cacheLesson121AssetsForTheTargetLanguage");   }
    }
  } // End of try-catch-finally

} // END OF cacheLesson121AssetsForTheTargetLanguage
