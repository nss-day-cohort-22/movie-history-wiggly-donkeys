//Author: Max Wolf

const movieFactory = require("./movieFactory")
const firebase = require("firebase")
const cardsHTML = require("./cardsHTML")

const searchStoredMovies = Object.create(null, {
    "init": {
        value: function () {
        //add search stored movies search bar to the DOM


        // Pull movies from storage, filter contents (non case sensitive), save to a new localStorage item - reasign the localStorageItem variable so that the writemovie() function will use the filtered data to construct the movie list -- Switched to keyup to do "live searching"
        document.getElementById("search_input-stored").addEventListener("keyup", event => {

            let searchQuery = document.getElementById("search_input-stored").value.toLowerCase()
            let resultEl = ""

            //if there are 3 characters in the search array, populate the dom with the filtered movie array
            if (searchQuery.length >= 3) {
                //define filteredMovies as the movies that include the searchQuery in the title
                let filteredMovies = movieFactory.cache.filter(
                        movies => {
                        return movies.movie.title.toLowerCase().includes(searchQuery);
                    })

                //if there are 3 characters in the search array, populate the dom with the filtered movie array
                filteredMovies.filter(
                    //only show movies for the current user
                    movieObj => firebase.auth().currentUser.uid === movieObj.uid).forEach(
                        movie => resultEl += cardsHTML(movie))

                $('#search_db-results').html(resultEl)

                //if there are no search results then write 'No Results' to the DOM
                if (filteredMovies.length === 0) {
                    document.getElementById("search_db-results").innerHTML = "<div id='noResults'>Sorry, there are no movies that match your search</div>";
                }

            //if there are less than 3 characters in the input text box, then display the cache of storedmovies
            } else if (searchQuery.length < 3) {
                movieFactory.cache.filter(
                    //only show movies for the current user
                    movieObj => firebase.auth().currentUser.uid === movieObj.uid).forEach(
                        movie => resultEl += cardsHTML(movie))

                $('#search_db-results').html(resultEl)
            }

        })

        }
    }
})

module.exports = searchStoredMovies