"use strict";

// Too bad workers cannot access navigator.mediaDevices
var worker = new Worker('/lessons_in_iframes/level_1/unit_3/lesson_4/worker.js');
worker.onmessage = function (event) {
    const message = event.data;
    switch (message.type) {
        case 'ready':
            // Handle the recorded data (you can save or process it here)
            parent.console.log("Worker is "+message.type);
            parent.console.log(message.data);
            break;
        /*
        case 'dataAvailable':
            //updateTheBar(message.data);
            break;
        */
        /*case 'recordingStarted':
            recordButton.textContent = 'Stop Recording';
            recordButton.onclick = stopRecording;
            break;
        case 'recordingStopped':
            recordButton.textContent = 'Start Recording';
            recordButton.onclick = startRecording;
            break;*/
        case 'error':
            parent.console.warn("error message coming from the worker");
            parent.console.error(message.message);
            break;
    }
};
// ---
const button1 = document.getElementById('oneID');
const button2 = document.getElementById('twoID');
const button3 = document.getElementById('threeID');

// TO BE DELETED AFTER TESTS
const amplitudeMeter = document.getElementById('amplitude-meter');
const amplitudeBar = document.getElementById('amplitude-bar');
const monitor = document.getElementById('monitorID');
/*
function updateTheBar(valueObtainedFromWorker) {
  amplitudeBar.style.width = String(valueObtainedFromWorker)+"%";
  monitor.innerHTML = valueObtainedFromWorker.toFixed(1);
}
*/
let startedCollectingDataForAmbientNoise = false;
function button1Pressed(event) { event.preventDefault(); event.stopPropagation();
  button1.disabled = true; button2.disabled = true; button3.disabled = true;
  setTimeout(function () {    button1.disabled = true; button2.disabled = false; button3.disabled = false;  }, 5000);
  activateMicrophoneIfIsNotActive();
}
function button2Pressed(event) { event.preventDefault(); event.stopPropagation();
  button1.disabled = true; button2.disabled = true; button3.disabled = true;
  setTimeout(function () { button1.disabled = false; button2.disabled = true; button3.disabled = false; }, 5000);
  activateMicrophoneIfIsNotActive();
}
function button3Pressed(event) { event.preventDefault(); event.stopPropagation();
  button1.disabled = true; button2.disabled = true; button3.disabled = true;
  setTimeout(function () { button1.disabled = false; button2.disabled = false; button3.disabled = true; }, 5000);
  activateMicrophoneIfIsNotActive();
}
function activateMicrophoneIfIsNotActive() {
  if (startedCollectingDataForAmbientNoise == false) {

    activateMicrophone();

    //parent.console.log("posting initial message to worker");
    //worker.postMessage('startListeningToAmbientNoise');

    // As this function must fire only once and never again
    startedCollectingDataForAmbientNoise = true;
  }
}

function activateMicrophone() { parent.console.log("activating microphone");
  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(function (stream) {
              const audioContext = new (window.AudioContext || window.webkitAudioContext)();
              const microphone = audioContext.createMediaStreamSource(stream);
              const analyser = audioContext.createAnalyser();
              microphone.connect(analyser);
              //analyser.connect(audioContext.destination);

              // Adjust the FFT size
              analyser.fftSize = 128;

              // Set the frequency range to ignore low bass and high treble
              const lowerFrequencyLimit = 110;
              const upperFrequencyLimit = 5500;

              const bufferLength = analyser.frequencyBinCount; // Always equals half of fftSize
              const dataArray = new Uint8Array(bufferLength);
              const startIndex = Math.floor(lowerFrequencyLimit / (audioContext.sampleRate / bufferLength));
              const endIndex = Math.ceil(upperFrequencyLimit / (audioContext.sampleRate / bufferLength));
              // ---
              const numberOfAudioFramesInOneMinute = 3600; // With RAF running at 60fps it will take 60 seconds to fill
              let averageAmplitudeValuesDuringTheFirstMinute = new Uint8Array(numberOfAudioFramesInOneMinute);
              let frameCounter = 0;

              // ---
              let initialCheckInterval = setInterval(detectFirstNonZeroValue,200);
              function detectFirstNonZeroValue() {
              	parent.console.log("Waiting for the first non zero value");
              	analyser.getByteFrequencyData(dataArray);
                var max = Math.max.apply(null, dataArray);
                if (max > 0) {
                	parent.console.log("First non zero value detected");
                  parent.console.log(dataArray);
                	clearInterval(initialCheckInterval);
                  setTimeout(updateAmplitude,300); // updateAmplitude(); // Try to avoid the momentary awkward values at the beginning EVEN THOUGH IT DOESN'T WORK
                }
              }
              // ---
              function updateAmplitude() {

                  analyser.getByteFrequencyData(dataArray);
                  // Calculate the average amplitude from the specified frequency range

                  const filteredDataArray = dataArray.slice(startIndex, endIndex);
                  const sum = filteredDataArray.reduce((acc, val) => acc + val, 0);
                  const averageAmplitude = sum / filteredDataArray.length / 256; // Normalize to 0-1
                  // POST MESSAGE
                  amplitudeBar.style.width = `${averageAmplitude * 100}%`;
                  // self.postMessage({ type: 'dataAvailable', data: averageAmplitude * 100 });
                  // POST MESSAGE
                  monitor.innerHTML = (averageAmplitude*100).toFixed(1);
                  // ---
                  if(frameCounter < averageAmplitudeValuesDuringTheFirstMinute.length) {
                  	  averageAmplitudeValuesDuringTheFirstMinute[frameCounter] = Math.round(averageAmplitude*100);
                      frameCounter++;
                  } else if (frameCounter == averageAmplitudeValuesDuringTheFirstMinute.length) {
                      parent.console.log("averageAmplitudeValuesDuringTheFirstMinute is full of data");
                      parent.console.log(averageAmplitudeValuesDuringTheFirstMinute);
                      const arrayLength = averageAmplitudeValuesDuringTheFirstMinute.length;
                      const twentyPercent = Math.floor(0.2 * arrayLength); // Calculate 20% of the length
                      // Step 1: Sort the Uint8Array
                      const sortedArray = new Uint8Array([...averageAmplitudeValuesDuringTheFirstMinute].sort((a, b) => a - b));
                      // Step 2: Create a new array containing the lowest values
                      const lowestValuesArray = sortedArray.slice(0, twentyPercent);
                      parent.console.log("lowest 20% is");
                      parent.console.log(lowestValuesArray);
                      // Step 3: Calculate the average of the lowest values
                      const sum = lowestValuesArray.reduce((acc, val) => acc + val, 0);
                      const average = sum / twentyPercent;
                      parent.console.log("average noise level is "+average);
                      frameCounter = 99999;
                  }
                  requestAnimationFrame(updateAmplitude);
              }

      }) // End of then() block
      .catch(function (error) {
        parent.console.error('Error accessing the microphone:', error);
        //self.postMessage({ type: 'error', message: 'Error accessing microphone' });
      });
  } else {
      parent.console.error('getUserMedia is not supported in this browser.');
      //self.postMessage({ type: 'error', message: 'getUserMedia is not supported in this browser' });
  }
}

window.addEventListener('load', loadComplete, { once: true });
function loadComplete() {
  button1.addEventListener("pointerdown",button1Pressed);
  button2.addEventListener("pointerdown",button2Pressed);
  button3.addEventListener("pointerdown",button3Pressed);
}
