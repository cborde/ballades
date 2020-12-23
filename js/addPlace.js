document.addEventListener("DOMContentLoaded", function(_e) {
	
	function createDownload(text, file){
		var c = document.createElement("A");//Ne pas toucher "A";
		var d = document.body;
		d.appendChild(c);
		c.href = 'data:json/plain;charset=utf-8,' + encodeURIComponent(text);
		c.download = file;
		c.click();
		d.removeChild(c);
	}
	
	function addInDataJSON(data, name, notes, latitude, longitude){
		/*console.log("ADD IN JSON");
		console.log(name);
		console.log(notes);
		console.log(latitude);
		console.log(longitude);*/
		
		var dataJSON = JSON.parse(data);
		var lieux = dataJSON.Lieux;
		
		var objL = {
			"Nom" : name,
			"Latitude" : parseFloat(latitude),
			"Longitude" : parseFloat(longitude),
			"Notes" : notes,
			"Categorie" : "A faire"
		};
		lieux.push(objL);
		
		var jsonObj = {
			"Categories" : dataJSON.Categories,
			"Lieux" : lieux
		};
		
		var jsonFile = JSON.stringify(jsonObj);
		
		let fileName = "data.json";

		createDownload(jsonFile, fileName);
		
		window.location = "../index.html";
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