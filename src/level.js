import Bubble from './bubble.js';
import Wall from './wall.js';
import Player from './player.js';

/**
 * Escena principal del juego. La escena se compone de una serie de plataformas 
 * sobre las que se sitúan las bases en las podrán aparecer las estrellas. 
 * El juego comienza generando aleatoriamente una base sobre la que generar una estrella. 
 * Cada vez que el jugador recoge la estrella, aparece una nueva en otra base.
 * El juego termina cuando el jugador ha recogido 10 estrellas.
 * @extends Phaser.Scene
 */
export default class Level extends Phaser.Scene {
  /**
   * Constructor de la escena
   */
  constructor() {
    super({ key: 'level' });
    this.NUM_CIRCLES = 10;
  }

  /**
   * Creación de los elementos de la escena principal de juego
   */
  create() 
  {
    this.stars = 10;
    this.bases = this.add.group();
    this.player = new Player(this, 200, 500);
    this.wall = this.add.rectangle(20, 0, 2000, 10, 0xff0000);
    this.add.existing(this.wall);
    this.physics.add.existing(this.wall);

    this.bubbles = this.add.group();

    for (let i = 0; i < this.NUM_CIRCLES; i++) {
      let x = this.getRandomInt(0.10, 900);
      let y = this.getRandomInt(0.15, 350);
      let bubble = new Bubble(this, x, y);

      this.bubbles.add(bubble);
    }

    this.hooks = this.add.group();
  }

    //Crea objetos dinamicos con el metodo add.group
    createRandomBalls(){
    
      console.log('createRandomBalls starting');
      let { width, height } = this.sys.game.canvas;
      this.balls =  this.physics.add.group({
        key: 'aqua_ball',
        repeat: 20,
        allowGravity: true,
        collideWorldBounds: true,
        setXY: { x: 100, y: 150, stepX: 120}
        });
        //añadimos el collider al grupo
        this.physics.add.collider(this.player, this.balls, this.collisionCallback);  
  
        //recorremos el grupo y ponemos posiciones aleatorias
        this.balls.children.iterate( child => {
              child.setName('gota');
              child.setPosition(Phaser.Math.RND.between(0,width), Phaser.Math.RND.between(0,height/2))})    
                      
    }
  
    collisionCallback(obj1, obj2) 
    {
      let gr= obj1.scene.balls;
      if (gr.contains(obj1))
      {
        gr.remove(obj1, true, true); 
      }
      else if (gr.contains(obj2))
      {
          gr.remove(obj2, true, true); 
      }
  
  
      /*
      if (obj1.name == 'gota')
      {
        this.balls.remove(obj1, true, true);
      }
      else  if (obj2.name == 'gota')
      {
        obj2.scene.balls.remove(obj2, true, true);
      }
      if (obj1.name == 'player')
      {
        obj1.destroy();
      }
      else  if (obj2.name == 'player')
      {
        obj2.destroy();
      }
  */
    }

  getRandomInt(min, max) 
  {
    let num = Math.random();
    return Math.floor((num + min) * max);
  }

  /**
   * Genera una estrella en una de las bases del escenario
   * @param {Array<Base>} from Lista de bases sobre las que se puede crear una estrella
   * Si es null, entonces se crea aleatoriamente sobre cualquiera de las bases existentes
   */
  spawn(from = null) {
    Phaser.Math.RND.pick(from || this.bases.children.entries).spawn();
  }

  /**
   * Método que se ejecuta al coger una estrella. Se pasa la base
   * sobre la que estaba la estrella cogida para evitar repeticiones
   * @param {Base} base La base sobre la que estaba la estrella que se ha cogido
   */
  starPickt (base) {
    this.player.point();
      if (this.player.score == this.stars) {
        this.scene.start('end');
      }
      else {
        let s = this.bases.children.entries;
        this.spawn(s.filter(o => o !== base));

      }
  }
}