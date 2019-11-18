(function () {
    var config = {
        width: 1300,
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
        //Scenes of the game
        scene: [
            tutoScene,
            map1Scene,
            map2Scene,
            loseScene,
            winScene
        ]
    };

    var game = new Phaser.Game(config);
    
    //Start first map
    game.scene.start('tuto1');

    var lives=5;
    localStorage.setItem("lives",lives);
})();

