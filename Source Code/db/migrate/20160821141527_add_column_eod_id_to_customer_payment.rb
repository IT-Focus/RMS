class AddColumnEodIdToCustomerPayment < ActiveRecord::Migration
  def up
  	add_column :customer_payments , :eod_id , :integer , after: :remark
  end
end
