class WorkshiftService::Search
	def search search_string
		data = Workshift.all
   			if !search_string.nil?
   				text = '%' + search_string +'%'
   				data = data.where("workshifts.name like '#{text}'")
   			end
		return data
	end

	def is_have_record _workshift_name, _abbr
          @result = true
          data = Workshift.where name:_workshift_name, abbr:_abbr
          if data.count() > 0
            @result = true
          else
            @result = false
          end
    end

end