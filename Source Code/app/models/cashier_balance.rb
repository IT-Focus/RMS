class CashierBalance < ActiveRecord::Base
	 belongs_to :cashier , foreign_key:'cashier_id'
	 # validates_presence_of :cashier_balance
	 # validates_uniqueness_of :cashier_id,:opened_date , message:"Note: This user have been openned cash drawer, Pleash close before open!"
end
