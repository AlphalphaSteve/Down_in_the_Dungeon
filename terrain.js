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
export class Cliff {
    constructor(scene, x, y, animation){
        this.scene = scene;
        this.tile = scene.add.sprite(x, y, "cliffTile");
        this.tile.anims.play(animation);
        this.tile.setScale(4);
        this.scene.cliffGroup.add(this.tile);
    }
}
export class House {
    constructor(scene, x, y){
        this.scene = scene;
        this.tile = scene.add.sprite(x, y, "house");
        this.tile.setScale(4);
        this.scene.houseGroup.add(this.tile);
    }
}
export class Path {
    constructor(scene, x, y, animation){
        this.scene = scene;
        this.tile = scene.add.sprite(x, y, "pathTile");
        this.tile.anims.play(animation);
        this.tile.setScale(4);
    }
}
