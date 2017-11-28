const firebase = require("firebase")

const observer = Object.create(null, {
    "init": {
        value: function (auth) {
            firebase.auth().onAuthStateChanged(function(user) {
                if (user) {
                    auth.activeUser = user
                    // hide modal
                    $("#regForm").addClass("hidden")
                    console.log(user.uid, "user")
                } else {
                    // nav.init(false)
                    auth.activeUser = null
                }
            })
        }
    }
})

module.exports = observer