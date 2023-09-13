// worker.js
"use strict";
let startIndex, endIndex;

self.onmessage = function (event) {
  const { data, task } = event.data;

  if (task === 'filterAndCalculate') {
    const result = processDataForArray(data);
    self.postMessage({ type: 'dataAvailable', yield: result });
  } else if (task === 'setStartIndexAndEndIndex') {
    const result = data;
    //console.log("start index in worker = " + result[0]); // Works OK
    //console.log("end index in worker = " + result[1]); // Works OK
    startIndex = result[0];
    endIndex = result[1];
  } else {
    // Handle unknown identifier or provide an error response
    self.postMessage({ type: 'error', whichHappensToBe: 'Unknown task name' });
  }

};
// ---
const numberOfAudioFramesInOneMinute = 1800; // With RAF running at 60fps it will take 30 seconds to fill
let averageAmplitudeValuesDuringTheFirstMinute = new Uint8Array(numberOfAudioFramesInOneMinute);
let frameCounterA = 0; let signalAnalysisIsNowAvailable = false;
let volumeMeterFloor=1; let volumeMeterCeiling=99;
let frameCounterB = 0;
// ---
function processDataForArray(fromAnalyserUint8Array) {
  const filteredDataArray = fromAnalyserUint8Array.slice(startIndex, endIndex);
  const sum = filteredDataArray.reduce((acc, val) => acc + val, 0);
  const averageAmplitude = (sum / filteredDataArray.length / 256)*100; // Normalize to 0-100
  if (signalAnalysisIsNowAvailable) {
    if (volumeMeterCeiling<averageAmplitude) {
      volumeMeterCeiling++;
      self.postMessage({ type: 'adjust', newCeiling: volumeMeterCeiling });
    } else if (volumeMeterCeiling>40) {
      frameCounterB++;
      if (frameCounterB>120) { // When RAF runs at 60 fps «90» will take one and a half seconds for one decrement and «120» will take two seconds
        volumeMeterCeiling--;
        self.postMessage({ type: 'adjust', newCeiling: volumeMeterCeiling });
        frameCounterB = 0;
      }
    }
    return averageAmplitude;
  }
  // -
  if(frameCounterA < averageAmplitudeValuesDuringTheFirstMinute.length) {
      averageAmplitudeValuesDuringTheFirstMinute[frameCounterA] = Math.round(averageAmplitude);
      frameCounterA++;
      return averageAmplitude;
  } else if (frameCounterA == averageAmplitudeValuesDuringTheFirstMinute.length) {
      console.log("averageAmplitudeValuesDuringTheFirstMinute is full of data");
      // console.log(averageAmplitudeValuesDuringTheFirstMinute);
      const arrayLength = averageAmplitudeValuesDuringTheFirstMinute.length;
      const twentyPercent = Math.floor(0.2 * arrayLength); // Calculate 20% of the length
      // Step 1: Sort the Uint8Array
      const sortedArrayLowToHigh = new Uint8Array([...averageAmplitudeValuesDuringTheFirstMinute].sort((a, b) => a - b));
      // Step 2: Create new arrays containing the lowest and highest values
      const lowestValuesArray = sortedArrayLowToHigh.slice(0, twentyPercent);
      const greatestFiveValuesArray = sortedArrayLowToHigh.slice(-5); // Resulting array contains the greatest five values (last five elements)
      // console.log("lowest 20% is");
      // console.log(lowestValuesArray);
      // console.log("highest 5 is");
      // console.log(greatestFiveValuesArray);
      // Step 3: Calculate the average of the lowest and highest values
      const sumOfLows = lowestValuesArray.reduce((acc, val) => acc + val, 0);
      const sumOfHighs = greatestFiveValuesArray.reduce((acc, val) => acc + val, 0);
      const averageOfLows = sumOfLows / twentyPercent;
      const averageOfHighs = sumOfHighs / 5; // Since we're selecting 5 values with slice(-5)
      console.log("average noise floor is "+averageOfLows.toFixed(1)); // WORKS OK
      console.log("average signal ceiling/peak is "+averageOfHighs.toFixed(1)); // WORKS OK
      // -- Twenty percent of 30 seconds is 6 seconds (values from the most quiet moments during «the» 30 seconds) and it should be enough data to determine the noise floor
      if (averageOfLows <= 5) {
        volumeMeterFloor = 10;
      } else if (averageOfLows>5 && averageOfLows<=25) {
        volumeMeterFloor = Math.round(averageOfLows*1.25);
      } else {
        // There is too much noise! Tell user to go find somewhere quiet.
      }
      // --
      if (averageOfHighs<=35) {
        volumeMeterCeiling = 35;
      } else {
        volumeMeterCeiling = Math.round(averageOfHighs);
      }
      // --
      signalAnalysisIsNowAvailable = true; // Flip the switch » See above
      const minMax = [volumeMeterFloor,volumeMeterCeiling];
      self.postMessage({ type: 'switch', newFloorAndNewCeiling: minMax });
      return averageAmplitude;
  } else {
      self.postMessage({ type: 'error', whichHappensToBe: 'Check worker.js for array lengths and counters' });
  }
}


self.postMessage({ type: 'ready', say: 'ready to calculate' });
