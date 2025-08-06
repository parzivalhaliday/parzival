document.addEventListener('DOMContentLoaded', function() {
    const loadingElement = document.getElementById('loading');
    const cityInfoElement = document.getElementById('city-info');
    const cityNameElement = document.getElementById('city-name');
    const adContainerElement = document.getElementById('ad-container');
    const cityAdElement = document.getElementById('city-ad');
    const errorMessageElement = document.getElementById('error-message');

    // IP adresini al
    async function getIPAddress() {
        try {
            const response = await fetch('https://api64.ipify.org?format=json');
            const data = await response.json();
            return data.ip;
        } catch (error) {
            console.error('IP adresi alınamadı:', error);
            showError();
            return null;
        }
    }

    // IP adresinden şehir bilgisini al
    async function getCityFromIP(ip) {
        try {
            const response = await fetch(`https://log.parzi.dev/api/ip/${ip}`);
            const data = await response.json();
            return data.city;
        } catch (error) {
            console.error('Şehir bilgisi alınamadı:', error);
            showError();
            return null;
        }
    }

    // Türkçe karakterleri ASCII'ye dönüştür
    function turkishToAscii(text) {
        const turkishChars = {
            'ç': 'c', 'Ç': 'C',
            'ğ': 'g', 'Ğ': 'G',
            'ı': 'i', 'İ': 'I',
            'ö': 'o', 'Ö': 'O',
            'ş': 's', 'Ş': 'S',
            'ü': 'u', 'Ü': 'U'
        };
        
        return text.replace(/[çÇğĞıİöÖşŞüÜ]/g, function(char) {
            return turkishChars[char] || char;
        });
    }

    // Hata mesajını göster
    function showError() {
        loadingElement.classList.add('hidden');
        errorMessageElement.classList.remove('hidden');
    }

    // Şehre özel reklamı göster
    function showCityAd(city) {
        if (!city) {
            showError();
            return;
        }

        // Şehir adını küçük harfe çevir ve Türkçe karakterleri ASCII'ye dönüştür
        const normalizedCity = turkishToAscii(city.toLowerCase());
        
        // Şehir adını göster
        cityNameElement.textContent = city;
        cityInfoElement.classList.remove('hidden');
        
        // Reklam görselini ayarla
        cityAdElement.src = `ads/${normalizedCity}.png`;
        cityAdElement.alt = `${city} için özel reklam`;
        
        // Reklam görseli yüklendiğinde veya hata verdiğinde
        cityAdElement.onload = function() {
            loadingElement.classList.add('hidden');
            adContainerElement.classList.remove('hidden');
        };
        
        cityAdElement.onerror = function() {
            console.error(`${normalizedCity}.png bulunamadı`);
            loadingElement.classList.add('hidden');
            // Varsayılan bir reklam göster veya hata mesajı göster
            cityAdElement.src = 'ads/default.png';
            adContainerElement.classList.remove('hidden');
        };
    }

    // Ana işlev
    async function main() {
        const ip = await getIPAddress();
        if (ip) {
            const city = await getCityFromIP(ip);
            showCityAd(city);
        }
    }

    // Uygulamayı başlat
    main();
});