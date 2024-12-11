export async function resizeHandler(app, sprites) {

    const { background, crosshair, guybrush, guybrushWR, guybrushWL, guybrushLD, guybrushGU, guybrushSO, guybrushSOT, ordi, desk, gamingChair, gamingChairAR } = sprites;

function adjustCanvasSize() {
    // Redimensionne le canvas
    app.renderer.resize(window.innerWidth, window.innerHeight);

    // Ajuste la taille du background
    background.width = app.screen.width;
    background.height = app.screen.height;

    // Position du Crosshair
    crosshair.x = app.screen.width / 2;
    crosshair.y = app.screen.height * 0.8;

    // Position Guybrush qui parle
    guybrush.x = app.screen.width / 2;
    guybrush.y = app.screen.height * 0.83;

    // Position Guybrush qui marche à droite
    guybrushWR.x = app.screen.width * 0.4;
    guybrushWR.y = app.screen.height * 0.802;

    // Position qui marche à gauche
    guybrushWL.x = app.screen.width * 0.74;
    guybrushWL.y = app.screen.height * 0.83;

    // Position qui dort
    guybrushLD.x = app.screen.width * 0.74;
    guybrushLD.y = app.screen.height * 0.849;

    // Position qui se réveille et se lève
    guybrushGU.x = app.screen.width * 0.74;
    guybrushGU.y = app.screen.height * 0.83;

    // Position qui travaille sur ordi
    guybrushSO.x = app.screen.width * 0.29;
    guybrushSO.y = app.screen.height * 0.84;


    /// ELEMENTS & OBJECTS ///

    // Position qui parle sur ordi
    guybrushSOT.x = app.screen.width * 0.298;
    guybrushSOT.y = app.screen.height * 0.84;

    // Position Ordinateur
    ordi.x =  app.screen.width * 0.20;
    ordi.y =  app.screen.height * 0.730;

    // Position Bureau
    desk.x =  app.screen.width * 0.22;
    desk.y =  app.screen.height * 0.89;

    // Position GamingChair
    gamingChair.x =  app.screen.width * 0.328;
    gamingChair.y =  app.screen.height * 0.885;

    // Position GamingChair ArmRest
    gamingChairAR.x =  app.screen.width * 0.328;
    gamingChairAR.y =  app.screen.height * 0.885;

    // Ajuste l'échelle du crosshair proportionnellement
    const scaleFactorCrosshair = Math.min(
        app.screen.width / 2000,
        app.screen.height / 1200
    );
    crosshair.scale.set(scaleFactorCrosshair);

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

    // Ajuste l'échelle de GuybrushSO proportionnellement
    const scaleFactorSO = Math.min(
        app.screen.width / 850,
        app.screen.height / 1250
    );
    guybrushSO.scale.set(scaleFactorSO);

    // Ajuste l'échelle de GuybrushSOT proportionnellement
    const scaleFactorSOT = Math.min(
        app.screen.width / 850,
        app.screen.height / 1250
    );
    guybrushSOT.scale.set(scaleFactorSOT);

    // Ajuste l'échelle de l'ordinateur proportionnellement
    const scaleFactorOrdi = Math.min(
        app.screen.width / 770,
        app.screen.height / 790
    );
    ordi.scale.set(scaleFactorOrdi);

    // Ajuste l'échelle du bureau proportionnellement
    const scaleFactorDesk = Math.min(
        app.screen.width / 800,
        app.screen.height / 780
    );
    desk.scale.set(scaleFactorDesk);

    // Ajuste l'échelle da gamingchair
    const scaleFactorGC = Math.min(
        app.screen.width / 900,
        app.screen.height / 1000
    );
    gamingChair.scale.set(scaleFactorGC);

     // Ajuste l'échelle da gamingchair armrest
     const scaleFactorGCAR = Math.min(
        app.screen.width / 900,
        app.screen.height / 1000
    );
    gamingChairAR.scale.set(scaleFactorGCAR);
}

// Applique le redimensionnement à chaque événement 'resize'
window.addEventListener('resize', adjustCanvasSize);

// Optionnel : pour s'assurer que tout est bien redimensionné dès le chargement initial
adjustCanvasSize();

console.log("tout s'est bien déclenché");
}