const emojis = ['⌚', '⏰', '⏱️', '⏲️', '🕰️', '🕛', '🕐', '🕑', '🕒', '🕓', '🕔', '🕕', '🕖', '🕗', '🕘', '🕙', '🕚'];
let container, hearts;

function init(heartSize, fallSpeed) {
  container = document.getElementById('container');
  hearts = [];

  for (let i = 0; i < 100; i++) {
    const heart = document.createElement('div');
    heart.classList.add('heart');
    heart.innerHTML = emojis[Math.floor(Math.random() * emojis.length)];
    heart.style.fontSize = heartSize + 'px';
    heart.style.left = Math.random() * window.innerWidth + 'px';
    heart.style.top = Math.random() * window.innerHeight + 'px';
    container.appendChild(heart);
    hearts.push(heart);
  }

  animate(fallSpeed);
}

function animate(fallSpeed) {
  requestAnimationFrame(() => animate(fallSpeed));
  hearts.forEach(heart => {
    const top = parseInt(heart.style.top);
    if (top > window.innerHeight) {
      heart.style.top = '0px';
    } else {
      heart.style.top = top + fallSpeed + 'px';
    }
  });
}

// Ekran boyutu değişse bile tam ekranda kalplerin sabit bir şekilde akması
window.addEventListener('resize', () => {
  hearts.forEach(heart => {
    heart.style.left = Math.random() * window.innerWidth + 'px';
  });
});

// Kalplerin boyutunu ve düşme sıklığını belirleyerek başlatma
init(30, 2);
