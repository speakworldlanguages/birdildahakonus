"use strict";
// Code written by Manheart Earthman=B. A. Bilgekılınç Topraksoy=土本 智一勇夫剛志
// This file MAY NOT BE MODIFIED WITHOUT CONSENT i.e. OFFICIAL AUTHORIZATION

var letTheUserSeeTheTranslation;
var injectTextIntoTheHelpBoxP;
var imgInsideTouchableArea;
var touchAndDragThisDiv;
var imgInsideClickableAreaOFF;
var imgInsideClickableAreaON;
var clickToRevealSubtitlesDiv;
var layerOfGlassmorphism;
var subtitlesAreTurnedON = false;

function toggleTranslationOnMobiles() {
  touchAndDragThisDiv.classList.toggle("toggleWithTouchStartTouchEnd");
  imgInsideTouchableArea.classList.toggle("toggleWithTouchStartTouchEnd");
  letTheUserSeeTheTranslation.classList.toggle("toggleWithTouchStartTouchEnd");
}

// Check if DOMContentLoaded is too early for deviceDetector
// It should work OK as long as js_for_all_iframed_lesson_htmls is listed before(above) this js file
window.addEventListener('DOMContentLoaded', function(){

  if (deviceDetector.isMobile) { // TABLETS AND PHONES
    /**/
    letTheUserSeeTheTranslation = document.createElement("HEADER");
    letTheUserSeeTheTranslation.classList.add("translationBoxOnMobilesSizePosition"); // See css_for_displaying_translation_help.css
    letTheUserSeeTheTranslation.classList.add("touchableDraggableInitial");
    document.body.appendChild(letTheUserSeeTheTranslation);
    /**/
    injectTextIntoTheHelpBoxP = document.createElement("P");
    injectTextIntoTheHelpBoxP.innerHTML = "...";
    injectTextIntoTheHelpBoxP.classList.add("thetranslationAssistanceOnMobilesP"); // See css_for_displaying_translation_help.css
    letTheUserSeeTheTranslation.appendChild(injectTextIntoTheHelpBoxP);
    if (userInterfaceLanguage == "ja") {
      injectTextIntoTheHelpBoxP.classList.add("theMobilesKanjiFontAdjustP"); // See css_for_displaying_translation_help.css
    }
    /**/
    imgInsideTouchableArea = document.createElement("IMG"); imgInsideTouchableArea.setAttribute('draggable', false); // Disable HTML dragging,,, not touchstrat dragging!
    imgInsideTouchableArea.src = "/user_interface/images/touch_and_drag_man_2x_scale.webp";
    imgInsideTouchableArea.classList.add("touchableDraggableImgSizePosition"); // See css_for_displaying_translation_help.css
    imgInsideTouchableArea.classList.add("touchableDraggableInitial");
    document.body.appendChild(imgInsideTouchableArea);
    /**/
    touchAndDragThisDiv = document.createElement("DIV");
    touchAndDragThisDiv.classList.add("touchableDraggableDivSizePosition"); // See css_for_displaying_translation_help.css
    touchAndDragThisDiv.classList.add("touchableDraggableInitial");
    document.body.appendChild(touchAndDragThisDiv);
    /**/
    touchAndDragThisDiv.addEventListener("touchstart",function (event) { event.preventDefault(); event.stopPropagation();
      toggleTranslationOnMobiles();
      // Q: CORRECT OR NOT? A: YES. As long as there is stopPropagation WE DON'T NEED parent.preventTouchConflictWithTheSlidingNavMenu(touchAndDragThisDiv); // Exists in js_for_the_sliding_navigation_menu
    });
    touchAndDragThisDiv.addEventListener("touchend",function (event) { event.preventDefault(); event.stopPropagation();
      toggleTranslationOnMobiles();
    });
  } else { // DESKTOPS
    /**/
    letTheUserSeeTheTranslation = document.createElement("FOOTER");
    letTheUserSeeTheTranslation.classList.add("translationBoxOnDesktopsSizePosition");
    document.body.appendChild(letTheUserSeeTheTranslation);
    /**/
    injectTextIntoTheHelpBoxP = document.createElement("P");
    injectTextIntoTheHelpBoxP.innerHTML = "...";
    injectTextIntoTheHelpBoxP.classList.add("thetranslationAssistanceOnDesktopsP"); // See css_for_displaying_translation_help.css
    letTheUserSeeTheTranslation.appendChild(injectTextIntoTheHelpBoxP);
    if (userInterfaceLanguage == "ja") {
      injectTextIntoTheHelpBoxP.classList.add("theDesktopsKanjiFontAdjustP"); // See css_for_displaying_translation_help.css
    }
    /**/
    layerOfGlassmorphism = document.createElement("DIV");
    layerOfGlassmorphism.classList.add("workaroundForGlassmorphismRevealHelp"); // See css_for_displaying_translation_help.css
    document.body.appendChild(layerOfGlassmorphism);
    /**/
    clickToRevealSubtitlesDiv = document.createElement("DIV");
    clickToRevealSubtitlesDiv.classList.add("mouseClickableDivSizePosition"); // See css_for_displaying_translation_help.css
    document.body.appendChild(clickToRevealSubtitlesDiv);
    /**/
    imgInsideClickableAreaOFF = document.createElement("IMG"); imgInsideClickableAreaOFF.setAttribute('draggable', false); // Disable HTML dragging,,, not touchstrat dragging!
    imgInsideClickableAreaOFF.src = "/user_interface/images/reveal_help_desktop_teacher_off.webp";
    imgInsideClickableAreaOFF.classList.add("mouseClickableImgSizePosition"); // See css_for_displaying_translation_help.css
    clickToRevealSubtitlesDiv.appendChild(imgInsideClickableAreaOFF);
    imgInsideClickableAreaON = document.createElement("IMG"); imgInsideClickableAreaON.setAttribute('draggable', false); // Disable HTML dragging,,, not touchstrat dragging!
    imgInsideClickableAreaON.src = "/user_interface/images/reveal_help_desktop_teacher_on.webp";
    imgInsideClickableAreaON.classList.add("mouseClickableImgSizePosition"); // See css_for_displaying_translation_help.css
    /**/
    clickToRevealSubtitlesDiv.addEventListener("mousedown",toggleImgONOFF);
    function toggleImgONOFF() {
      if (subtitlesAreTurnedON == false) {
        imgInsideClickableAreaOFF.parentNode.removeChild(imgInsideClickableAreaOFF);
        clickToRevealSubtitlesDiv.appendChild(imgInsideClickableAreaON);
        letTheUserSeeTheTranslation.style.opacity = "1";
        subtitlesAreTurnedON = true;
      } else {
        imgInsideClickableAreaON.parentNode.removeChild(imgInsideClickableAreaON);
        clickToRevealSubtitlesDiv.appendChild(imgInsideClickableAreaOFF);
        letTheUserSeeTheTranslation.style.opacity = "0";
        subtitlesAreTurnedON = false;
      }
    }
  }

}, { once: true });
