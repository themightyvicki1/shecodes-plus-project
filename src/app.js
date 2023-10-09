// receive number of milliseconds since 1970
function formatDate(timestamp) {
  // calculate the date
  // create a new variable called date, set to new Date and pass timestamp variable here
  let date = new Date(timestamp);
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
  // to display a day not the number day of the week
  let day = dayArray[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

// axios function call will lead here, response back from the api, response is parameter
function displayTemperature(response) {
  console.log(response);
  // set result of querySelector to temp element to be able to select and change
  let temperatureElement = document.querySelector("#temperature");
  // update the temperature id on the page, changing html with javascript
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  // update name of city
  let cityElement = document.querySelector("#city-name");
  cityElement.innerHTML = response.data.name;
  // update weather condition
  let conditionElement = document.querySelector("#weather-condition");
  conditionElement.innerHTML = response.data.weather[0].description;
  // update humidity
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.main.humidity;
  // update wind speed
  let windElement = document.querySelector("#wind-speed");
  windElement.innerHTML = response.data.wind.speed;
  // update min
  let minElement = document.querySelector("#min-temp");
  minElement.innerHTML = Math.round(response.data.main.temp_min);
  // update max
  let maxElement = document.querySelector("#max-temp");
  maxElement.innerHTML = Math.round(response.data.main.temp_max);
  // update time
  let timeElement = document.querySelector("#date-and-time");
  // convert timestamp into miliseconds, function call
  timeElement.innerHTML = formatDate(response.data.dt * 1000);
}

let apiKey = `456d41832ed298b7d12fff1db0159708`;
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Sacramento&appid=${apiKey}&units=imperial`;

// catch results of apiUrl in javascript with axios
axios.get(apiUrl).then(displayTemperature);
