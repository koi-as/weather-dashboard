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
var city;
// Input buttons for user to input city names
var inputEl = $('#inputSearch')
var submitEl = $('#submitSearch')
var saveBtnEl = $('#citySaveBar') // these are the buttons that will hold saved city names
// Main card display elements
var mainCity = $('#cityName')
var mainTemp = $('#tempMain')
var mainWind = $('#windSpeedMain')
var mainHumidity = $('#humidityMain')

submitEl.on('click', function() { // when a user clicks the submit button
    inputEl.val().trim();
    if(inputEl.val() === '') {
        alert('Please Choose a Valid City Name!')
        return;
    }
    // Sets the value of 'city' to the user input
    city = inputEl.val();

    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + weatherKey + '&units=imperial') // then the OpenWeatherAPI is called
        .then(function(response) {
            if(response.status !== 200) { // If the city isn't found
                console.log(response.status) // log an error message
                return; // and stop the code
            }
            return response.json(); // else run the code as normal
        })
        .then(function(data) { //using the data
            console.log(data);
            // Sets weather data to reusable variable
            var tempData = data.main.temp;
            var windData = data.wind.speed;
            var humidityData = data.main.humidity;
            // Displays the weather data to the main card
            mainCity.text(city);
            mainTemp.text('Temperature: ' + tempData + 'F');
            mainWind.text('Wind Speed: ' + windData + 'MpH');
            mainHumidity.text('Humidity: ' + humidityData + '%');
            // These lines create, style, display, and append a button for each new user input
            var cityBtn = $('<button>')
            cityBtn.addClass("col-12 p-1 my-2 text-dark bg-gray border-0 rounded");
            cityBtn.text(city)
            saveBtnEl.append(cityBtn)
    });
})