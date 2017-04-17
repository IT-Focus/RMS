class Common

	# use for generate code with prefix  and update +1 more value to table next_version 
	def getNextCode(type)
		data = (NextCode.where(module:type).limit(1))[0]
		puts data.id
		code = generateCode(data.prefix, data.cit , data.length)
		nextCode = data.cit+1
		data.update_attributes( cit:nextCode)
		return code 
	end

	# use for get code from table NextCode and check condition if this code config with
	# auto generate from system or it is manaul
	def get_code_with_config(type, code)
		data = NextCode.find_by module:type

		if data.is_manaul == true		
			# use code manaul
		else
			code = generateCode(data.prefix, data.cit , data.length)
			nextCode = (data.cit.to_i) +1
			data.update_attributes( cit:nextCode)
		end

		return code 
	end

# get last code from table next version 
	def getCode(type)
		data = (NextCode.where(module:type).limit(1))[0]
		puts data.id
		code = generateCode(data.prefix, data.cit , data.length)
		return code 
	end

	# return json data to extjs 
	def extjs_ok(data)		

		return :json => {:data => data , :success => 'true'}
		
	end

	def returnPaginate (modelClass,page,limit)

		@data = modelClass.paginate(:page => page, :per_page => limit)
		@total = modelClass.count	  
       	return  :json => { :data =>  @data , :success => 'true' , :total => @total }      
		
	end

	def returnJoinPaginate (modelClass, joinData,page,limit)

		@data = joinData.paginate(:page => page, :per_page => limit)
		@total = joinData.count	  
       	return  :json => { :data =>  @data , :success => 'true' , :total => @total }      
		
	end
	
	def return_success(data)
		
        return :json => { :data =>  data , :success => 'true' , :total => 1}     	
		
	end

	def return_fail(message)
		return  :json=>{success:false, message:message}
	end

	private 
  	def generateCode(prefix,nextCode,length)
		
		if prefix.nil?
			prefix=""
		end
		# l_code=prefix.length
		l_num=nextCode.to_s.length
		

		zero=''
		while l_num < length  do
		   zero+='0'
		   length-=1
		end

		return prefix+zero+(nextCode.to_s)
	end
end