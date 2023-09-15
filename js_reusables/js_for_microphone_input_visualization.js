"use strict";
// Code written by Manheart Earthman=B. A. Bilgekılınç Topraksoy=土本 智一勇夫剛志
// This file MAY NOT BE MODIFIED by unauthorized people = This file may be modified by AUTHORIZED PEOPLE ONLY

// This is js_for_microphone_input_visualization.js

// AUDIO INPUT WAVEFORM VISUALIZATION CAN BE CPU INTENSIVE. On Android devices it is either too slow or incompatible ->  WAVESURFER didn't work together with speech recognition.
// September 2023 » Quit wavesurfer-mic-plugin and try switching to our own audio input visualization method
let audioMeterDiv = null;
window.addEventListener('DOMContentLoaded', function(){
  audioMeterDiv = document.getElementById('audioMeterID'); // getElementById returns null if an element with the given ID doesn't exist
}, { once: true }); // END OF DOMContentLoaded

// Too bad workers cannot access navigator.mediaDevices
var worker = new Worker('/js_reusables/js_for_mic_input_vis_web_worker.js');
let measureWorkerResponseStartTime = 0;
let measureRAFPerformanceStartTime = 0;
let workerResponseTime = 0;
let mainThreadRAFPerformance = 0;
worker.onmessage = function (event) {
    workerResponseTime = performance.now() - measureWorkerResponseStartTime; // Calculate response time
    const message = event.data;
    switch (message.type) {
        case 'ready':
            parent.console.log("Worker is "+message.say);
            break;
        case 'dataAvailable':
            updateTheAudioMeterDiv(message.yield); // Rename to update the audio-meter-div
            break;
        case 'adjust':
            volumeCeilingForSpeech = message.newCeiling;
            parent.console.log("Adjust maximum to "+ volumeCeilingForSpeech);
            break;
        case 'error':
            parent.console.warn("error message coming from the worker");
            parent.console.error(message.whichIs);
            break;
    }
};
// Handle errors from the web worker
worker.onerror = function (error) { parent.console.error('Error from web worker:', error); };

// ---
const volumeFloorForSpeech = 10; // Will NOT be updated via workers message
let volumeCeilingForSpeech = 40; // Will be updated via workers message
function updateTheAudioMeterDiv(valueObtainedFromWorker) {
  if (valueObtainedFromWorker<=volumeFloorForSpeech) {
    audioMeterDiv.style.width = "85vmin"; // Initial values found in css_for_photos_and_videos_teach_a_new_word
    audioMeterDiv.style.height = "85vmin"; // 86 - 1 » border is 1 vmin thick
  } else if (valueObtainedFromWorker>volumeFloorForSpeech && valueObtainedFromWorker<volumeCeilingForSpeech) {
    // Change input range from 0~100 to volumeFloorForSpeech~volumeCeilingForSpeech and set output range as 0~20
    const valueWithinRange = ((valueObtainedFromWorker - volumeFloorForSpeech)*20)/(volumeCeilingForSpeech-volumeFloorForSpeech);
    audioMeterDiv.style.width = String(85+valueWithinRange)+"vmin";
    audioMeterDiv.style.height = String(85+valueWithinRange)+"vmin";
  } else {
    audioMeterDiv.style.width = "105vmin";
    audioMeterDiv.style.height = "105vmin";
  }
}

let audioContext = null;
let mediaStream = null;
function activateMicrophone() { parent.console.log("activating microphone");
  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(function (stream) {
              mediaStream = stream;
              audioContext = new (window.AudioContext || window.webkitAudioContext)();
              parent.console.log("Sample rate is " + audioContext.sampleRate);
              const microphone = audioContext.createMediaStreamSource(mediaStream);
              const analyser = audioContext.createAnalyser();
              microphone.connect(analyser);
              //analyser.connect(audioContext.destination); // Do not send the mic input to speakers/headphones

              // Adjust the FFT size
              analyser.fftSize = 512; // Resolution of frequency range that is 0Hz to 48000Hz

              // Set the frequency range to ignore low bass and high treble
              const lowerFrequencyLimit = 220; // Hz
              const upperFrequencyLimit = 5500; // Hz

              const bufferLength = analyser.frequencyBinCount; // Always equals half of fftSize
              parent.console.log("Buffer length is " + bufferLength);
              const dataArray = new Uint8Array(bufferLength);
              const startIndex = Math.floor(lowerFrequencyLimit / (audioContext.sampleRate / bufferLength));
              const endIndex = Math.ceil(upperFrequencyLimit / (audioContext.sampleRate / bufferLength));
              parent.console.log("start index in main thread = " + startIndex);
              parent.console.log("end index in main thread = " + endIndex);
              const startAndEnd = [startIndex,endIndex];
              worker.postMessage({ data: startAndEnd, task: 'setStartIndexAndEndIndex' });
              // ---
              requestAnimationFrame(updateAmplitude);
              // ---
              //let frameCount = 0; // Comment out after tests
              function updateAmplitude() {
                  mainThreadRAFPerformance = performance.now() - measureRAFPerformanceStartTime;
                  //frameCount++; // Comment out after tests
                  //if (frameCount % 120 === 0) { parent.console.log("raf frame time: " + mainThreadRAFPerformance.toFixed(1)); }
                  // -
                  analyser.getByteFrequencyData(dataArray);
                  // Calculate the average amplitude from the specified frequency range
                  measureWorkerResponseStartTime = performance.now();
                  worker.postMessage({ data: dataArray, task: 'filterAndCalculate' });
                  // RAF, recursion, loop
                  //if (frameCount % 120 === 0) { parent.console.log("worker response time: " + workerResponseTime.toFixed(1)); } // See onmessage above
                  if (workerResponseTime>mainThreadRAFPerformance) { // Example: If worker response is more than 16.66 it would be too late when running at 60fps
                    // By not updating measureRAFPerformanceStartTime here we reduce the probability of skipping more than 1 frame at a time
                    requestAnimationFrame(function () { requestAnimationFrame(updateAmplitude); }); // Skip a frame
                  } else {
                    measureRAFPerformanceStartTime = performance.now();
                    requestAnimationFrame(updateAmplitude);
                  }
              }
              // ---
      }) // End of then() block
      .catch(function (error) {
        parent.console.error('Error accessing the microphone:', error);
      });
  } else {
      parent.console.error('getUserMedia is not supported in this browser.');
  }
}




