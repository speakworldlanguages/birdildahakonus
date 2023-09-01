// NOTE THAT: Some modifications were applied to the original annyang.js file (in speakworldlanguages.app)
// 1 - Comments were removed to reduce the file size!
// 2 - Added link to https://webreflection.medium.com/taming-the-web-speech-api-ef64f5a245e1
// 3 - Added code to enable interimResults
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

//! annyang
//! version : 2.6.1
//! author  : Tal Ater @TalAter
//! license : MIT
//! https://www.TalAter.com/annyang/

(function (root, factory) {
  'use strict';

  if (typeof define === 'function' && define.amd) {
    // AMD + global
    define([], function () {
      return root.annyang = factory(root);
    });
  } else if ((typeof module === 'undefined' ? 'undefined' : _typeof(module)) === 'object' && module.exports) {
    // CommonJS
    module.exports = factory(root);
  } else {
    // Browser globals
    root.annyang = factory(root);
  }
})(typeof window !== 'undefined' ? window : undefined, function (root, undefined) {
  'use strict';



  var annyang;

  // Get the SpeechRecognition object, while handling browser prefixes
  var SpeechRecognition = root.SpeechRecognition || root.webkitSpeechRecognition || root.mozSpeechRecognition || root.msSpeechRecognition || root.oSpeechRecognition;

  // Check browser support
  // This is done as early as possible, to make it as fast as possible for unsupported browsers
  if (!SpeechRecognition) {
    return null;
  }

  var commandsList = [];
  var recognition;
  var callbacks = { start: [], error: [], end: [], soundstart: [], result: [], resultMatch: [], resultNoMatch: [], errorNetwork: [], errorPermissionBlocked: [], errorPermissionDenied: [] };
  var autoRestart;
  var lastStartedAt = 0;
  var autoRestartCount = 0;
  var debugState = false;
  var debugStyle = 'font-weight: bold; color: #00f;';
  var pauseListening = false;
  var _isListening = false;

  // The command matching code is a modified version of Backbone.Router by Jeremy Ashkenas, under the MIT license.
  var optionalParam = /\s*\((.*?)\)\s*/g;
  var optionalRegex = /(\(\?:[^)]+\))\?/g;
  var namedParam = /(\(\?)?:\w+/g;
  var splatParam = /\*\w+/g;
  var escapeRegExp = /[\-{}\[\]+?.,\\\^$|#]/g;
  var commandToRegExp = function commandToRegExp(command) {
    command = command.replace(escapeRegExp, '\\$&').replace(optionalParam, '(?:$1)?').replace(namedParam, function (match, optional) {
      return optional ? match : '([^\\s]+)';
    }).replace(splatParam, '(.*?)').replace(optionalRegex, '\\s*$1?\\s*');
    return new RegExp('^' + command + '$', 'i');
  };

  // This method receives an array of callbacks to iterate over, and invokes each of them
  var invokeCallbacks = function invokeCallbacks(callbacks) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    callbacks.forEach(function (callback) {
      callback.callback.apply(callback.context, args);
    });
  };

  var isInitialized = function isInitialized() {
    return recognition !== undefined;
  };

  // method for logging in developer console when debug mode is on
  var logMessage = function logMessage(text, extraParameters) {
    if (text.indexOf('%c') === -1 && !extraParameters) {
      console.log(text);
    } else {
      console.log(text, extraParameters || debugStyle);
    }
  };

  var initIfNeeded = function initIfNeeded() {
    if (!isInitialized()) {
      annyang.init({}, false);
    }
  };

  var registerCommand = function registerCommand(command, callback, originalPhrase) {
    commandsList.push({ command: command, callback: callback, originalPhrase: originalPhrase });
    if (debugState) {
      logMessage('Command successfully loaded: %c' + originalPhrase, debugStyle);
    }
  };

  var parseResults = function parseResults(results) {
    invokeCallbacks(callbacks.result, results);
    var commandText;
    // go over each of the 5 results and alternative results received (we've set maxAlternatives to 5 above)
    for (var i = 0; i < results.length; i++) {
      // the text recognized
      commandText = results[i].trim();
      if (debugState) {
        logMessage('Speech recognized: %c' + commandText, debugStyle);
      }

      // try and match recognized text to one of the commands on the list
      for (var j = 0, l = commandsList.length; j < l; j++) {
        var currentCommand = commandsList[j];
        var result = currentCommand.command.exec(commandText);
        if (result) {
          var parameters = result.slice(1);
          if (debugState) {
            logMessage('command matched: %c' + currentCommand.originalPhrase, debugStyle);
            if (parameters.length) {
              logMessage('with parameters', parameters);
            }
          }
          // execute the matched command
          currentCommand.callback.apply(this, parameters);
          invokeCallbacks(callbacks.resultMatch, commandText, currentCommand.originalPhrase, results);
          return;
        }
      }
    }
    invokeCallbacks(callbacks.resultNoMatch, results);
  };

  annyang = {


    init: function init(commands) { console.log("INIT ANNYANG");
      var resetCommands = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

      // Abort previous instances of recognition already running
      if (recognition && recognition.abort) {
        recognition.abort();
      }

      // initiate SpeechRecognition
      recognition = new SpeechRecognition();

      // THE LINE FOR interimResults IS NOT PART OF ORIGINAL ANNYANG.JS
      recognition.interimResults = true; // COULD THIS BE WHY IT STOPPED WORKING ON SAMSUNG ???

      // Set the max number of alternative transcripts to try and match with a command
      recognition.maxAlternatives = 5;

      // In HTTPS, turn off continuous mode for faster results.
      // In HTTP,  turn on  continuous mode for much slower results, but no repeating security notices
      recognition.continuous = root.location.protocol === 'http:';

      // Sets the language to the default 'en-US'. This can be changed with annyang.setLanguage()
      // WEIRD: For desktops it is possible to start without an initial default and yet on Android it looks like it doesn't work without an initial value
      // Or is it something else that is wrong???
      recognition.lang = 'en-US';

      recognition.onstart = function () { //console.log("Speech Recognition START event fired");
        _isListening = true;
        invokeCallbacks(callbacks.start);
      };

      recognition.onsoundstart = function () { //console.log("Speech Recognition SOUNDSTART event fired");
        invokeCallbacks(callbacks.soundstart);
      };

      // NOTE: See https://webreflection.medium.com/taming-the-web-speech-api-ef64f5a245e1

      recognition.onerror = function (event) {
        invokeCallbacks(callbacks.error, event);
        switch (event.error) {
          case 'network':
            invokeCallbacks(callbacks.errorNetwork, event);
            break;
          case 'not-allowed':
          case 'service-not-allowed':
            // if permission to use the mic is denied, turn off auto-restart
            autoRestart = false;
            // determine if permission was denied by user or automatically.
            if (new Date().getTime() - lastStartedAt < 200) {
              invokeCallbacks(callbacks.errorPermissionBlocked, event);
            } else {
              invokeCallbacks(callbacks.errorPermissionDenied, event);
            }
            break;
        }
      };

      recognition.onend = function () {
        _isListening = false;
        invokeCallbacks(callbacks.end);
        // annyang will auto restart if it is closed automatically and not by user action.
        if (autoRestart) {
          // play nicely with the browser, and never restart annyang automatically more than once per second
          var timeSinceLastStart = new Date().getTime() - lastStartedAt;
          autoRestartCount += 1;
          if (autoRestartCount % 10 === 0) {
            if (debugState) {
              logMessage('Speech Recognition is repeatedly stopping and starting. See http://is.gd/annyang_restarts for tips.');
            }
          }
          if (timeSinceLastStart < 1000) {
            setTimeout(function () {
              annyang.start({ paused: pauseListening });
            }, 1000 - timeSinceLastStart);
          } else {
            annyang.start({ paused: pauseListening });
          }
        }
      };

      recognition.onresult = function (event) {
        if (pauseListening) {
          if (debugState) {
            logMessage('Speech heard, but annyang is paused');
          }
          return false;
        }

        // Map the results to an array
        var SpeechRecognitionResult = event.results[event.resultIndex];
        var results = [];
        for (var k = 0; k < SpeechRecognitionResult.length; k++) {
          results[k] = SpeechRecognitionResult[k].transcript;
        }

        parseResults(results);
      };

      // build commands list
      if (resetCommands) {
        commandsList = [];
      }
      if (commands.length) {
        this.addCommands(commands);
      }
    },


    start: function start(options) { console.log("The start function of annyang fired");
      initIfNeeded();
      options = options || {};
      if (options.paused !== undefined) {
        pauseListening = !!options.paused;
      } else {
        pauseListening = false;
      }
      if (options.autoRestart !== undefined) {
        autoRestart = !!options.autoRestart;
      } else {
        autoRestart = true;
      }
      if (options.continuous !== undefined) {
        recognition.continuous = !!options.continuous;
      }

      lastStartedAt = new Date().getTime();
      try {
        recognition.start(); console.log("annyang should now be listening");
      } catch (e) { console.warn("!!! annyang recognition could not start !!!");
        if (debugState) {
          logMessage(e.message);
        }
      }
    },


    abort: function abort() { //console.log("The abort function of annyang fired");
      autoRestart = false;
      autoRestartCount = 0;
      if (isInitialized()) {
        recognition.abort();
      } else {
         console.warn("CANNOT abort because annyang isInitialized returned false");
      }
    },


    pause: function pause() {
      pauseListening = true;
    },


    resume: function resume() {
      annyang.start();
    },


    debug: function debug() {
      var newState = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

      debugState = !!newState;
    },


    setLanguage: function setLanguage(language) {
      initIfNeeded();
      recognition.lang = language;
    },


    addCommands: function addCommands(commands) {
      var cb;

      initIfNeeded();

      for (var phrase in commands) {
        if (commands.hasOwnProperty(phrase)) {
          cb = root[commands[phrase]] || commands[phrase];
          if (typeof cb === 'function') {
            // convert command to regex then register the command
            registerCommand(commandToRegExp(phrase), cb, phrase);
          } else if ((typeof cb === 'undefined' ? 'undefined' : _typeof(cb)) === 'object' && cb.regexp instanceof RegExp) {
            // register the command
            registerCommand(new RegExp(cb.regexp.source, 'i'), cb.callback, phrase);
          } else {
            if (debugState) {
              logMessage('Can not register command: %c' + phrase, debugStyle);
            }
            continue;
          }
        }
      }
    },


    removeCommands: function removeCommands(commandsToRemove) {
      if (commandsToRemove === undefined) {
        commandsList = [];
      } else {
        commandsToRemove = Array.isArray(commandsToRemove) ? commandsToRemove : [commandsToRemove];
        commandsList = commandsList.filter(function (command) {
          for (var i = 0; i < commandsToRemove.length; i++) {
            if (commandsToRemove[i] === command.originalPhrase) {
              return false;
            }
          }
          return true;
        });
      }
    },


    addCallback: function addCallback(type, callback, context) {
      var cb = root[callback] || callback;
      if (typeof cb === 'function' && callbacks[type] !== undefined) {
        callbacks[type].push({ callback: cb, context: context || this });
      }
    },


    removeCallback: function removeCallback(type, callback) {
      var compareWithCallbackParameter = function compareWithCallbackParameter(cb) {
        return cb.callback !== callback;
      };
      // Go over each callback type in callbacks store object
      for (var callbackType in callbacks) {
        if (callbacks.hasOwnProperty(callbackType)) {
          // if this is the type user asked to delete, or he asked to delete all, go ahead.
          if (type === undefined || type === callbackType) {
            // If user asked to delete all callbacks in this type or all types
            if (callback === undefined) {
              callbacks[callbackType] = [];
            } else {
              // Remove all matching callbacks
              callbacks[callbackType] = callbacks[callbackType].filter(compareWithCallbackParameter);
            }
          }
        }
      }
    },


    isListening: function isListening() {
      return _isListening && !pauseListening;
    },


    getSpeechRecognizer: function getSpeechRecognizer() {
      return recognition;
    },


    trigger: function trigger(sentences) {
      if (!annyang.isListening()) {
        if (debugState) {
          if (!_isListening) {
            logMessage('Cannot trigger while annyang is aborted');
          } else {
            logMessage('Speech heard, but annyang is paused');
          }
        }
        return;
      }

      if (!Array.isArray(sentences)) {
        sentences = [sentences];
      }

      parseResults(sentences);
    }
  };

  return annyang;
});
