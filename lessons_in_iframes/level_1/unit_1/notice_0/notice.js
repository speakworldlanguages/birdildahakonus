// TEXT TO BE INJECTED “SLOWLY” INTO P ELEMENTS
let whatTheAuthorHasToSay115 = " "; // CAUTION & WARNING: If fetch() is delayed because of slow network this would be UNDEFINED for a while unless set to empty space!
// NOTE: DEPRECATED! » “myHeaders” variable exists in "../../../../js_reusables/js_for_fetch_api_character_encoding.js"
// NOTE: “userInterfaceLanguage” variable exists in "../../../../js_reusables/js_for_every_single_html.js"
let filePathForAuthorsMessage;
let filePathForWhatToPutIntoTheButton;

// Wait until all images and other js variables are ready with the 'load' event.
// ESPECIALLY wait for userInterfaceLanguage in js_for_every_single_html.js
window.addEventListener('load', function(){
  if (deviceDetector.device == "tablet") {
      tabletDisplay.classList.add("fadeIn");
  }
  else if (deviceDetector.device == "phone") {
      phoneDisplay.classList.add("fadeIn");
  }
  else {
      desktopDisplay.classList.add("fadeIn");
  }
  /*_________END OF UI HANDLING__________*/
  filePathForAuthorsMessage  = "/user_interface/text/"+userInterfaceLanguage+"/1-1-5_author_says.txt";
  fetch(filePathForAuthorsMessage,myHeaders).then(function(response){return response.text();}).then(function(contentOfTheTxtFile){
    whatTheAuthorHasToSay115 = contentOfTheTxtFile;
    // ANIMATE TEXT
    let i = 1;
    function updateTheTextFunction115() {
        let visibleText = whatTheAuthorHasToSay115.substring(0, i); // CAUTION & WARNING: If fetch() is delayed because of slow network “whatTheAuthorHasToSay115” could be UNDEFINED for a while!
        document.getElementById("putTheWordsInHereP").innerHTML = visibleText;
    }
    let timer115 = setInterval(function(){
        updateTheTextFunction115();
        if (i >= whatTheAuthorHasToSay115.length) {
          clearInterval(timer115);
        }
        i++;
    }, 60);
  });
  // TRICK: Although the same ID is used three times, the removal of two of them will already have taken place by the time fetch() gets the file.
  filePathForWhatToPutIntoTheButton  = "/user_interface/text/"+userInterfaceLanguage+"/0-continue_to_next.txt";
  fetch(filePathForWhatToPutIntoTheButton,myHeaders).then(function(response){return response.text();}).then(function(contentOfTheTxtFile){  document.getElementById('putTextIntoThisGoToNextButton').innerHTML = contentOfTheTxtFile; });

}, { once: true });
// The 1-1-5.txt file should read one of the following (depending on the UI language)
//TR: "Az önce gördüğün bu ekmeği evde kendim pişirdim.";
//EN: "I baked this bread myself at home.";
//JA: "先に見えたそのパンは私が家で作りました。";


//function unloadTheSoundsOfThisLesson() {  /*Nothing to do*/  } // This has to exist here.
//function unloadTheImagesOfThisLesson() {  /*Could try to unload the bread webp and tsuchimoto webp if necessary*/  } // This has to exist here.

function proceedToNextLesson115() { /*This is called with an inline onclick inside the button element. See notice_0/index.html */
  document.querySelector('.nearZeroOpacity').classList.add("fadeOut"); // 2 second fadeout
  /* END OF ACTIVITY */
  /* GET READY TO EXIT THIS LESSON */
  setTimeout(function() {
    parent.preloadHandlingDiv.classList.remove("addThisClassToHideThePreloader");
    parent.preloadHandlingDiv.classList.add("addThisClassToRevealThePreloader");
  },1500); // 3000-1500 = 1500 See css_for_every_single_html
  /*setTimeout(function() {
    unloadTheSoundsOfThisLesson();
    unloadTheImagesOfThisLesson();
  },2900); // Also see js_for_all_iframed_lesson_htmls about unloadTheSoundsOfThisLesson() unloadTheImagesOfThisLesson()*/
  setTimeout(function () { parent.ayFreym.src = "/lessons_in_iframes/level_1/unit_2/lesson_1/index.html"; },3000);
}
