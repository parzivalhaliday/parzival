const getIP = async () => {
    const response = await fetch('https://api64.ipify.org?format=json');
    const data = await response.json();
    const ipAddress = data.ip;
    document.getElementById("ipAddress").textContent = "" + ipAddress;
};

window.onload = function() {
    getIP(); 
};
if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(function (position) {
        updateLocationInfo(position);
    });
}

function updateLocationInfo(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    document.getElementById("location").textContent = " " + latitude + ", Boylam " + longitude;
}
const language = navigator.language;
document.getElementById("language").textContent = "" + language;

if (navigator.storage && navigator.storage.estimate) {
    navigator.storage.estimate().then(function(estimate) {
        const storage = estimate.quota / (1024 * 1024 * 1024); // Convert bytes to gigabytes
        document.getElementById("storage").textContent = "" + storage.toFixed(2) + " GB";
    });
}

const screenResolution = window.screen.width + "x" + window.screen.height;
document.getElementById("screen-resolution").textContent = "" + screenResolution;

const deviceScreenSize = window.innerWidth + "x" + window.innerHeight;
document.getElementById("device-screen-size").textContent = "" + deviceScreenSize;


// Cihazın tutuluş açısını sürekli olarak güncelle
window.addEventListener("deviceorientation", function(event) {
    const orientationText = document.getElementById("oryantasyon");
    const alpha = event.alpha; // Yatay olarak cihazın hareket yönü (derece cinsinden)
    const beta = event.beta;   // Dikey olarak cihazın hareket yönü (derece cinsinden)
    const gamma = event.gamma; // Cihazın sağa veya sola doğru eğimi (derece cinsinden)

    // Oryantasyon bilgisini belirle
    let orientation = "";
    if (beta > 45) {
        orientation = "Ekranı dümdüz tutuyon";
    } else if (beta < -45) {
        orientation = "Neden amuda kalktın?";
    } else if (gamma > 45) {
        orientation = "Sağa yatmışsın";
    } else if (gamma < -45) {
        orientation = "Sola yatmışsın";
    } else {
        orientation = "Mobil cihaz kullanmıyorsun";
    }

    // Oryantasyon bilgisini ekrana yazdır
    orientationText.textContent = "" + orientation;
});
