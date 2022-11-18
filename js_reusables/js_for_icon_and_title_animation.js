"use strict";
// Code written by Manheart Earthman=B. A. Bilgekılınç Topraksoy=土本 智一勇夫剛志
// May be modified by AUTHORIZED PEOPLE ONLY

/*
function preventIconAndTitleAnimation() { // Usable in case it becomes necessary
  window.removeEventListener("load",dynamicTitleF);
  window.removeEventListener("load",startAndLoopTheAnimationOfIcon);
}
*/

// Dynamic titles are cool!
window.addEventListener("load",dynamicTitleF,{once:true});
let theTickerThatChangesTheTitle;
const theParentHtmlTitle = document.title;
function dynamicTitleF() {
  theTickerThatChangesTheTitle = setInterval( function ()
  {
    if (ayFreym.contentWindow.document.title) {
      document.title = ayFreym.contentWindow.document.title;
    }
    setTimeout( function ()  {   document.title = theParentHtmlTitle;   },3000);
  } , 6000);
}

//Animated favicon
const iconElement = document.getElementById("icon");

function iconChange() {
iconElement.href = "/user_interface/html_icon/animated_globe_icon_39.png";
setTimeout(function(){ iconElement.href = "/user_interface/html_icon/animated_globe_icon_00.png";}, 500);
setTimeout(function(){ iconElement.href = "/user_interface/html_icon/animated_globe_icon_01.png";}, 1000);
setTimeout(function(){ iconElement.href = "/user_interface/html_icon/animated_globe_icon_02.png";}, 1500);
setTimeout(function(){ iconElement.href = "/user_interface/html_icon/animated_globe_icon_03.png";}, 2000);
setTimeout(function(){ iconElement.href = "/user_interface/html_icon/animated_globe_icon_04.png";}, 2500);
setTimeout(function(){ iconElement.href = "/user_interface/html_icon/animated_globe_icon_05.png";}, 3000);
setTimeout(function(){ iconElement.href = "/user_interface/html_icon/animated_globe_icon_06.png";}, 3500);
setTimeout(function(){ iconElement.href = "/user_interface/html_icon/animated_globe_icon_07.png";}, 4000);
setTimeout(function(){ iconElement.href = "/user_interface/html_icon/animated_globe_icon_08.png";}, 4500);
setTimeout(function(){ iconElement.href = "/user_interface/html_icon/animated_globe_icon_09.png";}, 5000);
setTimeout(function(){ iconElement.href = "/user_interface/html_icon/animated_globe_icon_10.png";}, 5500);
setTimeout(function(){ iconElement.href = "/user_interface/html_icon/animated_globe_icon_11.png";}, 6000);
setTimeout(function(){ iconElement.href = "/user_interface/html_icon/animated_globe_icon_12.png";}, 6500);
setTimeout(function(){ iconElement.href = "/user_interface/html_icon/animated_globe_icon_13.png";}, 7000);
setTimeout(function(){ iconElement.href = "/user_interface/html_icon/animated_globe_icon_14.png";}, 7500);
setTimeout(function(){ iconElement.href = "/user_interface/html_icon/animated_globe_icon_15.png";}, 8000);
setTimeout(function(){ iconElement.href = "/user_interface/html_icon/animated_globe_icon_16.png";}, 8500);
setTimeout(function(){ iconElement.href = "/user_interface/html_icon/animated_globe_icon_17.png";}, 9000);
setTimeout(function(){ iconElement.href = "/user_interface/html_icon/animated_globe_icon_18.png";}, 9500);
setTimeout(function(){ iconElement.href = "/user_interface/html_icon/animated_globe_icon_19.png";}, 10000);
setTimeout(function(){ iconElement.href = "/user_interface/html_icon/animated_globe_icon_20.png";}, 10500);
setTimeout(function(){ iconElement.href = "/user_interface/html_icon/animated_globe_icon_21.png";}, 11000);
setTimeout(function(){ iconElement.href = "/user_interface/html_icon/animated_globe_icon_22.png";}, 11500);
setTimeout(function(){ iconElement.href = "/user_interface/html_icon/animated_globe_icon_23.png";}, 12000);
setTimeout(function(){ iconElement.href = "/user_interface/html_icon/animated_globe_icon_24.png";}, 12500);
setTimeout(function(){ iconElement.href = "/user_interface/html_icon/animated_globe_icon_25.png";}, 13000);
setTimeout(function(){ iconElement.href = "/user_interface/html_icon/animated_globe_icon_26.png";}, 13500);
setTimeout(function(){ iconElement.href = "/user_interface/html_icon/animated_globe_icon_27.png";}, 14000);
setTimeout(function(){ iconElement.href = "/user_interface/html_icon/animated_globe_icon_28.png";}, 14500);
setTimeout(function(){ iconElement.href = "/user_interface/html_icon/animated_globe_icon_29.png";}, 15000);
setTimeout(function(){ iconElement.href = "/user_interface/html_icon/animated_globe_icon_30.png";}, 15500);
setTimeout(function(){ iconElement.href = "/user_interface/html_icon/animated_globe_icon_31.png";}, 16000);
setTimeout(function(){ iconElement.href = "/user_interface/html_icon/animated_globe_icon_32.png";}, 16500);
setTimeout(function(){ iconElement.href = "/user_interface/html_icon/animated_globe_icon_33.png";}, 17000);
setTimeout(function(){ iconElement.href = "/user_interface/html_icon/animated_globe_icon_34.png";}, 17500);
setTimeout(function(){ iconElement.href = "/user_interface/html_icon/animated_globe_icon_35.png";}, 18000);
setTimeout(function(){ iconElement.href = "/user_interface/html_icon/animated_globe_icon_36.png";}, 18500);
setTimeout(function(){ iconElement.href = "/user_interface/html_icon/animated_globe_icon_37.png";}, 19000);
setTimeout(function(){ iconElement.href = "/user_interface/html_icon/animated_globe_icon_38.png";}, 19500);
}

window.addEventListener("load",startAndLoopTheAnimationOfIcon,{ once: true });
function startAndLoopTheAnimationOfIcon() {
  iconChange();
  setInterval( function() {  iconChange();  }, 20000);
}
