export async function loadTexts(app) {

    const dialogueStyle = { fontFamily: 'MonkeyIsland, arial', fontSize: 25, fill: '#31ACD3', stroke: 'black', strokeThickness: 6, wordWrap: true, wordWrapWidth: 800, lineHeight: 40};

    function textConfig(textContent) {
        const guybrushText = new PIXI.Text(textContent, dialogueStyle);
        guybrushText.position.set(app.screen.width / 2, app.screen.height / 2);
        guybrushText.anchor.set(0.5);
        return guybrushText; 
    }

    const wakeUpText = textConfig('Non mais je rêve');
    const wakeUpText2 = textConfig('T\'es qui toi ? Et pourquoi tu fais sonner mon réveil si tôt ?');
    const wakeUpText3 = textConfig('MEEEEEEEEEEEEEEERDE');

    return {
        wakeUpText,
        wakeUpText2,
        wakeUpText3
    };

}