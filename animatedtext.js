  // Aranan metin ve harfler dizisi
  const letters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()-_=+[{]}|;:",<.>/?';
  
  // Belirli bir sınıfa sahip tüm metin öğelerini al
  const textElements = document.querySelectorAll('.animated-text');
  
  // Her bir metin öğesi için animasyonu uygula
  textElements.forEach((element) => {
    let currentIndex = 0;
    const search = element.textContent;
    
    // Belirli bir aralıkta harfleri kontrol et
    const interval = setInterval(() => {
      let currentText = '';

      // Her harf için kontrol et
      for (let i = 0; i < search.length; i++) {
        // Aranan metindeki harf
        const currentChar = search[i];

        // Eğer harf aranmaya başlanan harften küçükse veya aranan metinde zaten bulunmuşsa, sabit olarak ekle
        if (i < currentIndex) {
          currentText += currentChar;
        } else {
          // Diğer harfler için rastgele bir harf ekle
          currentText += letters[Math.floor(Math.random() * letters.length)];
        }
      }

      // Metni güncelle
      element.textContent = currentText;

      // Aranan metni tamamlandığında animasyonu durdur
      if (currentText === search) {
        clearInterval(interval);
      }

      // Her adımda bir sonraki harfe geç
      currentIndex++;
    }, 200); // Her 100 milisaniyede bir metni güncelle
  });