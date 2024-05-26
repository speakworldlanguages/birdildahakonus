"use strict";
// Code written by Manheart Earthman=B. A. Bilgekılınç Topraksoy=土本 智一勇夫剛志
// This file MAY NOT BE MODIFIED WITHOUT CONSENT i.e. OFFICIAL AUTHORIZATION

// USE SECTION & ADDRESS elements as new/other TYPES OF BUTTONS
// April 2024 UPDATE: SECTION ELEMENT is no longer used for author's notice screen
/* ADDRESS element is turned into the button for [See how you can help] in we_are_working_for_new_levels */
/* SECTION element is turned into the buttons in 1-3-4 */
let hoverSoundForAddressElementAsButton;
let clickSoundForAddressElementAsButton;

let hoverOrTouchSoundForSectionElementAsButton;

window.addEventListener('DOMContentLoaded', function(){


  //_______ See lesson 1-3-4
  const allSectionButtonElementsAreInThisArray = document.getElementsByTagName("SECTION");
  // See if any section elements exist by checking array length » The value of zero means false in ECMAScript
  if (allSectionButtonElementsAreInThisArray.length) {

    hoverOrTouchSoundForSectionElementAsButton = new parent.Howl({  src: ["/user_interface/sounds/financial_thirdparty_hover."+soundFileFormat]  });
    // Normally, unique lesson sounds get unloaded when beforeunload in js_for_all_iframed_lesson_htmls fires unloadTheSoundsOfThisLesson
    // Here we must EITHER add these sounds to the unique sound list of the lesson OR create a dedicated unloader function
    window.addEventListener('beforeunload', function () {      hoverOrTouchSoundForSectionElementAsButton.unload();     });
    // -
    if (deviceDetector.isMobile) {

      let s;
      for (s = 0; s < allSectionButtonElementsAreInThisArray.length; s++) {
        allSectionButtonElementsAreInThisArray[s].addEventListener("touchstart",touchstartSection);
        function touchstartSection(event) { event.preventDefault(); event.stopPropagation(); // stopPropagation to prevent conflict with sliding-navigation-menu
          if (event.touches.length == 1) { // Possibility of second finger triggering a conflict is handled
            event.target.classList.add("sectionTouchstart"); // See css_for_proceed_buttons
            hoverOrTouchSoundForSectionElementAsButton.play();
          }
        }
      }
      // ---
      document.addEventListener('touchmove',checkFingerPosition);
      let efp = null;
      function checkFingerPosition(event) { event.preventDefault();
        // parent.console.log("finger move detected");
        let touch = event.touches[0];
        efp = document.elementFromPoint(touch.clientX, touch.clientY); // DON'T NEED: touch.pageX - window.pageXOffset, touch.pageY - window.pageYOffset // because there is no scrolling in window or body
        if(efp.tagName.toLowerCase() == "section" ) {

          if (efp.classList.contains("sectionTouchstart")) {
            // Already hovered
          } else { // simulate fingerenter
            efp.classList.add("sectionTouchstart"); // See css_for_proceed_buttons
            hoverOrTouchSoundForSectionElementAsButton.play();
            // CONSIDER: FOR BETTER UX - We can send the sliding-navigation-menu back to its hiding place
            // Could also lock it until fingerup but maybe it is better if we don't
            if (parent.navMenuIsUpAndVisible) { // See js_for_the_sliding_navigation_menu
              parent.makeTheNavMenuGoDownOnMobiles(); // See js_for_the_sliding_navigation_menu
              // Tested: Looks good.
            }
            // IMPROVMENT: Check the current efp against the previous one and see if finger jumped directly from one to another
            // What if it did: Remove sectionTouchstart from the previous one, THAT'S IT, FINISHED!
            // As of April 2024 this seems rather unnecessary because
            // In case of 1-3-4 it was impossible to make the jump as the distance between the two section-as-buttons is too big
            // WHICH IS UNLIKE the welcome screen language buttons where you can jump from one to the next if you move your finger quickly » See js_for_hover_simulation_and_scrollglobe

          }

        } else { // Try to detect finger-leave when touch is on empty space or on other non-section elements in-between buttons > TEST RESULT: Nice enough
          resetAllSectionAsButtons();
        }
      } // End of checkFingerPosition
      // ---
      function resetAllSectionAsButtons() {
        let z;
        for (z = 0; z < allSectionButtonElementsAreInThisArray.length; z++) {
          allSectionButtonElementsAreInThisArray[z].classList.remove("sectionTouchstart");
        }
      }
      // ---
      document.addEventListener('touchend',touchHasEnded);
      function touchHasEnded(event) { event.preventDefault();
        resetAllSectionAsButtons();
      }



    } else { // Desktop
      // NOTE: For section-as-buttons USE mouseup IN THE LESSON's OWN js FOR NAVIGATION AND OTHER TASKS » Yields a way better UX than mousedown
      let n;
      for (n = 0; n < allSectionButtonElementsAreInThisArray.length; n++) {
          allSectionButtonElementsAreInThisArray[n].addEventListener("mouseenter", ()=>{ hoverOrTouchSoundForSectionElementAsButton.play(); });
      }
    }
    // -
  } else {
    // DO NOTHING as there are no section elements in the document
  }
  // End of SECTION button handling






  //_______ See » /lessons_in_iframes/we_are_working_for_new_levels/index.html
  const allAddressButtonElementsAreInThisArray = document.getElementsByTagName("ADDRESS");
  // See if any address elements exist by checking array length » The value of zero means false in ECMAScript
  if (allAddressButtonElementsAreInThisArray.length) { // Load the sounds only and only if there are address elements found in this lesson
    // soundFileFormat exists in js_for_all_iframed_lesson_htmls where it is copied from the parent in js_for_different_browsers_and_devices
    hoverSoundForAddressElementAsButton = new parent.Howl({  src: ["/user_interface/sounds/address_as_button_hover."+soundFileFormat]  });
    clickSoundForAddressElementAsButton = new parent.Howl({  src: ["/user_interface/sounds/address_as_button_click."+soundFileFormat]  });
    // Normally, unique lesson sounds get unloaded when beforeunload in js_for_all_iframed_lesson_htmls fires unloadTheSoundsOfThisLesson
    // Here we must EITHER add these sounds to the unique sound list of the lesson OR create a dedicated unloader function
    window.addEventListener('beforeunload', function () {
      hoverSoundForAddressElementAsButton.unload();
      clickSoundForAddressElementAsButton.unload(); // There must be enough time to play the sound to the end before navigating away » Check /lessons_in_iframes/we_are_working_for_new_levels/index.html » April 2024: 700ms will be enough
    });

    // -
    let i;
    for (i = 0; i < allAddressButtonElementsAreInThisArray.length; i++)
    {
      if (deviceDetector.device == "desktop") {
        allAddressButtonElementsAreInThisArray[i].addEventListener("mouseenter", hoverOrTouchStartAddress);
        allAddressButtonElementsAreInThisArray[i].addEventListener("mouseup", mouseDownOrTouchEndAddress);
        allAddressButtonElementsAreInThisArray[i].addEventListener("mouseup", timeToMove); // Playstation style disappear
      } else {
        allAddressButtonElementsAreInThisArray[i].addEventListener("touchstart", hoverOrTouchStartAddress);
        allAddressButtonElementsAreInThisArray[i].addEventListener("touchend", mouseDownOrTouchEndAddress);
        allAddressButtonElementsAreInThisArray[i].addEventListener("touchend", timeToMove,{once:true});
      }
    }
    // -
    function timeToMove(event) {
      if (deviceDetector.device == "desktop") {
        event.target.classList.add('addThisToAButtonForPlayStationStyleClick'); // See css_for_every_single_html
      } else {
        let j;
        for (j = 0; j < allAddressButtonElementsAreInThisArray.length; j++) {
          allAddressButtonElementsAreInThisArray[j].classList.add('addThisToAButtonForPlayStationStyleClick'); // See css_for_every_single_html ,,, completes in 0.6s
        }
      }
    }
    // stopPropagation???
    function hoverOrTouchStartAddress(event) {  event.stopPropagation();  event.preventDefault();  hoverSoundForAddressElementAsButton.play();  }
    function mouseDownOrTouchEndAddress(event) {  event.stopPropagation();  event.preventDefault();  clickSoundForAddressElementAsButton.play();  } // 470ms
  } else {
    // DO NOTHING as there are no address elements in the document
  }
  // End of ADDRESS button handling




}, { once: true }); // END OF DOMContentLoaded
