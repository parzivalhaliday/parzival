// Ana uygulama modülü
const app = (function() {
    // Sosyal medya linklerini ayarla
    function setupSocialLinks() {
        const socialLinks = document.querySelectorAll('.social-links a');
        
        socialLinks.forEach(link => {
            link.setAttribute('target', '_blank');
            link.setAttribute('rel', 'noopener noreferrer');
        });
    }
    
    // Uygulama başlatma
    function init() {
        console.log('Sayfa yüklendi');
        
        // Sosyal medya linklerini ayarla
        setupSocialLinks();
        
        // Tüm modülleri başlat
        timeModule.init();
        themeModule.init();
        weatherModule.init();
        spotifyModule.init();
        githubModule.init();
        
        return this;
    }
    
    // Public API
    return {
        init: init
    };
})();

// Sayfa yüklendiğinde uygulamayı başlat
document.addEventListener('DOMContentLoaded', function() {
    app.init();
}); 