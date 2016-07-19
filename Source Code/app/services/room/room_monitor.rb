class Room::RoomMonitor
	def get_room_monitor(floor,status)
		data = RoomMaster.joins(get_sql())
      	.select("room_masters.* 
      		,DATE_FORMAT(ci.check_in_date, '%d-%b-%Y %h:%i %p') check_in_date 
      		,floors.name as floor_name 
      		, cm.name as category_name
      		,st.status_type as status_name
      		,chi.customer_name as customer_name
      		,DATE_FORMAT(chi.estimated_check_out_date, '%d-%b-%Y %h:%i %p' ) as estimated_check_out
      		,chi.address as address
          ,cp.name as category_price

      		")
      	.joins(:floor)
      if !status.nil? && !status.empty?
        data = data.where("room_masters.status_id=#{status}")
      elsif floor != "ALL"
        data = data.where floor_id:floor
      end
      
      return data
	end

	def get_sql
		query="left join check_in_details ci on ci.room_no = room_masters.room_no and ci.tran_type ='SE' 
				    LEFT JOIN
      				category_masters cm ON room_masters.category_id = cm.id
      			LEFT JOIN 
              category_prices cp ON ci.categroy_price_id = cp.id 
            LEFT JOIN
    				check_ins chi ON chi.room_master_id = room_masters.id
      			LEFT JOIN
					statuses st on st.id = room_masters.status_id  "
	return query	
	end
end