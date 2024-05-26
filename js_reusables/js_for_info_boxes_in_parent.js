"use strict";
// Code written by Manheart Earthman=B. A. Bilgekılınç Topraksoy=土本 智一勇夫剛志
// This file MAY NOT BE MODIFIED WITHOUT CONSENT i.e. OFFICIAL AUTHORIZATION

// We don't want appearance sounds for any of these boxes,,, see each note below
let closeTheBox_OK_Sound;
let closeTheBox_CANCEL_Sound;

// --- Notes shown through P elements
const willTryToSaveYourProgressNoteP = document.createElement("P"); willTryToSaveYourProgressNoteP.innerHTML = "…";
const yourProgressWasSuccessfullyLoadedNoteP = document.createElement("P"); yourProgressWasSuccessfullyLoadedNoteP.innerHTML = "…";
const maybeYouShouldReloadNoteP = document.createElement("P"); maybeYouShouldReloadNoteP.innerHTML = "…";
const neverMindThisBoxNoteP = document.createElement("P"); neverMindThisBoxNoteP.innerHTML = "…";


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
window.addEventListener("DOMContentLoaded",function() { // QUESTION: Could DOMContentLoaded still be too early for deviceDetector at parent level? A: Not if js_for_info_boxes_in_parent is listed after js_for_different_browsers_and_devices
  // soundFileFormat exists in js_for_different_browsers_and_devices
  closeTheBox_OK_Sound = new Howl({  src: ["/user_interface/sounds/option_positive."+soundFileFormat]  }); // See js_for_different_browsers_and_devices to find soundFileFormat
  closeTheBox_CANCEL_Sound = new Howl({  src: ["/user_interface/sounds/option_negative."+soundFileFormat]  });
  // -
  const pathOfSaveLoadInfoNoticeTexts = "/user_interface/text/"+userInterfaceLanguage+"/0-about_saving_loading_users_progress.txt";
  const pathOfThreeBoxClosingTexts = "/user_interface/text/"+userInterfaceLanguage+"/0-cancel_proceed_good.txt";
  const pathOfKeepWaitingOrReloadTexts = "/user_interface/text/"+userInterfaceLanguage+"/0-wait_or_reload.txt";
  fetch(pathOfSaveLoadInfoNoticeTexts,myHeaders).then(function(response){return response.text();}).then(function(contentOfTheTxtFile){    handleInfoNoticeTexts(contentOfTheTxtFile);   getNextFile1();  });
  function getNextFile1() {
    fetch(pathOfThreeBoxClosingTexts,myHeaders).then(function(response){return response.text();}).then(function(contentOfTheTxtFile){     handleBoxClosingTexts(contentOfTheTxtFile);   getNextFile2();  });
  }

  function getNextFile2() {
    fetch(pathOfKeepWaitingOrReloadTexts,myHeaders).then(function(response){return response.text();}).then(function(contentOfTheTxtFile){ handleReloadDialogTexts(contentOfTheTxtFile); getNextFile3();  });
  }

  function getNextFile3() {

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
      // cancelButtonToCloseTheWillSaveBoxDIV.addEventListener("touchend",cancelButtonIsTouchedOrClicked);
      // proceedButtonToCloseTheWillSaveBoxDIV.addEventListener("touchend",proceedButtonIsTouchedOrClicked);
      // It looks like we have to avoid adding duplicate event listeners everytime createAndHandleGoBackOrProceedBox is called
      cancelButtonToCloseTheWillSaveBoxDIV.ontouchend = cancelButtonIsTouchedOrClicked;
      proceedButtonToCloseTheWillSaveBoxDIV.ontouchend = proceedButtonIsTouchedOrClicked;
    }
    else {
      // cancelButtonToCloseTheWillSaveBoxDIV.addEventListener("mouseup",cancelButtonIsTouchedOrClicked);
      // proceedButtonToCloseTheWillSaveBoxDIV.addEventListener("mouseup",proceedButtonIsTouchedOrClicked);
      // It looks like we have to avoid adding duplicate event listeners everytime createAndHandleGoBackOrProceedBox is called
      cancelButtonToCloseTheWillSaveBoxDIV.onmouseup = cancelButtonIsTouchedOrClicked;
      proceedButtonToCloseTheWillSaveBoxDIV.onmouseup = proceedButtonIsTouchedOrClicked;
    }

    function cancelButtonIsTouchedOrClicked() {
      closeTheBox_CANCEL_Sound.play();
      // Play disappear animation and remove and do nothing
      hideTheSaveLoadBoxAndDismissTheNotice();
      // WHY? IT WORKED BUT » document.body.removeChild(saveLoadInfoBoxContainerDIV); was causing an error after its first usage (from 2nd time and on)
      setTimeout(function () { reject(false); },350); // Let the .then().catch() fire in js_for_the_parent_all_browsers_all_devices
    }
    function proceedButtonIsTouchedOrClicked() {
      closeTheBox_OK_Sound.play();
      // Play disappear animation and remove and proceed
      hideTheSaveLoadBoxAndDismissTheNotice();
      // WHY? IT WORKED BUT » document.body.removeChild(saveLoadInfoBoxContainerDIV); was causing an error after its first usage (from 2nd time and on)
      setTimeout(function () { resolve(true); },350); // Let the .then().catch() fire in js_for_the_parent_all_browsers_all_devices
    }
    function hideTheSaveLoadBoxAndDismissTheNotice() {
      saveLoadInfoBoxContainerDIV.style.animationName = "theBlueBackgroundAndTheContentsDisappear"; // Should take 330ms » See css_for_info_boxes_in_parent
      setTimeout(function () {
        saveLoadInfoBoxContainerDIV.style.animationName = "none";
        saveLoadInfoBoxContainerDIV.style.display="none"; // Try [display none] instead of [removeChild] OK
      }, 340);
    }

  }); // END OF return new Promise

} // END OF createAndHandleGoBackOrProceedBox


