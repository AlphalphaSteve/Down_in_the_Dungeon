import { Start } from './start.js';
let currentScene = Start
const config = {
    type: Phaser.AUTO,
    parent: 'game-container',
    width: 1280,
    height: 720,
    backgroundColor: '#78cc94',
    pixelArt: true,
    scene: [
        currentScene
    ],
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    physics: {
        default: 'arcade', 
        arcade: {
            gravity: {y: 0},
            debug: false
        }
    }
}
const game = new Phaser.Game(config);
            