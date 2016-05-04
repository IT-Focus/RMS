class CancelCheckinService::Service
	def get_index
		@data = CancelCheckIn.joins(:sys_user,:room_master).where.not(cancelled_by:nil)
		@result =  @data.select("cancel_check_ins.*,room_masters.room_no as room_no, concat(sys_users.first_name,sys_users.last_name) as username")
		return @result
	end

	def process_cancel_checkin permit_data,user
		cancelCheckin = record_cancel_checkin_detail permit_data,user
		if cancelCheckin.to_i>0
			updateStatus = update_room_status cancelCheckin
			if updateStatus == true
				recordAuditrail user
			end
		else
		
		end
	end
	def record_cancel_checkin_detail permit_data,user
		@data = CancelCheckIn.new(permit_data)
        @data.cancelled_by = user
        @data.cancel_date = Time.now.to_date
        @data.save
        return @data.room_no
	end
	def update_room_status room_no
		@roomMaster = RoomMaster.find room_no
		if !@roomMaster.nil?
			@roomMaster.update_attributes(status_id:1)
			@roomMaster.save
			return true	
		else
			return false
		end 
	end

	def recordAuditrail user
		@auditrail = Auditrail.new(
			module_name:"Cancel Check In",
			action:"Cancel",
			description:"Cancel check in and update room status",
			created_by:user
			)
		@auditrail.save
	end


	
end