// IMPORTANT! Everything below will run in PARALLEL both on PARENT and iFRAME.
/*_____DUMMY IMG____*/
var onePixelTransparentGif = "data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="; // Use wherever needed. Like in resetting webp animation playback.

/*_____PHONE TABLET OR DESKTOP???__________https://github.com/PoeHaH/devicedetector__________________*/
var deviceDetector=function(){var b=navigator.userAgent.toLowerCase(),a=function(a){void 0!==a&&(b=a.toLowerCase());return/(ipad|tablet|(android(?!.*mobile))|(windows(?!.*phone)(.*touch))|kindle|playbook|silk|(puffin(?!.*(IP|AP|WP))))/.test(b)?"tablet":/(mobi|ipod|phone|blackberry|opera mini|fennec|minimo|symbian|psp|nintendo ds|archos|skyfire|puffin|blazer|bolt|gobrowser|iris|maemo|semc|teashark|uzard)/.test(b)?"phone":"desktop"};return{device:a(),detect:a,isMobile:"desktop"!=a()?!0:!1,userAgent:b}}();

/*_____CAN VIBRATE???: https://stackoverflow.com/questions/56926591/navigator-vibrate-break-the-code-on-ios-browsers/66134699*/
const canVibrate = window.navigator.vibrate;

/*_____CAN PLAY SOUND??? ___using howler.js*/
// Detect first click/first user gesture that unlocks sounds
// REMEMBER: Sliding menu buttons also need this. Handle separately. See js_for_the_sliding_navigation_menu.js
var firstUserGestureHasUnleashedAudio = false;
window.addEventListener("mouseup",function () {  firstUserGestureHasUnleashedAudio = true;  }, {once:true}); // Prevent sound flooding-exploding.

/*________________LOAD/SAVE___________________*/
var savedProgress; // This will make two vars exist [1- container parent level] [2- iframed lesson level]
var saveJSON, loadJSON; // Same as savedProgress
// Load all previous progress data
if (localStorage.memoryCard) {  // https://www.w3schools.com/jsref/tryit.asp?filename=tryjson_store
  loadJSON = localStorage.getItem("memoryCard");
  savedProgress = JSON.parse(loadJSON);
} else {
  savedProgress = {}; // It is the user's first time using the app. So we create an empty object to be able to fill it.
  // Now we must create savedProgress.tr = {}; savedProgress.ja = {}; savedProgress.en = {}; ... in js_for_all_container_parent_htmls letTheIframeTeach..
}
// Must give the user the option to change the user interface language and allow him/her to choose any available language other than the browser's language if necessary.
// Until that time, UI language will automatically take the browser's language.

var browserLanguage = navigator.language.substring(0,2).toLowerCase(); // Is used for 1- Setting UI language 2- Set currency(Euro) according to user's (estimated) country.

// These variables will exist both in parent html and in frame html separately at the same time.
var userInterfaceLanguage;
var userReadsLeftToRightOrRightToLeft; /*Use this to flip the arrow signs etc with transform rotate 180deg or scaleX -1 if UI is in Arabic or another rtl language*/
var needLatinFonts = false;
var needHitoicJapaneseFonts = false;

// BEST PRACTICE: Check if browser language and IP-geolocation match. Ask the user which language he/she wants for the GUI if the location and language is different.
switch (browserLanguage) {
  case "ja":
    userInterfaceLanguage = "ja";
    userReadsLeftToRightOrRightToLeft = "ltr";
    needHitoicJapaneseFonts = true;
    break;
  case "tr": /*case "uz": case "ug": case "tk": case "ky": case "kk": case "az":*/
    userInterfaceLanguage = "tr";
    userReadsLeftToRightOrRightToLeft = "ltr";
    needLatinFonts = true;
    break;
  default:
    userInterfaceLanguage = "en";
    userReadsLeftToRightOrRightToLeft = "ltr";
    needLatinFonts = true;
}

