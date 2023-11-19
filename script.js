import { apiKey } from './config.js';


document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('getWeatherButton').addEventListener('click', function () {
        fetchWeather();
    });

    fetchWeather();
});

console.log('Script.js loaded');

function fetchWeather() {
    const baseUrl = 'https://api.openweathermap.org/data/2.5/weather';

    const location = document.getElementById('city-input').value.trim();

    if (!location) {
        alert('Please enter a city name.');
        return;
    }

    console.log('Location:', location);

    fetch(`${baseUrl}?q=${location}&appid=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            console.log('API Response:', data);
            displayWeatherData(data);
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            document.getElementById('weather-data').innerHTML = 'Error fetching weather data';
        });
}

function displayWeatherData(data) {
    const weatherDataDiv = document.getElementById('weather-data');

    if (data.main) {

        const highTemp = kelvinToFahrenheit(data.main.temp_max);
        const lowTemp = kelvinToFahrenheit(data.main.temp_min);
        const humidity = data.main.humidity;

        const weatherInfoHTML = `
            <p>High: ${highTemp}°F</p>
            <p>Low: ${lowTemp}°F</p>
            <p>Humidity: ${humidity}%</p>
        `;
        weatherDataDiv.innerHTML = weatherInfoHTML;
    } else {
        weatherDataDiv.innerHTML = 'Error: Weather data not available';
    }
}

function kelvinToFahrenheit(kelvin) {
    return ((kelvin - 273.15) * 9/5 + 32).toFixed(2);
}

window.fetchWeather = fetchWeather;