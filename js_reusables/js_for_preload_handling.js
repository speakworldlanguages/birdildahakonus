// IDEA: Could get network speed and make some "fine adjustments" but that would -in most cases- be an overkill.
// REVIEW AND MODIFICATION 1: This used to be for handling the iframed-lesson-htmls only. But it turned out that the parent-container-htmls need this as well.
// REVIEW AND MODIFICATION 2: We have just made this "parents-only" and now everything will be handled from the containers.
// REMEMBER: Relative paths are SAFER than absolute root paths.

// Defer or NOT defer.
var preloadCoverIsShowingNow = false;
let isItTakingTooLongToLoad;
let slowConnectionTryAgainOrWaitText = "Try reloading the app?"; // Default msg,,, this will be overwritten by fetch once the msg in userInterfaceLanguage is loaded
function setPreloadCoverIsShowingNowToTrue() { // See js_for_all_container_parent_htmls (wherever ayFreym.src is changed)
  preloadCoverIsShowingNow = true; // See js_for_the_sliding_navigation_menu for its usage
  /*Check and handle slow-connection or app-is-frozen problem*/
  // Ask if the user wants to try a refresh every ?? seconds.
  /* NEED something better than this
  isItTakingTooLongToLoad = setInterval(function(){
    if (confirm(slowConnectionTryAgainOrWaitText)) {
      //"User has pressed OK!";
      window.location.reload(); // Refresh
      // IDEA: HOW ABOUT REFRESHING THE IFRAME ONLY???
    } // No need for "else"
  }, 35000);
  */
}
function setPreloadCoverIsShowingNowToFalse() { // See js_for_all_container_parent_htmls (window load + iframe load). Will fire whenever an iframe load happens. PROBABLY including blank.html
  preloadCoverIsShowingNow = false; // See js_for_the_sliding_navigation_menu for its usage
  /*Handle slow connection or load-freezing problem*/
  /*clearInterval(isItTakingTooLongToLoad);*/ // NEED something better than this
}

var preloadHandlingDiv; // Will be called from bread.js, water.js etc
let preloadGlobeImg; // Won't be called from anywhere else but here only.

window.addEventListener("DOMContentLoaded",function() { // Parents ONLY! Will fire 1 time when the app loads for the first time and never again
  preloadHandlingDiv = document.getElementById('idOfThePreloadHandlingDiv'); /* LET THE CREATION OF THIS DIV BE DONE IMMEDIATELY INSIDE HTML FILES and not here */
  preloadGlobeImg = document.getElementById('globeFrameZeroImgID');
  // fetch slowConnectionTryAgainOrWaitText
  const filePathForResetTheAppText = "/user_interface/text/"+userInterfaceLanguage+"/0-do_you_want_to_reset.txt";
  fetch(filePathForResetTheAppText,myHeaders).then(function(response){return response.text();}).then(function(contentOfTheTxtFile){ slowConnectionTryAgainOrWaitText = contentOfTheTxtFile; });
}, { once: true });

window.addEventListener("load",function() { // Parents ONLY! Will fire 1 time when the app loads for the first time and never again
  preloadGlobeImg.src = "/user_interface/images/rotating_globe_100x150.webp"; // Change the 16KB single frame webp with the animated one 449KB one. Which will probably be ready until user chooses a language to learn.
  preloadHandlingDiv.classList.add("addThisClassToHideThePreloader"); // See css_for_every_single_html
  setTimeout(function () {   setPreloadCoverIsShowingNowToFalse();   },505); // What happens if blank.html can not be loaded
}, { once: true });

// See js_for_all_iframed_lesson_htmls

function handleFadingAndNavigation(srcPath) {
  ayFreym.classList.add("everyThingFadesToBlack");
  const orbitingCircles =  document.getElementById('orbitingCirclesDivID');
  setTimeout(function () {   orbitingCircles.style.display = "flex";   },701);
  setTimeout(function() {
    ayFreym.addEventListener('load',frameIsLoadedByProgressChartNav,{ once: true });
    setTimeout(function() {   ayFreym.src = srcPath;  },100);
    function frameIsLoadedByProgressChartNav() {
      orbitingCircles.style.display = "none";
      ayFreym.classList.remove("everyThingFadesToBlack");  ayFreym.classList.add("everyThingComesFromBlack");
      setTimeout(function() {   ayFreym.classList.remove("everyThingComesFromBlack");   },2701); // 701ms was not enough???
    }
  },750);
}
