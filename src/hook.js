export default class Hook extends Phaser.GameObjects.Sprite {

    /**
     * Constructor de Star
     * @param {Sceme} scene Escena en la que aparece la estrella
     * @param {number} x coordenada x
     * @param {number} y coordenada y
     */
    constructor(scene, x, y) {
        super(scene, x, y, 'hook');

        this.speed = 300;

        this.create();
    }

    create() 
     {
        // this.scene.physics.add.collider(this, this.scene.bubbles);

        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        // Queremos que el gancho no se salga de los límites del mundo
        this.body.setCollideWorldBounds();

        this.lines = [];
        this.i = 0;


        this.body.velocity.set(0, -this.speed);
    }

    /**
     * Redefinición del preUpdate de Phaser
     * @override
     */
    preUpdate(t, dt) {
        super.preUpdate(t,dt);

        if (this.scene.physics.overlap(this.scene.bubbles, this)) {
            console.log("bullet hit bubble");
            this.destroy();
        }
        else if (this.scene.physics.overlap(this.scene.wall, this))
        {
            console.log("collision");
            this.destroy();
        }
        else
        {
            this.lines[this.i++] = new Phaser.Geom.Line(this.scene, this.x, 2000, 0xff0000);
        }

    }
}