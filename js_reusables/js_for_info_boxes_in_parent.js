"use strict";
// We don't want appearance sounds for any of these boxes,,, see each note below
let closeTheBoxSound;

// --- Notes shown through P elements
const willTryToSaveYourProgressNoteP = document.createElement("P"); willTryToSaveYourProgressNoteP.innerHTML = "...";
const yourProgressWasSuccessfullyLoadedNoteP = document.createElement("P"); yourProgressWasSuccessfullyLoadedNoteP.innerHTML = "...";
const maybeYouShouldReloadNoteP = document.createElement("P"); maybeYouShouldReloadNoteP.innerHTML = "...";
const neverMindThisBoxNoteP = document.createElement("P"); neverMindThisBoxNoteP.innerHTML = "...";
var safariHowToPermanentlyAllowMicP = document.createElement("P"); safariHowToPermanentlyAllowMicP.innerHTML = "..."; // See the alert() in js_for_app_initialization_in_parent
// --- Buttons made of DIV elements
const cancelButtonToCloseTheWillSaveBoxDIV = document.createElement("DIV");
cancelButtonToCloseTheWillSaveBoxDIV.innerHTML = "&#10062;"; // Default content of the OK box is a "cross ❎" mark
const proceedButtonToCloseTheWillSaveBoxDIV = document.createElement("DIV");
proceedButtonToCloseTheWillSaveBoxDIV.innerHTML = "&#9989;"; // Default content of the OK box is a "tick ✅" mark
//-
const goodButtonToUnlockSoundUnderLoadedDIV = document.createElement("DIV");
goodButtonToUnlockSoundUnderLoadedDIV.innerHTML = "&#9989;"; // Default content of the OK box is a "tick ✅" mark
//-
const keepWaitingButtonInTheReloadBoxDIV = document.createElement("DIV");
keepWaitingButtonInTheReloadBoxDIV.innerHTML = "&#10062;"; // Default content of the OK box is a "cross ❎" mark
const okLetsTryRefreshingTheBrowserBoxDIV = document.createElement("DIV");
okLetsTryRefreshingTheBrowserBoxDIV.innerHTML = "&#9989;"; // Default content of the OK box is a "tick ✅" mark
//-

// ---
window.addEventListener("DOMContentLoaded",function() {

  closeTheBoxSound = new Howl({  src: ["/user_interface/sounds/notification3_close.webm"]  });

  const pathOfSaveLoadInfoNoticeTexts = "/user_interface/text/"+userInterfaceLanguage+"/0-about_saving_loading_users_progress.txt";
  const pathOfThreeBoxClosingTexts = "/user_interface/text/"+userInterfaceLanguage+"/0-cancel_proceed_good.txt";
  const pathOfKeepWaitingOrReloadTexts = "/user_interface/text/"+userInterfaceLanguage+"/0-wait_or_reload.txt";
  fetch(pathOfSaveLoadInfoNoticeTexts,myHeaders).then(function(response){return response.text();}).then(function(contentOfTheTxtFile){  handleInfoNoticeTexts(contentOfTheTxtFile);    });
  fetch(pathOfThreeBoxClosingTexts,myHeaders).then(function(response){return response.text();}).then(function(contentOfTheTxtFile){     handleBoxClosingTexts(contentOfTheTxtFile);    });
  fetch(pathOfKeepWaitingOrReloadTexts,myHeaders).then(function(response){return response.text();}).then(function(contentOfTheTxtFile){ handleReloadDialogTexts(contentOfTheTxtFile);  });
  if (isSafari) { // Get the needed string for the alert box
    const pathOfHowToAllowMicPermanentlyOnSafariTexts = "/user_interface/text/"+userInterfaceLanguage+"/0-allow_microphone_permanently_on_safari.txt";
    fetch(pathOfHowToAllowMicPermanentlyOnSafariTexts,myHeaders).then(function(response){return response.text();}).then(function(contentOfTheTxtFile){ handleSafariMicHowToTexts(contentOfTheTxtFile);  });
  }

}, { once: true });

