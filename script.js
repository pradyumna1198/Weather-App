

const apikey = "5998561150a701a43f9c7c1e639ac1c9";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");

const weatherIcon = document.querySelector(".weather-icon"); 

async function checkWeather(city) {
    if (!city) {
        alert("Please enter a city name.");
        return;
    }

    try {
        const response = await fetch(apiUrl + city + `&appid=${apikey}`);
        
        if (!response.ok) {
            throw new Error("City not found");
        }

        const data = await response.json();
        console.log(data);

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";
        
        if (data.weather[0].main === "Clouds") {
            weatherIcon.src = "images/cloudy.png";
        } else if (data.weather[0].main === "Clear") {
            weatherIcon.src = "images/sunny.png";
        } else if (data.weather[0].main === "Rain") {
            weatherIcon.src = "images/rainy.png";
        } else if (data.weather[0].main === "Fog") {
            weatherIcon.src = "images/foggy.png";
        } else if (data.weather[0].main === "Storm") {
            weatherIcon.src = "images/thunderstorm.png";
        } else {
            weatherIcon.src = "images/cloudy.png"; // Default icon for other weather types
        }

    } catch (error) {
        alert(error.message);
    }
}

searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});

// Optional: Set a default city to display weather when the page loads
checkWeather();

