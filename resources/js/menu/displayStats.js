function displayStats() {

    const ScoreBoard = new JsonReach("/resources/js/ScoreBoard.json");
    const players = ScoreBoard.get("ScoreBoard", "players");

    window.ctx.clearRect(0, 0, window.canvas.width, window.canvas.height); // Efface l’écran
    window.ctx.fillStyle = "#333333"; // Gris foncé
    window.ctx.fillRect(0, 0, window.canvas.width, window.canvas.height);
    window.ctx.font = "40px Arial";
    window.ctx.fillStyle = "#ffffff";
    window.ctx.fillText("Leader Board :", window.canvas.width / 2, window.canvas.height / 2-70);

    if (!players) return;

    window.ctx.font = "20px Arial";
    players.forEach((p, index) => {
        ctx.fillText(`${p.name} : ${p.score}`, window.canvas.width / 2, window.canvas.height / 2 + index * 30);
    });
}