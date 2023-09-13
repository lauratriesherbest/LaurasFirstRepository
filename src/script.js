//Challenge 1
// In your project, display the current date and time using JavaScript: Tuesday 16:00

let now = new Date();

let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}

let weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
let weekday = weekdays[now.getDay()];

let datum = `${weekday} ${hours}:${minutes}`;
console.log(datum);

let actualDate = document.querySelector("#date");
actualDate.innerHTML = `${datum}`;

//Challenge 2
//Add a search engine, when searching for a city (i.e. Paris), display the city name on the page after the user submits the form.
function changeCity(event) {
  event.preventDefault();
  let stadt = document.querySelector("#city-input");
  let headerCity = document.querySelector("#city");
  headerCity.innerHTML = `${stadt.value}`;
}

let suchformular = document.querySelector("#search-form");
suchformular.addEventListener("submit", changeCity);

//Challenge Search engine: Show current real weather of the city you type into search engine
function getInsertedCity(event) {
  event.preventDefault();
  let insertedCity = document.querySelector("#city-input");
  let apiKey = "4c9b53e4f8f5eb00df5915bdca340605";
  let city = insertedCity.value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(getWeatherData);
}

function getWeatherData(response) {
  console.log(response);
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `Humidity: ${response.data.main.humidity} %`;

  let temp = document.querySelector("#temperature");
  temp.innerHTML = Math.round(response.data.main.temp);

  let description = document.querySelector("#description");
  description.innerHTML = response.data.weather[0].description;

  let wind = document.querySelector("#wind");
  let windRounded = Math.round(response.data.wind.speed);
  wind.innerHTML = `Wind: ${windRounded} km/h`;
}

let cityForm = document.querySelector("#search-form");
cityForm.addEventListener("submit", getInsertedCity);

//Extra Challenge: weather from current location
function getLocation(event) {
  event.preventDefault;
  navigator.geolocation.getCurrentPosition(getCurrentWeather);
}

function getCurrentWeather(response) {
  console.log(response);
  let apiKey = "1a2b7258ebd456c01aef9175dfe8b709";
  let longitude = response.coords.longitude;
  let latitude = response.coords.latitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayCurrentWeather);
  console.log(apiUrl);
}

function displayCurrentWeather(response) {
  console.log(response);
  let currentCity = document.querySelector("#city");
  currentCity.innerHTML = response.data.name;

  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `Humidity: ${response.data.main.humidity} %`;

  let temp = document.querySelector("#temperature");
  temp.innerHTML = Math.round(response.data.main.temp);

  let description = document.querySelector("#description");
  description.innerHTML = response.data.weather[0].description;

  let wind = document.querySelector("#wind");
  let windRounded = Math.round(response.data.wind.speed);
  wind.innerHTML = `Wind: ${windRounded} km/h`;
}

let currentButton = document.querySelector("#current");
currentButton.addEventListener("click", getLocation);
