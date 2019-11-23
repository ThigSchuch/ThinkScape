var loseScene = new Phaser.Scene('lose');
var nickname = localStorage.getItem("nomeDeUsuario");
//BgDeath Song
var bgDeathSong = new Audio('assets/sounds/bgDeathSong.mp3');

loseScene.init = function () {
};

loseScene.preload = function () {
    this.load.image('bgLose', 'assets/images/bgLose.jpg');
};

loseScene.create = function () {
    bgDeathSong.play();
    let bg = this.add.sprite(0, 0, 'bgLose');
    bg.setScale(2);

    this.add.text(500, 200, 'Derrota!', { fontSize: '100px', fontFamily: 'Arial', fill: '#fff' });
    this.add.text(500, 300, 'Você perdeu todas as vidas!', { fontSize: '33px', fill: '#fff', fontFamily: 'Arial' });
    this.add.text(500, 350, 'Pressione a barra de espaço para reiniciar', { fontSize: '18px', fill: '#fff', fontFamily: 'Arial' });
    this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
};

loseScene.update = function () {
    if (this.spacebar.isDown) {
        bgDeathSong.pause()
        this.time.delayedCall(250, function () {
            this.cameras.main.fade(250);
        }, [], this);
        this.scene.start('map1');
    }
};
