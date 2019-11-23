var nicknameScene = new Phaser.Scene('nickname');

nicknameScene.init = function () {};

nicknameScene.preload = function () {
    this.load.html('nameform', 'assets/html/nameform.html')
    
};

nicknameScene.create = function (){
    var element = this.add.dom(650, 0).createFromCache('nameform');
    element.addListener('click');
    element.game = this;
    element.on('click', function (event) {
        if (event.target.name === 'playButton'){
            var valorentrada = this.getChildByName('valor');
            nick = valorentrada.value;
            localStorage.setItem("nomeDeUsuario", nick); 
            if (valorentrada.value !== ''){
                console.log(valorentrada.value)
        //  Desativar os eventos de clique
                this.game.scene.start('tuto');
                this.removeListener('click');
        //  Ocultar o elemento de login
                this.setVisible(false);
            };
        };
    });

    this.tweens.add({
        targets: element,
        y: 300,
        duration: 0,
        ease: 'Power3'
        });


};