/*-- Your progress has been loaded box --*/
// We don't want an appearance sound because sound is not unlocked yet but will be so with the first user gesture on this box
const progressLoadOkNoticeBoxContainerDIV = document.createElement("DIV");
const progressLoadOkNoticeBoxItselfDIV = document.createElement("DIV");
function createAndHandleProgressHasBeenLoadedBox() { // Called if memoryCard exists in localStorage » See js_for_the_parent_all_browsers_all_devices

  if (!document.body.contains(progressLoadOkNoticeBoxContainerDIV)) {
    document.body.appendChild(progressLoadOkNoticeBoxContainerDIV);
    progressLoadOkNoticeBoxContainerDIV.appendChild(progressLoadOkNoticeBoxItselfDIV);
    progressLoadOkNoticeBoxItselfDIV.appendChild(yourProgressWasSuccessfullyLoadedNoteP);
    progressLoadOkNoticeBoxItselfDIV.appendChild(goodButtonToUnlockSoundUnderLoadedDIV);
  }
  // ---
  progressLoadOkNoticeBoxContainerDIV.style.display = "flex"; // CAUTION: It's not block, it's flex » Necessary with the second call and later
  progressLoadOkNoticeBoxContainerDIV.classList.add("fullViewportBackgroundForSaveLoadBoxes"); // See css_for_info_boxes_in_parent
  progressLoadOkNoticeBoxItselfDIV.classList.add("saveLoadRoundedInfoBox"); // See css_for_info_boxes_in_parent
  goodButtonToUnlockSoundUnderLoadedDIV.classList.add("buttonsUnderSaveLoadInfo"); // See css_for_info_boxes_in_parent
  // ---
  if (needLatinFonts) {
    goodButtonToUnlockSoundUnderLoadedDIV.style.fontFamily = '"Oxanium SemiBold", sans-serif'; // Not the default UI font » Titillium
    progressLoadOkNoticeBoxItselfDIV.classList.add("textAlignJustifyLTR","latinLineHeightAndLetterSpacing"); // See css_for_every_single_html
    yourProgressWasSuccessfullyLoadedNoteP.classList.add("latinLineHeightAndLetterSpacing"); // See css_for_every_single_html
  }
  if (needHitoicJapaneseFonts) {
    progressLoadOkNoticeBoxItselfDIV.classList.add("textAlignLeft","cjkLineHeightAndLetterSpacing"); // See css_for_every_single_html
    yourProgressWasSuccessfullyLoadedNoteP.classList.add("toUseWBR_withCJK","cjkLineHeightAndLetterSpacing"); // See css_for_every_single_html
  }
  // ---
  if (deviceDetector.isMobile) {
    goodButtonToUnlockSoundUnderLoadedDIV.addEventListener("touchend",okGoodButtonIsClicked); // Clickable only once in a session
  }
  else {
    goodButtonToUnlockSoundUnderLoadedDIV.addEventListener("mouseup",okGoodButtonIsClicked); // Clickable only once in a session
  }

  function okGoodButtonIsClicked() {
    closeTheBox_OK_Sound.play();
    // Play disappear animation and get ready for a new call
    progressLoadOkNoticeBoxContainerDIV.style.animationName = "theBlueBackgroundAndTheContentsDisappear"; // Should take 330ms » See css_for_info_boxes_in_parent
    setTimeout(function () {
      progressLoadOkNoticeBoxContainerDIV.style.animationName = "";
      progressLoadOkNoticeBoxContainerDIV.classList.remove("fullViewportBackgroundForSaveLoadBoxes"); // See css_for_info_boxes_in_parent
      progressLoadOkNoticeBoxContainerDIV.style.display = "none";
      // Do not use remove() as it may be needed many times
    },333); // And it will never reappear until another session
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
    // ????_Sound.play();
    // Play disappear animation and remove and do nothing
    hideWouldYouLikeToRestartTheAppBox();
  }
  function reloadButtonIsClicked() {
    // ????_Sound.play();
    // Play disappear animation and remove and REFRESH
    hideWouldYouLikeToRestartTheAppBox();
    setTimeout(function () {  itIsAlreadyCertainThatUserWantsToReload = true;  location.reload();  }, 350); // See js_for_the_parent_all_browsers_all_devices » Better if onbeforeunload is bypassed in this case
  }

}

