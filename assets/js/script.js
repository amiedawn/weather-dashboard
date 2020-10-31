console.log("hello world")

var inputSearchEl = document.querySelector("#input-search");
console.log(inputSearchEl);
var cityInputEl = document.querySelector("#city");
console.log(cityInputEl);
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
  // get value from input element
  var city = cityInputEl.value.trim();
  console.log(city);
  var apiUrlDaily = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial" + "&appid=" + apiKey;
  console.log(city);
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

      //var apiUrlUV = "http://api.openweathermap.org/data/2.5/uvi?lat={lat}&lon={lon}&appid=" + apiKey;
      var apiUrlUV = "https://api.openweathermap.org/data/2.5/uvi?lat=" + latCoord + "&lon=" + lonCoord + "&appid=" + apiKey;
      console.log("apiurluv", apiUrlUV);
      debugger;
      fetch(apiUrlUV)
        .then(response => response.json())
        .then(function (data) {
          console.log("UV Index", data.value)
          var uvIndex = data.value;
          if (uvIndex <= 2) {

            $(".badge-success").text("UV Index: " + uvIndex);
          } else {
            if (uvIndex > 2 && uvIndex <= 7) {

              $(".badge-warning").text("UV Index: " + uvIndex);
              $(".badge-warning").display = "block"; //show the right badge
              $(".badge-success").display = "none"; //show the right badge
              $(".badge-danger").display = "none"; //show the right badge

            } else {
              if (uvIndex > 7) {
                $(".badge-danger").text("UV Index: " + uvIndex);
              }
            }
          }


        })
      //displayDailyWeather(data, city);
      //console.log(data);

      // display current day 
      var today = moment().format("M/D/YYYY");


      $(".current-card").removeClass("d-none"); // shows card after being hidden on page load
      $(".badge").display = "none"; // hide badges on page load
      // format header of current day
      $(".city").html("<h1>" + data.name + " (" + today + ")" + "</h1>");
      $(".icon").attr("src", "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png");
      debugger;
      // format rest of current day
      $(".temp").text("Temperature: " + Math.floor(data.main.temp) + "° F");
      $(".humidity").text("Humidity: " + data.main.humidity + "%");
      $(".wind").text("Wind Speed: " + data.wind.speed + " MPH");
      console.log("UV Index", data.value)
      debugger;

      // api.openweathermap.org / data / 2.5 / forecast ? q = { city name } & appid={ API key }
      var api5Day = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + apiKey;
        console.log(city);
      fetch(api5Day)
        .then(response => response.json())
        .then(function (data) {
          console.log(data);
          console.log("api5Day", api5Day);
          //  var uvIndex = data.value;


        })

      .catch(function (error) {
        // if you try to search for a city that doesn't exist
        alert("Error: " + response.statusText);
      })
    });

  };
  var searchSubmitHandler = function (event) {
    event.preventDefault();



    if (city) {
      collectWeatherInfo(city);
      debugger;
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

