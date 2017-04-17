class Cashier < ActiveRecord::Base
	 belongs_to :sys_user , foreign_key:'user_id'
	 belongs_to :workshift , foreign_key:'workshift_id'
	 has_many :cashier_balance, foreign_key:'cashier_id'

	def self.get_cashier_id_by_user user_id 
		@cashier = self.find_by user_id:user_id , is_active:true 
		return @cashier.id 
				
	end	

	
end
