export async function interactions(app, sprites, texts) {

    const { houseContainer, houseSprite, guybrush, guybrushWR, guybrushWL, guybrushLD, guybrushGU, guybrushSO, guybrushSOT, gamingChairAR, guybrushIUL, guybrushIUR, ordi, ordiRun, toilePoulie, toilePoulieRun, menuContainer, menuCoverDialogue, menuButton, menuButton2, menuButton3, menuButton4, menuButton5, menuButton6, menuButton7, menuButton8, menuButton9 } = sprites;
    const { wakeUpText, wakeUpText2, wakeUpText3, wakeUpResponses, responseStyle, startDialogue} = texts;
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    // GUYBRUSH START SETUP (Sleeping)
    setPosition(guybrushLD, 0.9, 0.85);
    houseContainer.addChild(guybrushLD);

    // GUYBRUSH WAKEUP ANIMATION
    let wakeUpAnimationCompleted = false;
    // Lorsqu'on clique sur Guybrush, lance l'animation du wakeup
    guybrushLD.on('click', () => {
        menuContainer.addChild(menuCoverDialogue);
        setPosition(guybrushGU, 0.9, 0.82);
        spriteSwap(houseContainer, guybrushLD, guybrushGU); 
        guybrushGU.gotoAndPlay(0);
        guybrushGU.loop = false;
        guybrushGU.onComplete = async () => {
                                    // Attend 1 seconde
                                    await delay(1000);

                                    // Se déplace vers la gauche
                                    setPosition(guybrushWL, 0.9, 0.82);
                                    spriteSwap(houseContainer, guybrushGU, guybrushWL);
                                    await walkLeft(0.7);

                                    // S'arrête et parle de face
                                    setPosition(guybrush, 0.7, 0.82);
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

                                    // Se déplace vers la gauche
                                    setPosition(guybrushWL, 0.7, 0.82);
                                    spriteSwap(houseContainer, guybrush, guybrushWL);
                                    await walkLeft(0.45);

                                    // Allume le pc
                                    setPosition(guybrushIUL, 0.45, 0.82);
                                    spriteSwap(houseContainer, guybrushWL, guybrushIUL);
                                    guybrushIUL.gotoAndPlay(0);
                                    guybrushIUL.loop = false;
                                    // Attend 1 seconde
                                    await delay(1000);
                                    // Change la séquence de sprite de l'ordi & ajoute armrest
                                    spriteSwap(houseContainer, ordi, ordiRun);
                                    ordiRun.interactive = true;
                                    houseContainer.addChild(gamingChairAR);
                                    
                                    // Se retourne vers le fauteuil
                                    setPosition(guybrushWR, 0.45, 0.82);
                                    spriteSwap(houseContainer, guybrushIUL, guybrushWR);
                                    await walkRight(0.5);

                                    // S'assoie sur la chaise de bureau & ajout de l'accoudoir
                                    setPosition(guybrushSO, 0.5, 0.82);
                                    spriteSwap(houseContainer, guybrushWR, guybrushSO); 
                                    guybrushSO.interactive = true;
                                    textFollowSprite(guybrushSO, wakeUpText);  
                                    await skipDialogue(houseContainer, guybrushSO, wakeUpText, 4000); 

                                    // TEST RESPONSES ZONE TEST
                                     await displayResponses(menuCoverDialogue, wakeUpResponses, responseStyle);
                                    
                                    // MARK ANIMATION AS COMPLETED
                                    wakeUpAnimationCompleted = true;
                                    if (wakeUpAnimationCompleted) {
                                    // FREE SOME MEMORY :
                                    wakeUpText.destroy();
                                    wakeUpText2.destroy();
                                    wakeUpText3.destroy();
                                    guybrushLD.destroy();
                                    guybrushGU.destroy();
                                    console.log("L'animation de réveil s'est bien déroulée et les ressources détruites");
                                        }
                                    };
                                });

    // BLANK SCREEN UNROLLING ON CLICK
    toilePoulie.on('click', unroll);
    function unroll() {
        houseContainer.removeChild(toilePoulie);
        houseContainer.addChild(toilePoulieRun);
        toilePoulieRun.animationSpeed = 0.035;
        toilePoulieRun.interactive = true;
        toilePoulieRun.gotoAndPlay(0);
        toilePoulieRun.loop = false;
    }

   
    // Si on veut relancer le dialogue avec Romain après l'intro
    guybrushSO.on('click', async () => {
        if (menuButton6.isActive) {
            spriteSwap(houseContainer, guybrushSO, guybrushSOT);
            guybrushSOT.play();
            guybrushSOT.x = guybrushSO.x + 10;
            guybrushSOT.y = guybrushSO.y;

            textFollowSprite(guybrushSOT, startDialogue);
            menuContainer.addChild(menuCoverDialogue);
            await displayResponses(menuCoverDialogue, wakeUpResponses, responseStyle);
            console.log("Ok swaped");
        }  
        console.log("NOOO !");
    });
        


/////////////////////////////// DEPLACEMENTS METHODS ///////////////////////////////
                       
// METHODE POUR DEPLACER A GAUCHE
function walkLeft (positionFactor) {
    return new Promise((resolve) => {
    let moving = true;
    const speed = 2.7;
    const stopPosition = houseSprite.width * positionFactor;
    // Ticker
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

// METHODE POUR DEPLACER A DROITE
function walkRight(positionFactor) {
    return new Promise((resolve) => {
    let moving = true;
    const speed = 2.7;
    const stopPosition = houseSprite.width * positionFactor;
    // Ticker
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

/////////////////////////////// MISC METHODS ///////////////////////////////


// METHODE POUR POSITIONNER UN SPRITE
 function setPosition(sprite, xPos, yPos) {
    sprite.x = houseSprite.width * xPos;
    sprite.y = houseSprite.height * yPos;
}

// METHODE POUR CHANGER DE SPRITE
function spriteSwap(houseContainer, sprite1, sprite2) {
    houseContainer.removeChild(sprite1);
    houseContainer.addChild(sprite2);
}

// METHODE POUR QUE LE TEXTE FOLLOW LE SPRITE
function textFollowSprite(sprite, textObject) {
    houseContainer.addChild(textObject);
    textObject.zIndex = 4;
    textObject.x = sprite.x;
    textObject.y = sprite.y - sprite.height;
}

// METHODE POUR AFFICHER LES REPONSES DU JOUEUR - TABLEAU EN PARAMETRE
function displayResponses(menuCoverDialogue, playerResponses, style) {

    // On commence par vider tous les éléments textes s'il y en a
    menuCoverDialogue.removeChildren();

    // On parcourt le tableau des réponses du joueur de manière classique (sans `forEach`)
    for (let i = 0; i < playerResponses.length; i++) {
        const response = playerResponses[i]; // L'élément actuel (réponse)
        const index = i; // L'index actuel

        const responseText = new PIXI.Text(response.text, style);
        responseText.interactive = true;
        responseText.x = 0;
        responseText.y = index * 40; // Décalage de la position verticale

        responseText.on('pointerover', () => {
            responseText.style.fill = '#b23fb1';
        });
        responseText.on('pointerout', () => {
            responseText.style.fill = '#772a76';
        });

        responseText.on('pointerdown', () => {
            // Appel de l'action associée à la réponse
            response.action();

            // Supprime la réponse du tableau
            playerResponses.splice(index, 1);

            // Retire l'élément de l'affichage
            menuCoverDialogue.removeChild(responseText);

            // Décale les autres éléments vers le haut
            displayResponses(menuCoverDialogue, playerResponses, style);
        });

        menuCoverDialogue.addChild(responseText); // Ajout du texte à l'affichage
    }
}

// function displayResponses(menuCoverDialogue, playerResponses, style) {

//     // On commence par vider tous les éléments textes s'il y en a
//     menuCoverDialogue.removeChildren();
//     // On parcourt le tableau des réponses du joueur et on les affiche. On récupère l'index de chaque réponse
//     playerResponses.forEach((response, index) => {
//         const responseText = new PIXI.Text(response.text, style);
//         responseText.interactive = true;
//         responseText.x = 0;
//         responseText.y = index * 40;

//         responseText.on('pointerover', () => {
//             responseText.style.fill = '#b23fb1';
//         });
//         responseText.on('pointerout', () => {
//             responseText.style.fill = '#772a76';
//         });

//         responseText.on('pointerdown', () => {
//             // On appelle la propriété action de l'objet playerResponses
//             response.action(); 

//             // On supprime la réponse du tableau
//             const responseIndex = playerResponses.indexOf(response);
//             if (responseIndex !== -1) {
//                 playerResponses.splice(responseIndex, 1);
//             }

//             // Décale les réponses suivantes
//             refreshResponses(menuCoverDialogue, playerResponses);

//             // Retire l'élément de l'affichage
//             menuCoverDialogue.removeChild(responseText);
//         });

//         menuCoverDialogue.addChild(responseText); 
//     });
// }

// // METHODE POUR METTRE A JOUR LA POSITION DES REPONSES APRES SUPPRESSION (DECALAGE DES REPONSES)

// function refreshResponses(menuCoverDialogue, playerResponses) {
//     menuCoverDialogue.removeChildren(); // Retirer tous les enfants pour réajuster tout
//     playerResponses.forEach((response, index) => {
//         const responseText = new PIXI.Text(response.text, {
//             fontFamily: 'arial',
//             fontSize: 25,
//             fill: '#772a76',
//             stroke: 'black',
//             strokeThickness: 6,
//             wordWrap: true,
//             wordWrapWidth: 800,
//             lineHeight: 40
//         });

//         responseText.interactive = true;
//         responseText.x = 0;
//         responseText.y = index * 40;

//         responseText.on('pointerover', () => {
//             responseText.style.fill = '#b23fb1';
//         });

//         responseText.on('pointerout', () => {
//             responseText.style.fill = '#772a76';
//         });

//         responseText.on('pointerdown', () => {
//             // Exécute l'action associée
//             response.action();

//             // Supprime la réponse du tableau
//             const responseIndex = playerResponses.indexOf(response);
//             if (responseIndex !== -1) {
//                 playerResponses.splice(responseIndex, 1);
//             }

//             // Retire l'élément de l'affichage
//             menuCoverDialogue.removeChild(responseText);

//             // Recalcule la position des réponses restantes
//             refreshResponses(menuCoverDialogue, playerResponses);
//         });

//         menuCoverDialogue.addChild(responseText);
//     });
// }


// METHODE POUR SKIPPER UNE LIGNE DE DIALOGUE
function skipDialogue(houseContainer, textParent, textDialogue, duration) {
    return new Promise((resolve) => {
        let clicked = false;
        houseContainer.interactive = true;

        function onClick() {
            if (!clicked) {
                clicked = true;
                houseContainer.removeChild(textDialogue);
                houseContainer.interactive = false;
                houseContainer.removeEventListener('click', onClick);
                resolve();
            }
        }
        houseContainer.addEventListener('click', onClick);
        setTimeout(() => {
            if (!clicked) {
                houseContainer.removeChild(textDialogue);
                houseContainer.interactive = false;
                houseContainer.removeEventListener('click', onClick);
                resolve();
            }
        }, duration);
    });
}
}