import GameState from "../base-types/enums/gameState";
import SubcriberInterface from "../types/observer/subcriber";
import UIManager from "../ui/uiManager";
import GameStateHandler from "./gameStateHandler";

class GameOver implements SubcriberInterface<string>{
    private gameStateHandler: GameStateHandler;
    constructor(gameStateHandler: GameStateHandler){
        this.gameStateHandler = gameStateHandler;
    }
    receive(data: string): void {
        UIManager.getInstance().toggleMainMenu(false);
        UIManager.getInstance().toggleGameOver(true);    
        this.gameStateHandler.setGameState(GameState.GAME_OVER);
    }

}
export default GameOver;