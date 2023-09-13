"use strict";

// Too bad workers cannot access navigator.mediaDevices
var worker = new Worker('/lessons_in_iframes/level_1/unit_3/lesson_4/worker.js');
let measurePerformanceStartTime = 0;
//let measurePerformanceEndTime = 0;
let workerResponseTime = 0;
worker.onmessage = function (event) {
    //measurePerformanceEndTime = performance.now(); // Stop the timer
    workerResponseTime = performance.now() - measurePerformanceStartTime; // Calculate response time
    const message = event.data;
    switch (message.type) {
        case 'ready':
            parent.console.log("Worker is "+message.say);
            break;
        case 'dataAvailable':
            updateTheBar(message.yield);
            break;
        case 'switch':
            const minMaxValues = message.newFloorAndNewCeiling;
            parent.console.log("New min and max are "+ minMaxValues);
            volumeFloorForSpeech = minMaxValues[0];
            volumeCeilingForSpeech = minMaxValues[1];
            canRecordNow = true;
            break;
        case 'adjust':
            volumeCeilingForSpeech = message.newCeiling;
            parent.console.log("Adjust maximum to "+ volumeCeilingForSpeech);
            break;
        case 'error':
            parent.console.warn("error message coming from the worker");
            parent.console.error(message.whichHappensToBe);
            break;
    }
};
// Handle errors from the web worker
worker.onerror = function (error) { parent.console.error('Error from web worker:', error); };
// ---
const testSound = new parent.Howl({  src: ["/user_interface/sounds/ding."+soundFileFormat]  });
var listOfAllSoundsInThisLesson = [
  testSound
];
// ---
const button1 = document.getElementById('oneID');
const button2 = document.getElementById('twoID');
const button3 = document.getElementById('threeID');
let canRecordNow = false;
let isRecordingRightNow = false;
// const buttonRec = document.getElementById('recID');

// TO BE DELETED AFTER TESTS
const amplitudeMeter = document.getElementById('amplitude-meter');
const amplitudeBar = document.getElementById('amplitude-bar');
const monitor = document.getElementById('monitorID');
const responseMeter = document.getElementById('responseID');
const audioPlayer = document.getElementById('audioPlayerID');



// ---
let volumeFloorForSpeech = 0; // Will be updated via workers message
let volumeCeilingForSpeech = 100; // Will be updated via workers message
function updateTheBar(valueObtainedFromWorker) {
  if (valueObtainedFromWorker<=volumeFloorForSpeech) {
    amplitudeBar.style.width = "0%";
  } else if (valueObtainedFromWorker>volumeFloorForSpeech && valueObtainedFromWorker<volumeCeilingForSpeech) {
    // Change the range from 0~100 to volumeFloorForSpeech~volumeCeilingForSpeech
    const valueWithinRange = ((valueObtainedFromWorker - volumeFloorForSpeech)*100)/(volumeCeilingForSpeech-volumeFloorForSpeech);
    amplitudeBar.style.width = valueWithinRange.toFixed(3)+"%";
  } else {
    amplitudeBar.style.width = "100%";
  }

  //amplitudeBar.style.width = valueObtainedFromWorker+"%";
  monitor.innerHTML = valueObtainedFromWorker.toFixed(1);
}


let startedCollectingDataForAmbientNoise = false;
function button1Pressed(event) { event.preventDefault(); event.stopPropagation();
  testSound.play();
  button1.disabled = true; button2.disabled = true; button3.disabled = true;
  setTimeout(function () {    button1.disabled = true; button2.disabled = false; button3.disabled = false;  }, 5000);
  activateMicrophoneIfIsNotActive("one");
}
function button2Pressed(event) { event.preventDefault(); event.stopPropagation();
  testSound.play();
  button1.disabled = true; button2.disabled = true; button3.disabled = true;
  setTimeout(function () { button1.disabled = false; button2.disabled = true; button3.disabled = false; }, 5000);
  activateMicrophoneIfIsNotActive("two");
}
function button3Pressed(event) { event.preventDefault(); event.stopPropagation();
  testSound.play();
  button1.disabled = true; button2.disabled = true; button3.disabled = true;
  setTimeout(function () { button1.disabled = false; button2.disabled = false; button3.disabled = true; }, 5000);
  activateMicrophoneIfIsNotActive("three");
}
function activateMicrophoneIfIsNotActive(whichButton) {
  if (startedCollectingDataForAmbientNoise == false) {
    activateMicrophone(); // This function must fire only once and never again
    startedCollectingDataForAmbientNoise = true;
  }
  // ---
  if (canRecordNow && !isRecordingRightNow) {
    isRecordingRightNow = true;
    switch (whichButton) {
      case "one":
        startRecording(1);
        break;
      case "two":
        startRecording(2);
        break;
      case "three":
        startRecording(3);
        break;
      default:
    }
  }
}

