(function () {
    var config = {
        width: 1500,
        height: 700,
        type: Phaser.AUTO,
        title: 'ThinkScape',
        backgroundColor: 0x336699,
        input: {
            keyboard: true,
            mouse: true,
            touch: true,
        },
        physics: {
            default: 'arcade',
            arcade: {
                debug: false
            }
        },
        scene: [
            mainScene,
            winScene
        ]
    };

    var game = new Phaser.Game(config);
    game.scene.start('map1');
})();

