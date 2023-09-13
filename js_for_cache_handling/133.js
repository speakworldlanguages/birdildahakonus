"use strict";

if (localStorage.getItem("lesson133CommonFilesCachedSuccessfully")) { parent.console.log("Common files for 133 already cached"); }
else { cacheLesson133CommonAssetsForAllLanguages(); }

if (localStorage.getItem("lesson133FilesFor-"+parent.langCodeForTeachingFilePaths+"-CachedSuccessfully")) { parent.console.log("Files for "+parent.langCodeForTeachingFilePaths+" 133 already cached"); }
else { cacheLesson133AssetsForTheTargetLanguage(); }


async function cacheLesson133CommonAssetsForAllLanguages() {
  const cacheForAllLanguages_1_3_3 = await caches.open('1-3-3-assets-for-all-languages-September2023');
  // ---
  let listOfFilesForAllLanguages_1_3_3 = [
    "/lessons_in_iframes/level_1/unit_3/lesson_3/1a.avif",
    "/lessons_in_iframes/level_1/unit_3/lesson_3/1b.avif",
    "/lessons_in_iframes/level_1/unit_3/lesson_3/2a.avif",
    "/lessons_in_iframes/level_1/unit_3/lesson_3/2b.avif",
    "/lessons_in_iframes/level_1/unit_3/lesson_3/3a.avif",
    "/lessons_in_iframes/level_1/unit_3/lesson_3/3b.avif",
    "/lessons_in_iframes/level_1/unit_3/lesson_3/c1.avif",
    "/lessons_in_iframes/level_1/unit_3/lesson_3/c2.avif",
    "/lessons_in_iframes/level_1/unit_3/lesson_3/c3.avif",
    "/lessons_in_iframes/level_1/unit_3/lesson_3/c4.avif",
    "/lessons_in_iframes/level_1/unit_3/lesson_3/c5.avif",
    "/lessons_in_iframes/level_1/unit_3/lesson_3/c6.avif",
    "/lessons_in_iframes/level_1/unit_3/lesson_3/c7.avif",
    "/lessons_in_iframes/level_1/unit_3/lesson_3/c8.avif",
    "/lessons_in_iframes/level_1/unit_3/lesson_3/c9.avif",
    "/lessons_in_iframes/level_1/unit_3/lesson_3/c10.avif",
    "/lessons_in_iframes/level_1/unit_3/lesson_3/index.html",
    "/lessons_in_iframes/level_1/unit_3/lesson_3/tree.css",
    "/lessons_in_iframes/level_1/unit_3/lesson_3/tree.js",
    "/lessons_in_iframes/level_1/unit_3/lesson_3/what_tree_sounds_like_1."+soundFileFormat,
    "/lessons_in_iframes/level_1/unit_3/lesson_3/what_tree_sounds_like_2."+soundFileFormat
  ];
  // soundFileFormat exists in js_for_all_iframed_lesson_htmls where it is copied from the parent in js_for_different_browsers_and_devices

  /* DEPRECATE and use soundFileFormat from js_for_all_iframed_lesson_htmls which copies it from js_for_different_browsers_and_devices
  // CAREFUL: All webm sounds shall change into mp3 on Apple. Make sure webm videos are excluded from change mapping.
  if (isApple) {
    listOfFilesForAllLanguages_1_3_3 = listOfFilesForAllLanguages_1_3_3.map(filepath => filepath.replace(".webm", ".mp3"));
  }
  */
  if (isApple || isFirefox) { // See js_for_all_iframed_lesson_htmls and then js_for_different_browsers_and_devices
    listOfFilesForAllLanguages_1_3_3.push(
      "/lessons_in_iframes/level_1/unit_3/lesson_3/v1_h264.mp4",
      "/lessons_in_iframes/level_1/unit_3/lesson_3/v2_h264.mp4"
    );
  } else {
    listOfFilesForAllLanguages_1_3_3.push(
      "/lessons_in_iframes/level_1/unit_3/lesson_3/v1_vp9.webm",
      "/lessons_in_iframes/level_1/unit_3/lesson_3/v2_vp9.webm"
    );
  }
  // ---
  let errorHappened = false;
  try {
    parent.console.log("Caching common files for 1-3-3 ..."); // eruda console displays either the parent window only or the iframe window only
    await cacheForAllLanguages_1_3_3.addAll(listOfFilesForAllLanguages_1_3_3); //parent.console.log("done");
  } catch(err) {
    parent.console.error(err);
    errorHappened = true;
  } finally {
    if (!errorHappened) {
      parent.console.log("... and common files for 1-3-3 are ready");
      localStorage.setItem("lesson133CommonFilesCachedSuccessfully", "splendid");
    } else {
      // Try again
      setTimeout(function () {  cacheLesson133CommonAssetsForAllLanguages();  }, 4000);
    }
  } // End of try-catch-finally

} // END OF cacheLesson133CommonAssetsForAllLanguages


async function cacheLesson133AssetsForTheTargetLanguage() {
  const cacheForTargetLanguage_1_3_3 = await caches.open('1-3-3-assets-for-'+parent.langCodeForTeachingFilePaths+'-September2023');
  // ---
  // soundFileFormat exists in js_for_all_iframed_lesson_htmls where it is copied from the parent in js_for_different_browsers_and_devices
  let listOfFilesForTargetLanguage_1_3_3 = [
    "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_3/lesson_3/tree_1-2."+soundFileFormat,
    "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_3/lesson_3/tree_3."+soundFileFormat,
    "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_3/lesson_3/tree_4-5."+soundFileFormat,
    "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_3/lesson_3/tree_6."+soundFileFormat,
    "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_3/lesson_3/tree_7-8."+soundFileFormat,
    "/speech_recognition_answer_key/"+parent.langCodeForTeachingFilePaths+"/1-3-3-tree.txt"
  ];
  /* DEPRECATE and use soundFileFormat from js_for_all_iframed_lesson_htmls which copies it from js_for_different_browsers_and_devices
  // CAREFUL: All webm sounds shall change into mp3 on Apple. Make sure webm videos are excluded from change mapping.
  if (isApple) {
    listOfFilesForTargetLanguage_1_3_3 = listOfFilesForTargetLanguage_1_3_3.map(filepath => filepath.replace(".webm", ".mp3"));
  }
  */
  /*
  const u = "/user_interface/text/"+userInterfaceLanguage; // See js_for_every_single_html
  switch (parent.langCodeForTeachingFilePaths.substring(0,2)) { // Using substring, we trim "tr_istanbul" to "tr", "zh_putonghua" to "zh" etc
    case "??":
      listOfFilesForTargetLanguage_1_3_3.push(u+"/1-3-3_???.txt");
      break;
    default: // Nothing
  }
  */
  // ---
  let errorHappened = false;
  try {
    parent.console.log("Caching files for 1-3-3 "+parent.langCodeForTeachingFilePaths+" ...");
    await cacheForTargetLanguage_1_3_3.addAll(listOfFilesForTargetLanguage_1_3_3); //parent.console.log("done");
  } catch(err) {
    parent.console.error(err);
    errorHappened = true;
  } finally {
    if (!errorHappened) {
      parent.console.log("... and files for 1-3-3 "+parent.langCodeForTeachingFilePaths+" are ready");
      localStorage.setItem("lesson133FilesFor-"+parent.langCodeForTeachingFilePaths+"-CachedSuccessfully", "magnificent");
    } else {
      // Try again
      setTimeout(function () {  cacheLesson133AssetsForTheTargetLanguage();  }, 4000);
    }
  } // End of try-catch-finally

} // END OF cacheLesson133AssetsForTheTargetLanguage
