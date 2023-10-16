const emojiCursor = document.createElement("div");
emojiCursor.innerHTML = "#"; // İstediğiniz emojiyi buraya ekleyin
emojiCursor.style.position = "fixed";
emojiCursor.style.fontSize = "26px"; // Emoji boyutunu ayarlayabilirsiniz
emojiCursor.style.zIndex = "9999";
emojiCursor.style.pointerEvents = "none";
document.body.appendChild(emojiCursor);

document.addEventListener("mousemove", (e) => {
  emojiCursor.style.left = e.clientX + "px";
  emojiCursor.style.top = e.clientY + "px";
});


