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

  def get_cashier_active search_string
    data = Cashier.joins(:sys_user, :workshift)
      @result = data.select("cashiers.*, concat(sys_users.first_name,sys_users.last_name) as username, workshifts.name as workshift_name")
        if !search_string.nil?
          text = '%' + search_string +'%'
          @result = @result.where("concat(sys_users.first_name,sys_users.last_name) 
            like '#{text}' or workshifts.name like '#{text}' 
            and cashiers.is_active = true")
        end
    return @result
  end
	def get_cashier user
		data = Cashier.joins(:sys_user, :workshift).where user_id:user
    	@result = data.select("cashiers.*, concat(sys_users.first_name,sys_users.last_name) as username, workshifts.name as workshift_name")
		return @result
	end

	def check_dupplicate(_user_id, _workshift_id)
      @result = false
      data = Cashier.where(user_id:_user_id, workshift_id:_workshift_id, is_active:true)
      if data.count > 0
        @result = true
      else
        @result = false
      end
    end

    def check_duplicate_update(id, user_id, workshift_id)
      @result = false
         data = Cashier.where(user_id:user_id, workshift_id:workshift_id, is_active:true).where.not(id:id)
      if data.count > 0 
        @result = true
      else
        @result = false
      end
    end

    def get_cashier_open_balance cashier_id
        cashier = Cashier.find_by id:cashier_id, is_active:true
            if cashier.nil? 
              open_amount = 0
            else 
              open_amount = cashier.obda
            end
    end

	# def get_current_cashier_detail
		
	# end
end

