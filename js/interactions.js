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

    console.log("tout s'est bien déclenché dans interactions");
}