class CheckOutsController < ApplicationController
	@@common = Common.new
	def index
		room_id = params[:room_id]
		customer_payment_id = params[:id]
		puts"=============room_id=#{room_id}"
		@check_in_before_update = CheckInDetail.get_check_in_by_room_id room_id
		CheckInDetail.update_check_in_detail @check_in_before_update.id, 1

		@check_in = CheckInDetail.get_check_in_by_room_id room_id
		@check_in.estimated_check_out_date = Date.today 
		@check_in.estimated_check_out_time =Time.now

		@check_in_detail = CheckInDetail.get_check_out_detail @check_in.id
		render json:{ check_in:@check_in ,detail:@check_in_detail, success:true}
	end

	def paid_booking
		begin	

			# =========----- check on user if exist open balance 
			@cashier_opening_balance = check_exist_open_balance
			if @cashier_opening_balance != true 
				render json:{ success:false , message:@cashier_opening_balance}
				return false
			end


			@@auditrilService = ServiceAuditrail::TrackAuditrail.new()
			check_id = params[:id]
			amount = params[:total_paid]
			remark = params[:remark]

			checkInDetail =  CheckInDetail.where check_in_id:check_id
			grand_total_amount = checkInDetail.sum(:grand_total_amount)
		
			@customer_payment = CustomerPayment.new 
			@customer_payment.cashier_id =  Cashier.get_cashier_id_by_user session[:user_id]
			@customer_payment.transaction_date = Date.today
			@customer_payment.receipt_no = @@common.get_code_with_config("RECEIPT", '') 
			@customer_payment.base_currency_amount = amount 
			@customer_payment.change_rate = 1 
			@customer_payment.total_amount =  grand_total_amount 
			@customer_payment.payment_method =1 
			@customer_payment.status_code = 30 
			@customer_payment.created_by= session[:user_id]
			@customer_payment.remark = remark
			if @customer_payment.save 
				@payment_detail = CustomerPaymentDetail.new 
				@payment_detail.customer_payment_id  = @customer_payment.id  
				@payment_detail.check_in_id  = check_id 
				@payment_detail.amount = amount

				# ============ udpate paid booking
				@check_in = CheckIn.find check_id
				total_paid_booking = @check_in.paid_booking.to_f + amount.to_f 
				@check_in.update_attributes(paid_booking:total_paid_booking )

				if @payment_detail.save  
					render json:{ success:true , message:"Paid success" , customer_payment:@customer_payment, check_in:@check_in}
				else 
					render json:{ success:false , message:@customer_payment.error_message}
				end 
			else 
				render json:{ success:false , message:@customer_payment.error_message}
			end 


		rescue Exception => e
			render json:{ success:false , message:e.message}
		end
	end


	def create
		@@auditrilService = ServiceAuditrail::TrackAuditrail.new()
		check_id = params[:id]
		amount = params[:total_paid]
		remark = params[:remark]

		checkInDetail =  CheckInDetail.where check_in_id:check_id
		grand_total_amount = checkInDetail.sum(:grand_total_amount)
		

		# @customer_payment = CustomerPayment.new 
		# @customer_payment.cashier_id =  Cashier.get_cashier_id_by_user session[:user_id]
		# @customer_payment.transaction_date = Date.today
		# @customer_payment.receipt_no = @@common.get_code_with_config("RECEIPT", '') 
		# @customer_payment.base_currency_amount = amount 
		# @customer_payment.change_rate = 1 
		# @customer_payment.total_amount =  grand_total_amount 
		# @customer_payment.payment_method =1 
		# @customer_payment.status_code = 30 
		# @customer_payment.created_by= session[:user_id]
		# @customer_payment.remark = remark
		# if @customer_payment.save
		# 	@payment_detail = CustomerPaymentDetail.new 
		# 	@payment_detail.customer_payment_id  = @customer_payment.id  
		# 	@payment_detail.check_in_id  = check_id 
		# 	@payment_detail.amount = amount 
		# 	@payment_detail.save 

			# === update room  
			@check_in_detail = CheckInDetail.where check_in_id: check_id
			@check_in_detail.each do |d|
				# Update check out date
				d.update_attributes(check_out_date:Date.today,tran_type:"RE") 
				
				@room = RoomMaster.find d.room_master_id
				@room.update_attributes(status_id:1)
				# === insert room transction 
				@room_transaction = RoomTransaction.new 
				@room_transaction.room_master_id = d.room_master_id
				# @room_transaction.reference_no =@customer_payment.receipt_no 
				@room_transaction.transaction_date = Date.today
				@room_transaction.status_code = RoomTransaction.statuses[:check_out]
				@room_transaction.user_id = session[:user_id]
				@room_transaction.save

				# === insert auditrail 
				@@auditrilService.track_action("Check Out",'Create',"Check Out Room #{@room.room_no}", session[:user_id])
			end 
			
			# === update check in status 
			@check_in = CheckIn.find check_id 
			@check_in.update_attributes( status_code:CheckIn.statuses[:check_out])

			@customer_payment_id = (CustomerPaymentDetail.find_by check_in_id:check_id).customer_payment.id



			render json:{ success:true , message:' Check out success', data:@check_in,customer_payment_id:@customer_payment_id}
		# else
		# 	render json:{ success:false , message:@customer_payment.error_message}
		# end

	end
	def print
		@customer_payment = CustomerPayment.find params[:id]
		@check_in = (@customer_payment.customer_payment_detail.last).check_in
		@check_in_detail = CheckInDetail.get_check_out_detail @check_in.id
		@cashier = Cashier.find_by user_id:session[:user_id]
		render 'print'
	end

	# def checkCashierTransaction
	# 	puts "===================================" 
		
	# end

	def show
		@user_id =  session[:user_id]
		@checkCashierTransaction = CashierBalance.check_cashier_transaction @user_id
		if @checkCashierTransaction == true
			render json:{success:true}
		elsif @checkCashierTransaction == 'not_cashier'
			render json:{success:false, message:"Only Cashiers are privilege to do check out process."}
		else
			render json:{success:false, message:"Please Open Cash Drawer"}
		end
	end

	private 
	def check_exist_open_balance
		@user_id =  session[:user_id]
		@checkCashierTransaction = CashierBalance.check_cashier_transaction @user_id
		if @checkCashierTransaction == true
			return true
		elsif @checkCashierTransaction == 'not_cashier'
			return "Only Cashiers are privilege to do check out process."
		else
			return "Please Open Cash Drawer"
		end
	end
end
