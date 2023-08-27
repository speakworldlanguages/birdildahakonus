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
        const recordedBlob = new Blob(recordedChunks, { type: 'audio/wav' });
        audioElement.src = URL.createObjectURL(recordedBlob);
      },{once:true});

      mediaRecorder.start();

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
  if (parent.annyang) { // Skip parent.annyang.isListening() as it is certain that annyang was listening
    parent.annyang.removeCallback(); // Removes all callbacks
    if (isApple) { parent.annyang.pause(); console.log("annyang paused (apple devices only)"); }
    else { parent.annyang.abort();  console.log("annyang aborted"); }
    aMatchWasFound = false; // reset back to initial value
  }
  // ---
  setTimeout(function () {
    if (mediaRecorder && mediaRecorder.state !== 'inactive') { console.log("mediaRecorder will be stopped now!");
      mediaRecorder.stop();


      // Stop the MediaStream tracks
      const stream = mediaRecorder.stream;
      const tracks = stream.getTracks();
      tracks.forEach(track => track.stop());
    }
  }, 250);
  // ---
  setTimeout(function () {
    recordButton.disabled = false;
    playButton.disabled = false;
  }, 500);
  // ---
}

// Function to play recorded audio
function playRecording(event) { event.preventDefault(); event.stopPropagation();
  if (audioElement.src) {  audioElement.play();  }
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
  recordButton.disabled = true;
  playButton.disabled = true;
  startRecording();
  setTimeout(function () {    startSpeechRecognition();  }, 250);
}

let aMatchWasFound = false;
function startSpeechRecognition() { console.log("let annyang start listening");

  if (parent.annyang) {

    parent.annyang.setLanguage("tr");
    //new SuperTimeout(function() {  parent.annyang.start();  },100);
    parent.annyang.addCallback('result', compareAndSeeIfTheKeywordWasSaid);
    parent.annyang.start(); console.warn("annyang is now listening");
    function compareAndSeeIfTheKeywordWasSaid(phrasesArray) {
      //parent.console.log('Speech recognized. Possibly said: '+phrasesArray);
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
