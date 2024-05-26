
fetch('https://api.themoviedb.org/3/list/8301529?api_key=0f07e31867110e665a9b2c304b153eb9')
  .then(response => response.json())
  .then(data => {
    // IMDb puanına göre sırala
    data.items.sort((a, b) => b.vote_average - a.vote_average);
    // Her bir film öğesini döngüyle geç
    const movieList = document.getElementById('movieList');
    data.items.forEach(movie => {
      const listItem = document.createElement('li');
      // Başlık boşsa ismi kullan
      const title = movie.title ? movie.title : movie.name;
      // Arka plan görseli
      const backdropPath = movie.backdrop_path ? 'https://image.tmdb.org/t/p/w500' + movie.backdrop_path : '';
      // Tıklanabilir bağlantı ekleyerek TMDb sayfasına yönlendir
      listItem.innerHTML = `<a href="https://www.themoviedb.org/movie/${movie.id}" target="_blank"><img src="${backdropPath}" alt="${title}"><div>${title}</div></a>`;
      movieList.appendChild(listItem);
    });
  })
  .catch(error => {
    console.error('API\'den veri alınamadı:', error);
  });