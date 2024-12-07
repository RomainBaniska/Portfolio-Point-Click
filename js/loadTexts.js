export async function loadTexts(app) {

    const dialogueStyle = { fontFamily: 'MonkeyIsland, arial', fontSize: 25, fill: '#31ACD3', stroke: 'black', strokeThickness: 6, wordWrap: true, wordWrapWidth: 800, lineHeight: 40} 

    //First text
    const wakeUpText = new PIXI.Text({ text: 'Non mais je rêve', 
        style: dialogueStyle
    });
    wakeUpText.position.set(app.screen.width / 2, app.screen.height / 2);
    wakeUpText.anchor.set(0.5);

    //Second text
    const wakeUpText2 = new PIXI.Text({ text: 'T\'es qui toi ? Et pourquoi tu fais sonner mon réveil si tôt ?', 
        style: dialogueStyle
    });
    wakeUpText2.position.set(app.screen.width / 2, app.screen.height / 2);
    wakeUpText2.anchor.set(0.5);

    // function textConfig() {
    //     // rédiger la fonction
    // };
    
    return {
        wakeUpText,
        wakeUpText2
    };

}