export class Goblet{
    constructor(scene, x, y){
        this.scene = scene;
        this.sprite = this.scene.physics.add.sprite(x, y, "goblet")
        this.sprite.anims.play("idleGoblet");
        this.sprite.setScale(4);
        this.sprite.body.setSize(8, 16);
    }
    changeAnimation(newAnim){
        if (this.animation != newAnim){
            this.animation = newAnim
            this.sprite.anims.play(newAnim, true);
        }
    }
}
export class GreenGoblet{
    constructor(scene, x, y){
        this.scene = scene;
        this.sprite = this.scene.physics.add.sprite(x, y, "greenGoblet")
        this.sprite.anims.play("idleGreenGoblet");
        this.sprite.setScale(4);
        this.sprite.body.setSize(8, 16);
    }
    changeAnimation(newAnim){
        if (this.animation != newAnim){
            this.animation = newAnim
            this.sprite.anims.play(newAnim, true);
        }
    }
}
export function grabGoblet(gobletIndex, goblets){
goblets[gobletIndex].sprite.destroy()
goblets.splice(gobletIndex, 1)
return;
}