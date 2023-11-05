const emojiCursor = document.createElement("div");
emojiCursor.innerHTML = "#"; // İstediğiniz emojiyi buraya ekleyin
emojiCursor.style.position = "fixed";
emojiCursor.style.fontSize = "26px"; // Emoji boyutunu ayarlayabilirsiniz
emojiCursor.style.zIndex = "9999";
emojiCursor.style.pointerEvents = "none";
document.body.appendChild(emojiCursor);

function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

document.addEventListener("mousemove", (e) => {
  const yOffset = 15;
  const xOffset = 5; 
  emojiCursor.style.left = e.clientX - xOffset  + "px";
  emojiCursor.style.top = e.clientY - yOffset + "px";
  emojiCursor.style.color = getRandomColor();
});
