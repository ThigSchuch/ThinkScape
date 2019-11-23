var map1Scene = new Phaser.Scene('map1');
var lives = localStorage.getItem("lives");
var nickname = localStorage.getItem("nomeDeUsuario");

map1Scene.init = function () {
    this.blocked = ['4,4','5,4','4,7','5,7','7,6','8,6','7,3','8,3','10,2','11,2','10,5','11,5'];
    this.positionXPlayer = 2;
    this.positionYPlayer = 4;
    this.positionXEnemy = 8;
    this.positionYEnemy = 5;
    this.positionPortal = [4,2];
    this.positionKey = [9,7];
    this.bgSong = new Audio('assets/sounds/bgSong.mp3');
    this.oldXYPlayer = [2,5];
    this.playerKey = false;
};

//Loading images
map1Scene.preload = function () {
    this.load.image('bgMap1', 'assets/images/bgMap1.png');
    this.load.image('key', 'assets/images/key.png');
    this.load.spritesheet('player', 'assets/images/warrior.png',{ frameWidth: 48, frameHeight: 64 });
    this.load.spritesheet('enemy', 'assets/images/enemy.png', { frameWidth: 32, frameHeight: 64});
    this.load.spritesheet('portal', 'assets/images/portal.png',  { frameWidth: 32, frameHeight: 32 });
    this.load.image('life', 'assets/images/heart.png');
    this.load.image('rock','assets/images/obstacles/rock.png');
    this.load.image('skull','assets/images/skull.png');
};

map1Scene.create = function () {
   
    //Start and repeat background soung
    this.bgSong.play();
    repeatSong(this.bgSong);

    //Set background image
    var bg = this.add.sprite(0, 0, 'bgMap1');
    bg.setOrigin(0, 0);

    //Key Sprite
    this.key = this.add.sprite(850, 650, 'key');
    this.key.setScale(2);

    //Lives on top of screen
    this.lifePic = this.add.sprite(40, 40, 'life')
    this.lifePic.setScale(0.05)
    this.livesText = this.add.text(70, 25, lives, { fontSize: '40px', fill: '#FFF' });

    //Mapping the keyboard
    this.up = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
    this.down = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
    this.right = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    this.left = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
    this.space = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    this.isPlayerAlive = true;

    this.cameras.main.resetFX();

    //Portal Sprite
    this.portal = this.add.sprite(350, 150, 'portal');
    this.portal.setScale(3.8);

    //Portal Animation
    this.anims.create({
        key: 'portal',
        frames: this.anims.generateFrameNumbers('portal', { start: 0, end: 16 }),
        frameRate: 20,
        repeat: -1
    });
    this.portal.anims.play('portal', true);

    //Player Sprite
    this.player = this.add.sprite(150, 335, 'player');
    this.player.setScale(2);

    //Player Animations
    this.anims.create({
        key: 'leftP',
        frames: this.anims.generateFrameNumbers('player', { start: 9, end: 10 }),
        frameRate: 5,
        repeat: 0
    });

    this.anims.create({
        key: 'rightP',
        frames: this.anims.generateFrameNumbers('player', { start: 3, end: 4 }),
        frameRate: 5,
        repeat: 0
    });

    this.anims.create({
        key: 'upP',
        frames: this.anims.generateFrameNumbers('player', { start: 0, end: 1 }),
        frameRate: 5,
        repeat: 0
    });

    this.anims.create({
        key: 'downP',
        frames: this.anims.generateFrameNumbers('player', { start: 7, end: 8 }),
        frameRate: 5,
        repeat: 0
    });

    //Enemy Sprite
    this.enemy = this.add.sprite(750, 425, 'enemy')
    this.enemy.setScale(2);

    //Enemy Animations
    this.anims.create({
        key: 'leftE',
        frames: this.anims.generateFrameNumbers('enemy', { start: 3, end: 5 }),
        frameRate: 5,
        repeat: 1
    });

    this.anims.create({
        key: 'rightE',
        frames: this.anims.generateFrameNumbers('enemy', { start: 6, end: 8 }),
        frameRate: 5,
        repeat: 1
    });

    this.anims.create({
        key: 'upE',
        frames: this.anims.generateFrameNumbers('enemy', { start: 9, end: 10 }),
        frameRate: 5,
        repeat: 1
    });

    this.anims.create({
        key: 'downE',
        frames: this.anims.generateFrameNumbers('enemy', { start: 0, end: 2 }),
        frameRate: 5,
        repeat: 1
    });
    
    //Obstacles to player/enemy don't override it
    //Rock Top
    this.rockTopLeft = this.add.sprite(390, 325, 'rock')
    this.rockTopLeft.setScale(0.3);
    this.rockTopRight = this.add.sprite(1000, 125, 'rock')
    this.rockTopRight.setScale(0.3);
    
    //Rock Middle
    this.rockMiddleTop = this.add.sprite(700, 225, 'rock')
    this.rockMiddleTop.setScale(0.3);
    this.rockMiddleBottom = this.add.sprite(700, 525, 'rock')
    this.rockMiddleBottom.setScale(0.3);

    //Rock Bottom
    this.rockBottomLeft = this.add.sprite(390, 625, 'rock')
    this.rockBottomLeft.setScale(0.3);
    this.rockBottomRight = this.add.sprite(1000, 425, 'rock')
    this.rockBottomRight.setScale(0.3);

    //Text of coordenades player/enemy
    textVida= this.add.text(200, 15, 'Nick:' + localStorage.getItem("nomeDeUsuario"), { fontSize: '35px', fill: '#fff' });
    textP = this.add.text(100, 50, '('+this.positionXPlayer+','+this.positionYPlayer+')', { fontSize: '50px', fill: '#fff' });
    textE = this.add.text(300, 50, '('+this.positionXEnemy+','+this.positionYEnemy+')', { fontSize: '50px', fill: '#fff' });
};

