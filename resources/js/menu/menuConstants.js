/**
 * Represents an array of menu button objects used in a user interface.
 * Each button object contains properties that define its identifier, display text, position, and size.
 *
 * @type {Array<{id: string, text: string, x: number, y: number, width: number, height: number}>}
 * @property {string} id - The unique identifier for the button.
 * @property {string} text - The text displayed on the button.
 * @property {number} x - The x-coordinate position of the button.
 * @property {number} y - The y-coordinate position of the button.
 * @property {number} width - The width of the button.
 * @property {number} height - The height of the button.
 */
const menuButtons = [
    { id: "play", text: "Play", x: 400, y: 400, width: 200, height: 60 },
    { id: "rules", text: "Instructions", x: 400, y: 480, width: 200, height: 60 },
    { id: "stats", text: "Results", x: 400, y: 560, width: 200, height: 60 }
];

window.backButton = {
    id: "back",
    text: "Back",
    x: window.CANVAS.screenWidth - 20 - 40,
    y: 20,
    width: 40,
    height: 40
};

/**
 * Represents a collection of button objects displayed on the game over screen.
 *
 * Each button object contains the following properties:
 * - id: A unique string identifier for the button.
 * - text: The label displayed on the button.
 * - x: The x-coordinate position of the button on the screen.
 * - y: The y-coordinate position of the button on the screen.
 * - width: The width of the button.
 * - height: The height of the button.
 *
 * This variable is used to define the layout and functionality of buttons present at the end of the game.
 */
const gameOverButtons = [
    { id: "continue", text: "Continue", x: 400, y: 400, width: 200, height: 60 },
    { id: "menu", text: "Menu", x: 400, y: 480, width: 200, height: 60 }
];

/**
 * Creates and returns a new Image object representing a heart.
 * The image is loaded from the specified source URL.
 *
 * @return {HTMLImageElement} An Image object with the heart image loaded as its source.
 */
function heartImage (){
    const heartImage = new Image();
    heartImage.src = "resources/images/game/Heart.png";
    return heartImage;
}

/**
 * Creates and returns an Image object representing the back button.
 * The source of the image is set to "resources/images/Menu/rollback-picto.png".
 *
 * @return {Image} An Image object with the specified source for the back button.
 */
function backButtonImage (){
    const backButtonImage = new Image();
    backButtonImage.src = "resources/images/Menu/rollback-picto.png";
    return backButtonImage;
}

/**
 * Creates and returns an Image object with the source set to a specified instructions image path.
 *
 * @return {HTMLImageElement} An Image object with the source set to "resources/images/WebSite/mockup/Instructions.png".
 */
function instructionsImage (){
    const instructionsImage = new Image();
    instructionsImage.src = "resources/images/WebSite/mockup/Instructions.png";
    return instructionsImage;
}
