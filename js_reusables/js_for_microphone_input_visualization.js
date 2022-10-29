"use strict";
// AUDIO INPUT WAVEFORM VISUALIZATION IS CPU INTENSIVE. On Android devices it is either too slow or incompatible ->  Won't work together with speech recognition.
// ALSO: There is a problem with making wavesurfer canvas width 100% on 1920x1080 desktop resolution. Use 50% and scaleX(2) instead!
// NOTE: wavesurfer.js is included and run by iframed lesson htmls where necessary. It is not included by the container parent html.

const waveformContainerDiv = document.createElement("DIV");
waveformContainerDiv.id="waveform";
waveformContainerDiv.classList.add("wavesurferMicrophoneDiv");

var wavesurfer;

if (deviceDetector.device=="desktop") {
  document.body.appendChild(waveformContainerDiv);
  wavesurfer = WaveSurfer.create({container:'#waveform',waveColor:'white',barWidth:'3',barGap:'3',barHeight:'3',interact:false,cursorWidth:0,height:'100', plugins:[WaveSurfer.microphone.create()]});
} else {
  if (parent.isApple) { // iPhone and iPad
    document.body.appendChild(waveformContainerDiv);
    wavesurfer = WaveSurfer.create({container:'#waveform',waveColor:'white',barWidth:'3',barGap:'3',barHeight:'3',interact:false,cursorWidth:0,height:'100', plugins:[WaveSurfer.microphone.create()]});
  }
}

/* ______ Functions to start-stop ______ */
// These will be called from the particular js files of the particular lessons.
function startAudioInputVisualization() {
  if (deviceDetector.device=="desktop") { // Test if this works on iOS,,, if it does then add || detectedOS.name == "iOS"
    // Get information about CPU. Make things look better on faster machines.
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
    // Start and fade in.
    wavesurfer.microphone.start();
    waveformContainerDiv.classList.add("addThisToMakeItFadeIn"); // See css_for_wavesurfer_microphone_divs.css
  } else {
    // Android CANNOT handle both annyang and wavesurfer mic at the same time.
    // iOS,,, MUST: Test on iPhones and iPads
    if (parent.isApple) {
      // Start and fade in.
      wavesurfer.microphone.start();
      waveformContainerDiv.classList.add("addThisToMakeItFadeIn"); // See css_for_wavesurfer_microphone_divs.css
    }
  }
}

function stopAudioInputVisualization() {
  // ISSUE THAT NEEDS SERIOUS CARE: Safari doesn't allow mic permanently; it allows for only 1 listening session and prompts for permission everytime mic restarts
  if (deviceDetector.device=="desktop") {
    wavesurfer.microphone.stop();
    waveformContainerDiv.classList.remove("addThisToMakeItFadeIn"); // Immediate disappearance is OK » See css_for_wavesurfer_microphone_divs.css
  } else {
    // Android can not handle both annyang and wavesurfer mic at the same time.
    // iOS,,, MUST: Test on iPhones and iPads
    if (parent.isApple) {
      wavesurfer.microphone.stop();
      waveformContainerDiv.classList.remove("addThisToMakeItFadeIn"); // Immediate disappearance is OK » See css_for_wavesurfer_microphone_divs.css
    }
  }
}
