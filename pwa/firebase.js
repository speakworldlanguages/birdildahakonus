// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// The web app's Firebase configuration
const breakTheKeyToDefendItPiece1 = "A"; const breakTheKeyToDefendItPiece2 = "IzaSyDBOViYjYY_qAl_rnkFlYuN1ttohoSCNrM";
const breakTheBucketToDefendItPiece1 = "s"; const breakTheBucketToDefendItPiece2 = "peakworldlanguages-36b72.appspot.com";
const firebaseConfig = {
  apiKey: breakTheKeyToDefendItPiece1+breakTheKeyToDefendItPiece2,
  authDomain: "speakworldlanguages-36b72.firebaseapp.com",
  projectId: "speakworldlanguages-36b72",
  storageBucket: breakTheBucketToDefendItPiece1+breakTheBucketToDefendItPiece2,
  messagingSenderId: "31786044285",
  appId: "1:31786044285:web:2f0ddd5b23cab8f3249a14"
};

const tokenPart1 = "9555ec"; const tokenPart2 = "0b30003e"; // ipinfo.io access

function getPresentDate() {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const month = monthNames[currentDate.getMonth()];
  const day = String(currentDate.getDate()).padStart(2, '0');
  const hour = String(currentDate.getHours()).padStart(2, '0');
  const minute = String(currentDate.getMinutes()).padStart(2, '0');
  const second = String(currentDate.getSeconds()).padStart(2, '0');
  const formattedDateTime = `${year}-${month}-${day}|${hour}:${minute}:${second}`; //console.log(formattedDateTime);
  return formattedDateTime;
}

window.addEventListener("load",checkLocalStorageToHandleData,{once:true});
function checkLocalStorageToHandleData() {
  if (localStorage.getItem("thisUserIsAlreadyCounted")) {
      // console.log("returning user"); // Works OK
  } else {
      // Initialize Firebase
      const app = initializeApp(firebaseConfig);
      const db = getDatabase(app);

      let jsonResponse1 = {ip: "?.?.?.?",country:"?",region:"?",city:"?"};
      setTimeout(function () {
        /* Before September 2024
        const apiURL = 'https://api.ipify.org?format=json';
        let response; let data; let aypii="0.0.0.0";
        */
        // DEPRECATED: const user_agent_string = navigator.userAgent; // Use clean strings from ua-parser-js instead
        // Function to get IP address
        async function getIPAddress() {
            try {
                /* Before September 2024
                response = await fetch(apiURL);
                data = await response.json();
                aypii = data.ip; // NOT CERTAIN what happens when the IP is hidden
                */
                const request1 = await fetch("https://ipinfo.io/json?token="+tokenPart1+tokenPart2);
                jsonResponse1 = await request1.json();
            } catch (error) {
                console.error('Error fetching IP address:', error);
            } finally {
                // Write to firebase realtime database regardlessly, either if IP check succeeds or fails
                set(ref(db, "New users from "+jsonResponse1.country+"/"+jsonResponse1.region+"/"+jsonResponse1.city+" at "+getPresentDate()), {
                  /* Before September 2024
                  user_interface: userInterfaceLanguage,
                  ip: aypii,
                  ua_string: user_agent_string*/
                  appDomain: location.href,
                  eyepea: jsonResponse1.ip,
                  using: detectedBrowserName+" on "+detectedOS_name+" using a "+detectedBrandName+" "+deviceDetector.device, // See js_for_different_browsers_and_devices
                  arrivedFrom: document.referrer || "unknown"
                }).then(()=>{
                  console.log("User visit saved"); // Works OK
                  localStorage.setItem("thisUserIsAlreadyCounted","yes");
                }).catch((error)=>{
                  console.log("Couldn't save user: "+error);
                });
            }
        }
        // Call the function to get IP address on page load
        getIPAddress();
      }, 33333); // Ignore those who spent less than about 30 seconds in the app
  }
}

//Function for tracking navigation to financial third-party
export async function savePotentialDonor() { // See information.js
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const db = getDatabase(app);
  let jsonResponse2 = {ip: "?.?.?.?",country:"?",region:"?",city:"?"};
  try {
      const request2 = await fetch("https://ipinfo.io/json?token="+tokenPart1+tokenPart2);
      jsonResponse2 = await request2.json();
  } catch (error) {
      console.error('Error fetching IP address:', error);
  } finally {
    set(ref(db, "Possible donor(s) from "+jsonResponse2.country+"/"+jsonResponse2.region+"/"+jsonResponse2.city+" at "+getPresentDate()), {
      appDomain: location.href,
      eyepea: jsonResponse2.ip,
      using: detectedBrowserName+" on "+detectedOS_name+" using a "+detectedBrandName+" "+deviceDetector.device // See js_for_different_browsers_and_devices
    }).then(()=>{
      console.log("Potential donor's visit saved"); // Works OK
    }).catch((error)=>{
      console.log("Couldn't save potential donor: "+error);
    });
  }
}
window.savePotentialDonor = savePotentialDonor; // Expose the module function to global scope
