class CreateDayEnds < ActiveRecord::Migration
  def up
    create_table :day_ends do |t|
      t.datetime :day_end
      t.string :created_by, limit:45
      t.string :edited_by, limit:45
      t.timestamps null: false
    end
  end

  def down
  	drop_table :day_ends
  end
end
