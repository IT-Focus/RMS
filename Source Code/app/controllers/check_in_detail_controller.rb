class CheckInDetailController < ApplicationController
	@@service = CheckInDetailService::Service.new()
	def index
		@data = []
		check_in_id = params[:check_in_id]

		if !check_in_id.nil?
			@data = @@service.get_room_info check_in_id
		end
		render json:{data:@data, success:true}
	end

	def combo
		@data = @@service.get_busy_room
		render json:{data:@data, success:true}
	end

	def combo_available_room
		
	end
	
	def get_checkin_detail
		room_no = params[:room_id]
		@data = @@service.get_checkin_details room_no
		puts "======================test=#{@data}"
		@data.each do |f|
			@check_in_code = f.check_in_code
			@check_in_date = f.check_in_date.to_date
		end
		render json:{checkinDetail:@data,check_in_code:@check_in_code,check_in_date:@check_in_date, success:true}
		# render json:{data:@data,success:true}
	end

	def update
		puts"=====================testtestes"
	end
end
