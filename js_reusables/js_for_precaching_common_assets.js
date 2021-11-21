// VEEERY IMPORTANT !!!!!!!!!
// Don't forget to update service-worker.js after adding/removing/changing something here
/**/
window.addEventListener("load",theVeryFirstCachingF,{once:true}); // Run only after DOMContentLoaded because -> js_for_different_browsers_and_devices.js
async function theVeryFirstCachingF() {
  setTimeout(afterSomeMilliseconds,2000);
  function afterSomeMilliseconds() {
    if (!localStorage.thisIsNotTheFirstTimeEver) {
      // How do we chain these???
      await cacheCoreAssetsOfTheApp();
      await cacheAssetsOfLevel_111();
      await cacheAssetsOfProgressChart();
      await cacheAssetsOfInformationScreen();
      localStorage.thisIsNotTheFirstTimeEver = "right"; // Never try to re-cache or overwrite anything. Not sure if this is necessary but can't be too safe.
    }
  }
}

// Call these when it is time to get the files ready
/**/
async function cacheAssetsOfInformationScreen() { // There is also the [about page] but will leave it to dynamic service worker caching for now
  const cacheName = "information-screen-cache-Nov21st2021";
  const resourcesToPrecache = [
    "/information/index.html",
    "/information/information.css",
    "/information/information.js",
    "/information/long_arrow.png",
    "/information/topraksoy_earthman_tsuchimoto.webp"
  ];
  // if desktop push "/about/index.html"
  const cache = await caches.open(cacheName);
  await cache.addAll(resourcesToPrecache);
}

