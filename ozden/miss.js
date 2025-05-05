const texts = ["⏰", "⌚", "BEKLİYORUM"]; // Düşecek metinler
const speedRange = { min: 1, max: 3 }; // Düşme hızı aralığı, pixel cinsinden
const textCount = 25; // Oluşturulacak yazı sayısı

// Yazıların stilini ayarlayalım
const textStyle = `
  position: absolute;
  font-size: 14px;
  color: #4b99ff;
  font-weight: bold;
`;

// Belirli bir metni düşüren fonksiyon
function dropText(text, speed) {
  const container = document.createElement('div');
  container.style.position = 'fixed';
  container.style.top = '0';
  container.style.left = Math.random() * window.innerWidth + 'px';
  container.style.width = '100%';
  container.style.height = '100%';
  container.style.pointerEvents = 'none';
  document.body.appendChild(container);

  const textElement = document.createElement('div');
  textElement.textContent = text;
  textElement.style.cssText = textStyle;
  container.appendChild(textElement);

  let topPosition = -100; // Yazının başlangıç pozisyonu
  let leftPosition = parseFloat(container.style.left); // Yazının yatay pozisyonu
  let gravity = 0.1; // Yerçekimi

  function animate() {
    if (topPosition < window.innerHeight) {
      topPosition += speed;
      gravity += 0.1;
      leftPosition += Math.sin(topPosition / 10) * 0; // Yatay hareket için sinus kullanıyoruz
      textElement.style.top = `${topPosition}px`;
      textElement.style.left = `${leftPosition}px`;
      requestAnimationFrame(animate);
    } else {
      container.removeChild(textElement); // Yazı ekranın dışına çıkınca kaldırıyoruz
      setTimeout(() => dropText(text, speed), 1000); // Yeni bir metin oluşturup düşürüyoruz
    }
  }

  animate();
}

// Sayfa yüklendiğinde yazıları başlat
window.onload = function() {
  for (let i = 0; i < textCount; i++) {
    const randomText = texts[Math.floor(Math.random() * texts.length)];
    const randomSpeed = Math.random() * (speedRange.max - speedRange.min) + speedRange.min;
    dropText(randomText, randomSpeed);
  }
};
