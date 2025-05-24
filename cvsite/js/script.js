// Sayfa yüklendiğinde çalışacak kodlar
document.addEventListener('DOMContentLoaded', function() {
    console.log('Sayfa yüklendi');
    
    // Sosyal medya linklerine tıklandığında yeni sekmede açılması için
    const socialLinks = document.querySelectorAll('.social-links a');
    
    socialLinks.forEach(link => {
        link.setAttribute('target', '_blank');
        link.setAttribute('rel', 'noopener noreferrer');
    });

    // GitHub kullanıcı adı
    const githubUsername = 'parzivalhaliday';
    
    // GitHub API'den kullanıcı bilgilerini ve repolarını çek
    fetchGitHubData(githubUsername);
    
    // Saati gerçek zamanlı olarak güncelleme
    function updateTime() {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const timeElement = document.getElementById('current-time');
        
        if (timeElement) {
            timeElement.textContent = `${hours}:${minutes}`;
        }
    }
    
    // Sayfa yüklendiğinde saati göster
    updateTime();
    
    // Her saniye saati güncelle
    setInterval(updateTime, 1000);

    // Tema değiştirme
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.querySelector('.theme-icon');
    
    // Kullanıcının tema tercihini localStorage'dan al
    const savedTheme = localStorage.getItem('theme');
    
    // Eğer daha önce bir tema seçildiyse, onu uygula
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
        updateThemeIcon(savedTheme);
    }
    
    // Tema değiştirme butonuna tıklandığında
    themeToggle.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        // Yeni temayı uygula
        document.documentElement.setAttribute('data-theme', newTheme);
        
        // Tema tercihini localStorage'a kaydet
        localStorage.setItem('theme', newTheme);
        
        // Tema ikonunu güncelle
        updateThemeIcon(newTheme);
    });
    
    // Tema ikonunu güncelleme fonksiyonu
    function updateThemeIcon(theme) {
        if (theme === 'light') {
            themeIcon.src = 'images/dark.svg';
            themeIcon.alt = 'Dark mode';
        } else {
            themeIcon.src = 'images/light.svg';
            themeIcon.alt = 'Light mode';
        }
    }

    // GitHub API'den kullanıcı verilerini çekme fonksiyonu
    async function fetchGitHubData(username) {
        try {
            console.log(`GitHub verisi alınıyor: ${username}`);
            
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
            
            // GitHub kartını güncelle
            updateGitHubCard(userData, reposData);
            
        } catch (error) {
            console.error('GitHub API hatası:', error);
            document.querySelector('.github-content').textContent = 'GitHub verileri yüklenemedi';
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

    // Hava durumu fonksiyonları
    const apiKey = 'bc9ee4dc966affd2c33c7358511d1510';
    const city = 'Istanbul'; // Daha büyük ve kesin olan bir şehir adı kullanalım
    const weatherIconElement = document.getElementById('weather-icon');
    const weatherDescElement = document.getElementById('weather-description');
    const timeCardElement = document.querySelector('.time-card');
    const weatherAnimationElement = document.querySelector('.weather-animation');

    // Hava durumu verilerini getir
    async function getWeatherData() {
        try {
            console.log(`Hava durumu verisi alınıyor: ${city}`);
            
            // API URL'ini oluştur ve URL kodlamasını kullan
            const encodedCity = encodeURIComponent(city);
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodedCity}&appid=${apiKey}&lang=en&units=metric`;
            
            console.log(`API URL: ${url}`);
            
            const response = await fetch(url);
            
            console.log(`API yanıt durumu: ${response.status}`);
            
            if (!response.ok) {
                const errorData = await response.json();
                console.error('API Hata detayları:', errorData);
                throw new Error(`Hava durumu verileri alınamadı: ${response.status} ${response.statusText}`);
            }
            
            const data = await response.json();
            console.log('API yanıtı:', data);
            
            updateWeatherUI(data);
        } catch (error) {
            console.error('Hava durumu hatası:', error);
            weatherDescElement.textContent = 'Weather unavailable';
            
            // Varsayılan bir hava durumu göster
            setDefaultWeather();
        }
    }

    // Varsayılan hava durumu göster
    function setDefaultWeather() {
        // Varsayılan olarak açık hava göster
        weatherIconElement.className = 'fas';
        weatherIconElement.classList.add('fa-sun');
        setWeatherBackground('Clear');
    }

    // Hava durumu arayüzünü güncelle
    function updateWeatherUI(data) {
        const weatherMain = data.weather[0].main;
        const temp = Math.round(data.main.temp);
        
        console.log(`Hava durumu: ${weatherMain}, Sıcaklık: ${temp}°C`);
        
        // Hava durumu açıklamasını İngilizce ve daha sade olarak güncelle
        weatherDescElement.textContent = `${temp}°C`;
        
        // Hava durumuna göre ikonu ayarla
        setWeatherIcon(weatherMain);
        
        // Hava durumuna göre saat kartının arka planını ayarla
        setWeatherBackground(weatherMain);
        
        // Hava durumuna göre animasyonu ayarla
        setWeatherAnimation(weatherMain);
    }

    // Hava durumuna göre ikonu ayarla
    function setWeatherIcon(weatherMain) {
        // Önce mevcut sınıfları temizle
        weatherIconElement.className = 'fas';
        
        // Hava durumuna göre ikon sınıfı ekle
        switch(weatherMain) {
            case 'Clear':
                weatherIconElement.classList.add('fa-sun');
                break;
            case 'Clouds':
                weatherIconElement.classList.add('fa-cloud');
                break;
            case 'Rain':
            case 'Drizzle':
                weatherIconElement.classList.add('fa-cloud-rain');
                break;
            case 'Snow':
                weatherIconElement.classList.add('fa-snowflake');
                break;
            case 'Thunderstorm':
                weatherIconElement.classList.add('fa-bolt');
                break;
            case 'Fog':
            case 'Mist':
                weatherIconElement.classList.add('fa-smog');
                break;
            default:
                weatherIconElement.classList.add('fa-cloud-sun');
        }
    }

    // Hava durumuna göre arka plan ayarla
    function setWeatherBackground(weatherMain) {
        // Önce tüm sınıfları temizle
        timeCardElement.classList.remove('weather-clear', 'weather-clouds', 'weather-rain', 'weather-snow', 'weather-thunderstorm', 'weather-fog');
        
        // Hava durumuna göre sınıf ekle
        switch(weatherMain) {
            case 'Clear':
                timeCardElement.classList.add('weather-clear');
                break;
            case 'Clouds':
                timeCardElement.classList.add('weather-clouds');
                break;
            case 'Rain':
            case 'Drizzle':
                timeCardElement.classList.add('weather-rain');
                break;
            case 'Snow':
                timeCardElement.classList.add('weather-snow');
                break;
            case 'Thunderstorm':
                timeCardElement.classList.add('weather-thunderstorm');
                break;
            case 'Fog':
            case 'Mist':
                timeCardElement.classList.add('weather-fog');
                break;
            default:
                timeCardElement.classList.add('weather-clear');
        }
    }
    
    // Hava durumuna göre animasyon ayarla
    function setWeatherAnimation(weatherMain) {
        // Önce mevcut animasyonları temizle
        weatherAnimationElement.innerHTML = '';
        
        // Animasyon intervallerini temizle
        if (window.weatherAnimationInterval) {
            clearInterval(window.weatherAnimationInterval);
        }
        
        // Hava durumuna göre animasyon ekle
        switch(weatherMain) {
            case 'Rain':
            case 'Drizzle':
                createRainAnimation();
                break;
            case 'Snow':
                createSnowAnimation();
                break;
            case 'Thunderstorm':
                createRainAnimation();
                addThunderEffect();
                break;
        }
    }
    
    // Yağmur animasyonu oluştur
    function createRainAnimation() {
        // İlk damlaları ekle
        for (let i = 0; i < 20; i++) {
            createRaindrop();
        }
        
        // Belirli aralıklarla yeni damlalar ekle
        window.weatherAnimationInterval = setInterval(() => {
            createRaindrop();
        }, 300);
    }
    
    // Kar animasyonu oluştur
    function createSnowAnimation() {
        // İlk kar tanelerini ekle
        for (let i = 0; i < 15; i++) {
            createSnowflake();
        }
        
        // Belirli aralıklarla yeni kar taneleri ekle
        window.weatherAnimationInterval = setInterval(() => {
            createSnowflake();
        }, 500);
    }
    
    // Şimşek efekti ekle
    function addThunderEffect() {
        setInterval(() => {
            // Rastgele şimşek çak
            if (Math.random() > 0.7) {
                weatherAnimationElement.style.backgroundColor = 'rgba(255, 255, 255, 0.3)';
                setTimeout(() => {
                    weatherAnimationElement.style.backgroundColor = 'transparent';
                }, 100);
            }
        }, 2000);
    }
    
    // Yağmur damlası oluştur
    function createRaindrop() {
        const drop = document.createElement('div');
        drop.classList.add('raindrop');
        
        // Rastgele pozisyon
        const leftPos = Math.random() * 100;
        drop.style.left = `${leftPos}%`;
        
        // Rastgele düşme hızı
        const duration = Math.random() * 0.5 + 0.5; // 0.5-1 saniye arası
        drop.style.animation = `rain ${duration}s linear infinite`;
        
        weatherAnimationElement.appendChild(drop);
        
        // Belirli bir süre sonra damlayı kaldır
        setTimeout(() => {
            drop.remove();
        }, duration * 1000 * 2); // Animasyon süresinin 2 katı kadar bekle
    }
    
    // Kar tanesi oluştur
    function createSnowflake() {
        const flake = document.createElement('div');
        flake.classList.add('snowflake');
        
        // Rastgele pozisyon
        const leftPos = Math.random() * 100;
        flake.style.left = `${leftPos}%`;
        
        // Rastgele düşme hızı ve yatay hareket
        const duration = Math.random() * 3 + 2; // 2-5 saniye arası
        const horizontalMovement = Math.random() * 40 - 20; // -20px ile +20px arası
        
        flake.style.animation = `snow ${duration}s linear infinite`;
        flake.style.animationName = 'none'; // Özel animasyon için
        
        // Özel animasyon
        flake.animate([
            { transform: 'translateY(-20px) translateX(0px)' },
            { transform: `translateY(120px) translateX(${horizontalMovement}px)` }
        ], {
            duration: duration * 1000,
            iterations: Infinity
        });
        
        weatherAnimationElement.appendChild(flake);
        
        // Belirli bir süre sonra kar tanesini kaldır
        setTimeout(() => {
            flake.remove();
        }, duration * 1000 * 2); // Animasyon süresinin 2 katı kadar bekle
    }

    // Sayfa yüklendiğinde hava durumunu getir
    getWeatherData();
    
    // Her 30 dakikada bir hava durumunu güncelle
    setInterval(getWeatherData, 30 * 60 * 1000);
}); 