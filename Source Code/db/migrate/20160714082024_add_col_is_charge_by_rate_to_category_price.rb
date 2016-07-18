class AddColIsChargeByRateToCategoryPrice < ActiveRecord::Migration
  def up
  	add_column :category_prices , :is_charge_rate , :boolean ,after: :is_include_tax 
  end
  def down
  	remove_column :category_prices , :is_charge_rate 
  end
end
