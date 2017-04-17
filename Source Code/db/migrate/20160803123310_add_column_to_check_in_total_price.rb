class AddColumnToCheckInTotalPrice < ActiveRecord::Migration
  def up
  	add_column :check_ins , :total_amount , :decimal 
	add_column :check_ins , :discount_amount, :decimal
	add_column :check_ins , :tax_amount, :decimal
	add_column :check_ins , :grand_total_amount, :decimal
  end
end
