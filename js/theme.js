// Tema modülü
const themeModule = (function() {
    // Özel değişkenler
    let themeToggle;
    let themeIcon;
    
    // Modül başlatma
    function init() {
        themeToggle = document.getElementById('theme-toggle');
        themeIcon = document.querySelector('.theme-icon');
        
        if (!themeToggle || !themeIcon) {
            console.error('Tema değiştirme öğeleri bulunamadı.');
            return this;
        }
        
        // Kullanıcının tema tercihini localStorage'dan al
        const savedTheme = localStorage.getItem('theme');
        
        // Eğer daha önce bir tema seçildiyse, onu uygula
        if (savedTheme) {
            document.documentElement.setAttribute('data-theme', savedTheme);
            updateThemeIcon(savedTheme);
        }
        
        // Tema değiştirme butonuna tıklandığında
        themeToggle.addEventListener('click', function() {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            
            // Yeni temayı uygula
            document.documentElement.setAttribute('data-theme', newTheme);
            
            // Tema tercihini localStorage'a kaydet
            localStorage.setItem('theme', newTheme);
            
            // Tema ikonunu güncelle
            updateThemeIcon(newTheme);
        });
        
        return this;
    }
    
    // Tema ikonunu güncelleme fonksiyonu
    function updateThemeIcon(theme) {
        if (theme === 'light') {
            themeIcon.src = 'images/dark.svg';
            themeIcon.alt = 'Dark mode';
        } else {
            themeIcon.src = 'images/light.svg';
            themeIcon.alt = 'Light mode';
        }
    }
    
    // Public API
    return {
        init: init
    };
    
})(); 