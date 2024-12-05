export async function loadTexts(sprites) {

    const { container } = sprites;

    // TEST - FONT
    // const text = new PIXI.Text({ text: 'Hey Guyrom Threepnis', 
    //     style: { fontFamily: 'MonkeyIsland, arial', fontSize: 25, fill: '#31ACD3', stroke: 'black', strokeThickness: 6 } 
    // });
    // container.addChild(text);

    //First text
    const wakeUpText = new PIXI.Text({ text: 'Salut ! Bienvenue sur mon Portfolio !', 
        style: { fontFamily: 'MonkeyIsland, arial', fontSize: 25, fill: '#31ACD3', stroke: 'black', strokeThickness: 6 } 
    });
    
    return {
        wakeUpText
    };

}