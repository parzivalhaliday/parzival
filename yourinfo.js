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
    document.getElementById("location").textContent = " latitude " + latitude + ", longitude " + longitude;
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