/*_____HEADERS to make fetch work with txt files with non-english characters properly________*/
var myHeaders = new Headers(); // Apache server default ayarları yüzünden böyle buna gerek var.
//window.addEventListener('DOMContentLoaded', function(){
//theLanguageUserIsLearningNowToSetFilePaths=="tr" || parent.theLanguageUserIsLearningNowToSetFilePaths=="tr" ??? How to add???
  if (userInterfaceLanguage=="tr") {
    // Çağrılan txt dosyasındaki ÇĞİÖŞÜçğıöşü'nın ��������� yerine doğru görünmesi için charset=iso-8859-9 gerek; charset=utf-8 ile olmuyor.
    // Dikkat! Bunun doğru çalışması için çağrılan txt dosyasının UTF-8 ile kaydedilmiş olması gerek.
    myHeaders.append('Content-Type','text/plain; charset=iso-8859-9');
  }
//}, { once: true });

/*___________________________________*/
// Get all the cool fonts for BOTH PARENT HTML AND IFRAME HTML
// Use individual if()s instead of else-if()s. This way multiple fonts can be made available if it becomes necessary to do so.
// if window.navigator.path ...substring == "lessons_in_iframes"
// else
if (needLatinFonts) {
  /*GET FONTS*/
  let titilliumFont;
  titilliumFont = new FontFace('Titillium Web Light', 'url(/user_interface/fonts/TitilliumWeb-Light.ttf)');
  titilliumFont.load().then(function(loaded_face) {
      document.fonts.add(loaded_face);
  }).catch(function(error) {    console.log("Unable to get the font!");  });

  let oxaniumFont;
  oxaniumFont = new FontFace('Oxanium SemiBold', 'url(/user_interface/fonts/Oxanium-SemiBold.ttf)');
  oxaniumFont.load().then(function(loaded_face) {
      document.fonts.add(loaded_face);
  }).catch(function(error) {    console.log("Unable to get the font!");  });
  /*SET FONTS*/
  document.body.style.fontFamily = '"Titillium Web Light", sans-serif';

  let allButtons = document.getElementsByTagName("BUTTON");
  let i;
  for (i = 0; i < allButtons.length; i++) {  allButtons[i].style.fontFamily = '"Oxanium SemiBold", sans-serif';  }
  /* Use all ASIDE elements as a second type of button*/
  let allAsides = document.getElementsByTagName("ASIDE"); /*See css_for_all_iframed_lesson_htmls.css*/
  let j;
  for (j = 0; j < allAsides.length; j++) {  allAsides[j].style.fontFamily = '"Oxanium SemiBold", sans-serif';  }
}

if (needHitoicJapaneseFonts) {
    /*GET FONTS*/
    let kosugiFont;
    kosugiFont = new FontFace('Kosugi Maru', 'url(/user_interface/fonts/KosugiMaru-Regular.ttf)'); // NOTE: File size is about 2.5 MB
    kosugiFont.load().then(function(loaded_face) {
        document.fonts.add(loaded_face);
    }).catch(function(error) {      console.log("Unable to get the font!");    });
    /*SET FONTS*/
    document.body.style.fontFamily = '"Kosugi Maru", sans-serif';
    // In this case (JA) the buttons use the same font with the body
    let allButtons = document.getElementsByTagName("BUTTON"); // IS THIS NECESSARY? Or will it auto inherit from body on every browser?
    let i;
    for (i = 0; i < allButtons.length; i++) {
    allButtons[i].style.fontFamily = '"Kosugi Maru", sans-serif'; }
    /* Use all ASIDE elements as a second type of button*/ // Auto inherits from body
    //let allAsides = document.getElementsByTagName("ASIDE");
    //let j;
    //for (j = 0; j < allAsides.length; j++) {  allAsides[j].style.fontFamily = '"Kosugi Maru", sans-serif';  }
}
