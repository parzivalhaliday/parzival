async function getSummonerRankDetails() {
    const summoners = [
        { id: '3sAlurawaR3ygOefMXtW66gD4GjjVuTnE_lAf3bE8U0KPwM', name: 'Panky', img: 'players/panky.png', profileUrl: 'https://www.op.gg/summoners/euw/chopwoodcarywatr-EUW', streamUrl: 'https://player.kick.com/panky' },
        { id: 'HyUqgd0eUSOmeG_A7CMGcOhogHJLoGf7gwrWJgz3oncr9Zs', name: 'Elwind', img: 'players/elwind.png', profileUrl: 'https://www.op.gg/summoners/euw/elwind-euw', streamUrl: 'https://player.kick.com/elwind' },
        { id: 'XHCVv6l8f_FUiSK2-syr7GUMIHKrAsTAth1E2A3H8rby8r8', name: 'Revanch', img: 'players/revanch.png', profileUrl: 'https://www.op.gg/summoners/euw/Revanche-rev', streamUrl: 'https://player.kick.com/revanch' },
        { id: '8xLyUWwMA7u-Ao1HFKGmrlEjBDyQd3Zv6mv9gom9aOPhxMdyOtd_sgg51Q', name: 'Stansfield', img: 'players/stans.png', profileUrl: 'https://www.op.gg/summoners/euw/lllIlIIlIIl-EUW', streamUrl: 'https://player.kick.com/stansfield' },
        { id: 'DDfWi-1ZP7qEef99lfqUh7ZRU-JpCVEfv7wS7QJksF_Tg8g', name: 'Zeitnot', img: 'players/zeitnot.png', profileUrl: 'https://www.op.gg/summoners/euw/zeitnot-7149', streamUrl: 'https://player.kick.com/zeitnot' },
        { id: '_VWMhsAQy58uoIjzqEHU0EptiHRKqwFEdEeBV9UPUrJp5k0', name: 'Fabfabulous', img: 'players/fabfab.png', profileUrl: 'https://www.op.gg/summoners/euw/FABFABFAB-EUW', streamUrl: 'https://player.kick.com/fabfabulous' },
        { id: 'QOULliyP0bO62Ykg1ZFatUqnDz1boyx_TMOdidABt9I0798', name: 'Crystal', img: 'players/crystal.png', profileUrl: 'https://www.op.gg/summoners/euw/yy%20mb%20we%2015-EUW', streamUrl: 'https://player.kick.com/crystal_lol' },
        { id: '_zynYKg5Fo5-cOXog340aHxacIhHuAMj-jx1LnPhV2Hgy763czywBQQ12A', name: 'Çerez', img: 'players/lynxcerez.png', profileUrl: 'https://www.op.gg/summoners/euw/LynxCerez-7777', streamUrl: 'https://player.kick.com/lynxcerezlol' },
        { id: 'XRkbSdzhJMda6i-_L4jKq_Fifeg80pTEaoLPG3C_DX-x1V0H', name: 'Trix', img: 'players/trix.png', profileUrl: 'https://www.op.gg/summoners/euw/Voodoo%20Style-EUW', streamUrl: 'https://player.kick.com/trixucator' }
    ];
    const apiKey = 'apikeyuslum'; 
    const summonerRankData = [];

    const rankImageMap = {
        'CHALLENGER I': 'challenger.webp',
        'GRANDMASTER I': 'grandmaster.webp',
        'MASTER I': 'master.webp',
        'DIAMOND I': 'diamond1.webp',
        'DIAMOND II': 'diamond2.webp',
        'DIAMOND III': 'diamond3.webp',
        'DIAMOND IV': 'diamond4.webp',
        'EMERALD I': 'emerald.webp',
        'EMERALD II': 'emerald.webp',
        'EMERALD III': 'emerald.webp',
        'EMERALD IV': 'emerald.webp',
        'PLATINUM I': 'platinum.webp',
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
        summonerRankData.sort((a, b) => {
            const tierOrder = {
                'CHALLENGER': 1,
                'GRANDMASTER': 2,
                'MASTER': 3,
                'DIAMOND': 4,
                'EMERALD': 5,
                'PLATINUM': 6,
                'GOLD': 7,
                'SILVER': 8,
                'BRONZE': 9,
                'IRON': 10
            };
        
            const rankOrder = {
                'I': 1,
                'II': 2,
                'III': 3,
                'IV': 4
            };
        
            // Split the tier and rank
            const [tierA, rankA] = a.tier.split(' ');
            const [tierB, rankB] = b.tier.split(' ');
        
            // Compare tiers
            if (tierOrder[tierA] !== tierOrder[tierB]) {
                return tierOrder[tierA] - tierOrder[tierB];
            } else {
                // If tiers are the same, compare ranks
                if (rankOrder[rankA] !== rankOrder[rankB]) {
                    return rankOrder[rankA] - rankOrder[rankB];
                } else {
                    // If both tier and rank are the same, compare league points
                    return b.leaguePoints - a.leaguePoints; // Sort by LP in descending order
                }
            }
        });
        const rankDetailsElement = document.getElementById('rankDetails');
        rankDetailsElement.innerHTML = summonerRankData.map(summoner => {
            const tierKey = summoner.tier.split(' ')[0];              const rankKey = summoner.tier.split(' ')[1]; 
            const rankImage = rankImageMap[tierKey + (rankKey ? ' ' + rankKey : '')] || 'default.webp'; 
            
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
            <iframe class="stream-frame" src="${summoner.streamUrl}" frameborder="0" allowfullscreen="false"></iframe>
            `;
        }).join('');
        
const cards = document.querySelectorAll('.rank-card');

cards.forEach(card => {
    card.addEventListener('click', function () {
        const isActive = card.classList.toggle('active');
        
        cards.forEach(otherCard => {
            if (otherCard !== card) {
                otherCard.classList.remove('active');
            }
        });
    });
});


    } catch (error) {
        document.getElementById('rankDetails').innerText = 'Bir hata oluştu.';
        console.error(error);
    }
}

window.onload = getSummonerRankDetails;

setInterval(function () {
    window.location.reload();
}, 100000);
