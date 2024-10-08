"use strict";
// Code written by Manheart Earthman=B. A. Bilgekılınç Topraksoy=土本 智一勇夫剛志
// This file MAY NOT BE MODIFIED WITHOUT CONSENT i.e. OFFICIAL AUTHORIZATION

// This is included in parent htmls only. Not in lesson htmls.
// Even though this is deferred, looks like we still need to wait for the load event before we call a function from another js file.
// iPhone-Safari won't allow fullscreen as of 2022 UNLESS the app is added to HOMESCREEN and started from there
// See js_for_different_browsers_and_devices ... Also see js_for_the_sliding_navigation_menu
let enterSound;
let exitSoundIsAlsoTouchStart;
var mobileCanGoFullscreenNow = false; // Set to true as soon as mic permission box is closed » See js_for_different_browsers_and_devices
if (localStorage.allowMicrophoneDialogHasAlreadyBeenDisplayed) {  mobileCanGoFullscreenNow = true;  } // See js_for_different_browsers_and_devices
var hasGoneFullscreen = false;
// Go fullscreen by touching anywhere on the screen.
window.addEventListener("load",function() {
  // soundFileFormat exists in js_for_different_browsers_and_devices
  enterSound = new Howl({  src: ["/user_interface/sounds/fullscreen_open."+soundFileFormat]  });
  exitSoundIsAlsoTouchStart = new Howl({  src: ["/user_interface/sounds/fullscreen_exit."+soundFileFormat]  });

  const iFrameInFullscreenHandling = document.getElementsByTagName('IFRAME')[0]; // Used to be .getElementById('theIdOfTheIframe'); // Check js_for_the_parent_all_browsers_all_devices.js prevent conflicts
  let iFrameWindowInFullscreenHandling = null;
  let iFrameDocumentInFullscreenHandling = null;

  // HOW TO GO AND STAY IN FULLSCREEN ON MOBILES
  // Most browsers won't allow going fullscreen without a user gesture... That means calling o-p-e-n-F-u-l-l-s-c-r-e-e-n() with Onblur Onfocus or document.visibilitychange won't work.
  // So here is how we do it...

  if (deviceDetector.isMobile) { // NOTE: DOMContentLoaded is or can be too early for deviceDetector at parent level
    // TABLETS&PHONES TABLETS&PHONES TABLETS&PHONES TABLETS&PHONES TABLETS&PHONES
    // Long ago there used to be a different touchstart_for_fullscreen sound. The new fullscreen_exit sound is work nicely as the touchstart sound.
    // parent window
    window.document.addEventListener("touchend", handleTouchForFullscreen);
    window.document.addEventListener("touchstart", handleTouchSoundBeforeFullscreen);
    // We cannot directly add an event listener for touchstart/mousedown on the iframe.
    // MUST NOT use once:true as with every new html the DOM within the iframe is destroyed and rebuilt
    iFrameInFullscreenHandling.addEventListener("load",iframeHasBeenLoadedOnMobileBrowser);
    function iframeHasBeenLoadedOnMobileBrowser() {
      iFrameWindowInFullscreenHandling = iFrameInFullscreenHandling.contentWindow;
      iFrameDocumentInFullscreenHandling = iFrameInFullscreenHandling.contentDocument;
      // Try touchend instead of touchstart to see if it will fix the console error » "fullscreen error"
      // ANSWER: Yes, it looks like trying to go fullscreen with touchstart was the cause of that error which made fullscreen work only with a double tap
      iFrameDocumentInFullscreenHandling.addEventListener("touchend", handleTouchForFullscreen);
      iFrameDocumentInFullscreenHandling.addEventListener("touchstart", handleTouchSoundBeforeFullscreen);
    }
    function handleTouchForFullscreen() {
      if (!hasGoneFullscreen && mobileCanGoFullscreenNow){
        const screenArea = screen.width*screen.height;
        if (screenArea<500000) { // 800x600=480000
          openFullscreen();
        } else {
          console.log('Screen size of this device is big enough to enjoy the content without fullscreen');
        }
      }
    }
    function handleTouchSoundBeforeFullscreen() {
      // Test on a big tablet to see if it's better to prevent the first touchstart sound
      if (detectedOS_name != "ios" && !hasGoneFullscreen) { exitSoundIsAlsoTouchStart.play(); } // iPhones as of 2022 (Safari 16.0) still don't allow fullscreen.
    }
  } else {
    // DESKTOPS DESKTOPS DESKTOPS DESKTOPS DESKTOPS
    // THE RIGHT CLICK HANDLING ON DESKTOPS FOR parent window
    document.addEventListener('contextmenu', rightClickHandlerFunction);
    document.addEventListener('mousedown', handleCoordinatesAndCancellation);
    window.addEventListener("keyup",function (e) { if ( e.keyCode === 27 ) { hideTheRightClickMenu(); } });
    document.addEventListener('dblclick', toggleFullScreen);

    // THE RIGHT CLICK HANDLING ON DESKTOPS FOR iframe window
    // Every time the iframe is loaded, add the custom context menu to the framed document.
    // MUST NOT use once:true as with every new html the DOM within the iframe is destroyed and rebuilt
    iFrameInFullscreenHandling.addEventListener("load",iframeHasBeenLoadedOnDesktopBrowser);
    // WARNING!!! This double fires when a returning user views progress chart
    // Probably because blank.html makes it fire before progress_chart/index.html is loaded
    // Anyhow
    function iframeHasBeenLoadedOnDesktopBrowser() { //console.log("iFrame LOAD fired in FULLSCREEN HANDLING");
      iFrameWindowInFullscreenHandling = iFrameInFullscreenHandling.contentWindow;
      iFrameDocumentInFullscreenHandling = iFrameInFullscreenHandling.contentDocument;
      // event listeners
      iFrameDocumentInFullscreenHandling.addEventListener('contextmenu', rightClickHandlerFunction);
      iFrameDocumentInFullscreenHandling.addEventListener('mousedown', handleCoordinatesAndCancellation);
      iFrameWindowInFullscreenHandling.addEventListener("keyup",function (e) { if ( e.keyCode === 27 ) { hideTheRightClickMenu(); } });
      iFrameDocumentInFullscreenHandling.addEventListener('dblclick', toggleFullScreen);
    } // This line is the end of iframeHasBeenLoadedOnDesktopBrowser()

  } // End of “else”

},{ once: true });


