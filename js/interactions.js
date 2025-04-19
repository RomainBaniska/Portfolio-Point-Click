export async function interactions(apps, sprites, texts) {

    const { app, blackScreen } = apps;
    const { houseContainer, toileScreenProject1, toileScreenProject2, toileScreenProject3, specialScreenContainer, fondPortrait, fondPortraitMask, lavabo, guybrushClone, guybrushD, interrupteur, screenBackgroundContainer, boutdemetal, menuItemMetalStrip, boutdemetalShine, houseSprite, innerHouseSprite, waterpouring, guybrush, guybrushWR, guybrushWL, guybrushLD, guybrushGU, guybrushSO, guybrushSOT, gamingChairAR, guybrushIUL, guybrushIUR, ordi, ordiRun, toilePoulie, toilePoulieRun, toilePoulieReverse, menuContainer, menuCoverDialogue, menuCoverDialogueOverlay, menuButton, menuButton2, menuButton3, menuButton4, menuButton5, menuButton6, menuButton7, menuButton8, menuButton9, glasswater, menuItemTabletPack, menuItemGlassWater, menuItemGlassWaterEmpty, menuItemGlassWaterEmptySelected, goldkey, menuItemGoldKey, menuItemGoldKeySelected, table, tableOpen, toileScreen, playVideo, playVideoActive, playVideospriteAsset, playVideoframes, stopVideo, stopVideoActive, stopVideospriteAsset, stopVideoframes, nextVideo, nextVideoActive, nextVideoframes, nextVideospriteAsset, prevVideo, prevVideoActive, prevVideoframes, prevVideospriteAsset,exitVideo, exitVideoActive, exitVideospriteAsset, exitVideoframes, innerHouseContainer, /*musicthemePLAY*/ } = sprites;
    const { wakeUpText, wakeUpText2, wakeUpText3, wakeUpResponses, responseStyle, startDialogue, dialogueStyleLong, dialogueStyle, dialogueStyle2, titleStyle } = texts;
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    // Vidéos de la toile
    const videoList = [
        "../videos/TimeOut/PART1-LOGIN.mp4",
        "../videos/TimeOut/PART2-DASHBOARD&EVENT.mp4",
        "../videos/TimeOut/PART2-EVENTTCHATRESPONSE.mp4",
        "../videos/TimeOut/PART3-TAGS.mp4.mp4",
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
            app.stage.emit('rightdown');
            PIXI.sound.play('pickup');
            innerHouseContainer.removeChild(glasswater);
            glasswater.destroy();
            menuContainer.addChild(menuItemGlassWater);
        }
    });

    // Prendre le bout de métal tombé
    boutdemetalShine.on('click', () => {
        if (menuButton4.isActive) {
            app.stage.emit('rightdown');
            PIXI.sound.play('pickup');
            innerHouseContainer.removeChild(boutdemetalShine);
            boutdemetalShine.destroy();
            menuContainer.addChild(menuItemMetalStrip);
        }
    });

    // Prendre la clé en or
    goldkey.on('click', () => {
        if (menuButton4.isActive) {
            app.stage.emit('rightdown');
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
            app.stage.emit('rightdown');
            PIXI.sound.play('drawerOpen');
            table.texture = tableOpen.texture;
            isTableOpenned = true;

            menuContainer.addChild(menuItemTabletPack);
        }
    }
    })

    table.on('click', () => {
        if (isTableOpenned === true ) {
        if (menuButton3.isActive) {
            PIXI.sound.play('drawerClose');
            app.stage.emit('rightdown');
            if (isTableOpenned === true) {
            table.texture = defaultTexture;
            isTableOpenned = false;
            innerHouseContainer.addChild(boutdemetal);

            if (!boutdemetal.visible) {
                boutdemetal.visible = true;
                boutdemetal.loop = false;
                
                boutdemetal.play();

                setTimeout(() => {
                innerHouseContainer.removeChild(boutdemetal);
                innerHouseContainer.addChild(boutdemetalShine);
                boutdemetalShine.visible = true;
                boutdemetalShine.play();
                }, 3000);
            }
        }
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
                                        // setPosition(guybrush, 0.48, 0.66); // On ajuste un peu à droite pour pas changer l'ancrage du sprite
                                        setPosition(guybrush, 0.48, 0.66); // On ajuste un peu à droite pour pas changer l'ancrage du sprite
                                        spriteSwap(innerHouseContainer, guybrushWL, guybrush); 
                    
                                        // Texte 1
                                        textFollowSprite(guybrush, wakeUpText);
                                        await skipDialogue(houseContainer, guybrush, wakeUpText, 4000);

                                        // Texte 2
                                        textFollowSprite(guybrush, wakeUpText2);
                                        await skipDialogue(houseContainer, guybrush, wakeUpText2, 4000);

                                        // Texte 3
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
                                        textFollowSprite(guybrushSO, wakeUpText, dialogueStyle);  
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
                                            }
                                        };
                                    };
                                }
                                    });
                                    


   
    // Si on veut relancer le dialogue avec Romain après l'intro
    guybrushSO.on('click', () => {
        if (menuButton6.isActive) {
            spriteSwap(innerHouseContainer, guybrushSO, guybrushSOT);
            app.stage.emit('rightdown');
            guybrushSOT.play();
            guybrushSOT.x = guybrushSO.x + (innerHouseSprite.width * 0.022);
            guybrushSOT.y = guybrushSO.y;
            // On enclenche le dialogue ("Oui ?")
            textFollowSprite(guybrushSOT, startDialogue); 
            menuContainer.addChild(menuCoverDialogue);
            
            initResponses(menuCoverDialogue, wakeUpResponses, responseStyle);
            
            setTimeout(() => {
                spriteSwap(innerHouseContainer, guybrushSOT, guybrushSO);
                innerHouseContainer.removeChild(startDialogue); 
            }, 2000);
        }  
    });

    unroll();
    // Lorsqu'on regarde la toile de home cinema, on active le toileScreen pour voir le portfolio
    toilePoulieRun.on('click', async () => {
        // Quand on clique sur la toile
        if (menuButton5.isActive) {
            screenBackgroundContainer.addChild(toileScreen);

            // Ajout d'un sprite de présentation de "GetTogether"
            const introSlide = new PIXI.Graphics()
            .fill({ color: 0xFAF9F6 })
            .rect(0, 0, toileScreen.width, toileScreen.height, 20);
            introSlide.endFill();
            introSlide.zIndex = 15;
            introSlide.x = toileScreen.x;
            introSlide.y = toileScreen.y;
            introSlide.height = toileScreen.width * 9 / 16 + "px";
            introSlide.width = toileScreen.width * 0.8 + "px";
            const getTogetherTitle = new PIXI.Text({ text: "GetTogether : une extension de TimeOut", style: titleStyle });
            const rebatiereTitle = new PIXI.Text({ text: "La Rebatière : une application de réservation pour maison d'hôte", style: titleStyle });
            const jsigneTitle = new PIXI.Text({ text: "Jsigné : un SoWeSign fait maison", style: titleStyle });
             // Mini fonction titres
             function projectTitle(title) {
                title.zIndex = 16;
                title.x = toileScreen.x + (toileScreen.width / 2);
                title.y = toileScreen.y + (toileScreen.height / 2);
                title.anchor.set(0.5);
            }
            projectTitle(getTogetherTitle);
            projectTitle(rebatiereTitle);
            projectTitle(jsigneTitle);
            // screenBackgroundContainer.addChild(introSlide);
            // screenBackgroundContainer.addChild(getTogetherTitle);

            // Positionnement de la bulle info avec le portrait de Romain (fondPortrait & fondPortraitMask)            
            // Positionner le cercle en haut à gauche de l'écran
            fondPortrait.x = toileScreen.x + (toileScreen.width * 0.12);
            fondPortrait.y = toileScreen.y + (toileScreen.height * 0.1);
            fondPortrait.zIndex = 11;
            // Idem pour le masque
            fondPortraitMask.x = toileScreen.x + (toileScreen.width * 0.12);
            fondPortraitMask.y = toileScreen.y + (toileScreen.height * 0.1);
            fondPortraitMask.zIndex = 11;
            screenBackgroundContainer.addChild(fondPortraitMask);

            /////// On invoque Romain qui parle dans une bulle ///////
            guybrushClone.x = fondPortrait.x;
            guybrushClone.y = fondPortrait.y;
            guybrushClone.anchor.set(0.5, 0.2);
            guybrushClone.zIndex = 12;
            guybrushClone.interactive = true;
            guybrushClone.gotoAndPlay(0);
            guybrushClone.on("click", () => {
                guybrushClone.gotoAndStop(0);
            })
            // Ajout du masque à Romain
            guybrushClone.mask = fondPortraitMask;
            screenBackgroundContainer.addChild(guybrushClone);
            // ajout du portrait
            screenBackgroundContainer.addChild(fondPortrait);
            ///////////////////////////////////////////////////////////

            // Mini fonction bulles
            function bulleText(bulleText) {
                bulleText.zIndex = 12;
                bulleText.x = toileScreen.x + (toileScreen.width * 0.53);
                bulleText.y = toileScreen.y + (toileScreen.height * 0.05);
                bulleText.anchor.set(0.5, 0);
            }
            // Bulles Romain Toile
            const bulleText1 = new PIXI.Text({ text: "Bravo tu as réussi à aller jusqu'ici, là où beaucoup ont échoué", style: dialogueStyleLong });
            const bulleText2 = new PIXI.Text({ text: "Si tu es arrivé jusqu'ici c'est que tu as envie d'en savoir un peu plus sur moi ?", style: dialogueStyleLong });
            const bulleText3 = new PIXI.Text({ text: "Je vais te montrer en image quelqu'uns des projets sur lesquels j'ai travaillé", style: dialogueStyleLong });
            const bulleText4 = new PIXI.Text({ text: "Choisis l'un des projets dont tu veux que je te parle", style: dialogueStyleLong });
            bulleText(bulleText1);
            bulleText(bulleText2);
            bulleText(bulleText3);
            bulleText(bulleText4);
            // Ajout des bulles avec chrono
            screenBackgroundContainer.addChild(bulleText1);
            setTimeout(() => {
                screenBackgroundContainer.removeChild(bulleText1);
                screenBackgroundContainer.addChild(bulleText2);
                setTimeout(() => {
                    screenBackgroundContainer.removeChild(bulleText2);
                    screenBackgroundContainer.addChild(bulleText3);
                    setTimeout(() => {
                        screenBackgroundContainer.removeChild(bulleText3);
                        screenBackgroundContainer.addChild(bulleText4);
                        setTimeout(() => {
                            screenBackgroundContainer.removeChild(bulleText4);
                            guybrushClone.gotoAndStop(0);
                        }, 4000);
                    }, 4000);
                }, 4000);
            }, 4000);

        // Positionnement des Sprites Projets Videos
        // taille d'espacement entre les sprites
        const totalSpacing = toileScreen.width * 0.1;

        // On définit l'ancrage de chaque sprite à 0.5 pour les centrer
        toileScreenProject1.anchor.set(0.5);
        toileScreenProject2.anchor.set(0.5);
        toileScreenProject3.anchor.set(0.5);

        // On ajuste la position de tous les projets avec pour point de départ le centre de la toile
        toileScreenProject2.x = toileScreen.x + (toileScreen.width * 0.5);
        toileScreenProject1.x = toileScreenProject2.x - toileScreenProject2.width - totalSpacing;
        toileScreenProject3.x = toileScreenProject2.x + toileScreenProject2.width + totalSpacing;
        const yCenter = toileScreen.y + (toileScreen.height * 0.5);
        toileScreenProject1.y = yCenter;
        toileScreenProject2.y = yCenter;
        toileScreenProject3.y = yCenter;

        screenBackgroundContainer.addChild(toileScreenProject1);
        screenBackgroundContainer.addChild(toileScreenProject2);
        screenBackgroundContainer.addChild(toileScreenProject3);


        //////////////////////////////////////
        /// MOUVEMENT TOILESCREENPROJECT 1 ///
        // On crée une petite animation lors de la sélection du projet
        toileScreenProject1.addEventListener("click", () => {
            // On invisibilise les projets non sélectionnés
            toileScreenProject1.interactive = false;
            toileScreenProject2.visible = false;
            toileScreenProject3.visible = false;

            let targetX = toileScreen.x + (toileScreen.width / 2);

            // Premier Ticker qui fait glisser le screenProject1 vers la droite 
            let localTicker = new PIXI.Ticker();
            localTicker.add(() => {
                if (toileScreenProject1.x <= targetX) {
                    toileScreenProject1.x += 6;
                } else {
                    localTicker.stop();
                    console.log("fini!");

                    // Deuxième Ticker qui agrandit screenProject1
                    let scaleTicker = new PIXI.Ticker();
                    scaleTicker.add(() => {
                        if (toileScreenProject1.scale.x < 4.5) { 
                            toileScreenProject1.scale.x += 0.1; 
                            toileScreenProject1.scale.y += 0.1; 
                        } else {
                            scaleTicker.stop(); 
                            console.log("Agrandissement terminé !");
                        }
                    });
                    scaleTicker.start(); // Démarre le ticker d'agrandissement
                }
            });
            localTicker.start(); // Démarre le ticker de déplacement
        });

        /// MOUVEMENT TOILESCREENPROJECT3 ///
        toileScreenProject3.addEventListener("click", () => {
            // On invisibilise les projets non sélectionnés
            toileScreenProject3.interactive = false;
            toileScreenProject1.visible = false;
            toileScreenProject2.visible = false;
        
            let targetX = toileScreen.x + (toileScreen.width / 2);
        
            // Premier Ticker qui fait glisser le screenProject3 vers la gauche
            let localTicker = new PIXI.Ticker();
            localTicker.add(() => {
                if (toileScreenProject3.x >= targetX) {
                    toileScreenProject3.x -= 6;
                } else {
                    localTicker.stop();
                    console.log("fini!");
        
                    // Deuxième Ticker qui agrandit screenProject3
                    let scaleTicker = new PIXI.Ticker();
                    scaleTicker.add(() => {
                        if (toileScreenProject3.scale.x < 4.5) {
                            toileScreenProject3.scale.x += 0.1;
                            toileScreenProject3.scale.y += 0.1;
                        } else {
                            scaleTicker.stop();
                            console.log("Agrandissement terminé !");
                        }
                    });
                    scaleTicker.start();
                }
            });
            localTicker.start();
        });

        /// MOUVEMENT TOILESCREENPROJECT2
        toileScreenProject2.addEventListener("click", () => {
            // On invisibilise les projets non sélectionnés
            toileScreenProject2.interactive = false;
            toileScreenProject1.visible = false;
            toileScreenProject3.visible = false;
        
            // Ticker qui agrandit screenProject2
            let scaleTicker = new PIXI.Ticker();
            scaleTicker.add(() => {
                if (toileScreenProject2.scale.x < 4.5) {
                    toileScreenProject2.scale.x += 0.1;
                    toileScreenProject2.scale.y += 0.1;
                } else {
                    scaleTicker.stop();
                    console.log("Agrandissement terminé !");
                }
            });
            scaleTicker.start();
        });
        //////////////////////////////////////
        
        

                                    // selectAProject.addEventListener("click", () => {
                                    guybrushClone.addEventListener("click", () => {
                            
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
                                    video.style.width = "100%";
                                    video.style.height = "auto";
                                    video.style.maxHeight = toileScreen.width * 9 / 16 + "px";
                                    video.style.maxWidth = toileScreen.width * 0.8 + "px";

                                    // Ajout de la video au DOM
                                    document.body.appendChild(video);
                            
                                    // Ajout de playVideo au conteneur des boutons
                                    screenBackgroundContainer.addChild(stopVideo);

                                    // Resetting de playvideo et stopvideo (changer plus tard loadsprite et resizehandler)
                                    playVideo.x = toileScreen.x + (toileScreen.width * 0.5);
                                    playVideo.y = toileScreen.y + (toileScreen.height * 0.9);
                                    playVideo.anchor.set(0.5);
                                    stopVideo.x = toileScreen.x + (toileScreen.width * 0.5);
                                    stopVideo.y = toileScreen.y + (toileScreen.height * 0.9);
                                    stopVideo.anchor.set(0.5);
                                    prevVideo.x = toileScreen.x + (toileScreen.width * 0.4);
                                    prevVideo.y = toileScreen.y + (toileScreen.height * 0.9);
                                    prevVideo.anchor.set(0.5);
                                    nextVideo.x = toileScreen.x + (toileScreen.width * 0.6);
                                    nextVideo.y = toileScreen.y + (toileScreen.height * 0.9);
                                    nextVideo.anchor.set(0.5);


                                    // Ajout de nextVideo et prevVideo
                                    screenBackgroundContainer.addChild(prevVideo);
                                    screenBackgroundContainer.addChild(nextVideo);
                                    // Ajout de exitVideo
                                    screenBackgroundContainer.addChild(exitVideo);

                                    // Gestion des événements Play
                                    playVideo.on('pointerover', () => {
                                        playVideo.texture = playVideoActive.texture;
                                    });

                                    playVideo.on('pointerout', () => {
                                        playVideo.texture = playVideospriteAsset.textures[playVideoframes[0]];
                                    });

                                    playVideo.on('click', () => {
                                        video.play();
                                        screenBackgroundContainer.removeChild(playVideo);
                                        screenBackgroundContainer.addChild(stopVideo);
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
                                        screenBackgroundContainer.removeChild(stopVideo);
                                        screenBackgroundContainer.addChild(playVideo);
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
                                        screenBackgroundContainer.removeChild(playVideo);
                                        screenBackgroundContainer.removeChild(stopVideo);
                                        screenBackgroundContainer.removeChild(prevVideo);
                                        screenBackgroundContainer.removeChild(nextVideo);
                                        exitVideo.texture = exitVideospriteAsset.textures[exitVideoframes[0]];
                                        screenBackgroundContainer.removeChild(exitVideo);
                                        screenBackgroundContainer.removeChild(toileScreen);
                                        screenBackgroundContainer.removeChild(fondPortrait);
                                        screenBackgroundContainer.removeChild(fondPortraitMask);
                                        screenBackgroundContainer.removeChild(guybrush);
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
                                        screenBackgroundContainer.removeChild(playVideo);
                                        screenBackgroundContainer.removeChild(stopVideo);
                                        screenBackgroundContainer.removeChild(prevVideo);
                                        screenBackgroundContainer.removeChild(nextVideo);
                                        screenBackgroundContainer.removeChild(exitVideo);
                                        reroll();
                                    });
                                });
        }
    });

    ordiRun.on('click', async () => {
        // Quand on "utiliser" l'ordi allumé
        if (menuButton7.isActive) {
            app.stage.addChild(specialScreenContainer);
        }
});


    // Remplir le verre d'eau
    lavabo.on('click', () => {
        console.log(menuItemGlassWaterEmpty.isActive);
        if (menuButton7.isActive && menuItemGlassWaterEmpty.isActive) {
            spriteSwap(menuContainer, menuItemGlassWaterEmpty, menuItemGlassWater);
            app.stage.emit('rightdown');
        }
    });
        
    // Donner le verre d'eau à Romain
    guybrushSO.on('click', () => {
    if (menuButton.isActive && menuItemGlassWater.isActive) {
        spriteSwap(innerHouseContainer, guybrushSO, guybrushD);
    }
});

    // Ationner l'interrupteur
    interrupteur.on('click', () => {
        if (menuButton7.isActive || menuButton8.isActive) {
            interrupteur.play();
            interrupteur.gotoAndStop(1); 
            app.stage.emit('rightdown');
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
        // toilePoulie.interactive = true;
}


// METHODE POUR REENROULER L'ECRAN DE PROJECTION
function reroll() {
    innerHouseContainer.removeChild(toilePoulieRun);
    innerHouseContainer.addChild(toilePoulieReverse);
    PIXI.sound.play('unroll'); 
    // console.log('son JOUE');
    toilePoulieReverse.animationSpeed = 0.035;
    toilePoulieReverse.gotoAndPlay(0);
    toilePoulieReverse.loop = false;
    toilePoulieReverse.eventMode = "none";
    
    setTimeout(() => {
        innerHouseContainer.removeChild(toilePoulieReverse)
        innerHouseContainer.addChild(toilePoulie); 
        // toilePoulieRun.eventMode = "none";
        toilePoulie.eventMode = "none";
        // toilePoulieReverse.eventMode = "none";
    }, 3000);
 

}

/////////////////////////////// MISC METHODS ///////////////////////////////

// METHODE POUR POSITIONNER UN SPRITE
 function setPosition(sprite, xPos, yPos) {
    sprite.x = innerHouseSprite.width * xPos;
    sprite.y = innerHouseSprite.height * yPos;
}

// METHODE POUR CHANGER DE SPRITE
function spriteSwap(innerHouseContainer, sprite1, sprite2) {
    innerHouseContainer.removeChild(sprite1);
    innerHouseContainer.addChild(sprite2);
}

// METHODE QUI GERE LE DIALOGUE AVEC ROMAIN
function initResponses(menuCoverDialogue, playerResponses, style) {
    // Effectuer une copie profonde du TABLEAU D'OBJETS des réponses de Romain (wakeUpResponses)
    const originalResponses = structuredClone(playerResponses);

    // à ce stade, originalResponses est BIEN le clone de playerResponses, si on essaye de changer la valeur de playerresponse ça reste la même
    // Appeler la méthode permettant d'afficher les réponses du joueur
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
                playerResponsdingText.x = houseContainer.width / 2; 
                playerResponsdingText.y = houseContainer.height * 0.3;
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
                guybrushResponseText.x = guybrushSO.x + (guybrushSO.width / 2);
                guybrushResponseText.y = guybrushSO.y - guybrushSO.height;
                // houseContainer.addChild(guybrushResponseText);
                innerHouseContainer.addChild(guybrushResponseText);
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
                }

                // Supprime la réponse cliquée du tableau playerResponses et on retire son affichage
                playerResponses.splice(index, 1);
                // Décale les autres éléments vers le haut
                displayResponses(menuCoverDialogue, playerResponses, style, originalResponses);
            });
    }
}



// METHODE POUR QUE LE TEXTE FOLLOW LE SPRITE
function textFollowSprite(sprite, textObject) {
    textObject.anchor.set(0.5);
    textObject.x = innerHouseContainer.x + (innerHouseContainer.width - sprite.width) / 2;
    textObject.x = sprite.x + (sprite.width / 2);
    textObject.y = sprite.y - sprite.height;
    textObject.zIndex = 4;
    innerHouseContainer.addChild(textObject);
    return textObject;
}

// METHODE POUR SKIPPER UNE LIGNE DE DIALOGUE
function skipDialogue(container, textParent, textObject, duration) {
    return new Promise((resolve) => {
        let clicked = false;
        container.interactive = true;

        function onClick() {
            if (!clicked) {
                clicked = true;
                innerHouseContainer.removeChild(textObject);
                container.interactive = false;
                container.removeEventListener('click', onClick);
                resolve();
            }
        }
        container.addEventListener('click', onClick);
        setTimeout(() => {
            if (!clicked) {
                innerHouseContainer.removeChild(textObject);
                container.interactive = false;
                container.removeEventListener('click', onClick);
                resolve();
            }
        }, duration);
    });
}
}