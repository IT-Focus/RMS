class CreateImages < ActiveRecord::Migration
  def up
    create_table :images do |t|
      t.timestamps
    end
	add_attachment :images , :image
  end
  def down
  	drop_table :images
  end
end
