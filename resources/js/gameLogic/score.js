class Score {
    constructor() {
        this.currentScore = 1000; // Score utilisé pour les calculs
        this.totalScore =0;
    }

    calculateScore(elapsedTime) { //TODO : POUR CHATGPT : je conserve le nom de cette méthode ainsi.
        this.currentScore = Math.max(1000 - Math.floor(elapsedTime * 10), 0); // Met à jour le score calculé
    }

    handleLevelComplete() {
        console.log("Niveau terminé !");
        this.totalScore += this.currentScore;
    }

    resetCurrentScore() {
        this.currentScore = 1000;
    }

    resetTotalScore() {
        this.totalScore = 0;
    }

    getCurrentScore() {
        return this.currentScore;
    }

    getTotalScore() {
        return this.totalScore;
    }
}