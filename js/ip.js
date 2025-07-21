fetch('https://api.ipify.org?format=json')
.then(response => response.json())
.then(data => {
    const userIP = data.ip;
    // Belirli IP adresini kontrol et
    if (userIP === '2a00:1d36:5c88:5600:5160:9bf7:1590:f82') {
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