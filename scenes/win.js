var winScene = new Phaser.Scene('win');

winScene.init = function () {
    //BgWin Song
    this.bgWinSong = new Audio('assets/sounds/bgWinSong.wav');
};

winScene.preload = function () {
    this.load.image('bgWin', 'assets/images/bgWin.png');
};

winScene.create = function () {
    this.bgWinSong.play();
    var bg = this.add.sprite(0,0,'bgWin');
    bg.setScale(2);

    this.add.text(500, 200, 'Vitória', { fontSize: '100px', fontFamily: 'Arial', fill: '#fff' });
    this.add.text(500, 300, 'Você se salvou!', { fontSize: '33px', fill: '#fff', fontFamily: 'Arial' });
    this.add.text(500, 350, 'Pressione a barra de espaço para continuar', { fontSize: '18px', fill: '#fff', fontFamily: 'Arial' });
    this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
};

winScene.update = function () {
    if (this.spacebar.isDown) {
        this.bgWinSong.pause()
        this.time.delayedCall(250, function () {
            this.cameras.main.fade(250);
        }, [], this);
        this.scene.start('map1');
    }
};
