
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

    const menuButtonsArray = [menuButton, menuButton2, menuButton3, menuButton4, menuButton5, menuButton6, menuButton7, menuButton8, menuButton9];
    const interactableSprites = [guybrushSO, guybrushLD, toilePoulie, toilePoulieRun, reveil, ordi, ordiRun];

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
        // Si un bouton d'action (n'importe lequel) est true et qu'on clique sur un sprite
        if ((menuButtonsArray.some(button => button.isActive)) && interactableSprites.some(sprite => sprite.clicked)) {
        // Comportement du joueur par défaut "Non, ça ne marchera pas"
            console.log("Non, ça ne marchera pas");
            let negativeResponse = new PIXI.Text("Non, ça ne marchera pas", dialogueStyle2);
            negativeResponse.anchor.set(0.5);
            negativeResponse.x = houseSprite.x + (houseSprite.width / 2);
            negativeResponse.y = houseSprite.y + (houseSprite.height * 0.3);
            houseContainer.addChild(negativeResponse);
            setTimeout(() => {
                houseContainer.removeChild(negativeResponse)
            }, 2000);
        } else {
            console.log("Aucun bouton n'est actif.");
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