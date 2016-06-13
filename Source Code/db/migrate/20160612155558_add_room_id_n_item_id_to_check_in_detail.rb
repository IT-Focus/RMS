class AddRoomIdNItemIdToCheckInDetail < ActiveRecord::Migration
  def up
  	add_column :check_in_details , :room_master_id , :integer ,after: :check_in_id 
  	add_column :check_in_details , :service_id , :integer, after: :check_in_id
  end
  def down
  	remove_column :check_in_details , :room_master_id 
  	remove_column :check_in_details , :service_id 
  end
end
