document.addEventListener('DOMContentLoaded', function() {
    const textContent = document.getElementById('textContent');
    const messageText = document.getElementById('messageText');
    
    // Mouse olaylarını devre dışı bırak
    let mouseEventsEnabled = false;
    
    // Dosyadan içeriği oku
    fetch('oku.txt')
        .then(response => response.text())
        .then(data => {
            const lines = data.split('\n');
            textContent.innerHTML = lines
                .map(line => `<p class="message-line">${line}</p>`)
                .join('');
        })
        .catch(error => {
            console.error('Dosya okuma hatası:', error);
            textContent.textContent = 'Dosya okunamadı.';
        });

    // Mouse ile etkileşim
    textContent.addEventListener('mouseenter', function() {
        if (mouseEventsEnabled) {
            this.classList.add('visible');
        }
    });

    textContent.addEventListener('mouseleave', function() {
        if (mouseEventsEnabled) {
            this.classList.remove('visible');
        }
    });

    // 3 dakika sonra mouse etkileşimini etkinleştir
    setTimeout(() => {
        mouseEventsEnabled = true;
    }, 180000); // 3 dakika = 180000 ms

    // Yönlendirme ve mesaj değişiklikleri
    setTimeout(function() {
        window.location.href = "https://parzi.lol/goodbyeworld";
    }, 300000); // 5 dakika sonra

    // 20 saniye sonra mesaj değişiklikleri başlasın
    setTimeout(function() {
        messageText.textContent = "https://www.youtube.com/watch?v=c8TaJEGyt70";

        setTimeout(function() {
            messageText.textContent = "linki görmek için sayfayı mı yenileyeceksin yoksa asıl sayfaya ulaşmak için bekleyecek misin";

            setTimeout(function() {
                messageText.textContent = "hmm";
            }, 5000); // 5 saniye sonra
        }, 2000); // 2 saniye sonra
    }, 20000); // 20 saniye sonra

    // Mevcut kodun başına ekleyin
    function createFlower() {
        const flower = document.createElement('div');
        flower.className = 'flower';
        // Sardunya benzeri çiçek sembolleri
        const flowers = ['🌺', '🌸'];
        flower.textContent = flowers[Math.floor(Math.random() * flowers.length)];
        
        // Rastgele x pozisyonu
        flower.style.left = Math.random() * 100 + '%';
        
        // Düşme süresi
        const duration = 8 + Math.random() * 7;
        flower.style.animation = `flowerFall ${duration}s linear`;
        
        document.body.appendChild(flower);
        
        setTimeout(() => {
            flower.remove();
        }, duration * 1000);
    }

    // Her 1500ms'de bir yeni çiçek oluştur
    setInterval(createFlower, 150);

    // Sayfa yüklendiğinde birkaç çiçek oluştur
    for(let i = 0; i < 3; i++) {
        setTimeout(createFlower, i * 500);
    }

    // Özel mouse imleci oluştur
    const cursor = document.createElement('div');
    cursor.className = 'cursor';
    cursor.innerHTML = '🌸';  // Çiçek emojisi
    document.body.appendChild(cursor);

    // Mouse hareketini takip et
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });
}); 