/**/
async function cacheCoreAssetsOfTheApp() {
  const cacheName = "app-core-cache-Nov21st2021";
  // Outcommented files must be cached conditionally

  // "js_reusables/js_for_microphone_input_visualization.js",
  // "css_reusables/css_for_wavesurfer_microphone_divs.css",
  // "js_reusables/js_for_icon_and_title_animation.js",
  // "js_reusables/js_for_odtu.js",
  // "js_reusables/js_for_pwa.js",
  // "third_party_js/wavesurfer.microphone.min.js",
  // "third_party_js/wavesurfer.microphone.min.js.map",

  const resourcesToPrecache = [
    "/",
    "/index.html",
    "/user_interface/blank.html",
    "/css_reusables/css_for_all_container_parent_htmls.css",
    "/css_reusables/css_for_all_iframed_lesson_htmls.css",
    "/css_reusables/css_for_every_single_html.css",
    "/css_reusables/css_for_lessons_with_interactables.css",
    "/css_reusables/css_for_new_vocabulary_with_photos.css",
    "/css_reusables/css_for_sliding_navigation_menu.css",
    "/js_reusables/js_for_all_container_parent_htmls.js",
    "/js_reusables/js_for_all_iframed_lesson_htmls.js",
    "/js_reusables/js_for_different_browsers_and_devices.js",
    "/js_reusables/js_for_every_single_html.js",
    "/js_reusables/js_for_handling_fullscreen_mode.js",
    "/js_reusables/js_for_handling_reveal_help_button.js",
    "/js_reusables/js_for_handling_speech_give_up.js",
    "/js_reusables/js_for_notification_or_such_boxes.js",
    "/js_reusables/js_for_online_and_offline_modes.js",
    "/js_reusables/js_for_preload_handling.js",
    "/js_reusables/js_for_the_sliding_navigation_menu.js",
    "/third_party_js/annyang.min.js",
    "/third_party_js/howler.min.js",
    "/third_party_js/ua-parser.min.js",
    "/third_party_js/wavesurfer.min.js",
    "/third_party_js/wavesurfer.min.js.map",
    "/user_interface/images/sliding_navigation_menu/go_to_main_menu_house_a.webp",
    "/user_interface/images/sliding_navigation_menu/go_to_main_menu_house_d.webp",
    "/user_interface/images/sliding_navigation_menu/pause_lesson_a.webp",
    "/user_interface/images/sliding_navigation_menu/pause_lesson_d.webp",
    "/user_interface/images/sliding_navigation_menu/scale_a.webp",
    "/user_interface/images/sliding_navigation_menu/scale_d.webp",
    "/user_interface/images/gender_gentlemen.webp",
    "/user_interface/images/gender_ladies.webp",
    "/user_interface/images/microphone.webp",
    "/user_interface/images/now_you_say_it_to_speech_recognition.webp",
    "/user_interface/images/push_me_notification.webp",
    "/user_interface/images/rotating_globe_100x150_frame0.webp",
    "/user_interface/images/rotating_globe_100x150.webp",
    "/user_interface/images/we_are_working.webp",
    "/user_interface/16x16_anti_sleep_mode.mp4"
  ];
  //---
  if (deviceDetector.device == "desktop") {
    resourcesToPrecache.push(
      "/user_interface/images/add_to_desktop.webp",
      "/css_reusables/css_for_disappearing_custom_cursor.css",
      "/css_reusables/css_for_permanent_custom_cursor.css",
      "/js_reusables/js_for_disappearing_custom_cursor.js",
      "/user_interface/images/reveal_help_desktop_teacher_off.webp",
      "/user_interface/images/reveal_help_desktop_teacher_on.webp",
      "/user_interface/images/right_click_go_for_fullscreen.webp",
      "/user_interface/images/right_click_no_more_fullscreen.webp"
    );
  } else { // Both tablet & phone
    resourcesToPrecache.push(
      "/js_reusables/tilt-to-steer.js",
      "/user_interface/images/touch_and_drag_man_2x_scale.webp"
    );
    if (deviceDetector.device == "phone") {
      resourcesToPrecache.push(        "/user_interface/images/add_to_home_screen_phone.webp"      ); // Phone only
    } else {
      resourcesToPrecache.push(        "/user_interface/images/add_to_home_screen_tablet.webp"      ); // Tablet only
    }
  }
  //---
  if (isApple) { // See js_for_different_browsers_and_devices.js
    resourcesToPrecache.push(
      "/user_interface/sounds/ceramic_button_click.mp3",
      "/user_interface/sounds/ceramic_button_hover.mp3",
      "/user_interface/sounds/ding.mp3",
      "/user_interface/sounds/financial_thirdparty_click.mp3",
      "/user_interface/sounds/glass_button_click.mp3",
      "/user_interface/sounds/glass_button_hover.mp3",
      "/user_interface/sounds/illuminant_button_click.mp3",
      "/user_interface/sounds/illuminant_button_hover.mp3",
      "/user_interface/sounds/notification1_appear.mp3",
      "/user_interface/sounds/notification1_close.mp3",
      "/user_interface/sounds/notification2_appear.mp3",
      "/user_interface/sounds/notification2_close.mp3",
      "/user_interface/sounds/notification3_appear.mp3",
      "/user_interface/sounds/notification3_close.mp3",
      "/user_interface/sounds/proceed_to_next_click.mp3",
      "/user_interface/sounds/proceed_to_next_hover.mp3",
      "/user_interface/sounds/progress_chart_click.mp3",
      "/user_interface/sounds/progress_chart_hover.mp3",
      "/user_interface/sounds/success1.mp3",
      "/user_interface/sounds/success2.mp3",
      "/user_interface/sounds/thingy_one_activate.mp3",
      "/user_interface/sounds/thingy_one_deactivate.mp3",
      "/user_interface/sounds/thingy_two_activate.mp3",
      "/user_interface/sounds/thingy_two_deactivate.mp3",
      "/user_interface/sounds/thingy_two_error.mp3"
      );
  } else {
    resourcesToPrecache.push(
      "/user_interface/sounds/ceramic_button_click.ogg",
      "/user_interface/sounds/ceramic_button_hover.ogg",
      "/user_interface/sounds/ding.ogg",
      "/user_interface/sounds/financial_thirdparty_click.ogg",
      "/user_interface/sounds/glass_button_click.ogg",
      "/user_interface/sounds/glass_button_hover.ogg",
      "/user_interface/sounds/illuminant_button_click.ogg",
      "/user_interface/sounds/illuminant_button_hover.ogg",
      "/user_interface/sounds/notification1_appear.ogg",
      "/user_interface/sounds/notification1_close.ogg",
      "/user_interface/sounds/notification2_appear.ogg",
      "/user_interface/sounds/notification2_close.ogg",
      "/user_interface/sounds/notification3_appear.ogg",
      "/user_interface/sounds/notification3_close.ogg",
      "/user_interface/sounds/proceed_to_next_click.ogg",
      "/user_interface/sounds/proceed_to_next_hover.ogg",
      "/user_interface/sounds/progress_chart_click.ogg",
      "/user_interface/sounds/progress_chart_hover.ogg",
      "/user_interface/sounds/success1.ogg",
      "/user_interface/sounds/success2.ogg",
      "/user_interface/sounds/thingy_one_activate.ogg",
      "/user_interface/sounds/thingy_one_deactivate.ogg",
      "/user_interface/sounds/thingy_two_activate.ogg",
      "/user_interface/sounds/thingy_two_deactivate.ogg",
      "/user_interface/sounds/thingy_two_error.ogg"
      );
  }
  const cache = await caches.open(cacheName);
  await cache.addAll(resourcesToPrecache);
}

