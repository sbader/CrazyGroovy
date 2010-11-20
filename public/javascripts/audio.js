$(document).ready(function(){
  var audio = $("#audio audio").get(0);
  var current_song = $("table#songs > tbody").children("tr").first();
  src = current_song.data("s3_key");
  audio.setAttribute('src',src);
  $("#previous_song").click(function(){
    song = current_song.prev().data("s3_key");
    play_song(song);
    current_song = current_song.prev();
  });
  $("#next_song").click(function(){
    next_song();
  });
  $("#play_button").click(function(){
    play_pause_toggle();
  });
  $("tr").click(function(){
    $("tr").removeClass("selected");
    $(this).addClass("selected");
    return false;
  });
  $("tr").dblclick(function(){
    play_song($(this).data("s3_key"));
    current_song = $(this);
    $("#play_button").addClass("pause")
    return false;
  });
  $(audio).bind('play',function(){
    $("#play_button").addClass("pause")
    $("#play_button").attr("href","#pause");
  });
  $(audio).bind('pause',function(){
    $("#play_button").removeClass("pause")
    $("#play_button").attr("href","#play");
  });
  $(audio).bind('ended',function(){
    next_song();
  });
  function play_pause_toggle(){
    if(audio.paused){
      audio.play();
    }
    else{
      audio.pause();
    }
  }
  function play_song(src){
    audio.volume = .5;
    audio.setAttribute('src',src);
    audio.load();
    audio.play();
  }
  function next_song(){
    song = current_song.next().data("s3_key");
    play_song(song);
    current_song = current_song.next();
  }
  function previous_song(){
    song = current_song.prev().data("s3_key");
    play_song(song);
    current_song = current_song.prev();
  }
});

// 
// 
// function changesong(album,id){
//   var audio = document.getElementById('player');
//   if(songs[album][id] != undefined){
//     audio.setAttribute('src', songs[album][id]);
//     audio.load();
//     audio.play();
//     currentsong = id;
//   }
// }
// 
// function stopmusic(){
//  currentsong=1;
//  currentalbum=1;
//  var audio = document.getElementById('player');
//  audio.setAttribute('src', undefined);
//  audio.load();
// }
// 
// function playing(){
// }