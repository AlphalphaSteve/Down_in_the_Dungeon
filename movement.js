let attackTimer = 0
let isAttacking = false
export class PlayerMovement {
    constructor(scene, player) {
        this.scene = scene;
        this.player = player;
        this.currentAnim = "idle";
        this.keyW = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.keyA = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.keyS = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.keyD = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.keySPACE = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.health = 20;
        this.direction = "down"
        this.player.setDepth(1);
        this.attackHitbox = this.scene.add.rectangle(-100, -100, 96, 96, 0xff0000, 0);
        this.healthBarBack = this.scene.add.rectangle(this.player.x, this.player.y, this.health*2 + 10, 20, 0x000000, 1);
        this.healthBar = this.scene.add.rectangle(this.player.x, this.player.y, this.health*2, 10, 0xFF0000, 1);
        this.scene.physics.add.existing(this.attackHitbox);
        this.attackHitbox.body.enable = false;
        this.player.on('animationcomplete', (animation) => {
            if (animation.key.startsWith('attack')) {
                isAttacking = false;
                this.attackHitbox.body.enable = false;
            }
        });
    }
    update(){
        const player = this.player;
        this.health += 0.01;
        if (this.health <= 0){
            this.health = 0;
            console.log("YOU DIED");
            this.scene.scene.restart();
        }
        if (this.health > 20){
            this.health = 20;
        }
        this.healthBar.x = this.player.x - 2;
        this.healthBar.y = this.player.y - 64;
        this.healthBarBack.x = this.player.x - 2;
        this.healthBarBack.y = this.player.y - 64;
        this.healthBar.width = this.health*2;
        if (this.keySPACE.isDown && attackTimer <= 0 && !isAttacking){
            this.attack()
        }
        this.player.setVelocity(0)
        if (isAttacking){return;}
        if (this.keyW.isDown){
            if (!isAttacking){
                this.changeAnimation("walkUp");
                this.player.setVelocityY(-325);
            }
            this.player.setFlipX(false)
            this.direction = "up"
        }
        else if (this.keyS.isDown){
            if (!isAttacking){
                this.changeAnimation("walkDown")
                this.player.setVelocityY(325);
            }
            this.player.setFlipX(false)
            this.direction = "down"
        }
        else if (this.keyD.isDown){
            this.player.setFlipX(false)
            if (!isAttacking){
                this.changeAnimation("walkRight")
                this.player.setVelocityX(325)
            }
            this.direction = "right"
        }
        else if (this.keyA.isDown){
            this.player.setFlipX(true)
            if (!isAttacking){
                this.changeAnimation("walkRight")
                this.player.setVelocityX(-325)   
            }
            this.direction = "left"
        }
        else{
            if(this.direction === "down" && !isAttacking){this.changeAnimation("idleDown")}
            if(this.direction === "up" && !isAttacking){this.changeAnimation("idleUp")}
            if(this.direction === "right" && !isAttacking){this.changeAnimation("idleRight")}
            if(this.direction === "left" && !isAttacking){this.changeAnimation("idleRight")}
        }
        attackTimer -= 1;
        if (attackTimer < -100){
            attackTimer = 0;
        }
    }
    attack(){
        isAttacking = true;
        let offsetX = 0, offsetY = 0;
        const distance = 64
        if (this.direction === "up"){this.changeAnimation("attackUp"); offsetY = -distance}
        if (this.direction === "down"){this.changeAnimation("attackDown"); offsetY = distance}
        if (this.direction === "left"){this.changeAnimation("attackSide"); offsetX = -distance}
        if (this.direction === "right"){this.changeAnimation("attackSide"); offsetX = distance}
        this.attackHitbox.x = this.player.x + offsetX;
        this.attackHitbox.y = this.player.y + offsetY;
        console.log("attacking");
        attackTimer = 20;
        this.attackHitbox.body.enable = true;
    }
    changeAnimation(newAnim){
        if (this.animation != newAnim){
            this.animation = newAnim
            this.player.anims.play(newAnim, true);
        }
    }

}