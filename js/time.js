// Saat modülü
const timeModule = (function() {
    // Özel değişkenler
    let timeUpdateInterval;
    
    // Modül başlatma
    function init() {
        // Sayfa yüklendiğinde saati göster
        updateTime();
        
        // Her saniye saati güncelle
        timeUpdateInterval = setInterval(updateTime, 1000);
        
        return this;
    }
    
    // Saati gerçek zamanlı olarak güncelleme
    function updateTime() {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const timeElement = document.getElementById('current-time');
        
        if (timeElement) {
            timeElement.textContent = `${hours}:${minutes}`;
        }
    }
    
    // Modülü temizleme
    function cleanup() {
        if (timeUpdateInterval) {
            clearInterval(timeUpdateInterval);
        }
    }
    
    // Public API
    return {
        init: init,
        cleanup: cleanup
    };
    
})(); 