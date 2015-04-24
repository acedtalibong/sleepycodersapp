// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require_tree .


$("#search").click(function(){
 	var searchString = document.getElementByID('searchbar');
	var platform = new H.service.Platform({
            'app_id': 'Q88isWuwHeTkAu8e3yjC',
            'app_code': 'mGxi7qxhc1gBQzlBqREOyw'
          });
          // Retrieve the target element for the map:
          var targetElement = document.getElementById('mapContainer');
          
          // Get default map types from the platform object:
          var defaultLayers = platform.createDefaultLayers();
          
          // Instantiate the map:
          var map = new H.Map(
            document.getElementById('mapContainer'),
            defaultLayers.normal.map,
            {
              zoom: 10,
              center: { lat: 52.51, lng: 13.4 }
            });
          
          // Create the parameters for the geocoding request:
          var geocodingParams = {
                searchText: '200 S Mathilda Ave, Sunnyvale, CA'
              };
          
          // Define a callback function to process the geocoding response:
          var onResult = function(result) {
            var locations = result.Response.View[0].Result,
                position,
                marker;
            // Add a marker for each location found
            for (i = 0;  i < locations.length; i++) {
              position = {
                lat: locations[i].Location.DisplayPosition.Latitude,
                lng: locations[i].Location.DisplayPosition.Longitude
              };
              marker = new H.map.Marker(position);
              map.addObject(marker);
            }
          };
          
          // Get an instance of the geocoding service:
          var geocoder = platform.getGeocodingService();
          
          // Call the geocode method with the geocoding parameters,
          // the callback and an error callback function (called if a
          // communication error occurs):
          geocoder.geocode(geocodingParams, onResult, function(e) {
            alert(e);
          });