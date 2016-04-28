class RoomService::AdvanceSearch
	def advance_search search_by, search_string
		data = RoomServiceMaster.all
		case search_by
   		when 'Service Name'
   			if !search_string.nil?
   				text = '%' + search_string +'%'
   				data = data.where("room_service_masters.service_name like '#{text}'")
   			end
   		when 'Code'
   			if !search_string.nil?
   				text = '%' + search_string +'%'
   				data = data.where("room_service_masters.code like '#{text}'")
   			end
   		when 'Abbr'
   			if !search_string.nil?
   				text = '%' + search_string +'%'
   				data = data.where("room_service_masters.abbr like '#{text}'")
   			end
		end
		return data
	end
end