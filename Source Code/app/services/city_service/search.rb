class CityService::Search
	def search search_string
		data = City.all
   			if !search_string.nil?
   				text = '%' + search_string +'%'
   				data = data.where("cities.city like '#{text}'")
   			end
		return data
	end
end