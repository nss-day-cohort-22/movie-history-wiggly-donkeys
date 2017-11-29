// Author(s): Chase, Max, and Paul
// Purpose: This module handles the GET, POST, PUT, AND DELETE of movies with Firebase

// imports
//Author: Max Wolf

const auth = require("./auth/auth")
const firebaseURL = "https://freshtomatoes-aedbb.firebaseio.com"
const firebase = require("firebase")

// Obj.cr function that acts as our factory
const movieFactory = Object.create(null, {
//CACHED ARRAY OF MOVIES IN FIREBASE... use when not needing another AJAX call
    "cache": {
        value: null,
        writable: true
    },
//GET ALL MOVIES FROM DATABASE -> RETURN THE CACHED ARRAY WITH FIREBASEID AS A VALUE IN THE MOVIE OBJECT
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
//ADD MOVIE TO FIREBASE with userId, watched status, and rating
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
//DELETE MOVIE FROM FIREBASE
    "remove": {
        value: function (id) {
            return firebase.auth().currentUser.getToken(true)
                .then(idToken => {
                    return $.ajax({
                        "url": `${firebaseURL}/movies/${id}/.json`,
                        "method": "DELETE"
                    })
                })
        }
    },
//FOR REPLACING 'WATCHED' OR 'RATING' VALUES OF MOVIE IN FIREBASE
    //*** target = the object value/location you will be replacing (i.e. watched || rating)
    //*** id =  the firebaseId of the object (this is contained in the cached array as firebaseId)
    //*** dataToReplace = the new value to replace the old one (i.e. watched -> true || rating -> 5)
    "replace": {
        value: function (dataToReplace, id, target) {
            return firebase.auth().currentUser.getToken(true)
                .then(idToken => {
                    return $.ajax({
                        "url": `${firebaseURL}/movies/${id}/${target}/.json`,
                        "method": "PUT",
                        "data": JSON.stringify(dataToReplace)
                    })
                })
        }
    }
})

// exports
module.exports = movieFactory