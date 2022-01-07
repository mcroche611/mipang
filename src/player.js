import Star from './star.js';
import Hook from './hook.js';
/**
 * Clase que representa el jugador del juego. El jugador se mueve por el mundo usando los cursores.
 * También almacena la puntuación o número de estrellas que ha recogido hasta el momento.
 */
export default class Player extends Phaser.GameObjects.Sprite {
  
  /**
   * Constructor del jugador
   * @param {Phaser.Scene} scene Escena a la que pertenece el jugador
   * @param {number} x Coordenada X
   * @param {number} y Coordenada Y
   */
  constructor(scene, x, y) {
    super(scene, x, y, 'player');
    this.score = 0;
    this.lives = 3;
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    // Queremos que el jugador no se salga de los límites del mundo
    this.body.setCollideWorldBounds();
    this.speed = 300;
    this.jumpSpeed = -400;
    // Esta label es la UI en la que pondremos la puntuación del jugador
    this.label = this.scene.add.text(10, 10, "");
    this.cursors = this.scene.input.keyboard.createCursorKeys();
    this.aKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.dKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    this.space = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    this.updateScore();

    this.anims.create({
      key: 'idle',
      frames: this.anims.generateFrameNumbers('player', { start: 8, end: 14 }),
      frameRate: 5, // Velocidad de la animación
      repeat: -1    // Animación en bucle
    });

    this.play('idle');

    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('player', { start: 72, end: 75 }),
      frameRate: 10,
      repeat: -1
  });
  
  this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('player', { start: 92, end: 95 }),
      frameRate: 10,
      repeat: -1
  });
  }

  /**
   * El jugador ha recogido una estrella por lo que este método añade un punto y
   * actualiza la UI con la puntuación actual.
   */
  point() {
    this.score++;
    this.updateScore();
  }
  
  /**
   * Actualiza la UI con la puntuación actual
   */
  updateScore() {
    this.label.text = 'Score: ' + this.score;
  }

  /**
   * Métodos preUpdate de Phaser. En este caso solo se encarga del movimiento del jugador.
   * Como se puede ver, no se tratan las colisiones con las estrellas, ya que estas colisiones 
   * ya son gestionadas por la estrella (no gestionar las colisiones dos veces)
   * @override
   */
  preUpdate(t,dt) {
    super.preUpdate(t,dt);
    // if (this.cursors.up.isDown && this.body.onFloor()) {
    //   this.body.setVelocityY(this.jumpSpeed);
    // }
    if (this.aKey.isDown) {
      this.play('left', true);
      this.body.setVelocityX(-this.speed);
      
    }
    else if (this.dKey.isDown) {
      this.body.setVelocityX(this.speed);
      this.play('right', true);
    }
    else {
      this.body.setVelocityX(0);
      this.play('idle', true);
    }

    if (this.space.isDown)
    {
      let hook = new Hook(this.scene, this.x, this.y);

      this.scene.hooks.add(hook);
    }

    if (this.scene.physics.overlap(this.scene.bubbles, this)) {

      this.decreaseLives();
  }
  }
  

  decreaseLives()
  {
    this.lives--;

    if (this.lives <= 0)
      this.destroy();
  }
}
