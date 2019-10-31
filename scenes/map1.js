var map1Scene = new Phaser.Scene('map1');
var positionYPlayer = 5;
var positionXPlayer = 2;
var positionYEnemy = 5;
var positionXEnemy = 11;
var lives = localStorage.getItem("lives");
var textP;
var textE;
var textB;

//Set obstacles location
var blocked = ['4,5', '6,4','8,6'];

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
    //lixo
    //this.playerSpeed = 1.5;
    //this.enemySpeed = 2;
    //this.enemyMaxY = 280;
    //this.enemyMinY = 80;
};

//Loading images
map1Scene.preload = function () {
    this.load.image('background', 'assets/images/background.png');
    this.load.image('player', 'assets/images/player.png');
    this.load.image('dragon', 'assets/images/dragon.png');
    this.load.image('treasure', 'assets/images/treasure.png');
    this.load.image('life', 'assets/images/heart.png');
    this.load.image('obstacle','assets/images/obstacle.png')
};

map1Scene.create = function () {
    //lixo this.physics.add.collider(player, dragon, colision, null, this);
   
    //Set background image
    let bg = this.add.sprite(0, 0, 'background');
    bg.setOrigin(0, 0);

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

    //Player Sprite
    this.player = this.add.sprite(140, this.sys.game.config.height / 2, 'player');
    this.player.setScale(1);

    //Treasure Sprite
    this.treasure = this.add.sprite(this.sys.game.config.width - 100, this.sys.game.config.height / 2, 'treasure');
    this.treasure.setScale(1);

    //Enemy Sprite
    this.enemy = this.add.sprite(this.sys.game.config.width - 420, this.sys.game.config.height /2, 'dragon')
    this.enemy.setScale(1);

    //Obstacle Sprite
    this.obstacle = this.add.sprite(this.sys.game.config.width - 980, this.sys.game.config.height - 360, 'obstacle')
    this.obstacle.setScale(0.13);
    this.obstacle = this.add.sprite(this.sys.game.config.width - 820, this.sys.game.config.height - 440, 'obstacle')
    this.obstacle.setScale(0.13);
    this.obstacle = this.add.sprite(this.sys.game.config.width - 660, this.sys.game.config.height - 280, 'obstacle')
    this.obstacle.setScale(0.13);

    this.isPlayerAlive = true;

    this.cameras.main.resetFX();

    //Text of coordenades player/enemy
    textP = this.add.text(100, 50, '('+positionXPlayer+','+positionYPlayer+')', { fontSize: '50px', fill: '#fff' });
    textE = this.add.text(300, 50, '('+positionXEnemy+','+positionYEnemy+')', { fontSize: '50px', fill: '#fff' });
    textB = this.add.text(600, 50, '', { fontSize: '50px', fill: '#fff' });
};

