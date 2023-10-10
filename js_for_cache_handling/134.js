"use strict";

if (localStorage.getItem("lesson134CommonFilesCachedSuccessfully")) { parent.console.log("Common files for 134 already cached"); }
else { cacheLesson134CommonAssetsForAllLanguages(); }

if (localStorage.getItem("lesson134FilesFor-"+parent.langCodeForTeachingFilePaths+"-CachedSuccessfully")) { parent.console.log("Files for "+parent.langCodeForTeachingFilePaths+" 134 already cached"); }
else { cacheLesson134AssetsForTheTargetLanguage(); }

async function cacheLesson134CommonAssetsForAllLanguages() {
  const cacheForAllLanguages_1_3_4 = await caches.open('1-3-4-assets-for-all-languages-October2023');
  // ---
  let listOfFilesForAllLanguages_1_3_4 = [
    "/lessons_in_iframes/level_1/unit_3/lesson_4/1.avif",
    "/lessons_in_iframes/level_1/unit_3/lesson_4/2.avif",
    "/lessons_in_iframes/level_1/unit_3/lesson_4/3.avif",
    "/lessons_in_iframes/level_1/unit_3/lesson_4/4.avif",
    "/lessons_in_iframes/level_1/unit_3/lesson_4/5.avif",
    "/lessons_in_iframes/level_1/unit_3/lesson_4/6.avif",
    "/lessons_in_iframes/level_1/unit_3/lesson_4/bird.avif",
    "/lessons_in_iframes/level_1/unit_3/lesson_4/black.avif",
    "/lessons_in_iframes/level_1/unit_3/lesson_4/blue.avif",
    "/lessons_in_iframes/level_1/unit_3/lesson_4/colors.css",
    "/lessons_in_iframes/level_1/unit_3/lesson_4/colors.js",
    "/lessons_in_iframes/level_1/unit_3/lesson_4/desktop.js",
    "/lessons_in_iframes/level_1/unit_3/lesson_4/explosion."+soundFileFormat,
    "/lessons_in_iframes/level_1/unit_3/lesson_4/fail."+soundFileFormat,
    "/lessons_in_iframes/level_1/unit_3/lesson_4/find."+soundFileFormat,
    "/lessons_in_iframes/level_1/unit_3/lesson_4/fish.avif",
    "/lessons_in_iframes/level_1/unit_3/lesson_4/green.avif",
    "/lessons_in_iframes/level_1/unit_3/lesson_4/index.html",
    "/lessons_in_iframes/level_1/unit_3/lesson_4/mobile.js",
    "/lessons_in_iframes/level_1/unit_3/lesson_4/mousedown_touchend."+soundFileFormat,
    "/lessons_in_iframes/level_1/unit_3/lesson_4/mouseenter_touchstart."+soundFileFormat,
    "/lessons_in_iframes/level_1/unit_3/lesson_4/red.avif",
    "/lessons_in_iframes/level_1/unit_3/lesson_4/set_off_1."+soundFileFormat,
    "/lessons_in_iframes/level_1/unit_3/lesson_4/set_off_2."+soundFileFormat,
    "/lessons_in_iframes/level_1/unit_3/lesson_4/set_off_3."+soundFileFormat,
    "/lessons_in_iframes/level_1/unit_3/lesson_4/turn."+soundFileFormat,
    "/lessons_in_iframes/level_1/unit_3/lesson_4/water.avif",
    "/lessons_in_iframes/level_1/unit_3/lesson_4/white.avif",
    "/lessons_in_iframes/level_1/unit_3/lesson_4/win."+soundFileFormat,
    "/lessons_in_iframes/level_1/unit_3/lesson_4/yellow.avif"

    /* THESE DO NOT EXIST because «translation help box» is not used in this lesson
    "/user_interface/text/"+userInterfaceLanguage+"/1-3-4.txt", // See js_for_every_single_html to find userInterfaceLanguage
    "/user_interface/text/"+userInterfaceLanguage+"/1-3-4_vocabulary_p1_p2.txt"
    */
  ];
  // soundFileFormat exists in js_for_all_iframed_lesson_htmls where it is copied from the parent in js_for_different_browsers_and_devices

  /* NO DEVICE SPECIFIC FILES in this lesson
  if (deviceDetector.device == "tablet") {
    listOfFilesForAllLanguages_1_3_4.push(

    );
  } else if (deviceDetector.device == "phone") {
    listOfFilesForAllLanguages_1_3_4.push(

    );
  } else { // desktop
    listOfFilesForAllLanguages_1_3_4.push(

    );
  }
  */

  // ---
  let errorHappened = false;
  try {
    parent.console.log("Caching common files for 1-3-4 ..."); // eruda console displays either the parent window only or the iframe window only
    await cacheForAllLanguages_1_3_4.addAll(listOfFilesForAllLanguages_1_3_4); //parent.console.log("done");
  } catch(err) {
    parent.console.error(err);
    errorHappened = true;
  } finally {
    if (!errorHappened) {
      parent.console.log("... and common files for 1-3-4 are ready");
      localStorage.setItem("lesson134CommonFilesCachedSuccessfully", "glorious");
    } else {
      // Try again
      setTimeout(function () {  cacheLesson134CommonAssetsForAllLanguages();  }, 4000);
    }
  } // End of try-catch-finally

} // END OF cacheLesson134CommonAssetsForAllLanguages



