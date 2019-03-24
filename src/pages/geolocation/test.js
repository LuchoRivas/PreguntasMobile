var test = function getWeatherLocation() {
  navigator.geolocation.getCurrentPosition
  (onWeatherSuccess, onWeatherError, { enableHighAccuracy: true });
};
console.log(test);
