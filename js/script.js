const navLinks = document.querySelectorAll(".navbar-nav .nav-link");

navLinks.forEach((link) => {
  link.addEventListener("click", function () {
    navLinks.forEach((link) => link.classList.remove("active"));
    this.classList.add("active");
  });
});

const apiUrl = "https://api.weatherapi.com/v1";
const apiKey = "7ac70b09ca814995a2c215943252606";

async function getWeather(city) {
  try {
    const response = await fetch(
      `${apiUrl}/forecast.json?key=${apiKey}&q=${city}&days=3`
    );
    const data = await response.json();

    // --- Day 1 (Card 1) ---
    const today = data.forecast.forecastday[0];
    const localTime = new Date(data.location.localtime);

    document.getElementById("day").textContent = localTime.toLocaleDateString(
      "en-US",
      { weekday: "long" }
    );
    document.getElementById("date").textContent = localTime.toLocaleDateString(
      "en-US",
      { day: "numeric", month: "short" }
    );

    document.querySelector(".card-body.body1").innerHTML = `
      <h5 class="card-title text-gray mb-4">${data.location.name}</h5>
      <p class="card-text hh fw-bold text-white text-center mb-5">${data.current.temp_c}°C</p>
      <img src="https:${data.current.condition.icon}" alt="weather icon" class="img-fluid mb-4" width="64">
      <p class="card-text text-primary mb-4 fw-bold">${data.current.condition.text}</p>
      <span class="text-gray fs-6 px-2">
        <img src="./images/umberella.png" class="px-1"> ${today.day.daily_chance_of_rain}%
      </span>
      <span class="text-gray fs-6 px-2">
        <img src="./images/wind.png" class="px-1"> ${data.current.wind_kph}km/h
      </span>
      <span class="text-gray fs-6 px-2">
        <img src="./images/compass.png" class="px-1"> ${data.current.wind_dir}
      </span>
    `;

    // --- Day 2 (Card 2) ---
    const day2 = data.forecast.forecastday[1];
    const date2 = new Date(day2.date);
    document.getElementById("day2").textContent = date2.toLocaleDateString(
      "en-US",
      { weekday: "long" }
    );

    document.querySelector(".card-body.body2").innerHTML = `
      <div class="mb-3">
        <img src="https:${day2.day.condition.icon}" alt="icon" class="img-fluid" width="64">
      </div>
      <p class="card-text h4 fw-bold text-white">${day2.day.maxtemp_c}°C</p>
      <span class="text-gray">${day2.day.mintemp_c}°C</span>
      <p class="card-text text-primary mt-4 fw-bold">${day2.day.condition.text}</p>
    `;

    // --- Day 3 (Card 3) ---
    const day3 = data.forecast.forecastday[2];
    const date3 = new Date(day3.date);
    document.getElementById("day3").textContent = date3.toLocaleDateString(
      "en-US",
      { weekday: "long" }
    );

    document.querySelector(".card-body.body3").innerHTML = `
      <div class="mb-3">
        <img src="https:${day3.day.condition.icon}" alt="icon" class="img-fluid" width="64">
      </div>
      <p class="card-text h4 fw-bold text-white">${day3.day.maxtemp_c}°C</p>
      <span class="text-gray">${day3.day.mintemp_c}°C</span>
      <p class="card-text text-primary mt-4 fw-bold">${day3.day.condition.text}</p>
    `;
  } catch (error) {
    console.error("Weather fetch failed", error);
  }
}

const form = document.getElementById("form");
form.addEventListener("input", function (e) {
  e.preventDefault();
  const city = document.getElementById("search").value.trim();
  if (city) {
    getWeather(city);
  }
});


window.addEventListener("DOMContentLoaded", () => {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        getWeather(`${latitude},${longitude}`);
      },
      (error) => {
        getWeather("Cairo");
      }
    );
  } else {
    getWeather("Cairo");
  }
});

