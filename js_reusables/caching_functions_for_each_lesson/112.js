"use strict";
// Turns out async functions cannot be exported, so, we will create a new script tag for each lesson and set its src to load a js file such as this one
async function cacheAssetsOfLesson112() {

  const cacheSlot0 = await caches.open('primary-assets-for-1-1-2');
  const cacheSlot1 = await caches.open('secondary-assets-for-1-1-2');

  let firstList = [
    "/lessons_in_iframes/level_1/unit_1/lesson_2/1.webp",
    "/lessons_in_iframes/level_1/unit_1/lesson_2/2.webp",
    "/lessons_in_iframes/level_1/unit_1/lesson_2/3.webp",
    "/lessons_in_iframes/level_1/unit_1/lesson_2/4.webp",
    "/lessons_in_iframes/level_1/unit_1/lesson_2/5.webp",
    "/lessons_in_iframes/level_1/unit_1/lesson_2/6.webp",
    "/lessons_in_iframes/level_1/unit_1/lesson_2/c1.webp",
    "/lessons_in_iframes/level_1/unit_1/lesson_2/c2.webp",
    "/lessons_in_iframes/level_1/unit_1/lesson_2/c3.webp",
    "/lessons_in_iframes/level_1/unit_1/lesson_2/c4.webp",
    "/lessons_in_iframes/level_1/unit_1/lesson_2/c5.webp",
    "/lessons_in_iframes/level_1/unit_1/lesson_2/c6.webp",
    "/lessons_in_iframes/level_1/unit_1/lesson_2/c7.webp",
    "/lessons_in_iframes/level_1/unit_1/lesson_2/c8.webp",
    "/lessons_in_iframes/level_1/unit_1/lesson_2/c9.webp",
    "/lessons_in_iframes/level_1/unit_1/lesson_2/c10.webp",
    "/lessons_in_iframes/level_1/unit_1/lesson_2/index.html",
    "/lessons_in_iframes/level_1/unit_1/lesson_2/water.js",
    "/lessons_in_iframes/level_1/unit_1/lesson_2/what_water_sounds_like_1.webm",
    "/lessons_in_iframes/level_1/unit_1/lesson_2/what_water_sounds_like_2.webm",
    "/lessons_in_iframes/level_1/unit_1/lesson_2/what_water_sounds_like_3.webm",
    "/lessons_in_iframes/level_1/unit_1/lesson_2/what_water_sounds_like_4.webm",
    "/lessons_in_iframes/level_1/unit_1/lesson_2/what_water_sounds_like_5.webm"
  ];
  if (parent.isApple || parent.detectedBrowser.name == "Firefox") {
    firstList.push(
      "/lessons_in_iframes/level_1/unit_1/lesson_2/v1_h264.mp4",
      "/lessons_in_iframes/level_1/unit_1/lesson_2/v2_h264.mp4"
    );
  } else {
    firstList.push(
      "/lessons_in_iframes/level_1/unit_1/lesson_2/v1_vp9.webm",
      "/lessons_in_iframes/level_1/unit_1/lesson_2/v2_vp9.webm"
    );
  }

  const secondList = [
    "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_1/lesson_2/water_1-2.webm",
    "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_1/lesson_2/water_3.webm",
    "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_1/lesson_2/water_4-5.webm",
    "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_1/lesson_2/water_6.webm",
    "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_1/lesson_2/water_7-8.webm",
    "/lessons_in_iframes/level_1/unit_1/lesson_2/waterfall1.webp",
    "/lessons_in_iframes/level_1/unit_1/lesson_2/waterfall2.webp"
  ];

  let errorHappened = false;
  try {
    parent.console.log("Caching files for 1-1-2 ...");
    await cacheSlot0.addAll(firstList);
    await cacheSlot1.addAll(secondList);
  } catch(err) {
    parent.console.error(err);
    errorHappened = true;
  } finally {
    if (!errorHappened) {
      parent.console.log("... and files for 1-1-2 were cached successfully");
      localStorage.loadFiles112WasSuccessful = "cool";
    }
  }

} // END OF cacheAssetsOfLesson112

cacheAssetsOfLesson112();
// CANNOT GO MODULAR (not a big problem) BECAUSE
// Turns out async functions cannot be exported anyway but still note that
// Android webview doesn't support the [default] keyword with export -> that is -> according to https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export
