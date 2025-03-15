// SCRIPT DU VIDEO PLAYER

const video = document.getElementById("video");
const playPauseBtn = document.getElementById("playPauseBtn");
const playImg = "../sprites/SPECIAL/toileAlerts/start.png";
const pauseImg = "../sprites/SPECIAL/toileAlerts/stop.png";

playPauseBtn.addEventListener("click", function () {
    if (video.paused) {
        video.play();
        playPauseBtn.innerHTML = `<img src="${pauseImg}" alt="Pause">`;
    } else {
        video.pause();
        playPauseBtn.innerHTML = `<img src="${playImg}" alt="Play">`;
    }
});

// Désactiver le menu contextuel (clic droit)
video.addEventListener("contextmenu", function (e) {
    e.preventDefault();
});