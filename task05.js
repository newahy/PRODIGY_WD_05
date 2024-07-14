const apiKey = 'YOUR_OPENWEATHERMAP_API_KEY';
const weatherDiv = document.getElementById('weather-data');
const searchBtn = document.getElementById('search-btn');
const locationInput = document.getElementById('location-input');
const locationBtn = document.getElementById('location-btn');

searchBtn.addEventListener('click', fetchWeatherData);
locationBtn.addEventListener('click', fetchCurrentLocationWeather);

async function fetchWeatherData() {
  const location = locationInput.value.trim();
  if (!location) {
    weatherDiv.innerHTML = '<p>Please enter a location.</p>';
    return;
  }

  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`);
    const weatherData = await response.json();
    displayWeatherData(weatherData);
  } catch (error) {
    console.error('Error fetching weather data:', error);
    weatherDiv.innerHTML = '<p>Failed to fetch weather data.</p>';
  }
}

async function fetchCurrentLocationWeather() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`);
        const weatherData = await response.json();
        displayWeatherData(weatherData);
      } catch (error) {
        console.error('Error fetching weather data:', error);
        weatherDiv.innerHTML = '<p>Failed to fetch weather data.</p>';
      }
    });
  } else {
    weatherDiv.innerHTML = '<p>Geolocation is not supported by this browser.</p>';
  }
}

function displayWeatherData(data) {
  const { name, main, wind, weather } = data;
  const temperature = main.temp;
  const windSpeed = wind.speed;
  const humidity = main.humidity;
  const description = weather[0].description;

  const weatherContent = `
    <div class="current-weather">
      <div class="details">
        <h2>${name} ( ${weather[0].main} )</h2>
        <h6>Temperature: ${temperature}°C</h6>
        <h6>Wind: ${windSpeed} M/S</h6>
        <h6>Humidity: ${humidity}%</h6>
         </div>
    </div>
  `;
  weatherDiv.innerHTML = weatherContent;
}