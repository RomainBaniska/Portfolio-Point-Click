// règle intéressante :
// Set the texture's scale mode to nearest to preserve pixelation
// texture.baseTexture.scaleMode = SCALE_MODES.NEAREST;

export async function loadSprites(app) {
    try {

    const SPRITE_PATH_PREFIX = '../sprites/';

    // Fonction D'affichage des sprites
    async function displaySprite(path, speed) {
        const spriteAsset = await PIXI.Assets.load(SPRITE_PATH_PREFIX + path);
        const frames = Object.keys(spriteAsset.textures).map(frame => spriteAsset.textures[frame]);
        const sprite = new PIXI.AnimatedSprite(frames);
        sprite.animationSpeed = speed;
        sprite.play();
        sprite.anchor.set(0.5);
        return sprite;
    }

    // HOUSE CONTAINER
    const houseContainer = new PIXI.Container();
    houseContainer.sortableChildren = true;
    app.stage.addChild(houseContainer);
    app.stage.interactive = true;
    app.stage.on("pointermove", moveCrosshair);
    app.renderer.events.cursorStyles.default = "none";

    // HOUSE SPRITE
    const houseAsset = await PIXI.Assets.load('../sprites/homeImproved2.png');
    const houseSprite = new PIXI.Sprite(houseAsset);
    houseContainer.addChild(houseSprite);

    // CROSSHAIR
    const crosshair = await displaySprite('CROSSHAIR/crosshair2.json', 0.08);
    crosshair.play();
    crosshair.interactiveChildren = false;
    crosshair.zIndex = 3;
    // à changer pour un child de "app"
    app.stage.addChild(crosshair);
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
    const deskAsset = await PIXI.Assets.load('../sprites/ELEMENTS/ordi/desk.png');
    const desk = new PIXI.Sprite(deskAsset);
    desk.anchor.set(0.5); 
    desk.interactive = true;
    houseContainer.addChild(desk);

    // GAMINGCHAIR
    const gcAsset = await PIXI.Assets.load('../sprites/ELEMENTS/gamingchair/gamingchair.png');
    const gamingChair = new PIXI.Sprite(gcAsset);
    gamingChair.anchor.set(0.5); 
    gamingChair.interactive = true;
    houseContainer.addChild(gamingChair);
    // GAMINGCHAIR Armrest
    const gcARAsset = await PIXI.Assets.load('../sprites/ELEMENTS/gamingchair/gamingchairarmrest.png');
    const gamingChairAR = new PIXI.Sprite(gcARAsset);
    gamingChairAR.anchor.set(0.5); 
    gamingChairAR.interactive = true;
    gamingChairAR.zIndex = 2;

    //////////////////////////////////////// ACTIONS MENU ////////////////////////////////

    async function displaySpriteButton(path) {
        const spriteAsset = await PIXI.Assets.load(SPRITE_PATH_PREFIX + path);
        const frames = Object.keys(spriteAsset.textures).map(frame => spriteAsset.textures[frame]);
        const sprite = new PIXI.AnimatedSprite(frames);
        return sprite;
    }

     // MENU CONTAINER & Texture
     const menuContainer = new PIXI.Container();
     menuContainer.sortableChildren = true;
     app.stage.addChild(menuContainer);
     const menuAsset = await PIXI.Assets.load('../sprites/test sprite menu.png');
     const menuSprite = new PIXI.Sprite(menuAsset);
     menuContainer.addChild(menuSprite);
 
     // MENU BUTTONS Textures
     const menuButtonSprite = await displaySpriteButton('MENU/inactive/button.json');
     const menuButtonSpriteActive = await displaySpriteButton('MENU/active/button active.json');
     const menuButton = new PIXI.Sprite(menuButtonSprite);
 
     const menuButton2Sprite = await displaySpriteButton('MENU/inactive/button2.json');
     const menuButton2SpriteActive = await displaySpriteButton('MENU/active/button2 active.json');
     const menuButton2 = new PIXI.Sprite(menuButton2Sprite);
 
     const menuButton3Sprite = await displaySpriteButton('MENU/inactive/button3.json');
     const menuButton3SpriteActive = await displaySpriteButton('MENU/active/button3 active.json');
     const menuButton3 = new PIXI.Sprite(menuButton3Sprite);
 
     const menuButton4Sprite = await displaySpriteButton('MENU/inactive/button4.json');
     const menuButton4SpriteActive = await displaySpriteButton('MENU/active/button4 active.json');
     const menuButton4 = new PIXI.Sprite(menuButton4Sprite);
 
     const menuButton5Sprite = await displaySpriteButton('MENU/inactive/button5.json');
     const menuButton5SpriteActive = await displaySpriteButton('MENU/active/button5 active.json');
     const menuButton5 = new PIXI.Sprite(menuButton5Sprite);
 
     const menuButton6Sprite = await displaySpriteButton('MENU/inactive/button6.json');
     const menuButton6SpriteActive = await displaySpriteButton('MENU/active/button6 active.json');
     const menuButton6 = new PIXI.Sprite(menuButton6Sprite);
 
     const menuButton7Sprite = await displaySpriteButton('MENU/inactive/button7.json');
     const menuButton7SpriteActive = await displaySpriteButton('MENU/active/button7 active.json');
     const menuButton7 = new PIXI.Sprite(menuButton7Sprite);
 
     const menuButton8Sprite = await displaySpriteButton('MENU/inactive/button8.json');
     const menuButton8SpriteActive = await displaySpriteButton('MENU/active/button8 active.json');
     const menuButton8 = new PIXI.Sprite(menuButton8Sprite);
 
     const menuButton9Sprite = await displaySpriteButton('MENU/inactive/button9.json');
     const menuButton9SpriteActive = await displaySpriteButton('MENU/active/button9 active.json');
     const menuButton9 = new PIXI.Sprite(menuButton9Sprite);
 
 
     // Ajout des boutons au Menu Container
     menuContainer.addChild(
         menuButton, 
         menuButton2, 
         menuButton3, 
         menuButton4, 
         menuButton5, 
         menuButton6, 
         menuButton7, 
         menuButton8, 
         menuButton9
     );

     // Méthode un changement de texture du menuButton lors du hover sur les boutons
    function menuButtonHover(button, sprite, activeSprite) {
        button.interactive = true;
        
        button.on('pointerover', () => {
            button.texture = activeSprite.texture;  
        });
        button.on('pointerout', () => {
            button.texture = sprite.texture; 
        });
    }
 
    // On applique menuButtonHover pour chaque bouton
    menuButtonHover(menuButton, menuButtonSprite, menuButtonSpriteActive);
    menuButtonHover(menuButton2, menuButton2Sprite, menuButton2SpriteActive);
    menuButtonHover(menuButton3, menuButton3Sprite, menuButton3SpriteActive);
    menuButtonHover(menuButton4, menuButton4Sprite, menuButton4SpriteActive);
    menuButtonHover(menuButton5, menuButton5Sprite, menuButton5SpriteActive);
    menuButtonHover(menuButton6, menuButton6Sprite, menuButton6SpriteActive);
    menuButtonHover(menuButton7, menuButton7Sprite, menuButton7SpriteActive);
    menuButtonHover(menuButton8, menuButton8Sprite, menuButton8SpriteActive);
    menuButtonHover(menuButton9, menuButton9Sprite, menuButton9SpriteActive);

    return {
        houseContainer,
        houseSprite,
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
        // ACTIONS MENU
        menuContainer,
        menuSprite,
        menuButton,
        menuButton2,
        menuButton3,
        menuButton4,
        menuButton5,
        menuButton6,
        menuButton7,
        menuButton8,
        menuButton9,
    };

} catch (error) {
    console.error('Erreur de chargement des sprites:', error);
}

}

