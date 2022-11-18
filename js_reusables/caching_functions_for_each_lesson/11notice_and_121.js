"use strict";
// Turns out async functions cannot be exported, so, we will create a new script tag for each lesson and set its src to load a js file such as this one
async function cacheAssetsOfLesson11noticeAnd121() {

  const cacheSlot0 = await caches.open('assets-for-1-1-notice');
  const cacheSlot1 = await caches.open('primary-assets-for-1-2-1');
  const cacheSlot2 = await caches.open('secondary-assets-for-1-2-1');

  const zerothList = [
    "/lessons_in_iframes/level_1/unit_1/notice_0/baked_by_the_author_himself.webp",
    "/lessons_in_iframes/level_1/unit_1/notice_0/earthman_topraksoy_tsuchimoto.webp",
    "/lessons_in_iframes/level_1/unit_1/notice_0/index.html",
    "/lessons_in_iframes/level_1/unit_1/notice_0/notice.css",
    "/lessons_in_iframes/level_1/unit_1/notice_0/notice.js"
  ];

  let firstList = [
    "/lessons_in_iframes/level_1/unit_2/lesson_1/1a.webp",
    "/lessons_in_iframes/level_1/unit_2/lesson_1/1b.webp",
    "/lessons_in_iframes/level_1/unit_2/lesson_1/2a.webp",
    "/lessons_in_iframes/level_1/unit_2/lesson_1/2b.webp",
    "/lessons_in_iframes/level_1/unit_2/lesson_1/3a.webp",
    "/lessons_in_iframes/level_1/unit_2/lesson_1/3b.webp",
    "/lessons_in_iframes/level_1/unit_2/lesson_1/c1.webp",
    "/lessons_in_iframes/level_1/unit_2/lesson_1/c2.webp",
    "/lessons_in_iframes/level_1/unit_2/lesson_1/c3.webp",
    "/lessons_in_iframes/level_1/unit_2/lesson_1/c4.webp",
    "/lessons_in_iframes/level_1/unit_2/lesson_1/c5.webp",
    "/lessons_in_iframes/level_1/unit_2/lesson_1/c6.webp",
    "/lessons_in_iframes/level_1/unit_2/lesson_1/c7.webp",
    "/lessons_in_iframes/level_1/unit_2/lesson_1/c8.webp",
    "/lessons_in_iframes/level_1/unit_2/lesson_1/c9.webp",
    "/lessons_in_iframes/level_1/unit_2/lesson_1/c10.webp",
    "/lessons_in_iframes/level_1/unit_2/lesson_1/index.html",
    "/lessons_in_iframes/level_1/unit_2/lesson_1/glass.js",
    "/lessons_in_iframes/level_1/unit_2/lesson_1/what_glass_sounds_like_1.webm",
    "/lessons_in_iframes/level_1/unit_2/lesson_1/what_glass_sounds_like_2.webm"
  ];

  if (parent.isApple || parent.detectedBrowser.name == "Firefox") {
    firstList.push(
      "/lessons_in_iframes/level_1/unit_2/lesson_1/v1_h264.mp4",
      "/lessons_in_iframes/level_1/unit_2/lesson_1/v2_h264.mp4"
    );
  } else {
    firstList.push(
      "/lessons_in_iframes/level_1/unit_2/lesson_1/v1_vp9.webm",
      "/lessons_in_iframes/level_1/unit_2/lesson_1/v2_vp9.webm"
    );
  }

  const secondList = [
    "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_2/lesson_1/glass_1-2.webm",
    "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_2/lesson_1/glass_3.webm",
    "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_2/lesson_1/glass_4-5.webm",
    "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_2/lesson_1/glass_6.webm",
    "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_2/lesson_1/glass_7-8.webm"
  ];

  let errorHappened = false;
  try {
    parent.console.log("Caching files for 1-1-N and 1-2-1 ...");
    await cacheSlot0.addAll(zerothList);
    await cacheSlot1.addAll(firstList);
    await cacheSlot2.addAll(secondList);
  } catch(err) {
    parent.console.error(err);
    errorHappened = true;
  } finally {
    if (!errorHappened) {
      parent.console.log("... and files for 1-1-N and 1-2-1 were cached successfully");
      localStorage.loadFiles11nAnd121WasSuccessful = "cool";
    }
  }

} // END OF cacheAssetsOfLesson11noticeAnd121

cacheAssetsOfLesson11noticeAnd121();
