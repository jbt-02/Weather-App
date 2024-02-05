const weathericon = document.querySelector('.weather-icon');
const locat = document.querySelector('.Location');
const Temp = document.querySelector('.temp');
const Measurament = document.querySelector('.measurament');
const inputLocation = document.querySelector('.Input-Location');
const windspeed = document.querySelector('#wind-speed');
const winddir = document.querySelector('.arrow');

const submit = document.querySelector('button');

const APIKEY = '80c6df2396bdae543220371a1b167d93';
var api = `https://api.openweathermap.org/data/2.5/weather?q=Manassas,us&APPID=${APIKEY}`;

const weather = {};

const KELVIN = 273;

weather.temperature = {
    unit: 'celsius'
}

const wind = {};


submit.addEventListener('click', function(){
    const inputLocation = document.querySelector('.Input-Location').value;
    api = `https://api.openweathermap.org/data/2.5/weather?q=${inputLocation}&APPID=${APIKEY}`;
    getWeather();
});   

function getWeather(){
    fetch(api)
        .then(function(response){
            let data = response.json();
            return data;
        })
        .then(function(data){
            weather.temperature.value = Math.floor(data.main.temp - KELVIN);
            weather.description = data.weather[0].description;
            weather.iconId = data.weather[0].icon;
            weather.city = data.name;
            weather.country = data.sys.country;
            wind.speed = data.wind.speed;
            wind.deg = data.wind.deg;
        })
        .then(function(){
            Display();
        });
}

function Display(){
    weathericon.src = `Icons/${weather.iconId}.png`;
    Temp.innerHTML = `${weather.temperature.value}°C`;
    locat.innerHTML = `${weather.city}, ${weather.country}`;

    getwindDirection(wind.deg, wind.speed); 
    
    if (weather.iconId.charAt(2) == 'n'){
        document.body.style.backgroundImage = 'url(night.jpg)';
        console.log(weather.iconId);
    }
    else{
        document.body.style.backgroundImage = 'url(day.jpg)'
    }
}

function changetoFahrenheit(temperature){
    return (temperature * 9/5) + 32;

}

function getwindDirection(deg, speed){
    let val = Math.floor((deg / 22.5) + 0.5);
    const arr = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];

    val = arr[(val % 16)];
    
    switch(val){
        case "N":
            windspeed.innerHTML = `${speed}mph ${val}   ↑`;
            break;
        case "NNE":
            windspeed.innerHTML = `${speed}mph ${val}   ↗`;
            break;
        case "NE":
            windspeed.innerHTML = `${speed}mph ${val}   ↗`;
            break;
        case "ENE":
            windspeed.innerHTML = `${speed}mph ${val}   ↗`;
            break;
        case "E":
            windspeed.innerHTML = `${speed}mph ${val}   →`;
            break;
        case "ESE":
            windspeed.innerHTML = `${speed}mph ${val}   ↘`;
            break;
        case "SE":
            windspeed.innerHTML = `${speed}mph ${val}   ↘`;
            break;
        case "SSE":
            windspeed.innerHTML = `${speed}mph ${val}   ↘`;
            break;
        case "S":
            windspeed.innerHTML = `${speed}mph ${val}   ↓`;
            break;
        case "SSW":
            windspeed.innerHTML = `${speed}mph ${val}   ↙`;
            break;
        case "SW":
            windspeed.innerHTML = `${speed}mph ${val}   ↙`;
            break;
        case "WSW":
            windspeed.innerHTML = `${speed}mph ${val}   ↙`;
            break;
        case "W":
            windspeed.innerHTML = `${speed}mph ${val}   ←`;
            break;
        case "WNW":
            windspeed.innerHTML = `${speed}mph ${val}   ↖`;
            break;
        case "NW":
            windspeed.innerHTML = `${speed}mph ${val}   ↖`;
            break;
        case "NWN":
            windspeed.innerHTML = `${speed}mph ${val}   ↖`;
            break;    
    }

}


Temp.addEventListener('click', function(){
    if(weather.temperature.unit == 'celsius'){
        let fahrenheit = changetoFahrenheit(weather.temperature.value);
        fahrenheit = Math.floor(fahrenheit);

        Temp.innerHTML = `${fahrenheit}°F`;
        weather.temperature.unit = 'fahrenheit';
    }
    else{
        Temp.innerHTML = `${weather.temperature.value}°C`;
        weather.temperature.unit = 'celsius';
    }
});

getWeather();



