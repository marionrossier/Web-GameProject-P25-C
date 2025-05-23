function startGame(canvas, ctx, heartImage, backButtonImage, instructionsImage) {

    // S'assurer que currentLevel est défini
    if (typeof window.currentLevel === 'undefined') {
        window.currentLevel = 1;
    }

    // Obtenir les données du niveau
    const levelData = getLevelData(window.currentLevel);
    if (!levelData) {

        // En cas d'échec, revenir au menu
        currentScreen = "menu";
        renderMenu(ctx, canvas, heartImage, backButtonImage, instructionsImage);
        return;
    }

    // Références aux éléments audio
    const menuMusic = document.getElementById("menuMusic");
    const gameMusic = document.getElementById("gameMusic");

    try {
        // Forcer les dimensions du canvas à 1000x700
        if (canvas.width !== 1000 || canvas.height !== 700) {
            canvas.width = 1000;
            canvas.height = 700;
        }

        // Définir les paramètres globaux
        window.pixelSizeTable = { 2: 32 };
        window.WidthTable = { 2: 20 };
        window.HeightTable = { 2: 20 };

        const outsideSkin = new OutsideSkin(levelData.world);
        const waySkin = new WaySkin(levelData.world);
        const treeSkin = new TreeSkin(levelData.world);

        // Créer le moteur de jeu pour ce niveau
        app = new Motor(2, levelData.map, outsideSkin, waySkin, treeSkin, levelData.gameEntities, 0);
        const cursorSkinNumber = 1;

        // Callback en cas de victoire
        const onWinCallback = () => {
            // Garder ces lignes pour la compatibilité avec le code existant
            currentScreen = "stats";
            // app.screenTransitions.disableInterception();
            gameMusic.pause();
            gameMusic.currentTime = 0;
            renderMenu(ctx, canvas, heartImage, backButtonImage, instructionsImage, app);
        };

        // Créer le curseur du joueur
        const cursor = new Cursor(cursorSkinNumber, canvas, levelData.map, 2, onWinCallback, ctx,
            app, levelData.gameEntities);

        console.log("start");
        app.gameMap.draw();
        app.startTimer();
        window.gameState = 1;

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
        // if (app) app.screenTransitions.disableInterception();
        gameMusic.pause();
        gameMusic.currentTime = 0;

        // Relancer la musique du menu
        menuMusic.play().catch((error) => {
            console.error("Erreur lors de la lecture de la musique du menu :", error);
        });

        // Afficher le menu
        renderMenu(ctx, canvas, heartImage, backButtonImage, instructionsImage, app);
    }
}