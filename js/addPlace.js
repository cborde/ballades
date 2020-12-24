document.addEventListener("DOMContentLoaded", function(_e) {
	
	function placeCategories(data){
		var dataJSON = JSON.parse(data);
		var categories = dataJSON.Categories;
		
		var html = "<select id='selectCategoryInput' name='Category'>";
		for (categ in categories){
			html += "<option id='cat" + categ + "' value='" + categories[categ] + "'>" + categories[categ] + "</option>";
		}
		html += "</select>";
		
		document.getElementById("selectCategory").innerHTML = html;
		
		document.getElementById("addPlaceButton").addEventListener("click", function(){
			var selectC = document.getElementById("selectCategoryInput");
			addInDataJSON(dataJSON, document.getElementById("name").value, document.getElementById("notes").value, selectC.options[selectC.selectedIndex].value);
		});
		
	}
	
	function createDownload(text, file){
		var c = document.createElement("A");//Ne pas toucher "A";
		var d = document.body;
		d.appendChild(c);
		c.href = 'data:json/plain;charset=utf-8,' + encodeURIComponent(text);
		c.download = file;
		c.click();
		d.removeChild(c);
	}
	
	function addInDataJSON(dataJSON, name, notes, category){
		
		var lieux = dataJSON.Lieux;
		
		var objL = {
			"Nom" : name,
			"Latitude" : parseFloat(latitude),
			"Longitude" : parseFloat(longitude),
			"Notes" : notes,
			"Categorie" : category
		};
		
		console.log("OBJET AJOUTE :", objL);
		
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
	 
	 var xobj = new XMLHttpRequest();
		 xobj.overrideMimeType("application/json");
		 xobj.open('GET', '../donnees/data.json', true);
		 xobj.onreadystatechange = function() {
		 	 if (xobj.readyState == 4 && xobj.status == "200") {

				// .open will NOT return a value but simply returns undefined in async mode so use a callback
				//callback(xobj.responseText);
				//console.log(xobj.responseText);
					placeCategories(xobj.responseText);
			 }
		 }
		 xobj.send(null);
	 

	
});