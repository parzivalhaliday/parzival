const vantilator = document.getElementById('vantilator');
let resistance = 0.01; // Başlangıç direnç değeri
let resistanceIncrement = 0.0001; // Direnç artış değeri

function applyResistance() {
  // Vantilatör pozisyonunu al
  const vantilatorX = vantilator.offsetLeft + vantilator.offsetWidth / 2;

  // Uygulama mantığı
  const distance = window.innerWidth - vantilatorX;
  const force = resistance / distance;

  // Vantilatörü hareket ettir
  vantilator.style.right = vantilator.style.right + force + 'px';

  // Direnç artışı
  resistance += resistanceIncrement;
}

// Direnç uygula fonksiyonunu belirli aralıklarla çağır
setInterval(applyResistance, 100);
