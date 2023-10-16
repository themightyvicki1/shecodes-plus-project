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

  return `${day} ${hours}:${minutes}`;
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

  // to set the 5 day forecast - first one shows high of today
  let dayOneElement = document.querySelector("#forecast-day-1");
  dayOneElement.innerHTML = `${Math.round(
    response.data.daily[0].temperature.maximum
  )}°`;

  // to change the day of the day one forecast to today's day
  let forecastOneElement = document.querySelector("#today");
  forecastOneElement.innerHTML = "Today";

  // next day shows high of next day
  let dayTwoElement = document.querySelector("#forecast-day-2");
  dayTwoElement.innerHTML = `${Math.round(
    response.data.daily[1].temperature.maximum
  )}°`;

  let forecastTwoElement = document.querySelector("#day-2");
  forecastTwoElement.innerHTML = "Tomorrow";

  // third day
  let dayThreeElement = document.querySelector("#forecast-day-3");
  dayThreeElement.innerHTML = `${Math.round(
    response.data.daily[2].temperature.maximum
  )}°`;

  let forecastThreeElement = document.querySelector("#day-3");
  forecastThreeElement.innerHTML = "day 3";

  // fourth day
  let dayFourElement = document.querySelector("#forecast-day-4");
  dayFourElement.innerHTML = `${Math.round(
    response.data.daily[3].temperature.maximum
  )}°`;

  let forecastFourElement = document.querySelector("#day-4");
  forecastFourElement.innerHTML = "day 4";

  // fifth day
  let dayFiveElement = document.querySelector("#forecast-day-5");
  dayFiveElement.innerHTML = `${Math.round(
    response.data.daily[4].temperature.maximum
  )}°`;

  let forecastFiveElement = document.querySelector("#day-5");
  forecastFiveElement.innerHTML = "day 5";
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
search("Sacramento");
