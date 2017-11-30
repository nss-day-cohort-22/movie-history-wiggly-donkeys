// Author(s): Chase, John, Max, and Paul
// Purpose: This module haandles user login/reg/logout
// ┌(° ͜ʖ͡°)┘

// imports
const movieController = require("../movieController.js")
const firebase = require("firebase")
const observe = require("./observe")


// config object given by the movie db
var config = {
    apiKey: "AIzaSyADtDFsNEKSAHJqo90jkhKuocvBuEtBG5Q",
    authDomain: "freshtomatoes-aedbb.firebaseapp.com",
    databaseURL: "https://freshtomatoes-aedbb.firebaseio.com",
    projectId: "freshtomatoes-aedbb",
    storageBucket: "freshtomatoes-aedbb.appspot.com",
    messagingSenderId: "879756087889",

};

// object factory for authentication
const auth = Object.create(null, {
    // active user for configuring if online
    "activeUser": {
        value: null,
        writable: true
    },
    //initialized function
    "init": {
        value: function () {
            // init firebase
            firebase.initializeApp(config)

            //login callback
            const loginCallBack = e => {
                // Validate login information
                this.validate(
                    $("#regForm_email").val(),
                    $("#regForm_password").val()
                )
                // Clear the form
                $("#regForm_email").val("")
                $("#regForm_password").val("")
            }

            // login event listeners
            $("#regForm_email").keypress(function () {
                if (event.which === 13) loginCallBack();
            });
            $("#regForm_password").keypress(function () {
                if (event.which === 13) loginCallBack();
            });
            $('#regForm_login').click(loginCallBack);
            // Event listener to register user
            $("#regForm_saveButt").on("click", e => {
                // save registered information
                this.create(
                    $("#regForm_email").val(),
                    $("#regForm_password").val()
                )
                // Clear the form
                $("#regForm_email").val("")
                $("#regForm_password").val("")
            })

            // Event listener to logout user
            $("#logout").on("click", e => {
                // change hidden classes back to modal shown when user logs out
                this.logout()
                $("#regForm").removeClass("hidden")
                $("#mainContent").addClass("hidden")
            })

            // Search Bar button
            const searchCallBack = e => {
                // Function executed on click
                movieController.search()
                //clear the search box
                $("#search_input").val("")
            }

            $("#search_input").keypress(function () {
                if (event.which === 13) searchCallBack();
            });
            $('#search_db').click(searchCallBack);

            //show un watched movies
            $("#unwatchedMovies").on("click", e => {
                movieController.getStoredMovies(false)


                //clear the search box
                $("#search_input").val("")
            })

            $("#showMovies").on("click", e => {
                movieController.getStoredMovies(true)


                //clear the search box
                $("#search_input").val("")
            })



            // Set up authentication observer
            observe.init(this)

        },

    },
    // FB validation function for email and password
    "validate": {
        value: function (email, password) {
            firebase
                .auth()
                .signInWithEmailAndPassword(email, password)
                .catch(function (error) {
                    const errorCode = error.code
                    const errorMessage = error.message
                    // tell user wrong info
                    alert("Email or password is invalid")
                })
        }
    },
    // Creator function for registration
    "create": {
        value: function (email, password) {
            firebase
                .auth()
                .createUserWithEmailAndPassword(email, password)
                .catch(function (error) {
                    // Handle Errors here.
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    // alert any errors to user
                    alert("Email or password is invalid")
                })
        }
    },
    // logout function
    "logout": {
        value: function () {
            firebase
                .auth()
                .signOut()
                .then(function () {
                    // Sign-out successful.
                })
                .catch(function (error) {
                    // An error happened.
                });
        }
    }
})

// exports
module.exports = auth