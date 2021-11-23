// NOTE: Do not use “const” for things that need to be accessible from elsewhere. Only use “var” for such variables.
// The buttons have 4 (webp img) states : A, B, C and D. If we use one variable and only change the src it works but it is very glitchy.
// Therefore we have to use four variables for each webp and change the css rule “display block none” instead of changing the src.
// ---
// For sake of GUI simplicity the Speed Adjustment Slider is available on desktops only.
// The Global Volume Slider is also "desktops-only". Mobile volume is to be adjusted natively via device volume buttons.

var containerDivOfTheNavigationMenu = document.createElement("NAV");

var clickToGoToPreviousDiv = document.createElement("DIV");
var clickToGoToMainMenuDiv = document.createElement("DIV");
var clickToPauseTheAppDiv = document.createElement("DIV");
var clickToFinanceDiv = document.createElement("DIV");

const clickToGoToPreviousImgA = document.createElement("IMG");
const clickToGoToPreviousImgB = document.createElement("IMG");
const clickToGoToPreviousImgC = document.createElement("IMG");
const clickToGoToPreviousImgD = document.createElement("IMG");
const clickToGoToMainMenuImgA = document.createElement("IMG");
const clickToGoToMainMenuImgB = document.createElement("IMG");
const clickToGoToMainMenuImgC = document.createElement("IMG");
const clickToGoToMainMenuImgD = document.createElement("IMG");
const clickToPauseTheAppImgA = document.createElement("IMG");
const clickToPauseTheAppImgB = document.createElement("IMG");
const clickToPauseTheAppImgC = document.createElement("IMG");
const clickToPauseTheAppImgD = document.createElement("IMG");
const clickToFinanceImgA = document.createElement("IMG");
const clickToFinanceImgB = document.createElement("IMG");
const clickToFinanceImgC = document.createElement("IMG");
const clickToFinanceImgD = document.createElement("IMG");

const onePixelTransparentGifUsedLocallyHereInNavMenu = "data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==";

clickToGoToPreviousImgA.src = "/user_interface/images/sliding_navigation_menu/go_to_previous_for_ltr_ui_a.webp";
clickToGoToPreviousImgB.src = "/user_interface/images/sliding_navigation_menu/go_to_previous_for_ltr_ui_b.webp";
clickToGoToPreviousImgC.src = "/user_interface/images/sliding_navigation_menu/go_to_previous_for_ltr_ui_c.webp";
clickToGoToPreviousImgD.src = "/user_interface/images/sliding_navigation_menu/go_to_previous_for_ltr_ui_d.webp";
clickToGoToMainMenuImgA.src = "/user_interface/images/sliding_navigation_menu/go_to_main_menu_house_a.webp";
clickToGoToMainMenuImgB.src = "/user_interface/images/sliding_navigation_menu/go_to_main_menu_house_b.webp";
clickToGoToMainMenuImgC.src = "/user_interface/images/sliding_navigation_menu/go_to_main_menu_house_c.webp";
clickToGoToMainMenuImgD.src = "/user_interface/images/sliding_navigation_menu/go_to_main_menu_house_d.webp";
clickToPauseTheAppImgA.src = "/user_interface/images/sliding_navigation_menu/pause_lesson_a.webp";
clickToPauseTheAppImgB.src = "/user_interface/images/sliding_navigation_menu/pause_lesson_b.webp";
clickToPauseTheAppImgC.src = "/user_interface/images/sliding_navigation_menu/pause_lesson_c.webp";
clickToPauseTheAppImgD.src = "/user_interface/images/sliding_navigation_menu/pause_lesson_d.webp";
clickToFinanceImgA.src = "/user_interface/images/sliding_navigation_menu/scale_a.webp";
clickToFinanceImgB.src = "/user_interface/images/sliding_navigation_menu/scale_b.webp";
clickToFinanceImgC.src = "/user_interface/images/sliding_navigation_menu/scale_c.webp";
clickToFinanceImgD.src = "/user_interface/images/sliding_navigation_menu/scale_d.webp";

clickToGoToPreviousImgB.style.display = "none";
clickToGoToPreviousImgC.style.display = "none";
clickToGoToPreviousImgD.style.display = "none";
clickToGoToMainMenuImgB.style.display = "none";
clickToGoToMainMenuImgC.style.display = "none";
clickToGoToMainMenuImgD.style.display = "none";
clickToPauseTheAppImgB.style.display = "none";
clickToPauseTheAppImgC.style.display = "none";
clickToPauseTheAppImgD.style.display = "none";
clickToFinanceImgB.style.display = "none";
clickToFinanceImgC.style.display = "none";
clickToFinanceImgD.style.display = "none";

