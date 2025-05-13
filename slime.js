//import { Cameras } from "phaser";

export class Slime {
    constructor(scene, x, y, player){
        this.scene = scene;
        this.sprite = this.scene.physics.add.sprite(x, y, "slime")
        this.sprite.anims.play('idleSlime')
        this.sprite.setScale(4)
        this.sprite.body.setSize(16, 16)
        this.player = player
        this.sprite.setDepth(0);
        this.isHit = false;
    }
    update(){
        if (this.isHit){this.sprite.setVelocity(0, 0); return;}
        const dx = this.player.x - this.sprite.x;
        const dy = this.player.y - this.sprite.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        let speed = 100;
        if (dist > 4 && dist < 600){
            const velocityX = (dx / dist) * speed;
            const velocityY = (dy / dist) * speed;
            this.sprite.setVelocity(velocityX, velocityY);
            if (dx < 0){
                this.sprite.setFlipX(true)
            } else{
                this.sprite.setFlipX(false)
            }
            if (dist <= 5){
                this.changeAnimation("idleSlime")
            } else {
                this.changeAnimation("movingSlime")
            }
        } else {
            this.sprite.setVelocity(0, 0)
        }
    }
    changeAnimation(newAnim){
        if (this.animation != newAnim){
            this.animation = newAnim
            this.sprite.anims.play(newAnim, true);
        }
    }
}
export function damageSlime(index, slimeHealth, slimes, damage){
    const slime = slimes[index];
    slimeHealth[index] -= damage;
    if (slimeHealth[index] <= 0){
        slime.sprite.body.enable = false;
        if (slime instanceof GreenSlime) {
            slime.sprite.anims.play("dyingGreenSlime");
        } else {
            slime.sprite.anims.play("dyingSlime");
        }        
        slime.sprite.on('animationcomplete', (animation) => {
            if (animation.key.startsWith('dying')) {
                slime.sprite.destroy()
                slimes.splice(index, 1)
                slimeHealth.splice(index, 1)
                return;
            }
        });
    } else {
        slime.sprite.anims.pause();
        slime.sprite.setTint(0xff0000);
        slime.isHit = true;
        slime.sprite.setVelocityX(0);
        slime.sprite.setVelocityY(0);
        slime.scene.time.delayedCall(400, () => {
            slime.sprite.anims.resume();
            slime.sprite.clearTint();
            slime.isHit = false;
        });
    }
    return slimeHealth[index];
}

export class GreenSlime {
    constructor(scene, x, y, player){
        this.scene = scene;
        this.sprite = this.scene.physics.add.sprite(x, y, "greenSlime")
        this.sprite.anims.play('idleGreenSlime')
        this.sprite.setScale(4)
        this.sprite.body.setSize(20, 20)
        this.player = player
        this.sprite.setDepth(0);
        this.isHit = false;
    }
    update(){
        if (this.isHit){this.sprite.setVelocity(0, 0); return;}
        const dx = this.player.x - this.sprite.x;
        const dy = this.player.y - this.sprite.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        let speed = 100;
        if (dist > 4 && dist < 600){
            const velocityX = (dx / dist) * speed;
            const velocityY = (dy / dist) * speed;
            this.sprite.setVelocity(velocityX, velocityY);
            if (dx < 0){
                this.sprite.setFlipX(true)
            } else{
                this.sprite.setFlipX(false)
            }
            if (dist <= 5){
                this.changeAnimation("idleGreenSlime")
            } else {
                this.changeAnimation("movingGreenSlime")
            }
        } else {
            this.sprite.setVelocity(0, 0)
        }
    }
    changeAnimation(newAnim){
        if (this.animation != newAnim){
            this.animation = newAnim
            this.sprite.anims.play(newAnim, true);
        }
    }
}
