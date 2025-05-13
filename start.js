//git add .
//git commit -m "message"
//git push origin main
import { PlayerMovement } from "./movement.js";
import { damageSlime, Slime, GreenSlime } from "./slime.js";
import { Goblet, grabGoblet, GreenGoblet } from "./goblet.js";
import { Water, WaterEdge, GrassTile, Cliff, House, Path } from "./terrain.js"
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
        });
        this.load.spritesheet('cliffTile', '/assets/Cliff_Tile.png', {
            frameWidth: 16, 
            frameHeight: 16
        });
        this.load.spritesheet('house', '/assets/House.png', {
            frameWidth: 80, 
            frameHeight: 112
        });
        this.load.spritesheet('pathTile', '/assets/Path_Tile.png', {
            frameWidth: 16,
            frameHeight: 16
        })
        this.load.spritesheet('greenSlime', '/assets/Slime_Green.png', {
            frameWidth: 64,
            frameHeight: 64
        });
        this.load.spritesheet('sword', '/assets/Sword.png', {
            frameWidth: 32,
            frameHeight: 32
        });
        this.load.spritesheet('greenGoblet', "/assets/Goblet_Green.png", {
            frameWidth: 32, 
            frameHeight: 32
        });
    }

    create(){
        //keyboard keys
        this.keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        //collider groups
        this.slimes = [];
        this.greenSlimes = [];
        this.slimeGroup = this.physics.add.group();
        this.greenSlimeGroup = this.physics.add.group();
        this.slimeHealth = [];
        this.goblets = [];
        this.greenGoblets = [];
        this.greenGobletGroup = this.physics.add.group();
        this.gobletGroup = this.physics.add.group();
        this.waterTiles = [];
        this.waterGroup = this.physics.add.staticGroup();
        this.arrows = [];
        this.arrowGroup = this.physics.add.group();
        this.grassTiles = [];
        this.cliffGroup = this.physics.add.staticGroup();
        this.houseGroup = this.physics.add.staticGroup();
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
        this.anims.create({
            key: "bottomLeftWaterCorner",
            frames: this.anims.generateFrameNames('waterEdge', { start: 6, end: 6}),
            frameRate: 0,
            repeat: 0
        })
        this.anims.create({
            key: "bottomRightWaterCorner",
            frames: this.anims.generateFrameNames('waterEdge', { start: 8, end: 8}),
            frameRate: 0,
            repeat: 0
        })
        this.anims.create({
            key: "topLeftWaterCorner",
            frames: this.anims.generateFrameNames('waterEdge', { start: 0, end: 0}),
            frameRate: 0,
            repeat: 0
        })
        this.anims.create({
            key: "topRightWaterCorner",
            frames: this.anims.generateFrameNames('waterEdge', { start: 2, end: 2}),
            frameRate: 0,
        });
        this.anims.create({
            key: "topCliff",
            frames: this.anims.generateFrameNames('cliffTile', { start: 1, end: 1}),
            frameRate: 0, 
            repeat: 0
        });
        this.anims.create({
            key: "bottomCliff",
            frames: this.anims.generateFrameNames('cliffTile', { start: 7, end: 7}),
            frameRate: 0, 
            repeat: 0
        });
        this.anims.create({
            key: "leftCliff",
            frames: this.anims.generateFrameNames('cliffTile', { start: 3, end: 3}),
            frameRate: 0, 
            repeat: 0
        });
        this.anims.create({
            key: "rightCliff",
            frames: this.anims.generateFrameNames('cliffTile', { start: 5, end: 5}),
            frameRate: 0, 
            repeat: 0
        });
        this.anims.create({
            key: "topLeftCliffCorner",
            frames: this.anims.generateFrameNames('cliffTile', { start: 0, end: 0}),
            frameRate: 0, 
            repeat: 0
        });
        this.anims.create({
            key: "topRightCliffCorner",
            frames: this.anims.generateFrameNames('cliffTile', { start: 2, end: 2}),
            frameRate: 0, 
            repeat: 0
        });
        this.anims.create({
            key: "bottomLeftCliffCorner",
            frames: this.anims.generateFrameNames('cliffTile', { start: 6, end: 6}),
            frameRate: 0, 
            repeat: 0
        });
        this.anims.create({
            key: "bottomRightCliffCorner",
            frames: this.anims.generateFrameNames('cliffTile', { start: 8, end: 8 }),
            frameRate: 0, 
            repeat: 0
        });
        this.anims.create({
            key: "middlePath",
            frames: this.anims.generateFrameNames('pathTile', { start: 4, end: 4 }),
            frameRate: 0, 
            repeat: 0
        });
        this.anims.create({
            key: "topPath",
            frames: this.anims.generateFrameNames('pathTile', { start: 1, end: 1 }),
            frameRate: 0, 
            repeat: 0
        });
        this.anims.create({
            key: "bottomPath",
            frames: this.anims.generateFrameNames('pathTile', { start: 7, end: 7 }),
            frameRate: 0, 
            repeat: 0
        });
        this.anims.create({
            key: "leftPath",
            frames: this.anims.generateFrameNames('pathTile', { start: 3, end: 3 }),
            frameRate: 0, 
            repeat: 0
        });
        this.anims.create({
            key: "rightPath",
            frames: this.anims.generateFrameNames('pathTile', { start: 5, end: 5 }),
            frameRate: 0, 
            repeat: 0
        });
        this.anims.create({
            key: "bottomLeftPathCorner",
            frames: this.anims.generateFrameNames('pathTile', { start: 6, end: 6 }),
            frameRate: 0, 
            repeat: 0
        });
        this.anims.create({
            key: "bottomRightPathCorner",
            frames: this.anims.generateFrameNames('pathTile', { start: 8, end: 8 }),
            frameRate: 0, 
            repeat: 0
        });
        this.anims.create({
            key: "topLeftPathCorner",
            frames: this.anims.generateFrameNames('pathTile', { start: 0, end: 0 }),
            frameRate: 0, 
            repeat: 0
        });
        this.anims.create({
            key: "topRightPathCorner",
            frames: this.anims.generateFrameNames('pathTile', { start: 2, end: 2 }),
            frameRate: 0, 
            repeat: 0
        });
        this.anims.create({
            key: "topRightOuterPathCorner",
            frames: this.anims.generateFrameNames('pathTile', { start: 10, end: 10 }),
            frameRate: 0, 
            repeat: 0
        });
        this.anims.create({
            key: "bottomRightOuterPathCorner",
            frames: this.anims.generateFrameNames('pathTile', { start: 13, end: 13 }),
            frameRate: 0, 
            repeat: 0
        });
        this.anims.create({
            key: "bottomLeftOuterPathCorner",
            frames: this.anims.generateFrameNames('pathTile', { start: 12, end: 12 }),
            frameRate: 0, 
            repeat: 0
        });
        this.anims.create({
            key: "topLeftOuterPathCorner",
            frames: this.anims.generateFrameNames('pathTile', { start: 9, end: 9 }),
            frameRate: 0, 
            repeat: 0
        });
        this.anims.create({
            key: "idleGreenSlime",
            frames: this.anims.generateFrameNames('greenSlime', { start: 0, end: 3}),
            frameRate: 7,
            repeat: -1
        });
        this.anims.create({
            key: "movingGreenSlime",
            frames: this.anims.generateFrameNames('greenSlime', { start: 8, end: 15}),
            frameRate: 7,
            repeat: -1
        });
        this.anims.create({
            key: "dyingGreenSlime",
            frames: this.anims.generateFrameNames('greenSlime', { start: 16, end: 23}),
            frameRate: 7,
            repeat: 0
        });
        this.anims.create({
            key: "idleGreenGoblet",
            frames: this.anims.generateFrameNames('greenGoblet', { start: 0, end: 5}),
            frameRate: 5,
            repeat: -1
        });
        //drawing grass
        for (let x = -50; x < 50; x++){
            for (let y = -50; y < 50; y++){
                new GrassTile(this, grid(x), grid(y));
            }
        }
        //terrain
        this.waterTiles.push(new Water(this, grid(-2), grid(1)));
        this.waterTiles.push(new Water(this, grid(-3), grid(1)));
        new WaterEdge(this, grid(-1), grid(1), "rightWaterEdge");
        new WaterEdge(this, grid(-4), grid(1), "leftWaterEdge");
        new WaterEdge(this, grid(-2), grid(0), "topWaterEdge");
        new WaterEdge(this, grid(-3), grid(0), "topWaterEdge");
        new WaterEdge(this, grid(-3), grid(2), "bottomWaterEdge");
        new WaterEdge(this, grid(-2), grid(2), "bottomWaterEdge");
        new WaterEdge(this, grid(-4), grid(2), "bottomLeftWaterCorner");
        new WaterEdge(this, grid(-1), grid(2), "bottomRightWaterCorner");
        new WaterEdge(this, grid(-4), grid(0), "topLeftWaterCorner");
        new WaterEdge(this, grid(-1), grid(0), "topRightWaterCorner")
        new Cliff(this, grid(-6), grid(-5), "topLeftCliffCorner");
        new Path(this, grid(1), grid(2), "middlePath")
        new Path(this, grid(0), grid(2), "leftPath")
        new Path(this, grid(1), grid(1), "topPath")
        new Path(this, grid(0), grid(1), "topLeftPathCorner")
        new Path(this, grid(0), grid(3), "bottomLeftPathCorner")
        new Path(this, grid(1), grid(3), "bottomPath")
        for (let x = 2; x < 13; x++){
            new Path(this, grid(x), grid(2), "middlePath");
            new Path(this, grid(x), grid(1), "topPath");
            new Path(this, grid(x), grid(3), "bottomPath");
        }
        new Path(this, grid(13), grid(1), "topPath");
        new Path(this, grid(15), grid(1), "topRightPathCorner");
        new Path(this, grid(14), grid(1), "topPath")
        new Path(this, grid(15), grid(2), "rightPath")
        new Path(this, grid(15), grid(3), "rightPath")
        new Path(this, grid(13), grid(3), "topRightOuterPathCorner");
        new Path(this, grid(13), grid(2), "middlePath");
        for (let y = 2; y < 10; y++){
            new Path(this, grid(14), grid(y), "middlePath");
        }
        for (let y = 4; y < 10; y++){
            new Path(this, grid(13), grid(y), "leftPath");
            new Path(this, grid(15), grid(y), "rightPath");
        }
        new Path(this, grid(15), grid(10), "bottomLeftOuterPathCorner");
        new Path(this, grid(13), grid(10), "leftPath");
        new Path(this, grid(13), grid(11), "leftPath");
        new Path(this, grid(13), grid(12), "bottomLeftPathCorner");
        new Path(this, grid(14), grid(12), "bottomPath");
        new Path(this, grid(15), grid(12), "bottomPath");
        new Path(this, grid(14), grid(10), "middlePath");
        new Path(this, grid(14), grid(11), "middlePath");
        new Path(this, grid(15), grid(11), "middlePath");
        for (let x = 16; x < 26; x++){
            new Path(this, grid(x), grid(11), "middlePath")
            new Path(this, grid(x), grid(10), "topPath")
            new Path(this, grid(x), grid(12), "bottomPath")
        }
        new Path(this, grid(26), grid(10), "bottomRightOuterPathCorner");
        new Path(this, grid(26), grid(12), "topRightOuterPathCorner");
        new Path(this, grid(26), grid(9), "topLeftPathCorner");
        new Path(this, grid(26), grid(13), "bottomLeftPathCorner");
        new Path(this, grid(27), grid(13), "bottomPath");
        new Path(this, grid(27), grid(9), "topPath");
        new Path(this, grid(28), grid(9), "topRightPathCorner");
        new Path(this, grid(28), grid(13), "bottomRightPathCorner");
        new Path(this, grid(28), grid(12), "rightPath");
        new Path(this, grid(28), grid(11), "rightPath");
        new Path(this, grid(28), grid(10), "rightPath");
        new Path(this, grid(27), grid(11), "middlePath");
        new Path(this, grid(26), grid(11), "middlePath");
        new Path(this, grid(27), grid(12), "middlePath");
        new Path(this, grid(27), grid(10), "middlePath");
        for (let x = -5; x < 30; x++){
            new Cliff(this, grid(x), grid(-5), "topCliff");
        }
        for (let x = -5; x < 30; x++){
            new Cliff(this, grid(x), grid(15), "bottomCliff");
        }
        for (let y = -4; y < 15; y++){
            new Cliff(this, grid(-6), grid(y), "leftCliff");
        }
        for (let y = -4; y < 15; y++){
            new Cliff(this, grid(30), grid(y), "rightCliff");
        }
        new Cliff(this, grid(-6), grid(15), "bottomLeftCliffCorner")
        new Cliff(this, grid(30), grid(-5), "topRightCliffCorner")
        new Cliff(this, grid(30), grid(15), "bottomRightCliffCorner")
        new House(this, grid(10), grid(-3));
        new House(this, grid(20), grid(6));
        //pickupable items code
        this.goblets.push(new Goblet(this, grid(13), grid(0)))
        this.goblets.push(new Goblet(this, grid(14), grid(0)))
        this.sword = this.physics.add.staticSprite(1708, 684, "sword")
        this.greenGoblets.push(new GreenGoblet(this, 1728, 570));
        this.greenGoblets.push(new GreenGoblet(this, 1728, 790));
        this.sword.setScale(4);
        this.sword.setSize(128, 128);
        this.sword.setOffset(-48, -48);
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
        this.physics.add.collider(this.player, this.cliffGroup);
        this.physics.add.collider(this.player, this.houseGroup);
        //mob code
        this.slimes.push(new Slime(this, grid(14), grid(5), this.player));
        this.slimes.push(new Slime(this, grid(15), grid(6), this.player));
        this.slimes.push(new Slime(this, grid(15), grid(4), this.player));
        this.greenSlime1 = new GreenSlime(this, grid(25), grid(11), this.player);
        this.slimes.forEach(slime => this.slimeHealth.push(10));
        this.slimes.forEach(slime => this.slimeGroup.add(slime.sprite));
        this.slimeGroup.add(this.greenSlime1.sprite);
        this.greenSlimeGroup.add(this.greenSlime1.sprite);
        this.slimes.push(this.greenSlime1);
        this.slimeHealth.push(50);
        this.goblets.forEach(goblet => this.gobletGroup.add(goblet.sprite));
        this.greenGoblets.forEach(greenGoblet => this.greenGobletGroup.add(greenGoblet.sprite));
        //overlap colliders
        this.physics.add.overlap(
            this.playerMovement.attackHitbox,
            this.slimeGroup,
            (attackHitbox, slimeSprite) => {
                const hitSlime = this.slimes.find(slime => slime.sprite === slimeSprite);
                const index = this.slimes.indexOf(hitSlime);
                damageSlime(index, this.slimeHealth, this.slimes, 50)
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
            this.player, 
            this.greenGobletGroup, 
            (player, greenGobletSprite) => {
                this.moreHealth = true
                this.playerMovement.health += 15;
                console.log("gotGoblet")
                const grabbedGoblet = this.greenGoblets.find(greenGoblet => greenGoblet.sprite === greenGobletSprite);
                const gobletIndex = this.greenGoblets.indexOf(grabbedGoblet);
                grabGoblet(gobletIndex, this.greenGoblets);
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
            this.greenSlimeGroup, 
            this.player, 
            (slimeSprite, player) => {
                this.playerMovement.health -= 10/60;
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
        this.physics.add.overlap(
            this.player, 
            this.sword, 
            () => {
                if (this.slimes.length === 0){
                    this.text = this.add.text(grid(25), grid(7), 'You Win!', {
                        font: '48px Verdana',
                        fill: 'ffffff',
                        stroke: '#000',
                        strokeThickness: 4,
                    });
                    this.scene.pause();
                }
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