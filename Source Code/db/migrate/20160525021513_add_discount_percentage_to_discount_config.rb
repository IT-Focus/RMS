class AddDiscountPercentageToDiscountConfig < ActiveRecord::Migration
  def up
  	add_column :discount_config , :discount_percentage , :float , after: :id
  end
  def down
  	remove_column :discount_config, :no_room
  end
end
