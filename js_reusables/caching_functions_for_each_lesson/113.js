"use strict";
// Turns out async functions cannot be exported, so, we will create a new script tag for each lesson and set its src to load a js file such as this one
async function cacheAssetsOfLesson113() {

  const cacheSlot0 = await caches.open('primary-assets-for-1-1-3');
  const cacheSlot1 = await caches.open('secondary-assets-for-1-1-3');

  const firstList = [
    "/lessons_in_iframes/level_1/unit_1/lesson_3/0_glass.webp",
    "/lessons_in_iframes/level_1/unit_1/lesson_3/eyes_blinking_naturally.webp",
    "/lessons_in_iframes/level_1/unit_1/lesson_3/give_me_water_state_a.webp",
    "/lessons_in_iframes/level_1/unit_1/lesson_3/give_me_water_state_b0.webp",
    "/lessons_in_iframes/level_1/unit_1/lesson_3/give_me_water_state_b1.webp",
    "/lessons_in_iframes/level_1/unit_1/lesson_3/give_me_water_state_b2.webp",
    "/lessons_in_iframes/level_1/unit_1/lesson_3/give_me_water_state_c.webp",
    "/lessons_in_iframes/level_1/unit_1/lesson_3/give_me_water_state_d.webp",
    "/lessons_in_iframes/level_1/unit_1/lesson_3/give_me_water_state_e.webp",
    "/lessons_in_iframes/level_1/unit_1/lesson_3/give_me_water.css",
    "/lessons_in_iframes/level_1/unit_1/lesson_3/give_me_water.js",
    "/lessons_in_iframes/level_1/unit_1/lesson_3/index.html",
    "/lessons_in_iframes/level_1/unit_1/lesson_3/move_the_mouse.webp",
    "/lessons_in_iframes/level_1/unit_1/lesson_3/nice_arrow_down.webp",
    "/lessons_in_iframes/level_1/unit_1/lesson_3/nice_arrow_left.webp",
    "/lessons_in_iframes/level_1/unit_1/lesson_3/speech_bubble_hand_give_me.webp",
    "/lessons_in_iframes/level_1/unit_1/lesson_3/speech_bubble_water.webp",
    "/lessons_in_iframes/level_1/unit_1/lesson_3/the_ground_repeat_x.webp",
    "/lessons_in_iframes/level_1/unit_1/lesson_3/the_table.webp",
    "/lessons_in_iframes/level_1/unit_1/lesson_3/tray_without_hand.webp",
    "/lessons_in_iframes/level_1/unit_1/lesson_3/drag_the_glass_loop_1.webm",
    "/lessons_in_iframes/level_1/unit_1/lesson_3/drag_the_glass_loop_2.webm",
    "/lessons_in_iframes/level_1/unit_1/lesson_3/glass_on_porcelain.webm",
    "/lessons_in_iframes/level_1/unit_1/lesson_3/he_gets_the_water.webm",
    "/lessons_in_iframes/level_1/unit_1/lesson_3/hover_on_the_glass.webm",
    "/lessons_in_iframes/level_1/unit_1/lesson_3/mousedown_touchstart.webm"
  ];

  let item1 = "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_1/lesson_3/give_me_water_1_normal.webm";
  let item2 = "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_1/lesson_3/give_me_water_1_slow.webm";
  let item3 = "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_1/lesson_3/give_me_water_2_normal.webm";
  let item4 = "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_1/lesson_3/give_me_water_2_slow.webm";
  let item5 = "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_1/lesson_3/thank_you.webm";
  if (parent.mustUseFemaleConjugationForCommandVerbs) { // See js_for_app_initialization_in_parent
    item1 = item1.split(".")[0] + "_tofemale.webm";
    item2 = item2.split(".")[0] + "_tofemale.webm";
    item3 = item3.split(".")[0] + "_tofemale.webm";
    item4 = item4.split(".")[0] + "_tofemale.webm";
    item5 = item5.split(".")[0] + "_tofemale.webm";
  }
  const secondList = [
    item1,    item2,    item3,    item4,    item5,
    "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_1/lesson_3/give.webm"
  ];

  let errorHappened = false;
  try {
    parent.console.log("Caching files for 1-1-3 ...");
    await cacheSlot0.addAll(firstList);
    await cacheSlot1.addAll(secondList);
  } catch(err) {
    parent.console.error(err);
    errorHappened = true;
  } finally {
    if (!errorHappened) {
      parent.console.log("... and files for 1-1-3 were cached successfully");
      localStorage.loadFiles113WasSuccessful = "cool";
    }
  }

} // END OF cacheAssetsOfLesson113

cacheAssetsOfLesson113();
