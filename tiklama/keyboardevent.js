// Sağ tıklama olayını engellemek için
document.addEventListener('contextmenu', function (e) {
    e.preventDefault();
});

// F12 tuşuna basmayı engellemek için
document.addEventListener('keydown', function (e) {
    if ((e.key === 'F12' || e.keyCode === 123) || (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.keyCode === 73))) {
        e.preventDefault();
    }
});
document.addEventListener('keydown', function (e) {
    if (e.ctrlKey && e.shiftKey) {
        e.preventDefault();
    }
});

document.addEventListener('keydown', function (e) {
    if (e.ctrlKey && (e.key === 's' || e.keyCode === 83)) {
        e.preventDefault();
    }
});

document.addEventListener('keydown', function (e) {
    if (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.keyCode === 73)) {
        e.preventDefault();
    }
});


document.addEventListener('selectstart', function (e) {
    e.preventDefault();
});



