
export async function loadTexts(sprites) {

    const { houseContainer, houseSprite, guybrush, guybrushWR, guybrushWL, guybrushLD, guybrushGU, guybrushSO, guybrushSOT, gamingChairAR, guybrushIUL, guybrushIUR, ordi, ordiRun, toilePoulie, toilePoulieRun, menuContainer, menuCoverDialogue } = sprites;

    const dialogueStyle = { fontFamily: 'MonkeyIsland, arial', fontSize: 25, fill: '#31ACD3', stroke: 'black', strokeThickness: 6, wordWrap: true, wordWrapWidth: 800, lineHeight: 40};
    const responseStyle = { fontFamily: 'arial', fontSize: 25, fill: '#772a76', stroke: 'black', strokeThickness: 6, wordWrap: true, wordWrapWidth: 800, lineHeight: 40};


    function textConfig(textContent) {
        const guybrushText = new PIXI.Text(textContent, dialogueStyle);
        guybrushText.anchor.set(0.5);
        return guybrushText; 
    }

    const wakeUpText = textConfig('Non mais je rêve');
    const wakeUpText2 = textConfig('T\'es qui toi ? Et pourquoi tu fais sonner mon réveil si tôt ?');
    const wakeUpText3 = textConfig('Bon si on a fini, moi j\'ai du travail');
    const OkText = textConfig('Ok !');


    // TABLEAUX DES REPONSES DE GUYBRUSH
    const wakeUpResponses = [
        {
            text: "Qui es-tu ?",
            action: () => {
                if (responseText) {
                    responseText.destroy();
                }
                let responseText = textConfig("Ok !");
                responseText.zIndex = 4;
                responseText.x = 0.5 * guybrushSO.width;
                responseText.y = -1.3 * guybrushSO.height;
                responseText.fontSize = 50;
                guybrushSO.addChild(responseText);
                console.log(responseText.fontSize);
            },
        },
        {
            text: "Je suis ici pour voir un portfolio, qu'as-tu à me montrer ?",
            action: () => {

                const responseText = new PIXI.Text("CAGOLE", { fontFamily: 'MonkeyIsland, arial', fontSize: 22, fill: '#31ACD3', stroke: 'black', strokeThickness: 6, wordWrap: true, wordWrapWidth: 800, lineHeight: 40});

                // let responseText = textConfig("M'enfous !");
                responseText.zIndex = 5;
                responseText.x = guybrushSO.x - 30;
                responseText.y = guybrushSO.y - 150;
                houseContainer.addChild(responseText);
                console.log(responseText.fontSize);
            },
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
        responseStyle,
    };

}