class CategoryMasters::AdvanceSearch
	def advance_search search_by, search_string
		data = CategoryMaster.all
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