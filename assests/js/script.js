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
// An empty array to save city names to
var cityArr = [];
// A button element class to use in a click event for when any button is pressed
var btnEl = $('.button')

function displayData(city) {
    fetch('https://api.openweathermap.org/data/2.5/forecast?q=' + city + '&appid=' + weatherKey + '&units=imperial')
        .then(function (response) {
            if (response.status !== 200) { // If the city isn't found
                console.log(response.status) // log an error message
                alert('Please Choose a Valid City Name!') // alert the user about the issue
                return; // and stop the code
            }
            return response.json(); // else run the code as normal
        })
        .then(function (data) {
            console.log(data)
            // date display for weather data cards
            // pulls unix timestamp for each date
            var today = data.list[0].dt;
            var nextDay1 = data.list[7].dt;
            var nextDay2 = data.list[15].dt;
            var nextDay3 = data.list[23].dt;
            var nextDay4 = data.list[31].dt;
            var nextDay5 = data.list[39].dt;
            // converts unix timestamp to readable format
            var todayDisplay = dayjs.unix(today).format('M/D/YYYY');
            var nextDay1Display = dayjs.unix(nextDay1).format('M/D/YYYY');
            var nextDay2Display = dayjs.unix(nextDay2).format('M/D/YYYY');
            var nextDay3Display = dayjs.unix(nextDay3).format('M/D/YYYY');
            var nextDay4Display = dayjs.unix(nextDay4).format('M/D/YYYY');
            var nextDay5Display = dayjs.unix(nextDay5).format('M/D/YYYY');
            // displays readable date to each fo the cards
            $('#todayDate').text(todayDisplay);
            $('#card1 #cardDate').text(nextDay1Display);
            $('#card2 #cardDate').text(nextDay2Display);
            $('#card3 #cardDate').text(nextDay3Display);
            $('#card4 #cardDate').text(nextDay4Display);
            $('#card5 #cardDate').text(nextDay5Display);

            // temperature, wind speed, and humidity display for weather cards
            // temperature display
            var todayTemp = data.list[0].main.temp;
            var nextTemp1 = data.list[7].main.temp;
            var nextTemp2 = data.list[15].main.temp;
            var nextTemp3 = data.list[23].main.temp;
            var nextTemp4 = data.list[31].main.temp;
            var nextTemp5 = data.list[39].main.temp;

            $('#tempMain').text('Temperature: ' + todayTemp + 'F');
            $('#card1 #cardTemp').text('Temperature: ' + nextTemp1 + 'F');
            $('#card2 #cardTemp').text('Temperature: ' + nextTemp2 + 'F');
            $('#card3 #cardTemp').text('Temperature: ' + nextTemp3 + 'F');
            $('#card4 #cardTemp').text('Temperature: ' + nextTemp4 + 'F');
            $('#card5 #cardTemp').text('Temperature: ' + nextTemp5 + 'F');
            // wind speed display
            var todayWind = data.list[0].wind.speed;
            var nextWind1 = data.list[7].wind.speed;
            var nextWind2 = data.list[15].wind.speed;
            var nextWind3 = data.list[23].wind.speed;
            var nextWind4 = data.list[31].wind.speed;
            var nextWind5 = data.list[39].wind.speed;

            $('#windSpeedMain').text('Wind Speed: ' + todayWind + ' MpH');
            $('#card1 #cardWind').text('Wind Speed: ' + nextWind1 + ' MpH');
            $('#card2 #cardWind').text('Wind Speed: ' + nextWind2 + ' MpH');
            $('#card3 #cardWind').text('Wind Speed: ' + nextWind3 + ' MpH');
            $('#card4 #cardWind').text('Wind Speed: ' + nextWind4 + ' MpH');
            $('#card5 #cardWind').text('Wind Speed: ' + nextWind5 + ' MpH');
            // humidity display
            var todayHumid = data.list[0].main.humidity;
            var nextHumid1 = data.list[7].main.humidity;
            var nextHumid2 = data.list[15].main.humidity;
            var nextHumid3 = data.list[23].main.humidity;
            var nextHumid4 = data.list[31].main.humidity;
            var nextHumid5 = data.list[39].main.humidity;

            $('#humidityMain').text('Humidity: ' + todayHumid + '%');
            $('#card1 #cardHumidity').text('Humidity: ' + nextHumid1 + '%');
            $('#card2 #cardHumidity').text('Humidity: ' + nextHumid2 + '%');
            $('#card3 #cardHumidity').text('Humidity: ' + nextHumid3 + '%');
            $('#card4 #cardHumidity').text('Humidity: ' + nextHumid4 + '%');
            $('#card5 #cardHumidity').text('Humidity: ' + nextHumid5 + '%');
            // Sets weather icon
            var iconCode = data.weather[0].icon;
            var iconUrl = "https://openweathermap.org/img/wn/" + iconCode + ".png";
            // Displays the weather data to the main card
            mainCity.text(city);
            mainWeather.attr('src', iconUrl)
            // These lines create, style, display, and append a button for each new user input
            var cityBtn = $('<button>');
            cityBtn.addClass("button col-12 p-1 my-2 text-dark bg-gray border-0 rounded");
            cityBtn.text(city);
            saveBarEl.append(cityBtn);
            saveButtonData(cityBtn);
            // Clear the input area
            inputEl.val('');
        });
};

function saveButtonData(saveBtn) {
    // to save a button
    cityArr.push(city)
    console.log(cityArr)
    // need to save the city name to an array
    // save the array to local storage and ENSURE IT DOESN'T GET OVERWRITTEN
    // link the button click to displayData function
};

submitEl.on('click', function () { // when a user clicks the submit button... cont on line 46
    inputEl.val().trim();
    if (inputEl.val() === '') {
        alert('Please Choose a Valid City Name!')
        return;
    }
    // Sets the value of 'city' to the user input
    city = inputEl.val();

    displayData(city)
})

btnEl.on('click', function () { // when a user clicks a city name button
    // call a variable from local storage
    // call the display data function with the variable from ls
})