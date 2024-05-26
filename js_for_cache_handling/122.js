"use strict";

if (localStorage.getItem("lesson122CommonFilesCachedSuccessfully")) { parent.console.log("Common files for 122 already cached"); }
else { cacheLesson122CommonAssetsForAllLanguages(); }

if (localStorage.getItem("lesson122FilesFor-"+parent.langCodeForTeachingFilePaths+"-CachedSuccessfully")) { parent.console.log("Files for "+parent.langCodeForTeachingFilePaths+" 122 already cached"); }
else { cacheLesson122AssetsForTheTargetLanguage(); }

let triesFor122CommonAssets = 0;
async function cacheLesson122CommonAssetsForAllLanguages() {
  const cacheForAllLanguages_1_2_2 = await caches.open('1-2-2-assets-for-all-languages-August2023');
  // ---
  let listOfFilesForAllLanguages_1_2_2 = [
    "/lessons_in_iframes/level_1/unit_2/lesson_2/a_glass_stays_in_focus.webp",
    "/lessons_in_iframes/level_1/unit_2/lesson_2/a_pictogram_stays_blurred.webp",
    "/lessons_in_iframes/level_1/unit_2/lesson_2/b_glass_from_focus_to_blur.webp",
    "/lessons_in_iframes/level_1/unit_2/lesson_2/b_pictogram_from_blur_to_focus.webp",
    "/lessons_in_iframes/level_1/unit_2/lesson_2/c_glass_from_blur_to_focus.webp",
    "/lessons_in_iframes/level_1/unit_2/lesson_2/c_pictogram_from_focus_to_blur.webp",
    "/lessons_in_iframes/level_1/unit_2/lesson_2/drink_water_from_glass_desktop.js", // 16KB Let these be cached both on mobile and desktop unless inspected about safety
    "/lessons_in_iframes/level_1/unit_2/lesson_2/drink_water_from_glass_mobile.js", // 32KB Let these be cached both on mobile and desktop unless inspected about safety
    "/lessons_in_iframes/level_1/unit_2/lesson_2/drink_water_from_glass.css",
    "/lessons_in_iframes/level_1/unit_2/lesson_2/drink_water_from_glass.js",
    "/lessons_in_iframes/level_1/unit_2/lesson_2/glass_touch_click_flashing.webp",
    "/lessons_in_iframes/level_1/unit_2/lesson_2/gulp1."+soundFileFormat,
    "/lessons_in_iframes/level_1/unit_2/lesson_2/gulp2."+soundFileFormat,
    "/lessons_in_iframes/level_1/unit_2/lesson_2/gulp3."+soundFileFormat,
    "/lessons_in_iframes/level_1/unit_2/lesson_2/gulp4."+soundFileFormat,
    "/lessons_in_iframes/level_1/unit_2/lesson_2/index.html",
    "/lessons_in_iframes/level_1/unit_2/lesson_2/mousedown_touchend."+soundFileFormat,
    "/lessons_in_iframes/level_1/unit_2/lesson_2/mouseenter_touchstart."+soundFileFormat,
    "/lessons_in_iframes/level_1/unit_2/lesson_2/sipping."+soundFileFormat,
    "/lessons_in_iframes/level_1/unit_2/lesson_2/successfully_drunk."+soundFileFormat,
    "/user_interface/text/"+userInterfaceLanguage+"/1-2-2.txt", // See js_for_every_single_html to find userInterfaceLanguage
    "/user_interface/text/"+userInterfaceLanguage+"/1-2-2_vocabulary_p1_p2.txt"
  ];
  // soundFileFormat exists in js_for_all_iframed_lesson_htmls where it is copied from the parent in js_for_different_browsers_and_devices

  // -
  const o0 = "/lessons_in_iframes/level_1/unit_2/lesson_2/0/0_";
  const o1 = "/lessons_in_iframes/level_1/unit_2/lesson_2/1/1_";
  const o2 = "/lessons_in_iframes/level_1/unit_2/lesson_2/2/2_";
  const o3 = "/lessons_in_iframes/level_1/unit_2/lesson_2/3/3_";
  const o4 = "/lessons_in_iframes/level_1/unit_2/lesson_2/4/4_";

  listOfFilesForAllLanguages_1_2_2.push(
    o0+"01.webp", o0+"02.webp", o0+"03.webp", o0+"04.webp", o0+"05.webp", o0+"06.webp", o0+"07.webp", o0+"08.webp", o0+"09.webp", o0+"10.webp",
    o0+"11.webp", o0+"12.webp", o0+"13.webp", o0+"14.webp", o0+"15.webp", o0+"16.webp",

    o1+"01.webp", o1+"02.webp", o1+"03.webp", o1+"04.webp", o1+"05.webp", o1+"06.webp", o1+"07.webp", o1+"08.webp", o1+"09.webp", o1+"10.webp",
    o1+"11.webp", o1+"12.webp", o1+"13.webp", o1+"14.webp", o1+"15.webp", o1+"16.webp", o1+"17.webp", o1+"18.webp", o1+"19.webp", o1+"20.webp",
    o1+"21.webp", o1+"22.webp", o1+"23.webp", o1+"24.webp", o1+"25.webp", o1+"26.webp", o1+"27.webp", o1+"28.webp",

    o2+"01.webp", o2+"02.webp", o2+"03.webp", o2+"04.webp", o2+"05.webp", o2+"06.webp", o2+"07.webp", o2+"08.webp", o2+"09.webp", o2+"10.webp",
    o2+"11.webp", o2+"12.webp", o2+"13.webp", o2+"14.webp", o2+"15.webp", o2+"16.webp", o2+"17.webp", o2+"18.webp", o2+"19.webp", o2+"20.webp",
    o2+"21.webp", o2+"22.webp", o2+"23.webp", o2+"24.webp", o2+"25.webp", o2+"26.webp", o2+"27.webp", o2+"28.webp", o2+"29.webp", o2+"30.webp",
    o2+"31.webp", o2+"32.webp", o2+"33.webp", o2+"34.webp", o2+"35.webp", o2+"36.webp", o2+"37.webp", o2+"38.webp", o2+"39.webp", o2+"40.webp",

    o3+"01.webp", o3+"02.webp", o3+"03.webp", o3+"04.webp", o3+"05.webp", o3+"06.webp", o3+"07.webp", o3+"08.webp", o3+"09.webp", o3+"10.webp",
    o3+"11.webp", o3+"12.webp", o3+"13.webp", o3+"14.webp", o3+"15.webp", o3+"16.webp", o3+"17.webp", o3+"18.webp", o3+"19.webp", o3+"20.webp",
    o3+"21.webp", o3+"22.webp", o3+"23.webp", o3+"24.webp", o3+"25.webp", o3+"26.webp", o3+"27.webp", o3+"28.webp", o3+"29.webp", o3+"30.webp",
    o3+"31.webp", o3+"32.webp", o3+"33.webp", o3+"34.webp", o3+"35.webp", o3+"36.webp", o3+"37.webp", o3+"38.webp", o3+"39.webp", o3+"40.webp",
    o3+"41.webp", o3+"42.webp", o3+"43.webp", o3+"44.webp", o3+"45.webp", o3+"46.webp", o3+"47.webp", o3+"48.webp", o3+"49.webp", o3+"50.webp",
    o3+"51.webp",

    o4+"01.webp", o4+"02.webp", o4+"03.webp", o4+"04.webp", o4+"05.webp", o4+"06.webp", o4+"07.webp", o4+"08.webp", o4+"09.webp", o4+"10.webp",
    o4+"11.webp", o4+"12.webp", o4+"13.webp", o4+"14.webp", o4+"15.webp", o4+"16.webp", o4+"17.webp", o4+"18.webp", o4+"19.webp", o4+"20.webp",
    o4+"21.webp", o4+"22.webp", o4+"23.webp", o4+"24.webp", o4+"25.webp", o4+"26.webp", o4+"27.webp", o4+"28.webp", o4+"29.webp", o4+"30.webp",
    o4+"31.webp", o4+"32.webp", o4+"33.webp", o4+"34.webp", o4+"35.webp", o4+"36.webp", o4+"37.webp", o4+"38.webp", o4+"39.webp", o4+"40.webp",
    o4+"41.webp", o4+"42.webp", o4+"43.webp", o4+"44.webp", o4+"45.webp", o4+"46.webp", o4+"47.webp", o4+"48.webp", o4+"49.webp", o4+"50.webp",
    o4+"51.webp", o4+"52.webp", o4+"53.webp", o4+"54.webp", o4+"55.webp", o4+"56.webp", o4+"57.webp", o4+"58.webp", o4+"59.webp"
  );

  if (deviceDetector.device == "tablet") {
    listOfFilesForAllLanguages_1_2_2.push(
      "/lessons_in_iframes/level_1/unit_2/lesson_2/tablet_swipe_show_how_a.webp",
      "/lessons_in_iframes/level_1/unit_2/lesson_2/tablet_swipe_show_how_b_loop.webp",
      "/lessons_in_iframes/level_1/unit_2/lesson_2/tablet_tilt_show_how.webp"
    );
  } else if (deviceDetector.device == "phone") {
    listOfFilesForAllLanguages_1_2_2.push(
      "/lessons_in_iframes/level_1/unit_2/lesson_2/phone_swipe_show_how_a.webp",
      "/lessons_in_iframes/level_1/unit_2/lesson_2/phone_swipe_show_how_b_loop.webp",
      "/lessons_in_iframes/level_1/unit_2/lesson_2/phone_tilt_show_how.webp"
    );
  } else { // desktop
    listOfFilesForAllLanguages_1_2_2.push(
      "/lessons_in_iframes/level_1/unit_2/lesson_2/mousewheel_show_how.webp"
    );
  }

  // ---
  let errorHappened = false;
  try {
    parent.console.log("Caching common files for 1-2-2 ..."); // eruda console displays either the parent window only or the iframe window only
    await cacheForAllLanguages_1_2_2.addAll(listOfFilesForAllLanguages_1_2_2); //parent.console.log("done");
  } catch(err) {
    parent.console.error(err);
    errorHappened = true;
  } finally {
    if (!errorHappened) {
      parent.console.log("... and common files for 1-2-2 are ready");
      localStorage.setItem("lesson122CommonFilesCachedSuccessfully", "wonderful");
    } else {
      triesFor122CommonAssets++;
      // Try again if the number of maximum retries is not reached
      // «maximumRetries» and «delayTimeBeforeTryingAgain» exists in 0_parent_initial_load_and_111.js
      if (triesFor122CommonAssets<=parent.maximumRetries) {   setTimeout(function () {  cacheLesson122CommonAssetsForAllLanguages();  }, parent.delayTimeBeforeTryingAgain);   }
      else {   parent.console.warn("Gave up on trying to cache: cacheLesson122CommonAssetsForAllLanguages");   }
    }
  } // End of try-catch-finally

} // END OF cacheLesson122CommonAssetsForAllLanguages


