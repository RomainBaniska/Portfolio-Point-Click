 // video.loop = true;
            // video.muted = false;
            // video.autoplay = true;
            // video.play();

            // // Création de la texture vidéo et du sprite PIXI
            // const texture = PIXI.Texture.from(video);
            // const videoSprite = new PIXI.Sprite(texture);
            // // videoSprite.width = app.screen.width;
            // // videoSprite.height = app.screen.height;
            // app.stage.addChild(videoSprite);

            // // Ajouter un événement de clic sur la vidéo pour pause/play
            // videoSprite.interactive = true;
            // videoSprite.buttonMode = true;
            // videoSprite.on("pointerdown", () => {
            //     if (video.paused) {
            //         video.play();
            //     } else {
            //         video.pause();
            //     }
            // });

            // // Create play button that can be used to trigger the video
            // const button = new PIXI.Graphics()
            // .roundRect(0, 0, 100, 100, 10)
            // .fill(0xffffff, 0.5)
            // .beginPath()
            // .moveTo(36, 30)
            // .lineTo(36, 70)
            // .lineTo(70, 50)
            // .closePath()
            // .fill(0xffffff);

            // // Position the button
            // button.x = (app.screen.width - button.width) / 2;
            // button.y = (app.screen.height - button.height) / 2;

            // // Enable interactivity on the button
            // button.eventMode = 'static';
            // button.cursor = 'pointer';

            // // Add to the stage
            // // toileScreen.addChild(button);
            // // toileScreen.addChild(playVideo);
            // app.stage.addChild(playVideo);

            // // Load the video texture
            // // const texture = await PIXI.Assets.load('https://pixijs.com/assets/video.mp4');
            // const texture = await PIXI.Assets.load('../videos/RebatierePF.mp4');



            // playVideo.on('pointertap', () =>
            // // button.on('pointertap', () =>
            //     {
            //         // Don't need the button anymore
            //         // button.destroy();
            //         playVideo.destroy();
            
            //         // Create a new Sprite using the video texture (yes it's that easy)
            //         const videoSprite = new PIXI.Sprite(texture);
            
            //         // Stretch to fill the whole screen
            //         videoSprite.width = app.screen.width;
            //         videoSprite.height = app.screen.height;
            
            //         // app.stage.addChild(videoSprite);
            //         toileScreen.addChild(videoSprite);

            //         videoSprite.x = app.screen.width / 14;
            //         videoSprite.y = app.screen.height / 8;
            //         // videoSprite.width = toileScreen.width;
            //         console.log(toileScreen.width, "owww")
            //         console.log(videoSprite.width, "yeah")
            //         // videoSprite.height = toileScreen.height;
            //     });

    // Définit un ordre de superposition
    // toileScreen.zIndex = 1;
    // button.zIndex = 13;
    // texture.zIndex = 12;

    // Active le tri par zIndex

    // const videoElement = document.createElement('video');
    // videoElement.src = '../videos/RebatierePF.mp4';
    // videoElement.crossOrigin = 'anonymous'; // Permet d'éviter certains problèmes CORS
    // videoElement.autoplay = true;
    // videoElement.loop = false; // Désactive la boucle si besoin
    // videoElement.playsInline = true; // Évite les comportements indésirables sur mobile
    // videoElement.style.display = 'none'; // Cache l'élément HTML

    // document.body.appendChild(videoElement);

    //         // On charge l'asset hors de spriteload pour qu'elle démarre dès qu'elle est créée
    //         // const film1Asset = await PIXI.Assets.load('https://pixijs.com/assets/video.mp4');
    //         // const film1Asset = await PIXI.Assets.load('../videos/RebatierePF.mp4');
    //         // const film1Asset = PIXI.Texture.fromVideo('../videos/RebatierePF.mp4');
    //         const film1Asset = PIXI.Texture.from(videoElement);
    //         const film1 = new PIXI.Sprite(film1Asset);
    //         film1.anchor.set(0.5);
    //         film1.zIndex = 11;
    //         film1.x = app.screen.width / 2;
    //         film1.y = app.screen.height / 2;
    //         film1.height = app.screen.height * 0.85;
    //         film1.width = ((houseSprite.height / 1024) * 1440 * 1.4) * 0.85;

    //         // Récupération de l'élément vidéo
    //         // const videoElement = film1Asset.baseTexture.resource.source;
    //         // Démarrer la vidéo automatiquement
    //         videoElement.play();

    //         app.stage.addChild(film1);

    //             // Ajout de l'événement de clic pour pause/play
    //             film1.interactive = true;
    //             film1.buttonMode = true;
    //             film1.on('pointerdown', () => {
    //                 if (videoElement.paused) {
    //                     videoElement.play();
    //                 } else {
    //                     videoElement.pause();
    //                 }
    //             });

            // await new Promise(resolve => setTimeout(resolve, 0));
            // Ajout des boutons play et stop
            // app.stage.addChild(playVideo);