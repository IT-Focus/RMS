class CancelCheckinService::Service
	def get_index search_by, search_string
		@data = CancelCheckIn.joins(:sys_user,:room_master).where.not(cancelled_by:nil)
		case search_by
   		when 'Check In Code'
   			if !search_string.nil?
   				text = '%' + search_string +'%'
   				@data = @data.where("cancel_check_ins.check_in_code like '#{text}'")
   			end
   		when 'Room No'
   			if !search_string.nil?
   				text = '%' + search_string +'%'
   				@data = @data.where("cancel_check_ins.room_no like '#{text}'")
   			end
		end
		@result = @data.select("cancel_check_ins.*,room_masters.room_no as room_no, concat(sys_users.first_name,sys_users.last_name) as username")
		return @result
	end

	def process_cancel_checkin permit_data,user
		cancelCheckin = record_cancel_checkin_detail permit_data,user
	    @room_id = cancelCheckin

		if @room_id.to_i>0
			updateStatus = update_room_status @room_id
			if updateStatus == true
				@@commonService = CommonService::Service.new()
                @insert_to_room_transaction = @@commonService.record_check_in_to_room_transaction(@room_id, user, 13)
				if @insert_to_room_transaction == true
					recordAuditrail user
				end
			end
		else
		
		end
	end
	
	def record_cancel_checkin_detail permit_data,user
		@data = CancelCheckIn.new(permit_data)
        @data.cancelled_by = user
        @data.cancel_date = Time.now.to_date
        @data.save
        @check_in_code = @data.check_in_code
        update_check_in_status @check_in_code
	    puts "==================@check_in_code=#{@check_in_code}"
        return @data.room_no
	end
	
	def update_check_in_status check_in_code
		@check_in = CheckIn.find_by code:check_in_code
		if !@check_in.nil?
			@check_in.update_attributes(status_code:13)
			@check_in.save
		end
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