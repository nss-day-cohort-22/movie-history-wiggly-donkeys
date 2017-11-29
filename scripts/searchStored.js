//Author: Max Wolf

const movieFactory = require("./movieFactory")
const firebase = require("firebase")

const searchStoredMovies = Object.create(null, {
    "init": {
        value: function () {

        // Pull movies from storage, filter contents (non case sensitive), save to a new localStorage item - reasign the localStorageItem variable so that the writemovie() function will use the filtered data to construct the movie list -- Switched to keyup to do "live searching"
        document.getElementById("search_input-stored").addEventListener("keyup", event => {

            let searchQuery = document.getElementById("search_input-stored").value.toLowerCase()
            let resultEl = ""

            //if there are 3 characters in the search array, populate the dom with the filtered movie array
            if (searchQuery.length >= 3) {
                //define filteredMovies as the movies that include the searchQuery in the title
                let filteredMovies = movieFactory.cache.filter(movies => {
                    return movies.movie.title.toLowerCase().includes(searchQuery);
                })

                //filter only movies stored for the current user
                filteredMovies.filter(movieObj =>
                    firebase.auth().currentUser.uid === movieObj.uid && movieObj.watched === false)
                    //loop through each movie and write the title, poster, releasedate, cast, etc. to resultEl
                    .forEach(
                        movie => {
                            resultEl += `
                            <div class="card-block" style="width: 20rem;">
                                <img class="card-img-top" src="https://image.tmdb.org/t/p/w185//${movie.movie.poster_path}" alt="Card image cap">
                                <div class="card-block_inner">
                                    <h4 class="card-title">${movie.movie.title}</h4>
                                    <p class="card-text">Release Date${movie.movie.release_date}</p>
                                    <p class="card-text">Cast: ${movie.movie.credits.cast[0].name}, ${movie.movie.credits.cast[2].name}, ${movie.movie.credits.cast[3].name}</p>
                                    </div>
                            </div>`
                        })
                //write the resultEl to the DOM
                $('#search_db-results').html(resultEl)

                //if there are no search results then write 'No Results' to the DOM
                if (filteredMovies.length === 0) {
                    document.getElementById("search_db-results").innerHTML = "<div id='noResults'>Sorry, there are no movies that match your search</div>";
                }

            //if there are less than 3 characters in the input text box, then display the cache of storedmovies
            } else if (searchQuery.length < 3) {
                movieFactory.cache.filter(
                    movieObj => firebase.auth().currentUser.uid === movieObj.uid && movieObj.watched === false).forEach(
                        movie => {
                                if (movie.movie.poster_path === null) {
                                resultEl += `
                                <div class="card-block" style="width: 20rem;">
                                    <img class="card-img-top" src="http://www.51allout.co.uk/wp-content/uploads/2012/02/Image-not-found-300x300.gif" alt="Card image cap">
                                    <div class="card-block_inner">
                                        <h4 class="card-title">${movie.movie.title}</h4>
                                        <p class="card-text">Release Date${movie.movie.release_date}</p>
                                        <p class="card-text">Cast: ${movie.movie.credits.cast[0].name}, ${movie.movie.credits.cast[2].name}, ${movie.movie.credits.cast[3].name}</p>
                                        </div>
                                </div>
                                `
                            } else {
                                resultEl += `
                                <div class="card-block" style="width: 20rem;">
                                    <img class="card-img-top" src="https://image.tmdb.org/t/p/w185//${movie.movie.poster_path}" alt="Card image cap">
                                    <div class="card-block_inner">
                                        <h4 class="card-title">${movie.movie.title}</h4>
                                        <p class="card-text">Release Date${movie.movie.release_date}</p>
                                        <p class="card-text">Cast: ${movie.movie.credits.cast[0].name}, ${movie.movie.credits.cast[2].name}, ${movie.movie.credits.cast[3].name}</p>
                                    </div>
                                </div>
                                `
                            }
                        })

                $('#search_db-results').html(resultEl)
            }

        })

        }
    }
})

module.exports = searchStoredMovies