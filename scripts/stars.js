//Author: Max Wolf

//STAR RATING SELECTION FUNCTIONALITY
const movieFactory = require("./movieFactory")

const reviewStars = function() {

    // HOVER FUNCTIONALITY -- Changes the visuals on hover
    $('#stars li').on('mouseover', function(){
      var onStar = parseInt($(this).data('value'), 10); // The star currently mouse on

      //  highlight all the stars that's not after the current hovered star
      $(this).parent().children('li.star').each(function(e){
        if (e < onStar) {
          $(this).addClass('hover');
        }
        else {
          $(this).removeClass('hover');
        }
      });

    }).on('mouseout', function(){
      $(this).parent().children('li.star').each(function(e){
        $(this).removeClass('hover');
      });
    });


    // ON CLICK OF EACH STAR
    $('#stars li').on('click', function(){
      //the value of the star clicked
      let onStar = parseInt($(this).data('value'), 10); // The star currently selected
      //the array of all the 'li.star' elements classes
      let stars = $(this).parent().children('li.star');

      //remove the selected class for all 5 stars
      for (i = 0; i < stars.length; i++) {
        $(stars[i]).removeClass('selected');
      }
      //add selected class to all stars before and including the one clicked
      for (i = 0; i < onStar; i++) {
        $(stars[i]).addClass('selected');
      }

    });

    //When the star is clicked, take the value and store it in firebase as the value of the rating in firebase object
    $('#stars li').on('click', event => {

      movieFactory.replace(parseInt(event.target.getAttribute("title")), event.target.getAttribute("value"),"rating")
    })

  }


  module.exports = reviewStars