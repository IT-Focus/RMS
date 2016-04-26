class CashierBalanceService::Service
	def get_cashier_balance
		 @data = CashierBalance.joins({cashier: :sys_user}).where.not(opened_date:nil).where closed_date:nil
    	 @result = @data.select("cashier_balances.*, concat(sys_users.first_name,sys_users.last_name) as username ")
		return @result
	end

end