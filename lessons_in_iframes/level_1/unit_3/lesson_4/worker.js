// worker.js
/*
let mediaStream = null;
let mediaRecorder = null;
*/
self.onmessage = function (event) {
  // if (event.data === "startListeningToAmbientNoise") {
  //   doTheCalculations();
  // }

  /*
  if (event.data === 'startRecording') {
    startRecording();
  } else if (event.data === 'stopRecording') {
    stopRecording();
  }
  */

};



// function doTheCalculations() {
//
// }




async function startRecording() {
  /*try {
    mediaStream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorder = new MediaRecorder(mediaStream);

    mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        self.postMessage({ type: 'dataAvailable', data: event.data });
      }
    };

    mediaRecorder.start();
    self.postMessage({ type: 'recordingStarted' });
  } catch (error) {
    self.postMessage({ type: 'error', message: 'Error accessing microphone' });
  }*/
}

function stopRecording() {
  /*if (mediaRecorder) {
    mediaRecorder.stop();
    mediaStream.getTracks().forEach(track => track.stop());
    self.postMessage({ type: 'recordingStopped' });
  }*/
}

self.postMessage({ type: 'ready', data: 'to calculate' });
