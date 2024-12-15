// règle intéressante :
// Set the texture's scale mode to nearest to preserve pixelation
// texture.baseTexture.scaleMode = SCALE_MODES.NEAREST;

export async function loadSprites(app) {
    try {

    const SPRITE_PATH_PREFIX = '../sprites/';

    // Fonction D'affichage des sprites
    async function displaySprite(path, speed) {
        // path: SITORDI/sitorditalk.json par exemple
        const spritesheet = await PIXI.Assets.load(SPRITE_PATH_PREFIX + path);
        const frames = Object.keys(spritesheet.textures).map(frame => spritesheet.textures[frame]);
        const sprite = new PIXI.AnimatedSprite(frames);
        sprite.animationSpeed = speed;
        sprite.play();
        sprite.anchor.set(0.5);
        return sprite;
    }

    // Fonction permettant le retrait de frames
    // function removeFrame(framesToRemove) {
    //     if (!Array.isArray(framesToRemove)) {
    //         throw new TypeError("La variable déposée doit être un tableau.");
    //     }
    // };

    // CONTAINER
    const container = new PIXI.Container();
    container.sortableChildren = true;
    app.stage.addChild(container);
    // Ajout de l'interactivité du canvas/container
    app.stage.interactive = true;
    // Ajout de la logique de mouvement du crosshair
    app.stage.on("pointermove", moveCrosshair);
    app.renderer.events.cursorStyles.default = "none";
    // Taille container 
    // container.screen.width = 800;
    // container.screen.width = 800;

    // BACKGROUND
    const backgroundTexture = await PIXI.Assets.load('../sprites/homeImproved2.png');
    const background = new PIXI.Sprite(backgroundTexture);
    await PIXI.Assets.load('../sprites/homeImproved2.png');
    container.addChild(background);

    // CROSSHAIR
    const crosshair = await displaySprite('CROSSHAIR/crosshair2.json', 0.08);
    crosshair.play();
    crosshair.interactiveChildren = false;
    crosshair.zIndex = 3;
    container.addChild(crosshair);
    // Définition de la fonction moveCrosshair après la création de crosshair
    function moveCrosshair(e) {
        let pos = e.data.global;
        crosshair.x = pos.x;
        crosshair.y = pos.y;
    }

    // FACETALK
    const guybrush = await displaySprite('TALK/romain face talk.json', 0.13);
    guybrush.play();
    // container.addChild(guybrush);

    // WALK RIGHT
    const guybrushWR = await displaySprite('WALK/romain walk right.json', 0.13);
    guybrushWR.play();
    // container.addChild(guybrushWR);

    // LEFT WALK
    const guybrushWL = await displaySprite('WALK/romain walk left.json', 0.13);
    guybrushWL.play();
     // container.addChild(guybrushWL);

    // LAYDOWN / SLEEP
    const guybrushLD = await displaySprite('LAYDOWN/lay down.json', 0.05);
    guybrushLD.play();
    guybrushLD.interactive = true;
    // container.addChild(guybrushLD);

    // GET UP / AWAKENING
    const guybrushGU = await displaySprite('GETUP/get up.json', 0.12);
    guybrushGU.interactive = true;
    guybrushGU.play();

    // SIT ORDI
    const guybrushSO = await displaySprite('SITORDI/sitordi.json', 0.12);
    guybrushSO.play();

    // SIT ORDI TALK
    const guybrushSOT = await displaySprite('SITORDI/sitorditalk.json', 0.12);
    guybrushSOT.play();

    // IDLE - USE LEFT
    const guybrushIUL = await displaySprite('IDLEUSE/utilisemiddleleft.json', 0.05);
    // guybrushIUL.play();

    // IDLE - USE LEFT
    const guybrushIUR = await displaySprite('IDLEUSE/utilisemiddleright.json', 0.12);
    guybrushIUR.play();

    //////////////////////////////////////// ELEMENTS & OBJECTS ////////////////////////////////

    // ORDINATEUR
    const ordi = await displaySprite('ELEMENTS/ordi/ordi.json', 0.12);
    const ordiRun = await displaySprite('ELEMENTS/ordi/ordiRun.json', 0.12);
    // ordi.play();
    // ordi.gotoAndPlay(0); 
    ordi.gotoAndStop(0); 
    ordi.interactive = true;
    container.addChild(ordi);

    // BUREAU
    const deskSpritesheet = await PIXI.Assets.load('../sprites/ELEMENTS/ordi/desk.png');
    const desk = new PIXI.Sprite(deskSpritesheet);
    desk.anchor.set(0.5); 
    desk.interactive = true;
    container.addChild(desk);

    // GAMINGCHAIR
    const gcSpritesheet = await PIXI.Assets.load('../sprites/ELEMENTS/gamingchair/gamingchair.png');
    const gamingChair = new PIXI.Sprite(gcSpritesheet);
    gamingChair.anchor.set(0.5); 
    gamingChair.interactive = true;
    container.addChild(gamingChair);
    // GAMINGCHAIR Armrest
    const gcARSpritesheet = await PIXI.Assets.load('../sprites/ELEMENTS/gamingchair/gamingchairarmrest.png');
    const gamingChairAR = new PIXI.Sprite(gcARSpritesheet);
    gamingChairAR.anchor.set(0.5); 
    gamingChairAR.interactive = true;
    gamingChairAR.zIndex = 2;
    // container.addChild(gamingChairAR);

    return {
        container,
        background,
        crosshair,
        guybrush,
        guybrushWR,
        guybrushWL,
        guybrushLD,
        guybrushGU,
        guybrushSO,
        guybrushSOT,
        guybrushIUL,
        guybrushIUR,
        // ELEMENTS & OBJECTS
        ordi,
        ordiRun,
        desk,
        gamingChair,
        gamingChairAR,
    };

} catch (error) {
    console.error('Erreur de chargement des sprites:', error);
}

}

