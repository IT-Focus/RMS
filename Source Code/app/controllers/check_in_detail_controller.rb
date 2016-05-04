class CheckInDetailController < ApplicationController
	@@service = CheckInDetailService::Service.new()
	def index
	end

	def combo
		@data = @@service.get_room
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
