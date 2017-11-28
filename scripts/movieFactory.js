// Author(s): Max
// Purpose: This module adds CRUD to our project
// ┌(° ͜ʖ͡°)┘  

//import
const firebaseURL = "https://freshtomatoes-aedbb.firebaseio.com/"

// Object factory
const movieFactory = Object.create(null, {
    "cache": {
        value: null,
        writable: true
    },
    "all": {
        value: function () {
            return $.ajax({
                "url": `${firebaseURL}/.json`,
                "method": "GET"
            }).then(movies => {
                this.cache = Object.keys(movies).map(key => {
                    movies[key].id = key
                    return movies[key]
                })

                return this.cache
            })
        }
    },
    "add": {
        value: function (movie) {
            return $.ajax({
                "url": `${firebaseURL}/.json`,
                "method": "POST",
                "data": JSON.stringify(movie)
            })
        }
    },
    "remove": {
        value: function (id) {
            return $.ajax({
                "url": `${firebaseURL}/${id}/.json`,
                "method": "DELETE"
            })
        }
    },
    "replace": {
        value: function (movie, id) {
            return $.ajax({
                "url": `${firebaseURL}/${id}/.json`,
                "method": "PUT",
                "data": JSON.stringify(movie)
            })
        }
    }
})

// exports
module.exports = movieFactory