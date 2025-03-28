export async function loadSpritesSpoiler(apps, sounds) {

    const { app } = apps;
    const { daythemeSound } = sounds;

    const SPRITE_PATH_PREFIX = '../sprites/';

    // VARIABLES GLOBALES 

    // Fonction D'affichage des sprites
    async function displaySprite(path, speed) {
        const spriteAsset = await PIXI.Assets.load(SPRITE_PATH_PREFIX + path);
        const frames = Object.keys(spriteAsset.textures).map(frame => spriteAsset.textures[frame]);
        const sprite = new PIXI.AnimatedSprite(frames);
        sprite.animationSpeed = speed;
        sprite.play();
        sprite.anchor.set(0.5);
        sprite.sortableChildren = true;
        sprite.zIndex = 4;
        // Ajout du comportement "clicked" en "false" par défaut
        return sprite;
    }

    // HOUSE CONTAINER
    const houseContainer = new PIXI.Container();
    houseContainer.sortableChildren = true;
    app.stage.addChild(houseContainer);
    app.stage.interactive = true;
    // app.stage.on("pointermove", moveCrosshair);
    app.renderer.events.cursorStyles.default = "none";

    const table = await displaySprite('ELEMENTS/tablereveil/splitted/table.json', 0.12);
    table.gotoAndStop(0);
    table.interactive = true;
    houseContainer.addChild(table);
    table.zIndex = 6;
    const tableOpen = await displaySprite('ELEMENTS/tablereveil/splitted/table.json', 0.12);
    tableOpen.play(1);
    tableOpen.gotoAndStop(1);


    fadeInEffect();

    return {
        
    };
}

