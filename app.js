const userLocation = document.getElementById("location");
const weatherImg = document.getElementById("weather-img");
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
  setTimeout(() => {
    error.classList.remove("active");
  }, 5000);

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
      userTime(data);
      backGround(data);
      cityWeather(data);
      showWeather(data);
      showWeatherDescription(data);
      weatherStatistics(data);
      weatherIcon(data);
    });
};

function userTime(data) {
  const showDate = document.getElementById("date");
  const { dt } = data;
  console.log(data);
  if(data.cod !== "404" && data.cod !== "400"){
    let unix_timestamp = dt
    let date = new Date(unix_timestamp * 1000);
    let hours = date.getHours();
    let minutes = "0" + date.getMinutes();
    let formattedTime = hours + ':' + minutes.substr(-2);

    showDate.innerHTML = formattedTime;
  } else {
    showDate.innerHTML = "";
  }
}

function backGround(data) {
  const { weather } = data;
  const icon = weather[0].icon;
  splitIcon = icon.split("");
  const body = document.body
  if(splitIcon[2] === "n"){
    body.style.backgroundImage = "url(img/night-background.jpg)"
  } else {
    body.style.backgroundImage = "url(img/day-background.jpg)"
  }
}

function weatherIcon(data){
  const { weather } = data;
  const iconImage = weather[0].icon;

  const iconImageDiv = document.querySelector(".weather-img")
  if(iconImage === "01d"){
    iconImageDiv.innerHTML = '<img id="weather-img" src="img/01d.png">'
  } else if(iconImage === "01n"){
    iconImageDiv.innerHTML = '<img id="weather-img" src="img/01n.png">'
  } else if(iconImage === "02d"){
    iconImageDiv.innerHTML = '<img id="weather-img" src="img/02d.png">'
  } else if(iconImage === "02n"){
    iconImageDiv.innerHTML = '<img id="weather-img" src="img/02n.png">'
  } else if(iconImage === "03d" && iconImage === "03n"){
    iconImageDiv.innerHTML = '<img id="weather-img" src="img/03.png">'
  } else if(iconImage === "09d"){
    iconImageDiv.innerHTML = '<img id="weather-img" src="img/09d.png">'
  } else if(iconImage === "09n"){
    iconImageDiv.innerHTML = '<img id="weather-img" src="img/09n.png">'
  } else if(iconImage === "10d"){
    iconImageDiv.innerHTML = '<img id="weather-img" src="img/10d.png">'
  } else if(iconImage === "10n"){
    iconImageDiv.innerHTML = '<img id="weather-img" src="img/10n.png">'
  } else if(iconImage === "11d"){
    iconImageDiv.innerHTML = '<img id="weather-img" src="img/11d.png">'
  } else if(iconImage === "11n"){
    iconImageDiv.innerHTML = '<img id="weather-img" src="img/11n.png">'
  } else if(iconImage === "13d"){
    iconImageDiv.innerHTML = '<img id="weather-img" src="img/13d.png">'
  } else if(iconImage === "13n"){
    iconImageDiv.innerHTML = '<img id="weather-img" src="img/13n.png">'
  } else if(iconImage === "50d" && iconImage === "50n"){
    iconImageDiv.innerHTML = '<img id="weather-img" src="img/50.png">'
  }

}


function cityWeather(data){
  const { name } = data;
  const location = document.getElementById("location");
  location.innerHTML = name;
}

function showWeather(data){
  const { main: { temp } } = data;
  const centigrados = parseInt(temp - 273.15);
  const temperature = document.getElementById("temperature");
  temperature.innerHTML = `${centigrados}<span>&#176C</span>`;
}

function showWeatherDescription(data) {
  const { weather } = data;
  const answer = weather[0].description;

  const weatherText = document.getElementById("weather");
  weatherText.innerHTML = answer.toUpperCase();
}

function weatherStatistics(data){
  const { main: { humidity } } = data;
  const { wind: { speed } } = data;
  const { main: { feels_like } } = data;

  const feelstocentigrados = parseInt(feels_like - 273.15);
  const kmSpeed = parseInt(speed * 3.6)

  const humidityPercentage = document.getElementById("humidity");
  const wind = document.getElementById("wind");
  const feels = document.getElementById("feels");

  humidityPercentage.innerHTML = `${humidity}%`
  wind.innerHTML = `${kmSpeed} km/h`
  feels.innerHTML = `${feelstocentigrados}&#176`
}
