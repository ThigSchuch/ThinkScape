
var mainScene = new Phaser.Scene('map1');
var positionYPlayer = 3;
var positionXPlayer = 0;

mainScene.init = function () {
    this.playerSpeed = 1.5;
    this.enemySpeed = 2;
    this.enemyMaxY = 280;
    this.enemyMinY = 80;
};

mainScene.preload = function () {
    this.load.image('background', 'assets/Untitled.png');
    this.load.image('player', 'assets/player.png');
    this.load.image('dragon', 'assets/dragon.png');
    this.load.image('treasure', 'assets/treasure.png');
};

mainScene.create = function () {

    this.up = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
    this.down = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
    this.right = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    this.left = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
    this.space = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    let bg = this.add.sprite(0, 0, 'background');
    bg.setOrigin(0, 0);

    this.player = this.add.sprite(40, this.sys.game.config.height / 2, 'player');
    this.player.setScale(1);

    this.treasure = this.add.sprite(this.sys.game.config.width - 80, this.sys.game.config.height / 2, 'treasure');
    this.treasure.setScale(1);

    this.enemy = this.add.sprite(this.sys.game.config.width - 80, this.sys.game.config.height /2, 'dragon')
    this.enemy.setScale(1);

    this.isPlayerAlive = true;

    this.cameras.main.resetFX();
};

mainScene.update = function () {
    if (!this.isPlayerAlive) {
        return;
    }
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
    if (Phaser.Geom.Intersects.RectangleToRectangle(this.player.getBounds(), this.treasure.getBounds())) {
        this.scene.start('win');
    }

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

mainScene.enemyWalk = function(){

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

mainScene.distance = function(){
    
};

mainScene.gameOver = function () {
    this.isPlayerAlive = false;
    this.cameras.main.shake(500);
    this.time.delayedCall(250, function () {
        this.cameras.main.fade(250);
    }, [], this);
    this.time.delayedCall(500, function () {
        this.scene.restart();
    }, [], this);
};
