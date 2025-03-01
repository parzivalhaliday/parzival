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

        var basliklar = ["Parzi CV", "Parzi CV."];
        
        // Başlık değiştirme fonksiyonu
        function baslikDegistir() {
            var pageTitle = document.getElementById("pageTitle");
            var randomIndex = Math.floor(Math.random() * basliklar.length);
            pageTitle.innerText = basliklar[randomIndex];
        }

        // Belirli aralıklarla başlığı değiştir
        setInterval(baslikDegistir, 5000);

        // Unix zamanını güncelle
        function updateUnixTime() {
            const unixTime = Math.floor(Date.now() / 1000);
            document.getElementById('unix-time').textContent = unixTime;
        }

        // İlk güncelleme
        updateUnixTime();
        // Her 1 saniyede bir güncelle
        setInterval(updateUnixTime, 1000);

// Tüm diller için
var diller = document.querySelectorAll(".dil");
diller.forEach(function(dil) {
  dil.addEventListener("mouseover", function() {
    var dilResmi = document.getElementById("dilResmi");
    var dilData = dil.getAttribute("data-lang");
    dilResmi.src = "images/" + dilData + "10finger.png";
    document.querySelector(".resimBolgesi").style.display = "block";
  });

  dil.addEventListener("mouseout", function() {
    document.querySelector(".resimBolgesi").style.display = "none";
  });
});

// Python sertifikası için
document.getElementById("python").addEventListener("click", function() {
    window.open("https://www.udemy.com/certificate/UC-9c9e6b54-388f-4ed2-9ce9-ef51dd6c008b/", "_blank");
  });
  
  // JavaScript ES7 sertifikası için
  document.getElementById("javascriptes7").addEventListener("click", function() {
    window.open("https://www.udemy.com/certificate/UC-44285a20-3ef7-4466-a9c1-bfdb5e4d3956/", "_blank");
  });
  
  // HTML JavaScript sertifikası için
  document.getElementById("htmljavascript").addEventListener("click", function() {
    window.open("https://www.udemy.com/certificate/UC-ed0e1ff0-bd77-47e6-96b7-d7ab7638c127/", "_blank");
  });


//////rickroll

var audio = document.querySelector('.music');

function playMusic() {
    audio.play();
}

function pauseMusic() {
    audio.pause();
    audio.currentTime = 0;
}