//Where the magic happens

map1Scene.update = function () {
    if (!this.isPlayerAlive) {
        return;
    }

    //Setting the commands to the player walk and the enemy walk
    if (Phaser.Input.Keyboard.JustDown(this.right) && this.allowedToMove(this.positionXPlayer+1,this.positionYPlayer)){
        this.player.anims.play('rightP', true);
        this.player.x += 100;
        this.enemyWalk(this.positionXPlayer,this.positionYPlayer,this.positionXEnemy,this.positionYEnemy);
        this.oldXYPlayer = [this.positionXPlayer,this.positionYPlayer];
        this.positionXPlayer += 1;
    }
    if (Phaser.Input.Keyboard.JustDown(this.left) && this.allowedToMove(this.positionXPlayer-1,this.positionYPlayer)) {
        this.player.anims.play('leftP', true);
        this.player.x -= 100;
        this.enemyWalk(this.positionXPlayer,this.positionYPlayer,this.positionXEnemy,this.positionYEnemy);
        this.oldXYPlayer = [this.positionXPlayer,this.positionYPlayer]; 
        this.positionXPlayer -= 1;
    }
    if (Phaser.Input.Keyboard.JustDown(this.up) && this.allowedToMove(this.positionXPlayer,this.positionYPlayer-1)) {
        this.player.anims.play('upP', true);
        this.player.y -= 100;
        this.enemyWalk(this.positionXPlayer,this.positionYPlayer,this.positionXEnemy,this.positionYEnemy);
        this.oldXYPlayer = [this.positionXPlayer,this.positionYPlayer]; 
        this.positionYPlayer -= 1;
    }
    if (Phaser.Input.Keyboard.JustDown(this.down) && this.allowedToMove(this.positionXPlayer,this.positionYPlayer+1)) {
        this.player.anims.play('downP', true);
        this.player.y += 100;
        this.enemyWalk(this.positionXPlayer,this.positionYPlayer,this.positionXEnemy,this.positionYEnemy);
        this.oldXYPlayer = [this.positionXPlayer,this.positionYPlayer]; 
        this.positionYPlayer += 1;
    }

    //When enemy reachs the player
    if (this.oldXYPlayer[0] == this.positionXEnemy && this.oldXYPlayer[1] == this.positionYEnemy){
        map1Scene.gameOver();
    }
 
    if (this.positionXPlayer == this.positionKey[0] && this.positionYPlayer == this.positionKey[1]){
        this.key.x = 150;
        this.key.y = 40;
        this.key.setScale(1.25);
        this.playerKey = true;
    }

    //When player reachs the objective
    if (this.positionXPlayer == this.positionPortal[0] && this.positionYPlayer == this.positionPortal[1] && this.playerKey == true) {
        this.bgSong.pause();
        this.scene.start('map2');
        //Reset both position
        this.resetPosition();
    }
    
    this.updateText();
};

