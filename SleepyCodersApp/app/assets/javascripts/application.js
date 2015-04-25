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

var ready;
var map;
ready = function() {
  var behavior, defaultLayers, moveMapToBerlin, platform, ui;
  platform = new H.service.Platform({
    app_id: 'Q88isWuwHeTkAu8e3yjC',
    app_code: 'mGxi7qxhc1gBQzlBqREOyw',
    useCIT: true,
    useHTTPS: true
  });
  defaultLayers = platform.createDefaultLayers();
  map = new H.Map(document.getElementById('map'), defaultLayers.normal.map);
  behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));
  ui = H.ui.UI.createDefault(map, defaultLayers);
  map.setBaseLayer(defaultLayers.normal.traffic);
  moveMapToBerlin = function(map) {
    map.setCenter({
      lat: 14.67,
      lng: 121.04
    });
    map.setZoom(14);
  };
  return moveMapToBerlin(map);
};

$(document).ready(ready);

$(document).on('page:load', ready);

$(document).ready(function(){
  $("#destination_button").click(function(){
    //var map = document.getElementById('map')
    var searchtxt = document.getElementById('destination').value;
	   var xmlHttp;
	   searchtxt = searchtxt.replace(/ /g,"+");;
	
	   xmlHttp = null;

  	xmlHttp = new XMLHttpRequest;
  	toGet = 'http://geocoder.cit.api.here.com/6.2/geocode.xml?app_id=Q88isWuwHeTkAu8e3yjC&app_code=mGxi7qxhc1gBQzlBqREOyw&gen=8&searchtext='+ searchtxt;

	   xmlHttp.open('GET', toGet, false);

	   xmlHttp.send(null);

    	var response = xmlHttp.responseText;
    	var longlat = response.match("<DisplayPosition>(.*)</DisplayPosition>");
    	var latitude = longlat[1].match("<Latitude>(.*)</Latitude>")[1];
    	var longitude = longlat[1].match("<Longitude>(.*)</Longitude>")[1];

    	var moveMap;
    	moveMap = function(map) {
    	  map.setCenter({
    	    lat: latitude,
    	    lng: longitude
    	  });
    	  map.setZoom(14);
    	};

    	moveMap(map);

      xmlHttp = null
      xmlHttp = new XMLHttpRequest
      xmlHttp.open('GET', 'http://places.cit.api.here.com/places/v1/discover/search?app_id=Q88isWuwHeTkAu8e3yjC&app_code=mGxi7qxhc1gBQzlBqREOyw&at=' + latitude +',' + longitude +'&q=landmark-attraction&accept=application%2Fjson', false);
      xmlHttp.send(null);
      obj = JSON.parse(xmlHttp.responseText)
      
      
      var arrayOfVenues = new Array(100, 5);
      var i;
      var j;

      var iMax = 100;
      var jMax = 5;

      for(i = 0; i < iMax; i++){
        arrayOfVenues[i] = new Array();
      }
      
     

      for(i = 0; i < obj.results.items.length; i++){
        var title = obj.results.items[i].title;
        var temp = obj.results.items[i].position.toString();
        alert(obj.results.items[i].position);
        var comma = temp.indexOf(",");
        var lat = temp.substring(0, comma); //not sure
        var longi = temp.substring(comma+1, temp.length);
        var averageRating = obj.results.items[i].averageRating;
        var distance = obj.results.items[i].distance;
        arrayOfVenues[i] = [title, lat, longi, averageRating, distance];
        //alert(arrayOfVenues[i][0]);

      }
      });


    });
