"use strict";
// Code written by Manheart Earthman=B. A. Bilgekılınç Topraksoy=土本 智一勇夫剛志
// This file MAY NOT BE MODIFIED by unauthorized people = This file may be modified by AUTHORIZED PEOPLE ONLY

// IMPORTANT! Everything below will run in PARALLEL both on PARENT and iFRAME.
// CAUTION: Mind the duplication!

/*_____CAN VIBRATE???: https://stackoverflow.com/questions/56926591/navigator-vibrate-break-the-code-on-ios-browsers/66134699*/
const canVibrate = window.navigator.vibrate;

// See how we give the user the option to change the user interface language » js_for_redirection_to_the_proper_domain
// Until that time, UI language will automatically take the browser's language.
// POSSIBLE PRACTICE: Check if browser language and IP-geolocation match. Ask the user which language he/she wants for the GUI if the location and language is different.
var browserLanguage = navigator.language.substring(0,2).toLowerCase(); // Is used for 1- js_for_redirection_to_the_proper_domain » Comparing domains and UI languages 2- information.js » Set currency(Euro) according to user's (estimated) country
var full_URL_ofTheClone = window.location.href.toLowerCase(); // Should work for both parent and frame

// These variables will exist both in parent html and in frame html separately at the same time.
var userInterfaceLanguage = null;
var userReadsLeftToRightOrRightToLeft = "ltr"; /*Default is ltr » Use this to flip the arrow signs etc with transform rotate 180deg or scaleX -1 if UI is in Arabic or another rtl language*/
var needLatinFonts = false;
var needHitoicJapaneseFonts = false; // Kosugi Motoya font is for Hitoic only - It doesn't have simplified chinese or hangul characters

// Set user interface and fonts
if (full_URL_ofTheClone.search("hanaserutoii") >= 0 || full_URL_ofTheClone.search("syabererutoii") >= 0) { // IMPORTANT!!! Update will be necessary at js_for_redirection_to_the_proper_domain too if this is updated
  // JA - hanaserutoiidesuyone or ...github.io
  userInterfaceLanguage = "ja"; console.log("Set user-interface-language to JA due to url");
  userReadsLeftToRightOrRightToLeft = "ltr";
  needHitoicJapaneseFonts = true;
} else if (full_URL_ofTheClone.search("birdildahakon") >= 0) { // IMPORTANT!!! Update will be necessary at js_for_redirection_to_the_proper_domain too if this is updated
  // TR - dilogrenherkeslekonus or ...github.io
  userInterfaceLanguage = "tr"; console.log("Set user-interface-language to TR due to url");
  userReadsLeftToRightOrRightToLeft = "ltr"; // Satırları ters çevirmek için <bdo> </bdo> kullanmak yerine txt dosyalarını dönüştürücü ile ters çevirmek daha mantıklı mı?
  needLatinFonts = true;
} else {
  // EN // Unlike teaching-files' paths we can go without implementing the american vs british difference and display a united user interface or can we?
  userInterfaceLanguage = "en"; console.log("Set user-interface-language to EN due to url");
  userReadsLeftToRightOrRightToLeft = "ltr";
  needLatinFonts = true;
}

/*______HEADERS to make fetch work with txt files with non-english characters properly______*/
var myHeaders = new Headers(); // Apache server default ayarları yüzünden böyle buna gerek var.
// Çağrılan txt dosyasındaki ÇĞİÖŞÜçğıöşü'nın ��������� yerine doğru görünmesi için charset=iso-8859-9 gerek; charset=utf-8 ile olmuyor. (Apache serverda durum buydu, diğerlerini denemedik)
// DİKKAT: Bunun (en azından Apache serverda durum bu) doğru çalışması için çağrılan txt dosyasının UTF-8 ile kaydedilmiş olması gerek.
// UNUTMA: langCodeForTeachingFilePaths değişkeninin tr_istanbul olma olasılığı var ki hattã userInterfaceLanguage tr olmasa bile.
// AMA ŞU HER NASILSA DOĞRU ÇALIŞIYOR:
// Ş ğ are somehow displayed correctly even though the text file is called without charset=iso-8859-9 from js_for_the_bilingual_return_button
if (userInterfaceLanguage=="tr") { // DECLARATION of userInterfaceLanguage exists in this js file so it's OK access it without waiting for window»load
  myHeaders.append('Content-Type','text/plain; charset=iso-8859-9'); // Handles both parent level and iframe level in terms of userInterfaceLanguage
  // It is also necessary to handle langCodeForTeachingFilePaths == "tr" for both parent level and iframe level
  // See below code
}

