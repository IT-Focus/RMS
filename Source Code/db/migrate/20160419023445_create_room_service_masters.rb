class CreateRoomServiceMasters < ActiveRecord::Migration
  def up
    create_table :room_service_masters do |t|
      t.integer :code
      t.string :service_name,limit:45
      t.string :indicatoer,limit:45
      t.boolean :is_include_tax
      t.float :tax
      t.string :created_by,limit:45
      t.string :edited_by, limit:45
      t.timestamps null: false
    end
  end
  def down
  	drop_table :room_service_masters
  end
end
