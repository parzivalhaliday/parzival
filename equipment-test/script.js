document.addEventListener("DOMContentLoaded", function() {
    var startTime, endTime;
    var totalDistance = 0;
    var totalTime = 0;

    document.addEventListener("mousemove", function(event) {
        if (!startTime) {
            startTime = new Date().getTime();
        } else {
            endTime = new Date().getTime();
            var deltaTime = endTime - startTime;
            var distance = Math.sqrt(
                Math.pow(event.movementX, 2) + Math.pow(event.movementY, 2)
            );
            totalDistance += distance;
            totalTime += deltaTime;
            var mouseRate = (totalTime !== 0) ? (totalDistance / totalTime) * 1000 : 0;
            document.getElementById("mouseRate").textContent = "Fare hızı: " + mouseRate.toFixed(2) + " Hz";
            startTime = endTime;
        }
    });
});
