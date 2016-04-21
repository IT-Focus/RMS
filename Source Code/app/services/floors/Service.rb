class Floors::Service
	def advance_search search_by, search_string
		data = Floor.all
		case search_by
   		when 'Name'
   			if !search_string.nil?
   				text = '%' + search_string +'%'
   				data = data.where("floors.name like '#{text}'")
   			end
   		when 'Code'
   			if !search_string.nil?
   				text = '%' + search_string +'%'
   				data = data.where("floors.code like '#{text}'")
   			end
		end
		return data
	end
end