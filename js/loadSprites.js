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
    await PIXI.Assets.load('../sprites/homeImproved2.png');
    houseContainer.addChild(houseSprite);

    // CROSSHAIR
    const crosshair = await displaySprite('CROSSHAIR/crosshair2.json', 0.08);
    crosshair.play();
    crosshair.interactiveChildren = false;
    crosshair.zIndex = 3;
    // à changer pour un child de "app"
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

    //////////////////////////////////////// ACTIONS MENU ////////////////////////////////

     // MENU CONTAINER & Texture
     const menuContainer = new PIXI.Container();
     menuContainer.sortableChildren = true;
     app.stage.addChild(menuContainer);
     const menuAsset = await PIXI.Assets.load('../sprites/test sprite menu.png');
     const menuSprite = new PIXI.Sprite(menuAsset);
     menuContainer.addChild(menuSprite);
 
     // MENU BUTTONS Textures
     const menuButtonSprite = await displaySprite('MENU/inactive/button.json');
     const menuButtonSpriteActive = await displaySprite('MENU/active/button active.json');
     const menuButton = new PIXI.Sprite(menuButtonSprite);
     const menuButtonActive = new PIXI.Sprite(menuButtonSpriteActive);
 
     const menuButton2Sprite = await displaySprite('MENU/inactive/button2.json');
     const menuButton2SpriteActive = await displaySprite('MENU/active/button2 active.json');
     const menuButton2 = new PIXI.Sprite(menuButton2Sprite);
     const menuButton2Active = new PIXI.Sprite(menuButton2SpriteActive);
 
     const menuButton3Sprite = await displaySprite('MENU/inactive/button3.json');
     const menuButton3SpriteActive = await displaySprite('MENU/active/button3 active.json');
     const menuButton3 = new PIXI.Sprite(menuButton3Sprite);
     const menuButton3Active = new PIXI.Sprite(menuButton3SpriteActive);
 
     const menuButton4Sprite = await displaySprite('MENU/inactive/button4.json');
     const menuButton4SpriteActive = await displaySprite('MENU/active/button4 active.json');
     const menuButton4 = new PIXI.Sprite(menuButton4Sprite);
     const menuButton4Active = new PIXI.Sprite(menuButton4SpriteActive);
 
     const menuButton5Sprite = await displaySprite('MENU/inactive/button5.json');
     const menuButton5SpriteActive = await displaySprite('MENU/active/button5 active.json');
     const menuButton5 = new PIXI.Sprite(menuButton5Sprite);
     const menuButton5Active = new PIXI.Sprite(menuButton5SpriteActive);
 
     const menuButton6Sprite = await displaySprite('MENU/inactive/button6.json');
     const menuButton6SpriteActive = await displaySprite('MENU/active/button6 active.json');
     const menuButton6 = new PIXI.Sprite(menuButton6Sprite);
     const menuButton6Active = new PIXI.Sprite(menuButton6SpriteActive);
 
     const menuButton7Sprite = await displaySprite('MENU/inactive/button7.json');
     const menuButton7SpriteActive = await displaySprite('MENU/active/button7 active.json');
     const menuButton7 = new PIXI.Sprite(menuButton7Sprite);
     const menuButton7Active = new PIXI.Sprite(menuButton7SpriteActive);
 
     const menuButton8Sprite = await displaySprite('MENU/inactive/button8.json');
     const menuButton8SpriteActive = await displaySprite('MENU/active/button8 active.json');
     const menuButton8 = new PIXI.Sprite(menuButton8Sprite);
     const menuButton8Active = new PIXI.Sprite(menuButton8SpriteActive);
 
     const menuButton9Sprite = await displaySprite('MENU/inactive/button9.json');
     const menuButton9SpriteActive = await displaySprite('MENU/active/button9 active.json');
     const menuButton9 = new PIXI.Sprite(menuButton9Sprite);
     const menuButton9Active = new PIXI.Sprite(menuButton9SpriteActive);
 
 
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
     
     // Créer l'effet de hover sur les boutons : menuButton prend la texture de menuButtonActive
     function menuButtonHover(button, sprite, activeSprite) {
         button.interactive = true;
         
         button.on('pointerover', () => {
             button.texture = activeSprite.texture;  
         });
         button.on('pointerout', () => {
             button.texture = sprite.texture; 
         });
     }
 
     // On va ranger tous les boutons dans un tableau
     const menuButtonsInteractive = [
         { button: menuButton, sprite: menuButtonSprite, activeSprite: menuButtonSpriteActive },
         { button: menuButton2, sprite: menuButton2Sprite, activeSprite: menuButton2SpriteActive },
         { button: menuButton3, sprite: menuButton3Sprite, activeSprite: menuButton3SpriteActive },
         { button: menuButton4, sprite: menuButton4Sprite, activeSprite: menuButton4SpriteActive },
         { button: menuButton5, sprite: menuButton5Sprite, activeSprite: menuButton5SpriteActive },
         { button: menuButton6, sprite: menuButton6Sprite, activeSprite: menuButton6SpriteActive },
         { button: menuButton7, sprite: menuButton7Sprite, activeSprite: menuButton7SpriteActive },
         { button: menuButton8, sprite: menuButton8Sprite, activeSprite: menuButton8SpriteActive },
         { button: menuButton9, sprite: menuButton9Sprite, activeSprite: menuButton9SpriteActive }
     ];
 
     menuButtonsInteractive.forEach(({button, sprite, activeSprite}) => {
         menuButtonHover(button, sprite, activeSprite); 
     });

     

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
        menuButtonsInteractive,
        menuContainer,
        menuSprite,
    };

} catch (error) {
    console.error('Erreur de chargement des sprites:', error);
}

}

