// import { loadSprites as default sprites} from './loadSprites.js';

export async function resizeHandler(apps, sprites) {

    const { app, blackScreen } = apps;
    const { houseSprite, houseContainer, metroTicket, disquette, menuItemDisquette, shelf, rails, toilePoulie416, guybrushP, guybrushF, menuItemGlassCoffe, menuItemMetroTicket, guybrushSOTIRED, guybrushSODISGUSTED, swPannel, guybrushSOSLEEPY, coffeMachine, coffeMachineCutsceneBG, coffeMachineClone, trash, poster, narrowTable, logoPHP, logoHTML, logoCSS, logoJS, logoMongo, logoMySQL, logoSymfony, innerHouseBGSprite, guybrushClone, interrupteur, pannel, guybrushD, lavabo, boutdemetal, boutdemetalShine, menuItemTabletPack, menuItemCoffePod, menuItemGlassWater, menuItemGlassWaterEmpty, menuButtonsInteractive, menuSprite, menuCoverDialogue, menuCoverDialogueOverlay, menuButton, menuButton2, menuButton3, menuButton4, menuButton5, menuButton6, menuButton7, menuButton8, menuButton9, crosshair, guybrush, guybrushWR, guybrushWL, guybrushLD, guybrushGU, guybrushSO, guybrushSOT, ordi, ordiRun, desk, gamingChair, gamingChairAR, guybrushIUL, guybrushIUR, reveil, table, tableOpen, toilePoulie, toilePoulieRun, toilePoulieReverse, terminal, terminalbgSprite, questionMark, noPanik, arrow, glasswater, waterpouring, chest, bed, music, musicActive, goldkey, menuItemGoldKey, menuItemMetalStrip, menuItemMetalStripSelected, menuItemGoldKeySelected, toileScreen, film1, playVideo, stopVideo, nextVideo, prevVideo, exitVideo, innerHouseSprite} = sprites;
    // const { wakeUpText, wakeUpText2, wakeUpText3 } = texts;

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

    function setZonePositionAndSizeINNERHOUSE(zone, positionXFactor, positionYFactor, scaleWidthFactor, scaleHeightFactor) {
        // Calcul de la taille de la zone
        const scaleFactor = Math.min(
            innerHouseSprite.width / scaleWidthFactor,
            innerHouseSprite.height / scaleHeightFactor
        );
    
        const zoneWidth = scaleFactor;
        const zoneHeight = scaleFactor;
    
        // Calcul de la position
        let x = innerHouseSprite.width * positionXFactor;
        let y = innerHouseSprite.height * positionYFactor;
    
        // Clamp horizontal
        if (x < 0) x = 0;
        if (x + zoneWidth > innerHouseSprite.width) {
            x = innerHouseSprite.width - zoneWidth;
        }
    
        // Clamp vertical
        if (y < 0) y = 0;
        if (y + zoneHeight > innerHouseSprite.height) {
            y = innerHouseSprite.height - zoneHeight;
        }
    
        // Appliquer position
        zone.x = x;
        zone.y = y;
    
        // Redessiner le rectangle
        zone.clear();
        // zone.beginFill(0xFF0000, 1);
        zone.beginFill(0xFFF5E1, 1);
        // zone.drawRect(0, 0, zoneWidth, zoneHeight);
        zone.drawRoundedRect(0, 0, zoneWidth, zoneHeight, 10); 
        zone.endFill();
    }

    // METHODE DE POSITIONNEMENT SUR L'ECRAN HELP (NOPANIK)  
    function setSpritePositionAndScaleSPECIAL(sprite, positionXFactor, positionYFactor, scaleWidthFactor, scaleHeightFactor) {
        sprite.x = noPanik.x + ((noPanik.width / 2) * positionXFactor);
        sprite.y = noPanik.y + ((noPanik.height / 2) * positionYFactor);
    
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
   
    // // Position du sprite houseContainer (et houseSprite)

    // // InnerHouseSprite
    
    // Position du sprite innerHouseContainer (et innerHouseSprite)


    // (A DEPLACER) Positionnement du Terminal - Special Screen


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

    // menuSprite.x = (screenWidth - menuSprite.width) / 2;
    // menuSprite.x = (screenWidth - menuSprite.width) / 2;
    menuSprite.x = 0;
    // menuSprite.x = screenWidth / 2;
    // Le menu commence lorsque la maison termine
    // menuSprite.y = houseSprite.height;
    menuSprite.y = 0;

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
    adjustMenuItemsPosition(menuItemGlassCoffe, 0, 0);
    adjustMenuItemsPosition(menuItemGlassWaterEmpty, 0, 0);
    adjustMenuItemsPosition(menuItemGoldKey, 1, 0);
    adjustMenuItemsPosition(menuItemTabletPack, 2, 0);
    adjustMenuItemsPosition(menuItemMetalStrip, 3, 0);
    adjustMenuItemsPosition(menuItemCoffePod, 0, 1);
    adjustMenuItemsPosition(menuItemMetroTicket, 1, 1);
    adjustMenuItemsPosition(menuItemDisquette, 2, 1);
    
    // sprite, scaleWidthFactor, scaleHeightFactor

    // Position du Crosshair
    setMovingSpriteScale(crosshair, 1300, 800);

    // Position Guybrush qui parle
    setMovingSpriteScale(guybrush, 800, 580);

    // Position Guybrush qui parle (clone)
    // setMovingSpriteScale(guybrushClone, 800, 580);

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

    // Position qui travaille sur ordi fatigué
    setMovingSpriteScale(guybrushSOTIRED, 850, 1250);

    // Position qui travaille sur ordi endormi
    setMovingSpriteScale(guybrushSOSLEEPY, 850, 1250);

    // Position qui parle sur ordi
    setMovingSpriteScale(guybrushSOT, 830, 1230);

    // Position qui parle sur ordi disgusted
    setMovingSpriteScale(guybrushSODISGUSTED, 830, 1230);

    // Position qui boit
    setMovingSpriteScale(guybrushD, 830, 1125);

    // Position idle qui tend la main à gauche
    setMovingSpriteScale(guybrushIUL, 860, 580);

    // Position idle qui tend la main à droite
    setMovingSpriteScale(guybrushIUR, 600, 800);

    // Position fallen
    setMovingSpriteScale(guybrushF, 600, 550);
    // réduction que son hitarea :
    guybrushF.hitArea = new PIXI.Rectangle(
        0,
        guybrushF.height * 0.4,
        guybrushF.width,
        guybrushF.height * 0.6
    );

    // Position pain
    setMovingSpriteScale(guybrushP, 600, 600);

    /// ELEMENTS & OBJECTS ///
    // sprite, positionXFactor, positionYFactor, scaleWidthFactor, scaleHeightFactor

    // Position Ordinateur
    setSpritePositionAndScaleINNERHOUSE(ordi, 0.096, 0.666, 770, 790);
    setSpritePositionAndScaleINNERHOUSE(ordiRun, 0.096, 0.666, 770, 790);

    // Position machine à café
    // setSpritePositionAndScaleINNERHOUSE(coffeMachine, 0.55, 0.78, 770, 4590);
    setSpritePositionAndScaleINNERHOUSE(coffeMachine, 0.025, 0.715, 770, 4590);

    // Position table étroite
    // setSpritePositionAndScaleINNERHOUSE(narrowTable, 0.52, 0.76, 770, 5090);
    setSpritePositionAndScaleINNERHOUSE(narrowTable, 0.016, 0.768, 770, 5590);

    // Position Poulie&Toile
    setSpritePositionAndScaleINNERHOUSE(toilePoulie, 0.37, 0.43, 770, 700);
    setSpritePositionAndScaleINNERHOUSE(toilePoulieRun, 0.37, 0.43, 770, 700);
    setSpritePositionAndScaleINNERHOUSE(toilePoulieReverse, 0.37, 0.43, 770, 700);
    setSpritePositionAndScaleINNERHOUSE(toilePoulie416, 0.37, 0.43, 770, 700);
   
    // Position Bureau
    setSpritePositionAndScaleINNERHOUSE(desk, 0.09, 0.793, 800, 780);

    // // Position displate
    // setSpritePositionAndScaleINNERHOUSE(pannel, 0.49, 0.59, 800, 960);
    
    // Position interrupteur
    setSpritePositionAndScaleINNERHOUSE(interrupteur, 0.105, 0.85, 800, 4000);

    // Position lavabo
    setSpritePositionAndScaleINNERHOUSE(lavabo, 0.42, 0.69, 800, 2300);

    // Position swPannel
    swPannel.height = innerHouseSprite.height * 0.13;
    swPannel.width = innerHouseSprite.width * 0.111;
    swPannel.x = innerHouseSprite.width * 0.472;
    swPannel.y = innerHouseSprite.height * 0.585;
    // swPannel.tint = 0x00FF00;
    // swPannel.alpha = 0.5;

    // Position Table et réveil
    setSpritePositionAndScaleINNERHOUSE(reveil, 0.9, 0.84, 800, 780);
    setSpritePositionAndScaleINNERHOUSE(table, 0.89, 0.89, 800, 750);
    setSpritePositionAndScaleINNERHOUSE(tableOpen, 0.89, 0.89, 800, 750);

    // Position Bout de metal
    setSpritePositionAndScaleINNERHOUSE(boutdemetal, 0.87, 0.89, 800, 500);

    // Position Bout de metal qui brille
    setSpritePositionAndScaleINNERHOUSE(boutdemetalShine, 0.87, 0.89, 800, 500);
    // Zone de hitarea
    boutdemetalShine.on('added', () => {
        const w = boutdemetalShine.width;
        const h = boutdemetalShine.height;
    
        // Position à 4h30 ≈ bas droit, vers 70% largeur et 85% hauteur
        const areaWidth = w * 0.6;
        const areaHeight = h * 0.6;
    
        const areaX = w * 0.7 - areaWidth / 2;
        const areaY = h * 0.85 - areaHeight / 2;
    
        boutdemetalShine.hitArea = new PIXI.Rectangle(areaX, areaY, areaWidth, areaHeight);
    });

    // Position GamingChair
    setSpritePositionAndScaleINNERHOUSE(gamingChair, 0.28, 0.765, 900, 1000);

    // Position GamingChair ArmRest
    setSpritePositionAndScaleINNERHOUSE(gamingChairAR, 0.28, 0.765, 900, 1000);

    // Position Coffre
    setSpritePositionAndScaleINNERHOUSE(chest, 0.32, 0.31, 500, 1000);

    // Position Disquette
    setSpritePositionAndScaleINNERHOUSE(disquette, 0.534, 0.875, 2000, 2000);

    // Position rails
    setSpritePositionAndScaleINNERHOUSE(rails, 0.32, 0.392, 730, 730);

    // Position Bed
    setSpritePositionAndScaleINNERHOUSE(bed, 0.68, 0.77, 500, 850);

    // Position Poubelle
    setZonePositionAndSizeINNERHOUSE(trash, 0.715, 0.8, 15, 15);

    // Position Etagère
    setZonePositionAndSizeINNERHOUSE(shelf, 0.76, 0.64, 5.5, 0);

    // Position Panneau secret
    setZonePositionAndSizeINNERHOUSE(poster, 0.483, 0.6, 9.5, 9.5);

    // Position Goldkey
    setSpritePositionAndScaleINNERHOUSE(goldkey, 0.81, 0.63, 400, 750);

    // Position verre d'eau
    setSpritePositionAndScaleINNERHOUSE(glasswater, 0.95, 0.86, 900, 6000);

    // (Action) verre d'eau qui se renverse
    setSpritePositionAndScaleINNERHOUSE(waterpouring, 0.84, 0.73, 600, 600);

    // Position ticket de métro sol
    setSpritePositionAndScaleINNERHOUSE(metroTicket, 0.57, 0.94, 900, 5000);


    /// SPECIAL ///

    // Position Arrow
    setSpritePositionAndScaleSPECIAL(arrow, 0.88, 0.88, 300, 2300);

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

    // Position Music Note
    // music.x = houseContainer.width - music.width - (houseContainer.width * 0.015);
    // music.y = 0 + (houseContainer.height * 0.03);

    // Dimensions Logos Technos

    // Machine à café cutscene BG
    setZonePositionAndSizeINNERHOUSE(coffeMachineCutsceneBG, 0.3, 0.2, 1.5, 1.5);
    // Machine à café Clone
    // setSpritePositionAndScale(coffeMachineClone, 0.1, 0.2, 700, 700);
    let scaleFactorCoffeMachine = (coffeMachineCutsceneBG.width * 0.71) / coffeMachineClone.width;
    coffeMachineClone.x = coffeMachineCutsceneBG.x + (coffeMachineCutsceneBG.width / 2);
    coffeMachineClone.y = coffeMachineCutsceneBG.y + (coffeMachineCutsceneBG.height / 2);
    coffeMachineClone.anchor.set(0.5);
    // coffeMachineClone.play();
    coffeMachineClone.scale.set(scaleFactorCoffeMachine);
    
    
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