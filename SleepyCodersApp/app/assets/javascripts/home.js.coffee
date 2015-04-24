# Place all the behaviors and hooks related to the matching controller here.
# All this logic will automatically be available in application.js.
# You can use CoffeeScript in this file: http://coffeescript.org/

<<<<<<< HEAD
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
$(document).ready(ready)
$(document).on('page:load', ready)
=======
>>>>>>> 5d832f9ee13b32fdd699f3a6a556c97e87edff6f
