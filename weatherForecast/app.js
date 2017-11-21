$(document).ready(function () {
    let APIkey = "e348e4664e8460c02be4aa66a09f704e";
    let lat,lng;

    var timeArray = []; //Array that contains UNIX time of the next 29 days used for api request
    function timeArrayGenerator(){
         var unixTime = Math.round(Date.now() / 1000); //convert UNIX in miliseconds to seconds
       for (var i = 0; i<30; i++){
           unixTime += 86400; //calculate the UNIX time of the next day
           timeArray.push(unixTime); //push it into the array
       }
    }
    timeArrayGenerator();

    if (navigator.geolocation) { //check if the users allow the browser to detect their location
        navigator.geolocation.getCurrentPosition(function (position) {
            lat = position.coords.latitude;
            lng = position.coords.longitude;
            timeArray.forEach((time) => {
                $.ajax({
                    url: `https://api.darksky.net/forecast/${APIkey}/${lat},${lng}, ${time}?exclude=flags,alert,currently, hourly, minutely`, //the api call
                    dataType: 'jsonp',
                    success: function (response) {
                        var item = locationListGenerator(response); //get node in html format
                        printLocation(item); //print it to the html file
                    },
                    type: 'GET',
                    error: function (error) {
                        alert('Sorry, there is a problem with getting the weather at your location!')
                    }
                })
            })
        })
    }

    function locationListGenerator(response){
        console.log(response); //check the console to see how the response look like
        let icon = response.daily.data[0].icon;
        let summary =response.daily.data[0].summary;
        let humidity = response.daily.data[0].humidity;
        let windspeed = response.daily.data[0].windSpeed;
        let maxTemp = response.daily.data[0].temperatureMax;
        let minTemp = response.daily.data[0].temperatureMin;
        let iconURL = getIconURL(icon);
        let item = `
            <div class="card" style="width: 250px;">
                <img class="card-img-top" src= ${iconURL} alt="Card image cap">
                <div class="card-block">
                    <h4 class="card-title">Card title</h4>
                    <p class="card-text"><strong>Summary: </strong>${summary}</p>
                    <p class="card-text"><strong>Humidity: </strong>${humidity}</p>
                    <p class="card-text"><strong>Windspeed: </strong>${windspeed}</p>
                    <p class="card-text"><strong>Max Temperature in F </strong>${maxTemp}</p>
                    <p class="card-text"><strong>Min Temperature in F </strong>${minTemp}</p>
                </div>
            </div>`
        return item;
    }

    //function to get the url of the icon
    function getIconURL(icon){
        let url;
        switch(icon) {
            case 'clear-day':
                url = 'http://a5.mzstatic.com/us/r30/Purple3/v4/91/f1/c8/91f1c8e4-0219-f5eb-9b3a-4bc5ff5d02d8/icon175x175.png';
               return url;
            case 'clear-night':
                url = 'http://static.appstore.vn/i/uploads/thumbnails/092012/mzl.kxatczun.175x175-75.jpg';
                return url;
            case 'rain':
                url = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAbbJ_7F_XXlyT1GtR_yeVoq_91VZpt750RY_ihFjBdR78NWfu';
                return url;
            case 'snow':
                url = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTckGRbUsyeDRlHqvZcSnpWc8bm-yPw4WnEZTUFXPPXGWAXhMnFZw';
                return url;
            case 'sleet':
                url = 'https://s2.mzstatic.com/us/r1000/095/Purple/v4/39/9a/0e/399a0e9b-bb3f-a7b7-b716-bd8ff36f3ec7/mzl.nkwlabrs.175x175-75.png';
                return url;
            case 'wind':
                url = 'http://bakersintegrity.com/wp-content/uploads/2013/11/wind-icon.jpg';
                return url;
            case 'fog':
                url = 'http://bakersintegrity.com/wp-content/uploads/2013/11/wind-icon.jpg';
                return url;
            case 'cloudy':
                url = 'http://a4.mzstatic.com/us/r30/Purple49/v4/aa/05/3d/aa053d6e-ffca-732e-4131-31b006c28ac5/icon175x175.jpeg';
                return url;
            case 'partly-cloudy-day':
                url = 'http://a4.mzstatic.com/us/r30/Purple62/v4/ba/e4/36/bae43683-a483-97c7-f332-eb1548e29d32/icon175x175.png';
                return url;
            case 'partly-cloudy-night':
                url = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-KUXH104VSJvoy_s3Xam7YfjGMDlY386baw5uF5BjQEAehHQw';
                return url;
            default:
                alert('No background and icon for this weather yet~');
                break;
        }
    }
    //function that is used to print the item to html file
    function printLocation(item){
        let parentNode = $('#output');
        let childNode = item;
        parentNode.append(childNode);
    }

});