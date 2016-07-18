class CheckInService::Service
	def change_room_status room_master_id
		roomMaster = RoomMaster.find room_master_id
		roomMaster.update_attributes(status_id:3)
		roomMaster.save

		return true
	end

	def insert_into_auditrail user_id
		auditrail = Auditrail.new(
			module_name:'Check In',
			action:'Create Check In',
			description:'Room Check In',
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
	def check_in_by_day(check_in_detail_id,estimated_check_out_date,category_price_id,discount,user_id) 
		@categoryPrice = CategoryPrice.find category_price_id
		@charge_amount = @categoryPrice.charge_amount
		systemConfig = CfgUtility.find 14
		@tax_rate = systemConfig.util_int
		@unit_price = @categoryPrice.charge_amount
		@total_amount = @unit_price
		@discount_amount = (discount.to_f*@total_amount.to_f)/100
		@tax_amount = @tax_rate.to_f*(@total_amount.to_f-discount_amount.to_f)/100
		@grand_total_amount=@total_amount.to_f-@discount_amount.to_f+@tax_amount.to_f

		@CheckInDetail = CheckInDetail.find check_in_detail_id
		@CheckInDetail.update_attributes(
			check_out_date:check_in_date,
			unit_price:@unit_price,
			total_amount:@total_amount,
			discount:discount,
			discount_amount:@discount_amount,
			tax:@tax_rate,
			tax_amount:@tax_amount,
			grand_total_amount:@grand_total_amount,
			created_by:@user_id,
			tran_type:'RE'
		)
		@CheckInDetail.save
	end
	def check_in_hour(check_in_detail_id,check_in_date,category_price_id,discount,user_id)
		
		systemConfig = CfgUtility.find 14
		@tax_rate = systemConfig.util_int
		
		@categoryPrice = CategoryPrice.find category_price_id
		@duration_time = @categoryPrice.duration_time
		@duration_day = @categoryPrice.duration_day
		@unit_price = @categoryPrice.charge_amount
		@total_amount = @unit_price
		@discount_amount = (discount.to_f*@total_amount.to_f)/100
		@tax_amount = @tax_rate.to_f*(@total_amount.to_f-@discount_amount.to_f)/100
		@grand_total_amount=(@total_amount.to_f-@discount_amount.to_f)+@tax_amount.to_f 
		
		@CheckInDetail = CheckInDetail.find check_in_detail_id
		@CheckInDetail.update_attributes(
			check_out_date:'',
			unit_price:@unit_price,
			total_amount:@total_amount,
			discount:discount,
			discount_amount:@discount_amount,
			tax:@tax_rate,
			tax_amount:@tax_amount,
			grand_total_amount:@grand_total_amount,
			created_by:user_id,
			tran_type:'RE'
		)
		@CheckInDetail.save
	end

	def get_cateogry_price category_price_id
		@categoryPrice = CategoryPrice.find category_price_id
		return @CategoryPrice
	end

	
end