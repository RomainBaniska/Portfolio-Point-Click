export async function initializeApp() {

    // Création d'une nouvelle application
    const app = new PIXI.Application();

    globalThis.__PIXI_APP__ = app;

    // DEVTOOL
    // window.__PIXI_DEVTOOLS__ = {
    //     app
    //   };

    // Configuration de la largeur maximale adaptée à la taille de l'écran si plus petit
    // const maxWidth = 1440;
    // const width = Math.min(window.innerWidth, maxWidth);
    // const aspectRatio = 16 / 9;
    // const height = width / aspectRatio;
    const maxWidth = 1440;
    const width = window.innerWidth;
    const aspectRatio = 16 / 9;
    const height = window.innerHeight;

    // Initialisation de l'application
    await app.init({ 
        width: width,
        height: height,
        backgroundColor: 0x000000, // Noir
        // backgroundColor: 0xFFA500, // Orange
    });

    // Ajout du canvas de l'app au body
    document.body.appendChild(app.canvas);

      // BLACK SCREEN
      const blackScreen = new PIXI.Graphics();
      blackScreen.clear();
      blackScreen.rect(0, 0, window.innerWidth, window.innerHeight).fill(0x000000);
      blackScreen.alpha = 1;
      blackScreen.zIndex = 99;
      app.stage.addChild(blackScreen);

return {app,
    blackScreen
    }
};
