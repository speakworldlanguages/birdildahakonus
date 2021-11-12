/**/
// Call these when it is time to get the files ready
async function cacheCoreAssetsOfTheApp() {
  const cacheName = "app-core-cache";
  // Outcommented files must be cached conditionally
  const resourcesToPrecache = [
    "index.html",
    /*_CSS_*/
    "css_reusables/css_for_all_container_parent_htmls.css",
    "css_reusables/css_for_all_iframed_lesson_htmls.css",
    //
    "css_reusables/css_for_every_single_html.css",
    // "css_reusables/css_for_hitoic_kanji_font_rules.css",
    // "css_reusables/css_for_latin_font_rules.css",
    "css_reusables/css_for_lessons_with_interactables.css",
    "css_reusables/css_for_new_vocabulary_with_photos.css",
    //
    "css_reusables/css_for_sliding_navigation_menu.css",
    // "css_reusables/css_for_wavesurfer_microphone_divs.css",

    /*_JS BY AUTHOR_*/
    "js_reusables/js_for_all_container_parent_htmls.js",
    "js_reusables/js_for_all_iframed_lesson_htmls.js",
    "js_reusables/js_for_different_browsers_and_devices.js",
    //
    "js_reusables/js_for_every_single_html.js",
    "js_reusables/js_for_handling_fullscreen_mode.js",
    "js_reusables/js_for_handling_reveal_help_button.js",
    "js_reusables/js_for_handling_speech_give_up.js",
    // "js_reusables/js_for_icon_and_title_animation.js",
    "js_reusables/js_for_microphone_input_visualization.js",
    "js_reusables/js_for_notification_or_such_boxes.js",
    // "js_reusables/js_for_odtu.js",
    "js_reusables/js_for_preload_handling.js",
    // "js_reusables/js_for_pwa.js",
    "js_reusables/js_for_the_sliding_navigation_menu.js",
    //

    /*_JS - BY THE OPEN SOURCE COMMUNITY_*/
    "third_party_js/annyang.min.js",
    // "third_party_js/devicedetector-min.js", // pasted into js_for_every_single_html.js
    "third_party_js/howler.min.js",
    "third_party_js/ua-parser.min.js",
    // "third_party_js/wavesurfer.microphone.min.js",
    // "third_party_js/wavesurfer.microphone.min.js.map",
    "third_party_js/wavesurfer.min.js",
    "third_party_js/wavesurfer.min.js.map",

    /*_Level PROGRESS CHART_*/
    "progress_chart/bilinguals.css",
    "progress_chart/bread.webp",
    "progress_chart/get_ui_texts.js",
    "progress_chart/givemewater.webp",
    "progress_chart/index.html",
    "progress_chart/progress.css",
    "progress_chart/progress.js",
    "progress_chart/water.webp",

    /*_USER INTERFACE - FONTS_*/
    // "user_interface/fonts/KosugiMaru-Regular.ttf",
    // "user_interface/fonts/Oxanium-SemiBold.ttf",
    // "user_interface/fonts/TitilliumWeb-Light.ttf",

    /*_USER INTERFACE - ICON_*/
    // ...

    /*_USER INTERFACE - IMAGES - CURSOR_*/
    // ...

    /*_USER INTERFACE - IMAGES - SLIDING NAV MENU_*/
    "user_interface/images/sliding_navigation_menu/go_to_main_menu_house_a.webp",
    "user_interface/images/sliding_navigation_menu/go_to_main_menu_house_d.webp",
    "user_interface/images/sliding_navigation_menu/pause_lesson_a.webp",
    "user_interface/images/sliding_navigation_menu/pause_lesson_d.webp",
    "user_interface/images/sliding_navigation_menu/scale_a.webp",
    "user_interface/images/sliding_navigation_menu/scale_d.webp",
    // ...

    /*_USER INTERFACE - IMAGES_*/
    // ...
    "user_interface/images/gender_gentlemen.webp",
    "user_interface/images/gender_ladies.webp",
    // "user_interface/images/long_arrow.png",
    "user_interface/images/microphone.webp",
    "user_interface/images/now_you_say_it_to_speech_recognition.webp",
    "user_interface/images/push_me_notification.webp",
    //
    //
    //
    //
    "user_interface/images/rotating_globe_100x150_frame0.webp",
    "user_interface/images/rotating_globe_100x150.webp",
    //
    "user_interface/images/we_are_working.webp",

    /*_USER INTERFACE - SOUNDS_*/
    // ogg or mp3
    "user_interface/sounds/ceramic_button_click."+audioFileExtension,
    "user_interface/sounds/ceramic_button_hover."+audioFileExtension,
    "user_interface/sounds/ding."+audioFileExtension,
    "user_interface/sounds/financial_thirdparty_click."+audioFileExtension,
    "user_interface/sounds/glass_button_click."+audioFileExtension,
    "user_interface/sounds/glass_button_hover."+audioFileExtension,
    "user_interface/sounds/illuminant_button_click."+audioFileExtension,
    "user_interface/sounds/illuminant_button_hover."+audioFileExtension,
    "user_interface/sounds/notification1_appear."+audioFileExtension,
    "user_interface/sounds/notification1_close."+audioFileExtension,
    "user_interface/sounds/notification2_appear."+audioFileExtension,
    "user_interface/sounds/notification2_close."+audioFileExtension,
    "user_interface/sounds/notification3_appear."+audioFileExtension,
    "user_interface/sounds/notification3_close."+audioFileExtension,
    "user_interface/sounds/proceed_to_next_click."+audioFileExtension,
    "user_interface/sounds/proceed_to_next_hover."+audioFileExtension,
    "user_interface/sounds/progress_chart_click."+audioFileExtension,
    "user_interface/sounds/progress_chart_hover."+audioFileExtension,
    "user_interface/sounds/success1."+audioFileExtension,
    "user_interface/sounds/success2."+audioFileExtension,
    "user_interface/sounds/thingy_one_activate."+audioFileExtension,
    "user_interface/sounds/thingy_one_deactivate."+audioFileExtension,
    "user_interface/sounds/thingy_two_activate."+audioFileExtension,
    "user_interface/sounds/thingy_two_deactivate."+audioFileExtension,
    "user_interface/sounds/thingy_two_error."+audioFileExtension,

    /*_USER INTERFACE_*/
    "user_interface/16x16_anti_sleep_mode.mp4",
    "user_interface/blank.html"
  ];
  if (deviceDetector.device == "desktop") {
    resourcesToPrecache.push(
      "add_to_desktop.webp",
      "css_reusables/css_for_disappearing_custom_cursor.css",
      "css_reusables/css_for_permanent_custom_cursor.css",
      "js_reusables/js_for_disappearing_custom_cursor.js",
      "user_interface/images/reveal_help_desktop_teacher_off.webp",
      "user_interface/images/reveal_help_desktop_teacher_on.webp",
      "user_interface/images/right_click_go_for_fullscreen.webp",
      "user_interface/images/right_click_no_more_fullscreen.webp"
      );
  } else {
    resourcesToPrecache.push(
      "js_reusables/tilt-to-steer.js",
      "add_to_home_screen_phone.webp",
      "add_to_home_screen_tablet.webp",
      "user_interface/images/touch_and_drag_man_2x_scale.webp"
      );
  }
  /*
  if (isApple) { // See js_for_different_browsers_and_devices.js
    resourcesToPrecache.push(
      "",
      ""
      );
  } else {
    resourcesToPrecache.push(
      "",
      ""
      );
  }
  */


  const cache = await caches.open(cacheName);
  await cache.addAll(resourcesToPrecache);
}
/**/
async function cacheAssetsOfProgressChart() {
  const cacheName = "app-progress-chart-cache";
  const resourcesToPrecache = [
    "progress_chart/bilinguals.css",
    "progress_chart/bread.webp",
    "progress_chart/get_ui_texts.js",
    "progress_chart/givemewater.webp",
    "progress_chart/index.html",
    "progress_chart/progress.css",
    "progress_chart/progress.js",
    "progress_chart/water.webp"
  ];
  const cache = await caches.open(cacheName);
  await cache.addAll(resourcesToPrecache);
}
/**/
async function cacheAssetsOfLevel_111() {
  const cacheName = "app-lesson-1-1-1-cache";
  const resourcesToPrecache = [
    "lessons_in_iframes/level_1/unit_1/lesson_1/1_c1.webp",
    "lessons_in_iframes/level_1/unit_1/lesson_1/2.webp",
    "lessons_in_iframes/level_1/unit_1/lesson_1/3.webp",
    "lessons_in_iframes/level_1/unit_1/lesson_1/4.webp",
    "lessons_in_iframes/level_1/unit_1/lesson_1/5.webp",
    "lessons_in_iframes/level_1/unit_1/lesson_1/6.webp",
    "lessons_in_iframes/level_1/unit_1/lesson_1/bread.js",
    "lessons_in_iframes/level_1/unit_1/lesson_1/c2.webp",
    "lessons_in_iframes/level_1/unit_1/lesson_1/c3.webp",
    "lessons_in_iframes/level_1/unit_1/lesson_1/c4.webp",
    "lessons_in_iframes/level_1/unit_1/lesson_1/c5.webp",
    "lessons_in_iframes/level_1/unit_1/lesson_1/c6.webp",
    "lessons_in_iframes/level_1/unit_1/lesson_1/c7.webp",
    "lessons_in_iframes/level_1/unit_1/lesson_1/c8.webp",
    "lessons_in_iframes/level_1/unit_1/lesson_1/index.html"
  ];
  // if iOS or Mac OS mp4 else webm // if iOS or Mac OS mp3 else ogg
  if (isApple) {
    resourcesToPrecache.push(
      "lessons_in_iframes/level_1/unit_1/lesson_1/v1_h264.mp4",
      "lessons_in_iframes/level_1/unit_1/lesson_1/v2_h264.mp4",
      "lessons_in_iframes/level_1/unit_1/lesson_1/what_bread_sounds_like_1.mp3",
      "lessons_in_iframes/level_1/unit_1/lesson_1/what_bread_sounds_like_2.mp3");
  } else {
    resourcesToPrecache.push(
      "lessons_in_iframes/level_1/unit_1/lesson_1/v1_vp9.webm",
      "lessons_in_iframes/level_1/unit_1/lesson_1/v2_vp9.webm",
      "lessons_in_iframes/level_1/unit_1/lesson_1/what_bread_sounds_like_1.ogg",
      "lessons_in_iframes/level_1/unit_1/lesson_1/what_bread_sounds_like_2.ogg");
  }
  const cache = await caches.open(cacheName);
  await cache.addAll(resourcesToPrecache);
}
/**/
async function cacheAssetsOfLevel_112() { // Call this as soon as window load happens in lessons_in_iframes/level_1/unit_1/lesson_1/index.html
  const cacheName = "app-lesson-1-1-2-cache";
  const resourcesToPrecache = [
    "lessons_in_iframes/level_1/unit_1/lesson_1/1.webp",
    "lessons_in_iframes/level_1/unit_1/lesson_1/2.webp",
    "lessons_in_iframes/level_1/unit_1/lesson_1/3.webp",
    "lessons_in_iframes/level_1/unit_1/lesson_1/4.webp",
    "lessons_in_iframes/level_1/unit_1/lesson_1/5.webp",
    "lessons_in_iframes/level_1/unit_1/lesson_1/6.webp",
    "lessons_in_iframes/level_1/unit_1/lesson_1/c1.webp",
    "lessons_in_iframes/level_1/unit_1/lesson_1/c2.webp",
    "lessons_in_iframes/level_1/unit_1/lesson_1/c3.webp",
    "lessons_in_iframes/level_1/unit_1/lesson_1/c4.webp",
    "lessons_in_iframes/level_1/unit_1/lesson_1/c5.webp",
    "lessons_in_iframes/level_1/unit_1/lesson_1/c6.webp",
    "lessons_in_iframes/level_1/unit_1/lesson_1/c7.webp",
    "lessons_in_iframes/level_1/unit_1/lesson_1/c8.webp",
    "lessons_in_iframes/level_1/unit_1/lesson_1/c9.webp",
    "lessons_in_iframes/level_1/unit_1/lesson_1/c10.webp",
    "lessons_in_iframes/level_1/unit_1/lesson_1/index.html",
    "lessons_in_iframes/level_1/unit_1/lesson_1/water.js"
  ];
  // if iOS or Mac OS mp4 else webm // if iOS or Mac OS mp3 else ogg
  if (isApple) {
    resourcesToPrecache.push(
      "lessons_in_iframes/level_1/unit_1/lesson_1/v1_h264.mp4",
      "lessons_in_iframes/level_1/unit_1/lesson_1/v2_h264.mp4",
      "lessons_in_iframes/level_1/unit_1/lesson_1/what_water_sounds_like_1.mp3",
      "lessons_in_iframes/level_1/unit_1/lesson_1/what_water_sounds_like_2.mp3",
      "lessons_in_iframes/level_1/unit_1/lesson_1/what_water_sounds_like_3.mp3",
      "lessons_in_iframes/level_1/unit_1/lesson_1/what_water_sounds_like_4.mp3",
      "lessons_in_iframes/level_1/unit_1/lesson_1/what_water_sounds_like_5.mp3");
  } else {
    resourcesToPrecache.push(
      "lessons_in_iframes/level_1/unit_1/lesson_1/v1_vp9.webm",
      "lessons_in_iframes/level_1/unit_1/lesson_1/v2_vp9.webm",
      "lessons_in_iframes/level_1/unit_1/lesson_1/what_water_sounds_like_1.ogg",
      "lessons_in_iframes/level_1/unit_1/lesson_1/what_water_sounds_like_2.ogg",
      "lessons_in_iframes/level_1/unit_1/lesson_1/what_water_sounds_like_3.ogg",
      "lessons_in_iframes/level_1/unit_1/lesson_1/what_water_sounds_like_4.ogg",
      "lessons_in_iframes/level_1/unit_1/lesson_1/what_water_sounds_like_5.ogg");
  }
  const cache = await caches.open(cacheName);
  await cache.addAll(resourcesToPrecache);
}
/**/
async function cacheAssetsOfLevel_113() { // Call this as soon as window load happens in lessons_in_iframes/level_1/unit_1/lesson_2/index.html
  /*const cacheName = "app-lesson-1-1-3-cache";
  const resourcesToPrecache = [
    "lessons_in_iframes/level_1/unit_1/lesson_1/",
    "lessons_in_iframes/level_1/unit_1/lesson_1/"
  ];
  // if iOS or Mac OS mp4 else webm // if iOS or Mac OS mp3 else ogg
  if (isApple) {
    resourcesToPrecache.push(
      "lessons_in_iframes/level_1/unit_1/lesson_1/what_bread_sounds_like_1.mp3",
      "lessons_in_iframes/level_1/unit_1/lesson_1/what_bread_sounds_like_2.mp3");
  } else {
    resourcesToPrecache.push(
      "lessons_in_iframes/level_1/unit_1/lesson_1/what_bread_sounds_like_1.ogg",
      "lessons_in_iframes/level_1/unit_1/lesson_1/what_bread_sounds_like_2.ogg");
  }*/
}
/**/
async function cacheAssetsOfLevel_114(){

}

window.addEventListener("load",theVeryFirstCachingF,{once:true}); // Run only after DOMContentLoaded because -> js_for_different_browsers_and_devices.js
function theVeryFirstCachingF() {
  if (!localStorage.thisIsNotTheFirstTimeEver) {
    cacheCoreAssetsOfTheApp(); cacheAssetsOfLevel_111(); cacheAssetsOfProgressChart();
    localStorage.thisIsNotTheFirstTimeEver = "right"; // Never try to re-cache or overwrite anything. Not sure if this is necessary but can't be too safe.
  }
}
