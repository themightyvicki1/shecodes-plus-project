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
  timeElement.innerHTML = formatDate(response.data.daily[0].time * 1000);
  // updating icon
  let iconElement = document.querySelector(".icon");
  // want source attribute to be equal to the icon url, use setattribute function instead of innerHTML, change src attribute to url
  iconElement.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.daily[0].condition.icon}.png`
  );
  // update alt text with each city
  iconElement.setAttribute("alt", response.data.daily[0].condition.description);
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

// call to search function for default info when page is first loaded, this call will happen right away
search("Sacramento");
// link form to take control over html so that form is controlled by javascript, select
let form = document.querySelector("#search-form");
// add event listener to listen for the submit, go to function searchCity
form.addEventListener("submit", searchCitySubmit);
