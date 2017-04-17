class CheckInDetail < ActiveRecord::Base
	self.table_name = "check_in_details"
	belongs_to :room_master, foreign_key: "room_master_id"
	belongs_to :check_in, foreign_key: "check_in_id"
	belongs_to :category_price ,foreign_key: "categroy_price_id"
	
	def self.get_check_in_by_room_id room_id
		puts "========================="
		puts CheckIn.statuses[:check_in] 
		@data = CheckInDetail.select('check_ins.*')
		.joins(:check_in)
		.where(room_master_id: room_id )
		.where(" check_ins.status_code = '#{CheckIn.statuses[:check_in]}'" ).last
		
	end

	def self.get_check_out_detail check_in_id
		@data = self.where check_in_id:check_in_id
		return @data
		# @data.each do |d| 
		# 	if d.tran_type == "SE"
				
		# 	end
		# end

	end
	def self.get_category_id room_id
		room_master = RoomMaster.find room_id
		return room_master.category_id 
	end
	def self.update_check_in_detail check_in_id, seq_no
		puts "=======================check_in_id=#{check_in_id}"
		puts "=======================seq_no=#{seq_no}"
		@data = self.where check_in_id:check_in_id
		@check_in = CheckIn.find check_in_id
		
		@data.each do |d|
			
			if d.tran_type == "RE"
				# puts "=======================categoryPrice=#{d.categroy_price_id}"
				
				
				now = Time.now
				check_in_time = (@check_in.check_in_date.in_time_zone + (@check_in.check_in_time.hour).hour) +(@check_in.check_in_time.min).minute
				diffTime = Time.diff Time.parse(check_in_time.to_datetime.to_s) , Time.parse(now.to_datetime.to_s)
				totalTimeStay = (diffTime[:day] * 24 * 60 )+ (diffTime[:hour] * 60 )+ diffTime[:minute]
				aDay = 1440
					# if totalTimeStay > aDay
				@categoryPlan = self.check_next_plan self.get_category_id(d.room_master_id),seq_no
					# else
					# @categoryPlan = false
					# end
				puts "------ check in time : #{check_in_time}"
				if @categoryPlan == true
						@c_price = self.get_categoryPrice(self.get_category_id(d.room_master_id), seq_no)


						# ==  get total duration from catagory price
						# @c_price = d.category_price
						duration_day = (@c_price.duration_day.to_i )*24*60
						duration_hour = @c_price.duration_time.hour*60
						duration_min = @c_price.duration_time.min 		
						
						total_duration_min = duration_min + duration_hour + duration_day
						total_exd_min = @c_price.exd.hour * 60 + @c_price.exd.min 
						total_allow_late_min = (@c_price.allow_late.hour) * 60 + @c_price.allow_late.min 
						# now = Time.now
						
						# check_in_time = (@check_in.check_in_date.in_time_zone + (@check_in.check_in_time.hour).hour) +(@check_in.check_in_time.min).minute
						# diffTime = Time.diff Time.parse(check_in_time.to_datetime.to_s) , Time.parse(now.to_datetime.to_s)
						# totalTimeStay = diffTime[:day] * 24 * 60 + diffTime[:hour] * 60 + diffTime[:minute]
						@charge_amount = @c_price.charge_amount 
						
						puts "=======================totalTimeStay=#{totalTimeStay}>total_duration_min=#{total_duration_min}"
						puts "=======================total_allow_late_min=#{total_allow_late_min}"
						if totalTimeStay > total_duration_min 

							qty = totalTimeStay / total_duration_min 
							over_duration_stay = totalTimeStay % total_duration_min
							over_charge = 0 
							extra_charge = 0
							puts "=======================over_duration_stay=#{over_duration_stay}>total_allow_late_min=#{total_allow_late_min}"
							# Author: Dara

							# if over_duration_stay > total_allow_late_min
							# 	if over_duration_stay > total_exd_min
							# 		qty = qty + 1 
							# 	else 
							# 		over_charge = extra_charge
							# 		remark = "charge #{over_charge} $ for over time"
							# 	end
								
							# end

							# Author: Davuth
							puts "=======================before_update1"
							if over_duration_stay > total_allow_late_min
								@total_exd_and_allow_late_min = total_allow_late_min+total_exd_min
								puts "=======================over_duration_stay=#{over_duration_stay}>total_allow_late_min=#{@total_exd_and_allow_late_min}"
								# puts "=======================total_exd_and_allow_late_min=#{@total_exd_and_allow_late_min}"
								if over_duration_stay > @total_exd_and_allow_late_min
									# puts "=======================@categoryPlan=#{@categoryPlan}"
									if @categoryPlan == true
										# @categoryPlan.each do |c_plan|
											seq_no = seq_no + 1
											self.update_check_in_detail check_in_id, seq_no
										# end
									else
										# qty = qty + 1
										@charge_amount = @c_price.category_master.tariff
										
									end
								else
									over_charge = @c_price.extra_charge
									extra_charge = @c_price.extra_charge
									remark = "charge #{over_charge} $ for over time" 
								end


							end


							qty = 1 
							total_amount = @charge_amount +over_charge
							discount_amount = (d.discount.nil? ? 0 : d.discount) * @charge_amount  / 100 
							tax_amount = (d.tax.nil? ? 0: d.tax)  * (@charge_amount-discount_amount) / 100
							grand_total_amount = @charge_amount-discount_amount+tax_amount +over_charge
							

							if @categoryPlan == true
							puts "=======================update1"
							puts "=======================qty=#{qty}"
							puts "=======================charge_amount=#{@charge_amount}"
							puts "=======================total_amount=#{total_amount}"
							puts "=======================discount_amount=#{discount_amount}"
							puts "=======================tax_amount=#{tax_amount}"
							puts "=======================grand_total_amount=#{grand_total_amount}"
							d.update_attributes(
								qty:qty, 						
								total_amount: total_amount ,
								unit_price:@c_price.charge_amount, 
								discount_amount: discount_amount,
								extra_charge:extra_charge,
								tax_amount:tax_amount,
								categroy_price_id:@c_price.id,
								grand_total_amount:grand_total_amount
								)
							end
						else 
							qty = 1 					
							total_amount = qty * @c_price.charge_amount 
							# puts "=======================total_amount=#{total_amount}"
							# puts "=======================unit_price=#{@c_price.charge_amount }"
							discount_amount = (d.discount.nil? ? 0 : d.discount) * total_amount / 100 
							tax_amount = (d.tax.nil? ? 0: d.tax) * (total_amount-discount_amount) / 100 
							grand_total_amount = total_amount-discount_amount+tax_amount 
							
							if @categoryPlan == true
							puts "=======================update2"
							puts "=======================total_amount=#{total_amount}"
							puts "=======================discount_amount=#{discount_amount}"
							puts "=======================tax_amount=#{tax_amount}"
							puts "=======================grand_total_amount=#{grand_total_amount}"
							d.update_attributes(
								qty:qty, 						
								total_amount:total_amount, 
								discount_amount: discount_amount, 
								tax_amount:tax_amount,
								extra_charge:0,
								unit_price:@c_price.charge_amount,
								categroy_price_id:@c_price.id, 
								grand_total_amount:grand_total_amount

								)
							end
						end
				else
					puts "========================test"
					puts "=============================categroy_price_id=#{d.categroy_price_id}"
					@charge_amount = d.category_price.category_master.tariff
					puts "=======================totalTimeStay=#{totalTimeStay}>aDay=#{aDay}"
					if totalTimeStay > aDay
						qty = totalTimeStay / aDay
						total_amount = qty * @charge_amount
						discount_amount = (d.discount.nil? ? 0 : d.discount) * total_amount / 100 
						tax_amount = (d.tax.nil? ? 0: d.tax)  * (total_amount-discount_amount) / 100
						grand_total_amount = total_amount-discount_amount+tax_amount 
						
						d.update_attributes(
									qty:qty, 						
									total_amount:total_amount, 
									discount_amount: discount_amount, 
									tax_amount:tax_amount,
									extra_charge:0,
									# categroy_price_id:'',
									unit_price:@charge_amount, 
									grand_total_amount:grand_total_amount

									)
					else
						qty = 1
						total_amount = qty * @charge_amount
						discount_amount = (d.discount.nil? ? 0 : d.discount) * total_amount / 100 
						tax_amount = (d.tax.nil? ? 0: d.tax)  * (total_amount-discount_amount) / 100
						grand_total_amount = total_amount-discount_amount+tax_amount 
						
						d.update_attributes(

									qty:qty, 						
									total_amount:total_amount, 
									discount_amount: discount_amount, 
									tax_amount:tax_amount,
									extra_charge:0,
									unit_price:@charge_amount,
									# categroy_price_id:'', 
									grand_total_amount:grand_total_amount

									)
					end
				end

				
			else
				puts"+++++++++++++++++++++++++++++++++++++++++++++++++"	
			
			end
		end 
		# === re-calculate amount check in 
		CheckIn.recalculate_amount check_in_id
		
	end

	def self.check_next_plan category_master_id,seq_no
		categoryPrice = CategoryPrice.where category_id:category_master_id, is_active:true, seq_no:seq_no
		if categoryPrice.count > 0
			return true
		else
			return false
		end

	end

	def self.get_categoryPrice category_id, seq_no
		puts"===============================category_price#{category_id}"
		@c_price = CategoryPrice.find_by category_id:category_id, seq_no:seq_no, is_active:true
		return @c_price
	end

	def self.get_category_master_id room_master_id
		@RoomMaster = RoomMaster.find room_master_id
		return @RoomMaster.category_id 
	end

	def self.get_room_master_id check_in_id
		@checkInDetail = CheckInDetail.find_by check_in_id:check_in_id
		return @checkInDetail.room_master_id
	end

	def self.check_room_duration_of_plan check_in_id 
		@check_in = CheckIn.find check_in_id


		now = Time.now
		check_in_time = (@check_in.check_in_date.in_time_zone + (@check_in.check_in_time.hour).hour) +(@check_in.check_in_time.min).minute
		diffTime = Time.diff Time.parse(check_in_time.to_datetime.to_s) , Time.parse(now.to_datetime.to_s)
		totalTimeStay = (diffTime[:day] * 24 * 60 )+ (diffTime[:hour] * 60 )+ diffTime[:minute]
		@c_price = CategoryPrice.find self.get_category_price_id(check_in_id)
		
		duration_day = (@c_price.duration_day.to_i )*24*60
		duration_hour = @c_price.duration_time.hour*60
		duration_min = @c_price.duration_time.min 		
		total_duration_min = duration_min + duration_hour + duration_day
		total_allow_late_min = (@c_price.allow_late.hour) * 60 + @c_price.allow_late.min
		totalTimeStayIncludingAllowLate =  totalTimeStay + total_allow_late_min

		puts "===========================total=#{totalTimeStayIncludingAllowLate}"
		puts "===========================total_duration_min=#{total_duration_min}"

		if totalTimeStayIncludingAllowLate > total_duration_min 
			return false
		else
			return true
		end
	end
	def self.get_category_price_id check_in_id
		@data = CheckInDetail.find_by check_in_id: check_in_id
			puts "===========================categroy_price_id=#{ @data.categroy_price_id}"
		return @data.categroy_price_id
	end

	def self.change_room_status_to_late_check_in room_id
		roomMaster = RoomMaster.find room_id
		roomMaster.update_attributes(status_id:4)
		roomMaster.save
	end
	
end
