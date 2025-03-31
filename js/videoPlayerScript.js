// SCRIPT DU VIDEO PLAYER

const video = document.getElementById("video");
const playPauseBtn = document.getElementById("playPauseBtn");

const playPauseImg = playPauseBtn.querySelector("img"); // Récupère l'image dans le bouton

const playImg = "../sprites/SPECIAL/toileAlerts/start.png";
const pauseImg = "../sprites/SPECIAL/toileAlerts/stop.png";

playPauseBtn.addEventListener("click", function () {
    if (video.paused) {
        video.play();
        // playPauseBtn.innerHTML = `<img src="${pauseImg}" alt="Pause">`;
        playPauseImg.src = pauseImg;
    } else {
        video.pause();
        // playPauseBtn.innerHTML = `<img src="${playImg}" alt="Play">`;
        playPauseImg.src = playImg;
    }
});

// Désactiver le menu contextuel (clic droit)
video.addEventListener("contextmenu", function (e) {
    e.preventDefault();
});