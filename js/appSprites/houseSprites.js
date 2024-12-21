(async () => {

    // HOUSE CONTAINER
    const houseContainer = new PIXI.Container();
    houseContainer.sortableChildren = true;
    app.stage.addChild(houseContainer);
    // SPRITE DU HOUSE CONTAINER
    const houseSprite = await PIXI.Assets.load('../sprites/homeImproved.png');
    const house = new PIXI.Sprite(houseSprite);
    houseContainer.addChild(house); // Le container prend les coordonnées et dimensions du premier enfant

     // FONCTION D'AJUSTEMENT DES DIFFERENTS SPRITES ET CONTAINERS
     async function adjustCanvasSize() {
        app.renderer.resize(window.innerWidth, window.innerHeight);
    
        // Taille max du sprite
        const houseMaxHeight = 1024;
        const houseMaxWidth = 1440;

        // MAISON : La maison occupe 74% de l'écran
        house.height = app.screen.height * 0.74;
        const houseHeight = house.height;
        // Le calcul finit par 1.4 pour réduire la largeur de 40%
        house.width = (houseHeight / houseMaxHeight) * houseMaxWidth * 1.4;
        // Position de House
        house.x = (app.screen.width - house.width) / 2;
        house.y = 0;
    
        // MENU : Le menu occupe 26% de l'écran
        menuBackground.height = app.screen.height * 0.26;
        // On applique la même largeur que pour la maison
        menuBackground.width = (houseHeight / houseMaxHeight) * houseMaxWidth * 1.4;
        menuBackground.x = app.screen.width / 2;
        // Le menu commence lorsque la maison termine
        menuBackground.y = houseHeight;

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

    // Applique le redimensionnement à chaque événement 'resize'
    window.addEventListener('resize', adjustCanvasSize);

    // Ajuster la taille dès le chargement initial
    adjustCanvasSize();

    console.log("Tout s'est bien déclenché");

})();