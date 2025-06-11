// Tema modülü
const themeModule = (function() {
    // Özel değişkenler
    let themeToggle;
    let lightIcon;
    let darkIcon;
    let xdText;
    let shootingStarInterval;
    let currentMode = 'dark'; // default mode
    
    // Modül başlatma
    function init() {
        themeToggle = document.getElementById('theme-toggle');
        lightIcon = document.querySelector('.light-icon');
        darkIcon = document.querySelector('.dark-icon');
        xdText = document.getElementById('xd-text');
        
        if (!themeToggle) {
            console.error('Tema değiştirme öğeleri bulunamadı.');
            return this;
        }
        
        // Kullanıcının tema tercihini localStorage'dan al
        const savedMode = localStorage.getItem('mode') || 'dark';
        
        // Kaydedilen modu uygula
        applyMode(savedMode);
        
        // Tema değiştirme butonuna tıklandığında
        themeToggle.addEventListener('click', function() {
            // Modları döngüsel olarak değiştir: dark -> night -> dark
            if (currentMode === 'dark') {
                applyMode('night');
            } else {
                applyMode('dark');
            }
        });
        
        return this;
    }
    
    // Modu uygulama fonksiyonu
    function applyMode(mode) {
        currentMode = mode;
        localStorage.setItem('mode', mode);
        
        // Önce tüm modları temizle
        document.documentElement.removeAttribute('data-night-mode');
        document.body.classList.remove('stars-visible');
        document.body.classList.remove('has-stars');
        xdText.classList.add('hidden');
        stopShootingStars();
        
        // Seçilen modu uygula
        switch(mode) {
            case 'dark':
                document.documentElement.setAttribute('data-theme', 'dark');
                break;
                
            case 'night':
                document.documentElement.setAttribute('data-theme', 'dark');
                document.documentElement.setAttribute('data-night-mode', 'on');
                xdText.classList.remove('hidden');
                document.body.classList.add('has-stars');
                setTimeout(() => {
                    document.body.classList.add('stars-visible');
                    startShootingStars();
                }, 500);
                break;
        }
    }
    
    // Kayan yıldız oluşturma fonksiyonu
    function createShootingStar() {
        const star = document.createElement('div');
        star.classList.add('shooting-star');
        
        // Rastgele pozisyon
        const startX = Math.random() * window.innerWidth;
        const startY = Math.random() * (window.innerHeight / 2);
        
        star.style.left = `${startX}px`;
        star.style.top = `${startY}px`;
        
        document.body.appendChild(star);
        
        // Animasyonu başlat
        setTimeout(() => {
            star.classList.add('active');
            
            // Animasyon bittikten sonra elementi kaldır
            setTimeout(() => {
                document.body.removeChild(star);
            }, 1000);
        }, 10);
    }
    
    // Kayan yıldızları başlatma fonksiyonu
    function startShootingStars() {
        // Her 3-8 saniyede bir kayan yıldız oluştur
        shootingStarInterval = setInterval(() => {
            if (Math.random() > 0.5) { // %50 şansla
                createShootingStar();
            }
        }, Math.random() * 5000 + 3000);
    }
    
    // Kayan yıldızları durdurma fonksiyonu
    function stopShootingStars() {
        clearInterval(shootingStarInterval);
    }
    
    // Public API
    return {
        init: init
    };
    
})(); 