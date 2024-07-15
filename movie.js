const apiKey = '58ec7b5f1bb87b37a5db4b0ad470798d';
const listId = '8301529';
const movieList = document.getElementById('movieList');

let currentPage = 1;
let totalPages = 1;
const allMovies = [];

function fetchMovies(page) {
  fetch(`https://api.themoviedb.org/3/list/${listId}?api_key=${apiKey}&page=${page}`)
    .then(response => response.json())
    .then(data => {
      totalPages = data.total_pages;
      allMovies.push(...data.items);
      if (currentPage < totalPages) {
        currentPage++;
        fetchMovies(currentPage);
      } else {
        displayMovies();
      }
    })
    .catch(error => {
      console.error('API\'den veri alınamadı:', error);
    });
}

function displayMovies() {
  allMovies.sort((a, b) => b.vote_average - a.vote_average);
  allMovies.forEach(movie => {
    const listItem = document.createElement('li');
    const title = movie.title ? movie.title : movie.name;
    const backdropPath = movie.backdrop_path ? 'https://image.tmdb.org/t/p/w500' + movie.backdrop_path : '';
    listItem.innerHTML = `<a href="https://www.themoviedb.org/movie/${movie.id}" target="_blank"><img src="${backdropPath}" alt="${title}"><div>${title}</div></a>`;
    movieList.appendChild(listItem);
  });
}

fetchMovies(currentPage);