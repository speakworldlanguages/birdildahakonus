"use strict";
// Code written by Manheart Earthman=B. A. Bilgekılınç Topraksoy=土本 智一勇夫剛志
// This file MAY NOT BE MODIFIED WITHOUT CONSENT i.e. OFFICIAL AUTHORIZATION

/*______*/
// Check if the domain and browser language is different
// If so, then offer redirecting to the clone whose UI language matches user's browser language
// ALSO: Domain locking against forks etc.
/* --- SEE js_for_every_single_html.js TO FIND browserLanguage AND userInterfaceLanguage --- */

// NOTETHAT: browserLanguage is already cut to the first two characters of navigator.language using substring(0,2) and toLowerCase() is applied
if (browserLanguage == userInterfaceLanguage) { // SEE js_for_every_single_html
  // Nothing to handle; UI language and browser language are the same
} else {
  window.addEventListener("load",checkIfRedirectionShouldBeOffered,{once:true});
  function checkIfRedirectionShouldBeOffered() {
    setTimeout(whatIfUserInterfaceLangAndBrowserLangAreDifferent, 500); // Small delay to let the welcome menu become visible
  }
}
const ifWantToChange_EN = "Would you like to view the app in English?\n";
const ifWantToChange_TR = "Uygulama Türkçe arayüz ile görüntülensin mi?\n";
const ifWantToChange_JA = "アプリを八島語で（八島語＝日本語）開けましょうか？\n";
const ifWantToKeep_EN = "Cancel to keep user interface in English.";
const ifWantToKeep_TR = "Arayüz Türkçe kalsın istiyorsanız iptali seçin.";
const ifWantToKeep_JA = "日本語のままにするには、［キャンセル］を選択してください。";
// ---
function whatIfUserInterfaceLangAndBrowserLangAreDifferent() {
  if (!localStorage.changingDomainToMatchBrowserLanguageWasOfferedButUserDeclined) {
    // Check if there is an available domain where UI language is user's browser language
    let message = "?";
    // browserLanguage is in most cases OS language i.e. THE HOUSE
    // userInterfaceLanguage is what domain user has arrived through i.e. THE DOOR
    switch (browserLanguage) {
      // BETTER IF: this list is ordered in the opposite direction of the list in js_for_every_single_html
      case "en":
        switch (userInterfaceLanguage) {
          case "tr": message = ifWantToChange_EN + ifWantToKeep_TR; break;
          case "ja": message = ifWantToChange_EN + ifWantToKeep_JA; break;
          default: message = ifWantToChange_EN;
        }
        // Ask if user wants to go to speakworldlanguages.app or stay
        if (confirm(message) == true) { top.location.assign("https://speakworldlanguages.github.io"); } // When name.com SSL issue is resolved, change to » https://speakworldlanguages.app
        else { localStorage.changingDomainToMatchBrowserLanguageWasOfferedButUserDeclined = "yes"; }
        break;
      case "tr":
        switch (userInterfaceLanguage) {
          case "en": message = ifWantToChange_TR + ifWantToKeep_EN; break;
          case "ja": message = ifWantToChange_TR + ifWantToKeep_JA; break;
          default: message = ifWantToChange_TR;
        }
        // Ask if user wants to go to birdildahakonus or stay
        if (confirm(message) == true) { top.location.assign("https://speakworldlanguages.github.io/birdildahakonus/"); } // When name.com SSL issue is resolved, change to » https://speakworldlanguages.app/birdildahakonus/ OR other CUSTOM DOMAIN
        else { localStorage.changingDomainToMatchBrowserLanguageWasOfferedButUserDeclined = "yes"; }
        break;
      case "ja":
        switch (userInterfaceLanguage) {
          case "en": message = ifWantToChange_JA + ifWantToKeep_EN; break;
          case "tr": message = ifWantToChange_JA + ifWantToKeep_TR; break;
          default: message = ifWantToChange_JA;
        }
        // Ask if user wants to go to gengohanasite or stay
        if (confirm(message) == true) { top.location.assign("https://gengohana.site"); } // https must be enforced
        else { localStorage.changingDomainToMatchBrowserLanguageWasOfferedButUserDeclined = "yes"; }
        break;

/*
      case "zh": // TAIWAN is zh-TW, no?
        // Ask if user wants to go to tingdongshijiederenmen.com or stay
        break;
*/

      default:
        // In this case, a SWL clone in user's browser language is not available yet
        // OPTION1: Do nothing and stay
        // OPTION2: Ask if user would like to view the app in English unless userInterfaceLanguage is already English
        // Example someone whose browserLanguage is "zz" is trying to view birdildahakonus.com
        if (userInterfaceLanguage != "en") {
          if (confirm("Would you like to view the app in English?") == true) { top.location.assign("https://speakworldlanguages.github.io"); } // When SSL issue is resolved, change to » https://speakworldlanguages.app
          else { localStorage.changingDomainToMatchBrowserLanguageWasOfferedButUserDeclined = "yes"; }
        }
    }
  } else {
    // Never ask again
  }
}

/*______*/
const firstSevenCharactersOfTheAddress = window.location.hostname.substring(0,7);
/*___LIST OF AUTHORIZED DOMAINS___*/
switch (window.location.hostname) {
  case "speakworldlanguages.github.io": // ALLOW
  case "speakworldlanguages.app": // ALLOW
  case "birdildahakonus.com": // ALLOW - MUST BE UPDATED UPON PURCHASING THE ACTUAL D,O,M,A,I,N
  case "gengohana.site": // ALLOW - MUST BE UPDATED UPON PURCHASING THE ACTUAL D,O,M,A,I,N - previous idea was hanaserutoiiyone
  case "shuoba.com": // ALLOW - MUST BE UPDATED UPON PURCHASING THE ACTUAL D,O,M,A,I,N - previous idea was tingdongshijiederenmen, also check ren(dot)men
  case "localhost": // ALLOW
  case "swl.test": // ALLOW - laragon
  case "birdildahakonus.test": // ALLOW - laragon
  case "gengohanasite.test": // ALLOW - laragon
    break;

  default:
    if (firstSevenCharactersOfTheAddress=="192.168") { // ALLOW testing on local network
      // Do nothing
    } else {
      document.body.style.display = "none"; document.body.style.opacity = "0";
      setTimeout(function () {
        alert(window.location.hostname + " is UNAUTHORIZED!\n1 - DO NOT modify the source code!\n2 - DELETE this fork from your repositories!");
      }, 2000);
    }
} // End of switch-case

/*______*/
// Do not allow embedding of this app (no channeling or re-serving through any 3rd-party iframes)
if (self === top) {
    // Display normally
} else {
    /*top.location = self.location; » This kind of redirection doesn’t work because of browser policies. Gets blocked as a pop-up window. Use a confirm box before redirecting. */
    document.body.style.opacity = "0.1";
    setTimeout(function () {
      if (confirm("(×_×) → (⌒▽⌒) ?")) {
        top.location.assign(self.location.href);
      }
    },7000);
}
