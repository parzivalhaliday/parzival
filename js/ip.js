fetch('https://api.ipify.org?format=json')
.then(response => response.json())
.then(data => {
    const userIP = data.ip;
    // Belirli IP adresini kontrol et
    if (userIP === '88.241.86.109') {
        // Özel sayfaya yönlendir
        window.location.href = 'ipozel.html';
    }
})
.catch(error => {
    console.error('IP bilgisi alınamadı:', error);
});