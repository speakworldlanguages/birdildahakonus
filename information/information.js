let clickSound;
let theTextThatWillBePutInTheButton;
let filePathForMonthlyFinanceBaseUsd; // Dynamic
let filePathForMonthlyFinanceBaseEur; // Dynamic
let goodbyeTextBothPieces;
let useTheOtherExchangeService = false;
const d = new Date();
const today = d.getDate();
const turn = today%5;
if (turn>=3) {useTheOtherExchangeService = true;}
let isAlreadyMovingTheBigSlideThatIs = false;

window.addEventListener('DOMContentLoaded', function(){

  if (needLatinFonts) {
    /*GET FONTS*/
    let kanitFont;
    kanitFont = new FontFace('kanit', "url(/user_interface/fonts/Kanit-ExtraLight.ttf)");
    kanitFont.load().then(function(loaded_face) {
        document.fonts.add(loaded_face);
    }).catch(function(error) {    console.error("Unable to get the font: " + error);  });
    /*NOTE: Will be using PATUA from js_for_every_single_html*/
    let kavivanarFont; // For Good People's License itself
    kavivanarFont = new FontFace('kavivanar', "url(/user_interface/fonts/Kavivanar-Regular.ttf)");
    kavivanarFont.load().then(function(loaded_face) {
        document.fonts.add(loaded_face);
    }).catch(function(error) {    console.error("Unable to get the font: " + error);  });

    /*SET FONTS*/
    if (deviceDetector.isMobile) { /* Use device detector in order not to cause a NOT FOUND error, the reason is */
      document.getElementById('aboutLicenseP').classList.add("kanit");
    } else {
      document.getElementById('aboutLicenseP').classList.add("kanit");
      document.getElementById('aboutResourcesP').classList.add("patua"); /* because, view source link does not exist on mobiles, so this is desktop-only.*/
    }
  }

  clickSound = new parent.Howl({  src: ["/user_interface/sounds/financial_thirdparty_click.webm"]  }); // 1.3s is the climax and 2.6 is end of excitement
  // ------- Fill the divs with text depending on the user interface language --------
  const filePathForLicense = "/LICENSE";
  fetch(filePathForLicense,myHeaders).then(function(response){return response.text();}).then(function(contentOfTheTxtFile){ const keepTheNiceLineBreaks = contentOfTheTxtFile.replace(/\n\s*/g, "<br>"); document.getElementById('putTheLicenseIntoThisP').innerHTML = keepTheNiceLineBreaks; });

  const filePathForTitle = "/user_interface/text/"+userInterfaceLanguage+"/info_index_html_title.txt";
  const filePathForNameOfAuthor = "/user_interface/text/"+userInterfaceLanguage+"/info_name_of_author.txt";
  const filePathForNameOfLicense = "/user_interface/text/"+userInterfaceLanguage+"/info_name_of_license.txt";
  const filePathForViewLicenseButton = "/user_interface/text/"+userInterfaceLanguage+"/info_view_license_button.txt";
  const filePathForGoBackButton = "/user_interface/text/"+userInterfaceLanguage+"/info_go_back_button.txt";
  filePathForMonthlyFinanceBaseUsd = "/user_interface/text/"+userInterfaceLanguage+"/info_monthly_option_base_usd.txt";
  filePathForMonthlyFinanceBaseEur = "/user_interface/text/"+userInterfaceLanguage+"/info_monthly_option_base_eur.txt";
  const filePathForGoodbyeText = "/user_interface/text/"+userInterfaceLanguage+"/0-before_leaving_the_app_to_donate.txt";
  const filePathForViewSourceCode = "/user_interface/text/"+userInterfaceLanguage+"/info_about_resources.txt";
  /* TRICK: Although it is wrong to use the same ID for 3 elements (desktop,tablet,phone) this works because two of them are removed with removeChild() before this runs*/
  fetch(filePathForTitle,myHeaders).then(function(response){return response.text();}).then(function(contentOfTheTxtFile){ document.title = document.title +" "+ contentOfTheTxtFile; }); // Keep the default and add the text next to it.
  fetch(filePathForNameOfAuthor,myHeaders).then(function(response){return response.text();}).then(function(contentOfTheTxtFile){ document.getElementById('authorsNameP').innerHTML = contentOfTheTxtFile; });
  fetch(filePathForNameOfLicense,myHeaders).then(function(response){return response.text();}).then(function(contentOfTheTxtFile){ document.getElementById('aboutLicenseP').innerHTML = contentOfTheTxtFile; });
  fetch(filePathForViewLicenseButton,myHeaders).then(function(response){return response.text();}).then(function(contentOfTheTxtFile){ document.getElementById('clickToViewP').innerHTML = contentOfTheTxtFile; });
  fetch(filePathForGoBackButton,myHeaders).then(function(response){return response.text();}).then(function(contentOfTheTxtFile){ document.getElementById('clickToGoBackP').innerHTML = contentOfTheTxtFile;  });
  fetch(filePathForGoodbyeText,myHeaders).then(function(response){return response.text();}).then(function(contentOfTheTxtFile){ goodbyeTextBothPieces = contentOfTheTxtFile; }).catch(function(){ goodbyeTextBothPieces = "Thank|you"; });

  // CAUTION: ERROR happens if an element is removed before fetch can try to put text inside it.
  /*NOTE: Error has been fixed which happened due to inexistence of aboutResourcesP on mobiles; see if(deviceDetector.device == "desktop").*/
  if (deviceDetector.device == "desktop") {
    fetch(filePathForViewSourceCode,myHeaders).then(function(response){return response.text();}).then(function(contentOfTheTxtFile){ document.getElementById('aboutResourcesP').innerHTML = contentOfTheTxtFile.toUpperCase(); });
  } else {
    fetch(filePathForViewSourceCode,myHeaders).then(function(response){return response.text();}).then(function(contentOfTheTxtFile){ document.getElementById('aboutResourcesP').innerHTML = contentOfTheTxtFile; });
  }
}, { once: true });
// REMEMBER: Wait for “userInterfaceLanguage” variable to be ready. See js_for_every_single_html.js
window.addEventListener('load', function(){

  const monthlyOpt = document.getElementById('idOfMonthlySupportOptionDiv'); // The 2 other duplicates will have been removed by the time this gets executed.
  // GOOD PRACTICE: It would be good if we could “SILENTLY” get the location of the user via IP detection (without device GPS because that pops another “allow-block” prompt).
  switch (browserLanguage) { // CAUTION: Not userInterfaceLanguage but browserLanguage. WHY: Because EURO users speak many different languages  // See js_for_every_single_html -> two letter code is ready
    case "ja": // JPY
    fetch(filePathForMonthlyFinanceBaseUsd,myHeaders).then(function(response){return response.text();}).then(function(contentOfTheTxtFile){
      theTextThatWillBePutInTheButton = contentOfTheTxtFile;
      if (useTheOtherExchangeService) {
        fetch("https://openexchangerates.org/api/latest.json?app_id=00d60b05bdf64fe7acd41c8378f40877").then(function(response){return response.json();}).then(function(jsonObject){
		      document.getElementById('idOfMonthlyOptionP').innerHTML = theTextThatWillBePutInTheButton.split("?")[0]+Math.round(jsonObject.rates.JPY)+theTextThatWillBePutInTheButton.split("?")[1];
        });
      } else {
        fetch("https://v6.exchangerate-api.com/v6/41e9b765199c3405e72bce0a/pair/USD/JPY").then(function(response){return response.json();}).then(function(jsonObject){
          document.getElementById('idOfMonthlyOptionP').innerHTML = theTextThatWillBePutInTheButton.split("?")[0]+Math.round(jsonObject.conversion_rate)+theTextThatWillBePutInTheButton.split("?")[1];
        });
      }
    });
      break;
    case "tr": // TRY
    fetch(filePathForMonthlyFinanceBaseUsd,myHeaders).then(function(response){return response.text();}).then(function(contentOfTheTxtFile){
      document.getElementById('idOfMonthlyOptionP').innerHTML = contentOfTheTxtFile;
      /*theTextThatWillBePutInTheButton = contentOfTheTxtFile;
      fetch("https://v6.exchangerate-api.com/v6/41e9b765199c3405e72bce0a/pair/USD/TRY").then(function(response){return response.json();}).then(function(jsonObject){
        document.getElementById('idOfMonthlyOptionP').innerHTML = theTextThatWillBePutInTheButton.split("?")[0]+Math.round(jsonObject.conversion_rate*100)/100+theTextThatWillBePutInTheButton.split("?")[1];
      });*/
    });
      break;
    case "it": case "es": case "de": case "fr": case "pt": case "fi": case "el": case "et": case "ga": case "lv": case "lt": case "nl": case "mt": case "sk": case "sl": // EUR
    fetch(filePathForMonthlyFinanceBaseEur,myHeaders).then(function(response){return response.text();}).then(function(contentOfTheTxtFile){ document.getElementById('idOfMonthlyOptionP').innerHTML = contentOfTheTxtFile; });
      break;
    default: // USD
    fetch(filePathForMonthlyFinanceBaseUsd,myHeaders).then(function(response){return response.text();}).then(function(contentOfTheTxtFile){ document.getElementById('idOfMonthlyOptionP').innerHTML = contentOfTheTxtFile; });
  }

  // Use the switch-case above to go to euro or usd page on patreon
  // CAUTION: Switch must not take userInterfaceLanguage but browserLanguage because currency is based on user's location // See js_for_every_single_html
  // Wasn't able to embed PATREON in the iframe so we have to make this the point of no return
  // Can't use document.location.href = 'https://patreon.com/ForTerranationalBonocracy_USD';


  /* __ Detect device and make the buttons blink on mobiles. __ */

  if (deviceDetector.isMobile) { // PHONE & TABLET - PHONE & TABLET - PHONE & TABLET
    let clearThisIntervalIfNeedBe;
    // Use event.stopPropagation(); INLINE to prevent touch conflict
    ////monthlyOpt.addEventListener("touchstart", function(){    }); // QUIT: parent.preventTouchConflictWithTheSlidingNavMenu(monthlyOpt); » See js_for_the_sliding_navigation_menu
    monthlyOpt.addEventListener("touchend", function(){  clickSound.play();  handleNavigationToPatreon();  clearInterval(clearThisIntervalIfNeedBe);  }, { once: true });
    clearThisIntervalIfNeedBe = setInterval(function () {
              monthlyOpt.classList.add("blinkByAddingRemovingThis");
              setTimeout(function () { monthlyOpt.classList.remove("blinkByAddingRemovingThis"); },600);
    },1400);

  } else { // DESKTOP - DESKTOP - DESKTOP
    const whiteFullnessDIV0 = document.createElement("DIV"); whiteFullnessDIV0.classList.add("whiteFullness0");
    document.body.appendChild(whiteFullnessDIV0);
    monthlyOpt.addEventListener("mouseenter", function(){    whiteFullnessDIV0.style.opacity = "0.15";  });
    monthlyOpt.addEventListener("mouseleave", function(){    whiteFullnessDIV0.style.opacity = "0";  });
    monthlyOpt.addEventListener("mouseup", function(){    clickSound.play();    handleNavigationToPatreon();  }, { once: true });
  }

}, { once: true });
// END OF FIRINGS WITH LOAD EVENT
function handleNavigationToPatreon() {
  const whiteFullnessDIV1 = document.createElement("DIV"); whiteFullnessDIV1.classList.add("whiteFadeIn"); whiteFullnessDIV1.classList.add("whiteFullness1");
  document.body.appendChild(whiteFullnessDIV1); // 4800 ms to 100% light beige color
  const markContainerDIV = document.createElement("DIV"); markContainerDIV.classList.add("markContainer");
  document.body.appendChild(markContainerDIV);
  const firstLine = document.createElement("MARK");  firstLine.innerHTML = goodbyeTextBothPieces.split("|")[0];
  const secondLine = document.createElement("MARK"); secondLine.innerHTML =  goodbyeTextBothPieces.split("|")[1];
  if (deviceDetector.isMobile) {
    firstLine.classList.add("markTabletAndPhone"); secondLine.classList.add("markTabletAndPhone");
  } else {
    firstLine.classList.add("markDesktop"); secondLine.classList.add("markDesktop");
  }
  if (needLatinFonts) { firstLine.style.fontFamily = 'manheart, serif'; secondLine.style.fontFamily = 'manheart, serif'; }
  if (needHitoicJapaneseFonts) { firstLine.style.fontFamily = 'DFKai-SB, serif'; secondLine.style.fontFamily = 'DFKai-SB, serif'; } // kaiu.ttf exists in windows fonts by default, no?
  //---
  setTimeout(function(){ markContainerDIV.appendChild(firstLine); markContainerDIV.appendChild(secondLine); },4000);
  setTimeout(function(){ firstLine.style.opacity = "1";  },4500);
  setTimeout(function(){ secondLine.style.opacity = "1";  },6500);
  secondLine.style.textAlign = "justify";
  //setTimeout(function () {  window.open("https://patreon.com/ForTerranationalBonocracy_USD","_top");   },12000);
}

