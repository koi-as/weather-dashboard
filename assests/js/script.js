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
var saveBarEl = $('#citySaveBar')
// A button element class to use in a click event for when any button is pressed
var btnEl = $('.button')
// Main card display elements
var mainCity = $('#cityName')
var mainWeather = $('#weatherIcon')
var mainTemp = $('#tempMain')
var mainWind = $('#windSpeedMain')
var mainHumidity = $('#humidityMain')
// Shows todays date
var today = dayjs().format('M/D/YYYY');
var mainDateEl = $('#todayDate')
mainDateEl.text(today);

function displayData(city) {
    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + weatherKey + '&units=imperial') // then the OpenWeatherAPI is called
        .then(function(response) {
            if(response.status !== 200) { // If the city isn't found
                console.log(response.status) // log an error message
                alert('Please Choose a Valid City Name!') // alert the user about the issue
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
            // Sets weather icon
            var iconCode = data.weather[0].icon;
            var iconUrl = "https://openweathermap.org/img/wn/" + iconCode + ".png";
            // Displays the weather data to the main card
            mainCity.text(city);
            mainWeather.attr('src', iconUrl)
            mainTemp.text('Temperature: ' + tempData + 'F');
            mainWind.text('Wind Speed: ' + windData + ' MpH');
            mainHumidity.text('Humidity: ' + humidityData + '%');
            // These lines create, style, display, and append a button for each new user input
            var cityBtn = $('<button>');
            cityBtn.addClass("button col-12 p-1 my-2 text-dark bg-gray border-0 rounded");
            cityBtn.text(city);
            saveBarEl.append(cityBtn);
            saveButtonData(cityBtn);
            // Clear the input area
            inputEl.val('');
    });

    // fetch('api.openweathermap.org/data/2.5/forecast?q=' + city + '&appid=' + weatherKey)//this will be the forecast api
    //     .then(function(response) {
    //         if(response.status !== 200) { // If the city isn't found
    //             return; // stop the code
    //         }
    //         return response.json();
    //     })
    //     .then(function(data) {
    //         console.log(data)
    //         // call forecast data
    //         // set data to text of card items
    //     });
};

function saveButtonData(saveBtn) {
    // to save a button
    var cityArr = [];
    cityArr.push(city)
    console.log(cityArr)
    // need to save the city name to an array
    // save the array to local storage and ENSURE IT DOESN'T GET OVERWRITTEN
    // link the button click to displayData function
};

submitEl.on('click', function() { // when a user clicks the submit button... cont on line 46
    inputEl.val().trim();
    if(inputEl.val() === '') {
        alert('Please Choose a Valid City Name!')
        return;
    }
    // Sets the value of 'city' to the user input
    city = inputEl.val();

    displayData(city)
})

btnEl.on('click', function() { // when a user clicks a city name button
    // call a variable from local storage
    // call the display data function with the variable from ls
})