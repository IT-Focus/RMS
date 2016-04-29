class CashierBalanceService::OpenCashDrawer
	def check_cash_drawer user
		cashier_id = get_cashier_id(user)
		cashBalance = CashierBalance.where cashier_id:cashier_id, closed_date:nil
		
		if cashBalance.count > 0
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


end