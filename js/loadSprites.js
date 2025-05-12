export async function loadSprites(apps, sounds) {

    const { app, blackScreen } = apps;
    const { daythemeSound, nightthemeSound, inputSound } = sounds;

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
       // Taille de texte de l'action & sprite
       let actionTextAndSpriteSize =  0;

    // Fonction D'affichage des sprites
    async function displaySprite(path, speed) {
        const spriteAsset = await PIXI.Assets.load(SPRITE_PATH_PREFIX + path);
        const frames = Object.keys(spriteAsset.textures).map(frame => spriteAsset.textures[frame]);
        const sprite = new PIXI.AnimatedSprite(frames);
        sprite.animationSpeed = speed;
        sprite.play();
        // sprite.anchor.set(0.5);
        sprite.sortableChildren = true;
        sprite.zIndex = 4;
        // Ajout du comportement "clicked" en "false" par défaut
        return sprite;
    }

    // Fonction wait utile
    function wait(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // CANVAS
    app.stage.interactive = true;
    app.stage.on("pointermove", moveCrosshair);
    app.renderer.events.cursorStyles.default = "none";

    // SCREENBACKGROUND CONTAINER
    const screenBackgroundContainer = new PIXI.Container();
    screenBackgroundContainer.sortableChildren = true;
    app.stage.addChild(screenBackgroundContainer);

    // SCREENBACKGROUND SPRITE
    // const screenBackgroundAsset = await PIXI.Assets.load('../sprites/orangebgscreen.jpg');
    const screenBackgroundAsset = await PIXI.Assets.load('../sprites/blackbgscreen.jpg');
    const screenBackgroundSprite = new PIXI.Sprite(screenBackgroundAsset);
    screenBackgroundContainer.addChild(screenBackgroundSprite);
    screenBackgroundSprite.anchor.set(0);
    screenBackgroundSprite.height = window.innerHeight;
    screenBackgroundSprite.width = window.innerWidth;

    // HOUSE CONTAINER
    const houseContainer = new PIXI.Container();
    houseContainer.sortableChildren = true;
    screenBackgroundContainer.addChild(houseContainer);

    // HOUSE SPRITE

    let currentDate = new Date();
    let currentHour = currentDate.getHours();
    // currentHour = 23;
    let houseTexturePath;
    let houseTexturePathSoM;
    if (currentHour >= 7 && currentHour < 22) {
        houseTexturePath = '../sprites/jardin.jpg';
        houseTexturePathSoM = '../sprites/jardinSun.png';
    } else {
        houseTexturePath = '../sprites/jardinnuit.jpg';
        houseTexturePathSoM = '../sprites/jardinMoon.png';
    }
    const houseAsset = await PIXI.Assets.load(houseTexturePath);
    const houseAssetSunOrMoon = await PIXI.Assets.load(houseTexturePathSoM);
    const houseSprite = new PIXI.Sprite(houseAsset);
    const houseSpriteSoM = new PIXI.Sprite(houseAssetSunOrMoon);
    houseContainer.addChild(houseSprite);
    houseContainer.addChild(houseSpriteSoM);

        // Sprite houseContainer : Hauteur occupe 74% de l'écran / Largeur 60% de l'écran
        houseSprite.height = houseSpriteSoM.height = app.screen.height * 0.74;
        houseSprite.width = houseSpriteSoM.width = (houseSprite.height / 1024) * 1440 * 1.4; // à changer 

        // Juste pour info : houseSprite correspond à 0, 0 de son conteneur qui est positionné déjà
        houseSprite.x = 0; 
        houseSprite.y = 0;
        houseSpriteSoM.x = 0; 
        houseSpriteSoM.y = 0;

    houseContainer.position.set(
        (app.stage.width - houseSprite.width) / 2,
        0
      );

      let filterX = houseSprite.x + houseSprite.width * 0.14;
      let filterY = houseSprite.y + houseSprite.height * 0.1;
    // Application du GodrayFilter
    const godrayFilter = new PIXI.filters.GodrayFilter({
        parallel: false,
        gain: 0.3,
        lacunarity: 5,
        alpha: 0.2,
        time: 0,
        angle: 0,
        parallel: false,
        center: {x:filterX, y:filterY},
        color: 0xffff66,
    });

    // godrayFilter.center.x = 130;
    // godrayFilter.center.y = 45;
    // godrayFilter.color = 0xffff66;

    // On applique le filtre sur houseSprite
    houseSprite.filters = [godrayFilter];
    
    // Animation des rayons (optionnel pour que ça bouge un peu)
    // app.ticker.add((delta) => {
    app.ticker.add(() => {
    // godrayFilter.time += 0.1 * delta;
    godrayFilter.time += 0.03;
    });


    // INNER HOUSE CONTAINER
    const innerHouseContainer = new PIXI.Container();
    innerHouseContainer.sortableChildren = true;
    houseContainer.addChild(innerHouseContainer);


    // INNER HOUSE SPRITE
    const innerHouseAsset = await PIXI.Assets.load('../sprites/innerhousestart.png');
    let innerHouseSprite = new PIXI.Sprite(innerHouseAsset);
    innerHouseContainer.addChild(innerHouseSprite);

    innerHouseSprite.height = app.screen.height * 0.74;
    innerHouseSprite.width = (innerHouseSprite.height / 1024) * 1055 * 1.4; // à changer 
    innerHouseSprite.x = 0;
    innerHouseSprite.y = 0;

    // // Positionnement du innerHouseContainer "au MILIEU de la page"
    innerHouseContainer.position.set(
        houseSprite.x + (houseSprite.width / 2) - (innerHouseSprite.width / 2.17),
        0
    );

    // CROSSHAIR
    const crosshair = await displaySprite('CROSSHAIR/crosshair2.json', 0.08);
    crosshair.play();
    crosshair.interactiveChildren = false;
    crosshair.zIndex = 99;
    crosshair.anchor.set(0.5);
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
    // FACETALK - CLONE pour la toileScreen
    const guybrushClone = await displaySprite('TALK/romain face talk.json', 0.13);
    guybrushClone.play();

    // WALK RIGHT
    const guybrushWR = await displaySprite('WALK/romain walk right.json', 0.13);
    guybrushWR.play();

    // LEFT WALK
    const guybrushWL = await displaySprite('WALK/romain walk left.json', 0.13);
    guybrushWL.play();

    // DRINK
    const guybrushD = await displaySprite('DRINK/drink.json', 0.10);
    guybrushD.play();
    // innerHouseContainer.addChild(guybrushD);
    guybrushD.x = innerHouseSprite.width * 0.22;
    guybrushD.y = innerHouseSprite.height * 0.68;

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

    // SIT ORDI DISGUSTED
    const guybrushSODISGUSTED = await displaySprite('SITORDI/sitorditalkdisgust.json', 0.12);

    // SIT ORDI TIRED
    const guybrushSOTIRED = await displaySprite('SITORDI/sitorditired.json', 0.12);

    // SIT ORDI SLEEPY
    const guybrushSOSLEEPY = await displaySprite('SITORDI/sitordisleepy.json', 0.12);

    // IDLE - USE LEFT
    const guybrushIUL = await displaySprite('IDLEUSE/utilisemiddleleft.json', 0.05);
    // guybrushIUL.play();

    // IDLE - USE LEFT
    const guybrushIUR = await displaySprite('IDLEUSE/utilisemiddleright.json', 0.12);
    guybrushIUR.play();

    // FALLEN
    const guybrushF = await displaySprite('FALLEN/fallen2.json', 0.08);
    guybrushF.interactive = true;
    guybrushF.play();

    // PAIN
    const guybrushP = await displaySprite('PAIN/pain.json', 0.08);
    guybrushP.play();

    //////////////////////////////////////// ELEMENTS & OBJECTS ////////////////////////////////

    // RAILS
    const rails = await displaySprite('ELEMENTS/rails/rails.json', 0.12);
    rails.gotoAndStop(0); 
    rails.interactive = true;
    rails.zIndex = 1;
    // innerHouseContainer.addChild(rails);

    // MACHINE A CAFE
    const coffeMachine = await displaySprite('ELEMENTS/coffemachine/coffemachineflip.json', 0.12);
    coffeMachine.gotoAndStop(0); 
    coffeMachine.interactive = true;
    coffeMachine.zIndex = 3;
    innerHouseContainer.addChild(coffeMachine);

    // MACHINE A CAFE CUTSCENE CONTAINER
    const coffeMachineCutsceneContainer = new PIXI.Container();
    coffeMachineCutsceneContainer.sortableChildren = true;
    houseContainer.addChild(coffeMachineCutsceneContainer);

    // MACHINE A CAFE CUTSCENE BG
    const coffeMachineCutsceneBG = new PIXI.Graphics();
    // poster.beginFill(0x000000, 0);
    // coffeMachineCutsceneBG.beginFill(0xFF0000, 1); 
    // coffeMachineCutsceneBG.drawRect(0, 0, 200, 200); 
    // coffeMachineCutsceneBG.endFill();
    coffeMachineCutsceneBG.lineStyle(6, 0x222222, 1);
    coffeMachineCutsceneBG.interactive = true;
    // coffeMachineCutsceneContainer.addChild(coffeMachineCutsceneBG);
    coffeMachineCutsceneBG.zIndex = 80;

    const coffeMachineClone = await displaySprite('ELEMENTS/coffemachine/coffemachineflip.json', 0.095);
    coffeMachineClone.gotoAndStop(0); 
    coffeMachineClone.interactive = true;
    coffeMachineClone.zIndex = 81;
    // coffeMachineCutsceneContainer.addChild(coffeMachineClone);

    // TABLE ETROITE
    const narrowTableAsset = await PIXI.Assets.load('../sprites/ELEMENTS/coffemachine/narrowtable2.png');
    const narrowTable = new PIXI.Sprite(narrowTableAsset);
    narrowTable.tint = 0xcb796e;
    narrowTableAsset.interactive = false;
    // const colorMatrix = new PIXI.filters.ColorMatrixFilter();
    // colorMatrix.tint(0x5b3631, 0.3); 
    // narrowTable.filters = [colorMatrix];
    innerHouseContainer.addChild(narrowTable);

    // POUBELLE
    const trash = new PIXI.Graphics();
    // trash.beginFill(0x000000, 0);
    trash.beginFill(0xFF0000, 1); 
    trash.drawRect(0, 0, 200, 100); 
    trash.endFill();
    // On masque la poubelle au départ par Romain qui dort
    trash.interactive = false;
    trash.alpha = 0; 
    innerHouseContainer.addChild(trash);

    // POSTER
    const poster = new PIXI.Graphics();
    // poster.beginFill(0x000000, 0);
    poster.beginFill(0xFF0000, 1); 
    poster.drawRect(0, 0, 200, 100); 
    poster.endFill();
    poster.interactive = true;
    poster.alpha = 0; 
    innerHouseContainer.addChild(poster);

    // ORDINATEUR
    const ordi = await displaySprite('ELEMENTS/ordi/ordi.json', 0.12);
    const ordiRun = await displaySprite('ELEMENTS/ordi/ordiRun.json', 0.12);
    ordi.gotoAndStop(0); 
    ordi.interactive = true;
    ordi.clicked = false;
    ordiRun.interactive = true;
    ordiRun.clicked = false;
    innerHouseContainer.addChild(ordi);

    // BUREAU
    const deskAsset = await PIXI.Assets.load('../sprites/ELEMENTS/ordi/desk.png');
    const desk = new PIXI.Sprite(deskAsset);
    // desk.interactive = true;
    innerHouseContainer.addChild(desk);


    // // PANNEAU
    // const pannelAsset = await PIXI.Assets.load('../sprites/panneauDimension.png');
    // const pannel = new PIXI.Sprite(pannelAsset);
    // // desk.anchor.set(0.5); 
    // pannel.interactive = true;
    // pannel.alpha = 0;
    // // innerHouseContainer.addChild(pannel);

     // LAVABO
     const lavaboAsset = await PIXI.Assets.load('../sprites/lavabo2.png');
     const lavabo = new PIXI.Sprite(lavaboAsset); 
     lavabo.interactive = true;
     lavabo.zIndex = 3;
     innerHouseContainer.addChild(lavabo);

    // ETAGERE
    const shelf = new PIXI.Graphics();
    // shelf.beginFill(0x000000, 0);
    // shelf.beginFill(0xFF0000, 1); 
    shelf.drawRect(0, 0, 200, 100); 
    // shelf.endFill();
    // On masque l'étagère au départ par Romain qui dort
    shelf.interactive = true;
    // shelf.alpha = 0.5; 
    shelf.alpha = 0;
    innerHouseContainer.addChild(shelf);

    // GOLD KEY
    const goldkeyAsset = await PIXI.Assets.load('../sprites/ELEMENTS/goldkey/goldkey.png');
    const goldkey = new PIXI.Sprite(goldkeyAsset);
    // goldkey.anchor.set(0.5); 
    goldkey.interactive = true;
    innerHouseContainer.addChild(goldkey);

    // TABLE DE NUIT ET REVEIL
    const reveilAsset = await PIXI.Assets.load('../sprites/ELEMENTS/tablereveil/splitted/reveil.png');
    const reveil = new PIXI.Sprite(reveilAsset);
    // reveil.anchor.set(0.5); 
    reveil.interactive = true;
    reveil.zIndex = 7;
    innerHouseContainer.addChild(reveil);

    const table = await displaySprite('ELEMENTS/tablereveil/splitted/table.json', 0.12);
    table.gotoAndStop(0);
    table.interactive = true;
    innerHouseContainer.addChild(table);

    table.zIndex = 6;
    const tableOpen = await displaySprite('ELEMENTS/tablereveil/splitted/table.json', 0.12);
    tableOpen.play(1);
    tableOpen.gotoAndStop(1);

    // BOUT DE METAL 
    const boutdemetal = await displaySprite('ELEMENTS/boutdemetal/boutdemetal.json', 0.08);
    boutdemetal.play();
    boutdemetal.gotoAndStop(0);
    boutdemetal.visible = false;
    boutdemetal.interactive = false;
    boutdemetal.zIndex = 12;

     // DISQUETTE
     const disquette = await displaySprite('ELEMENTS/disquette/disquetteitem.json', 0.08);
     disquette.play();
     disquette.interactive = true;
     disquette.zIndex = 12;
    //  innerHouseContainer.addChild(disquette);
     // DISQUETTE FLOAT
     const disquetteFloat = await displaySprite('ELEMENTS/disquette/disquetteitemFloat.json', 0.07);
    disquetteFloat.play();
    disquetteFloat.interactive = true;
    disquetteFloat.zIndex = 12;
    disquetteFloat.interactive = false;
    disquetteFloat. eventMode = "none";
    // innerHouseContainer.addChild(disquetteFloat);

    const boutdemetalShine = await displaySprite('ELEMENTS/boutdemetal/boutdemetalshine.json', 0.09);
    boutdemetalShine.play();
    boutdemetalShine.gotoAndStop(0);
    boutdemetalShine.visible = false;
    boutdemetalShine.zIndex = 12;
    boutdemetalShine.interactive = true;

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
    // glasswater.anchor.set(0.5); 
    innerHouseContainer.addChild(glasswater);


    // VERRE D'EAU RENVERSE (ACTION)
    const waterpouring = await displaySprite('ELEMENTS/glasswater/waterpouring.json', 0.13);
    waterpouring.zIndex = 7;

     // TICKET DE METRO SPRITE
    const metroTicketAsset = await PIXI.Assets.load('../sprites/ELEMENTS/metroTicket/metroticket.png');
    const metroTicket = new PIXI.Sprite(metroTicketAsset);
    metroTicket.interactive = true;
    metroTicket.zIndex = 5;
    innerHouseContainer.addChild(metroTicket);

    // GAMINGCHAIR
    const gcAsset = await PIXI.Assets.load('../sprites/ELEMENTS/gamingchair/gamingchair.png');
    const gamingChair = new PIXI.Sprite(gcAsset);
    // gamingChair.anchor.set(0.5); 
    gamingChair.interactive = true;
    innerHouseContainer.addChild(gamingChair);

    // GAMINGCHAIR Armrest
    const gcARAsset = await PIXI.Assets.load('../sprites/ELEMENTS/gamingchair/gamingchairarmrest.png');
    const gamingChairAR = new PIXI.Sprite(gcARAsset);
    // gamingChairAR.anchor.set(0.5); 
    gamingChairAR.eventMode = "none";
    gamingChairAR.zIndex = 5;

    // TOILEPOULIE
    const toilePoulie = await displaySprite('ELEMENTS/toilepoulie/toilepoulie.json', 0.12);
    const toilePoulieRun = await displaySprite('ELEMENTS/toilepoulie/toilepoulieRun.json', 0.12);
    toilePoulie.gotoAndStop(0); 
    toilePoulie.interactive = false;
    toilePoulie.zIndex = 3;
    toilePoulie.eventMode = "none";
    toilePoulieRun.zIndex = 3;
    toilePoulieRun.interactive = false;
    innerHouseContainer.addChild(toilePoulie);

    // TOILEPOULIE416
    const toilePoulie416 = await displaySprite('ELEMENTS/toilepoulie/toilepoulie416.json', 0.12);
    toilePoulie416.gotoAndStop(0); 
    toilePoulie416.interactive = false;
    toilePoulie416.zIndex = 3;
    toilePoulie416.eventMode = "none";
    // innerHouseContainer.addChild(toilePoulie416);

    // TOILEPOULIE - Reverse
    const toilePoulieReverse = await displaySprite('ELEMENTS/toilepoulie/toilepoulieReverse.json', 0.12);
    toilePoulieReverse.zIndex = 3;
    toilePoulieReverse.interactive = false;

    // COFFRE
    const chest = await displaySprite('ELEMENTS/chest/chest.json', 0.12);
    chest.gotoAndStop(0); 
    // chest.interactive = true;
    chest.zIndex = 3;
    chest.tint = 0x6B4423;
    innerHouseContainer.addChild(chest);

    // INTERRUPTEUR
    const interrupteur = await displaySprite('ELEMENTS/interrupteur/interrupteur.json', 0.12);
    interrupteur.gotoAndStop(0); 
    interrupteur.interactive = true;
    interrupteur.zIndex = 3;
    innerHouseContainer.addChild(interrupteur);

    // PANNEAU OUVRABLE
    const swPannel = await displaySprite('ELEMENTS/swpannel/swpannel.json', 0.12);
    swPannel.gotoAndStop(0); 
    swPannel.interactive = true;
    swPannel.zIndex = 3;
    innerHouseContainer.addChild(swPannel);


    // PORTE INTERIEUR OUVERTE
    const doorAsset = await PIXI.Assets.load('../sprites/innerOpennedDoor.png');
    const door = new PIXI.Sprite(doorAsset);
    door.eventMode = "none";
    door.height = innerHouseSprite.height;
    door.width = innerHouseSprite.width; 
    door.x = innerHouseSprite.x;
    door.y = innerHouseSprite.y;
    // door.zIndex = 0;
    // innerHouseContainer.addChild(door);

    // BED
    const bedAsset = await PIXI.Assets.load('../sprites/ELEMENTS/bed/bed.png');
    const bed = new PIXI.Sprite(bedAsset);
    bed.eventMode = "none";
    // bed.zIndex = 1;
    innerHouseContainer.addChild(bed);

    // LOGOS DES TECHNOS
    const logoPHPAsset = await PIXI.Assets.load('../sprites/SPECIAL/LOGOS/logoPHP.png');
    const logoPHP = new PIXI.Sprite(logoPHPAsset);
    logoPHP.zIndex = 20;
    logoPHP.anchor.set(0.5, 0);
    
    const logoHTMLAsset = await PIXI.Assets.load('../sprites/SPECIAL/LOGOS/logoHTML.png');
    const logoHTML = new PIXI.Sprite(logoHTMLAsset);
    logoHTML.zIndex = 20;
    logoHTML.anchor.set(0.5, 0);
    
    const logoCSSAsset = await PIXI.Assets.load('../sprites/SPECIAL/LOGOS/logoCSS.png');
    const logoCSS = new PIXI.Sprite(logoCSSAsset);
    logoCSS.zIndex = 20;
    logoCSS.anchor.set(0.5, 0);
    
    const logoJSAsset = await PIXI.Assets.load('../sprites/SPECIAL/LOGOS/logoJS.png');
    const logoJS = new PIXI.Sprite(logoJSAsset);
    logoJS.zIndex = 20;
    logoJS.anchor.set(0.5, 0);
    
    const logoMongoAsset = await PIXI.Assets.load('../sprites/SPECIAL/LOGOS/logoMongoDB.png');
    const logoMongo = new PIXI.Sprite(logoMongoAsset);
    logoMongo.zIndex = 20;
    logoMongo.anchor.set(0.5, 0);
    
    const logoMySQLAsset = await PIXI.Assets.load('../sprites/SPECIAL/LOGOS/logoMySQL.png');
    const logoMySQL = new PIXI.Sprite(logoMySQLAsset);
    logoMySQL.zIndex = 20;
    logoMySQL.anchor.set(0.5, 0);
    
    const logoSymfonyAsset = await PIXI.Assets.load('../sprites/SPECIAL/LOGOS/logoSymfony.png');
    const logoSymfony = new PIXI.Sprite(logoSymfonyAsset);
    logoSymfony.zIndex = 20;
    logoSymfony.anchor.set(0.5, 0);    
    

    //////////////////////////////////////// SPECIAL SCREENS ////////////////////////////////

    // SPECIAL SCREEN CONTAINER 
    const specialScreenContainer = new PIXI.Container();
    specialScreenContainer.sortableChildren = true;
    specialScreenContainer.position.set(
        (app.stage.width - specialScreenContainer.width) / 2,
        0
      );

    // TERMINAL SCREEN
    const terminal = await displaySprite('TERMINAL/terminal.json', 0.12);
    const terminalbgAsset = await PIXI.Assets.load('../sprites/TERMINAL/terminalbg.png');
    const terminalbgSprite = new PIXI.Sprite(terminalbgAsset);
    terminalbgSprite.zIndex = 10;
    terminal.zIndex = 11;
    terminal.height = app.screen.height;
    terminal.width = (houseSprite.height / 1024) * 1440;
    terminalbgSprite.height = app.screen.height;
    terminalbgSprite.width = (houseSprite.height / 1024) * 1440 * 1.4;
    
    specialScreenContainer.addChild(terminalbgSprite);
    terminal.x = terminalbgSprite.x + (terminalbgSprite.width - terminal.width) / 2;
    specialScreenContainer.addChild(terminal);
    specialScreenContainer.position.set(
        houseContainer.x,
        0
      );

    // TERMINAL PW VALID PENDING SCREEN
    const terminalPS = await displaySprite('TERMINAL/terminalpending.json', 0.03);
    terminalPS.zIndex = 12;
    terminalPS.height = terminal.height;
    terminalPS.width = terminal.width;
    terminalPS.x = terminalbgSprite.x + (terminalbgSprite.width - terminal.width) / 2;

    // PENDING LOGO
    const pendingLogo = await displaySprite('TERMINAL/hourglassAnimated.json', 0.1);
    pendingLogo.zIndex = 13;
    pendingLogo.height = terminal.height / 8;
    pendingLogo.width = terminal.width / 8;
    pendingLogo.x = terminalPS.x + (terminalPS.width - pendingLogo.width) / 2;
    pendingLogo.y = terminalPS.y + (terminalPS.height - pendingLogo.height) / 2;

    // yellow led
    const yellowledAsset = await PIXI.Assets.load('../sprites/TERMINAL/yellowled1.png');
    const yellowled = new PIXI.Sprite(yellowledAsset);
    yellowled.zIndex = 12;
    yellowled.height = terminal.height;
    yellowled.width = terminal.width;
    yellowled.x = terminal.x;

    // green led
    const greenledAsset = await PIXI.Assets.load('../sprites/TERMINAL/greenled1.png');
    const greenled = new PIXI.Sprite(greenledAsset);
    greenled.zIndex = 12;
    greenled.height = terminal.height;
    greenled.width = terminal.width;
    greenled.x = terminal.x;

    // Chest en gros plan pour la cutscene
    const chestZoom = await displaySprite('ELEMENTS/chest/chest.json', 0.06);
    chestZoom.gotoAndStop(0); 
    chestZoom.interactive = true;
    chestZoom.zIndex = 99;
    chestZoom.anchor.set(0.5);
    chestZoom.x = specialScreenContainer.width / 2;
    chestZoom.y = specialScreenContainer.height / 2;
    chestZoom.width = specialScreenContainer.width * 0.4;
    chestZoom.height = specialScreenContainer.height * 0.4;
    chestZoom.animationSpeed = 0.03
    chestZoom.loop = false;
    chestZoom.visible = false;


    // TOILE SCREEN
    const toileScreenAsset = await PIXI.Assets.load('../sprites/SPECIAL/toileScreen.png');
    const toileScreen = new PIXI.Sprite(toileScreenAsset);
    toileScreen.zIndex = 10;

    // TOILE SCREEN PORTRAIT BULLE INFO =====> La toileScreen est pas encore redimensionnée dans resizeHandler donc rayon est pas bon
    // const rayon = toileScreen.width * 0.032;
    // const rayon = ((houseSprite.height / houseMaxHeight) * houseMaxWidth * 1.4) * 0.032;
    const rayon = ((houseSprite.height / 1024) * 1440 * 1.4) * 0.045;

    // Création d'un cercle noir
    const fondPortrait = new PIXI.Graphics();
    fondPortrait.lineStyle(4, 0x8B0000, 1);
    fondPortrait.beginFill(0x000000);
    fondPortrait.drawCircle(0, 0, rayon);
    fondPortrait.endFill();
    // Création d'un masque de dimension similaires
    const fondPortraitMask = new PIXI.Graphics();
    fondPortraitMask.lineStyle(4, 0x8B0000, 1);
    fondPortraitMask.beginFill(0x000000);
    fondPortraitMask.drawCircle(0, 0, rayon);
    fondPortraitMask.endFill();

    // TOILE SCREEN PROJECT SELECTION
    const toileScreenProject1Asset = await PIXI.Assets.load('../sprites/SPECIAL/SELECTVIDEO/gettogetherselect.png');
    const toileScreenProject1 = new PIXI.Sprite(toileScreenProject1Asset);
    // toileScreenProject1.width = 178;
    // toileScreenProject1.height = 100;
    toileScreenProject1.interactive = true;
    toileScreenProject1.zIndex = 10;

    const toileScreenProject2Asset = await PIXI.Assets.load('../sprites/SPECIAL/SELECTVIDEO/rebatiereselect.png');
    const toileScreenProject2 = new PIXI.Sprite(toileScreenProject2Asset);
    toileScreenProject2.interactive = true;
    toileScreenProject2.zIndex = 10;
    

    const toileScreenProject3Asset = await PIXI.Assets.load('../sprites/SPECIAL/SELECTVIDEO/jsigneselect.png');
    const toileScreenProject3 = new PIXI.Sprite(toileScreenProject3Asset);
    toileScreenProject3.interactive = true;
    toileScreenProject3.zIndex = 10;

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
    music.interactive = true;
    music.stop();
    musicActive.interactive = true;
    musicActive.stop();
    houseContainer.addChild(music);

    music.anchor.set(1, 0);
    // music.x = houseContainer.width - music.width - 20;
    // music.x = houseContainer.width - music.width - (houseContainer.width * 0.015);
    music.x = houseSprite.x + houseSprite.width * 0.98;
    // music.y = 0 + 20;
    music.y = houseSprite.y + (houseContainer.height * 0.03);
    // music.scale = 0.3;

    const originalWidthNote = music.texture.width;
    const originalHeightNote = music.texture.height;

    const scaleFactorNote = Math.min(
        // houseSprite.width / originalWidth,
        (houseContainer.width * 0.1) / originalWidthNote,
        (houseContainer.height * 0.1) / originalHeightNote
    );
    music.scale.set(scaleFactorNote);

    let musicthemePLAY = null;
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
        if (!musicthemePLAY) {
            if (currentHour >= 7 && currentHour < 22) {
                musicthemePLAY = PIXI.sound.play('daytheme', { loop: true });
            } else {
                musicthemePLAY = PIXI.sound.play('nighttheme', { loop: true });
            }
        } else {
            daythemeSound.muted = !daythemeSound.muted;
            nightthemeSound.muted = !nightthemeSound.muted;
        }
    });



    // QUESTIONMARK & HELP SCREEN
    const questionMark = await displaySprite('SPECIAL/questionmark.json', 0.12);
    const questionMarkActive = await displaySprite('SPECIAL/questionmark.json', 0.12);
    const questionMarkspriteAsset = await PIXI.Assets.load(SPRITE_PATH_PREFIX + 'SPECIAL/questionmark.json');
    const questionMarkframes = Object.keys(questionMarkspriteAsset.textures);
    questionMark.texture = questionMarkspriteAsset.textures[questionMarkframes[0]];
    questionMarkActive.texture = questionMarkspriteAsset.textures[questionMarkframes[1]];

    questionMark.anchor.set(1, 0);
    // questionMark.x = houseContainer.width - questionMark.width - 20;
    questionMark.x = music.x;
    questionMark.y = music.y + music.height + (houseContainer.width * 0.015);

    const originalWidth = questionMark.texture.width;
    const originalHeight = questionMark.texture.height;

    const scaleFactor = Math.min(
        // houseSprite.width / originalWidth,
        (houseContainer.width * 0.1) / originalWidth,
        (houseContainer.height * 0.1) / originalHeight
    );
    questionMark.scale.set(scaleFactor);

    questionMark.interactive = true;
    questionMark.stop();
    questionMarkActive.interactive = true;
    questionMarkActive.stop();
    houseContainer.addChild(questionMark);


    const noPanikAsset = await PIXI.Assets.load('../sprites/SPECIAL/noPanik.png');
    const noPanik = new PIXI.Sprite(noPanikAsset);
    noPanik.anchor.set(0.5, 0.5);
    noPanik.zIndex = 95; 
    const noPanikContainer = new PIXI.Container();
    noPanikContainer.addChild(noPanik);
    // app.stage.addChild(noPanik);

     // HOVER ET CLIC QUESTIONMARK
     questionMark.on('pointerover', () => {
        questionMark.texture = questionMarkActive.texture;
    });
    questionMark.on('pointerout', () => {
        questionMark.texture = questionMarkspriteAsset.textures[questionMarkframes[0]]; 
    });
    questionMark.on('click', () => {
        screenBackgroundContainer.addChild(noPanikContainer);
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
    arrow.zIndex = 96;
    // arrow.anchor.set (0.5, 0.5);
    // arrow.x = noPanik.x + (noPanik.width * 0.9);
    // arrow.y = noPanik.y + (noPanik.height * 0.9);

    noPanikContainer.addChild(arrow);

    // HOVER ET CLIC ARROW
    arrow.on('pointerover', () => {
        arrow.texture = arrowActive.texture; 
    });
    arrow.on('pointerout', () => {
        arrow.texture = arrowspriteAsset.textures[arrowframes[0]];
    });
    arrow.on('click', () => {
        screenBackgroundContainer.removeChild(noPanikContainer);
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
    //  app.stage.addChild(menuContainer);
     screenBackgroundContainer.addChild(menuContainer);

     // MENU TEXTURE
     const menuAsset = await PIXI.Assets.load('../sprites/test sprite menu.png');
     const menuSprite = new PIXI.Sprite(menuAsset);
    //  menuSprite.anchor.set(0.5, 0);
     menuContainer.addChild(menuSprite);

     // MENU COVER TEXTURE (Dialogues)
     const menuCoverDialogueAsset = await PIXI.Assets.load('../sprites/cover menu dialogue.jpg');
     const menuCoverDialogue = new PIXI.Sprite(menuCoverDialogueAsset);
     menuCoverDialogue.zIndex = 3;
     //  Surcouche du menuCoverDialogue
    const menuCoverDialogueOverlay = new PIXI.Sprite(menuCoverDialogueAsset);
    menuCoverDialogueOverlay.zIndex = 10;

    // Le menuContainer a la même position x que le container de la maison outside
    menuContainer.position.set(
        (houseContainer.x),
        houseSprite.height
      );

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

    // Disquette
    const menuItemDisquetteAsset = await PIXI.Assets.load('../sprites/ELEMENTS/disquette/menuitemDisquette.png');
    const menuItemDisquette = new PIXI.Sprite(menuItemDisquetteAsset);
    menuItemDisquette.interactive = true;
    menuItemDisquette.item = true;

    // Disquette Sélectionnée
    const menuItemDisquetteSelectedAsset = await PIXI.Assets.load('../sprites/ELEMENTS/disquette/menuitemDisquetteSelected.png');
    const menuItemDisquetteSelected = new PIXI.Sprite(menuItemDisquetteSelectedAsset);
    menuItemDisquetteSelected.interactive = true;
    menuItemDisquetteSelected.item = true;

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

    // Bout métallique
    const menuItemMetalStripAsset = await PIXI.Assets.load('../sprites/MENUITEM/boutdemetalItem.png');
    const menuItemMetalStrip = new PIXI.Sprite(menuItemMetalStripAsset);
    menuItemMetalStrip.interactive = true;
    menuItemMetalStrip.item = true;
    // Bout métallique sélectionnée
    const menuItemMetalStripSelectedAsset = await PIXI.Assets.load('../sprites/MENUITEM/boutdemetalItemSelected.png');
    const menuItemMetalStripSelected = new PIXI.Sprite(menuItemMetalStripSelectedAsset);
    menuItemMetalStripSelected.interactive = true;
    menuItemMetalStripSelected.item = true;

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

    // Verre de café
    const menuItemGlassCoffeAsset = await PIXI.Assets.load('../sprites/MENUITEM/glasscoffeItem.png');
    const menuItemGlassCoffe = new PIXI.Sprite(menuItemGlassCoffeAsset);
    menuItemGlassCoffe.interactive = true;
    menuItemGlassCoffe.item = true;
    // Verre de café Sélectionné
    const menuItemGlassCoffeSelectedAsset = await PIXI.Assets.load('../sprites/MENUITEM/glasscoffeItemSelected.png');
    const menuItemGlassCoffeSelected = new PIXI.Sprite(menuItemGlassCoffeSelectedAsset);
    menuItemGlassCoffeSelected.interactive = true;
    menuItemGlassCoffeSelected.item = true;

    // Capsule de café
    const menuItemCoffePodAsset = await PIXI.Assets.load('../sprites/ELEMENTS/coffemachine/menuItemPod.png');
    const menuItemCoffePod = new PIXI.Sprite(menuItemCoffePodAsset);
    menuItemCoffePod.interactive = true;
    menuItemCoffePod.item = true;
    // Verre vide Sélectionné
    const menuItemCoffePodSelectedAsset = await PIXI.Assets.load('../sprites/ELEMENTS/coffemachine/menuItemPodSelected.png');
    const menuItemCoffePodSelected = new PIXI.Sprite(menuItemCoffePodSelectedAsset);
    menuItemCoffePodSelected.interactive = true;
    menuItemCoffePodSelected.item = true;

    // Ticket de métro
    const menuItemMetroTicketAsset = await PIXI.Assets.load('../sprites/MENUITEM/metroticketItem.png');
    const menuItemMetroTicket = new PIXI.Sprite(menuItemMetroTicketAsset);
    menuItemMetroTicket.interactive = true;
    menuItemMetroTicket.item = true;
    // Ticket de métro Selectionné
    const menuItemMetroTicketSelectedAsset = await PIXI.Assets.load('../sprites/MENUITEM/metroticketItemSelected.png');
    const menuItemMetroTicketSelected = new PIXI.Sprite(menuItemMetroTicketSelectedAsset);
    menuItemMetroTicketSelected.interactive = true;
    menuItemMetroTicketSelected.item = true;
    
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
        { item: menuItemGlassCoffe, defaultTexture: menuItemGlassCoffe.texture, selectedTexture: menuItemGlassCoffeSelected.texture },
        { item: menuItemGlassWaterEmpty, defaultTexture: menuItemGlassWaterEmpty.texture, selectedTexture: menuItemGlassWaterEmptySelected.texture },
        { item: menuItemGoldKey, defaultTexture: menuItemGoldKey.texture, selectedTexture: menuItemGoldKeySelected.texture },
        { item: menuItemTabletPack, defaultTexture: menuItemTabletPack.texture, selectedTexture: menuItemTabletPackSelected.texture },
        { item: menuItemMetalStrip, defaultTexture: menuItemMetalStrip.texture, selectedTexture: menuItemMetalStripSelected.texture },
        { item: menuItemCoffePod, defaultTexture: menuItemCoffePod.texture, selectedTexture: menuItemCoffePodSelected.texture },
        { item: menuItemMetroTicket, defaultTexture: menuItemMetroTicket.texture, selectedTexture: menuItemMetroTicketSelected.texture },
        { item: menuItemDisquette, defaultTexture: menuItemDisquette.texture, selectedTexture: menuItemDisquetteSelected.texture },
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

            // On vérifie si deux items combinés déclenchent une action
            // handleCombinedItemAction();
            });
    });

    // function handleCombinedItemAction() {
    //     if (!currentActionButton || !currentActionButton.isActive) return;
    
    //     // Vérifie que l'action en cours est "donner" ou "utiliser"
    //     if (currentActionButton.action !== "donner" && currentActionButton.action !== "utiliser") return;
    // }

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

    // Taille texte
    actionTextAndSpriteSize =  houseSprite.height * 0.02;
    // const screenCenter = menuSprite.width / 2;
    const screenCenter = ((houseSprite.height / 1024) * 1440 * 1.4) / 2; // équivaut à la largeur de menuSprite.width / 2, mais menuSprite.width est défini dans resizehandler donc je rajoute pour évite rles bugs
    console.log(menuSprite.width);
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
            currentActionText = new PIXI.Text({ text: text, style: {
                fontFamily: 'MonkeyIslandMenu',
                fontSize: actionTextAndSpriteSize,
                fill: 0x772a76,
                align: 'center',
                fontWeight: 'bold'
            }});            
            currentActionText.anchor.set(0.5, 0);

            menuContainer.addChild(currentActionText);

            /// TEMPORAIRE A BOUGER IMPERATIVEMENT A UN AUTRE ENDROIT ///
            menuSprite.height = app.screen.height * 0.26;
            menuSprite.width = (houseSprite.height / 1024) * 1440 * 1.4;
            /////////////////////////////////////////////////////////////
            // Par défaut si le texte d'action est seul, placé verticalement au milieu de l'écran
            currentActionText.x = screenCenter;
            currentActionText.y = menuSprite.height * 0.012;

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
        { sprite: guybrushF, spriteName: "cadavre" },
        { sprite: ordi, spriteName: "ordinateur" },
        { sprite: ordiRun, spriteName: "ordinateur" },
        { sprite: gamingChair, spriteName: "fauteuil" },
        { sprite: toilePoulie, spriteName: "toile" },
        { sprite: toilePoulieRun, spriteName: "toile" },
        { sprite: reveil, spriteName: "réveil matin" },
        { sprite: table, spriteName: "table de nuit" },
        { sprite: tableOpen, spriteName: "tiroir" },
        { sprite: table, spriteName: "table de nuit" },
        { sprite: chest, spriteName: "coffre en métal" },
        { sprite: glasswater, spriteName: "verre" },
        { sprite: goldkey, spriteName: "clé" },
        { sprite: disquette, spriteName: "disquette" },
        // { sprite: pannel, spriteName: "panneau secret" },
        { sprite: swPannel, spriteName: "displate" },
        { sprite: shelf, spriteName: "étagère" },
        { sprite: metroTicket, spriteName: "ticket de métro" },
        { sprite: interrupteur, spriteName: "interrupteur" },
        { sprite: boutdemetalShine, spriteName: "bout de metal" },
        { sprite: coffeMachine, spriteName: "machine à café" },
        { sprite: lavabo, spriteName: "lavabo" },
        { sprite: trash, spriteName: "poubelle" },
        { sprite: poster, spriteName: "panneau secret" },
        { sprite: menuItemGoldKey, spriteName: "clé"},
        { sprite: menuItemCoffePod, spriteName: "capsule"},
        { sprite: menuItemGlassWater, spriteName: "verre"},
        { sprite: menuItemGlassCoffe, spriteName: "café revisité"},
        { sprite: menuItemGlassWaterEmpty, spriteName: "verre vide"},
        { sprite: menuItemTabletPack, spriteName: "comprimés"},
        { sprite: menuItemDisquette, spriteName: "disquette"},
        { sprite: menuItemMetalStrip, spriteName: "lamelle"},
        { sprite: menuItemMetroTicket, spriteName: "ticket"},
    ];

    
    // On associer un texte/nom visible sur le menuContainer pour tout item ou d'un sprite lors du hover ou clic
    spriteTexts.forEach(({ sprite, spriteName }) => {
        // Lors du HOVER sur le sprite
        sprite.on('pointerover', () => {
            // lors du hover d'un sprite on clean le champs quoi qu'il arrive
            cleanupText();
            
            // lors du hover on crée le nom du sprite 
            currentSpriteText = new PIXI.Text({ text: spriteName, style: {
                fontFamily: 'MonkeyIslandMenu',
                fontSize: actionTextAndSpriteSize,
                fill: 0x772a76,
                align: 'center',
                fontWeight: 'bold'}}); 
            currentSpriteText.anchor.set(0.5, 0);
            // On l'ajoute, on voit par exemple juste le nom du sprite
            menuContainer.addChild(currentSpriteText);
            currentSpriteText.x = screenCenter;

            // S'il y a une action en cours mais qu'aucun item n'est cliqué pour le moment
            if (currentActionText && !itemClicked) {
                    // Alors l'actionText sera décalé à gauche avec la moitié de la taille de l'actionText (à cause de l'anchor set à 0.5)
                    // currentActionText.x = screenCenter - (currentActionText.width / 2) - spacing;
                    let totalWidth = currentActionText.width + currentSpriteText.width;
                    currentActionText.x = screenCenter - (totalWidth / 2);
                    currentSpriteText.x = screenCenter + (totalWidth / 2);
                }

                if (currentItemText) {
                    currentActionText.x = menuSprite.width * 0.40 - currentActionText.width;
                    currentSpriteText.x = menuSprite.width * 0.60 + currentSpriteText.width;
                }
           
            // Le positionnement vertical reste invariablement le même
            // currentSpriteText.y = houseSprite.height + (houseSprite.height * 0.005);
            currentSpriteText.y = menuSprite.height * 0.012;
           
        });

        sprite.on('pointerout', () => {
            cleanupText();
            if (currentActionText && !currentItemText) { // on peut aussi écrire currentActionText && !itemClicked
                currentActionText.x = screenCenter;
            }
        });
        sprite.on('removed', () => {
            cleanupText();
        });

        // Lors du CLICK sur le sprite
        sprite.on('click', () => {
            // Si le sprite est un ITEM (item = true) et que l'action active est "utiliser" ou "donner"
            if (sprite.item && (currentActionButton == menuButton7 || currentActionButton == menuButton)) {
                // Si l'item n'était pas déjà cliqué, on passe le clicked en "true" et on fait un cleanUp
                if (!itemClicked) {
                    itemClicked = true;
                    // if (currentItemText) {
                    //     currentItemText.destroy();
                    // } 
                    // SI l'action est "utiliser"
                        if (currentActionButton == menuButton7) { 
                            currentItemText = new PIXI.Text({ text: `${spriteName} avec `, style: {
                                fontFamily: 'MonkeyIslandMenu',
                                fontSize: actionTextAndSpriteSize,
                                fill: 0x772a76,
                                align: 'center',
                                fontWeight: 'bold'
                            }});   
                            currentItemText.anchor.set(0.5, 0);   
                    // SI l'action est "donner"
                        } else { 
                            currentItemText = new PIXI.Text({ text: `${spriteName} à `, style: {
                                fontFamily: 'MonkeyIslandMenu',
                                fontSize: actionTextAndSpriteSize,
                                fill: 0x772a76,
                                align: 'center',
                                fontWeight: 'bold'
                            }}); 
                            currentItemText.anchor.set(0.5, 0);                           
                        }
                        // Position horizontale du texte
                        currentActionText.x = menuSprite.width * 0.40;
                        currentItemText.x = screenCenter;
                        currentSpriteText.x = menuSprite.width * 0.60;   

                        // Position verticale du texte
                        currentItemText.y = currentSpriteText.y = menuSprite.height * 0.012;

                    // On ajoute le currentitemtext    
                    menuContainer.addChild(currentItemText);

                // Si l'item était déjà cliqué
                } else {
                    menuContainer.removeChild(currentItemText);
                    currentItemText.destroy();
                    currentItemText = null;
                    itemClicked = false;
                    cleanupText();
                    currentActionText.x = screenCenter;
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
        });
        
        function cleanupText() {
            // Si le nom du sprite existe on le détruit
                if (currentSpriteText) {
                    // app.stage.removeChild(currentSpriteText);
                    menuContainer.removeChild(currentSpriteText);
                    currentSpriteText.destroy();
                    currentSpriteText = null;
                }
        }
    });


    // On va assigner un ensemble de propriétés aux sprites clés pour les interactions 
    guybrushSO.label = "guybrushSO";
    guybrushLD.label = "guybrushLD";
    guybrushF.label = "guybrushF";
    toilePoulie.label = "toilePoulie";
    toilePoulieRun.label = "toilePoulieRun";
    reveil.label = "reveil";
    glasswater.label = "glasswater";
    ordi.label = "ordi";
    ordiRun.label = "ordiRun";
    gamingChair.label = "gamingChair";
    chest.label = "chest";
    goldkey.label = "goldkey";
    lavabo.label = "lavabo";
    table.label = "table";
    trash.label = "trash";
    poster.label = "poster";
    shelf.label = "shelf";
    swPannel.label = "displate";
    coffeMachine.label = "coffeMachine";
    boutdemetalShine.label = "boutdemetalShine";
    metroTicket.label = "metroTicket";
    disquette.label = "disquette";
    // Items
    menuItemMetroTicket.label = "menuItemMetroTicket";
    menuItemCoffePod.label = "menuItemCoffePod";
    menuItemGoldKey.label = "menuItemGoldKey";
    menuItemGlassWater.label ="menuItemGlassWater";
    menuItemGlassCoffe.label ="menuItemGlassCoffe";
    menuItemGlassWaterEmpty.label ="menuItemGlassWaterEmpty";    
    menuItemTabletPack.label ="menuItemTabletPack";    
    menuItemMetalStrip.label ="menuItemMetalStrip"; 
    menuItemDisquette.label ="menuItemDisquette"; 

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
    
    // FONDU DU NOIR AU SPRITE
    function fadeInEffect() {
        gsap.to(blackScreen, { alpha: 0, duration: 1, onComplete: () => {
            app.stage.removeChild(blackScreen);
        }}
    )};

    fadeInEffect();

    return {
        houseContainer,
        innerHouseContainer,
        screenBackgroundContainer,
        specialScreenContainer,
        coffeMachineCutsceneContainer,
        innerHouseAsset,
        // innerHouseBGSprite,
        houseSprite,
        innerHouseSprite,
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
        guybrushD,
        guybrushClone,
        guybrushSOTIRED,
        guybrushSOSLEEPY,
        guybrushSODISGUSTED,
        guybrushF,
        guybrushP,
        // ELEMENTS & OBJECTS
        ordi,
        ordiRun,
        trash,
        poster,
        desk,
        door,
        rails,
        // pannel,
        gamingChair,
        gamingChairAR,
        reveil,
        table,
        tableOpen,
        toilePoulie,
        toilePoulieRun,
        toilePoulieReverse,
        toilePoulie416,
        glasswater,
        waterpouring,
        chest,
        chestZoom,
        bed,
        goldkey,
        boutdemetal,
        boutdemetalShine,
        lavabo,
        interrupteur,
        coffeMachine,
        narrowTable,
        swPannel,
        metroTicket,
        shelf,
        disquette,
        disquetteFloat,
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
        menuItemGlassCoffe,
        menuItemGlassCoffeSelected,
        menuItemGlassWaterEmpty,
        menuItemGlassWaterEmptySelected,
        menuItemDisquette,
        menuItemDisquetteSelected,
        menuItemGoldKey,
        menuItemGoldKeySelected,
        menuItemMetalStrip,
        menuItemMetalStripSelected,
        menuItemTabletPack,
        menuItemCoffePod,
        menuItemCoffePodSelected,
        menuItemMetroTicket,
        menuItemMetroTicketSelected,
        // MENU DIALOGUE
        menuCoverDialogue,
        menuCoverDialogueOverlay,
        // SPECIAL SCREENS
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
        questionMark,
        questionMarkActive,
        noPanik,
        arrow,
        music,
        musicActive,
        coffeMachineCutsceneBG,
        coffeMachineClone,
        // PROJECT SELECTION
        toileScreenProject1,
        toileScreenProject2,
        toileScreenProject3,
        fondPortrait,
        fondPortraitMask,
        // LOGOS TECHNOS
        logoPHP,
        logoHTML,
        logoCSS,
        logoJS,
        logoMongo,
        logoMySQL,
        logoSymfony,
        // TERMINAL SCREEN ASSETS
        terminal,
        terminalbgSprite,
        greenled,
        yellowled,
        terminalPS,
        pendingLogo,
        // NOT A SPRITE
        // musicthemePLAY,
        // currentHour,
    };
}

