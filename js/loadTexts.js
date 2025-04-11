
export async function loadTexts(sprites) {

    // Sprites
    const { houseContainer, houseSprite, itemClicked, guybrush, guybrushWR, guybrushWL, guybrushLD, guybrushGU, guybrushSO, guybrushSOT, gamingChair, goldkey, gamingChairAR, guybrushIUL, guybrushIUR, boutdemetalShine, ordi, ordiRun, reveil, toilePoulie, toilePoulieRun, menuContainer, menuCoverDialogue, glasswater, chest, menuItemGoldKey, menuItemGlassWaterEmpty, menuItemGlassWater,
        menuButton,
        menuButton2,
        menuButton3,
        menuButton4,
        menuButton5,
        menuButton6,
        menuButton7,
        menuButton8,
        menuButton9,
     } = sprites;

     
    // Heure actuelle
    let currentDate = null;
    let currentHour =  null;
    let currentMinutes =  null;
    let currentTimeHourMinutes = "";

    // Initialisation de la variable de text affiché à l'écran
    let currentText = null;
    // Initialisation de la variable de la séquence de texte affichée à l'écran
    let currentTextSequence = null;

    //////////// METHODES PERMETTANT LE SKIP DU TEXTE ET DES SEQUENCES DE TEXTE LORS D'ACTION SUR LES SPRITES ////////////
    

    // Styles
    const dialogueStyle = { fontFamily: 'MonkeyIsland, arial', fontSize: 25, fill: '#31ACD3', stroke: { color: 'black', width: 6 }, wordWrap: true, wordWrapWidth: 600, lineHeight: 40, align: 'center'}; // Romain-Guybrush Style
    const dialogueStyle2 = { fontFamily: 'MonkeyIsland, arial', fontSize: 25, fill: '#FFFFFF', stroke: { color: 'black', width: 6 }, wordWrap: true, wordWrapWidth: 800, lineHeight: 40}; // Player style
    const responseStyle = { fontFamily: 'arial', fontSize: 20, fill: '#772a76', stroke: { color: 'black', width: 6 }, wordWrap: true, wordWrapWidth: 800, lineHeight: 40}; // Style des réponses lors du dialogue

    // Textes hors action & dialogue
    const wakeUpText = new PIXI.Text({ text: 'Non mais je rêve', style: dialogueStyle });
    const wakeUpText2 = new PIXI.Text({ text: 'T\'es qui toi ? Et pourquoi tu fais sonner mon réveil si tôt ?', style: dialogueStyle });
    const wakeUpText3 = new PIXI.Text({ text: 'Bon si on a fini, moi j\'ai du travail', style: dialogueStyle });
    const startDialogue = new PIXI.Text({ text: 'Oui ?', style: dialogueStyle });


    // DIALOGUE PLAYER - ROMAIN . TABLEAUX DES REPONSES DE ROMAIN
    const wakeUpResponses = [
        {
            text: "Qui es-tu ?",
            guybrushResponse: "Moi c'est Romain Cabanis, enchanté. Ou du moins son avatar",
            reset: true,
            exit: false
        },
        {
            text: "Je suis ici pour voir un portfolio, qu'as-tu à me montrer ?",
            guybrushResponse: "Attends je vais dérouler l'écran tu vas comprendre",
            unrollScreen: true,
            reset: true,
            exit: false
        },
        {
            text: "Etrange comme Portfolio, pourquoi ça ressemble à un jeu vidéo ?",
            guybrushResponse: "C'est pas tes oignons",
            reset: true,
            exit: false
        },
        {
            text: "Bye bye zobi",
            guybrushResponse: "Ouais ouais à plus tard",
            reset: true,
            exit: true,
            // rerollScreen: true,
        }
    ];

    // TEXTE OU ACTION DU JOUEUR LORS DU CLIC SUR UN SPRITE AVEC UN MENUBUTTON ACTIF
    // On regroupe nos boutons d'action
    const menuButtonsArray = [menuButton, menuButton2, menuButton3, menuButton4, menuButton5, menuButton6, menuButton7, menuButton8, menuButton9]; 
    // Pour tous les sprites interactifs...
    const interactableSprites = [guybrushSO, guybrushLD, toilePoulie, toilePoulieRun, reveil, ordi, ordiRun, gamingChair, glasswater, menuItemGlassWater, menuItemGlassWaterEmpty, chest, goldkey, menuItemGoldKey, boutdemetalShine];
    // ... Chacun possède des actions
    const spriteBehaviors = {
        guybrushSO: {
            regarder: ["Il semble être le maître de ces lieux", "De toute évidence il est extrêmement musclé", "Pourtant, je ne vois aucune haltère dans cette maison", "Curieux..."],
            parler: ""
        },
        guybrushLD: {
            regarder: "il dort profondément",
            parler: ["Eh ho !",
                "Rien à faire, il dort comme une enclume"
            ],
            pousser: ["Si je le bouscule un peu trop, j'ai peur qu'il le prenne mal à son réveil",
                "Et puis avec autant de muscles il doit peser au moins une tonne"
            ],
            tirer: ["Si je le bouscule un peu trop, j'ai peur qu'il le prenne mal à son réveil",
                "Et puis avec autant de muscles il doit peser au moins une tonne"
            ],
            utiliser: "",
        },
        toilePoulieRun: {
            prendre: "Si je lui déchire son petit home cinéma, il risque de pas être très content.",
            regarder: [
            "Voyons voir...",
            "Hey Romain, si j'ai une question tu es là ?"
        ]
        },
        ordiRun: {
            ouvrir: "L'ordinateur est déjà démarré",
            utiliser: "Voyons voir...",
            fermer: "Pas sûr qu'il apprécie",
            regarder: "Sous l'écran il y a une interstice qui semble pouvoir accueillir une disquette",
            prendre: [
                "Trimballer cette épave ? Non merci.",
                "Cette machine date de Mathusalem, même sur leboncoin j'en tire même pas 50 euros",
                "Comment fait-il pour coder là-dessus ??"
            ]
        },
        ordi: {
            utiliser: "Aucune idée de comment allumer ce truc",
            ouvrir: "L'ordinateur s'allume avec un bruit de ventilateur.",
            fermer: "L'ordinateur est déjà éteint",
            regarder: ["L'ordinateur est éteint", "Sous l'écran il y a une interstice qui semble pouvoir accueillir une disquette", "Mais de quand date ce truc ?"],
            prendre:
            [
                "Trimballer cette épave ? Non merci.",
                "Cette machine date de Mathusalem, même sur leboncoin j'en tire même pas 50 euros",
                "Comment fait-il pour coder là-dessus ??"
            ]
        },
        reveil: {
            utiliser: "Eh t'as assez ronflé coco !",
            regarder:  ["1"] // Action changeante dynamiquement
        },
        glasswater: {
            utiliser: "Non merci je n'ai pas soif",
            regarder: "Le verre est rempli d'eau",
            prendre: "Je vais prendre ça"
        },
        gamingChair: {
            utiliser: [
                "Non merci",
                "Savoir que l'individu qui habite cette cabane passe littéralement TOUTES ses journées les fesses collées sur ce fauteuil ne me tente pas du tout."
            ],
            regarder:  [
                "À en juger par son allure, la bête n'est plus toute jeune",
                "Le dossier du fauteuil est tellement usé qu'il en tombe des miettes de skaï sur le sol"
            ],
            pousser:  "Je le trouve déjà très bien là où il est",
            tirer:  "Je le trouve déjà très bien là où il est",
        },
        chest: {
            regarder:  [
                "Eh !",
                "On dirait un coffre en métal, avec une serrure électronique"
            ],
            utiliser: [
                "Impossible, il est fermé",
                "Et encore faudrait-il trouver un moyen de l'atteindre"
            ],
            ouvrir: "Tant que je n'aurai pas trouvé le moyen de le déverrouiller, je ne pourrai pas l'ouvrir",
            fermer: "Il est déjà fermé",
        },
        goldkey: {
            regarder: "une petite clé dorée est posée sur l'armoire",
            prendre: [
                "Toi, dans ma poche",
                "Je me demande ce qu'elle peut bien ouvrir ?"
            ],
            utiliser : "",
        },
        boutdemetalShine: {
            regarder: "Un bout de métal assez fin s'est détaché du meuble lorsque j'ai refermé le tiroir",
            prendre: "ça pourra toujours m'être utile",
            utiliser : "",
        },
        menuItemGoldKey: {
            utiliser: "",
            regarder: "Je me demande ce qu'elle peut bien ouvrir ?",
            item: true,
        },
        menuItemGlassWater: {
            utiliser: "NO",
            regarder: "Le verre est rempli d'eau",
            item: true,
        },
        menuItemGlassWaterEmpty: {
            utiliser: "NO",
            regarder: "Le verre est vide",
            item: true,
        },


    };

    // Pour tous les sprites interactifs à l'écran
    interactableSprites.forEach(interactableSprite => {
                    // On définit tous les sprites interactifs comme "non cliqué" au départ
                    interactableSprite.clicked = false;

                    // Lorsqu'on clic sur un sprite, il devient ".clicked === true"
                    interactableSprite.on('click', async () => {
                            // On empêche plusieurs clics simultanés, si le sprite est déjà cliqué, on retourne
                            if (!interactableSprite.clicked) {
                                interactableSprite.clicked = true;
                            }
                            await spriteActionPlayerText();

                        // Une fois le sprite cliqué, on le repasse immédiatement en false
                        interactableSprite.clicked = false;
                        // console.log (interactableSprite.label, interactableSprite.clicked, 'exécuté');
                    });
    });

    // Méthode permettant d'ajouter divers ajout de texte en fonction du sprite cliqué
    async function spriteActionPlayerText() {
        const activatedMenuButton = menuButtonsArray.find(button => button.isActive === true); // Cherche quel est le bouton d'action actif
        const clickedSprite = interactableSprites.find(sprite => sprite.clicked === true); // Cherche quel est le sprite cliqué
    
        // Si un bouton d'action est actif et qu'un sprite interagissable est cliqué
        if (activatedMenuButton && clickedSprite) {
            // On récupère le comportement spécifique pour ce sprite et cette action
            const spriteName = clickedSprite.label; // Le nom du sprite
            const action = activatedMenuButton.action; // L'action associée au menuButton activé
            
            // Si le sprite fait partie des sprites interagissables et qu'il possède une action (même si cette action est vide)
            if (spriteBehaviors[spriteName] && (spriteBehaviors[spriteName][action] || spriteBehaviors[spriteName][action] === "")) {
          
                            // EXCEPTION de comportement pour le sprite réveil-matin avec l'action "regarder"
                            if (spriteBehaviors[spriteName][action] === spriteBehaviors.reveil.regarder) {
                            currentDate = new Date();
                            currentHour =  currentDate.getHours();
                            currentMinutes =  currentDate.getMinutes();
                            currentTimeHourMinutes = `${currentHour}:${currentMinutes}`;
                            
                            if (currentHour >= 11 && currentHour < 22) {
                                spriteBehaviors.reveil.regarder = [
                                    `Le réveil-matin indique ${currentTimeHourMinutes}`,
                                    "Et il dort toujours ???"
                                ];
                            } else if (currentHour >= 22 || currentHour < 6) {
                                spriteBehaviors.reveil.regarder = [
                                    `Le réveil-matin indique ${currentTimeHourMinutes}`,
                                    "Hmmm, il fait encore nuit, normal qu'il dorme à cette heure"
                                ];
                            } else {
                                // Entre 6h et 11h
                                spriteBehaviors.reveil.regarder = [
                                    `Le réveil-matin indique ${currentTimeHourMinutes}`,
                                    "Il ne devrait pas tarder à se réveiller"
                                ];
                            }
                        }
                
                        // Alors on définit l'action qui va être exécutée (ex texte : "l'ordinateur est éteint")
                        const actionEvent = spriteBehaviors[spriteName][action];

                        // Si cette action n'est pas un simple TEXTE, mais une véritable ACTION COMPLEXE (fonction)
                        if (typeof actionEvent === "function") {
                            const result = response();
                            await displayText(result, 1000); // On joue l'action
                            // activatedMenuButton.isActive === false;

                        // Si l'actionEvent n'est pas un simple TEXTE, mais un plusieurs LIGNES DE TEXTES
                        } else if (Array.isArray(actionEvent)) {
                            await displayTextSequence(actionEvent, 1000); // On affiche la séquence entière

                        // Si l'actionEvent est une simple ligne de TEXTE, alors on l'affiche
                        } else {
                            await displayText(actionEvent, 1000); // On affiche le texte
                            // activatedMenuButton.isActive === false;
                        }

            // Si le sprite n'a pas d'action prévue...
            } else {
                    await displayText("Non, ça ne marchera pas.", 3000); 
            }

        } 
    }

  
    // METHODE QUI AFFICHE LES REACTIONS DU JOUEUR 
    function displayText(text, time) {
        return new Promise(resolve => {
            
        // Détruit la précédente ligne de réaction (Seulement Ok s'il n'y a qu'une ligne de réaction)
        if (currentText) {
            currentText.destroy();
        }
        currentText = new PIXI.Text({ text: text, style: dialogueStyle2 });
        currentText.anchor.set(0.5);
        currentText.zIndex = 99;
        currentText.x = houseContainer.width / 2 ;
        currentText.y = houseContainer.y + (houseContainer.height * 0.3);
        houseContainer.addChild(currentText);
        setTimeout(() => {
            currentText.destroy();
            resolve();
        }, time);
    });
    }

    // METHODE QUI AFFICHE LES REACTIONS DU JOUEUR SI IL Y EN A PLUS D'UNE
    async function displayTextSequence(textSequence, time) {

         // Vérifie et annule une séquence précédente si elle existe
        if (currentTextSequence) {
            console.log("Séquence en cours, arrêt et suppression de la précédente");
            currentTextSequence = null;  // Réinitialiser la séquence précédente
        }

        // Lancer la nouvelle séquence
        for (let i = 0; i < textSequence.length; i++) {
            const text = textSequence[i];
            // Vérifier si la séquence a été annulée
            if (currentTextSequence && currentTextSequence.canceled) {
                console.log("Séquence annulée.");
                return;
            }

        // Affichage du texte actuel
            await displayText(text, time);
        }

        // Séquence terminée
        currentTextSequence = null;
        console.log("Séquence terminée, currentTextSequence remis à null");

        // if (currentTextSequence) {
        //     console.log("Séquence en cours, arrêt et suppression de la précédente");
        //     currentTextSequence = null;  // Réinitialiser la séquence précédente
        // }
    
        // // Lancer la nouvelle séquence
        // for (let i = 0; i < textSequence.length; i++) {
        //     const text = textSequence[i];
        //     // Vérifier si la séquence a été annulée par un autre processus
        //     if (currentTextSequence && currentTextSequence.canceled) {
        //         console.log("Séquence annulée.");
        //         return;
        //     }
    
        //     // Affichage du texte actuel
        //     await displayText(text, time);
        // }
    
        // // Séquence terminée
        // currentTextSequence = null;
        // console.log("Séquence terminée, currentTextSequence remis à null");


        // // Création d'une référence unique pour la séquence
        // currentTextSequence = { canceled: false };

        // for (let i = 0; i < textSequence.length; i++) {
        //     const text = textSequence[i];
        //     // Si une nouvelle séquence est démarrée, arrêter l'ancienne
        //     if (currentTextSequence && currentTextSequence.canceled) {
        //         console.log("Séquence annulée.");
        //         return;
        //     }
        //     await displayText(text, time);
        // }
        // // Séquence terminée
        // currentTextSequence = null;
        // console.log("currentTextSequence remis à null", currentTextSequence)
    }

    console.log(menuItemGlassWater.label)

    return {
        wakeUpText,
        wakeUpText2,
        wakeUpText3,
        startDialogue,
        wakeUpResponses,
        responseStyle,
        dialogueStyle,
        dialogueStyle2,
    };

}