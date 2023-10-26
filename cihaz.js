window.addEventListener("deviceorientation", handleOrientation, true);

function handleOrientation(event) {
    var beta = event.beta;  // Yatay eğiklik açısı (-180-180 derece)

    if (beta > 20) {
        showAlert("Cihaz sağa eğik.");
    } else if (beta < -20) {
        showAlert("Cihaz sola eğik.");
    } else {
        showAlert("Cihaz düz.");
    }
}

function showAlert(message) {
    var alertBox = document.createElement("div");
    alertBox.style.position = "fixed";
    alertBox.style.top = "10px";
    alertBox.style.left = "10px";
    alertBox.style.background = "rgba(255, 0, 0, 0.8)";
    alertBox.style.color = "white";
    alertBox.style.padding = "10px";
    alertBox.style.borderRadius = "5px";
    alertBox.textContent = message;

    document.body.appendChild(alertBox);

    setTimeout(function() {
        document.body.removeChild(alertBox);
    }, 3000); // Uyarı 3 saniye sonra kaybolur
}
