export async function loadTexts(sprites, app) {

    const { container } = sprites;

    //First text
    const wakeUpText = new PIXI.Text({ text: 'Salut ! Bienvenue sur mon Portfolio !', 
        style: { fontFamily: 'MonkeyIsland, arial', fontSize: 25, fill: '#31ACD3', stroke: 'black', strokeThickness: 6 } 
    });
    wakeUpText.position.set(app.screen.width / 2, app.screen.height / 2);
    wakeUpText.anchor.set(0.5);
    
    return {
        wakeUpText
    };

}