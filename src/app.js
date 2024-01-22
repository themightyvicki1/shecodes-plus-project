// receive number of milliseconds since 1970
function formatDate() {
  // calculate the date
  // create a new variable called date, set to new Date and pass timestamp variable here
  let date = new Date();
  let actualDate = date.getDate();
  let hours = date.getHours();
  // fix so that hour 1 will say 01 not 1
  if (hours < 10) {
    hours = `0${hours}`;
  }

  let ampm = "am";
  if (hours > 11) {
    ampm = "pm";
  }

  if (hours === 13) {
    hours = 1;
  }
  if (hours === 14) {
    hours = 2;
  }
  if (hours === 15) {
    hours = 3;
  }
  if (hours === 16) {
    hours = 4;
  }
  if (hours === 17) {
    hours = 5;
  }
  if (hours === 18) {
    hours = 6;
  }
  if (hours === 19) {
    hours = 7;
  }
  if (hours === 20) {
    hours = 8;
  }
  if (hours === 21) {
    hours = 9;
  }
  if (hours === 22) {
    hours = 10;
  }
  if (hours === 23) {
    hours = 11;
  }
  if (hours === 24) {
    hours = 12;
  }

  let minutes = date.getMinutes();
  // fix so that 5 passed the hour won't say 5, it'll say 05
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let dayArray = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let month = months[date.getMonth()];

  // to display a day not the number day of the week
  let day = dayArray[date.getDay()];
  let year = date.getFullYear();

  let dateFormatted = `${day}, ${month} ${actualDate}, ${year}`;

  let fullDateElement = document.querySelector("#display-full-date-here");
  fullDateElement.innerHTML = dateFormatted;

  return `${day} ${hours}:${minutes}${ampm}`;
}

