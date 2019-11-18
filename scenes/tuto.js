var tutoScene = new Phaser.Scene('tuto');

tutoScene.init = function () {
    this.click = 0;
};

//Loading images
tutoScene.preload = function () {
    this.load.image('bgMap1', 'assets/images/bgMap1.png');
    this.load.image('key', 'assets/images/key.png');
    this.load.spritesheet('player', 'assets/images/warrior.png',{ frameWidth: 48, frameHeight: 64 });
    this.load.spritesheet('enemy', 'assets/images/enemy.png', { frameWidth: 32, frameHeight: 64});
    this.load.spritesheet('portal', 'assets/images/portal.png',  { frameWidth: 32, frameHeight: 32 });
    this.load.image('life', 'assets/images/heart.png');
};

tutoScene.create = function () {
    //Set background image
    var bg = this.add.sprite(0, 0, 'bgMap1');
    bg.setOrigin(0, 0);

    this.space = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    //Player Sprite
    this.player = this.add.sprite(150, 335, 'player');
    this.player.setScale(2);

    this.anims.create({
        key: 'playerStand',
        frames: [{ key: 'player', frame: 7 }],
        frameRate: 20
    });

    this.anims.create({
        key: 'enemyStand',
        frames: [{ key: 'enemy', frame: 7 }],
        frameRate: 20
    });

    this.anims.create({
        key: 'portalStand',
        frames: [{ key: 'portal', frame: 1 }],
        frameRate: 20
    });

    text = this.add.text(300, 200, 'Este é seu personagem.', { fontSize: '50px', fill: '#fff' });
    this.add.text(250, 650, 'Pressione espaço para continuar.', { fontSize: '40px', fill: '#fff' });
};

tutoScene.update = function () {

    this.player.anims.play('playerStand', true);

    if (Phaser.Input.Keyboard.JustDown(this.space)){
        if (this.click == 0){
            //Enemy Sprite
            this.enemy = this.add.sprite(550, 335, 'enemy');
            this.enemy.setScale(2);
            text.setText('Este é seu inimigo,\ncuidado.');
        }
        else if (this.click == 1){
            //Portal
            this.portal = this.add.sprite(800, 350, 'portal');
            this.portal.setScale(3.8);
            text.setText('Você precisa alcançar o portal.');
        }
        else if (this.click == 2){
            this.key = this.add.sprite(1100, 350, 'key');
            this.key.setScale(2);
            text.setText('Mas não se esqueça da chave.');
        }
        else if (this.click == 3){
            text.setText('Está pronto?\nVamos começar.');
        }
        else if (this.click == 4){
            this.scene.start('map1');
        }
        this.click += 1;
    };
};