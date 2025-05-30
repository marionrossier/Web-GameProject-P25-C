const initialCanvasWidth = 1000;
const initialCanvasHeight = 700;

const menuButtons = [
    { id: "play", text: "Play", x: 400, y: 400, width: 200, height: 60 },
    { id: "rules", text: "Instructions", x: 400, y: 480, width: 200, height: 60 },
    { id: "stats", text: "Results", x: 400, y: 560, width: 200, height: 60 }
];

const backButton = {
    id: "back",
    text: "Back",
    x: initialCanvasWidth - 20 - 40,
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
    heartImage.src = "/game/images/Heart.png";
    return heartImage;
}

function backButtonImage (){
    const backButtonImage = new Image();
    backButtonImage.src = "/game/images/rollback-picto.png";
    return backButtonImage;
}

function instructionsImage (){
    const instructionsImage = new Image();
    instructionsImage.src = "/game/images/Instructions.png";
    return instructionsImage;
}
