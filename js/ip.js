fetch('https://api.ipify.org?format=json')
.then(response => response.json())
.then(data => {
    const userIP = data.ip;
    // Belirli IP adresini kontrol et
    if (userIP === '88.241.86.109') {
        // Özel sayfaya yönlendir
        window.location.href = 'ipozel.html';
    } else if (userIP === '95.70.171.32') {
        // İkinci özel IP için yönlendirme
        window.location.href = 'ipozel2.html';
    }
})
.catch(error => {
    console.error('IP bilgisi alınamadı:', error);
});