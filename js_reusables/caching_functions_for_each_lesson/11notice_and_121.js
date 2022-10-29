"use strict";
// Turns out async functions cannot be exported, so, we will create a new script tag for each lesson and set its src to load a js file such as this one
async function cacheAssetsOfLesson11noticeAnd121() {

  const cacheSlot0 = await caches.open('assets-for-1-1-notice');
  const cacheSlot1 = await caches.open('assets-for-1-2-1');

  let firstList = [
    "/lessons_in_iframes/level_1/unit_1/notice_0/baked_by_the_author_himself.webp",
    "/lessons_in_iframes/level_1/unit_1/notice_0/earthman_topraksoy_tsuchimoto.webp",
    "/lessons_in_iframes/level_1/unit_1/notice_0/index.html",
    "/lessons_in_iframes/level_1/unit_1/notice_0/notice.css",
    "/lessons_in_iframes/level_1/unit_1/notice_0/notice.js"
  ];

  const secondList = [

  ];

  let errorHappened = false;
  try {
    parent.console.log("Caching files for 1-1-N and 1-2-1 ...");
    await cacheSlot0.addAll(firstList);
    await cacheSlot1.addAll(secondList);
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
