// Beginning of JS file

// Pseudocode
// 1 When I search for a city name
//      User types in input field
//      Save user data
//      Create a button to find that city again (local storage?)
//      Activate weather data
// 2 then I can see todays date and the weather data for that city
//      For the main card
//          Use dayjs to display the date for today
                // var today = dayjs().format('M/D/YYYY');
                // var mainDateEl = $('#todayDate')
                // mainDateEl.text(today);
//          Use openweatherapi to display the weather conditions, temperature, wind speeds, and humidity
//      For the forecast cards
//          use dayjs to display the next 5 days dates
//          user openweather api to display the weather conditions, temperature, wind speeds, and humidity

// openweather things to use:
//      list.main.temp      | calls temperature, default kelvin -> change to imperial fahrenheit
//      list.main.humidity  | calls humidity %
//      list.wind.speed     | calls wind speed, default m/s -> change to imperial mph
//      forecast.symbol.var | gets weather icon id

// My OpenWeather API Key
var weatherKey = '1f8dd424d44ab8bddae9917decbf64a3';
var city = [];

// console.log('hi')
// fetch('https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + weatherKey)
//     .then(function(response) {
//         return response.json();
//     })
//     .then(function(data) {
//         console.log(data);
//         console.log(data.coord.lat)
//         console.log(data.coord.lon)
//     });

var inputEl = $('#inputSearch')
var submitEl = $('#submitSearch')
var saveBtnEl = $('#citySaveBar')

submitEl.on('click', function() {
    inputEl.val().trim();
    console.log(inputEl.val().trim())
    if(inputEl.val() === '') {
        alert('Please Choose a Valid City Name!')
        return;
    }
    // Sets the value of 'city' to the user input
    city = inputEl.val();

    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + weatherKey)
    .then(function(response) {
        if(response.status !== 200) {
            console.log(response.status)
            return;
        }
        return response.json();
    })
    .then(function(data) {
        console.log(data);
        console.log(data.coord.lat)
        console.log(data.coord.lon)

        // These lines create, style, display, and append a button for each new user input
        var cityBtn = $('<button>')
        cityBtn.addClass("col-12 p-1 my-2 text-dark bg-gray border-0 rounded");
        cityBtn.text(city)
        saveBtnEl.append(cityBtn)
    });
})