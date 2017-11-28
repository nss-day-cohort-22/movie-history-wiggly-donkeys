
// Author(s): Chase, John, Max, and Paul
// Purpose: This module controls the movie output functions, sends ajax requests to tmdb
// ┌(° ͜ʖ͡°)┘  

//imports
const firebase = require("firebase")

// Create object to contain a function. Will be updated
const searchController = Object.create(null, {
    //searchController.search - get data, put it on the page
    "search": {
        value: function () {
            // get the search_input value for to be plugged in to the URL for the request
            const searchVal = $("#search_input").val()
            // ajax request with searchVal plugged in
            return $.ajax({
                    "async": true,
                    "crossDomain": true,
                    "url": `https://api.themoviedb.org/3/search/movie?include_adult=false&page=1&query=${searchVal}&language=en-US&api_key=5e5026b9b18d41494cf1a8f0bc65cacc`,
                    "method": "GET",
                    "headers": {},
                    "data": "{}"
                })
                // after request returns with movie, spit it out into the DOM
                .then(function (response) {
                    //clear
                    resultEl = "";
                    // For Each movie returned, print the info into the DOM
                    response.results.forEach(result => {
                        // if statement for if the movie info returns without a picture, replace it with a no image found image
                        if (result.poster_path === null) {
                            resultEl += `
                            <div class="movieCard">
                            <img class="movieCard_img" src="http://www.51allout.co.uk/wp-content/uploads/2012/02/Image-not-found-300x300.gif" alt="Card image cap">
                            <div class="movieCard_text">
                              <h4 class="movieCard_title">${result.title}</h4>
                              <p class="movieCard_date">Release Date${result.release_date}</p>
                              <button class="button" id="${result.id}">Add to watchlist</button>
                            </div>
                          </div>
                            `
                        } else {
                            resultEl += `
                            <div class="movieCard">
                            <img class="movieCard_img" src="https://image.tmdb.org/t/p/w185//${result.poster_path}" alt="Card image cap">
                            <div class="movieCard_text">
                              <h4 class="movieCard_title">${result.title}</h4>
                              <p class="movieCard_date">Release Date${result.release_date}</p>
                              <button class="button" id="${result.id}">Add to watchlist</button>
                            </div>
                          </div>
                            `
                        }

                    })
                    // jq call the id, print html into that div
                    $("#search_db-results").html(resultEl)
                })
        }
    },
    "getCast": {
        value: function (movieId) {
            return $.ajax({
                "async": true,
                "crossDomain": true,
                "url": `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=5e5026b9b18d41494cf1a8f0bc65cacc`,
                "method": "GET",
                "headers": {},
                "data": "{}"
            }).then(
                
            )
        }
    }

})

// exports
module.exports = searchController