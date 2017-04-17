class Room::RoomMonitor
	def get_room_monitor(floor,status)
		data = RoomMaster.joins(get_sql())
      	.select("room_masters.* 
      		,DATE_FORMAT(chi.check_in_date, '%d-%b-%Y') as check_in_date
          ,TIME_FORMAT(chi.check_in_time, '%h:%i %p') as check_in_time
      		,floors.name as floor_name 
      		,cm.name as category_name
          ,cm.is_include_tax 
          ,cm.tariff 
      		,st.name as status_name
      		,ctm.customer_name as customer_name
      		,DATE_FORMAT(chi.estimated_check_out_date, '%d-%b-%Y') as estimated_check_out
      		,TIME_FORMAT(chi.estimated_check_out_time, '%h:%i %p') as estimated_check_out_time
          ,ctm.address as address
          ,cp.name as category_price
          ,chi.status_code as status_code
          ,chi.check_in_id
    
      

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
		query="
          LEFT join 
         (SELECT 
            cid.room_master_id , 
            cid.categroy_price_id,
            ci.id check_in_id , 
            ci.check_in_date , 
            ci.check_in_time, 
            ci.customers_id , 
            ci.estimated_check_out_date, 
            ci.estimated_check_out_time,             
            ci.status_code,
            ci.rental_type
            

             from 
            check_ins ci  
            inner join check_in_details cid on cid.check_in_id = ci.id and  ci.status_code = 11 and cid.service_id is null
            
            ) chi on chi.room_master_id = room_masters.id 
            left join 
             customers ctm on ctm.id = chi.customers_id

            LEFT JOIN
              category_masters cm ON room_masters.category_id = cm.id
            LEFT JOIN 
              category_prices cp ON chi.categroy_price_id = cp.id 
      			LEFT JOIN
					statuses st on st.id = room_masters.status_id  "
	return query	
	end

  def checkPeopleAllowance(_room_master_id)
        room_master = RoomMaster.find _room_master_id
        category_master = room_master.category_master
        return category_master
  end


end