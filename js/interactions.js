export async function interactions(apps, sprites, texts) {

    const { app, blackScreen } = apps;
    const { houseContainer, houseSprite, innerHouseSprite, waterpouring, guybrush, guybrushWR, guybrushWL, guybrushLD, guybrushGU, guybrushSO, guybrushSOT, gamingChairAR, guybrushIUL, guybrushIUR, ordi, ordiRun, toilePoulie, toilePoulieRun, toilePoulieReverse, menuContainer, menuCoverDialogue, menuCoverDialogueOverlay, menuButton, menuButton2, menuButton3, menuButton4, menuButton5, menuButton6, menuButton7, menuButton8, menuButton9, glasswater, menuItemTabletPack, menuItemGlassWater, menuItemGlassWaterEmpty, menuItemGlassWaterEmptySelected, goldkey, menuItemGoldKey, menuItemGoldKeySelected, table, tableOpen, toileScreen, playVideo, playVideoActive, playVideospriteAsset, playVideoframes, stopVideo, stopVideoActive, stopVideospriteAsset, stopVideoframes, nextVideo, nextVideoActive, nextVideoframes, nextVideospriteAsset, prevVideo, prevVideoActive, prevVideoframes, prevVideospriteAsset,exitVideo, exitVideoActive, exitVideospriteAsset, exitVideoframes, innerHouseContainer } = sprites;
    const { wakeUpText, wakeUpText2, wakeUpText3, wakeUpResponses, responseStyle, startDialogue, dialogueStyle, dialogueStyle2 } = texts;
    // const { unrollSound } = sounds
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    // Vidéos de la toile
    const videoList = [
        "../videos/RebatierePF.mp4",
        "../videos/RebatiereNoCut.mp4",
        "../videos/TimeoutNoCut.mp4"
    ];
    // Index en cours de la video (initialisation)
    let currentVideoIndex = 0;

    // GUYBRUSH START SETUP (Sleeping)
    setPosition(guybrushLD, 0.7, 0.775);
    innerHouseContainer.addChild(guybrushLD);

    // Prendre le verre
    // Si le bouton menuButton4 est actif et qu'on clique sur le sprite "glasswater" on destroy le sprite glasswater et on ajoute l'item glasswateritem
    glasswater.on('click', () => {
        if (menuButton4.isActive) {
            PIXI.sound.play('pickup');
            innerHouseContainer.removeChild(glasswater);
            glasswater.destroy();
            menuContainer.addChild(menuItemGlassWater);
        }
    });

    // Prendre la clé en or
    goldkey.on('click', () => {
        if (menuButton4.isActive) {
            // glasswater.isActive = false;
            PIXI.sound.play('pickup');
            innerHouseContainer.removeChild(goldkey);
            goldkey.destroy();
            menuContainer.addChild(menuItemGoldKey);
        }
    });

    // Ouvrir le tiroir
    const defaultTexture = table.texture;
    let isTableOpenned = false;

    table.on('click', () => {
        if (isTableOpenned === false) {
        if (menuButton2.isActive) {
            PIXI.sound.play('drawerOpen');
            table.texture = tableOpen.texture;
            isTableOpenned = true;

            menuContainer.addChild(menuItemTabletPack);
        }
    }
    })

    table.on('click', () => {
        if (menuButton3.isActive) {
            PIXI.sound.play('drawerClose');
            if (isTableOpenned === true) {
            table.texture = defaultTexture;
            isTableOpenned = false;
        }
    }
    })
    
    // GUYBRUSH WAKEUP ANIMATION
    let wakeUpAnimationCompleted = false;
    // Lorsqu'on clique sur Guybrush, lance l'animation du wakeup
    guybrushLD.on('click', () => {

        if (menuButton7.isActive && menuItemGlassWater.isActive) {
        
        // console.log ("Action verre d'eau - Romain réussie");
        PIXI.sound.play('watersplash');
        setTimeout(() => {
            PIXI.sound.play('wipeeyes');
        }, 2200);
        // On génère un clic droit sur "app.stage" qui va désactiver les items et le bouton et supprimer les textes d'action et d'item.
        app.stage.emit('rightdown');

         // On swap l'item "verre" par "verre vide" et on n'oublie pas de bien désactiver l'item   
        spriteSwap(menuContainer, menuItemGlassWater, menuItemGlassWaterEmpty);

        menuContainer.addChild(menuCoverDialogue);

        innerHouseContainer.addChild(waterpouring);
        waterpouring.gotoAndPlay(0);
        waterpouring.loop = false;
        waterpouring.onComplete = async () => {
            waterpouring.destroy();
            setPosition(guybrushGU, 0.72, 0.655);
            spriteSwap(innerHouseContainer, guybrushLD, guybrushGU); 
            guybrushGU.gotoAndPlay(0);
            guybrushGU.loop = false;
            guybrushGU.onComplete = async () => {
                                        // Attend 1 seconde
                                        await delay(1000);

                                        // Se déplace vers la gauche
                                        setPosition(guybrushWL, 0.72, 0.67);
                                        spriteSwap(innerHouseContainer, guybrushGU, guybrushWL);
                                        await walkLeft(0.45);

                                        // S'arrête et parle de face
                                        setPosition(guybrush, 0.48, 0.66); // On ajuste un peu à droite pour pas changer l'ancrage du sprite
                                        spriteSwap(innerHouseContainer, guybrushWL, guybrush); 
                    
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
                                        setPosition(guybrushWL, 0.45, 0.67);
                                        spriteSwap(innerHouseContainer, guybrush, guybrushWL);
                                        await walkLeft(0.18);

                                        // Allume le pc
                                        setPosition(guybrushIUL, 0.15, 0.66);
                                        spriteSwap(innerHouseContainer, guybrushWL, guybrushIUL);
                                        guybrushIUL.gotoAndPlay(0);
                                        guybrushIUL.loop = false;
                                        // Attend 1 seconde
                                        await delay(1000);
                                        // Change la séquence de sprite de l'ordi & ajoute armrest
                                        spriteSwap(innerHouseContainer, ordi, ordiRun);
                                        ordiRun.interactive = true;
                                        
                                        // Se retourne vers le fauteuil
                                        setPosition(guybrushWR, 0.15, 0.66);
                                        spriteSwap(innerHouseContainer, guybrushIUL, guybrushWR);
                                        await walkRight(0.2);

                                        // S'assoie sur la chaise de bureau & ajout de l'accoudoir
                                        setPosition(guybrushSO, 0.2, 0.68);
                                        spriteSwap(innerHouseContainer, guybrushWR, guybrushSO); 
                                        innerHouseContainer.addChild(gamingChairAR);
                                        guybrushSO.interactive = true;
                                        textFollowSprite(guybrushSO, wakeUpText);  
                                        await skipDialogue(houseContainer, guybrushSO, wakeUpText, 4000); 

                                        // TEST RESPONSES ZONE TEST
                                        await initResponses(menuCoverDialogue, wakeUpResponses, responseStyle);
                                        
                                        
                                        // MARK ANIMATION AS COMPLETED
                                        wakeUpAnimationCompleted = true;
                                        if (wakeUpAnimationCompleted) {
                                        // FREE SOME MEMORY :
                                        wakeUpText.destroy();
                                        wakeUpText2.destroy();
                                        wakeUpText3.destroy();
                                        guybrushLD.destroy();
                                        guybrushGU.destroy();
                                        // console.log("L'animation de réveil s'est bien déroulée et les ressources détruites");
                                            }
                                        };
                                    };
                                }
                                    });
                                    


   
    // Si on veut relancer le dialogue avec Romain après l'intro
    guybrushSO.on('click', () => {
        if (menuButton6.isActive) {
            spriteSwap(innerHouseContainer, guybrushSO, guybrushSOT);
            guybrushSOT.play();
            guybrushSOT.x = guybrushSO.x + (innerHouseSprite.width * 0.022);
            guybrushSOT.y = guybrushSO.y;
            // On enclenche le dialogue ("Oui ?")
            textFollowSprite(guybrushSOT, startDialogue); 
            menuContainer.addChild(menuCoverDialogue);
            console.log("Dialogue réenclenché");

            initResponses(menuCoverDialogue, wakeUpResponses, responseStyle);
            
            setTimeout(() => {
                spriteSwap(innerHouseContainer, guybrushSOT, guybrushSO);
                innerHouseContainer.removeChild(startDialogue); 
            }, 2000);
        }  
    });

    // Lorsqu'on regarde la toile de home cinema, on active le toileScreen pour voir le portfolio
    toilePoulieRun.on('click', async () => {
        // Quand on clique sur la toile
        if (menuButton5.isActive) {
            app.stage.addChild(toileScreen);
    
            // Vérifier si la vidéo existe déjà pour éviter les doublons
            let existingVideo = document.getElementById("pixi-video");
            if (existingVideo) return;
    
            // Génération de la vidéo dans le DOM
            const video = document.createElement("video");
            video.id = "pixi-video";
            // video.src = "../videos/RebatierePF.mp4";
            video.src = videoList[currentVideoIndex];
            video.autoplay = true;
            video.controls = false;
            video.style.zIndex = "10";

            // Ajout de la video au DOM
            document.body.appendChild(video);
    
            // Ajout de playVideo au conteneur des boutons
            // app.stage.addChild(playVideo);
            app.stage.addChild(stopVideo);
            // Ajout de nextVideo et prevVideo
            app.stage.addChild(prevVideo);
            app.stage.addChild(nextVideo);
            // Ajout de exitVideo
            app.stage.addChild(exitVideo);

            // Gestion des événements Play
            playVideo.on('pointerover', () => {
                playVideo.texture = playVideoActive.texture;
            });

            playVideo.on('pointerout', () => {
                playVideo.texture = playVideospriteAsset.textures[playVideoframes[0]];
            });

            playVideo.on('click', () => {
                video.play();
                app.stage.removeChild(playVideo);
                app.stage.addChild(stopVideo);
            });

            // Gestion des événements Stop
            stopVideo.on('pointerover', () => {
                stopVideo.texture = stopVideoActive.texture;
            });

            stopVideo.on('pointerout', () => {
                stopVideo.texture = stopVideospriteAsset.textures[stopVideoframes[0]];
            });

            stopVideo.on('click', () => {
                video.pause();
                app.stage.removeChild(stopVideo);
                app.stage.addChild(playVideo);
            });

            // Gestion des événements Exit
            exitVideo.on('pointerover', () => {
                exitVideo.texture = exitVideoActive.texture;
            });

            exitVideo.on('pointerout', () => {
                exitVideo.texture = exitVideospriteAsset.textures[exitVideoframes[0]];
            });
            exitVideo.on('click', () => {
                video.remove();
                app.stage.removeChild(playVideo);
                app.stage.removeChild(stopVideo);
                app.stage.removeChild(prevVideo);
                app.stage.removeChild(nextVideo);
                exitVideo.texture = exitVideospriteAsset.textures[exitVideoframes[0]];
                app.stage.removeChild(exitVideo);
                app.stage.removeChild(toileScreen);
                currentVideoIndex = 0;
            });

            // Gestion des événements Next
            nextVideo.on('pointerover', () => {
                nextVideo.texture = nextVideoActive.texture;
            });

            nextVideo.on('pointerout', () => {
                nextVideo.texture = nextVideospriteAsset.textures[nextVideoframes[0]];
            });
            nextVideo.on('click', () => {
                if (currentVideoIndex < videoList.length - 1) {
                    currentVideoIndex++; 
                } else {
                    currentVideoIndex = 0; 
                }
                video.src = videoList[currentVideoIndex]; 
                video.play(); 
            });

            // Gestion des événements Prev
            prevVideo.on('pointerover', () => {
                prevVideo.texture = prevVideoActive.texture;
            });

            prevVideo.on('pointerout', () => {
                prevVideo.texture = prevVideospriteAsset.textures[prevVideoframes[0]];
            });
            prevVideo.on('click', () => {
                if (currentVideoIndex > 0) {
                    currentVideoIndex--;
                } else {
                    currentVideoIndex = videoList.length - 1;
                }
                video.src = videoList[currentVideoIndex]; 
                video.play();
            });
            // Supprimer la vidéo quand on ferme l'écran
            toileScreen.on("removed", () => {
                video.remove();
                app.stage.removeChild(playVideo);
                app.stage.removeChild(stopVideo);
                app.stage.removeChild(prevVideo);
                app.stage.removeChild(nextVideo);
                app.stage.removeChild(exitVideo);
                reroll();
            });
            }
    });
        


/////////////////////////////// DEPLACEMENTS METHODS ///////////////////////////////
                       
// METHODE POUR DEPLACER A GAUCHE
function walkLeft (positionFactor) {
    return new Promise((resolve) => {
    let moving = true;
    const speed = 2.7;
    // const stopPosition = houseSprite.width * positionFactor;
    const stopPosition = innerHouseSprite.width * positionFactor;
    // Ticker
    app.ticker.add(() => {
        if (moving) {
            guybrushWL.x -= speed; 
            if (guybrushWL.x <= stopPosition) {
                moving = false;
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
                resolve();
                }
                }
            });
        });
}

// METHODE POUR DEROULER L'ECRAN DE PROJECTION
function unroll() {
    innerHouseContainer.removeChild(toilePoulie);
        PIXI.sound.play('unroll');
        // console.log('son JOUE');
        innerHouseContainer.addChild(toilePoulieRun);
        toilePoulieRun.animationSpeed = 0.035;
        toilePoulieRun.interactive = true;
        toilePoulieRun.gotoAndPlay(0);
        toilePoulieRun.loop = false;
}
toilePoulie.interactive = true;
toilePoulie.on('click', unroll);

// METHODE POUR REENROULER L'ECRAN DE PROJECTION
function reroll() {
    innerHouseContainer.removeChild(toilePoulieRun);
    innerHouseContainer.addChild(toilePoulieReverse);
    PIXI.sound.play('unroll'); 
    // console.log('son JOUE');
    toilePoulieReverse.animationSpeed = 0.035;
    toilePoulieReverse.gotoAndPlay(0);
    toilePoulieReverse.loop = false;
    
    setTimeout(() => {
        innerHouseContainer.removeChild(toilePoulieReverse)
        innerHouseContainer.addChild(toilePoulie); 
        toilePoulie.interactive = true; 
    }, 3000);
 

}

/////////////////////////////// MISC METHODS ///////////////////////////////

// METHODE POUR POSITIONNER UN SPRITE
 function setPosition(sprite, xPos, yPos) {
    // A changer
    // sprite.x = houseSprite.width * xPos;
    // sprite.y = houseSprite.height * yPos;
    sprite.x = innerHouseSprite.width * xPos;
    sprite.y = innerHouseSprite.height * yPos;
}

// METHODE POUR CHANGER DE SPRITE
function spriteSwap(innerHouseContainer, sprite1, sprite2) {
    innerHouseContainer.removeChild(sprite1);
    innerHouseContainer.addChild(sprite2);
}

// METHODE POUR QUE LE TEXTE FOLLOW LE SPRITE
function textFollowSprite(sprite, textObject) {
    houseContainer.addChild(textObject);
    textObject.zIndex = 4;
    textObject.x = sprite.x;
    textObject.y = sprite.y - sprite.height;
}


function initResponses(menuCoverDialogue, playerResponses, style) {
    // Effectuer une copie profonde à l'initialisation
    // const originalResponses = playerResponses.map(response => ({ ...response }));
    const originalResponses = structuredClone(playerResponses);

    // à ce stade, originalResponses est BIEN le clone de playerResponses, si on essaye de changer la valeur de playerresponse ça reste la même
    // console.log("originalResponses dans displayResponses : ", originalResponses);


    // Appeler la méthode d'affichage
    displayResponses(menuCoverDialogue, playerResponses, style, originalResponses);
}

let unrolled = false;
// METHODE POUR AFFICHER LES REPONSES DU JOUEUR - TABLEAU EN PARAMETRE
function displayResponses(menuCoverDialogue, playerResponses, style, originalResponses) {

    // On commence par vider tous les éléments textes (indispensable pour pas créer des doublons de réponses car la fonction va être réappelée à chaque fois qu'une réponse est cliquée, sauf la réponse exit)
    menuCoverDialogue.removeChildren();

    // On parcourt le tableau des réponses du joueur de manière classique (sans `forEach`)
    for (let i = 0; i < playerResponses.length; i++) {
            const response = playerResponses[i];
            const index = i;

            // Affiche les réponses que le joueur peut sélectionner
            let responseText = new PIXI.Text({ text: response.text, style: style });
            menuCoverDialogue.addChild(responseText);
            responseText.interactive = true;
            responseText.x = 0;
            responseText.y = index * 40;

            responseText.on('pointerover', () => {
                responseText.style.fill = '#b23fb1';
            });
            responseText.on('pointerout', () => {
                responseText.style.fill = '#772a76';
            });
            responseText.on('pointerdown', async () => {
                // Promesse
                await new Promise((resolve) => {
                // On masque les réponses avec un overlay
                menuContainer.addChild(menuCoverDialogueOverlay);

                // Une fois la réponse cliquée (pointerdown), le joueur répète la réponse
                const playerResponsdingText = new PIXI.Text({ text: response.text, style: dialogueStyle2 });
                playerResponsdingText.anchor.set(0.5);
                playerResponsdingText.zIndex = 4;
                playerResponsdingText.x = houseSprite.x;
                playerResponsdingText.y = houseSprite.y + (houseSprite.height * 0.3);
                houseContainer.addChild(playerResponsdingText)
                // Supprimer la réponse après un délai
                setTimeout(() => {
                    if (playerResponsdingText) {
                        playerResponsdingText.destroy();
                        menuContainer.removeChild(menuCoverDialogueOverlay);
                    }
                    resolve();
                }, 2000);
                });

                // 2eme promesse
                await new Promise((resolve) => {
                // On masque les réponses avec un overlay
                menuContainer.addChild(menuCoverDialogueOverlay);
                // Configuration et ajouts des réponses que va répondre Guybrush
                const guybrushResponseText = new PIXI.Text({ text: response.guybrushResponse, style: dialogueStyle });
                guybrushResponseText.anchor.set(0.5);
                guybrushResponseText.zIndex = 4;
                guybrushResponseText.x = guybrushSO.x;
                guybrushResponseText.y = guybrushSO.y - guybrushSO.height;
                houseContainer.addChild(guybrushResponseText)
                spriteSwap(innerHouseContainer, guybrushSO, guybrushSOT);
                guybrushSOT.x = guybrushSO.x + (innerHouseSprite.width * 0.022);
                guybrushSOT.y = guybrushSO.y;

                // Supprimer la réponse après un délai
                setTimeout(() => {
                    if (guybrushResponseText) {
                        guybrushResponseText.destroy();
                        // et l'animation
                        spriteSwap(innerHouseContainer, guybrushSOT, guybrushSO);
                        // Et bien sûr l'Overlay
                        menuContainer.removeChild(menuCoverDialogueOverlay); 
                    } 
                    resolve();
                }, 3000);
            });


                // Si la réponse du JOUEUR a une propriété "exit: true", réinitialiser les réponses et quitter
                if (response.exit) {
                    // Si la toile a déjà été déroulée
                    // à Décommenter !!!!
                    if (response.rerollScreen === true && unrolled === true) {
                        setTimeout(() => {
                            reroll();  
                        }, 1000);
                        // console.log('ok çaaaa maaaarche');
                    }
                    // Vide le menuContainer du menuCoverDialogue
                    menuContainer.removeChild(menuCoverDialogue);
                    // Rerempli le tableau "playerResponses" par son clone qui n'a pas bougé
                    playerResponses.splice(0, playerResponses.length, ...originalResponses);
                    return; 
                }
                // Si la réponse du JOUEUR n'a pas de propriété "exit: true", on continue la discussion

                if (response.unrollScreen) {
                    unrolled = true;
                    setTimeout(() => {
                        unroll();  
                    }, 1000);
                    // console.log('ok çaaaa maaaarche2');
                }

                // Supprime la réponse cliquée du tableau playerResponses et on retire son affichage
                playerResponses.splice(index, 1);
                // Décale les autres éléments vers le haut
                displayResponses(menuCoverDialogue, playerResponses, style, originalResponses);
            });
    }
}


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