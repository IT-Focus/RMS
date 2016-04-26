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
end

