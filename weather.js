const apiKey = 'f0f4f84117d4a473745a7650a659e86f';
const cityId = '2643743'; // ID for London, UK
const apiUrlCurrent = `http://api.openweathermap.org/data/2.5/weather?id=${cityId}&appid=${apiKey}&units=metric`;
const apiUrlForecast = `http://api.openweathermap.org/data/2.5/forecast?id=${cityId}&appid=${apiKey}&units=metric`;

// Get current weather data
fetch(apiUrlCurrent)
.then(response => response.json())
.then(data => {
  let currentWeather = data.weather[0].main;
  let currentTemperature = Math.round(data.main.temp);
  let iconCode = data.weather[0].icon;

  let iconPath = `/icons/${iconCode}.svg`;

  document.getElementById('current-weather').innerHTML = `<img id="top-icon" src="${iconPath}" alt="${currentWeather} icon"><br>${currentWeather} and ${currentTemperature}°C`;
})
.catch(error => console.error(error));

// Get future weather data
fetch(apiUrlForecast)
.then(response => response.json())
.then(data => {
  let forecastHTML = '';
  let datesAdded = [];

  for (let i = 0; i < data.list.length; i++) {
    let forecast = data.list[i];
    let date = new Date(forecast.dt * 1000).toLocaleDateString();

    // If the date is already in datesAdded, continue to the next iteration
    if (datesAdded.includes(date)) continue;

    let forecastWeather = forecast.weather[0].main;
    let forecastTemperature = Math.round(forecast.main.temp);
    let iconCode = forecast.weather[0].icon;

    let iconPath = `/icons/${iconCode}.svg`;

    forecastHTML += `<div><img src="${iconPath}" alt="${forecastWeather} icon"><br>${date}<br>${forecastWeather} and ${forecastTemperature}°C</div>`;

    // Add the date to datesAdded
    datesAdded.push(date);

    // If we have added 5 forecasts, break the loop
    if (datesAdded.length === 5) break;
  }

  document.getElementById('future-forecast').innerHTML = forecastHTML;
})
.catch(error => console.error(error));
