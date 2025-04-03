export async function loadSprites(apps, sounds) {

    const { app, blackScreen } = apps;
    const { daythemeSound } = sounds;

    const SPRITE_PATH_PREFIX = '../sprites/';

    // VARIABLES GLOBALES 

       // Le nom du sprite qui s'affiche lors du hover
       let currentSpriteText = null;
       // Le nom de l'item qui s'affiche lors du hover
       let currentItemText = null;
       // Valeur qui indique si l'item a été déjà cliqué
       let itemClicked = false;
       // Le texte qui s'affiche renvoyant au nom du bouton d'action lorsqu'il est cliqué
       let currentActionText = null;
       // Le bouton d'action (inactif ?)
       let currentActionButton = null;
       // Le bouton d'action actif
       let currentlyActiveButton = null;
       // l'item actif
       let currentlyActiveItem = null;

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
    const houseAsset = await PIXI.Assets.load('../sprites/homeImproved5.png');
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

    // GOLD KEY
    const goldkeyAsset = await PIXI.Assets.load('../sprites/ELEMENTS/goldkey/goldkey.png');
    const goldkey = new PIXI.Sprite(goldkeyAsset);
    goldkey.anchor.set(0.5); 
    goldkey.interactive = true;
    houseContainer.addChild(goldkey);

    // TABLE DE NUIT ET REVEIL
    const reveilAsset = await PIXI.Assets.load('../sprites/ELEMENTS/tablereveil/splitted/reveil.png');
    const reveil = new PIXI.Sprite(reveilAsset);
    reveil.anchor.set(0.5); 
    reveil.interactive = true;
    reveil.zIndex = 7;
    houseContainer.addChild(reveil);
    const table = await displaySprite('ELEMENTS/tablereveil/splitted/table.json', 0.12);
    table.gotoAndStop(0);
    table.interactive = true;
    houseContainer.addChild(table);
    table.zIndex = 6;
    const tableOpen = await displaySprite('ELEMENTS/tablereveil/splitted/table.json', 0.12);
    tableOpen.play(1);
    tableOpen.gotoAndStop(1);
   

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
    gamingChairAR.eventMode = "none";
    // gamingChairAR.interactive = false;
    gamingChairAR.zIndex = 5;

    // TOILEPOULIE
    const toilePoulie = await displaySprite('ELEMENTS/toilepoulie/toilepoulie.json', 0.12);
    const toilePoulieRun = await displaySprite('ELEMENTS/toilepoulie/toilepoulieRun.json', 0.12);
    toilePoulie.gotoAndStop(0); 
    toilePoulie.interactive = true;
    toilePoulie.interactive = false;
    toilePoulie.zIndex = 3;
    toilePoulieRun.zIndex = 3;
    toilePoulieRun.interactive = false;
    houseContainer.addChild(toilePoulie);
    // TOILEPOULIE - Reverse
    const toilePoulieReverse = await displaySprite('ELEMENTS/toilepoulie/toilepoulieReverse.json', 0.12);
    toilePoulieReverse.zIndex = 3;
    toilePoulieReverse.interactive = false;

    // COFFRE
    const chest = await displaySprite('ELEMENTS/chest/chest.json', 0.12);
    chest.gotoAndStop(0); 
    chest.interactive = true;
    chest.zIndex = 3;
    houseContainer.addChild(chest);

    // BED
    const bedAsset = await PIXI.Assets.load('../sprites/ELEMENTS/bed/bed.png');
    const bed = new PIXI.Sprite(bedAsset);
    bed.anchor.set(0.5); 
    desk.interactive = false;
    houseContainer.addChild(bed);

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

    // TOILE SCREEN
    const toileScreenAsset = await PIXI.Assets.load('../sprites/SPECIAL/toileScreen.png');
    const toileScreen = new PIXI.Sprite(toileScreenAsset);
    toileScreen.zIndex = 10;

    // TOILE SCREEN ALERTS - Le changement default/active se fait dans "interactions.js"
    // PLAY VIDEO ALERT
    const playVideo = await displaySprite('SPECIAL/toileAlerts/startHover.json', 0.12);
    const playVideoActive = await displaySprite('SPECIAL/toileAlerts/startHover.json', 0.12);
    const playVideospriteAsset = await PIXI.Assets.load(SPRITE_PATH_PREFIX + 'SPECIAL/toileAlerts/startHover.json');
    const playVideoframes = Object.keys(playVideospriteAsset.textures);
    playVideo.texture = playVideospriteAsset.textures[playVideoframes[0]];
    playVideoActive.texture = playVideospriteAsset.textures[playVideoframes[1]];
    playVideo.zIndex = 11;
    playVideo.anchor.set(0.5);
    playVideo.interactive = true;
    playVideo.stop();
    playVideoActive.anchor.set(0.5);
    playVideoActive.interactive = true;
    playVideoActive.stop();
    // STOP VIDEO ALERT
    const stopVideo = await displaySprite('SPECIAL/toileAlerts/pauseHover.json', 0.12);
    const stopVideoActive = await displaySprite('SPECIAL/toileAlerts/pauseHover.json', 0.12);
    const stopVideospriteAsset = await PIXI.Assets.load(SPRITE_PATH_PREFIX + 'SPECIAL/toileAlerts/pauseHover.json');
    const stopVideoframes = Object.keys(stopVideospriteAsset.textures);
    stopVideo.texture = stopVideospriteAsset.textures[stopVideoframes[0]];
    stopVideoActive.texture = stopVideospriteAsset.textures[stopVideoframes[1]];
    stopVideo.zIndex = 11;
    stopVideo.anchor.set(0.5);
    stopVideo.interactive = true;
    stopVideo.stop();
    stopVideoActive.anchor.set(0.5);
    stopVideoActive.interactive = true;
    stopVideoActive.stop();
    // NEXT VIDEO ALERT
    const nextVideo = await displaySprite('SPECIAL/toileAlerts/next-sheet.json', 0.12);
    const nextVideoActive = await displaySprite('SPECIAL/toileAlerts/next-sheet.json', 0.12);
    const nextVideospriteAsset = await PIXI.Assets.load(SPRITE_PATH_PREFIX + 'SPECIAL/toileAlerts/next-sheet.json');
    const nextVideoframes = Object.keys(nextVideospriteAsset.textures);
    nextVideo.texture = nextVideospriteAsset.textures[nextVideoframes[0]];
    nextVideoActive.texture = nextVideospriteAsset.textures[nextVideoframes[1]];
    nextVideo.zIndex = 11;
    nextVideo.anchor.set(0.5);
    nextVideo.interactive = true;
    nextVideo.stop();
    nextVideoActive.anchor.set(0.5);
    nextVideoActive.interactive = true;
    nextVideoActive.stop();

    // PREVIOUS VIDEO ALERT
    const prevVideo = await displaySprite('SPECIAL/toileAlerts/prev-sheet.json', 0.12);
    const prevVideoActive = await displaySprite('SPECIAL/toileAlerts/prev-sheet.json', 0.12);
    const prevVideospriteAsset = await PIXI.Assets.load(SPRITE_PATH_PREFIX + 'SPECIAL/toileAlerts/prev-sheet.json');
    const prevVideoframes = Object.keys(prevVideospriteAsset.textures);
    prevVideo.texture = prevVideospriteAsset.textures[prevVideoframes[0]];
    prevVideoActive.texture = prevVideospriteAsset.textures[prevVideoframes[1]];
    prevVideo.zIndex = 11;
    prevVideo.anchor.set(0.5);
    prevVideo.interactive = true;
    prevVideo.stop();
    prevVideoActive.anchor.set(0.5);
    prevVideoActive.interactive = true;
    prevVideoActive.stop();

    // EXIT ALERT
    const exitVideo = await displaySprite('SPECIAL/toileAlerts/exit-sheet.json', 0.12);
    const exitVideoActive = await displaySprite('SPECIAL/toileAlerts/exit-sheet.json', 0.12);
    const exitVideospriteAsset = await PIXI.Assets.load(SPRITE_PATH_PREFIX + 'SPECIAL/toileAlerts/exit-sheet.json');
    const exitVideoframes = Object.keys(exitVideospriteAsset.textures);
    exitVideo.texture = exitVideospriteAsset.textures[exitVideoframes[0]];
    exitVideoActive.texture = exitVideospriteAsset.textures[exitVideoframes[1]];
    exitVideo.zIndex = 11;
    exitVideo.anchor.set(0.5);
    exitVideo.interactive = true;
    exitVideo.stop();
    exitVideoActive.anchor.set(0.5);
    exitVideoActive.interactive = true;
    exitVideoActive.stop();



    // MUSIC TOGGLE
    const music = await displaySprite('SPECIAL/musicnote.json', 0.12);
    const musicActive = await displaySprite('SPECIAL/musicnote.json', 0.12);
    const musicspriteAsset = await PIXI.Assets.load(SPRITE_PATH_PREFIX + 'SPECIAL/musicnote.json');
    const musicframes = Object.keys(musicspriteAsset.textures);
    music.texture = musicspriteAsset.textures[musicframes[0]];
    musicActive.texture = musicspriteAsset.textures[musicframes[1]];
    music.anchor.set(0.5);
    music.interactive = true;
    music.stop();
    musicActive.anchor.set(0.5);
    musicActive.interactive = true;
    musicActive.stop();
    houseContainer.addChild(music);

    let daythemePLAY = null;
    let musicToggled = false;
    // HOVER ET CLIC MUSIC
    music.on('pointerover', () => {
        if (musicToggled === false) {
        if (music.texture === musicspriteAsset.textures[musicframes[0]]) {
            music.texture = musicspriteAsset.textures[musicframes[1]];
        } else if (music.texture === musicspriteAsset.textures[musicframes[1]]) {
            music.texture = musicspriteAsset.textures[musicframes[0]];
        }
    }
    });
    
    music.on('pointerout', () => {
        if (musicToggled === false) {
        if (music.texture === musicspriteAsset.textures[musicframes[0]]) {
            music.texture = musicspriteAsset.textures[musicframes[1]];
        } else if (music.texture === musicspriteAsset.textures[musicframes[1]]) {
            music.texture = musicspriteAsset.textures[musicframes[0]];
        }
    }
       
    });
    
    music.on('click', () => {
        // Sprites
        // Si la musique n'est pas jouée on la passe en true
        if (!musicToggled) {
        musicToggled = true;
        // Si la musique est jouée on la passe en false
        } else if (musicToggled) {
            musicToggled = false
        }


        // Musique
        if (!daythemePLAY) {
            daythemePLAY = PIXI.sound.play('daytheme', { loop: true });
        } else {
            daythemeSound.muted = !daythemeSound.muted;
        }
    });



    // QUESTIONMARK & HELP SCREEN
    const questionMark = await displaySprite('SPECIAL/questionmark.json', 0.12);
    const questionMarkActive = await displaySprite('SPECIAL/questionmark.json', 0.12);
    const questionMarkspriteAsset = await PIXI.Assets.load(SPRITE_PATH_PREFIX + 'SPECIAL/questionmark.json');
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

    // MENU ITEMS
    
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

    // Clé en or
    const menuItemGoldKeyAsset = await PIXI.Assets.load('../sprites/MENUITEM/goldkeyItem.png');
    const menuItemGoldKey = new PIXI.Sprite(menuItemGoldKeyAsset);
    menuItemGoldKey.interactive = true;
    menuItemGoldKey.item = true;

    // Clé en or Sélectionnée
    const menuItemGoldKeySelectedAsset = await PIXI.Assets.load('../sprites/MENUITEM/goldkeyItemSelected.png');
    const menuItemGoldKeySelected = new PIXI.Sprite(menuItemGoldKeySelectedAsset);
    menuItemGoldKeySelected.interactive = true;
    menuItemGoldKeySelected.item = true;

    // Tablette de comprimés
    const menuItemTabletPackAsset = await PIXI.Assets.load('../sprites/MENUITEM/tabletpackItem.png');
    const menuItemTabletPack = new PIXI.Sprite(menuItemTabletPackAsset);
    menuItemTabletPack.interactive = true;
    menuItemTabletPack.item = true;

    // Tablette de comprimés Sélectionnée
    const menuItemTabletPackSelectedAsset = await PIXI.Assets.load('../sprites/MENUITEM/tabletpackItemSelected.png');
    const menuItemTabletPackSelected = new PIXI.Sprite(menuItemTabletPackSelectedAsset);
    menuItemTabletPackSelected.interactive = true;
    menuItemTabletPackSelected.item = true;


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

  
    // Méthode pour l'activation du statut actif lors du clic sur l'item et sa surbrillance
    // On crée un tableau des items avec leur texture de surbrillance respective
    const menuItems = [
        { item: menuItemGlassWater, defaultTexture: menuItemGlassWater.texture, selectedTexture: menuItemGlassWaterSelected.texture },
        { item: menuItemGlassWaterEmpty, defaultTexture: menuItemGlassWaterEmpty.texture, selectedTexture: menuItemGlassWaterEmptySelected.texture },
        { item: menuItemGoldKey, defaultTexture: menuItemGoldKey.texture, selectedTexture: menuItemGoldKeySelected.texture },
        { item: menuItemTabletPack, defaultTexture: menuItemTabletPack.texture, selectedTexture: menuItemTabletPackSelected.texture },
    ];

    // On parcourt le tableau des items
    menuItems.forEach(({ item, defaultTexture, selectedTexture }) => {
        item.defaultTexture = defaultTexture;
        // On définit l'item comme inactif par défaut
        item.isActive = false;
        item.on('click', () => {
            // console.log(currentActionButton.action);
            // Si aucun bouton d'action n'est sélectionné, on ne fait rien
            if (!currentActionButton || (currentActionButton.action !== "donner" && currentActionButton.action !== "utiliser")) {
                console.log("Aucun bouton d'action actif");
                return;
            }
            // Si l'item est actif, on le passe en inactif et prend la texture du sprite inactif
            if (item.isActive === true) {
                item.isActive = false;
                item.texture = defaultTexture;
                currentlyActiveItem = null;
                console.log("item désactivé");  
            } else {
                // Désactiver l'item actif précédent (si existant)
                if (currentlyActiveItem) {
                    currentlyActiveItem.isActive = false;
                    currentlyActiveItem.texture = currentlyActiveItem.defaultTexture;
                }
                item.isActive = true;
                item.texture = selectedTexture;
                currentlyActiveItem = item;
                console.log("item activé");  
            }
            });
    });


    const menuActionButtons = [
        { menuAction: menuButton, defaultTexture: menuButtonSprite, selectedTexture: menuButtonSpriteActive, text: 'Donner' },
        { menuAction: menuButton2, defaultTexture: menuButton2Sprite, selectedTexture: menuButton2SpriteActive, text: 'Ouvrir' },
        { menuAction: menuButton3, defaultTexture: menuButton3Sprite, selectedTexture: menuButton3SpriteActive, text: 'Fermer' },
        { menuAction: menuButton4, defaultTexture: menuButton4Sprite, selectedTexture: menuButton4SpriteActive, text: 'Prendre' },
        { menuAction: menuButton5, defaultTexture: menuButton5Sprite, selectedTexture: menuButton5SpriteActive, text: 'Regarder' },
        { menuAction: menuButton6, defaultTexture: menuButton6Sprite, selectedTexture: menuButton6SpriteActive, text: 'Parler à' },
        { menuAction: menuButton7, defaultTexture: menuButton7Sprite, selectedTexture: menuButton7SpriteActive, text: 'Utiliser' },
        { menuAction: menuButton8, defaultTexture: menuButton8Sprite, selectedTexture: menuButton8SpriteActive, text: 'Pousser' },
        { menuAction: menuButton9, defaultTexture: menuButton9Sprite, selectedTexture: menuButton9SpriteActive, text: 'Tirer' },
    ];    

    menuActionButtons.forEach(({ menuAction, defaultTexture, selectedTexture }) => {
        menuAction.interactive = true;
        menuAction.isActive = false;
        
        menuAction.on('pointerover', () => {
            if (menuAction.isActive === false) {
                menuAction.texture = selectedTexture.texture; 
            } 
        });
        menuAction.on('pointerout', () => {
            if (menuAction.isActive === false) {
                menuAction.texture = defaultTexture.texture; 
            }
        });
        menuAction.on('click', () => {
        // Si lors du click sur un bouton, un autre bouton est actif, on désactive son état et on restaure sa texture normale
            if (currentlyActiveButton && currentlyActiveButton !== menuAction) {
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

               // Si un item est actif, le désactiver
            if (currentlyActiveItem) {
                currentlyActiveItem.texture = currentlyActiveItem.defaultTexture;
                currentlyActiveItem.isActive = false;
                currentlyActiveItem = null;
                console.log("Item actif désactivé");
            }

            if (menuAction.isActive === true) {
                menuAction.texture = defaultTexture.texture;
                menuAction.isActive = false;
                currentlyActiveButton = null;
                // console.log("désactivé");  
            } else {
                menuAction.texture = selectedTexture.texture;
                menuAction.isActive = true;
                currentlyActiveButton = menuAction;
                // console.log("activé");  
            }
            
        });

        menuAction.sprite = defaultTexture; 
        // menuAction.selectedTexture = selectedTexture;
    });

    // On associe un texte à un menuAction (exemple : utiliser) visible sur le menuContainer
    // On utilise le tableau menuActionButtons et on le parcourt
    menuActionButtons.forEach(({ menuAction, text }) => {
        menuAction.on('click', () => {
        // Si le bouton sur lequel on clique (menuAction) est déjà actif
        if (currentActionButton === menuAction) {
            // S'il y a déjà un texte d'action
            if (currentActionText) {
                // On retire/détruit le texte d'action et on désactive le bouton actuel
                menuContainer.removeChild(currentActionText);
                currentActionText.destroy();
                currentActionText = null;
                currentActionButton = null; 
                // S'il y a déjà un item cliqué, on passe la valeur itemClicked en false
                if (itemClicked) {
                    itemClicked = false;
                }
                // Rajouter la propriété isactive false à l'item cliqué
            }
        } else {
            // Si un autre bouton est sélectionné et qu'il existe un texte d'action
            if (currentActionText) {
            // On détruit le texte
                menuContainer.removeChild(currentActionText);
                currentActionText.destroy();
                currentActionText = null;
            }

            // Et on marque le texte du nouveau bouton d'action sélectionné
            currentActionText = new PIXI.Text(text, {
                fontFamily: 'MonkeyIslandMenu',
                fontSize: 11,
                fill: 0x772a76,
                align: 'center',
                fontWeight: 'bold'
            });

            menuContainer.addChild(currentActionText);
            currentActionText.x = app.screen.width / 2;
            currentActionText.y = houseSprite.height + 2;

            currentActionButton = menuAction;
        }
    });
});

    // On rassemble les sprites dans un tableau
    const spriteTexts = [
        { sprite: guybrushLD, spriteName: "Romain" },
        { sprite: guybrush, spriteName: "Romain" },
        { sprite: guybrushGU, spriteName: "Romain" },
        { sprite: guybrushWL, spriteName: "Romain" },
        { sprite: guybrushWR, spriteName: "Romain" },
        { sprite: guybrushSO, spriteName: "Romain" },
        { sprite: ordi, spriteName: "ordinateur" },
        { sprite: ordiRun, spriteName: "ordinateur" },
        { sprite: gamingChair, spriteName: "chaise de bureau" },
        { sprite: toilePoulie, spriteName: "toile" },
        { sprite: toilePoulieRun, spriteName: "toile" },
        { sprite: reveil, spriteName: "réveil matin" },
        { sprite: table, spriteName: "table de nuit" },
        { sprite: tableOpen, spriteName: "tiroir" },
        { sprite: table, spriteName: "table de nuit" },
        { sprite: chest, spriteName: "coffre en métal" },
        { sprite: glasswater, spriteName: "verre" },
        { sprite: goldkey, spriteName: "clé" },
        { sprite: menuItemGoldKey, spriteName: "clé"},
        { sprite: menuItemGlassWater, spriteName: "verre"},
        { sprite: menuItemGlassWaterEmpty, spriteName: "verre vide"},
        { sprite: menuItemTabletPack, spriteName: "Comprimés"}
    ];
    
    const offset = app.screen.width * 0.04;
    const offset2 = app.screen.width * 0.15;
    // On associer un texte/nom visible sur le menuContainer pour tout item ou d'un sprite lors du hover ou clic
    spriteTexts.forEach(({ sprite, spriteName }) => {
        sprite.on('pointerover', () => {
            // lors du hover d'un sprite on clean le champs quoi qu'il arrive
            cleanupText();
            // Et on rajoute le nom du sprite 
            currentSpriteText = new PIXI.Text(spriteName, {
                fontFamily: 'MonkeyIslandMenu',
                fontSize: 11,
                fill: 0x772a76,
                align: 'center',
                fontWeight: 'bold'
            });
            if (currentActionText) {
                    if (itemClicked) {
                        currentActionText.x = app.screen.width / 2 - offset;
                        currentSpriteText.x = app.screen.width / 2 + offset2;
                    }else {
                currentActionText.x = app.screen.width / 2 - offset;
                currentSpriteText.x = app.screen.width / 2 + offset;
            }
            } else {
                currentSpriteText.x = app.screen.width / 2;
            }
            currentSpriteText.y = houseSprite.height + 2; // 2px pour ajuster la hauteur
            menuContainer.addChild(currentSpriteText);
        });

        sprite.on('pointerout', () => {
                cleanupText();
        });
        sprite.on('removed', () => {
            cleanupText();
        });

         // Rajoute une condition : si le sprite est un item, alors cliquer sur le sprite enclenche une action
         sprite.on('click', () => {
            // menuButton7 équivaut à "utiliser"
            if (sprite.item && (currentActionButton == menuButton7 || currentActionButton == menuButton)) {
                if (!itemClicked) {
                    itemClicked = true;
                    // console.log("item cliqué");
                    cleanupText();
                    // Création du texte pour l'item cliqué
                        if (currentActionButton == menuButton7) { 
                            currentItemText = new PIXI.Text(`${spriteName} avec `, {
                            fontFamily: 'MonkeyIslandMenu',
                            fontSize: 11,
                            fill: 0x772a76,
                            align: 'center',
                            fontWeight: 'bold',
                            });
                        } else { 
                            currentItemText = new PIXI.Text(`${spriteName} à `, {
                            fontFamily: 'MonkeyIslandMenu',
                            fontSize: 11,
                            fill: 0x772a76,
                            align: 'center',
                            fontWeight: 'bold',
                            });
                        }
                        if (currentActionText) {
                        currentActionText.x = app.screen.width / 2 - offset;
                        currentItemText.x = app.screen.width / 2 + offset;
                        } else {
                        currentItemText.x = app.screen.width / 2;
                        }
                    currentItemText.y = houseSprite.height + 2;
                    menuContainer.addChild(currentItemText);
                } else {
                    app.stage.removeChild(currentItemText);
                    currentItemText.destroy();
                    currentItemText = null;
                    itemClicked = false;
                }
            }
        });

         // Ajout d'une action du clic-droit censé tout déselectionner :
        app.stage.on('rightdown', () => {
            document.addEventListener('contextmenu', (event) => {
                event.preventDefault();
            }, { once: true });
                        // On désélectionne l'item actif s'il existe (surbrillance -> default)
                        if (currentlyActiveItem) {
                            currentlyActiveItem.texture = currentlyActiveItem.defaultTexture; 
                            currentlyActiveItem.isActive = false;
                            currentlyActiveItem = null;
                            // console.log("Item actif désactivé");
                        }
                        // On clean le texte de l'item s'il existe
                        if (currentItemText) {
                            cleanupText();
                            app.stage.removeChild(currentItemText);
                            currentItemText.destroy();
                            currentItemText = null;
                        }
                        // On passe "itemClicked" à false
                        itemClicked = false;
                        // console.log("décliqué");
                       
                        // Si un bouton d'action est actif, on le passe en null
                        if (currentActionButton) {
                            currentActionButton.texture = currentActionButton.sprite.texture;
                            currentActionButton.isActive = false; 
                            currentlyActiveButton = null;
                            currentActionButton = null; 

                        }
                        // Si un texte d'action existe, on le clean
                        if (currentActionText) {
                            menuContainer.removeChild(currentActionText);
                            currentActionText.destroy();
                            currentActionText = null;
                        }
            // console.log("Clic droit détecté - tout est déselectionné");
        });
        
        function cleanupText() {
            // Si le nom du sprite existe on le détruit
                if (currentSpriteText) {
                    app.stage.removeChild(currentSpriteText);
                    currentSpriteText.destroy();
                    currentSpriteText = null;
                }
        }
    });


    // On va assigner un ensemble de propriétés aux sprites clés pour les interactions (à repositionner dans chaque élément de sprite)
    guybrushSO.label = "guybrushSO";
    guybrushLD.label = "guybrushLD";
    toilePoulie.label = "toilePoulie";
    toilePoulieRun.label = "toilePoulieRun";
    reveil.label = "reveil";
    glasswater.label = "glasswater";
    ordi.label = "ordi";
    ordiRun.label = "ordiRun";
    gamingChair.label = "gamingChair";
    chest.label = "chest";
    goldkey.label = "goldkey"
    menuItemGoldKey.label = "menuItemGoldKey";
    menuItemGlassWater.label ="menuItemGlassWater"
    menuItemGlassWaterEmpty.label ="menuItemGlassWaterEmpty"    
    menuItemTabletPack.label ="menuItemTabletPack"    

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

    // console.log(menuButton.action);
    // console.log(menuButton.text);

    // FONDU DU NOIR AU SPRITE
    function fadeInEffect() {
        gsap.to(blackScreen, { alpha: 0, duration: 1, onComplete: () => {
            app.stage.removeChild(blackScreen);
        }}
    )};

    fadeInEffect();

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
        tableOpen,
        toilePoulie,
        toilePoulieRun,
        toilePoulieReverse,
        glasswater,
        waterpouring,
        chest,
        bed,
        goldkey,
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
        menuItemGoldKey,
        menuItemGoldKeySelected,
        menuItemTabletPack,
        // MENU DIALOGUE
        menuCoverDialogue,
        menuCoverDialogueOverlay,
        // SPECIAL SCREENS
        terminal,
        terminalbgSprite,
        toileScreen,
        playVideo,
        playVideoActive,
        playVideospriteAsset,
        playVideoframes,
        stopVideo,
        stopVideospriteAsset,
        stopVideoframes,
        stopVideoActive,
        nextVideo,
        nextVideoActive,
        nextVideoframes,
        nextVideospriteAsset,
        prevVideo,
        prevVideoActive,
        prevVideoframes,
        prevVideospriteAsset,
        exitVideo,  
        exitVideoActive,  
        exitVideospriteAsset,  
        exitVideoframes,  
        // film1,
        questionMark,
        questionMarkActive,
        noPanik,
        arrow,
        music,
        musicActive,
    };
}

