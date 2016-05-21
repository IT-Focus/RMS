class DiscountConfig::ServiceIndex
	def get_index(search_string)
		data = DiscountConfig.where is_delete:false
   			if !search_string.nil?
   				text = '%' + search_string +'%'
   				data = data.where("discount_config.code like '#{text}'")
   			end
		return data
	end
end