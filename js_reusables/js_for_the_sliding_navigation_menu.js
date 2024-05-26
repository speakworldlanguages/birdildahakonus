"use strict";
// Code written by Manheart Earthman=B. A. Bilgekılınç Topraksoy=土本 智一勇夫剛志
// This file MAY NOT BE MODIFIED WITHOUT CONSENT i.e. OFFICIAL AUTHORIZATION

// NOTE: Do not use “const” for things that need to be accessible from elsewhere. Only use “var” for such variables.
// The buttons have 4 (webp img) states : A, B, C and D. If we use one variable and only change the src it works but it is very glitchy.
// Therefore we have to use four variables for each webp and change the css rule “display block none” instead of changing the src.
// ---
// For sake of GUI simplicity the Speed Adjustment Slider is available on desktops only.
// The Global Volume Slider is also "desktops-only". Mobile volume is to be adjusted natively via device volume buttons.
// ---
// NOTE: DOMContentLoaded is or can be too early for deviceDetector at parent level
// ---
var containerDivOfTheNavigationMenu = document.createElement("NAV");

var clickToGoToPreviousDiv = document.createElement("DIV");
var clickToGoToMainMenuDiv = document.createElement("DIV");
var clickToPauseTheAppDiv = document.createElement("DIV");
var clickToFinanceDiv = document.createElement("DIV");

const clickToGoToPreviousImgA = document.createElement("IMG"); clickToGoToPreviousImgA.setAttribute('draggable', false);
const clickToGoToPreviousImgB = document.createElement("IMG"); clickToGoToPreviousImgB.setAttribute('draggable', false);
const clickToGoToPreviousImgC = document.createElement("IMG"); clickToGoToPreviousImgC.setAttribute('draggable', false);
const clickToGoToPreviousImgD = document.createElement("IMG"); clickToGoToPreviousImgD.setAttribute('draggable', false);
const clickToGoToMainMenuImgA = document.createElement("IMG"); clickToGoToMainMenuImgA.setAttribute('draggable', false);
const clickToGoToMainMenuImgB = document.createElement("IMG"); clickToGoToMainMenuImgB.setAttribute('draggable', false);
const clickToGoToMainMenuImgC = document.createElement("IMG"); clickToGoToMainMenuImgC.setAttribute('draggable', false);
const clickToGoToMainMenuImgD = document.createElement("IMG"); clickToGoToMainMenuImgD.setAttribute('draggable', false);
const clickToPauseTheAppImgA = document.createElement("IMG");  clickToPauseTheAppImgA.setAttribute('draggable', false);
const clickToPauseTheAppImgB = document.createElement("IMG");  clickToPauseTheAppImgB.setAttribute('draggable', false);
const clickToPauseTheAppImgC = document.createElement("IMG");  clickToPauseTheAppImgC.setAttribute('draggable', false);
const clickToPauseTheAppImgD = document.createElement("IMG");  clickToPauseTheAppImgD.setAttribute('draggable', false);
const clickToFinanceImgA = document.createElement("IMG");      clickToFinanceImgA.setAttribute('draggable', false);
const clickToFinanceImgB = document.createElement("IMG");      clickToFinanceImgB.setAttribute('draggable', false);
const clickToFinanceImgC = document.createElement("IMG");      clickToFinanceImgC.setAttribute('draggable', false);
const clickToFinanceImgD = document.createElement("IMG");      clickToFinanceImgD.setAttribute('draggable', false);

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

containerDivOfTheNavigationMenu.appendChild(clickToFinanceDiv); // When app first starts i.e. welcome screen only clickToFinanceDiv is visible

/* “clickToGoToMainMenu” and “clickToGoToPrevious” are added conditionally from within the iframe; See js_for_all_iframed_lesson_htmls */
function addClickToFinanceButtonToTheNavigationMenu() {
  containerDivOfTheNavigationMenu.appendChild(clickToFinanceDiv);
}
function removeClickToFinanceButtonFromTheNavigationMenu() {
  containerDivOfTheNavigationMenu.removeChild(clickToFinanceDiv);
}
// See js_for_all_iframed_lesson_htmls and find how .contains() and .insertBefore() are used with containerDivOfTheNavigationMenu

// speedAdjustmentDiv and volumeAdjustmentDiv are for DESKTOPS ONLY. See the code below in window load event's desktop block.

// In the future, we can use a condition like if(userInterfaceDirection=="ltr") {} for a user interface that reads from right to left like Arabic.

function addGoBackToPreviousButtonToTheNavigationMenu() {
  if (userReadsLeftToRightOrRightToLeft == "rtl") {
    containerDivOfTheNavigationMenu.appendChild(clickToGoToPreviousDiv); // Make it rightmost
  } else {
    containerDivOfTheNavigationMenu.insertBefore(clickToGoToPreviousDiv,containerDivOfTheNavigationMenu.firstElementChild);  // Make it leftmost
  }
  //console.log("GO BACK button is added to the menu");
}
function removeGoBackToPreviousButtonFromTheNavigationMenu() {
  containerDivOfTheNavigationMenu.removeChild(clickToGoToPreviousDiv); // Whatever its location was
  //console.log("GO BACK button is removed from the menu");
}


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
// See code below to find how volumeSlider.value is either loaded from localStorage or starts with 50%
volumeAdjustmentDiv.appendChild(volumeSlider);
volumeSlider.classList.add("bothSlidersAppearance");
volumeSlider.classList.add("volumeSliderAppearance");

