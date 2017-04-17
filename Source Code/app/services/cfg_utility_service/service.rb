class CfgUtilityService::Service
	def get_maximum_user
		data = [] 
		data = CfgUtility.where id:5
		data[0].util_int	
	end

	def get_maximum_member
		data = [] 
		data = CfgUtility.where id:3
		data[0].util_int
	end

	def get_maximum_outlet
		data = [] 
		data = CfgUtility.where id:6
		data[0].util_int	
	end

	def get_maximum_room
		data = [] 
		data = CfgUtility.where id:18
		data[0].util_int	
	end		

end
