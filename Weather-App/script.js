

let API_KEY = "0a682bf71f39adade06e5fc4dcb9f9e2";

getWeatherData = (city) =>{
    const URL = 'https://api.openweathermap.org/data/2.5/weather';

    const Full_Url = `${URL}?q=${city}&appid=${API_KEY}&units=metric`;
    const weatherPromise = fetch(Full_Url);
    console.log(city)

    return weatherPromise.then((response) => {
        return response.json()
    })
}

function main(){
    searchCity();
    GetInfo();
}

function searchCity(){
    const city = document.getElementById('city-input').value;

    getWeatherData(city)
    .then((response) =>{
        showWeatherData(response)
    })
    .catch((err) =>{
        alert("City not found");
    })

}




showWeatherData = (weatherData) =>{
    document.getElementById('city-name').innerText = weatherData.name;
    document.getElementById('weather-type').innerText = weatherData.weather[0].main;
    document.getElementById('icon').src = "http://openweathermap.org/img/wn/" + weatherData.weather[0].icon + "@2x.png";
    document.getElementById('temp').innerText = weatherData.main.temp;
    document.getElementById('min-temp').innerText = weatherData.main.temp_min;
    document.getElementById('max-temp').innerText = weatherData.main.temp_max;
    document.getElementById('humidity').innerText = weatherData.main.humidity;
    var w =  weatherData.wind.speed*2.23;
    document.getElementById('wind-speed').innerText = w.toFixed(2);

}

function GetInfo() {

    var newName = document.getElementById("city-input");
let API_KEY = "0a682bf71f39adade06e5fc4dcb9f9e2";
    fetch('https://api.openweathermap.org/data/2.5/forecast?q='+newName.value+'&appid=0a682bf71f39adade06e5fc4dcb9f9e2')
    .then(response => response.json())
    .then(data => {
    for(i = 0; i<4; i++){
        document.getElementById("day" + (i+1) + "temp").innerHTML = Number(data.list[i+1].main.temp - 273.15).toFixed(1)+ "°C";
    }


    for(i = 0; i<4; i++){
        document.getElementById("day" + (i+1) + "type").innerHTML = data.list[i+1].weather[0].main;
    }

     for(i = 0; i<4; i++){
        document.getElementById("img" + (i+1)).src = "http://openweathermap.org/img/wn/"+
        data.list[i+1].weather[0].icon
        +"@2x.png";
    }
   
})
}


//Getting and displaying the text for the upcoming four days of the week
var d = new Date();
var weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday",];

function CheckDay(day){
    if(day + d.getDay() > 6){
        return day + d.getDay() - 7;
    }
    else{
        return day + d.getDay();
    }
}

for(i = 0; i<4; i++){
    document.getElementById("day" + (i+1)).innerHTML = weekday[CheckDay(i+1)];
}


