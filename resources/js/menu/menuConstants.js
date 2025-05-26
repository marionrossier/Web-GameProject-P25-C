const menuButtons = [
    { id: "play", text: "Play", x: 400, y: 400, width: 200, height: 60 },
    { id: "rules", text: "Instructions", x: 400, y: 480, width: 200, height: 60 },
    { id: "stats", text: "Results", x: 400, y: 560, width: 200, height: 60 }
];

const backButton = {
    id: "back",
    text: "Back",
    x: window.screenCanvasWidth - 20 - 40,
    y: 20,
    width: 40,
    height: 40
};

const gameOverButtons = [
    { id: "continue", text: "Continue", x: 400, y: 400, width: 200, height: 60 },
    { id: "menu", text: "Menu", x: 400, y: 480, width: 200, height: 60 }
];

function heartImage (){
    const heartImage = new Image();
    heartImage.src = "resources/images/game/Heart.png";
    return heartImage;
}

function backButtonImage (){
    const backButtonImage = new Image();
    backButtonImage.src = "resources/images/Menu/rollback-picto.png";
    return backButtonImage;
}

function instructionsImage (){
    const instructionsImage = new Image();
    instructionsImage.src = "resources/images/WebSite/mockup/Instructions.png";
    return instructionsImage;
}
