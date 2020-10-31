

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

  var collectWeatherInfo = function(city) {
  // format api.openweathermap.org/data/2.5/forecast?q={city name}&appid={API key}
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial" + "&appid=" + apiKey;

  // make a request to the URL

  fetch(apiUrl) 
    .then(function(response) {
      if (response.ok) {
        response.json()
        
        .then(function(data) {
          //displayDailyWeather(data, city);
          //console.log(data);

          // display current day 
          var today = moment().format("M/D/YYYY");
          var $subtitleDate = $("#currentDay");

          //$subtitleDate.text(today);
        console.log(data.weather, "weather");
          
           //$(".city").html("<h1>" + data.name + " (" + today + ")" + icon + "</h1>");
          $(".city").html("<h1>" + data.name + " (" + today + ")" + "</h1>");
          $(".icon").attr("src", "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png");   
         
          $(".temp").text("Temperature: " + data.main.temp + "° F");
          $(".humidity").text("Humidity: " + data.main.humidity + "%");
          $(".wind").text("Wind Speed: " + data.wind.speed + " MPH");
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
    var city = cityInputEl.value.trim();

    if (city) {
      collectWeatherInfo(city);
      //cityInputEl.value = "";
    } else {

      alert("Please enter a city you would like to know the weather for.");
    }

    console.log(event);
  };

  var displayDailyWeather = function(cities) {
    //check if the api returned any repos
    if (cities.length === 0) {
      cityContainerEl.textContent = "No information available for this city.";
      return;
    }

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

