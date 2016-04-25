class CurrencyService::Search
	def search search_string
		data = Currency.all
   			if !search_string.nil?
   				text = '%' + search_string +'%'
   				data = data.where("currencies.currency_name like '#{text}'")
   			end
		return data
	end
end