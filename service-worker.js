// importScripts(
//   "third_party_js/devicedetector-min.js", "third_party_js/ua-parser.min.js" /* service-workers CANNOT access DOM or localStorage*/
// );
// BUT can access IndexedDB
// https://www.py4u.net/discuss/316681
// https://github.com/localForage/localForage

/* self does not refer to the DOM window here */
/* self is the service-worker itself */
/* install and activate fire only on the first visit*/

self.addEventListener("activate", event => { /*console.log("SW activate fired!");*/ /*clear older unused stuff or handle notifications*/ });
self.addEventListener("fetch", event => {
  event.respondWith( caches.match(event.request)
    .then( cachedResponse => {
      return cachedResponse || fetch(event.request);
    } )
  );
});

const cacheName = "app-core";
// get OS name
// if (true) {
//   // iOS Mac OS no ogg no vp9-webm
// }
/* resourcesToPrecache , resourcesToPrecacheApple, resourcesToPrecacheDefault*/

// Outcommented files must be cached conditionally
const resourcesToPrecache = [
  "index.html",

  /*_CSS_*/
  // "css_reusables/css_for_all_container_parent_htmls.css",
  "css_reusables/css_for_all_iframed_lesson_htmls.css",
  // "css_reusables/css_for_disappearing_custom_cursor.css",
  "css_reusables/css_for_every_single_html.css",
  // "css_reusables/css_for_hitoic_kanji_font_rules.css",
  // "css_reusables/css_for_latin_font_rules.css",
  "css_reusables/css_for_lessons_with_interactables.css",
  "css_reusables/css_for_new_vocabulary_with_photos.css",
  // "css_reusables/css_for_permanent_custom_cursor.css",
  "css_reusables/css_for_sliding_navigation_menu.css",
  // "css_reusables/css_for_wavesurfer_microphone_divs.css",

  /*_JS BY AUTHOR_*/
  "js_reusables/js_for_all_container_parent_htmls.js",
  "js_reusables/js_for_all_iframed_lesson_htmls.js",
  "js_reusables/js_for_different_browsers_and_devices.js",
  // "js_reusables/js_for_disappearing_custom_cursor.js",
  "js_reusables/js_for_every_single_html.js",
  "js_reusables/js_for_handling_fullscreen_mode.js",
  "js_reusables/js_for_handling_reveal_help_button.js",
  "js_reusables/js_for_handling_speech_give_up.js",
  // "js_reusables/js_for_icon_animation.js",
  "js_reusables/js_for_microphone_input_visualization.js",
  "js_reusables/js_for_notification_or_such_boxes.js",
  // "js_reusables/js_for_odtu.js",
  "js_reusables/js_for_preload_handling.js",
  // "js_reusables/js_for_pwa.js",
  "js_reusables/js_for_the_sliding_navigation_menu.js",
  // "js_reusables/tilt-to-steer.js",

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
  "user_interface/images/now_you_say_it_to_speech_recognition.webp",
  // "user_interface/images/push_me_notification.webp",
  // "user_interface/images/reveal_help_desktop_teacher_off.webp",
  // "user_interface/images/reveal_help_desktop_teacher_on.webp",
  // "user_interface/images/right_click_go_for_fullscreen.webp",
  // "user_interface/images/right_click_no_more_fullscreen.webp",
  "user_interface/images/rotating_globe_100x150_frame0.webp",
  "user_interface/images/rotating_globe_100x150.webp",
  // "user_interface/images/touch_and_drag_man_2x_scale.webp",
  // "user_interface/images/we_are_working.webp",

  /*_USER INTERFACE - SOUNDS_*/
  // ogg or mp3
  // ...

  /*_USER INTERFACE_*/
  "user_interface/16x16_anti_sleep_mode.mp4",
  "user_interface/blank.html"
  /*ADD: user interface images and sounds*/
  /*Sounds ogg except iOS & Mac OS - mp3 only on iOS & Mac OS ??? */


];

self.addEventListener("install", event => {
  /*console.log("SW install fired!");*/
  event.waitUntil(
    caches.open(cacheName).then(cache => {
      return cache.addAll(resourcesToPrecache);
    })
  );
});
