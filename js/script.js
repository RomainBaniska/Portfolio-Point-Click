(async () => {
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
    
    // Chargement de la texture du background
    const backgroundTexture = await PIXI.Assets.load('../sprites/homeImproved.png');
    const background = new PIXI.Sprite(backgroundTexture);
    app.stage.addChild(background);

    // Création du bandeau rouge
    const redBanner = new PIXI.Graphics();
    app.stage.addChild(redBanner);

    function adjustCanvasSize() {
        app.renderer.resize(window.innerWidth, window.innerHeight);

        // Ajuster la taille du background (80% de la hauteur de l'écran)
        background.height = app.screen.height * 0.75;
        background.width = (background.height / backgroundTexture.height) * backgroundTexture.width * 1.4;

        // Centrer le background horizontalement
        background.x = (app.screen.width - background.width) / 2;
        background.y = 0;

        // Ajuster le bandeau rouge pour qu'il corresponde au background
        redBanner.clear();
        redBanner.beginFill(0x1C0718);
        redBanner.drawRect(background.x, app.screen.height * 0.75, background.width, app.screen.height * 0.25);
        redBanner.endFill();
    }

    // Applique le redimensionnement à chaque événement 'resize'
    window.addEventListener('resize', adjustCanvasSize);

    // Ajuster la taille dès le chargement initial
    adjustCanvasSize();

    console.log("Tout s'est bien déclenché");
})();