function hideWouldYouLikeToRestartTheAppBox() {
  maybeYouShouldReloadBoxContainerDIV.style.animationName = "theBlueBackgroundAndTheContentsDisappear"; // Should take 330ms » See css_for_info_boxes_in_parent
  setTimeout(function () {
    maybeYouShouldReloadBoxContainerDIV.style.animationName = "none";
    maybeYouShouldReloadBoxContainerDIV.style.display="none"; // Use [display none] instead of [removeChild]
  }, 340);
}

function loadWasSuccessfulDespiteTakingTooLong() { // Called by stopTheTimerToSeeIfNextLessonLoadedFastEnough
  maybeYouShouldReloadNoteP.style.display = "none";
  neverMindThisBoxNoteP.style.display = "block";
  maybeYouShouldReloadBoxButtonsContainerDIV.style.display = "none"; // Hide the buttons before completely disappearing
  setTimeout(function () {
    hideWouldYouLikeToRestartTheAppBox();
  }, 2000); // Let user read the [Never mind] statement for a moment
}




// WHAT HAS TO BE DOWNLOADED AND READY BEFORE THE OCCURENCE ANY POSSIBLE CONNECTIVITY MISHAP
// Start with pure black avif 16px by 16px » Tested it works!
let base64StringForInternetIsNeededImage = "AAAAHGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZgAAAOptZXRhAAAAAAAAACFoZGxyAAAAAAAAAABwaWN0AAAAAAAAAAAAAAAAAAAAAA5waXRtAAAAAAABAAAAImlsb2MAAAAAREAAAQABAAAAAAEOAAEAAAAAAAAAGAAAACNpaW5mAAAAAAABAAAAFWluZmUCAAAAAAEAAGF2MDEAAAAAamlwcnAAAABLaXBjbwAAABNjb2xybmNseAABAA0ABoAAAAAMYXYxQ4EADAAAAAAUaXNwZQAAAAAAAAAQAAAAEAAAABBwaXhpAAAAAAMICAgAAAAXaXBtYQAAAAAAAAABAAEEgYIDhAAAACBtZGF0EgAKCRgM/9kgIaDQgDIJH/AAAEAAAKmH";
let base64StringForInternetIsFoundImage = base64StringForInternetIsNeededImage;
let theAppNeedsInternetBoxTextsInKnownLanguage = "OFFLINE 💢|ONLINE 📶|▷▷▷"; // Monolingual » Get the actual text from txt file and use it instead of this default.
// -
// Get the actual texts from txt files and use them instead of these defaults.
let theAppIsPausedDialogBoxTextsInKnownLanguage = "⦙⦙|▷"; // Bilingual
let theAppIsPausedDialogBoxTextsInTaughtLanguage = "⋮⋮|▶️"; // Bilingual
// -
var base64StringForVideoPosterFrame1 = "iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAAAAAA6mKC9AAAACXBIWXMAAAsTAAALEwEAmpwYAAADGGlDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjaY2BgnuDo4uTKJMDAUFBUUuQe5BgZERmlwH6egY2BmYGBgYGBITG5uMAxIMCHgYGBIS8/L5UBFTAyMHy7xsDIwMDAcFnX0cXJlYE0wJpcUFTCwMBwgIGBwSgltTiZgYHhCwMDQ3p5SUEJAwNjDAMDg0hSdkEJAwNjAQMDg0h2SJAzAwNjCwMDE09JakUJAwMDg3N+QWVRZnpGiYKhpaWlgmNKflKqQnBlcUlqbrGCZ15yflFBflFiSWoKAwMD1A4GBgYGXpf8EgX3xMw8BSMDVQYqg4jIKAUICxE+CDEESC4tKoMHJQODAIMCgwGDA0MAQyJDPcMChqMMbxjFGV0YSxlXMN5jEmMKYprAdIFZmDmSeSHzGxZLlg6WW6x6rK2s99gs2aaxfWMPZ9/NocTRxfGFM5HzApcj1xZuTe4FPFI8U3mFeCfxCfNN45fhXyygI7BD0FXwilCq0A/hXhEVkb2i4aJfxCaJG4lfkaiQlJM8JpUvLS19QqZMVl32llyfvIv8H4WtioVKekpvldeqFKiaqP5UO6jepRGqqaT5QeuA9iSdVF0rPUG9V/pHDBYY1hrFGNuayJsym740u2C+02KJ5QSrOutcmzjbQDtXe2sHY0cdJzVnJRcFV3k3BXdlD3VPXS8Tbxsfd99gvwT//ID6wIlBS4N3hVwMfRnOFCEXaRUVEV0RMzN2T9yDBLZE3aSw5IaUNak30zkyLDIzs+ZmX8xlz7PPryjYVPiuWLskq3RV2ZsK/cqSql01jLVedVPrHzbqNdU0n22VaytsP9op3VXUfbpXta+x/+5Em0mzJ/+dGj/t8AyNmf2zvs9JmHt6vvmCpYtEFrcu+bYsc/m9lSGrTq9xWbtvveWGbZtMNm/ZarJt+w6rnft3u+45uy9s/4ODOYd+Hmk/Jn58xUnrU+fOJJ/9dX7SRe1LR68kXv13fc5Nm1t379TfU75/4mHeY7En+59lvhB5efB1/lv5dxc+NH0y/fzq64Lv4T8Ffp360/rP8f9/AA0ADzT6lvFdAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAA6SURBVHjaYvzPgAqYGOghwMKw/LfxM9mzorx3rO7x32OIYGL4/5+Fke3f37//2Zi4f/5nYBwYhwEGAI5wESoE7KR0AAAAAElFTkSuQmCC"; // 16x16 png works OK
var base64StringForVideoPosterFrame2 = base64StringForVideoPosterFrame1; // See index.html of each lesson
var base64StringForVideoPosterFrame3 = base64StringForVideoPosterFrame1; // See index.html of each lesson
// -
var slowNetworkWarningText = "💢 📶 💢"; // To be overwritten by fetch // See js_for_all_iframed_lesson_htmls
window.addEventListener("load",function() {

  // --- Get the files ready
  const filePathForHeyYourConnectionIsTooSlow = "/user_interface/text/"+userInterfaceLanguage+"/0-when_internet_is_available_but_too_slow.txt";
  fetch(filePathForHeyYourConnectionIsTooSlow,myHeaders).then(function(response){return response.text();}).then(function(contentOfTheTxtFile){
    slowNetworkWarningText = contentOfTheTxtFile;
  }).catch(error => { console.error('Problem with fetch:', error); }).finally(() => { startTheFetchChain(); });
  // --
  function startTheFetchChain() {
    const filePathForAppIsPausedBoxWithResumeButtonInKnownLanguage = "/user_interface/text/"+userInterfaceLanguage+"/0-is_paused_message_and_unpause_button.txt";
    fetch(filePathForAppIsPausedBoxWithResumeButtonInKnownLanguage,myHeaders).then(function(response){return response.text();}).then(function(contentOfTheTxtFile){ theAppIsPausedDialogBoxTextsInKnownLanguage = contentOfTheTxtFile; })
    .catch(error => { console.error('Problem with fetch:', error); }).finally(() => { getFile1(); });
  }
  // --
  function getFile1() {
    fetch("/user_interface/images/video_poster_frames/video_poster_frame_1.png").then(response => response.blob()).then(blob => {
        const reader = new FileReader();
        reader.onload = () => {      base64StringForVideoPosterFrame1 = reader.result.split(',')[1];     };
        reader.readAsDataURL(blob);
    }).catch(error => { console.error('Problem with fetch:', error); }).finally(() => { getFile2(); });
  }
  function getFile2() {
    fetch("/user_interface/images/video_poster_frames/video_poster_frame_2.png").then(response => response.blob()).then(blob => {
        const reader = new FileReader();
        reader.onload = () => {      base64StringForVideoPosterFrame2 = reader.result.split(',')[1];     };
        reader.readAsDataURL(blob);
    }).catch(error => { console.error('Problem with fetch:', error); }).finally(() => { getFile3(); });
  }
  function getFile3() {
    fetch("/user_interface/images/video_poster_frames/video_poster_frame_3.png").then(response => response.blob()).then(blob => {
        const reader = new FileReader();
        reader.onload = () => {      base64StringForVideoPosterFrame3 = reader.result.split(',')[1];     };
        reader.readAsDataURL(blob);
    }).catch(error => { console.error('Problem with fetch:', error); }).finally(() => { nowGetThisFile(); });
  }
  // --
  function nowGetThisFile() {
    fetch("/user_interface/images/internet_is_needed.avif").then(response => response.blob()).then(blob => {
        const reader = new FileReader();
        reader.onload = () => {      base64StringForInternetIsNeededImage = reader.result.split(',')[1];     };
        reader.readAsDataURL(blob);
    }).catch(error => { console.error('Problem with fetch:', error); }).finally(() => { andGetTheNextFile(); });
  }
  function andGetTheNextFile() {
    fetch("/user_interface/images/internet_is_found.avif").then(response => response.blob()).then(blob => {
        const reader = new FileReader();
        reader.onload = () => {      base64StringForInternetIsFoundImage = reader.result.split(',')[1];      };
        reader.readAsDataURL(blob);
    }).catch(error => { console.error('Problem with fetch:', error); }).finally(() => { andGetTheOtherFileToo(); });
  }
  function andGetTheOtherFileToo() {
    const filePathForTheAppNeedsInternet = "/user_interface/text/"+userInterfaceLanguage+"/0-when_internet_connectivity_is_lost.txt";
    fetch(filePathForTheAppNeedsInternet,myHeaders).then(function(response){return response.text();}).then(function(contentOfTheTxtFile){ theAppNeedsInternetBoxTextsInKnownLanguage = contentOfTheTxtFile; })
    .catch(error => { console.error('Problem with fetch:', error); }).finally(() => { andThisOneAsWell(); });
  }
  // --
  function andThisOneAsWell() {
    let checkerTicker = setInterval(function () {
      if (langCodeForTeachingFilePaths) { // When it is not undefined anymore i.e. when user has chosen the language he|she wants to learn
        clearInterval(checkerTicker);
        // See js_for_every_single_html.js for the fetch headers thingy.
        // See js_for_the_parent_all_browsers_all_devices to find langCodeForTeachingFilePaths
        // As of August 2023 this is the only case in which langCodeForTeachingFilePaths is used for fetching txt at parent level
        // CAUTION: langCodeForTeachingFilePaths will be UNDEFINED until user chooses the language he|she wants to learn
        // THEREFORE: We cannot get the text file before user langCodeForTeachingFilePaths is set to something
        // SO HERE WE ARE: using a relaxed setInterval whose callback function will check if langCodeForTeachingFilePaths is now defined and clear the interval as soon as it is set
        const taughtLanguage = langCodeForTeachingFilePaths.substr(0,2); // en_east en_west will use the same user interface text folder
        if (taughtLanguage=="tr") {    myHeaders.set('Content-Type','text/plain; charset=iso-8859-9');    } // See js_for_every_single_html

        const filePathForAppIsPausedBoxWithResumeButtonInTaughtLanguage = "/user_interface/text/"+taughtLanguage+"/0-is_paused_message_and_unpause_button.txt";
        fetch(filePathForAppIsPausedBoxWithResumeButtonInTaughtLanguage,myHeaders).then(function(response){return response.text();}).then(function(contentOfTheTxtFile){ theAppIsPausedDialogBoxTextsInTaughtLanguage = contentOfTheTxtFile; })
        .catch(error => { console.error('Problem with fetch:', error); }).finally(() => { /*No more files*/ });
      }
    }, 4000);
  }

}, { once: true });



