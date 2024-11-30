document.addEventListener('DOMContentLoaded', function() {
    const textContent = document.getElementById('textContent');
    const messageText = document.getElementById('messageText');
    
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

    // Mouse olayları
    textContent.addEventListener('mouseenter', function() {
        this.classList.add('visible');
        this.style.transform = 'scale(1.02)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 200);
    });

    textContent.addEventListener('mouseleave', function() {
        this.classList.remove('visible');
    });

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
        }, 10000); // 10 saniye sonra
    }, 20000); // 20 saniye sonra
}); 