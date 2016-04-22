class CreateRoomMasters < ActiveRecord::Migration
  def up
    create_table :room_masters do |t|
      t.string :room_no,limit:45
      t.integer :category_id
      t.integer :floor_id
      t.integer :status_id
      t.string :extn_no,limit:45
      t.timestamps null: false
    end
  end
  def down
  	drop_table :room_masters
  end
end
