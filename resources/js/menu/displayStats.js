function displayStats() {

    const ScoreBoard = new JsonReach("/resources/js/ScoreBoard.json");
    const players = ScoreBoard.get("ScoreBoard", "players");

    const canvas = document.getElementById("gameCanvas");
    const ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, canvas.width, canvas.height); // Efface l’écran
    ctx.fillStyle = "#333333"; // Gris foncé
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.font = "40px Arial";
    ctx.fillStyle = "#ffffff";
    ctx.fillText("Leader Board :", canvas.width / 2, canvas.height / 2-70);

    if (!players) return;

    ctx.font = "20px Arial";
    players.forEach((p, index) => {
        ctx.fillText(`${p.name} : ${p.score}`, canvas.width / 2, canvas.height / 2 + index * 30);
    });
}