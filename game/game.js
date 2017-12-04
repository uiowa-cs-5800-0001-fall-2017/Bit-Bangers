/**
 *  Function called when charactermoveRight block is used
 *  Sets the varaiable blockNum and prevleft to check in update function
 * */
function moveCharacterLeft(numBlocks) {
  player_code.push("ML");
}

function PlayerGoLeft() {
  prevright = -1000000000;
  prevleft = this.player.body.x;
  blockNum = 10;
  this.player.body.velocity.x = -40;
  this.player.body.x -= 10;
}

/**
 *  Function called when charactermoveRight block is used
 *  Sets the varaiable blockNum and prevright to check in update function
 * */
function moveCharacterRight(numBlocks) {
  player_code.push('MR');
}

function PlayerGoRight() {
  prevleft = 1000000000;
  prevright = this.player.body.x;
  blockNum = 10;
  this.player.body.velocity.x = 40;
  this.player.body.x += 10;
}



function characterJumpLeft() {
  player_code.push('JL');
}

function PlayerJumpLeft() {
  this.player.body.velocity.y = -200;
  setTimeout(function() {
    this.player.body.velocity.x = -40;
    this.player.body.x -= 10;
  }, 200);

}

function characterJumpRight() {
  player_code.push('JR');
}

function PlayerJumpRight() {
  this.player.body.velocity.y = -200;
  setTimeout(function() {
    this.player.body.velocity.x = 40;
    this.player.body.x += 10;
  }, 200);

}
function endOfArray() { 
 player_code.push("END"); 
}

function stopCharacter() {
  this.player.body.velocity.x = 0;
  this.player.animations.play('idle');
  prevright = -1000000000;
  prevleft = 1000000000;
  player_code.length = 0;

}

function moveGateUp(numBlocks){
  gate_code.push('U');
}

function moveGateDown(numBlocks){
  gate_code.push('D');
}

function GateUP(){
  gate.body.enable = false;
  gate.animations.play('open');
 
}


function destroySprite(sprite) {

  sprite.destroy();

}

var game = new Phaser.Game(256, 240, Phaser.CANVAS, '', {
  preload: preload,
  create: create,
  update: update
}, false, false);
var prevright;
var prevleft;
var blockNum;
var prevPos = {
  x: 0,
  y: 0
};
var player_code = [];
var cursors;
var key1;
var gate_code = [];


function preload() {
  game.load.spritesheet('tiles', 'https://res.cloudinary.com/harsay/image/upload/v1464614984/tiles_dctsfk.png', 16, 16);
  //game.load.spritesheet('tiles1', 'img/level1_tiles.png', 16, 16);
  game.load.spritesheet('goomba', 'https://res.cloudinary.com/harsay/image/upload/v1464614984/goomba_nmbtds.png', 16, 16);
  game.load.spritesheet('mario', 'img/robot full.png', 17, 25);
  game.load.spritesheet('goal', 'img/star.png', 32, 32);
  game.load.spritesheet('coin', 'https://res.cloudinary.com/harsay/image/upload/v1464614984/coin_iormvy.png', 16, 16);
  game.load.spritesheet('instruct', 'img/level1_Instructions.png', 255, 255);
  game.load.spritesheet('gate', 'img/Platform Sprites/laser.png', 16, 53);

  game.load.tilemap('Power_Map', 'img/Power_Map.json', null, Phaser.Tilemap.TILED_JSON);
  game.load.image('tiles1', 'img/Power.png'); //load tileset corresponding level1single.json tilemap
  game.load.image('tiles2', 'img/Power.png'); //load tileset corresponding level1single.json tilemap
}

function create() {
  Phaser.Canvas.setImageRenderingCrisp(game.canvas)
  game.scale.pageAlignHorizontally = true;
  game.scale.pageAlignVertically = true
  game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
  game.physics.startSystem(Phaser.Physics.ARCADE);
  game.camera.bounds = new Phaser.Rectangle(0, 0, 48, 1600);
 // game.state.add('Water', Water);
  
  key1 = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
  //key1.onDown.add(executeBlocks, this);

  game.stage.backgroundColor = '#363f44';

  map = game.add.tilemap('Power_Map');
  map.addTilesetImage('Power_Tiles', 'tiles1');
  map.setCollisionBetween(0, 10000, true, 'Tile Layer 1'); //0 to 10000 is index of pixels that collied. Tile Layer 1 is what the layer is named in tiled map editor
  map.createLayer('background');
  layer = map.createLayer('Tile Layer 2');
  layer = map.createLayer('Tile Layer 1');


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
  //INSTRUCTION SPRITE
  instructwindow = game.add.sprite(32, game.world.height - 160, 'instruct');
  instructwindow.inputEnabled = true;
  instructwindow.input.useHandCursor = true;
  instructwindow.events.onInputDown.add(destroySprite, this);
  
  //GOAL SPRITE
  goalstar = game.add.sprite(1500, game.world.height - 40, 'goal');
  game.physics.arcade.enable(goalstar);
  
  //GATE SPRITE
  gate = game.add.sprite(100, game.world.height - 70, 'gate');
  game.physics.arcade.enable(gate);
  gate.body.collideWorldBounds = true;
  gate.animations.add('closed', [0, 1], 10, true);
  gate.animations.add('open', [2, 5], 2, true);
  gate.animations.add('destroyed', [6], 0, true);
  gate.body.immovable = true;
  
  //PLAYER SPRITE
  player = game.add.sprite(16, game.world.height - 48, 'mario');
  game.physics.arcade.enable(player);
  player.body.gravity.y = 400;
  player.body.collideWorldBounds = true;
  player.animations.add('walkRight', [8, 9, 10, 12, 13, 14, 15], 10, true);
  player.animations.add('walkLeft', [16, 17, 18, 19, 20, 21, 22, 23], 10, true);
  player.animations.add('jump', [6, 7], 5, true);
  player.animations.add('idle', [0, 5], 5, true);
  player.goesRight = true;
  game.camera.focusOn(player);

  cursors = game.input.keyboard.createCursorKeys();

}

