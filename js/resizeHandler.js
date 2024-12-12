export async function resizeHandler(app, sprites, texts) {

    const { background, crosshair, guybrush, guybrushWR, guybrushWL, guybrushLD, guybrushGU, guybrushSO, guybrushSOT, ordi, desk, gamingChair, gamingChairAR } = sprites;

    const { wakeUpText, wakeUpText2, wakeUpText3 } = texts;

function adjustCanvasSize() {

    // AJOUTER UNE LOGIQUE Où LE TEXTE SUIT GUYBRUSH
    // sprite.addChild(text)
    // text.x = .5 * sprite.width
    // text.y = .5 * sprite.height

    // function setTextPositionAndScale(textToResize) {
    //     textToResize.position.set(app.screen.width / 2, app.screen.height / 2);
    // };

    // setTextPositionAndScale(wakeUpText);
    // setTextPositionAndScale(wakeUpText2);
    // setTextPositionAndScale(wakeUpText3);

    function setSpritePositionAndScale(sprite, positionXFactor, positionYFactor, scaleWidthFactor, scaleHeightFactor) {
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

    // Redimensionne le canvas & ajuste la taille du background
    app.renderer.resize(window.innerWidth, window.innerHeight);
    background.width = app.screen.width;
    background.height = app.screen.height;

    // Sprite, Position X, Position Y, Largeur, Hauteur des éléments

    // Position du Crosshair
    setSpritePositionAndScale(crosshair, 0.5, 0.8, 2000, 1200);

    // Position Guybrush qui parle
    setSpritePositionAndScale(guybrush, 0.5, 0.83, 1000, 600);

    // Position Guybrush qui marche à droite
    setSpritePositionAndScale(guybrushWR, 0.4, 0.802, 850, 600);

    // Position qui marche à gauche
    setSpritePositionAndScale(guybrushWL, 0.74, 0.83, 850, 600);

    // Position qui dort
    setSpritePositionAndScale(guybrushLD, 0.74, 0.849, 850, 600);

    // Position qui se réveille et se lève
    setSpritePositionAndScale(guybrushGU, 0.74, 0.83, 850, 600);

    // Position qui travaille sur ordi
    setSpritePositionAndScale(guybrushSO, 0.29, 0.84, 850, 1250);

    // Position qui parle sur ordi
    setSpritePositionAndScale(guybrushSOT, 0.298, 0.84, 850, 1250);

    /// ELEMENTS & OBJECTS ///

    // Position Ordinateur
    setSpritePositionAndScale(ordi, 0.2, 0.73, 770, 790);
   
    // Position Bureau
    setSpritePositionAndScale(desk, 0.22, 0.89, 800, 780);

    // Position GamingChair
    setSpritePositionAndScale(gamingChair, 0.328, 0.885, 900, 1000);

    // Position GamingChair ArmRest
    setSpritePositionAndScale(gamingChairAR, 0.328, 0.885, 900, 1000);
}

// Applique le redimensionnement à chaque événement 'resize'
window.addEventListener('resize', adjustCanvasSize);

// Redimensionnement dès le chargement initial
adjustCanvasSize();

console.log("tout s'est bien déclenché");
}