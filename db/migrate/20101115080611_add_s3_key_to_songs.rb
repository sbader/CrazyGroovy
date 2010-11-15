class AddS3KeyToSongs < ActiveRecord::Migration
  def self.up
    add_column :songs, :s3_key, :string
  end

  def self.down
    remove_column :songs, :s3_key
  end
end
