class AddColumnTaxToCheckin < ActiveRecord::Migration
  def up
  	add_column :check_ins, :tax_percentage , :integer , after: :discount_amount
  	add_column :check_ins, :discount_percentage , :integer , after: :total_amount 

  end
  def down
  	
  end
end
