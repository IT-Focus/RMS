class Room::AdvanceSearch
	def advance_search search_by, search_string
		data = RoomMaster.joins(:category_master, :floor, :status)
		@result = data.select("room_masters.*, 
         category_masters.name as category_name, 
         floors.name as floor_name, 
         statuses.name as status_name")
      
      case search_by
   		when 'Room No'
   			if !search_string.nil?
   				text = '%' + search_string +'%'
   				@result = @result.where("room_masters.room_no like '#{text}'")
   			end
   		when 'Category'
   			if !search_string.nil?
   				text = '%' + search_string +'%'
   				@result = @result.where("category_masters.name like '#{text}'")
   			end
   		when 'Floor'
   			if !search_string.nil?
   				text = '%' + search_string +'%'
   				@result = @result.where("floors.name like '#{text}'")
   			end
   		when 'Status'
   			if !search_string.nil?
   				text = '%' + search_string +'%'
   				@result = @result.where("statuses.name like '#{text}'")
   			end
		end

		return @result
	end
end