/* ___ MAKE ARROW BUTTONS FUNCTION - SWITCHING SCREENS ___ */
function bigSlideTowardsLeft() {
  if (!isAlreadyMovingTheBigSlideThatIs) {
    document.getElementById('moveAllOfThisToLeftID').classList.add("addThisToMakeItSlideTowardsLeft");
    document.getElementById('bringAllOfThisFromRightID').classList.add("addThisToMakeItSlideFromRight");
    document.getElementById('moveAllOfThisToLeftID').classList.remove("addThisToMakeItReturnFromLeft");
    document.getElementById('bringAllOfThisFromRightID').classList.remove("addThisToMakeItReturnToRight");

    isAlreadyMovingTheBigSlideThatIs = true;
    setTimeout(function () {      isAlreadyMovingTheBigSlideThatIs = false;    },2499);

    parent.swipeNavMenuIsLocked=true;
    setTimeout(function () {  if (parent.navMenuIsUpAndVisible) { parent.makeTheNavMenuGoDownOnMobiles(); }  },600);
  }
}
function returnWithBigSlideTowardsRight() {
  if (!isAlreadyMovingTheBigSlideThatIs) {
    document.getElementById('moveAllOfThisToLeftID').classList.add("addThisToMakeItReturnFromLeft"); // 2500ms
    document.getElementById('bringAllOfThisFromRightID').classList.add("addThisToMakeItReturnToRight");
    document.getElementById('moveAllOfThisToLeftID').classList.remove("addThisToMakeItSlideTowardsLeft");
    document.getElementById('bringAllOfThisFromRightID').classList.remove("addThisToMakeItSlideFromRight");

    isAlreadyMovingTheBigSlideThatIs = true;
    setTimeout(function () {      isAlreadyMovingTheBigSlideThatIs = false;    },2499);

    setTimeout(function () { parent.swipeNavMenuIsLocked=false; },2501);
  }
}
