// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, or any plugin's
// vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require rails-ujs
//= require turbolinks
//= require jquery3
//= require popper
//= require ckeditor/init
//= require bootstrap-sprockets
//= require_tree .


$(document).ready(
  function(){
    $('nav li.nav-item.dropdown').hover(
      function(){$(this).find('.dropdown-menu').stop(true, true).delay(200).fadeIn(500)},
      function(){$(this).find('.dropdown-menu').stop(true, true).delay(200).fadeOut(500)}
    )
  }
)


document.addEventListener("turbolinks:load", function () {
  var APIkey = "e348e4664e8460c02be4aa66a09f704e";
  var lat,lng;

  if (navigator.geolocation) { //check if the users allow the browser to detect their location
      navigator.geolocation.getCurrentPosition(function (position) {
        lat = position.coords.latitude;
        lng = position.coords.longitude;
        $.ajax({
          url: `https://api.darksky.net/forecast/${APIkey}/${lat},${lng}?units=auto&exclude=currently, hourly, minutely`, //the api call
          dataType: 'jsonp',
          success: function (response) {
            window.r = response
            response.daily.data.map(
              function(weather_data, index){
                $(`#weather${index}`).append(weatherCardfor(weather_data))
              }
            )
          },
          type: 'GET',
          error: function (error) {
              alert('Sorry, there is a problem with getting the weather at your location!')
          }
        })
      })
    }

    function weatherCardfor(weatherData){
      console.log(weatherData); //check the console to see how the response look like
      var time = new Date(weatherData.time*1000).
        toLocaleString('en', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
      var icon = weatherData.icon;
      var summary =weatherData.summary;
      var humidity = weatherData.humidity;
      var windspeed = weatherData.windSpeed;
      var maxTemp = weatherData.temperatureMax;
      var minTemp = weatherData.temperatureMin;
      var iconURL = getIconURL(icon);
      var item = `
          <div class="card" style="padding: 8px">
              <div class="card-block">
                  <h4 class="card-title">${time}</h4>
                  <img src=${iconURL}>
                  <hr />
                  <p class="card-text"><strong>Summary: </strong>${summary}</p>
                  <p class="card-text"><strong>Humidity: </strong>${humidity}</p>
                  <p class="card-text"><strong>Windspeed: </strong>${windspeed}</p>
                  <p class="card-text"><strong>Max Temperature </strong>${maxTemp} </p>
                  <p class="card-text"><strong>Min Temperature </strong>${minTemp} </p>
              </div>
          </div>`
      return item;
    }

    function getIconURL(icon){
        switch(icon) {
            case 'clear-day':
                return 'https://ssl.gstatic.com/onebox/weather/128/sunny.png';
            case 'clear-night':
                return 'http://static.appstore.vn/i/uploads/thumbnails/092012/mzl.kxatczun.175x175-75.jpg';
            case 'rain':
                return 'https://ssl.gstatic.com/onebox/weather/128/rain.png';
            case 'snow':
                return 'https://ssl.gstatic.com/onebox/weather/128/snow.png'
            case 'sleet':
                return 'https://ssl.gstatic.com/onebox/weather/128/sleet.png';
            case 'wind':
                return 'http://bakersintegrity.com/wp-content/uploads/2013/11/wind-icon.jpg';
            case 'fog':
                return 'https://ssl.gstatic.com/onebox/weather/128/fog.png';
            case 'cloudy':
                return 'https://ssl.gstatic.com/onebox/weather/128/cloudy.png';
            case 'partly-cloudy-day':
                return 'https://ssl.gstatic.com/onebox/weather/128/partly_cloudy.png';
            case 'partly-cloudy-night':
                return 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-KUXH104VSJvoy_s3Xam7YfjGMDlY386baw5uF5BjQEAehHQw';
            default:
                return ""
        }
    }
    //function that is used to print the item to html file
    function printLocation(item, node){
        $(node).append(item);
    }

});