function handleInfoNoticeTexts(receivedTxt) {
  willTryToSaveYourProgressNoteP.innerHTML = receivedTxt.split("|")[0];
  yourProgressWasSuccessfullyLoadedNoteP.innerHTML = receivedTxt.split("|")[1];
}
function handleBoxClosingTexts(receivedTxt) {
  cancelButtonToCloseTheWillSaveBoxDIV.innerHTML = receivedTxt.split("|")[0];
  proceedButtonToCloseTheWillSaveBoxDIV.innerHTML = receivedTxt.split("|")[1];
  goodButtonToUnlockSoundUnderLoadedDIV.innerHTML = receivedTxt.split("|")[2];
}
function handleReloadDialogTexts(receivedTxt) {
  maybeYouShouldReloadNoteP.innerHTML = receivedTxt.split("|")[0];
  keepWaitingButtonInTheReloadBoxDIV.innerHTML = receivedTxt.split("|")[1];
  okLetsTryRefreshingTheBrowserBoxDIV.innerHTML = receivedTxt.split("|")[2];
  neverMindThisBoxNoteP.innerHTML = receivedTxt.split("|")[3];
}

function handleSafariMicHowToTexts(receivedTxt) {
  safariHowToPermanentlyAllowMicP.innerHTML = receivedTxt.split("|")[0]; // Get ready to put it into the alert box in js_for_app_initialization_in_parent
  if (deviceDetector.device == "desktop") {
    safariHowToPermanentlyAllowMicP.innerHTML += receivedTxt.split("|")[1];
  } else {
    safariHowToPermanentlyAllowMicP.innerHTML += receivedTxt.split("|")[2];
  }
}


/*-- Your progress will be saved box --*/
// We don't want an appearance sound because another button sound is already playing as this appears
const saveLoadInfoBoxContainerDIV = document.createElement("DIV");
const saveLoadInfoBoxItselfDIV = document.createElement("DIV");
const saveLoadInfoBoxButtonsContainerDIV = document.createElement("DIV");
function createAndHandleGoBackOrProceedBox() {
  //console.log("createAndHandleGoBackOrProceedBox fired"); //Works OK

  if (!document.body.contains(saveLoadInfoBoxContainerDIV)) {
    //console.log("document.body didn't contain saveLoadInfoBoxContainerDIV"); // Works OK
    document.body.appendChild(saveLoadInfoBoxContainerDIV);
    saveLoadInfoBoxContainerDIV.appendChild(saveLoadInfoBoxItselfDIV);
    saveLoadInfoBoxItselfDIV.appendChild(willTryToSaveYourProgressNoteP);
    saveLoadInfoBoxItselfDIV.appendChild(saveLoadInfoBoxButtonsContainerDIV);
    if (userReadsLeftToRightOrRightToLeft == "rtl") {
      saveLoadInfoBoxButtonsContainerDIV.appendChild(proceedButtonToCloseTheWillSaveBoxDIV);
      saveLoadInfoBoxButtonsContainerDIV.appendChild(cancelButtonToCloseTheWillSaveBoxDIV);
    } else {
      saveLoadInfoBoxButtonsContainerDIV.appendChild(cancelButtonToCloseTheWillSaveBoxDIV);
      saveLoadInfoBoxButtonsContainerDIV.appendChild(proceedButtonToCloseTheWillSaveBoxDIV);
    }
    //---
    saveLoadInfoBoxContainerDIV.classList.add("fullViewportBackgroundForSaveLoadBoxes"); // See css_for_info_boxes_in_parent
    saveLoadInfoBoxItselfDIV.classList.add("saveLoadRoundedInfoBox"); // See css_for_info_boxes_in_parent
    saveLoadInfoBoxButtonsContainerDIV.classList.add("twoButtonsSideBySide");
    cancelButtonToCloseTheWillSaveBoxDIV.classList.add("buttonsUnderSaveLoadInfo"); // See css_for_info_boxes_in_parent
    proceedButtonToCloseTheWillSaveBoxDIV.classList.add("buttonsUnderSaveLoadInfo"); // See css_for_info_boxes_in_parent
    if (needLatinFonts) {
      cancelButtonToCloseTheWillSaveBoxDIV.style.fontFamily = '"Oxanium SemiBold", sans-serif'; // Not the default UI font » Titillium
      proceedButtonToCloseTheWillSaveBoxDIV.style.fontFamily = '"Oxanium SemiBold", sans-serif'; // Not the default UI font » Titillium
      saveLoadInfoBoxItselfDIV.classList.add("textAlignJustifyLTR","latinLineHeightAndLetterSpacing"); // See css_for_every_single_html
      willTryToSaveYourProgressNoteP.classList.add("latinLineHeightAndLetterSpacing"); // See css_for_every_single_html
    }
    if (needHitoicJapaneseFonts) {
      saveLoadInfoBoxItselfDIV.classList.add("textAlignLeft","cjkLineHeightAndLetterSpacing"); // See css_for_every_single_html
      willTryToSaveYourProgressNoteP.classList.add("toUseWBR_withCJK","cjkLineHeightAndLetterSpacing"); // See css_for_every_single_html
    }
  } else {
    //console.log("document.body DID already contain saveLoadInfoBoxContainerDIV"); // Works OK
    saveLoadInfoBoxContainerDIV.style.display = "flex"; // Because it was set to none
    saveLoadInfoBoxContainerDIV.style.animationName = "theBlueBackgroundAppears";
  }


  return new Promise(function (resolve, reject) {
    // It's Ok if we don't remove all these EventListeners when the box is closed, yes or no?
    if (deviceDetector.isMobile) {
      cancelButtonToCloseTheWillSaveBoxDIV.addEventListener("touchend",cancelButtonIsClicked);
      proceedButtonToCloseTheWillSaveBoxDIV.addEventListener("touchend",proceedButtonIsClicked);
    }
    else {
      cancelButtonToCloseTheWillSaveBoxDIV.addEventListener("mouseup",cancelButtonIsClicked);
      proceedButtonToCloseTheWillSaveBoxDIV.addEventListener("mouseup",proceedButtonIsClicked);
    }

    function cancelButtonIsClicked() {
      closeTheBoxSound.play();
      // Play disappear animation and remove and do nothing
      hideTheSaveLoadBoxAndDismissTheNotice();
      // WHY? IT WORKED BUT » document.body.removeChild(saveLoadInfoBoxContainerDIV); was causing an error after its first usage (from 2nd time and on)
      setTimeout(function () { reject(false); },350); // Let the .then().catch() fire in js_for_app_init
    }
    function proceedButtonIsClicked() {
      closeTheBoxSound.play();
      // Play disappear animation and remove and proceed
      hideTheSaveLoadBoxAndDismissTheNotice();
      // WHY? IT WORKED BUT » document.body.removeChild(saveLoadInfoBoxContainerDIV); was causing an error after its first usage (from 2nd time and on)
      setTimeout(function () { resolve(true); },350); // Let the .then().catch() fire in js_for_app_init
    }
    function hideTheSaveLoadBoxAndDismissTheNotice() {
      saveLoadInfoBoxContainerDIV.style.animationName = "theBlueBackgroundAndTheContentsDisappear"; // Should take 330ms » See css_for_info_boxes_in_parent
      setTimeout(function () {
        saveLoadInfoBoxContainerDIV.style.animationName = "none";
        saveLoadInfoBoxContainerDIV.style.display="none"; // Try [display none] instead of [removeChild]
      }, 340);
    }

  }); // END OF return new Promise

} // END OF createAndHandleGoBackOrProceedBox


