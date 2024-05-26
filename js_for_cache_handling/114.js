"use strict";

if (localStorage.getItem("lesson114CommonFilesCachedSuccessfully")) { parent.console.log("Common files for 114 already cached"); }
else { cacheLesson114CommonAssetsForAllLanguages(); }

if (localStorage.getItem("lesson114FilesFor-"+parent.langCodeForTeachingFilePaths+"-CachedSuccessfully")) { parent.console.log("Files for "+parent.langCodeForTeachingFilePaths+" 114 already cached"); }
else { cacheLesson114AssetsForTheTargetLanguage(); }

let triesFor114CommonAssets = 0;
async function cacheLesson114CommonAssetsForAllLanguages() {
  const cacheForAllLanguages_1_1_4 = await caches.open('1-1-4-assets-for-all-languages-August2023');
  // ---
  let listOfFilesForAllLanguages_1_1_4 = [
    "/lessons_in_iframes/level_1/unit_1/lesson_4/bite_0."+soundFileFormat,
    "/lessons_in_iframes/level_1/unit_1/lesson_4/bite_1."+soundFileFormat,
    "/lessons_in_iframes/level_1/unit_1/lesson_4/bite_2."+soundFileFormat,
    "/lessons_in_iframes/level_1/unit_1/lesson_4/bite_3."+soundFileFormat,
    "/lessons_in_iframes/level_1/unit_1/lesson_4/bite1.webp",
    "/lessons_in_iframes/level_1/unit_1/lesson_4/bite2.webp",
    "/lessons_in_iframes/level_1/unit_1/lesson_4/bite3.webp",
    "/lessons_in_iframes/level_1/unit_1/lesson_4/eyes_big_happy.webp",
    "/lessons_in_iframes/level_1/unit_1/lesson_4/eyes_blinking_naturally.webp",
    "/lessons_in_iframes/level_1/unit_1/lesson_4/eyes_closed_happy.webp",
    "/lessons_in_iframes/level_1/unit_1/lesson_4/far_bread.webp",
    "/lessons_in_iframes/level_1/unit_1/lesson_4/grab_the_loaf.webp",
    "/lessons_in_iframes/level_1/unit_1/lesson_4/index.html",

    "/lessons_in_iframes/level_1/unit_1/lesson_4/near_bread.webp",

    "/lessons_in_iframes/level_1/unit_1/lesson_4/speech_bubble_bread_and_arrow.webp",
    "/lessons_in_iframes/level_1/unit_1/lesson_4/speech_bubble_bread_and_hand.webp",
    "/lessons_in_iframes/level_1/unit_1/lesson_4/speech_bubble_eat.webp",

    "/lessons_in_iframes/level_1/unit_1/lesson_4/take_bread_state_a.webp",
    "/lessons_in_iframes/level_1/unit_1/lesson_4/take_bread_state_b.webp",
    "/lessons_in_iframes/level_1/unit_1/lesson_4/take_bread_state_c.webp",
    "/lessons_in_iframes/level_1/unit_1/lesson_4/take_bread.css",
    "/lessons_in_iframes/level_1/unit_1/lesson_4/take_bread.js",
    "/lessons_in_iframes/level_1/unit_1/lesson_4/teeth_lower.webp",
    "/lessons_in_iframes/level_1/unit_1/lesson_4/teeth_upper.webp",
    "/lessons_in_iframes/level_1/unit_1/lesson_4/the_ground_repeat_x.webp",
    "/lessons_in_iframes/level_1/unit_1/lesson_4/the_table.webp",
    "/lessons_in_iframes/level_1/unit_1/lesson_4/tray_without_hand.webp",
    "/lessons_in_iframes/level_1/unit_1/lesson_4/user_contacts_bread."+soundFileFormat,
    "/lessons_in_iframes/level_1/unit_1/lesson_4/user_has_eaten_bread."+soundFileFormat,
    "/lessons_in_iframes/level_1/unit_1/lesson_4/user_starts_dragging_bread."+soundFileFormat,
    "/lessons_in_iframes/level_1/unit_1/lesson_4/user_takes_the_bread."+soundFileFormat,
    // See js_for_every_single_html to find userInterfaceLanguage
    // Deprecate "/user_interface/text/"+userInterfaceLanguage+"/1-1-4_end_of_lesson.txt",
    "/user_interface/text/"+userInterfaceLanguage+"/1-1-4_vocabulary_p1_p2.txt",
    "/user_interface/text/"+userInterfaceLanguage+"/1-1-4a.txt",
    "/user_interface/text/"+userInterfaceLanguage+"/1-1-4b.txt"
  ];
  // soundFileFormat exists in js_for_all_iframed_lesson_htmls where it is copied from the parent in js_for_different_browsers_and_devices

  if (deviceDetector.device == "tablet") {
    listOfFilesForAllLanguages_1_1_4.push(
      "/lessons_in_iframes/level_1/unit_1/lesson_4/tablet_pinch.webp",
      "/lessons_in_iframes/level_1/unit_1/lesson_4/tablet_swipe_a.webp",
      "/lessons_in_iframes/level_1/unit_1/lesson_4/tablet_swipe_b.webp"
    );
  } else if (deviceDetector.device == "phone") {
    listOfFilesForAllLanguages_1_1_4.push(
      "/lessons_in_iframes/level_1/unit_1/lesson_4/phone_pinch.webp",
      "/lessons_in_iframes/level_1/unit_1/lesson_4/phone_swipe_a.webp",
      "/lessons_in_iframes/level_1/unit_1/lesson_4/phone_swipe_b.webp"
    );
  } else { // desktop
    listOfFilesForAllLanguages_1_1_4.push(
      "/lessons_in_iframes/level_1/unit_1/lesson_4/keyboard_down_arrow.webp",
      "/lessons_in_iframes/level_1/unit_1/lesson_4/keyboard_whole.webp"
    );
  }

  // ---
  let errorHappened = false;
  try {
    parent.console.log("Caching common files for 1-1-4 ..."); // eruda console displays either the parent window only or the iframe window only
    await cacheForAllLanguages_1_1_4.addAll(listOfFilesForAllLanguages_1_1_4); //parent.console.log("done");
  } catch(err) {
    parent.console.error(err);
    errorHappened = true;
  } finally {
    if (!errorHappened) {
      parent.console.log("... and common files for 1-1-4 are ready");
      localStorage.setItem("lesson114CommonFilesCachedSuccessfully", "good");
    } else {
      triesFor114CommonAssets++;
      // Try again if the number of maximum retries is not reached
      // «maximumRetries» and «delayTimeBeforeTryingAgain» exists in 0_parent_initial_load_and_111.js
      if (triesFor114CommonAssets<=parent.maximumRetries) {   setTimeout(function () {  cacheLesson114CommonAssetsForAllLanguages();  }, parent.delayTimeBeforeTryingAgain);   }
      else {   parent.console.warn("Gave up on trying to cache: cacheLesson114CommonAssetsForAllLanguages");   }
    }
  } // End of try-catch-finally

} // END OF cacheLesson114CommonAssetsForAllLanguages


