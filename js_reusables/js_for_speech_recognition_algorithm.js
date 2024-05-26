"use strict";
// Code written by Manheart Earthman=B. A. Bilgekılınç Topraksoy=土本 智一勇夫剛志
// UNAUTHORIZED MODIFICATION IS PROHIBITED: You may not change this file without consent
let aMatchWasFound;
// Sound player (Howler) exists in the parent html
// Find soundFileFormat in js_for_all_iframed_lesson_htmls
const dongDingTone = new parent.Howl({  src: ["/user_interface/sounds/dongding."+soundFileFormat]  });
const dingTone = new parent.Howl({  src: ["/user_interface/sounds/ding."+soundFileFormat]  });
// DO NOT UNLOAD dingTone in the middle of the lesson » otherwise it will play only once per lesson
// UNLOAD must happen at the very end of the lesson
let playTheSecondDingOnly = false;

function seeIfUserIsAbleToPronounce(anyOneOfTheWordsInThisArray,withinThisTimeLimit,beforeThisManyRetriesHappen,withoutPlayingTheDING) {
  if (!parent.internetConnectivityIsNiceAndUsable) {
    // FORCE-PAUSE THE APP (otherwise the visuals will keep playing)
    if (listOfAllTickingSuperTimers) { pauseAllSuperTimers(); parent.theAppIsPaused = true; } // See js_for_the_sliding_navigation_menu
    else { parent.console.warn("listOfAllTickingSuperTimers doesn't exist???"); }
    // ACTUALLY: There already exists a pauseTheAppFunction inside js_for_the_sliding_navigation_menu which not only pauses all SuperTimers but also pauses sounds and videos etc
    // WE COULD: Modify the createAndHandleTheAppIsPausedBox in js_for_info_boxes_in_parent or pauseTheAppFunction in js_for_the_sliding_navigation_menu and call them with a parameter like "becauseInternetConnectivityIsLost"
    // DECISION AS OF APRIL 2024: Will create a dedicated function in which there will not only be text but an image too (unlike the standard multilingual «app is paused» box)
    // and the sounds will not be paused

    // AND DISPLAY: The app needs a stable internet connection to be able to perform speech recognition.
    if (typeof parent.createAndHandleInternetConnectivityIsLostBox === "function") {
      parent.createAndHandleInternetConnectivityIsLostBox().then(connectivityIsRestoredAndUserWantsToContinue); // See js_for_info_boxes_in_parent
      function connectivityIsRestoredAndUserWantsToContinue() { parent.console.log("Looks like the app is back ONLINE");
        setTimeout(() => {
          if (listOfAllTickingSuperTimers) { unpauseAllSuperTimers(); parent.theAppIsPaused = false; } // See js_for_the_sliding_navigation_menu
          else { parent.console.warn("listOfAllTickingSuperTimers doesn't exist???"); }

          setTimeout(() => {
            const a = anyOneOfTheWordsInThisArray;
            const b = withinThisTimeLimit;
            const c = beforeThisManyRetriesHappen;
            const d = withoutPlayingTheDING;
            // Retry with the exact same parameters
            seeIfUserIsAbleToPronounce(a,b,c,d).then(checkAndProceed).catch((error) => { parent.console.error(error); });
            function checkAndProceed() {
              if (typeof stopListeningAndProceedToNext === "function") {    stopListeningAndProceedToNext();    } // See each lesson's own js to find stopListeningAndProceedToNext
              else { parent.console.warn("stopListeningAndProceedToNext function doesn't exist???"); }
            }
          }, 500);

        }, 1000);
      }
    } else { parent.console.error("Error: createAndHandleInternetConnectivityIsLostBox function doesn't exist???"); }


    // CONSIDER: What would happen if user tries to navigate to the progress chart at this point
    // See if such a navigation breaks anything and implement precautions where necessary


    // THE EARLIER IDEA WAS LIKE: alert("💢 📶 💢 📶 💢"); // Show an international alert
    // THE EARLIER IDEA WAS LIKE: parent.ayFreym.src = "/progress_chart/index.html"; // Try to navigate to the progress_chart as the last thing to do

  } else {
    return new Promise((resolve, reject) => { // Avoid using reject for timelimit-failures and retry-failures BECAUSE syntax errors also get caught in catch block
        aMatchWasFound = false;
        // Notes about handling non-English string characters
        // BULGULAR: toLowerCase() Windows'ta büyük Ş yi küçük ş ye çeviriyor ama Mac OS üzerinde çevirmiyor
        // Onun yerine toLocaleLowerCase() kullanılırsa büyük I İngilizcedeki gibi küçük i ye dönüşmek yerine küçük ı ya dönüşüyor
        // Seçenek1: toLocaleLowerCase() KULLANMAYIP speech_recognition_answer_key içindeki cevapları buna dikkat ederek girmek
        // Seçenek2: tr için özel koşul yazmak -> OLMADI NEDEN ÇÜNKÜ büyük [İ] yi [i̇] ye yanlış dönüştürüyor. İki farklı küçük i çıkıyor ve ("i̇" == "i") false veriyor
        // Note: We don't need toLocaleLowerCase() for Cyrillic script (confirmed on Windows), toLowerCase() does the job right already

        if (parent.annyang) { parent.console.log("Starting speech recognition for: "+anyOneOfTheWordsInThisArray[0]);
          // October 2022 UPDATE: Stop using commands object with annyang
          // DEPRECATED parent.annyang.addCommands(commands);

          // Use withoutPlayingTheDING where necessary » As of October2023 it has never been used
          // IDEA: We could replace withoutPlayingTheDING with something like typeOfTheDING to choose from different sounds
          if (!isAndroid && !withoutPlayingTheDING) { // See js_for_different_browsers_and_devices AND js_for_all_iframed_lesson_htmls
              // Android has its native DING tone. So let this DING tone play only on non-Android platforms i.e. desktops and iOS devices.
              if (!playTheSecondDingOnly) {
                dongDingTone.play(); parent.console.log("DONG DING"); // The very first tone to be heard during a lesson or game
              } else {
                dingTone.play(); parent.console.log("DING"); // All the following tones during a lesson or game
              }
          }

          // Start listening (on Android first check if it is already ON and TURN IT OFF IF IT WAS ON)
          if (isAndroid && parent.annyang.isListening()) { // NOTE: During tests we found that parent.annyang.isListening() might return false even if SpeechRecognition is using the microphone
            parent.console.warn("ON ANDROID: annyang was already listening » Inspect: Find what started it before js_for_speech_recognition_algorithm");
            parent.annyang.abort(); // Try to avoid the «SpeechRecognition is already listening» error
            new SuperTimeout(startSpeechRecognition,2000);
            // NOTE_THAT: If mic is idle but is TURNED ON due to previous getUserMedia activity THERE MIGHT still be a problem with starting SpeechRecognition on Android!
          } else {
            startSpeechRecognition(); // BETTER START WITHOUT ANY DELAY
          }

          function startSpeechRecognition() {
            parent.annyang.start({ autoRestart: true }); // NOTE: annyang.resume() equals annyang.start()
          }

          // New method of detecting matches
          parent.annyang.addCallback('result', compareAndSeeIfTheAnswerIsCorrect);
          function compareAndSeeIfTheAnswerIsCorrect(phrasesArray) {
            parent.console.log('Speech recognized. Possibly said: '+phrasesArray); // SpeechRecognition actually returns a confidence value for each of its guessed-catches but we as of October2023 there is no use for it in the app
            // Check if there is a match
            let j;
            for(j=0;j<anyOneOfTheWordsInThisArray.length;j++) {
              // NOTE THAT: There is also the option of using includes() to perform phrase to phrase comparison // Remember that it's not contains() » It's includes()
              // BUT we want to split phrases into words and perform word to word comparison
              let k;
              for (k = 0; k < phrasesArray.length; k++) {
                // Which method is better?
                // if (phrasesArray[k].toLowerCase().search(anyOneOfTheWordsInThisArray[j].toLowerCase()) >= 0) // This will return true if user utters 'underwater' instead of 'water'
                // if (phrasesArray[k].toLowerCase() == anyOneOfTheWordsInThisArray[j].toLowerCase()) // Only with interimResults TURNED ON, this will return true if user utters 'Water is the liquid form of H2O' but false for 'underwater' and also false for 'under water'
                // if (phrasesArray[k].toLowerCase().search(anyOneOfTheWordsInThisArray[j].toLowerCase()) == 0) // Accept user's utterance if it starts with the "correct word or phrase" even if interimResults option is turned off like 'watermelon'.
                // To accept 'under water' while rejecting 'underwater' we need to extract individual words from phrases

                const fromPhraseToSingleWords = phrasesArray[k].split(" "); // Note that in "spaceless" languages like Renmen-Hito phrases will not be split into words
                let z;
                for (z = 0; z < fromPhraseToSingleWords.length; z++) {

                  // Now we can reject 'underwater' and accept 'under water' // NOTE: With interimResults enabled it’s probably impossible to reject 'watermelon'
                  let searchResult = false;
                  if (fromPhraseToSingleWords[z].toLowerCase() == anyOneOfTheWordsInThisArray[j].toLowerCase()) { searchResult = true; } // For some reason this fails for Arabic in Safari >>> Works without any problems in Chrome though
                  else if (isApple) {
                    if (parent.annyang.getSpeechRecognizer().lang == "ar") { parent.console.warn("Listening for Arabic on Safari/Apple");
                      // Use string search to try and find it within the phrase and not individual words
                      if (phrasesArray[k].search(anyOneOfTheWordsInThisArray[j]) >= 0) { searchResult = true; }
                    }
                  }
                  else if (parent.targetLanguageIsWrittenWithoutSpaces) { // Let's also accept an utterance like 我要喝水(I am going to drink water) as a correct answer since it includes 水(water)
                    // Event though it means we will also accept ミミズ(earthworm) when waiting for 水(water) !!!
                    if (fromPhraseToSingleWords[z].toLowerCase().search(anyOneOfTheWordsInThisArray[j].toLowerCase()) >= 0) { searchResult = true; }
                    // ALSO NOTE THAT: Unfortunately SpeechRecognition can ignore user's speech when the utterance is too short consisting of only one syllable
                    // In that case we show a prompt like "It's OK to skip" » See annyang.js numberOfRestartsDespiteDetectionOfAudioInput » See /user_interface/text/??/0-if_something_is_not_working.txt
                  }
                  // -
                  if (!aMatchWasFound && searchResult) { // Note that compareAndSeeIfTheAnswerIsCorrect usually fires multiple times
                    aMatchWasFound = true; // By using this, we make sure that this block will fire only and only once
                    if (parent.annyang.getSpeechRecognizer().interimResults) { parent.console.log("Correct answer detected with interimResults enabled");
                      setTimeout(function () {
                        resolve("pass");
                        playTheSecondDingOnly = true;

                        //OLDER METHOD USED TO BE stopListeningAndProceedToNext();
                      }, 250); // Interim results is or can be too quick (especially on Windows)
                    } else { parent.console.log("Correct answer detected without interimResults");
                      resolve("pass");
                      playTheSecondDingOnly = true;

                      //OLDER METHOD USED TO BE stopListeningAndProceedToNext();
                    }
                  } else {
                    // Prevent a possible second firing (or any further firings) of stopListeningAndProceedToNext by doing nothing
                  }
                } // End of for z
              } // End of for k
            } // End of for j
          } // END OF compareAndSeeIfTheAnswerIsCorrect
        } // END OF if parent.annyang


        if (withinThisTimeLimit) {
          parent.console.log("Correct answer is expected before countdown completes in "+withinThisTimeLimit+"ms");
          new SuperTimeout(function () {
            resolve("fail");
            playTheSecondDingOnly = true;
          }, withinThisTimeLimit);
        }

        if (beforeThisManyRetriesHappen) {
          parent.console.log("Correct answer is expected in a maximum of "+beforeThisManyRetriesHappen+" retries");
          if (parent.annyang) {
            parent.annyang.getSpeechRecognizer().onaudioend = () => {
              if (parent.numberOfStartsAndRestartsRegardlessOfAudioInput>=beforeThisManyRetriesHappen) {
                parent.console.log("Correct answer was not detected despite "+beforeThisManyRetriesHappen+" retries");
                // parent.numberOfStartsAndRestartsRegardlessOfAudioInput will be reset back to 0 as abort fires in annyang.js
                parent.annyang.getSpeechRecognizer().onaudioend = null; // Remove the event listener
                resolve("fail");
                playTheSecondDingOnly = true;
              }
            };
          }
        }


    }); // End of new Promise
  } // End of if else for parent.internetConnectivityIsNiceAndUsable
} // End of seeIfUserIsAbleToPronounce
