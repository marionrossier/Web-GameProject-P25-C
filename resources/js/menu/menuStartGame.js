function startGame(heartImage, backButtonImage, instructionsImage) {

    // S'assurer que currentLevel est défini
    if (typeof window.currentLevel === 'undefined') {
        window.currentLevel = 1;
    }

    // Obtenir les données du niveau
    const levelData = getLevelData(window.currentLevel);
    if (!levelData) {

        // En cas d'échec, revenir au menu
        currentScreen = "menu";
        renderMenu(heartImage, backButtonImage, instructionsImage);
        return;
    }

    // Références aux éléments audio
    const menuMusic = document.getElementById("menuMusic");
    const gameMusic = document.getElementById("gameMusic");

    try {
        // Forcer les dimensions du canvas à 1000x700
        // if (window.canvas.width !== 1000 || window.canvas.height !== 700) {
        //     window.canvas.width = 1000;
        //     window.canvas.height = 700;
        // }

        const outsideSkin = new OutsideSkin(levelData.world);
        const waySkin = new WaySkin(levelData.world);
        const treeSkin = new TreeSkin(levelData.world);

        // Créer le moteur de jeu pour ce niveau
        app = new Motor(2, levelData.map, outsideSkin, waySkin, treeSkin, levelData.gameEntities);

        console.log("start");
        app.gameMap.draw();
        app.startTimer();

        currentScreen = "play";

        // Gestion de la musique
        menuMusic.pause();
        menuMusic.currentTime = 0;
        gameMusic.play().catch((error) => {
            console.error("Erreur lors de la lecture de la musique du jeu :", error);
        });

    } catch (error) {
        currentScreen = "menu";

        // Nettoyage
        gameMusic.pause();
        gameMusic.currentTime = 0;

        // Relancer la musique du menu
        menuMusic.play().catch((error) => {
            console.error("Erreur lors de la lecture de la musique du menu :", error);
        });

        // Afficher le menu
        renderMenu(heartImage, backButtonImage, instructionsImage, app);
    }
}