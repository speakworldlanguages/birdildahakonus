"use strict";
let ctx;
let initialX=0,differenceX=0;
const buttonsInLinkedJS = document.getElementsByTagName('BUTTON');
const theCanvas = document.getElementsByTagName('CANVAS')[0];
const leftArea = document.getElementById("layerA2_ID");
const rightArea = document.getElementById("layerB2_ID");
const changeBrightnessMain = document.getElementsByTagName('MAIN')[0];

window.addEventListener('load', function(){
  checkIfThereIsOverflow();
  window.addEventListener("resize",function () { checkIfThereIsOverflow(); });
}, { once: true });
function checkIfThereIsOverflow() {
  if (leftArea.scrollHeight > leftArea.clientHeight) {
    rightArea.children[0].style.opacity = "1"; rightArea.children[2].style.opacity = "1"; // Show the rotate left-right arrows
  } else {
    rightArea.children[0].style.opacity = "0"; rightArea.children[2].style.opacity = "0"; // Hide the rotate left-right arrows
  }
}

let elementFromPoint;
if (deviceDetector.isMobile) { // PHONES AND TABLETS
  // Left side - or listed languages
  leftArea.addEventListener("touchstart", function(event){  event.preventDefault(); /* CAN THIS: Disable context menu via long touch?*/
    if (event.target.tagName.toLowerCase() == "button") {
      event.target.classList.add("simulatedHover");
    }
    changeBrightnessMain.classList.add("mainChangeBrightness"); // css_for_the_container_parent_html
  });
  leftArea.addEventListener("touchmove", function(event){  event.preventDefault(); /* Disables finger scrolling */
    let touch = event.touches[0];
    elementFromPoint = document.elementFromPoint(touch.clientX, touch.clientY); // DON'T NEED: touch.pageX - window.pageXOffset, touch.pageY - window.pageYOffset // because there is no scrolling in window or body
    if(elementFromPoint.tagName.toLowerCase() == "button" ) {
      elementFromPoint.className="simulatedHover";
    }
    else { // Try to detect finger-leave when it is in-between buttons > TEST RESULT: Nice enough
      let i; for (i = 0; i < buttonsInLinkedJS.length; i++) { buttonsInLinkedJS[i].classList.remove("simulatedHover"); }
    }
  });

  leftArea.addEventListener("touchend", function(event){  event.preventDefault(); /* Just to be safe */
    let i; for (i = 0; i < buttonsInLinkedJS.length; i++) { buttonsInLinkedJS[i].classList.remove("simulatedHover"); }
    changeBrightnessMain.classList.remove("mainChangeBrightness"); // css_for_the_container_parent_html
  });
  // Right side - or the scrollyglobe
  rightArea.addEventListener("touchstart", function(event){ event.preventDefault();
    initialX = Math.round(event.touches[0].clientX);
    rightArea.addEventListener("touchmove",rotateTheGlobeMobile);
    changeBrightnessMain.classList.add("mainChangeBrightness"); // css_for_the_container_parent_html
  });
  rightArea.addEventListener("touchend",cancelRotationMobile);
  // NO NEED: For a custom touchleave. It is better without touchleave.
  // BY THE WAY: pointerleave DOES NOT replace mouseleave for touchscreens because it doesn't fire until finger is lifted.
} else { // DESKTOPS
  // Left side
  leftArea.addEventListener("wheel", function(event){  event.preventDefault(); }); /* Disables mouse wheel scrolling */
  // Right side
  rightArea.addEventListener("mousedown", function(event){
    theCanvas.classList.add("zoomGlobeDesktop");
    initialX = event.clientX;
    rightArea.addEventListener("mousemove",rotateTheGlobeDesktop);
  });
  rightArea.addEventListener("mouseup",cancelRotationDesktop);
  rightArea.addEventListener("mouseleave",cancelRotationDesktop);
}

