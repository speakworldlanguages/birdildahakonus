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


window.addEventListener("load",checkLocalStorageToHandleData,{once:true});
function checkLocalStorageToHandleData() {
  if (localStorage.getItem("thisUserIsAlreadyCounted")) {
      // console.log("returning user"); // Works OK
  } else {
      // Initialize Firebase
      const app = initializeApp(firebaseConfig);
      const db = getDatabase(app);
      setTimeout(function () {
        const apiURL = 'https://api.ipify.org?format=json';
        const user_agent_string = navigator.userAgent;
        let response; let data; let aypii="0.0.0.0";
        // Function to get IP address
        async function getIPAddress() {
            try {
                response = await fetch(apiURL);
                data = await response.json();
                aypii = data.ip; // NOT CERTAIN what happens when the IP is hidden
            } catch (error) {
                console.error('Error fetching IP address:', error);
            } finally {
              // Write to firebase realtime database regardlessly, either if IP check succeeds or fails
                set(ref(db, "user-session-"+Date.now()), {
                  user_interface: userInterfaceLanguage,
                  ip: aypii,
                  ua_string: user_agent_string
                }).then(()=>{
                  console.log("app statistics saved"); // Works OK
                  localStorage.setItem("thisUserIsAlreadyCounted","yes");
                }).catch((error)=>{
                  console.log("couldn't save user: "+error);
                });
            }
        }
        // Call the function to get IP address on page load
        getIPAddress();
      }, 3333); // Those who spent at least 30 seconds in the app
  }
}
