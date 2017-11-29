//Author: Paul Ellis; Purpose: populate cards with movie info

const cardsHTML = (movie) => {
    let resultEl = "";//variable to store DOM string created below
    if (movie.movie.poster_path === null) {//if the movie return from the ajax call doesn't have poster image, make this string
        resultEl += `
    <div class="card-block" style="width: 20rem;">
        <button class="deleteMovie">X</button>                                                                                                                            
        <img class="card-img-top" src="http://www.51allout.co.uk/wp-content/uploads/2012/02/Image-not-found-300x300.gif" alt="Card image cap">
        <div class="card-block_inner">
            <h4 class="card-title">${movie.movie.title}</h4>
            <p class="card-text">Release Date${movie.movie.release_date}</p>
            <p class="card-text">Cast: ${movie.movie.credits.cast[0].name}, ${movie.movie.credits.cast[2].name}, ${movie.movie.credits.cast[3].name}</p>
            <button class="watched">Watched It</button>
            </div>
    </div>
    `
    } else {//if the movie returned does have a poster image, make this string
        resultEl += `
    <div class="card-block" style="width: 20rem;">
        <button class="deleteMovie">X</button>                                                                                                                            
        <img class="card-img-top" src="https://image.tmdb.org/t/p/w185//${movie.movie.poster_path}" alt="Card image cap">
        <div class="card-block_inner">
            <h4 class="card-title">${movie.movie.title}</h4>
            <p class="card-text">Release Date${movie.movie.release_date}</p>
            <p class="card-text">Cast: ${movie.movie.credits.cast[0].name}, ${movie.movie.credits.cast[2].name}, ${movie.movie.credits.cast[3].name}</p>
            <button class="watched">Watched It</button>            
            </div>
    </div>
    `
    }
    return resultEl//return the stored DOM string
}

module.exports = cardsHTML