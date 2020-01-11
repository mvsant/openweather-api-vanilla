const api = {
    key: "aa93f9569a7ba7b592b42f2707c3a44a",
    base: "https://api.openweathermap.org/data/2.5/"
}

const searchBox = document.querySelector('.search-box');
searchBox.addEventListener('keypress', setQuery);

function setQuery(evt) {
    if (evt.keyCode == 13) {
        getResults(searchBox.value);
    }
}

function getResults(query) {
    fetch(`${api.base}weather?q=${query}&units=metric&lang=pt&APPID=${api.key}`)
        .then(weather => {
            return weather.json();
        })
        .then(displayResults);
}

function displayResults(weather) {
    console.log(weather.weather[0].id);
    let city = document.querySelector('.location .city');
    city.innerText = `${weather.name}, ${weather.sys.country}`;

    let now = new Date();
    let date = document.querySelector('.location .date');
    date.innerText = dateBuilder(now);

    let temp = document.querySelector('.current .temp');
    temp.innerHTML = `${Math.round(weather.main.temp)} <span>°c</span>`;

    let weather_el = document.querySelector('.current .weather');
    weather_el.innerText = weather.weather[0].main;

    let hiLow = document.querySelector('.hi-low');
    hiLow.innerText = `${Math.round(weather.main.temp_min)}°c / ${Math.round(weather.main.temp_max)}°c`;

    handleBackground(weather.weather[0].id);
}

function dateBuilder(d) {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];


    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
}

function handleBackground(id) {
    var body = document.getElementsByTagName('body')[0];
    switch (true) {
        case (id < 300):
            body.style.backgroundImage = 'url(img/bg-storm.jpg)';
            break;
        case (id < 500):
            body.style.backgroundImage = 'url(img/bg-drizzle.jpg)';
            break;
        case (id < 600):
            body.style.backgroundImage = 'url(img/bg-rainy.jpg)';
            break;
        case (id < 700):
            body.style.backgroundImage = 'url(img/bg-snow.jpg)';
            break;
        case (id < 800):
            body.style.backgroundImage = 'url(img/bg-windy.jpg)';
            break;
        case (id > 800):
            body.style.backgroundImage = 'url(img/bg-cloudly.jpg)';
            break;
        default:
            body.style.backgroundImage = 'url(img/bg-sunny.jpg)';
            break;
    }
}