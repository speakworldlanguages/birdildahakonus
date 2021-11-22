window.addEventListener('DOMContentLoaded', function(){
  // ------- Fill the divs with text depending on the user interface language --------
  // WARNING: Error will happen due to inexistence of goBackToInfoP on mobiles unless handled with if(deviceDetector.device == "desktop"){}
  const filePathForGoBackButton = "/user_interface/text/"+userInterfaceLanguage+"/info_go_back_button.txt";
  fetch(filePathForGoBackButton,myHeaders).then(function(response){return response.text();}).then(function(contentOfTheTxtFile){ document.getElementById('goBackToInfoP').innerHTML = contentOfTheTxtFile;  });

}, { once: true });
// REMEMBER: Wait for “userInterfaceLanguage” variable to be ready. See js_for_every_single_html.js
window.addEventListener('load', function(){

  // switch (userInterfaceLanguage) {
  //   case "tr":
  //     break;
  //   case "ja":
  //     break;
  //   default:
  // }

  if (needLatinFonts) {
    document.getElementById('goBackToInfoP').classList.add("alegreya");
  }


}, { once: true });
// END OF FIRINGS WITH LOAD EVENT
