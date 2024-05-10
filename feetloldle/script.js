const championDataURL = "https://ddragon.leagueoflegends.com/cdn/14.9.1/data/en_US/champion.json";
let sayac = 0;
let totalScore = 0;

async function createChampionList(filter = "", count = 5) {
    try {
        const response = await fetch(championDataURL);
        const data = await response.json();
        const championsData = Object.values(data.data);

        const imagePath = "tiles/";

        const filteredChampionsData = championsData.filter(champion =>
            champion.name.toLowerCase().startsWith(filter.toLowerCase())
        ).slice(0, count);

        const listContainer = document.getElementById("champion-suggestions");
        listContainer.innerHTML = "";

        filteredChampionsData.forEach(champion => {
            const championDiv = document.createElement("div");
            const championImg = document.createElement("img");
            const championSpan = document.createElement("span");

            const championName = champion.name;
            const championImageName = champion.id;

            const imageURL = `${imagePath}${encodeURIComponent(championImageName)}.png`;

            championImg.src = imageURL;
            championSpan.textContent = championName;

            championDiv.appendChild(championImg);
            championDiv.appendChild(championSpan);
            listContainer.appendChild(championDiv);
        });
    } catch (error) {
        console.error("Hata:", error);
    }
}

document.getElementById("tahmin-input").addEventListener("input", function() {
    const tahmin = this.value;
    if (tahmin.length > 0) {
        createChampionList(tahmin); // Tahmin inputunda yazı varsa önerilen şampiyonları oluştur
    } else {
        const championSuggestions = document.getElementById("champion-suggestions");
        championSuggestions.innerHTML = ""; // Tahmin inputunda herhangi bir yazı yoksa önerilen şampiyonları temizle
    }
});


document.getElementById("tahmin-et-btn").addEventListener("click", tahminKontrol);

document.getElementById("champion-suggestions").addEventListener("click", function(event) {
    if (event.target.tagName === "DIV") {
        const championName = event.target.querySelector("span").textContent;
        document.getElementById("tahmin-input").value = championName;
    }
});

document.getElementById("tweet-btn").addEventListener("click", function() {
    const scoreText = document.getElementById("final-score").textContent;
    const tweetText = `Ben feetle de ${scoreText} puan aldım 🎉`;
    const tweetURL = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`;
    window.open(tweetURL, "_blank", "width=600,height=300");
});


window.onload = function() {
    fetch('veri.json')
        .then(response => response.json())
        .then(data => {
            sampiyonlar = data.champs;
        });
    yeniResmeGec();
};

let rastgeleKlasor;
let sampiyonlar;

function tahminKontrol() {
    const tahmin = document.getElementById("tahmin-input").value;
    if (tahmin.toLowerCase() === rastgeleKlasor.champname.toLowerCase()) {
        sayac++;
        totalScore++;
        document.getElementById("sayac").textContent = sayac;
        document.getElementById("total-score").textContent = totalScore;
        yeniResmeGec();

        // Eğer tüm ayaklar bilindiğinde
        if (totalScore === MAX_AYAK_SAYISI) {
            // Uyarı göster
            alert("Tebrikler! Tüm ayakları doğru tahmin ettiniz!");
        }
    } else {
        sayac++;
        if (sayac === 3) {
            document.getElementById("game-over-screen").style.display = "block";
            document.getElementById("final-score").textContent = totalScore;
            document.getElementById("tahmin-et-btn").style.display = "none"; // Oyun kaybedildiğinde Tahmin Et butonunu gizle
            document.getElementById("sayac").style.display = "none"; // Oyun kaybedildiğinde kalan hak sayacını gizle
            document.getElementById("total-score").style.display = "none";
        } else {
            const kalanHak = 3 - sayac; // Kalan hakkı hesapla
            document.getElementById("sayac").textContent = "kalan hakkınız " + kalanHak; // Kalan hakkı ekrana yazdır
            document.getElementById("total-score").textContent = "doğru sayısı " + totalScore;
        }

        const numberOfImages = Math.floor(Math.random() * 11) + 3;
        for (let i = 0; i < numberOfImages; i++) {
            const enemymissImg = document.createElement("img");
            enemymissImg.src = "enemymiss.png";
            enemymissImg.style.position = "fixed";
            enemymissImg.style.left = Math.floor(Math.random() * (window.innerWidth - 50)) + "px";
            enemymissImg.style.top = Math.floor(Math.random() * (window.innerHeight - 50)) + "px";
            enemymissImg.style.width = "50px";
            document.body.appendChild(enemymissImg);

            setTimeout(function() {
                enemymissImg.remove();
            }, 1000);
        }

        for (let i = 0; i < 2; i++) {
            setTimeout(function() {
                const audio = new Audio('miss.mp3');
                audio.play();
            }, i * 1000);
        }
    }

    if (sayac >= 3) {
        document.getElementById("tahmin-input").disabled = true; // Tahmin etme inputunu devre dışı bırak
    }

    document.getElementById("tahmin-input").value = "";
}


function yeniResmeGec() {
    fetch('veri.json')
        .then(response => response.json())
        .then(data => {
            const klasorler = data.champs;
            rastgeleKlasor = klasorler[Math.floor(Math.random() * klasorler.length)];
            const rastgeleResim = rastgeleKlasor.champimages[Math.floor(Math.random() * rastgeleKlasor.champimages.length)];

            console.log("Rastgele Seçilen Klasör:", rastgeleKlasor.champname);
            console.log("Rastgele Seçilen Resim:", rastgeleResim);

            const resimEkrani = document.getElementById("resim-ekrani");
            resimEkrani.src = `champs/${rastgeleKlasor.champname}/${rastgeleResim}`;
        });
}

function filtrele() {
    const harf = document.getElementById("tahmin-input").value.toLowerCase();
    const filtrelenmisSampiyonlar = sampiyonlar.filter(sampiyon => sampiyon.champname.toLowerCase().startsWith(harf));
    const sampiyonListesi = document.getElementById("champion-suggestions");
    sampiyonListesi.innerHTML = "";
    filtrelenmisSampiyonlar.forEach(sampiyon => {
        const div = document.createElement("div");
        const img = document.createElement("img");
        const span = document.createElement("span");
        img.src = `tiles/${sampiyon.champname}.png`;
        img.alt = sampiyon.champname;
        span.textContent = sampiyon.champname;
        div.appendChild(img);
        div.appendChild(span);
        sampiyonListesi.appendChild(div);
    });
}
