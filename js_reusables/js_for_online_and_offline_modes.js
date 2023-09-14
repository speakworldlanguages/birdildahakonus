"use strict";
// Reliable and continuous detection of internet connectivity beyond online and offline events
// Limitations of online and offline events are clearly stated by mozilla.org
// https://developer.mozilla.org/en-US/docs/Web/API/Navigator/onLine
// The basic workaround logic
// https://dev.to/maxmonteil/is-your-app-online-here-s-how-to-reliably-know-in-just-10-lines-of-js-guide-3in7
// For https://speakworldlanguages.app a number of improvements were added as seen below

var internetConnectivityIsNiceAndUsable = null; // As of August 2023 this is never used at parent level // First usage is in index.html of lesson 111
async function updateOnlineStatus() {
  if (window.navigator.onLine) {
    // At this point it could be a false positive. We cannot be certain until fetch gives its final say
    // Get ready to check if internet connection is indeed functional and actually working
    const url = new URL(window.location.origin); // Avoid CORS errors by not getting any third-parties involved
    // Unique value to prevent cached responses
    url.searchParams.set('makeitunique', String(Date.now()));
    let waitBeforeCallingItNoGood = null; // See if extreme slowness is making the internet unusable
    try {
      const controller = new AbortController();
      waitBeforeCallingItNoGood = setTimeout(function () { controller.abort(); }, 6000); // Force fetch to throw an error so that the catch block will be executed in case time is out
      // Normally a response is expected in the range of a few milliseconds to a couple of seconds, depending on the network conditions and the server's response time
      // NOTE-THAT »»» HEAD is not the HTML <head> » It's the HEADERS part of the fetch operation » In humanized terms it's like "Q:Hey, are you there? A:Yes, I am here."
      const response = await fetch( url.toString(), { method: 'HEAD', signal: controller.signal } ); // Intentional abortion is counted as an error
      // Since await will temporarily pause the code execution, the following will be delayed until fetch provides its response
      clearTimeout(waitBeforeCallingItNoGood);
      if (response.ok) {  internetConnectivityIsNiceAndUsable = true;  }
      else {  internetConnectivityIsNiceAndUsable = false;  }
    } catch (error) {
      internetConnectivityIsNiceAndUsable = false;
      console.warn("The fetch in updateOnlineStatus function couldn't get any response within the time limit");
    }
  } else { // window.navigator.onLine returned false
    internetConnectivityIsNiceAndUsable = false;
    // There is actually a case in which fetch could get the assets despite window.navigator.onLine returns false
    // And that is when you activate a mobile device's WiFi hotspot router and connect to the PC where XAMPP is the http/https server
    // Why not handle that here when we can
    const url = new URL(window.location.origin);
    const response = await fetch( url.toString(), { method: 'HEAD' } );
    if (response.ok) {  internetConnectivityIsNiceAndUsable = true;  }
  }
}
// ---
// IMPORTANT!!! In the beginning internetConnectivityIsNiceAndUsable will be null until fetch gives its response which can take up to 6 seconds
updateOnlineStatus();
window.addEventListener('online', function () { updateOnlineStatus(); console.warn(".::ONLINE event fired::."); });
window.addEventListener('offline', function () { updateOnlineStatus(); console.warn(".::OFFLINE event fired::."); });
// Use an interval check in case internet conncetion has become unusable and yet offline event never fires to detect that change
setInterval(updateOnlineStatus,7000);


// Whenever iframe.src is about to change store&save the destination and detour to you_are_offline.html if is offline or if speed is too terrible
var pathOfWhatWillBeDisplayedUnlessInternetConnectivityIsLost; // Example: See water.js in lessons_in_iframes/level_1/unit_1/lesson_1
// ---
function proceedToTheNextLessonNowThatWeAreOnlineAgain() { // See user_interface/screens/??/you_are_offline.html
  /* WE COULD:
  const iFrameInOnlineOfflineModes = document.getElementsByTagName('IFRAME')[0];
  iFrameInOnlineOfflineModes.src = pathOfWhatWillBeDisplayedUnlessInternetConnectivityIsLost;
  */
  // BUT: Better stay as safe as possible by using the variable in js_for_the_parent_all_browsers_all_devices
  ayFreym.src = pathOfWhatWillBeDisplayedUnlessInternetConnectivityIsLost;
}
