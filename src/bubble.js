export default class Bubble extends Phaser.GameObjects.Sprite {

    /**
     * Constructor de Star
     * @param {Sceme} scene Escena en la que aparece la estrella
     * @param {number} x coordenada x
     * @param {number} y coordenada y
     */
    constructor(scene, x, y) {
        super(scene, x, y, 'star');

        this.speed = 100;

        this.create();
    }

    create() 
    {
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        // Queremos que la burbuja no se salga de los límites del mundo
        this.body.setCollideWorldBounds();

        // let radius = this.getRandomInt(0, 3) * 18;

        // this.graphics = this.scene.add.graphics({ fillStyle: { color: 0xff00000 } });

        // this.circle = new Phaser.Geom.Circle(x, y, radius);

        // this.graphics.fillCircleShape(this.circle);

        if (this.getRandomInt(0, 2) == 0) 
        {
            if (this.getRandomInt(0, 2) == 0)
                this.body.velocity.set(this.speed, this.speed);
            else
                this.body.velocity.set(this.speed, -this.speed);
        }
        else 
        {
            if (this.getRandomInt(0, 2) == 1)
                this.body.velocity.set(-this.speed, -this.speed);
            else
                this.body.velocity.set(-this.speed, this.speed);
        }

        this.body.bounce.set(1);
        
    }

    getRandomInt(min, max) {
        let num = Math.random();
        return Math.floor((num + min) * max);
    }

    /**
     * Redefinición del preUpdate de Phaser
     * @override
     */
    preUpdate(t, dt) {
         super.preUpdate(t,dt);
         if (this.scene.physics.overlap(this.scene.player, this)) {
            this.destroy();
        }
        else if (this.scene.physics.overlap(this.scene.hooks, this)) {
            this.destroy();
        }
    }
}