clickToGoToPreviousDiv.appendChild(clickToGoToPreviousImgA); // display = "block";
clickToGoToPreviousDiv.appendChild(clickToGoToPreviousImgB); // display = "none";
clickToGoToPreviousDiv.appendChild(clickToGoToPreviousImgC); // display = "none";
clickToGoToPreviousDiv.appendChild(clickToGoToPreviousImgD); // display = "none";
clickToGoToMainMenuDiv.appendChild(clickToGoToMainMenuImgA); // display = "block";
clickToGoToMainMenuDiv.appendChild(clickToGoToMainMenuImgB); // display = "none";
clickToGoToMainMenuDiv.appendChild(clickToGoToMainMenuImgC); // display = "none";
clickToGoToMainMenuDiv.appendChild(clickToGoToMainMenuImgD); // display = "none";
clickToPauseTheAppDiv.appendChild(clickToPauseTheAppImgA); // display = "block";
clickToPauseTheAppDiv.appendChild(clickToPauseTheAppImgB); // display = "none";
clickToPauseTheAppDiv.appendChild(clickToPauseTheAppImgC); // display = "none";
clickToPauseTheAppDiv.appendChild(clickToPauseTheAppImgD); // display = "none";
clickToFinanceDiv.appendChild(clickToFinanceImgA); // display = "block";
clickToFinanceDiv.appendChild(clickToFinanceImgB); // display = "none";
clickToFinanceDiv.appendChild(clickToFinanceImgC); // display = "none";
clickToFinanceDiv.appendChild(clickToFinanceImgD); // display = "none";
/* “clickToGoToMainMenu” and “clickToGoToPrevious” will be added conditionally from within the iframe; see bread.js in 1-1-1 and water.js in 1-1-2 */
/* Touching/Clicking the "Return to last checkpoint" box's “OK” button must also add “clickToGoToMainMenu” and “clickToGoToPrevious” button images */
/* See js_for_all_container_parent_htmls.js and find whenLoadLastLessonOkButtonIsClickedOrTapped() function */

containerDivOfTheNavigationMenu.appendChild(clickToFinanceDiv);

// DEPRECATED: See js_for_all_iframed_lesson_htmls for the new thing containerDivOfTheNavigationMenu.insertBefore(clickToPauseTheAppDiv,clickToFinanceDiv);
// See progress.js to find its removal AND See js_for_all_iframed_lesson_htmls to find its addition

// speedAdjustmentDiv and volumeAdjustmentDiv are for DESKTOPS ONLY. See the code below in window load event's desktop block.

// Call these from bread.js and water.js etc to add or remove the navigation buttons
// In the future, use a condition like if(userInterfaceDirection=="ltr") {} for a user interface that reads from right to left like Arabic.
// Don't forget to do the same in whenLoadLastLessonOkButtonIsClickedOrTapped() inside js_for_all_container_parent_htmls.js
/* DEPRECATED: See js_for_all_iframed_lesson_htmls.js for the new thing
function addHomeButtonToTheNavigationMenu() {
  if (deviceDetector.isMobile) {
    containerDivOfTheNavigationMenu.insertBefore(clickToGoToMainMenuDiv,containerDivOfTheNavigationMenu.childNodes[0]); // Make it leftmost
  } else {
    containerDivOfTheNavigationMenu.insertBefore(clickToGoToMainMenuDiv,containerDivOfTheNavigationMenu.childNodes[1]); // Place it on the right of speedAdjustmentDiv
  }
  //console.log("HOME button is added to the menu");
}
*/
// In the future, use a condition like if(userInterfaceDirection=="ltr") {} for a user interface that reads from right to left like Arabic.
// Don't forget to check whenLoadLastLessonOkButtonIsClickedOrTapped() inside js_for_all_container_parent_htmls.js // EDIT: That doesn't exist anymore
/*
function addGoBackToPreviousButtonToTheNavigationMenu() {
  if (deviceDetector.isMobile){
    containerDivOfTheNavigationMenu.insertBefore(clickToGoToPreviousDiv,containerDivOfTheNavigationMenu.childNodes[0]); // Make it leftmost
  } else {
    containerDivOfTheNavigationMenu.insertBefore(clickToGoToPreviousDiv,containerDivOfTheNavigationMenu.childNodes[1]); // Place it on the right of speedAdjustmentDiv
  }
  //console.log("GO BACK button is added to the menu");
}
function removeGoBackToPreviousButtonFromTheNavigationMenu() {
  containerDivOfTheNavigationMenu.removeChild(clickToGoToPreviousDiv); // Whatever its location was
  //console.log("GO BACK button is removed from the menu");
}
*/

var speedAdjustmentDiv = document.createElement("DIV"); // ONLY FOR DESKTOPS
speedAdjustmentDiv.classList.add("sliderContainerDivsWillLook");
speedAdjustmentDiv.style.left="0px";
var speedSlider = document.createElement("INPUT");
speedSlider.type = "range";
speedSlider.min = "1";
speedSlider.max = "3";
speedAdjustmentDiv.appendChild(speedSlider);
speedSlider.classList.add("bothSlidersAppearance");

var volumeAdjustmentDiv = document.createElement("DIV"); // ONLY FOR DESKTOPS
volumeAdjustmentDiv.classList.add("sliderContainerDivsWillLook");
volumeAdjustmentDiv.style.right="0px";
var volumeSlider = document.createElement("INPUT");
volumeSlider.type = "range";
volumeSlider.min = "1";
volumeSlider.max = "100";
/*volumeSlider.value = "75";*/ // Use localStorage.volumeWasAtThisLevel instead
volumeAdjustmentDiv.appendChild(volumeSlider);
volumeSlider.classList.add("bothSlidersAppearance");
volumeSlider.classList.add("volumeSliderAppearance");

var speedAdjustmentCoefficient = 1.0; // 0 is SLOW,,, 1 is NORMAL,,, 2 is FAST // REMEMBER: This is NOT the slider position.

// Variables for detecting the swipe-up
var swipeMenuIsDisabled = false; // Must disable it during any touch controlled gameplay. Example: give_me_water.js in 1-1-3
let touchStartY;
let touchEndY;
let navMenuIsUpAndVisible = true; // Nav menu is visible at first when the app starts.
let navMenuIsMoving = false;
// DEPRECATED: let navMenuOnMobileHasBeenHiddenForTheFirstTime = false; // So that the very first swipe-up can be ignored.
var invisibleContainerOfContainerDivOfTheNavigationMenu = document.createElement("DIV");

