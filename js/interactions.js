export async function interactions(app, sprites) {

    const { container, background, crosshair, guybrush, guybrushWR, guybrushWL, guybrushLD, guybrushGU } = sprites;

    // Lors du click sur le Guybrush qui dort, on le réveille
    guybrushLD.on('click', wakeUp);
    guybrushGU.on('click', goSleep);

    function wakeUp() {
        console.log("Se réveille");
    if (container.children.includes(guybrushLD)) {
        container.removeChild(guybrushLD);
        container.addChild(guybrushGU);

        guybrushGU.gotoAndPlay(0);
        guybrushGU.loop = false;

        guybrushGU.onComplete = async () => {
            setTimeout(async () => {
                container.removeChild(guybrushGU); 
                container.addChild(guybrushWL); 
                
                await walkLeft();

                console.log("Cinematique terminée !");
                container.removeChild(guybrushWL);
                container.addChild(guybrush);  
        }, 500);   
          
        };
    }
    }

    function goSleep() {
        console.log("Va dormir");
    if (container.children.includes(guybrushGU)) {
        container.removeChild(guybrushGU);
        container.addChild(guybrushLD);

        guybrushLD.gotoAndPlay(0);
    }
    }

    function walkLeft () {
    return new Promise((resolve) => {
    
    let moving = true; // Indique si le sprite doit bouger
    const speed = 2.7; // Vitesse de déplacement (pixels par frame)
    const stopPosition = app.screen.width * 0.5; // Position où le sprite doit s'arrêter

    console.log(`Position initiale: ${guybrushWL.x}`);
    console.log(`Arrêt prévu: ${stopPosition}`);


    app.ticker.add(() => {
        if (moving) {
            guybrushWL.x -= speed; 
            if (guybrushWL.x <= stopPosition) {
                moving = false;
                console.log("Arrêt atteint à :", guybrushWL.x);
                resolve();
            }
        }
    });
});
    }

    console.log("tout s'est bien déclenché dans interactions");
}