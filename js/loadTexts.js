
export async function loadTexts(sprites) {

    // Promesse "délai"
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    // Sprites
    const { houseContainer, houseSprite, guybrush, guybrushWR, guybrushWL, guybrushLD, guybrushGU, guybrushSO, guybrushSOT, gamingChairAR, guybrushIUL, guybrushIUR, ordi, ordiRun, reveil, toilePoulie, toilePoulieRun, menuContainer, menuCoverDialogue,
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
    // Guybrush Style
    const dialogueStyle = { fontFamily: 'MonkeyIsland, arial', fontSize: 25, fill: '#31ACD3', stroke: 'black', strokeThickness: 6, wordWrap: true, wordWrapWidth: 800, lineHeight: 40};
    // Player style
    const dialogueStyle2 = { fontFamily: 'MonkeyIsland, arial', fontSize: 25, fill: '#FFFFFF', stroke: 'black', strokeThickness: 6, wordWrap: true, wordWrapWidth: 800, lineHeight: 40};
    const responseStyle = { fontFamily: 'arial', fontSize: 20, fill: '#772a76', stroke: 'black', strokeThickness: 6, wordWrap: true, wordWrapWidth: 800, lineHeight: 40};

    // Ajouter un nouvel étément texte
    function textConfig(textContent, style) {
        const guybrushText = new PIXI.Text(textContent, style);
        guybrushText.anchor.set(0.5);
        return guybrushText; 
    }

    const wakeUpText = textConfig('Non mais je rêve', dialogueStyle);
    const wakeUpText2 = textConfig('T\'es qui toi ? Et pourquoi tu fais sonner mon réveil si tôt ?', dialogueStyle);
    const wakeUpText3 = textConfig('Bon si on a fini, moi j\'ai du travail', dialogueStyle);
    const startDialogue = textConfig('Oui ?', dialogueStyle);

    let responseText = null;

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
            exit: true
        }
    ];

    // REPONSES DU JOUEUR LORS DE CLICK SUR UN SPRITE AVEC ACTION

    const menuButtonsArray = [menuButton, menuButton2, menuButton3, menuButton4, menuButton5, menuButton6, menuButton7, menuButton8, menuButton9]; // Pas de menuButton5
    const interactableSprites = [guybrushSO, guybrushLD, toilePoulie, toilePoulieRun, reveil, ordi, ordiRun];
    
    const spriteBehaviors = {
        guybrushSO: {
            regarder: "C'est un gars plutôt charmant.",
            parler: ""
        },
        toilePoulieRun: {
            prendre: "Si je lui déchire son petit home cinéma, il risque de pas être très content.",
            regarder: [
            "Voyons ce portfolio d'un peu plus près...",
            "On dirait qu'il y a beaucoup de détails !",
            "Il semble vraiment travailler dur sur ce projet."
        ]
        },
        ordiRun: {
            ouvrir: "L'ordinateur s'allume avec un bruit de ventilateur.",
            utiliser: "Tu lances une application qui affiche : 'Portfolio'.",
            fermer: "Pas sûr qu'il apprécie",
            regarder: "Je rêve ou il code sur un minitel ?",
            prendre: [
                "Trimballer cette épave ? Non merci.",
                "Cette machine a au moins 40 ans, même un Minitel me semble plus performant",
                "Il parvient vraiment à coder là-dessus ??"
            ]
        },
        ordi: {
            utiliser: "Tu lances une application qui affiche : 'Portfolio'.",
            ouvrir: "L'ordinateur s'allume avec un bruit de ventilateur.",
            fermer: "L'ordinateur est déjà éteint",
            regarder: "L'ordinateur est éteint. On dirait qu'il y a une petite interstice pouvant accueillir une disquette",
            prendre:
            [
                "Trimballer cette épave ? Non merci.",
                "Cette machine a au moins 40 ans, même un Minitel semble plus performant",
                "Il parvient vraiment à coder là-dessus ??"
            ]
        }
    };

    interactableSprites.forEach(sprite => {
        sprite.clicked = false;
    
        sprite.on('pointerdown', () => {
            sprite.clicked = true;
            console.log("sprite cliqué");

            spriteActionPlayerText();
            textConfig("",dialogueStyle2)

            setTimeout(() => {
            sprite.clicked = false;
            }, 100);
        });
    });


    function spriteActionPlayerText() {
       
        const activeButton = menuButtonsArray.find(button => button.isActive);
        const clickedSprite = interactableSprites.find(sprite => sprite.clicked);
    
        if (activeButton && clickedSprite) {
            // Récupère le comportement spécifique pour ce sprite et cette action
            const spriteName = clickedSprite.name;
            const action = activeButton.action;
            
            // (lors du clic) Si on constate que dans l'objet spriteBehaviors, il existe le sprite et qu'il possède une action, alors on affiche cette réponse (ou méthode) 
            if (spriteBehaviors[spriteName] && spriteBehaviors[spriteName][action]) {
                // Action définie pour ce sprite
                const response = spriteBehaviors[spriteName][action];
                // On utilise la fonction pour afficher le texte
                if (Array.isArray(response)) {
                    // Si c'est une liste de dialogues, les afficher en séquence
                    displayDialogueSequence(response, 3000);
                } else {
                    // Sinon, afficher un seul dialogue
                    displayDialogue(response, 3000);
                }
            } else {
                // Comportement par défaut si aucune action définie
                displayDialogue("Non, ça ne marchera pas.");
            }
        } else {
            // console.log("Aucun bouton actif ou aucun sprite cliqué.");
            return;
        }
    }

    // METHODE QUI AFFICHE LE DIALOGUE DU JOUEUR (A ROMAIN et DANS SA TÊTE)
    function displayDialogue(text, time) {
        return new Promise(resolve => {
        let dialogue = new PIXI.Text(text, dialogueStyle2);
        dialogue.anchor.set(0.5);
        dialogue.x = houseSprite.x + (houseSprite.width / 2);
        dialogue.y = houseSprite.y + (houseSprite.height * 0.3);
        houseContainer.addChild(dialogue);
        setTimeout(() => {
            houseContainer.removeChild(dialogue);
            resolve();
        }, time);
    });
    }

    // METHODE QUI AFFICHE LES LIGNES DE DIALOGUE DU JOUEUR SI IL Y EN A PLUS D'UNE
    async function displayDialogueSequence(dialogues, delay = 3000) {
        for (const text of dialogues) {
            await displayDialogue(text, delay);
        }
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