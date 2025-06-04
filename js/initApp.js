export async function initializeApp() {

    // Création d'une nouvelle application
    const app = new PIXI.Application();

    globalThis.__PIXI_APP__ = app;
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

      // CREATION DU TEXTE
      // Texte de base sans points
        const baseText = 'Chargement des assets';


      const loadingText = new PIXI.Text(baseText, {
      fill: 0xffffff,
      fontSize: 36,
      fontFamily: 'Efmi',
      align: 'center',
      });

      // Centrage du texte sur le blackScreen
      loadingText.anchor.set(0.5);
      loadingText.x = window.innerWidth / 2;
      loadingText.y = window.innerHeight / 2;

      blackScreen.addChild(loadingText);

    // Animation des points
    let dotCount = 0;
    setInterval(() => {
        dotCount = (dotCount + 1) % 5; // 0 à 4
        const dots = '.'.repeat(dotCount);
        loadingText.text = baseText + dots;
    }, 500);

return {app,
    blackScreen,
    loadingText
    }
};
