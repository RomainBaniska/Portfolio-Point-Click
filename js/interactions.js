export async function interactions(apps, sprites, texts) {

    const { app, blackScreen } = apps;
    const { houseContainer, crosshair, metroTicket, rails, ordiRed, areusure, bed, door, terminal, terminalbgSprite, achievement, greenled, yellowled, terminalPS, pendingLogo, chestZoom, disquette, disquetteFloat, menuItemDisquette, poster, menuItemMetroTicket, guybrushF, guybrushP, toilePoulie416, menuItemGlassCoffe, swPannel, guybrushSOTIRED, guybrushSODISGUSTED, guybrushSOSLEEPY, chest, coffeMachineCutsceneContainer, coffeMachineCutsceneBG, coffeMachineClone, innerHouseAsset, toileScreenProject1, toileScreenProject2, trash, toileScreenProject3, specialScreenContainer, fondPortrait, fondPortraitMask, lavabo, guybrushClone, guybrushD, interrupteur, logoPHP, logoHTML, logoCSS, logoJS, logoMongo, logoMySQL, logoSymfony, screenBackgroundContainer, boutdemetal, menuItemMetalStrip, boutdemetalShine, houseSprite, innerHouseSprite, waterpouring, guybrush, guybrushWR, guybrushWL, guybrushLD, guybrushGU, guybrushSO, guybrushSOT, gamingChairAR, guybrushIUL, guybrushIUR, ordi, ordiRun, toilePoulie, toilePoulieRun, toilePoulieReverse, menuContainer, menuCoverDialogue, menuCoverDialogueOverlay, menuButton, menuButton2, menuButton3, menuButton4, menuButton5, menuButton6, menuButton7, menuButton8, menuButton9, glasswater, menuItemTabletPack, menuItemTabletPackSelected, menuItemGlassWater, menuItemGlassWaterEmpty, menuItemGlassWaterEmptySelected, goldkey, menuItemGoldKey, menuItemGoldKeySelected, table, tableOpen, toileScreen, playVideo, playVideoActive, playVideospriteAsset, playVideoframes, stopVideo, stopVideoActive, stopVideospriteAsset, stopVideoframes, nextVideo, nextVideoActive, nextVideoframes, nextVideospriteAsset, prevVideo, prevVideoActive, prevVideoframes, prevVideospriteAsset, exitVideo, exitVideoActive, exitVideospriteAsset, exitVideoframes, returnVideo, returnVideoActive, returnVideospriteAsset, returnVideoframes, innerHouseContainer, coffeMachine, menuItemCoffePod, music, questionMark } = sprites;
    const { failText, failText2, failText3, failText4, failText5, sickText, sickText2, wakeUpText, wakeUpText2, wakeUpText3, wakeUpText4, wakeUpText5, coffeText, coffeText4, coffeText2, coffeText3, wakeUpResponses, responseStyle, startDialogue, dialogueStyleLong, dialogueStyle, dialogueStyle2, titleStyle, titleStyle2 } = texts;
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    // Vidéos de la toile
    const videoList = [
        "../videos/TimeOut/PART1-LOGIN2.mp4",
        "../videos/TimeOut/PART2-DASHBOARD&EVENT.mp4",
        "../videos/TimeOut/PART2-EVENTTCHATRESPONSE.mp4",
        "../videos/TimeOut/PART3-TAGS.mp4",
    ];

    const videoList2 = [
        "../videos/Rebatiere/PART1-LOGINSIGNUP.mp4",
        "../videos/Rebatiere/PART2-RESERVATION.mp4",
        "../videos/Rebatiere/PART2-RESERVATION&DELETE&PROFILE.mp4",
        "../videos/Rebatiere/PART3-CONTRAINTES.mp4",
        "../videos/Rebatiere/PART4-PISCINE&ADMIN.mp4",
    ];
    // Index en cours de la video (initialisation)
    let currentVideoIndex = 0;
    // table de nuit verrouillée par défaut
    let tableLocked = true;
    // Guybrush sur ordi réagit si on touche à l'ordi ou au displate, 
    let guybrushReactive = false;

    // Fonction wait utile
    function wait(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // FILTRE - Pixelisation (transition)
    function pixelisation() {
        const pixelate = new PIXI.filters.PixelateFilter([0, 0]);
        screenBackgroundContainer.filters = [pixelate];
        // Transition avec un filtre de Pixelisation
        const pixelateTicker = new PIXI.Ticker();
        pixelateTicker.add(() => {
            let done = true;

            if (pixelate.size[0] < 20) {
                pixelate.size[0] += 0.9;
                done = false;
            }
        
            if (pixelate.size[1] < 20) {
                pixelate.size[1] += 0.9;
                done = false;
            }
        
            if (done) pixelateTicker.stop();
        });
        pixelateTicker.start();
    }

    function dePixelisation() {
    const pixelate = new PIXI.filters.PixelateFilter([20, 20]);
    screenBackgroundContainer.filters = [pixelate];
    // Transition vers la toile avec un filtre dépixelisation
    const dePixelateTicker = new PIXI.Ticker();
    dePixelateTicker.add(() => {
        let done = true;

        if (pixelate.size[0] > 0) {
            pixelate.size[0] -= 0.9;
            done = false;
        }

        if (pixelate.size[1] > 0) {
            pixelate.size[1] -= 0.9;
            done = false;
        }

        if (done) {
            dePixelateTicker.stop();
            screenBackgroundContainer.filters = null;
        }
    });
    dePixelateTicker.start();
    }

    async function transitionPixelisation () {
        pixelisation();
        await new Promise(resolve => setTimeout(resolve, 300));
        dePixelisation();
    }

    // Petite fonction pour ajouter du texte du player lors d'actions 
    function playerNewText(text, textcontent, time = 2000) {
        text = new PIXI.Text({ text: textcontent, style: dialogueStyle2 });
        text.anchor.set(0.5);
        text.x = houseContainer.width / 2 ;
        text.y = houseContainer.y + (houseContainer.height * 0.3);
            houseContainer.addChild(text);
            setTimeout(() => {
                houseContainer.removeChild(text);
                text.destroy();
            }, time);
    }    

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

    // let coffePicked = false;
    // Prendre la capsule de café
    let interactionCoffePicked = false;
    trash.on('click', () => {
        if (menuButton4.isActive) {
            if (!interactionCoffePicked) {
            app.stage.emit('rightdown');
            PIXI.sound.play('pickup');
            menuContainer.addChild(menuItemCoffePod);
            interactionCoffePicked = true;
        }
        }
    });

    // Prendre le ticket de métro
    metroTicket.on('click', () => {
        if (menuButton4.isActive) {
            app.stage.emit('rightdown');
            PIXI.sound.play('pickup');
            menuContainer.addChild(menuItemMetroTicket);
            innerHouseContainer.removeChild(metroTicket);
        }
    })


    // Ouvrir le panneau-displate
    swPannel.on('click', async () => {
        if (menuButton7.isActive && menuItemMetalStrip.isActive) {

            menuContainer.addChild(menuCoverDialogueOverlay);
            app.stage.emit('rightdown');

            await wait(4000);
            PIXI.sound.play('unscrew');

            await wait(6000);
            PIXI.sound.play('openPannel');
            swPannel.gotoAndStop(1);

            await wait(1000);
            let successPannel;
            playerNewText(successPannel, "Eh beh ça valait le coup d'insister !", 3000);

            await wait(3000);
            playerNewText(successPannel, "Un étrange dispositif est incrusté dans le mur", 3000);
            menuContainer.removeChild(menuItemMetalStrip);
            menuItemMetalStrip.destroy();
            swPannel.interactive = false;

            await wait(3000);
            menuContainer.removeChild(menuCoverDialogueOverlay);
            swPannel.eventMode = "none";
        }
    });

    // innerHouseContainer.removeChild(swPannel);
    // Utiliser le ticket de métro sur la borne de métro
    poster.on('click', async () => {
        if (menuButton7.isActive && menuItemMetroTicket.isActive) {

            menuContainer.addChild(menuCoverDialogueOverlay);
            app.stage.emit('rightdown');
            PIXI.sound.play('ratp');

            // Détruit l'item
            menuItemMetroTicket.destroy();
            
            // ajout des textures innerhouseasset5 ou 6 en fonction de si on a ouvert l'oeil de boeuf
            await wait(1500);
            if (!interrupteurSwitched) {
            const innerHouseAsset5 = await PIXI.Assets.load('../sprites/darkwithtrapopentrimed.png');
            const opennedTrapDark = new PIXI.Sprite(innerHouseAsset5);
            innerHouseSprite.texture = opennedTrapDark.texture;
            // ajout de la bordure pour que le coffre passe pas devant
            const darkbordersAsset = await PIXI.Assets.load('../sprites/darktrapborders.png');
            const darkborders = new PIXI.Sprite(darkbordersAsset);
            darkborders.width = innerHouseSprite.width;
            darkborders.height = innerHouseSprite.height;
            darkborders.x = innerHouseSprite.x;
            darkborders.y = innerHouseSprite.y;
            darkborders.interactive = false;
            darkborders.eventMode = "none";
            innerHouseContainer.addChild(darkborders);
            darkborders.zIndex = 5; // chest est à 3

            // on désactive l'interrupteur par sécurité
            interrupteur.interactive = false;
            } else {
            PIXI.sound.play('trapopen');
            const innerHouseAsset6 = await PIXI.Assets.load('../sprites/clearwithtrapopentrimed.png');
            const opennedTrapClear = new PIXI.Sprite(innerHouseAsset6);
            innerHouseSprite.texture = opennedTrapClear.texture;
            const clearbordersAsset = await PIXI.Assets.load('../sprites/cleartrapborders.png');
            const clearborders = new PIXI.Sprite(clearbordersAsset);
            clearborders.width = innerHouseSprite.width;
            clearborders.height = innerHouseSprite.height;
            clearborders.x = innerHouseSprite.x;
            clearborders.y = innerHouseSprite.y;
            clearborders.interactive = false;
            clearborders.eventMode = "none";
            innerHouseContainer.addChild(clearborders);
            clearborders.zIndex = 5; // chest est à 3
            }

            await wait(1000);
            innerHouseContainer.addChild(rails);
            await wait(1000);
            rails.gotoAndStop(1);
            chest.y -= innerHouseSprite.height * 0.005;
            await wait(1000);
            PIXI.sound.play('rail');

            // avance vers la droite
            const stopPositionX = innerHouseSprite.x + innerHouseSprite.width * 0.59;
            const speed = 1;

            await new Promise((resolve) => {
                const transportLargeurTicker = new PIXI.Ticker();
                transportLargeurTicker.add(() => {
                    chest.x += speed;
                    if (chest.x >= stopPositionX) {
                        chest.x = stopPositionX;
                        transportLargeurTicker.stop();

                        // On change l'ancrage en bas à gauche pour s'assurer que la rotation se fasse correctement 
                        chest.anchor.set(0, 1);
                        chest.y += chest.height;
                        chest.zIndex = 2;
                        resolve();
                    }
                });
                transportLargeurTicker.start();
            });

            // rotation de 85° avant de tomber 
            const targetRotation = (85 * Math.PI) / 180;
            const speedRotation = 0.1;

            await new Promise((resolve) => {
                const transportRotationTicker = new PIXI.Ticker();
                transportRotationTicker.add(() => {
                    if (chest.rotation < targetRotation) {
                        chest.rotation += speedRotation;
                        if (chest.rotation > targetRotation) {
                            chest.rotation = targetRotation;
                            transportRotationTicker.stop();
                            resolve();
                        }
            }
            });
        transportRotationTicker.start();
                    });


            // tombe en piqué
            const stopPositionYFall = innerHouseSprite.y + innerHouseSprite.height * 0.83;
            const startPositionYFall = chest.y;
            const halfWayY = startPositionYFall + (stopPositionYFall - startPositionYFall) * 0.3;
            const speedFall = 20;
            let tintApplied = false;

            await new Promise((resolve) => {
                const transportFallTicker = new PIXI.Ticker();
                transportFallTicker.add(() => {
                    chest.y += speedFall;

                    if (!tintApplied && chest.y >= halfWayY) {
                        // Retrait de la teinte
                        chest.tint = 0xFFFFFF;
                        tintApplied = true;
                    }

                    if (chest.y >= stopPositionYFall) {
                        chest.y = stopPositionYFall;
                        transportFallTicker.stop();
                        PIXI.sound.play('metalimpact');
                        resolve();
                    }
                });

                transportFallTicker.start();
            });

            await wait(500);
            chest.anchor.set(1, 1);
            chest.y += chest.height;

            // se redresse avec rotation
            const targetRotationBack = ((-1) * Math.PI) / 180;
            const speedRotationBack = 0.5;

            await new Promise((resolve) => {
                const transportBackTicker = new PIXI.Ticker();
                transportBackTicker.add(() => {
                    if (chest.rotation > targetRotationBack) {
                        chest.rotation -= speedRotationBack;
                        if (chest.rotation <= targetRotationBack) {
                            chest.rotation = targetRotationBack;
                            transportBackTicker.stop();
                            shakeContainer(screenBackgroundContainer);
                            resolve();
                        }
            }
            });
            transportBackTicker.start();
                    });

            // retrait des rails
            await wait(1500);
            rails.gotoAndStop(0);
            await wait(1000);
            innerHouseContainer.removeChild(rails);
            rails.destroy();

            // Création d'un masque pour la disquette
            const disquetteMask = new PIXI.Graphics();
            disquetteMask.fill(0xffffff);
            disquetteMask.rect(0, -chest.height * 2.03, chest.width, chest.height * 2);
            disquetteMask.position.set(disquette.x, disquette.y);
            disquetteMask.endFill();
            disquetteMask.interactive = false;
            disquetteMask.eventMode = "none";
            innerHouseContainer.addChild(disquetteMask);

            // Génération de la disquette
            disquette.mask = disquetteMask;
            innerHouseContainer.addChild(disquette);
             // la disquette s'envole
             const stopPositionYRise = innerHouseSprite.y + innerHouseSprite.height * 0.76;
             const speedRise = 1;
 
            await new Promise((resolve) => {
                 const transportRiseTicker = new PIXI.Ticker();
                 transportRiseTicker.add(() => {
                     disquette.y -= speedRise;
                     if (disquette.y <= stopPositionYRise) {
                        disquette.y = stopPositionYRise;
                         transportRiseTicker.stop();
                         // On invisibilise la disquette à la fin de l'anim pour la remplacer par disquette qui flotte
                        //  disquette.visible = false;
                         disquette.alpha = 0;
                         disquetteFloat.y = disquette.y;
                         innerHouseContainer.addChild(disquetteFloat);
                         resolve();
                     }
                 });
                 
                 transportRiseTicker.start();
             });

            await wait(2000);
            chest.interactive = false;
            // disquette.mask = null;
            // disquetteMask.destroy();
            menuContainer.removeChild(menuCoverDialogueOverlay);

            // Rend la disquette ramassable 
            disquette.on("click", async () => {
                if (menuButton4.isActive) {
                    menuContainer.addChild(menuItemDisquette);
                    PIXI.sound.play('pickup');
                    innerHouseContainer.removeChild(disquette);
                    innerHouseContainer.removeChild(disquetteFloat);
                    await wait(500);

                    PIXI.sound.play('almascream');
                    // Création du blood rectangle
                    const bloodRect = new PIXI.Graphics();
                    bloodRect.fill(0x990000);
                    bloodRect.rect(houseSprite.x, houseSprite.y, houseSprite.width, houseSprite.height);
                    bloodRect.endFill();
                    bloodRect.alpha = 0;
                    bloodRect.eventMode = "none";
                    houseContainer.addChild(bloodRect);

                    let increasing = true;
                    let bloodTicker = new PIXI.Ticker();
                    bloodTicker.add(() => {
                        if (increasing) {
                            bloodRect.alpha += 0.05;
                            if (bloodRect.alpha >= 0.4) {
                                increasing = false;
                            }
                        } else {
                            bloodRect.alpha -= 0.05;
                            if (bloodRect.alpha <= 0) {
                                bloodTicker.stop();
                                houseContainer.removeChild(bloodRect);
                                innerHouseContainer.removeChild(ordi);
                                innerHouseContainer.addChild(ordiRed);
                            }
                        }
                    });
                    bloodTicker.start();
                }
            });

            }
        });

    // Utiliser la disquette sur ordiRed
    ordiRed.on('click', async () => {
        if (menuButton7.isActive && menuItemDisquette.isActive) {
            menuContainer.removeChild(menuItemDisquette);

            // Création du rectangle "areusure?" en rouge
            const bloodBGRect = new PIXI.Graphics();
            bloodBGRect.fill(0xf23434);
            bloodBGRect.rect(terminalbgSprite.x, terminalbgSprite.y, terminalbgSprite.width, terminalbgSprite.height);
            bloodBGRect.endFill();
            bloodBGRect.zIndex = 98;

            // Création du logo416 détaché de la toilePoulie
            const only416Asset = await PIXI.Assets.load('../sprites/ELEMENTS/toilepoulie/only416.png');
            const only416 = new PIXI.Sprite(only416Asset);
            only416.zIndex = 9999;
            only416.x = toilePoulie416.x;
            only416.y = toilePoulie416.y;
            only416.width = toilePoulie416.width;
            only416.height = toilePoulie416.height;
            only416.zIndex = 99;

            // On rend transparent tout le terminal
            terminal.alpha = 0;
            terminalbgSprite.alpha = 0;
            greenled.alpha = 0;
            yellowled.alpha = 0;     

            app.stage.emit('rightdown');
            menuItemDisquette.destroy();

            app.stage.addChild(specialScreenContainer);
            specialScreenContainer.addChild(bloodBGRect);
            areusure.gotoAndStop(0);
            specialScreenContainer.addChild(areusure);
            // Glitche toutes les 3 secondes
            const glitchInterval = setInterval(() => {
                areusure.play();
                setTimeout(() => {
                    areusure.gotoAndStop(0);
                }, 200);
            }, 3000);
            
            window.addEventListener('keydown', async (e) => {
                if (e.key === 'o' || e.key === 'O') {
                    console.log('Touche "o" pressée');
                    PIXI.sound.play('input');
                    specialScreenContainer.removeChild(bloodBGRect);
                    specialScreenContainer.removeChild(areusure);
                    // clear le setinterval
                    clearInterval(glitchInterval);

                    await wait(1000);

                    // Puis on lance la cinématique de fin 
                    // Déroule la poulie 416
                    unroll416();

                    await wait(8000);
                    // On recycle le bloodBGRect en le peignant en noir et en le mettant à un alpha de 0
                    bloodBGRect.clear();
                    bloodBGRect.fill(0x000000);
                    bloodBGRect.rect(terminalbgSprite.x, terminalbgSprite.y, terminalbgSprite.width, terminalbgSprite.height);
                    bloodBGRect.endFill();
                    bloodBGRect.alpha = 0;

                    app.stage.addChild(specialScreenContainer);
                    specialScreenContainer.addChild(bloodBGRect);
                    // Étape 1 : position globale depuis innerHouseContainer
                    const globalPos = innerHouseContainer.toGlobal(new PIXI.Point(only416.x, only416.y));
                    // Étape 2 : position locale relative à specialScreenContainer
                    const newLocalPos = specialScreenContainer.toLocal(globalPos);
                    // Étape 3 : assignation avant le changement de parent
                    only416.x = newLocalPos.x;
                    only416.y = newLocalPos.y;
                    // Étape 4 : on l'ajoute à specialScreenContainer
                    specialScreenContainer.addChild(only416);
                    // BONUS : CURSEUR - Mettre le cursor à zIndex 100
                    crosshair.zIndex = 100;

                    // set promise du ticker
                    await new Promise((resolve) => {
                    const blackAlphaTicker = new PIXI.Ticker();
                    blackAlphaTicker.add(() => {
                        bloodBGRect.alpha += 0.003;
                        if (bloodBGRect.alpha >= 1) {
                            bloodBGRect.alpha = 1;
                            blackAlphaTicker.stop();
                            resolve();
                        }
                    });
                    blackAlphaTicker.start();
                    });

                    // Ajout du texte chaîne youtube BANI
                    const fullText = "https://www.youtube.com/@bani.84N1";
                    const text416Obj = new PIXI.Text('', {
                        fontFamily: 'Efmi',
                        fontSize: 36,
                        fill: 0xAC3232
                    });
                    // text416Obj.position.set(bloodBGRect.x + bloodBGRect.width, only416.y + only416.height);
                    text416Obj.anchor.set(0.4, 0);
                    app.stage.addChild(text416Obj);

                    
                            text416Obj.x = only416.x + only416.width;
                            text416Obj.y = only416.y + only416.height;

                    let currentIndex416 = 0;
                    const text416Speed = 50; // ms entre chaque lettre
                    const interval416 = setInterval(() => {
                        if (currentIndex416 <= fullText.length) {
                            text416Obj.text = fullText.substring(0, currentIndex416);
                            currentIndex416++;
                        } else {
                            clearInterval(interval416);

                            // text416Obj.x = only416.x + only416.width / 2;
                            // text416Obj.y = only416.y + only416.height;
                        }
                    }, text416Speed);
                    ////////////////////////////////////////////

                    // Surlignage
                    text416Obj.interactive = true;
                    only416.interactive = true;
                    // Fonction de survol
                    function handlePointerOver() {
                        only416.tint = 0x00FFFF; // Teinte blanche (comme un "highlight")
                        text416Obj.style.fill = '0x003232';
                    }
                    // Fonction de sortie
                    function handlePointerOut() {
                        only416.tint = 0xFFFFFF; 
                        text416Obj.style.fill = '0xAC3232';
                    }
                    // Ajout des événements
                    only416.on('pointerover', handlePointerOver);
                    only416.on('pointerout', handlePointerOut);
                    only416.on('pointerdown', handleClick);
                    text416Obj.on('pointerover', handlePointerOver);
                    text416Obj.on('pointerout', handlePointerOut);
                    text416Obj.on('pointerdown', handleClick);

                    function handleClick() {
                    window.open('https://www.youtube.com/@bani.84N1', '_blank');
                    }

                }
            });
            return;
        }
    });


    // SHAKY CAM EFFECT SUR N'IMPORTE QUEL CONTAINER
    function shakeContainer(container, intensity = 10, duration = 1000, frequency = 200) {
        const originalX = container.x;
        const startTime = performance.now();
    
        function shakeStep(now) {
            const elapsed = now - startTime;
    
            if (elapsed < duration) {
                const angle = (elapsed / frequency) * Math.PI;
                const offset = Math.sin(angle) * intensity;
                container.x = originalX + offset;
    
                requestAnimationFrame(shakeStep);
            } else {
                container.x = originalX; 
            }
        }
    
        requestAnimationFrame(shakeStep);
    }
    

    // Ouvrir le tiroir
    const defaultTexture = table.texture;
    let isTableOpenned = false;
    table.on('click', () => {
        // Déverrouille la porte
        if (menuButton7.isActive && menuItemGoldKey.isActive) {
            menuContainer.removeChild(menuItemGoldKey);
            app.stage.emit('rightdown');
            PIXI.sound.play('unlockTable');
            let successOpen;
            playerNewText(successOpen, "Ca a marché ! la table de nuit est déverrouillée");
            menuItemGoldKey.destroy();
            tableLocked = false;
            return;
        }
        // Echec si la table est fermée
        if(tableLocked) {
            if (menuButton2.isActive) {
            PIXI.sound.play('drawerStuck');
            let failOpen;
            playerNewText(failOpen, "Hmmm... C'est verrouillé");
            return;
        }
        }
        // On ouvre le tiroir si la table est ouverte
        if (isTableOpenned === false) {
        if (menuButton2.isActive) {
            app.stage.emit('rightdown');
            PIXI.sound.play('drawerOpen');
            table.texture = tableOpen.texture;
            isTableOpenned = true;

            menuContainer.addChild(menuItemTabletPack);
            let takePillsText;
            playerNewText(takePillsText, "Tiens donc, une tablette de comprimés. Je prends", 2500);
        }
    }
    })

    // On ferme le tiroir
    table.on('click', () => {
        if (isTableOpenned === true ) {
        if (menuButton3.isActive) {
            PIXI.sound.play('drawerClose');
            if (isTableOpenned === true) {
            table.texture = defaultTexture;
            isTableOpenned = false;
            innerHouseContainer.addChild(boutdemetal);
            table.interactive = false;
            app.stage.emit('rightdown');

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
            
            // On rend la poubelle interactive
            trash.interactive = true;
        
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
                                        
                                        // Texte 4
                                        textFollowSprite(guybrush, wakeUpText4);
                                        await skipDialogue(houseContainer, guybrush, wakeUpText4, 4000); 

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
                                        textFollowSprite(guybrushSO, wakeUpText5, dialogueStyle);  
                                        await skipDialogue(houseContainer, guybrushSO, wakeUpText5, 4000); 

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

                                        // On rend Guybrush sensible aux actions ordinateur ou displate
                                        guybrushReactive = true;
                                            }
                                        };
                                    };
                                }
                                    });
                                    


   
    // Si on veut relancer le dialogue avec Romain après l'intro
    guybrushSO.on('click', () => {
        if (menuButton6.isActive) {
            setPosition(guybrushSOT, 0.22, 0.68);
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
    // unroll416();

    // Petite fonction appelée pour stopper le défilement du texte si true et pour mettre en pause le texte;
    let stopText = false;
    let pauseText = false;
    async function waitWithStop(ms) {
        let waited = 0;

        while (waited < ms) {
            if (stopText) {
                // Si stopText devient true, le compteur s'arrête et on renvoie true
                return true;
            }
            if (pauseText) {
                // Si pauseText devient true, alors le compteur s'arrête temporairement (revient au début de la boucle de 100ms)
                await wait(100);
                continue;
            }
            // Si ni stopText ou pauseText, on a l'équivalent d'un await wait(ms)
            await wait(100);
            waited += 100;
        }
        return false; // Une fois le wait(ms) terminé, on retourne false
    }

    // Lorsqu'on regarde la toile de home cinema, on active le toileScreen pour voir le portfolio
    toilePoulieRun.on('click', async () => {
        // Quand on clique sur la toile
        if (menuButton5.isActive) {

            // On désactive l'interactivité du sprite pour éviter les clics multiples
            toilePoulieRun.interactive = false;

            // Joue le son du succès:
            PIXI.sound.play("itemFoundPokemon");
            await wait(4000);
            // On appelle notre transition en pixelisation
            await transitionPixelisation();
            // Puis envoie l'écran "toileScreen"
            screenBackgroundContainer.addChild(toileScreen);

                                        /// GENERATION & SETUP DES ASSETS ///
            ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
            // Génération des 3 titres de projets qui s'afficheront lors du hover
            let getTogetherTitle = new PIXI.Text({ text: "GetTogether : une extension de TimeOut", style: titleStyle });
            let rebatiereTitle = new PIXI.Text({ text: "La Rebatière : une application de réservation pour maison d'hôte", style: titleStyle });
            let jsigneTitle = new PIXI.Text({ text: "Jsigné : un SoWeSign fait maison", style: titleStyle });
            // Mini fonction qui configure la position des titres qui apparaissent en hover
            function projectTitle(title) {
                title.zIndex = 16;
                title.x = toileScreen.x + (toileScreen.width / 2);
                title.y = toileScreen.y + (toileScreen.height / 2);
                title.anchor.set(0.5);
            }
            projectTitle(getTogetherTitle);
            projectTitle(rebatiereTitle);
            projectTitle(jsigneTitle);

            ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

            // On appelle la fonction qui affiche et configure taille & position du portrait de Romain qui parle
            await setupRomainPortrait();
            // On appelle la fonction qui affiche et configure taille & position des sprites du projet
            await setupToileProjectsSprites();
            // On appelle la fonction pour créer tous les textes que Romain va réciter dans l'intro et les projets (les "bulles")
            let bulles = await creerToutesLesBulles();
            // On lance l'introduction
            await introSequence();

            // Fonction de configuration du portrait de Romain
            async function setupRomainPortrait() {          
            // Importé depuis les sprites, le fond du Portrait (et son mask) où Romain parle est positionné en haut à gauche de la toile.
            fondPortrait.x = toileScreen.x + (toileScreen.width * 0.12);
            fondPortrait.y = toileScreen.y + (toileScreen.height * 0.1);
            fondPortrait.zIndex = 11;
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
            guybrushClone.gotoAndPlay(0); // Equivaut à .play()
            // Ajout du masque à Romain - Il n'apparaitra que dans l'espace autorisé par le masque (càd le fondPortrait)
            guybrushClone.mask = fondPortraitMask;
            screenBackgroundContainer.addChild(guybrushClone);
            // ajout du portrait
            screenBackgroundContainer.addChild(fondPortrait);
            }

            // Fonction de configuration des sprites toileScreenProject
            async function setupToileProjectsSprites() {
            // IMPORTES DE LOADSPRITES - On configure les 3 sprites de projet (respectivement GetTogether, Rebatiere, Jsigne)
            // On les grise (car pas encore cliquables)
            toileScreenProject1.tint = 0x808080;
            toileScreenProject2.tint = 0x808080;
            toileScreenProject3.tint = 0x808080;
            // Non interactifs, car non cliquables
            toileScreenProject1.interactive = false;
            toileScreenProject2.interactive = false;
            toileScreenProject3.interactive = false;
            // Les projets commencent invisibles (alpha 0) avant de le devenir plus tard avec un ticker
            toileScreenProject1.alpha = 0;
            toileScreenProject2.alpha = 0;
            toileScreenProject3.alpha = 0;
            // On configure l'espacement total qu'on veut entre les 3 sprites de projet
            const totalSpacing = toileScreen.width * 0.05;
            // On les ancre à 0.5 de leur largeur
            toileScreenProject1.anchor.set(0.5);
            toileScreenProject2.anchor.set(0.5);
            toileScreenProject3.anchor.set(0.5);
            // On configure leur taille (environ 18% de leur taille originale -à améliorer-)
            toileScreenProject1.scale.set(0.18);
            toileScreenProject2.scale.set(0.18);
            toileScreenProject3.scale.set(0.18);
            // On ajuste la position de tous les projets avec pour point de départ le centre de la toile
            toileScreenProject2.x = toileScreen.x + (toileScreen.width * 0.5);
            toileScreenProject1.x = toileScreenProject2.x - toileScreenProject2.width - totalSpacing;
            toileScreenProject3.x = toileScreenProject2.x + toileScreenProject2.width + totalSpacing;
            const yCenter = toileScreen.y + (toileScreen.height * 0.5);
            toileScreenProject1.y = yCenter;
            toileScreenProject2.y = yCenter;
            toileScreenProject3.y = yCenter;
            }

            // Fonction qui, appelée, va créer un tableau de lignes de textes (bulles) que Romain va réciter durant les videos
            async function creerToutesLesBulles() { 
                function bulleText(bulle) { // Configuration spatiale des bulles (en haut centrées)
                    bulle.zIndex = 12;
                    bulle.x = toileScreen.x + (toileScreen.width * 0.53);
                    bulle.y = toileScreen.y + (toileScreen.height * 0.05);
                    bulle.anchor.set(0.5, 0);
                    return bulle;
                }
            
                // Tableau vide des bulles qu'on va remplir
                let bulles = [];

                // Bulles Romain Toile
                bulles.push(
                    bulleText(new PIXI.Text({ text: "Bravo d'être arrivé jusque là!", style: dialogueStyleLong })) // bulles[0] = bulleText1
                    , bulleText(new PIXI.Text({ text: "Tu vas pouvoir avoir une idée un peu plus précise de mes compétences en dev web", style: dialogueStyleLong })) // bulles[1] = bulleText2
                    , bulleText(new PIXI.Text({ text: "Voici une petite sélection de projets que j'ai réalisé", style: dialogueStyleLong })) // bulles[2] = bulleText3
                    , bulleText(new PIXI.Text({ text: "Clique sur le projet qui t'intéresse ! Tu pourras revenir consulter les autres.", style: dialogueStyleLong })) // bulles[3] = bulleText4
                );

                // Bulles Romain GETTOGETHER 

                // Intro
                bulles.push(
                    bulleText(new PIXI.Text({ text: "GetTogether, un projet pensé comme une extension pour TimeOut", style: dialogueStyleLong })) // bulles[4] = bulleTextGT1
                    , bulleText(new PIXI.Text({ text: "L'application permet aux utilisateurs de filtrer les événements selon leurs centres intérêts et de tchater en amont de l'événement.", style: dialogueStyleLong })) // bulles[5] = bulleTextGT2
                    , bulleText(new PIXI.Text({ text: "À tout moment tu peux mettre la vidéo en pause, passer à l'étape suivante ou revenir en arrière.", style: dialogueStyleLong })) // bulles[6] = bulleTextGT3
                    , bulleText(new PIXI.Text({ text: "Prêt ? Alors c'est parti !", style: dialogueStyleLong })) // bulles[7] = bulleTextGT4
                );

                // SignUp - Login
                bulles.push(
                    bulleText(new PIXI.Text({ text: "On va commencer par s'inscrire et entrer nos informations", style: dialogueStyleLong })) // bulles[8] = bulleTextGT5
                    , bulleText(new PIXI.Text({ text: "Ensuite lors de notre première connexion on est invité à compléter notre profil.", style: dialogueStyleLong })) // bulles[9] = bulleTextGT6
                    , bulleText(new PIXI.Text({ text: "Petit Nom-Prénom-Pseudo classique ainsi que le nom de la ville (pour l'instant l'application est limitée à Paris)", style: dialogueStyleLong })) // bulles[10] = bulleTextGT7
                    , bulleText(new PIXI.Text({ text: "On peut au choix uploader sa propre photo de profil, ou bien choisir un avatar prédéfini", style: dialogueStyleLong })) // bulles[11] = bulleTextGT8
                    , bulleText(new PIXI.Text({ text: "On termine ensuite par sélectionner quelques 'tags', ce qui va servir à filtrer nos recommandations.", style: dialogueStyleLong })) // bulles[12] = bulleTextGT9
                    , bulleText(new PIXI.Text({ text: "Clique sur 'suivant' pour passer au Dashboard", style: dialogueStyleLong })) // bulles[13] = bulleTextGT10
                );

                // Dashboard - Event
                bulles.push(
                    bulleText(new PIXI.Text({ text: "On y est, enfin ! Voici le Dashboard de l'application, faisons l'état des lieux...", style: dialogueStyleLong })) // bulles[14] = bulleTextGT11
                    , bulleText(new PIXI.Text({ text: "Un FullCalendar nous affiche des événements disponibles à gauche et un peu plus bas des événements recommandés", style: dialogueStyleLong })) // bulles[15] = bulleTextGT12
                    , bulleText(new PIXI.Text({ text: "Mais allons plutot faire un petit tour sur la page d'un évenement", style: dialogueStyleLong })) // bulles[16] = bulleTextGT13
                    , bulleText(new PIXI.Text({ text: "On a une description de l'événement, son adresse, ses tags et même un petit canal de tchat", style: dialogueStyleLong })) // bulles[17] = bulleTextGT14
                    , bulleText(new PIXI.Text({ text: "Marquons un petit message et tentons d'y répondre avec une autre session", style: dialogueStyleLong })) // bulles[18] = bulleTextGT15
                );

                // Tags
                bulles.push(
                    bulleText(new PIXI.Text({ text: "Pour terminer, rendons-nous sur la page 'tags' pour les modifier et obtenir d'autres recommandations", style: dialogueStyleLong })) // bulles[19] = bulleTextGT17
                    , bulleText(new PIXI.Text({ text: "Ta-da !", style: dialogueStyleLong })) // bulles[20] = bulleTextGT18
                    , bulleText(new PIXI.Text({ text: "Si tu souhaites consulter le code de l'application, il est disponible sur mon github @romainbaniska", style: dialogueStyleLong })) // bulles[21] = bulleTextGT19
                    , bulleText(new PIXI.Text({ text: "Clique sur 'Retour' pour parcourir les autres projets", style: dialogueStyleLong })) // bulles[22] = bulleTextGT20
                );


                // Bulles Romain REBATIERE
                // Intro
                bulles.push(
                    bulleText(new PIXI.Text({ text: "Bienvenue sur l'application 'Rebatière'", style: dialogueStyleLong })) // bulles[23]
                    , bulleText(new PIXI.Text({ text: "Il s'agit d'une application de booking destinée à une maison d'hôte dans la Drôme", style: dialogueStyleLong })) // bulles[24]
                    , bulleText(new PIXI.Text({ text: "À tout moment tu peux mettre la vidéo en pause, passer à l'étape suivante ou revenir en arrière.", style: dialogueStyleLong })) // bulles[25]
                    , bulleText(new PIXI.Text({ text: "Prêt ? Alors c'est parti !", style: dialogueStyleLong })) // bulles[26]
                );

                // SignUp - Login
                bulles.push(
                    bulleText(new PIXI.Text({ text: "On va commencer par se créer un compte sur la page d'enregistrement", style: dialogueStyleLong })) // bulles[27]
                    , bulleText(new PIXI.Text({ text: "Pour recadrer l'avatar, j'ai retravaillé et intégré un CropperJS de manière à le sauvegarder en direct", style: dialogueStyleLong })) // bulles[28]
                    , bulleText(new PIXI.Text({ text: "Une fois le compte validé, on se connecte de manière classique", style: dialogueStyleLong })) // bulles[29]
                    , bulleText(new PIXI.Text({ text: "Nous voici désormais sur la page principale du clandrier, tu peux passer à l'étape suivante", style: dialogueStyleLong })) // bulles[30]
                    , bulleText(new PIXI.Text({ text: "gagaga", style: dialogueStyleLong })) // bulles[31]
                    , bulleText(new PIXI.Text({ text: "gagaga", style: dialogueStyleLong })) // bulles[32]
                );

                // Calendrier
                bulles.push(
                    bulleText(new PIXI.Text({ text: "La page d'accueil nous donne accès à plusieurs choses. Commençons par effectuer une réservation.", style: dialogueStyleLong })) // bulles[33]
                    , bulleText(new PIXI.Text({ text: "Programmons une réservation simple de 6 jours. ", style: dialogueStyleLong })) // bulles[34]
                    , bulleText(new PIXI.Text({ text: "Choisissons ensuite la chambre que l'on souhaite réserver pour la période sur un plan en 2D", style: dialogueStyleLong })) // bulles[35]
                    , bulleText(new PIXI.Text({ text: "Puis, on peut, si on le désir, rajouter un ou plusieurs membres de la Rebatière pendant la durée de notre séjour", style: dialogueStyleLong })) // bulles[36]
                    , bulleText(new PIXI.Text({ text: "Vérifions ensuite si la réservation s'est fait effectuée", style: dialogueStyleLong })) // bulles[37]
                    , bulleText(new PIXI.Text({ text: "On a bien réservé pour nous même et un autre membre ! Tu peux passer à l'étape suivante", style: dialogueStyleLong })) // bulles[38]
                );

                // Reservations
                bulles.push(
                    bulleText(new PIXI.Text({ text: "Une fois qu'on a terminé notre réservation, regardons 'Mon Profil' pour accéder à la gestion de 'Mes Reservations'", style: dialogueStyleLong })) // bulles[39]
                    , bulleText(new PIXI.Text({ text: "Comme on n'a qu'une réservation, on peut la supprimer", style: dialogueStyleLong })) // bulles[40]
                    , bulleText(new PIXI.Text({ text: "Et on voit que notre réservation a bien été annulée, tu peux passer à la dernière étape", style: dialogueStyleLong })) // bulles[41]
                );

                // Réservations en grand nombre & gestion des erreurs
                bulles.push(
                    bulleText(new PIXI.Text({ text: "Voyons maintenant comment le site gère les cas de nombreuses réservations sur une même période", style: dialogueStyleLong })) // bulles[42]
                    , bulleText(new PIXI.Text({ text: "Lors du formulaire de réservation, il est possible de savoir qui a déjà réservé sur une période", style: dialogueStyleLong })) // bulles[43]
                    , bulleText(new PIXI.Text({ text: "Essayons maintenant de réserver une chambre déjà pleine pour cette période", style: dialogueStyleLong })) // bulles[44]
                    , bulleText(new PIXI.Text({ text: "Le serveur nous renvoie un refus de réservation.", style: dialogueStyleLong })) // bulles[45]
                    , bulleText(new PIXI.Text({ text: "Essayons d'inspecter une période sans avoir rentré de dates : erreur également", style: dialogueStyleLong })) // bulles[46]
                    , bulleText(new PIXI.Text({ text: "Maintenant vérifions qu'une réservation dans les règles marche toujours correctement", style: dialogueStyleLong })) // bulles[47]
                    , bulleText(new PIXI.Text({ text: "Eh oui c'est bon ! Tu peux maintenant passer à la dernière étape", style: dialogueStyleLong })) // bulles[48]
                );

                // Admin et piscine
                bulles.push(
                    bulleText(new PIXI.Text({ text: "Je me suis connecté sur un compte 'Admin' pour pouvoir ouvrir la piscine", style: dialogueStyleLong })) // bulles[49]
                    , bulleText(new PIXI.Text({ text: "Il est possible donc pour un doyen de la Rebatière de décider de la disponibilité de la piscine", style: dialogueStyleLong })) // bulles[50]
                    , bulleText(new PIXI.Text({ text: "Chaque jour où la piscine est dispo a son icone qui passe au vert!", style: dialogueStyleLong })) // bulles[51]
                    , bulleText(new PIXI.Text({ text: "Faisons maintenant un petit tour du coté de panneau admin", style: dialogueStyleLong })) // bulles[52]
                    , bulleText(new PIXI.Text({ text: "Pour la faire courte, j'ai simplement intégré le bundle EasyAdmin permettant d'avoir un controle sur tous les éléments de la BDD", style: dialogueStyleLong })) // bulles[53]
                    , bulleText(new PIXI.Text({ text: "On en a terminé, tu peux cliquer sur le bouton retour !", style: dialogueStyleLong })) // bulles[54]
                );

                // Bulles Romain JSIGNE
                // Renvoi sur le behance de Florian
                 bulles.push(
                    bulleText(new PIXI.Text({ text: "Jsigné, c'est un projet développé lors d'un stage de 4 mois à La Passerelle", style: dialogueStyleLong })) // bulles[55]
                    , bulleText(new PIXI.Text({ text: "Il s'agit d'une application inspirée SoWeSign faite sur mesure pour les besoins de l'école", style: dialogueStyleLong })) // bulles[56]
                    , bulleText(new PIXI.Text({ text: "Le projet reposant entre autre sur une clé API auquelle les anciens stagiaires n'ont plus accès...", style: dialogueStyleLong })) // bulles[57]
                    , bulleText(new PIXI.Text({ text: "...Je te renvoie directement sur l'excellente présentation faite par notre UX Florian depuis son espace Behance.", style: dialogueStyleLong })) // bulles[58]
                );
                
                return bulles;
            }
           
            // Méthode génère une petite séquence simple qui réapparaitra à chaque fois durant l'intro
            // La méthode appelle une méthode "animation d'apparition des toiles projects" un peu plus bas
            async function introSequence() {
                screenBackgroundContainer.addChild(bulles[0]); // "Bravo d'être arrivé jusque là!"
                await wait(3000);
            
                screenBackgroundContainer.removeChild(bulles[0]); 
                screenBackgroundContainer.addChild(bulles[1]); // "Tu vas pouvoir avoir une idée un peu plus précise de mes compétences en dev web"
                await wait(3000);
            
                screenBackgroundContainer.removeChild(bulles[1]);
                screenBackgroundContainer.addChild(bulles[2]); // "Voici une petite sélection de projets que j'ai réalisé"
       
                // Ajout des sprites toileProject au canvas
                screenBackgroundContainer.addChild(toileScreenProject1);
                screenBackgroundContainer.addChild(toileScreenProject2);
                screenBackgroundContainer.addChild(toileScreenProject3);

                // Animation d'apparition des 3 projets
                await toileScreenProjectAppear();

                // On retire la deuxième bulle 3 secondes après être apparue
                await wait(3000);
                screenBackgroundContainer.removeChild(bulles[2]);
                screenBackgroundContainer.addChild(bulles[3]); // "Clique sur le projet qui t'intéresse ! Tu pourras revenir consulter les autres."
                
                // On retire la 3ème bulle, Romain arrête de parler et attend qu'un projet soit sélectionné
                await wait(3000);
                screenBackgroundContainer.removeChild(bulles[3]);
                guybrushClone.gotoAndStop(0);
            
                // On dégrise la teinte des sprites de toileproject à la normale
                toileScreenProject1.tint = 0xFFFFFF;
                toileScreenProject2.tint = 0xFFFFFF;
                toileScreenProject3.tint = 0xFFFFFF;
            
                // Et ils sont désormais interactifs
                toileScreenProject1.interactive = true;
                toileScreenProject2.interactive = true;
                toileScreenProject3.interactive = true;
            }

            // Méthode d'animation - apparition des 3 projets
            async function toileScreenProjectAppear() {        
                const appearTicker = new PIXI.Ticker();
                appearTicker.add(() => {
                    let done = true;
            
                    if (toileScreenProject1.alpha < 1) {
                        toileScreenProject1.alpha += 0.05;
                        if (toileScreenProject1.alpha > 1) toileScreenProject1.alpha = 1;
                        done = false;
                    }
            
                    if (toileScreenProject2.alpha < 1) {
                        toileScreenProject2.alpha += 0.05;
                        if (toileScreenProject2.alpha > 1) toileScreenProject2.alpha = 1;
                        done = false;
                    }
            
                    if (toileScreenProject3.alpha < 1) {
                        toileScreenProject3.alpha += 0.05;
                        if (toileScreenProject3.alpha > 1) toileScreenProject3.alpha = 1;
                        done = false;
                    }
            
                    if (done) appearTicker.stop();
                });
                appearTicker.start();
            }



        ///////////////////////////////////////
        /////////// POINTER EVENTS ////////////
        ///////////////////////////////////////

        const projectDescriptions = new Map();

        // Hover qui affiche le nom du projet & Animation de zoom
        function handleProjectPointerOver(project, descriptionText) {
        const projectDescription = new PIXI.Text({ text: descriptionText, style: titleStyle2 });
        projectDescription.x = project.x;
        projectDescription.y = project.y + projectDescription.height * 2;
        projectDescription.anchor.set(0.5, 0);
        projectDescription.zIndex = 12;

        screenBackgroundContainer.addChild(projectDescription);
        projectDescriptions.set(project, projectDescription);

        // Petite anim GSAP
        gsap.to(project.scale, {
            x: 0.23,
            y: 0.23,
            duration: 0.5,
            ease: "power1.out"
        });
    }
        // PointerOut qui retire le nom du projet et dézoom
        function handleProjectPointerOut(project) {
        const desc = projectDescriptions.get(project);
        if (desc) {
            desc.destroy();
            projectDescriptions.delete(project);
        }

        gsap.to(project.scale, {
            x: 0.18,
            y: 0.18,
            duration: 0.5,
            ease: "power1.out"
        });
    }
        
        toileScreenProject1.on('pointerover', () => handleProjectPointerOver(toileScreenProject1, "GetTogether"));
        toileScreenProject1.on('pointerout', () => handleProjectPointerOut(toileScreenProject1));

        toileScreenProject2.on('pointerover', () => handleProjectPointerOver(toileScreenProject2, "Rebatière"));
        toileScreenProject2.on('pointerout', () => handleProjectPointerOut(toileScreenProject2));

        toileScreenProject3.on('pointerover', () => handleProjectPointerOver(toileScreenProject3, "Jsigné"));
        toileScreenProject3.on('pointerout', () => handleProjectPointerOut(toileScreenProject3));

        //////////////////////////////////////
        /// MOUVEMENT TOILESCREENPROJECT 1 ///
        //////////////////////////////////////

        // On définit toutes les séquences de video du projet 1:
        async function playSequence1() {
        // On désactive le bouton "NextVideo" (autrement dit séquence d'après)
        nextVideo.disabled = true;
        stopText = false;

        // "Prêt ? Alors c'est parti" -> removechild après délai
        if ((await waitWithStop(2000)) === true) return;
        guybrushClone.gotoAndStop(0);
        screenBackgroundContainer.removeChild(bulles[7]);
        if ((await waitWithStop(2000)) === true) return;

        guybrushClone.play();
        screenBackgroundContainer.addChild(bulles[8]); // bulles[8] = "On va commencer par s'inscrire et entrer nos informations"
        if ((await waitWithStop(10000)) === true) return;
        guybrushClone.gotoAndStop(0);
        screenBackgroundContainer.removeChild(bulles[8]);
        if ((await waitWithStop(5000)) === true) return;

        guybrushClone.play();
        screenBackgroundContainer.addChild(bulles[9]); // bulles[9] = "Ensuite lors de notre première connexion on est invité à compléter notre profil."
        if ((await waitWithStop(8000)) === true) return;
        guybrushClone.gotoAndStop(0);
        screenBackgroundContainer.removeChild(bulles[9]);
        if ((await waitWithStop(4000)) === true) return;

        guybrushClone.play();
        screenBackgroundContainer.addChild(bulles[11]); // bulles[11] = "On peut au choix uploader..."
        if ((await waitWithStop(13000)) === true) return;
        guybrushClone.gotoAndStop(0);
        screenBackgroundContainer.removeChild(bulles[11]);
        if ((await waitWithStop(4000)) === true) return;

        guybrushClone.play();
        screenBackgroundContainer.addChild(bulles[12]); // bulles[12] = "On termine ensuite par sélectionner..."
        if ((await waitWithStop(7000)) === true) return;
        guybrushClone.gotoAndStop(0);
        screenBackgroundContainer.removeChild(bulles[12]);
        if ((await waitWithStop(4000)) === true) return;

        guybrushClone.play();
        screenBackgroundContainer.addChild(bulles[13]); // bulles[13] = "Clique sur 'suivant' pour passer au Dashboard"
        if ((await waitWithStop(2000)) === true) return;
        guybrushClone.gotoAndStop(0);
        screenBackgroundContainer.removeChild(bulles[13]);
        if ((await waitWithStop(3000)) === true) return;

        // On rerend le bouton nextVideo disponible
        nextVideo.disabled = false;
    }

        async function playSequence2() {
        // On désactive le bouton "NextVideo"
        nextVideo.disabled = true;
        stopText = false;

        guybrushClone.play();
        screenBackgroundContainer.addChild(bulles[14]); // bulles[14] = "On y est, enfin ! Voici le Dashboard de l'application, faisons l'état des lieux..."
        if ((await waitWithStop(3000)) === true) return;
        guybrushClone.gotoAndStop(0);
        screenBackgroundContainer.removeChild(bulles[14]);
        if ((await waitWithStop(3000)) === true) return;

        guybrushClone.play();
        screenBackgroundContainer.addChild(bulles[15]); // bulles[15] = "Un FullCalendar nous affiche des événements disponibles à gauche et un peu plus bas des événements recommandés"
        if ((await waitWithStop(3000)) === true) return;
        guybrushClone.gotoAndStop(0);
        screenBackgroundContainer.removeChild(bulles[15]);
        if ((await waitWithStop(3000)) === true) return;

        guybrushClone.play();
        screenBackgroundContainer.addChild(bulles[16]); // bulles[16] = "Mais allons plutot faire un petit tour sur la page d'un évenement"
        if ((await waitWithStop(3000)) === true) return;
        guybrushClone.gotoAndStop(0);
        screenBackgroundContainer.removeChild(bulles[16]);
        if ((await waitWithStop(3000)) === true) return;

        guybrushClone.play();
        screenBackgroundContainer.addChild(bulles[17]); // bulles[17] = "On a une description de l'événement, son adresse, ses tags et même un petit canal de tchat"
        if ((await waitWithStop(3000)) === true) return;
        guybrushClone.gotoAndStop(0);
        screenBackgroundContainer.removeChild(bulles[17]);
        if ((await waitWithStop(3000)) === true) return;

        nextVideo.disabled = false;
        }

        async function playSequence3() {
        // On désactive le bouton "NextVideo"
        nextVideo.disabled = true;
        stopText = false;

        guybrushClone.play();
        screenBackgroundContainer.addChild(bulles[18]); // bulles[18] = "Marquons un petit message et tentons d'y répondre avec une autre session"
        if ((await waitWithStop(3000)) === true) return;
        guybrushClone.gotoAndStop(0);
        screenBackgroundContainer.removeChild(bulles[18]);
        if ((await waitWithStop(3000)) === true) return;

        guybrushClone.play();
        screenBackgroundContainer.addChild(bulles[19]); // bulles[19] = "Pour terminer, rendons-nous sur la page 'tags' pour les modifier et obtenir d'autres recommandations"
        if ((await waitWithStop(3000)) === true) return;
        guybrushClone.gotoAndStop(0);
        screenBackgroundContainer.removeChild(bulles[19]);
        if ((await waitWithStop(3000)) === true) return;
        
        nextVideo.disabled = false;
        }
        
        async function playSequence4() {
        // On désactive le bouton "NextVideo"
        nextVideo.disabled = true;
        stopText = false;

        guybrushClone.play();
        screenBackgroundContainer.addChild(bulles[20]); // bulles[20] = "Ta-da !"
        if ((await waitWithStop(3000)) === true) return;
        guybrushClone.gotoAndStop(0);
        screenBackgroundContainer.removeChild(bulles[20]);
        if ((await waitWithStop(3000)) === true) return;

        guybrushClone.play();
        screenBackgroundContainer.addChild(bulles[21]); // bulles[21] = "Si tu souhaites consulter le code de l'application, il est disponible sur mon github @romainbaniska"
        if ((await waitWithStop(3000)) === true) return;
        guybrushClone.gotoAndStop(0);
        screenBackgroundContainer.removeChild(bulles[21]);
        if ((await waitWithStop(3000)) === true) return;

        guybrushClone.play();
        screenBackgroundContainer.addChild(bulles[22]); // bulles[22] = "Clique sur 'Retour' pour parcourir les autres projets"
        if ((await waitWithStop(3000)) === true) return;
        screenBackgroundContainer.removeChild(bulles[22]);
        if ((await waitWithStop(3000)) === true) return;
        
        // On réactive le bouton nextvideo
        nextVideo.disabled = false;
    }


       // On crée une petite animation lors de la sélection du projet
        toileScreenProject1.addEventListener("click", async () => {
            // destruction si existe
            const desc = projectDescriptions.get(toileScreenProject1);
            if (desc) {
                desc.destroy();
                projectDescriptions.delete(toileScreenProject1);
            }
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

                    // Taille cible 
                    const targetWidth = toileScreen.width * 0.8;
                    const targetHeight = toileScreen.height * 0.655;

                    // Deuxième Ticker qui agrandit screenProject1
                    let scaleTicker = new PIXI.Ticker();
                    scaleTicker.add(() => {
                        if (toileScreenProject1.width < targetWidth) {
                            toileScreenProject1.width += 10;
                            toileScreenProject1.height += (targetHeight / targetWidth) * 10;
                        } else {
                            toileScreenProject1.width = targetWidth;
                            toileScreenProject1.height = targetHeight;
                            scaleTicker.stop();

                            // screenBackgroundContainer.addChild(introSlide);
                            // Troisième Ticker qui fait disparaitre le screenProject1
                            let alphaTicker = new PIXI.Ticker();
                            alphaTicker.add(() => {
                                if (toileScreenProject1.alpha > 0) {
                                    toileScreenProject1.alpha -= 0.1;
                                } else {
                                    alphaTicker.stop(); 

                                    // Ajout du texte d'intro
                                    screenBackgroundContainer.addChild(getTogetherTitle);

                                    // Ajout des logos d'intro
                                    const screenFactor = toileScreen.width / 5000;

                                    // HTML
                                    logoHTML.scale.set(screenFactor);
                                    logoHTML.x = toileScreen.x + (toileScreen.width / 2) - (logoHTML.width / 2);
                                    logoHTML.y = toileScreen.y + (toileScreen.height / 2) + (getTogetherTitle.height * 2);
                                    screenBackgroundContainer.addChild(logoHTML);

                                    // JS
                                    logoJS.scale.set(screenFactor);
                                    logoJS.x = logoHTML.x - logoHTML.width;
                                    logoJS.y = toileScreen.y + (toileScreen.height / 2) + (getTogetherTitle.height * 2);
                                    screenBackgroundContainer.addChild(logoJS);

                                    // PHP
                                    logoPHP.scale.set(screenFactor);
                                    logoPHP.x = logoJS.x - logoJS.width;
                                    logoPHP.y = toileScreen.y + (toileScreen.height / 2) + (getTogetherTitle.height * 2);
                                    screenBackgroundContainer.addChild(logoPHP);

                                    // CSS
                                    logoCSS.scale.set(screenFactor);
                                    logoCSS.x = logoHTML.x + logoHTML.width;
                                    logoCSS.y = toileScreen.y + (toileScreen.height / 2) + (getTogetherTitle.height * 2);
                                    screenBackgroundContainer.addChild(logoCSS);

                                    // MongoDB
                                    logoMongo.scale.set(screenFactor);
                                    logoMongo.x = logoCSS.x + logoCSS.width;
                                    logoMongo.y = toileScreen.y + (toileScreen.height / 2) + (getTogetherTitle.height * 2);
                                    screenBackgroundContainer.addChild(logoMongo);

                                    // Symfony
                                    logoSymfony.scale.set(screenFactor);
                                    logoSymfony.x = logoMongo.x + logoMongo.width;
                                    logoSymfony.y = toileScreen.y + (toileScreen.height / 2) + (getTogetherTitle.height * 2);
                                    screenBackgroundContainer.addChild(logoSymfony);

                                    // On va créer des séquences de texte pour la narration du projet
                                    async function playSequence0() {
                                        stopText = false;
                                        guybrushClone.play();
                                        screenBackgroundContainer.addChild(bulles[4]);
                                        if ((await waitWithStop(3000)) === true) return;
                                        screenBackgroundContainer.removeChild(bulles[4]);
                                        screenBackgroundContainer.addChild(bulles[5]);
                                        if ((await waitWithStop(7000)) === true) return;
                                        screenBackgroundContainer.removeChild(bulles[5]);
                                        screenBackgroundContainer.addChild(bulles[6]);
                                        if ((await waitWithStop(6000)) === true) return;
                                        screenBackgroundContainer.removeChild(bulles[6]);
                                        screenBackgroundContainer.addChild(bulles[7]);
                                        if ((await waitWithStop(3000)) === true) return;
                                    }

                                    // On joue la séquence 0 et la séquence 1 juste après
                                    playSequence0().then( async () => {
                                            launchProjectVideo(videoList);
                                            await playSequence1();
                                        // });
                                    });
                                }                              
                            });
                            alphaTicker.start();
                        }
                    });
                    scaleTicker.start(); // Démarre le ticker d'agrandissement
                }
            });
            localTicker.start(); // Démarre le ticker de déplacement
        }); 

        

        /////////////////////////////////////
        /// MOUVEMENT TOILESCREENPROJECT2 ///
        /////////////////////////////////////

        toileScreenProject2.addEventListener("click", () => {
            // destruction si existe
             const desc = projectDescriptions.get(toileScreenProject2);
             if (desc) {
                 desc.destroy();
                 projectDescriptions.delete(toileScreenProject2);
             }
            // On invisibilise les projets non sélectionnés
            toileScreenProject2.interactive = false;
            toileScreenProject1.visible = false;
            toileScreenProject3.visible = false;
        
            const targetWidth = toileScreen.width * 0.8;
            const targetHeight = toileScreen.height * 0.655;
            // Ticker qui agrandit screenProject2
            let scaleTicker = new PIXI.Ticker();
            scaleTicker.add(() => {
                if (toileScreenProject2.width < targetWidth) {
                    toileScreenProject2.width += 10;
                    toileScreenProject2.height += (targetHeight / targetWidth) * 10;
                } else {
                    toileScreenProject2.width = targetWidth;
                    toileScreenProject2.height = targetHeight;
                    scaleTicker.stop();
                    console.log("Agrandissement terminé !");

                    screenBackgroundContainer.addChild(introSlide);

                    // Troisième Ticker qui fait disparaitre le screenProject2
                    let alphaTicker = new PIXI.Ticker();
                    alphaTicker.add(() => {
                        if (toileScreenProject2.alpha > 0) {
                            toileScreenProject2.alpha -= 0.1;
                        } else {
                        alphaTicker.stop(); 
                        // screenBackgroundContainer.removeChild(toileScreenProject1);
                        screenBackgroundContainer.addChild(rebatiereTitle);

                        // Ajout des logos d'intro
                        const screenFactor = toileScreen.width / 5000;

                    console.log('on est good');

                        // HTML
                        logoHTML.scale.set(screenFactor);
                        logoHTML.x = toileScreen.x + (toileScreen.width / 2) - (logoHTML.width / 2);
                        logoHTML.y = toileScreen.y + (toileScreen.height / 2) + (getTogetherTitle.height * 2);
                        screenBackgroundContainer.addChild(logoHTML);

                        // JS
                        logoJS.scale.set(screenFactor);
                        logoJS.x = logoHTML.x - logoHTML.width;
                        logoJS.y = toileScreen.y + (toileScreen.height / 2) + (getTogetherTitle.height * 2);
                        screenBackgroundContainer.addChild(logoJS);

                        // PHP
                        logoPHP.scale.set(screenFactor);
                        logoPHP.x = logoJS.x - logoJS.width;
                        logoPHP.y = toileScreen.y + (toileScreen.height / 2) + (getTogetherTitle.height * 2);
                        screenBackgroundContainer.addChild(logoPHP);

                        // CSS
                        logoCSS.scale.set(screenFactor);
                        logoCSS.x = logoHTML.x + logoHTML.width;
                        logoCSS.y = toileScreen.y + (toileScreen.height / 2) + (getTogetherTitle.height * 2);
                        screenBackgroundContainer.addChild(logoCSS);

                        // MySQL
                        logoMySQL.scale.set(screenFactor);
                        logoMySQL.x = logoCSS.x + logoCSS.width;
                        logoMySQL.y = toileScreen.y + (toileScreen.height / 2) + (getTogetherTitle.height * 2);
                        screenBackgroundContainer.addChild(logoMySQL);

                        // Symfony
                        logoSymfony.scale.set(screenFactor);
                        logoSymfony.x = logoMySQL.x + logoMySQL.width;
                        logoSymfony.y = toileScreen.y + (toileScreen.height / 2) + (getTogetherTitle.height * 2);
                        screenBackgroundContainer.addChild(logoSymfony);

                        setTimeout(() => {
                            launchProjectVideo(videoList2);
                        }, 3000);
                        }
                    });
                    alphaTicker.start();
                }
            });
            scaleTicker.start();
        });

        // ______________________________________________________________________________ //

        //////////////////////////////////////
        /// MOUVEMENT TOILESCREENPROJECT3 ////
        //////////////////////////////////////

        toileScreenProject3.addEventListener("click", () => {
            // destruction si existe
            const desc = projectDescriptions.get(toileScreenProject3);
            if (desc) {
                desc.destroy();
                projectDescriptions.delete(toileScreenProject3);
            }

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
                    const targetWidth = toileScreen.width * 0.8;
                    const targetHeight = toileScreen.height * 0.655;
                    let scaleTicker = new PIXI.Ticker();
                    scaleTicker.add(() => {
                        if (toileScreenProject3.width < targetWidth) {
                            toileScreenProject3.width += 10;
                            toileScreenProject3.height += (targetHeight / targetWidth) * 10;
                        } else {
                            toileScreenProject3.width = targetWidth;
                            toileScreenProject3.height = targetHeight;
                            scaleTicker.stop();

                            screenBackgroundContainer.addChild(introSlide);
                            // Troisième Ticker qui fait disparaitre le screenProject3
                            let alphaTicker = new PIXI.Ticker();
                            alphaTicker.add(() => {
                                if (toileScreenProject3.alpha > 0) {
                                    toileScreenProject3.alpha -= 0.1;
                                } else {
                                alphaTicker.stop(); 
                                // screenBackgroundContainer.removeChild(toileScreenProject1);
                                screenBackgroundContainer.addChild(jsigneTitle);

                                // Ajout des logos d'intro
                                const screenFactor = toileScreen.width / 6000;

                                // HTML
                                logoHTML.scale.set(screenFactor);
                                logoHTML.x = toileScreen.x + (toileScreen.width / 2);
                                logoHTML.y = toileScreen.y + (toileScreen.height / 2) + (getTogetherTitle.height * 2);
                                screenBackgroundContainer.addChild(logoHTML);

                                // JS
                                logoJS.scale.set(screenFactor);
                                logoJS.x = logoHTML.x - logoHTML.width;
                                logoJS.y = toileScreen.y + (toileScreen.height / 2) + (getTogetherTitle.height * 2);
                                screenBackgroundContainer.addChild(logoJS);

                                // PHP
                                logoPHP.scale.set(screenFactor);
                                logoPHP.x = logoJS.x - logoJS.width;
                                logoPHP.y = toileScreen.y + (toileScreen.height / 2) + (getTogetherTitle.height * 2);
                                screenBackgroundContainer.addChild(logoPHP);

                                // CSS
                                logoCSS.scale.set(screenFactor);
                                logoCSS.x = logoHTML.x + logoHTML.width;
                                logoCSS.y = toileScreen.y + (toileScreen.height / 2) + (getTogetherTitle.height * 2);
                                screenBackgroundContainer.addChild(logoCSS);

                                // MongoDB
                                logoMongo.scale.set(screenFactor);
                                logoMongo.x = logoCSS.x + logoCSS.width;
                                logoMongo.y = toileScreen.y + (toileScreen.height / 2) + (getTogetherTitle.height * 2);
                                screenBackgroundContainer.addChild(logoMongo);

                                setTimeout(() => {
                                    launchProjectVideo(videoList2);
                                }, 3000);
                                }
                            });
                            alphaTicker.start();
                        }
                    });
                    scaleTicker.start();
                }
            });
            localTicker.start();
        });

                function launchProjectVideo(videoArray) {
                // guybrushClone.addEventListener("click", () => {
        
                // Vérifier si la vidéo existe déjà pour éviter les doublons
                let existingVideo = document.getElementById("pixi-video");
                if (existingVideo) return;
        
                // Génération de la vidéo dans le DOM
                const video = document.createElement("video");
                video.id = "pixi-video";
                video.src = videoArray[currentVideoIndex];
                video.autoplay = true;
                video.controls = false;
                video.style.zIndex = "10";
                // video.style.pointerEvents = "none";
                video.style.width = (toileScreen.width * 0.8) + "px"; // Le ratio sera toujours respecté car la video a une propriété {object-fit: contain;} donc inutile de mettre une height
                video.style.opacity = "0";
                video.style.transition = "opacity 1s ease";

                // Ajout de la video au DOM
                document.body.appendChild(video);

                // Demander deux frames consécutives pour éviter les erreurs d'animation
                requestAnimationFrame(() => {
                    requestAnimationFrame(() => {
                        video.style.opacity = "1";
                    });
                });
        
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
                exitVideo.x = toileScreen.x + (toileScreen.width * 0.9);
                exitVideo.y = toileScreen.y + (toileScreen.height * 0.1);
                exitVideo.anchor.set(0.5);
                returnVideo.x = toileScreen.x + (toileScreen.width * 0.9);
                returnVideo.y = toileScreen.y + (toileScreen.height * 0.9);
                returnVideo.anchor.set(0.5);


                // Ajout de nextVideo et prevVideo
                screenBackgroundContainer.addChild(prevVideo);
                screenBackgroundContainer.addChild(nextVideo);
                // Ajout de exitVideo
                screenBackgroundContainer.addChild(exitVideo);
                // Ajout de returnVideo
                screenBackgroundContainer.addChild(returnVideo);

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
                    screenBackgroundContainer.addChild(stopVideo); // n'arrête pas mais met en pause en fait
                    pauseText = false;
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
                    pauseText = true;
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
                    // On remet la texture de base de exitvideo
                    exitVideo.texture = exitVideospriteAsset.textures[exitVideoframes[0]];
                    // On remove toutes les alertes 
                    screenBackgroundContainer.removeChild(playVideo);
                    screenBackgroundContainer.removeChild(stopVideo);
                    screenBackgroundContainer.removeChild(prevVideo);
                    screenBackgroundContainer.removeChild(nextVideo);
                    screenBackgroundContainer.removeChild(returnVideo);
                    screenBackgroundContainer.removeChild(exitVideo);
                    // On remove le toilescreen, le portrait, lez clone et tous les logos
                    screenBackgroundContainer.removeChild(toileScreen);
                    screenBackgroundContainer.removeChild(fondPortrait);
                    screenBackgroundContainer.removeChild(fondPortraitMask);
                    screenBackgroundContainer.removeChild(guybrushClone);
                    screenBackgroundContainer.removeChild(logoPHP);
                    screenBackgroundContainer.removeChild(logoHTML);
                    screenBackgroundContainer.removeChild(logoCSS);
                    screenBackgroundContainer.removeChild(logoJS);
                    screenBackgroundContainer.removeChild(logoMongo);
                    screenBackgroundContainer.removeChild(logoMySQL);
                    screenBackgroundContainer.removeChild(logoSymfony);
                    // On réinitialise les toileprojects tous visibles si nécessité de relancer la toile
                    toileScreenProject1.visible = true;
                    toileScreenProject2.visible = true;
                    toileScreenProject3.visible = true;
                    toileScreenProject1.interactive = true;
                    toileScreenProject2.interactive = true;
                    toileScreenProject3.interactive = true;
                    // On remove les 3 projets
                    screenBackgroundContainer.removeChild(toileScreenProject1);
                    screenBackgroundContainer.removeChild(toileScreenProject2);
                    screenBackgroundContainer.removeChild(toileScreenProject3);
                    // On détruit les titles (qui seront recréés lors de la génération de toilescreen)
                    getTogetherTitle.destroy();
                    rebatiereTitle.destroy();
                    jsigneTitle.destroy();
                    toileScreenProject1.removeAllListeners();
                    toileScreenProject2.removeAllListeners();
                    toileScreenProject3.removeAllListeners();
                    // introSlide.destroy();
                    currentVideoIndex = 0;

                    // Destruction du tableau bulles
                    if (bulles) {
                        for (const bulle of bulles) {
                          stopText = true;
                          bulle.destroy();
                        }
                      }
                });

                // Gestion des événements Next
                nextVideo.on('pointerover', () => {
                    nextVideo.texture = nextVideoActive.texture;
                });

                nextVideo.on('pointerout', () => {
                    nextVideo.texture = nextVideospriteAsset.textures[nextVideoframes[0]];
                });
                nextVideo.on('click', async () => {
                    // Si nextVideo n'est pas grisé
                    if (!nextVideo.disabled) {

                    // Changer l'index
                    if (currentVideoIndex < videoArray.length - 1) {
                        currentVideoIndex++;
                    } else {
                        currentVideoIndex = 0;
                    }
                
                    // Mettre à jour la source et lancer la lecture
                    video.src = videoArray[currentVideoIndex];
                    video.play();
                
                    // Lancer la bonne séquence en fonction de l'index
                    switch (currentVideoIndex) {
                        case 0:
                            await playSequence1();
                            break;
                        case 1:
                            await playSequence2();
                            break;
                        case 2:
                            await playSequence3();
                            break;
                        case 3:
                            await playSequence4();
                            break;
                        default:
                            break;
                    }
                    // Regrise ensuite nextVideo après avoir changé de séquence
                    nextVideo.disabled = true;
                }
                });

                // Gestion des événements Prev
                prevVideo.on('pointerover', () => {
                    prevVideo.texture = prevVideoActive.texture;
                });

                prevVideo.on('pointerout', () => {
                    prevVideo.texture = prevVideospriteAsset.textures[prevVideoframes[0]];
                });
                prevVideo.on('click', () => {
                    // Eviter les clics multiples
                    prevVideo.disabled = true;
                    
                    if (currentVideoIndex > 0) {
                        currentVideoIndex--;
                    } else {
                        currentVideoIndex = videoArray.length - 1;
                    }
                    video.src = videoArray[currentVideoIndex]; 
                    video.play();

                    // Réactiver le bouton quand la vidéo est prête à être lue
                    video.onloadeddata = () => {
                        prevVideo.disabled = false;
                    };
                });

                // Gestion des événements Return
                returnVideo.on('pointerover', () => {
                returnVideo.texture = returnVideoActive.texture;
                });
                returnVideo.on('pointerout', () => {
                    returnVideo.texture = returnVideospriteAsset.textures[returnVideoframes[0]];
                });


                // Supprimer la vidéo quand on ferme l'écran
                toileScreen.on("removed", () => {
                    video.remove();
                    screenBackgroundContainer.removeChild(playVideo);
                    screenBackgroundContainer.removeChild(stopVideo);
                    screenBackgroundContainer.removeChild(prevVideo);
                    screenBackgroundContainer.removeChild(nextVideo);
                    screenBackgroundContainer.removeChild(exitVideo);
                    screenBackgroundContainer.removeChild(returnVideo);
                    reroll();
                });
            }
        }
    });

    // Utiliser l'ordinateur
    ordiRun.on('click', async () => {
        // guybrushReactive = false;
        // Quand on "utiliser" l'ordi allumé
        if (menuButton7.isActive && !guybrushReactive) {
            let useOrdiText;
            playerNewText(useOrdiText, "Voyons voir ça de plus près...", 2500);
            await wait(2500);
            app.stage.addChild(specialScreenContainer);

            // DEPLACER ICI TOUTE LA LOGIQUE DUTERMINAL
            displayTerminalAndChestCutscene();

        } else if (menuButton7.isActive && guybrushReactive) {
        // Si guybrush n'est pas MORT
        let useOrdiTextFail;
        let useOrdiTextFail2;
        let useOrdiTextFail3;
        menuContainer.addChild(menuCoverDialogueOverlay);
        app.stage.emit('rightdown');
        playerNewText(useOrdiTextFail, "Eh je peux voir un truc vite fait sur ta machine ?", 2500);
        await wait(2500);
        guybrushSO.gotoAndStop(0);
        await wait(300);
        spriteSwap(innerHouseContainer, guybrushSO, guybrushSOT);
        guybrushSOT.gotoAndStop(0);
        await wait(1000);
        guybrushSOT.play();
        textFollowSprite(guybrushSOT, failText);
        await wait(2500);
        innerHouseContainer.removeChild(failText);
        textFollowSprite(guybrushSOT, failText2);
        await wait(3000);
        innerHouseContainer.removeChild(failText2);
        textFollowSprite(guybrushSOT, failText3);
        await wait(3500);
        innerHouseContainer.removeChild(failText3);
        textFollowSprite(guybrushSOT, failText4);
        await wait(3500);
        innerHouseContainer.removeChild(failText4);
        textFollowSprite(guybrushSOT, failText5);
        await wait(3500);
        innerHouseContainer.removeChild(failText5);
        // await wait(2000);
        guybrushSOT.gotoAndStop(0);
        await wait (1000);
        playerNewText(useOrdiTextFail2, "Bon très bien", 2500);
        await wait(3500);
        spriteSwap(innerHouseContainer, guybrushSOT, guybrushSO);
        guybrushSO.play();
        await wait(1000);
        menuContainer.removeChild(menuCoverDialogueOverlay);
        await wait(1000);
        playerNewText(useOrdiTextFail2, "Si je veux accéder à son ordinateur il faut que je trouve un moyen de l'en écarter", 2500);
        await wait(2500);
        playerNewText(useOrdiTextFail3, "Mais comment ?", 2500);
    }
});


    // Remplir le verre d'eau
    lavabo.on('click', async () => {
        if (menuButton7.isActive && menuItemGlassWaterEmpty.isActive) {
            // menuContainer.addChild(menuCoverDialogueOverlay);
            toggleClickBlocker();
            PIXI.sound.play('lavaboSound');
            app.stage.emit('rightdown');
            await wait(2000);
            toggleClickBlocker();
            spriteSwap(menuContainer, menuItemGlassWaterEmpty, menuItemGlassWater);
            let fillGlassText;
            playerNewText(fillGlassText, "Rempli à ras bord", 1500);
        }
    });
        
    // Donner la tasse de café
    // TEST Donner le verre d'eau à Romain
    guybrushSO.on('click', async () => {
        // guybrushLD.on('click', async () => {
            if (menuButton.isActive && menuItemGlassCoffe.isActive) {
                app.stage.emit('rightdown');
                menuContainer.addChild(menuCoverDialogueOverlay);

                menuItemGlassCoffe.destroy();
        
                setPosition(guybrushSO, 0.2, 0.68);
                spriteSwap(innerHouseContainer, guybrushLD, guybrushSO);
                await wait(2000);
        
                guybrushSO.gotoAndStop(0);
                await wait(1000);
        
                setPosition(guybrushSOT, 0.22, 0.68);
                spriteSwap(innerHouseContainer, guybrushSO, guybrushSOT);
                guybrushSOT.gotoAndStop(0);
        
                let giveCoffeText;
                playerNewText(giveCoffeText, "Eh un petit café l'ami ?", 2500);
                await wait(2500);
        
                textFollowSprite(guybrushSOT, coffeText);
                guybrushSOT.play();
                await wait(2500);
        
                houseContainer.removeChild(coffeText);
                guybrushSOT.gotoAndStop(0);
                await wait(300);
                spriteSwap(innerHouseContainer, guybrushSO, guybrushSOT);
                coffeText.destroy();
                await wait(1000);
        
                guybrushD.gotoAndStop(0);
                spriteSwap(innerHouseContainer, guybrushSOT, guybrushD);
                setPosition(guybrushD, 0.22, 0.66);
                await wait(1000);
        
                // Boit le café
                PIXI.sound.play('drink');
                guybrushD.play();
                guybrushD.loop = false;
                await wait(2000);
        
                spriteSwap(innerHouseContainer, guybrushD, guybrushSOT);
                await wait(1000);
                
                setPosition(guybrushSODISGUSTED, 0.22, 0.68);
                spriteSwap(innerHouseContainer, guybrushSOT, guybrushSODISGUSTED);
                await wait(1000);

                spriteSwap(innerHouseContainer, guybrushSODISGUSTED, guybrushSOT);
                await wait(300);

                guybrushSOT.play();
                textFollowSprite(guybrushSOT, coffeText2);
                await wait(3000);
        
                textFollowSprite(guybrushSOT, coffeText3);
                houseContainer.removeChild(coffeText2);
                coffeText2.destroy();
                await wait(3000);
        
                textFollowSprite(guybrushSOT, coffeText4);
                houseContainer.removeChild(coffeText3);
                coffeText3.destroy();
                await wait(3000);
        
                houseContainer.removeChild(coffeText4);
                coffeText4.destroy();
                guybrushSOT.gotoAndStop(0);
                let giveCoffeText2;
                playerNewText(giveCoffeText2, "Mais de rien.", 2500);
                await wait(2500);
        
                spriteSwap(innerHouseContainer, guybrushSOT, guybrushSO);
                guybrushSO.play();
                guybrushSO.interactive = false;
                menuContainer.removeChild(menuCoverDialogueOverlay);

                innerHouseContainer.removeChild(gamingChairAR); // Correction de bug à déplacer
                toggleClickBlocker();

                await wait(5000);
                setPosition(guybrushSOTIRED, 0.2, 0.68);
                PIXI.sound.play('stomach2');
                spriteSwap(innerHouseContainer, guybrushSO, guybrushSOTIRED);
                await wait(5000);
                setPosition(guybrushSOSLEEPY, 0.2, 0.68);
                PIXI.sound.play('stomach3');
                spriteSwap(innerHouseContainer, guybrushSOTIRED, guybrushSOSLEEPY);

                // Se relève après 6 secondes
                await wait(6000);
                app.stage.emit('rightdown');
                menuContainer.addChild(menuCoverDialogueOverlay);
                spriteSwap(innerHouseContainer, guybrushSOSLEEPY, guybrushWL);
                setPosition(guybrushWL, 0.2, 0.67);
                PIXI.sound.play('stomach1');
                await walkLeft(0.1);
                spriteSwap(innerHouseContainer, guybrushWL, guybrushWR);
                setPosition(guybrushWR, 0.1, 0.67);
                await walkRight(0.4);
                spriteSwap(innerHouseContainer, guybrushWR, guybrush);
                setPosition(guybrush, 0.4, 0.66);
                textFollowSprite(guybrush, sickText);
                await wait(2000);
                innerHouseContainer.removeChild(sickText);
                textFollowSprite(guybrush, sickText2);
                await wait(2000);
                innerHouseContainer.removeChild(sickText2);
                // Souffre
                spriteSwap(innerHouseContainer, guybrush, guybrushP);
                PIXI.sound.play('hit');
                guybrushP.gotoAndPlay(0);
                setPosition(guybrushP, 0.4, 0.67);
                await wait(4000);
                // Meurt
                PIXI.sound.play('death');
                spriteSwap(innerHouseContainer, guybrushP, guybrushF);
                setPosition(guybrushF, 0.4, 0.69);
                guybrushF.gotoAndPlay(0);
                guybrushF.loop = false;
                await wait(5000);
                // Réflexion basse
                let giveCoffeText3;
                let giveCoffeText4;
                let giveCoffeText5;
                let giveCoffeText6;
                playerNewText(giveCoffeText3, "Euh...", 2500);
                await wait(2500);
                playerNewText(giveCoffeText4, "C'est pas vraiment ce que j'avais imaginé", 2500);
                await wait(3500);
                playerNewText(giveCoffeText5, "Bon, au moins maintenant j'ai accès à son ordinateur", 2500);
                await wait(3500);
                playerNewText(giveCoffeText6, "La fin justifie les moyens, non ?", 2500);
                await wait(3500);

                // On désactive la réactivité de guybrush
                guybrushReactive = false;
                menuContainer.removeChild(menuCoverDialogueOverlay);

                toggleClickBlocker();

                await wait(1000);
                // Succès steam
                PIXI.sound.play('steamnotif');
                await showAchievement();
            }
        });

    let alreadyCoffeFilled = false;
    let alreadyWaterFilled = false;
    let alreadyPoisoned = false;
    let machineUsed = false;
    // Mettre la capsule, l'eau, ou empoisonner la machine à café
    coffeMachine.on('click', async () => {
        if (menuButton7.isActive) {
            if (menuItemCoffePod.isActive) {
                if (!alreadyCoffeFilled) {
                    alreadyCoffeFilled = true;
                }
                // menuContainer.addChild(menuCoverDialogueOverlay);
                menuContainer.removeChild(menuItemCoffePod);
                app.stage.emit('rightdown');
                PIXI.sound.play('podput');
                menuItemCoffePod.destroy();
                await wait(1500);
                // menuContainer.removeChild(menuCoverDialogueOverlay);
                return;
            }
    
            if (menuItemGlassWater.isActive) {
                if (!alreadyWaterFilled) {
                    alreadyWaterFilled = true;
                }
                app.stage.emit('rightdown');
                menuContainer.addChild(menuCoverDialogueOverlay);
                PIXI.sound.play('pouringWater');
                await wait(2500);
                menuContainer.removeChild(menuCoverDialogueOverlay);
    
                spriteSwap(menuContainer, menuItemGlassWater, menuItemGlassWaterEmpty);
                const waterPouredText = new PIXI.Text({ text: "J'ai rempli d'eau le réservoir de la machine", style: dialogueStyle2 });
                waterPouredText.anchor.set(0.5);
                waterPouredText.x = houseContainer.width / 2;
                waterPouredText.y = houseContainer.y + (houseContainer.height * 0.3);
                houseContainer.addChild(waterPouredText);
    
                await wait(2000);
                houseContainer.removeChild(waterPouredText);
                waterPouredText.destroy();
    
                app.stage.emit('rightdown');
                return;
            }
    
            if (menuItemTabletPack.isActive) {
                if (alreadyWaterFilled && alreadyCoffeFilled) {
                    menuContainer.addChild(menuCoverDialogueOverlay);
                    alreadyPoisoned = true;
                    // spriteSwap(menuContainer, menuItemGlassWater, menuItemGlassWaterEmpty);
                    menuContainer.removeChild(menuItemTabletPack);
                    app.stage.emit('rightdown');
                    menuItemCoffePod.destroy();

                    await wait(15000);
                    menuContainer.removeChild(menuCoverDialogueOverlay);
                    return;
                }
            }
    
            if (alreadyPoisoned) {
                if (!machineUsed) {
                    machineUsed = true;
    
                    coffeMachineCutsceneContainer.addChild(coffeMachineCutsceneBG);
                    coffeMachineCutsceneContainer.addChild(coffeMachineClone);
                    coffeMachineCutsceneContainer.addChild(coffeMachineCutsceneBG);
                    coffeMachineCutsceneContainer.addChild(coffeMachineClone);
                    PIXI.sound.play('coffesound');
    
                    await wait(1000);
                    coffeMachine.gotoAndStop(1);
                    coffeMachineClone.gotoAndStop(1);
    
                    await wait(2000);
                    coffeMachineClone.play();
                    coffeMachineClone.loop = false;
                    coffeMachine.play();
                    coffeMachine.loop = false;
    
                    await wait(6000);
                    coffeMachineCutsceneContainer.removeChild(coffeMachineCutsceneBG);
                    coffeMachineCutsceneContainer.removeChild(coffeMachineClone);
                    menuContainer.removeChild(menuItemGlassWaterEmpty);
                    menuContainer.removeChild(menuItemGlassWater);
                    PIXI.sound.play('pickup');
                    menuContainer.addChild(menuItemGlassCoffe);
                    coffeMachine.gotoAndStop(0);
    
                    const successCoffe = new PIXI.Text({ text: "Et voilà le travail !", style: dialogueStyle2 });
                    successCoffe.anchor.set(0.5);
                    successCoffe.x = houseContainer.width / 2;
                    successCoffe.y = houseContainer.y + (houseContainer.height * 0.3);
                    houseContainer.addChild(successCoffe);
    
                    await wait(2000);
                    houseContainer.removeChild(successCoffe);
                    coffeMachineClone.destroy();
                    coffeMachineCutsceneContainer.destroy();
                    successCoffe.destroy();
                    menuItemGlassWaterEmpty.destroy();
                    menuItemGlassWater.destroy();
                }
            }
        }
    });
    

    // Actionner l'interrupteur
    let interrupteurSwitched = false;
    interrupteur.on('click', async () => {
        if (menuButton7.isActive || menuButton8.isActive) {

            if (!interrupteurSwitched) {
            menuContainer.addChild(menuCoverDialogueOverlay);
            PIXI.sound.play('switchOn');
            interrupteur.play();
            interrupteur.gotoAndStop(1); 

            // Démarrage du reste des animations après 1 seconde
        setTimeout(async () => {
            PIXI.sound.play('beefEyeOpen');
            app.stage.emit('rightdown');

        // Ouverture de l'oeil de boeuf
        const innerHouseAsset2 = await PIXI.Assets.load('../sprites/innerhouseopen1.png');
        const innerHouseAsset3 = await PIXI.Assets.load('../sprites/innerhouseopen2.png');
        // const innerHouseAsset4 = await PIXI.Assets.load('../sprites/innerhouseopenend.png');
        const innerHouseAsset4 = await PIXI.Assets.load('../sprites/clearwithtraptrimed.png');
        
        // Crée les sprites une fois les assets chargés
        let innerHouseSprites = [
            new PIXI.Sprite(innerHouseAsset2),
            new PIXI.Sprite(innerHouseAsset3),
            new PIXI.Sprite(innerHouseAsset4)
        ];

        // Affiche le premier sprite
        let currentIndex = 0;
        // Défilement des sprites avec un intervalle de 1 seconde
        let interval = 1000; 

        // Fonction pour changer de sprite après un délai
        function changeSprite(index) {
            if (index < innerHouseSprites.length) {
                innerHouseSprite.texture = innerHouseSprites[index].texture;
                currentIndex = index + 1;
                if (currentIndex >= 2) {
                    // On retire la teinte du chest et on l'active
                    chest.tint = 0xFFFFFF;
                    chest.interactive = true;
                }
                if (currentIndex < innerHouseSprites.length) {
                    setTimeout(() => changeSprite(currentIndex), interval);
                }

                if (currentIndex === 3) {
                    setTimeout(() => {
                        let beefEyeOpened;
                        playerNewText(beefEyeOpened, "Eh, il y a un coffre dans le grenier !")
                        menuContainer.removeChild(menuCoverDialogueOverlay);
                }, 1000); 
                }
            }
        }
        // Démarre le défilement des sprites
        changeSprite(currentIndex);
        interrupteurSwitched = true;
        // on désactive l'interrupteur
        interrupteur.interactive = false;
                }, 1000);
        }
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
    const stopPosition = innerHouseSprite.width * positionFactor;
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
// Méthode version 416
function unroll416() {
    innerHouseContainer.removeChild(toilePoulie);
        PIXI.sound.play('unroll');
        // console.log('son JOUE');
        innerHouseContainer.addChild(toilePoulie416);
        toilePoulie416.animationSpeed = 0.035;
        toilePoulie416.interactive = true;
        toilePoulie416.gotoAndPlay(0);
        toilePoulie416.loop = false;
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

// METHODE POUR AFFICHER L'ACHIEVEMENT

let achievementTicker;
async function showAchievement() {
    const achievementAsset = await PIXI.Assets.load('../sprites/achievement.png');
    const achievement = new PIXI.Sprite(achievementAsset);
    achievement.eventMode = "none";
    achievement.zIndex = 9999;
    screenBackgroundContainer.addChild(achievement);

    const scaleFactorAchievement = Math.min(
        window.innerWidth * 0.0005,
        window.innerHeight * 0.0005
    );
    achievement.scale.set(scaleFactorAchievement);
    achievement.x = window.innerWidth - achievement.width;
    achievement.y = window.innerHeight;

    const stopPositionY = window.innerHeight - achievement.height - 20;
    const speed = 7;

    // Montée
    await new Promise((resolve) => {
        achievementTicker = new PIXI.Ticker();
        achievementTicker.add(() => {
            achievement.y -= speed;
            if (achievement.y <= stopPositionY) {
                achievement.y = stopPositionY;
                achievementTicker.stop();
                resolve();
            }
        });
        achievementTicker.start();
    });

    await wait(3000);

    // Descente
    await new Promise((resolve) => {
        achievementTicker = new PIXI.Ticker();
        achievementTicker.add(() => {
            achievement.y += speed;
            if (achievement.y >= window.innerHeight) {
                achievement.y = window.innerHeight;
                achievementTicker.stop();
                achievementTicker.destroy();
                resolve();
            }
        });
        achievementTicker.start();
    });

    // Destruction
    achievement.destroy();
}

// glasswater.on('click', () => {
//     showAchievement();
//     menuContainer.addChild(menuItemDisquette);
//     console.log("done");
// });

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
            await new Promise(async (resolve) => {
                menuContainer.addChild(menuCoverDialogueOverlay);

                // Si c’est un tableau, on enchaîne les réponses
                const responses = Array.isArray(response.guybrushResponse)
                    ? response.guybrushResponse
                    : [response.guybrushResponse];

                for (const reply of responses) {
                    const guybrushResponseText = new PIXI.Text({ text: reply, style: dialogueStyle });
                    guybrushResponseText.anchor.set(0.5);
                    guybrushResponseText.zIndex = 4;
                    guybrushResponseText.x = guybrushSO.x + (guybrushSO.width / 2);
                    guybrushResponseText.y = guybrushSO.y - guybrushSO.height;

                    innerHouseContainer.addChild(guybrushResponseText);
                    spriteSwap(innerHouseContainer, guybrushSO, guybrushSOT);
                    setPosition(guybrushSOT, 0.22, 0.68);

                    await new Promise((r) => {
                        setTimeout(() => {
                            guybrushResponseText.destroy();
                            spriteSwap(innerHouseContainer, guybrushSOT, guybrushSO);
                            r();
                        }, 4000);
                    });
                }

                menuContainer.removeChild(menuCoverDialogueOverlay);
                resolve();
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

// FONCTION CLICKBLOCKER qui ajoute un masque invisible pour bloquer les clics momentanément
function toggleClickBlocker() {
    const blocker = app.stage.getChildByName("ClickBlocker");
    
    if (blocker) {
        blocker.destroy();
    } else {
        const clickBlockerLayer = new PIXI.Graphics()
            .fill(0, 0)
            .rect(0, 0, app.screen.width, app.screen.height)
            .endFill();
        
        clickBlockerLayer.interactive = true;
        clickBlockerLayer.cursor = "none";
        clickBlockerLayer.zIndex = 9999;
        clickBlockerLayer.label = "ClickBlocker";

        app.stage.addChild(clickBlockerLayer);
        app.stage.sortChildren();
    }
}

// toggleClickBlocker();
// toggleClickBlocker();

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

// METHODE TERMINAL

async function displayTerminalAndChestCutscene() {
// FONCTIONNEMENT DU TERMINAL
    // Champ d'affichage du mot de passe
    const terminalFontSize = terminal.height * 0.053;
    let currentInput = '';
    const inputText = new PIXI.Text({
        text: '_',
        style: {
            fontFamily: 'Digital7',
            fontSize: terminalFontSize,
            fill: 0x80FF80
        }
    });
    
    inputText.x = terminal.x + terminal.width * 0.255;
    inputText.y = terminal.y + terminal.height * 0.55;
    inputText.zIndex = 13;
    inputText.scale.y = 1.1;
    inputText.scale.x = 0.9;
    specialScreenContainer.addChild(inputText);

    let showCursor = true;
    
    // Fonction de mise à jour visuelle
    function terminalUpdateDisplay() {
        const spaced = currentInput.split('').join(' ');
        let cursor = '';
        if (currentInput.length < 12 && showCursor) {
            cursor = ' _';
        }
        inputText.text = spaced + cursor;
    }

    // Curseur clignotant
    setInterval(() => {
        showCursor = !showCursor;
        terminalUpdateDisplay();
    }, 500);

    // Fonction d'écoute de l'événement keydown
    function handleKeydown(e) {
        const key = e.key;

        // Cas validation
        if (key === 'Enter') {  
            console.log('Mot de passe entré :', currentInput);
            // Vérification du mot de passe
            if (currentInput.toLowerCase() === "tezcatlipoca") {
                
                PIXI.sound.play('passwordValid');
                PIXI.sound.stop('nighttheme');
                PIXI.sound.stop('daytheme');

                setTimeout(() => { // recalage d'un léger délai au départ du sound
                    specialScreenContainer.addChild(greenled); 
                }, 400);

                setTimeout(() => {
                    specialScreenContainer.removeChild(greenled);
                }, 3000);

                setTimeout(() => {
                    specialScreenContainer.removeChild(terminal);
                    specialScreenContainer.removeChild(inputText);
                    specialScreenContainer.addChild(terminalPS);
                    specialScreenContainer.addChild(pendingLogo);
                    setTimeout(() => {
                        specialScreenContainer.addChild(greenled);
                    }, 2500);
                    setTimeout(() => {
                        specialScreenContainer.removeChild(greenled);
                    }, 5000);
                    setTimeout(() => {
                        specialScreenContainer.addChild(greenled);
                    }, 7000);
                }, 3000);

                setTimeout(() => {
                    transitionVolet();
                }, 10000);

                setTimeout(() => {
                    PIXI.sound.stop('passwordValid');
                    PIXI.sound.play('ewstheme', { loop: true });
                }, 110000);

                console.log("Mot de passe correct");

                // Retirer l'écouteur d'événements après la validation
                window.removeEventListener('keydown', handleKeydown);
            } else {
                specialScreenContainer.addChild(yellowled);
                PIXI.sound.play('accessDenied');
                setTimeout(() => {
                    specialScreenContainer.removeChild(yellowled);
                }, 500);
                console.log("Mot de passe incorrect");
            }
            return;
        }

        // Cas suppression
        if (key === 'Backspace' || key === 'Delete' || key === 'ArrowLeft') {
            currentInput = currentInput.slice(0, -1);
            PIXI.sound.play('deleteinput');
            terminalUpdateDisplay();
            return;
        }

        // Vérification caractère autorisé (lettres uniquement)
        if (/^[a-zA-Z0-9]$/.test(key)) {
            if (currentInput.length < 12) {
                currentInput += key;
                PIXI.sound.play('input');
                terminalUpdateDisplay();
            }
        }
    }

    // Ajouter l'écouteur d'événements
    window.addEventListener('keydown', handleKeydown);

    async function transitionVolet () {
        const scene1Asset = await PIXI.Assets.load('https://assets.codepen.io/77020/sw-clock-wipe-scene-1.jpg');
        const scene1 = new PIXI.Sprite(scene1Asset);
        const scene1Mask = new PIXI.Graphics();
        scene1.mask = scene1Mask;
    
        const scene2Asset = await PIXI.Assets.load('../sprites/blackbgscreen.jpg');
        const scene2 = new PIXI.Sprite(scene2Asset);
    
        scene1.width = scene2.width = terminalbgSprite.width;
        scene1.height = scene2.height = terminalbgSprite.height;
        scene1.x = scene2.x = terminalbgSprite.x;
        scene1.zIndex = scene2.zIndex = 98;
    
        specialScreenContainer.addChild(scene1, scene2, chestZoom);
    
        const mask = new PIXI.Graphics();
        scene2.mask = mask;
        app.stage.addChild(mask);
    
        let angle = -90;
        let fadeInOpacity = 0;
        let hasTransitionEnded = false;
    
        // Fonction stockée dans une variable
        const transitionTicker = () => {
            const cx = app.screen.width / 2;
            const cy = app.screen.height / 2;
            const radius = Math.max(cx, cy) * 2;
    
            if (angle < 370) {
                angle += 3;
                mask.clear();
                mask.fill(0xffffff);
                mask.moveTo(cx, cy);
    
                for (let a = -90; a <= angle; a += 1) {
                    const rad = a * (Math.PI / 180);
                    mask.lineTo(cx + radius * Math.cos(rad), cy + radius * Math.sin(rad));
                }
    
                mask.lineTo(cx, cy);
                mask.endFill();
            } else {
                if (chestZoom.visible && fadeInOpacity < 1) {
                    fadeInOpacity += 0.01;
                    chestZoom.alpha = fadeInOpacity;
                }
    
                if (!hasTransitionEnded) {
                    hasTransitionEnded = true;
                    chestZoom.visible = true;
                    chestZoom.alpha = 0;
    
                    setTimeout(() => chestZoom.gotoAndStop(1), 3650);
                    setTimeout(() => chestZoom.play(), 5200);
    
                    setTimeout(() => {
                        let fadeOutOpacity = 1;
                        const fadeOutInterval = setInterval(() => {
                            fadeOutOpacity -= 0.01;
                            chestZoom.alpha = fadeOutOpacity;
                            if (fadeOutOpacity <= 0) {
                                chestZoom.visible = false;
                                clearInterval(fadeOutInterval);
                            }
                        }, 16);
                        chest.gotoAndStop(5);
                    }, 12000);
    
                    setTimeout(() => {
                        innerHouseContainer.removeChild(guybrushF);
                        innerHouseContainer.removeChild(bed);
                        innerHouseContainer.addChild(door, bed);
                        app.stage.removeChild(specialScreenContainer);
                        // Retrait des alertes du housecontainer (musique & "?")
                        innerHouseContainer.addChild(metroTicket);
                        houseContainer.removeChild(music);
                        // houseContainer.removeChild(musicActive);
                        houseContainer.removeChild(questionMark);
                    }, 15000);
    
                    setTimeout(() => {
                        spriteSwap(innerHouseContainer, ordiRun, ordi);
                        PIXI.sound.play('doorslam');
                        innerHouseContainer.removeChild(door);
    
                        setTimeout(() => {
                            let successTerminalChestCutscene;
                            playerNewText(successTerminalChestCutscene, "quelqu'un vient de sortir de la pièce", 2000);
    
                            // Nettoyage et suppression du ticker
                            app.ticker.remove(transitionTicker);
    
                            terminalPS.alpha = 0;
                            pendingLogo.alpha = 0;
    
                            scene1.mask = null;
                            app.stage.removeChild(mask);
                            specialScreenContainer.removeChild(scene1, scene2, chestZoom);
                            // scene1.destroy(true);
                            // scene2.destroy(true);
                            // mask.destroy(true);
                            // scene1Mask.destroy(true);
                            scene1Mask.destroy();
                        }, 1000);
                    }, 16000);
                }
            }
        };
    
        app.ticker.add(transitionTicker); // Ajout correct du ticker
    }
}

}