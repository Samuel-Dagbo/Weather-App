const cityInput = document.getElementById('cityInput');
const searchBtn = document.getElementById('searchBtn');
const weatherResult = document.getElementById('weatherResult');
const locationBtn = document.getElementById('locationBtn');

//Load last city when app opens
window.addEventListener('load', () => {
    const lastCity = localStorage.getItem('lastCity');
    if (lastCity){
        getWeather(lastCity);
    }
})

// When user clicks button → get weather
// searchBtn.addEventListener('click', getWeather);
searchBtn.addEventListener('click', () =>{
    const city = cityInput.value.trim();
    if(city === ''){
        weatherResult.textContent = 'Please enter a city name! Thank you!';
    }else{
        getWeather(city);
        localStorage.setItem( city);
    }
});

//-------------------------------------------------
//Location button (GPS)
//---------------------------------------------------
locationBtn.addEventListener('click', () => {
    navigator.geolocation.getCurrentPosition(showPosition, () =>{
        alert('Enable location to use this feature')
    });
});

function showPosition(pos){
    const last = pos.cords.latitude;
    const lon = pos.cords.longitude;

     const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

    fetchWeather(url);
}

// OldMain Function
// function getWeather() {
//     const city = cityInput.value.trim();

//     if (city === '') {
//         weatherResult.textContent = "Please enter a city name! Thank you!";
//         return;
//     }

//     const apiKey = "cfa98a04c8746debd76fc7816e7410d3";
//     const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

//     fetch(url)
//         .then(response => response.json())
//         .then(data => {

//             if (data.cod === "404") {
//                 weatherResult.textContent = "City not found!";
//                 return;
//             }

//             const temp = data.main.temp;
//             const desc = data.weather[0].description;
//             const humidity = data.main.humidity;

//             weatherResult.innerHTML = `
//                 <p><strong>${city.toUpperCase()}</strong></p>
//                 <p>Temperature: ${temp}°C</p>
//                 <p>Condition: ${desc}</p>
//                 <p>Humidity: ${humidity}%</p>
//             `;
//         })
//         .catch(() => {
//             weatherResult.textContent = "Error fetching data!";
//         });
// }


//-------------------------------------------
//Main Function
//----------------------------------------------
function getWeather(city) {
    const apiKey = "cfa98a04c8746debd76fc7816e7410d3";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    fetchWeather(url);
}

// -------------------------------------------
// 5. Fetch weather data
// -------------------------------------------
function fetchWeather(url) {
    fetch(url)
        .then(response => response.json())
        .then(data => {

            if (data.cod == "404") {
                weatherResult.textContent = "City not found!";
                return;
            }

            displayWeather(data);
        })
        .catch(() => {
            weatherResult.textContent = "Error fetching data!";
        });
}



// -------------------------------------------
// 6. Display weather info
// -------------------------------------------
function displayWeather(data) {
    const temp = data.main.temp;
    const desc = data.weather[0].description;
    const humidity = data.main.humidity;
    const wind = data.wind.speed;
    const name = data.name;

    const weatherIcon = getWeatherIcon(desc);
    const tempClass = getTempClass(temp);

    weatherResult.className = "weather-card " + tempClass;

    weatherResult.innerHTML = `
        <div class="weather-icon">${weatherIcon}</div>
        <h3>${name}</h3>
        <p><strong>${temp}°C</strong></p>
        <p>${desc}</p>
        <p>Humidity: ${humidity}%</p>
        <p>Wind: ${wind} m/s</p>
    `;
}



// -------------------------------------------
// 7. Icon selector
// -------------------------------------------
function getWeatherIcon(desc) {
    desc = desc.toLowerCase();

    if (desc.includes("rain")) return "🌧";
    if (desc.includes("cloud")) return "☁";
    if (desc.includes("sun") || desc.includes("clear")) return "☀";
    if (desc.includes("storm")) return "⛈";
    if (desc.includes("snow")) return "❄";

    return "🌍";
}



// -------------------------------------------
// 8. Temperature colors
// -------------------------------------------
function getTempClass(temp) {
    if (temp >= 32) return "hot";
    if (temp >= 25) return "warm";
    if (temp >= 15) return "cool";
    return "cold";
}
