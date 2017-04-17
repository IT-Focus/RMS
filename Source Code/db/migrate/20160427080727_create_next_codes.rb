class CreateNextCodes < ActiveRecord::Migration
  def up
    create_table :next_codes do |t|
    	t.string :module
    	t.integer :cit
    	t.integer :cet
      	t.string :prefix
      	t.string :suffix
      	t.integer :length
      	t.timestamps null: false
    end
  end
  def down
  	drop_table :next_codes
  end
end
