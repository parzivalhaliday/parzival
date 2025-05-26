// GitHub modülü
const githubModule = (function() {
    // Özel değişkenler
    const githubUsername = 'parzivalhaliday';
    
    // Modül başlatma
    function init() {
        // GitHub API'den kullanıcı bilgilerini ve repolarını çek
        fetchGitHubData(githubUsername);
        
        return this;
    }
    
    // GitHub API'den kullanıcı verilerini çekme fonksiyonu
    async function fetchGitHubData(username) {
        try {
            console.log(`GitHub verisi alınıyor: ${username}`);
            
            // Local Storage'dan önbelleklenmiş verileri kontrol et
            const cachedData = localStorage.getItem('github_data');
            const cachedTime = localStorage.getItem('github_data_time');
            
            // Eğer önbellekte veri varsa ve 24 saatten daha yeni ise, onu kullan
            if (cachedData && cachedTime) {
                const timeDiff = Date.now() - parseInt(cachedTime);
                // 24 saat = 86400000 milisaniye
                if (timeDiff < 86400000) {
                    console.log('Önbellekteki GitHub verisi kullanılıyor');
                    const data = JSON.parse(cachedData);
                    updateGitHubCard(data.user, data.repos);
                    return;
                }
            }
            
            // GitHub API'den kullanıcı bilgilerini al
            const userResponse = await fetch(`https://api.github.com/users/${username}`);
            
            if (!userResponse.ok) {
                throw new Error(`GitHub kullanıcı bilgileri alınamadı: ${userResponse.status}`);
            }
            
            const userData = await userResponse.json();
            console.log('GitHub kullanıcı verisi:', userData);
            
            // GitHub API'den kullanıcının repolarını al - 3 repo ile sınırla
            const reposResponse = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=3`);
            
            if (!reposResponse.ok) {
                throw new Error(`GitHub repo bilgileri alınamadı: ${reposResponse.status}`);
            }
            
            const reposData = await reposResponse.json();
            console.log('GitHub repo verisi:', reposData);
            
            // Verileri Local Storage'a kaydet
            localStorage.setItem('github_data', JSON.stringify({
                user: userData,
                repos: reposData
            }));
            localStorage.setItem('github_data_time', Date.now().toString());
            
            // GitHub kartını güncelle
            updateGitHubCard(userData, reposData);
            
        } catch (error) {
            console.error('GitHub API hatası:', error);
            
            // Önbellekte veri var mı kontrol et
            const cachedData = localStorage.getItem('github_data');
            if (cachedData) {
                console.log('Hata oluştu, önbellekteki GitHub verisi kullanılıyor');
                const data = JSON.parse(cachedData);
                updateGitHubCard(data.user, data.repos);
                return;
            }
            
            // Hata durumunda varsayılan içerik göster
            const githubCard = document.querySelector('.github-card');
            const githubHeader = document.querySelector('.github-header');
            const githubContent = document.querySelector('.github-content');
            
            if (githubHeader) {
                githubHeader.innerHTML = `<span>GITHUB</span>`;
            }
            
            if (githubContent) {
                githubContent.innerHTML = `
                    <p style="text-align: center; padding: 20px;">Check out my GitHub profile for projects and contributions</p>
                    <a href="https://github.com/${username}" target="_blank" class="github-profile-link">
                        <i class="fab fa-github"></i> Visit GitHub Profile
                    </a>
                `;
            }
            
            // GitHub kartına tıklandığında profil sayfasına yönlendir
            if (githubCard) {
                githubCard.onclick = function(e) {
                    // Eğer tıklanan element bir link ise, normal davranışı devam ettir
                    if (e.target.tagName === 'A' || e.target.parentElement.tagName === 'A') {
                        return;
                    }
                    
                    // Değilse, GitHub profil sayfasına yönlendir
                    window.open(`https://github.com/${username}`, '_blank');
                };
                
                // Kartın tıklanabilir olduğunu belirtmek için stil ekle
                githubCard.style.cursor = 'pointer';
            }
        }
    }
    
    // GitHub kartını güncelleme fonksiyonu
    function updateGitHubCard(user, repos) {
        const githubCard = document.querySelector('.github-card');
        const githubHeader = document.querySelector('.github-header');
        const githubContent = document.querySelector('.github-content');
        
        // Kart başlığını güncelle
        if (githubHeader) {
            githubHeader.innerHTML = `
                <span>GITHUB</span>
                <span style="font-size: 0.8rem; opacity: 0.8;">${user.public_repos} repos · ${user.followers} followers</span>
            `;
        }
        
        // Kart içeriğini güncelle
        if (githubContent) {
            // Repo listesi oluştur
            let repoHTML = '<div class="repo-list">';
            
            repos.forEach(repo => {
                // Repo dili için renk belirle
                const langColor = repo.language === 'JavaScript' ? '#f1e05a' : 
                                 repo.language === 'HTML' ? '#e34c26' : 
                                 repo.language === 'CSS' ? '#563d7c' : 
                                 repo.language === 'Python' ? '#3572A5' : '#858585';
                
                repoHTML += `
                    <div class="repo-item">
                        <a href="${repo.html_url}" target="_blank" class="repo-name">${repo.name}</a>
                        <div class="repo-details">
                            ${repo.language ? 
                                `<span class="repo-language">
                                    <span class="language-color" style="background-color: ${langColor}"></span>
                                    ${repo.language}
                                </span>` : ''}
                            <span class="repo-stars">
                                <i class="far fa-star"></i> ${repo.stargazers_count}
                            </span>
                            <span class="repo-forks">
                                <i class="fas fa-code-branch"></i> ${repo.forks_count}
                            </span>
                        </div>
                        ${repo.description ? `<div class="repo-description">${repo.description}</div>` : ''}
                    </div>
                `;
            });
            
            repoHTML += '</div>';
            
            // GitHub profil linki ekle
            repoHTML += `
                <a href="https://github.com/${githubUsername}" target="_blank" class="github-profile-link">
                    <i class="fab fa-github"></i> Tüm projeleri gör
                </a>
            `;
            
            githubContent.innerHTML = repoHTML;
        }
        
        // GitHub kartına tıklandığında profil sayfasına yönlendir
        githubCard.onclick = function(e) {
            // Eğer tıklanan element bir link ise, normal davranışı devam ettir
            if (e.target.tagName === 'A' || e.target.parentElement.tagName === 'A') {
                return;
            }
            
            // Değilse, GitHub profil sayfasına yönlendir
            window.open(`https://github.com/${githubUsername}`, '_blank');
        };
        
        // Kartın tıklanabilir olduğunu belirtmek için stil ekle
        githubCard.style.cursor = 'pointer';
    }

    // Public API
    return {
        init: init
    };

})(); 