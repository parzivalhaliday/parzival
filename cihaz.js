window.addEventListener("deviceorientation", handleOrientation, true);

function handleOrientation(event) {
    var absolute = event.absolute;
    var alpha    = event.alpha; // Yön açısı (0-360 derece)
    var beta     = event.beta;  // Yatay eğiklik açısı (-180-180 derece)
    var gamma    = event.gamma; // Dikey eğiklik açısı (-90-90 derece)

    if (beta > 20) {
        console.log("Cihaz sağa eğik.");
    } else if (beta < -20) {
        console.log("Cihaz sola eğik.");
    } else {
        console.log("Cihaz düz.");
    }
}
