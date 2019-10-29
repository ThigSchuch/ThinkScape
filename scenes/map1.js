var map1Scene = new Phaser.Scene('map1');
var positionYPlayer = 3;
var positionXPlayer = 0;
var lives = localStorage.getItem("lives");

//Background Song
var bgSong = new Audio('assets/sounds/bgSong.mp3');
//Repeat
bgSong.addEventListener('ended', function() {
    this.currentTime = 0;
    this.play();
}, false);
bgSong.play();

//Death Sound
var deathSound = new Audio('assets/sounds/deathSound.wav');

map1Scene.init = function () {
    this.playerSpeed = 1.5;
    this.enemySpeed = 2;
    this.enemyMaxY = 280;
    this.enemyMinY = 80;
};

//Loading images
map1Scene.preload = function () {
    this.load.image('background', 'assets/images/background.png');
    this.load.image('player', 'assets/images/player.png');
    this.load.image('dragon', 'assets/images/dragon.png');
    this.load.image('treasure', 'assets/images/treasure.png');
    this.load.image('life','assets/images/heart.png')
};

map1Scene.create = function () {
    //lixo this.physics.add.collider(player, dragon, colision, null, this);

    //Lives on top of screen
    this.lifePic = this.add.sprite(40, 40, 'life')
    this.lifePic.setScale(0.02)
    livesText = this.add.text(70, 28, lives, { fontSize: '32px', fill: '#000' });

    //Mapping the keyboard
    this.up = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
    this.down = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
    this.right = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    this.left = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
    this.space = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    //Set background image
    //let bg = this.add.sprite(0, 0, 'background');
    //bg.setOrigin(0, 0);

    //Player Sprite
    this.player = this.add.sprite(40, this.sys.game.config.height / 2, 'player');
    this.player.setScale(1);

    //Treasure Sprite
    this.treasure = this.add.sprite(this.sys.game.config.width - 80, this.sys.game.config.height / 2, 'treasure');
    this.treasure.setScale(1);

    //Enemy Sprite
    this.enemy = this.add.sprite(this.sys.game.config.width - 480, this.sys.game.config.height /2, 'dragon')
    this.enemy.setScale(1);

    this.isPlayerAlive = true;

    this.cameras.main.resetFX();
};

map1Scene.update = function () {
    if (!this.isPlayerAlive) {
        return;
    }
    //Setting the commands to the player walk
    if (Phaser.Input.Keyboard.JustDown(this.right)) {
        this.player.x += 100;
        this.enemyWalk();
    }
    if (Phaser.Input.Keyboard.JustDown(this.left)) {
        this.player.x -= 100;
        this.enemyWalk();
    }
    if (Phaser.Input.Keyboard.JustDown(this.up)) {
        this.player.y -= 100;
        this.enemyWalk();
    }
    if (Phaser.Input.Keyboard.JustDown(this.down)) {
        this.player.y += 100;
        this.enemyWalk();
    }
    //When enemy hit the player
    if (Phaser.Geom.Intersects.RectangleToRectangle(this.player.getBounds(), this.enemy.getBounds())) {
        map1Scene.gameOver();
    }

    //When player reachs the objective
    if (Phaser.Geom.Intersects.RectangleToRectangle(this.player.getBounds(), this.treasure.getBounds())) {
        lives = 5;
        bgSong.pause();
        this.scene.start('win');
    }

// lixo
//    for (let i = 0; i < numEnemies; i++) {
//       enemies[i].y += enemies[i].speed;
//        if (enemies[i].y >= this.enemyMaxY && enemies[i].speed > 0) {
//            enemies[i].speed *= -1;
//        } else if (enemies[i].y <= this.enemyMinY && enemies[i].speed < 0) {
//            enemies[i].speed *= -1;
//        }
//        if (Phaser.Geom.Intersects.RectangleToRectangle(this.player.getBounds(), enemies[i].getBounds())) {
//            this.gameOver();
//            break;
//        }
//    }
};

//Enemy Walk?
map1Scene.enemyWalk = function(){

    if (this.player.x > this.enemy.x) {
        this.enemy.x += 100;
    }
    if (this.player.x < this.enemy.x) {
        this.enemy.x -= 100;
    }
    if (this.player.y > this.enemy.y) {
        this.enemy.x += 100;
    }
    if (this.player.y < this.enemy.y) {
        this.enemy.x -= 100;
    }
};

map1Scene.distance = function(){
    //Euclidean Distance
};

//When the enemy hit the player it's game over
map1Scene.gameOver = function () {
    deathSound.play();
    this.isPlayerAlive = false;
    this.cameras.main.shake(500);

    this.time.delayedCall(250, function () {
        this.cameras.main.fade(250);
    }, [], this);

    this.time.delayedCall(500, function () {
        this.scene.start('map1');
        lives -= 1;
        //When you run out of lives, game over and reset both scene/lives
        if (lives == -1){
            lives = 5;
            bgSong.pause();
            this.scene.start('loose');
        }
    }, [], this);
};
