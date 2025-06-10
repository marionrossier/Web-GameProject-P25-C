/**
 * Verifies the existence of the ScoreBoard in local storage.
 * If the ScoreBoard does not exist, it initializes it by calling the setScoreBoard function.
 *
 * @return {void} This method does not return a value.
 */
function checkScoreBoard() {
    const key = "ScoreBoard";
    if (!localStorage.getItem(key)) {
        setScoreBoard();
    }
}

/**
 * Retrieves the scoreboard data stored in local storage.
 * Calls an internal checkScoreBoard function before fetching the data.
 * Parses and returns the scoreboard object.
 *
 * @return {Object|null} The parsed scoreboard object from local storage, or null if not available.
 */
function getScoreBoard(){
    checkScoreBoard();
    const scoreboard = JSON.parse(localStorage.getItem("ScoreBoard"));
    return scoreboard;
}

/**
 * Sets the scoreboard data in the local storage by fetching the data from a JSON resource file.
 * If the scoreboard data is not found, logs an error message to the console.
 *
 * @return {void} Does not return a value.
 */
function setScoreBoard(){
    const key = "ScoreBoard";
    const json = new JsonReach("/resources/js/ScoreBoard.json");
    const fullData = json.getObject();

    if (fullData && fullData.ScoreBoard) {
        localStorage.setItem(key, JSON.stringify(fullData.ScoreBoard));
    } else {
        console.error("Error with ScoreBoard local storage creation");
    }
}

/**
 * Updates the scoreboard stored in localStorage by adding or updating a player's score.
 * Keeps only the top 5 scores in descending order.
 *
 * @param {string} name - The name of the player whose score is being added or updated.
 * @param {number} score - The score of the player to add or update.
 * @return {void}
 */
function newScoreBoard(name, score) {
    checkScoreBoard();
    const key = "ScoreBoard";
    const scoreboard = JSON.parse(localStorage.getItem(key));

    if (!scoreboard || !scoreboard.players) return;

    let players = scoreboard.players;

    const existing = players.find(p => p.name === name);

    if (existing) {
        if (score > existing.score) {
            existing.score = score;
        }
    } else {
        players.push({ name, score });
    }

    players.sort((a, b) => b.score - a.score);
    players = players.slice(0, 5);
    localStorage.setItem(key, JSON.stringify({ players }));
}

/**
 * Logs player scores from the scoreboard stored in localStorage.
 * Retrieves the "ScoreBoard" item from localStorage, parses it, and logs each player's name and score in order.
 * If the scoreboard is invalid or empty, logs an error message.
 *
 * @return {void} This function does not return a value.
 */
function showInLog(){
    const scoreboard = JSON.parse(localStorage.getItem("ScoreBoard"));

    if (scoreboard && scoreboard.players) {
        scoreboard.players.forEach((player, index) => {
        });
    } else {
        console.error("ScoreBoard invalid or empty.");
    }
}

/**
 * Saves the player's score if it is greater than 0 and logs the result to the console.
 *
 * @param {number} score - The score achieved by the player.
 * @return {boolean} Returns true if the score is saved successfully, otherwise false.
 */
function savePlayerScore(score) {
    const playerName = getPlayerName();

    if (score > 0) {
        newScoreBoard(playerName, score);
        return true;
    }
    return false;
}