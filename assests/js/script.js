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
var btnEl = $('button')

// when the page loads, cities that are saved in local storage become buttons
function initialize() {
    // gets the stored city names from localStorage
    var storedCities = JSON.parse(localStorage.getItem('savedCities'))
    // ensures that only valid data entries will be added to the city array
    if(storedCities !== null) {
        cityArr = storedCities
    }
    // call the renderBtns function
    renderBtns()
};
// creates a button after a user inputs a city name into the search bar
function renderBtns() {
    // resets the html for the save bar so that it doesn't load copies of the buttons
    saveBarEl.html('');
    //renders a new button for each city
    for(var i = 0; i < cityArr.length; i++) {
        // draws the values of the cityArr out
        var savedCity = cityArr[i];
        // creates a button for each value drawn from cityArr
        var cityBtn = $('<button>');
        cityBtn.addClass("btn btn-outline-info col-12 p-1 my-2 text-dark rounded");
        cityBtn.attr('id', savedCity);
        cityBtn.text(savedCity);
        // appends newly created buttons to the saveBar element
        saveBarEl.append(cityBtn);
    }
};
// displays weahter data for chosen city
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
            // date display for weather data cards
            $('#todayDate').text(dayjs.unix(data.list[0].dt).format('M/D/YYYY'));
            $('#card1 #cardDate').text(dayjs.unix(data.list[7].dt).format('M/D/YYYY'));
            $('#card2 #cardDate').text(dayjs.unix(data.list[15].dt).format('M/D/YYYY'));
            $('#card3 #cardDate').text(dayjs.unix(data.list[23].dt).format('M/D/YYYY'));
            $('#card4 #cardDate').text(dayjs.unix(data.list[31].dt).format('M/D/YYYY'));
            $('#card5 #cardDate').text(dayjs.unix(data.list[39].dt).format('M/D/YYYY'));
            // temperature display
            $('#tempMain').text('Temperature: ' + data.list[0].main.temp + 'F');
            $('#card1 #cardTemp').text('Temperature: ' + data.list[7].main.temp + ' F');
            $('#card2 #cardTemp').text('Temperature: ' + data.list[15].main.temp + ' F');
            $('#card3 #cardTemp').text('Temperature: ' + data.list[23].main.temp + ' F');
            $('#card4 #cardTemp').text('Temperature: ' + data.list[31].main.temp + ' F');
            $('#card5 #cardTemp').text('Temperature: ' + data.list[39].main.temp + ' F');
            // wind speed display
            $('#windSpeedMain').text('Wind Speed: ' + data.list[0].wind.speed + ' MpH');
            $('#card1 #cardWind').text('Wind Speed: ' + data.list[7].wind.speed + ' MpH');
            $('#card2 #cardWind').text('Wind Speed: ' + data.list[15].wind.speed + ' MpH');
            $('#card3 #cardWind').text('Wind Speed: ' + data.list[23].wind.speed + ' MpH');
            $('#card4 #cardWind').text('Wind Speed: ' + data.list[31].wind.speed + ' MpH');
            $('#card5 #cardWind').text('Wind Speed: ' + data.list[39].wind.speed + ' MpH');
            // humidity display
            $('#humidityMain').text('Humidity: ' + data.list[0].main.humidity  + '%');
            $('#card1 #cardHumidity').text('Humidity: ' + data.list[7].main.humidity  + '%');
            $('#card2 #cardHumidity').text('Humidity: ' + data.list[15].main.humidity + '%');
            $('#card3 #cardHumidity').text('Humidity: ' + data.list[23].main.humidity + '%');
            $('#card4 #cardHumidity').text('Humidity: ' + data.list[31].main.humidity + '%');
            $('#card5 #cardHumidity').text('Humidity: ' + data.list[39].main.humidity + '%');
            // Weather icon display
            $('#weatherIcon').attr('src', "https://openweathermap.org/img/wn/" + data.list[0].weather[0].icon + ".png");
            $('#card1 #cardIcon').attr('src', "https://openweathermap.org/img/wn/" + data.list[7].weather[0].icon + ".png");
            $('#card2 #cardIcon').attr('src', "https://openweathermap.org/img/wn/" + data.list[15].weather[0].icon + ".png");
            $('#card3 #cardIcon').attr('src', "https://openweathermap.org/img/wn/" + data.list[23].weather[0].icon + ".png");
            $('#card4 #cardIcon').attr('src', "https://openweathermap.org/img/wn/" + data.list[31].weather[0].icon + ".png");
            $('#card5 #cardIcon').attr('src', "https://openweathermap.org/img/wn/" + data.list[39].weather[0].icon + ".png");
            // City name display
            $('#cityName').text(city);
        });
};
// saves the user data
function saveData() {
    // save the array to local storage and ENSURE IT DOESN'T GET OVERWRITTEN
    localStorage.setItem('savedCities', JSON.stringify(cityArr))
};
// for when a user submits a city name
submitEl.on('click', function () {
    // trims the extra spaces from the user input
    inputEl.val().trim();
    // if the user clicks the submit button without entering a city name, an error message will display
    if (inputEl.val() === '') {
        alert('Please Choose a Valid City Name!')
        return;
    }
    // Sets the value of 'city' to the user input and pushes that value to an empty array
    city = inputEl.val();
    cityArr.push(city);
    // Clear the input area
    inputEl.val('');
    // calls the functions for saving the user input, creating a button from the user input, and display data for the user input
    saveData(city);
    renderBtns();
    displayData(city)
})
// for when a saved city button is clicked
saveBarEl.on('click', function(event) {
    // targets the button that was clicked
    var element = event.target;
    // grabs the element id value and sends it to the displayData function
    if(element.matches('button') === true) {
        var i = $(element).attr('id');
        console.log(i);
        displayData(i)
    }
});
//call the initialize function
initialize()