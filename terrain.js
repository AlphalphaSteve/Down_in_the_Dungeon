export class Water {
    constructor(scene, x, y, player) {
        this.scene = scene;
        this.tile = scene.waterGroup.create(x, y, "waterTile");
        this.tile.setScale(4);
        this.tile.refreshBody();
    }
}