// ÖNCELİKLE: langCodeForTeachingFilePaths KULLANICI İLK DİL SEÇİMİNİ YAPANA KADAR undefined OLDUĞUNA GÖRE
// langCodeForTeachingFilePaths İLE İLGİLİ parent window SEVİYESİNİ BURADAN YÖNERTMEK OLANAKSIZ
// ZATEN window»load olmadan HENÜZ İLAN EDİLMEMİŞ deyip köstekleyici hatã veriyor
// parent window SEVİYESİNDE langCodeForTeachingFilePaths TXT DOSYASI fetch ETMEK İÇİN KULLANILIYOR MU? EVET: js_for_info_boxes_in_parent » createAndHandleTheAppIsPausedBox
/* DOLAYISIYLA BURADA ŞUNU YAPAMADIĞIMIZ İÇİN js_for_info_boxes_in_parent İÇİNDE GEREKEN AYARI YAPIYORUZ
if (langCodeForTeachingFilePaths.substring(0,2)=="tr") {
  myHeaders.append('Content-Type','text/plain; charset=iso-8859-9');
}
*/

// setLangCodeForFilePathsAndCacheTheFirstTeachingAssets FONKSIYONUNU js_for_the_parent_all_browsers_all_devices İÇİNDE ARA BUL
// Could also use thisIsTheParentWhichContainsAllIFramedLessons which exists in parent index.html
/* RELOCATED THE FRAME LEVEL HANDLING OF langCodeForTeachingFilePaths TO: js_for_all_iframed_lesson_htmls
if (self != top) { // probably iframe window level
  if (parent.langCodeForTeachingFilePaths) { // definitely iframe window level
    if (parent.langCodeForTeachingFilePaths.substring(0,2)=="tr") {
      myHeaders.set('Content-Type','text/plain; charset=iso-8859-9'); // With set() we make sure that we overwrite instead of creating a duplicate
    }
  }
}
*/
// set ile append farkı için: https://developer.mozilla.org/en-US/docs/Web/API/Headers/append


/*___________________________________*/
// Get all the cool fonts for BOTH PARENT HTML AND IFRAME HTML
// Use individual if()s instead of else-if()s. This way multiple fonts can be made available if it becomes necessary to do so.
// if window.navigator.path ...substring == "lessons_in_iframes"
// else
if (needLatinFonts) {
  /*GET FONTS*/
  let titilliumFont;
  titilliumFont = new FontFace('Titillium Web Light', "url(/user_interface/fonts/TitilliumWeb-Light.ttf)");
  titilliumFont.load().then(function(loaded_face) {
      document.fonts.add(loaded_face);
  }).catch(function(error) {    console.error("Unable to get the font: " + error);  });
  //--
  let oxaniumFont;
  oxaniumFont = new FontFace('Oxanium SemiBold', "url(/user_interface/fonts/Oxanium-SemiBold.ttf)");
  oxaniumFont.load().then(function(loaded_face) {
      document.fonts.add(loaded_face);
  }).catch(function(error) {    console.error("Unable to get the font: " + error);  });
  //--
  let baiJamjureeFont;
  baiJamjureeFont = new FontFace('baiJamjuree', "url(/user_interface/fonts/BaiJamjuree-ExtraLight.ttf)");
  baiJamjureeFont.load().then(function(loaded_face) {
      document.fonts.add(loaded_face);
  }).catch(function(error) {    console.error("Unable to get the font: " + error);  });
  //--
  let patuaFont;
  patuaFont = new FontFace('patua', "url(/user_interface/fonts/PatuaOne-Regular-withTR.woff)");
  patuaFont.load().then(function(loaded_face) {
      document.fonts.add(loaded_face);
  }).catch(function(error) {    console.error("Unable to get the font: " + error);  });
  //--
  let manheartFont;
  manheartFont = new FontFace('manheart', "url(/user_interface/fonts/ManheartEarthman.otf)");
  manheartFont.load().then(function(loaded_face) {
      document.fonts.add(loaded_face);
  }).catch(function(error) {    console.error("Unable to get the font: " + error);  });
  /*SET FONTS*/
  /* Done seperately both in parent and iframe */
  document.body.style.fontFamily = '"Titillium Web Light", sans-serif'; // Default font for everything like FOOTER tag etc

  let allHeaders = document.getElementsByTagName("HEADER");
  let k;
  for (k = 0; k < allHeaders.length; k++) {  allHeaders[k].style.fontFamily = 'baiJamjuree, sans-serif'; allHeaders[k].style.fontWeight = '200'; }
  /* - */
  let allFooters = document.getElementsByTagName("FOOTER");
  let m;
  for (m = 0; m < allFooters.length; m++) {  allFooters[m].style.fontFamily = '"Titillium Web Light", sans-serif'; }
  /* - */
  let allButtons = document.getElementsByTagName("BUTTON"); // HERE WE CAN: do styling for all buttons when user interface is latin
  let i;
  for (i = 0; i < allButtons.length; i++) { allButtons[i].style.fontFamily = 'patua, sans-serif'; } // On Chrome, buttons don't inherit the font from document.body.style.fontFamily
  /* Use all ASIDE elements as another type of button where necessary */
  let allAsides = document.getElementsByTagName("ASIDE"); /* Not used in the parent but can if need be */ /* See css_for_the_glassy_give_up_button.css */
  let j;
  for (j = 0; j < allAsides.length; j++) {  allAsides[j].style.fontFamily = '"Oxanium SemiBold", sans-serif';  }
  /* Use all SECTION elements as another type of button where necessary */
  let allSections = document.getElementsByTagName("SECTION"); /* Not used in the parent but can if need be */ /* See css_for_proceed_buttons.css */
  let s;
  for (s = 0; s < allSections.length; s++) {  allSections[s].style.fontFamily = '"Oxanium SemiBold", sans-serif';  }
  /* Use all ADDRESS elements as another type of button where necessary */
  let allAddresses = document.getElementsByTagName("ADDRESS"); /* Not used in the parent but can if need be */ /* See css_for_proceed_buttons.css */
  let a;
  for (a = 0; a < allAddresses.length; a++) {  allAddresses[a].style.fontFamily = '"Oxanium SemiBold", sans-serif';  }
  /* Didn't work - will try setting each element via js that creates it
  //Set line-height for latin fonts
  let allPs = document.getElementsByTagName("P");
  let p;
  for (p = 0; p < allPs.length; p++) { allPs[p].parentNode.classList.add("latinLineHeightAndLetterSpacing"); } // See css_for_every_single_html
  */
}