function GetAction(action){
  switch(action){
    case "M":
      return PlayerGoRight();
      break;
    case "J":
      return PlayerJump();
      break;
  }
}

function PlayerGo(action) {
  // Return a new promise.
  return new Promise(function(resolve, reject) {
    // Do the usual XHR stuff
    if(action){
      var move = GetAction(action)
      resolve(move);
    }else{
      return null;
    }
  });
}

function update() {
  game.camera.bounds = new Phaser.Rectangle(0,48, 1600, 295);
  game.physics.arcade.collide(player, layer);
  game.physics.arcade.collide(goombas, layer);
   game.physics.arcade.collide(player, gate);
  //game.physics.arcade.overlap(player, goombas, goombaOverlap);
  //game.physics.arcade.overlap(player, coins, coinOverlap);
  game.physics.arcade.overlap(player, goalstar, goalOverlap);
  
  
  function goalOverlap(player, goalstar){
    alert("yep");
    game.state.start('Water');
  }
   
 
 if (key1.isDown) {
   //space key pressed to execute code
   // push on end of movement function onto end of character array
   //move gate
    endOfArray();
   alert(player_code);
   for (var j = 0; j < gate_code.length; j++){
     (function(n) {
        this.setTimeout(function() { 
          if(gate_code[n] == 'U')
          {
            GateUP();
          }
        }, 1500 * n);
      })(j);
   }
   
   //alert(player_code)
    for (var i = 0; i < player_code.length; i++) {
      (function(ind) {
        this.setTimeout(function() { 
          if(player_code[ind] == 'MR')
          {
            PlayerGoRight();
          }
          else if((player_code[ind] == 'ML'))
          {
            PlayerGoLeft();
          }
          else if((player_code[ind] == 'JR'))
          {
            PlayerJumpRight();
          }
          else if((player_code[ind] == 'JL'))
          {
            PlayerJumpLeft();
          }
          else if(player_code[ind] == "END")
          {
            stopCharacter();
          }
        }, 1500 * ind);
      })(i);
    }
  }
  
  if (cursors.up.isDown)
  {
      game.camera.y -= 4;
  }
  else if (cursors.down.isDown)
  {
      game.camera.y += 4;
  }

  if (cursors.left.isDown)
  {
      game.camera.x -= 4;
  }
  else if (cursors.right.isDown)
  {
      game.camera.x += 4;
  }

  if (this.game.input.activePointer.isDown) {	
    if (this.game.origDragPoint) {	
      this.game.camera.x += this.game.origDragPoint.x - this.game.input.activePointer.position.x;		
      this.game.camera.y += this.game.origDragPoint.y - this.game.input.activePointer.position.y;	
    }
    this.game.origDragPoint = this.game.input.activePointer.position.clone();
  }
  else {	
    this.game.origDragPoint = null;
  }
  if (gate.body.enable) {
    gate.animations.play('closed');
    }
  else{
    gate.animations.play('destoyed');
     }
  if (player.body.enable) {
    /**
     * Checks the robot's current pos, if not at goal keep walking
     **/
    if (player.body.x < prevright + 10 * blockNum) {
      player.animations.play('walkRight');
      game.camera.focusOn(player);
      player.goesRight = true;
    }
    /**
     * Checks the robot's current pos, if not at goal keep walking
     **/
    else if (player.body.x > prevleft - 10 * blockNum) {
      player.animations.play('walkLeft');
      game.camera.focusOn(player);
      player.goesRight = false;
    }
    else if (player.body.velocity.y != 0) {
      player.animations.play('jump');
      game.camera.focusOn(player);
      if (player.body.onFloor()) {
        stopCharacter();
      }
    }
    /**
     * if robot isn't walking, use idle and set prev pos. values to something that won't bug out
     **/
    else {
      player.body.velocity.x = 0;
      player.animations.play('idle');
      prevright = -1000000000;
      prevleft = 1000000000;
    }
    /*
     if (cursors.left.isDown) {
       moveCharacterLeft(1);
     } else if (cursors.right.isDown) {
       moveCharacterRight(1);
     } */
    /*else {
          player.animations.play('idle');
          //player.animations.stop();
          //if (player.goesRight) player.frame = 0;
          //else player.frame = 7;
        }*/
    
  }

}