var speedAdjustmentSetting = "normal"; // SLOW, NORMAL, FAST // REMEMBER: This is NOT the slider position.

// Variables for detecting the swipe
var swipeNavMenuIsLocked = false; // information.js:162 information.js:176 ,,, User for permanently locking swipe menu while reading Good People's License // Unlocking also exists in js_for_all_iframed_lesson_htmls as a precaution
let touchStartY=0, newYCoord=0, newMarginBottom=0, swipeDifferenceY=0;
var navMenuIsUpAndVisible = true; // Nav menu is visible at first when the app starts. // Also see information.js bigSlideTowardsLeft() & js_for_proceed_buttons
let preventAutoDisappear;
var topContainerDivOfTheSlidingNavMenuForMobiles = document.createElement("DIV"); // Use in inline script in parent index.html - Android only

/* AS OF September 2022 we are switching to stopPropagation method to resolve the touch conflicts since it's just neater to do so */
// BUT IN CASE stopPropagation can not be used on an element that has a touch listener (for whatever reason), this can still be a solution
// As of September 2022 preventTouchConflictWithTheSlidingNavMenu is not called by anything
/*
let resetReleaseTime;
function preventTouchConflictWithTheSlidingNavMenu(elementThatWasTouched) {
  swipeNavMenuIsLocked = true; // Prevents makeTheNavMenuComeUpOnMobiles() and interrupts process in getY1() » We wouldn't need this if release time was 3801 (or longer),,, it just had to get complicated.
  if (resetReleaseTime) { clearTimeout(resetReleaseTime); resetReleaseTime = 0; } // Restart properly if a second touch happens before 1001ms
  topContainerDivOfTheSlidingNavMenuForMobiles.style.bottom = "-50vh"; // Push it away where it will never pop from bottom
  ////ayFreymWindow.addEventListener("touchend",releaseTheNavMenu); // Avoid using {once:true} ,,, consider the case of multiple touches
  elementThatWasTouched.addEventListener("touchend",releaseTheNavMenu);
  function releaseTheNavMenu(event) { event.preventDefault(); // Probably better if we don't block the window touchend with event.stopPropagation();
    //console.log("touchended with touches: " + event.touches.length); // WHY??? It goes crazy and fires 10 or 20 times when there are 2 touches
    if(event.touches.length<1){ // Only after the last touch ends,,, seems to work OK
      ////ayFreymWindow.removeEventListener("touchend",releaseTheNavMenu);
      elementThatWasTouched.removeEventListener("touchend",releaseTheNavMenu);
      resetReleaseTime = setTimeout(function () {
        swipeNavMenuIsLocked = false;
        topContainerDivOfTheSlidingNavMenuForMobiles.style.bottom = "0vh"; // Back to initial value » See css_for_sliding_navigation_menu
      },1250); //Must be long enough » Consider not only the "slow" parameter in makeTheNavMenuGoDownOnMobiles for margin-bottom transition » See makeTheNavMenuComeUpOnMobiles() 3800ms
    }
  }
}
*/

function makeTheNavMenuGoDownOnMobiles(fastOrSlow) { // NEW! // Called at the beginning of every single lesson via js_for_all_iframed_lesson_htmls
  if (fastOrSlow == "slow") {
    topContainerDivOfTheSlidingNavMenuForMobiles.style.transition = "margin-bottom 1s, bottom 0.4s"; // temporarily slow down the nav menu at the beginning of every lesson
    setTimeout(function () {
      topContainerDivOfTheSlidingNavMenuForMobiles.style.transition = "margin-bottom 0.5s, bottom 0.4s";
    },1001);
  }
  // It is OK to not write a condition for the 48px fullscreen thing, since you can't overhide the sliding nav menu
  topContainerDivOfTheSlidingNavMenuForMobiles.style.marginBottom = "calc(-22vmin - 48px)"; // Must be completely hidden in order to prevent touch conflict with native Android navigation during fullscreen mode
  newMarginBottom = -22; // hidden
  navMenuIsUpAndVisible = false;
  stopSlidingNavMenuCountdownToDisappearance(); // Reset the timer
}
function makeTheNavMenuComeUpOnMobiles() { // NEW! // Also called from blank.html inline script
  if (!swipeNavMenuIsLocked && !navMenuIsUpAndVisible && deviceDetector.isMobile) {
    topContainerDivOfTheSlidingNavMenuForMobiles.style.marginBottom = "0vmin"; // visible
    newMarginBottom = 0; // visible
    navMenuIsUpAndVisible = true;
    preventAutoDisappear = setTimeout(function () {
        makeTheNavMenuGoDownOnMobiles();
    },3800); // Close enough to Android native navigation disappear
  }
}
function stopSlidingNavMenuCountdownToDisappearance() { // Called from here [see -> goToPreviousFunction] & blank.html too
  if (preventAutoDisappear) {  clearTimeout(preventAutoDisappear); preventAutoDisappear = 0;  }
}
function handleMenuUpDownStateOnMobiles() { // 2 cases in js_for_all_iframed_lesson_htmls » progress_chart, information // 0 cases here?
  if (navMenuIsUpAndVisible) {
    setTimeout(function () { makeTheNavMenuGoDownOnMobiles("slow"); },100);
  } else {
    makeTheNavMenuComeUpOnMobiles();
  }
}

