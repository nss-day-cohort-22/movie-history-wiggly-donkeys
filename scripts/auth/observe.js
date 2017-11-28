// Author(s): Chase, John, Max, and Paul
// Purpose: Watches if a user is logged in or out. Executes code if/else logged in.
// ┌(° ͜ʖ͡°)┘  

const firebase = require("firebase")

const observer = Object.create(null, {
    "init": {
        value: function (auth) {
            firebase.auth().onAuthStateChanged(function(user) {
                if (user) {
                    // const loadDash = require("../loadDash")
                    auth.activeUser = user
                    // hide modal
                    $("#regForm").addClass("hidden")
                    $("#mainContent").removeClass("hidden")
                } else {
                    // nav.init(false)
                    auth.activeUser = null
                }
            })
        }
    }
})

module.exports = observer