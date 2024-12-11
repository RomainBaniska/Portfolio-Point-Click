export async function interactions(app, sprites, texts) {

    const { container, background, crosshair, guybrush, guybrushWR, guybrushWL, guybrushLD, guybrushGU, guybrushSO, guybrushSOT, gamingChairAR } = sprites;

    const { wakeUpText, wakeUpText2, wakeUpText3 } = texts;

    container.addChild(guybrushLD);
    // Lors du click sur le Guybrush qui dort, on le réveille
    guybrushLD.on('click', wakeUp);
    guybrushGU.on('click', goSleep);

    function wakeUp() {
        // Se réveille 
    console.log ("se réveille");
    if (container.children.includes(guybrushLD)) {
        container.removeChild(guybrushLD);
        container.addChild(guybrushGU);

        guybrushGU.gotoAndPlay(0);
        guybrushGU.loop = false;

        guybrushGU.onComplete = async () => {
            setTimeout(async () => {
                 // Se déplace vers la gauche de l'écran à la fin du réveil
                console.log ("se déplace vers la gauche");
                container.removeChild(guybrushGU); 
                container.addChild(guybrushWL); 
                
                await walkLeft(0.5);

        // À la fin de l'animation walk left, se met de face et parle
                container.removeChild(guybrushWL);
                container.addChild(guybrush);  
                
                container.addChild(wakeUpText);

                await skipDialogue(container, wakeUpText, 4000);
                console.log("wakeUpText traité, ajout de wakeUpText2");

                container.addChild(wakeUpText2);
                await skipDialogue(container, wakeUpText2, 4000);

                console.log("wakeUpText2 est traité");

                container.addChild(wakeUpText3);
                await skipDialogue(container, wakeUpText3, 4000);

                console.log("wakeUpText3 est traité");

                container.removeChild(guybrush);
                container.addChild(guybrushWL); 
                await walkLeft(0.3);
                container.removeChild(guybrushWL);

                container.addChild(guybrushSO);
                container.addChild(gamingChairAR);
                setTimeout(async () => {
                container.removeChild(guybrushSO);
                }, 4000);
                setTimeout(async () => {
                await container.addChild(guybrushSOT);
                }, 4000);
                setTimeout(async () => {
                await container.removeChild(guybrushSOT);
                }, 8000);
                setTimeout(async () => {
                await container.addChild(guybrushSO);
                }, 8000);


        }, 500);   
        };
    }
    }

    function goSleep() {
        console.log("Va dormir");
    if (container.children.includes(guybrushGU)) {
        container.removeChild(guybrushGU);
        container.addChild(guybrushLD);

        guybrushLD.gotoAndPlay(0);
    }
    }

    function walkLeft (positionFactor) {
    return new Promise((resolve) => {
    
    let moving = true;
    const speed = 2.7;
    const stopPosition = app.screen.width * positionFactor;

    console.log(`Position initiale: ${guybrushWL.x}`);
    console.log(`Arrêt prévu: ${stopPosition}`);

    app.ticker.add(() => {
        if (moving) {
            guybrushWL.x -= speed; 
            if (guybrushWL.x <= stopPosition) {
                moving = false;
                console.log("Arrêt atteint à :", guybrushWL.x);
                resolve();
            }
        }
    });
});
    }

    console.log("tout s'est bien déclenché dans interactions");
}

// METHODE DE SKIP DIALOGUE (TEXT)

function skipDialogue(container, textDialogue, duration) {
    return new Promise((resolve) => {
        let clicked = false;
        container.interactive = true;

        function onClick() {
            if (!clicked) {
                clicked = true;
                container.removeChild(textDialogue);
                container.interactive = false;
                container.removeEventListener('click', onClick);
                resolve();
            }
        }

        container.addEventListener('click', onClick);

        setTimeout(() => {
            if (!clicked) {
                container.removeChild(textDialogue);
                container.interactive = false;
                container.removeEventListener('click', onClick);
                resolve();
            }
        }, duration);
    });
}