"use strict";

if (localStorage.getItem("lesson124CommonFilesCachedSuccessfully")) { parent.console.log("Common files for 124 already cached"); }
else { cacheLesson124CommonAssetsForAllLanguages(); }

if (localStorage.getItem("lesson124FilesFor-"+parent.langCodeForTeachingFilePaths+"-CachedSuccessfully")) { parent.console.log("Files for "+parent.langCodeForTeachingFilePaths+" 124 already cached"); }
else { cacheLesson124AssetsForTheTargetLanguage(); }

let triesFor124CommonAssets = 0;
async function cacheLesson124CommonAssetsForAllLanguages() {
  const cacheForAllLanguages_1_2_4 = await caches.open('1-2-4-assets-for-all-languages-August2023');
  // ---
  let listOfFilesForAllLanguages_1_2_4 = [
    "/lessons_in_iframes/level_1/unit_2/lesson_4/eat_with_spoon_desktop.js",
    "/lessons_in_iframes/level_1/unit_2/lesson_4/eat_with_spoon_mobile.js",
    "/lessons_in_iframes/level_1/unit_2/lesson_4/eat_with_spoon.css",
    "/lessons_in_iframes/level_1/unit_2/lesson_4/eat_with_spoon.js",
    "/lessons_in_iframes/level_1/unit_2/lesson_4/index.html",
    "/lessons_in_iframes/level_1/unit_2/lesson_4/load_1."+soundFileFormat,
    "/lessons_in_iframes/level_1/unit_2/lesson_4/load_2."+soundFileFormat,
    "/lessons_in_iframes/level_1/unit_2/lesson_4/load_3."+soundFileFormat,
    "/lessons_in_iframes/level_1/unit_2/lesson_4/mousedown_touchend."+soundFileFormat,
    "/lessons_in_iframes/level_1/unit_2/lesson_4/mouseenter_touchstart."+soundFileFormat,
    "/lessons_in_iframes/level_1/unit_2/lesson_4/plate_a.webp",
    "/lessons_in_iframes/level_1/unit_2/lesson_4/plate_b.webp",
    "/lessons_in_iframes/level_1/unit_2/lesson_4/plate_c.webp",
    "/lessons_in_iframes/level_1/unit_2/lesson_4/plate_d.webp",
    "/lessons_in_iframes/level_1/unit_2/lesson_4/scoop_some_food."+soundFileFormat,
    "/lessons_in_iframes/level_1/unit_2/lesson_4/spoon_a.webp",
    "/lessons_in_iframes/level_1/unit_2/lesson_4/spoon_b.webp",
    "/lessons_in_iframes/level_1/unit_2/lesson_4/spoon_c.webp",
    "/lessons_in_iframes/level_1/unit_2/lesson_4/spoon_d.webp",
    "/lessons_in_iframes/level_1/unit_2/lesson_4/spoon_on_porcelain."+soundFileFormat,
    "/lessons_in_iframes/level_1/unit_2/lesson_4/swallow_1."+soundFileFormat,
    "/lessons_in_iframes/level_1/unit_2/lesson_4/swallow_2."+soundFileFormat,
    "/lessons_in_iframes/level_1/unit_2/lesson_4/swallow_3."+soundFileFormat,
    "/lessons_in_iframes/level_1/unit_2/lesson_4/win."+soundFileFormat,
    "/user_interface/text/"+userInterfaceLanguage+"/1-2-4.txt", // See js_for_every_single_html to find userInterfaceLanguage
    "/user_interface/text/"+userInterfaceLanguage+"/1-2-4_vocabulary_p1_p2.txt"
  ];
  // soundFileFormat exists in js_for_all_iframed_lesson_htmls where it is copied from the parent in js_for_different_browsers_and_devices

  if (deviceDetector.device == "tablet") {
    listOfFilesForAllLanguages_1_2_4.push(
      "/lessons_in_iframes/level_1/unit_2/lesson_4/tablet_move_show_how.webp",
      "/lessons_in_iframes/level_1/unit_2/lesson_4/tablet_unpinch_show_how.webp"
    );
  } else if (deviceDetector.device == "phone") {
    listOfFilesForAllLanguages_1_2_4.push(
      "/lessons_in_iframes/level_1/unit_2/lesson_4/phone_move_show_how.webp",
      "/lessons_in_iframes/level_1/unit_2/lesson_4/phone_unpinch_show_how.webp"
    );
  } else { // desktop
    listOfFilesForAllLanguages_1_2_4.push(
      "/lessons_in_iframes/level_1/unit_2/lesson_4/mousewheel_show_how.webp"
    );
  }

  // ---
  let errorHappened = false;
  try {
    parent.console.log("Caching common files for 1-2-4 ..."); // eruda console displays either the parent window only or the iframe window only
    await cacheForAllLanguages_1_2_4.addAll(listOfFilesForAllLanguages_1_2_4); //parent.console.log("done");
  } catch(err) {
    parent.console.error(err);
    errorHappened = true;
  } finally {
    if (!errorHappened) {
      parent.console.log("... and common files for 1-2-4 are ready");
      localStorage.setItem("lesson124CommonFilesCachedSuccessfully", "glorious");
    } else {
      triesFor124CommonAssets++;
      // Try again if the number of maximum retries is not reached
      // «maximumRetries» and «delayTimeBeforeTryingAgain» exists in 0_parent_initial_load_and_111.js
      if (triesFor124CommonAssets<=parent.maximumRetries) {   setTimeout(function () {  cacheLesson124CommonAssetsForAllLanguages();  }, parent.delayTimeBeforeTryingAgain);   }
      else {   parent.console.warn("Gave up on trying to cache: cacheLesson124CommonAssetsForAllLanguages");   }
    }
  } // End of try-catch-finally

} // END OF cacheLesson124CommonAssetsForAllLanguages


