const appId = "075c602df06962f7d77922f071e60db4";
let units = "imperial"
let searchMethod;

function getSearchMethod(searchTerm) {
    if(searchTerm.length === 5 && Number.parseInt(searchTerm) + '' === searchTerm) {
        searchMethod = 'zip'
    } else {
        searchMethod = 'q'
    }
}

function searchWeather(searchTerm) {
    getSearchMethod(searchTerm)
    fetch(`http://api.openweathermap.org/data/2.5/weather?${searchMethod}=${searchTerm}&APPID=${appId}&units=${units}`).then(response => {
        return response.json()
    }).then(response => {
        init(response)
    })
}

function init(responseFromServer) {
    console.log(responseFromServer)
    let condition = responseFromServer.weather[0].main
    if (condition === 'Clear') {
        document.body.style.backgroundImage = `url('assets/clear.jpg')`
    } else if (condition === 'Clouds') {
        document.body.style.backgroundImage = `url('assets/cloudy.jpg')`
    } else if (condition === 'Rain' || condition === 'Drizzle' || condition === 'Mist') {
        document.body.style.backgroundImage = `url('assets/rain.jpg')`
    } else if (condition === 'Thunderstorm') {
        document.body.style.backgroundImage = `url('assets/thunderstorm.jpg')`
    } else if (condition === 'Snow') {
        document.body.style.backgroundImage = `url('assets/snow.jpg')`
    } else (
        document.body.style.backgroundImage = `url('assets/default.jpg')`
    )
    let weatherDescriptionHeader = document.getElementById('weatherDescriptionHeader')
    let temperatureElement = document.getElementById('temperature')
    let humidityElement = document.getElementById('humidity')
    let windSpeedElement = document.getElementById('windSpeed')
    let cityHeader = document.getElementById('cityHeader')
    let weatherIcon = document.getElementById('documentIconImg')

    weatherIcon.src = `http://openweathermap.org/img/w/${responseFromServer.weather[0].icon}.png`

    let responseDescription = responseFromServer.weather[0].description;
    weatherDescriptionHeader.innerText = responseDescription;

    temperatureElement.innerHTML = Math.floor(responseFromServer.main.temp) + '&#176';
    windSpeedElement.innerHTML = 'Winds at ' + Math.floor(responseFromServer.wind.speed) + ' m/s';
    cityHeader.innerHTML = responseFromServer.name;
    humidityElement.innerHTML = 'Humidity levels at ' + responseFromServer.main.humidity + '%';

    setPositionInfo();
}

function setPositionInfo() {
    let weatherContainer = document.getElementById('weatherContainer');
    let weatherContainerHeight = weatherContainer.clientHeight;
    let weatherContainerWidth = weatherContainer.clientWidth;

    weatherContainer.style.left = `calc(50% - ${weatherContainerWidth/2}px)`
    weatherContainer.style.top = `calc(50% - ${weatherContainerWidth /1.3}px)`
    weatherContainer.style.visibility = 'visible';
}

document.getElementById('searchBtn').addEventListener('click', () => {
    let searchTerm = document.getElementById('searchInput').value;
    if (searchTerm) {
        searchWeather(searchTerm);
    }
})