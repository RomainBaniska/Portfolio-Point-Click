export async function initializeApp() {

    // Création d'une nouvelle application
    const app = new PIXI.Application();

    // Configuration de la largeur maximale adaptée à la taille de l'écran si plus petit
    const maxWidth = 1440;
    const width = Math.min(window.innerWidth, maxWidth);
    const aspectRatio = 16 / 9;
    const height = width / aspectRatio;

    // Initialisation de l'application
    await app.init({ 
        width: width,
        height: height,
        backgroundColor: 0x000000,
    });

    // Ajout du canvas de l'app au body
    document.body.appendChild(app.canvas);

return app;
}
