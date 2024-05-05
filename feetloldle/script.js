const championDataURL = "https://ddragon.leagueoflegends.com/cdn/14.9.1/data/en_US/champion.json";

let sayac = 0; 

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

      const imageURL = `${imagePath}${championImageName}.png`;
      
      championImg.src = imageURL;
      championSpan.textContent = championName;

      championDiv.appendChild(championImg);
      championDiv.appendChild(championSpan);
      listContainer.appendChild(championDiv);
    });
  } catch (error) {
    console.error("hata", error);
  }
}

document.getElementById("tahmin-input").addEventListener("input", function() {
  createChampionList(this.value);
});

document.getElementById("tahmin-et-btn").addEventListener("click", tahminKontrol);

document.getElementById("champion-suggestions").addEventListener("click", function(event) {
  if (event.target.tagName === "DIV") {
    const championName = event.target.querySelector("span").textContent;
    document.getElementById("tahmin-input").value = championName;
  }
});


window.onload = function() {
  createChampionList();
};

let rastgeleKlasor;
let sampiyonlar;

function tahminKontrol() {
  const tahmin = document.getElementById("tahmin-input").value;
  if (tahmin.toLowerCase() === rastgeleKlasor.isim.toLowerCase()) {
      sayac++; 
      document.getElementById("sayac").textContent = sayac; 
      yeniResmeGec();
  } else {
      sayac = 0; 
      document.getElementById("sayac").textContent = sayac; // Sayaç değerini güncelle
  }
  // Tahmin yapıldıktan sonra input alanını temizle
  document.getElementById("tahmin-input").value = "";
}

function yeniResmeGec() {
  fetch('veri.json')
      .then(response => response.json())
      .then(data => {
          const klasorler = data.champs;
          rastgeleKlasor = klasorler[Math.floor(Math.random() * klasorler.length)];
          const rastgeleResim = rastgeleKlasor.resimler[Math.floor(Math.random() * rastgeleKlasor.resimler.length)];

          console.log("Rastgele Seçilen Klasör:", rastgeleKlasor.isim);
          console.log("Rastgele Seçilen Resim:", rastgeleResim);

          const resimEkrani = document.getElementById("resim-ekrani");
          resimEkrani.src = `champs/${rastgeleKlasor.isim}/${rastgeleResim}`;
      });
}

function filtrele() {
  const harf = document.getElementById("tahmin-input").value.toLowerCase();
  const filtrelenmisSampiyonlar = sampiyonlar.filter(sampiyon => sampiyon.isim.toLowerCase().startsWith(harf));
  const sampiyonListesi = document.getElementById("champion-suggestions");
  sampiyonListesi.innerHTML = "";
  filtrelenmisSampiyonlar.forEach(sampiyon => {
      const div = document.createElement("div");
      const img = document.createElement("img");
      const span = document.createElement("span");
      img.src = `tiles/${sampiyon.isim}.png`; // Resmin yolu değiştirildi
      img.alt = sampiyon.isim;
      span.textContent = sampiyon.isim;
      div.appendChild(img);
      div.appendChild(span);
      sampiyonListesi.appendChild(div);
  });
}

window.onload = function() {
  fetch('veri.json')
      .then(response => response.json())
      .then(data => {
          sampiyonlar = data.champs;
      });
  yeniResmeGec();
};
