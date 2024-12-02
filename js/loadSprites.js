// règle intéressante :
// Set the texture's scale mode to nearest to preserve pixelation
// texture.baseTexture.scaleMode = SCALE_MODES.NEAREST;

export async function loadSprites(app) {
    try {

    // CONTAINER
    const container = new PIXI.Container();
    container.sortableChildren = true;
    app.stage.addChild(container);
    // Ajout de l'interactivité du canvas/container
    app.stage.interactive = true;
    // Ajout de la logique de mouvement du crosshair
    app.stage.on("pointermove", moveCrosshair);
    app.renderer.events.cursorStyles.default = "none";

    // BACKGROUND
    const backgroundTexture = await PIXI.Assets.load('../sprites/homeImproved.png');
    const background = new PIXI.Sprite(backgroundTexture);
    await PIXI.Assets.load('../sprites/homeImproved.png');
    container.addChild(background);

    // CROSSHAIR
    const crosshairSpriteSheet = await PIXI.Assets.load('../sprites/CROSSHAIR/crosshair2.json');
    const framesCrosshair = Object.keys(crosshairSpriteSheet.textures).map(
                             frame => crosshairSpriteSheet.textures[frame]
    );
    const crosshair = new PIXI.AnimatedSprite(framesCrosshair);
    crosshair.animationSpeed = 0.08;
    crosshair.play();
    crosshair.interactiveChildren = false;
    crosshair.zIndex = 3;
    crosshair.anchor.set(0.5); 
    container.addChild(crosshair);
    // Définition de la fonction moveCrosshair après la création de crosshair
    function moveCrosshair(e) {
        let pos = e.data.global;
        crosshair.x = pos.x;
        crosshair.y = pos.y;
    }

    // FACETALK
    const guybrushSpritesheet = await PIXI.Assets.load('../sprites/TALK/romain face talk.json');
    const frames = Object.keys(guybrushSpritesheet.textures).map(
                             frame => guybrushSpritesheet.textures[frame]
    );
    const guybrush = new PIXI.AnimatedSprite(frames);
    guybrush.animationSpeed = 0.13;
    guybrush.play();
    guybrush.x = app.screen.width / 2;
    guybrush.y = app.screen.height * 0.8;
    guybrush.anchor.set(0.5); 
    // container.addChild(guybrush);

     // WALK RIGHT
    const guybrushSpritesheetWR = await PIXI.Assets.load('../sprites/WALK/romain walk right.json');
    const framesWR = Object.keys(guybrushSpritesheetWR.textures).map(
                        frame => guybrushSpritesheetWR.textures[frame]
    );
    const guybrushWR = new PIXI.AnimatedSprite(framesWR);
    guybrushWR.animationSpeed = 0.13;
    guybrushWR.play();
    guybrushWR.x = app.screen.width * 0.4 ;
    guybrushWR.y = app.screen.height * 0.8;
    guybrushWR.anchor.set(0.5); 
    // container.addChild(guybrushWR);

    // LEFT WALK
    const guybrushSpritesheetWL = await PIXI.Assets.load('../sprites/WALK/romain walk left.json');
    const framesWL = Object.keys(guybrushSpritesheetWL.textures).map(
                        frame => guybrushSpritesheetWL.textures[frame]
    );
    const guybrushWL = new PIXI.AnimatedSprite(framesWL);
    guybrushWL.animationSpeed = 0.13;
    guybrushWL.play();
    // guybrushWL.x = app.screen.width * 0.6 ;
    // guybrushWL.y = app.screen.height * 0.8;
    guybrushWL.x = app.screen.width * 0.74 ;
    guybrushWL.y = app.screen.height * 0.77;
    guybrushWL.anchor.set(0.5); 
     // container.addChild(guybrushWL);

    // LAYDOWN / SLEEP
    const guybrushSpritesheetLD = await PIXI.Assets.load('../sprites/LAYDOWN/lay down.json');
    const framesLD = Object.keys(guybrushSpritesheetLD.textures).map(
                        frame => guybrushSpritesheetLD.textures[frame]
    );
    const guybrushLD = new PIXI.AnimatedSprite(framesLD);
    guybrushLD.animationSpeed = 0.05;
    guybrushLD.play();
    guybrushLD.x = app.screen.width * 0.74 ;
    guybrushLD.y = app.screen.height * 0.77;
    guybrushLD.anchor.set(0.5); 
    guybrushLD.interactive = true;
    container.addChild(guybrushLD);

    // GET UP / AWAKENING
    const guybrushSpritesheetGU = await PIXI.Assets.load('../sprites/GETUP/get up.json');
    const framesGU = Object.keys(guybrushSpritesheetGU.textures).map(
                             frame => guybrushSpritesheetGU.textures[frame]
    );
    const guybrushGU = new PIXI.AnimatedSprite(framesGU);
    guybrushGU.animationSpeed = 0.12;
    guybrushGU.play();
    guybrushGU.x = app.screen.width * 0.74 ;
    guybrushGU.y = app.screen.height * 0.77;
    guybrushGU.anchor.set(0.5); 
    guybrushGU.interactive = true;
    // container.addChild(guybrushGU);

    // return app;
    return {
        container,
        background,
        crosshair,
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

