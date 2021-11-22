var letTheUserSeeTheTranslation;
var injectTextIntoTheHelpBoxP;
var imgInsideTouchableArea;
var touchAndDragThisDiv;
var imgInsideClickableAreaOFF;
var imgInsideClickableAreaON;
var clickToRevealSubtitlesDiv;
var layerOfGlassmorphism;
var subtitlesAreTurnedON = false;
window.addEventListener('DOMContentLoaded', function(){

  if (deviceDetector.isMobile) { // TABLETS AND PHONES
    /**/
    letTheUserSeeTheTranslation = document.createElement("HEADER");
    letTheUserSeeTheTranslation.classList.add("translationBoxOnMobilesSizePosition"); // See css_for_lessons_with_interactables.css
    letTheUserSeeTheTranslation.classList.add("touchableDraggableInitial");
    document.body.appendChild(letTheUserSeeTheTranslation);
    /**/
    injectTextIntoTheHelpBoxP = document.createElement("P");
    injectTextIntoTheHelpBoxP.innerHTML = "...";
    injectTextIntoTheHelpBoxP.classList.add("thetranslationAssistanceOnMobilesP"); // See css_for_lessons_with_interactables.css
    letTheUserSeeTheTranslation.appendChild(injectTextIntoTheHelpBoxP);
    if (userInterfaceLanguage == "ja") {
      injectTextIntoTheHelpBoxP.classList.add("theMobilesKanjiFontAdjustP");
    }
    /**/
    imgInsideTouchableArea = document.createElement("IMG");
    imgInsideTouchableArea.src = "/user_interface/images/touch_and_drag_man_2x_scale.webp";
    imgInsideTouchableArea.classList.add("touchableDraggableImgSizePosition"); // See css_for_lessons_with_interactables.css
    imgInsideTouchableArea.classList.add("touchableDraggableInitial");
    document.body.appendChild(imgInsideTouchableArea);
    /**/
    touchAndDragThisDiv = document.createElement("DIV");
    touchAndDragThisDiv.classList.add("touchableDraggableDivSizePosition"); // See css_for_lessons_with_interactables.css
    touchAndDragThisDiv.classList.add("touchableDraggableInitial");
    document.body.appendChild(touchAndDragThisDiv);
    /**/
    touchAndDragThisDiv.addEventListener("touchstart",function (event) {
      event.target.classList.toggle("toggleWithTouchStartTouchEnd");
      imgInsideTouchableArea.classList.toggle("toggleWithTouchStartTouchEnd");
      letTheUserSeeTheTranslation.classList.toggle("toggleWithTouchStartTouchEnd");
    });
    touchAndDragThisDiv.addEventListener("touchend",function (event) {
      event.target.classList.toggle("toggleWithTouchStartTouchEnd");
      imgInsideTouchableArea.classList.toggle("toggleWithTouchStartTouchEnd");
      letTheUserSeeTheTranslation.classList.toggle("toggleWithTouchStartTouchEnd");
    });
  } else { // DESKTOPS
    /**/
    letTheUserSeeTheTranslation = document.createElement("FOOTER");
    letTheUserSeeTheTranslation.classList.add("translationBoxOnDesktopsSizePosition");
    document.body.appendChild(letTheUserSeeTheTranslation);
    /**/
    injectTextIntoTheHelpBoxP = document.createElement("P");
    injectTextIntoTheHelpBoxP.innerHTML = "...";
    injectTextIntoTheHelpBoxP.classList.add("thetranslationAssistanceOnDesktopsP"); // See css_for_lessons_with_interactables.css
    letTheUserSeeTheTranslation.appendChild(injectTextIntoTheHelpBoxP);
    if (userInterfaceLanguage == "ja") {
      injectTextIntoTheHelpBoxP.classList.add("theDesktopsKanjiFontAdjustP");
    }
    /**/
    layerOfGlassmorphism = document.createElement("DIV");
    layerOfGlassmorphism.classList.add("workaroundForGlassmorphismRevealHelp"); // See css_for_lessons_with_interactables.css
    document.body.appendChild(layerOfGlassmorphism);
    /**/
    clickToRevealSubtitlesDiv = document.createElement("DIV");
    clickToRevealSubtitlesDiv.classList.add("mouseClickableDivSizePosition"); // See css_for_lessons_with_interactables.css
    document.body.appendChild(clickToRevealSubtitlesDiv);
    /**/
    imgInsideClickableAreaOFF = document.createElement("IMG");
    imgInsideClickableAreaOFF.src = "/user_interface/images/reveal_help_desktop_teacher_off.webp";
    imgInsideClickableAreaOFF.classList.add("mouseClickableImgSizePosition"); // See css_for_lessons_with_interactables.css
    clickToRevealSubtitlesDiv.appendChild(imgInsideClickableAreaOFF);
    imgInsideClickableAreaON = document.createElement("IMG");
    imgInsideClickableAreaON.src = "/user_interface/images/reveal_help_desktop_teacher_on.webp";
    imgInsideClickableAreaON.classList.add("mouseClickableImgSizePosition"); // See css_for_lessons_with_interactables.css
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
