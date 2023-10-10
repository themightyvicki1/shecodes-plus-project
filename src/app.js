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
  temperatureElement.innerHTML = Math.round(response.data.temperature.current);
  // update name of city
  let cityElement = document.querySelector("#city-name");
  cityElement.innerHTML = response.data.city;
  console.log(response.city);
  // update weather condition
  let conditionElement = document.querySelector("#weather-condition");
  conditionElement.innerHTML = response.data.condition.description;
  // update humidity
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.temperature.humidity;
  // update wind speed
  let windElement = document.querySelector("#wind-speed");
  windElement.innerHTML = Math.round(response.data.wind.speed);
  // update min
  let feelsElement = document.querySelector("#feels-like");
  feelsElement.innerHTML = Math.round(response.data.temperature.feels_like);

  // update time
  let timeElement = document.querySelector("#date-and-time");
  // convert timestamp into miliseconds, function call
  timeElement.innerHTML = formatDate(response.data.time * 1000);
  // updating icon
  let iconElement = document.querySelector(".icon");
  // want source attribute to be equal to the icon url, use setattribute function instead of innerHTML, change src attribute to url
  iconElement.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
  );
  // update alt text with each city
  iconElement.setAttribute("alt", response.data.condition.description);
}

//let apiKey = `456d41832ed298b7d12fff1db0159708`;
let apiKey = `0d7079af8c9adb3t72540o1c3a7eb56d`;
let city = "Sacramento";
//let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=imperial`;
console.log(apiUrl);

// catch results of apiUrl in javascript with axios
axios.get(apiUrl).then(displayTemperature);
