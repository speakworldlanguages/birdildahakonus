"use strict";
// Code written by Manheart Earthman=B. A. Bilgekılınç Topraksoy=土本 智一勇夫剛志
// This file MAY NOT BE MODIFIED by unauthorized people = This file may be modified by AUTHORIZED PEOPLE ONLY

// AUDIO INPUT WAVEFORM VISUALIZATION IS CPU INTENSIVE. On Android devices it is either too slow or incompatible ->  Won't work together with speech recognition.
// ALSO: There is a problem with making wavesurfer canvas width 100% on 1920x1080 desktop resolution. Use 50% and scaleX(2) instead!
// NOTE: wavesurfer.js is included and run by iframed lesson htmls where necessary. It is not included by the container parent html.

const waveformContainerDiv = document.createElement("DIV");
waveformContainerDiv.id="waveform";
waveformContainerDiv.classList.add("wavesurferMicrophoneDiv");

var wavesurfer;

// Make sure js_for_all_iframed_lesson_htmls is listed before(above) this js file. Otherwise access deviceDetector after window load.
if (deviceDetector.device=="desktop") {
  document.body.appendChild(waveformContainerDiv);
  wavesurfer = WaveSurfer.create({container:'#waveform',waveColor:'white',barWidth:'3',barGap:'3',barHeight:'3',interact:false,cursorWidth:0,height:'100', plugins:[WaveSurfer.microphone.create()]});
} else {
  // The MediaRecorder API and the Speech Recognition API cannot use the same microphone at the same time in most browsers
  // wavesurfer uses getUserMedia to read microphone which seems to be creating a conflict with SpeechRecognition
}

var wavesurferIsListening = false;
// According to tests (as of JULY2023) Windows PCs are the only verified type of device that support simultaneous usage of the device microphone by multiple APIs
// Namely MediaRecorder API and SpeechRecognition API
/* ______ Functions to start-stop ______ */
// These will be called from the particular js files of the particular lessons.
function startAudioInputVisualization() {
  if (deviceDetector.device=="desktop") { // Test if this works on iOS,,, if it does then add || detectedOS_name == "ios"
    // Get information about CPU. Make things look better on faster machines and optimize for performance on slower machines.
    if (window.navigator.hardwareConcurrency>3) {
      wavesurfer.microphone.bufferSize = 2048; // This makes it look smoother. Default is 4096.
    }
    else if (window.navigator.hardwareConcurrency<2) {
      wavesurfer.microphone.bufferSize = 8192; // Reduce quality if there is only 1 logical processor core available.
    }
    else {
      // Let defaults be if
      // [A]- User's browser doesn't support hardwareConcurrency
      // [B]- User's machine has 2 or 3 cores » average power; not too weak and not too strong
    }

    // TEST IF DESKTOP SAFARI MIC PERMISSION PROMPT REPETITION CAN BE AVOIDED BY SACRIFICING wavesurfer (i.e. getUserMedia) and letting annyang work alone
    // Start and fade in.
    wavesurfer.microphone.start(); wavesurferIsListening = true;
    waveformContainerDiv.classList.add("addThisToMakeItFadeIn"); // See css_for_wavesurfer_microphone_divs.css
  } else {
    // Neither Android nor iOS can handle both annyang and wavesurfer mic at the same time.
    // IDEA! Try using a Web Worker to see if a workaround is possible
  }
}

function stopAudioInputVisualization() {
  // ISSUE THAT NEEDS SERIOUS CARE: Safari doesn't allow mic permanently; it allows for only 1 listening session and prompts for permission everytime mic restarts
  if (deviceDetector.device=="desktop") {
    wavesurfer.microphone.stop(); wavesurferIsListening = false;
    waveformContainerDiv.classList.remove("addThisToMakeItFadeIn"); // Immediate disappearance is OK » See css_for_wavesurfer_microphone_divs.css
  } else {
    // Neither Android nor iOS can handle both annyang and wavesurfer mic at the same time.
    // IDEA! Try using a Web Worker to see if a workaround is possible
  }
}
