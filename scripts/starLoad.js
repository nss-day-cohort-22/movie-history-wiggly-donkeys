
function starLoad(rating, star) {

    let onStar = parseInt(rating); // The star currently selected

    if (onStar >= star) {
        return "selected"
    }

};

module.exports = starLoad