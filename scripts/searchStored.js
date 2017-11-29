const movieFactory = require("./movieFactory")

const searchStoredMovies = Object.create(null, {
    "init": {
        value: function () {

        // Pull movies from storage, filter contents (non case sensitive), save to a new localStorage item - reasign the localStorageItem variable so that the writemovie() function will use the filtered data to construct the movie list -- Switched to keyup to do "live searching"
        document.getElementById("search_input-stored").addEventListener("keyup", event => {

            let searchQuery = document.getElementById("search_input-stored").value.toLowerCase()
            let resultEl = ""

            if (searchQuery.length >= 3) {
                let filteredMovies = movieFactory.cache.filter(movies => {
                    return movies.movie.title.toLowerCase().includes(searchQuery);
                })

                //if there are 3 characters in the search array, populate the dom with the filtered movie array
                filteredMovies.forEach(
                    movie => {
                        resultEl += `
                        <div class="card-block" style="width: 20rem;">
                            <img class="card-img-top" src=""https://image.tmdb.org/t/p/w185//${movie.movie.poster_path}"" alt="Card image cap">
                            <div class="card-block_inner">
                                <h4 class="card-title">${movie.movie.title}</h4>
                                <p class="card-text">Release Date${movie.movie.release_date}</p>
                                <p class="card-text">Cast: ${movie.movie.credits.cast[0].name}, ${movie.movie.credits.cast[2].name}, ${movie.movie.credits.cast[3].name}</p>
                                </div>
                        </div>`

                        })

                $('#search_db-results').html(resultEl)

                //if there are no results
                if (filteredMovies.length === 0) {
                    document.getElementById("search_db-results").innerHTML = "<div id='noResults'>No Results</div>";
                }

            //if there are less than 3 characters in the input text box, then display the storedmovieArticles
            //THIS NEEDS TO REDISPLAY THE WHOLE CACHE WHEN LESS THAN 3 CHARS IN SEARCH BOX
            }

        })

        }
    }
})

module.exports = searchStoredMovies