//let mediaStream = null;
let mediaRecorder = null;
let audioChunks = [];
function activateMicrophone() { parent.console.log("activating microphone");
  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(function (stream) {
              //mediaStream = stream;
              mediaRecorder = new MediaRecorder(stream);
              mediaRecorder.ondataavailable = function (event) {   if (event.data.size > 0) {      audioChunks.push(event.data);      }   };
              mediaRecorder.onstop = function () { parent.console.log("Stopped recording sound");
                  isRecordingRightNow = false;
                  const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
                  audioChunks = []; // Reset to empty for reuse
                  audioPlayer.src = URL.createObjectURL(audioBlob);
              };


              const audioContext = new (window.AudioContext || window.webkitAudioContext)();
              parent.console.log("Sample rate is " + audioContext.sampleRate);
              const microphone = audioContext.createMediaStreamSource(stream);
              const analyser = audioContext.createAnalyser();
              microphone.connect(analyser);
              //analyser.connect(audioContext.destination);

              // Adjust the FFT size
              analyser.fftSize = 512;

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
              // ---
              let initialCheckInterval = setInterval(detectFirstNonZeroValue,200);
              function detectFirstNonZeroValue() {
              	parent.console.log("Waiting for the first non zero value");
              	analyser.getByteFrequencyData(dataArray);
                var max = Math.max.apply(null, dataArray);
                if (max > 0) {
                	parent.console.log("First non zero value detected");
                  //parent.console.log(dataArray);
                	clearInterval(initialCheckInterval);
                  setTimeout(updateAmplitude,300); // updateAmplitude(); // Try to avoid the momentary awkward values at the beginning EVEN THOUGH IT DOESN'T WORK
                }
              }
              // ---
              function updateAmplitude() {
                  // -
                  analyser.getByteFrequencyData(dataArray);
                  // Calculate the average amplitude from the specified frequency range
                  measurePerformanceStartTime = performance.now();
                  worker.postMessage({ data: dataArray, task: 'filterAndCalculate' });
                  // RAF, recursion, loop
                  responseMeter.innerHTML = "response time: " + workerResponseTime.toFixed(1);
                  if (workerResponseTime>16.66) {
                    requestAnimationFrame(function () { requestAnimationFrame(updateAmplitude); }); // Skip a frame
                  } else {
                    requestAnimationFrame(updateAmplitude);
                  }
                  // -
              }

      }) // End of then() block
      .catch(function (error) {
        parent.console.error('Error accessing the microphone:', error);
        // WORKERS CANNOT ACCESS navigator.getUserMedia » self.postMessage({ type: 'error', message: 'Error accessing microphone' });
      });
  } else {
      parent.console.error('getUserMedia is not supported in this browser.');
      // WORKERS CANNOT ACCESS navigator.getUserMedia » self.postMessage({ type: 'error', message: 'getUserMedia is not supported in this browser' });
  }
}

window.addEventListener('load', loadComplete, { once: true });
function loadComplete() {
  button1.addEventListener("pointerdown",button1Pressed);
  button2.addEventListener("pointerdown",button2Pressed);
  button3.addEventListener("pointerdown",button3Pressed);
}


function startRecording() { parent.console.log("Start recording sound");
  mediaRecorder.start();
  setTimeout(function () {    mediaRecorder.stop();   }, 6000);
}
