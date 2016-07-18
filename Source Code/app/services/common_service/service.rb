class CommonService::Service
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

	def get_tax_rate
		systemConfig = CfgUtility.find 14
		tax_rate = systemConfig.util_int
		return tax_rate
	end
end