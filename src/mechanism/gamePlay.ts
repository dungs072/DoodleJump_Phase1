import GameState from "../base-types/enums/gameState";
import SubcriberInterface from "../types/observer/subcriber";
import UIManager from "../ui/uiManager";
import GameStateHandler from "./gameStateHandler";
import GameController from './gameController';

class GamePlay implements SubcriberInterface<string>{
    private gameStateHandler: GameStateHandler;
    // fix decouple here
    private gameController: GameController;
    constructor(gameStateHandler: GameStateHandler, gameController: GameController){
        this.gameStateHandler = gameStateHandler;
        this.gameController = gameController;
    }
    receive(data: string): void {
        UIManager.getInstance().toggleGameOver(false);    
        UIManager.getInstance().toggleMainMenu(false);
        this.gameController.setUpGame();
        this.gameStateHandler.setGameState(GameState.GAME_PLAY);
    }

}
export default GamePlay;