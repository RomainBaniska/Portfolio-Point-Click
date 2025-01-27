export async function loadSprites(app) {

    const SPRITE_PATH_PREFIX = '../sprites/';

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
    crosshair.zIndex = 99;
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
    guybrushLD.clicked = false;

    // GET UP / AWAKENING
    const guybrushGU = await displaySprite('GETUP/get up.json', 0.12);
    guybrushGU.interactive = true;
    guybrushGU.play();

    // SIT ORDI
    const guybrushSO = await displaySprite('SITORDI/sitordi.json', 0.12);
    guybrushSO.play();
    guybrushSO.clicked = false;

    // SIT ORDI TALK
    const guybrushSOT = await displaySprite('SITORDI/sitorditalk.json', 0.12);
    // guybrushSOT.play();

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
    ordi.clicked = false;
    ordiRun.interactive = true;
    ordiRun.clicked = false;
    houseContainer.addChild(ordi);

    // BUREAU
    const deskAsset = await PIXI.Assets.load('../sprites/ELEMENTS/ordi/desk.png');
    const desk = new PIXI.Sprite(deskAsset);
    desk.anchor.set(0.5); 
    desk.interactive = true;
    houseContainer.addChild(desk);

    // TABLE DE NUIT ET REVEIL
    const table = await displaySprite('ELEMENTS/tablereveil/table.json', 0.12);
    table.play(0);
    table.interactive = true;
    houseContainer.addChild(table);
    table.zIndex = 5;
    const reveil = await displaySprite('ELEMENTS/tablereveil/reveil.json', 0.12);
    reveil.play(0);
    reveil.interactive = true;
    houseContainer.addChild(reveil);
    reveil.zIndex = 6;

    // VERRE D'EAU
    const glasswater = await displaySprite('ELEMENTS/glasswater/glasswater.json', 0.12);
    const glasswaterEmpty = await displaySprite('ELEMENTS/glasswater/glasswater.json', 0.12);
    const glasswaterspriteAsset = await PIXI.Assets.load('../sprites/ELEMENTS/glasswater/glasswater.json');
    const glasswaterframes = Object.keys(glasswaterspriteAsset.textures);
    glasswater.texture = glasswaterspriteAsset.textures[glasswaterframes[0]];
    glasswaterEmpty.texture = glasswaterspriteAsset.textures[glasswaterframes[1]];
    glasswater.zIndex = 7;
    glasswater.interactive = true;
    glasswater.stop();
    glasswater.anchor.set(0.5); 
    houseContainer.addChild(glasswater);
    // houseContainer.addChild(glasswaterEmpty);

    // VERRE D'EAU RENVERSE (ACTION)
    const waterpouring = await displaySprite('ELEMENTS/glasswater/waterpouring.json', 0.13);
    waterpouring.zIndex = 7;

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
    // gamingChairAR.interactive = false;
    gamingChairAR.zIndex = 5;

    //TOILEPOULIE
    const toilePoulie = await displaySprite('ELEMENTS/toilepoulie/toilepoulie.json', 0.12);
    const toilePoulieRun = await displaySprite('ELEMENTS/toilepoulie/toilepoulieRun.json', 0.12);
    toilePoulie.gotoAndStop(0); 
    toilePoulie.interactive = true;
    toilePoulie.interactive = false;
    toilePoulie.zIndex = 3;
    toilePoulieRun.zIndex = 3;
    toilePoulieRun.interactive = false;
    houseContainer.addChild(toilePoulie);

    //COFFRE
    const chest = await displaySprite('ELEMENTS/chest/chest.json', 0.12);
    chest.gotoAndStop(0); 
    chest.interactive = true;
    chest.zIndex = 3;
    houseContainer.addChild(chest);

    //////////////////////////////////////// SPECIAL SCREENS ////////////////////////////////

    // TERMINAL SCREEN
    const terminal = await displaySprite('TERMINAL/terminal.json', 0.12);
    const terminalbgAsset = await PIXI.Assets.load('../sprites/TERMINAL/terminalbg.png');
    const terminalbgSprite = new PIXI.Sprite(terminalbgAsset);
    terminalbgSprite.anchor.set(0.5, 0);
    terminal.anchor.set(0.5, 0);
    terminalbgSprite.zIndex = 10;
    terminal.zIndex = 11;
    // app.stage.addChild(terminalbgSprite);
    // app.stage.addChild(terminal);


    // QUESTIONMARK & HELP SCREEN
    const questionMark = await displaySprite('SPECIAL/questionMark.json', 0.12);
    const questionMarkActive = await displaySprite('SPECIAL/questionMark.json', 0.12);
    const questionMarkspriteAsset = await PIXI.Assets.load(SPRITE_PATH_PREFIX + 'SPECIAL/questionMark.json');
    const questionMarkframes = Object.keys(questionMarkspriteAsset.textures);
    questionMark.texture = questionMarkspriteAsset.textures[questionMarkframes[0]];
    questionMarkActive.texture = questionMarkspriteAsset.textures[questionMarkframes[1]];
    questionMark.anchor.set(0.5);
    questionMark.interactive = true;
    questionMark.stop();
    questionMarkActive.anchor.set(0.5);
    questionMarkActive.interactive = true;
    questionMarkActive.stop();
    houseContainer.addChild(questionMark);
    // houseContainer.addChild(questionMarkActive);
    const noPanikAsset = await PIXI.Assets.load('../sprites/SPECIAL/noPanik.png');
    const noPanik = new PIXI.Sprite(noPanikAsset);
    noPanik.anchor.set(0, 0);
    noPanik.zIndex = 95; 
    // app.stage.addChild(noPanik);

     // HOVER ET CLIC QUESTIONMARK
     questionMark.on('pointerover', () => {
        questionMark.texture = questionMarkActive.texture;
    });
    questionMark.on('pointerout', () => {
        questionMark.texture = questionMarkspriteAsset.textures[questionMarkframes[0]]; 
    });
    questionMark.on('click', () => {
        app.stage.addChild(noPanik);
        questionMark.texture = questionMarkspriteAsset.textures[questionMarkframes[0]]; 
    });

    // ARROW ON HELP SCREEN
    const arrow = await displaySprite('SPECIAL/arrow.json', 0.12);
    const arrowActive = await displaySprite('SPECIAL/arrow.json', 0.12);
    const arrowspriteAsset = await PIXI.Assets.load(SPRITE_PATH_PREFIX + 'SPECIAL/arrow.json');
    const arrowframes = Object.keys(arrowspriteAsset.textures);

    arrow.interactive = true;
    arrowActive.interactive = true;
    arrow.stop();
    arrowActive.stop();
    
    arrow.texture = arrowspriteAsset.textures[arrowframes[0]];
    arrowActive.texture = arrowspriteAsset.textures[arrowframes[1]];
    noPanik.addChild(arrow);

    // HOVER ET CLIC ARROW
    arrow.on('pointerover', () => {
        arrow.texture = arrowActive.texture; 
    });
    arrow.on('pointerout', () => {
        arrow.texture = arrowspriteAsset.textures[arrowframes[0]];
    });
    arrow.on('click', () => {
        app.stage.removeChild(noPanik);
        arrow.texture = arrowspriteAsset.textures[arrowframes[0]];
    });


   


    //////////////////////////////////////// ACTIONS MENU ////////////////////////////////

    async function displaySpriteButton(path) {
        const spriteAsset = await PIXI.Assets.load(SPRITE_PATH_PREFIX + path);
        const frames = Object.keys(spriteAsset.textures).map(frame => spriteAsset.textures[frame]);
        const sprite = new PIXI.AnimatedSprite(frames);
        return sprite;
    }

     // MENU CONTAINER 
     const menuContainer = new PIXI.Container();
     menuContainer.sortableChildren = true;
     app.stage.addChild(menuContainer);

     // MENU TEXTURE
     const menuAsset = await PIXI.Assets.load('../sprites/test sprite menu.png');
     const menuSprite = new PIXI.Sprite(menuAsset);
     menuContainer.addChild(menuSprite);

     // MENU COVER TEXTURE (Dialogues)
     const menuCoverDialogueAsset = await PIXI.Assets.load('../sprites/cover menu dialogue.jpg');
     const menuCoverDialogue = new PIXI.Sprite(menuCoverDialogueAsset);
     menuCoverDialogue.zIndex = 3;
     //  Surcouche du menuCoverDialogue
    const menuCoverDialogueOverlay = new PIXI.Sprite(menuCoverDialogueAsset);
    menuCoverDialogueOverlay.zIndex = 10;

    // MENU ITEMS Textures
    // Verre
    const menuItemGlassWaterAsset = await PIXI.Assets.load('../sprites/MENUITEM/glasswaterItem.png');
    const menuItemGlassWater = new PIXI.Sprite(menuItemGlassWaterAsset);
    menuItemGlassWater.interactive = true;
    menuItemGlassWater.item = true;
    // Verre Sélectionné
    const menuItemGlassWaterSelectedAsset = await PIXI.Assets.load('../sprites/MENUITEM/glasswaterItemSelected.png');
    const menuItemGlassWaterSelected = new PIXI.Sprite(menuItemGlassWaterSelectedAsset);
    menuItemGlassWaterSelected.interactive = true;
    menuItemGlassWaterSelected.item = true;

    // Verre vide
    const menuItemGlassWaterEmptyAsset = await PIXI.Assets.load('../sprites/MENUITEM/glasswaterItemempty.png');
    const menuItemGlassWaterEmpty = new PIXI.Sprite(menuItemGlassWaterEmptyAsset);
    menuItemGlassWaterEmpty.interactive = true;
    menuItemGlassWaterEmpty.item = true;
    // Verre vide Sélectionné
    const menuItemGlassWaterEmptySelectedAsset = await PIXI.Assets.load('../sprites/MENUITEM/glasswaterItemEmptySelected.png');
    const menuItemGlassWaterEmptySelected = new PIXI.Sprite(menuItemGlassWaterEmptySelectedAsset);
    menuItemGlassWaterEmptySelected.interactive = true;
    menuItemGlassWaterEmptySelected.item = true;
    
    // MENU BUTTONS Textures
    const menuButtonSprite = await displaySpriteButton('MENUACTION/inactive/button.json');
    const menuButtonSpriteActive = await displaySpriteButton('MENUACTION/active/button active.json');
    const menuButton = new PIXI.Sprite(menuButtonSprite);

    const menuButton2Sprite = await displaySpriteButton('MENUACTION/inactive/button2.json');
    const menuButton2SpriteActive = await displaySpriteButton('MENUACTION/active/button2 active.json');
    const menuButton2 = new PIXI.Sprite(menuButton2Sprite);

    const menuButton3Sprite = await displaySpriteButton('MENUACTION/inactive/button3.json');
    const menuButton3SpriteActive = await displaySpriteButton('MENUACTION/active/button3 active.json');
    const menuButton3 = new PIXI.Sprite(menuButton3Sprite);

    const menuButton4Sprite = await displaySpriteButton('MENUACTION/inactive/button4.json');
    const menuButton4SpriteActive = await displaySpriteButton('MENUACTION/active/button4 active.json');
    const menuButton4 = new PIXI.Sprite(menuButton4Sprite);

    const menuButton5Sprite = await displaySpriteButton('MENUACTION/inactive/button5.json');
    const menuButton5SpriteActive = await displaySpriteButton('MENUACTION/active/button5 active.json');
    const menuButton5 = new PIXI.Sprite(menuButton5Sprite);

    const menuButton6Sprite = await displaySpriteButton('MENUACTION/inactive/button6.json');
    const menuButton6SpriteActive = await displaySpriteButton('MENUACTION/active/button6 active.json');
    const menuButton6 = new PIXI.Sprite(menuButton6Sprite);

    const menuButton7Sprite = await displaySpriteButton('MENUACTION/inactive/button7.json');
    const menuButton7SpriteActive = await displaySpriteButton('MENUACTION/active/button7 active.json');
    const menuButton7 = new PIXI.Sprite(menuButton7Sprite);

    const menuButton8Sprite = await displaySpriteButton('MENUACTION/inactive/button8.json');
    const menuButton8SpriteActive = await displaySpriteButton('MENUACTION/active/button8 active.json');
    const menuButton8 = new PIXI.Sprite(menuButton8Sprite);

    const menuButton9Sprite = await displaySpriteButton('MENUACTION/inactive/button9.json');
    const menuButton9SpriteActive = await displaySpriteButton('MENUACTION/active/button9 active.json');
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
        menuButton9,
    );

    let currentlyActiveButton = null;
    // Méthode un changement de texture du menuButton lors du hover et clic des boutons d'action
    function menuButtonActivation(actionButton, inactiveSprite, activeSprite) {

        actionButton.interactive = true;
        actionButton.isActive = false;
        
        actionButton.on('pointerover', () => {
            if (actionButton.isActive === false) {
                actionButton.texture = activeSprite.texture; 
            } 
        });
        actionButton.on('pointerout', () => {
            if (actionButton.isActive === false) {
                actionButton.texture = inactiveSprite.texture; 
            }
        });
        actionButton.on('click', () => {
        // Si lors du clic sur le bouton d'action un autre bouton d'action est actif, on repasse l'ancien bouton actif sur "inactif" et on lui rend sa texture "inactif".
            if (currentlyActiveButton && currentlyActiveButton !== actionButton) {
                currentlyActiveButton.texture = currentlyActiveButton.sprite.texture;
                currentlyActiveButton.isActive = false;
            }
            // Si un item est actif, désélectionne-le et supprime son texte
            if (itemClicked) {
                if (currentItemText) {
                    app.stage.removeChild(currentItemText);
                    currentItemText.destroy();
                    currentItemText = null;
                }
                itemClicked = false;
            }
            if (actionButton.isActive === true) {
                actionButton.texture = inactiveSprite.texture;
                actionButton.isActive = false;
                currentlyActiveButton = null;
                console.log("désactivé");  
            } else {
                actionButton.texture = activeSprite.texture;
                actionButton.isActive = true;
                currentlyActiveButton = actionButton;
                console.log("activé");  
            }
            
        });

        actionButton.sprite = inactiveSprite; 
        actionButton.activeSprite = activeSprite;
    }
 
    // On applique menuButtonActivation pour chaque bouton
    menuButtonActivation(menuButton, menuButtonSprite, menuButtonSpriteActive);
    menuButtonActivation(menuButton2, menuButton2Sprite, menuButton2SpriteActive);
    menuButtonActivation(menuButton3, menuButton3Sprite, menuButton3SpriteActive);
    menuButtonActivation(menuButton4, menuButton4Sprite, menuButton4SpriteActive);
    menuButtonActivation(menuButton5, menuButton5Sprite, menuButton5SpriteActive);
    menuButtonActivation(menuButton6, menuButton6Sprite, menuButton6SpriteActive);
    menuButtonActivation(menuButton7, menuButton7Sprite, menuButton7SpriteActive);
    menuButtonActivation(menuButton8, menuButton8Sprite, menuButton8SpriteActive);
    menuButtonActivation(menuButton9, menuButton9Sprite, menuButton9SpriteActive);

    // Méthode d'activation de statut actif lors du clic sur l'item (menu droit)
    let currentlyActiveItem = null;
    function menuItemActivation(item, defaultTexture, selectedTexture) {
        // item.interactive = true;
        item.isActive = false;
        item.on('click', () => {
            if (item.isActive === true) {
                item.isActive = false;
                item.texture = defaultTexture;
                currentlyActiveItem = null;
                console.log("item désactivé");  
            } else {
                // Désactiver l'item actif précédent (si existant)
                if (currentlyActiveItem) {
                    currentlyActiveItem.isActive = false;
                    currentlyActiveItem.texture = defaultTexture;
                }
                item.isActive = true;
                item.texture = selectedTexture;
                currentlyActiveItem = item;
                console.log("item activé");  
            }
            });
    }
    menuItemActivation(menuItemGlassWater, menuItemGlassWater.texture, menuItemGlassWaterSelected.texture);
    menuItemActivation(menuItemGlassWaterEmpty, menuItemGlassWaterEmpty.texture, menuItemGlassWaterEmptySelected.texture);

    // Méthode pour associer un texte à une action (exemple : utiliser)
    // On crée un tableau associant chaque bouton aveà une action
    const buttonActions = [
    { button: menuButton, text: 'Donner' },
    { button: menuButton2, text: 'Ouvrir' },
    { button: menuButton3, text: 'Fermer' },
    { button: menuButton4, text: 'Prendre' },
    { button: menuButton5, text: 'Regarder' },
    { button: menuButton6, text: 'Parler à' },
    { button: menuButton7, text: 'Utiliser' },
    { button: menuButton8, text: 'Pousser' },
    { button: menuButton9, text: 'Tirer' }
    ];
    // Variables globales partagées
    let currentMenuText = null;
    let currentButton = null;

    // Fonction d'association, appliquée à chaque bouton
    buttonActions.forEach(({ button, text }) => {
    button.on('click', () => {
        if (currentButton === button) {
            // Si le bouton est déjà sélectionné
            if (currentMenuText) {
                if (itemClicked) {
                    itemClicked = false;
                    console.log("tebboune");
                }
                menuContainer.removeChild(currentMenuText);
                currentMenuText.destroy();
                currentMenuText = null;
                currentButton = null; 
            }
        } else {
            // Si un autre bouton est sélectionné
            if (currentMenuText) {
                menuContainer.removeChild(currentMenuText);
                currentMenuText.destroy();
                currentMenuText = null;
            }

            currentMenuText = new PIXI.Text(text, {
                fontFamily: 'MonkeyIslandMenu',
                fontSize: 11,
                fill: 0x772a76,
                align: 'center',
                fontWeight: 'bold'
            });

            menuContainer.addChild(currentMenuText);
            currentMenuText.x = app.screen.width / 2;
            currentMenuText.y = houseSprite.height + 2;

            currentButton = button;
        }
    });
});



    const offset = app.screen.width * 0.04;
    const offset2 = app.screen.width * 0.15;
    // Le nom du sprite
    let currentSpriteText = null;
    // Le nom de l'item
    let currentItemText = null;
    // Dit si l'item a été déjà cliqué
    let itemClicked = false;
    // Méthode pour associer un texte sur le menuContainer relatif au nom d'un item ou d'un sprite (hover et clic)
    function spriteActionText(sprite, actionText) {
        sprite.on('pointerover', () => {
            // lors du hover d'un sprite on clean le champs quoi qu'il arrive
            cleanupText();
            currentSpriteText = new PIXI.Text(actionText, {
                fontFamily: 'MonkeyIslandMenu',
                fontSize: 11,
                fill: 0x772a76,
                align: 'center',
                fontWeight: 'bold'
            });
            if (currentMenuText) {
                    if (itemClicked) {
                        currentMenuText.x = app.screen.width / 2 - offset;
                        currentSpriteText.x = app.screen.width / 2 + offset2;
                    }else {
                currentMenuText.x = app.screen.width / 2 - offset;
                currentSpriteText.x = app.screen.width / 2 + offset;
            }
            } else {
                currentSpriteText.x = app.screen.width / 2;
            }
            currentSpriteText.y = houseSprite.height + 2; // 2px pour ajuster la hauteur
            menuContainer.addChild(currentSpriteText);
        });

        sprite.on('pointerout', () => {
            // if (!itemClicked) {
                cleanupText();
            // }
        });
        sprite.on('removed', () => {
            cleanupText();
        });

         // Rajoute une condition : si le sprite est un item, alors cliquer sur le sprite enclenche une action
         sprite.on('click', () => {
            // menuButton7 équivaut à "utiliser"
            if (sprite.item && (currentButton == menuButton7 || currentButton == menuButton)) {
                if (itemClicked) {
                    app.stage.removeChild(currentItemText);
                    currentItemText.destroy();
                    currentItemText = null;
                    itemClicked = false;
                } else {
                    itemClicked = true;
                    console.log("item cliqué");
                    cleanupText();
                    // Création du texte pour l'item cliqué
                    if (currentButton == menuButton7) { 
                        currentItemText = new PIXI.Text(`${actionText} avec `, {
                        fontFamily: 'MonkeyIslandMenu',
                        fontSize: 11,
                        fill: 0x772a76,
                        align: 'center',
                        fontWeight: 'bold',
                         });
                         } else { 
                        currentItemText = new PIXI.Text(`${actionText} à `, {
                        fontFamily: 'MonkeyIslandMenu',
                        fontSize: 11,
                        fill: 0x772a76,
                        align: 'center',
                        fontWeight: 'bold',
                        });
                    }
                    if (currentMenuText) {
                    currentMenuText.x = app.screen.width / 2 - offset;
                    currentItemText.x = app.screen.width / 2 + offset;
                    } else {
                    currentItemText.x = app.screen.width / 2;
                        }
                    currentItemText.y = houseSprite.height + 2;
                    menuContainer.addChild(currentItemText);
                }
            }
        });

         // Ajout d'une action du clic-droit censé tout déselectionner :
        app.stage.on('rightdown', () => {
            document.addEventListener('contextmenu', (event) => {
                event.preventDefault();
            }, { once: true });
                        if (currentItemText) {
                            cleanupText();
                            app.stage.removeChild(currentItemText);
                            currentItemText.destroy();
                            currentItemText = null;
                        }
                        itemClicked = false;
                        console.log("décliqué");
                       
                        if (currentButton) {
                            currentButton.texture = currentButton.sprite.texture;
                            currentButton.isActive = false; 
                            currentlyActiveButton = null;
                            currentButton = null; 

                        }
                        if (currentMenuText) {
                            menuContainer.removeChild(currentMenuText);
                            currentMenuText.destroy();
                            currentMenuText = null;
                        }
            console.log("Clic droit détecté - tout est déselectionné");
        });
        
        function cleanupText() {
            // Si le nom du sprite existe on le détruit
                if (currentSpriteText) {
                    app.stage.removeChild(currentSpriteText);
                    currentSpriteText.destroy();
                    currentSpriteText = null;
                }
        }
    }

    // On rassemble les sprites dans un tableau
    const spriteActions = [
        { sprite: guybrushLD, actionText: "Romain" },
        { sprite: guybrush, actionText: "Romain" },
        { sprite: guybrushGU, actionText: "Romain" },
        { sprite: guybrushWL, actionText: "Romain" },
        { sprite: guybrushWR, actionText: "Romain" },
        { sprite: guybrushSO, actionText: "Romain" },
        { sprite: ordi, actionText: "ordinateur" },
        { sprite: ordiRun, actionText: "ordinateur" },
        { sprite: gamingChair, actionText: "chaise de bureau" },
        { sprite: toilePoulie, actionText: "toile" },
        { sprite: toilePoulieRun, actionText: "toile" },
        { sprite: reveil, actionText: "réveil matin" },
        { sprite: table, actionText: "table de nuit" },
        { sprite: chest, actionText: "coffre en métal" },
        { sprite: glasswater, actionText: "verre" },
        { sprite: menuItemGlassWater, actionText: "verre"},
        { sprite: menuItemGlassWaterEmpty, actionText: "verre vide"}
    ];

    // On applique le spriteActionText à chaque sprite du tableau
    spriteActions.forEach(({ sprite, actionText }) => {
        spriteActionText(sprite, actionText);
    });

    // On va assigner un ensemble de propriétés aux sprites clés pour les interactions (à repositionner dans chaque élément de sprite)
    guybrushSO.name = "guybrushSO";
    guybrushLD.name = "guybrushLD";
    toilePoulie.name = "toilePoulie";
    toilePoulieRun.name = "toilePoulieRun";
    reveil.name = "reveil";
    glasswater.name = "glasswater";
    ordi.name = "ordi";
    ordiRun.name = "ordiRun";
    gamingChair.name = "gamingChair";
    menuItemGlassWater.name ="menuItemGlassWater"
    menuItemGlassWaterEmpty.name ="menuItemGlassWaterEmpty"
    // menuItemGlassWater.name ="verre vide"
    

    // Idem pour les Boutons :
    // Boutons
    menuButton.action = "donner";
    menuButton2.action = "ouvrir";
    menuButton3.action = "fermer";
    menuButton4.action = "prendre";
    menuButton5.action = "regarder";
    menuButton6.action = "parler";
    menuButton7.action = "utiliser";
    menuButton8.action = "pousser";
    menuButton9.action = "tirer";

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
        reveil,
        table,
        toilePoulie,
        toilePoulieRun,
        glasswater,
        waterpouring,
        chest,
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
        // ITEMS
        // itemClicked,
        menuItemGlassWater,
        menuItemGlassWaterSelected,
        menuItemGlassWaterEmpty,
        menuItemGlassWaterEmptySelected,
        // MENU DIALOGUE
        menuCoverDialogue,
        menuCoverDialogueOverlay,
        // SPECIAL SCREENS
        terminal,
        terminalbgSprite,
        questionMark,
        questionMarkActive,
        noPanik,
        arrow,
    };
}

