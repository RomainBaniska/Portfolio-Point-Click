
export async function loadTexts(sprites) {

    const { houseContainer, houseSprite, guybrush, guybrushWR, guybrushWL, guybrushLD, guybrushGU, guybrushSO, guybrushSOT, gamingChairAR, guybrushIUL, guybrushIUR, ordi, ordiRun, toilePoulie, toilePoulieRun, menuContainer, menuCoverDialogue } = sprites;

    const dialogueStyle = { fontFamily: 'MonkeyIsland, arial', fontSize: 25, fill: '#31ACD3', stroke: 'black', strokeThickness: 6, wordWrap: true, wordWrapWidth: 800, lineHeight: 40};
    const responseStyle = { fontFamily: 'arial', fontSize: 20, fill: '#772a76', stroke: 'black', strokeThickness: 6, wordWrap: true, wordWrapWidth: 800, lineHeight: 40};


    function textConfig(textContent) {
        const guybrushText = new PIXI.Text(textContent, dialogueStyle);
        guybrushText.anchor.set(0.5);
        return guybrushText; 
    }

    const wakeUpText = textConfig('Non mais je rêve');
    const wakeUpText2 = textConfig('T\'es qui toi ? Et pourquoi tu fais sonner mon réveil si tôt ?');
    const wakeUpText3 = textConfig('Bon si on a fini, moi j\'ai du travail');


    let responseText = null;

    // TABLEAUX DES REPONSES DE GUYBRUSH
    const wakeUpResponses = [
        {
            text: "Qui es-tu ?",
            action: () => {
                if (responseText) {
                    responseText.destroy();
                    responseText = null;
                }
                
                responseText = textConfig("Ok !");
                responseText.zIndex = 4;
                responseText.x = guybrushSO.x;
                responseText.y = guybrushSO.y - guybrushSO.height;
                houseContainer.addChild(responseText);
            },
        },
        {
            text: "Je suis ici pour voir un portfolio, qu'as-tu à me montrer ?",
            action: () => {
                if (responseText) {
                    responseText.destroy();
                    responseText = null;
                }
                responseText = textConfig("Rien à foutre !");
                responseText.zIndex = 4;
                responseText.x = guybrushSO.x;
                responseText.y = guybrushSO.y - guybrushSO.height;
                houseContainer.addChild(responseText);
            },
        },
        {
            text: "Pourquoi je suis encore ici ?",
            action: () => {
                if (responseText) {
                    responseText.destroy();
                    responseText = null;
                }
                responseText = textConfig("Attends tu plaisantes ? tu débarques chez moi et tu te permets de dire ça!");
                responseText.zIndex = 4;
                responseText.x = guybrushSO.x;
                responseText.y = guybrushSO.y - guybrushSO.height;
                houseContainer.addChild(responseText);
            },
        },
        {
            text: "Bye bye zobi",
            action: () => {
                if (responseText) {
                    responseText.destroy();
                    responseText = null;
                }
                responseText = textConfig("C\'est ça, à plus tard");
                responseText.zIndex = 4;
                responseText.x = guybrushSO.x;
                responseText.y = guybrushSO.y - guybrushSO.height;
                houseContainer.addChild(responseText);
                // Remove les réponses pour éviter les comportements inattendus
                menuCoverDialogue.removeChild(wakeUpResponses);
                menuContainer.removeChild(menuCoverDialogue);
        },
    }
    ];


    return {
        wakeUpText,
        wakeUpText2,
        wakeUpText3,
        wakeUpResponses,
        responseStyle,
    };

}