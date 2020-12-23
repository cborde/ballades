document.addEventListener("DOMContentLoaded", function(_e) {
	
	function addInDataJSON(data, name, notes, latitude, longitude){
		console.log("ADD IN JSON");
		console.log(name);
		console.log(notes);
		console.log(latitude);
		console.log(longitude);
		
		var dataJSON = JSON.parse(data);
		var lieux = dataJSON.Lieux;
		
		var objL = {
			"Nom" : name,
			"Latitude" : latitude,
			"Longitude" : longitude,
			"Notes" : notes
		};
		lieux.push(objL);
		
	}
	
	
	/*
	 * MAIN
	 */
	 
	 //Get parametres de l'url
	 const queryString = window.location.search;
	 const urlParams = new URLSearchParams(queryString);
	 
	 var latitude = urlParams.get('lat');
	 var longitude = urlParams.get('lon');
	 
	 if (latitude == null || latitude == undefined || longitude == null || longitude == undefined){
		 alert("Mauvaise utilisation du site !");
	 }
	 
	 document.getElementById("latSpan").innerHTML = latitude;
	 document.getElementById("lonSpan").innerHTML = longitude;
	 
	 document.getElementById("addPlaceButton").addEventListener("click", function(){
		 var name = document.getElementById("name").value;
		 var notes = document.getElementById("notes").value;
		 
		 var xobj = new XMLHttpRequest();
		 xobj.overrideMimeType("application/json");
		 xobj.open('GET', '../donnees/data.json', true);
		 xobj.onreadystatechange = function() {
		 	 if (xobj.readyState == 4 && xobj.status == "200") {

				// .open will NOT return a value but simply returns undefined in async mode so use a callback
				//callback(xobj.responseText);
				//console.log(xobj.responseText);
			 	addInDataJSON(xobj.responseText, name, notes, latitude, longitude);
			 }
		 }
		 xobj.send(null);
		 
	 });
	
});