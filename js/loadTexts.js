
export async function loadTexts(sprites) {

    // Promesse "délai"
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    // Sprites
    const { houseContainer, houseSprite, guybrush, guybrushWR, guybrushWL, guybrushLD, guybrushGU, guybrushSO, guybrushSOT, gamingChairAR, guybrushIUL, guybrushIUR, ordi, ordiRun, toilePoulie, toilePoulieRun, menuContainer, menuCoverDialogue } = sprites;

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
            exit: false,
        },
        {
            text: "Je suis ici pour voir un portfolio, qu'as-tu à me montrer ?",
            guybrushResponse: "Attends je vais dérouler l'écran tu vas comprendre",
            reset: true,
            exit: false,
        },
        {
            text: "Etrange comme Portfolio, pourquoi ça ressemble à un jeu vidéo ?",
            guybrushResponse: "C'est pas tes oignons",
            reset: true,
            exit: false,
        },
        {
            text: "Bye bye zobi",
            guybrushResponse: "Ouais ouais à plus tard",
            reset: true,
            exit: true,
        }
    ];


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