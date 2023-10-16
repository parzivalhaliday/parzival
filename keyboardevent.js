// Sağ tıklama olayını engellemek için
document.addEventListener('contextmenu', function (e) {
    e.preventDefault();
});

// F12 tuşuna basmayı engellemek için
document.addEventListener('keydown', function (e) {
    if (e.key === 'F12' || e.keyCode === 123) {
        e.preventDefault();
    }
});

document.addEventListener('selectstart', function (e) {
    e.preventDefault();
});