/* DEPRECATE
// ALSO: There is a problem with making wavesurfer canvas width 100% on 1920x1080 desktop resolution. Use 50% and scaleX(2) instead!
// NOTE: wavesurfer.js is included and run by iframed lesson htmls where necessary. It is not included by the container parent html.

const waveformContainerDiv = document.createElement("DIV");
waveformContainerDiv.id="waveform";
waveformContainerDiv.classList.add("wavesurferMicrophoneDiv");

var wavesurfer;

// Make sure js_for_all_iframed_lesson_htmls is listed before(above) this js file. Otherwise access deviceDetector after window load.
if (deviceDetector.device=="desktop" && !isApple) { // Too slow to run on Mac
    document.body.appendChild(waveformContainerDiv);
    wavesurfer = WaveSurfer.create({container:'#waveform',waveColor:'white',barWidth:'3',barGap:'3',barHeight:'3',interact:false,cursorWidth:0,height:'100', plugins:[WaveSurfer.microphone.create()]});
} else {
  // The MediaRecorder API and the Speech Recognition API cannot use the same microphone at the same time in every browser
  // wavesurfer uses getUserMedia to read microphone which seems to be creating a conflict with SpeechRecognition
}
*/

var audioMeterIsListening = false; // See pauseTheAppFunction in js_for_the_sliding_navigation_menu
// According to tests (as of JULY2023) Windows PCs are the only verified type of device that NICELY support simultaneous usage of the device microphone by multiple APIs
/* ______ Functions to start-stop ______ */
// These will be called from the particular js files of the particular lessons.
function startAudioInputVisualization() {
  activateMicrophone();
  audioMeterIsListening = true;
  if (audioMeterDiv) {
    audioMeterDiv.style.opacity = "0";
    audioMeterDiv.style.display = "block"; // It's an empty div that contains nothing
    audioMeterDiv.style.animationDelay = "0.5s";
    audioMeterDiv.style.animationDuration = "1.5s";
    audioMeterDiv.classList.add("simplyMakeItAppear"); // simplyMakeItAppear exists in css_for_every_single_html
  }
  /* DEPRECATE
  if (deviceDetector.device=="desktop" && !isApple) { // Test if this works on iOS,,, if it does then add || detectedOS_name == "ios"
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
    wavesurfer.microphone.start(); audioMeterIsListening = true;
    waveformContainerDiv.classList.add("addThisToMakeItFadeIn"); // See css_for_wavesurfer_microphone_divs.css
  } else {
    // Neither Android nor iOS can handle both annyang and wavesurfer mic at the same time.
    // IDEA! Try using a Web Worker to see if a workaround is possible
  }
  */

}

function stopAudioInputVisualization() {
  if (audioContext && audioMeterIsListening) {
     audioContext.close();
  }
  if (mediaStream && audioMeterIsListening) {
     mediaStream.getTracks().forEach(track => track.stop());
  }
  audioMeterIsListening = false;

  if (audioMeterDiv) {
    audioMeterDiv.classList.remove("simplyMakeItAppear");
    audioMeterDiv.style.animationDelay = "0s";
    audioMeterDiv.classList.add("simplyMakeItDisappear"); // css_for_every_single_html
    setTimeout(function () {  audioMeterDiv.style.display = "none";  }, 1600);
  }
  /* DEPRECATE
  // ISSUE THAT NEEDS SERIOUS CARE: Safari doesn't allow mic permanently; it allows for only 1 listening session and prompts for permission everytime mic restarts
  if (deviceDetector.device=="desktop" && !isApple) {
    wavesurfer.microphone.stop(); audioMeterIsListening = false;
    waveformContainerDiv.classList.remove("addThisToMakeItFadeIn"); // Immediate disappearance is OK » See css_for_wavesurfer_microphone_divs.css
  } else {
    // Neither Android nor iOS can handle both annyang and wavesurfer mic at the same time.
    // IDEA! Try using a Web Worker to see if a workaround is possible
  }
  */
}
