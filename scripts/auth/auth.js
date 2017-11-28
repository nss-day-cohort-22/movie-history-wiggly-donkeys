const firebase = require("firebase")
const observe = require("./observe")
const $ = require("jquery")

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
            // login registered user
            $("#regForm_login").on("click", e => {
                // Validate login information
                this.validate(
                    $("#regForm_email").val(),
                    $("#regForm_password").val()
                )
                // Clear the form
                $("#regForm_email").val("")
                $("#regForm_password").val("")
            })

            // register user
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
            // Set up authentication observer
            observe.init(this)
        },
        
    },
    "validate": {
        value: function (email, password) {
            firebase
                .auth()
                .signInWithEmailAndPassword(email, password)
                .catch(function (error) {
                    const errorCode = error.code
                    const errorMessage = error.message

                    alert("Email or password is invalid")
                })
        }

    },
    "create": {
        value: function (email, password) {
            firebase
                .auth()
                .createUserWithEmailAndPassword(email, password)
                .catch(function (error) {
                    // Handle Errors here.
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    // ...
                    alert("Email or password is invalid")
                })
        }
    },
    "logout": {
        value: function () {
            firebase.auth().signOut().then(function () {
                // Sign-out successful.
            }).catch(function (error) {
                // An error happened.
            });
        }
    }
})

module.exports = auth
