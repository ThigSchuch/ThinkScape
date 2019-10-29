var startScene = new Phaser.Scene('start');

startScene.init = function () {
};

startScene.preload = function () {
    this.load.image('assets/background.png')
};

startScene.create = function () {

    let bg = this.add.sprite(0, 0, 'background');
    this.add.text(100, 50, 'Teste', {fill: '#fff'});

//    let bg = this.add.sprite(0, 0, 'background');
//    bg.setOrigin(0, 0);
//    this.player = this.add.sprite(60, 100, 'player');

//    this.add.text(100, 50, 'Vitória', { fontSize: '100px', fontFamily: 'Arial', fill: '#fff' });
//    this.add.text(40, 150, 'Você alcançou o tesouro!', { fontSize: '33px', fill: '#fff', fontFamily: 'Arial' });
//    this.add.text(40, 260, 'Pressione a barra de espaço para continuar', { fontSize: '18px', fill: '#fff', fontFamily: 'Arial' });
//    this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
};

startScene.update = function () {
    if (this.spacebar.isDown) {
        this.time.delayedCall(250, function () {
            this.cameras.main.fade(250);
        }, [], this);
        this.scene.start('main');
    }
};
