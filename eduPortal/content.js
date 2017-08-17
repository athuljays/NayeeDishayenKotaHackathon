var visibleText = $(document.body).children(":visible").text();

var visibleWords = visibleText.replace(/[^a-zA-Z0-9 ]/g, " ").split(' ');

var uniqueWords = new Set();

var query = [];

visibleWords.forEach(function(word) {
uniqueWords.add(sanitize(word)); 
});

uniqueVisibleWords = Array.from(uniqueWords);
function sanitize(str) {
return str.toLowerCase().trim();
}
console.log(uniqueVisibleWords);

chrome.runtime.sendMessage({"arrays":uniqueVisibleWords}, function(response) { console.log(response); localStorage.setItem("wordVectors",JSON.stringify(response)) });

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        query[0] = request.message;
        chrome.runtime.sendMessage({"arrays":query}, function(response) { 
        	console.log(response); 
   	        var myHilitor = new Hilitor();
        	if(response.vectorObject[query[0]] == undefined){
        		myHilitor.remove();
        		return;
        	}
			var JsonObject = localStorage.getItem("wordVectors");
				JsonObject = JSON.parse(JsonObject);
			var candidates = [];
        	for (var i = 0; i < Object.keys(JsonObject.vectorObject).length; i++) { 
        		var cosineDistanceSquared = 0;
        		for (var j = 0; j < 50; j++) {

        			 //console.log(JsonObject.vectorObject[Object.keys(JsonObject.vectorObject)[i]][j]); 
        			 cosineDistanceSquared += Math.pow( JsonObject.vectorObject[Object.keys(JsonObject.vectorObject)[i]][j] - response.vectorObject[query[0]][j] ,2);

        		}
        		cosineDistance = Math.sqrt(cosineDistanceSquared);
        		//if(i==466)debugger;
        		candidates[Object.keys(JsonObject.vectorObject)[i]] = cosineDistance;  
				}

				candidates.sort();

        var wordList = [];
        for ( entry in candidates) {
        	wordList.push(entry);
        }
        var temp;
        for(var k=0; k < wordList.length;  k++) {
        	for( var l = k+1; l< wordList.length; l++ ) {
        		if ( candidates[wordList[k]] > candidates[wordList[l]] ){
        			temp = wordList[k];
        			wordList[k] = wordList[l];
        			wordList[l] = temp;
        		}
        	}
        }
        var hightlightArray = query[0];
        for(var m=0; m < wordList.length;  m++) {
        	if(candidates[wordList[m]] <4.4 && wordList[m].length>4) {
        		hightlightArray += " " + wordList[m];
        	}
        }
  			myHilitor.apply(hightlightArray);
        	console.log("11111HIGHLIGHTARRAY"+hightlightArray);
         });
});