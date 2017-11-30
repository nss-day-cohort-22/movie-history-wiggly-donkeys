//Author: Paul Ellis; Purpose: populate cards with movie info

const cardsHTML = (movie) => {
    let resultEl = "";//variable to store DOM string created below
    if (movie.movie.poster_path === null) {//if the movie return from the ajax call doesn't have poster image, make this string
        resultEl += `
    <div class="card-block" style="width: 30rem;">
        <input type="image" src="../delete.png" id="${movie.firebaseId}" class="deleteMovie" width="25" height="25">
        <img class="card-img-top" src="http://www.51allout.co.uk/wp-content/uploads/2012/02/Image-not-found-300x300.gif" alt="Card image cap">
        <div class="card-block_inner">
            <h4 class="card-title">${movie.movie.title}</h4>
            <p class="card-text">Release Date: ${movie.movie.release_date}</p>
            <p class="card-text">Cast: ${movie.movie.credits.cast[0].name}, ${movie.movie.credits.cast[2].name}, ${movie.movie.credits.cast[3].name}</p>
            <button class="watched">Watched It</button>
            <div class='rating-stars text-center'>
            <ul id='stars'>
              <li class='star' title='Poor' data-value='1'>
                <i class='fa fa-star fa-fw'></i>
              </li>
              <li class='star' title='Fair' data-value='2'>
                <i class='fa fa-star fa-fw'></i>
              </li>
              <li class='star' title='Good' data-value='3'>
                <i class='fa fa-star fa-fw'></i>
              </li>
              <li class='star' title='Excellent' data-value='4'>
                <i class='fa fa-star fa-fw'></i>
              </li>
              <li class='star' title='WOW!!!' data-value='5'>
                <i class='fa fa-star fa-fw'></i>
              </li>
            </ul>
          </div>
        </div>
    </div>
    `
    } else {//if the movie returned does have a poster image, make this string
        resultEl += `
    <div class="card-block" style="width: 30rem;">
        <input type="image" src="../delete.png" id="${movie.firebaseId}" class="deleteMovie" width="25px" height="25px">
        <img class="card-img-top" src="https://image.tmdb.org/t/p/w185//${movie.movie.poster_path}" alt="Card image cap">
        <div class="card-block_inner">
            <h4 class="card-title">${movie.movie.title}</h4>
            <p class="card-text">Release Date: ${movie.movie.release_date}</p>
            <p class="card-text">Cast: ${movie.movie.credits.cast[0].name}, ${movie.movie.credits.cast[2].name}, ${movie.movie.credits.cast[3].name}</p>
            <button class="watched">Watched It</button>
            <div class='rating-stars text-center'>
            <ul id='stars'>
              <li class='star' title='Poor' data-value='1'>
                <i class='fa fa-star fa-fw'></i>
              </li>
              <li class='star' title='Fair' data-value='2'>
                <i class='fa fa-star fa-fw'></i>
              </li>
              <li class='star' title='Good' data-value='3'>
                <i class='fa fa-star fa-fw'></i>
              </li>
              <li class='star' title='Excellent' data-value='4'>
                <i class='fa fa-star fa-fw'></i>
              </li>
              <li class='star' title='WOW!!!' data-value='5'>
                <i class='fa fa-star fa-fw'></i>
              </li>
            </ul>
          </div>
        </div>
    </div>
    `
    }
    return resultEl//return the stored DOM string
}

module.exports = cardsHTML