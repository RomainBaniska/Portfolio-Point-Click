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

    // HOUSE CONTAINER
     const houseContainer = new PIXI.Container();
     houseContainer.sortableChildren = true;
     app.stage.addChild(houseContainer);
    
    // Chargement de la texture du background
    const houseSprite = await PIXI.Assets.load('../sprites/homeImproved.png');
    const house = new PIXI.Sprite(houseSprite);
    // house.anchor.set(0.5, 0);
    // Le container prend les coordonnées et dimensions du premier enfant
    houseContainer.addChild(house);

    // MENU CONTAINER
    const menuContainer = new PIXI.Container();
    menuContainer.sortableChildren = true;
    // menuContainer.anchor.set(0.5, 0); 
    app.stage.addChild(menuContainer);

    // Menu Background
    const menuBackgroundSprite = await PIXI.Assets.load('../sprites/test sprite menu.png');
    const menuBackground = new PIXI.Sprite(menuBackgroundSprite);
    menuBackground.anchor.set(0.5, 0);
    // Le container prend les coordonnées et dimensions du premier enfant
    menuContainer.addChild(menuBackground);

    // Exemple clair Button 1
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
    
    function createButtonInteraction(menuButton, menuButtonSprite, menuButtonActive, menuContainer) {
        menuButton.interactive = true;
        menuButton.on('pointerover', () => {
            menuContainer.addChild(menuButtonActive);
            menuButton.texture = menuButtonActive.texture;  
        });
        menuButton.on('pointerout', () => {
            menuContainer.removeChild(menuButtonActive);
            menuButton.texture = menuButtonSprite.texture; 
        });
    }
    
    createButtonInteraction(menuButton, menuButtonSprite, menuButtonActive, menuContainer);
    createButtonInteraction(menuButton2, menuButton2Sprite, menuButton2Active, menuContainer);
    createButtonInteraction(menuButton3, menuButton3Sprite, menuButton3Active, menuContainer);
    createButtonInteraction(menuButton4, menuButton4Sprite, menuButton4Active, menuContainer);
    createButtonInteraction(menuButton5, menuButton5Sprite, menuButton5Active, menuContainer);
    createButtonInteraction(menuButton6, menuButton6Sprite, menuButton6Active, menuContainer);
    createButtonInteraction(menuButton7, menuButton7Sprite, menuButton7Active, menuContainer);
    createButtonInteraction(menuButton8, menuButton8Sprite, menuButton8Active, menuContainer);
    createButtonInteraction(menuButton9, menuButton9Sprite, menuButton9Active, menuContainer);
    

    async function adjustCanvasSize() {
        app.renderer.resize(window.innerWidth, window.innerHeight);
    
        // Taille max du sprite
        const houseMaxHeight = 1024;
        const houseMaxWidth = 1440;

        // MAISON : La maison occupe 74% de l'écran
        house.height = app.screen.height * 0.74;
        // Le calcul finit par 1.4 pour réduire la largeur de 40%
        house.width = (house.height / houseMaxHeight) * houseMaxWidth * 1.4;
        // Position de House
        house.x = (app.screen.width - house.width) / 2;
        house.y = 0;
    
        // MENU : Le menu occupe 26% de l'écran
        menuBackground.height = app.screen.height * 0.26;
        // On applique la même largeur que pour la maison
        menuBackground.width = (house.height / houseMaxHeight) * houseMaxWidth * 1.4;
        menuBackground.x = app.screen.width / 2;
        // Le menu commence lorsque la maison termine
        menuBackground.y = house.height;

        const menuHeight = menuBackground.height
        const menuWidth = menuBackground.width;
        const menuXPosition = menuBackground.x;
        const menuYPosition = menuBackground.y;

    // Fonction pour positionner les boutons (NOTE : Logique détaillée dans 'logiquePositionMenuButtons.js')
    function adjustMenuButtonPosition(button, column, row) {
        const buttonWidth = menuWidth * (1 / 6);
        const buttonHeight = menuHeight * 0.3;

        button.width = buttonWidth;
        button.height = buttonHeight;

        button.x = menuXPosition - menuWidth / 2 + column * buttonWidth;
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

    // async function menuButtonHover(button) {

    // }

    // Applique le redimensionnement à chaque événement 'resize'
    window.addEventListener('resize', adjustCanvasSize);

    // Ajuster la taille dès le chargement initial
    adjustCanvasSize();

    console.log("Tout s'est bien déclenché");
})();
