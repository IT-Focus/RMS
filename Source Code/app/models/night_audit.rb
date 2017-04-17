class NightAudit < ActiveRecord::Base

	def self.check_exist_night_audit _date
		_data= self.where(date:_date).first
		if _data.nil?
			puts "======== return false "
			return false 
		else 
			puts "======== return true #{_data} "

			return true 
		end
	end
	def self.update_night _date
		_data = CheckIn.where( status_code:CheckIn.statuses[:check_in] , rental_type:'rate').where("estimated_check_out_date < '#{_date}'")
		_data.each do |d|

			_now = Time.now
			_dif_day = ( _now.to_date - d.estimated_check_out_date.to_date ).to_i
			puts "========_dif_daye=#{_dif_day} "
			d.update_attributes(estimated_check_out_date: _now )
			
			if _dif_day == 0 
				_dif_day =1 
			end

			d.check_in_detail.each do |detail|
				_qty =  detail.qty 

				if _dif_day > 0 
					_qty = _qty + _dif_day
					_total_amount =detail.unit_price * _qty
					_discount_amount = (detail.discount/100) *_total_amount
					_tax_amount = (detail.tax/100) *(_total_amount - _discount_amount )
					_grand_total_amount = _total_amount - _discount_amount + _tax_amount

					detail.update_attributes( 
						qty:_qty , 
						total_amount: _total_amount, 
						discount_amount: _discount_amount ,
						tax_amount: _tax_amount,
						grand_total_amount:_grand_total_amount
					)
				end

				CheckIn.recalculate_amount d.id
			end
		end

		
	end
end
