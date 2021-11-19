/* ____ PWA ____ */
const installButton = document.getElementById('footerInstallID');
const allowNotificationButton = document.getElementById('footerNotificationID'); // Same thing is named clickToSubscribe in notify_**.js
const containerFooter = document.getElementsByTagName('FOOTER')[0]; // Same thing is named containerOfSubscribe in notify_**.js
let canAskUserIfHeSheWantsToGetNotifiedAboutNewStuff=false;

window.addEventListener("load",handleDesktopTabletPhoneETC,{once:true});
function handleDesktopTabletPhoneETC() {
  /**/
  if (deviceDetector.device == "tablet") {
    installButton.children[0].style.display = "none"; installButton.children[1].style.display = "block"; // Tablet img instead of desktop
  } else if (deviceDetector.device == "phone") {
    installButton.children[0].style.display = "none"; installButton.children[2].style.display = "block"; // Phone img instead of desktop
  }
  if (deviceDetector.isMobile) {
    installButton.children[3].style.display = "none"; installButton.children[4].style.display = "block"; // Touch txt instead of click for install
    allowNotificationButton.children[1].style.display = "none"; allowNotificationButton.children[2].style.display = "block"; // Touch txt instead of click for notification
    containerFooter.classList.remove("footerDesktop"); containerFooter.classList.add("footerTabletAndPhone");
  }

  if (detectedOS.name == "iOS") { // As of 2021 iOS is the only platform that has neither notification nor installation
    containerFooter.parentNode.removeChild(containerFooter);
  }

  if ('Notification' in window) { canAskUserIfHeSheWantsToGetNotifiedAboutNewStuff = true; }
  else {  allowNotificationButton.parentNode.removeChild(allowNotificationButton);  }
  // As of 2021 all browsers that support beforeinstallprompt also support Notification

  /**/
}

function revealNotificationAndInstallation_2in1_button() {
  const main = document.getElementsByTagName('MAIN')[0];
  const footer = document.getElementsByTagName('FOOTER')[0];
  if (main.contains(footer)) {
    if (deviceDetector.isMobile) {
      footer.classList.add("footerSlideAppearMobile");
    } else {
      footer.classList.add("footerSlideAppearDesktop");
    }
  }
}

function hideNotificationAndInstallation_2in1_button() {
  //alert("work????");
  const main = document.getElementsByTagName('MAIN')[0];
  const footer = document.getElementsByTagName('FOOTER')[0];
  if (main.contains(footer)) {
    //alert("work?");
    if (deviceDetector.isMobile) {
      footer.classList.remove("footerSlideAppearMobile");
    } else {
      footer.classList.remove("footerSlideAppearDesktop");
    }
  }
}

// Convert from Notification to Installation IF CAN INSTALL
// WATCH: display flex
let doYouWantToInstallprompt;
window.addEventListener("beforeinstallprompt",turnNotificationIntoInstallation);
function turnNotificationIntoInstallation(e) {
  console.log("beforeinstallprompt fired");
  e.preventDefault(); // Chrome 67 and earlier needs this
  doYouWantToInstallprompt = e;
  allowNotificationButton.style.display = "none"; // Probably OK even after removeChild
  installButton.style.display = "flex";
  revealNotificationAndInstallation_2in1_button();
  installButton.addEventListener("click",showInstall_PWA_prompt,{once:true});
}

/* __ PWA __ install prompt __ */
function showInstall_PWA_prompt() {

    doYouWantToInstallprompt.prompt();
    doYouWantToInstallprompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === "accepted") {
        // On desktops there is a special case for the very first install
        // In this case the app doesn't actually restart but is just detached as an independent tab from the main window
        installButton.children[0].style.display = "none"; installButton.children[1].style.display = "none"; installButton.children[2].style.display = "none"; // Hide whatever image
        installButton.children[3].style.display = "none"; installButton.children[4].style.display = "none"; // Hide whatever text
        if (deviceDetector.device == "desktop") { // Desktop Chrome automatically switches to standalone mode.
          if (canAskUserIfHeSheWantsToGetNotifiedAboutNewStuff) { // Notification as 2nd step after installation
            allowNotificationButton.style.display = "flex"; // revert back to notification // notification click event is handled in notify_**.js
            installButton.style.display = "none";
          } else { // Unreal scenario: INSTALLATION WAS POSSIBLE BUT NOTIFICATION ISN'T // We don't know what will happen with Apple
            containerFooter.classList.add("footerGetLost"); // Disappear animation via transition (not keyframes)
            setTimeout(function () { containerFooter.parentNode.removeChild(containerFooter); },500);
          }
          //localStorage.appInstallationWasAcceptedOnDesktop = "yes"; // Necessary? See if there is any use case
        } else { // Mobile Chrome doesn't automatically switch to the Homescreen app.
          installButton.children[5].style.display = "block"; // Reads: You can close this and start the app from Home screen
          containerFooter.onclick = function(){ window.close(); }; // The first launch from Homescreen must show notification button
          //localStorage.appInstallationWasAcceptedOnMobile = "yes"; // Necessary? See if there is any use case
        }

        localStorage.appInstallationWasAccepted = "yes"; // Use this to check if user is viewing the app in a browser tab DESPITE having installed it
        // BUT WAIT: App can also be installed without beforeinstallprompt

      } else { // Install-prompt was rejected or dismissed
        if (canAskUserIfHeSheWantsToGetNotifiedAboutNewStuff) { // Become notification button once again
          allowNotificationButton.style.display = "flex"; // notification click event is handled in notify_**.js
          installButton.style.display = "none";
        } else { // Unreal scenario: INSTALLATION WAS POSSIBLE BUT REJECTED - NOTIFICATION ISN'T POSSIBLE // Because we don't know what will happen with Apple
          containerFooter.classList.add("footerGetLost"); // Disappear animation via transition (not keyframes)
          setTimeout(function () { containerFooter.parentNode.removeChild(containerFooter); },500);
        }
      }
      doYouWantToInstallprompt = null;
    });

}

