// Author(s): Chase, Max, and Paul
// Purpose: This module handles the GET, POST, PUT, AND DELETE of movies with Firebase

// imports
const auth = require("./auth/auth")
const firebaseURL = "https://freshtomatoes-aedbb.firebaseio.com"
const firebase = require("firebase")

// Obj.cr function that acts as our factory
const movieFactory = Object.create(null, {
    // set a cache for writing to
    "cache": {
        value: null,
        writable: true
    },
    // this key is a function that returns All movies from Firebase, then places them into the cache.
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
    // this function adds movies when clicked into firebase
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
    // this function removes movies from firebase on click
    "remove": {
        value: function (id) {
            return $.ajax({
                "url": `${firebaseURL}/${id}/.json`,
                "method": "DELETE"
            })
        }
    },
    // function that will be used in our rating system and watched boolean
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