var rightClickMenu = document.createElement("DIV");
var goFullscreenWebp = document.createElement("IMG");
var exitFullscreenWebp = document.createElement("IMG");
// AVOID: Do not use reference to root with "/" as it could be uncertain what the root is in case of deep-iframing for domain masking.
goFullscreenWebp.src = "/user_interface/images/right_click_go_for_fullscreen.webp";    goFullscreenWebp.classList.add("openFullscreenCursor");
exitFullscreenWebp.src = "/user_interface/images/right_click_no_more_fullscreen.webp"; exitFullscreenWebp.classList.add("exitFullscreenCursor");
rightClickMenu.appendChild(goFullscreenWebp);
rightClickMenu.appendChild(exitFullscreenWebp);
rightClickMenu.classList.add("rightClickMenuWithWebpsInside"); // See css_for_every_single_html.css

var isContextMenuDisplayed = false;

var x,y;
function handleCoordinatesAndCancellation(event) {
  x=event.clientX;  y=event.clientY;
  requestAnimationFrame(oneFrameLater);
  function oneFrameLater() { requestAnimationFrame(twoFramesLater); }
  function twoFramesLater() { if (isContextMenuDisplayed) { hideTheRightClickMenu(); } }
}

function rightClickHandlerFunction(event) {
  event.preventDefault(); // Let it propagate
  requestAnimationFrame(orderlyTiming);
  function orderlyTiming() {
    if (!hasGoneFullscreen) {
      goFullscreenWebp.style.display = "block";
      exitFullscreenWebp.style.display = "none";
    } else {
      goFullscreenWebp.style.display = "none";
      exitFullscreenWebp.style.display = "block";
    }
    rightClickMenu.style.left = String(x)+"px";
    rightClickMenu.style.top = String(y)+"px";
    document.body.appendChild(rightClickMenu);
    isContextMenuDisplayed = true;
    rightClickMenu.addEventListener("mousedown",toggleFullScreen,{ once: true });
  }
}

