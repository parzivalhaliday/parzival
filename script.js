        // Kullanılabilir faviconlarınızın dosya adlarını diziye ekleyin (icons klasörü içinde)
        const favicons = ["icons/favicon1.ico", "icons/favicon2.ico", "icons/favicon3.ico"];

        // Favicon değişim hızı (milisaniye cinsinden)
        const changeInterval = 5000; // Örnek olarak 5 saniye

        // İlk favicon'u ayarlayın
        let currentIndex = 0;
        setFavicon(favicons[currentIndex]);

        // Favicon değiştirme işlemi
        setInterval(() => {
            currentIndex = (currentIndex + 1) % favicons.length; // Bir sonraki favicon'a geçin
            setFavicon(favicons[currentIndex]);
        }, changeInterval);

        // Favicon'u ayarlayan yardımcı fonksiyon
        function setFavicon(favicon) {
            const link = document.querySelector("link[rel='icon']");
            link.href = favicon;
        }