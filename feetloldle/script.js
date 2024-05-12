const championDataURL = "https://ddragon.leagueoflegends.com/cdn/14.9.1/data/en_US/champion.json";
let counter = 0;
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
        console.error("Error:", error);
    }
}

document.getElementById("guess-input").addEventListener("input", function() {
    const guess = this.value;
    if (guess.length > 0) {
        createChampionList(guess); 
    } else {
        const championSuggestions = document.getElementById("champion-suggestions");
        championSuggestions.innerHTML = ""; 
    }
});


document.getElementById("guess-et-btn").addEventListener("click", guessKontrol);

document.getElementById("champion-suggestions").addEventListener("click", function(event) {
    if (event.target.tagName === "DIV") {
        const championName = event.target.querySelector("span").textContent;
        document.getElementById("guess-input").value = championName;
    }
});

document.getElementById("tweet-btn").addEventListener("click", function() {
    const scoreText = document.getElementById("final-score").textContent;
    const tweetText = `I scored ${scoreText} points in Feet LOL DLE 🎉`;
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

function guessKontrol() {
    const guess = document.getElementById("guess-input").value;
    if (guess.toLowerCase() === rastgeleKlasor.champname.toLowerCase()) {
        counter++;
        totalScore++;
        document.getElementById("counter").textContent = counter;
        document.getElementById("total-score").textContent = totalScore;
        yeniResmeGec();

        if (totalScore === MAX_AYAK_SAYISI) {
            alert("Congratulations! You guessed all champions correctly!");
        }
    } else {
        counter++;
        if (counter === 3) {
            document.getElementById("game-over-screen").style.display = "block";
            document.getElementById("final-score").textContent = totalScore;
            document.getElementById("guess-et-btn").style.display = "none"; 
            document.getElementById("counter").style.display = "none"; 
            document.getElementById("total-score").style.display = "none";
            document.getElementById("guess-input").style.display = "none"; 
            document.getElementById("prediction-label").style.display = "none"; // Hide the prediction label
        
            const fullScreenGif = document.createElement("img");
            fullScreenGif.id = "full-screen-gif";
            fullScreenGif.src = "defeat.gif";
            fullScreenGif.alt = "Defeat";
            
            document.body.appendChild(fullScreenGif);
        
            setTimeout(() => {
                const element = document.getElementById("full-screen-gif");
                if (element) {
                    element.parentNode.removeChild(element);
                }
            }, 4500);
        }
        else {

            const kalanHak = 3 - counter; 
            document.getElementById("counter").textContent = "Remaining attempts " + kalanHak; 
            document.getElementById("total-score").textContent = "Correct count " + totalScore;
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

    if (counter >= 3) {
        document.getElementById("guess-input").disabled = true; 
    }

    document.getElementById("guess-input").value = "";
}


function yeniResmeGec() {
    fetch('veri.json')
        .then(response => response.json())
        .then(data => {
            const klasorler = data.champs;
            rastgeleKlasor = klasorler[Math.floor(Math.random() * klasorler.length)];
            const rastgeleResim = rastgeleKlasor.champimages[Math.floor(Math.random() * rastgeleKlasor.champimages.length)];

            console.log("Randomly Selected Folder:", rastgeleKlasor.champname);
            console.log("Randomly Selected Image:", rastgeleResim);

            const resimEkrani = document.getElementById("image-screen");
            resimEkrani.src = `champs/${rastgeleKlasor.champname}/${rastgeleResim}`;
        });
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
