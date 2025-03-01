const apiKey = 'bc9ee4dc966affd2c33c7358511d1510'; // API anahtarınızı buraya ekleyin
const city = 'arnavutköy'; // Hava durumu için şehir

// DOM elemanları
const weatherCondition = document.getElementById('weather-condition');
const temperatureElement = document.getElementById('temperature');
const feelsLikeElement = document.getElementById('feels-like');
const humidityElement = document.getElementById('humidity');
const windElement = document.getElementById('wind');
const lastUpdatedElement = document.getElementById('last-updated');
const loadingWeatherElement = document.getElementById('loading-weather');

// Hava durumu verilerini getir
async function getWeatherData() {
    loadingWeatherElement.style.display = 'flex';
    
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`);
        const data = await response.json();
        
        if (data.cod === 200) {
            updateWeatherUI(data);
        } else {
            alert('Hava durumu verileri alınamadı: ' + data.message);
        }
    } catch (error) {
        alert('Hava durumu verileri alınamadı: ' + error.message);
    } finally {
        loadingWeatherElement.style.display = 'none';
    }
}

// UI'ı güncelle
function updateWeatherUI(data) {
    const temp = kelvinToCelsius(data.main.temp);
    const feelsLike = kelvinToCelsius(data.main.feels_like);
    const humidity = data.main.humidity;
    const windSpeed = data.wind.speed;

    // Yükleniyor metnini kaldır
    weatherCondition.textContent = ''; // Yükleniyor metnini temizle

    // Boş alanları temizle
    temperatureElement.textContent = `Sıcaklık: ${temp}°C`;
    feelsLikeElement.textContent = `Hissedilen: ${feelsLike}°C`;
    humidityElement.textContent = `Nem: ${humidity}%`;
    windElement.textContent = `Rüzgar: ${windSpeed} m/s`;

    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    lastUpdatedElement.textContent = `Son güncelleme: ${hours}:${minutes}`;
}

// Kelvin'i Celsius'a çevir
function kelvinToCelsius(kelvin) {
    return Math.round(kelvin - 273.15);
}

// Sayfa yüklendiğinde hava durumunu getir
window.addEventListener('load', getWeatherData);