// axios function call will lead here, response back from the api, response is parameter
function displayTemperature(response) {
  console.log(response);
  // set result of querySelector to temp element to be able to select and change
  let temperatureElement = document.querySelector("#temperature");
  // update the temperature id on the page, changing html with javascript
  temperatureElement.innerHTML = Math.round(
    response.data.daily[0].temperature.day
  );
  // update name of city
  let cityElement = document.querySelector("#city-name");
  cityElement.innerHTML = response.data.city;
  console.log(response.data.city);
  // update weather condition
  let conditionElement = document.querySelector("#weather-condition");
  conditionElement.innerHTML = response.data.daily[0].condition.description;
  // update humidity
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.daily[0].temperature.humidity;
  // update wind speed
  let windElement = document.querySelector("#wind-speed");
  windElement.innerHTML = Math.round(response.data.daily[0].wind.speed);
  // update min
  let minElement = document.querySelector("#min-temp");
  minElement.innerHTML = Math.round(response.data.daily[0].temperature.minimum);
  //update max
  let maxElement = document.querySelector("#max-temp");
  maxElement.innerHTML = Math.round(response.data.daily[0].temperature.maximum);
  // update time
  let timeElement = document.querySelector("#date-and-time");
  // convert timestamp into miliseconds, function call
  timeElement.innerHTML = formatDate(response.data.daily[0].time);
  // updating icon
  let iconElement = document.querySelector(".icon");
  // want source attribute to be equal to the icon url, use setattribute function instead of innerHTML, change src attribute to url
  iconElement.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.daily[0].condition.icon}.png`
  );
  // update alt text with each city
  iconElement.setAttribute("alt", response.data.daily[0].condition.description);

  // to get the value of the temperature and store inside a variable
  fahrenheitTemperature = response.data.daily[0].temperature.day;

  // to show the temp here but to also pass the response to the next function for the 5 day forecast as well
  displayForecast(response);
}

// function that will display the 5 day forecast
function displayForecast(response) {
  let forecast = response.data.daily;
  // to set the 5 day forecast - first one shows high of today
  // create a new variable to select the element, id from the div we left in html
  let forecastElement = document.querySelector("#forecast");

  // i want the forecastElement's innerHTML to be equal to...forecast for testing
  // innerHTML accepts HTML, use back ticks here not double quotes
  // have to append, not replace previous content - concatenate
  // create new variable, goal of variable is to store the HTML of the forecast, start with empty string, populate this variable with the right content
  // want this to be a row so you can add a grid to it, inject multiple columns for the forecast for each day
  let forecastHTML = `<div class="row">`;

  // to loop through the icon array
  let i = 0;

  // to loop through each day of an array
  //let days = ["Mon", "Tue", "Wed", "Thur", "Fri"];

  // condition so that it'll only show 5 days not 8 days, returns the index...index of the array 0 1 2 3...
  // forEach function...it will append a new column to the row for each day
  forecast.forEach(function (forecastDay, index) {
    // if the index is lower than 6 then add a new column to the html variable. 6 or more do nothing
    if (index < 6) {
      // set variable to the div's removed from HTML to display fore cast
      // adding the = forecast + will append and create a second one - to be able to repeat this block of code
      // equal to itself PLUS all this string of code
      forecastHTML =
        forecastHTML +
        `<div class="col-2" id ="forecast-bubble">
      <div class="weather-forecast-date">${formatDay(forecastDay.time)}</div>
      
      
      <img src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${
        response.data.daily[i].condition.icon
      }.png" alt = "" width="42"/>
      
      
        <div class="weather-forecast-temperatures">
          <span class="weather-forecast-temperature-max"> ${Math.round(
            forecastDay.temperature.maximum
          )}° </span>
          <span class="weather-forecast-temperature-min"> ${Math.round(
            forecastDay.temperature.minimum
          )}° </span>
        </div>
    </div>
  `;
    }
    // needed to loop through the array, it wasn't updated and moving to the next index without the iteration here
    i++;
    index++;
  });

  // sending the timestamp from above, inside the array, to this function to get the actual day of the week
  // to get the day for the 5 day forecast
  function formatDay(timestamp) {
    let date = new Date(timestamp * 1000);
    let day = date.getDay();
    let days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
    return days[day];
  }

  // close the div here, close the row, building dynamic HTML using javascript
  forecastHTML = forecastHTML + `</div>`;
  // i want to use t his forecastHTML variable and inject it into the innerHTML of the element we want to replace
  forecastElement.innerHTML = forecastHTML;
}

// to handle the search
function search(city) {
  //let apiKey = `456d41832ed298b7d12fff1db0159708`;
  let apiKey = `0d7079af8c9adb3t72540o1c3a7eb56d`;
  //let city = "Sacramento";
  //let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  //let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=imperial`;
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=imperial`;
  //console.log(apiUrl);
  // catch results of apiUrl in javascript with axios
  axios.get(apiUrl).then(displayTemperature);
}

// searchCity function, receives an event b/c added event listener
function searchCitySubmit(event) {
  // prevent default behavior so page doesn't reload
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");

  // access value now stored in the cityInputElement with .value of the variable
  //console.log(cityInputElement.value);
  // we have to search for the city element using user input, function call
  search(cityInputElement.value);
}

// to display the temp in celsius function - prevent default event behavior
function displayCelsiusTemp(event) {
  event.preventDefault();
  celsiusTemperature = ((fahrenheitTemperature - 32) * 5) / 9;

  // remove the active class from the fah link b/c cel was clicked so add to cel
  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");

  //alert(celsiusTemperature);
  // select temp element to change the html of it
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);

  //let todayTemp = document.querySelector("#forecast-day-1");
  //todayTemp.innerHTML = `${Math.round(celsiusTemperature)}°`;
}

// to display the temp back into fahrenheit, don't need to do math here b/c already have the temp in fahrenheit
function displayFahrenheitTemp(event) {
  event.preventDefault();
  // fah link to add active and remove active from cel
  fahrenheitLink.classList.add("active");
  celsiusLink.classList.remove("active");

  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

// get current position
function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

// show position function, receiving the position
function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;

  // new api call using lat and long
  let apiKey = `0d7079af8c9adb3t72540o1c3a7eb56d`;
  let apiUrlLongLat = `https://api.shecodes.io/weather/v1/forecast?lon=${longitude}&lat=${latitude}&key=${apiKey}&units=imperial`;

  console.log(apiUrlLongLat);
  // axios call
  // just call back to same displayTemp function, the response from this function's axios call will get put in that function
  axios.get(apiUrlLongLat).then(displayTemperature);
}
// global variable to access it inside functions, starts as null but will be updated inside function
let fahrenheitTemperature = null;
let celsiusTemperature = null;
// link form to take control over html so that form is controlled by javascript, select
let form = document.querySelector("#search-form");
// add event listener to listen for the submit, go to function searchCity
form.addEventListener("submit", searchCitySubmit);

// target the c and f to be able to update from c to f with a click, querySelector, event listener
let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemp);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemp);

// call to search function for default info when page is first loaded, this call will happen right away instead of using fake data to start
search("Seattle");
// call to display the 5 day forecast, moving from HTML into JS as a seperate function
//displayForecast("Sacramento"); *** this call was making my current button no longer work

// display weather based on current location
let currentButton = document.querySelector("#current-button");
currentButton.addEventListener("click", getCurrentPosition);