// DIALOG BOX to be shown when the app is paused
// _________ See js_for_the_sliding_navigation_menu » pauseTheAppFunction
function createAndHandleTheAppIsPausedBox(whyWillTheAppBePaused) { // THIS LOOKS OK WITHOUT someElement.classList.add("toUseWBR_withCJK","cjkLineHeightAndLetterSpacing"); // See css_for_every_single_html
  // As of September 2023 whyWillTheAppBePaused is never used but is ready to be implemented in the future if it becomes necessary to display different texts for different situations
  return new Promise(resolve => {


    // NOTE: theAppIsPausedDialogBoxTextsInKnownLanguage and theAppIsPausedDialogBoxTextsInTaughtLanguage are downloaded after window load fires » See above


    // CREATE A CUSTOM bilingual "App is paused" box with a "Continue" button using: theAppIsPausedDialogBoxTextsInKnownLanguage
    const darkenWholeViewportDiv = document.createElement("DIV");
    darkenWholeViewportDiv.classList.add("darkenTheWholeViewportClass"); // css_for_the_container_parent_html
    document.body.appendChild(darkenWholeViewportDiv);
    const theAppIsPausedBox = document.createElement("DIV");
    theAppIsPausedBox.classList.add("theAppIsPausedBoxFiftyFiftyCentered"); // css_for_info_boxes_in_parent
    document.body.appendChild(theAppIsPausedBox);
    const theAppIsPausedMessage1 = document.createElement("P");
    theAppIsPausedMessage1.innerHTML = theAppIsPausedDialogBoxTextsInTaughtLanguage.split("|")[0];
    theAppIsPausedBox.appendChild(theAppIsPausedMessage1);
    const theAppIsPausedMessage2 = document.createElement("P");
    theAppIsPausedMessage2.innerHTML = "(" + theAppIsPausedDialogBoxTextsInKnownLanguage.split("|")[0] + ")";
    theAppIsPausedBox.appendChild(theAppIsPausedMessage2);

    const unpauseButton = document.createElement("DIV");
    unpauseButton.classList.add("buttonsUnderSaveLoadInfo"); // See css_for_info_boxes_in_parent
    // DEPRECATE unpauseButton.innerHTML = " " + theAppIsPausedDialogBoxTextsInTaughtLanguage.split("|")[1] + " <wbr> (" + theAppIsPausedDialogBoxTextsInKnownLanguage.split("|")[1] + ") ";
    unpauseButton.innerHTML = "<span style='white-space: nowrap;'>&nbsp;" + theAppIsPausedDialogBoxTextsInTaughtLanguage.split("|")[1] + "&nbsp;</span>" + " " + "<span style='white-space: nowrap;'>&nbsp;(" + theAppIsPausedDialogBoxTextsInKnownLanguage.split("|")[1] + ")&nbsp;</span>";
    theAppIsPausedBox.appendChild(unpauseButton);
    /* DEPRECATE
    function updateTheBox() { // USE IF NECESSARY: <span style='white-space: nowrap;'></span>
      theAppIsPausedMessage1.innerHTML = theAppIsPausedDialogBoxTextsInTaughtLanguage.split("|")[0];
      theAppIsPausedMessage2.innerHTML = "(" + theAppIsPausedDialogBoxTextsInKnownLanguage.split("|")[0] + ")";
    }
    */

    // When user clicks|touches [UNPAUSE] button to continue
    if (deviceDetector.isMobile) {
      unpauseButton.addEventListener("touchstart",removeThePromptAndResolve,{once:true});
    } else {
      unpauseButton.addEventListener("mousedown",removeThePromptAndResolve,{once:true});
    }
    function removeThePromptAndResolve() {
      unpauseButton.remove(); theAppIsPausedMessage2.remove(); theAppIsPausedMessage1.remove();
      theAppIsPausedBox.remove();
      darkenWholeViewportDiv.remove();
      resolve();
    }
  }); // END OF Promise
} // END OF function createAndHandleTheAppIsPausedBox