if (needHitoicJapaneseFonts) {
    /*GET FONTS - REMEMBER: Kanji font files are not small like latin fonts. They are about 1.5MB each*/
    let kosugiFont;
    kosugiFont = new FontFace('Kosugi Maru', "url(/user_interface/fonts/KosugiMaru-Regular.ttf)"); // NOTE: File size is about 2.5 MB
    kosugiFont.load().then(function(loaded_face) {
        document.fonts.add(loaded_face);
    }).catch(function(error) {      console.error("Unable to get the font: " + error);    });
    /*SET FONTS*/
    document.body.style.fontFamily = '"Kosugi Maru", sans-serif';

    // buttons DON'T INHERIT font-family FROM body - We still have to set them manually even though in this case (JA) the buttons use the same font with the body
    let allButtons = document.getElementsByTagName("BUTTON"); // HERE WE CAN: do styling for all buttons when user interface is JA
    let b;
    for (b = 0; b < allButtons.length; b++) { allButtons[b].style.fontFamily = '"Kosugi Maru", sans-serif'; }

    /* Didn't work - will try setting each element via js that creates it
    // Kosugi font looks better with more line-height and more letter-spacing
    let allPs = document.getElementsByTagName("P");
    let p;
    for (p = 0; p < allPs.length; p++) { allPs[p].parentNode.classList.add("cjkLineHeightAndLetterSpacing"); } // See css_for_every_single_html
    */
    /* Use all ASIDE elements as a second type of button*/ // Auto inherits from body
    //let allAsides = document.getElementsByTagName("ASIDE");
    //let j;
    //for (j = 0; j < allAsides.length; j++) {  allAsides[j].style.fontFamily = '"Kosugi Maru", sans-serif';  }

}


/*_____DUMMY IMG____*/
var onePixelTransparentGif = "data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="; // Use wherever needed. Like in resetting webp animation playback.
function resetWebp(theWebpInsideImgElement) {
  // To use await and make the code execution pause if necessary »»» return new Promise(resolve => { });
  // and call resolve() when ready
    const originalSrc = theWebpInsideImgElement.src;
    theWebpInsideImgElement.src = onePixelTransparentGif;
    function revert() { theWebpInsideImgElement.src = originalSrc; }
    requestAnimationFrame(revert); // use raf instead of setTimeout // setTimeout(function () {   }, 50);
}

/*__CUSTOM CURSOR__*/
const theMainElement = document.getElementsByTagName("MAIN")[0];
if (theMainElement) {
  theMainElement.classList.add("defaultCursor"); // See css_for_every_single_html
}

/*__Check support for dvw dvh__*/
var dynamicViewportUnitsAreSupported = null;
if ('CSS' in window && 'supports' in window.CSS) {
  // Check if the browser supports the specific CSS feature
  if (window.CSS.supports('width', '1dvw') && window.CSS.supports('height', '1dvh')) {
    //console.warn('Dynamic viewport units are supported.'); // TESTED: It works
    dynamicViewportUnitsAreSupported = true;
  } else {
    //console.warn('Dynamic viewport units are not fully supported.'); // TESTED: It works
    dynamicViewportUnitsAreSupported = false;
  }
} else {
  // Ancient browsers
  // console.warn('Browser does not support CSS.supports.'); // Couldn't test because it's hard to find such an old browser in 2023 but will probably work
  dynamicViewportUnitsAreSupported = false;
}
