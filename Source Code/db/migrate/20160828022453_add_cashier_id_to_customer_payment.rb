class AddCashierIdToCustomerPayment < ActiveRecord::Migration
  def up
  	add_column :customer_payments , :cashier_id , :integer , after: :eod_id
  end
end
