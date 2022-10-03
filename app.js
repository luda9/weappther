const userLocation = document.getElementById("location");
const weatherImg = document.getElementById("weather-img");
const date = document.getElementById("date");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const rain = document.getElementById("rain");
const form = document.getElementById("form");
const error = document.getElementById("error");


window.addEventListener('load', () => {
  form.addEventListener("submit", searchWeather);
});

function searchWeather(e) {
  const cityName = document.getElementById("city-name").value;
  e.preventDefault();
  if(cityName == ""){
    error.classList.add("active");
  };

  fetchApi(cityName);
};

function fetchApi(city){
  const apiId = "9828cc963f88090f32af9a0f8f5ba9f6";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiId}`;

  fetch(url)
    .then(answer => answer.json())
    .then(data => {
      if(data.cod === "404"){
        error.classList.add("active");
      }
      showWeather(data);
      showTypeOfWeather(data);
    });
};

function showWeather(data){
  const { main: { temp } } = data;
  const centigrados = parseInt(temp - 273.15);
  const temperature = document.getElementById("temperature");
  temperature.innerHTML = `${centigrados}<span>&#176C</span>`;
}

function showTypeOfWeather(data) {
  const { weather } = data;
  const answer = weather[0].description;

  const weatherText = document.getElementById("weather");
  weatherText.innerHTML = answer.toUpperCase();
}
