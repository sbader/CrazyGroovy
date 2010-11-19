class ChangeS3KeyOnSongs < ActiveRecord::Migration
  def self.up
    change_column :songs, :s3_key, :text
  end

  def self.down
    change_column :songs, :s3_key, :string
  end
end
