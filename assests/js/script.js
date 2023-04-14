// Beginning of JS file

//My OpenWeather API Key
var weatherKey = '1f8dd424d44ab8bddae9917decbf64a3';
var city;

var queryUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + weatherKey;

fetch(queryUrl)
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {

    });