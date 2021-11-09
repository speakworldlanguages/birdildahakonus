/*____________*/
// Odtü detector
var detectODTUscript = document.createElement('script');
detectODTUscript.setAttribute('type', 'application/javascript');
detectODTUscript.setAttribute('src', 'https://api.ipify.org?format=jsonp&callback=getIP'); // They offer free ($0) unlimited requests per month for bare IP numbers only without geolocation.
document.getElementsByTagName('head')[0].appendChild(detectODTUscript);

function getIP(json) {
    var aypii = json.ip;
    var ilk7karakter = aypii.substring(0,7);
    setTimeout(function () {
      if (ilk7karakter == "144.122") {
        var answer = prompt("ODTÜ’de iyi insan azdır. Sen iyi insan mısın? İyi insan isen EVET diye", "buraya yaz. If you don’t speak Turkish please type NOTURKISH and click OK.");
        if (answer == "evet" || answer == "Evet" || answer == "EVET" || answer == "NOTURKISH") {
          // Engel yok
        }
        else {
          document.body.style.display = "none";
        }
      }
    },1000);
 }

// /*Above method is used instead of putting the following inside the html document*/ <script type="application/javascript" src="https://api.ipify.org?format=jsonp&callback=getIP"></script> //
