class Score {
    constructor() {
        this.currentScore = 1000;
        this.totalScore =0;
    }

    calculateScore(elapsedTime) {
        this.currentScore = Math.max(1000 - Math.floor(elapsedTime * 10), 0);
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