function toggleFullScreen() { console.log("TOGGLED FULLSCREEN MODE"); // DESKTOPS ONLY » Mobiles never exit fullscreen unless native back button is used
  if (!hasGoneFullscreen) {
    openFullscreen();
  } else {
    closeFullscreen();
  }
  hideTheRightClickMenu();
}

function hideTheRightClickMenu() {
  if (isContextMenuDisplayed) {
    document.body.removeChild(rightClickMenu);
    isContextMenuDisplayed = false;
  }
}

var theWholeDocument = document.documentElement;
/* Function to open fullscreen mode */
function openFullscreen() {
  /* On Android fullscreen permission throws an error with touchstart. Use touchend instead */
  if (theWholeDocument.requestFullscreen) {
    theWholeDocument.requestFullscreen();
  } else if (theWholeDocument.mozRequestFullScreen) { /* Firefox */
    theWholeDocument.mozRequestFullScreen();
  } else if (theWholeDocument.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
    theWholeDocument.webkitRequestFullscreen();
  } else if (theWholeDocument.msRequestFullscreen) { /* IE/Edge */
    theWholeDocument = window.top.document.body; //To break out of frame in IE
    theWholeDocument.msRequestFullscreen();
  }
}

/* Function to close fullscreen mode */
function closeFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) {
    window.top.document.msExitFullscreen();
  }
}

function handleChangeToFullscreen() { // Fires both desktop and mobile » See the fullscreenchange event below
  enterSound.play();
  if (deviceDetector.isMobile) { // No need to handle iOS - Android differently » iPhones (as of 2022) never fire fullscreenchange event
    // Give extra height to sliding-nav-menu to avoid overlap with native Android buttons
    addExtraHeightToNavMenuEtc(); // See js_for_the_sliding_navigation_menu
  }
}

function handleChangeBackToVisibleAddressBar() { // Fires both desktop and mobile » See the fullscreenchange event below
  exitSoundIsAlsoTouchStart.play();
  if (deviceDetector.isMobile) { // No need to handle iOS - Android differently » iPhones (as of 2022) never fire fullscreenchange event
    // Remove extra height from sliding-nav-menu
    removeExtraHeightFromNavMenuEtc(); // See js_for_the_sliding_navigation_menu
  }
}

/* Change boolean hasGoneFullscreen every time fullscreen is opened or closed*/
document.addEventListener("fullscreenchange", function() {
  if (!hasGoneFullscreen) {
    hasGoneFullscreen = true;
    handleChangeToFullscreen();
    // console.log("fullscreenchange event fired! and now it is fullscreen");
  } else {
    hasGoneFullscreen = false;
    handleChangeBackToVisibleAddressBar();
    // console.log("fullscreenchange event fired! and now it is back to default view");
  }
});
document.addEventListener("mozfullscreenchange", function() {
  if (!hasGoneFullscreen) {
    hasGoneFullscreen = true;
    handleChangeToFullscreen();
  } else {
    hasGoneFullscreen = false;
    handleChangeBackToVisibleAddressBar();
  }
});
document.addEventListener("webkitfullscreenchange", function() {
  if (!hasGoneFullscreen) {
    hasGoneFullscreen = true;
    handleChangeToFullscreen();
  } else {
    hasGoneFullscreen = false;
    handleChangeBackToVisibleAddressBar();
  }
});
document.addEventListener("msfullscreenchange", function() {
  if (!hasGoneFullscreen) {
    hasGoneFullscreen = true;
    handleChangeToFullscreen();
  } else {
    hasGoneFullscreen = false;
    handleChangeBackToVisibleAddressBar();
  }
});
