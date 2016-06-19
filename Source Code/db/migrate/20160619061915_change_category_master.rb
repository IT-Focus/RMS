class ChangeCategoryMaster < ActiveRecord::Migration
  def up
  	remove_column :category_masters, :tax
  	remove_column :category_masters, :rent_for_single 
  	remove_column :category_masters, :tax_for_single
  	remove_column :category_masters, :tax_hour
  	remove_column :category_masters, :rent_for_single_hour
  	remove_column :category_masters, :tax_for_single_hour
  	remove_column :category_masters, :tax_month
  	remove_column :category_masters, :rent_for_single_month
  	remove_column :category_masters, :tax_for_single_month
  	remove_column :category_masters, :extra_person_charge_month
  	remove_column :category_masters, :user_id
  	add_column :category_masters, :is_include_tax_hour , :boolean , after: :tariff_hour
  	add_column :category_masters, :is_include_tax_month , :boolean , after: :tariff_month
  end
  def down
  	remove_column :category_masters, :is_include_tax_hour
  	remove_column :category_masters, :is_include_tax_month
  end
end