function makeTheNavMenuGoDownOnMobiles() {
  // Watch what's happening with swipeMenuIsDisabled
    // DEPRECATED: navMenuOnMobileHasBeenHiddenForTheFirstTime = true;
    if (navMenuIsUpAndVisible && !navMenuIsMoving) { // It really was up
      invisibleContainerOfContainerDivOfTheNavigationMenu.classList.remove("addThisForAnimationAppearFromBottom");
      invisibleContainerOfContainerDivOfTheNavigationMenu.classList.add("addThisForAnimationSinkAndDisappear"); // See css_for_sliding_navigation_menu.css
      swipeDownSound.play();
      navMenuIsUpAndVisible = false;
      navMenuIsMoving = true;
      setTimeout(function () {   navMenuIsMoving = false;   },750);
    }
  // ---
}

function makeTheNavMenuComeUpOnMobiles() {
  if (!swipeMenuIsDisabled) {
    if (!navMenuIsUpAndVisible && !navMenuIsMoving) { // It really was down
      invisibleContainerOfContainerDivOfTheNavigationMenu.classList.remove("addThisForAnimationSinkAndDisappear");
      invisibleContainerOfContainerDivOfTheNavigationMenu.classList.add("addThisForAnimationAppearFromBottom"); // See css_for_sliding_navigation_menu.css
      swipeUpSound.play();
      navMenuIsUpAndVisible = true;
      navMenuIsMoving = true;
      setTimeout(function () {   navMenuIsMoving = false;   },750);
    }
  }
}
/*---*/
let mouseIsOnMenuTriggerArea = false;
/*---*/
let continueAfterPauseByNavMenuPauseButton = "Paused?"; // Get the actual text from txt file and use it instead of this default.
const filePathForResumeAfterPausedByButton = "/user_interface/text/"+userInterfaceLanguage+"/0-lesson_is_paused_by_button.txt";
// See js_for_fetch_api_character_encoding.js for the headers thingy.
fetch(filePathForResumeAfterPausedByButton,myHeaders).then(function(response){return response.text();}).then(function(contentOfTheTxtFile){ continueAfterPauseByNavMenuPauseButton = contentOfTheTxtFile; });
/* NOTE: Looks like the function declarations could have been tidier */

// Sliding navigation menu button UI sounds
const navMenuHoverSound = new Howl({  src: ["/user_interface/sounds/ceramic_button_hover."+audioFileExtension]  }); // DESKTOP ONLY. Put it here to make it global.
const navMenuClickSound = new Howl({  src: ["/user_interface/sounds/ceramic_button_click."+audioFileExtension]  }); // See js_for_different_browsers_and_devices

let swipeUpSound, swipeDownSound;

