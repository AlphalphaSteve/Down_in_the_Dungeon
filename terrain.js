export class Water {
    constructor(scene, x, y) {
        this.scene = scene;
        this.tile = scene.waterGroup.create(x, y, "waterTile");
        this.tile.setScale(4);
        this.tile.refreshBody();
    }
}
export class WaterEdge {
    constructor(scene, x, y, animation){
        this.scene = scene;
        this.tile = scene.add.sprite(x, y, "waterEdge");
        this.tile.anims.play(animation);
        this.tile.setScale(4);
    }
}
export class GrassTile {
    constructor(scene, x, y){
        this.scene = scene;
        this.tile = scene.add.image(x, y, "grassTile")
        this.tile.setScale(4);
    }
}
