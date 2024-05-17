const championDataURL = "https://ddragon.leagueoflegends.com/cdn/14.9.1/data/en_US/champion.json";
let counter = 0;
let totalScore = 0;
let sampiyonlar;
let rastgeleKlasor;

async function createChampionList(filter = "", count = 3) {
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
        console.error("Error:", error);
    }
}

document.getElementById("guess-input").addEventListener("input", function() {
    const guess = this.value;
    if (guess.length > 0) {
        createChampionList(guess);
    } else {
        document.getElementById("champion-suggestions").innerHTML = "";
    }
});

document.getElementById("guess-et-btn").addEventListener("click", guessKontrol);

document.getElementById("champion-suggestions").addEventListener("click", function(event) {
    if (event.target.tagName === "SPAN" || event.target.tagName === "IMG") {
        const championName = event.target.closest("div").querySelector("span").textContent;
        document.getElementById("guess-input").value = championName;
    }
});

document.getElementById("tweet-btn").addEventListener("click", function() {
    const scoreText = document.getElementById("final-score").textContent;
    const tweetText = `I scored ${scoreText} points in Feet LOL DLE 🎉`;
    const tweetURL = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`;
    window.open(tweetURL, "_blank", "width=600,height=300");
});

window.onload = async function() {
    try {
        const response = await fetch('veri.json');
        const data = await response.json();
        sampiyonlar = data.champs;
        yeniResmeGec();
    } catch (error) {
        console.error("Error:", error);
    }

    document.getElementById("guess-input").addEventListener("keyup", function(event) {
        if (event.key === "Enter") {
            guessKontrol();
        }
    });
};

async function guessKontrol() {
    const guess = document.getElementById("guess-input").value;
    if (guess.toLowerCase() === rastgeleKlasor.champname.toLowerCase()) {
        totalScore++;
        await yeniResmeGec();
        const MAX_AYAK_SAYISI = 303;
        if (totalScore === MAX_AYAK_SAYISI) {
            alert("ayak uzmanı");
        }
    } else {
        counter++;
        if (counter === 3) {
            document.getElementById("game-over-screen").style.display = "block";
            document.getElementById("final-score").textContent = totalScore;
            
            // Oyun bittiğinde rastgele seçilen karakterin resmini ve adını göster
            const imageURL = `tiles/${rastgeleKlasor.champname}.png`;
            document.getElementById("game-over-image").src = imageURL;
            document.getElementById("game-over-champion-name").textContent = rastgeleKlasor.champname;
            
            // Gizlenecek elementleri belirleyelim
            document.getElementById("guess-et-btn").style.display = "none";
            document.getElementById("counter").style.display = "none";
            document.getElementById("total-score").style.display = "none";
            document.getElementById("guess-input").style.display = "none";
            document.getElementById("prediction-label").style.display = "none";
            document.getElementById("champion-suggestions").style.display = "none"; // Champion suggestions gizle

            const fullScreenGif = document.createElement("img");
            fullScreenGif.id = "full-screen-gif";
            fullScreenGif.src = "defeat.gif";
            fullScreenGif.alt = "Defeat";

            document.body.appendChild(fullScreenGif);

            const audio = new Audio('defeat.mp3');
            audio.play();

            setTimeout(() => {
                const gifElement = document.getElementById("full-screen-gif");
                if (gifElement) {
                    gifElement.parentNode.removeChild(gifElement);
                }
                audio.pause();
            }, 3000);
        }
    }

    const remainingAttempts = 3 - counter;
    document.getElementById("counter").textContent = "Remaining attempts " + remainingAttempts;
    document.getElementById("total-score").textContent = "Total Score: " + totalScore;

    if (counter >= 3) {
        document.getElementById("guess-input").disabled = true;
    }

    document.getElementById("guess-input").value = "";
}



async function yeniResmeGec() {
    try {
        const response = await fetch('veri.json');
        const data = await response.json();
        const klasorler = data.champs;
        rastgeleKlasor = klasorler[Math.floor(Math.random() * klasorler.length)];
        const rastgeleResim = rastgeleKlasor.champimages[Math.floor(Math.random() * rastgeleKlasor.champimages.length)];

        console.log("Randomly Selected Folder:", rastgeleKlasor.champname);
        console.log("Randomly Selected Image:", rastgeleResim);

        const resimEkrani = document.getElementById("image-screen");
        resimEkrani.src = `champs/${rastgeleKlasor.champname}/${rastgeleResim}`;
    } catch (error) {
        console.error("Error:", error);
    }
}

function filtrele() {
    const harf = document.getElementById("guess-input").value.toLowerCase();
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
