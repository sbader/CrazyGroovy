$(document).ready(function(){
  var supportsAudio = !!document.createElement('audio').canPlayType,
       audio,
       loadingIndicator,
       positionIndicator,
       // timeleft = $('#timeleft'),
       // duration = $('#duration'),
       loaded = false,
       manualSeek = false;
  
  if(supportsAudio){
    audio = $("#audio audio").get(0);
    var current_song = $("#songs_body").children(".song").first();
    change_label();
    var positionIndicator = $('#player #handle');
    update_slider(0);
  }
  $(audio).bind('play',function(){ 
   $("#play_button").attr("href","#pause");
  });
  
  $(audio).bind('pause',function(){
   $("#play_button").attr("href","#play");
  });
  
  $(audio).bind('ended',function(){
   next_song();
   // timeleft.removeClass('white');
  });
  
  $(audio).bind('timeupdate',function(){
    var rem = parseInt(audio.duration - audio.currentTime, 10),
            pos = (audio.currentTime / audio.duration) * 100,
            mins = Math.floor(rem/60,10),
            secs = rem - mins*60,
            dur = parseInt(audio.duration,10),
            dur_mins = Math.floor(dur/60,10),
            dur_secs = dur - dur_mins * 60;
    // timeleft.text('-' + mins + ':' + (secs < 10 ? '0' + secs : secs));
    // duration.text('-' + dur_mins + ':' + (dur_secs < 10 ? '0' + dur_secs : dur_secs));
    update_slider(audio.currentTime);
  });
  
  $("#songs_body").selectable({filter: 'div.song'});
  
  $("#previous_song").click(function(){
    previous_song();
  });
  $("#next_song").click(function(){
    next_song();
  });
  $("#play_button").click(function(){
    play_pause_toggle();
  });

  $(".song").dblclick(function(){
    current_song = $(this);
    play_song($(this).data("id"));
    return false;
  });
  
  function play_pause_toggle(){
    if(audio.paused){
      if((audio.buffered != undefined) && (audio.buffered.length != 0)){
        audio.play();
        if(audio.play){
          $("#play_button").addClass("paused"); //this needs to run when the song is actually playing
        }
      }
      else{
        src = current_song.data("id");
        play_song(src);
      }
    }
    else{
      if((audio.buffered != undefined) && (audio.buffered.length != 0)){
        audio.pause();
        if(audio.paused){
          $("#play_button").removeClass("paused");
        }
      }
    }
  }
  function play_song(song_id){
    $.getJSON('/songs/'+song_id+'.js',function(json){
      audio.setAttribute('src',json.url);
      audio.volume = .5;
      audio.load();
      audio.play();
      if(audio.play){
        $("#play_button").addClass("paused"); //this needs to run when the song is actually playing
        change_label();
      }
    });
  }
  function next_song(){
    song = current_song.next().data("id");
    current_song = current_song.next();
    play_song(song);
  }
  function previous_song(){
    song = current_song.prev().data("id");
    if(song){
      current_song = current_song.prev();
      play_song(song);
    }
  }
  function change_label(){
    $("#song_title").html(current_song.children(".song_title").text());
    $("#artist").html(current_song.children(".artist").text());
    $("#album").html(current_song.children(".album").text());
  }
  function update_slider(value){
    $('#player #gutter').slider({
       value: value,
       step: 0.01,
       orientation: "horizontal",
       range: "min",
       max: audio.duration,
       animate: true,          
       slide: function(e,ui){              
         audio.currentTime = ui.value;
       },
       stop:function(e,ui){
         audio.currentTime = ui.value;
       }
     });
  }
});