/**/
async function cacheAssetsOfProgressChart() {
  const cacheName = "progress-chart-cache-Nov21st2021";
  const resourcesToPrecache = [
    "/progress_chart/index.html",
    "/progress_chart/bilinguals.css",
    "/progress_chart/bread.webp",
    "/progress_chart/get_ui_texts.js",
    "/progress_chart/givemewater.webp",
    "/progress_chart/progress.css",
    "/progress_chart/progress.js",
    "/progress_chart/water.webp"
  ];
  const cache = await caches.open(cacheName);
  await cache.addAll(resourcesToPrecache);
}

/**/
async function cacheAssetsOfLevel_111() {
  const cacheName = "lesson-1-1-1-cache-Nov21st2021";
  const resourcesToPrecache = [
    "/lessons_in_iframes/level_1/unit_1/lesson_1/",
    "/lessons_in_iframes/level_1/unit_1/lesson_1/index.html",
    "/lessons_in_iframes/level_1/unit_1/lesson_1/1_c1.webp",
    "/lessons_in_iframes/level_1/unit_1/lesson_1/2.webp",
    "/lessons_in_iframes/level_1/unit_1/lesson_1/3.webp",
    "/lessons_in_iframes/level_1/unit_1/lesson_1/4.webp",
    "/lessons_in_iframes/level_1/unit_1/lesson_1/5.webp",
    "/lessons_in_iframes/level_1/unit_1/lesson_1/6.webp",
    "/lessons_in_iframes/level_1/unit_1/lesson_1/bread.js",
    "/lessons_in_iframes/level_1/unit_1/lesson_1/c2.webp",
    "/lessons_in_iframes/level_1/unit_1/lesson_1/c3.webp",
    "/lessons_in_iframes/level_1/unit_1/lesson_1/c4.webp",
    "/lessons_in_iframes/level_1/unit_1/lesson_1/c5.webp",
    "/lessons_in_iframes/level_1/unit_1/lesson_1/c6.webp",
    "/lessons_in_iframes/level_1/unit_1/lesson_1/c7.webp",
    "/lessons_in_iframes/level_1/unit_1/lesson_1/c8.webp"
  ];
  // if iOS or Mac OS mp4 else webm // if iOS or Mac OS mp3 else ogg
  if (isApple) {
    resourcesToPrecache.push(
      "/lessons_in_iframes/level_1/unit_1/lesson_1/v1_h264.mp4",
      "/lessons_in_iframes/level_1/unit_1/lesson_1/v2_h264.mp4",
      "/lessons_in_iframes/level_1/unit_1/lesson_1/what_bread_sounds_like_1.mp3",
      "/lessons_in_iframes/level_1/unit_1/lesson_1/what_bread_sounds_like_2.mp3");
  } else {
    resourcesToPrecache.push(
      "/lessons_in_iframes/level_1/unit_1/lesson_1/v1_vp9.webm",
      "/lessons_in_iframes/level_1/unit_1/lesson_1/v2_vp9.webm",
      "/lessons_in_iframes/level_1/unit_1/lesson_1/what_bread_sounds_like_1.ogg",
      "/lessons_in_iframes/level_1/unit_1/lesson_1/what_bread_sounds_like_2.ogg");
  }
  const cache = await caches.open(cacheName);
  await cache.addAll(resourcesToPrecache);
}

