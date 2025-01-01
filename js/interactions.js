export async function interactions(app, sprites, texts) {

    const { houseContainer, houseSprite, guybrush, guybrushWR, guybrushWL, guybrushLD, guybrushGU, guybrushSO, guybrushSOT, gamingChairAR, guybrushIUL, guybrushIUR, ordi, ordiRun, toilePoulie, toilePoulieRun, menuContainer, menuCoverDialogue } = sprites;
    const { wakeUpText, wakeUpText2, wakeUpText3, wakeUpResponses, OkText} = texts;
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    // Guybrush dort sur le lit
    setPosition(guybrushLD, 0.9, 0.85);
    houseContainer.addChild(guybrushLD);

    // Guybrush se réveille
    guybrushLD.on('click', wakeUp);
    function wakeUp() {
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
                                    };


                                    // TEST RESPONSES ZONE TEST
                                    displayResponses(menuCoverDialogue, wakeUpResponses);

                                    // Si clique sur Objet n°1 du tableau -> 
                                    // textFollowSprite guybrush SOT, DiscussionText1 (ou n° d'objet du tableau de réponse
                                    // textFollowSprite guybrush SOT, DiscussionText1 (ou n° d'objet du tableau de réponse)
                                    // ensuite skipDialogue avec housecontainer, guybrushSOT, DiscussionText1, 4000
                                    // Factorisation possible avec une méthode ?
                                    
                                    // wakeUpResponses[0].addEventListener("click", () => {
                                    //     textFollowSprite(guybrush, OkText);
                                    //     wakeUpResponses[0].pop();
                                    // });

                                    // console.log(wakeUpResponses[0]);

                       }

                       console.log("tout s'est bien déclenché dans interactions");

    toilePoulie.on('click', unroll);
    function unroll() {
        houseContainer.removeChild(toilePoulie);
        houseContainer.addChild(toilePoulieRun);
        toilePoulieRun.animationSpeed = 0.035;
        toilePoulieRun.interactive = true;
        toilePoulieRun.gotoAndPlay(0);
        toilePoulieRun.loop = false;
    }
        
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
    sprite.addChild(textObject);
    // houseContainer.addChild(textObject);
    textObject.zIndex = 4;

    textObject.x = 0.5 * sprite.width;
    textObject.y = -1.3 * sprite.height;
}

// METHODE POUR AFFICHER LES REPONSES DU JOUEUR - TABLEAU EN PARAMETRE
function displayResponses(menuCoverDialogue, playerResponses) {

    menuCoverDialogue.removeChildren();

    // On parcourt le tableau des réponses du joueur
    playerResponses.forEach((response, index) => {
        // Chaque réponse du tableau est affichée, on conserve l'index pour le positionnement
        const responseText = new PIXI.Text(response.text, {fontFamily: 'arial', fontSize: 25, fill: '#772a76', stroke: 'black', strokeThickness: 6, wordWrap: true, wordWrapWidth: 800, lineHeight: 40
        });
        responseText.interactive = true;
        responseText.x = 0;
        responseText.y = index * 40;

        responseText.on('pointerover', () => {
            responseText.style.fill = '#b23fb1';
        });
        responseText.on('pointerout', () => {
            responseText.style.fill = '#772a76';
        });

        responseText.on('pointerdown', () => {
            // On appelle la propriété action de l'objet playerResponses
            response.action(); 

            // On supprime la réponse du tableau
            const responseIndex = playerResponses.indexOf(response);
            if (responseIndex !== -1) {
                playerResponses.splice(responseIndex, 1);
            }

            // Décale les réponses suivantes

            refreshResponses(menuCoverDialogue, playerResponses);

            // Retire l'élément de l'affichage
            menuCoverDialogue.removeChild(responseText);
        });

        menuCoverDialogue.addChild(responseText); 
    });
}

// METHODE POUR METTRE A JOUR LA POSITION DES REPONSES APRES SUPPRESSION

function refreshResponses(menuCoverDialogue, playerResponses) {
    menuCoverDialogue.removeChildren(); // Retirer tous les enfants pour réajuster tout
    playerResponses.forEach((response, index) => {
        const responseText = new PIXI.Text(response.text, {
            fontFamily: 'arial',
            fontSize: 25,
            fill: '#772a76',
            stroke: 'black',
            strokeThickness: 6,
            wordWrap: true,
            wordWrapWidth: 800,
            lineHeight: 40
        });

        responseText.interactive = true;
        responseText.x = 0;
        responseText.y = index * 40;

        responseText.on('pointerover', () => {
            responseText.style.fill = '#b23fb1';
        });

        responseText.on('pointerout', () => {
            responseText.style.fill = '#772a76';
        });

        responseText.on('pointerdown', () => {
            // Exécute l'action associée
            response.action();

            // Supprime la réponse du tableau
            const responseIndex = playerResponses.indexOf(response);
            if (responseIndex !== -1) {
                playerResponses.splice(responseIndex, 1);
            }

            // Retire l'élément de l'affichage
            menuCoverDialogue.removeChild(responseText);

            // Recalcule la position des réponses restantes
            refreshResponses(menuCoverDialogue, playerResponses);
        });

        menuCoverDialogue.addChild(responseText);
    });
}


// METHODE POUR SKIPPER UNE LIGNE DE DIALOGUE
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
}