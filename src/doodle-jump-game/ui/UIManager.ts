import Sprite from '../../game-engine/base-types/components/render/Sprite'
import Vector2 from '../../game-engine/base-types/Vector2'
import PathResources from '../../game-engine/resources/PathResources'
import Button from '../../game-engine/base-types/components/ui/Button'
import GameOverMenuUI from './GameOverMenuUI'
import MainMenuUI from './MainMenuUI'
import Text from '../../game-engine/base-types/components/ui/Text'
import ResourcesManager from '../../game-engine/resources/ResourcesManager'
import GamePlayUI from './GamePlayUI'
import SceneManager from '../../game-engine/scene/SceneManager'

class UIManager {
    private gameOverMenuUI: GameOverMenuUI
    private mainMenuUI: MainMenuUI
    private gamePlayUI: GamePlayUI

    private startGameButton: Button
    private playAgainButton: Button
    private menuButton: Button

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
        let backgroundMainMenu = new Sprite(ResourcesManager.PageImage)

        this.mainMenuUI = new MainMenuUI(
            new Vector2(0, 0),
            new Vector2(640, 600),
            backgroundMainMenu
        )
        let playGameButtonBg = new Sprite(ResourcesManager.StartButtonImage)
        this.startGameButton = new Button('', '', playGameButtonBg)
        let doodleJumpBg = new Sprite(ResourcesManager.DoodleJumpTextImage)
        let doodleJumpText = new Text('', '', 0, doodleJumpBg)
        this.mainMenuUI.setStartGameButton(this.startGameButton)
        this.mainMenuUI.setDoodleJumpText(doodleJumpText)

        // gameover panel
        let backgroundGameOverMenu = new Sprite(ResourcesManager.PageImage)

        this.gameOverMenuUI = new GameOverMenuUI(
            new Vector2(0, 0),
            new Vector2(640, 600),
            backgroundGameOverMenu
        )
        let currentScoreText = new Text('Your score: ', 'red', 300, null)
        this.gameOverMenuUI.setCurrentScoreText(currentScoreText)

        let highScoreText = new Text('High score: ', 'red', 300, null)
        this.gameOverMenuUI.setHighScoreText(highScoreText)

        let playAgainButtonBg = new Sprite(ResourcesManager.PlayAgainButtonImage)
        this.playAgainButton = new Button('', '', playAgainButtonBg)
        this.gameOverMenuUI.setPlayAgainButton(this.playAgainButton)

        let menuButtonBg = new Sprite(ResourcesManager.MenuButtonImage)
        this.menuButton = new Button('', '', menuButtonBg)
        this.gameOverMenuUI.setMenuButton(this.menuButton)

        // main game
        let sprite = new Sprite(ResourcesManager.PageImage)
        this.gamePlayUI = new GamePlayUI(Vector2.zero(), new Vector2(640, 600), sprite)
        let scoreText = new Text('Score: 0', 'red', 100, null)
        this.gamePlayUI.setScoreText(scoreText)
    }
    // public draw(context: CanvasRenderingContext2D): void {
    //     if (this.isGameOver) {
    //         this.gameOverMenuUI.draw(context)
    //     }
    //     if (this.isMainMenu) {
    //         this.mainMenuUI.draw(context)
    //     }
    //     // if (this.scoreText.getIsActive()) {
    //     //     this.scoreText.draw(context)
    //     // }
    // }

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
        return this.startGameButton
    }
    public getPlayAgainButton(): Button {
        return this.playAgainButton
    }
    public getMenuButton(): Button {
        return this.menuButton
    }
    public getGameOverMenuUI(): GameOverMenuUI {
        return this.gameOverMenuUI
    }
    public setScoreText(text: string): void {
        this.gamePlayUI.getScoreText().setTextDisplay('Score: ' + text)
    }
    public getScore(): Text {
        return this.gamePlayUI.getScoreText()
    }
}
export default UIManager
