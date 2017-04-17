class CreateCustomerPayments < ActiveRecord::Migration
  def up
    create_table :customer_payments do |t|
    	t.string :receipt_no 
    	t.date :transaction_date 
    	t.decimal :base_currency_amount 
    	t.decimal :change_rate 
    	t.decimal :total_amount 
    	t.integer :payment_method
    	t.string :status_code 
    	t.integer :created_by	
    	t.text :remark 
      t.timestamps null: false
    end
  end
end
