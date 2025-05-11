//git add .
//git commit -m "message"
//git push origin main
import { PlayerMovement } from "./movement.js";
import { damageSlime, Slime } from "./slime.js";
import { Goblet, grabGoblet } from "./goblet.js";
import { Water, WaterEdge, GrassTile } from "./terrain.js"
import { Arrow } from "./arrow.js"
export class Start extends Phaser.Scene {

    constructor() {
        super('Start');
    }
    preload(){
        this.load.spritesheet("player", "/assets/Player.png", {
            frameWidth: 32, 
            frameHeight: 32
        })
        this.load.spritesheet("slime", "/assets/Slime.png", {
            frameWidth: 32, 
            frameHeight: 32
        })
        this.load.spritesheet('grassTile', "/assets/Grass_Middle.png", {
            frameWidth: 32, 
            frameHeight: 32
        })
        this.load.spritesheet('goblet', "/assets/Goblet.png", {
            frameWidth: 32, 
            frameHeight: 32
        })
        this.load.spritesheet('waterTile', "/assets/Water_Middle.png", {
            frameWidth: 32, 
            frameHeight: 32
        });
        this.load.spritesheet('arrow', '/assets/Arrow.png', {
            frameWidth: 32, 
            frameHeight: 32
        });
        this.load.spritesheet('waterEdge', '/assets/Water_Tile.png', {
            frameWidth: 16,
            frameHeight: 16
        })
    }

    create(){
        //keyboard keys
        this.keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        //collider groups
        this.slimes = [];
        this.slimeGroup = this.physics.add.group();
        this.slimeHealth = [];
        this.goblets = [];
        this.gobletGroup = this.physics.add.group();
        this.waterTiles = [];
        this.waterGroup = this.physics.add.staticGroup();
        this.arrows = [];
        this.arrowGroup = this.physics.add.group();
        this.grassTiles = [];
        //animations
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
            frames: this.anims.generateFrameNames('waterEdge', { start: 5, end: 5}),
            frameRate: 0,
            repeat: 0
        })
        this.anims.create({
            key: "leftWaterEdge",
            frames: this.anims.generateFrameNames('waterEdge', { start: 3, end: 3}),
            frameRate: 0,
            repeat: 0
        })
        this.anims.create({
            key: "topWaterEdge",
            frames: this.anims.generateFrameNames('waterEdge', { start: 1, end: 1}),
            frameRate: 0,
            repeat: 0
        })
        this.anims.create({
            key: "bottomWaterEdge",
            frames: this.anims.generateFrameNames('waterEdge', { start: 7, end: 7}),
            frameRate: 0,
            repeat: 0
        })
        //drawing grass
        for (let x = -50; x < 50; x++){
            for (let y = -50; y < 50; y++){
                new GrassTile(this, grid(x), grid(y));
            }
        }
        //pickupable items code
        this.goblets.push(new Goblet(this, grid(1), grid(0)))
        this.goblets.push(new Goblet(this, grid(-1), grid(0)))
        //mob code
        /*this.slimes.push(new Slime(this, grid(5), grid(5), this.player));
        this.slimes.push(new Slime(this, grid(4), grid(5), this.player));
        this.slimes.push(new Slime(this, grid(3), grid(5), this.player));*/
        this.slimes.forEach(slime => this.slimeHealth.push(10));
        this.slimes.forEach(slime => this.slimeGroup.add(slime.sprite));
        this.goblets.forEach(goblet => this.gobletGroup.add(goblet.sprite));
        //terrain
        this.waterTiles.push(new Water(this, grid(-2), grid(1)));
        this.waterTiles.push(new Water(this, grid(-3), grid(1)));
        new WaterEdge(this, grid(-1), grid(1), "rightWaterEdge");
        new WaterEdge(this, grid(-4), grid(1), "leftWaterEdge");
        new WaterEdge(this, grid(-2), grid(0), "topWaterEdge")
        new WaterEdge(this, grid(-3), grid(0), "topWaterEdge")
        new WaterEdge(this, grid(-3), grid(2), "bottomWaterEdge")
        new WaterEdge(this, grid(-2), grid(2), "bottomWaterEdge")
        //player code
        this.animation = "idleDown"
        this.player = this.physics.add.sprite(100, 100, "player");
        this.player.body.setSize(16, 10);
        this.player.body.offset.y = 13
        this.player.anims.play("idleDown");
        this.player.setScale(4)
        this.playerMovement = new PlayerMovement(this, this.player);
        this.shootTimer = 2;
        //player colliders
        this.physics.add.collider(this.player, this.waterGroup);
        this.physics.add.collider(this.slimeGroup, this.waterGroup);
        this.physics.add.collider(this.slimeGroup, this.slimeGroup);
        //overlap colliders
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