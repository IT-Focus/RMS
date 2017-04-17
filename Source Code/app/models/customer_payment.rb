class CustomerPayment < ActiveRecord::Base
	has_many :customer_payment_detail , foreign_key:"customer_payment_id"
end
