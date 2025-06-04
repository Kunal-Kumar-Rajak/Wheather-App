const apiKey = "f378bca37c680316b762e9f44d08374a";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

  if (response.status == 404) {
    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather").style.display = "none";
  } else {
    const data = await response.json();

    // Basic Weather Information
    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "*C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";
    document.querySelector(".pressure").innerHTML = data.main.pressure + " hPa";
    document.querySelector(".description").innerHTML = data.weather[0].description;
    document.querySelector(".min-temp").innerHTML = data.main.temp_min + "*C";
    document.querySelector(".max-temp").innerHTML = data.main.temp_max + "*C";

    // Sunrise and Sunset times
    const sunrise = new Date(data.sys.sunrise * 1000).toLocaleTimeString();
    const sunset = new Date(data.sys.sunset * 1000).toLocaleTimeString();
    document.querySelector(".sunrise-time").innerHTML = sunrise;
    document.querySelector(".sunset-time").innerHTML = sunset;

    // Weather Icon
    const weatherMain = data.weather[0].main;
    if (weatherMain == "Clouds") {
      weatherIcon.src = "img/clouds.png";
    } else if (weatherMain == "Clear") {
      weatherIcon.src = "img/clear.png";
    } else if (weatherMain == "Rain") {
      weatherIcon.src = "img/rain.png";
    } else if (weatherMain == "Drizzle") {
      weatherIcon.src = "img/drizzle.png";
    } else if (weatherMain == "Mist") {
      weatherIcon.src = "img/mist.png";
    }

    document.querySelector(".weather").style.display = "block";
    document.querySelector(".error").style.display = "none";
  }
}

searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value);
});

searchBox.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    checkWeather(searchBox.value);
  }
});
