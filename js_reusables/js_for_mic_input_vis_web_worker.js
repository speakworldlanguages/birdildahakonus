"use strict";
// Code written by Manheart Earthman=B. A. Bilgekılınç Topraksoy=土本 智一勇夫剛志
// This file MAY NOT BE MODIFIED WITHOUT CONSENT VIA OFFICIAL AUTHORIZATION

// This is js_for_mic_input_vis_web_worker.js

let startIndex, endIndex; // High-pass & low-pass frequency limits (already converted to array indexes)

self.onmessage = function (event) {
  const { data, task } = event.data;

  if (task === 'filterAndCalculate') {
    const result = processDataForArray(data);
    self.postMessage({ type: 'dataAvailable', yield: result });
  } else if (task === 'setStartIndexAndEndIndex') { // High-pass Low-pass limits
    const result = data;
    console.log("start index in worker = " + result[0]); // Works OK
    console.log("end index in worker = " + result[1]); // Works OK
    startIndex = result[0];
    endIndex = result[1];
  } else {
    // Handle unknown identifier or provide an error response
    self.postMessage({ type: 'error', whichIs: 'Unknown task name' });
  }
};

// The threshold of minimum is a fixed value, so we don't need » let volumeMeterFloor=10;
let volumeMeterCeiling=40; // Starting values
let frameCounter = 0;
// ---
function processDataForArray(fromAnalyserUint8Array) {
  const filteredDataArray = fromAnalyserUint8Array.slice(startIndex, endIndex);
  const sum = filteredDataArray.reduce((acc, val) => acc + val, 0);
  const averageAmplitude = (sum / filteredDataArray.length / 256)*100; // Normalize to 0-100

  if (volumeMeterCeiling<averageAmplitude) {
    volumeMeterCeiling++;
    self.postMessage({ type: 'adjust', newCeiling: volumeMeterCeiling });
  } else if (volumeMeterCeiling>40) {
    frameCounter++;
    if (frameCounter>90) { // When RAF runs at 60 fps «90» will take one and a half seconds for one decrement and «120» will take two seconds
      volumeMeterCeiling--;
      self.postMessage({ type: 'adjust', newCeiling: volumeMeterCeiling });
      frameCounter = 0;
    }
  }
  return averageAmplitude;
}


self.postMessage({ type: 'ready', say: 'ready to calculate' });
