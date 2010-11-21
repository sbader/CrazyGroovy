$(document).ready(function(){
  // positionIndicator = $('.player #handle');
  timeleft = $('#timeleft');
  duration = $('#duration');
  var supportsAudio = !!document.createElement('audio').canPlayType,
  			audio,
  			loadingIndicator,
  			positionIndicator,
  			timeleft,
  			loaded = false,
  			manualSeek = false;
  if(supportsAudio){
    var audio = $("#audio audio").get(0);
    var current_song = $("table#songs > tbody").children("tr").first();
    src = current_song.data("s3_key");
    audio.setAttribute('src',src);
    change_label();
    var positionIndicator = $('#player #handle');
    if ((audio.buffered != undefined) && (audio.buffered.length != 0)) {
			$(audio).bind('progress', function() {
				var loaded = parseInt(((audio.buffered.end(0) / audio.duration) * 100), 10);
			});
		}
		$(audio).bind('timeupdate',function(){
      var rem = parseInt(audio.duration - audio.currentTime, 10),
              pos = (audio.currentTime / audio.duration) * 100,
              mins = Math.floor(rem/60,10),
              secs = rem - mins*60;
      timeleft.text('-' + mins + ':' + (secs < 10 ? '0' + secs : secs));
      // if (!manualSeek) { positionIndicator.css({left: pos + '%'}); }
			$('#player #gutter').slider({
					value: audio.currentTime,
					step: 0.01,
					orientation: "horizontal",
					range: "min",
					max: audio.duration,
					animate: true,					
					slide: function(e,ui){							
            // manualSeek = true;
						audio.currentTime = ui.value;
					},
					stop:function(e,ui){
            // manualSeek = false;          
						audio.currentTime = ui.value;
					}
				});
    });
  }
  // else {
  //   loadingIndicator.remove();
  // }
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
    current_song = $(this);
    play_song($(this).data("s3_key"));
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
    change_label();
  }
  function next_song(){
    song = current_song.next().data("s3_key");
    current_song = current_song.next();
    play_song(song);
  }
  function previous_song(){
    song = current_song.prev().data("s3_key");
    current_song = current_song.prev();
    play_song(song);
  }
  function change_label(){
    $("#song_title").html(current_song.children("td.song_title").text());
    $("#artist").html(current_song.children("td.artist").text());
    $("#album").html(current_song.children("td.album").text());
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