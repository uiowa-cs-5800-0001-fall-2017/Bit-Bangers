/**
 *  Function called when charactermoveRight block is used
 *  Sets the varaiable blockNum and prevleft to check in update function
 * */
function moveCharacterLeft(numBlocks) {
    prevleft = this.player.body.x;
    blockNum = numBlocks;
    this.player.body.velocity.x = -40;
    this.player.body.x -= 10;
}

/**
 *  Function called when charactermoveRight block is used
 *  Sets the varaiable blockNum and prevright to check in update function
 * */
function moveCharacterRight(numBlocks) {
    prevright = this.player.body.x;
    blockNum = numBlocks;
    this.player.body.velocity.x = 40;
    this.player.body.x += 10;
}

function characterJumpLeft(){
   this.player.body.velocity.y = -160;
   this.player.body.x += 10;
}

function characterJumpRight(){
   this.player.body.velocity.y = -160;
   this.player.body.x += 10;
}


function stopCharacter() {
  this.player.animations.play('idle');
  
}

var game = new Phaser.Game(256, 240, Phaser.CANVAS, '', {
  preload: preload,
  create: create,
  update: update
}, false, false);
var prevright;
var prevleft;
var blockNum;
/***********************
 * It looks like tweens will stack if there are multiple on the same object.... 
 * bring it down to one again, set a boolean on the call and use it to dermine state?
 * 
 * 
 * *******************************/
function preload() {
  game.load.spritesheet('tiles', 'https://res.cloudinary.com/harsay/image/upload/v1464614984/tiles_dctsfk.png', 16, 16);
  //game.load.spritesheet('tiles1', 'img/level1_tiles.png', 16, 16);
  game.load.spritesheet('goomba', 'https://res.cloudinary.com/harsay/image/upload/v1464614984/goomba_nmbtds.png', 16, 16);
  game.load.spritesheet('mario', 'img/robot full.png', 17, 25);
  game.load.spritesheet('coin', 'https://res.cloudinary.com/harsay/image/upload/v1464614984/coin_iormvy.png', 16, 16);

  game.load.tilemap('level1', 'img/level1single.json', null, Phaser.Tilemap.TILED_JSON);
  game.load.image('tiles1', 'img/level1_tiles.png'); //load tileset corresponding level1single.json tilemap
}

function create() {
  Phaser.Canvas.setImageRenderingCrisp(game.canvas)
  game.scale.pageAlignHorizontally = true;
  game.scale.pageAlignVertically = true
  game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
  game.physics.startSystem(Phaser.Physics.ARCADE);

  game.stage.backgroundColor = '#363f44';

  map = game.add.tilemap('level1');
  map.addTilesetImage('level1_tiles', 'tiles1');
  map.setCollisionBetween(0, 10000, true, 'Tile Layer 1'); //0 to 10000 is index of pixels that collied. Tile Layer 1 is what the layer is named in tiled map editor
  map.createLayer('background');
  
  layer = map.createLayer('Tile Layer 1');
  layer.resizeWorld();

  goombas = game.add.group();
  goombas.enableBody = true;
  //map.createFromTiles(1, null, 'goomba', 'stuff', goombas);
  /*goombas.callAll('animations.add', 'animations', 'walk', [0, 1], 2, true);
  goombas.callAll('animations.play', 'animations', 'walk');
  goombas.setAll('body.bounce.x', 1);
  goombas.setAll('body.velocity.x', -20);
  goombas.setAll('body.gravity.y', 500);
*/
  player = game.add.sprite(16, game.world.height - 48, 'mario');
  game.physics.arcade.enable(player);
  player.body.gravity.y = 370;
  player.body.collideWorldBounds = true;
  player.animations.add('walkRight', [8, 9, 10, 12, 13, 14, 15], 10, true);
  player.animations.add('walkLeft', [16, 17, 18, 19, 20, 21, 22, 23], 10, true);
  player.animations.add('jump', [6,7], 5, true);
  player.animations.add('idle', [0,5], 5, true);
  player.goesRight = true;
  game.camera.follow(player);

  cursors = game.input.keyboard.createCursorKeys();
}

function update() {
  game.physics.arcade.collide(player, layer);
  game.physics.arcade.collide(goombas, layer);
  //game.physics.arcade.overlap(player, goombas, goombaOverlap);
  //game.physics.arcade.overlap(player, coins, coinOverlap);

  if(player.body.enable){
  
  
  /**
   * Checks the robot's current pos, if not at goal keep walking
   **/
  if(player.body.x < prevright + 10*blockNum){
    player.animations.play('walkRight');
    player.goesRight = true;
  }
   /**
   * Checks the robot's current pos, if not at goal keep walking
   **/
  else if(player.body.x > prevleft - 10*blockNum){
    player.animations.play('walkLeft');
    player.goesRight = false;
  }
  else if (player.body.velocity.y != 0) {
       player.animations.play('jump');
  }
   /**
   * if robot isn't walking, use idle and set prev pos. values to something that won't bug out
   **/
  else{
      player.body.velocity.x = 0;
      player.animations.play('idle');
      prevright = -1000000000;
      prevleft  =  1000000000;
  }
   /*
    if (cursors.left.isDown) {
      moveCharacterLeft(1);
    } else if (cursors.right.isDown) {
      moveCharacterRight(1);
    } *//*else {
      player.animations.play('idle');
      //player.animations.stop();
      //if (player.goesRight) player.frame = 0;
      //else player.frame = 7;
    }*/

    /*if (cursors.up.isDown && player.body.onFloor()) {
      player.body.velocity.y = -160;
      player.animations.stop();
      player.animations.play('idle');
    }*/
    
  }
}


/*
function goombaOverlap(player, goomba) {
  $('#myModal').modal('show');
  
  if (player.body.touching.down) {
    goomba.animations.stop();
    goomba.frame = 2;
    goomba.body.enable = false;
    player.body.velocity.y = -80;
    game.time.events.add(Phaser.Timer.SECOND, function() {
      goomba.kill();
    });
  } else {
    player.frame = 6;
    player.body.enable = true;
    player.animations.stop();
    game.time.events.add(Phaser.Timer.SECOND * 3, function() {
      game.paused = false;
    });
  }
}
*/