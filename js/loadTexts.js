
export async function loadTexts(sprites) {

    const { houseContainer, houseSprite, guybrush, guybrushWR, guybrushWL, guybrushLD, guybrushGU, guybrushSO, guybrushSOT, gamingChairAR, guybrushIUL, guybrushIUR, ordi, ordiRun, toilePoulie, toilePoulieRun, menuContainer, menuCoverDialogue } = sprites;

    const dialogueStyle = { fontFamily: 'MonkeyIsland, arial', fontSize: 25, fill: '#31ACD3', stroke: 'black', strokeThickness: 6, wordWrap: true, wordWrapWidth: 800, lineHeight: 40};
    const responseStyle = { fontFamily: 'arial', fontSize: 25, fill: '#31ACD3', stroke: 'black', strokeThickness: 6, wordWrap: true, wordWrapWidth: 800, lineHeight: 40};


    function textConfig(textContent) {
        const guybrushText = new PIXI.Text(textContent, dialogueStyle);
        guybrushText.anchor.set(0.5);
        return guybrushText; 
    }

    const wakeUpText = textConfig('Non mais je rêve');
    const wakeUpText2 = textConfig('T\'es qui toi ? Et pourquoi tu fais sonner mon réveil si tôt ?');
    const wakeUpText3 = textConfig('Bon si on a fini, moi j\'ai du travail');
    const OkText = textConfig('Ok !');


    const wakeUpResponses = [
        {
            text: "Qui es-tu ?",
            action: () => {
                const responseText = new PIXI.Text(
                    "OK!",
                    { fontFamily: 'arial', fontSize: 24, fill: '#ffffff', stroke: '#000000', strokeThickness: 4 }
                );
                // Ajouter le texte près de Guybrush
                responseText.x = guybrush.x + 10;
                responseText.y = guybrush.y - 40;
                houseContainer.addChild(responseText);
            },
        },
        {
            text: "Je suis ici pour voir un portfolio, qu'as-tu à me montrer ?",
            action: () => console.log("Action : Guybrush va chercher un café"),
        },
        {
            text: "Pourquoi je suis encore ici ?",
            action: () => console.log("Action : Guybrush se pose des questions existentielles"),
        },
        {
            text: "Bye bye zobi",
            action: () => console.log("Action : Guybrush se pose des questions existentielles"),
        },
    ];


    return {
        wakeUpText,
        wakeUpText2,
        wakeUpText3,
        wakeUpResponses,
        OkText,
    };

}