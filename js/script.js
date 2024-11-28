(async () =>
   {
       // Création d'une nouvelle application
       const app = new PIXI.Application();

       // Configuration de la largeur maximale adaptée à la taille de l'écran si plus petit
       const maxWidth = 1440;
       const width = Math.min(window.innerWidth, maxWidth);
       const aspectRatio = 16 / 9;
       const height = width / aspectRatio;

       // Initialisation de l'application
       await app.init({ 
           width: width,
           height: height,
           backgroundColor: 0x1099bb,
       });

       // Ajout du canvas de l'app au body
       document.body.appendChild(app.canvas);
       

       // Chargement de la texture du background
       const backgroundTexture = await PIXI.Assets.load('../sprites/homeImproved.png');
       // Créer un sprite "background"
       const background = new PIXI.Sprite(backgroundTexture);
       await PIXI.Assets.load('../sprites/homeImproved.png');
       app.stage.addChild(background);

       // Chargement du JSON de GuyBrush Face Talk
       const guybrushSpritesheet = await PIXI.Assets.load('../sprites/TALK/romain face talk.json');
       // Création d'une animation à partir des frames du JSON
       const frames = Object.keys(guybrushSpritesheet.textures).map(
                                frame => guybrushSpritesheet.textures[frame]
       );
       const guybrush = new PIXI.AnimatedSprite(frames);

        // Chargement du JSON du Guybrush Right Walk
       const guybrushSpritesheetWR = await PIXI.Assets.load('../sprites/WALK/romain walk right.json');
       // Frames WR
       const framesWR = Object.keys(guybrushSpritesheetWR.textures).map(
                           frame => guybrushSpritesheetWR.textures[frame]
       );
       const guybrushWR = new PIXI.AnimatedSprite(framesWR);

       // Chargement du JSON du Guybrush Right Walk
       const guybrushSpritesheetWL = await PIXI.Assets.load('../sprites/WALK/romain walk left.json');
       // Frames WL
       const framesWL = Object.keys(guybrushSpritesheetWL.textures).map(
                           frame => guybrushSpritesheetWL.textures[frame]
       );
       const guybrushWL = new PIXI.AnimatedSprite(framesWL);

       // Chargement du JSON du Guybrush Lay down
       const guybrushSpritesheetLD = await PIXI.Assets.load('../sprites/LAYDOWN/lay down.json');
       // Frames LD
       const framesLD = Object.keys(guybrushSpritesheetLD.textures).map(
                           frame => guybrushSpritesheetLD.textures[frame]
       );
       const guybrushLD = new PIXI.AnimatedSprite(framesLD);

       // Chargement du JSON de GuyBrush Face Talk
       const guybrushSpritesheetGU = await PIXI.Assets.load('../sprites/GETUP/get up.json');
       // Création d'une animation à partir des frames du JSON
       const framesGU = Object.keys(guybrushSpritesheetGU.textures).map(
                                frame => guybrushSpritesheetGU.textures[frame]
       );
       const guybrushGU = new PIXI.AnimatedSprite(framesGU);


       app.stage.addChild(guybrush);

       guybrush.animationSpeed = 0.13;
       guybrush.play();
       guybrush.x = app.screen.width / 2;
       guybrush.y = app.screen.height * 0.8;
       guybrush.anchor.set(0.5); 

       // Commenter - Décommenter addChild pour afficher/retirer le sprite
       // app.stage.addChild(guybrushWR);

       guybrushWR.animationSpeed = 0.13;
       guybrushWR.play();
       guybrushWR.x = app.screen.width * 0.4 ;
       guybrushWR.y = app.screen.height * 0.8;
       guybrushWR.anchor.set(0.5); 

       // Commenter - Décommenter addChild pour afficher/retirer le sprite
       // app.stage.addChild(guybrushWL);

       guybrushWL.animationSpeed = 0.13;
       guybrushWL.play();
       guybrushWL.x = app.screen.width * 0.6 ;
       guybrushWL.y = app.screen.height * 0.8;
       guybrushWL.anchor.set(0.5); 

        // Commenter - Décommenter addChild pour afficher/retirer le sprite
       // app.stage.addChild(guybrushLD);

       guybrushLD.animationSpeed = 0.05;
       guybrushLD.play();
       guybrushLD.x = app.screen.width * 0.74 ;
       guybrushLD.y = app.screen.height * 0.77;
       guybrushLD.anchor.set(0.5); 

       // Commenter - Décommenter addChild pour afficher/retirer le sprite
       app.stage.addChild(guybrushGU);
       guybrushGU.animationSpeed = 0.12;
       guybrushGU.play();
       guybrushGU.x = app.screen.width * 0.74 ;
       guybrushGU.y = app.screen.height * 0.77;
       guybrushGU.anchor.set(0.5); 

       function adjustCanvasSize() {
       app.renderer.resize(window.innerWidth, window.innerHeight);
       background.width = app.screen.width;
       background.height = app.screen.height;

       // On recentre Guybrush
       guybrush.x = app.screen.width / 2;
       guybrush.y = app.screen.height * 0.8;

       guybrushWR.x = app.screen.width * 0.4 ;
       guybrushWR.y = app.screen.height * 0.802;

       guybrushWL.x = app.screen.width * 0.6 ;
       guybrushWL.y = app.screen.height * 0.802;

       guybrushLD.x = app.screen.width * 0.74 ;
       guybrushLD.y = app.screen.height * 0.84;

       guybrushGU.x = app.screen.width * 0.74 ;
       guybrushGU.y = app.screen.height * 0.84;

       // Ajuster l'échelle de Guybrush proportionnellement
       const scaleFactor = Math.min(
           app.screen.width / 1000, 
           app.screen.height / 600  
       );
       guybrush.scale.set(scaleFactor);

       // Ajuster l'échelle de GuybrushWR proportionnellement
       const scaleFactorWR = Math.min(
           app.screen.width / 850, 
           app.screen.height / 600
       );
       guybrushWR.scale.set(scaleFactorWR);

       // Ajuster l'échelle de GuybrushWL proportionnellement
       const scaleFactorWL = Math.min(
           app.screen.width / 850, 
           app.screen.height / 600
       );
       guybrushWL.scale.set(scaleFactorWL);

       // Ajuster l'échelle de GuybrushLD proportionnellement
       const scaleFactorLD = Math.min(
           app.screen.width / 850, 
           app.screen.height / 600
       );
       guybrushLD.scale.set(scaleFactorLD);

       // Ajuster l'échelle de GuybrushGU proportionnellement
       const scaleFactorGU = Math.min(
           app.screen.width / 850, 
           app.screen.height / 600
       );
       guybrushLD.scale.set(scaleFactorGU);
   }
           

       // Applique le redimensionnement à chaque événement 'resize'
       window.addEventListener('resize', adjustCanvasSize);

       // Optionnel : pour s'assurer que tout est bien redimensionné dès le chargement initial
       adjustCanvasSize();
       console.log("tout s\'est bien déclenché");
           
       })();