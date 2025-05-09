import { PlayerMovement } from "./movement.js";
import { damageSlime, Slime } from "./slime.js";
import { Goblet, grabGoblet } from "./goblet.js";
import { Water } from "./terrain.js"
import { Arrow } from "./arrow.js"
export class Start extends Phaser.Scene {

    constructor() {
        super('Start');
    }
    preload(){
        this.load.spritesheet("player", "/rouge_like/assets/Player.png", {
            frameWidth: 32, 
            frameHeight: 32
        })
        this.load.spritesheet("slime", "/rouge_like/assets/Slime.png", {
            frameWidth: 32, 
            frameHeight: 32
        })
        this.load.spritesheet('grassTile', "/rouge_like/assets/Grass_Middle.png", {
            frameWidth: 32, 
            frameHeight: 32
        })
        this.load.spritesheet('goblet', "/rouge_like/assets/Goblet.png", {
            frameWidth: 32, 
            frameHeight: 32
        })
        this.load.spritesheet('waterTile', "/rouge_like/assets/Water_Middle.png", {
            frameWidth: 32, 
            frameHeight: 32
        });
        this.load.spritesheet('arrow', '/rouge_like/assets/Arrow.png', {
            frameWidth: 32, 
            frameHeight: 32
        });
        this.load.spritesheet('waterEdge', '/rouge_like/assets/Water_Tile', {
            frameWidth: 32,
            frameHeight: 32
        })
    }

