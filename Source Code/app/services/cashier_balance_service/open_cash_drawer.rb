class CashierBalanceService::OpenCashDrawer
	def check_cash_drawer user
		is_admin = check_is_sys_admin user
		if is_admin == true
			is_open_cash_drawer = check_is_open_cash_drawer(user)
				if is_open_cash_drawer.count > 0
					puts "===================openned"
					return true
				else
					puts "===================close"
					return false 
				end
		else
			cashier = check_cashier(user)
			if cashier == true
				is_open_cash_drawer = check_is_open_cash_drawer(user)
				if is_open_cash_drawer.count > 0
					return true
				else
					return false 
				end
			
			else
				return "not member"
			end
		end
	end

	def get_cashier_id_from_client data
		data.each do |f|
			return f.cashier_id
		end
	end

	def check_is_open cashier_id
		is_open_cash_drawer = check_is_open_cash_drawer_client (cashier_id)
				if is_open_cash_drawer.count > 0
					return true
				else
					return false 
				end
	end

	def check_is_open_cash_drawer user
		cashier_id = get_cashier_id(user)
		cashBalance = CashierBalance.where cashier_id:cashier_id, closed_date:nil
		return cashBalance		
	end

	def check_is_open_cash_drawer_client cashier_id
		cashBalance = CashierBalance.where cashier_id:cashier_id, closed_date:nil
		return cashBalance		
	end

	def check_is_sys_admin user
		user = SysUser.find_by id:user, is_admin:true
		if !user.nil?
			return true
		else
			return false
		end
	end

	def check_cashier user
		cashier = Cashier.find_by user_id:user
		if !cashier.nil?
			return true
		else 
			return false
		end
	end

	def get_cashier_id user
		cashier = Cashier.find_by user_id:user
		if !cashier.nil?
			return cashier.id
		else
			return ""
		end
	end

	def get_cashier_detail user
		cashier = Cashier.find_by user_id:user
		return cashier

	end


end