function addExtraHeightToNavMenuEtc() { // Triggered by going fullscreen » See js_for_handling_fullscreen
  topContainerDivOfTheSlidingNavMenuForMobiles.style.transform = "translateY(0px)";
  // Going fullscreen is OK without the nav menu popping up from bottom
}
function removeExtraHeightFromNavMenuEtc() { // Triggered by exiting fullscreen » See js_for_handling_fullscreen
  topContainerDivOfTheSlidingNavMenuForMobiles.style.transform = "translateY(48px)"; // Android native navigation bar height is 48px
  makeTheNavMenuComeUpOnMobiles();
}

/*---*/
let mouseIsOnMenuTriggerArea = false;
/*---*/

/* NOTE: Looks like the function declarations could have been tidier */

// Sliding navigation menu button UI sounds
let navMenuHoverSound;
let navMenuClickSound;
// Note: UX is better without a swipeUpSound and a swipeDownSound

var itIsCertainlyNotTheNativeGoBackButtonThatIsNavigating = false; // See blank.html
let theTimeoutThatMustBeStopped;

window.addEventListener("load",function() {
  // -
  // Do not access soundFileFormat before DOMContentLoaded fires in js_for_different_browsers_and_devices
  navMenuHoverSound = new Howl({  src: ["/user_interface/sounds/ceramic_button_hover."+soundFileFormat]  }); // See js_for_different_browsers_and_devices
  navMenuClickSound = new Howl({  src: ["/user_interface/sounds/ceramic_button_click."+soundFileFormat]  }); // See js_for_different_browsers_and_devices
  // What to do on MOBILE DEVICES
  // Use ayFreym from js_for_the_parent_all_browsers_all_devices
  // What to do on MOBILES
  if (deviceDetector.isMobile){
    // If something blocks the clickablity of any other element use pointerEvents = "none";
    containerDivOfTheNavigationMenu.classList.add("theSmallNavigationMenuMOBILEStyling"); // See css_for_sliding_navigation_menu.css

    topContainerDivOfTheSlidingNavMenuForMobiles.classList.add("topContainerOfTheNavigationMenuOnMobiles"); // See css_for_sliding_navigation_menu.css
    document.body.appendChild(topContainerDivOfTheSlidingNavMenuForMobiles);
    topContainerDivOfTheSlidingNavMenuForMobiles.appendChild(containerDivOfTheNavigationMenu);
    // SOLVED: Samsung Browser and Chrome were firing fullscreenchange and resize differently. 100ms delay before the boolean operations did the trick.
    // The Navigation Menu must appear only when user exits fullscreen. It MUST NOT APPEAR when device orientation is changed.
    // SWIPE FROM BELOW TO BRING THE NAV MENU

    /* LET'S: Always show the swipe menu on the welcome screen (Choose the language you want to learn) */
    function getY1(event) { event.preventDefault(); event.stopPropagation(); // Is it meaningless to stop propagation (bubbling) here??? Note that window object of iframe is contained by the parent html and it already doesn't bubble up to the parent by default, yes or no???
      // console.log("getY1 fired");
      touchStartY = Math.round(event.targetTouches[0].screenY); // https://patrickhlauke.github.io/touch/touchlist-objects/
      newYCoord = touchStartY;
      // Introduce a tiny delay here before checking if swipeNavMenuIsLocked to make sure things fire in correct order
      theTimeoutThatMustBeStopped = setTimeout(waitJustThisMuch,65);
      function waitJustThisMuch() {
        if (!swipeNavMenuIsLocked) { // Used critically in information.js bigSlideTowardsLeft // Unlocking also exists in js_for_all_iframed_lesson_htmls as a precaution // As of September 2022 there is only one use case in bigSlideTowardsLeft()
          if (!navMenuIsUpAndVisible) {
            // console.log("65ms later menu wasn't locked and was hidden");
            topContainerDivOfTheSlidingNavMenuForMobiles.style.marginBottom = "-19vmin"; // immediately pop a little
            newMarginBottom = -19;
            ayFreymWindow.addEventListener("touchmove", asTheFingerMovesUp);
            //// MUST BE WITHOUT ANY DELAY » ayFreymWindow.addEventListener("touchend", getY2,{once:true});
          } else {
            ayFreymWindow.addEventListener("touchmove", asTheFingerMovesDown);
            //// MUST BE WITHOUT ANY DELAY » ayFreymWindow.addEventListener("touchend", getY2,{once:true});
          }
        }
      }
      // Q: WHAT IF touchmove never happens! A: getY2 will fire eventually and stop the timeout
      // Start listening for touch end now
      ayFreymWindow.addEventListener("touchend", getY2,{once:true});
    }

    function asTheFingerMovesUp(event) { event.preventDefault(); event.stopPropagation(); // Even though there isn't a container that the frame window can propagate up to
      // console.log("touchmove fired asTheFingerMovesUp");
      swipeDifferenceY = newYCoord - Math.round(event.targetTouches[0].screenY) ; // UP swipe yields positive value, DOWN swipe yields negative value.
      newYCoord = Math.round(event.targetTouches[0].screenY); // https://patrickhlauke.github.io/touch/touchlist-objects/
      swipeDifferenceY = swipeDifferenceY*100/screen.height;
      newMarginBottom += swipeDifferenceY;
      if (newMarginBottom<-22) { newMarginBottom = -22; } // Limit
      if (newMarginBottom>=-14){ // Threshold vmin
        makeTheNavMenuComeUpOnMobiles();
        ayFreymWindow.removeEventListener("touchmove", asTheFingerMovesUp);
      } else { // until threshold is passed
        topContainerDivOfTheSlidingNavMenuForMobiles.style.marginBottom = newMarginBottom.toFixed(1) + "vmin";
      }
    }
    function asTheFingerMovesDown(event) { event.preventDefault(); event.stopPropagation(); // Even though there isn't a container that the frame window can propagate up to
      // console.log("touchmove fired asTheFingerMovesDown");
      // https://patrickhlauke.github.io/touch/touchlist-objects/
      // In this case touches[] and targetTouches[] are expected to be same because the target is the whole viewport
      swipeDifferenceY = newYCoord - Math.round(event.targetTouches[0].screenY) ; // UP swipe yields positive value, DOWN swipe yields negative value.
      newYCoord = Math.round(event.targetTouches[0].screenY);
      swipeDifferenceY = swipeDifferenceY*100/screen.height;
      newMarginBottom += swipeDifferenceY;
      if (newMarginBottom>0) { newMarginBottom = 0; } // Limit
      if (newMarginBottom<=-8) { // Threshold vmin
        makeTheNavMenuGoDownOnMobiles();
        ayFreymWindow.removeEventListener("touchmove", asTheFingerMovesDown);
      } else { // until threshold is passed
        topContainerDivOfTheSlidingNavMenuForMobiles.style.marginBottom = newMarginBottom.toFixed(1) + "vmin";
      }
    }
    function getY2(event) { event.preventDefault(); event.stopPropagation(); // Even though there isn't a container that the frame window can propagate up to
      //console.log("getY2 fired");
      if (theTimeoutThatMustBeStopped) { clearTimeout(theTimeoutThatMustBeStopped); theTimeoutThatMustBeStopped=0;}
      // Check if finger was removed before threshold and move it back to where it was
      if (newMarginBottom<-14 && !navMenuIsUpAndVisible) {
        topContainerDivOfTheSlidingNavMenuForMobiles.style.marginBottom = "calc(-22vmin - 48px)"; // Back to where it was
        newMarginBottom = -22; // reset
        setTimeout(function () {
          ayFreymWindow.removeEventListener("touchmove", asTheFingerMovesUp);
        }, 75);
      }
      if (newMarginBottom>-8 && navMenuIsUpAndVisible) {
        topContainerDivOfTheSlidingNavMenuForMobiles.style.marginBottom = "0vmin"; // Back to where it was
        newMarginBottom = 0; // reset
        setTimeout(function () {
          ayFreymWindow.removeEventListener("touchmove", asTheFingerMovesDown);
        }, 75);
      }
      // No need for else if threshold values are correct
      touchStartY=0; newYCoord=0; swipeDifferenceY=0;
    }

    // Restart event listeners every time a new screen is called
    ayFreym.onload = function() { // THANKFULLY: This doesn't seem to create a conflicting OVERWRITE issue with window.onload in js_for_all_iframed_lesson_htmls
      ayFreymWindow.addEventListener("touchstart", getY1);
      // HEY: touchend must start listening only after getY1 fires and must have once-true: ayFreymWindow.addEventListener("touchend", getY2); // Otherwise it could misfire, yes or no?
      // Like if touchstart on a div didn't bubble up to the window element (due to stopPropagation) but the touchend did like in 1-1-4
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
          speedAdjustmentSetting = "slow";
          speedSlider.classList.add("speedSliderAppearance1");
          speedSlider.classList.remove("speedSliderAppearance2");
          speedSlider.classList.remove("speedSliderAppearance3");
          break;
        case "3":
          // FASTER
          speedAdjustmentSetting = "fast";
          speedSlider.classList.remove("speedSliderAppearance1");
          speedSlider.classList.remove("speedSliderAppearance2");
          speedSlider.classList.add("speedSliderAppearance3");
          break;
        default:
          // NORMAL
          speedAdjustmentSetting = "normal";
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
          speedAdjustmentSetting = "slow";
          speedSlider.classList.add("speedSliderAppearance1");
          speedSlider.classList.remove("speedSliderAppearance2");
          speedSlider.classList.remove("speedSliderAppearance3");
          break;
        case "3":
          // FASTER
          speedAdjustmentSetting = "fast";
          speedSlider.classList.remove("speedSliderAppearance1");
          speedSlider.classList.remove("speedSliderAppearance2");
          speedSlider.classList.add("speedSliderAppearance3");
          break;
        default:
          // NORMAL
          speedAdjustmentSetting = "normal";
          speedSlider.classList.remove("speedSliderAppearance1");
          speedSlider.classList.add("speedSliderAppearance2");
          speedSlider.classList.remove("speedSliderAppearance3");
      }
    }

    /* __Add the elements and event listeners__ */
    containerDivOfTheNavigationMenu.insertBefore(speedAdjustmentDiv,containerDivOfTheNavigationMenu.childNodes[0]); // Make it leftmost
    containerDivOfTheNavigationMenu.appendChild(volumeAdjustmentDiv); // Make it rightmost
    containerDivOfTheNavigationMenu.classList.add("theNavigationMenuDESKTOPStyling"); // See css_for_sliding_navigation_menu
    setTimeout(function(){
      if (!mouseIsOnMenuTriggerArea) {    containerDivOfTheNavigationMenu.classList.add("hideWithSlowTransition");   }
    },2222);

    var invisibleHoverAreaDiv = document.createElement("DIV");
    invisibleHoverAreaDiv.classList.add("invisibleHoverAreaToAccessNavigationMenu"); // See css_for_sliding_navigation_menu
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
    if(firstUserGestureHasUnleashedAudio){navMenuHoverSound.play();} // See js_for_the_parent_all_browsers_all_devices
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
    clearTimeout(preventMistakeForPreviousButton); preventMistakeForPreviousButton = 0;
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
    if(firstUserGestureHasUnleashedAudio){navMenuHoverSound.play();} // See js_for_the_parent_all_browsers_all_devices
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
    clearTimeout(preventMistakeForHomeButton); preventMistakeForHomeButton = 0;
    clickToGoToMainMenuImgA.style.display = "none";
    clickToGoToMainMenuImgB.style.display = "none"; resetHomeButtonImgB();
    clickToGoToMainMenuImgC.style.display = "none";
    clickToGoToMainMenuImgD.style.display = "block"; // Slowly fades and stops exactly at the same frame with A
  }

  /*__HANDLE PROGRESS CHART BUTTON__*/
  let preventMistakeForProgressButton;
  function resetPauseButtonImgB() {
    const resetByUsingSrcB = clickToPauseTheAppImgB.src;
    clickToPauseTheAppImgB.src = onePixelTransparentGifUsedLocallyHereInNavMenu;
    setTimeout(function () {  clickToPauseTheAppImgB.src = resetByUsingSrcB;  },3);
  }
  function resetPauseButtonImgD() {
    const resetByUsingSrcD = clickToPauseTheAppImgD.src;
    clickToPauseTheAppImgD.src = onePixelTransparentGifUsedLocallyHereInNavMenu;
    setTimeout(function () {  clickToPauseTheAppImgD.src = resetByUsingSrcD;  },3);
  }
  function clickToPauseTheAppEnterHoverFunction() {
    if(firstUserGestureHasUnleashedAudio){navMenuHoverSound.play();} // See js_for_the_parent_all_browsers_all_devices
    // Start the movement by switching from A to B ,,, actually it could have been at C or D too
    clickToPauseTheAppImgA.style.display = "none";
    clickToPauseTheAppImgB.style.display = "block"; // B contains 8 frames with 30ms each -> 240ms
    clickToPauseTheAppImgC.style.display = "none";
    clickToPauseTheAppImgD.style.display = "none"; resetPauseButtonImgD();
    // Go to C after the exact duration of the animation B
    preventMistakeForProgressButton = setTimeout(function () {
      clickToPauseTheAppImgB.style.display = "none"; resetPauseButtonImgB();
      clickToPauseTheAppImgC.style.display = "block"; // C contains an endless looping animation
    },240); // Consider what will happen if the mouse leaves too quickly, like less than 240ms
  }
  function clickToPauseTheAppExitHoverFunction() {
    clearTimeout(preventMistakeForProgressButton); preventMistakeForProgressButton = 0;
    clickToPauseTheAppImgA.style.display = "none";
    clickToPauseTheAppImgB.style.display = "none"; resetPauseButtonImgB();
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
    if(firstUserGestureHasUnleashedAudio){navMenuHoverSound.play();} // See js_for_the_parent_all_browsers_all_devices
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
    clearTimeout(preventMistakeForNgoButton); preventMistakeForNgoButton = 0;
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


  /*____________TOUCH AND MOUSE EVENTS_____________*/
  if (deviceDetector.isMobile) { // Touch

    clickToGoToPreviousDiv.addEventListener("touchstart", function () { event.preventDefault(); event.stopPropagation();
      navMenuHoverSound.play();
      clickToGoToPreviousImgA.style.display = "none"; // SKIP B: B contains 8 frames with 30ms each -> 240ms
      clickToGoToPreviousImgC.style.display = "block";
      clickToGoToPreviousImgD.style.display = "none";
      resetCarAndArrowButtonImgD(); // See if it works
    } );

    clickToGoToPreviousDiv.addEventListener("touchend", function () { event.preventDefault(); event.stopPropagation();
      navMenuClickSound.play();
      clickToGoToPreviousImgC.style.display = "none";
      clickToGoToPreviousImgD.style.display = "block"; // Animation needs resetting
      goToPreviousFunction();
    } );

    clickToGoToMainMenuDiv.addEventListener("touchstart", function () { event.preventDefault(); event.stopPropagation();
      navMenuHoverSound.play();
      clickToGoToMainMenuImgA.style.display = "none"; // SKIP B: B contains 8 frames with 30ms each -> 240ms
      clickToGoToMainMenuImgC.style.display = "block";
      clickToGoToMainMenuImgD.style.display = "none";
      resetHomeButtonImgD(); // See if it works
    } );

    clickToGoToMainMenuDiv.addEventListener("touchend", function () { event.preventDefault(); event.stopPropagation();
      navMenuClickSound.play();
      clickToGoToMainMenuImgC.style.display = "none";
      clickToGoToMainMenuImgD.style.display = "block"; // Animation needs resetting
      goToMainMenuFunction();
    } );

    clickToPauseTheAppDiv.addEventListener("touchstart", function () { event.preventDefault(); event.stopPropagation();
      navMenuHoverSound.play();
      clickToPauseTheAppImgA.style.display = "none";
      clickToPauseTheAppImgC.style.display = "block";
      clickToPauseTheAppImgD.style.display = "none";
      resetPauseButtonImgD(); // See if it works
    } );

    clickToPauseTheAppDiv.addEventListener("touchend", function () { event.preventDefault(); event.stopPropagation();
      navMenuClickSound.play();
      clickToPauseTheAppImgC.style.display = "none";
      clickToPauseTheAppImgD.style.display = "block"; // Animation needs resetting
      pauseTheAppFunction("becauseUserPressedTheStopButton");
    } );

    clickToFinanceDiv.addEventListener("touchstart", function () { event.preventDefault(); event.stopPropagation();
      navMenuHoverSound.play();
      clickToFinanceImgA.style.display = "none";
      clickToFinanceImgC.style.display = "block";
      clickToFinanceImgD.style.display = "none";
      resetFinanceNgoButtonImgD(); // See if it works
    } );

    clickToFinanceDiv.addEventListener("touchend", function () { event.preventDefault(); event.stopPropagation();
      navMenuClickSound.play();
      clickToFinanceImgC.style.display = "none";
      clickToFinanceImgD.style.display = "block"; // Animation needs resetting
      openFinancialMethodsPageFunction();
    } );
  } else { // Mouse
    clickToGoToPreviousDiv.addEventListener("mousedown", function () { navMenuClickSound.play(); setTimeout(goToPreviousFunction,30); }    );
    clickToGoToMainMenuDiv.addEventListener("mousedown", function () { navMenuClickSound.play(); setTimeout(goToMainMenuFunction,30); }    );
    clickToPauseTheAppDiv.addEventListener("mousedown", function () {  navMenuClickSound.play(); setTimeout(pauseTheAppFunction,30);  }    );
    clickToFinanceDiv.addEventListener("mousedown", function () {      navMenuClickSound.play(); setTimeout(openFinancialMethodsPageFunction,30); }   );
  }

  // REMEMBER: The task of unloading sounds and stopping annyang|SpeechRecognition has been moved to js_for_all_iframed_lesson_htmls.js to be handled with window onbeforeunload

  function goToPreviousFunction() { // The button only appears if user views information screen before starting lessons
    // In this case there is no need to check if the device is online or not as the MAIN in parent is already loaded and ready » We are only unhiding it
    // ---
    // Remove itself (the go to previous button) and return to [Choose the language you want to learn] screen
    setTimeout(removeGoBackToPreviousButtonFromTheNavigationMenu,300); //
    setTimeout(addClickToFinanceButtonToTheNavigationMenu,300);
    document.getElementsByTagName('MAIN')[0].style.left = "0px";
    itIsCertainlyNotTheNativeGoBackButtonThatIsNavigating = true; // See blank.html & js_for_the_bilingual_return_button
    // ---
    ayFreym.src = "/user_interface/blank.html";
    stopSlidingNavMenuCountdownToDisappearance(); // Don't let makeTheNavMenuGoDownOnMobiles fire » On welcome screen it becomes fixed and unswipable

  }

  function goToMainMenuFunction() { // Main menu = progress_chart

    let searchAndDetectLocation = ayFreym.src;
    let result = searchAndDetectLocation.search("progress_chart");
    if (result < 0) { // iFrame was showing a lesson or the goodbye screen, etc » it was not showing the progress_chart
      if (!internetConnectivityIsNiceAndUsable) { console.warn("Navigation attempt to PROGRESS CHART despite being OFFLINE"); // No internet
        if (localStorage.getItem("progressChartShouldBeAlmostOrFullyOfflineCompatibleNow") && localStorage.getItem("commonFilesForAllLessonsCachedSuccessfully")) {
          console.warn("All assets for progress chart are cached and READY! Therefore, will try to proceed"); //No internet but the cache is ready, so let service-worker do its offline magic
        } else {
          console.warn("But files for progress chart are NOT CACHED!"); // And no cached files available
          pathOfWhatWillBeDisplayedUnlessInternetConnectivityIsLost = "/progress_chart/index.html"; // See js_for_online_and_offline_modes
          ayFreym.src = "/user_interface/screens/"+userInterfaceLanguage+"/you_are_offline.html";
          return; // Quit without executing the normal navigation code below
        }
      }
      // fade
      ayFreym.classList.add("everyThingFadesToBlack"); // Should take 700ms // Exists in css_for_preloader_and_orbiting_circles
      const orbitingCircles = document.getElementById('orbitingCirclesDivID');
      setTimeout(function () {   orbitingCircles.style.display = "flex";   },701);
      setTimeout(function() {
        ayFreym.addEventListener('load',frameIsLoadedByHomeButton,{ once: true });
        setTimeout(function() {  ayFreym.src = "/progress_chart/index.html";  },100);
        function frameIsLoadedByHomeButton() {
          orbitingCircles.style.display = "none";
          ayFreym.classList.remove("everyThingFadesToBlack"); ayFreym.classList.add("everyThingComesFromBlack"); // Exists in css_for_preloader_and_orbiting_circles
          setTimeout(function() {  ayFreym.classList.remove("everyThingComesFromBlack");  },2701); // 701ms was not enough???
        }
      },750); // 701ms was not enough???
    } else { // Already viewing the progress chart
      // 3 times quick flash white inset box shadow
      const flashingDiv = document.createElement("DIV"); flashingDiv.classList.add("flashBordersWithInsetWhiteBoxShadow");
      document.body.appendChild(flashingDiv);
      setTimeout(function() {  flashingDiv.parentNode.removeChild(flashingDiv);  },1500);
    }
    // NOTE THAT: Navigation can be done in two ways; 1- ayFreymWindow.document.location.href="http://myLink.com"; // or 2- ayFreym.src = "folder/index.html";
    // REMEMBER: If we navigate via location.href the browser WILL NOT update ayFreym.src and it will be false and stale
    // CAUTION! Changing the location with href will trigger window.onbeforeunload

  } // END OF goToMainMenuFunction

  /*pauseTheAppFunction used to be here before August 2023 - Was moved to global scope in order to enable access by js_for_navigation_handling » visibilitychange*/

  function openFinancialMethodsPageFunction() {

    // handle remove class "ceramicBlinking" from within /information/index.html
    const whereWeAreNow = ayFreym.src;
    if (whereWeAreNow.search("blank.html") >= 0) { // This is the [Choose the language you want to learn] screen
      document.getElementsByTagName('MAIN')[0].style.left = "8000px"; // Hide the "Choose the language you want to learn" screen
      // On the very first time, user hasn't selected a language so memoryCard has not been created yet
      // The user must not be able to reach progress_chart without choosing a study-language first
      // In this case we want the user to come back to the [Choose the language you want to learn] screen from the [information] screen
      removeClickToFinanceButtonFromTheNavigationMenu();
      addGoBackToPreviousButtonToTheNavigationMenu();
      // In this case, see how HOME button is prevented from being added to the nav menu in js_for_all_iframed_lesson_htmls.js
    }
    if (!internetConnectivityIsNiceAndUsable) { // No internet
      // The following condition is commented out » POLICY: User will not be able to view the information screen without proper internet connection
      //if (!localStorage.getItem("informationShouldBeOfflineCompatibleNow")) { // And no cached files available
        pathOfWhatWillBeDisplayedUnlessInternetConnectivityIsLost = "/information/index.html"; // See js_for_online_and_offline_modes
        ayFreym.src = "/user_interface/screens/"+userInterfaceLanguage+"/you_are_offline.html";
        return; // Quit without executing the normal navigation code
      //} else { /*No internet but the cache is ready, so let service-worker do its offline magic*/ }
    }
    // --- Internet is ON
    ayFreym.src = "/information/index.html";

  } // END OF openFinancialMethodsPageFunction
  /*____________END OF touch and mouse events_____________*/
},{ once: true });
// END OF "window load" event

