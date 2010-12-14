$(function(){
  // Setup the player to autoplay the next track
  var a = audiojs.createAll({
    imageLocation: '/images/player-graphics.gif',
    trackEnded: function() {
      var next = $('#songs_body .playing').next();
      if (!next.length) next = $('#songs_body .song').first();
      next.addClass('playing').siblings().removeClass('playing');
      play_song(next.data('id'));
    }
  });
  
  // Load in the first track
  
  $("#songs_body").selectable({filter: 'div.song'});
  
  var audio = a[0];
  
  function play_song(song_id){
    $.getJSON('/songs/'+song_id+'.js',function(data){
      load_song(data.url);
    });
  };

  function load_song(url){
    audio.load(url);
    audio.play();
/*    audio.play();*/
  };
  
  $(".song").dblclick(function(e){
    e.preventDefault();
    $(this).addClass('playing').siblings().removeClass('playing');
    play_song($(this).data("id"));
  });
  // Keyboard shortcuts
    $(document).keydown(function(e) {
    var unicode = e.charCode ? e.charCode : e.keyCode;
       // right arrow
    if (unicode == 39) {
      var next = $('#songs_body .playing').next();
      if (!next.length) next = $('#songs_body .song').first();
      next.dblclick();
      // back arrow
    } else if (unicode == 37) {
      var prev = $('#songs_body .playing').prev();
      if (!prev.length) prev = $('#songs_body .song').last();
      prev.dblclick();
      // spacebar
    } else if (unicode == 32) {
      audio.playPause();
    }
  });
});

