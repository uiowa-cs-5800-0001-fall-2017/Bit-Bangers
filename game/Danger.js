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



function stopCharacter() {
  this.player.body.velocity = 0;
  player.animations.play('idle');
  prevright = -1000000000;
  prevleft = 1000000000;

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


function preload() {
  game.load.spritesheet('tiles', 'https://res.cloudinary.com/harsay/image/upload/v1464614984/tiles_dctsfk.png', 16, 16);
  //game.load.spritesheet('danger_tiles', 'img/danger.png', 16, 16);
  game.load.spritesheet('goomba', 'https://res.cloudinary.com/harsay/image/upload/v1464614984/goomba_nmbtds.png', 16, 16);
  game.load.spritesheet('mario', 'img/robot full.png', 17, 25);
  game.load.spritesheet('coin', 'https://res.cloudinary.com/harsay/image/upload/v1464614984/coin_iormvy.png', 16, 16);
  game.load.spritesheet('instruct', 'img/level1_Instructions.png', 255, 255);

  game.load.tilemap('danger_level', 'img/danger.json', null, Phaser.Tilemap.TILED_JSON);
  game.load.image('danger_tiles', 'img/space-blks-1.034.png'); //load tileset corresponding danger.json tilemap
}

function create() {
  Phaser.Canvas.setImageRenderingCrisp(game.canvas)
  game.scale.pageAlignHorizontally = true;
  game.scale.pageAlignVertically = true
  game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
  game.physics.startSystem(Phaser.Physics.ARCADE);

  game.stage.backgroundColor = '#363f44';

  map = game.add.tilemap('danger_level');
  map.addTilesetImage('danger', 'danger_tiles');
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

  instructwindow = game.add.sprite(32, game.world.height - 160, 'instruct');
  instructwindow.inputEnabled = true;
  instructwindow.input.useHandCursor = true;
  instructwindow.events.onInputDown.add(destroySprite, this);

  player = game.add.sprite(16, game.world.height - 48, 'mario');
  game.physics.arcade.enable(player);
  player.body.gravity.y = 400;
  player.body.collideWorldBounds = true;
  player.animations.add('walkRight', [8, 9, 10, 12, 13, 14, 15], 10, true);
  player.animations.add('walkLeft', [16, 17, 18, 19, 20, 21, 22, 23], 10, true);
  player.animations.add('jump', [6, 7], 5, true);
  player.animations.add('idle', [0, 5], 5, true);
  player.goesRight = true;
  game.camera.follow(player);

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
  game.physics.arcade.collide(player, layer);
  game.physics.arcade.collide(goombas, layer);
  //game.physics.arcade.overlap(player, goombas, goombaOverlap);
  //game.physics.arcade.overlap(player, coins, coinOverlap);

 if (cursors.up.isDown) {
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
        }, 1500 * ind);
      })(i);
    }
  }


  if (player.body.enable) {


    /**
     * Checks the robot's current pos, if not at goal keep walking
     **/
    if (player.body.x < prevright + 10 * blockNum) {
      player.animations.play('walkRight');
      player.goesRight = true;
    }
    /**
     * Checks the robot's current pos, if not at goal keep walking
     **/
    else if (player.body.x > prevleft - 10 * blockNum) {
      player.animations.play('walkLeft');
      player.goesRight = false;
    }
    else if (player.body.velocity.y != 0) {
      player.animations.play('jump');
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
 

  /* if (spaceKey.isDown) {
    for (var i = 0; i < player_code.length; i++) {
      player_code[i];
    }




    /*
      player_code.reduce((p, fn) => {
      return p.then(val => {
          // you may customize what you pass to the next function in the chain
          // and you may accumulate prior results in some other data structure here
          return fn(val);
        });
      }, Promise.resolve()).then(result => {
        // all done here
      }).catch(err => {
        // error here
      });
    }
*/
  /*if (cursors.up.isDown && player.body.onFloor()) {
      player.body.velocity.y = -160;
      player.animations.stop();
      player.animations.play('idle');
    }

  }
*/

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
