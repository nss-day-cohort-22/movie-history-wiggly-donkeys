
// Author(s): Chase, John, Max, and Paul
// Purpose: This module controls the movie output functions, sends ajax requests to tmdb
// ┌(° ͜ʖ͡°)┘

//imports
const firebase = require("firebase")
const movieFactory = require("./movieFactory")
const searchStoredMovies = require("./searchStored")
const reviewStars = require("./stars")
const cardsHTML = require("./cardsHTML")

// Create object to contain a function. Will be updated
const movieController = Object.create(null, {
    //movieController.search - get data, put it on the page
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
                            <div class="card-block" style="width: 30rem;">
                                <img class="card-img-top" src="http://www.51allout.co.uk/wp-content/uploads/2012/02/Image-not-found-300x300.gif" alt="Card image cap">
                                <div class="card-block_inner">
                                    <h4 class="card-title">${result.title}</h4>
                                    <p class="card-text">Release Date ${result.release_date}</p>
                                    <button class="button addToWatchlist" id="${result.id}">Add to watchlist</button>
                                </div>
                            </div>
                            `
                        } else {
                            resultEl += `
                            <div class="card-block" style="width: 30rem;">
                                <img class="card-img-top" src="https://image.tmdb.org/t/p/w185//${result.poster_path}" alt="Card image cap">
                                <div class="card-block_inner">
                                    <h4 class="card-title">${result.title}</h4>
                                    <p class="card-text">Release Date ${result.release_date}</p>
                                    <button class="button addToWatchlist" id="${result.id}">Add to watchlist</button>
                                </div>
                            </div>
                            `
                        }

                    })
                    // jq call the id, print html into that div
                    $("#search_db-results").html(resultEl)



                    //add the second search bar to the dom...

                    //add listener to add to watch list button
                    $(".addToWatchlist").on("click", e => {
                        movieController.storeMovie(e.target.id)
                        $(e.target).text("Added");
                    })
                })
        }
    },
    "storeMovie": {
        value: function (movieId) {
            return $.ajax({
                "async": true,
                "crossDomain": true,
                "url": `https://api.themoviedb.org/3/movie/${movieId}?api_key=5e5026b9b18d41494cf1a8f0bc65cacc&language=en-US&append_to_response=credits`,
                "method": "GET",
                "headers": {},
                "data": "{}"
            }).then(
                function (response) {
                    movieFactory.add(response)
                }
                )
        }
    },
    "getStoredMovies": {
        value: function (tf) {
            movieFactory.all()
                .then(function (response) {
                    let resultEl = ""
                    response.filter(
                        movieObj =>  firebase.auth().currentUser.uid === movieObj.uid && movieObj.watched === tf).forEach(
                        
                        movie => resultEl += cardsHTML(movie)
                        )
                    $('#search_db-results').html(resultEl)
                    //add star functionality
                    reviewStars()
                    $(".deleteMovie").on("click", movieFactory.remove)
                    $(".watched").on("click", (event) => {
                        $(event.target.parentElement.parentElement).remove();
                        movieFactory.replace(true, event.target.id, "watched")
                    })

                })

            searchStoredMovies.init()

        }
    }
})



// exports
module.exports = movieController