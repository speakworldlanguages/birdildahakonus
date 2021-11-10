const leftText1 = document.getElementById('leftText1pID'); const rightText1 = document.getElementById('rightText1pID');

let leftTextWithoutInteraction;
const filePathForLeftTextWithoutInteraction = "../user_interface/text/"+userInterfaceLanguage+"/0-you_are_learning_"+parent.theLanguageUserIsLearningNowToSetFilePaths+".txt";
fetch(filePathForLeftTextWithoutInteraction,myHeaders).then(function(response){return response.text();}).then(function(contentOfTheTxtFile){
  leftTextWithoutInteraction = contentOfTheTxtFile;
  leftText1.innerHTML = leftTextWithoutInteraction;
});// See js_for_fetch_api_character_encoding.js for the headers thingy.

let rightTextWithoutInteraction;
const filePathForRightTextWithoutInteraction = "../user_interface/text/"+parent.theLanguageUserIsLearningNowToSetFilePaths+"/0-you_are_learning_"+parent.theLanguageUserIsLearningNowToSetFilePaths+".txt";
fetch(filePathForRightTextWithoutInteraction,myHeaders).then(function(response){return response.text();}).then(function(contentOfTheTxtFile){
  rightTextWithoutInteraction = contentOfTheTxtFile;
  rightText1.innerHTML = rightTextWithoutInteraction;
});

let leftTextUponInteraction;
const filePathForLeftTextUponInteraction = "../user_interface/text/"+userInterfaceLanguage+"/0-learn_another_language.txt";
fetch(filePathForLeftTextUponInteraction,myHeaders).then(function(response){return response.text();}).then(function(contentOfTheTxtFile){ leftTextUponInteraction = contentOfTheTxtFile; });

let rightTextUponInteraction;
const filePathForRightTextUponInteraction = "../user_interface/text/"+parent.theLanguageUserIsLearningNowToSetFilePaths+"/0-learn_another_language.txt";
fetch(filePathForRightTextUponInteraction,myHeaders).then(function(response){return response.text();}).then(function(contentOfTheTxtFile){ rightTextUponInteraction = contentOfTheTxtFile; });

let sleepAdviceA, sleepAdviceB;
const filePathForsleepAdviceA = "../user_interface/text/"+userInterfaceLanguage+"/0-author_gives_sleep_advice.txt";
const filePathForsleepAdviceB = "../user_interface/text/"+parent.theLanguageUserIsLearningNowToSetFilePaths+"/0-author_gives_sleep_advice.txt";
fetch(filePathForsleepAdviceA,myHeaders).then(function(response){return response.text();}).then(function(contentOfTheTxtFile){ sleepAdviceA = contentOfTheTxtFile; });
fetch(filePathForsleepAdviceB,myHeaders).then(function(response){return response.text();}).then(function(contentOfTheTxtFile){ sleepAdviceB = contentOfTheTxtFile; });

if (deviceDetector.isMobile) {
  /*MOBILES*/
  leftText1.parentNode.addEventListener("touchstart",eitherTouch1F,{once:true});
  rightText1.parentNode.addEventListener("touchstart",eitherTouch1F,{once:true});
  function eitherTouch1F() {
    leftText1.parentNode.classList.add("bilingualsMouseEnter");   leftText1.innerHTML = leftTextUponInteraction;
    rightText1.parentNode.classList.add("bilingualsMouseEnter");  rightText1.innerHTML = rightTextUponInteraction;
    // Get ready for second touch
    leftText1.parentNode.addEventListener("touchstart",eitherTouch2F,{once:true});
    rightText1.parentNode.addEventListener("touchstart",eitherTouch2F,{once:true});
  }
  function eitherTouch2F() {
    goBackToFirstScreenLanguageSelection();
  }
} else {
  /*DESKTOPS*/
  leftText1.parentNode.addEventListener("mouseenter",eitherHoverF);
  rightText1.parentNode.addEventListener("mouseenter",eitherHoverF);
  function eitherHoverF() {
    leftText1.parentNode.classList.add("bilingualsMouseEnter");   leftText1.innerHTML = leftTextUponInteraction;
    rightText1.parentNode.classList.add("bilingualsMouseEnter");  rightText1.innerHTML = rightTextUponInteraction;
  }
  leftText1.parentNode.addEventListener("mouseleave",eitherUnhoverF);
  rightText1.parentNode.addEventListener("mouseleave",eitherUnhoverF);
  function eitherUnhoverF() {
    leftText1.parentNode.classList.remove("bilingualsMouseEnter");   leftText1.innerHTML = leftTextWithoutInteraction;
    rightText1.parentNode.classList.remove("bilingualsMouseEnter");  rightText1.innerHTML = rightTextWithoutInteraction;
  }
  leftText1.parentNode.addEventListener("mousedown",eitherClickF,{once:true});
  rightText1.parentNode.addEventListener("mousedown",eitherClickF,{once:true});
  function eitherClickF() {
    goBackToFirstScreenLanguageSelection();
  }
}

function goBackToFirstScreenLanguageSelection() {
  /* Remove PAUSE THE HOME ceramic nav button */
  if (parent.containerDivOfTheNavigationMenu.contains(parent.clickToGoToMainMenuDiv)) { // Don't break the app
    parent.containerDivOfTheNavigationMenu.removeChild(parent.clickToGoToMainMenuDiv); // TESTED: It works. ,,, also see we_are_working_for_new_levels
  }
  alert(sleepAdviceA+"\n\n"+sleepAdviceB);
  parent.ayFreym.classList.add("everyThingFadesToBlack"); // 700ms this css class must exist at parent level » NOT in this document's css
  setTimeout(function() {
    parent.ayFreym.classList.remove("everyThingFadesToBlack"); // Just this once do it without a fade in; a jump in with remove() will be enough or is even better?
    //No effect??? parent.ayFreym.classList.add("everyThingComesFromBlack"); // How do we remove this?? Or do we need to??
    parent.ayFreym.src = '../user_interface/blank.html';
    parent.document.getElementsByTagName('MAIN')[0].style.left = "0px"; // Was hidden with 8000px
  },1000); // 701 was enough???
}