/*-- Your progress has been loaded box --*/
// We don't want an appearance sound because sound is not unlocked yet but will be so with the first user gesture on this box
const progressLoadOkNoticeBoxContainerDIV = document.createElement("DIV");
const progressLoadOkNoticeBoxItselfDIV = document.createElement("DIV");
function createAndHandleProgressHasBeenLoadedBox() { // Called if memoryCard exists in localStorage » See js_for_app_init

  progressLoadOkNoticeBoxContainerDIV.classList.add("fullViewportBackgroundForSaveLoadBoxes"); // See css_for_info_boxes_in_parent
  document.body.appendChild(progressLoadOkNoticeBoxContainerDIV);
  progressLoadOkNoticeBoxItselfDIV.classList.add("saveLoadRoundedInfoBox"); // See css_for_info_boxes_in_parent
  progressLoadOkNoticeBoxContainerDIV.appendChild(progressLoadOkNoticeBoxItselfDIV);
  progressLoadOkNoticeBoxItselfDIV.appendChild(yourProgressWasSuccessfullyLoadedNoteP);

  goodButtonToUnlockSoundUnderLoadedDIV.classList.add("buttonsUnderSaveLoadInfo"); // See css_for_info_boxes_in_parent
  if (needLatinFonts) {
    goodButtonToUnlockSoundUnderLoadedDIV.style.fontFamily = '"Oxanium SemiBold", sans-serif'; // Not the default UI font » Titillium
    progressLoadOkNoticeBoxItselfDIV.classList.add("textAlignJustifyLTR","latinLineHeightAndLetterSpacing"); // See css_for_every_single_html
    yourProgressWasSuccessfullyLoadedNoteP.classList.add("latinLineHeightAndLetterSpacing"); // See css_for_every_single_html
  }
  if (needHitoicJapaneseFonts) {
    progressLoadOkNoticeBoxItselfDIV.classList.add("textAlignLeft","cjkLineHeightAndLetterSpacing"); // See css_for_every_single_html
    yourProgressWasSuccessfullyLoadedNoteP.classList.add("toUseWBR_withCJK","cjkLineHeightAndLetterSpacing"); // See css_for_every_single_html
  }

  progressLoadOkNoticeBoxItselfDIV.appendChild(goodButtonToUnlockSoundUnderLoadedDIV);

  if (deviceDetector.isMobile) {
    goodButtonToUnlockSoundUnderLoadedDIV.addEventListener("touchend",okGoodButtonIsClicked); // Clickable only once in a session
  }
  else {
    goodButtonToUnlockSoundUnderLoadedDIV.addEventListener("mouseup",okGoodButtonIsClicked); // Clickable only once in a session
  }

  function okGoodButtonIsClicked() {
    closeTheBoxSound.play();
    // Play disappear animation and remove and do nothing
    progressLoadOkNoticeBoxContainerDIV.style.animationName = "theBlueBackgroundAndTheContentsDisappear"; // Should take 330ms » See css_for_info_boxes_in_parent
    setTimeout(function () { document.body.removeChild(progressLoadOkNoticeBoxContainerDIV); },333); // And it will never reappear until another session
  }
}


