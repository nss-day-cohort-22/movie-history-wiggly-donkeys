//Author: Max Wolf

//Function that takes the stored rating and compares it to the position of the Li element, then adds the 'selected' class to
//the element if the rating is greater than or equal to the position of the element. It is called in the cardsHTML.js loops
function starLoad(rating, star) {

    let onStar = parseInt(rating);

    if (onStar >= star) {
        return "selected"
    }

};

module.exports = starLoad