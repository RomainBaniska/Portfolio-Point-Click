export async function loadTexts(app) {

    const dialogueStyle = { fontFamily: 'MonkeyIsland, arial', fontSize: 25, fill: '#31ACD3', stroke: 'black', strokeThickness: 6, wordWrap: true, wordWrapWidth: 800, lineHeight: 40};
    const responseStyle = { fontFamily: 'arial', fontSize: 25, fill: '#31ACD3', stroke: 'black', strokeThickness: 6, wordWrap: true, wordWrapWidth: 800, lineHeight: 40};


    function textConfig(textContent) {
        const guybrushText = new PIXI.Text(textContent, dialogueStyle);
        guybrushText.position.set(app.screen.width * 0.5, app.screen.height * 0.5);
        guybrushText.anchor.set(0.5);
        return guybrushText; 
    }

    const wakeUpText = textConfig('Non mais je rêve');
    const wakeUpText2 = textConfig('T\'es qui toi ? Et pourquoi tu fais sonner mon réveil si tôt ?');
    const wakeUpText3 = textConfig('Bon si on a fini, moi j\'ai du travail');

    // Doit retourner un array
    function responseConfig(responseContent) {
        const playerResponse = new PIXI.Text(responseContent, dialogueStyle);
        playerResponse.position.set(app.screen.width * 0.5, app.screen.height * 0.5);
        return playerResponse; 
    }

    return {
        wakeUpText,
        wakeUpText2,
        wakeUpText3
    };

}