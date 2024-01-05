        // Kullanılabilir faviconlarınızın dosya adlarını diziye ekleyin (icons klasörü içinde)
        const favicons = ["icons/cv.ico", "icons/cv.ico", "icons/favicon2.ico"];

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

        var basliklar = ["Parzi CV", "Hakkımda ve Yaptığım çalışmalar", "Lütfen beni işe alın UwU"];
        
        // Başlık değiştirme fonksiyonu
        function baslikDegistir() {
            var pageTitle = document.getElementById("pageTitle");
            var randomIndex = Math.floor(Math.random() * basliklar.length);
            pageTitle.innerText = basliklar[randomIndex];
        }

        // Belirli aralıklarla başlığı değiştir
        setInterval(baslikDegistir, 10000);


        var basliklar = ["Parzi CV", "Hakkımda ve Yaptığım çalışmalar", "Lütfen beni işe alın UwU"];
        
        // Başlık değiştirme fonksiyonu
        function baslikDegistir() {
            var pageTitle = document.getElementById("pageTitle");
            var randomIndex = Math.floor(Math.random() * basliklar.length);
            pageTitle.innerText = basliklar[randomIndex];
        }

        // Belirli aralıklarla başlığı değiştir
        setInterval(baslikDegistir, 10000);