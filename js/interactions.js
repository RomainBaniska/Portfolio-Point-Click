export async function interactions(app, sprites, texts) {

    const { houseContainer, houseSprite, crosshair, guybrush, guybrushWR, guybrushWL, guybrushLD, guybrushGU, guybrushSO, guybrushSOT, gamingChairAR, guybrushIUL, guybrushIUR, ordi, ordiRun } = sprites;

    const { wakeUpText, wakeUpText2, wakeUpText3 } = texts;

    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    houseContainer.addChild(guybrushLD);
    // Lors du click sur le Guybrush qui dort, on le réveille
    guybrushLD.on('click', wakeUp);
    guybrushGU.on('click', goSleep);

    function wakeUp() {
        // Se réveille 
    console.log ("se réveille");
    if (houseContainer.children.includes(guybrushLD)) {
        spriteSwap(houseContainer, guybrushLD, guybrushGU); 

        guybrushGU.gotoAndPlay(0);
        guybrushGU.loop = false;

        guybrushGU.onComplete = async () => {
            setTimeout(async () => {
                // Se déplace vers la gauche de l'écran à la fin du réveil
                spriteSwap(houseContainer, guybrushGU, guybrushWL);
                await walkLeft(0.5);

                // À la fin de l'animation walk left, se met de face et parle
                spriteSwap(houseContainer, guybrushWL, guybrush); 
                
                // Texte 1
                guybrush.addChild(wakeUpText);
                textFollowSprite(guybrush, wakeUpText);
                await skipDialogue(houseContainer, guybrush, wakeUpText, 4000);

                // Texte 2
                guybrush.addChild(wakeUpText2);
                textFollowSprite(guybrush, wakeUpText2);
                await skipDialogue(houseContainer, guybrush, wakeUpText2, 4000);

                // Texte 3
                guybrush.addChild(wakeUpText3);
                textFollowSprite(guybrush, wakeUpText3);
                await skipDialogue(houseContainer, guybrush, wakeUpText3, 4000);

                // Mouvement vers la gauche de la pièce
                spriteSwap(houseContainer, guybrush, guybrushWL);
                await walkLeft(0.25);

                // Allume le pc
                spriteSwap(houseContainer, guybrushWL, guybrushIUL);
                guybrushIUL.gotoAndPlay(0);
                guybrushIUL.loop = false;
                await delay(1000);
                spriteSwap(houseContainer, ordi, ordiRun);
                console.log('ok1');
                
                // Se retourne vers le fauteuil
                spriteSwap(houseContainer, guybrushIUL, guybrushWR);
                await walkRight(0.328);
                console.log('ok2');

                // S'assoie sur la chaise de bureau & ajout de l'accoudoir
                spriteSwap(houseContainer, guybrushWR, guybrushSO);
                houseContainer.addChild(gamingChairAR);
               
                

                // setTimeout(async () => {
                // houseContainer.removeChild(guybrushSO);
                // }, 4000);
                // setTimeout(async () => {
                // await houseContainer.addChild(guybrushSOT);
                // }, 4000);
                // setTimeout(async () => {
                // await houseContainer.removeChild(guybrushSOT);
                // }, 8000);
                // setTimeout(async () => {
                // await houseContainer.addChild(guybrushSO);
                // }, 8000);


        }, 500);   
        };
    }
    }

    function goSleep() {
        console.log("Va dormir");
    if (houseContainer.children.includes(guybrushGU)) {
        houseContainer.removeChild(guybrushGU);
        houseContainer.addChild(guybrushLD);

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

    function walkRight(positionFactor) {
    return new Promise((resolve) => {
        let moving = true;
        const speed = 2.7;
        const stopPosition = app.screen.width * positionFactor;

        console.log('Position initiale:', guybrushWR.x, 'Arrêt attendu à:', stopPosition);

        app.ticker.add(() => {
            if (moving) {
                guybrushWR.x += speed; 
                if (guybrushWR.x >= stopPosition) {
                    moving = false;
                    console.log('Position finale:', guybrushWR.x);
                    resolve();
                }
            }
        });
    });
}


    console.log("tout s'est bien déclenché dans interactions");
}

// METHODE DE SPRITE SWAP

function spriteSwap(houseContainer, sprite1, sprite2) {
    houseContainer.removeChild(sprite1);
    houseContainer.addChild(sprite2);
}

// METHODE DE TEXT FOLLOWING SPRITE

function textFollowSprite(sprite, textObject) {
    sprite.addChild(textObject);
    textObject.x = 0.1 * sprite.width;
    textObject.y = -0.8 * sprite.height;
}

// METHODE DE SKIP DIALOGUE (TEXT)

function skipDialogue(houseContainer, textParent, textDialogue, duration) {
    return new Promise((resolve) => {
        let clicked = false;
        houseContainer.interactive = true;

        function onClick() {
            if (!clicked) {
                clicked = true;
                textParent.removeChild(textDialogue);
                houseContainer.interactive = false;
                houseContainer.removeEventListener('click', onClick);
                resolve();
            }
        }

        houseContainer.addEventListener('click', onClick);

        setTimeout(() => {
            if (!clicked) {
                textParent.removeChild(textDialogue);
                houseContainer.interactive = false;
                houseContainer.removeEventListener('click', onClick);
                resolve();
            }
        }, duration);
    });
}