let frameCounter=8000;
let mod80 = 0;
function rotateTheGlobeDesktop(event) {
  differenceX = event.clientX - initialX;
  initialX = event.clientX;
  frameCounter += differenceX;
  mod80 = Math.abs(frameCounter%80);
  ctx.clearRect(0, 0, 250, 250);
  ctx.drawImage(frames[mod80], 0, 0);
  // scrolling
  leftArea.scrollTop += differenceX;
}
function cancelRotationDesktop() {
  theCanvas.classList.remove("zoomGlobeDesktop");
  rightArea.removeEventListener("mousemove",rotateTheGlobeDesktop);
  initialX=0; differenceX=0;
}
function rotateTheGlobeMobile(event) {
  differenceX = Math.round(event.touches[0].clientX) - initialX;
  initialX = Math.round(event.touches[0].clientX);
  frameCounter += differenceX;
  mod80 = Math.abs(frameCounter%80);
  ctx.clearRect(0, 0, 250, 250);
  ctx.drawImage(frames[mod80], 0, 0);
  // scrolling
  leftArea.scrollTop += differenceX;
  // vibration is extremely expensive in terms of battery usage
}
function cancelRotationMobile() {
  rightArea.removeEventListener("touchmove",rotateTheGlobeMobile);
  initialX=0; differenceX=0;
  changeBrightnessMain.classList.remove("mainChangeBrightness"); // css_for_the_container_parent_html
}
// Get all the images and draw with ctx.drawImage(img, 0, 0);
let loadedFrames = 0;
function increaseCounter() {
  loadedFrames++;
  if (loadedFrames==79) {
    ctx.drawImage(frame60, 0, 0);
  }
}

