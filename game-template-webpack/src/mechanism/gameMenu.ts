import GameState from "../base-types/enums/gameState";
import SubcriberInterface from "../types/observer/subcriber";
import UIManager from "../ui/uiManager";
import GameStateHandler from "./gameStateHandler";

class GameMenu implements SubcriberInterface<string>{
    private gameStateHandler: GameStateHandler;
    constructor(gameStateHandler: GameStateHandler){
        this.gameStateHandler = gameStateHandler;
    }
    receive(data: string): void {
        UIManager.getInstance().toggleMainMenu(true);
        UIManager.getInstance().toggleGameOver(false);    
        this.gameStateHandler.setGameState(GameState.MAIN_MENU);
    }

}
export default GameMenu;