class CreateAuditrails < ActiveRecord::Migration
  def up
    create_table :auditrails do |t|
      t.string :module,limit:45
      t.text :action
      t.text :description
      t.string :created_by,limit:45
      t.timestamps null: false
    end
  end
  def down
  	drop_table :auditrails
  end
end