console.log(`
  ⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡅⢸⣿⣿⣿
  ⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠿⣿⣿⣿⡿⠿⠿⠿⠿⣿⣿⣿⡋⠋⢉⣉⣁⣡⠈⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠉⢻⣿⣿⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡏⠁⣿⣿⣿⣿⣿⣿⣿⣿⣿⠀⣸⣿⣿⣿
  ⣿⣿⣿⣿⣿⠋⠙⠙⣉⣠⣴⣿⣿⠿⣿⣿⣿⣶⣦⡀⢹⣿⣧⠈⠿⠛⠁⠀⣴⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡀⢸⣿⡧⠀⠘⢿⣿⣿⠈⣤⣦⣤⣍⡛⢿⣿⡏⢀⣿⣿⡿⠛⢻⣿⣿⣿⡇⢠⣿⣿⣿⣿
  ⣿⣿⣿⣿⣿⡀⢘⣿⣿⣿⣿⣿⣿⠀⣾⣿⣿⣿⣿⡇⢸⣿⣿⡄⢰⣶⣶⣦⣤⣈⠙⢿⣿⣿⣿⣿⣿⣿⣿⣿⣧⡀⠻⡇⢰⣷⡀⢹⣯⠀⣿⣿⣿⣿⣿⠀⣿⠂⢸⣿⡿⢁⡄⢀⣿⣿⣿⣅⣸⣿⣿⣿⣿
  ⣿⣿⣿⣿⣿⣇⠀⠛⠛⠛⢻⣿⣯⠀⢿⣿⣿⣿⡿⢀⣾⣿⣿⡇⣸⣿⣿⣿⣿⣿⣿⣄⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣶⣶⣿⣿⣇⠐⣿⡂⢸⣿⣿⣿⠋⣰⣿⠀⣼⠏⢠⣾⡆⢸⣿⣿⣿⣿⣿⣿⣿⣿⣿
  ⣿⣿⣿⣿⣿⣿⣆⠙⣿⣿⣿⣿⣿⣿⣶⣤⣤⣤⣶⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣟⠛⠛⠛⢃⣰⣿⣿⣶⣬⣉⣤⣶⣿⣿⣧⣤⣴⣿⣿⣆⡸⣿⣿⡟⠙⠉⣻⣿⣿⣿
  ⣿⣿⣿⣿⣿⣿⣿⣶⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣧⣈⣀⣿⣿⣿⣿
  ⣿⣿⣿⣿⣿⣿⣿⣿⠛⠉⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠟⢹⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡟⠿⣿⣿⣿
  ⠏⣉⣉⠙⠿⣿⡿⢡⣾⠀⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡟⠉⣽⠛⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠟⠁⣴⣿⣇⠈⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡋⢉⠻⣿⣿⣿⣿⠟⣡⠖⣠⣿⣿⣿
  ⡇⢸⣿⣷⣆⣀⣰⣿⡿⢸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠇⢸⣿⣇⡀⢹⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠉⢀⣾⣿⣿⣿⡀⢸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡆⠸⡆⠸⣿⣿⠁⣸⠇⣸⣿⣿⣿⣿
  ⣷⣄⠙⠿⣿⣿⣿⣿⠃⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡯⠀⣿⣿⣿⣷⣄⠉⠿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡟⠁⣰⣿⣿⣿⣿⣿⣷⡀⢻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⠀⢻⣆⠈⢃⡴⢁⣼⣿⣿⣿⣿⣿
  ⣿⣿⣷⣤⣈⠙⣻⡏⣸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡁⢸⣿⣿⣿⣿⣿⣿⣄⡝⠻⠿⠿⠿⠿⠿⠿⠿⠇⢸⣿⣿⣿⣿⣿⣿⣿⣇⠘⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣧⠈⣿⣿⠟⣠⣿⣿⣿⣿⣿⣿⣿
  ⣿⣿⣿⣿⣿⣿⣯⣰⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡏⠀⣿⣿⣿⣿⣿⣿⣿⣿⣿⣾⣶⣶⣶⣶⣶⣶⣶⣶⣾⣿⣿⣿⣿⣿⣿⣿⣿⡀⢸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣦⠘⠟⣸⣿⣿⣿⣿⣿⣿⣿⣿
  ⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠿⠿⢿⠟⣩⡄⢸⣿⣿⣿⡇⢐⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡧⠈⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣾⣴⣿⣿⣿⣿⣿⣿⣿⣿⣿
  ⣿⣿⣿⣿⣿⣿⣿⣿⣿⡧⠀⣷⣤⣾⡿⢡⣾⣿⣿⣿⡅⠸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⢿⣿⣿⣿⣿⣿⣿⣤⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
  ⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⠀⢿⣿⠟⣠⣾⣿⣿⣿⣿⣧⣰⢿⣿⣿⣿⡟⠛⠙⠻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡟⠁⠀⢈⣽⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
  ⡿⣿⣿⡿⠋⠛⣿⣿⣿⣿⣷⣤⡉⣼⣿⣿⣿⣿⣿⢿⣿⠃⣰⣿⣿⣿⣧⣀⠁⣀⣽⣿⣿⣿⠿⢻⣿⣿⣿⣿⣿⣧⣀⣀⣼⣿⣿⣿⣿⣿⠙⠻⠻⠛⠋⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
  ⣧⠈⣉⣀⠀⢸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣥⣤⣤⠀⣠⣾⢿⣿⠟⠋⣿⣿⣿⣿⣿⠏⢀⣄⠘⢿⣿⣿⣿⣿⣿⡿⢛⡿⢋⠉⠸⣿⠀⢲⣶⣶⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
  ⣿⣧⠘⠋⣠⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠀⣾⠏⠘⣡⡄⣼⣿⣿⣿⣿⣧⣶⣿⣿⣷⣤⣿⣿⣿⣿⣿⣧⣤⣴⣿⣴⣶⡿⠀⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⢿⣿⣿⣿⣿⣿⣿
  ⣿⣿⣷⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣟⠋⣠⡀⢻⣶⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠃⣀⡙⠛⠛⠛⣿⣿⣿⡿⢿⣿⣿⣿⣿⠟⣡⠀⣿⣿⣿⣿⣿⣿
  ⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡟⠉⠹⣿⡟⠋⢹⣿⣿⣿⣿⣷⣤⡉⠻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡗⢀⣿⣿⣿⣿⣿⣿⣿⡏⠠⣤⡈⠻⠿⢋⣾⠋⣼⣿⣿⣿⣿⣿⣿
  ⣿⣿⣿⣿⣿⠟⠛⠿⢿⣿⡀⣟⠀⠁⠀⡄⢸⣿⣿⣿⣿⣿⣿⣿⣆⠙⢻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣧⡴⢿⣿⣿⣿⣿⣿⣿⣷⡀⢻⣿⣶⣶⣿⠃⣼⣿⣿⣿⣿⣿⣿⣿
  ⣿⣿⣿⣿⣿⠀⢷⡆⠀⡈⠀⠁⠀⠀⣸⢃⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣧⡀⠹⣿⣿⣿⣿⣿⣿⣷⣄⠙⢿⣿⠏⣼⣿⣿⣿⣿⣿⣿⣿⣿
  ⣿⣿⣿⣿⣿⣇⠸⡇⠀⠀⡂⠀⠀⢰⠇⣼⣿⣿⣿⣿⣿⠃⢨⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣄⠈⢿⣿⣿⣿⣿⣿⣿⣶⣆⢉⣼⣿⣿⣿⣿⣿⣿⣿⣿⣿
  ⣿⣿⣿⣿⣿⣿⣆⠐⠀⣼⠀⠀⠀⡅⣸⣿⣿⣿⣿⠟⢀⣴⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣦⠀⠻⣿⣿⣿⣿⣿⣿⣷⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
  ⣿⣿⣿⣿⣿⣿⣿⣷⣀⠙⠀⠀⡸⢱⣿⣿⣿⠟⢀⣴⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⡀⠈⢻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠻
  ⣿⣿⣿⣿⣿⣿⣿⠟⢿⣷⣄⡈⢁⣿⣿⡿⠁⣰⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣦⠀⢻⣿⣿⣿⣿⣿⣿⣿⠿⠿⢿⣿⣿⠟⣰⢂
  ⣿⣿⣿⣿⣿⣿⣿⣆⠀⠙⠻⡇⡀⣿⠋⢠⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⣄⠙⢿⣿⣿⣿⣿⡃⢰⣶⣤⣤⣤⣾⡏⣸
  ⣿⣿⣿⣿⣿⣿⣿⣿⣆⠈⢶⡀⠀⠏⣰⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⡈⠿⣿⣿⣿⣷⠀⢿⣿⣿⣿⣿⢀⣿
  ⣿⣿⣿⣿⣿⣿⣿⣿⣿⣮⡈⠻⠀⣴⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⣄⠙⢿⣿⣿⣷⣄⠙⠛⠿⣇⣾⣿
  ⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡟⢀⠀⢻⣿⣿⣿⣿⣿⣿⡿⠿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣶⡀⢻⣿⣿⣿⣿⣿⣶⣿⣿⣿
  ⣿⣿⣿⣿⣿⣿⣿⣿⣿⡟⢀⣿⠆⢽⣿⣿⣿⣿⣟⠉⣀⡤⢸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠃⣄⣈⠉⠻⣿⣿⣿⣿⣿⣿⣷⠀⢿⣿⣿⣿⣿⣿⣿⣿⣿
  ⣿⣿⣿⣿⣿⣿⣿⣿⡿⢀⣾⣿⡧⢺⣿⣿⠟⠉⢈⣿⣿⡇⢺⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠀⢼⣿⣿⣦⡈⠻⣿⣿⣿⣿⣿⣷⠎⢻⣿⣿⣿⣿⣿⣿⣿
  ⣿⣿⣿⣿⣿⣿⣿⣿⡇⠘⣿⣿⣷⠈⣿⠅⣠⣴⣿⣿⣿⠃⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠀⢸⣿⣿⣿⣿⣧⣀⠙⠋⠉⠉⢁⣠⣾⣿⣿⣿⣿⣿⣿⣿
  ⣿⣿⣿⣿⣿⣿⣿⣿⣇⣄⡈⠛⠿⠆⣡⣾⣿⣿⣿⣿⣿⠀⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠂⢸⣿⣿⣿⣿⣿⣿⣿⣶⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
  ⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣶⣿⡅⢿⣿⣿⣿⣿⣿⠀⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡄⢸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
  ⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣼⣿⣿⣿⣿⣿⠀⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠅⢸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
  ⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
  `);


  