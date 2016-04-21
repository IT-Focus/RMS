class CreateFloors < ActiveRecord::Migration
  def up
    create_table :floors do |t|
      t.string :code, limit:45
      t.string :name, limit:45
      t.text :description
      t.timestamps null: false
    end
  end
  def down
  	drop_table :floors
  end
end
