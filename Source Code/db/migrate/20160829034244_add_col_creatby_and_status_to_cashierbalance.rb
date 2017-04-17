class AddColCreatbyAndStatusToCashierbalance < ActiveRecord::Migration
  def up
  	add_column :cashier_balances , :close_by , :string
  	add_column :cashier_balances , :status , :integer
  end

  def down
  	remove_column :cashier_balances, :close_by
  	remove_column :cashier_balances, :status
  end
end
