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

	def record_check_in_to_room_transaction room_master_id, user_id, status_code
		roomTransaction = RoomTransaction.new(
			room_master_id:room_master_id,
			reference_no:1,
			transaction_date:Time.now,
			status_code:status_code,
			user_id:user_id,
		)
		roomTransaction.save
		return true
	end
end