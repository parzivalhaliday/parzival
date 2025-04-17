// Sayfa yüklendiğinde çalışacak fonksiyonlar
document.addEventListener('DOMContentLoaded', function() {
    // İstatistik grafikleri için animasyon
    animateStatGraphs();
    
    // İçerik kartları için hover efektleri
    setupContentCards();
    
    // Reklam butonları için tıklama olayları
    setupAdButtons();
    
    // Reklam görsellerinin yüklendiğinden emin olalım
    const adImages = document.querySelectorAll('.ad-spot-image img, .ad-example-img');
    
    adImages.forEach(img => {
        img.addEventListener('error', function() {
            console.error('Reklam görseli yüklenemedi:', this.src);
            // Hata durumunda görsel yerine bir uyarı gösterelim
            this.style.height = '200px';
            this.style.display = 'flex';
            this.style.alignItems = 'center';
            this.style.justifyContent = 'center';
            this.style.backgroundColor = 'rgba(255, 0, 0, 0.1)';
            this.style.border = '2px dashed #ff6b9c';
            this.alt = 'Görsel yüklenemedi';
        });
        
        // Görselin düzgün yüklendiğinden emin olalım
        img.addEventListener('load', function() {
            console.log('Reklam görseli yüklendi:', this.src);
            this.style.display = 'block';
        });
    });
});

// İstatistik grafiklerini animate eder
function animateStatGraphs() {
    const statGraphs = document.querySelectorAll('.stat-graph');
    
    statGraphs.forEach(graph => {
        // Rastgele hareketli grafik oluştur
        const randomHeight = Math.floor(Math.random() * 60) + 20; // 20-80 arası
        const randomPoints = [];
        
        for (let i = 0; i <= 10; i++) {
            const x = i * 10;
            const y = Math.floor(Math.random() * randomHeight) + (80 - randomHeight);
            randomPoints.push(`${x}% ${y}%`);
        }
        
        // Son noktaları ekle (grafiğin alt köşeleri)
        randomPoints.push('100% 100%', '0 100%');
        
        // Grafik çizgisi oluştur
        const clipPath = `polygon(${randomPoints.join(', ')})`;
        const graphLine = document.createElement('div');
        graphLine.style.position = 'absolute';
        graphLine.style.top = '0';
        graphLine.style.left = '0';
        graphLine.style.right = '0';
        graphLine.style.bottom = '0';
        graphLine.style.background = 'linear-gradient(45deg, var(--primary-color), var(--secondary-color))';
        graphLine.style.clipPath = clipPath;
        
        graph.innerHTML = '';
        graph.appendChild(graphLine);
    });
}

// İçerik kartları için hover efektleri
function setupContentCards() {
    const contentCards = document.querySelectorAll('.content-card');
    
    contentCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 10px 20px rgba(0,0,0,0.2)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'var(--box-shadow)';
        });
    });
}

// Reklam butonları için tıklama olayları
function setupAdButtons() {
    const adButtons = document.querySelectorAll('.ad-cta');
    
    adButtons.forEach(button => {
        button.addEventListener('click', function() {
            // E-posta oluştur
            const emailSubject = encodeURIComponent('Feetle Reklam İşbirliği Hakkında');
            const emailBody = encodeURIComponent('Merhaba Feetle Ekibi,\n\nWeb sitenizde reklam vermekle ilgileniyorum. Detaylı bilgi almak isterim.\n\nTeşekkürler,');
            window.location.href = `mailto:me@parzi.dev?subject=${emailSubject}&body=${emailBody}`;
        });
    });
}

// Sayfa kaydırma animasyonu
window.addEventListener('scroll', function() {
    const scrollPosition = window.scrollY;
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        
        // Kullanıcı section'a yaklaştığında animasyon uygula
        if (scrollPosition > sectionTop - window.innerHeight + sectionHeight / 2) {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }
    });
});

// Sayfa ilk yüklendiğinde tüm section'lara başlangıç stilini uygula
document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('section');
    
    sections.forEach((section, index) => {
        // Sayfa ilk yüklendiğinde section'ları görünmez yap ve aşağıdan yukarı animasyon hazırla
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = `opacity 0.5s ease, transform 0.5s ease ${index * 0.1}s`;
        
        // İlk section'ı hemen göster
        if (index === 0) {
            setTimeout(() => {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }, 100);
        }
    });
});

// Sayaçları artırma animasyonu
document.addEventListener('DOMContentLoaded', function() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach(statNumber => {
        const targetValue = parseFloat(statNumber.textContent.replace(/[^\d.]/g, ''));
        const suffix = statNumber.textContent.replace(/[\d.]/g, '');
        let startValue = 0;
        const duration = 2000; // 2 saniye
        const step = targetValue / (duration / 20);
        
        function updateCounter() {
            startValue += step;
            
            if (startValue < targetValue) {
                // Sayı ondalık ise 1 ondalık basamak göster, değilse tam sayı göster
                statNumber.textContent = (Math.floor(startValue * 10) / 10).toLocaleString() + suffix;
                requestAnimationFrame(updateCounter);
            } else {
                statNumber.textContent = targetValue.toLocaleString() + suffix;
            }
        }
        
        // IntersectionObserver ile element görünür olduğunda animasyonu başlat
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateCounter();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(statNumber);
    });
}); 