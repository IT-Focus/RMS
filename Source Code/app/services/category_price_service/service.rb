class CategoryPriceService::Service
	def advance_search search_by, search_string,category_id
      data = CategoryPrice.joins(:category_master).where category_id:category_id
		data = data.select("category_prices.*, category_masters.name as category_name")
      case search_by
   		when 'Name'
   			if !search_string.nil?
   				text = '%' + search_string +'%'
   				data = data.where("category_masters.name like '#{text}'")
   			end
   		when 'Code'
   			if !search_string.nil?
   				text = '%' + search_string +'%'
   				data = data.where("category_masters.code like '#{text}'")
   			end
		end
		return data
	end

end