/**/
async function cacheAssetsOfLevel_112() { // Call this as soon as window load happens in lessons_in_iframes/level_1/unit_1/lesson_1/index.html
  const cacheName = "lesson-1-1-2-cache-Nov21st2021";
  const resourcesToPrecache = [
    "/lessons_in_iframes/level_1/unit_1/lesson_2/",
    "/lessons_in_iframes/level_1/unit_1/lesson_2/index.html",
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
    "/lessons_in_iframes/level_1/unit_1/lesson_2/water.js"
  ];
  // if iOS or Mac OS mp4 else webm // if iOS or Mac OS mp3 else ogg
  if (isApple) {
    resourcesToPrecache.push(
      "/lessons_in_iframes/level_1/unit_1/lesson_2/v1_h264.mp4",
      "/lessons_in_iframes/level_1/unit_1/lesson_2/v2_h264.mp4",
      "/lessons_in_iframes/level_1/unit_1/lesson_2/what_water_sounds_like_1.mp3",
      "/lessons_in_iframes/level_1/unit_1/lesson_2/what_water_sounds_like_2.mp3",
      "/lessons_in_iframes/level_1/unit_1/lesson_2/what_water_sounds_like_3.mp3",
      "/lessons_in_iframes/level_1/unit_1/lesson_2/what_water_sounds_like_4.mp3",
      "/lessons_in_iframes/level_1/unit_1/lesson_2/what_water_sounds_like_5.mp3"
    );
  } else {
    resourcesToPrecache.push(
      "/lessons_in_iframes/level_1/unit_1/lesson_2/v1_vp9.webm",
      "/lessons_in_iframes/level_1/unit_1/lesson_2/v2_vp9.webm",
      "/lessons_in_iframes/level_1/unit_1/lesson_2/what_water_sounds_like_1.ogg",
      "/lessons_in_iframes/level_1/unit_1/lesson_2/what_water_sounds_like_2.ogg",
      "/lessons_in_iframes/level_1/unit_1/lesson_2/what_water_sounds_like_3.ogg",
      "/lessons_in_iframes/level_1/unit_1/lesson_2/what_water_sounds_like_4.ogg",
      "/lessons_in_iframes/level_1/unit_1/lesson_2/what_water_sounds_like_5.ogg"
    );
  }
  const cache = await caches.open(cacheName);
  await cache.addAll(resourcesToPrecache);
}

