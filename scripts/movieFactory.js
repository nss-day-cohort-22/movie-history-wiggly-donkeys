const auth = require("./auth/auth")
const firebaseURL = "https://freshtomatoes-aedbb.firebaseio.com"
const firebase = require("firebase")

const movieFactory = Object.create(null, {
    "cache": {
        value: null,
        writable: true
    },
    "all": {
        value: function () {
            return firebase.auth().currentUser.getToken(true)
                .then(idToken => {
                    return $.ajax({
                        "url": `${firebaseURL}/movies/.json?auth=${idToken}`,
                        "method": "GET"
                    }).then(movies => {
                        this.cache = Object.keys(movies).map(key => {
                            movies[key].firebaseId = key
                            return movies[key]
                        })
                        return this.cache
                    })
                })
        }
    },
    "add": {
        value: function (movie) {
            return firebase.auth().currentUser.getToken(true)
                .then(idToken => {
                    return $.ajax({
                        "url": `${firebaseURL}/movies/.json?auth=${idToken}`,
                        "method": "POST",
                        "data": JSON.stringify({ "movie": movie, "uid": firebase.auth().currentUser.uid, "watched": false })
                    })
                }).catch(function (error) {
                    window.alert("Error while adding the movie. Please try again.")
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


module.exports = movieFactory