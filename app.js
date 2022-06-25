var search = document.querySelector(".search");
var city = document.querySelector(".city");
var country = document.querySelector(".country");
var value = document.querySelector(".value");
var shortDesc = document.querySelector(".short-desc");
var visibility = document.querySelector(".visibility span");
var wind = document.querySelector(".wind span");
var sun = document.querySelector(".sun span");
var time = document.querySelector(".time");
var content = document.querySelector(".content");
var body = document.querySelector("body");
changeWeatherUI("ha noi");
search.addEventListener("keypress", (e) => {
  if (e.code === "Enter") {
    changeWeatherUI(search.value.trim());
  }
});

async function changeWeatherUI(capitalValue) {
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${capitalValue}&appid=8e54421efa975b807d39ebcf9c8a1cfb`;
  let data = await fetch(apiURL).then((res) => res.json());
  if (data.cod == 200) {
    content.classList.remove("hide");
    city.innerText = data.name;
    country.innerText = data.sys.country;
    visibility.innerText = data.visibility + "m";
    wind.innerText = data.wind.speed + "m/s";
    sun.innerText = data.main.humidity + "%";
    value.innerText = Math.round(data.main.temp - 273.15);
    shortDesc.innerText = data.weather[0] ? data.weather[0].main : "";
    time.innerText = new Date().toLocaleString("vi");
    var temp = Math.round(data.main.temp - 273.15);
    if (temp < 18) {
      body.classList.add("winter");
      body.classList.remove("spring");
      body.classList.remove("autumn");
      body.classList.remove("summer");
      body.classList.remove("font");
    } else if (temp >= 18 && temp < 27) {
      body.classList.remove("winter");
      body.classList.remove("spring");
      body.classList.add("autumn", "font");
      body.classList.remove("summer");
      body.classList.remove("font");
    } else if (temp >= 27 && temp < 32) {
      body.classList.remove("winter");
      body.classList.remove("font");
      body.classList.add("spring");
      body.classList.remove("autumn");
      body.classList.remove("summer");
    } else {
      body.classList.remove("winter");
      body.classList.remove("spring");
      body.classList.remove("autumn");
      body.classList.add("summer", "font");
    }
  } else {
    content.classList.add("hide");
  }
}
