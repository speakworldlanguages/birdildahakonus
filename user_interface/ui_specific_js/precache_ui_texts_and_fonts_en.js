// VEEERY IMPORTANT !!!!!!!!!
// Don't forget to update service-worker.js after adding/removing/changing something here

window.addEventListener("load",getUserInterfaceTextsReadyF,{once:true}); // Run only after DOMContentLoaded because -> js_for_different_browsers_and_devices.js
function getUserInterfaceTextsReadyF() {
  if (!localStorage.thisIsNotTheFirstTimeEverGettingUITexts) {
    cacheUI_textsAndFonts();
    localStorage.thisIsNotTheFirstTimeEverGettingUITexts = "right"; // Never try to re-cache or overwrite anything. Not sure if this is necessary but can't be too safe.
  }
}

async function cacheUI_textsAndFonts() {
  const cacheName = "user-interface-cache-Nov19th2021";
  const resourcesToPrecache = [
    "css_reusables/css_for_latin_font_rules.css",
    "user_interface/fonts/TitilliumWeb-Light.ttf",
    "user_interface/fonts/Oxanium-SemiBold.ttf",
    "user_interface/text/en/0-allow_microphone.txt",
    "user_interface/text/en/0-author_gives_sleep_advice.txt",
    "user_interface/text/en/0-continue_after_pause.txt",
    "user_interface/text/en/0-continue_to_next.txt",
    "user_interface/text/en/0-do_you_want_to_reset.txt",
    "user_interface/text/en/0-give_up_and_skip.txt",
    "user_interface/text/en/0-if_speech_recognition_is_not_working.txt",
    "user_interface/text/en/0-if_the_browser_does_not_support.txt",
    "user_interface/text/en/0-learn_another_language.txt",
    "user_interface/text/en/0-lesson_is_paused_by_button.txt",
    "user_interface/text/en/0-network_connection_too_slow.txt",
    "user_interface/text/en/0-ok_i_understand.txt",
    "user_interface/text/en/0-vocabulary_button1_button2.txt",
    "user_interface/text/en/0-you_are_learning_ar.txt",
    "user_interface/text/en/0-you_are_learning_en.txt",
    "user_interface/text/en/0-you_are_learning_ja.txt",
    "user_interface/text/en/0-you_are_learning_tr.txt",
    "user_interface/text/en/0-you_are_learning_zh.txt",
    "user_interface/text/en/0-you_didnt_touch_click_allow.txt",
    "user_interface/text/en/0-you_must_touch_click_allow.txt",
    "user_interface/text/en/1-1-1_arabic_tanween.txt",
    "user_interface/text/en/1-1-1_british_vs_american.txt",
    "user_interface/text/en/1-1-1_ren_intonation.txt",
    "user_interface/text/en/1-1-2_hito_mizu_omizu.txt",
    "user_interface/text/en/1-1-3a.txt",
    "user_interface/text/en/1-1-3b.txt",
    "user_interface/text/en/1-1-3_arabic_male_female.txt",
    "user_interface/text/en/1-1-3_vocabulary_p1_p2.txt",
    "user_interface/text/en/1-1-4a.txt",
    "user_interface/text/en/1-1-4b.txt",
    "user_interface/text/en/1-1-4_special_case_for_zh.txt",
    "user_interface/text/en/1-1-5_author_says.txt",
    "user_interface/text/en/1-2-1_eng_indefinite_article.txt",
    "user_interface/text/en/1-2-3.txt",
    "user_interface/text/en/1-2-3_special_case_for_ar.txt",
    "user_interface/text/en/1-2-4.txt",
    "user_interface/text/en/1-3-1_special_case_for_zh.txt",
    "user_interface/text/en/1-3-3.txt",
    "user_interface/text/en/1-3-4.txt",
    "user_interface/text/en/1-4-3a.txt",
    "user_interface/text/en/1-4-3b.txt",
    "user_interface/text/en/1-4-3c.txt",
    "user_interface/text/en/1-4-3d.txt",
    "user_interface/text/en/1-4-3e.txt",
    "user_interface/text/en/1-5-1_special_case_for_ar.txt",
    "user_interface/text/en/1-5-1_special_case_for_de.txt",
    "user_interface/text/en/1-5-1_special_case_for_ja.txt",
    "user_interface/text/en/1-5-1_special_case_for_tr.txt",
    "user_interface/text/en/1-5-1_special_case_for_zh.txt",
    "user_interface/text/en/1-5-3a.txt",
    "user_interface/text/en/1-5-3b.txt",
    "user_interface/text/en/1-5-3c.txt",
    "user_interface/text/en/1-5-3d.txt",
    "user_interface/text/en/1-5-3e.txt",
    "user_interface/text/en/1-5-3_special_case_for_ar.txt",
    "user_interface/text/en/1-5-3_special_case_for_ja.txt",
    "user_interface/text/en/1-6-3a.txt",
    "user_interface/text/en/1-6-3b.txt",
    "user_interface/text/en/1-6-3c.txt",
    "user_interface/text/en/1-6-3d.txt",
    "user_interface/text/en/1-6-3_special_case_for_zh.txt",
    "user_interface/text/en/after_last_lesson_button.txt",
    "user_interface/text/en/after_last_lesson_message.txt",
    "user_interface/text/en/info_about_resources.txt",
    "user_interface/text/en/info_go_back_button.txt",
    "user_interface/text/en/info_index_html_title.txt",
    "user_interface/text/en/info_monthly_option_base_eur.txt",
    "user_interface/text/en/info_monthly_option_base_usd.txt",
    "user_interface/text/en/info_name_of_author.txt",
    "user_interface/text/en/info_name_of_license.txt",
    "user_interface/text/en/info_view_license_button.txt"
  ];
  const cache = await caches.open(cacheName);
  await cache.addAll(resourcesToPrecache);
}
