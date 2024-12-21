(async () => {
    // Création d'une nouvelle application
    const app = new PIXI.Application();

    // Configuration de la largeur maximale adaptée à la taille de l'écran si plus petit
    const width = 800;
    const height = 600;

    // Initialisation de l'application
    await app.init({
        width: width,
        height: height,
        background: 0x999999, // Couleur de fond
    });

    document.body.appendChild(app.canvas);

    console.log("Tout s'est bien déclenché");

    // --- Code existant pour initialiser une grille ---
    let app2, graphics;

    const cellSize = 10;

    initBoard();
    updateGridAlgorithm(false, true, 53); // Fonctionne pour des valeurs < 53

    function initBoard() {
        const width = window.innerWidth;
        const height = window.innerHeight;

        app2 = new PIXI.Application({
            width: width,
            height: 900,
            backgroundColor: 0xffffff,
            resolution: window.devicePixelRatio || 1,
            autoResize: true,
            antialias: true,
        });

        document.body.appendChild(app2.view);
        graphics = new PIXI.Graphics();

        app2.stage.addChild(graphics);
    }

    function updateGridAlgorithm(randomStart, showGrid, iterations) {
        graphics.clear(); // Efface les dessins précédents
        if (showGrid) {
            drawNewGrid(iterations);
        }
    }

    function drawNewGrid(iterations) {
        const width = window.innerWidth;
        const gridWidth = iterations * 2 + 1;
        const startX = width / 2 - (gridWidth / 2) * cellSize;
        const startY = 20;

        for (let i = 0; i < iterations; i++) {
            for (let j = 0; j < gridWidth; j++) {
                graphics.lineStyle(0.5, 0x999999);
                graphics.drawRect(
                    startX + j * cellSize,
                    startY + i * cellSize,
                    cellSize,
                    cellSize
                );
            }
        }
    }
})();
