class CheckIn < ActiveRecord::Base
	self.table_name = "check_ins"
	has_many :check_in_detail,  foreign_key: "check_in_id"
	belongs_to :customer , foreign_key:"customers_id"
	belongs_to :sys_user , foreign_key:"created_by"
	belongs_to :status	, foreign_key:"status_code" , primary_key:"code"
	accepts_nested_attributes_for :check_in_detail, :allow_destroy => true

	enum status:{ 
		check_in: 11 , 
		check_out:12 , 
		cancel:13 
	}

	def self.recalculate_amount check_in_id 
		@check_in = self.find check_in_id
		@detail = @check_in.check_in_detail
		total_amount = @detail.sum :total_amount
		discount_amount= @detail.sum :discount_amount
		tax_amount = @detail.sum :tax_amount
		grand_total_amount= @detail.sum :grand_total_amount
		@check_in.update_attributes(
			tax_amount:tax_amount , 
			discount_amount: discount_amount , 
			total_amount:total_amount,
			grand_total_amount: grand_total_amount - (@check_in.paid_booking.nil? ? 0 : @check_in.paid_booking)
		)		
		
	end

	def self.get_sale_by_cashier cashier_balance , user_id


		start_date = cashier_balance.opened_date.to_datetime
		@customer_payment = CustomerPaymentDetail.joins(:check_in , :customer_payment)
		.where("customer_payments.created_by = #{user_id} and customer_payments.created_at >= '#{start_date}'")
	
		# @customer_payment = @customer_payment.where(:created_at => start_date)
		

	end

	def self.get_total_check_out cashier_balance , user_id
		start_date = cashier_balance.opened_date.to_datetime
		@check_out = CheckIn.where("check_ins.created_by = #{user_id} and check_ins.created_at >= '#{start_date}'and check_ins.status_code=12")
		return @check_out
	end

	def self.get_total_cancel cashier_balance, user_id
		start_date = cashier_balance.opened_date.to_datetime
		@cancel = CheckIn.where("check_ins.created_by = #{user_id} and check_ins.created_at >= '#{start_date}'and check_ins.status_code=13")
		return @cancel
	end

	def self.get_total_check_in_per_cashier cashier_balance,user_id
		start_date = cashier_balance.opened_date.to_datetime
		@check_in = CheckIn.where("check_ins.created_by = #{user_id} and check_ins.created_at >= '#{start_date}'")
		return @check_in
	end
	
end
