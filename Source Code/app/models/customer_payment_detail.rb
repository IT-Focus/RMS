class CustomerPaymentDetail < ActiveRecord::Base
	belongs_to :check_in , foreign_key:"check_in_id"
	belongs_to :customer_payment , foreign_key:"customer_payment_id"
end
