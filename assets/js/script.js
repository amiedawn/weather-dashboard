

var inputSearchEl = document.querySelector("#input-search");
var cityInputEl = document.querySelector("#city");
var cityContainerEl = document.querySelector("#city-container");
var apiKey = "fc812994b97935be7c26648fa44398a1";


// // store and display recent searches in local storage
// var $city = $(".form-input");
// debugger;

// $("button").on("click", function() {
//   localStorage.setItem(".search-line"), JSON.stringify($city.val());
//   var persistCity  = JSON.parse(localStorage.getItem("search-line"));
//   $(".form-input").val(persistCity);
// });

var collectWeatherInfo = function (city) {
  //Daily: format api.openweathermap.org/data/2.5/forecast?q={city name}&appid={API key}
  //UV: "https://api.openweathermap.org/data/2.5/uvi?lat={lat}&lon={lon}&appid={API key}

  var apiUrlDaily = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial" + "&appid=" + apiKey;
  //var apiUrlUV = "http://api.openweathermap.org/data/2.5/uvi?lat={lat}&lon={lon}&appid=" + apiKey;


  

  // make a request to the URL
  fetch(apiUrlDaily)
    // .then(function(response) {
    //  if (response.ok) {
    //    response.json()
    .then(response => response.json())
    .then(function (data) {
      console.log(data.weather, "weather");

      var latCoord = data.coord.lat;
      var lonCoord = data.coord.lon;
       console.log("latCoord", latCoord);
       console.log("lonCoord", lonCoord);

      var apiUrlUV = "http://api.openweathermap.org/data/2.5/uvi?lat=" + latCoord + "&lon=" + lonCoord + "&appid=" + apiKey;
      console.log("apiurluv", apiUrlUV);

      fetch(apiUrlUV)
        .then(response => response.json())
        .then(function(data) {
        console.log(data.weather, "weather")  
      })
      //displayDailyWeather(data, city);
      //console.log(data);

      // display current day 
      var today = moment().format("M/D/YYYY");
      var $subtitleDate = $("#currentDay");

      $(".current-card").removeClass("d-none"); // shows card
      //$(".city").html("<h1>" + data.name + " (" + today + ")" + icon + "</h1>");
      $(".city").html("<h1>" + data.name + " (" + today + ")" + "</h1>");
      $(".icon").attr("src", "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png");

      $(".temp").text("Temperature: " + Math.floor(data.main.temp) + "° F");
      $(".humidity").text("Humidity: " + data.main.humidity + "%");
      $(".wind").text("Wind Speed: " + data.wind.speed + " MPH");
      if (apiUrlUV <= 2) {
        $(".badge-success").text("UV Index: " + apiUrlUV);
      } else {
        if (apiUrlUV > 2 && apiUrlUV <= 7) {
          $(".badge-warning").text("UV Index: " + apiUrlUV);
        } else {
          if (apiUrlUV > 7) {
            $(".badge-danger").text("UV Index: " + apiUrlUV);
          }
        }
      }

    })

    .catch(function (error) {
      // if you try to search for a city that doesn't exist
      alert("Error: " + response.statusText);
    })
};


var searchSubmitHandler = function (event) {
  event.preventDefault();

  // get value from input element
  var city = cityInputEl.value.trim();

  if (city) {
    collectWeatherInfo(city);
  } else {
    alert("Please enter a city you would like to know the weather for.");
  }

  console.log(event);
};

var displayDailyWeather = function (cities) {
  // loop over cities
  for (var i = 0; i < cities.length; i++) {
    // create a row for each city
    var cityEl = document.createElement("a");
    cityEl.classList = "list-item flex-row justify-space-between align-left";

    // append to the list
    cityContainerEl.appendChild(cityEl);
  }
};


inputSearchEl.addEventListener("submit", searchSubmitHandler); //--commenting because of onclick

