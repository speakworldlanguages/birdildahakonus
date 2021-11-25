let clickSound;
let theTextThatWillBePutInTheButton;
let filePathForMonthlyFinanceBaseUsd; // Dynamic
let filePathForMonthlyFinanceBaseEur; // Dynamic
let useTheOtherExchangeService = false;
const d = new Date();
const today = d.getDate();
const turn = today%5;
if (turn>=3) {useTheOtherExchangeService = true;}

window.addEventListener('DOMContentLoaded', function(){

  if (needLatinFonts) {
    if (deviceDetector.isMobile) { /* Use device detector in order not to cause a NOT FOUND error, the reason is */
      document.getElementById('aboutLicenseP').classList.add("kanit");
    } else {
      document.getElementById('aboutLicenseP').classList.add("kanit");
      document.getElementById('aboutResourcesP').classList.add("alegreya"); /* because, view source link does not exist on mobiles, so this is desktop-only.*/
    }
  }
  /* DEPRECATED as we don't want to open a new tab anymore
  // Check if the opener tab (which is probably the main app) is still open.
  if (window.opener) {
    // Check if there is a Howler object in the opener.
    if (window.opener.Howler) {
      // Adjust global volume to make it the same with the opener's.
      Howler.volume(window.opener.Howler.volume());
    }
  }
  */
  clickSound = new parent.Howl({  src: ["/user_interface/sounds/financial_thirdparty_click."+parent.audioFileExtension]  });
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
  const filePathForViewSourceCode = "/user_interface/text/"+userInterfaceLanguage+"/info_about_resources.txt";
  /* TRICK: Although it is wrong to use the same ID for 3 elements (desktop,tablet,phone) this works because two of them are removed with removeChild() before this runs*/
  fetch(filePathForTitle,myHeaders).then(function(response){return response.text();}).then(function(contentOfTheTxtFile){ document.title = document.title +" "+ contentOfTheTxtFile; }); // Keep the default and add the text next to it.
  fetch(filePathForNameOfAuthor,myHeaders).then(function(response){return response.text();}).then(function(contentOfTheTxtFile){ document.getElementById('authorsNameP').innerHTML = contentOfTheTxtFile; });
  fetch(filePathForNameOfLicense,myHeaders).then(function(response){return response.text();}).then(function(contentOfTheTxtFile){ document.getElementById('aboutLicenseP').innerHTML = contentOfTheTxtFile; });
  fetch(filePathForViewLicenseButton,myHeaders).then(function(response){return response.text();}).then(function(contentOfTheTxtFile){ document.getElementById('clickToViewP').innerHTML = contentOfTheTxtFile; });
  fetch(filePathForGoBackButton,myHeaders).then(function(response){return response.text();}).then(function(contentOfTheTxtFile){ document.getElementById('clickToGoBackP').innerHTML = contentOfTheTxtFile;  });
//  fetch(filePathForMonthlyFinanceBaseUsd,myHeaders).then(function(response){return response.text();}).then(function(contentOfTheTxtFile){ theTextThatWillBePutInTheButton = contentOfTheTxtFile; }); //Do this dynamically with exchange rates

  // CAUTION: ERROR happens if an element is removed before fetch can try to put text inside it.
  /*NOTE: Error has been fixed which happened due to inexistence of aboutResourcesP on mobiles; see if(deviceDetector.device == "desktop").*/
  if (deviceDetector.device == "desktop") {
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

  // addEventListeners to buttons to open relevant pages in _self
  monthlyOpt.addEventListener("click", function(){
    clickSound.play(); // takes 4000ms
    document.getElementById('moveAllOfThisToLeftID').classList.add("niceFadeOutInfoSlow"); // See information.css
    // Create a switch-case here to go to euro or usd page on patreon
    // CAUTION: Switch must not take userInterfaceLanguage but browserLanguage // See js_for_every_single_html
    // Wasn't able to embed PATREON in the iframe so we have to make this the point of no return
    // Can't use document.location.href = 'https://patreon.com/ForTerranationalBonocracy_USD';
    setTimeout(function () {  window.open("https://patreon.com/ForTerranationalBonocracy_USD","_top");   },3950);
    //setTimeout(function () {  document.location.href = 'https://patreon.com/ForTerranationalBonocracy_EUR';  },3950);
  });

  /* __ Detect device and make the buttons blink on mobiles. __ */
  let clearThisIntervalIfNeedBe;
  if (deviceDetector.isMobile) {
    clearThisIntervalIfNeedBe = setInterval(function () {
              monthlyOpt.classList.add("blinkByAddingRemovingThis");
              setTimeout(function () {
                monthlyOpt.classList.remove("blinkByAddingRemovingThis");
              },700);
    },3500);
  }

}, { once: true });
// END OF FIRINGS WITH LOAD EVENT

/* ___ MAKE ARROW BUTTONS FUNCTION - SWITCHING SCREENS ___ */
function bigSlideTowardsLeft() {
  document.getElementById('moveAllOfThisToLeftID').classList.add("addThisToMakeItSlideTowardsLeft");
  document.getElementById('bringAllOfThisFromRightID').classList.add("addThisToMakeItSlideFromRight");
  document.getElementById('moveAllOfThisToLeftID').classList.remove("addThisToMakeItReturnFromLeft");
  document.getElementById('bringAllOfThisFromRightID').classList.remove("addThisToMakeItReturnToRight");
  // Hide nav menu on mobiles if it was visible AND ALSO disable swipe-up
  if (parent.navMenuIsUpAndVisible && deviceDetector.isMobile) {   parent.makeTheNavMenuGoDownOnMobiles();   }
  parent.swipeMenuIsDisabled = true; // This has no effect on desktops // See js_for_the_sliding_navigation_menu.js
}
function returnWithBigSlideTowardsRight() {
  document.getElementById('moveAllOfThisToLeftID').classList.add("addThisToMakeItReturnFromLeft");
  document.getElementById('bringAllOfThisFromRightID').classList.add("addThisToMakeItReturnToRight");
  document.getElementById('moveAllOfThisToLeftID').classList.remove("addThisToMakeItSlideTowardsLeft");
  document.getElementById('bringAllOfThisFromRightID').classList.remove("addThisToMakeItSlideFromRight");
  // Reenable swipe-up
  parent.swipeMenuIsDisabled = false; // This has no effect on desktops // See js_for_the_sliding_navigation_menu.js
}