async function cacheLesson134AssetsForTheTargetLanguage() {
  const cacheForTargetLanguage_1_3_4 = await caches.open('1-3-4-assets-for-'+parent.langCodeForTeachingFilePaths+'-October2023');
  // ---
  // soundFileFormat exists in js_for_all_iframed_lesson_htmls where it is copied from the parent in js_for_different_browsers_and_devices

  /* No listenbox in this lesson
  let itemA = "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_3/lesson_4/with_listenbox."+soundFileFormat;
  */
  let item1 = "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_3/lesson_4/black_1."+soundFileFormat;
  let item2 = "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_3/lesson_4/black_2."+soundFileFormat;
  let item3 = "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_3/lesson_4/blue_1."+soundFileFormat;
  let item4 = "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_3/lesson_4/blue_2."+soundFileFormat;
  let item5 = "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_3/lesson_4/green_1."+soundFileFormat;
  let item6 = "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_3/lesson_4/green_2."+soundFileFormat;
  let item7 = "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_3/lesson_4/red_1."+soundFileFormat;
  let item8 = "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_3/lesson_4/red_2."+soundFileFormat;
  let item9 = "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_3/lesson_4/white_1."+soundFileFormat;
  let item10 = "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_3/lesson_4/white_2."+soundFileFormat;
  let item11 = "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_3/lesson_4/yellow_1."+soundFileFormat;
  let item12 = "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_3/lesson_4/yellow_2."+soundFileFormat;

  /* Imperative forms not used in this lesson
  if (parent.userIsFemaleSoUseFemaleConjugation) { // See js_for_the_parent_all_browsers_all_devices
    item1 = item1.split(".")[0] + "_tofemale."+soundFileFormat;
    item2 = item2.split(".")[0] + "_tofemale."+soundFileFormat;
    item3 = item3.split(".")[0] + "_tofemale."+soundFileFormat;
    item4 = item4.split(".")[0] + "_tofemale."+soundFileFormat;
    item5 = item5.split(".")[0] + "_tofemale."+soundFileFormat;
  }
  */
  let itemA = "/speech_recognition_answer_key/"+parent.langCodeForTeachingFilePaths+"/1-3-4-black.txt";
  let itemB = "/speech_recognition_answer_key/"+parent.langCodeForTeachingFilePaths+"/1-3-4-blue.txt";
  let itemC = "/speech_recognition_answer_key/"+parent.langCodeForTeachingFilePaths+"/1-3-4-green.txt";
  let itemD = "/speech_recognition_answer_key/"+parent.langCodeForTeachingFilePaths+"/1-3-4-red.txt";
  let itemE = "/speech_recognition_answer_key/"+parent.langCodeForTeachingFilePaths+"/1-3-4-white.txt";
  let itemF = "/speech_recognition_answer_key/"+parent.langCodeForTeachingFilePaths+"/1-3-4-yellow.txt";
  let listOfFilesForTargetLanguage_1_3_4 = [
    /* No listenbox in this lesson
    itemA,
    */
    item1,    item2,    item3,    item4,    item5,    item6,    item7,    item8,    item9,    item10,    item11,    item12,
    itemA,itemB,itemC,itemD,itemE,itemF
  ];
  // Use soundFileFormat from js_for_all_iframed_lesson_htmls which copies it from js_for_different_browsers_and_devices

  const u = "/user_interface/text/"+userInterfaceLanguage; // Works without "parent." notation » See js_for_every_single_html
  switch (parent.langCodeForTeachingFilePaths.substring(0,2)) { // Using substring, we trim "tr_istanbul" to "tr", "zh_putonghua" to "zh" etc
    case "ar":
      listOfFilesForTargetLanguage_1_3_4.push(u+"/1-3-4_arabic_gender.txt");
      break;
    case "ja":
      listOfFilesForTargetLanguage_1_3_4.push(u+"/1-3-4_hito_adjectives.txt");
      listOfFilesForTargetLanguage_1_3_4.push(u+"/1-3-4_on_spectrum_of_colors_ja.txt");
      break;
    case "??":
      // ???
      break;
    default: // Nothing
  }
  // ---
  let errorHappened = false;
  try {
    parent.console.log("Caching files for 1-3-4 "+parent.langCodeForTeachingFilePaths+" ...");
    await cacheForTargetLanguage_1_3_4.addAll(listOfFilesForTargetLanguage_1_3_4); //parent.console.log("done");
  } catch(err) {
    parent.console.error(err);
    errorHappened = true;
  } finally {
    if (!errorHappened) {
      parent.console.log("... and files for 1-3-4 "+parent.langCodeForTeachingFilePaths+" are ready");
      localStorage.setItem("lesson134FilesFor-"+parent.langCodeForTeachingFilePaths+"-CachedSuccessfully", "tremendous");
    } else {
      // Try again
      setTimeout(function () {  cacheLesson134AssetsForTheTargetLanguage();  }, 4000);
    }
  } // End of try-catch-finally

} // END OF cacheLesson134AssetsForTheTargetLanguage
