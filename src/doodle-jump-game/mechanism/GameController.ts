import Vector2 from '../../game-engine/base-types/Vector2'
import GameState from '../states/GameState'
import PhysicManager from '../../game-engine/physic/PhysicManager'
import PlatformManager from '../platforms/PlatformManager'
import Player from '../player/Player'
import UIManager from '../ui/UIManager'
import GameObject from '../../game-engine/base-types/GameObject'
import SceneManager from '../../game-engine/scene/SceneManager'
import Transform from '../../game-engine/base-types/components/Transform'
class GameController extends GameObject {
    private gameState: GameState
    private player: Player
    private platformManager: PlatformManager
    private uiManager: UIManager

    private canvas: HTMLCanvasElement

    private preDistance: number

    constructor(canvas: HTMLCanvasElement) {
        super()
        this.canvas = canvas
        this.uiManager = UIManager.getInstance()
        this.gotoMenu()
        this.uiManager.getStartGameButton().subscribe(() => {
            this.gotoGamePlay()
        })
        this.uiManager.getPlayAgainButton().subscribe(() => {
            this.gotoGamePlay()
        })
        this.uiManager.getMenuButton().subscribe(() => {
            this.gotoMenu()
        })
    }
    private gotoMenu() {
        this.uiManager.toggleMainMenu(true)
        this.uiManager.toggleGameOver(false)
        this.uiManager.toggleMainGameUI(false)
        this.gameState = GameState.MAIN_MENU
    }

    private gotoGamePlay(): void {
        this.uiManager.toggleGameOver(false)
        this.uiManager.toggleMainMenu(false)
        this.uiManager.toggleMainGameUI(true)
        this.setUpGame()
        this.gameState = GameState.GAME_PLAY
    }
    private gotoGameOver(): void {
        this.uiManager.toggleGameOver(true)
        this.uiManager.toggleMainMenu(false)
        this.uiManager.toggleMainGameUI(false)
    }
    public getGameState(): GameState {
        return this.gameState
    }
    public setGameState(gameState: GameState) {
        this.gameState = gameState
    }

    public setUpGame(): void {
        if (this.player) {
            PhysicManager.getInstance().removeNotStaticPhysicObjs(this.player)
            this.player.destroy()
        }
        this.preDistance = 0
        let playerPosition = new Vector2(320, 300)
        let playerScale = new Vector2(60, 120)
        this.player = new Player(playerPosition, playerScale)

        this.platformManager = new PlatformManager()
        this.player.setPublisher(this.platformManager.getPublisher())

        let platformPosition = new Vector2(playerPosition.x - 50, 550)
        let scale = new Vector2(120, 35)
        this.platformManager.createStablePlatform(platformPosition, scale)
    }
    public update(deltaTime: number) {
        this.moveScreen(this.getGameState() == GameState.GAME_PLAY)
        if (this.getGameState() == GameState.GAME_PLAY) {
            this.platformManager.createPlatforms(this.canvas.width)
            this.platformManager.destroyPlatforms()
            this.platformManager.destroyItems()
            this.handlePlayer()
            this.uiManager.toggleMainGameUI(true)
        } else if (this.getGameState() == GameState.GAME_OVER) {
            SceneManager.getInstance().getCurrentActiveScene().setCanvasMoveY(0)
            this.handleBorder()
        }
    }
    private moveScreen(state: boolean): void {
        let scene = SceneManager.getInstance().getCurrentActiveScene()
        if (state) {
            let transform = this.player?.getComponent(Transform)
            if (transform) {
                let maxBorder = this.canvas.height / 2 - 125
                let distance = maxBorder - this.player.getPosition().y

                if (this.player.getPosition().y < maxBorder && distance > this.preDistance) {
                    this.player.setMaxBorder(distance)
                    scene.setCanvasMoveY(distance)
                    this.preDistance = distance
                }
            }
        }
    }

    private handlePlayer() {
        this.handleBorder()
        let platform = this.platformManager.getTheFirstPlatform()
        if (platform != null) {
            if (this.player.getPosition().y - platform.getTransform().getPosition().y > 50) {
                this.setGameState(GameState.GAME_OVER)
                this.player.saveHighScore()
                this.player.setIsOver(true)
                this.platformManager.clearData()
                this.gotoGameOver()
                this.player.clearData()
            }
        }
    }

    private handleBorder() {
        if (this.player.getPosition().x > this.canvas.width) {
            let newPos = new Vector2(0, this.player.getPosition().y)
            this.player.setPosition(newPos)
        }
        if (this.player.getPosition().x < -60) {
            let newPos = new Vector2(640, this.player.getPosition().y)
            this.player.setPosition(newPos)
        }
    }
}
export default GameController