map1Scene.update = function () {
    if (!this.isPlayerAlive) {
        return;
    }
    
    //Setting the commands to the player walk and the enemy walk
    if (Phaser.Input.Keyboard.JustDown(this.right) && this.allowedToMove(positionXPlayer+1,positionYPlayer)){
        this.player.x += 80;
        this.enemyWalk(positionXPlayer,positionYPlayer,positionXEnemy,positionYEnemy); 
        positionXPlayer += 1;
    }
    if (Phaser.Input.Keyboard.JustDown(this.left) && this.allowedToMove(positionXPlayer-1,positionYPlayer)) {
        this.player.x -= 80;
        this.enemyWalk(positionXPlayer,positionYPlayer,positionXEnemy,positionYEnemy); 
        positionXPlayer -= 1;
    }
    if (Phaser.Input.Keyboard.JustDown(this.up) && this.allowedToMove(positionXPlayer,positionYPlayer-1)) {
        this.player.y -= 80;
        this.enemyWalk(positionXPlayer,positionYPlayer,positionXEnemy,positionYEnemy); 
        positionYPlayer -= 1;
    }
    if (Phaser.Input.Keyboard.JustDown(this.down) && this.allowedToMove(positionXPlayer,positionYPlayer+1)) {
        this.player.y += 80;
        this.enemyWalk(positionXPlayer,positionYPlayer,positionXEnemy,positionYEnemy); 
        positionYPlayer += 1;
    }

    //When enemy is on the back of the player
    if (Phaser.Geom.Intersects.RectangleToRectangle(this.player.getBounds(), this.enemy.getBounds())) {
        map1Scene.gameOver();
    }
 
    //When player reachs the objective
    if (Phaser.Geom.Intersects.RectangleToRectangle(this.player.getBounds(), this.treasure.getBounds())) {
        lives = 5;
        bgSong.pause();
        this.scene.start('win');
        //Reset both position
        this.resetPosition();
    }
    
    this.updateText();
    
    
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

//Check if the player/enemy is allowed to move to that position
map1Scene.allowedToMove = function(positionXPlayer,positionYPlayer){
    allowed = true;
    for (var i = 0; i < blocked.length; i++){
        bX = blocked[i].split(",")[0];
        bY = blocked[i].split(",")[1];

        //Bounds of map
        // 16 is the limit of X
        // 10 is the limit of Y
        if (positionXPlayer == 0 || positionYPlayer == 0 || positionXPlayer == 16 || positionYPlayer == 10){
            allowed = false;
        }
        //Obstacles
        else if (bX == positionXPlayer && bY == positionYPlayer){
            allowed = false;
        }
    }
    return allowed;
}

//Euclidean Calc?
map1Scene.euclideanCalc = function(positionXPlayer,positionYPlayer,positionXEnemy,positionYEnemy){
    return(Math.sqrt(Math.pow((positionXPlayer - positionXEnemy),2) + Math.pow((positionYPlayer - positionYEnemy),2)));
}

//Coordenates
map1Scene.updateText = function(){
    textP.setText('P('+positionXPlayer+','+positionYPlayer+')');
    textE.setText('E('+positionXEnemy+','+positionYEnemy+')');
}

//When player dies, reset position counter
map1Scene.resetPosition = function(){
    positionYPlayer = 5;
    positionXPlayer = 2;
    positionYEnemy = 5;
    positionXEnemy = 11;
}


//Get the minor and second minor value
map1Scene.minor = function(array){
    minor = Infinity;
    second = Infinity;

    for (var i = 0; i < array.length; i++){
        if (array[i] < minor){
            second = minor;
            minor = array[i];
        }
        else if (array[i] > minor && array[i] < second){
            second = array[i];
        }
    }
    return [minor,second];
}

//Enemy walk
map1Scene.enemyWalk = function(){

    left = this.euclideanCalc(positionXPlayer,positionYPlayer,positionXEnemy-1,positionYEnemy)
    right = this.euclideanCalc(positionXPlayer,positionYPlayer,positionXEnemy+1,positionYEnemy)
    up = this.euclideanCalc(positionXPlayer,positionYPlayer,positionXEnemy,positionYEnemy-1)
    down = this.euclideanCalc(positionXPlayer,positionYPlayer,positionXEnemy,positionYEnemy+1)

    array = [left,right,up,down];
    //Get the better way until the player
    lowestsValue = this.minor(array);
    
    if (lowestsValue[0] == left && this.allowedToMove(positionXEnemy-1,positionYEnemy)){
        this.enemy.x -= 80;
        positionXEnemy -= 1;
    }
    else if (lowestsValue[0] == right && this.allowedToMove(positionXEnemy+1,positionYEnemy)){
        this.enemy.x += 80;
        positionXEnemy += 1;
    }
    else if (lowestsValue[0] == up && this.allowedToMove(positionXEnemy,positionYEnemy-1)){
        this.enemy.y -= 80;
        positionYEnemy -= 1;
    }
    else if (lowestsValue[0] == down && this.allowedToMove(positionXEnemy,positionYEnemy+1)){
        this.enemy.y += 80;
        positionYEnemy += 1;
    }
    else if (lowestsValue[1] == left && this.allowedToMove(positionXEnemy-1,positionYEnemy)){
        this.enemy.x -= 80;
        positionXEnemy -= 1;
    }
    else if (lowestsValue[1] == right && this.allowedToMove(positionXEnemy+1,positionYEnemy)){
        this.enemy.x += 80;
        positionXEnemy += 1;
    }
    else if (lowestsValue[1] == up && this.allowedToMove(positionXEnemy,positionYEnemy-1)){
        this.enemy.y -= 80;
        positionYEnemy -= 1;
    }
    else if (lowestsValue[1] == down && this.allowedToMove(positionXEnemy,positionYEnemy+1)){
        this.enemy.y += 80;
        positionYEnemy += 1;
    }
};

//When the enemy hit the player it's game over
map1Scene.gameOver = function () {
    deathSound.play();
    this.isPlayerAlive = false;
    this.cameras.main.shake(800);

    this.time.delayedCall(280, function () {
        this.cameras.main.fade(280);
    }, [], this);

    this.time.delayedCall(800, function () {
        this.scene.start('map1');
        lives -= 1;
        //Reset both position
        this.resetPosition();
        //When you run out of lives, game ends and reset both scene/lives
        if (lives == -1){
            lives = 5;
            bgSong.pause();
            this.scene.start('lose');
        }
    }, [], this);
};
