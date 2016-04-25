class CreateWorkshifts < ActiveRecord::Migration
  def up
    create_table :workshifts do |t|
   	  t.string :abbr
   	  t.string :name
   	  t.time :start_time
   	  t.time :end_time
   	  t.text :description
      t.timestamps null: false
    end
  end

  def down
  	drop_table :workshifts
  end
end
