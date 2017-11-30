const movieFactory = require("./movieFactory")

const reviewStars = function() {

    /* 1. Visualizing things on Hover - See next part for action on click */
    $('#stars li').on('mouseover', function(){
      var onStar = parseInt($(this).data('value'), 10); // The star currently mouse on

      // Now highlight all the stars that's not after the current hovered star
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


    /* 2. Action to perform on click */
    $('#stars li').on('click', function(){
      let onStar = parseInt($(this).data('value'), 10); // The star currently selected
      let stars = $(this).parent().children('li.star');
      console.log(onStar)
      console.log(stars.length)
      console.log(stars)
      for (i = 0; i < stars.length; i++) {
        $(stars[i]).removeClass('selected');
      }

      for (i = 0; i < onStar; i++) {
        $(stars[i]).addClass('selected');
      }

    });

    $('#stars li').on('click', event => {

      movieFactory.replace(parseInt(event.target.getAttribute("title")), event.target.getAttribute("value"),"rating")
    })

  }


  module.exports = reviewStars