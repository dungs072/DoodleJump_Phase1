import Vector2 from '../../game-engine/base-types/Vector2'
import GameState from '../states/GameState'
import PhysicManager from '../../game-engine/physic/PhysicManager'
import PlatformManager from '../platforms/PlatformManager'
import Player from '../player/Player'
import UIManager from '../ui/UIManager'
import GameMenu from './GameMenu'
import GamePlay from './GamePlay'
import GameStateHandler from './GameStateHandler'
import GameObject from '../../game-engine/base-types/GameObject'
import SceneManager from '../../game-engine/scene/SceneManager'
import Transform from '../../game-engine/base-types/components/Transform'
class GameController extends GameObject {
    private gamePlay: GamePlay
    private gameMenu: GameMenu
    private gameStateHandler: GameStateHandler

    private player: Player
    private platformManager: PlatformManager

    private canvas: HTMLCanvasElement

    private preDistance: number

    constructor(canvas: HTMLCanvasElement) {
        super()
        this.canvas = canvas

        this.gameStateHandler = new GameStateHandler()
        this.gamePlay = new GamePlay(this.gameStateHandler, this)
        this.gameMenu = new GameMenu(this.gameStateHandler)
        UIManager.getInstance().getStartGameButton().subcribe(this.gamePlay)
        UIManager.getInstance().getPlayAgainButton().subcribe(this.gamePlay)
        UIManager.getInstance().getMenuButton().subcribe(this.gameMenu)
    }

    public getGameState(): GameState {
        return this.gameStateHandler.getGameState()
    }
    public setGameState(gameState: GameState) {
        this.gameStateHandler.setGameState(gameState)
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
        this.player.setCanvasHeight(this.canvas.height)

        this.platformManager = new PlatformManager()
        this.player.setPublisher(this.platformManager.getPublisher())
        PhysicManager.getInstance().addNotStaticPhysicObj(this.player)

        let platformPosition = new Vector2(playerPosition.x - 50, 550)
        let scale = new Vector2(100, 30)
        this.platformManager.createStablePlatform(platformPosition, scale)
    }
    public update(deltaTime: number) {
        this.sceneConfig(this.getGameState() == GameState.GAME_PLAY)
        if (this.getGameState() == GameState.GAME_PLAY) {
            this.platformManager.createPlatforms(this.canvas.width)
            this.platformManager.destroyPlatforms()
            this.platformManager.destroyItems()
            this.handlePlayer()
            UIManager.getInstance().toggleMainGameUI(true)
        } else if (this.getGameState() == GameState.GAME_OVER) {
            UIManager.getInstance().toggleMainMenu(false)
            UIManager.getInstance().toggleMainGameUI(false)
            UIManager.getInstance().toggleGameOver(true)
            this.handleBorder()
            SceneManager.getInstance().getCurrentActiveScene().setCanvasMoveY(0)
            //this.player.update(deltaTime)
        } else if (this.getGameState() == GameState.MAIN_MENU) {
            UIManager.getInstance().toggleGameOver(false)
            UIManager.getInstance().toggleMainGameUI(false)
            UIManager.getInstance().toggleMainMenu(true)
        }
    }
    private sceneConfig(state: boolean): void {
        let scene = SceneManager.getInstance().getCurrentActiveScene()
        if (state) {
            let transform = this.player?.getComponent(Transform)
            if (transform) {
                let maxBorder = this.canvas.height / 2 - 125
                let distance = maxBorder - this.player.getPosition().y

                if (this.player.getPosition().y < maxBorder && distance > this.preDistance) {
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
                this.player.saveHighScore()
                this.setGameState(GameState.GAME_OVER)
                this.platformManager.clearData()
                PhysicManager.getInstance().clearData()
                this.player.clearData()
                PhysicManager.getInstance().addNotStaticPhysicObj(this.player)
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