/*-- Maybe you should reload the app box box --*/
// We don't want an appearance sound because user has been watching the preloader and listening to its silence for a long time
const maybeYouShouldReloadBoxContainerDIV = document.createElement("DIV");
const maybeYouShouldReloadBoxItselfDIV = document.createElement("DIV");
const maybeYouShouldReloadBoxButtonsContainerDIV = document.createElement("DIV");
function createAndHandleMaybeYouShouldReloadBox() {

  if (!document.body.contains(maybeYouShouldReloadBoxContainerDIV)) {
    console.log("document.body didn't contain maybeYouShouldReloadBoxContainerDIV"); // Works OK
    document.body.appendChild(maybeYouShouldReloadBoxContainerDIV);
    maybeYouShouldReloadBoxContainerDIV.appendChild(maybeYouShouldReloadBoxItselfDIV);
    maybeYouShouldReloadBoxItselfDIV.appendChild(maybeYouShouldReloadNoteP);
    maybeYouShouldReloadBoxItselfDIV.appendChild(neverMindThisBoxNoteP); neverMindThisBoxNoteP.style.display = "none";
    maybeYouShouldReloadBoxItselfDIV.appendChild(maybeYouShouldReloadBoxButtonsContainerDIV);
    if (userReadsLeftToRightOrRightToLeft == "rtl") {
      maybeYouShouldReloadBoxButtonsContainerDIV.appendChild(okLetsTryRefreshingTheBrowserBoxDIV);
      maybeYouShouldReloadBoxButtonsContainerDIV.appendChild(keepWaitingButtonInTheReloadBoxDIV);
    } else {
      maybeYouShouldReloadBoxButtonsContainerDIV.appendChild(keepWaitingButtonInTheReloadBoxDIV);
      maybeYouShouldReloadBoxButtonsContainerDIV.appendChild(okLetsTryRefreshingTheBrowserBoxDIV);
    }
    //---
    maybeYouShouldReloadBoxContainerDIV.classList.add("fullViewportBackgroundForSaveLoadBoxes"); // See css_for_info_boxes_in_parent
    maybeYouShouldReloadBoxContainerDIV.style.zIndex = "11000"; // This is one of the two cases where something can be layered over the preloader, the other is the prepreloader dialog element inline in index.html
    maybeYouShouldReloadBoxItselfDIV.classList.add("saveLoadRoundedInfoBox"); // See css_for_info_boxes_in_parent
    maybeYouShouldReloadBoxButtonsContainerDIV.classList.add("twoButtonsSideBySide");
    keepWaitingButtonInTheReloadBoxDIV.classList.add("buttonsUnderSaveLoadInfo"); // See css_for_info_boxes_in_parent
    okLetsTryRefreshingTheBrowserBoxDIV.classList.add("buttonsUnderSaveLoadInfo"); // See css_for_info_boxes_in_parent
    if (needLatinFonts) {
      keepWaitingButtonInTheReloadBoxDIV.style.fontFamily = '"Oxanium SemiBold", sans-serif'; // Not the default UI font » Titillium
      okLetsTryRefreshingTheBrowserBoxDIV.style.fontFamily = '"Oxanium SemiBold", sans-serif'; // Not the default UI font » Titillium
      maybeYouShouldReloadBoxItselfDIV.classList.add("textAlignJustifyLTR","latinLineHeightAndLetterSpacing"); // See css_for_every_single_html
      maybeYouShouldReloadNoteP.classList.add("latinLineHeightAndLetterSpacing"); // See css_for_every_single_html
      neverMindThisBoxNoteP.classList.add("latinLineHeightAndLetterSpacing"); // See css_for_every_single_html
    }
    if (needHitoicJapaneseFonts) {
      maybeYouShouldReloadBoxItselfDIV.classList.add("textAlignLeft","cjkLineHeightAndLetterSpacing"); // See css_for_every_single_html
      maybeYouShouldReloadNoteP.classList.add("toUseWBR_withCJK","cjkLineHeightAndLetterSpacing"); // See css_for_every_single_html
      neverMindThisBoxNoteP.classList.add("toUseWBR_withCJK","cjkLineHeightAndLetterSpacing"); // See css_for_every_single_html
    }
  } else {
    console.log("document.body DID already contain maybeYouShouldReloadBoxContainerDIV"); // Works OK
    maybeYouShouldReloadBoxContainerDIV.style.display = "flex"; // Because it was set to none
    maybeYouShouldReloadBoxContainerDIV.style.animationName = "theBlueBackgroundAppears";
    //-- See loadWasSuccessfulDespiteTakingTooLong below
    maybeYouShouldReloadNoteP.style.display = "block";
    neverMindThisBoxNoteP.style.display = "none";
    maybeYouShouldReloadBoxButtonsContainerDIV.style.display = "flex"; // NOT block BUT flex !!!
  }

  // We are NOT going to use a promise since nothing is pending for user's choice
  if (deviceDetector.isMobile) {
    keepWaitingButtonInTheReloadBoxDIV.addEventListener("touchend",waitButtonIsClicked);
    okLetsTryRefreshingTheBrowserBoxDIV.addEventListener("touchend",reloadButtonIsClicked);
  }
  else {
    keepWaitingButtonInTheReloadBoxDIV.addEventListener("mouseup",waitButtonIsClicked);
    okLetsTryRefreshingTheBrowserBoxDIV.addEventListener("mouseup",reloadButtonIsClicked);
  }

  function waitButtonIsClicked() {
    closeTheBoxSound.play();
    // Play disappear animation and remove and do nothing
    hideWouldYouLikeToRestartTheAppBox();
  }
  function reloadButtonIsClicked() {
    closeTheBoxSound.play();
    // Play disappear animation and remove and REFRESH
    hideWouldYouLikeToRestartTheAppBox();
    setTimeout(function () {  itIsAlreadyCertainThatUserWantsToReload = true;  location.reload();  }, 350); // See js_for_app_initialization_in_parent » Better if onbeforeunload is bypassed in this case
  }

}

function hideWouldYouLikeToRestartTheAppBox() {
  maybeYouShouldReloadBoxContainerDIV.style.animationName = "theBlueBackgroundAndTheContentsDisappear"; // Should take 330ms » See css_for_info_boxes_in_parent
  setTimeout(function () {
    maybeYouShouldReloadBoxContainerDIV.style.animationName = "none";
    maybeYouShouldReloadBoxContainerDIV.style.display="none"; // Use [display none] instead of [removeChild]
    maybeYouShouldReloadBoxIsNowBeingDisplayed = false; // See js_for_app_initialization_in_parent
  }, 340);
}

function loadWasSuccessfulDespiteTakingTooLong() {
  maybeYouShouldReloadNoteP.style.display = "none";
  neverMindThisBoxNoteP.style.display = "block";
  maybeYouShouldReloadBoxButtonsContainerDIV.style.display = "none"; // Hide the buttons before completely disappearing
  setTimeout(function () {
    hideWouldYouLikeToRestartTheAppBox();
  }, 2000); // Let user read the [Never mind] statement for a moment
}
