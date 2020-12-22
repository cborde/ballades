document.addEventListener("DOMContentLoaded", function(_e) {
	
	function onMapClick(e) {
		alert("You clicked the map at " + e.latlng);
	}

	/*
	 * MAIN
	 */ 
	var map = L.map('mapid').setView([47.23, 6.02], 12);
	
	var osmUrl='http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
	var osmAttrib='Map data © OpenStreetMap contributors';
	var osm = new L.TileLayer(osmUrl, {attribution: osmAttrib});
	
	map.addLayer(osm);
	
	var marker = L.marker([47.23, 6.02]).addTo(map);
	marker.addEventListener("click", function(){
		marker.bindPopup("<b>Hello world!</b><br>Coucou").openPopup();
	});
	
	
	map.on('click', onMapClick);
});