//Check if the player/enemy is allowed to move to that position
map1Scene.allowedToMove = function(positionX,positionY){
    allowed = true;
    //Bounds of map actually
    // 14 is the limit of X
    // 8 is the limit of Y
    if (positionX == 0 || positionY == 1 || positionX == 14 || positionY == 8){
        allowed = false;
    }
    else{
        for (var i = 0; i < this.blocked.length; i++){
            bX = this.blocked[i].split(",")[0];
            bY = this.blocked[i].split(",")[1];
            
            //Obstacles
            if (bX == positionX && bY == positionY){
                allowed = false;
                i = this.blocked.length;
            }
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
    textP.setText('P('+this.positionXPlayer+','+this.positionYPlayer+')');
    textE.setText('E('+this.positionXEnemy+','+this.positionYEnemy+')');
}

//When player dies, reset position counter
map1Scene.resetPosition = function(){
    this.positionXPlayer = 2;
    this.positionYPlayer = 4;
    this.positionXEnemy = 9;
    this.positionYEnemy = 4;
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

    left = this.euclideanCalc(this.positionXPlayer,this.positionYPlayer,this.positionXEnemy-1,this.positionYEnemy)
    right = this.euclideanCalc(this.positionXPlayer,this.positionYPlayer,this.positionXEnemy+1,this.positionYEnemy)
    up = this.euclideanCalc(this.positionXPlayer,this.positionYPlayer,this.positionXEnemy,this.positionYEnemy-1)
    down = this.euclideanCalc(this.positionXPlayer,this.positionYPlayer,this.positionXEnemy,this.positionYEnemy+1)

    array = [left,right,up,down];
    //Get the better way until the player
    lowestsValue = this.minor(array);
    
    if (lowestsValue[0] == left && this.allowedToMove(this.positionXEnemy-1,this.positionYEnemy)){
        this.enemy.anims.play('leftE', true);
        this.enemy.x -= 100;
        this.positionXEnemy -= 1;
    }
    else if (lowestsValue[0] == right && this.allowedToMove(this.positionXEnemy+1,this.positionYEnemy)){
        this.enemy.anims.play('rightE', true);
        this.enemy.x += 100;
        this.positionXEnemy += 1;
    }
    else if (lowestsValue[0] == up && this.allowedToMove(this.positionXEnemy,this.positionYEnemy-1)){
        this.enemy.anims.play('upE', true);
        this.enemy.y -= 100;
        this.positionYEnemy -= 1;
    }
    else if (lowestsValue[0] == down && this.allowedToMove(this.positionXEnemy,this.positionYEnemy+1)){
        this.enemy.anims.play('downE', true);
        this.enemy.y += 100;
        this.positionYEnemy += 1;
    }
    else if (lowestsValue[1] == left && this.allowedToMove(this.positionXEnemy-1,this.positionYEnemy)){
        this.enemy.anims.play('leftE', true);
        this.enemy.x -= 100;
        this.positionXEnemy -= 1;
    }
    else if (lowestsValue[1] == right && this.allowedToMove(this.positionXEnemy+1,this.positionYEnemy)){
        this.enemy.anims.play('rightE', true);
        this.enemy.x += 100;
        this.positionXEnemy += 1;
    }
    else if (lowestsValue[1] == up && this.allowedToMove(this.positionXEnemy,this.positionYEnemy-1)){
        this.enemy.anims.play('upE', true);
        this.enemy.y -= 100;
        this.positionYEnemy -= 1;
    }
    else if (lowestsValue[1] == down && this.allowedToMove(this.positionXEnemy,this.positionYEnemy+1)){
        this.enemy.anims.play('downE', true);
        this.enemy.y += 100;
        this.positionYEnemy += 1;
    }
};

//When the enemy hit the player it's game over
map1Scene.gameOver = function () {
    //Pause and restart background song
    restartSong(this.bgSong);

    //Show skull in the screen
    this.skull = this.add.sprite(this.sys.game.config.width/2, this.sys.game.config.height /2, 'skull');
    this.skull.setScale(4);

    //Play DeathSound
    new Audio('assets/sounds/deathSound.wav').play();

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

        //When player run out of lives, game ends and reset both scene/lives
        if (lives == -1){
            lives = 5;
            this.bgSong.pause();
            this.scene.start('lose');
        }
    }, [], this);
};