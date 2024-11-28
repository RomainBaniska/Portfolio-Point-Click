export async function resizeHandler(app, sprites) {

    const { background, guybrush, guybrushWR, guybrushWL, guybrushLD, guybrushGU } = sprites; // Déstructuration pour accéder à background

    if (!background) {
        console.error('Le sprite de fond n\'est pas trouvé.');
        return;
    }

function adjustCanvasSize() {
    // Redimensionne le canvas
    app.renderer.resize(window.innerWidth, window.innerHeight);

    // Ajuste la taille du background
    background.width = app.screen.width;
    background.height = app.screen.height;

    // Recentre Guybrush
    guybrush.x = app.screen.width / 2;
    guybrush.y = app.screen.height * 0.8;

    guybrushWR.x = app.screen.width * 0.4;
    guybrushWR.y = app.screen.height * 0.802;

    guybrushWL.x = app.screen.width * 0.6;
    guybrushWL.y = app.screen.height * 0.802;

    guybrushLD.x = app.screen.width * 0.74;
    guybrushLD.y = app.screen.height * 0.84;

    guybrushGU.x = app.screen.width * 0.74;
    guybrushGU.y = app.screen.height * 0.84;

    // Ajuste l'échelle de Guybrush proportionnellement
    const scaleFactor = Math.min(
        app.screen.width / 1000,
        app.screen.height / 600
    );
    guybrush.scale.set(scaleFactor);

    // Ajuste l'échelle de GuybrushWR proportionnellement
    const scaleFactorWR = Math.min(
        app.screen.width / 850,
        app.screen.height / 600
    );
    guybrushWR.scale.set(scaleFactorWR);

    // Ajuste l'échelle de GuybrushWL proportionnellement
    const scaleFactorWL = Math.min(
        app.screen.width / 850,
        app.screen.height / 600
    );
    guybrushWL.scale.set(scaleFactorWL);

    // Ajuste l'échelle de GuybrushLD proportionnellement
    const scaleFactorLD = Math.min(
        app.screen.width / 850,
        app.screen.height / 600
    );
    guybrushLD.scale.set(scaleFactorLD);

    // Ajuste l'échelle de GuybrushGU proportionnellement
    const scaleFactorGU = Math.min(
        app.screen.width / 850,
        app.screen.height / 600
    );
    guybrushGU.scale.set(scaleFactorGU);
}

// Applique le redimensionnement à chaque événement 'resize'
window.addEventListener('resize', adjustCanvasSize);

// Optionnel : pour s'assurer que tout est bien redimensionné dès le chargement initial
adjustCanvasSize();

console.log("tout s'est bien déclenché");
}