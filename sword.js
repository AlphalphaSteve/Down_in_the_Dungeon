export class Sword {
    constructor(scene, x, y){
        this.scene = scene;
        this.sprite = this.scene.swordGroup.create(x, y, "")
    }
}