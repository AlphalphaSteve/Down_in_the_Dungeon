import { Start } from "./start.js";
export class Arrow {
    constructor(scene, x, y, direction){
        this.scene = scene;
        this.direction = direction;
        this.sprite = scene.physics.add.sprite(x, y, 'arrow');
        this.sprite.setScale(4);
        this.sprite.setSize(32, 7)
        this.sprite.body.setAllowGravity(false);
        this.scene.arrowGroup.add(this.sprite);
        this.speed = 900;
        if (this.direction === "up"){
            this.sprite.setVelocity(0, -this.speed);
            this.sprite.setSize(7, 32)
            this.sprite.setAngle(270);
        } else if (this.direction === "down"){
            this.sprite.setVelocity(0, this.speed);
            this.sprite.setAngle(90);
            this.sprite.setSize(7, 32)
        } else if (this.direction === "left"){
            this.sprite.setVelocity(-this.speed, 0);
            this.sprite.setSize(32, 7)
            this.sprite.setAngle(180);
        } else if (this.direction === "right"){
            this.sprite.setVelocity(this.speed, 0);
            this.sprite.setSize(32, 7)
            this.sprite.setAngle(0);
        }
    }
}