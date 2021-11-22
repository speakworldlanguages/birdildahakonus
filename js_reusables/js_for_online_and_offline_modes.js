function updateOnlineStatus() {

    if( navigator.onLine ){
        //alert( 'now you are: online');

    }else{
        //alert( 'now you are: offline');
        // Especially important if the app has been launched as PWA from desktop or homescreen
        // Try to keep the app running,,, let resources load from cache - OK
        // Can speech recognition work offline??? Looks like it can. The MDN Speech Color Changer works offline. Annyang doesn't work offline.
    }

}

window.addEventListener('online',  updateOnlineStatus );
window.addEventListener('offline', updateOnlineStatus );
window.addEventListener("DOMContentLoaded",updateOnlineStatus,{once:true});
// See js_for_handling_speech_give_up
