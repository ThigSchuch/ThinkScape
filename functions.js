//Repeat Song
repeatSong = function(song){
    song.addEventListener('ended', function() {
        this.currentTime = 0;
        this.play();
    }, false);
};

//Restart Song
restartSong = function(song){
    song.pause();
    song.currentTime = 0;
};