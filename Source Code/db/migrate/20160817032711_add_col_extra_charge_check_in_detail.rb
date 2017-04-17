class AddColExtraChargeCheckInDetail < ActiveRecord::Migration
  def up
  	add_column :check_in_details , :extra_charge , :integer
  end

  def down
  	remove_column :check_in_details, :extra_charge
  end
end
