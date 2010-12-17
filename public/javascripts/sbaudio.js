$(function(){
  // Setup the player to autoplay the next track
  var a = audiojs.createAll({
    css: '',
    createPlayer: {
      markup: '<div class="scrubber"> \
                  <div class="progress"></div> \
                  <div class="loaded"></div> \
                </div> \
                <div class="buttons"> \
                  <div class="previous_song"></div> \
                  <div class="play-pause"> \
                    <div class="play"></div> \
                    <div class="pause"></div> \
                    <div class="loading"></div> \
                    <div class="error"></div> \
                  </div> \
                  <div class="next_song"></div> \
                </div> \
                <div class="time"> \
                  <em class="played">00:00</em> \
                  <strong class="duration">00:00</strong> \
                </div> \
                <div class="error-message"></div>',
                playPauseClass: 'play-pause',
                scrubberClass: 'scrubber',
                progressClass: 'progress',
                loaderClass: 'loaded',
                timeClass: 'time',
                durationClass: 'duration',
                playedClass: 'played',
                errorMessageClass: 'error-message',
                playingClass: 'playing',
                loadingClass: 'loading',
                errorClass: 'error'
    },
    swfLocation: '/javascripts/audiojs.swf',
    imageLocation: '/images/player-graphics.gif',
    trackEnded: function() {
      var next = $('#songs_body .playing').next();
      if (!next.length) next = $('#songs_body .song').first();
      next.addClass('playing').siblings().removeClass('playing');
      load_song(next.data('id'),true);
    }
  });
  
  // Load in the first track
  
  $("#songs_body").selectable({filter: 'div.song'}); 
  load_song($("#songs_body").children('.song').first().data('id'));
  var audio = a[0];
  
  $(".song").dblclick(function(e){
    e.preventDefault();
    $(this).addClass('playing').siblings().removeClass('playing');
    load_song($(this).data("id"),true);
  });
  
  $(".next_song").click(function(e){
    play_next();
  });
  
  $(".previous_song").click(function(e){
    play_previous();
  });
  
  // Keyboard shortcuts
  $(document).keydown(function(e) {    
    var unicode = e.charCode ? e.charCode : e.keyCode;
       // right arrow
    if (unicode == 39) {
      e.preventDefault();
      play_next();
      // back arrow
    } else if (unicode == 37) {
      e.preventDefault();
      play_previous();
      // spacebar
    } else if (unicode == 32) {
      e.preventDefault();
      audio.playPause();
    }
  });
  
  function load_song(song_id, play){
    $.getJSON('/songs/'+song_id+'.js',function(data){
      audio.load(data.url);
      change_label(data.title,data.artist,data.album);
      if(play)
        audio.play();
    });
  };
  
  function change_label(title,artist,album){
    $("#song_title").html(title);
    $("#artist").html(artist);
    $("#album").html(album);
  };
  
  function play_next(){
    var next = $('#songs_body .playing').next();
    if (!next.length) next = $('#songs_body .song').first();
    next.dblclick();
  };
  
  function play_previous(){
    var prev = $('#songs_body .playing').prev();
    if (!prev.length) prev = $('#songs_body .song').last();
    prev.dblclick();
  };
});

