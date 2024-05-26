"use strict";
// Turns out async functions cannot be exported, so instead of using type "module", we create a new script tag for each lesson and set its src to load a js file such as this one
// IDEA var deletionOfAnItemForLesson112August2023AllLanguagesCacheIsNecessary = false; // Hopefully this will always stay false
// IDEA var deletionOfAnItemForLesson112August2023TargetLanguageCacheIsNecessary = false; // Hopefully this will always stay false

// The two caching operations here have the whole lesson time to complete i.e. usually more than a minute
// April 2024: We choose not to chain them i.e. will fire them at the same time
if (localStorage.getItem("lesson112CommonFilesCachedSuccessfully")) { parent.console.log("Common files for 112 already cached"); }
else { cacheLesson112CommonAssetsForAllLanguages(); }

if (localStorage.getItem("lesson112FilesFor-"+parent.langCodeForTeachingFilePaths+"-CachedSuccessfully")) { parent.console.log("Files for "+parent.langCodeForTeachingFilePaths+" 112 already cached"); }
else { cacheLesson112AssetsForTheTargetLanguage(); }

let triesFor112CommonAssets = 0;
async function cacheLesson112CommonAssetsForAllLanguages() {

  const cacheForAllLanguages_1_1_2 = await caches.open('1-1-2-assets-for-all-languages-August2023');
  // ---
  let listOfFilesForAllLanguages_1_1_2 = [
    "/lessons_in_iframes/level_1/unit_1/lesson_2/0_glass.webp",
    "/lessons_in_iframes/level_1/unit_1/lesson_2/drag_the_glass_loop_1."+soundFileFormat,
    "/lessons_in_iframes/level_1/unit_1/lesson_2/drag_the_glass_loop_2."+soundFileFormat,
    "/lessons_in_iframes/level_1/unit_1/lesson_2/eyes_blinking_naturally.webp",
    "/lessons_in_iframes/level_1/unit_1/lesson_2/give_me_water_state_a.webp",
    "/lessons_in_iframes/level_1/unit_1/lesson_2/give_me_water_state_b0.webp",
    "/lessons_in_iframes/level_1/unit_1/lesson_2/give_me_water_state_b1.webp",
    "/lessons_in_iframes/level_1/unit_1/lesson_2/give_me_water_state_b2.webp",
    "/lessons_in_iframes/level_1/unit_1/lesson_2/give_me_water_state_c.webp",
    "/lessons_in_iframes/level_1/unit_1/lesson_2/give_me_water_state_d.webp",
    "/lessons_in_iframes/level_1/unit_1/lesson_2/give_me_water_state_e.webp",
    "/lessons_in_iframes/level_1/unit_1/lesson_2/give_me_water.css",
    "/lessons_in_iframes/level_1/unit_1/lesson_2/give_me_water.js",
    "/lessons_in_iframes/level_1/unit_1/lesson_2/glass_on_porcelain."+soundFileFormat,
    "/lessons_in_iframes/level_1/unit_1/lesson_2/he_gets_the_water."+soundFileFormat,
    "/lessons_in_iframes/level_1/unit_1/lesson_2/hover_on_the_glass."+soundFileFormat,
    "/lessons_in_iframes/level_1/unit_1/lesson_2/index.html",
    "/lessons_in_iframes/level_1/unit_1/lesson_2/mousedown_touchstart."+soundFileFormat,
    "/lessons_in_iframes/level_1/unit_1/lesson_2/move_the_mouse.webp",
    "/lessons_in_iframes/level_1/unit_1/lesson_2/nice_arrow_down_give_me_water.webp",
    "/lessons_in_iframes/level_1/unit_1/lesson_2/nice_arrow_left_give_me_water.webp",
    "/lessons_in_iframes/level_1/unit_1/lesson_2/speech_bubble_hand_give_me.webp",
    "/lessons_in_iframes/level_1/unit_1/lesson_2/speech_bubble_water.webp",
    "/lessons_in_iframes/level_1/unit_1/lesson_2/the_ground_repeat_x.webp",
    "/lessons_in_iframes/level_1/unit_1/lesson_2/the_table.webp",
    "/lessons_in_iframes/level_1/unit_1/lesson_2/tray_without_hand.webp",
    "/user_interface/text/"+userInterfaceLanguage+"/1-1-2_end_of_lesson_note.txt", // See js_for_every_single_html to find userInterfaceLanguage
    "/user_interface/text/"+userInterfaceLanguage+"/1-1-2_vocabulary_p1_p2.txt",
    "/user_interface/text/"+userInterfaceLanguage+"/1-1-2a.txt",
    "/user_interface/text/"+userInterfaceLanguage+"/1-1-2b.txt"
  ];
  // soundFileFormat exists in js_for_all_iframed_lesson_htmls where it is copied from the parent in js_for_different_browsers_and_devices
  // ---

  let errorHappened = false;
  try {
    parent.console.log("Caching common files for 1-1-2 ..."); // eruda console displays either the parent window only or the iframe window only
    await cacheForAllLanguages_1_1_2.addAll(listOfFilesForAllLanguages_1_1_2); //parent.console.log("done");
  } catch(err) {
    parent.console.error(err);
    errorHappened = true;
  } finally {
    if (!errorHappened) {
      parent.console.log("... and common files for 1-1-2 are ready");
      localStorage.setItem("lesson112CommonFilesCachedSuccessfully", "awesome");
    } else {
      triesFor112CommonAssets++;
      // Try again if the number of maximum retries is not reached
      // «maximumRetries» and «delayTimeBeforeTryingAgain» exists in 0_parent_initial_load_and_111.js
      if (triesFor112CommonAssets<=parent.maximumRetries) {   setTimeout(function () {  cacheLesson112CommonAssetsForAllLanguages();  }, parent.delayTimeBeforeTryingAgain);   }
      else {   parent.console.warn("Gave up on trying to cache: cacheLesson112CommonAssetsForAllLanguages");   }
    }
  } // End of try-catch-finally

} // END OF cacheLesson112CommonAssetsForAllLanguages


