
export async function loadTexts(sprites) {

    // Heure actuelle
    let currentDate = null;
    let currentHour =  null;
    let currentMinutes =  null;
    let currentTimeHourMinutes = "";

    // Sprites
    const { houseContainer, houseSprite, itemClicked, guybrush, guybrushWR, guybrushWL, guybrushLD, guybrushGU, guybrushSO, guybrushSOT, gamingChair, goldkey, gamingChairAR, guybrushIUL, guybrushIUR, ordi, ordiRun, reveil, toilePoulie, toilePoulieRun, menuContainer, menuCoverDialogue, glasswater, chest, menuItemGoldKey, menuItemGlassWaterEmpty, menuItemGlassWater,
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

    // Constantes style texte
    // Romain/Guybrush Style
    const dialogueStyle = { fontFamily: 'MonkeyIsland, arial', fontSize: 25, fill: '#31ACD3', stroke: { color: 'black', width: 6 }, wordWrap: true, wordWrapWidth: 800, lineHeight: 40};
    // Player style
    const dialogueStyle2 = { fontFamily: 'MonkeyIsland, arial', fontSize: 25, fill: '#FFFFFF', stroke: { color: 'black', width: 6 }, wordWrap: true, wordWrapWidth: 800, lineHeight: 40};
    const responseStyle = { fontFamily: 'arial', fontSize: 20, fill: '#772a76', stroke: { color: 'black', width: 6 }, wordWrap: true, wordWrapWidth: 800, lineHeight: 40};

    // Ajouter un nouvel étément texte
    function textConfig(textContent, style) {
        const guybrushText = new PIXI.Text({ text: textContent, style: style });
        // guybrushText.anchor.set(0.5);
        guybrushText.zIndex = 99;
        return guybrushText; 
    }

    const wakeUpText = textConfig('Non mais je rêve', dialogueStyle);
    const wakeUpText2 = textConfig('T\'es qui toi ? Et pourquoi tu fais sonner mon réveil si tôt ?', dialogueStyle);
    const wakeUpText3 = textConfig('Bon si on a fini, moi j\'ai du travail', dialogueStyle);
    const startDialogue = textConfig('Oui ?', dialogueStyle);

    // TABLEAUX DES REPONSES DE GUYBRUSH
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
            rerollScreen: true,
        }
    ];

    // REPONSES DU JOUEUR LORS DE CLICK SUR UN SPRITE AVEC ACTION

    const menuButtonsArray = [menuButton, menuButton2, menuButton3, menuButton4, menuButton5, menuButton6, menuButton7, menuButton8, menuButton9]; 
    const interactableSprites = [guybrushSO, guybrushLD, toilePoulie, toilePoulieRun, reveil, ordi, ordiRun, gamingChair, glasswater, menuItemGlassWater, menuItemGlassWaterEmpty, chest, goldkey, menuItemGoldKey];
    
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
            utiliser: "Je dois d'abord l'allumer",
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
            regarder:  ["1"]
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
            utiliser : "omagad",
        },
        menuItemGoldKey: {
            utiliser: "booga",
            regarder: "Je me demande ce qu'elle peut bien ouvrir ?",
            item: true,
        },
        menuItemGlassWater: {
            utiliser: "",
            regarder: "Le verre est rempli d'eau",
            item: true,
        },
        menuItemGlassWaterEmpty: {
            utiliser: "",
            regarder: "Le verre est vide",
            item: true,
        },


    };

    // Pour tous les éléments du tableau des sprites interactifs
    interactableSprites.forEach(interactableSprite => {
                    // On définit les sprites en "non cliqué" par défaut
                    interactableSprite.clicked = false;

                    // lors du clic sur le sprite, il devient cliqué
                    interactableSprite.on('click', async () => {
                        // On empêche plusieurs clics simultanés
                        if (interactableSprite.clicked) return;

                        interactableSprite.clicked = true;
                        // Puis on applique la série d'instructions de la méthode qui gère les différentes réactions
                        try {
                            // Si une séquence en cours existe, on l'annule 
                             if (currentReactionSequence) {
                                 currentReactionSequence.canceled = true; // Annule la séquence en cours
                             }

                        // Déplacé avant l'appel à la méthode pour éviter les conflits
                        // interactableSprite.clicked = false;     

                        await spriteActionPlayerText();
                        } catch (error) {
                            console.error("Erreur lors de l'exécution de l'action du sprite", error);
                        } finally {

                        interactableSprite.clicked = false;
                        }
                    });
    });

    // Méthode permettant d'ajouter divers dialogues en fonction du sprite cliqué
    async function spriteActionPlayerText() {

        const activeButton = menuButtonsArray.find(button => button.isActive);
        const clickedSprite = interactableSprites.find(sprite => sprite.clicked);
    
        if (activeButton && clickedSprite) {
            // Récupère le comportement spécifique pour ce sprite et cette action
            const spriteName = clickedSprite.label;
            const action = activeButton.action;

        // Annulation d'une ancienne séquence
        if (currentReactionSequence) {
            currentReactionSequence.canceled = true;
            currentReactionSequence = null;  // Réinitialisation après annulation
        }
            
            // (lors du clic) Si on constate que dans l'objet spriteBehaviors, il existe le sprite et qu'il possède une action, alors on affiche cette réponse (ou méthode) 
            if (spriteBehaviors[spriteName] && (spriteBehaviors[spriteName][action] || spriteBehaviors[spriteName][action] === "")) {
          
                // Exception de comportement pour le réveil-matin
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

                // Action définie pour ce sprite
                const response = spriteBehaviors[spriteName][action];

                if (typeof response === "function") {
                    // Exécute la fonction et récupère son résultat
                    const result = response();
                    await displayReaction(result, 3000);

                // On utilise la fonction pour afficher le texte
                } else if (Array.isArray(response)) {
                    // Si c'est une liste de dialogues, les afficher en séquence
                    await displayReactionSequence(response, 3000);
                } else {
                    // Sinon, afficher un seul dialogue
                    await displayReaction(response, 3000);
                }
            } else {
                    await displayReaction("Non, ça ne marchera pas.", 3000); 
            }
        } else {
            // console.log("Aucun bouton actif ou aucun sprite cliqué.");
            return;
        }
    }

    // Références globales de ligne de dialogue (réaction) et séquences de dialogues (réactions)
    let dialogue = null;
    let currentReactionSequence = null;
    // METHODE QUI AFFICHE LES REACTIONS DU JOUEUR 
    function displayReaction(text, time) {
        return new Promise(resolve => {
            
        // Détruit la précédente ligne de réaction (Seulement Ok s'il n'y a qu'une ligne de réaction)
        if (dialogue) {
            dialogue.destroy();
        }
        dialogue = new PIXI.Text({ text: text, style: dialogueStyle2 });
        dialogue.anchor.set(0.5);
        dialogue.zIndex = 99;
        dialogue.x = houseContainer.width / 2 ;
        dialogue.y = houseContainer.y + (houseContainer.height * 0.3);
        houseContainer.addChild(dialogue);
        setTimeout(() => {
            dialogue.destroy();
            resolve();
        }, time);
    });
    }

    // SOLUTION !! DECOMMENTER ET REVOIR LA LOGIQUE DU SKIP DIALOGUE

    // METHODE QUI AFFICHE LES REACTIONS DU JOUEUR SI IL Y EN A PLUS D'UNE
    async function displayReactionSequence(dialogues, delay = 3000) {
        // Création d'une référence unique pour la séquence
        currentReactionSequence = { canceled: false };
        // const sequence = { canceled: false };
        // currentReactionSequence = sequence;

        for (const text of dialogues) {
                // Si une nouvelle séquence est démarrée, arrêter l'ancienne
                if (currentReactionSequence.canceled) {
                // if (currentReactionSequence?.canceled) {
                    // if (currentReactionSequence !== sequence) {
                    console.log("Séquence annulée.");
                    return;
                }

            await displayReaction(text, delay);

            // if (currentReactionSequence.canceled) {
            //     // if (currentReactionSequence !== sequence) {
            //     console.log("Séquence annulée.");
            //     return;
            // }
        }
        // Séquence terminée
        currentReactionSequence = null;
    }

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