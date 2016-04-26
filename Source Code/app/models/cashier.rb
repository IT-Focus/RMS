class Cashier < ActiveRecord::Base
	 belongs_to :sys_user , foreign_key:'user_id'
	 belongs_to :workshift , foreign_key:'workshift_id'
	 has_many :cashier_balance, foreign_key:'cashier_id'
end