// ---
let triesFor112TargetLangAssets = 0;
async function cacheLesson112AssetsForTheTargetLanguage() {

  const cacheForTargetLanguage_1_1_2 = await caches.open('1-1-2-assets-for-'+parent.langCodeForTeachingFilePaths+'-August2023');
  // ---
  // soundFileFormat exists in js_for_all_iframed_lesson_htmls where it is copied from the parent in js_for_different_browsers_and_devices
  let itemA  = "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_1/lesson_2/give_listenbox_1."+soundFileFormat;
  let itemAj = "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_1/lesson_2/give_listenbox_1.json";
  let itemB  = "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_1/lesson_2/give_listenbox_2."+soundFileFormat;
  let itemBj = "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_1/lesson_2/give_listenbox_2.json";
  let itemC  = "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_1/lesson_2/give_listenbox_3."+soundFileFormat;
  let itemCj = "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_1/lesson_2/give_listenbox_3.json";
  let item1  = "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_1/lesson_2/give_me_water_1_normal."+soundFileFormat;
  let item2  = "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_1/lesson_2/give_me_water_1_slow."+soundFileFormat;
  let item3  = "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_1/lesson_2/give_me_water_2_normal."+soundFileFormat;
  let item4  = "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_1/lesson_2/give_me_water_2_slow."+soundFileFormat;
  let item5  = "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_1/lesson_2/thank_you."+soundFileFormat;
  let itemX  = "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_1/lesson_2/thank_you_listenbox_1."+soundFileFormat;
  let itemXj = "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_1/lesson_2/thank_you_listenbox_1.json";
  let itemY  = "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_1/lesson_2/thank_you_listenbox_2."+soundFileFormat;
  let itemYj = "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_1/lesson_2/thank_you_listenbox_2.json";
  let itemZ  = "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_1/lesson_2/thank_you_listenbox_3."+soundFileFormat;
  let itemZj = "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_1/lesson_2/thank_you_listenbox_3.json";
  if (parent.userIsFemaleSoUseFemaleConjugation) { // See js_for_the_parent_all_browsers_all_devices
    item1 = item1.split(".")[0] + "_tofemale."+soundFileFormat;
    item2 = item2.split(".")[0] + "_tofemale."+soundFileFormat;
    item3 = item3.split(".")[0] + "_tofemale."+soundFileFormat;
    item4 = item4.split(".")[0] + "_tofemale."+soundFileFormat;
    item5 = item5.split(".")[0] + "_tofemale."+soundFileFormat;
  }
  let listOfFilesForTargetLanguage_1_1_2 = [
    itemA, itemB, itemC, itemAj, itemBj, itemCj, itemX, itemXj, itemY, itemYj, itemZ, itemZj,
    item1,    item2,    item3,    item4,    item5
  ];

  const u = "/user_interface/text/"+userInterfaceLanguage; // Works without "parent." notation » See js_for_every_single_html
  switch (parent.langCodeForTeachingFilePaths.substring(0,2)) { // Using substring, we trim "tr_istanbul" to "tr", "zh_putonghua" to "zh" etc
    case "ar":
      listOfFilesForTargetLanguage_1_1_2.push(u+"/1-1-2_arabic_male_female.txt");
      break;
    default: // Nothing
  }
  // ---

  let errorHappened = false;
  try {
    parent.console.log("Caching files for 1-1-2 "+parent.langCodeForTeachingFilePaths+" ...");
    await cacheForTargetLanguage_1_1_2.addAll(listOfFilesForTargetLanguage_1_1_2); //parent.console.log("done");
  } catch(err) {
    parent.console.error(err);
    errorHappened = true;
  } finally {
    if (!errorHappened) {
      parent.console.log("... and files for 1-1-2 "+parent.langCodeForTeachingFilePaths+" are ready");
      localStorage.setItem("lesson112FilesFor-"+parent.langCodeForTeachingFilePaths+"-CachedSuccessfully", "sweet");
    } else {
      triesFor112TargetLangAssets++;
      // Try again if the number of maximum retries is not reached
      // «maximumRetries» and «delayTimeBeforeTryingAgain» exists in 0_parent_initial_load_and_111.js
      if (triesFor112TargetLangAssets<=parent.maximumRetries) {   setTimeout(function () {  cacheLesson112AssetsForTheTargetLanguage();  }, parent.delayTimeBeforeTryingAgain);   }
      else {   parent.console.warn("Gave up on trying to cache: cacheLesson112AssetsForTheTargetLanguage");   }
    }
  } // End of try-catch-finally

} // END OF cacheLesson112AssetsForTheTargetLanguage


// NOTE THAT: CANNOT USE EcmaScript type "module" (and it's not a big problem) BECAUSE
// Turns out async functions cannot be exported anyway but still note that
// Android webview doesn't support the [default] keyword with export -> that is -> according to https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export
