//stops page from refreshing/default actions
$(document).ready(function () {

    //function to pull information from OpenWeather
    var APIkey = "123cd898296d81120e650b52544c8c93";
    var date = (moment().format('MMMM Do YYYY'));


    function searchCity(city) {
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIkey;

        //ajax call to API
        $.ajax({
            url: queryURL,
            method: 'GET'
        }).then(function (response) {

            //Displaying searched city name
            $(".cityName").html("<h2>" + response.name + " (" + date + ") " + "<h2>");
            console.log(response.name);

            //Display Weather Icon
            //????????????????????//

            //Display current status
            var weatherStatus = response.weather[0].main;
            $(".status").text("Current Status: " + weatherStatus);

            //Converting kelvin temperature to fahrenheit
            var fahrenheit = (response.main.temp - 273.15) * 1.80 + 32;

            //Displaying fahrenheit temperature
            $(".fahrenheit").text("Current Temperature (F): " + fahrenheit.toFixed(2));
            console.log("Current Temperature (F): " + fahrenheit);

            //Display Humidity
            $(".humidity").text("Humidity: " + response.main.humidity + "%");
            console.log(response.main.humidity + "%");

            //Display WindSpeed
            $(".windSpeed").text("Wind Speed: " + response.wind.speed + "mph");
            console.log(response.wind.speed + "mph");

            //create div for uv index last:
            var uvIndexDiv = $("<div>").attr("id", "uvIndexDiv");
            uvIndexDiv.text("UV Index: ");
            $("#mainInfo").append(uvIndexDiv);

            //Locating coordinates matching searched city in first URL in order to find UV index from second ajax query:
            cityLatitude = response.coord.lat;
            cityLongitude = response.coord.lon;


            //Calling to run function that finds matching lat/lon in second url, for uv index:
            findCityCoordinates(cityLatitude, cityLongitude).then(function (response) {
                var uvIndexP = $("<p>");
                uvIndexP.text(response.current.uvi);
                uvIndexP.attr("id", "uvIndexID")
                console.log(uvIndexP);
                // $("#uvIndexID").text(uvIndexP);
                $("#uvIndexDiv").append(uvIndexP);
                // .attr("class", "uvIndex") 
                // if (uvIndex <= 2.9){
                //     uvIndex.addClass("mild");
                // }
                // else if (uvIndex >= 3.9 && uvIndex <= 4.9) {
                //     uvIndex.addClass("moderate");
                // }
                // else if (uvIndex >= 5.0) {
                //     uvIndex.addClass("severe");
                // }

                // console.log(uvIndex);
                // $(".uvIndex").text(uvIndex);

            })
        })

        //Function that finds matching lat/lon from searched city and makes use of finding UV index from this second call:
        function findCityCoordinates(lat, lon) {
            var latLonQueryURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&appid=" + APIkey;
            return $.ajax({
                url: latLonQueryURL,
                method: "GET"
            })
        }
    }


    //button clicking function
    $('#select-city').on('click', function (event) {
        //preventing the information from disappearing after button is clicked
        event.preventDefault()
        var inputCity = $('#city-input').val().trim();

        // //Set attribute for linking to storage? 
        // inputCity.attr("a", "href")

        $("#cityList").append('<li>' + inputCity);

        //replace function parameter with new variable
        searchCity(inputCity);

    })
})

            // $('#mainInfo').empty();
            // $('#mainInfo').append(cityName);
            // $('#cityNameID').append(currentTemp);
            // // console.log(cityName, currentTemp);
