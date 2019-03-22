const appId = "075c602df06962f7d77922f071e60db4";
let units = "imperial"
let searchMethod = 'zip';

function searchWeather(searchTerm) {
    fetch(`http://api.openweathermap.org/data/2.5/weather?${searchMethod}=${searchTerm}&APPID=${appId}&units=${units}`).then(response => {
        return response.json()
    }).then(response => {
        init(response)
    })
}

function init(responseFromServer) {
    console.log(responseFromServer)
}

document.getElementById('searchBtn').addEventListener('click', () => {
    let searchTerm = document.getElementById('searchInput').value;
    if (searchTerm) {
        searchWeather(searchTerm);
    }
})