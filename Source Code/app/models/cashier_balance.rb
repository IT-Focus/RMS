class CashierBalance < ActiveRecord::Base
	 belongs_to :cashier , foreign_key:'cashier_id'
end
