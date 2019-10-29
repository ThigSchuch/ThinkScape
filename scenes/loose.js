var looseScene = new Phaser.Scene('loose');

//BgDeath Song
var bgDeathSong = new Audio('assets/sounds/bgDeathSong.mp3');

looseScene.init = function () {
};

looseScene.preload = function () {
};

looseScene.create = function () {
    bgDeathSong.play();
    let bg = this.add.sprite(0, 0, 'background');
    bg.setOrigin(0, 0);
    this.player = this.add.sprite(60, 100, 'player');

    this.add.text(100, 50, 'Derrota!', { fontSize: '100px', fontFamily: 'Arial', fill: '#fff' });
    this.add.text(40, 150, 'Você perdeu todas as vidas!', { fontSize: '33px', fill: '#fff', fontFamily: 'Arial' });
    this.add.text(40, 260, 'Pressione a barra de espaço para reiniciar', { fontSize: '18px', fill: '#fff', fontFamily: 'Arial' });
    this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
};

looseScene.update = function () {
    if (this.spacebar.isDown) {
        bgDeathSong.pause()
        bgSong.play();
        this.time.delayedCall(250, function () {
            this.cameras.main.fade(250);
        }, [], this);
        this.scene.start('map1');
    }
};