/**/
async function cacheAssetsOfLevel_113() { // Call this as soon as window load happens in lessons_in_iframes/level_1/unit_1/lesson_2/index.html
  const cacheName = "lesson-1-1-3-cache-Nov21st2021";
  const resourcesToPrecache = [
    "/lessons_in_iframes/level_1/unit_1/lesson_3/",
    "/lessons_in_iframes/level_1/unit_1/lesson_3/index.html",
    "/lessons_in_iframes/level_1/unit_1/lesson_3/-0p5_glass.webp",
    "/lessons_in_iframes/level_1/unit_1/lesson_3/-1_glass.webp",
    "/lessons_in_iframes/level_1/unit_1/lesson_3/-1p5_glass.webp",
    "/lessons_in_iframes/level_1/unit_1/lesson_3/-2_glass.webp",
    "/lessons_in_iframes/level_1/unit_1/lesson_3/-3_glass.webp",
    "/lessons_in_iframes/level_1/unit_1/lesson_3/-4_glass.webp",
    "/lessons_in_iframes/level_1/unit_1/lesson_3/-5_glass.webp",
    "/lessons_in_iframes/level_1/unit_1/lesson_3/-6_glass.webp",
    "/lessons_in_iframes/level_1/unit_1/lesson_3/-7_glass.webp",
    "/lessons_in_iframes/level_1/unit_1/lesson_3/-8_glass.webp",
    "/lessons_in_iframes/level_1/unit_1/lesson_3/-9_glass.webp",
    "/lessons_in_iframes/level_1/unit_1/lesson_3/0_glass.webp",
    "/lessons_in_iframes/level_1/unit_1/lesson_3/0p5_glass.webp",
    "/lessons_in_iframes/level_1/unit_1/lesson_3/1_glass.webp",
    "/lessons_in_iframes/level_1/unit_1/lesson_3/1p5_glass.webp",
    "/lessons_in_iframes/level_1/unit_1/lesson_3/2_glass.webp",
    "/lessons_in_iframes/level_1/unit_1/lesson_3/3_glass.webp",
    "/lessons_in_iframes/level_1/unit_1/lesson_3/4_glass.webp",
    "/lessons_in_iframes/level_1/unit_1/lesson_3/5_glass.webp",
    "/lessons_in_iframes/level_1/unit_1/lesson_3/6_glass.webp",
    "/lessons_in_iframes/level_1/unit_1/lesson_3/7_glass.webp",
    "/lessons_in_iframes/level_1/unit_1/lesson_3/8_glass.webp",
    "/lessons_in_iframes/level_1/unit_1/lesson_3/9_glass.webp",
    "/lessons_in_iframes/level_1/unit_1/lesson_3/breaking_glass_fallen_from_center.webp",
    "/lessons_in_iframes/level_1/unit_1/lesson_3/breaking_glass_fallen_from_left.webp",
    "/lessons_in_iframes/level_1/unit_1/lesson_3/breaking_glass_fallen_from_right.webp",
    "/lessons_in_iframes/level_1/unit_1/lesson_3/choose_gamepad.webp",
    "/lessons_in_iframes/level_1/unit_1/lesson_3/choose_mouse.webp",
    "/lessons_in_iframes/level_1/unit_1/lesson_3/eyes_blinking_naturally.webp",
    "/lessons_in_iframes/level_1/unit_1/lesson_3/eyes_happy_blinking.webp",
    "/lessons_in_iframes/level_1/unit_1/lesson_3/eyes_see_falling_object.webp",
    "/lessons_in_iframes/level_1/unit_1/lesson_3/eyes_squint_its_broken.webp",
    "/lessons_in_iframes/level_1/unit_1/lesson_3/eyes_watching.webp",
    "/lessons_in_iframes/level_1/unit_1/lesson_3/gamepad_or_mouse.webp",
    "/lessons_in_iframes/level_1/unit_1/lesson_3/give_me_water_state_a.webp",
    "/lessons_in_iframes/level_1/unit_1/lesson_3/give_me_water_state_b0.webp",
    "/lessons_in_iframes/level_1/unit_1/lesson_3/give_me_water_state_b1.webp",
    "/lessons_in_iframes/level_1/unit_1/lesson_3/give_me_water_state_b2.webp",
    "/lessons_in_iframes/level_1/unit_1/lesson_3/give_me_water_state_c.webp",
    "/lessons_in_iframes/level_1/unit_1/lesson_3/give_me_water_state_d.webp",
    "/lessons_in_iframes/level_1/unit_1/lesson_3/give_me_water.css",
    "/lessons_in_iframes/level_1/unit_1/lesson_3/give_me_water.js",
    "/lessons_in_iframes/level_1/unit_1/lesson_3/play_with_gamepad.js",
    "/lessons_in_iframes/level_1/unit_1/lesson_3/play_with_mouse.js",
    "/lessons_in_iframes/level_1/unit_1/lesson_3/play_with_tablet_or_phone.js",
    "/lessons_in_iframes/level_1/unit_1/lesson_3/speech_bubble_hand_give_me.webp",
    "/lessons_in_iframes/level_1/unit_1/lesson_3/speech_bubble_slow_down.webp",
    "/lessons_in_iframes/level_1/unit_1/lesson_3/speech_bubble_water.webp",
    "/lessons_in_iframes/level_1/unit_1/lesson_3/the_ground_repeat_x.webp",
    "/lessons_in_iframes/level_1/unit_1/lesson_3/the_table.webp",
    "/lessons_in_iframes/level_1/unit_1/lesson_3/tray_with_hand.webp",
    "/lessons_in_iframes/level_1/unit_1/lesson_3/tray_without_hand.webp"
  ];
  //---
  if (deviceDetector.device == "desktop") {
    resourcesToPrecache.push(
      "/lessons_in_iframes/level_1/unit_1/lesson_3/hand_cursor.webp",
      "/lessons_in_iframes/level_1/unit_1/lesson_3/move_the_mouse.webp"
    );
  } else { // tablet & phone
    if (deviceDetector.device == "phone") {
      resourcesToPrecache.push(
        "/lessons_in_iframes/level_1/unit_1/lesson_3/tilt_phone.webp",
        "/lessons_in_iframes/level_1/unit_1/lesson_3/touch_phone.webp"
      ); // Phone only
    } else {
      resourcesToPrecache.push(
        "/lessons_in_iframes/level_1/unit_1/lesson_3/tilt_tablet.webp",
        "/lessons_in_iframes/level_1/unit_1/lesson_3/touch_tablet.webp"
      ); // Tablet only
    }
  }
  // if iOS or Mac OS mp4 else webm // if iOS or Mac OS mp3 else ogg
  if (isApple) {
    resourcesToPrecache.push(
      "/lessons_in_iframes/level_1/unit_1/lesson_3/glass_breaks_into_pieces.mp3",
      "/lessons_in_iframes/level_1/unit_1/lesson_3/he_gets_the_water.mp3"
    );
  } else {
    resourcesToPrecache.push(
      "/lessons_in_iframes/level_1/unit_1/lesson_3/glass_breaks_into_pieces.ogg",
      "/lessons_in_iframes/level_1/unit_1/lesson_3/he_gets_the_water.ogg"
    );
  }
  const cache = await caches.open(cacheName);
  await cache.addAll(resourcesToPrecache);
}

/**/
async function cacheAssetsOfLevel_114(){

}
