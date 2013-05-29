// ================== Tracker Constants ================== //

var ZOOM_DEFAULT = 12;
var ZOOM_CLOSE = 16;
var ZOOM_MIN = 8;
var ZOOM_MAX = 18;

var MARKER_ICON_DEFAULT = 'Images/Icons/map-marker-2x.png';

/* --------- Tracking interval in meters --------- */
var TRACK_INTERVAL_RUN = 5;
var TRACK_INTERVAL_DRIVE = 25;
var TRACK_INTERVAL_MIN = 1;
var TRACK_INTERVAL_MAX = 100;
/* ----------------------------------------------- */

// ======================================================= //

var iTracker = iTracker || {};

iTracker.tracker = (function() {
	var map = null, mapOptions = null, marker = null;
    
	var trackingOptions = {
		trackInterval: TRACK_INTERVAL_RUN,
	};
    
/*    //Zoom in/out on click
		google.maps.event.addListener(marker, 'click', function() {
			map.setZoom(map.zoom == ZOOM_DEFAULT ? ZOOM_CLOSE : ZOOM_DEFAULT);			
			map.setCenter(marker.getPosition());
		});
        google.maps.event.addListener(map, 'center_changed', function() {
            console.log("center_changed");
        });    
    */
    
    var setMap = function(position) {
		//Set map options
		mapOptions = {
			center: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
			zoom: ZOOM_DEFAULT,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		};    
    
		//Create the map
		map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);         
        
		//Place marker on map to visualize current location
		marker = new google.maps.Marker({
			map: map,
			position: map.getCenter(),
			animation: google.maps.Animation.DROP
		});        
	}
    
	var init = function() {
        getLocation();        
	}
    
	var onGeolocationSuccess = function(position) {
		setMap(position);
	};

	// onGeolocationError Callback receives a PositionError object
	onGeolocationError = function(error) {
		console.log("Error" + error)
		$("#myLocation").html("<span class='err'>" + error.message + "</span>");
	};
    
	var getLocation = function(successCallback, errorCallback) {
        //Check if default callback functions are needed
        if(successCallback == undefined) successCallback = onGeolocationSuccess;
        if(errorCallback == undefined) errorCallback = onGeolocationError;
        
		navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
	};
    
	var centerMapOnLocation = function() {
		getLocation(function(position) {
			if (map != null) {
				map.panTo(new google.maps.LatLng(position.coords.latitude, position.coords.longitude));             
			}
		}, onGeolocationError);
	}
	
	var startTracking = function() {
		console.log("Started");
	};
    
	return {
        trackingOptions: trackingOptions,
        init: init,
		getLocation: getLocation,
        centerMapOnLocation: centerMapOnLocation,
		startTracking: startTracking,
	};
})();




// Use Google API to get the location data for the current coordinates
/*var geocoder = new google.maps.Geocoder();
var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
geocoder.geocode({ "latLng": latlng }, function (results, status) {
if (status == google.maps.GeocoderStatus.OK) {
if ((results.length > 1) && results[1]) {
$("#myLocation").html(results[1].formatted_address);
}
}
});*/
/*
// Use Google API to get a map of the current location
var googleApis_map_Url = 'http://maps.googleapis.com/maps/api/staticmap?size=300x300&maptype=hybrid&zoom=16&sensor=true&markers=size:mid%7Ccolor:red%7C' + latlng;
var mapImg = '<img src="' + googleApis_map_Url + '" />';
$("#map_canvas").html(mapImg);*/