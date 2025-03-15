// import { loadSprites as default sprites} from './loadSprites.js';

export async function resizeHandler(apps, sprites, texts) {

    const { app, blackScreen } = apps;
    const { houseSprite, menuItemTabletPack, menuItemGlassWater, menuItemGlassWaterEmpty, menuButtonsInteractive, menuSprite, menuCoverDialogue, menuCoverDialogueOverlay, menuButton, menuButton2, menuButton3, menuButton4, menuButton5, menuButton6, menuButton7, menuButton8, menuButton9, crosshair, guybrush, guybrushWR, guybrushWL, guybrushLD, guybrushGU, guybrushSO, guybrushSOT, ordi, ordiRun, desk, gamingChair, gamingChairAR, guybrushIUL, guybrushIUR, reveil, table, tableOpen, toilePoulie, toilePoulieRun, toilePoulieReverse, terminal, terminalbgSprite, questionMark, noPanik, arrow, glasswater, waterpouring, chest, bed, music, musicActive, goldkey, menuItemGoldKey, menuItemGoldKeySelected, toileScreen, film1, playVideo, stopVideo} = sprites;

    const { wakeUpText, wakeUpText2, wakeUpText3 } = texts;

function adjustCanvasSize() {
    app.renderer.resize(window.innerWidth, window.innerHeight);

    // METHODE DE POSITIONNEMENT DU SPRITE IMMOBILE  
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

    function setMovingSpriteScale(sprite, scaleWidthFactor, scaleHeightFactor) {
        // Ajustement de l'échelle proportionnelle
        const scaleFactor = Math.min(
            houseSprite.width / scaleWidthFactor,
            houseSprite.height / scaleHeightFactor
        );
        sprite.scale.set(scaleFactor);
    }

     // CONSTANTES HOUSECONTAINER & SCREEN
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

    // (A DEPLACER) Positionnement du Terminal - Special Screen
    terminal.x = screenWidth  * 0.5;
    terminal.y = 0;
    terminal.height = screenHeight;
    terminal.width = (houseSprite.height / houseMaxHeight) * houseMaxWidth;
    terminalbgSprite.x = screenWidth * 0.5;
    terminalbgSprite.y = 0;
    terminalbgSprite.height = screenHeight;
    terminalbgSprite.width = (houseSprite.height / houseMaxHeight) * houseMaxWidth * 1.4;
    // (A DEPLACER AUSSI) - POSITIONNEMENT DU HELP SCREEN - Special Screen
    noPanik.x = houseSprite.x;
    noPanik.y = 0;
    noPanik.height = screenHeight;
    noPanik.width = (houseSprite.height / houseMaxHeight) * houseMaxWidth * 1.4;
    // (A DEPLACER AUSSI) - POSITIONNEMENT DU TOILESCREEN - Special Screen
    toileScreen.x = houseSprite.x;
    toileScreen.y = 0;
    toileScreen.height = screenHeight;
    toileScreen.width = (houseSprite.height / houseMaxHeight) * houseMaxWidth * 1.4;
    // (A DEPLACER AUSSI) - Positionnement du Film 1 - Special Screen
    // film1.x = app.screen.width / 2;
    // film1.y = app.screen.height / 2;
    // film1.height = screenHeight * 0.85;
    // film1.width = ((houseSprite.height / houseMaxHeight) * houseMaxWidth * 1.4) * 0.85;


    // ACTION MENU
    // Sprite menuContainer : La hauteur occupe 26% de l'écran / même largeur houseContainer
    menuSprite.height = app.screen.height * 0.26;
    menuSprite.width = (houseSprite.height / houseMaxHeight) * houseMaxWidth * 1.4;
    menuSprite.x = (screenWidth - menuSprite.width) / 2;
    // Le menu commence lorsque la maison termine
    menuSprite.y = houseSprite.height;

    // CONSTANTES MENU
    const menuHeight = menuSprite.height
    const menuWidth = menuSprite.width;
    const menuXPosition = menuSprite.x;
    const menuYPosition = menuSprite.y;

    // CONSTANTES MENUCOVER (pour les dialogues) & Overlay
    menuCoverDialogue.height = menuHeight;
    menuCoverDialogue.width = menuWidth;
    menuCoverDialogue.x = menuXPosition;
    menuCoverDialogue.y = menuYPosition;
    menuCoverDialogueOverlay.height = menuHeight;
    menuCoverDialogueOverlay.width = menuWidth;
    menuCoverDialogueOverlay.x = menuXPosition;
    menuCoverDialogueOverlay.y = menuYPosition;

// Fonction pour positionner les boutons (NOTE : Logique détaillée dans 'old JS/logiquePositionMenuButtons.js')
function adjustMenuButtonPosition(button, column, row) {
    const buttonWidth = menuWidth * (1 / 6);
    const buttonHeight = menuHeight * 0.3;

    button.width = buttonWidth;
    button.height = buttonHeight;

    button.x = menuXPosition + column * buttonWidth;
    button.y = menuYPosition + menuHeight * 0.1 + row * buttonHeight;
}

// Fonction pour positionner les items
function adjustMenuItemsPosition(item, column, row) {
    const itemWidth = menuWidth * (1 / 8);
    const itemHeight = menuHeight * 0.3;

    item.width = itemWidth;
    item.height = itemHeight;

    item.x = menuSprite.x + (menuSprite.width / 2) + column * itemWidth;
    item.y = menuYPosition + menuHeight * 0.1 + row * itemHeight;
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

// POSITION DES ITEMS (4 colonnes de 3 boutons)
    adjustMenuItemsPosition(menuItemGlassWater, 0, 0);
    adjustMenuItemsPosition(menuItemGlassWaterEmpty, 0, 0);
    adjustMenuItemsPosition(menuItemGoldKey, 1, 0);
    adjustMenuItemsPosition(menuItemTabletPack, 2, 0);


    // sprite, scaleWidthFactor, scaleHeightFactor

    // Position du Crosshair
    setMovingSpriteScale(crosshair, 1300, 800);

    // Position Guybrush qui parle
    setMovingSpriteScale(guybrush, 1000, 600);

    // Position Guybrush qui marche à droite
    setMovingSpriteScale(guybrushWR, 850, 600);

    // Position qui marche à gauche
    setMovingSpriteScale(guybrushWL, 850, 600);

    // Position qui dort
    setMovingSpriteScale(guybrushLD, 850, 600);

    // Position qui se réveille et se lève
    setMovingSpriteScale(guybrushGU, 850, 600);

    // Position qui travaille sur ordi
    setMovingSpriteScale(guybrushSO, 850, 1250);

    // Position qui parle sur ordi
    setMovingSpriteScale(guybrushSOT, 830, 1230);

    // Position idle qui tend la main à gauche
    setMovingSpriteScale(guybrushIUL, 850, 570);

    // Position idle qui tend la main à droite
    setMovingSpriteScale(guybrushIUR, 600, 800);

    /// ELEMENTS & OBJECTS ///
    // sprite, positionXFactor, positionYFactor, scaleWidthFactor, scaleHeightFactor

    // Position Ordinateur
    setSpritePositionAndScale(ordi, 0.4, 0.73, 770, 790);
    setSpritePositionAndScale(ordiRun, 0.4, 0.73, 770, 790);

    // Position Poulie&Toile
    setSpritePositionAndScale(toilePoulie, 0.66, 0.58, 770, 700);
    setSpritePositionAndScale(toilePoulieRun, 0.66, 0.58, 770, 700);
    setSpritePositionAndScale(toilePoulieReverse, 0.66, 0.58, 770, 700);
   
    // Position Bureau
    setSpritePositionAndScale(desk, 0.42, 0.89, 800, 780);

    // Position Table et réveil
    setSpritePositionAndScale(reveil, 0.98, 0.871, 800, 780);
    setSpritePositionAndScale(table, 0.98, 0.94, 800, 750);
    setSpritePositionAndScale(tableOpen, 0.98, 0.94, 800, 750);

    // Position GamingChair
    setSpritePositionAndScale(gamingChair, 0.54, 0.875, 900, 1000);

    // Position GamingChair ArmRest
    setSpritePositionAndScale(gamingChairAR, 0.54, 0.875, 900, 1000);

    // Position Coffre
    setSpritePositionAndScale(chest, 0.54, 0.355, 500, 700);

    // Position Bed
    setSpritePositionAndScale(bed, 0.90, 0.883, 500, 850);

    // Position Goldkey
    setSpritePositionAndScale(goldkey, 0.92, 0.65, 500, 850);

    // Position verre d'eau
    setSpritePositionAndScale(glasswater, 0.9972, 0.882, 900, 6000);

    // (Action) verre d'eau qui se renverse
    setSpritePositionAndScale(waterpouring, 0.95, 0.775, 600, 600);

    /// SPECIAL ///
    // Position QuestionMark
    setSpritePositionAndScale(questionMark, 1.15, 0.08, 300, 2300);

    // Position Note de musique
    setSpritePositionAndScale(music, 1.15, 0.2, 300, 2300);

    // Position Arrow
    setSpritePositionAndScale(arrow, 1, 1.385, 300, 2300);

    // Position playVideo
    setSpritePositionAndScale(playVideo, 0.65, 1.20, 300, 1000);
    
    // Position stopVideo
    setSpritePositionAndScale(stopVideo, 0.65, 1.20, 300, 1000);
}

// Applique le redimensionnement à chaque événement 'resize'
window.addEventListener('resize', adjustCanvasSize);

// Redimensionnement dès le chargement initial
adjustCanvasSize();

console.log("tout s'est bien déclenché");
}