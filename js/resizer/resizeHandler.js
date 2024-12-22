export async function resizeHandler(app, sprites, texts) {

    const { houseSprite, menuButtonsInteractive, menuSprite, menuButton, menuButton2, menuButton3, menuButton4, menuButton5, menuButton6, menuButton7, menuButton8, menuButton9, crosshair, guybrush, guybrushWR, guybrushWL, guybrushLD, guybrushGU, guybrushSO, guybrushSOT, ordi, ordiRun, desk, gamingChair, gamingChairAR, guybrushIUL, guybrushIUR } = sprites;

    const { wakeUpText, wakeUpText2, wakeUpText3 } = texts;

function adjustCanvasSize() {
    app.renderer.resize(window.innerWidth, window.innerHeight);

    // METHODE DE POSITIONNEMENT DU SPRITE    
    function setSpritePositionAndScale(sprite, positionXFactor, positionYFactor, scaleWidthFactor, scaleHeightFactor) {
        sprite.x = houseSprite.width  * positionXFactor;
        sprite.y = houseSprite.height * positionYFactor;
    
        // Ajustement de l'échelle proportionnelle
        const scaleFactor = Math.min(
            houseSprite.width / scaleWidthFactor,
            houseSprite.height / scaleHeightFactor
        );
        sprite.scale.set(scaleFactor);
    }

     // Déclaration des constantes
     const houseMaxHeight = 1024;
     const houseMaxWidth = 1440;
     const screenHeight = app.screen.height;
     const screenWidth = app.screen.width;

    // Sprite houseContainer : Hauteur occupe 74% de l'écran / Largeur 60% de l'écran
    houseSprite.height = screenHeight * 0.74;
    houseSprite.width = (houseSprite.height / houseMaxHeight) * houseMaxWidth * 1.4; // à changer 

    // Position du sprite houseContainer
    houseSprite.x = (screenWidth - houseSprite.width) / 2;
    houseSprite.y = 0;

    // Action Menu
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


    // Sprite, Position X, Position Y, Largeur, Hauteur des éléments

    // Position du Crosshair
    setSpritePositionAndScale(crosshair, 0.5, 0.8, 2000, 1200);

    // Position Guybrush qui parle
    setSpritePositionAndScale(guybrush, 0.5, 0.83, 1000, 600);

    // Position Guybrush qui marche à droite
    setSpritePositionAndScale(guybrushWR, 0.25, 0.827, 850, 600);

    // Position qui marche à gauche
    setSpritePositionAndScale(guybrushWL, 0.74, 0.83, 850, 600);

    // Position qui dort
    setSpritePositionAndScale(guybrushLD, 0.74, 0.849, 850, 600);

    // Position qui se réveille et se lève
    setSpritePositionAndScale(guybrushGU, 0.74, 0.83, 850, 600);

    // Position qui travaille sur ordi
    setSpritePositionAndScale(guybrushSO, 0.29, 0.84, 850, 1250);

    // Position qui parle sur ordi
    setSpritePositionAndScale(guybrushSOT, 0.298, 0.84, 850, 1250);

    // Position idle qui tend la main à gauche
    setSpritePositionAndScale(guybrushIUL, 0.25, 0.827, 850, 570);

    // Position idle qui tend la main à droite
    setSpritePositionAndScale(guybrushIUR, 0.298, 0.84, 600, 800);

    /// ELEMENTS & OBJECTS ///

    // Position Ordinateur
    setSpritePositionAndScale(ordi, 0.2, 0.73, 770, 790);
    setSpritePositionAndScale(ordiRun, 0.2, 0.73, 770, 790);
   
    // Position Bureau
    setSpritePositionAndScale(desk, 0.22, 0.89, 800, 780);

    // Position GamingChair
    setSpritePositionAndScale(gamingChair, 0.328, 0.885, 900, 1000);

    // Position GamingChair ArmRest
    setSpritePositionAndScale(gamingChairAR, 0.328, 0.885, 900, 1000);
}

// Applique le redimensionnement à chaque événement 'resize'
window.addEventListener('resize', adjustCanvasSize);

// Redimensionnement dès le chargement initial
adjustCanvasSize();

console.log("tout s'est bien déclenché");
}