// PUT THIS INSIDE js_for_every_single_html.js

// Without DOMContentLoaded, <script defer src> lines must be reordered inside index.html's <head> so that this is called after js_for_every_single_html.js
// Otherwise userInterfaceLanguage will return UNDEFINED.
//window.addEventListener('DOMContentLoaded', function(){

// See js_for_every_single_html.js for userInterfaceLanguage.

var myHeaders = new Headers();
// Apache server default ayarları yüzünden böyle buna gerek var.
if (parent.theLanguageUserIsLearningNowToSetFilePaths=="tr" || userInterfaceLanguage=="tr") {
  // Çağrılan txt dosyasındaki ÇĞİÖŞÜçğıöşü'nın ��������� yerine doğru görünmesi için charset=iso-8859-9 gerek; charset=utf-8 ile olmuyor.
  // Dikkat! Bunun doğru çalışması için çağrılan txt dosyasının UTF-8 ile kaydedilmiş olması gerek.
  myHeaders.append('Content-Type','text/plain; charset=iso-8859-9');
}

// Arabic.txt fetch works fine without this headers thing on Windows and Android.
// BIG QUESTION: Could the same problem exist with Arabic or Renic (Chinese) on iOS?

//}, { once: true });

// There is also TextDecoder which could be used INSTEAD OF HEADERS. But HEADERS is just simpler.
// See https://schneide.blog/2018/08/08/decoding-non-utf8-server-responses-using-the-fetch-api/
/*fetch(filePathForTheWordOrPhrase).then(response => response.arrayBuffer()).then(buffer => {
    let decoder = new TextDecoder("iso-8859-9");
    let text = decoder.decode(buffer);
    console.log(text);
    //handleText(text);
  });*/