// ---
let triesFor114TargetLangAssets = 0;
async function cacheLesson114AssetsForTheTargetLanguage() {
  const cacheForTargetLanguage_1_1_4 = await caches.open('1-1-4-assets-for-'+parent.langCodeForTeachingFilePaths+'-August2023');
  // ---
  // soundFileFormat exists in js_for_all_iframed_lesson_htmls where it is copied from the parent in js_for_different_browsers_and_devices
  let itemA  = "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_1/lesson_4/take_listenbox_1."+soundFileFormat;
  let itemAj = "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_1/lesson_4/take_listenbox_1.json";
  let itemB  = "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_1/lesson_4/take_listenbox_2."+soundFileFormat;
  let itemBj = "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_1/lesson_4/take_listenbox_2.json";
  let itemC  = "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_1/lesson_4/take_listenbox_3."+soundFileFormat;
  let itemCj = "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_1/lesson_4/take_listenbox_3.json";
  let item1  = "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_1/lesson_4/eat_bread_normal."+soundFileFormat;
  let item2  = "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_1/lesson_4/eat_bread_slow."+soundFileFormat;
  let item3  = "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_1/lesson_4/eat_normal."+soundFileFormat;
  let item4  = "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_1/lesson_4/eat_slow."+soundFileFormat;
  let item5  = "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_1/lesson_4/take_bread_1_normal."+soundFileFormat;
  let item6  = "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_1/lesson_4/take_bread_1_slow."+soundFileFormat;
  let item7  = "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_1/lesson_4/take_bread_2_normal."+soundFileFormat;
  let item8  = "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_1/lesson_4/take_bread_2_slow."+soundFileFormat;
  let itemX  = "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_1/lesson_4/eat_listenbox_1."+soundFileFormat;
  let itemXj = "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_1/lesson_4/eat_listenbox_1.json";
  let itemY  = "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_1/lesson_4/eat_listenbox_2."+soundFileFormat;
  let itemYj = "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_1/lesson_4/eat_listenbox_2.json";
  let itemZ  = "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_1/lesson_4/eat_listenbox_3."+soundFileFormat;
  let itemZj = "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_1/lesson_4/eat_listenbox_3.json";

  if (parent.userIsFemaleSoUseFemaleConjugation) { // See js_for_the_parent_all_browsers_all_devices
    item1 = item1.split(".")[0] + "_tofemale."+soundFileFormat;
    item2 = item2.split(".")[0] + "_tofemale."+soundFileFormat;
    item3 = item3.split(".")[0] + "_tofemale."+soundFileFormat;
    item4 = item4.split(".")[0] + "_tofemale."+soundFileFormat;
    item5 = item5.split(".")[0] + "_tofemale."+soundFileFormat;
    item6 = item6.split(".")[0] + "_tofemale."+soundFileFormat;
    item7 = item7.split(".")[0] + "_tofemale."+soundFileFormat;
    item8 = item8.split(".")[0] + "_tofemale."+soundFileFormat;
  }
  let listOfFilesForTargetLanguage_1_1_4 = [
    itemA, itemB, itemC, itemAj, itemBj, itemCj, itemX, itemXj, itemY, itemYj, itemZ, itemZj,
    item1,    item2,    item3,    item4,    item5,    item6,    item7,    item8
  ];

  const u = "/user_interface/text/"+userInterfaceLanguage; // Works without "parent." notation » See js_for_every_single_html
  switch (parent.langCodeForTeachingFilePaths.substring(0,2)) { // Using substring, we trim "tr_istanbul" to "tr", "zh_putonghua" to "zh" etc
    case "zh":
      listOfFilesForTargetLanguage_1_1_4.push(u+"/1-1-4_ren_attention_to_intonation.txt");
      break;
    default: // Nothing
  }
  // ---
  let errorHappened = false;
  try {
    parent.console.log("Caching files for 1-1-4 "+parent.langCodeForTeachingFilePaths+" ...");
    await cacheForTargetLanguage_1_1_4.addAll(listOfFilesForTargetLanguage_1_1_4); //parent.console.log("done");
  } catch(err) {
    parent.console.error(err);
    errorHappened = true;
  } finally {
    if (!errorHappened) {
      parent.console.log("... and files for 1-1-4 "+parent.langCodeForTeachingFilePaths+" are ready");
      localStorage.setItem("lesson114FilesFor-"+parent.langCodeForTeachingFilePaths+"-CachedSuccessfully", "perfect");
    } else {
      triesFor114TargetLangAssets++;
      // Try again if the number of maximum retries is not reached
      // «maximumRetries» and «delayTimeBeforeTryingAgain» exists in 0_parent_initial_load_and_111.js
      if (triesFor114TargetLangAssets<=parent.maximumRetries) {   setTimeout(function () {  cacheLesson114AssetsForTheTargetLanguage();  }, parent.delayTimeBeforeTryingAgain);   }
      else {   parent.console.warn("Gave up on trying to cache: cacheLesson114AssetsForTheTargetLanguage");   }
    }
  } // End of try-catch-finally

} // END OF cacheLesson114AssetsForTheTargetLanguage
