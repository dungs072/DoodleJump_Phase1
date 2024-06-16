import Vector2 from '../base-types/Vector2'
import GameState from '../base-types/enums/GameState'
import PhysicManager from '../physic/PhysicManager'
import PlatformManager from '../platforms/PlatformManager'
import Player from '../player/Player'
import ProjectileManager from '../projectile/ProjectileManager'
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

    constructor() {
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
        } else if (this.getGameState() == GameState.MAIN_MENU) {
            UIManager.getInstance().toggleGameOver(false)
            UIManager.getInstance().toggleMainGameUI(false)
            UIManager.getInstance().toggleMainMenu(true)
        }
    }
    public draw(context: CanvasRenderingContext2D) {
        UIManager.getInstance().draw(context)

        if (this.platformManager) {
            this.platformManager.draw(context)
        }
        if (this.player) {
            this.player.draw(context)
        }
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
        if (this.player.getPosition().y >= 600) {
            // if(this.gameOver){
            //     this.toggleModal(true);
            // }
            this.setGameState(GameState.GAME_OVER)
            this.platformManager.clearData()
            PhysicManager.getInstance().clearData()
            this.player.clearData()
        }
    }
}
export default GameController
