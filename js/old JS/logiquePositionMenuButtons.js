async function adjustCanvasSize() {
    app.renderer.resize(window.innerWidth, window.innerHeight);

    // Taille max du sprite
    const houseMaxHeight = 1024;
    const houseMaxWidth = 1440;

    // MAISON : La maison occupe 74% de l'écran
    house.height = app.screen.height * 0.74;
    // Le calcul finit par 1.4 pour réduire la largeur de 40%
    house.width = (house.height / houseMaxHeight) * houseMaxWidth * 1.4;
    // Position de House
    house.x = (app.screen.width - house.width) / 2;
    house.y = 0;

    // MENU : Le menu occupe 26% de l'écran
    menuBackground.height = app.screen.height * 0.26;
    // On applique la même largeur que pour la maison
    menuBackground.width = (house.height / houseMaxHeight) * houseMaxWidth * 1.4;
    menuBackground.x = app.screen.width / 2;
    // Le menu commence lorsque la maison termine
    menuBackground.y = house.height;

    const menuHeight = menuBackground.height
    const menuWidth = menuBackground.width;
    const menuXPosition = menuBackground.x;
    const menuYPosition = menuBackground.y;

    // PREMIERE COLONNE
    // BOUTON : Le 1er bouton occupe 30% du menu
    menuButton.height = menuHeight * 0.3 ;
    // ainsi qu'un sixième de la largeur totale du menu
    menuButton.width = menuWidth * (1/6);
    menuButton.x = menuXPosition - menuWidth / 2;
    // La position 'y' du bouton correspond au top left du menu
    menuButton.y = menuYPosition + menuHeight * 0.1;

    const menuButtonHeight = menuButton.height;
    const menuButtonWidth = menuButton.width;
    const menuButtonXPosition = menuButton.x;
    const menuButtonYPosition = menuButton.y;

    // 2ème bouton idem
    menuButton2.height = menuHeight * 0.3 ;
    menuButton2.width = menuWidth * (1/6);
    menuButton2.x = menuXPosition - menuWidth / 2;
    menuButton2.y = menuButtonYPosition + menuButtonHeight;

    const menuButton2Height = menuButton2.height;
    const menuButton2Width = menuButton2.width;
    const menuButton2XPosition = menuButton2.x;
    const menuButton2YPosition = menuButton2.y;

    // 3ème bouton idem
    menuButton3.height = menuHeight * 0.3 ;
    menuButton3.width = menuWidth * (1/6);
    menuButton3.x = menuXPosition - menuWidth / 2;
    menuButton3.y = menuButton2YPosition + menuButton2Height;


    // DEUXIEME COLONNE
    menuButton4.height = menuHeight * 0.3;
    menuButton4.width = menuWidth * (1 / 6);
    menuButton4.x = menuXPosition - menuWidth / 2 + menuButtonWidth; // Décalage d'une colonne
    menuButton4.y = menuYPosition + menuHeight * 0.1;

    menuButton5.height = menuHeight * 0.3;
    menuButton5.width = menuWidth * (1 / 6);
    menuButton5.x = menuXPosition - menuWidth / 2 + menuButtonWidth;
    menuButton5.y = menuButton4.y + menuButton4.height;

    menuButton6.height = menuHeight * 0.3;
    menuButton6.width = menuWidth * (1 / 6);
    menuButton6.x = menuXPosition - menuWidth / 2 + menuButtonWidth;
    menuButton6.y = menuButton5.y + menuButton5.height;

    // TROISIEME COLONNE
    menuButton7.height = menuHeight * 0.3;
    menuButton7.width = menuWidth * (1 / 6);
    menuButton7.x = menuXPosition - menuWidth / 2 + 2 * menuButtonWidth; // Décalage de deux colonnes
    menuButton7.y = menuYPosition + menuHeight * 0.1;

    menuButton8.height = menuHeight * 0.3;
    menuButton8.width = menuWidth * (1 / 6);
    menuButton8.x = menuXPosition - menuWidth / 2 + 2 * menuButtonWidth;
    menuButton8.y = menuButton7.y + menuButton7.height;

    menuButton9.height = menuHeight * 0.3;
    menuButton9.width = menuWidth * (1 / 6);
    menuButton9.x = menuXPosition - menuWidth / 2 + 2 * menuButtonWidth;
    menuButton9.y = menuButton8.y + menuButton8.height;
}