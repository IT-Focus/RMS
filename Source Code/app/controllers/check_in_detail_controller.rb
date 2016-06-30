class CheckInDetailController < ApplicationController
	@@service = CheckInDetailService::Service.new()
	def index
		@data = []
		check_in_id = params[:check_in_id]

		if check_in_id.nil?
			@data = CheckInDetail.where check_in_id:check_in_id
		end
		render json:{data:@data, success:true}
	end

	def combo
		@data = @@service.get_available_room
		render json:{data:@data, success:true}
	end
	def get_checkin_detail
		room_no = params[:room_id]
		@data = @@service.get_checkin_details room_no
		@data.each do |f|
			render json:{check_in_code:f.check_in_code,check_in_date:f.check_in_date.to_date, success:true}
		end
	end
end
