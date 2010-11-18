var songs = new Array();
songs[1] = new Array();
songs[1][1] = 'files/audio/melancholyhill.mp3';
songs[1][2] = 'files/audio/brianeno.mp3';
songs[1][3] = 'files/audio/electricfeel.mp3';
var currentsong = 1;
var currentalbum = 1;

$(document).ready(function(){
  $("#playbtn").click(function(){
    var audioElement = document.getElementById('player');
    audioElement.volume = .5;    
    audioElement.setAttribute('src', 'files/audio/melancholyhill.mp3');
    audioElement.load();
    audioElement.play();
  });
  $("#pausebtn").click(function(){
    var audioElement = document.getElementById('player');
    audioElement.pause();
  });
  $("#stopbtn").click(function(){
    var audioElement = document.getElementById('player');
    stopmusic();
  });
  $("#voldown").click(function(){
    var audioElement = document.getElementById('player');
    if(audioElement.volume >= .1){
      audioElement.volume = audioElement.volume - .1;
    }
  });
  $("#volup").click(function(){
    var audioElement = document.getElementById('player');
    if(audioElement.volume <= .9){
      audioElement.volume = audioElement.volume + .1;
    }
  });
  $("#prevsong").click(function(){
    var audioElement = document.getElementById('player');
    changesong(currentalbum,currentsong - 1);
  });
  $("#nextsong").click(function(){
    var audioElement = document.getElementById('player');
    changesong(currentalbum,currentsong + 1);
  });
});

function changesong(album,id){
  var audioElement = document.getElementById('player');
  if(songs[album][id] != undefined){
    audioElement.setAttribute('src', songs[album][id]);
    audioElement.load();
    audioElement.play();
    currentsong = id;
  }
}

function stopmusic(){
 currentsong=1;
 currentalbum=1;
 var audioElement = document.getElementById('player');
 audioElement.setAttribute('src', undefined);
 audioElement.load();
}

function playing(){
}