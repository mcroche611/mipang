export default class Wall
 {

    /**
     * Constructor de Star
     * @param {Sceme} scene Escena en la que aparece la estrella
     * @param {number} x coordenada x
     * @param {number} y coordenada y
     */
    constructor(scene, x, y) {
        this.scene = scene;
        this.y = y;
        this.x = x;

        this.create();
    }

    create() 
    {
        this.rect = this.scene.add.rectangle(20, 0, 2000, 10, 0xff0000);
    }

    /**
     * Redefinición del preUpdate de Phaser
     * @override
     */
    preUpdate(t, dt) {
    }
}