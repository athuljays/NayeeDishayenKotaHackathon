function startDictation() {
    document.getElementById("gov-form").classList.add("hide");
    document.getElementById("error").innerHTML = '';
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


function processForm(data) {
    if(!data) {
        document.getElementById("loading").classList.add("hide");
        document.getElementById("error").innerHTML = 'No form found';
        return;
    }
    var formField = JSON.parse(data).queryParam;
    console.log(formField);

    var container = document.getElementById("container");
    // Clear previous contents of the container
    while (container.hasChildNodes()) {
        container.removeChild(container.lastChild);
    }

    document.getElementById("loading").classList.add("hide");
    document.getElementById("gov-form").classList.remove("hide");

    var label= document.createElement("label");
    label.for = formField;
    label.innerHTML = formField + ":";
    container.appendChild(label);

    var input = document.createElement("input");
    input.type = "text";
    input.name = formField;
    input.placeholder= formField;
    input.required= true;
    container.appendChild(input);
    container.appendChild(document.createElement("br"));
}

function findForm(request) {
    var englishText = JSON.parse(request).data.translations[0].translatedText;
    console.log(englishText);
    var url = "http://172.16.34.103:7070/resolve_query?query=" + englishText;

    var data = new FormData();
    post(url, data, processForm);
}

function translate(text) {
    var data = new FormData();
    data.append("source", "hi");
    data.append("q", text);
    data.append("format", "text");
    data.append("target", "en");
    data.append("key", "AIzaSyDRWDh17AvbsqB5tC6k3p3FDerLdb_nZ_s");
    post("https://translation.googleapis.com/language/translate/v2", data, findForm);

}


function post(url, data, callback) {
    var xhr = new XMLHttpRequest();
    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            if(this.status == 200) {
                callback(this.responseText);
            }else {
                callback(false);
            }
        }
    });
    xhr.open("POST", url);
    xhr.send(data);
}

function submitForm(){
    alert('Form Submitted succesfully. Request under Process');
    return false;
};