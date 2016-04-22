class CreateStatuses < ActiveRecord::Migration
  def up
    create_table :statuses do |t|
    	t.string :status_type 
    	t.string :name 
    	t.integer :seq_num
    	t.string :description 
      t.timestamps null: false
    end
  end
  def down
  	drop_table :statuses
  end
end
