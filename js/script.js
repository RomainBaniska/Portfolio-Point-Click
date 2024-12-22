(async () => {

    const SPRITE_PATH_PREFIX = '../sprites/';
    
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

    // HOUSE CONTAINER & Texture
    const houseContainer = new PIXI.Container();
    houseContainer.sortableChildren = true;
    app.stage.addChild(houseContainer);
    const houseAsset = await PIXI.Assets.load('../sprites/homeImproved.png');
    const houseSprite = new PIXI.Sprite(houseAsset);
    houseContainer.addChild(houseSprite);

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
    

    async function adjustCanvasSize() {
        app.renderer.resize(window.innerWidth, window.innerHeight);
    
        // Déclaration des constantes
        const houseMaxHeight = 1024;
        const houseMaxWidth = 1440;
        const screenHeight = app.screen.height;
        const screenWidth = app.screen.width;

        // Sprite houseContainer : Hauteur occupe 74% de l'écran / Largeur 60% de l'écran
        houseSprite.height = screenHeight * 0.74;
        houseSprite.width = (houseSprite.height / houseMaxHeight) * houseMaxWidth * 1.4;

        // Position du sprite houseContainer
        houseSprite.x = (screenWidth - houseSprite.width) / 2;
        houseSprite.y = 0;
    
        // Sprite menuContainer : La hauteur occupe 26% de l'écran / même largeur houseContainer
        menuSprite.height = app.screen.height * 0.26;
        menuSprite.width = (houseSprite.height / houseMaxHeight) * houseMaxWidth * 1.4;
        menuSprite.x = (screenWidth - menuSprite.width) / 2;
        // Le menu commence lorsque la maison termine
        menuSprite.y = houseSprite.height;

        const menuHeight = menuSprite.height
        const menuWidth = menuSprite.width;
        const menuXPosition = menuSprite.x;
        const menuYPosition = menuSprite.y;

    // Fonction pour positionner les boutons (NOTE : Logique détaillée dans 'old JS/logiquePositionMenuButtons.js')
    function adjustMenuButtonPosition(button, column, row) {
        const buttonWidth = menuWidth * (1 / 6);
        const buttonHeight = menuHeight * 0.3;

        button.width = buttonWidth;
        button.height = buttonHeight;

        button.x = menuXPosition + column * buttonWidth;
        button.y = menuYPosition + menuHeight * 0.1 + row * buttonHeight;
    }

    // POSITION DES BOUTONS (3 colonnes de 3 boutons)
        adjustMenuButtonPosition(menuButton, 0, 0);
        adjustMenuButtonPosition(menuButton2, 0, 1);
        adjustMenuButtonPosition(menuButton3, 0, 2);

        adjustMenuButtonPosition(menuButton4, 1, 0);
        adjustMenuButtonPosition(menuButton5, 1, 1);
        adjustMenuButtonPosition(menuButton6, 1, 2);

        adjustMenuButtonPosition(menuButton7, 2, 0);
        adjustMenuButtonPosition(menuButton8, 2, 1);
        adjustMenuButtonPosition(menuButton9, 2, 2);

    // POSITION DES BOUTONS ACTIFS
        adjustMenuButtonPosition(menuButtonActive, 0, 0);
        adjustMenuButtonPosition(menuButton2Active, 0, 1);
        adjustMenuButtonPosition(menuButton3Active, 0, 2);

        adjustMenuButtonPosition(menuButton4Active, 1, 0);
        adjustMenuButtonPosition(menuButton5Active, 1, 1);
        adjustMenuButtonPosition(menuButton6Active, 1, 2);
        
        adjustMenuButtonPosition(menuButton7Active, 2, 0);
        adjustMenuButtonPosition(menuButton8Active, 2, 1);
        adjustMenuButtonPosition(menuButton9Active, 2, 2);

    }
    
    // Fonction D'affichage des sprites
    async function displaySprite(path) {
        // path: SITORDI/sitorditalk.json par exemple
        const spritesheet = await PIXI.Assets.load(SPRITE_PATH_PREFIX + path);
        const frames = Object.keys(spritesheet.textures).map(frame => spritesheet.textures[frame]);
        const sprite = new PIXI.AnimatedSprite(frames);
        return sprite;
    }

    // Applique le redimensionnement à chaque événement 'resize'
    window.addEventListener('resize', adjustCanvasSize);

    // Ajuster la taille dès le chargement initial
    adjustCanvasSize();

    console.log("Tout s'est bien déclenché");
})();
