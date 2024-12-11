export async function resizeHandler(app, sprites) {

    const { background, crosshair, guybrush, guybrushWR, guybrushWL, guybrushLD, guybrushGU, guybrushSO, guybrushSOT, ordi, desk, gamingChair, gamingChairAR } = sprites;

function adjustCanvasSize() {

    function setPositionAndScale(sprite, positionXFactor, positionYFactor, scaleWidthFactor, scaleHeightFactor) {
        // Positionnement du sprite
        sprite.x = app.screen.width * positionXFactor;
        sprite.y = app.screen.height * positionYFactor;
    
        // Ajustement de l'échelle proportionnelle
        const scaleFactor = Math.min(
            app.screen.width / scaleWidthFactor,
            app.screen.height / scaleHeightFactor
        );
        sprite.scale.set(scaleFactor);
    }

    // Redimensionne le canvas
    app.renderer.resize(window.innerWidth, window.innerHeight);

    // Ajuste la taille du background
    background.width = app.screen.width;
    background.height = app.screen.height;

    // Position du Crosshair
    setPositionAndScale(crosshair, 0.5, 0.8, 2000, 1200);

    // Position Guybrush qui parle
    setPositionAndScale(guybrush, 0.5, 0.83, 1000, 600);

    // Position Guybrush qui marche à droite
    setPositionAndScale(guybrushWR, 0.4, 0.802, 850, 600);

    // Position qui marche à gauche
    setPositionAndScale(guybrushWR, 0.74, 0.83, 850, 600);

    // Position qui dort
    setPositionAndScale(guybrushLD, 0.74, 0.849, 850, 600);

    // Position qui se réveille et se lève
    setPositionAndScale(guybrushGU, 0.74, 0.83, 850, 600);

    // Position qui travaille sur ordi
    setPositionAndScale(guybrushSO, 0.29, 0.84, 850, 1250);

    // Position qui parle sur ordi
    setPositionAndScale(guybrushSOT, 0.298, 0.84, 850, 1250);


    /// ELEMENTS & OBJECTS ///

    // Position Ordinateur
    setPositionAndScale(ordi, 0.2, 0.73, 770, 790);
   
    // Position Bureau
    setPositionAndScale(desk, 0.22, 0.89, 800, 780);

    // Position GamingChair
    setPositionAndScale(gamingChair, 0.328, 0.885, 900, 1000);

    // Position GamingChair ArmRest
    setPositionAndScale(gamingChairAR, 0.328, 0.885, 900, 1000);
}

// Applique le redimensionnement à chaque événement 'resize'
window.addEventListener('resize', adjustCanvasSize);

// Optionnel : pour s'assurer que tout est bien redimensionné dès le chargement initial
adjustCanvasSize();

console.log("tout s'est bien déclenché");
}