// règle intéressante :
// Set the texture's scale mode to nearest to preserve pixelation
// texture.baseTexture.scaleMode = SCALE_MODES.NEAREST;

export async function loadSprites(app) {
    try {

    const SPRITE_PATH_PREFIX = '../sprites/';

    // Fonction D'affichage des sprites
    async function displaySprite(path, speed) {
        const spritesheet = await PIXI.Assets.load(SPRITE_PATH_PREFIX + path);
        const frames = Object.keys(spritesheet.textures).map(frame => spritesheet.textures[frame]);
        const sprite = new PIXI.AnimatedSprite(frames);
        sprite.animationSpeed = speed;
        sprite.play();
        sprite.anchor.set(0.5);
        return sprite;
    }

    // houseContainer
    const houseContainer = new PIXI.Container();
    houseContainer.sortableChildren = true;
    app.stage.addChild(houseContainer);
    app.stage.interactive = true;
    app.stage.on("pointermove", moveCrosshair);
    app.renderer.events.cursorStyles.default = "none";

    // BACKGROUND
    const backgroundTexture = await PIXI.Assets.load('../sprites/homeImproved2.png');
    const background = new PIXI.Sprite(backgroundTexture);
    await PIXI.Assets.load('../sprites/homeImproved2.png');
    houseContainer.addChild(background);

    // CROSSHAIR
    const crosshair = await displaySprite('CROSSHAIR/crosshair2.json', 0.08);
    crosshair.play();
    crosshair.interactiveChildren = false;
    crosshair.zIndex = 3;
    houseContainer.addChild(crosshair);
    // Définition de la fonction moveCrosshair après la création de crosshair
    function moveCrosshair(e) {
        let pos = e.data.global;
        crosshair.x = pos.x;
        crosshair.y = pos.y;
    }

    // FACETALK
    const guybrush = await displaySprite('TALK/romain face talk.json', 0.13);
    guybrush.play();

    // WALK RIGHT
    const guybrushWR = await displaySprite('WALK/romain walk right.json', 0.13);
    guybrushWR.play();

    // LEFT WALK
    const guybrushWL = await displaySprite('WALK/romain walk left.json', 0.13);
    guybrushWL.play();

    // LAYDOWN / SLEEP
    const guybrushLD = await displaySprite('LAYDOWN/lay down.json', 0.05);
    guybrushLD.play();
    guybrushLD.interactive = true;

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
    houseContainer.addChild(ordi);

    // BUREAU
    const deskSpritesheet = await PIXI.Assets.load('../sprites/ELEMENTS/ordi/desk.png');
    const desk = new PIXI.Sprite(deskSpritesheet);
    desk.anchor.set(0.5); 
    desk.interactive = true;
    houseContainer.addChild(desk);

    // GAMINGCHAIR
    const gcSpritesheet = await PIXI.Assets.load('../sprites/ELEMENTS/gamingchair/gamingchair.png');
    const gamingChair = new PIXI.Sprite(gcSpritesheet);
    gamingChair.anchor.set(0.5); 
    gamingChair.interactive = true;
    houseContainer.addChild(gamingChair);
    // GAMINGCHAIR Armrest
    const gcARSpritesheet = await PIXI.Assets.load('../sprites/ELEMENTS/gamingchair/gamingchairarmrest.png');
    const gamingChairAR = new PIXI.Sprite(gcARSpritesheet);
    gamingChairAR.anchor.set(0.5); 
    gamingChairAR.interactive = true;
    gamingChairAR.zIndex = 2;
    // houseContainer.addChild(gamingChairAR);

    return {
        houseContainer,
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

