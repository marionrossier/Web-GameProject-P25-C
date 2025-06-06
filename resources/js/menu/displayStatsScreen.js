/**
 * Displays the statistics or leaderboard screen on the canvas.
 * The method clears the current canvas, draws the leaderboard, highlights the current player's score,
 * and shows a message if there are no scores recorded yet.
 *
 * @return {void} Does not return a value.
 */
function displayStatsScreen() {
    checkScoreBoard();
    const data = getScoreBoard();
    const currentPlayerName = getPlayerName();

    window.ctx.clearRect(0, 0, window.canvas.width, window.canvas.height);
    window.ctx.fillStyle = "#333333";
    window.ctx.fillRect(0, 0, window.canvas.width, window.canvas.height);

    window.ctx.font = "40px Arial";
    window.ctx.fillStyle = "#ffffff";
    window.ctx.textAlign = "center";
    window.ctx.fillText("Leader Board", window.canvas.width / 2, window.canvas.height / 2 - 80);

    window.ctx.font = "20px Arial";
    window.ctx.fillStyle = "#ffff00";
    window.ctx.fillText(`Current Player: ${currentPlayerName}`, window.canvas.width / 2, window.canvas.height / 2 - 40);

    if (!data || !data.players || data.players.length === 0) {
        window.ctx.font = "24px Arial";
        window.ctx.fillStyle = "#aaaaaa";
        window.ctx.fillText("No scores yet!", window.canvas.width / 2, window.canvas.height / 2);
        return;
    }

    // Display players
    window.ctx.font = "24px Arial";
    data.players.forEach((p, index) => {
        const y = window.canvas.height / 2 + index * 35;
        const text = `${index + 1}. ${p.name} : ${p.score}`;

        if (p.name === currentPlayerName) {
            window.ctx.fillStyle = "#00ff00"; // Vert
        } else {
            window.ctx.fillStyle = "#ffffff"; // Blanc
        }

        window.ctx.fillText(text, window.canvas.width / 2, y);
    });
    drawButton(backButton, heartImage, backButtonImage);
}