var theAppIsPaused = false; // See js_for_navigation_handling AND js_for_speech_recognition_algorithm ALSO USED IN 1-1-4, 1-3-2
function pauseTheAppFunction(reasonWhy) { // As of September 2023 reasonWhy is either becauseUserNavigatedAwayFromTheApp or becauseUserPressedTheStopButton

    // Pause the app
    theAppIsPaused = true;
    // GET A FRESH REFERENCE TO THE IFRAME TO ACCESS ITS CURRENT VARIABLES AND FUNCTIONS
    const iFrameInPauseTheAppFunction = document.getElementsByTagName('IFRAME')[0]; // Used to be getElementById('theIdOfTheIframe'); // Access to ayFreym from » progress.js, js_for_different_browsers_and_devices, js_for_the_sliding_navigation_menu
    const iFrameWindowInPauseTheAppFunction = iFrameInPauseTheAppFunction.contentWindow;
    const iFrameDocumentInPauseTheAppFunction = iFrameInPauseTheAppFunction.contentDocument;

    // SpeechRecognition STOPS LISTENING
    let speechRecognitionWasListeningWhenUserPaused = false;
    if (annyang) {
      speechRecognitionWasListeningWhenUserPaused = annyang.isListening();
      if (speechRecognitionWasListeningWhenUserPaused) {
        /* DEPRECATE: Looks like we cannot avoid Safari's repeating "allow mic" annoyance by pausing annyang instead of turning it off.
        if (isApple) { annyang.pause(); } // BESIDES: CPU demand is somewhat too high when MIC is ON. So we want to turn it off whenever it is not in use.
        else { annyang.abort(); }
        */
        annyang.abort(); // Better if we tell or let Safari user figure out how to "permanently allow mic"
      }
      // Note that: No problem if abort() fires when annyang|SpeechRecognition wasn't listening.
    }

    // STOP AUDIOMETER
    let standardAudiometerWasListeningWhenUserPaused = false;
    // CANCEL let uniqueAudiometerWasListeningWhenUserPaused = false;
    // See js_for_microphone_input_visualization
    if (iFrameWindowInPauseTheAppFunction.standardAudiometerIsListening) {
      iFrameWindowInPauseTheAppFunction.stopStandardAudioInputVisualization(); standardAudiometerWasListeningWhenUserPaused = true;
    }
    /* CANCEL else if (iFrameWindowInPauseTheAppFunction.uniqueAudiometerIsListening) {
      iFrameWindowInPauseTheAppFunction.stopUniqueAudioInputVisualization(); uniqueAudiometerWasListeningWhenUserPaused = true;
    }*/
    else {
      // DO NOTHING CASE 1: audiometer mic does not exist because it's not used in this lesson
      // DO NOTHING CASE 2: audiometer mic exists but it was not started yet
    }

    // PAUSE ALL TIMERS
    if (iFrameWindowInPauseTheAppFunction.listOfAllTickingSuperTimers) { iFrameWindowInPauseTheAppFunction.pauseAllSuperTimers(); }
    else { console.warn("listOfAllTickingSuperTimers doesn't exist???"); }
    // PAUSE ALL VIDEOS
    const allVideoElements = iFrameDocumentInPauseTheAppFunction.getElementsByTagName('VIDEO');
    const vidsThatMustBeUnpaused = [];
    for (let i = 0; i < allVideoElements.length; i++) {
        const vid = allVideoElements[i];
        if (!vid.paused) { // Check if the video is playing (not paused)
            vid.pause(); // Pause the video if it's playing
            vidsThatMustBeUnpaused.push(vid);
        }
    }
    // PAUSE ALL SOUNDS
    const sndsThatMustBeUnpaused = [];
    if (iFrameWindowInPauseTheAppFunction.listOfAllSoundsInThisLesson) {
      const allSounds = iFrameWindowInPauseTheAppFunction.listOfAllSoundsInThisLesson;
      for (let i = 0; i < allSounds.length; i++) {
        const snd = allSounds[i];
        if (snd.playing()) {
          snd.pause();
          sndsThatMustBeUnpaused.push(snd);
        }
      }
    }
    else {  console.warn("listOfAllSoundsInThisLesson doesn't exist???");   }
    // SHOULD WE ALSO TURN OFF AUDIOMETER MIC???

    // ---
    if (typeof iFrameWindowInPauseTheAppFunction.pauseCSSAnimations === "function") { // If there exists such a function » example 1-3-2 [there is a fish]
      iFrameWindowInPauseTheAppFunction.pauseCSSAnimations();
    }
    // ---
    // See js_for_info_boxes_in_parent
    let passTheReasonToTheBox;
    if (reasonWhy) { passTheReasonToTheBox = reasonWhy; }
    // As of September 2023 there is only one type of createAndHandleTheAppIsPausedBox
    // Nevertheless its contents can be conditionally modified using passTheReasonToTheBox in case it becomes necessary
    createAndHandleTheAppIsPausedBox(passTheReasonToTheBox).then(unpauseAndContinueFunction);

    function unpauseAndContinueFunction() {

      // ---
      if (typeof iFrameWindowInPauseTheAppFunction.unpauseCSSAnimations === "function") { // If there exists such a function » example 1-3-2 [there is a fish]
        iFrameWindowInPauseTheAppFunction.unpauseCSSAnimations();
      }
      // ___ NO NEED TO MUTE HOWLER IF ALL PLAYING SOUNDS CAN BE PAUSED // Howler.volume(howlerVolumeWas);
      for (let i = 0; i < sndsThatMustBeUnpaused.length; i++) {
          const snd = sndsThatMustBeUnpaused[i];
          snd.play();
      }
      // ---
      for (let i = 0; i < vidsThatMustBeUnpaused.length; i++) {
          const vid = vidsThatMustBeUnpaused[i];
          vid.play();
      }
      // ---
      if (iFrameWindowInPauseTheAppFunction.listOfAllTickingSuperTimers) { iFrameWindowInPauseTheAppFunction.unpauseAllSuperTimers(); }

      // Continue receiving speech if it was interrupted
      if (speechRecognitionWasListeningWhenUserPaused) {
        setTimeout(function() {         if (annyang){ annyang.resume(); }         },50); // annyang.resume() works both with .abort() and .pause()
      }
      if (standardAudiometerWasListeningWhenUserPaused) {
        setTimeout(function () { iFrameWindowInPauseTheAppFunction.startStandardAudioInputVisualization(); }, 100);
      }/* CANCEL else if (uniqueAudiometerWasListeningWhenUserPaused) {
        setTimeout(function () { iFrameWindowInPauseTheAppFunction.startUniqueAudioInputVisualization(); }, 100);
      }*/

      // ---
      theAppIsPaused = false;

    } // END OF unpauseAndContinueFunction


} // END OF pauseTheAppFunction
