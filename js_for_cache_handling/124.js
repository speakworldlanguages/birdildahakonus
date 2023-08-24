"use strict";

if (localStorage.getItem("lesson124CommonFilesCachedSuccessfully")) { parent.console.log("Common files for 124 already cached"); }
else { cacheLesson124CommonAssetsForAllLanguages(); }

if (localStorage.getItem("lesson124FilesFor-"+parent.langCodeForTeachingFilePaths+"-CachedSuccessfully")) { parent.console.log("Files for "+parent.langCodeForTeachingFilePaths+" 124 already cached"); }
else { cacheLesson124AssetsForTheTargetLanguage(); }

async function cacheLesson124CommonAssetsForAllLanguages() {
  const cacheForAllLanguages_1_2_4 = await caches.open('1-2-4-assets-for-all-languages-August2023');
  // ---
  const listOfFilesForAllLanguages_1_2_4 = [
    "/lessons_in_iframes/level_1/unit_2/lesson_4/eat_with_spoon_desktop.js",
    "/lessons_in_iframes/level_1/unit_2/lesson_4/eat_with_spoon_mobile.js",
    "/lessons_in_iframes/level_1/unit_2/lesson_4/eat_with_spoon.css",
    "/lessons_in_iframes/level_1/unit_2/lesson_4/eat_with_spoon.js",
    "/lessons_in_iframes/level_1/unit_2/lesson_4/index.html",
    "/lessons_in_iframes/level_1/unit_2/lesson_4/load_1.webm",
    "/lessons_in_iframes/level_1/unit_2/lesson_4/load_2.webm",
    "/lessons_in_iframes/level_1/unit_2/lesson_4/load_3.webm",
    "/lessons_in_iframes/level_1/unit_2/lesson_4/mousedown_touchend.webm",
    "/lessons_in_iframes/level_1/unit_2/lesson_4/mouseenter_touchstart.webm",
    "/lessons_in_iframes/level_1/unit_2/lesson_4/plate_a.webp",
    "/lessons_in_iframes/level_1/unit_2/lesson_4/plate_b.webp",
    "/lessons_in_iframes/level_1/unit_2/lesson_4/plate_c.webp",
    "/lessons_in_iframes/level_1/unit_2/lesson_4/plate_d.webp",
    "/lessons_in_iframes/level_1/unit_2/lesson_4/scoop_some_food.webm",
    "/lessons_in_iframes/level_1/unit_2/lesson_4/spoon_a.webp",
    "/lessons_in_iframes/level_1/unit_2/lesson_4/spoon_b.webp",
    "/lessons_in_iframes/level_1/unit_2/lesson_4/spoon_c.webp",
    "/lessons_in_iframes/level_1/unit_2/lesson_4/spoon_d.webp",
    "/lessons_in_iframes/level_1/unit_2/lesson_4/spoon_on_porcelain.webm",
    "/lessons_in_iframes/level_1/unit_2/lesson_4/swallow_1.webm",
    "/lessons_in_iframes/level_1/unit_2/lesson_4/swallow_2.webm",
    "/lessons_in_iframes/level_1/unit_2/lesson_4/swallow_3.webm",
    "/lessons_in_iframes/level_1/unit_2/lesson_4/win.webm",
    "/user_interface/text/"+userInterfaceLanguage+"/1-2-4.txt", // See js_for_every_single_html to find userInterfaceLanguage
    "/user_interface/text/"+userInterfaceLanguage+"/1-2-4_vocabulary_p1_p2.txt"

  ];

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
    await cacheForAllLanguages_1_2_4.addAll(listOfFilesForAllLanguages_1_2_4); parent.console.log("done");
  } catch(err) {
    parent.console.error(err);
    errorHappened = true;
  } finally {
    if (!errorHappened) {
      parent.console.log("... and common files for 1-2-4 are ready");
      localStorage.setItem("lesson124CommonFilesCachedSuccessfully", "glorious");
    }
  } // End of try-catch-finally

} // END OF cacheLesson124CommonAssetsForAllLanguages


async function cacheLesson124AssetsForTheTargetLanguage() {
  const cacheForTargetLanguage_1_2_4 = await caches.open('1-2-4-assets-for-'+parent.langCodeForTeachingFilePaths+'-August2023');
  // ---
  let itemA = "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_2/lesson_4/with_listenbox.webm";
  let item1 = "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_2/lesson_4/eat_normal.webm";
  let item2 = "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_2/lesson_4/eat_slow.webm";
  let item3 = "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_2/lesson_4/eat_with_spoon_normal.webm";
  let item4 = "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_2/lesson_4/eat_with_spoon_slow.webm";
  let item5 = "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_2/lesson_4/say_when_meal_is_finished.webm";

  if (parent.userIsFemaleSoUseFemaleConjugation) { // See js_for_the_parent_all_browsers_all_devices
    item1 = item1.split(".")[0] + "_tofemale.webm";
    item2 = item2.split(".")[0] + "_tofemale.webm";
    item3 = item3.split(".")[0] + "_tofemale.webm";
    item4 = item4.split(".")[0] + "_tofemale.webm";
    item5 = item5.split(".")[0] + "_tofemale.webm";
  }
  let listOfFilesForTargetLanguage_1_2_4 = [
    itemA,
    item1,    item2,    item3,    item4,    item5
  ];

  const u = "/user_interface/text/"+userInterfaceLanguage; // Works without "parent." notation » See js_for_every_single_html
  switch (parent.langCodeForTeachingFilePaths.substring(0,2)) { // Using substring, we trim "tr_istanbul" to "tr", "zh_putonghua" to "zh" etc
    case "ar":
      listOfFilesForTargetLanguage_1_2_4.push(u+"/1-2-4_arabic_tanaawal.txt");
      break;
    case "ja":
      listOfFilesForTargetLanguage_1_2_4.push(u+"/1-2-4_end_of_meal_ja.txt");
      break;
    case "tr":
      listOfFilesForTargetLanguage_1_2_4.push(u+"/1-2-4_end_of_meal_tr.txt");
      listOfFilesForTargetLanguage_1_2_4.push(u+"/1-2-4_kishi_harmony.txt");
      break;
    default: // Nothing
  }
  // ---
  let errorHappened = false;
  try {
    parent.console.log("Caching files for 1-2-4 "+parent.langCodeForTeachingFilePaths+" ...");
    await cacheForTargetLanguage_1_2_4.addAll(listOfFilesForTargetLanguage_1_2_4); parent.console.log("done");
  } catch(err) {
    parent.console.error(err);
    errorHappened = true;
  } finally {
    if (!errorHappened) {
      parent.console.log("... and files for 1-2-4 "+parent.langCodeForTeachingFilePaths+" are ready");
      localStorage.setItem("lesson124FilesFor-"+parent.langCodeForTeachingFilePaths+"-CachedSuccessfully", "tremendous");
    }
  } // End of try-catch-finally

} // END OF cacheLesson124AssetsForTheTargetLanguage
