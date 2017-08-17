function startDictation() {
    if (window.hasOwnProperty('webkitSpeechRecognition')) {
        var recognition = new webkitSpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = "hi-IN";
        recognition.start();

        recognition.onresult = function(e) {
            var hindiText = e.results[0][0].transcript;
            document.getElementById('transcript').value = hindiText;
            recognition.stop();
            document.getElementById("loading").classList.remove("hide");
            translate(hindiText);
        };
        recognition.onerror = function(e) {
            recognition.stop();
        }
    }
}

function translate(text) {
    var data = new FormData();
    data.append("source", "hi");
    data.append("q", text);
    data.append("format", "text");
    data.append("target", "en");
    data.append("key", "AIzaSyDRWDh17AvbsqB5tC6k3p3FDerLdb_nZ_s");

    var xhr = new XMLHttpRequest();
    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            var response = JSON.parse(this.responseText);
            englishText = response.data.translations[0].translatedText;
            console.log(englishText);
        }
    });
    xhr.open("POST", "https://translation.googleapis.com/language/translate/v2");
    xhr.send(data);
}