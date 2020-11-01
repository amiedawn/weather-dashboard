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
    .then(response => response.json())
    .then(function (data) {
      console.log(data.weather, "weather");

      var latCoord = data.coord.lat;
      var lonCoord = data.coord.lon;
      console.log("latCoord", latCoord);
      console.log("lonCoord", lonCoord);

      //var apiUrlUV = "http://api.openweathermap.org/data/2.5/uvi?lat={lat}&lon={lon}&appid=" + apiKey;
      var apiUrlUV = "https://api.openweathermap.org/data/2.5/uvi?lat=" + latCoord + "&lon=" + lonCoord + "&appid=" + apiKey;
     
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
      $(".five-day-cards").addClass("d-none");
      $(".badge").display = "none"; // hide badges on page load
      
      // format header of current day
      $(".city").html("<h1>" + data.name + " (" + today + ")" + "</h1>");
      $(".icon").attr("src", "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png");
      
      // format rest of current day
      $(".temp").text("Temperature: " + Math.floor(data.main.temp) + "° F");
      $(".humidity").text("Humidity: " + data.main.humidity + "%");
      $(".wind").text("Wind Speed: " + data.wind.speed + " MPH");
      console.log("UV Index", data.value)
      
      // api.openweathermap.org / data / 2.5 / forecast ? q = { city name } & appid={ API key }
      var api5Day = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial" + "&appid=" + apiKey;
        
      // fetch for 5 day forecast
      fetch(api5Day)
        .then(response => response.json())
        .then(function (data) {
          console.log(data);
                  
          // set variables for reading dates in 5 day forecast
          var forecastDay1 = data.list[6].dt_txt;
          console.log("forecastDay1", forecastDay1, typeof forecastDay1);
          var responseDay1 = moment(forecastDay1).format("M/D/YYYY")
          console.log("responseDay1", responseDay1, typeof responseDay1);

          var forecastDay2 = data.list[14].dt_txt;
          console.log("forecastDay2", forecastDay2, typeof forecastDay2);
          var responseDay2 = moment(forecastDay2).format("M/D/YYYY")
          console.log("responseDay2", responseDay2, typeof responseDay2);
          
          var forecastDay3 = data.list[22].dt_txt;
          console.log("forecastDay3", forecastDay3, typeof forecastDay3);
          var responseDay3 = moment(forecastDay3).format("M/D/YYYY")
          console.log("responseDay3", responseDay3, typeof responseDay3);

          var forecastDay4 = data.list[30].dt_txt;
          console.log("forecastDay4", forecastDay4, typeof forecastDay4);
          var responseDay4 = moment(forecastDay4).format("M/D/YYYY")
          console.log("responseDay4", responseDay4, typeof responseDay4);

          var forecastDay5 = data.list[38].dt_txt;
          console.log("forecastDay5", forecastDay5, typeof forecastDay5);
          var responseDay5 = moment(forecastDay5).format("M/D/YYYY")
          console.log("responseDay5", responseDay5, typeof responseDay5);
          
          
          $(".five-day-cards").removeClass("d-none"); // shows card after being hidden on page load
          // display header date of 5 day forcast cards
          $("#date1").text(responseDay1);
          $("#date2").text(responseDay2);
          $("#date3").text(responseDay3);
          $("#date4").text(responseDay4);
          $("#date5").text(responseDay5);

          // display and format icons for each day
          $("#icon1").attr("src", "http://openweathermap.org/img/w/" + data.list[6].weather[0].icon + ".png");
          $("#icon2").attr("src", "http://openweathermap.org/img/w/" + data.list[14].weather[0].icon + ".png");
          $("#icon3").attr("src", "http://openweathermap.org/img/w/" + data.list[22].weather[0].icon + ".png");
          $("#icon4").attr("src", "http://openweathermap.org/img/w/" + data.list[30].weather[0].icon + ".png");
          $("#icon5").attr("src", "http://openweathermap.org/img/w/" + data.list[38].weather[0].icon + ".png");
          
          // display and format temperature for each day
          $("#temp1").text("Temperature: " + Math.floor(data.list[6].main.temp) + "° F");
          $("#temp2").text("Temperature: " + Math.floor(data.list[14].main.temp) + "° F");
          $("#temp3").text("Temperature: " + Math.floor(data.list[22].main.temp) + "° F");
          $("#temp4").text("Temperature: " + Math.floor(data.list[30].main.temp) + "° F");
          $("#temp5").text("Temperature: " + Math.floor(data.list[38].main.temp) + "° F");

          // display and format humidity for each day
          $("#hum1").text("Humidity: " + data.list[6].main.humidity + "%");
          $("#hum2").text("Humidity: " + data.list[14].main.humidity + "%");
          $("#hum3").text("Humidity: " + data.list[22].main.humidity + "%");
          $("#hum4").text("Humidity: " + data.list[30].main.humidity + "%");
          $("#hum5").text("Humidity: " + data.list[38].main.humidity + "%");
        })

      // .catch(function (error) {
      //   // if you try to search for a city that doesn't exist
      //   alert("Error: " + response.statusText);
      // })
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

