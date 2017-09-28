#Browser GeolocationNavigator Api
@fetch_location = () ->
  if navigator && navigator.geolocation
    navigator.geolocation.getCurrentPosition (
      (current_position) ->
        {latitude: current_position.coords.latitude, longitude: current_position.coords.longitude}
    )
  else
    throw "Location not permitted"
