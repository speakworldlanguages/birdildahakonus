const theButtonForSkippingSpeechInputVocabularyTest = document.getElementById('theTextInsideSkipNextButtonID');
const filePathForGiveUpButtonInnerHTML = "/user_interface/text/"+userInterfaceLanguage+"/0-give_up_and_skip.txt";
const filePathForNextButtonInnerHTML = "/user_interface/text/"+userInterfaceLanguage+"/0-continue_to_next.txt";

// Let “no web-speech browser” users quickly skip to the speech recognition cancellation
//var howLongBeforeGiveUpButtonAppears; // This is called from bread.js, water.js etc // DEPRECATION: Move this to each lesson’s own js
if (parent.isTheUsersBrowserWhitelisted) {
  //howLongBeforeGiveUpButtonAppears = 33000; // For Chrome and other full-feature, white-listed browsers // DEPRECATION: Move this to each lesson’s own js
  fetch(filePathForGiveUpButtonInnerHTML).then(function(response){return response.text();}).then(function(contentOfTheTxtFile){ theButtonForSkippingSpeechInputVocabularyTest.innerHTML = contentOfTheTxtFile; });
} else {
  //howLongBeforeGiveUpButtonAppears = 3300; // DEPRECATION: Move this to each lesson’s own js
  fetch(filePathForNextButtonInnerHTML).then(function(response){return response.text();}).then(function(contentOfTheTxtFile){ theButtonForSkippingSpeechInputVocabularyTest.innerHTML = contentOfTheTxtFile; });
}

function giveUpButtonIsClickedFunction() { // Called inline. See any lesson html that contains a give up button.
  userHasGivenUp = true; /*This makes success tone "not play" before proceeding to the next lesson.*/
  setTimeout(function () {    stopListeningAndProceedToNext();    },100);
}