// ---
let triesFor122TargetLangAssets = 0;
async function cacheLesson122AssetsForTheTargetLanguage() {
  const cacheForTargetLanguage_1_2_2 = await caches.open('1-2-2-assets-for-'+parent.langCodeForTeachingFilePaths+'-August2023');
  // ---
  // soundFileFormat exists in js_for_all_iframed_lesson_htmls where it is copied from the parent in js_for_different_browsers_and_devices
  let itemA  = "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_2/lesson_2/drink_listenbox_1."+soundFileFormat;
  let itemAj = "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_2/lesson_2/drink_listenbox_1.json";
  let itemB  = "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_2/lesson_2/drink_listenbox_2."+soundFileFormat;
  let itemBj = "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_2/lesson_2/drink_listenbox_2.json";
  let itemC  = "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_2/lesson_2/drink_listenbox_3."+soundFileFormat;
  let itemCj = "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_2/lesson_2/drink_listenbox_3.json";
  let item1  = "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_2/lesson_2/drink_normal."+soundFileFormat;
  let item2  = "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_2/lesson_2/drink_slow."+soundFileFormat;
  let item3  = "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_2/lesson_2/drink_water_from_the_glass_normal."+soundFileFormat;
  let item4  = "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_2/lesson_2/drink_water_from_the_glass_slow."+soundFileFormat;
  let item5  = "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_2/lesson_2/drink_water_normal."+soundFileFormat;
  let item6  = "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_2/lesson_2/drink_water_slow."+soundFileFormat;
  if (parent.userIsFemaleSoUseFemaleConjugation) { // See js_for_the_parent_all_browsers_all_devices
    item1 = item1.split(".")[0] + "_tofemale."+soundFileFormat;
    item2 = item2.split(".")[0] + "_tofemale."+soundFileFormat;
    item3 = item3.split(".")[0] + "_tofemale."+soundFileFormat;
    item4 = item4.split(".")[0] + "_tofemale."+soundFileFormat;
    item5 = item5.split(".")[0] + "_tofemale."+soundFileFormat;
    item6 = item6.split(".")[0] + "_tofemale."+soundFileFormat;
  }
  let listOfFilesForTargetLanguage_1_2_2 = [
    itemA, itemAj, itemB, itemBj, itemC, itemCj, 
    item1,    item2,    item3,    item4,    item5,    item6
  ];

  /*
  const u = "/user_interface/text/"+userInterfaceLanguage; // Works without "parent." notation » See js_for_every_single_html
  switch (parent.langCodeForTeachingFilePaths.substring(0,2)) { // Using substring, we trim "tr_istanbul" to "tr", "zh_putonghua" to "zh" etc
    case "??":
      listOfFilesForTargetLanguage_1_2_2.push(u+"/1-2-2_???.txt");
      break;
    default: // Nothing
  }
  */

  // ---
  let errorHappened = false;
  try {
    parent.console.log("Caching files for 1-2-2 "+parent.langCodeForTeachingFilePaths+" ...");
    await cacheForTargetLanguage_1_2_2.addAll(listOfFilesForTargetLanguage_1_2_2); //parent.console.log("done");
  } catch(err) {
    parent.console.error(err);
    errorHappened = true;
  } finally {
    if (!errorHappened) {
      parent.console.log("... and files for 1-2-2 "+parent.langCodeForTeachingFilePaths+" are ready");
      localStorage.setItem("lesson122FilesFor-"+parent.langCodeForTeachingFilePaths+"-CachedSuccessfully", "fantastic");
    } else {
      triesFor122TargetLangAssets++;
      // Try again if the number of maximum retries is not reached
      // «maximumRetries» and «delayTimeBeforeTryingAgain» exists in 0_parent_initial_load_and_111.js
      if (triesFor122TargetLangAssets<=parent.maximumRetries) {   setTimeout(function () {  cacheLesson122AssetsForTheTargetLanguage();  }, parent.delayTimeBeforeTryingAgain);   }
      else {   parent.console.warn("Gave up on trying to cache: cacheLesson122AssetsForTheTargetLanguage");   }
    }
  } // End of try-catch-finally

} // END OF cacheLesson122AssetsForTheTargetLanguage
