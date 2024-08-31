"use strict";
// Code written by Manheart Earthman=B. A. Bilgekılınç Topraksoy=土本 智一勇夫剛志
// This file MAY NOT BE MODIFIED WITHOUT CONSENT i.e. OFFICIAL AUTHORIZATION

const leftText1 = document.getElementById('leftText1pID'); const rightText1 = document.getElementById('rightText1pID');

if (needHitoicJapaneseFonts) {
  leftText1.classList.add("toUseWBR_withCJK","cjkLineHeightAndLetterSpacing"); // See css_for_every_single_html
  rightText1.classList.add("toUseWBR_withCJK","cjkLineHeightAndLetterSpacing"); // See css_for_every_single_html
}

// According to ChatGPT: If a fetch() is fired before window load happens it will not prevent the window load from firing even if it takes way too long to get the file
let leftTextWithoutInteraction = "…";
const filePathForLeftTextWithoutInteraction = "/user_interface/text/"+userInterfaceLanguage+"/0-you_are_learning_"+parent.langCodeForTeachingFilePaths.substr(0,2)+".txt";
fetch(filePathForLeftTextWithoutInteraction,myHeaders).then(function(response){return response.text();}).then(function(contentOfTheTxtFile){
  leftTextWithoutInteraction = contentOfTheTxtFile;
  leftText1.innerHTML = leftTextWithoutInteraction;
});// See js_for_every_single_html.js for the headers thingy.

let rightTextWithoutInteraction = "…";
const filePathForRightTextWithoutInteraction = "/user_interface/text/"+parent.langCodeForTeachingFilePaths.substr(0,2)+"/0-you_are_learning_"+parent.langCodeForTeachingFilePaths.substr(0,2)+".txt";
fetch(filePathForRightTextWithoutInteraction,myHeaders).then(function(response){return response.text();}).then(function(contentOfTheTxtFile){
  rightTextWithoutInteraction = contentOfTheTxtFile;
  rightText1.innerHTML = rightTextWithoutInteraction;
});

let leftTextUponInteraction = "︙";
const filePathForLeftTextUponInteraction = "/user_interface/text/"+userInterfaceLanguage+"/0-learn_another_language.txt";
fetch(filePathForLeftTextUponInteraction,myHeaders).then(function(response){return response.text();}).then(function(contentOfTheTxtFile){ leftTextUponInteraction = contentOfTheTxtFile; });

let rightTextUponInteraction = "︙";
const filePathForRightTextUponInteraction = "/user_interface/text/"+parent.langCodeForTeachingFilePaths.substr(0,2)+"/0-learn_another_language.txt";
fetch(filePathForRightTextUponInteraction,myHeaders).then(function(response){return response.text();}).then(function(contentOfTheTxtFile){ rightTextUponInteraction = contentOfTheTxtFile; });

let sleepAdviceA = "😴"; // Sleepy face icon
let sleepAdviceB = "🛏 ☾️"; // Bed icon and crescent html
const filePathForsleepAdviceA = "/user_interface/text/"+userInterfaceLanguage+"/0-author_gives_sleep_advice.txt";
const filePathForsleepAdviceB = "/user_interface/text/"+parent.langCodeForTeachingFilePaths.substr(0,2)+"/0-author_gives_sleep_advice.txt";
fetch(filePathForsleepAdviceA,myHeaders).then(function(response){return response.text();}).then(function(contentOfTheTxtFile){ sleepAdviceA = contentOfTheTxtFile; });
fetch(filePathForsleepAdviceB,myHeaders).then(function(response){return response.text();}).then(function(contentOfTheTxtFile){ sleepAdviceB = contentOfTheTxtFile; });

