"use strict";
// Code written by Manheart Earthman=B. A. Bilgekılınç Topraksoy=土本 智一勇夫剛志
// May be modified by AUTHORIZED PEOPLE ONLY

// USE SECTION & ADDRESS elements as new/other TYPES OF BUTTONS
/* ADDRESS element is turned into the button for [See how you can help] in we_are_working_for_new_levels */
/* SECTION element is turned into the button for [Next] in author's notice */
window.addEventListener('DOMContentLoaded', function(){

  const hoverSoundForAddressElementAsButton = new parent.Howl({  src: ["/user_interface/sounds/address_as_button_hover.webm"]  });
  const clickSoundForAddressElementAsButton = new parent.Howl({  src: ["/user_interface/sounds/address_as_button_click.webm"]  });
  const allAddressButtonElementsAreInThisArray = document.getElementsByTagName("ADDRESS");
  let i;
  for (i = 0; i < allAddressButtonElementsAreInThisArray.length; i++)
  {
    if (deviceDetector.device == "desktop") {
      allAddressButtonElementsAreInThisArray[i].addEventListener("mouseenter", hoverOrTouchStart);
      allAddressButtonElementsAreInThisArray[i].addEventListener("mouseup", mouseDownOrTouchEnd);
      allAddressButtonElementsAreInThisArray[i].addEventListener("mouseup", timeToMove); // Playstation style disappear
    } else {
      allAddressButtonElementsAreInThisArray[i].addEventListener("touchstart", hoverOrTouchStart);
      allAddressButtonElementsAreInThisArray[i].addEventListener("touchend", mouseDownOrTouchEnd);
      allAddressButtonElementsAreInThisArray[i].addEventListener("touchend", timeToMove,{once:true});
    }
  }

  function timeToMove(event) {
    if (deviceDetector.device == "desktop") {
      event.target.classList.add('addThisToAButtonForPlayStationStyleClick'); // See css_for_every_single_html
    } else {
      let j; // Will there ever be a case where two address or section buttons are displayed at the same time???
      for (j = 0; j < allAddressButtonElementsAreInThisArray.length; j++) {
        allAddressButtonElementsAreInThisArray[j].classList.add('addThisToAButtonForPlayStationStyleClick'); // See css_for_every_single_html
      }
    }
  }

  function hoverOrTouchStart() {  hoverSoundForAddressElementAsButton.play();  }
  function mouseDownOrTouchEnd() {  clickSoundForAddressElementAsButton.play();  }

}, { once: true });

// See notice.js to find what section button does in that case
