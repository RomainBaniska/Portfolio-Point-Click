// import { loadSprites as default sprites} from './loadSprites.js';

export async function resizeHandler(apps, sprites, texts) {

    const { app, blackScreen } = apps;
    const { houseSprite, houseContainer, innerHouseBGSprite, boutdemetal, menuItemTabletPack, menuItemGlassWater, menuItemGlassWaterEmpty, menuButtonsInteractive, menuSprite, menuCoverDialogue, menuCoverDialogueOverlay, menuButton, menuButton2, menuButton3, menuButton4, menuButton5, menuButton6, menuButton7, menuButton8, menuButton9, crosshair, guybrush, guybrushWR, guybrushWL, guybrushLD, guybrushGU, guybrushSO, guybrushSOT, ordi, ordiRun, desk, gamingChair, gamingChairAR, guybrushIUL, guybrushIUR, reveil, table, tableOpen, toilePoulie, toilePoulieRun, toilePoulieReverse, terminal, terminalbgSprite, questionMark, noPanik, arrow, glasswater, waterpouring, chest, bed, music, musicActive, goldkey, menuItemGoldKey, menuItemGoldKeySelected, toileScreen, film1, playVideo, stopVideo, nextVideo, prevVideo, exitVideo, innerHouseSprite} = sprites;
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

    function setSpritePositionAndScaleINNERHOUSE(sprite, positionXFactor, positionYFactor, scaleWidthFactor, scaleHeightFactor) {
        // Position initiale
        // sprite.x = innerHouseSprite.width * positionXFactor;
        sprite.x = innerHouseSprite.width * positionXFactor;
        sprite.y = innerHouseSprite.height * positionYFactor;
    
        // Ajustement de l'échelle proportionnelle
        const scaleFactor = Math.min(
            innerHouseSprite.width / scaleWidthFactor,
            innerHouseSprite.height / scaleHeightFactor
        );
        sprite.scale.set(scaleFactor);
    
        // Calcul des dimensions réelles du sprite
        const spriteWidth = sprite.width;
        const spriteHeight = sprite.height;
    
        // Clamp horizontal
        if (sprite.x < 0) sprite.x = 0;
        if (sprite.x + spriteWidth > innerHouseSprite.width) {
            sprite.x = innerHouseSprite.width - spriteWidth;
        }
    
        // Clamp vertical
        if (sprite.y < 0) sprite.y = 0;
        if (sprite.y + spriteHeight > innerHouseSprite.height) {
            sprite.y = innerHouseSprite.height - spriteHeight;
        }
    }

    // METHODE DE POSITIONNEMENT SUR L'ECRAN HELP (NOPANIK)  
    function setSpritePositionAndScaleSPECIAL(sprite, positionXFactor, positionYFactor, scaleWidthFactor, scaleHeightFactor) {
        sprite.x = noPanik.x  * positionXFactor;
        sprite.y = noPanik.y * positionYFactor;
    
        // Ajustement de l'échelle proportionnelle
        const scaleFactor = Math.min(
            noPanik.width / scaleWidthFactor,
            noPanik.height / scaleHeightFactor
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
    //  const innerHouseMaxHeight = houseMaxHeight;
     const innerHouseMaxWidth = 1055;
     const screenHeight = app.screen.height;
     const screenWidth = app.screen.width;

    // // Sprite houseContainer : Hauteur occupe 74% de l'écran / Largeur 60% de l'écran
    // houseSprite.height = screenHeight * 0.74;
    // houseSprite.width = (houseSprite.height / houseMaxHeight) * houseMaxWidth * 1.4; // à changer 

    // // Position du sprite houseContainer (et houseSprite)
    // // houseSprite.x = screenWidth / 2;
    // houseSprite.x = (app.screen.width - houseSprite.width) / 2;
    // houseSprite.y = 0;
    // houseSprite.x = (app.screen.width - houseSprite.width) / 2;
    // houseSprite.y = 0;

    // // InnerHouseSprite
    // innerHouseSprite.height = screenHeight * 0.74;
    // innerHouseSprite.width = (innerHouseSprite.height / houseMaxHeight) * innerHouseMaxWidth * 1.4; // à changer 

    // // Position du sprite innerHouseContainer (et innerHouseSprite)
    // innerHouseSprite.x = (app.screen.width - innerHouseSprite.width) / 2;
    // innerHouseSprite.y = 0;

    // (A DEPLACER) Positionnement du Terminal - Special Screen
    // terminal.x = screenWidth  * 0.5;
    // terminal.y = 0;
    // terminal.height = screenHeight;
    // terminal.width = (houseSprite.height / houseMaxHeight) * houseMaxWidth;
    // terminalbgSprite.x = screenWidth * 0.5;
    // terminalbgSprite.y = 0;
    // terminalbgSprite.height = screenHeight;
    // terminalbgSprite.width = (houseSprite.height / houseMaxHeight) * houseMaxWidth * 1.4;
    // (A DEPLACER AUSSI) - POSITIONNEMENT DU HELP SCREEN - Special Screen
    noPanik.x = screenWidth / 2;
    noPanik.y = screenHeight / 2;
    noPanik.height = screenHeight;
    noPanik.width = (houseSprite.height / houseMaxHeight) * houseMaxWidth * 1.4;
    // (A DEPLACER AUSSI) - POSITIONNEMENT DU TOILESCREEN - Special Screen
    toileScreen.anchor.set(0, 0);
    toileScreen.x = houseContainer.x;
    toileScreen.y = 0;
    toileScreen.height = screenHeight;
    toileScreen.width = (houseSprite.height / houseMaxHeight) * houseMaxWidth * 1.4;

    // ACTION MENU
    // Sprite menuContainer : La hauteur occupe 26% de l'écran / même largeur houseContainer
    menuSprite.height = app.screen.height * 0.26;
    menuSprite.width = (houseSprite.height / houseMaxHeight) * houseMaxWidth * 1.4;

    menuSprite.x = (screenWidth - menuSprite.width) / 2;
    // menuSprite.x = screenWidth / 2;
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
    // console.log(menuXPosition);
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
    // Largeur et hauteur des items
    const itemWidth = menuWidth * (1 / 8);
    const itemHeight = menuHeight * 0.3;

    item.width = itemWidth;
    item.height = itemHeight;

    item.x = menuSprite.x + (menuSprite.width / 2) + column * itemWidth;
    item.y = menuYPosition + menuHeight * 0.1 + row * itemHeight;
}

function resizeButtons() {
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
}
resizeButtons();


// POSITION DES ITEMS (4 colonnes de 3 boutons)
    adjustMenuItemsPosition(menuItemGlassWater, 0, 0);
    adjustMenuItemsPosition(menuItemGlassWaterEmpty, 0, 0);
    adjustMenuItemsPosition(menuItemGoldKey, 1, 0);
    adjustMenuItemsPosition(menuItemTabletPack, 2, 0);

    // sprite, scaleWidthFactor, scaleHeightFactor

    // Position du Crosshair
    setMovingSpriteScale(crosshair, 1300, 800);

    // Position Guybrush qui parle
    setMovingSpriteScale(guybrush, 800, 580);

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
    setMovingSpriteScale(guybrushIUL, 860, 580);

    // Position idle qui tend la main à droite
    setMovingSpriteScale(guybrushIUR, 600, 800);

    /// ELEMENTS & OBJECTS ///
    // sprite, positionXFactor, positionYFactor, scaleWidthFactor, scaleHeightFactor

    // Position Ordinateur
    setSpritePositionAndScaleINNERHOUSE(ordi, 0.096, 0.666, 770, 790);
    setSpritePositionAndScaleINNERHOUSE(ordiRun, 0.096, 0.666, 770, 790);

    // Position Poulie&Toile
    setSpritePositionAndScaleINNERHOUSE(toilePoulie, 0.37, 0.43, 770, 700);
    setSpritePositionAndScaleINNERHOUSE(toilePoulieRun, 0.37, 0.43, 770, 700);
    setSpritePositionAndScaleINNERHOUSE(toilePoulieReverse, 0.37, 0.43, 770, 700);
   
    // Position Bureau
    setSpritePositionAndScaleINNERHOUSE(desk, 0.09, 0.793, 800, 780);

    // Position Table et réveil
    setSpritePositionAndScaleINNERHOUSE(reveil, 0.9, 0.84, 800, 780);
    setSpritePositionAndScaleINNERHOUSE(table, 0.89, 0.89, 800, 750);
    setSpritePositionAndScaleINNERHOUSE(tableOpen, 0.89, 0.89, 800, 750);

    // Position Bout de metal
    setSpritePositionAndScaleINNERHOUSE(boutdemetal, 0.87, 0.89, 800, 500);

    // Position GamingChair
    setSpritePositionAndScaleINNERHOUSE(gamingChair, 0.28, 0.765, 900, 1000);

    // Position GamingChair ArmRest
    setSpritePositionAndScaleINNERHOUSE(gamingChairAR, 0.28, 0.765, 900, 1000);

    // Position Coffre
    setSpritePositionAndScaleINNERHOUSE(chest, 0.32, 0.28, 500, 700);

    // Position Bed
    setSpritePositionAndScaleINNERHOUSE(bed, 0.68, 0.77, 500, 850);

    // Position Goldkey
    setSpritePositionAndScaleINNERHOUSE(goldkey, 0.81, 0.63, 400, 750);

    // Position verre d'eau
    setSpritePositionAndScaleINNERHOUSE(glasswater, 0.95, 0.86, 900, 6000);

    // (Action) verre d'eau qui se renverse
    setSpritePositionAndScaleINNERHOUSE(waterpouring, 0.84, 0.73, 600, 600);

    /// SPECIAL ///
    // Position QuestionMark
    // setSpritePositionAndScale(questionMark, 1.15, 0.04, 300, 2300);
    // questionMark.x = houseSprite.x + houseSprite.width - questionMark.width;
    // questionMark.y = houseSprite.y; // Si houseContainer commence au bord supérieur de l'écran
    // questionMark.anchor.set(0, 0);
    // questionMark.x = 0;
    // questionMark.height = screenHeight * 0.74;
    // questionMark.width = (innerHouseSprite.height / houseMaxHeight) * innerHouseMaxWidth * 1.4; // à changer 
    // const desiredHeight = innerHouseSprite.height * 0.2;
    // const scaleFactor22 = desiredHeight / questionMark.height;
    // questionMark.scale.set(scaleFactor22);

    // Position Note de musique
    // setSpritePositionAndScale(music, 1.15, 0.17, 300, 2300);

    // Position Arrow
    setSpritePositionAndScaleSPECIAL(arrow, 1.7, 1.9, 300, 2300);

    // Position playVideo
    setSpritePositionAndScale(playVideo, 0.65, 1.20, 300, 1000);
    
    // Position stopVideo
    setSpritePositionAndScale(stopVideo, 0.65, 1.20, 300, 1000);

    // Position exitVideo
    setSpritePositionAndScale(exitVideo, 1.05, 0.11, 300, 1000);

    // Position nextVideo
    setSpritePositionAndScale(nextVideo, 0.65 + (100 / window.innerWidth), 1.20, 300, 900);

    // Position prevVideo
    setSpritePositionAndScale(prevVideo, 0.65 - (100 / window.innerWidth), 1.20, 300, 900);
}

// Applique le redimensionnement à chaque événement 'resize'
window.addEventListener('resize', () => {
    adjustCanvasSize();
    // resizeButtons();
});

// Redimensionnement dès le chargement initial
adjustCanvasSize();
// resizeButtons();
}