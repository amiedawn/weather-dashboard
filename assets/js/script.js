var inputSearchEl = document.querySelector("#input-search");
var cityInputEl = document.querySelector("#city");
var cityContainerEl = document.querySelector("#city-container")

//var cityInputEl = "San Diego";
var apiKey = "fc812994b97935be7c26648fa44398a1";

var collectWeatherInfo = function() {
// format api.openweathermap.org/data/2.5/forecast?q={city name}&appid={API key}
var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityInputEl + "&appid=" + apiKey;
debugger;
// make a request to the URL
fetch(apiUrl)
  .then(function(response) {
    if (response.ok) {
      response.json().then(function(data) {
        console.log(data);
      });
    } else {
      // if you try to search for a city that doesn't exist
      alert("Error: " + response.statusText);
    }
  })
  .catch(function(error) {
    // catch is chained to the then method
    alert("Unable to connect to Open Weather Map");
  })
};  
 
var searchSubmitHandler = function(event) {
  event.preventDefault();

  // get value from input element
  var city = cityInputEl.nodeValue.trim();

  if (city) {
    collectWeatherInfo(city);
    cityInputEl.value = "";
  } else {
    alert("Please enter a city you would like to know the weather for.");
  }

  console.log(event);
};





collectWeatherInfo();  

inputSearchEl.addEventListener("submit", searchSubmitHandler);