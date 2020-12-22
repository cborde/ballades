document.addEventListener("DOMContentLoaded", function(_e) {
	
	function onMapClick(e) {
		alert("You clicked the map at " + e.latlng);
	}
	
	function placeMarkers(data){
		
		dataJSON = JSON.parse(data);
			
		var lieux = dataJSON.Lieux;
		var markers = [];
		for (let lieu in lieux){
			var html = "<b>" + lieux[lieu].Nom + "</b><p>" + lieux[lieu].Notes + "</p>";
			markers[lieu] = L.marker([lieux[lieu].Latitude, lieux[lieu].Longitude]).bindPopup(html);
		}
		for (let i in markers){
			markers[i].addTo(map);
			markers[i].addEventListener("click", function(){
				markers[i].openPopup();
			});
		}
	}

	/*
	 * MAIN
	 */ 

	var coord = {"lat" : 47.236011, "lon" :6.022074};
	
	/*if (navigator.geolocation){
		navigator.geolocation.getCurrentPosition(maPosition, erreurPosition);
	}*/
	
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
});