function getWeatherIcon(weather) {
  function isEmptyObject(obj) {
    return Object.keys(obj).length === 0 && obj.constructor === Object;
  }
  if (isEmptyObject(weather)) {
    return null;
  }
  return "http:" + weather.current.condition.icon;
}
export default getWeatherIcon;
