// --- DOM access ---
/**
 * Represents the HTML canvas element from the DOM with the id "gameCanvas".
 * This canvas is typically used as a rendering surface for 2D and 3D graphics
 * in web-based applications such as games, animations, or interactive visualizations.
 *
 * The canvas element allows drawing shapes, images, and other visual content
 * programmatically using the associated rendering context.
 *
 * Variable Type: HTMLCanvasElement
 */
const canvas = document.getElementById("gameCanvas");
/**
 * Represents the 2D rendering context for a HTML `<canvas>` element.
 * This context provides methods and properties for drawing and manipulating
 * graphics on the canvas, including paths, shapes, text, images, and other visual content.
 *
 * The `ctx` variable is an instance of `CanvasRenderingContext2D` obtained
 * from a `<canvas>` element using the `getContext("2d")` method.
 */
const ctx = canvas.getContext("2d");

// --- Constantes figées par domaine ---
/**
 * Defines the properties of a fixed map configuration, which includes width, height, and pixel size.
 * This object is immutable and cannot be modified after its definition.
 *
 * @constant {Object} MAP
 * @property {number} width - The width of the map in units.
 * @property {number} height - The height of the map in units.
 * @property {number} pixelSize - The size of each pixel in the map.
 */
const MAP = Object.freeze({
    width: 25,
    height: 17,
    pixelSize: 16
});

/**
 * Represents a frozen configuration object for the canvas with predefined dimensions.
 *
 * @constant {Object} CANVAS
 * @property {number} screenWidth - The width of the canvas in pixels.
 * @property {number} screenHeight - The height of the canvas in pixels.
 */
const CANVAS = Object.freeze({
    screenWidth: 1000,
    screenHeight: 700
});

/**
 * An immutable object representing the cursor configuration.
 * This object defines the dimensions for the display and hitbox of the cursor.
 *
 * @constant {Object} CURSOR
 * @property {number} destinationWidth - The width of the cursor for its desired display size.
 * @property {number} destinationHeight - The height of the cursor for its desired display size.
 * @property {number} hitBoxWidth - The width of the cursor's hitbox for interaction detection.
 * @property {number} hitBoxHeight - The height of the cursor's hitbox for interaction detection.
 */
const CURSOR = Object.freeze({
    destinationWidth: 12,
    destinationHeight: 12,
    hitBoxWidth: 16,
    hitBoxHeight: 16
});

/**
 * An immutable object representing the configuration properties of an enemy entity.
 *
 * @constant {Object} ENEMY
 * @property {number} destinationWidth - The width of the enemy when rendered on the screen.
 * @property {number} destinationHeight - The height of the enemy when rendered on the screen.
 * @property {number} hitBoxWidth - The width of the enemy's hitbox used for collision detection.
 * @property {number} hitBoxHeight - The height of the enemy's hitbox used for collision detection.
 */
const ENEMY = Object.freeze({
    destinationWidth: 16,
    destinationHeight: 16,
    hitBoxWidth: 20,
    hitBoxHeight: 20
});

/**
 * LIFE is a constant object that stores predefined immutable dimensions.
 * The object represents configuration properties related to measurements
 * such as destination and hitbox dimensions.
 *
 * Properties:
 * - destinationWidth {number}: The width of the destination area.
 * - destinationHeight {number}: The height of the destination area.
 * - hitBoxWidth {number}: The width of the hitbox area.
 * - hitBoxHeight {number}: The height of the hitbox area.
 */
const LIFE = Object.freeze({
    destinationWidth: 12,
    destinationHeight: 12,
    hitBoxWidth: 16,
    hitBoxHeight: 16
});

/**
 * A constant object representing the settings for an outside destination.
 * This object is immutable and contains fixed dimensions for width and height.
 *
 * Properties:
 * - `destinationWidth` - The width dimension, fixed at 16 units.
 * - `destinationHeight` - The height dimension, fixed at 16 units.
 */
const OUTSIDE = Object.freeze({
    destinationWidth: 16,
    destinationHeight: 16
});

/**
 * An immutable object representing the dimensions of a tree.
 * The object contains two properties:
 * - `destinationWidth`: The width of the tree's destination area.
 * - `destinationHeight`: The height of the tree's destination area.
 *
 * The object is frozen to prevent modifications.
 */
const TREE = Object.freeze({
    destinationWidth: 12, // 16 - 4
    destinationHeight: 16
});

/**
 * An immutable object representing the configuration for destination dimensions.
 * The `WAY` object contains the following properties:
 *
 * - `destinationWidth`: The width of the destination, set to a fixed value of 16.
 * - `destinationHeight`: The height of the destination, set to a fixed value of 16.
 *
 * This object is frozen to prevent modifications, ensuring its properties remain constant.
 */
const WAY = Object.freeze({
    destinationWidth: 16,
    destinationHeight: 16
});

/**
 * An immutable object representing the initial gameplay settings for a game.
 * It contains configuration values such as the starting number of lives and score.
 *
 * Properties:
 * - startLives: The number of lives the player starts with.
 * - startScore: The score the player begins the game with.
 */
const GAMEPLAY = Object.freeze({
    startLives: 3,
    startScore: 1000
});

// --- États de jeu dynamiques ---
/**
 * Represents the current level in a game or application.
 * This variable tracks the user's current progress or stage.
 *
 * @type {number}
 */
let currentLevel = 1;
/**
 * Represents the current number of lives a player has in the game.
 *
 * This variable is initialized to the starting number of lives
 * defined in GAMEPLAY.startLives and may be decremented as the
 * player loses lives during gameplay.
 *
 * Used to track the player's remaining chances before the game ends.
 */
let currentLives = GAMEPLAY.startLives;
/**
 * Represents the final time value, typically used to indicate the end point in a time measurement or duration.
 * This variable can be assigned a specific time value, in seconds or another consistent time unit, depending on the context in which it is used.
 * Default value is initialized to 0.
 *
 * @type {number}
 */
let finalTime = 0;
/**
 * Holds the value of the player's final score at the end of the game.
 * It is initialized with the starting score defined by the GAMEPLAY module.
 *
 * The value of `finalScore` may be updated throughout the game as the player's actions
 * and events modify their score.
 */
let finalScore = GAMEPLAY.startScore;

// --- Exposition globale ---
Object.assign(window, {
    canvas,
    ctx,
    MAP,
    CANVAS,
    CURSOR,
    ENEMY,
    LIFE,
    OUTSIDE,
    TREE,
    WAY,
    GAMEPLAY,
    currentLevel,
    currentLives,
    finalTime,
    finalScore
});

// --- Initialisation du jeu ---
/**
 * Initializes the game state by setting up the default values for screen, level, lives, final time, and final score.
 *
 * @return {void} This method does not return a value.
 */
function gameInitialisation() {
    window.currentScreen = "play";
    window.currentLevel = 1;
    window.currentLives = GAMEPLAY.startLives;
    window.finalTime = 0;
    window.finalScore = GAMEPLAY.startScore;
}
window.gameInitialisation = gameInitialisation;