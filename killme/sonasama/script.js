let moveCount = 0; // Variable to track how many times the "NO" button has moved

function clickYesButton() {
    document.getElementById('message').style.display = 'block';
    document.getElementById('no-button').style.display = 'none';
    document.getElementById('yes-button').style.display = 'none';
    document.getElementById('question').style.display = 'none';


}

function clickNoButton() {
    // Hide all elements
    document.body.style.backgroundColor = 'black';

    document.getElementById('love-image').style.display = 'none';
    document.getElementById('hacked-message').style.display = 'block';
    document.getElementById('yes-button').style.display = 'none';
    document.getElementById('no-button').style.display = 'none';
    document.getElementById('question').style.display = 'none';
    document.getElementById('hacked-message').style.display = 'block';
}

function hoverNoButton() {
    // Move the "NO" button randomly
    document.getElementById('no-button').style.left = Math.random() * 80 + '%'; // Random horizontal position
    document.getElementById('no-button').style.top = Math.random() * 50 + 400 + 'px'; // Random vertical position

    // Increase the move count
    moveCount++;

    // If the button has moved 3 times, show a warning
    if (moveCount === 3) {
        alert("yakalayabilirsin o kadar zor değil xd"); // Show an alert after 3 moves
    }
}