    create(){
        this.keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        this.slimes = [];
        this.slimeGroup = this.physics.add.group();
        this.slimeHealth = [];
        this.goblets = [];
        this.gobletGroup = this.physics.add.group();
        this.waterTiles = [];
        this.waterGroup = this.physics.add.staticGroup();
        this.arrows = [];
        this.arrowGroup = this.physics.add.group();
        this.anims.create({
            key: "idleDown", 
            frames: this.anims.generateFrameNumbers('player', { start: 0, end: 5}),
            frameRate: 10, 
            repeat: -1
        });
        this.anims.create({
            key: "idleUp", 
            frames: this.anims.generateFrameNumbers('player', { start: 12, end: 17}),
            frameRate: 10, 
            repeat: -1
        });
        this.anims.create({
            key: "idleRight", 
            frames: this.anims.generateFrameNumbers('player', { start: 6, end: 11}),
            frameRate: 10, 
            repeat: -1
        });
        this.anims.create({
            key: "walkUp", 
            frames: this.anims.generateFrameNumbers('player', { start: 31, end: 35}),
            frameRate: 10, 
            repeat: -1
        });
        this.anims.create({
            key: "walkDown", 
            frames: this.anims.generateFrameNumbers('player', { start: 19, end: 23}),
            frameRate: 10, 
            repeat: -1
        });
        this.anims.create({
            key: "walkRight", 
            frames: this.anims.generateFrameNumbers('player', { start: 24, end: 29}),
            frameRate: 10, 
            repeat: -1
        });
        this.anims.create({
            key: "attackUp", 
            frames: this.anims.generateFrameNumbers('player', { start: 48, end: 51}),
            frameRate: 10, 
            repeat: 0
        });
        this.anims.create({
            key: "attackDown", 
            frames: this.anims.generateFrameNumbers('player', { start: 36, end: 39}),
            frameRate: 10, 
            repeat: 0
        });
        this.anims.create({
            key: "attackSide", 
            frames: this.anims.generateFrameNumbers('player', { start: 42, end: 45}),
            frameRate: 10, 
            repeat: 0
        });
        this.anims.create({
            key: "idleSlime", 
            frames: this.anims.generateFrameNumbers('slime', { start: 0, end: 3}),
            frameRate: 7, 
            repeat: -1
        });
        this.anims.create({
            key: "movingSlime", 
            frames: this.anims.generateFrameNumbers('slime', { start: 6, end: 11}),
            frameRate: 7, 
            repeat: -1
        });
        this.anims.create({
            key: "dyingSlime",
            frames: this.anims.generateFrameNames("slime", { start: 12, end: 16}), 
            frameRate: 7, 
            repeat: 0
        });
        this.anims.create({
            key: "idleGoblet",
            frames: this.anims.generateFrameNumbers('goblet', { start: 0, end: 5}),
            frameRate: 5, 
            repeat: -1
        });
        this.anims.create({
            key: "rightWaterEdge",
            frames: this.anims.generateFrameNames('waterEdgea')
        })
        this.animation = "idleDown"
        //this.add.image(200, 100, "grassTile").setScale(4)
        this.player = this.physics.add.sprite(100, 100, "player");
        this.player.body.setSize(16, 10);
        this.player.body.offset.y = 13
        this.goblets.push(new Goblet(this, grid(1), grid(0)))
        this.goblets.push(new Goblet(this, grid(-1), grid(0)))
        this.slimes.push(new Slime(this, grid(5), grid(5), this.player));
        this.slimes.push(new Slime(this, grid(4), grid(5), this.player));
        this.slimes.push(new Slime(this, grid(3), grid(5), this.player));
        /*for (let x = 10; x < 20; x++){
            for (let y = 10; y < 20; y++){
                this.slimes.push(new Slime(this, grid(x), grid(y), this.player))
            }
        }*/
        this.slimes.forEach(slime => this.slimeHealth.push(10));
        this.goblets.forEach(goblet => this.gobletGroup.add(goblet.sprite));
        this.waterTiles.push(new Water(this, grid(-2), grid(1), this.player));
        this.waterTiles.push(new Water(this, grid(-3), grid(1), this.player));
        this.player.anims.play("idleDown");
        this.player.setScale(4)
        this.playerMovement = new PlayerMovement(this, this.player);
        this.physics.add.collider(this.player, this.waterGroup);
        this.physics.add.collider(this.slimeGroup, this.waterGroup);
        this.physics.add.collider(this.slimeGroup, this.slimeGroup);
        //this.physics.add.collider(this.player, this.slimeGroup);
        this.physics.add.overlap(
            this.playerMovement.attackHitbox,
            this.slimeGroup,
            (attackHitbox, slimeSprite) => {
                const hitSlime = this.slimes.find(slime => slime.sprite === slimeSprite);
                const index = this.slimes.indexOf(hitSlime);
                damageSlime(index, this.slimeHealth, this.slimes, 5)
                console.log(this.slimeHealth);
                attackHitbox.body.enable = false;
            },
            null,
            this
        );
        this.physics.add.overlap(
            this.player, 
            this.gobletGroup, 
            (player, gobletSprite) => {
                this.playerMovement.health += 5;
                if (this.playerMovement.health > 20) {
                    this.playerMovement.health = 20;
                }
                console.log("gotGoblet")
                const grabbedGoblet = this.goblets.find(goblet => goblet.sprite === gobletSprite);
                const gobletIndex = this.goblets.indexOf(grabbedGoblet);
                grabGoblet(gobletIndex, this.goblets);
            }, 
            null, 
            this
        );
        this.physics.add.overlap(
            this.arrowGroup, 
            this.slimeGroup, 
            (arrows, slimeSprite) => {
                const hitSlime = this.slimes.find(slime => slime.sprite === slimeSprite);
                const index = this.slimes.indexOf(hitSlime);
                damageSlime(index, this.slimeHealth, this.slimes, 2);
                console.log("shot slime");
                arrows.destroy();
            }, 
            null, 
            this
        );
        this.physics.add.overlap(
            this.slimeGroup, 
            this.player, 
            (slimeSprite, player) => {
                this.playerMovement.health -= 5/60;
                console.log(this.playerMovement.health);
            }, 
            null, 
            this
        );
        this.physics.add.overlap(
            this.player, 
            this.slimeGroup, 
            (slimeSprite, player) => {
                this.playerMovement.health -= 5/60;
                console.log(this.playerMovement.health);
            }, 
            null, 
            this
        );
        this.slimes.forEach(slime => this.slimeGroup.add(slime.sprite));
        console.log(this.slimeGroup)
        console.log(this.slimeGroup)
        console.log(this.slimeHealth)
        this.shootTimer = 2;
    }
    update(){
        this.cameras.main.startFollow(this.player);
        this.shootTimer -= 1/60;
        this.playerMovement.update()
        for (let slime of this.slimes) {
            slime.update();
        }
        if (Phaser.Input.Keyboard.JustDown(this.keyR) && this.shootTimer <= 0) {
            let dir = this.playerMovement.direction;
            const arrow = new Arrow(this, this.player.x, this.player.y, dir);
            this.arrows.push(arrow);
            console.log('player direction:' + this.playerMovement.direction);
            console.log(arrow.sprite)
            this.shootTimer = 1;
        }              
        
    }
}
function grid(choordinate){
    choordinate = choordinate * 64;
    return choordinate;
}