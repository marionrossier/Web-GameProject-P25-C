function checkScoreBoard() {
    const key = "ScoreBoard";
    if (!localStorage.getItem(key)) {
        setScoreBoard();
    }
}

function getScoreBoard(){
    checkScoreBoard();
    const scoreboard = JSON.parse(localStorage.getItem("ScoreBoard"));
    return scoreboard;
}

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

function newScoreBoard(name, score) {
    checkScoreBoard();
    const key = "ScoreBoard";
    const scoreboard = JSON.parse(localStorage.getItem(key));

    if (!scoreboard || !scoreboard.players) return;

    let players = scoreboard.players;

    // Vérifie si le joueur existe déjà
    const existing = players.find(p => p.name === name);

    if (existing) {
        // Mise a jour du score si le score est meilleur
        if (score > existing.score) {
            existing.score = score;
        }
    } else {
        // ajout du score si le joueur n'existe pas
        players.push({ name, score });
    }

    // Trie du tableau par score décroissant et on garde les 5 meilleurs
    players.sort((a, b) => b.score - a.score);
    players = players.slice(0, 5);
    localStorage.setItem(key, JSON.stringify({ players }));
}

function showInLog(){
    const scoreboard = JSON.parse(localStorage.getItem("ScoreBoard"));

    if (scoreboard && scoreboard.players) {
        scoreboard.players.forEach((player, index) => {
            console.log(`${index + 1}. ${player.name} - Score : ${player.score}`);
        });
    } else {
        console.error("ScoreBoard invalide ou vide.");
    }
}

function savePlayerScore(score) {
    const playerName = getPlayerName();

    if (score > 0) {
        newScoreBoard(playerName, score);
        console.log(`Score sauvegardé: ${playerName} - ${score}`);
        return true;
    }
    return false;
}