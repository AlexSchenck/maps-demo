/* app.js -- our application code */

"use strict";

// UW coordinates:
// lat: 47.655
// lng: -122.3080

var mapOptions = {
	center: {lat: 47.655, lng: -122.3080},
	zoom: 14 //0=Earth to 21=max zoom
}

//add our map to the apge in the 'map' div
var mapElem = document.getElementById("map");

//creat the map
var map = new google.maps.Map(mapElem, mapOptions);

//marker positions
//values MUST be numbers and not strings
var position = {
	lat: 47.655,
	lng: -122.3080
}

//create a marker on the map
var marker = new google.maps.Marker({
	position: position,
	map: map
});

//create a new InfoWindow
var infoWin = new google.maps.InfoWindow();

//remove marker from map
marker.setMap(null);

//readd marker from memory
//marker.setMap(map);

function onGeoPos(position) {
	console.log("Lat: " + position.coords.latitude);
	console.log("Lng: " + position.coords.longitude);

	var myLocPos = {
		lat: position.coords.latitude, 
		lng: position.coords.longitude
	};

	var myLocation = new google.maps.Marker({
		position: myLocPos,
		map: map
	});

	//set the content (may contain html tags)
	infoWin.setContent('<p>Lat is ' + position.coords.latitude + ' and Lng is ' + position.coords.longitude + '</p>');

	google.maps.event.addListener(myLocation, "click", onMarkerClick);
}

function onGeoErr(error) {
	//error codes here
}

if (navigator.geolocation) {
	navigator.geolocation.getCurrentPosition(onGeoPos, onGeoErr, {enableHighAccuracy: true, maximumAge: 30000});
} else {
	console.log("geolocation not supported");
}

function onMarkerClick() {
	//'this' keyword will refer to the marker object

	//pan the map so that the marker is at the center
	map.panTo(this.getPosition());
	infoWin.open(map, this);
}

$.getJSON('http://data.seattle.gov/resource/65fc-btcc.json')
	.done(function(data) {
		//success
		console.log(data);
	})
	.fail(function(error) {
		//error contains error info
	})
	.always(function() {
		//called on either success or error cases
	});
