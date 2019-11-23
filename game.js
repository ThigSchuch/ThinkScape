(function () {
    var config = {
        width: 1300,
        height: 700,
        type: Phaser.AUTO,
        parent: 'phaser-example',
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
        dom: {
            createContainer: true
        },
        //Scenes of the game
        scene: [
            nicknameScene,
            tutoScene,
            map1Scene,
            map2Scene,
            map3Scene,
            loseScene,
            winScene
        ]
    };

    var game = new Phaser.Game(config);
    
    //Start first map
    game.scene.start('nickname');

    var lives=5;
    localStorage.setItem("lives",lives);
    var name = '';
    localStorage.setItem("nomeDeUsuario", name);   
})();

