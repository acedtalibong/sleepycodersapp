# Place all the behaviors and hooks related to the matching controller here.
# All this logic will automatically be available in application.js.
# You can use CoffeeScript in this file: http://coffeescript.org/

ready = ->
  #Step 1: initialize communication with the platform
  platform = new (H.service.Platform)(
    app_id: 'Q88isWuwHeTkAu8e3yjC'
    app_code: 'mGxi7qxhc1gBQzlBqREOyw'
    useCIT: true
    useHTTPS: true)
  defaultLayers = platform.createDefaultLayers()

  #Step 2: initialize a map  - not specificing a location will give a whole world view.
  map = new (H.Map)(document.getElementById('map'), defaultLayers.normal.map)

  #Step 3: make the map interactive
  # MapEvents enables the event system
  # Behavior implements default interactions for pan/zoom (also on mobile touch environments)
  behavior = new (H.mapevents.Behavior)(new (H.mapevents.MapEvents)(map))

  # Create the default UI components
  ui = H.ui.UI.createDefault(map, defaultLayers)

  # Now use the map as required...

  map.setBaseLayer defaultLayers.satellite.traffic
  moveMapToBerlin = (map) ->
    map.setCenter
      lat: 14.67
      lng: 121.04
    map.setZoom 14
    return

  moveMapToBerlin map

$(document).ready(ready)
$(document).on('page:load', ready)