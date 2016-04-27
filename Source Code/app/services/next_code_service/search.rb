class NextCodeService::Search
	def search search_string
		data = NextCode.all
   			if !search_string.nil?
   				text = '%' + search_string +'%'
   				data = data.where("next_codes.module like '#{text}'")
   			end
		return data
	end
end