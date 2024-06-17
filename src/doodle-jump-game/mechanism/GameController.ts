import PathResources from '../../game-engine/PathResources'
import Sprite from '../../game-engine/base-types/2d/Sprite'
import Vector2 from '../../game-engine/base-types/Vector2'
import GameState from '../../game-engine/base-types/enums/GameState'
import PhysicManager from '../../game-engine/physic/PhysicManager'
import PlatformManager from '../platforms/PlatformManager'
import Player from '../player/Player'
import UIManager from '../ui/UIManager'
import GameMenu from './GameMenu'
import GamePlay from './GamePlay'
import GameStateHandler from './GameStateHandler'
class GameController {
    private gamePlay: GamePlay
    private gameMenu: GameMenu
    private gameStateHandler: GameStateHandler

    private player: Player
    private platformManager: PlatformManager

    private backgroundSprite: Sprite
    private canvas: HTMLCanvasElement

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas
        this.gameStateHandler = new GameStateHandler()
        this.gamePlay = new GamePlay(this.gameStateHandler, this)
        this.gameMenu = new GameMenu(this.gameStateHandler)
        UIManager.getInstance().getStartGameButton().subcribe(this.gamePlay)
        UIManager.getInstance().getPlayAgainButton().subcribe(this.gamePlay)
        UIManager.getInstance().getMenuButton().subcribe(this.gameMenu)
        this.backgroundSprite = new Sprite(PathResources.BACKGROUND, new Vector2(0, 0))
    }

    public getGameState(): GameState {
        return this.gameStateHandler.getGameState()
    }
    public setGameState(gameState: GameState) {
        this.gameStateHandler.setGameState(gameState)
    }

    public setUpGame(): void {
        let playerPosition = new Vector2(320, 300)
        let playerScale = new Vector2(60, 120)
        this.player = new Player(playerPosition, playerScale)

        this.platformManager = new PlatformManager()
        this.player.setPublisher(this.platformManager.getPublisher())
        PhysicManager.getInstance().addNotStaticPhysicObj(this.player)

        let platformPosition = new Vector2(playerPosition.x - 50, 550)
        let scale = new Vector2(100, 30)
        this.platformManager.createStablePlatform(platformPosition, scale)
    }
    public update(deltaTime: number) {
        if (this.getGameState() == GameState.GAME_PLAY) {
            this.platformManager.createPlatforms(deltaTime, 420)
            this.platformManager.update(deltaTime)
            this.handlePlayer(deltaTime)
            UIManager.getInstance().toggleMainGameUI(true)
        } else if (this.getGameState() == GameState.GAME_OVER) {
            UIManager.getInstance().toggleMainMenu(false)
            UIManager.getInstance().toggleMainGameUI(false)
            UIManager.getInstance().toggleGameOver(true)
            this.player.update(deltaTime)
        } else if (this.getGameState() == GameState.MAIN_MENU) {
            UIManager.getInstance().toggleGameOver(false)
            UIManager.getInstance().toggleMainGameUI(false)
            UIManager.getInstance().toggleMainMenu(true)
        }
    }
    public draw(context: CanvasRenderingContext2D) {
        this.backgroundSprite.draw(context)
        context.save()
        UIManager.getInstance().getScore().draw(context)
        if (this.getGameState() == GameState.GAME_PLAY) {
            if (this.player.getPosition().y < this.canvas.height / 2) {
                context.translate(0, this.canvas.height / 2 - this.player.getPosition().y)
            }
        }

        UIManager.getInstance().draw(context)

        if (this.platformManager) {
            this.platformManager.draw(context)
        }
        if (this.player) {
            this.player.draw(context)
        }

        context.restore()
    }

    private handlePlayer(deltaTime: number) {
        this.player.update(deltaTime)
        if (this.player.getPosition().x > 640) {
            let newPos = new Vector2(0, this.player.getPosition().y)
            this.player.setPosition(newPos)
        }
        if (this.player.getPosition().x < 0) {
            let newPos = new Vector2(640, this.player.getPosition().y)
            this.player.setPosition(newPos)
        }
        let platform = this.platformManager.getTheFirstPlatform()
        if (platform != null) {
            if (this.player.getPosition().y - platform.getTransform().getPosition().y > 50) {
                // if(this.gameOver){
                //     this.toggleModal(true);
                // }
                this.player.saveHighScore()
                this.setGameState(GameState.GAME_OVER)
                this.platformManager.clearData()
                PhysicManager.getInstance().clearData()
                this.player.clearData()
            }
        }
    }
}
export default GameController
