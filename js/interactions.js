export async function interactions(app, sprites) {

    const { background, crosshair, guybrush, guybrushWR, guybrushWL, guybrushLD, guybrushGU } = sprites;

    // Lors du click sur le Guybrush qui dort, on le réveille
    guybrushLD.on('click', wakeUp);

    function wakeUp() {
    console.log("Ok");
    }

    console.log("tout s'est bien déclenché dans interactions");
}