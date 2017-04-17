class CheckInDetailService::Service

	def get_room
		@data = CheckInDetail.joins("left join room_masters on 
			room_masters.id = check_in_details.room_no")
		.where.not(room_no:nil).where("room_masters.status_id=#{2}")
		@result =  @data.select("room_masters.id as id,room_masters.room_no as room_no")
		return @result
	end
	def get_busy_room
		@data = RoomMaster.where(" status_id = 3")
		return @data
	end
	def get_checkin_details room_no
		@checkInDetail = CheckInDetail.joins("left join check_ins on check_ins.id = check_in_details.check_in_id").where room_master_id:room_no,check_out_date:nil
		@result = @checkInDetail.select("check_in_details.*, check_ins.code as check_in_code, check_ins.*")
		return @result
	end

	def get_room_info _check_in_id
		sql = "SELECT 
	    cid.*, 
	    cp.name as category_price_name , 
	    rm.room_no,
	    rsm.service_name as service_name
		FROM
		    rms.check_in_details cid
		LEFT JOIN category_prices as cp ON cp.id = cid.categroy_price_id
		LEFT JOIN room_service_masters rsm on rsm.id = cid.service_id 
		INNER JOIN room_masters rm on rm.id = cid.room_master_id
		where check_in_id=#{_check_in_id}";

		@data = CheckInDetail.find_by_sql(sql);
		return @data
	
	end

end