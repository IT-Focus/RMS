class CreateCashierBalances < ActiveRecord::Migration
  def change
    create_table :cashier_balances do |t|
    	t.integer :cashier_id
    	t.datetime :opened_date
    	t.datetime :closed_date
    	t.float :open_balance
    	t.float :close_balance
      t.timestamps null: false
    end
  end

  def down
  	drop_table :cashier_balances
  end
end
