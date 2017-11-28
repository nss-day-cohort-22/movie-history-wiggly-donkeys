const firebase = require("firebase")
const observe = require("auth/observer")
const $ = require("jquery")
const notify = require("humane-js")

var config = {
    apiKey: "AIzaSyADtDFsNEKSAHJqo90jkhKuocvBuEtBG5Q",
    authDomain: "freshtomatoes-aedbb.firebaseapp.com",
    databaseURL: "https://freshtomatoes-aedbb.firebaseio.com",
    projectId: "freshtomatoes-aedbb",
    storageBucket: "freshtomatoes-aedbb.appspot.com",
    messagingSenderId: "879756087889"
  };

const auth = Object.create(null, {
    "activeUser": {
        value: null,
        writable: true
    },
    "init": {
        value: function () {
            firebase.initializeApp(config)

            $(".login__submit").on("click", e => {
                // Validate login information
                this.validate(
                    $(".login__email").val(),
                    $(".login__password").val()
                )

                // Clear the form
                $(".login__email").val("")
                $(".login__password").val("")
            })

            // Set up authentication observer
            observe.init(this)
        }
    },
    "validate": {
        value: function (email, password) {
            firebase
                .auth()
                .signInWithEmailAndPassword(email, password)
                .catch(function (error) {
                    const errorCode = error.code
                    const errorMessage = error.message

                    notify.log("Email or password is invalid")
                })
        }
    },
    "logout": {
        value: function () {
            firebase.auth().signOut().then(function() {
                // Sign-out successful.
            }).catch(function(error) {
                // An error happened.
            });
        }
    }
})

module.exports = auth