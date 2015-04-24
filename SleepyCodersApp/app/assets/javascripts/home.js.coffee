# Place all the behaviors and hooks related to the matching controller here.
# All this logic will automatically be available in application.js.
# You can use CoffeeScript in this file: http://coffeescript.org/

ready = ->
  #initialize a platform object
  platform = new (H.service.Platform)(
    'app_id': 'Q88isWuwHeTkAu8e3yjC'
    'app_code': 'mGxi7qxhc1gBQzlBqREOyw')

  #initialize map  
  defaultLayers = platform.createDefaultLayers()
  map = new (H.Map)(document.getElementById('mapContainer'), defaultLayers.normal.map,
    zoom: 10
    center:
      lat: 52.5
      lng: 13.4)


oli = ->
  platform = new (H.service.Platform)(
    'app_id': 'Q88isWuwHeTkAu8e3yjC'
    'app_code': 'mGxi7qxhc1gBQzlBqREOyw')
  # Retrieve the map container (map target element):
  targetElement = document.getElementById('mapContainer2')
  # Get the default map types from the platform object:
  defaultLayers = platform.createDefaultLayers()
  # Instantiate the map:
  map = new (H.Map)(document.getElementById('mapContainer2'), defaultLayers.normal.map,
    zoom: 19
    center:
      lat: 51.513807
      lng: -0.127183)

  # Add the venue layer to the map:
  map.addLayer defaultLayers.venues 

oli2 = ->
  xmlHttp = null
  xmlHttp = new XMLHttpRequest
  xmlHttp.open 'GET', 'http://geocoder.cit.api.here.com/6.2/geocode.xml?app_id=DemoAppId01082013GAL&app_code=AJKnXv84fjrb0KIHawS0Tg&gen=8&searchtext=Metro+Manila', false
  xmlHttp.send null
  document.getElementById('mapContainer2').innerHTML = xmlHttp.responseText



oli3 = ->
  platform = new (H.service.Platform)(
    'app_id': 'Q88isWuwHeTkAu8e3yjC'
    'app_code': 'mGxi7qxhc1gBQzlBqREOyw')
  # Retrieve the target element for the map:
  targetElement = document.getElementById('mapContainer')
  # Get default map types from the platform object:
  defaultLayers = platform.createDefaultLayers()
  # Instantiate the map:
  map = new (H.Map)(document.getElementById('mapContainer'), defaultLayers.normal.map,
    zoom: 10
    center:
      lat: 18.19
      lng: 120.59)
  # Create the parameters for the geocoding request:
  searchtext = document.getElementByID('searchbar').value()
  geocodingParams = searchText: "Ilocos Norte"
  # Define a callback function to process the geocoding response:

  onResult = (result) ->
    locations = result.Response.View[0].Result
    position = undefined
    marker = undefined
    # Add a marker for each location found
    i = 0
    while i < locations.length
      position =
        lat: locations[i].Location.DisplayPosition.Latitude
        lng: locations[i].Location.DisplayPosition.Longitude
      marker = new (H.map.Marker)(position)
      map.addObject marker
      i++
  
    return

  document.getElementByID('').innerHTML = "" +lat 
  
  # Get an instance of the geocoding service:
  geocoder = platform.getGeocodingService()
  # Call the geocode method with the geocoding parameters,
  # the callback and an error callback function (called if a
  # communication error occurs):
  geocoder.geocode geocodingParams, onResult, (e) ->
    alert e
    return
  return
 
oli4 = ->  
  xmlHttp = null
  xmlHttp = new XMLHttpRequest
  xmlHttp.open 'GET', 'http://places.cit.api.here.com/places/v1/discover/search?app_id=Q88isWuwHeTkAu8e3yjC&app_code=mGxi7qxhc1gBQzlBqREOyw&at=52.5044,13.3909&q=landmark-attraction&tf=plain', false
  xmlHttp.send null
  document.getElementById('mapContainer2').innerHTML = xmlHttp.responseText
  


$(document).ready(oli4)
$(document).on('page:load', oli4)