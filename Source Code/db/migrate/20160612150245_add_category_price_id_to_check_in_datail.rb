class AddCategoryPriceIdToCheckInDatail < ActiveRecord::Migration
  def up
  	add_column :check_in_details, :categroy_price_id , :integer , after: :room_no
  end
  def down
  	remove_column :check_in_details, :categroy_price_id 
  end
end