// ___
function createAndHandleInternetConnectivityIsLostBox() { // See js_for_speech_recognition_algorithm

  return new Promise(resolve => {

    const darkenWholeViewportDiv = document.createElement("DIV");
    darkenWholeViewportDiv.classList.add("darkenTheWholeViewportClass"); // css_for_the_container_parent_html
    document.body.appendChild(darkenWholeViewportDiv);
    const theAppIsPausedBox = document.createElement("DIV");
    theAppIsPausedBox.classList.add("theAppIsPausedBoxFiftyFiftyCentered"); // css_for_info_boxes_in_parent
    document.body.appendChild(theAppIsPausedBox);
    // -
    const theAppNeedsInternetImg = document.createElement("IMG");
    theAppNeedsInternetImg.src = 'data:image/avif;base64,' + base64StringForInternetIsNeededImage; // Downloaded and converted when window load fires

    const theAppHasDetectedInternetImg = document.createElement("IMG");
    theAppHasDetectedInternetImg.src = 'data:image/avif;base64,' + base64StringForInternetIsFoundImage; // Downloaded and converted when window load fires

    theAppNeedsInternetImg.classList.add("imagesInsideTheAppIsPausedBox"); // css_for_info_boxes_in_parent
    theAppHasDetectedInternetImg.classList.add("imagesInsideTheAppIsPausedBox"); // css_for_info_boxes_in_parent

    theAppIsPausedBox.appendChild(theAppNeedsInternetImg);
    theAppHasDetectedInternetImg.style.display = "none";
    theAppIsPausedBox.appendChild(theAppHasDetectedInternetImg);

    const theAppNeedsInternetMessage = document.createElement("P");
    theAppNeedsInternetMessage.innerHTML = theAppNeedsInternetBoxTextsInKnownLanguage.split("|")[0]; // Actual texts are expected to be downloaded when window load fires
    theAppIsPausedBox.appendChild(theAppNeedsInternetMessage);

    const returnButton = document.createElement("DIV");
    returnButton.classList.add("buttonsUnderSaveLoadInfo"); // See css_for_info_boxes_in_parent // CAUTION display:flex
    returnButton.innerHTML = theAppNeedsInternetBoxTextsInKnownLanguage.split("|")[2]; // Actual texts are expected to be downloaded when window load fires
    theAppIsPausedBox.appendChild(returnButton);
    returnButton.style.visibility = "hidden";


    let waitingForInternet = true;
    let checkConnectionInterval = setInterval(function () {
      if (internetConnectivityIsNiceAndUsable) {
        // LET IT CONTINUE TICKING without clearing the interval ,,, We want to let it be stopped by the button click|touch ONLY
        // BECAUSE in case the connectivity is unstable and is lost again shortly after reconnecting we want to go back to displaying "internet_is_needed" image and "You are offline" text and make the button invisible
        if (waitingForInternet) {
          theAppNeedsInternetImg.style.display = "none";
          theAppHasDetectedInternetImg.style.display = "block";
          theAppNeedsInternetMessage.innerHTML = theAppNeedsInternetBoxTextsInKnownLanguage.split("|")[1];
          returnButton.style.visibility = "visible";
          waitingForInternet = false;
        }
      } else {
        if (!waitingForInternet) {
          theAppNeedsInternetImg.style.display = "block";
          theAppHasDetectedInternetImg.style.display = "none";
          theAppNeedsInternetMessage.innerHTML = theAppNeedsInternetBoxTextsInKnownLanguage.split("|")[0];
          returnButton.style.visibility = "hidden";
          waitingForInternet = true;
        }
      }
    }, 500);

    // When user clicks|touches the button to continue
    if (deviceDetector.isMobile) {
      returnButton.addEventListener("touchstart",removeTheBoxAndResolve,{once:true});
    } else {
      returnButton.addEventListener("mousedown",removeTheBoxAndResolve,{once:true});
    }
    function removeTheBoxAndResolve() {
      clearInterval(checkConnectionInterval);
      returnButton.remove(); theAppNeedsInternetMessage.remove(); theAppHasDetectedInternetImg.remove(); theAppNeedsInternetImg.remove();
      theAppIsPausedBox.remove();
      darkenWholeViewportDiv.remove();
      resolve(); // As we hope that connection won't be lost after speech recognition session starts
      // CONSIDER what if it does??? MAYBE that can be handled too somehow in the future
      // FOR THE TIME BEING we will assume that such a situation would be a very very rare case
    }

  }); // END OF Promise

} // END OF function createAndHandleInternetConnectivityIsLostBox
