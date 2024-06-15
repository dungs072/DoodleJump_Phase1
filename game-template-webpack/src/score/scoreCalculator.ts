class ScoreCalculate{
    currentScore: number;

    constructor(){
        this.setCurrentScore(0);
    }
    public setCurrentScore(score: number){
        this.currentScore = score;
    }
    public addCurrentScore(score: number){
        this.currentScore+=score;
    }
    public getCurrentScore(): number{
        return this.currentScore;
    }
}
export default ScoreCalculate;