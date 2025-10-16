const apiKey = "31c731ef729e7bc35a3a2bbb0b208c92";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
    try {
        const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
        
        if (!response.ok) {
            document.querySelector(".error").style.display = "block";
            document.querySelector(".weather").style.display = "none";
            return;
        }

        const data = await response.json();
        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "℃";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

        const mainWeather = data.weather[0].main.toLowerCase();

        if (mainWeather.includes("cloud")) {
            weatherIcon.src = "images/clouds.png";
        } else if (mainWeather.includes("clear")) {
            weatherIcon.src = "images/clear.png";
        } else if (mainWeather.includes("rain")) {
            weatherIcon.src = "images/rain.png";
        } else if (mainWeather.includes("drizzle")) {
            weatherIcon.src = "images/drizzle.png";
        } else if (mainWeather.includes("mist") || mainWeather.includes("fog")) {
            weatherIcon.src = "images/mist.png";
        } else {
            weatherIcon.src = "images/default.png";
        }

        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";

    } catch (error) {
        console.error("Error:", error);
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    }
}

searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value.trim());
});

searchBox.addEventListener("keypress", (e) => {
    if (e.key === "Enter") checkWeather(searchBox.value.trim());
});