window.addEventListener("load",function() {

  // What to do on MOBILE DEVICES
  // Use ayFreym from js_for_all_container_parent_htmls
  // What to do on MOBILES
  if (deviceDetector.isMobile){
    swipeUpSound = new Howl({  src: ["/user_interface/sounds/swipe_up."+audioFileExtension]  }); // See js_for_different_browsers_and_devices
    swipeDownSound = new Howl({  src: ["/user_interface/sounds/swipe_down."+audioFileExtension]  }); // See js_for_different_browsers_and_devices
    // If something blocks the clickablity of any other element use pointerEvents = "none";
    containerDivOfTheNavigationMenu.classList.add("theSmallNavigationMenuMOBILEStyling"); // See css_for_all_container_parent_htmls.css

    invisibleContainerOfContainerDivOfTheNavigationMenu.classList.add("invisibleTopContainerOfTheNavigationMenuOnMobiles"); // See css_for_all_container_parent_htmls.css
    document.body.appendChild(invisibleContainerOfContainerDivOfTheNavigationMenu);
    invisibleContainerOfContainerDivOfTheNavigationMenu.appendChild(containerDivOfTheNavigationMenu);
    // SOLVED: Samsung Browser and Chrome were firing fullscreenchange and resize differently. 100ms delay before the boolean operations did the trick.
    // The Navigation Menu must appear only when user exits fullscreen. It MUST NOT APPEAR when device orientation is changed.
    // DEPRECATED: window.addEventListener('resize', hideOrUnhideTheNavigationMenuOnMobilesDependingOnFullscreen);
    // SWIPE FROM BELOW TO BRING THE NAV MENU
    function getY1(event) {      touchStartY = event.changedTouches[0].screenY;    }
    function getY2(event) {      touchEndY = event.changedTouches[0].screenY;      handleSwipeGesture();    }
    window.addEventListener('touchstart', getY1);
    window.addEventListener('touchend', getY2);
    ayFreym.onload = function() {
      ayFreym.contentWindow.addEventListener("touchstart", getY1);
      ayFreym.contentWindow.addEventListener("touchend", getY2);
    };
  } // END OF WHAT TO DO ON mobiles
  /* ____ ----- What to do on DESKTOPS ----- ____*/
  else {
    // CAUTION: localStorage works with strings variables only! Conversion may be necessary in and out.
    /* __ HANDLE GLOBAL VOLUME WITH THE SLIDER __ */
    if(localStorage.volumeWasAtThisLevel){ // If it already exists then the user is not a first-timer.
      Howler.volume(Number(localStorage.volumeWasAtThisLevel)/100); // Howler volume is from 0 to 1, min-max.
      volumeSlider.value=Number(localStorage.volumeWasAtThisLevel);
    }
    else {
      localStorage.volumeWasAtThisLevel = 50; // DESKTOP: First time users start with 50% sound volume (-25.0LUFS). Number gets converted to string automatically.
      volumeSlider.value=Number(localStorage.volumeWasAtThisLevel);
      Howler.volume(Number(localStorage.volumeWasAtThisLevel)/100);
    }
    volumeSlider.oninput = function()
    {
      Howler.volume(this.value/100);
      localStorage.volumeWasAtThisLevel = this.value;
    }

    /* __ ADJUST PROGRESSION SPEED WITH THE SLIDER __ */
    if (localStorage.speedWasAtThisLevel) { // If it already exists then the user is not a first-timer.
      speedSlider.value=Number(localStorage.speedWasAtThisLevel);
      switch (localStorage.speedWasAtThisLevel) {
        case "1":
          // SLOWER
          speedAdjustmentCoefficient = 0.0; // USED TO BE: Inversely proportional; the greater the value the slower.
          speedSlider.classList.add("speedSliderAppearance1");
          speedSlider.classList.remove("speedSliderAppearance2");
          speedSlider.classList.remove("speedSliderAppearance3");
          break;
        case "3":
          // FASTER
          speedAdjustmentCoefficient = 2.0; // USED TO BE: Inversely proportional; the smaller the value the faster.
          speedSlider.classList.remove("speedSliderAppearance1");
          speedSlider.classList.remove("speedSliderAppearance2");
          speedSlider.classList.add("speedSliderAppearance3");
          break;
        default:
          // NORMAL
          speedAdjustmentCoefficient = 1.0;
          speedSlider.classList.remove("speedSliderAppearance1");
          speedSlider.classList.add("speedSliderAppearance2");
          speedSlider.classList.remove("speedSliderAppearance3");
      }
    } else {
      localStorage.speedWasAtThisLevel = 2; // First time users start with normal speed (slider position 2). Number gets converted to string automatically.
      speedSlider.value=Number(localStorage.speedWasAtThisLevel);
      speedSlider.classList.add("speedSliderAppearance2");
    }
    /* __Change speed when user click-drags the slider__ */
    speedSlider.oninput = function()
    {
      let chosen = this.value;
      localStorage.speedWasAtThisLevel = chosen;
      switch (chosen) {
        case "1":
          // SLOWER
          speedAdjustmentCoefficient = 0.0; // USED TO BE: Inversely proportional; the greater the value the slower
          speedSlider.classList.add("speedSliderAppearance1");
          speedSlider.classList.remove("speedSliderAppearance2");
          speedSlider.classList.remove("speedSliderAppearance3");
          break;
        case "3":
          // FASTER
          speedAdjustmentCoefficient = 2.0; // USED TO BE: Inversely proportional; the smaller the value the faster
          speedSlider.classList.remove("speedSliderAppearance1");
          speedSlider.classList.remove("speedSliderAppearance2");
          speedSlider.classList.add("speedSliderAppearance3");
          break;
        default:
          // NORMAL
          speedAdjustmentCoefficient = 1.0;
          speedSlider.classList.remove("speedSliderAppearance1");
          speedSlider.classList.add("speedSliderAppearance2");
          speedSlider.classList.remove("speedSliderAppearance3");
      }
    }

    /* __Add the elements and event listeners__ */
    containerDivOfTheNavigationMenu.insertBefore(speedAdjustmentDiv,containerDivOfTheNavigationMenu.childNodes[0]); // Make it leftmost
    containerDivOfTheNavigationMenu.appendChild(volumeAdjustmentDiv); // Make it rightmost
    containerDivOfTheNavigationMenu.classList.add("theNavigationMenuDESKTOPStyling"); // See css_for_all_container_parent_htmls.css
    setTimeout(function(){
      if (!mouseIsOnMenuTriggerArea) {    containerDivOfTheNavigationMenu.classList.add("hideWithSlowTransition");   }
    },2222);

    var invisibleHoverAreaDiv = document.createElement("DIV");
    invisibleHoverAreaDiv.classList.add("invisibleHoverAreaToAccessNavigationMenu"); // See css_for_all_container_parent_htmls.css
    document.body.appendChild(invisibleHoverAreaDiv);
    invisibleHoverAreaDiv.appendChild(containerDivOfTheNavigationMenu);
    invisibleHoverAreaDiv.addEventListener("mouseenter",makeTheMenuComeDown);
    invisibleHoverAreaDiv.addEventListener("mouseleave",makeTheMenuGoUp);

    clickToGoToPreviousDiv.addEventListener("mouseenter",goToPreviousEnterHoverFunction);
    clickToGoToPreviousDiv.addEventListener("mouseleave",goToPreviousExitHoverFunction);
    clickToGoToMainMenuDiv.addEventListener("mouseenter",goToMainMenuEnterHoverFunction);
    clickToGoToMainMenuDiv.addEventListener("mouseleave",goToMainMenuExitHoverFunction);
    clickToPauseTheAppDiv.addEventListener("mouseenter",clickToPauseTheAppEnterHoverFunction);
    clickToPauseTheAppDiv.addEventListener("mouseleave",clickToPauseTheAppExitHoverFunction);
    clickToFinanceDiv.addEventListener("mouseenter",clickToFinanceEnterHoverFunction);
    clickToFinanceDiv.addEventListener("mouseleave",clickToFinanceExitHoverFunction);

  } // End of IF-ELSE -> END OF WHAT TO DO ON desktops

  // ---------- Declaration of desktop-only functions ----------

  /*__HANDLE GO TO PREVIOUS LESSON - BACKWARDS BUTTON__*/
  let preventMistakeForPreviousButton;
  function resetCarAndArrowButtonImgB() {
    const resetByUsingSrcB = clickToGoToPreviousImgB.src;
    clickToGoToPreviousImgB.src = onePixelTransparentGifUsedLocallyHereInNavMenu;
    setTimeout(function () {  clickToGoToPreviousImgB.src = resetByUsingSrcB;  },3);
  }
  function resetCarAndArrowButtonImgD() {
    const resetByUsingSrcD = clickToGoToPreviousImgD.src;
    clickToGoToPreviousImgD.src = onePixelTransparentGifUsedLocallyHereInNavMenu;
    setTimeout(function () {  clickToGoToPreviousImgD.src = resetByUsingSrcD;  },3);
  }
  function goToPreviousEnterHoverFunction() {
    if(firstUserGestureHasUnleashedAudio){navMenuHoverSound.play();} // See js_for_every_single_html.js
    // Start the movement by switching from A to B ,,, actually it could have been at C or D too
    clickToGoToPreviousImgA.style.display = "none";
    clickToGoToPreviousImgB.style.display = "block"; // B contains 8 frames with 30ms each -> 240ms
    clickToGoToPreviousImgC.style.display = "none";
    clickToGoToPreviousImgD.style.display = "none"; resetCarAndArrowButtonImgD();
    // Go to C after the exact duration of the animation B
    preventMistakeForPreviousButton = setTimeout(function () {
      clickToGoToPreviousImgB.style.display = "none"; resetCarAndArrowButtonImgB();
      clickToGoToPreviousImgC.style.display = "block"; // C contains an endless looping animation
    },240); // Consider what will happen if the mouse leaves too quickly, like less than 240ms
  }
  function goToPreviousExitHoverFunction() {
    clearTimeout(preventMistakeForPreviousButton);
    clickToGoToPreviousImgA.style.display = "none";
    clickToGoToPreviousImgB.style.display = "none"; resetCarAndArrowButtonImgB();
    clickToGoToPreviousImgC.style.display = "none";
    clickToGoToPreviousImgD.style.display = "block"; // Slowly fades and stops exactly at the same frame with A
  }

  /*__HANDLE GO TO MAIN MENU - HOUSE HOME BUTTON__*/
  let preventMistakeForHomeButton;
  function resetHomeButtonImgB() {
    const resetByUsingSrcB = clickToGoToMainMenuImgB.src;
    clickToGoToMainMenuImgB.src = onePixelTransparentGifUsedLocallyHereInNavMenu;
    setTimeout(function () {  clickToGoToMainMenuImgB.src = resetByUsingSrcB;  },3);
  }
  function resetHomeButtonImgD() {
    const resetByUsingSrcD = clickToGoToMainMenuImgD.src;
    clickToGoToMainMenuImgD.src = onePixelTransparentGifUsedLocallyHereInNavMenu;
    setTimeout(function () {  clickToGoToMainMenuImgD.src = resetByUsingSrcD;  },3);
  }
  function goToMainMenuEnterHoverFunction() {
    if(firstUserGestureHasUnleashedAudio){navMenuHoverSound.play();} // See js_for_every_single_html.js
    // Start the movement by switching from A to B ,,, actually it could have been at C or D too
    clickToGoToMainMenuImgA.style.display = "none";
    clickToGoToMainMenuImgB.style.display = "block"; // B contains 8 frames with 30ms each -> 240ms
    clickToGoToMainMenuImgC.style.display = "none";
    clickToGoToMainMenuImgD.style.display = "none"; resetHomeButtonImgD();
    // Go to C after the exact duration of the animation B
    preventMistakeForHomeButton = setTimeout(function () {
      clickToGoToMainMenuImgB.style.display = "none"; resetHomeButtonImgB();
      clickToGoToMainMenuImgC.style.display = "block"; // C contains an endless looping animation
    },240); // Consider what will happen if the mouse leaves too quickly, like less than 240ms
  }
  function goToMainMenuExitHoverFunction() {
    clearTimeout(preventMistakeForHomeButton);
    clickToGoToMainMenuImgA.style.display = "none";
    clickToGoToMainMenuImgB.style.display = "none"; resetHomeButtonImgB();
    clickToGoToMainMenuImgC.style.display = "none";
    clickToGoToMainMenuImgD.style.display = "block"; // Slowly fades and stops exactly at the same frame with A
  }

  /*__HANDLE PROGRESS CHART BUTTON__*/
  let preventMistakeForProgressButton;
  function resetProgressChartButtonImgB() {
    const resetByUsingSrcB = clickToPauseTheAppImgB.src;
    clickToPauseTheAppImgB.src = onePixelTransparentGifUsedLocallyHereInNavMenu;
    setTimeout(function () {  clickToPauseTheAppImgB.src = resetByUsingSrcB;  },3);
  }
  function resetProgressChartButtonImgD() {
    const resetByUsingSrcD = clickToPauseTheAppImgD.src;
    clickToPauseTheAppImgD.src = onePixelTransparentGifUsedLocallyHereInNavMenu;
    setTimeout(function () {  clickToPauseTheAppImgD.src = resetByUsingSrcD;  },3);
  }
  function clickToPauseTheAppEnterHoverFunction() {
    if(firstUserGestureHasUnleashedAudio){navMenuHoverSound.play();} // See js_for_every_single_html.js
    // Start the movement by switching from A to B ,,, actually it could have been at C or D too
    clickToPauseTheAppImgA.style.display = "none";
    clickToPauseTheAppImgB.style.display = "block"; // B contains 8 frames with 30ms each -> 240ms
    clickToPauseTheAppImgC.style.display = "none";
    clickToPauseTheAppImgD.style.display = "none"; resetProgressChartButtonImgD();
    // Go to C after the exact duration of the animation B
    preventMistakeForProgressButton = setTimeout(function () {
      clickToPauseTheAppImgB.style.display = "none"; resetProgressChartButtonImgB();
      clickToPauseTheAppImgC.style.display = "block"; // C contains an endless looping animation
    },240); // Consider what will happen if the mouse leaves too quickly, like less than 240ms
  }
  function clickToPauseTheAppExitHoverFunction() {
    clearTimeout(preventMistakeForProgressButton);
    clickToPauseTheAppImgA.style.display = "none";
    clickToPauseTheAppImgB.style.display = "none"; resetProgressChartButtonImgB();
    clickToPauseTheAppImgC.style.display = "none";
    clickToPauseTheAppImgD.style.display = "block"; // Slowly fades and stops exactly at the same frame with A
  }

  /*__HANDLE INFORMATION BUTTON (with the scale icon)__*/
  let preventMistakeForNgoButton;
  function resetFinanceNgoButtonImgB() {
    const resetByUsingSrcB = clickToFinanceImgB.src;
    clickToFinanceImgB.src = onePixelTransparentGifUsedLocallyHereInNavMenu;
    setTimeout(function () {  clickToFinanceImgB.src = resetByUsingSrcB;  },3);
  }
  function resetFinanceNgoButtonImgD() {
    const resetByUsingSrcD = clickToFinanceImgD.src;
    clickToFinanceImgD.src = onePixelTransparentGifUsedLocallyHereInNavMenu;
    setTimeout(function () {  clickToFinanceImgD.src = resetByUsingSrcD;  },3);
  }
  function clickToFinanceEnterHoverFunction() {
    if(firstUserGestureHasUnleashedAudio){navMenuHoverSound.play();} // See js_for_every_single_html.js
    // Start the movement by switching from A to B ,,, actually it could have been at C or D too
    clickToFinanceImgA.style.display = "none";
    clickToFinanceImgB.style.display = "block"; // B contains 8 frames with 30ms each -> 240ms
    clickToFinanceImgC.style.display = "none";
    clickToFinanceImgD.style.display = "none"; resetFinanceNgoButtonImgD();
    // Go to C after the exact duration of the animation B
    preventMistakeForNgoButton = setTimeout(function () {
      clickToFinanceImgB.style.display = "none"; resetFinanceNgoButtonImgB();
      clickToFinanceImgC.style.display = "block"; // C contains an endless looping animation
    },240); // Consider what will happen if the mouse leaves too quickly, like less than 240ms
  }
  function clickToFinanceExitHoverFunction() {
    clearTimeout(preventMistakeForNgoButton);
    clickToFinanceImgA.style.display = "none";
    clickToFinanceImgB.style.display = "none"; resetFinanceNgoButtonImgB();
    clickToFinanceImgC.style.display = "none";
    clickToFinanceImgD.style.display = "block"; // Slowly fades and stops exactly at the same frame with A
  }

  /*__CREATE MOVEMENT__*/
  function makeTheMenuComeDown() { // Desktops
    mouseIsOnMenuTriggerArea = true;
    containerDivOfTheNavigationMenu.classList.remove("hideWithSlowTransition");
    containerDivOfTheNavigationMenu.classList.add("revealWithQuickTransition");
  }
  function makeTheMenuGoUp() { // Desktops
    mouseIsOnMenuTriggerArea = false;
    containerDivOfTheNavigationMenu.classList.remove("revealWithQuickTransition");
    containerDivOfTheNavigationMenu.classList.add("hideWithSlowTransition");
  }

  // ---------- Declaration of mobile functions ----------
  // DEPRECATED: GO FULLSCREEN TO HIDE THE NAV MENU - EXIT TO REVEAL
  // function hideOrUnhideTheNavigationMenuOnMobilesDependingOnFullscreen() {
  //   // Safari on iPhone doesn't allow fullscreen! (iOS 14.7 July 2021)
  //   // Therefore no resize means no hiding of the nav menu through here on iPhones.
  //   // So these will work only where changing to fullscreen triggers the 'resize' event.
  //   // REMEMBER: "resize" fires not only when going fullscreen but also when user rotates the device i.e. when orientation is changed.
  //   window.removeEventListener('resize', hideOrUnhideTheNavigationMenuOnMobilesDependingOnFullscreen);
  //   // Use hasGoneFullscreen variable from js_for_handling_fullscreen_mode.js
  //   // WARNING! “hasGoneFullscreen” has a boolean value that alternates every time “fullscreenchange” event fires.
  //   // CAUTION! This may happen before or after “resize” event fires depending on the browser!
  //   // DEPRECATED: Since resize doesn't happen on iPhones, the very first sinking of the nav menu is handled in js_for_all_container_parent_htmls -> handleTheFirstGoingFullscreenOnMobiles()
  //   setTimeout(function () { /*!!!*/ // Try and see if 100ms delay will solve the opposite firing conflict between Chrome and Samsung Browser? Result: YES!
  //     if (!hasGoneFullscreen) { // Since iPhones don't allow fullscreen orientation change fires differently on Android and iOS.
  //       d-e-a-c-t-i-v-a-t-i-o-n-S-o-u-n-d-2.play();
  //       setTimeout(function () {    makeTheNavMenuComeUpOnMobiles();    },500);
  //       setTimeout(function () {    window.addEventListener('resize', hideOrUnhideTheNavigationMenuOnMobilesDependingOnFullscreen);    },200); // animation duration is .4s inside css
  //     } // End of if
  //     else {
  //       a-c-t-i-v-a-t-i-o-n-S-o-u-n-d-2.play();
  //       // Hide the nav menu if open-fullscreen happened normally during a lesson without any preloading screen.
  //       // Preloading is triggered by any of the [choose language] buttons OR [continue from last position] button etc
  //       // In such cases makeTheNavMenuGoDownOnMobiles() must fire only after the preloading is done (iframe.load fires).
  //       if (!preloadCoverIsShowingNow) { // This is created in js_for_preload_handling and is changed in
  //         // No need to wait for smth to happen
  //         setTimeout(function () {    makeTheNavMenuGoDownOnMobiles();    },2500);
  //       } else {
  //         // Must wait until preloadCoverIsShowingNow is set to false. That change happens in js_for_all_container_parent_htmls
  //         let checkEvery250msOrSo = setInterval(isItDoneYet, 250);
  //         function isItDoneYet() {
  //           if (preloadCoverIsShowingNow == false) { // Yes, it is now done.
  //             clearInterval(checkEvery250msOrSo); // Stop the timer.
  //             makeTheNavMenuGoDownOnMobiles(); // Safely hide the nav menu as soon as possible now.
  //           }
  //         }
  //       }
  //       setTimeout(function () {    window.addEventListener('resize', hideOrUnhideTheNavigationMenuOnMobilesDependingOnFullscreen);    },200); // animation duration is .4s inside css
  //     } // End of else
  //   },100); /*!!!*/ // End of setTimeout. Set to 100ms assuming that nobody would enter and then exit full screen within 100 milliseconds.
  //
  // } // End of function hideOrUnhideTheNavigationMenuOnMobilesDependingOnFullscreen()

  // SWIPE UP-DOWN TO SEE-HIDE THE NAV MENU
  function handleSwipeGesture() {
    if ((touchStartY-touchEndY)>55) {
      // console.log("a swipe up happened");
      makeTheNavMenuComeUpOnMobiles();
    }
    else if ((touchStartY-touchEndY)<-40) {
      // console.log("a swipe down happened");
      makeTheNavMenuGoDownOnMobiles();
    }
  }

  /*____________TOUCH AND MOUSE EVENTS_____________*/
  if (deviceDetector.isMobile) { // Touch
    clickToGoToPreviousDiv.addEventListener("touchstart", function () {
      clickToGoToPreviousImgA.style.display = "none";
      clickToGoToPreviousImgD.style.display = "initial";
      setTimeout(goToPreviousLessonFunction,270);
      setTimeout(function () {
        clickToGoToPreviousImgD.style.display = "none";
        clickToGoToPreviousImgA.style.display = "initial";
      },900);
    } );
    clickToGoToMainMenuDiv.addEventListener("touchstart", function () {
      clickToGoToMainMenuImgA.style.display = "none";
      clickToGoToMainMenuImgD.style.display = "initial";
      setTimeout(goToMainMenuFunction,270);
      setTimeout(function () {
        clickToGoToMainMenuImgD.style.display = "none";
        clickToGoToMainMenuImgA.style.display = "initial";
      },900);
    } );
    clickToPauseTheAppDiv.addEventListener("touchstart", function () {
      clickToPauseTheAppImgA.style.display = "none";
      clickToPauseTheAppImgD.style.display = "initial";
      setTimeout(pauseTheAppFunction,270);
      setTimeout(function () {
        clickToPauseTheAppImgD.style.display = "none";
        clickToPauseTheAppImgA.style.display = "initial";
      },900);
    } );
    clickToFinanceDiv.addEventListener("touchstart", function () {
      clickToFinanceImgA.style.display = "none";
      clickToFinanceImgD.style.display = "initial";
      setTimeout(openFinancialMethodsPageFunction,270);
      setTimeout(function () {
        clickToFinanceImgD.style.display = "none";
        clickToFinanceImgA.style.display = "initial";
      },900);
    } );
  } else { // Mouse
    clickToGoToPreviousDiv.addEventListener("mousedown", function () { setTimeout(goToPreviousLessonFunction,30); }    );
    clickToGoToMainMenuDiv.addEventListener("mousedown", function () { setTimeout(goToMainMenuFunction,30); }          );
    clickToPauseTheAppDiv.addEventListener("mousedown", function () { setTimeout(pauseTheAppFunction,30); }     );
    clickToFinanceDiv.addEventListener("mousedown", function () { setTimeout(openFinancialMethodsPageFunction,30); }   );
  }

  // REMEMBER: The task of unloading sounds and stopping annyang has been moved to js_for_all_iframed_lesson_htmls.js to be handled with window onbeforeunload

  function goToPreviousLessonFunction() {
    navMenuClickSound.play();
    // After about 8 seconds the button must turn into a REFRESH button.
    // But it must go to the previous place if right now is the beginning of the lesson.
    if (ayFreym.contentWindow.thisLessonHasBeenLoadedFresh) { // See js_for_all_iframed...
      // Try to use sessionStorage and do smth dynamic instead of relying on static objects

      /*
      // Use indexOfLessons object from js_object_of_all_lessons_listed.js
      // Get the frame title and find the lesson index
      let theTitleOfCurrentLesson = ayFreym.contentWindow.document.title; // Use ayFreym variable from js_for_all_container_parent_htmls.js
      let theIndexOfCurrentLesson;
      // Maybe “switch case” or “while” with breaks would be better instead of “for” but anyways...
      for(i=0;i<indexOfLessons.title.length;i++)
      { if (indexOfLessons.title[i] === theTitleOfCurrentLesson ){
          theIndexOfCurrentLesson = i;
        }
      }
      // Reveal the preloader screen cover
      preloadHandlingDiv.classList.remove("addThisClassToHideThePreloader"); // See css_for_every_single_html
      preloadHandlingDiv.classList.add("addThisClassToRevealThePreloader"); // See css_for_every_single_html
      // Go to the previous lesson as soon as the cover is ready
      setTimeout(function() {
        ayFreym.src = indexOfLessons.path[theIndexOfCurrentLesson-1];
      },1500);*/
    } else {
      ayFreym.contentWindow.location.reload(); // Refresh
    }
  }


  function goToMainMenuFunction() { // Actually to progress chart; not the starting screen // See progress.js and js_for_preload_handling.js for other fade-navigation handling
    navMenuClickSound.play();
    let searchAndDetectLocation = ayFreym.src;
    let result = searchAndDetectLocation.search("progress_chart");
    if (result < 0) { // iFrame was showing a lesson or the goodbye screen; it was not showing the progress_chart
      // fade
      ayFreym.classList.add("everyThingFadesToBlack"); // Should take 700ms // Exists in css_for_all_container_parent_htmls
      const orbitingCircles = document.getElementById('orbitingCirclesDivID');
      setTimeout(function () {   orbitingCircles.style.display = "flex";   },701);
      setTimeout(function() {
        ayFreym.addEventListener('load',frameIsLoadedByHomeButton,{ once: true });
        setTimeout(function() {  ayFreym.src = "/progress_chart/index.html";  },100);
        function frameIsLoadedByHomeButton() {
          orbitingCircles.style.display = "none";
          ayFreym.classList.remove("everyThingFadesToBlack"); ayFreym.classList.add("everyThingComesFromBlack");
          setTimeout(function() {  ayFreym.classList.remove("everyThingComesFromBlack");  },2701); // 701ms was not enough???
        }
      },750); // 701ms was not enough???
    } else { // Already viewing the progress chart
      // 3 times quick flash white inset box shadow
      const flashingDiv = document.createElement("DIV"); flashingDiv.classList.add("flashBordersWithInsetWhiteBoxShadow");
      document.body.appendChild(flashingDiv);
      setTimeout(function() {  flashingDiv.parentNode.removeChild(flashingDiv);  },1500);
      // ayFreym.contentWindow.document.body.appendChild(flashingDiv);
    }
    // ayFreym.contentWindow.document.location.href="http://myLink.com"; // or ayFreym.src = "folder/index.html";
    // REMEMBER: If we navigate via location.href the browser WILL NOT update ayFreym.src
    // CAUTION! Changing the location with href will trigger window.onbeforeunload
  }

  function pauseTheAppFunction() {
    navMenuClickSound.play();
    // Pause the app
    setTimeout(function () {
      let wasListeningWhenUserPaused = false;
      if (annyang) {
        wasListeningWhenUserPaused = annyang.isListening();
        annyang.abort(); // without this annyang.start() won't function. // No problem if abort() fires when annyang wasn't listening.
      }
      /**/
      // Setting the volume to 0 and then back to 1 causes a weird muting-unmuting behavior on iOS
      let howlerVolumeWas = Howler.volume();
      if (detectedOS.name != "iOS") {      Howler.volume(0);      } // Let it work except on iOS
      /**/
      alert(continueAfterPauseByNavMenuPauseButton);
      /**/
      setTimeout(function() {
        /*Return to normal*/
        if (detectedOS.name != "iOS") {    Howler.volume(howlerVolumeWas);   } // Let it work except on iOS

        /*Continue receiving speech if it was interrupted*/
        if (wasListeningWhenUserPaused) {
          setTimeout(function() {          if (annyang){ annyang.start(); }           },1001);
        }
      },30); // 30ms is not a superstition, it's a guesstimated safety measure.
    },250);
  }

  function openFinancialMethodsPageFunction() {
    navMenuClickSound.play();
    // stopAnnyangAndStopHowler(); // use contentWindow because the function has been moved to js_for_all_iframed_lesson_htmls.js
    // UNCLEAR: Does window.open() make onbeforeunload fire if the link opens in a new tab???
    // SAFARI IGNORES: window.open() with _blank due to pop-up blocking policy
    // EVEN THOUGH: Firefox allows _blank in window.open() we won't use it because it creates a conflict with "Continue lesson" alert as it force-focuses its tab and makes the entire Firefox flyover menu unnavigateable
    if (detectedOS.name == "iOS" || detectedOS.name == "Mac OS" || detectedBrowser.name == "Firefox") {
      window.open("/information/index.html","_self");
    } else {
      window.open("/information/index.html","_blank");
    }
  }
  /*____________END OF touch and mouse events_____________*/
},{ once: true });
// END OF "window load" event
