class CheckInService::Service
	def advance_search search_by, search_string
		data = CheckIn.joins(:status,:sys_user, :customer , check_in_detail:[:room_master, :category_price])
		case search_by
   		when 'Check In Code'
   			if !search_string.nil?
   				text = '%' + search_string +'%'
   				data = data.where("check_ins.code like '#{text}'")
   			end
   		when 'Room No'
   			if !search_string.nil?
   				text = '%' + search_string +'%'
   				data = data.where("room_masters.room_no like '#{text}'")
   			end
		end

		@data = data.select("check_ins.*,
						check_in_details.*,
                        room_masters.room_no as room_no,
                        statuses.name as status_name,
                        concat(sys_users.first_name,sys_users.last_name) as username,
                        category_prices.name as price_plan")
		return @data
	end

	def change_room_status room_master_id
		roomMaster = RoomMaster.find room_master_id
		roomMaster.update_attributes(status_id:3)
		roomMaster.save

		return true
	end

	def insert_into_auditrail user_id,room_no
		auditrail = Auditrail.new(
			module_name:'Check In',
			action:'Create',
			description:"Check In Room #{room_no}",
			created_by:user_id
		)
		auditrail.save
	end

	def check_charge_type category_price_id
		categoryPrice = CategoryPrice.find category_price_id
		is_charge_by_rate = categoryPrice.is_charge_rate
		if is_charge_rate == true
			return true
		else
			return false
		end

	end
	def check_in_by_day(check_in_id, check_in_detail_id,estimated_check_out_date,room_master_id,discount,user_id) 
		@unit_price=0
		@charge_amount=0
		@tax_rate=0
		
		@room_master = RoomMaster.find room_master_id

		if !@room_master.nil?
			# @category_master_id = @room_master.category_id
			@categoryMaster = CategoryMaster.find @room_master.category_id
			@unit_price = @categoryMaster.tariff
			@charge_amount = @categoryMaster.tariff

				if !@categoryMaster.is_include_tax = true
					systemConfig = CfgUtility.find 14
					@tax_rate = systemConfig.util_int
				end
		end
		
		
		@total_amount = @unit_price
		@discount_amount = (discount.to_f*@total_amount.to_f)/100
		@tax_amount = @tax_rate.to_f*(@total_amount.to_f-@discount_amount.to_f)/100
		@grand_total_amount=@total_amount.to_f-@discount_amount.to_f+@tax_amount.to_f

		
		# update_check_in check_in_id, @tax_amount,@discount_amount,@total_amount,@grand_total_amount

	
		@CheckInDetail = CheckInDetail.find check_in_detail_id
		@CheckInDetail.update_attributes(
			# check_out_date:estimated_check_out_date,
			unit_price:@unit_price,
			total_amount:@total_amount,
			discount:discount.to_f,
			discount_amount:@discount_amount,
			tax:@tax_rate,
			rental_type:'R',
			tax_amount:@tax_amount,
			grand_total_amount:@grand_total_amount,
			created_by:user_id,
			description:@room_master.room_no,
			# tran_type:'RE'
		)
		@CheckInDetail.save
	end
	def check_in_hour(check_in_id,check_in_detail_id,check_in_date,category_price_id,discount,user_id)
		puts "==========================category_price_id=#{category_price_id}"
		@tax_rate = 0
		@unit_price=0
		if category_price_id.to_i >0
			@categoryPrice = CategoryPrice.find category_price_id
			if !@categoryPrice.nil?
				@duration_time = @categoryPrice.duration_time
				@duration_day = @categoryPrice.duration_day
				@unit_price = @categoryPrice.charge_amount

				if !@categoryPrice.is_include_tax = true
					systemConfig = CfgUtility.find 14
					@tax_rate = systemConfig.util_int
				end
			end
		end
		
		@total_amount = @unit_price
		@discount_amount = (discount.to_f*@total_amount.to_f)/100
		@tax_amount = @tax_rate.to_f*(@total_amount.to_f-@discount_amount.to_f)/100
		@grand_total_amount=(@total_amount.to_f-@discount_amount.to_f)+@tax_amount.to_f 
		
		puts "==========================@discount_amount=#{@discount_amount.round(2)}"
		update_check_in check_in_id, @tax_amount.round(2),@discount_amount.round(2),@total_amount.round(2),@grand_total_amount.round(2)

		@CheckInDetail = CheckInDetail.find check_in_detail_id
		@room_master = RoomMaster.find @CheckInDetail.room_master_id
		@CheckInDetail.update_attributes(
			check_out_date:'',
			unit_price:@unit_price.round(2),
			total_amount:@total_amount.round(2),
			discount:discount,
			discount_amount:@discount_amount.round(2),
			tax:@tax_rate,
			tax_amount:@tax_amount.round(2),
			grand_total_amount:@grand_total_amount.round(2),
			description:@room_master.room_no,
			created_by:user_id,
			# tran_type:'RE'
		)
		@CheckInDetail.save
	end

	def add_service_items(_checkin,_checkInDetail,_UserId)
		@service = get_service_info _checkInDetail.service_id
		@check_in_id = _checkin.id
		@check_in_detail_id = _checkInDetail.id
		
			@service_name = @service.service_name
			@is_include_tax = @service.is_include_tax
			@unit_price = _checkInDetail.unit_price
			@qty = _checkInDetail.qty
			@total_amount = _checkInDetail.unit_price * @qty
			@discount = _checkin.discount
			@discount_amount = (@discount.to_f*@total_amount.to_f)/100
			@tax_rate = 0
			if @is_include_tax==true
				systemConfig = CfgUtility.find 14
				@tax_rate = systemConfig.util_int
			end
			
			@tax_amount = @tax_rate.to_f*(@total_amount.to_f-@discount_amount.to_f)/100
			@grand_total_amount=(@total_amount.to_f-@discount_amount.to_f)+@tax_amount.to_f 

		# update_check_in @check_in_id, @tax_amount,@discount_amount,@total_amount,@grand_total_amount

		@CheckInDetail = CheckInDetail.find @check_in_detail_id
		@CheckInDetail.update_attributes(
			check_out_date:'',
			unit_price:@unit_price,
			total_amount:@total_amount,
			discount:@discount,
			discount_amount:@discount_amount,
			description:@service_name,
			tax:@tax_rate,
			extra_charge:0,
			tax_amount:@tax_amount,
			grand_total_amount:@grand_total_amount,
			created_by:_UserId,
			tran_type:'SE'
		)
		@CheckInDetail.save

	end

	def get_service_info service_id

		service = RoomServiceMaster.find service_id
		
		return service

	end

	def update_check_in check_in_id, tax_amount,discount_amount,total_amount,grand_total_amount
		@check_in = CheckIn.find check_in_id
		
		@check_in.update_attributes(
		 	total_amount:total_amount,
          	discount_amount:discount_amount,
          	tax_amount:tax_amount,
          	grand_total_amount:grand_total_amount,
		)
		@check_in.save
	end

	def get_cateogry_price category_price_id
		@categoryPrice = CategoryPrice.find category_price_id
		return @CategoryPrice
	end

	def get_tax_rate
		systemConfig = CfgUtility.find 14
		@tax_rate = systemConfig.util_int
		return @tax_rate
	end

	
end