document.addEventListener("DOMContentLoaded", function(_e) {
	
	function onMapClick(e) {
		var html = "<input type='button' id='addPlace' value='Ajouter ce lieu'/>";
		var latitude = e.latlng.lat;
		var longitude = e.latlng.lng;
		
		var marker = L.marker([latitude, longitude]).bindPopup(html).addTo(map).openPopup();
		marker.setIcon(myIconBlack);
		
		document.getElementById("addPlace").addEventListener("click", function(){
			window.location = "./html/addPlace.html?lat="+latitude+"&lon="+longitude;
		});
	}
	
	function placeMarkers(data){
		
		dataJSON = JSON.parse(data);
			
		var lieux = dataJSON.Lieux;
		var markers = [];
		for (let lieu in lieux){
			var html = "<b>" + lieux[lieu].Nom + "</b><p>" + lieux[lieu].Notes + "</p><p><a class='linkGMaps' href='https://www.google.fr/maps/search/"+lieux[lieu].Nom+"' target='_blank'>GMaps</a>";
			markers[lieu] = L.marker([lieux[lieu].Latitude, lieux[lieu].Longitude]).bindPopup(html);
			if (lieux[lieu].Categorie == "A faire"){
				markers[lieu].setIcon(myIconBlue);
			} else if (lieux[lieu].Categorie == "Vu - OK"){
				markers[lieu].setIcon(myIconGreen);
			} else if (lieux[lieu].Categorie == "Vu - Bofbof"){
				markers[lieu].setIcon(myIconYellow);
			} else {
				markers[lieu].setIcon(myIconGrey);
			}
			
		}
		for (let i in markers){
			markers[i].addTo(map);
			markers[i].addEventListener("click", function(){
				markers[i].openPopup();
			});
		}
	}
	
	function setViewMap(position){
		map.setView([position.coords.latitude, position.coords.longitude], 12);
		var markerP = L.marker([position.coords.latitude, position.coords.longitude]).bindPopup("<p>Votre position</p>");
		markerP.setIcon(myIconRed);
		markerP.addTo(map);
		markerP.addEventListener("click", function(){
			markerP.openPopup();
		});
	}
	
	function erreurPosition(){
		map.setView([coord.lat, coord.lon], 12);
	}

	/*
	 * MAIN
	 */ 

	var coord = {"lat" : 47.236011, "lon" :6.022074}; //BESANCON
	
	/*Définition des icones*/
	var myIconYellow = L.icon({
		iconUrl: './js/markersIcons/marker-icon-yellow.png',
		iconSize: [25, 41],
		iconAnchor: [12,41]
	});
	
	var myIconBlue = L.icon({
		iconUrl: './js/markersIcons/marker-icon-blue.png',
		iconSize: [25, 41],
		iconAnchor: [12,41]
	});
	
	var myIconGreen = L.icon({
		iconUrl: './js/markersIcons/marker-icon-green.png',
		iconSize: [25, 41],
		iconAnchor: [12,41]
	});
	
	var myIconRed = L.icon({
		iconUrl: './js/markersIcons/marker-icon-red.png',
		iconSize: [25, 41],
		iconAnchor: [12,41]
	});
	
	var myIconGrey = L.icon({
		iconUrl: './js/markersIcons/marker-icon-grey.png',
		iconSize: [25, 41],
		iconAnchor: [12,41]
	});
	
	var myIconBlack = L.icon({
		iconUrl: './js/markersIcons/marker-icon-black.png',
		iconSize: [25, 41],
		iconAnchor: [12,41]
	});
	
	document.getElementById("myPopupMenu").style.display = "none";

	var map = L.map('mapid').setView([coord.lat, coord.lon], 12);
	
	
	var osmUrl='http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
	var osmAttrib='Map data © OpenStreetMap contributors';
	var osm = new L.TileLayer(osmUrl, {attribution: osmAttrib});
	
	map.addLayer(osm);
	
	var xobj = new XMLHttpRequest();
	xobj.overrideMimeType("application/json");
	xobj.open('GET', './donnees/data.json', true);
	xobj.onreadystatechange = function() {
		if (xobj.readyState == 4 && xobj.status == "200") {

			// .open will NOT return a value but simply returns undefined in async mode so use a callback
			//callback(xobj.responseText);
			//console.log(xobj.responseText);
			placeMarkers(xobj.responseText);
		}
	}
	xobj.send(null);
	
	map.on('click', onMapClick);
	
	document.getElementById("myOpenPopupMenu").addEventListener("click", function(){
		document.getElementById("myOpenPopupMenu").style.display = "none";
		document.getElementById("myPopupMenu").style.display = "block";
	});
	
	document.getElementById("closePopupMenu").addEventListener("click", function(){
		document.getElementById("myPopupMenu").style.display = "none";
		document.getElementById("myOpenPopupMenu").style.display = "block";
	});
	
	document.getElementById("localisationBTN").addEventListener("click", function(){
		if (navigator.geolocation){
			navigator.geolocation.getCurrentPosition(setViewMap, erreurPosition);
		}
		document.getElementById("myPopupMenu").style.display = "none";
		document.getElementById("myOpenPopupMenu").style.display = "block";
	});
	
	
});