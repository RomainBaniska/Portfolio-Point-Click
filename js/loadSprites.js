export async function loadSprites(app) {
    try {
    // Chargement de la texture du background
    const backgroundTexture = await PIXI.Assets.load('../sprites/homeImproved.png');
    // Créer un sprite "background"
    const background = new PIXI.Sprite(backgroundTexture);
    await PIXI.Assets.load('../sprites/homeImproved.png');
    app.stage.addChild(background);

    // Chargement du JSON de GuyBrush Face Talk
    const guybrushSpritesheet = await PIXI.Assets.load('../sprites/TALK/romain face talk.json');
    // Création d'une animation à partir des frames du JSON
    const frames = Object.keys(guybrushSpritesheet.textures).map(
                             frame => guybrushSpritesheet.textures[frame]
    );
    const guybrush = new PIXI.AnimatedSprite(frames);

     // Chargement du JSON du Guybrush Right Walk
    const guybrushSpritesheetWR = await PIXI.Assets.load('../sprites/WALK/romain walk right.json');
    // Frames WR
    const framesWR = Object.keys(guybrushSpritesheetWR.textures).map(
                        frame => guybrushSpritesheetWR.textures[frame]
    );
    const guybrushWR = new PIXI.AnimatedSprite(framesWR);

    // Chargement du JSON du Guybrush Right Walk
    const guybrushSpritesheetWL = await PIXI.Assets.load('../sprites/WALK/romain walk left.json');
    // Frames WL
    const framesWL = Object.keys(guybrushSpritesheetWL.textures).map(
                        frame => guybrushSpritesheetWL.textures[frame]
    );
    const guybrushWL = new PIXI.AnimatedSprite(framesWL);

    // Chargement du JSON du Guybrush Lay down
    const guybrushSpritesheetLD = await PIXI.Assets.load('../sprites/LAYDOWN/lay down.json');
    // Frames LD
    const framesLD = Object.keys(guybrushSpritesheetLD.textures).map(
                        frame => guybrushSpritesheetLD.textures[frame]
    );
    const guybrushLD = new PIXI.AnimatedSprite(framesLD);

    // Chargement du JSON de GuyBrush Face Talk
    const guybrushSpritesheetGU = await PIXI.Assets.load('../sprites/GETUP/get up.json');
    // Création d'une animation à partir des frames du JSON
    const framesGU = Object.keys(guybrushSpritesheetGU.textures).map(
                             frame => guybrushSpritesheetGU.textures[frame]
    );
    const guybrushGU = new PIXI.AnimatedSprite(framesGU);


    app.stage.addChild(guybrush);

    guybrush.animationSpeed = 0.13;
    guybrush.play();
    guybrush.x = app.screen.width / 2;
    guybrush.y = app.screen.height * 0.8;
    guybrush.anchor.set(0.5); 

    // Commenter - Décommenter addChild pour afficher/retirer le sprite
    // app.stage.addChild(guybrushWR);

    guybrushWR.animationSpeed = 0.13;
    guybrushWR.play();
    guybrushWR.x = app.screen.width * 0.4 ;
    guybrushWR.y = app.screen.height * 0.8;
    guybrushWR.anchor.set(0.5); 

    // Commenter - Décommenter addChild pour afficher/retirer le sprite
    // app.stage.addChild(guybrushWL);

    guybrushWL.animationSpeed = 0.13;
    guybrushWL.play();
    guybrushWL.x = app.screen.width * 0.6 ;
    guybrushWL.y = app.screen.height * 0.8;
    guybrushWL.anchor.set(0.5); 

     // Commenter - Décommenter addChild pour afficher/retirer le sprite
    // app.stage.addChild(guybrushLD);

    guybrushLD.animationSpeed = 0.05;
    guybrushLD.play();
    guybrushLD.x = app.screen.width * 0.74 ;
    guybrushLD.y = app.screen.height * 0.77;
    guybrushLD.anchor.set(0.5); 

    // Commenter - Décommenter addChild pour afficher/retirer le sprite
    app.stage.addChild(guybrushGU);
    guybrushGU.animationSpeed = 0.12;
    guybrushGU.play();
    guybrushGU.x = app.screen.width * 0.74 ;
    guybrushGU.y = app.screen.height * 0.77;
    guybrushGU.anchor.set(0.5); 

    // return app;
    return {
        background,
        guybrush,
        guybrushWR,
        guybrushWL,
        guybrushLD,
        guybrushGU
    };
} catch (error) {
    console.error('Erreur de chargement des sprites:', error);
}
}
