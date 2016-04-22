class AddRemoveColStatusAndAddColStatusId < ActiveRecord::Migration
  def up
  	remove_column :room_masters , :status
  	add_column :room_masters , :status_id , :integer , after: :floor_id
  end
  
  def down
  	add_column :room_masters , :status_id , :integer , after: :floor_id
  end
end
