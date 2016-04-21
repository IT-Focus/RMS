class CreateDefaultColors < ActiveRecord::Migration
  def up
    create_table :default_colors do |t|
      t.string :reserved, limit:45
      t.string :occupied, limit:45
      t.string :late_checkout, limit:45
      t.string :free, limit:45
      t.string :edited_by, limit:45
      t.timestamps null: false
    end
  end
  def down
  	drop_table :default_colors
  end
end
