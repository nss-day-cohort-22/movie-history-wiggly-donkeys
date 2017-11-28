// Author(s): Paul
// Purpose: Load movies to DOM

const loadMovies = (watched) => {
    const movies = result.movies.filter(movie => movie.uid === user.uid && movie.watched === watched)
    const moviesEL = "";
    movies.forEach(movie => {
        `<div class="movieCard">
    <img class="movieCard_img" src="${a}" alt="Card image cap">
    <div class="movieCard_text">
      <h4 class="movieCard_title">${a}</h4>
      <p class="movieCard_date">${a}</p>
      <p class="movieCard_actors">${a}</p>
      <button class="button">TBD</button>
    </div>
  </div>
  `
    })
    $("#").html(moviesEL)
}

module.exports = loadMovies