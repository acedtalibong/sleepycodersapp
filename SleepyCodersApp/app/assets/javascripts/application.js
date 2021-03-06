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

  //when a place is searched
  $("#destination_button").click(function(){
    //var map = document.getElementById('map')

    //for retrieving the destination
    var searchtxt = document.getElementById('destination').value;
    var xmlHttp;
    var searchtxt2 = searchtxt.replace(/ /g,"+");
    xmlHttp = null;
    xmlHttp = new XMLHttpRequest;
    toGet = 'http://geocoder.cit.api.here.com/6.2/geocode.xml?app_id=Q88isWuwHeTkAu8e3yjC&app_code=mGxi7qxhc1gBQzlBqREOyw&gen=8&searchtext='+ searchtxt2;

     xmlHttp.open('GET', toGet, false);

     xmlHttp.send(null);

    var searchtxt3 = document.getElementById('origin').value;
    var xmlHttp;
    var searchtxt4 = searchtxt.replace(/ /g,"+");
    xmlHttp = null;
    xmlHttp = new XMLHttpRequest;
    toGet = 'http://geocoder.cit.api.here.com/6.2/geocode.xml?app_id=Q88isWuwHeTkAu8e3yjC&app_code=mGxi7qxhc1gBQzlBqREOyw&gen=8&searchtext='+ searchtxt4;

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
      //alert("longitude " + longitude);
      //alert("latitude " + latitude);

      moveMap(map);

      xmlHttp = null
      xmlHttp = new XMLHttpRequest
      xmlHttp.open('GET', 'http://places.cit.api.here.com/places/v1/discover/search?app_id=Q88isWuwHeTkAu8e3yjC&app_code=mGxi7qxhc1gBQzlBqREOyw&at=' + latitude +',' + longitude +'&q=landmark-attraction&accept=application%2Fjson', false);
      xmlHttp.send(null);
      obj = JSON.parse(xmlHttp.responseText)
      
      
      var arrayOfVenues = new Array(obj.results.items.length, 5);
      var i;
      var j;
      var fives = 0;
      var fours = 0;
      var threes = 0;
      var twos = 0;
      var ones = 0;

      var iMax = obj.results.items.length;
      var jMax = 5;

      var itCtr = 0;
      var itVenues = new Array();

      for(i = 0; i < iMax; i++){
        arrayOfVenues[i] = new Array();
      }
      for(i = 0; i < 5; i++){
        itVenues[i] = new Array();
      }
      
      for(i = 0; i < obj.results.items.length; i++){
        var title = obj.results.items[i].title;
        var temp = obj.results.items[i].position.toString();
        //alert(obj.results.items[i].position);
        var comma = temp.indexOf(",");
        var lat = temp.substring(0, comma); //not sure
        var longi = temp.substring(comma+1, temp.length);
        var averageRating = obj.results.items[i].averageRating;
        var distance = obj.results.items[i].distance;
        arrayOfVenues[i] = [title, lat, longi, averageRating, distance];
        //alert(arrayOfVenues[i][0]);
        if(arrayOfVenues[i][3] > 4.0){
          if(itCtr < 5){
            fives = fives+1;
            itVenues[itCtr] = arrayOfVenues[i];
            map.addObject(new H.map.Marker({lat:itVenues[itCtr][1], lng:itVenues[itCtr][2]}));
            //alert("adding " + itVenues[itCtr][0] + " with rating " + itVenues[itCtr][3]);
            itCtr++;
          }
        }
        else if(arrayOfVenues[i][3] > 3.0) fours = fours+1;
        else if(arrayOfVenues[i][3] > 2.0) threes = threes+1;
        else if(arrayOfVenues[i][3] > 1.0) twos = twos+1;
        else if(arrayOfVenues[i][3] > 0) ones = ones+1;
      }
      //alert("boom");
      //alert("length: " + arrayOfVenues.length);
      //alert(itCtr);
      //alert("five: " + fives + " four: " + fours + " three: " + threes + " two: " + twos + " one: " + ones);
      for(j = 4; j > 0; j--){
        if(itCtr < 5){
          //alert("fail");
          //alert("length: " + arrayOfVenues.length);
          for(i = 0; i < arrayOfVenues.length; i++){
            //alert(i);
            if(itCtr < 5){
              if(arrayOfVenues[i][3] > j-1 && arrayOfVenues[i][3] <= j){
                itVenues[itCtr] = arrayOfVenues[i];
                map.addObject(new H.map.Marker({lat:itVenues[itCtr][1], lng:itVenues[itCtr][2]}));
                itCtr++;
              }
            }
          }
        }
      }
      if(itCtr < 5){
        for(i = 0; i < arrayOfVenues.length; i++){
          if(itCtr < 5){
            if(arrayOfVenues[i][3] == 0){
              //alert("fail");
              itVenues[itCtr] = arrayOfVenues[i];
              map.addObject(new H.map.Marker({lat:itVenues[itCtr][1], lng:itVenues[itCtr][2]}));
              itCtr++;
            }
          }
        }
      }
      /*alert(itVenues.length);
      for(i = 0; i < itVenues.length; i++){
        alert("title: " + itVenues[i][0] + " rating: " + itVenues[i][3]);
      }*//*
      for(i = 0; i < 5; i++){
        if(itVenues[i] == null){
          itVenues[i][0] = [" "];
        }
      }*/
      $('#1st').text(itVenues[0][0]);
      $('#2nd').text(itVenues[1][0]);
      $('#3rd').text(itVenues[2][0]);
      $('#4th').text(itVenues[3][0]);
      $('#5th').text(itVenues[4][0]);
      $('#origin_item').append(searchtxt);
      $('#destination_item').append(searchtxt3);
      /*
      for(i = 0; i < arrayOfVenues.length; i++){
        alert("venues");
        alert("title: " + arrayOfVenues[i][0] + " rating: " + arrayOfVenues[i][3]);
      }*/

    });



});