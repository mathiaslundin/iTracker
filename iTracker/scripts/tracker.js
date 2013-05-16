// ================== Tracker Constants ================== //

var ZOOM_DEFAULT = 10;
var ZOOM_CLOSE = 16;

// ======================================================= //

tracker = {
	map: null,
    mapOptions: null,
    marker: null,
    
	getLocation: function() {
		navigator.geolocation.getCurrentPosition(tracker.onGeolocationSuccess, tracker.onGeolocationError);
	},
	onGeolocationSuccess: function(position) {
        //Set map options
		tracker.mapOptions = {
			center: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
			zoom: ZOOM_DEFAULT,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		};    
    
        //Create the map
		tracker.map = new google.maps.Map(document.getElementById('map-canvas'), tracker.mapOptions);  
        
		var image = {
			url: 'Images/Icons/map-marker-2x.png',
		};
        
        //Place marker on map to visualize current location
		tracker.marker = new google.maps.Marker({
			map: tracker.map,
			position: tracker.map.getCenter(),
            //icon: image,
            animation: google.maps.Animation.DROP
		})
        
		google.maps.event.addListener(tracker.marker, 'click', function() {
            tracker.map.setZoom(tracker.map.zoom == ZOOM_DEFAULT ? ZOOM_CLOSE : ZOOM_DEFAULT);			
			tracker.map.setCenter(tracker.marker.getPosition());
		});
	},

	// onGeolocationError Callback receives a PositionError object
	onGeolocationError: function(error) {
		console.log("Error" + error)
		$("#myLocation").html("<span class='err'>" + error.message + "</span>");
	}
}



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