/*_CHECK IF APP IS RUNNING STANDALONE OR IS HOSTED BY THE BROWSER TAB_*/
const checkUrlToSeeLaunchingOrigin = window.location.href;
const searchResult = checkUrlToSeeLaunchingOrigin.search("installed"); // The search() method returns -1 if no match is found. See manifest_**.json -> start_url

window.addEventListener("DOMContentLoaded",whetherTheAppIsRunningStandaloneF,{once:true});
function whetherTheAppIsRunningStandaloneF() {
  // REGARDLESS OF HOW THE APP IS STARTED
  // Standalone or inside browser tab; either way, first check if notifications are allowed as soon as DOMContentLoaded
  if (localStorage.isSubscribedToNotifications) { //
    containerFooter.parentNode.removeChild(containerFooter);
  } else if ("permissions" in navigator) {
    const notificationPermissionPromise = navigator.permissions.query({name:'notifications'});
    notificationPermissionPromise.then(function(result) {
      if (result.state == 'granted') {
        localStorage.isSubscribedToNotifications = "yes"; // This should have been set in notify_**.js already but just in case something broke
        containerFooter.parentNode.removeChild(containerFooter); // Can't subscribe without installing the app
      }
    }).catch((err) => {
      console.log(err);
    });
  }
  // DEPENDING ON HOW THE APP IS STARTED
  if (searchResult != -1) { // The app is running standalone
    // TRIED: getElementById('id') to get the script and remove it but that didn't work with DOMContentLoaded -> Maybe it would with "load" but that's too late to save download time
    localStorage.appInstallationWasAccepted = "absolutely"; // This opens a door to cheating -> If a first time user typed "index.html?installed" into the browser's address bar, the app would falsely accept itself as installed. But we don't expect that to happen.
    /*We don' want any install prompts anymore: Not certain whether this is really necessary but can't be too safe*/
    window.removeEventListener("beforeinstallprompt",turnNotificationIntoInstallation);
    /*We don't need the rotating-globe tab-icon animation*/
    fixedTitleWhenStandalone(); // See js_for_icon_and_title_animation
    //titleAnimationIsUnnecessaryForStandalone.parentNode.removeChild(titleAnimationIsUnnecessaryForStandalone);
    // If this is the first time in standalone mode we should let user see the notifications button
  } else { // The app is in the browser; not in standalone mode
    // CASE 1: If it is a normal first visit then let the notification button be.
    // In this case browsers that fire beforeinstallprompt will turn [notification] into [installation] shortly after page load
    // Other browsers (like Safari on Mac OS) will show keep showing the notification button
    // CASE 2: App is installed BUT for some reason user is still viewing the app on the browser even though he/she could have used the desktop or Homescreen version
    // In this case we can try and check if the app is already installed
    if (localStorage.appInstallationWasAccepted) {
     window.removeEventListener("beforeinstallprompt",turnNotificationIntoInstallation);
    }
  }
}


/* appinstalled FIRES ONLY ONCE DURING THE LIFETIME OF THE APP */ /* Side note: Clearing local storage from the browser will clear the app's data too */
/* MDN says, appinstalled is deprecated and according to support table it fires only on Chrome and Edge */
/* Maybe we can use appinstalled to fix mobile chrome's [not switching to standalone app automatically when download completes] thing */
if (deviceDetector.isMobile) {
  // appinstalled doesn't fire after download is completed. It fires immediately when user clicks [Install]
  // there is no way to detect when exactly installation finishes
  // the only option left is a guesstimation of how long it would take to download 400kb~500kb and add it to the home screen
  window.addEventListener("appinstalled",(evt)=>{  whenAppinstalledFiresOnMobile();  }); // Force switch to standalone mode for Android
  function whenAppinstalledFiresOnMobile() {
    setTimeout(function () {  window.location.reload();  },15000); // Try to refresh about 15 seconds after [Install] is clicked.
  }
} else {
  window.addEventListener("appinstalled",(evt)=>{  whenAppinstalledFiresOnDesktop();  }); // Force switch to standalone mode for Android
  function whenAppinstalledFiresOnDesktop() {
    setTimeout(function () {  window.location.reload();  },100); // Try to refresh immediately because DOMContentLoaded must fire to check if app is installed
  }
}
