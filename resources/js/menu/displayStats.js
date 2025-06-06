
function displayStats() {

    checkScoreBoard();
    const data = getScoreBoard();

    // Nettoie l'écran
    window.ctx.clearRect(0, 0, window.canvas.width, window.canvas.height);
    window.ctx.fillStyle = "#333333"; // Fond gris foncé
    window.ctx.fillRect(0, 0, window.canvas.width, window.canvas.height);

    // Titre
    window.ctx.font = "40px Arial";
    window.ctx.fillStyle = "#ffffff";
    window.ctx.textAlign = "center";
    window.ctx.fillText("Leader Board :", window.canvas.width / 2, window.canvas.height / 2 -40);

    if (!data || !data.players) return;

    // Affichage des joueurs
    window.ctx.font = "24px Arial";
    data.players.forEach((p, index) => {
        const y = window.canvas.height / 2 + index * 30;
        const text = `${index + 1}. ${p.name} : ${p.score}`;
        window.ctx.fillText(text, window.canvas.width / 2, y);
    });
}