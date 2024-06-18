import Sprite from '../../game-engine/base-types/components/render/Sprite'
import Vector2 from '../../game-engine/base-types/Vector2'
import PathResources from '../../game-engine/PathResources'
import RenderInterface from '../../game-engine/types/render'
import Button from '../../game-engine/base-types/components/ui/Button'
import UIElement from '../../game-engine/base-types/components/ui/UIElement'
import GameOverMenuUI from './GameOverMenuUI'
import MainMenuUI from './MainMenuUI'
import Text from '../../game-engine/base-types/components/ui/Text'

class UIManager {
    private gameOverMenuUI: GameOverMenuUI
    private mainMenuUI: MainMenuUI

    private startGameButton: Button
    private playAgainButton: Button
    private menuButton: Button

    private scoreText: Text

    private static instance: UIManager

    private isMainMenu: boolean
    private isGameOver: boolean

    public static getInstance(): UIManager {
        if (!UIManager.instance) {
            UIManager.instance = new UIManager()
        }
        return UIManager.instance
    }
    constructor() {
        this.setUI()
        this.isMainMenu = true
        this.isGameOver = false
    }

    private setUI(): void {
        // main menu panel
        let backgroundMainMenu = new Sprite(PathResources.BACKGROUND)

        this.mainMenuUI = new MainMenuUI(
            new Vector2(0, 0),
            new Vector2(640, 600),
            backgroundMainMenu
        )
        let playGameButtonBg = new Sprite(PathResources.PLAY_GAME)
        this.startGameButton = new Button('', '', playGameButtonBg)
        let doodleJumpBg = new Sprite(PathResources.DOODLE_JUMP_TEXT)
        let doodleJumpText = new Text('', '', 0, doodleJumpBg)
        this.mainMenuUI.setStartGameButton(this.startGameButton)
        this.mainMenuUI.setDoodleJumpText(doodleJumpText)

        // gameover panel
        let backgroundGameOverMenu = new Sprite(PathResources.BACKGROUND)

        this.gameOverMenuUI = new GameOverMenuUI(
            new Vector2(0, 0),
            new Vector2(640, 600),
            backgroundGameOverMenu
        )
        let currentScoreText = new Text('Your score: ', 'red', 300, null)
        this.gameOverMenuUI.setCurrentScoreText(currentScoreText)

        let highScoreText = new Text('High score: ', 'red', 300, null)
        this.gameOverMenuUI.setHighScoreText(highScoreText)

        let playAgainButtonBg = new Sprite(PathResources.PLAY_AGAIN_BUTTON)
        this.playAgainButton = new Button('', '', playAgainButtonBg)
        this.gameOverMenuUI.setPlayAgainButton(this.playAgainButton)

        let menuButtonBg = new Sprite(PathResources.MENU_BUTTON)
        this.menuButton = new Button('', '', menuButtonBg)
        this.gameOverMenuUI.setMenuButton(this.menuButton)

        // main game
        this.scoreText = new Text('Score: 0', 'red', 100, null)
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
        this.isMainMenu = state
        this.mainMenuUI.setActive(state)
    }
    public toggleGameOver(state: boolean): void {
        this.isGameOver = state
        this.gameOverMenuUI.setActive(state)
    }
    public toggleMainGameUI(state: boolean): void {
        this.scoreText.setIsActive(state)
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
        this.scoreText.setTextDisplay('Score: ' + text)
    }
    public getScore(): Text {
        return this.scoreText
    }
}
export default UIManager