// ---
let triesFor124TargetLangAssets = 0;
async function cacheLesson124AssetsForTheTargetLanguage() {
  const cacheForTargetLanguage_1_2_4 = await caches.open('1-2-4-assets-for-'+parent.langCodeForTeachingFilePaths+'-August2023');
  // ---
  // soundFileFormat exists in js_for_all_iframed_lesson_htmls where it is copied from the parent in js_for_different_browsers_and_devices
  let itemA  = "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_2/lesson_4/with_listenbox_1."+soundFileFormat;
  let itemAj = "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_2/lesson_4/with_listenbox_1.json";
  let itemB  = "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_2/lesson_4/with_listenbox_2."+soundFileFormat;
  let itemBj = "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_2/lesson_4/with_listenbox_2.json";
  let itemC  = "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_2/lesson_4/with_listenbox_3."+soundFileFormat;
  let itemCj = "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_2/lesson_4/with_listenbox_3.json";
  let item1  = "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_2/lesson_4/eat_normal."+soundFileFormat;
  let item2  = "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_2/lesson_4/eat_slow."+soundFileFormat;
  let item3  = "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_2/lesson_4/eat_with_spoon_normal."+soundFileFormat;
  let item4  = "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_2/lesson_4/eat_with_spoon_slow."+soundFileFormat;
  let item5  = "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_2/lesson_4/say_when_meal_is_finished."+soundFileFormat;

  if (parent.userIsFemaleSoUseFemaleConjugation) { // See js_for_the_parent_all_browsers_all_devices
    item1 = item1.split(".")[0] + "_tofemale."+soundFileFormat;
    item2 = item2.split(".")[0] + "_tofemale."+soundFileFormat;
    item3 = item3.split(".")[0] + "_tofemale."+soundFileFormat;
    item4 = item4.split(".")[0] + "_tofemale."+soundFileFormat;
    item5 = item5.split(".")[0] + "_tofemale."+soundFileFormat;
  }
  let listOfFilesForTargetLanguage_1_2_4 = [
    itemA, itemAj, itemB, itemBj, itemC, itemCj,
    item1,    item2,    item3,    item4,    item5
  ];

  const u = "/user_interface/text/"+userInterfaceLanguage; // Works without "parent." notation » See js_for_every_single_html
  switch (parent.langCodeForTeachingFilePaths.substring(0,2)) { // Using substring, we trim "tr_istanbul" to "tr", "zh_putonghua" to "zh" etc
    case "ar":
      // deprecated: listOfFilesForTargetLanguage_1_2_4.push(u+"/1-2-4_arabic_tanaawal.txt");
      listOfFilesForTargetLanguage_1_2_4.push(u+"/1-2-4_vocabulary_outro_p1_p2_ar.txt");
      listOfFilesForTargetLanguage_1_2_4.push("/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_2/lesson_4/tanaawal_listenbox_1."+soundFileFormat);
      listOfFilesForTargetLanguage_1_2_4.push("/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_2/lesson_4/tanaawal_listenbox_2."+soundFileFormat);
      listOfFilesForTargetLanguage_1_2_4.push("/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_2/lesson_4/tanaawal_listenbox_3."+soundFileFormat);
      listOfFilesForTargetLanguage_1_2_4.push("/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_2/lesson_4/tanaawal_listenbox_1.json");
      listOfFilesForTargetLanguage_1_2_4.push("/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_2/lesson_4/tanaawal_listenbox_2.json");
      listOfFilesForTargetLanguage_1_2_4.push("/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_2/lesson_4/tanaawal_listenbox_3.json");
      break;
    case "ko":
      listOfFilesForTargetLanguage_1_2_4.push(u+"/1-2-4_vocabulary_outro_p1_p2_ko.txt");
      listOfFilesForTargetLanguage_1_2_4.push("/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_2/lesson_4/deuseyo_listenbox_1."+soundFileFormat);
      listOfFilesForTargetLanguage_1_2_4.push("/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_2/lesson_4/deuseyo_listenbox_2."+soundFileFormat);
      listOfFilesForTargetLanguage_1_2_4.push("/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_2/lesson_4/deuseyo_listenbox_3."+soundFileFormat);
      listOfFilesForTargetLanguage_1_2_4.push("/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_2/lesson_4/deuseyo_listenbox_1.json");
      listOfFilesForTargetLanguage_1_2_4.push("/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_2/lesson_4/deuseyo_listenbox_2.json");
      listOfFilesForTargetLanguage_1_2_4.push("/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_2/lesson_4/deuseyo_listenbox_3.json");
      break;
    case "ja":
      listOfFilesForTargetLanguage_1_2_4.push(u+"/1-2-4_end_of_meal_ja.txt");
      break;
    case "tr":
      listOfFilesForTargetLanguage_1_2_4.push(u+"/1-2-4_kishi_harmony.txt");
      listOfFilesForTargetLanguage_1_2_4.push(u+"/1-2-4_end_of_meal_tr.txt");
      break;
    default: // Nothing
  }
  // ---
  let errorHappened = false;
  try {
    parent.console.log("Caching files for 1-2-4 "+parent.langCodeForTeachingFilePaths+" ...");
    await cacheForTargetLanguage_1_2_4.addAll(listOfFilesForTargetLanguage_1_2_4); //parent.console.log("done");
  } catch(err) {
    parent.console.error(err);
    errorHappened = true;
  } finally {
    if (!errorHappened) {
      parent.console.log("... and files for 1-2-4 "+parent.langCodeForTeachingFilePaths+" are ready");
      localStorage.setItem("lesson124FilesFor-"+parent.langCodeForTeachingFilePaths+"-CachedSuccessfully", "tremendous");
    } else {
      triesFor124TargetLangAssets++;
      // Try again if the number of maximum retries is not reached
      // «maximumRetries» and «delayTimeBeforeTryingAgain» exists in 0_parent_initial_load_and_111.js
      if (triesFor124TargetLangAssets<=parent.maximumRetries) {   setTimeout(function () {  cacheLesson124AssetsForTheTargetLanguage();  }, parent.delayTimeBeforeTryingAgain);   }
      else {   parent.console.warn("Gave up on trying to cache: cacheLesson124AssetsForTheTargetLanguage");   }
    }
  } // End of try-catch-finally

} // END OF cacheLesson124AssetsForTheTargetLanguage
