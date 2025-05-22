const apiKey = '';

const searchButton = document.querySelector('#get-weather');
const city = document.querySelector('#city');
const weatherIcon = document.querySelector('#weather-icon');
const weatherInfo = document.querySelector('#weather-info');

function getWeather() {
    const cityName = city.value;

    if (!cityName) {
        return;
    }

    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;

    fetch(currentWeatherUrl)
        .then(response => response.json())
        .then(data => {
            displayWeather(data)
        })
        .catch(error => {
            console.log(error)
        });
}

function displayWeather(data) {

    weatherInfo.innerHTML = '';

    if (data.cod === 404) {
        const errorP = document.createElement('p');
        errorP.innerText = data.message
        weatherInfo.appendChild(errorP);
    }
    else {
        const tempP = document.createElement('p');
        const locationP = document.createElement('p');
        const descriptionP = document.createElement('p');

        const temp = data.main.temp;
        const location = data.name;
        const description = data.weather[0].description;
        const iconCode = data.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;

        tempP.innerText = `${ Math.round((temp - 273.15) * 9/5 + 32)}°F`;
        locationP.innerText = location;
        descriptionP.innerText = description;

        tempP.id = 'temperature';
        locationP.id = 'location';
        descriptionP.id = 'description';

        weatherInfo.appendChild(tempP);
        weatherInfo.appendChild(locationP);
        weatherInfo.appendChild(descriptionP);

        weatherIcon.src = iconUrl;
        weatherIcon.alt = description;
        weatherIcon.style.display = 'block';
    }
}

searchButton.addEventListener('click', getWeather);