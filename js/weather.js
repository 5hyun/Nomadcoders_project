const API_KEY = "4e57782cdfc7912abf219c629498200e";

function onGeoOk(position) {
  const lat = position.coords.latitude;
  const log = position.coords.longitude;
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${log}&appid=${API_KEY}&units=metric`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const weather = document.querySelector("#weather span:first-child");
      const city = document.querySelector("#weather span:last-child");
      city.innerText = `내 지역: ${data.name}`;
      weather.innerText = `오늘 날씨: ${data.weather[0].main}`;
    }); //promise는 당장 뭔가 일어나지 않고 시간이 좀 걸린 뒤 일어난다.
  //url에 나오는 모든 내용이 JSON이다.
}
function onGeoError() {
  alert("Can't find you. No weather for you.");
}

navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);
