//Author: Paul Ellis (with plenty of contributions from Max Wolf); Purpose: populate cards with movie info
const starLoad = require('./starLoad')

const cardsHTML = (movie) => {
    let resultEl = "";//variable to store DOM string created below
    if (movie.movie.poster_path === null) {//if the movie return from the ajax call doesn't have poster image, make this string
        resultEl += `
    <div class="card-block" style="width: 20rem;">
        <button id="${movie.firebaseId}" class="deleteMovie">X</button>
        <img class="card-img-top" src="http://www.51allout.co.uk/wp-content/uploads/2012/02/Image-not-found-300x300.gif" alt="Card image cap">
        <div class="card-block_inner">
            <h4 class="card-title">${movie.movie.title}</h4>
            <p class="card-text">Release Date: ${movie.movie.release_date}</p>
            <p class="card-text">Cast: ${movie.movie.credits.cast[0].name}, ${movie.movie.credits.cast[2].name}, ${movie.movie.credits.cast[3].name}</p>
            <button class="watched">Watched It</button>
            <div class='rating-stars text-center'>
            <ul id='stars'>
              <li class='star ${starLoad(movie.rating, 1)}' title='Poor' data-value='1'>
                <i class='fa fa-star fa-fw' value=${movie.firebaseId} title="1"></i>
              </li>
              <li class='star ${starLoad(movie.rating, 2)}' title='Fair' data-value='2'>
                <i class='fa fa-star fa-fw' value=${movie.firebaseId} title="2"></i>
              </li>
              <li class='star ${starLoad(movie.rating, 3)}' title='Good' data-value='3'>
                <i class='fa fa-star fa-fw' value=${movie.firebaseId} title="3"></i>
              </li>
              <li class='star ${starLoad(movie.rating, 4)}' title='Excellent' data-value='4'>
                <i class='fa fa-star fa-fw' value=${movie.firebaseId} title="4"></i>
              </li>
              <li class='star ${starLoad(movie.rating, 5)}' title='WOW!!!' data-value='5'>
                <i class='fa fa-star fa-fw' value=${movie.firebaseId} title="5"></i>
              </li>
            </ul>
          </div>
        </div>
    </div>
    `

    } else {//if the movie returned does have a poster image, make this string
        resultEl += `
    <div class="card-block" style="width: 20rem;">
        <button id="${movie.firebaseId}" class="deleteMovie">X</button>
        <img class="card-img-top" src="https://image.tmdb.org/t/p/w185//${movie.movie.poster_path}" alt="Card image cap">
        <div class="card-block_inner">
            <h4 class="card-title">${movie.movie.title}</h4>
            <p class="card-text">Release Date: ${movie.movie.release_date}</p>
            <p class="card-text">Cast: ${movie.movie.credits.cast[0].name}, ${movie.movie.credits.cast[2].name}, ${movie.movie.credits.cast[3].name}</p>
            <button class="watched">Watched It</button>
            <div class='rating-stars text-center'>
            <ul id='stars'>
              <li class='star ${starLoad(movie.rating, 1)}' title='Poor' data-value='1'>
                <i class='fa fa-star fa-fw' value=${movie.firebaseId} title="1"></i>
              </li>
              <li class='star ${starLoad(movie.rating, 2)}' title='Fair' data-value='2'>
                <i class='fa fa-star fa-fw' value=${movie.firebaseId} title="2"></i>
              </li>
              <li class='star ${starLoad(movie.rating, 3)}' title='Good' data-value='3'>
                <i class='fa fa-star fa-fw' value=${movie.firebaseId} title="3"></i>
              </li>
              <li class='star ${starLoad(movie.rating, 4)}' title='Excellent' data-value='4'>
                <i class='fa fa-star fa-fw' value=${movie.firebaseId} title="4"></i>
              </li>
              <li class='star ${starLoad(movie.rating, 5)}' title='WOW!!!' data-value='5'>
                <i class='fa fa-star fa-fw' value=${movie.firebaseId} title="5"></i>
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