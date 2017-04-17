class CashierBalance < ActiveRecord::Base
	 belongs_to :cashier , foreign_key:'cashier_id'
	 belongs_to :statuses , foreign_key:'status'
	 # validates_presence_of :cashier_balance
	 # validates_uniqueness_of :cashier_id,status:40 , message:"Note: This user have been openned cash drawer, Pleash close before open!"


	 def self.check_cashier_balance _cashier_id
	 	@cashierBalance = self.find_by cashier_id:_cashier_id, closed_date:nil
	 	if !@cashierBalance.nil?
	 		return true
	 	else
	 		return false
	 	end
	 end

	 def self.check_cashier_transaction _user_id
	 	@cashier_id = self.get_cashier _user_id 
	 	if @cashier_id > 0
		 	@cashierBalance = self.check_cashier_balance @cashier_id
		 	if @cashierBalance == true
		 		return true
		 	else
		 		return false
		 	end
		else
			return 'not_cashier'
		end

	 end

	 def self.get_cashier _user_id
	 	@cashier = Cashier.find_by user_id:_user_id, is_active:true
	 	if !@cashier.nil?
	 		return @cashier.id
	 	else
	 		return 0
	 	end
	 end
end
