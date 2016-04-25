class WorkshiftService::Search
	def search search_string
		data = Workshift.all
   			if !search_string.nil?
   				text = '%' + search_string +'%'
   				data = data.where("workshifts.name like '#{text}'")
   			end
		return data
	end
end