class CheckInService::Service
	def change_room_status room_master_id
		roomMaster = RoomMaster.find room_master_id
		roomMaster.update_attributes(status_id:3)
		roomMaster.save

		return true
	end

	def insert_into_auditrail user_id
		auditrail = Auditrail.new(
			module_name:'Check In',
			action:'Create Check In',
			description:'Room Check In',
			created_by:user_id
		)
		auditrail.save
	end

	def check_charge_type category_price_id
		categoryPrice = CategoryPrice.find category_price_id
		is_charge_by_rate = categoryPrice.is_charge_rate
		if is_charge_rate == true
			return true
		else
			return false
		end

	end

	def check_in_by_day data
		commonService = commonService::Service.new()
		$total_amount = data.total_amount
		$tax_rate = 
	end

	def check_in_hour data
	end

	
end