if (deviceDetector.isMobile) {
  /*MOBILES*/
  leftText1.parentNode.addEventListener("touchend",eitherTouch1F,{once:true});
  rightText1.parentNode.addEventListener("touchend",eitherTouch1F,{once:true});
  function eitherTouch1F() {
    leftText1.parentNode.classList.add("bilingualLongButtonMouseEnter");   leftText1.innerHTML = leftTextUponInteraction;
    rightText1.parentNode.classList.add("bilingualLongButtonMouseEnter");  rightText1.innerHTML = rightTextUponInteraction;
    // Get ready for second touch
    leftText1.parentNode.addEventListener("touchend",eitherTouch2F); // Don't use [once:true] because confirm box may be cancelled
    rightText1.parentNode.addEventListener("touchend",eitherTouch2F); // Don't use [once:true] because confirm box may be cancelled
  }
  function eitherTouch2F() {
    setTimeout(function () { goBackToWelcomeScreenLanguageSelection();  }, 75); // Confirm box must not block touchend in preventTouchConflictWithTheSlidingNavMenu
  }

} else {
  /*DESKTOPS*/
  document.getElementById('containerID').addEventListener("mouseenter",eitherHoverF); // Parent of parent
  function eitherHoverF() {
    leftText1.parentNode.classList.add("bilingualLongButtonMouseEnter");   leftText1.innerHTML = leftTextUponInteraction;
    rightText1.parentNode.classList.add("bilingualLongButtonMouseEnter");  rightText1.innerHTML = rightTextUponInteraction;
  }
  document.getElementById('containerID').addEventListener("mouseleave",eitherUnhoverF);
  function eitherUnhoverF() {
    leftText1.parentNode.classList.remove("bilingualLongButtonMouseEnter");   leftText1.innerHTML = leftTextWithoutInteraction;
    rightText1.parentNode.classList.remove("bilingualLongButtonMouseEnter");  rightText1.innerHTML = rightTextWithoutInteraction;
  }
  leftText1.parentNode.addEventListener("mousedown",eitherClickF,{once:true});
  rightText1.parentNode.addEventListener("mousedown",eitherClickF,{once:true});
  function eitherClickF() {
    goBackToWelcomeScreenLanguageSelection();
  }
}

// 700ms "everyThingFadesToBlack" css class must exist at parent level » NOT in this document's css
// So it exists in css_for_preloader_and_orbiting_circles
// ALSO SEE handleFadingAndNavigation in progress.js and js_for_the_parent_all_browsers_all_devices
function goBackToWelcomeScreenLanguageSelection() {
  /* Remove THE HOME ceramic nav button */
  if (parent.containerDivOfTheNavigationMenu.contains(parent.clickToGoToMainMenuDiv)) { // Guarantee that the app won't break
    parent.containerDivOfTheNavigationMenu.removeChild(parent.clickToGoToMainMenuDiv); // TESTED: It works. ,,, also see we_are_working_for_new_levels
  }
  // ---
  function proceedWithOrWithoutConfirmBox() {
    parent.ayFreym.classList.add("everyThingFadesToBlack"); // 700ms this css class must exist at parent level » NOT in this document's css
    setTimeout(function() {
      parent.ayFreym.classList.remove("everyThingFadesToBlack"); // Just this once do it without a fade in; a jump in with remove() will be enough or is even better?
      ////TURNS OUT WE DON'T NEED: parent.itIsCertainlyNotTheNativeGoBackButtonThatIsNavigating = true; // See blank.html & js_for_the_sliding_navigation_menu

      parent.ayFreym.src = "/user_interface/blank.html";
      parent.document.getElementsByTagName('MAIN')[0].style.left = "0px"; // Was hidden with 8000px

      // DON'T NEED this because it is handled by blank.html » parent.makeTheNavMenuComeUpOnMobiles(); // Note that, the function checks if the menu was up already,,, so it's safe to call
      // Sliding nav menu will be fixed (i.e. it won't move) on welcome screen as there are no touch listeners on parent.window i.e. swipes only work on the iframe window
    },1111);
  }
  // ---
  if (!isApple) { // Android and Windows
    if (confirm(sleepAdviceA+"\n\n"+sleepAdviceB)) { // INSTEAD OF: alert(sleepAdviceA+"\n\n"+sleepAdviceB);
      proceedWithOrWithoutConfirmBox();
    } else {
      // confirm box was canceled » User changed his/her mind and wants to stay
    }
  } else {
    // Avoid all alert and confirm boxes on Apple because it mutes and unmutes and keeps toggling the sound ON&OFF
    proceedWithOrWithoutConfirmBox(); // Feels nice enough when fires without any delay, so no setTimeouts here
  }
} // END OF goBackToWelcomeScreenLanguageSelection
