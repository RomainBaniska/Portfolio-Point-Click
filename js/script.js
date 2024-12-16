(async () => {
    // Création d'une nouvelle application
    const app = new PIXI.Application();

    globalThis.__PIXI_APP__ = app;

    // Configuration de la largeur maximale adaptée à la taille de l'écran si plus petit
    const maxWidth = 1440;
    const width = Math.min(window.innerWidth, maxWidth);
    const aspectRatio = 16 / 9;
    const height = width / aspectRatio;

    // Initialisation de l'application
    await app.init({ 
        width: width,
        height: height,
        backgroundColor: 0x88888,
    });

    // Ajout du canvas de l'app au body
    document.body.appendChild(app.canvas);
    
    // Chargement de la texture du background
    const backgroundTexture = await PIXI.Assets.load('../sprites/homeImproved.png');
    const house = new PIXI.Sprite(backgroundTexture);
    house.anchor.set(0.5, 0);
    app.stage.addChild(house);

    // CONTAINER
    const container = new PIXI.Container();
    container.sortableChildren = true;
    app.stage.addChild(container);

    const redBannerSprite = await PIXI.Assets.load('../sprites/test sprite menu.png');
    const desk = new PIXI.Sprite(redBannerSprite);
    desk.anchor.set(0.5, 0); 
    container.addChild(desk);

    async function adjustCanvasSize() {
        app.renderer.resize(window.innerWidth, window.innerHeight);
    

        house.height = app.screen.height * 0.75;
        house.width = (house.height / backgroundTexture.height) * backgroundTexture.width * 1.4;
    
        house.x = app.screen.width / 2;
        house.y = 0;
    
        desk.height = app.screen.height * 0.26;
        desk.width = (house.height / backgroundTexture.height) * backgroundTexture.width * 1.4;
    
        desk.x = app.screen.width / 2;
        desk.y = house.height;
    }
    

    // Applique le redimensionnement à chaque événement 'resize'
    window.addEventListener('resize', adjustCanvasSize);

    // Ajuster la taille dès le chargement initial
    adjustCanvasSize();

    console.log("Tout s'est bien déclenché");
})();
