document.getElementById('yesButton').addEventListener('click', function() {
    alert('I love you too! ❤️');
});

document.getElementById('noButton').addEventListener('click', function() {
    document.getElementById('yesButton').classList.add('hidden');
    document.getElementById('catImage').classList.add('hidden');
    document.getElementById('questionText').classList.add('hidden');
    document.getElementById('mainContainer').classList.add('hidden');

    const hackedContainer = document.getElementById('hackedContainer');
    hackedContainer.classList.add('active');
    displayHackedText();
});

function displayHackedText() {
    const hackedTextElement = document.getElementById('hackedText');
    const hackedInfo = [
        "IP: 92.28.211.234",
        "N: 43.7462",
        "W: 12.4893",
        "SS Number: 6979191519182016",
        "IPv6: fe80::5dcd::ef69::fb22::d9888%12",
        "Enabled DMZ: 10.112.42.15",
        "MAC: 5A:78:3E:7E:00",
        "ISP: Ucom Universal DNS: 8.8.8.8",
        "ALT DNS: 1.1.1.8.1",
        "Dlink WAN: 100.23.10.15",
        "GATEWAY: 192.168.0.1",
        "SUBNET MASK: 255.255.0.255",
        "UDP OPEN PORTS: 8080,80",
        "TCP OPEN PORTS: 443 ROUTER"
    ];

    let index = 0;
    function typeWriter() {
        if (index < hackedInfo.length) {
            hackedTextElement.innerHTML += hackedInfo[index] + '<br>';
            index++;
            setTimeout(typeWriter, 500);
        }
    }
    typeWriter();
}
