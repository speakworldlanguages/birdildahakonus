"use strict";
// Variables to store audio recording and playback
let mediaRecorder;
let recordedChunks = [];
let audioElement = document.createElement('audio');

console.log("hello?");
// Get the necessary DOM elements
const recordButton = document.getElementById('recordButtonID');
const stopButton = document.getElementById('stopButtonID');
const playButton = document.getElementById('playButtonID');

// Function to start recording
function startRecording() { //event.preventDefault(); event.stopPropagation();
  console.log("START recording function fired");
  recordedChunks = []; // Start anew with emptiness every time
  navigator.mediaDevices.getUserMedia({ audio: true })
    .then(function (stream) {
      mediaRecorder = new MediaRecorder(stream);

      // Collect chunks of recorded data
      mediaRecorder.addEventListener('dataavailable', function (event) {
        if (event.data.size > 0) {
          recordedChunks.push(event.data);
        }
      });

      // Stop recording and create audio element source when recording is complete
      mediaRecorder.addEventListener('stop', function () {
        const recordedBlob = new Blob(recordedChunks);
        audioElement.src = URL.createObjectURL(recordedBlob);
      });

      mediaRecorder.start();
      recordButton.disabled = true;
      playButton.disabled = true;
    })
    .catch(function (error) {
      console.error('Error accessing microphone:', error);
    });
}

// Function to stop recording
function stopRecordingViaButton(event) { event.preventDefault(); event.stopPropagation();
  stopRecording();
}
function stopRecordingViaCommand() {
  stopRecording();
}
function stopRecording() { console.log("STOP recording function fired");

  // ---
  if (mediaRecorder && mediaRecorder.state !== 'inactive') {
    mediaRecorder.stop(); console.log("mediaRecorder should be stopped now!");
    recordButton.disabled = false;
    playButton.disabled = false;
  }
  // SpeechRecognition STOPS LISTENING

  setTimeout(function () { // It is certain that annyang was listening
    //let annyangWasListeningWhenRecordingStopped = false;
    if (parent.annyang) {
      parent.annyang.removeCallback(); // Removes all callbacks
      //annyangWasListeningWhenRecordingStopped = parent.annyang.isListening();
      //if (annyangWasListeningWhenRecordingStopped) {
        if (isApple) { parent.annyang.pause(); console.log("annyang paused on apple"); }
        else { parent.annyang.abort();  console.log("annyang aborted"); }

      //}
      // Note that: No problem if abort() fires when annyang wasn't listening.
    }
  }, 250);

}

// Function to play recorded audio
function playRecording(event) { event.preventDefault(); event.stopPropagation();
  if (audioElement.src) {
    audioElement.play();
  }
}

window.addEventListener('DOMContentLoaded', function(){

  // Attach event listeners to the buttons
  if (deviceDetector.isMobile) {
    recordButton.addEventListener('touchstart', startRecordingAndListening);
    stopButton.addEventListener('touchstart', stopRecordingViaButton);
    playButton.addEventListener('touchstart', playRecording);
  } else { // desktop
    recordButton.addEventListener('mousedown', startRecordingAndListening);
    stopButton.addEventListener('mousedown', stopRecordingViaButton);
    playButton.addEventListener('mousedown', playRecording);
  }

}, { once: true }); // END OF DOMContentLoaded



function startRecordingAndListening(event) { event.preventDefault(); event.stopPropagation();
  console.log("startRecordingAndListening() fired!");
  startRecording();
  startSpeechRecognition();
}

let aMatchWasFound = false;
function startSpeechRecognition() {

  if (parent.annyang) {

    parent.annyang.setLanguage("tr");
    new SuperTimeout(function() {  parent.annyang.start();  },100);
    parent.annyang.addCallback('result', compareAndSeeIfTheKeywordWasSaid);
    function compareAndSeeIfTheKeywordWasSaid(phrasesArray) {
      parent.console.log('Speech recognized. Possibly said: '+phrasesArray);
      console.log('Speech recognized. Possibly said: '+phrasesArray);

      let k;
      for (k = 0; k < phrasesArray.length; k++) {

        const fromPhraseToSingleWords = phrasesArray[k].split(" "); // Note that in "spaceless" languages like Renmen-Hito phrases will not be split into words
        let z;
        for (z = 0; z < fromPhraseToSingleWords.length; z++) {

          let searchResult = false;
          if (fromPhraseToSingleWords[z].toLowerCase() == "3" || fromPhraseToSingleWords[z].toLowerCase() == "dur") { searchResult = true; }
          if (!aMatchWasFound && searchResult) {
            aMatchWasFound = true; // Using this, we make sure that stopListeningAndProceedToNext fires only and only once
            if (parent.annyang.getSpeechRecognizer().interimResults) { console.warn("!!! Keyword detected with interimResults enabled");
              setTimeout(function () { stopRecordingViaCommand(); }, 250); // Interim results is or can be too quick (especially on Windows)
            } else { console.warn("!!! Keyword detected without interimResults");
              stopRecordingViaCommand();
            }
          } else {
            // Prevent a possible second firing (or any further firings) of stopListeningAndProceedToNext by doing nothing
          }

        } // End of for z
      } // End of for k

    } // END OF compareAndSeeIfTheKeywordWasSaid

  } // END OF if (parent.annyang)

} // END OF startSpeechRecognition
