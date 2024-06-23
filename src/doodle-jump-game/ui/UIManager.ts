import Vector2 from '../../game-engine/base-types/Vector2'
import Button from '../../game-engine/base-types/components/ui/Button'
import GameOverMenuUI from './GameOverMenuUI'
import MainMenuUI from './MainMenuUI'
import GamePlayUI from './GamePlayUI'

class UIManager {
    private gameOverMenuUI: GameOverMenuUI
    private mainMenuUI: MainMenuUI
    private gamePlayUI: GamePlayUI

    private static instance: UIManager

    public static getInstance(): UIManager {
        if (!UIManager.instance) {
            UIManager.instance = new UIManager()
        }
        return UIManager.instance
    }
    constructor() {
        this.setUI()
    }

    private setUI(): void {
        // main menu panel
        this.mainMenuUI = new MainMenuUI(new Vector2(0, 0), new Vector2(640, 600))
        // game over panel
        this.gameOverMenuUI = new GameOverMenuUI(new Vector2(0, 0), new Vector2(640, 600))
        // main game
        this.gamePlayUI = new GamePlayUI(Vector2.zero(), new Vector2(640, 600))
    }

    public toggleMainMenu(state: boolean): void {
        this.mainMenuUI.setActive(state)
    }
    public toggleGameOver(state: boolean): void {
        this.gameOverMenuUI.setActive(state)
    }
    public toggleMainGameUI(state: boolean): void {
        this.gamePlayUI.setActive(state)
    }
    public getStartGameButton(): Button {
        return this.mainMenuUI.getStartGameButton()
    }
    public getPlayAgainButton(): Button {
        return this.gameOverMenuUI.getPlayAgainButton()
    }
    public getMenuButton(): Button {
        return this.gameOverMenuUI.getMenuButton()
    }
    public getGameOverMenuUI(): GameOverMenuUI {
        return this.gameOverMenuUI
    }
    public setScoreText(text: string): void {
        this.gamePlayUI.setScoreText('Score: ' + text)
    }
}
export default UIManager
