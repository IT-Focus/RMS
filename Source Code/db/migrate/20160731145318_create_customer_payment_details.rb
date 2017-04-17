class CreateCustomerPaymentDetails < ActiveRecord::Migration
  def up
    create_table :customer_payment_details do |t|
    	t.integer :customer_payment_id 
    	t.integer :check_in_id 
    	t.decimal :amount
      t.timestamps null: false
    end
  end
end
