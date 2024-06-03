// MODULE OR NO MODULE ???
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.3.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.3.0/firebase-analytics.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/9.3.0/firebase-database.js"; // No need: get, child, update, remove
import { getMessaging, getToken, onMessage } from "https://www.gstatic.com/firebasejs/9.3.0/firebase-messaging.js";

var brokenApiKey = "IzaSyDYBQrC1GFMYtsWtR8tOTanfE09I4alX50"; // See if can hide this using glitch or heroku
// fetch()
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "A"+brokenApiKey,
  authDomain: "using-firebase-service.firebaseapp.com",
  databaseURL: "https://using-firebase-service-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "using-firebase-service",
  storageBucket: "using-firebase-service.appspot.com",
  messagingSenderId: "624023469269",
  appId: "1:624023469269:web:57354f114e4f82e5f1765c",
  measurementId: "G-JMY3GKP4RH"
};

const firebaseApp = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebaseApp);
const messaging = getMessaging(firebaseApp);
const db = getDatabase();

var index = new Date();
var tokenToBeSaved = "0";
function insertData() {
  set(ref(db,"ja/"+index.toUTCString()),{"Token":tokenToBeSaved}).then(()=>{console.log("token is saved");}).catch((error)=>{console.log("couldn't save token: "+error);});
}
const brokenVapidKey = "B7_p1Mfhfo4YbGkmKRDjemU0tPEGcZ3zzysITjcrPMzjR3x38cKyRmzG1T7ID3YdXC-QqSRgxLntBmAJ8tkn04";

const clickToSubscribe = document.getElementById('footerNotificationID'); // OUTDATED
const containerOfSubscribe = document.getElementsByTagName('FOOTER')[0]; // OUTDATED
clickToSubscribe.addEventListener("click",subscribeUser,{once:true}); // Do we need once:true? Probably yes
// On the very first visit serviceWorker registration happens about 1 second after page load
// In this case do we need to check and wait until serviceWorker fires activate ???
const reg = await getSW();
function getSW() {  return navigator.serviceWorker.getRegistration('service-worker.js');  }
function subscribeUser() {
  Notification.requestPermission().then(permission=>{
    if (permission == "granted") { // User clicks/touches [ALLOW]
      containerOfSubscribe.classList.add("footerGetLost"); // Disappear animation via transition (not keyframes)
      setTimeout(function () { containerOfSubscribe.parentNode.removeChild(containerOfSubscribe); },500);
      localStorage.isSubscribedToNotifications = "yes"; // Used in js_for_pwa.js
      getToken(messaging, {vapidKey:"B"+brokenVapidKey}).then((currentToken) => {
        tokenToBeSaved = currentToken;
        insertData();
        // var notification = new Notification('Great', { body: "You will be notified when new lessons are online", icon: "user_interface/homescreen_icon/icon_for_pwa_en.png" }); // THIS DOESN'T WORK!
        reg.showNotification('登録ありがとうございます',
        { body: "新レッソンのお知らせはこちらになります", badge: "user_interface/images/push_notification/badge.png", icon: "user_interface/homescreen_icon/icon_for_pwa_ja.png", image: "user_interface/images/push_notification/notification_image.jpg" });

      }).catch((err) => {
        console.log('An error occurred while retrieving token. ', err);
      });
    }
  });
}

onMessage(messaging, (payload) => {
  // What to do if notification arrives when user is active and playing a game
  // Nothing or wait until user is idle
});