const frame00 = new Image(); frame00.onload = increaseCounter;
const frame01 = new Image(); frame01.onload = increaseCounter;
const frame02 = new Image(); frame02.onload = increaseCounter;
const frame03 = new Image(); frame03.onload = increaseCounter;
const frame04 = new Image(); frame04.onload = increaseCounter;
const frame05 = new Image(); frame05.onload = increaseCounter;
const frame06 = new Image(); frame06.onload = increaseCounter;
const frame07 = new Image(); frame07.onload = increaseCounter;
const frame08 = new Image(); frame08.onload = increaseCounter;
const frame09 = new Image(); frame09.onload = increaseCounter;
const frame10 = new Image(); frame10.onload = increaseCounter;
const frame11 = new Image(); frame11.onload = increaseCounter;
const frame12 = new Image(); frame12.onload = increaseCounter;
const frame13 = new Image(); frame13.onload = increaseCounter;
const frame14 = new Image(); frame14.onload = increaseCounter;
const frame15 = new Image(); frame15.onload = increaseCounter;
const frame16 = new Image(); frame16.onload = increaseCounter;
const frame17 = new Image(); frame17.onload = increaseCounter;
const frame18 = new Image(); frame18.onload = increaseCounter;
const frame19 = new Image(); frame19.onload = increaseCounter;
const frame20 = new Image(); frame20.onload = increaseCounter;
const frame21 = new Image(); frame21.onload = increaseCounter;
const frame22 = new Image(); frame22.onload = increaseCounter;
const frame23 = new Image(); frame23.onload = increaseCounter;
const frame24 = new Image(); frame24.onload = increaseCounter;
const frame25 = new Image(); frame25.onload = increaseCounter;
const frame26 = new Image(); frame26.onload = increaseCounter;
const frame27 = new Image(); frame27.onload = increaseCounter;
const frame28 = new Image(); frame28.onload = increaseCounter;
const frame29 = new Image(); frame29.onload = increaseCounter;
const frame30 = new Image(); frame30.onload = increaseCounter;
const frame31 = new Image(); frame31.onload = increaseCounter;
const frame32 = new Image(); frame32.onload = increaseCounter;
const frame33 = new Image(); frame33.onload = increaseCounter;
const frame34 = new Image(); frame34.onload = increaseCounter;
const frame35 = new Image(); frame35.onload = increaseCounter;
const frame36 = new Image(); frame36.onload = increaseCounter;
const frame37 = new Image(); frame37.onload = increaseCounter;
const frame38 = new Image(); frame38.onload = increaseCounter;
const frame39 = new Image(); frame39.onload = increaseCounter;
const frame40 = new Image(); frame40.onload = increaseCounter;
const frame41 = new Image(); frame41.onload = increaseCounter;
const frame42 = new Image(); frame42.onload = increaseCounter;
const frame43 = new Image(); frame43.onload = increaseCounter;
const frame44 = new Image(); frame44.onload = increaseCounter;
const frame45 = new Image(); frame45.onload = increaseCounter;
const frame46 = new Image(); frame46.onload = increaseCounter;
const frame47 = new Image(); frame47.onload = increaseCounter;
const frame48 = new Image(); frame48.onload = increaseCounter;
const frame49 = new Image(); frame49.onload = increaseCounter;
const frame50 = new Image(); frame50.onload = increaseCounter;
const frame51 = new Image(); frame51.onload = increaseCounter;
const frame52 = new Image(); frame52.onload = increaseCounter;
const frame53 = new Image(); frame53.onload = increaseCounter;
const frame54 = new Image(); frame54.onload = increaseCounter;
const frame55 = new Image(); frame55.onload = increaseCounter;
const frame56 = new Image(); frame56.onload = increaseCounter;
const frame57 = new Image(); frame57.onload = increaseCounter;
const frame58 = new Image(); frame58.onload = increaseCounter;
const frame59 = new Image(); frame59.onload = increaseCounter;
const frame60 = new Image(); frame60.onload = increaseCounter;
const frame61 = new Image(); frame61.onload = increaseCounter;
const frame62 = new Image(); frame62.onload = increaseCounter;
const frame63 = new Image(); frame63.onload = increaseCounter;
const frame64 = new Image(); frame64.onload = increaseCounter;
const frame65 = new Image(); frame65.onload = increaseCounter;
const frame66 = new Image(); frame66.onload = increaseCounter;
const frame67 = new Image(); frame67.onload = increaseCounter;
const frame68 = new Image(); frame68.onload = increaseCounter;
const frame69 = new Image(); frame69.onload = increaseCounter;
const frame70 = new Image(); frame70.onload = increaseCounter;
const frame71 = new Image(); frame71.onload = increaseCounter;
const frame72 = new Image(); frame72.onload = increaseCounter;
const frame73 = new Image(); frame73.onload = increaseCounter;
const frame74 = new Image(); frame74.onload = increaseCounter;
const frame75 = new Image(); frame75.onload = increaseCounter;
const frame76 = new Image(); frame76.onload = increaseCounter;
const frame77 = new Image(); frame77.onload = increaseCounter;
const frame78 = new Image(); frame78.onload = increaseCounter;
const frame79 = new Image(); frame79.onload = increaseCounter;

