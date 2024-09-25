async function getSummonerRankDetails() {
    const summoners = [
        { id: '3sAlurawaR3ygOefMXtW66gD4GjjVuTnE_lAf3bE8U0KPwM', name: 'Panky', img: 'players/panky.png', profileUrl: 'https://www.op.gg/summoners/euw/chopwoodcarywatr-EUW', streamUrl: 'https://player.kick.com/panky' },
        { id: 'HyUqgd0eUSOmeG_A7CMGcOhogHJLoGf7gwrWJgz3oncr9Zs', name: 'Elwind', img: 'players/elwind.png', profileUrl: 'https://www.op.gg/summoners/euw/elwind-euw', streamUrl: 'https://player.kick.com/elwind' },
        { id: 'XHCVv6l8f_FUiSK2-syr7GUMIHKrAsTAth1E2A3H8rby8r8', name: 'Revanch', img: 'players/revanch.png', profileUrl: 'https://www.op.gg/summoners/euw/Revanche-rev', streamUrl: 'https://player.kick.com/revanch' },
        { id: 'u4mDD2yQ9wZ5f6PwFWL6VtakpnJYBlnDyOQAVqyz19RV4Ntku4M1a1feJQ', name: 'Stansfield', img: 'players/stans.png', profileUrl: 'https://www.op.gg/summoners/euw/Mastersfield-EUW', streamUrl: 'https://player.kick.com/stansfield' },
        { id: 'DDfWi-1ZP7qEef99lfqUh7ZRU-JpCVEfv7wS7QJksF_Tg8g', name: 'Zeitnot', img: 'players/zeitnot.png', profileUrl: 'https://www.op.gg/summoners/euw/zeitnot-7149', streamUrl: 'https://player.kick.com/zeitnot' },
        { id: '_zynYKg5Fo5-cOXog340aHxacIhHuAMj-jx1LnPhV2Hgy763czywBQQ12A', name: 'Çerez', img: 'players/lynxcerez.png', profileUrl: 'https://www.op.gg/summoners/euw/zeitnotsmurf', streamUrl: 'https://player.kick.com/zeitnot' }
    ];
    const apiKey = 'RGAPI-6a75f092-34cc-47a7-81ad-3e04a682965b'; // API key
    const summonerRankData = [];

    // Rank to Image Mapping
    const rankImageMap = {
        'CHALLENGER I': 'challenger.webp',
        'GRANDMASTER I': 'grandmaster.webp',
        'MASTER I': 'master.webp',
        'EMERALD': 'emerald.webp',
        'DIAMOND I': 'diamond1.webp',
        'DIAMOND II': 'diamond2.webp',
        'DIAMOND III': 'diamond3.webp',
        'DIAMOND IV': 'diamond4.webp',
        'PLATINUM': 'platinum.webp',
        'GOLD': 'gold.webp',
        'SILVER': 'silver.webp',
        'BRONZE': 'bronze.webp',
        'IRON': 'iron.webp'
    };

    try {
        for (let summoner of summoners) {
            const url = `https://euw1.api.riotgames.com/lol/league/v4/entries/by-summoner/${summoner.id}?api_key=${apiKey}`;
            const response = await fetch(url);
            const data = await response.json();

            if (data.length > 0) {
                const soloQueueData = data.find(queue => queue.queueType === 'RANKED_SOLO_5x5');
                if (soloQueueData) {
                    const tierText = `${soloQueueData.tier} ${soloQueueData.rank}`;
                    const wins = soloQueueData.wins;
                    const losses = soloQueueData.losses;
                    const winrate = ((wins / (wins + losses)) * 100).toFixed(2);

                    summonerRankData.push({
                        name: summoner.name,
                        tier: tierText,
                        leaguePoints: soloQueueData.leaguePoints,
                        winrate: winrate,
                        wins: wins,
                        losses: losses,
                        img: summoner.img,
                        profileUrl: summoner.profileUrl,
                        streamUrl: summoner.streamUrl
                    });
                }
            }
        }

        // Sort and display the rank data
        summonerRankData.sort((a, b) => {
            const tierOrder = {
                'CHALLENGER': 1,
                'GRANDMASTER': 2,
                'MASTER': 3,
                'EMERALD': 4,
                'DIAMOND': 5,
                'DIAMOND I': 6,
                'DIAMOND II': 7,
                'DIAMOND III': 8,
                'DIAMOND IV': 9,
                'PLATINUM': 10,
                'GOLD': 11,
                'SILVER': 12,
                'BRONZE': 13,
                'IRON': 14
            };

            const tierA = a.tier;
            const tierB = b.tier;

            if (tierOrder[tierA] !== tierOrder[tierB]) {
                return tierOrder[tierA] - tierOrder[tierB];
            } else {
                return b.leaguePoints - a.leaguePoints; // Sort by LP if tiers are equal
            }
        });

        const rankDetailsElement = document.getElementById('rankDetails');
        rankDetailsElement.innerHTML = summonerRankData.map(summoner => {
            const tierKey = summoner.tier.split(' ')[0]; // e.g., 'DIAMOND'
            const rankKey = summoner.tier.split(' ')[1]; // e.g., 'IV'
            const rankImage = rankImageMap[tierKey + (rankKey ? ' ' + rankKey : '')] || 'default.webp'; // Default image if not found
            
            return `
            <div class="rank-card">
                <div class="profile-img-container">
                    <img src="${summoner.img}" alt="${summoner.name}" class="profile-img">
                </div>
                <div class="rank-info">
                    <div class="name-and-rank">
                        <div class="name"><strong>${summoner.name}</strong></div>
                        <img src="ranks/${rankImage}" alt="${summoner.tier}" class="rank-badge-img">
                        <div class="league-points">${summoner.leaguePoints} LP</div>
                    </div>
                    <div class="lp-and-profile">
                        <div class="winrate">${summoner.winrate}% Winrate</div>
                        <div class="wins-losses">(${summoner.wins}W / ${summoner.losses}L)</div>
                        <a href="${summoner.profileUrl}" class="profile-link" target="_blank">
                            <img src="opgg-icon.png" alt="OP.GG" class="opgg-icon">
                        </a>
                    </div>
                </div>
            </div>
            <iframe class="stream-frame" src="${summoner.streamUrl}" frameborder="0" allowfullscreen="true"></iframe>
            `;
        }).join('');
        
        // Event handling for card clicks
        const cards = document.querySelectorAll('.rank-card');
        cards.forEach(card => {
            card.addEventListener('click', function (event) {
                if (event.target.classList.contains('opgg-icon') || event.target.closest('.profile-link')) {
                    return;
                }

                const isActive = this.classList.contains('active');
                cards.forEach(c => {
                    c.classList.remove('active');
                    const iframe = c.nextElementSibling;
                    if (iframe) {
                        iframe.style.height = '0';
                    }
                });
                
                if (!isActive) {
                    this.classList.add('active');
                    const iframe = this.nextElementSibling;
                    if (iframe) {
                        iframe.style.height = '700px';
                    }
                }
            });
        });

    } catch (error) {
        document.getElementById('rankDetails').innerText = 'Bir hata oluştu.';
        console.error(error);
    }
}

window.onload = getSummonerRankDetails;

// Refresh the page every 100 seconds
setInterval(function () {
    window.location.reload();
}, 100000);
