const getIP = async () => {
    try {
        // IP adresini al
        const response = await fetch('https://api64.ipify.org?format=json');
        const data = await response.json();
        const ipAddress = data.ip;
        document.getElementById("ipAddress").textContent = ipAddress;

        // IP'den konum bilgisini al
        const locationResponse = await fetch(`https://ipapi.co/${ipAddress}/json/`);
        const locationData = await locationResponse.json();
        
        // Konum bilgilerini göster - şehir tekrarını önle
        document.getElementById("location").textContent = 
            `${locationData.city}, ${locationData.country_name}`;
        
    } catch (error) {
        console.error("IP veya konum bilgisi alınamadı:", error);
        document.getElementById("ipAddress").textContent = "Bilgi alınamadı";
        document.getElementById("location").textContent = "Bilgi alınamadı";
    }
};

window.onload = function() {
    getIP(); 
};
if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(function (position) {
        updateLocationInfo(position);
    });
}
 
function getOperatingSystem() {
    const userAgent = window.navigator.userAgent;
    let os = "Unknown Operating System";

    if (userAgent.indexOf("Win") !== -1) os = "Windows";
    else if (userAgent.indexOf("Mac") !== -1) os = "MacOS";
    else if (userAgent.indexOf("Linux") !== -1) os = "Linux";
    else if (userAgent.indexOf("Android") !== -1) os = "Android";
    else if (userAgent.indexOf("iOS") !== -1) os = "iOS";

    return os;
}

// Print operating system
document.getElementById("operating-system").textContent = "" + getOperatingSystem();




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

window.addEventListener("deviceorientation", function(event) {
    const orientationText = document.getElementById("oryantasyon");
    const alpha = event.alpha; 
    const beta = event.beta;  
    const gamma = event.gamma; 

    // Determine the orientation information
    let orientation = "";
    if (beta > 45) {
        orientation = "You're holding the screen flat";
    } else if (beta < -45) {
        orientation = "Why are you upside down?";
    } else if (gamma > 45) {
        orientation = "You're tilted to the right";
    } else if (gamma < -45) {
        orientation = "You're tilted to the left";
    } else {
        orientation = "You are not using a mobile device";
    }

    orientationText.textContent = "" + orientation;
});
