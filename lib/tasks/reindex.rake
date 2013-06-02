# coding: utf-8
require 'fog'
require 'mp3info'
include Fog
def time_per
  start = Time.now
  yield
  puts (Time.now - start).to_s + " Seconds for File"
end
def time_all
  start = Time.now
  yield
  puts (Time.now - start).to_s + " Seconds Total"
end
task :reindex => :environment do
  time_all do
    Album.delete_all
    Song.delete_all
    connection = Storage.new(
      :provider => 'AWS', 
      :aws_access_key_id => '##################', #put your id and keys here
      :aws_secret_access_key => '#################'
    )
    bucket = '###########' #put your bucket here
    directory = connection.directories.get(bucket)
    directory.files.each do |f|
      result = connection.get_object(bucket,f.key)
      content_type = result.headers["Content-Type"]
      body = result.body
      if content_type == "audio/mpeg" || content_type == "audio/mp3" || content_type == "audio/mp4"
        file = File.new('tmp/tempfile.mp3','w+')
        file.puts body.force_encoding("utf-8")
        file.close
        Mp3Info.open('tmp/tempfile.mp3',:encoding => "utf-8") do |mp3info|
          album = Album.find_or_create_by_artist_and_title(mp3info.tag.artist,mp3info.tag.album)
          song = album.songs.find_or_initialize_by_title_and_track_and_s3_key(mp3info.tag.title,mp3info.tag.tracknum)
          song.s3_key = "http://s3.amazonaws.com/#{bucket}/#{CGI.escape(f.key)}"
          song.save
        end
      end
    end
  end
end
