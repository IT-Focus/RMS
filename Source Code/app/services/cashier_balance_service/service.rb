class CashierBalanceService::Service
	def get_cashier_balance user
		@@service = CashierBalanceService::OpenCashDrawer.new()
		cashier_id = @@service.get_cashier_id user
		is_admin = @@service.check_is_sys_admin user
		if is_admin == true
			@data = CashierBalance.joins({cashier: :sys_user}).where.not(opened_date:nil).where closed_date:nil
		else
		 	@data = CashierBalance.joins({cashier: :sys_user}).where.not(opened_date:nil).where closed_date:nil,cashier_id:cashier_id 
		end
    	 @result = @data.select("cashier_balances.*, concat(sys_users.first_name,sys_users.last_name) as username ")
		return @result
	end



end