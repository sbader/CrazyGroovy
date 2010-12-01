class Song < ActiveRecord::Base
  belongs_to :album
  def as_json(options = {})
    ret = {
      :guid => "/songs/#{self.id}",
      :songID => self.id,
      :title => self.title,
      :track => self.track,
      :artist => self.album.artist,
      :album => self.album.title,
      :url => self.s3_key
    }
  end
end
