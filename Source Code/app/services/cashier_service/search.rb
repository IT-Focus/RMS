class CashierService::Search
	def search search_string
		data = Cashier.joins(:sys_user, :workshift)
   		@result = data.select("cashiers.*, concat(sys_users.first_name,sys_users.last_name) as username, workshifts.name as workshift_name")
   			if !search_string.nil?
   				text = '%' + search_string +'%'
   				@result = @result.where("concat(sys_users.first_name,sys_users.last_name) like '#{text}' or workshifts.name like '#{text}' ")
   			end
		return @result
	end

	def get_cashier user
		data = Cashier.joins(:sys_user, :workshift).where user_id:user
    	@result = data.select("cashiers.*, concat(sys_users.first_name,sys_users.last_name) as username, workshifts.name as workshift_name")
		return @result
	end

	# def get_cahier_combo
	# 	# data = Cashier.joins(:sys_user, :workshift)
	# 	data = CashierBalance.joins(cashier:[:sys_user,:workshift])
 #   		@result = data.select("cashiers.*, concat(sys_users.first_name,sys_users.last_name) as username, workshifts.name as workshift_name")
 #   		@result.not(where)
 #   		return @result
	# end
end