window.addEventListener('DOMContentLoaded', function(){
  ctx = theCanvas.getContext("2d");
  //---
  frame00.src = '/user_interface/images/scrolly_globe_frames/250px_white_globe_00.webp';
  frame01.src = '/user_interface/images/scrolly_globe_frames/250px_white_globe_01.webp';
  frame02.src = '/user_interface/images/scrolly_globe_frames/250px_white_globe_02.webp';
  frame03.src = '/user_interface/images/scrolly_globe_frames/250px_white_globe_03.webp';
  frame04.src = '/user_interface/images/scrolly_globe_frames/250px_white_globe_04.webp';
  frame05.src = '/user_interface/images/scrolly_globe_frames/250px_white_globe_05.webp';
  frame06.src = '/user_interface/images/scrolly_globe_frames/250px_white_globe_06.webp';
  frame07.src = '/user_interface/images/scrolly_globe_frames/250px_white_globe_07.webp';
  frame08.src = '/user_interface/images/scrolly_globe_frames/250px_white_globe_08.webp';
  frame09.src = '/user_interface/images/scrolly_globe_frames/250px_white_globe_09.webp';
  frame10.src = '/user_interface/images/scrolly_globe_frames/250px_white_globe_10.webp';
  frame11.src = '/user_interface/images/scrolly_globe_frames/250px_white_globe_11.webp';
  frame12.src = '/user_interface/images/scrolly_globe_frames/250px_white_globe_12.webp';
  frame13.src = '/user_interface/images/scrolly_globe_frames/250px_white_globe_13.webp';
  frame14.src = '/user_interface/images/scrolly_globe_frames/250px_white_globe_14.webp';
  frame15.src = '/user_interface/images/scrolly_globe_frames/250px_white_globe_15.webp';
  frame16.src = '/user_interface/images/scrolly_globe_frames/250px_white_globe_16.webp';
  frame17.src = '/user_interface/images/scrolly_globe_frames/250px_white_globe_17.webp';
  frame18.src = '/user_interface/images/scrolly_globe_frames/250px_white_globe_18.webp';
  frame19.src = '/user_interface/images/scrolly_globe_frames/250px_white_globe_19.webp';
  frame20.src = '/user_interface/images/scrolly_globe_frames/250px_white_globe_20.webp';
  frame21.src = '/user_interface/images/scrolly_globe_frames/250px_white_globe_21.webp';
  frame22.src = '/user_interface/images/scrolly_globe_frames/250px_white_globe_22.webp';
  frame23.src = '/user_interface/images/scrolly_globe_frames/250px_white_globe_23.webp';
  frame24.src = '/user_interface/images/scrolly_globe_frames/250px_white_globe_24.webp';
  frame25.src = '/user_interface/images/scrolly_globe_frames/250px_white_globe_25.webp';
  frame26.src = '/user_interface/images/scrolly_globe_frames/250px_white_globe_26.webp';
  frame27.src = '/user_interface/images/scrolly_globe_frames/250px_white_globe_27.webp';
  frame28.src = '/user_interface/images/scrolly_globe_frames/250px_white_globe_28.webp';
  frame29.src = '/user_interface/images/scrolly_globe_frames/250px_white_globe_29.webp';
  frame30.src = '/user_interface/images/scrolly_globe_frames/250px_white_globe_30.webp';
  frame31.src = '/user_interface/images/scrolly_globe_frames/250px_white_globe_31.webp';
  frame32.src = '/user_interface/images/scrolly_globe_frames/250px_white_globe_32.webp';
  frame33.src = '/user_interface/images/scrolly_globe_frames/250px_white_globe_33.webp';
  frame34.src = '/user_interface/images/scrolly_globe_frames/250px_white_globe_34.webp';
  frame35.src = '/user_interface/images/scrolly_globe_frames/250px_white_globe_35.webp';
  frame36.src = '/user_interface/images/scrolly_globe_frames/250px_white_globe_36.webp';
  frame37.src = '/user_interface/images/scrolly_globe_frames/250px_white_globe_37.webp';
  frame38.src = '/user_interface/images/scrolly_globe_frames/250px_white_globe_38.webp';
  frame39.src = '/user_interface/images/scrolly_globe_frames/250px_white_globe_39.webp';
  frame40.src = '/user_interface/images/scrolly_globe_frames/250px_white_globe_40.webp';
  frame41.src = '/user_interface/images/scrolly_globe_frames/250px_white_globe_41.webp';
  frame42.src = '/user_interface/images/scrolly_globe_frames/250px_white_globe_42.webp';
  frame43.src = '/user_interface/images/scrolly_globe_frames/250px_white_globe_43.webp';
  frame44.src = '/user_interface/images/scrolly_globe_frames/250px_white_globe_44.webp';
  frame45.src = '/user_interface/images/scrolly_globe_frames/250px_white_globe_45.webp';
  frame46.src = '/user_interface/images/scrolly_globe_frames/250px_white_globe_46.webp';
  frame47.src = '/user_interface/images/scrolly_globe_frames/250px_white_globe_47.webp';
  frame48.src = '/user_interface/images/scrolly_globe_frames/250px_white_globe_48.webp';
  frame49.src = '/user_interface/images/scrolly_globe_frames/250px_white_globe_49.webp';
  frame50.src = '/user_interface/images/scrolly_globe_frames/250px_white_globe_50.webp';
  frame51.src = '/user_interface/images/scrolly_globe_frames/250px_white_globe_51.webp';
  frame52.src = '/user_interface/images/scrolly_globe_frames/250px_white_globe_52.webp';
  frame53.src = '/user_interface/images/scrolly_globe_frames/250px_white_globe_53.webp';
  frame54.src = '/user_interface/images/scrolly_globe_frames/250px_white_globe_54.webp';
  frame55.src = '/user_interface/images/scrolly_globe_frames/250px_white_globe_55.webp';
  frame56.src = '/user_interface/images/scrolly_globe_frames/250px_white_globe_56.webp';
  frame57.src = '/user_interface/images/scrolly_globe_frames/250px_white_globe_57.webp';
  frame58.src = '/user_interface/images/scrolly_globe_frames/250px_white_globe_58.webp';
  frame59.src = '/user_interface/images/scrolly_globe_frames/250px_white_globe_59.webp';
  frame60.src = '/user_interface/images/scrolly_globe_frames/250px_white_globe_60.webp';
  frame61.src = '/user_interface/images/scrolly_globe_frames/250px_white_globe_61.webp';
  frame62.src = '/user_interface/images/scrolly_globe_frames/250px_white_globe_62.webp';
  frame63.src = '/user_interface/images/scrolly_globe_frames/250px_white_globe_63.webp';
  frame64.src = '/user_interface/images/scrolly_globe_frames/250px_white_globe_64.webp';
  frame65.src = '/user_interface/images/scrolly_globe_frames/250px_white_globe_65.webp';
  frame66.src = '/user_interface/images/scrolly_globe_frames/250px_white_globe_66.webp';
  frame67.src = '/user_interface/images/scrolly_globe_frames/250px_white_globe_67.webp';
  frame68.src = '/user_interface/images/scrolly_globe_frames/250px_white_globe_68.webp';
  frame69.src = '/user_interface/images/scrolly_globe_frames/250px_white_globe_69.webp';
  frame70.src = '/user_interface/images/scrolly_globe_frames/250px_white_globe_70.webp';
  frame71.src = '/user_interface/images/scrolly_globe_frames/250px_white_globe_71.webp';
  frame72.src = '/user_interface/images/scrolly_globe_frames/250px_white_globe_72.webp';
  frame73.src = '/user_interface/images/scrolly_globe_frames/250px_white_globe_73.webp';
  frame74.src = '/user_interface/images/scrolly_globe_frames/250px_white_globe_74.webp';
  frame75.src = '/user_interface/images/scrolly_globe_frames/250px_white_globe_75.webp';
  frame76.src = '/user_interface/images/scrolly_globe_frames/250px_white_globe_76.webp';
  frame77.src = '/user_interface/images/scrolly_globe_frames/250px_white_globe_77.webp';
  frame78.src = '/user_interface/images/scrolly_globe_frames/250px_white_globe_78.webp';
  frame79.src = '/user_interface/images/scrolly_globe_frames/250px_white_globe_79.webp';
  //---
}, { once: true });
/*frame 60 shows Australia in the middle*/

let frames = [frame60,frame61,frame62,frame63,frame64,frame65,frame66,frame67,frame68,frame69,frame70,frame71,frame72,frame73,frame74,frame75,frame76,frame77,frame78,frame79,frame00,frame01,frame02,frame03,frame04,frame05,frame06,frame07,frame08,frame09,frame10,frame11,frame12,frame13,frame14,frame15,frame16,frame17,frame18,frame19,frame20,frame21,frame22,frame23,frame24,frame25,frame26,frame27,frame28,frame29,frame30,frame31,frame32,frame33,frame34,frame35,frame36,frame37,frame38,frame39,frame40,frame41,frame42,frame43,frame44,frame45,frame46,frame47,frame48,frame49,frame50,frame51,frame52,frame53,frame54,frame55,frame56,frame57,frame58,frame59];
