var map5Scene = new Phaser.Scene('map5');
var lives = localStorage.getItem("lives");
var nickname = localStorage.getItem("nomeDeUsuario");

map5Scene.init = function () {
    //Set obstacles location
    this.blocked = ['4,5', '6,6', '8,3', '8,2', '1,3', '2,3', '3,3', '4,3', '5,3', '6,3','7,3', '8,5', '8,7', '10,6', '9,3', '10,3', '11,3', '12,3', '13,3'];

    this.positionXPlayer = 2;
    this.positionYPlayer = 5;
    this.positionXEnemy = 9;
    this.positionYEnemy = 5;
    this.positionXPortal = 13;
    this.positionYPortal = 4;
    //mod agora
    this.positionPortal = [13,4];
    this.positionKey = [8,6];
    this.bgSong = new Audio('assets/sounds/bgSong.mp3');
    this.oldXYPlayer = [2,5];
};

//Loading images
map5Scene.preload = function () {
    this.load.image('bgMap5', 'assets/images/bgMap5.png');
    //mod agora
    this.load.image('key', 'assets/images/key.png');
    this.load.spritesheet('player', 'assets/images/warrior.png',{ frameWidth: 48, frameHeight: 64 });
    this.load.spritesheet('enemy', 'assets/images/enemy.png', { frameWidth: 32, frameHeight: 64});
    this.load.spritesheet('portal', 'assets/images/portal.png',  { frameWidth: 32, frameHeight: 32 });
    this.load.image('life', 'assets/images/heart.png');
    this.load.image('spikes','assets/images/obstacles/spikes.png');
    this.load.image('barrel','assets/images/obstacles/barrel.png');
    this.load.image('rock','assets/images/obstacles/rock.png');
    this.load.image('bush','assets/images/obstacles/bush.png');
    this.load.image('skull','assets/images/skull.png');
};

map5Scene.create = function () {
   
    //Start and repeat background soung
    this.bgSong.play();
    repeatSong(this.bgSong);

    //Set background image
    var bg = this.add.sprite(0, 0, 'bgMap5');
    bg.setOrigin(0, 0);

    //mod agora
    //Key Sprite
    this.key = this.add.sprite(750, 545, 'key');
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


    //Player Sprite
    this.player = this.add.sprite(150, 430, 'player');
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

    //Portal Sprite
    this.portal = this.add.sprite(1240, 330, 'portal');
    this.portal.setScale(3.8);

    //Portal Animation
    this.anims.create({
        key: 'portal',
        frames: this.anims.generateFrameNumbers('portal', { start: 0, end: 16 }),
        frameRate: 20,
        repeat: -1
    });
    this.portal.anims.play('portal', true);

    //Enemy Sprite
    this.enemy = this.add.sprite(850, 430, 'enemy')
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

    //Obstacles
    this.spikes = this.add.sprite(550, 550, 'spikes')
    this.spikes.setScale(0.5);
    this.rock = this.add.sprite(350, 445, 'rock')
    this.rock.setScale(0.2);
    this.barrel2 = this.add.sprite(750, 445, 'barrel')
    this.barrel2.setScale(0.5);
    this.barrel2 = this.add.sprite(750, 645, 'barrel')
    this.barrel2.setScale(0.5);
    this.barrel2 = this.add.sprite(950, 545, 'barrel')
    this.barrel2.setScale(0.5);

    this.isPlayerAlive = true;

    this.cameras.main.resetFX();

    //Text of coordenades player/enemy
    //textP = this.add.text(100, 50, '('+this.positionXPlayer+','+this.positionYPlayer+')', { fontSize: '50px', fill: '#fff' });
    //textE = this.add.text(300, 50, '('+this.positionXEnemy+','+this.positionYEnemy+')', { fontSize: '50px', fill: '#fff' });
    //textB = this.add.text(600, 50, '', { fontSize: '50px', fill: '#fff' });

};

//Where the magic happens

map5Scene.update = function () {
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
        map5Scene.gameOver();
    }
    
    //mod agora
    if (this.positionXPlayer == this.positionKey[0] && this.positionYPlayer == this.positionKey[1]){
        this.key.x = 150;
        this.key.y = 40;
        this.key.setScale(1.25);
        this.playerKey = true;
    }
    //mod agora
    if (this.positionXPlayer == this.positionPortal[0] && this.positionYPlayer == this.positionPortal[1] && this.playerKey == true) {
        lives = 5;
        this.bgSong.pause();
        this.scene.start('win');
        //Reset both position
        this.resetPosition();
    } 
    
    this.updateText();
};

//Check if the player/enemy is allowed to move to that position
map5Scene.allowedToMove = function(positionX,positionY){
    allowed = true;
    //Bounds of map actually
    // 14 is the limit of X
    // 3 and 8 is the limit of Y
    if (positionX == 0 || positionY == -1 || positionX == 14 || positionY == 8){
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
map5Scene.euclideanCalc = function(positionXPlayer,positionYPlayer,positionXEnemy,positionYEnemy){
    return(Math.sqrt(Math.pow((positionXPlayer - positionXEnemy),2) + Math.pow((positionYPlayer - positionYEnemy),2)));
}

//Coordenates
map5Scene.updateText = function(){
    textVida= this.add.text(200, 15, 'Nick:' + localStorage.getItem("nomeDeUsuario"), { fontSize: '35px', fill: '#fff' });
    //textP.setText('P('+this.positionXPlayer+','+this.positionYPlayer+')');
    //textE.setText('E('+this.positionXEnemy+','+this.positionYEnemy+')');
}

//When player dies, reset position counter
map5Scene.resetPosition = function(){
    this.positionXPlayer = 2;
    this.positionYPlayer = 4;
    this.positionXEnemy = 9;
    this.positionYEnemy = 4;
}


//Get the minor and second minor value
map5Scene.minor = function(array){
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
map5Scene.enemyWalk = function(){

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
map5Scene.gameOver = function () {
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
        this.scene.start('map5');
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