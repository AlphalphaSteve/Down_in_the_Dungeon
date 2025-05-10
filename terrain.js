export class Water {
    constructor(scene, x, y) {
        this.scene = scene;
        this.tile = scene.waterGroup.create(x, y, "waterTile");
        this.tile.setScale(4);
        this.tile.refreshBody();
    }
}
export class RightWaterEdge {
    constructor(scene, x, y) {
        this.scene = scene;
        this.tile = scene.waterGroup.create(x, y, "rightWaterEdge");
        this.tile.setScale(4);
        this.tile.refreshBody();
    }
}
