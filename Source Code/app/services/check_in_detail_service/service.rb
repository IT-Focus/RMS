class CheckInDetailService::Service

	def get_room
		@data = CheckInDetail.joins("left join room_masters on 
			room_masters.id = check_in_details.room_no")
		.where.not(room_no:nil).where("room_masters.status_id=#{2}")
		@result =  @data.select("room_masters.id as id,room_masters.room_no as room_no")
		return @result
	end
	def get_available_room
		@data = RoomMaster.where(" status_id = 3")
		return @data
	end
	def get_checkin_details room_no
		@checkInDetail = CheckInDetail.joins("left join check_ins on check_ins.id = check_in_details.check_in_id").where room_master_id:room_no
		@result = @checkInDetail.select("check_in_details.*, check_ins.code as check_in_code")
		return @result
	end

end