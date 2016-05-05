class CashierBalanceService::OpenCashDrawer
	def check_cash_drawer user
		is_admin = check_is_sys_admin user
		if is_admin == true
			return false
		else
			cashier = check_cashier(user)
			if cashier == true
				cashier_id = get_cashier_id(user)
				cashBalance = CashierBalance.where cashier_id:cashier_id, closed_date:nil
				
				if cashBalance.count > 0
					return true
				else
					return false 
				end
			
			else
				return "not member"
			end
		end
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