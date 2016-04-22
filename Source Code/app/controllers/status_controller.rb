class StatusController < ApplicationController
	def index

	end
	
	def get_status
		@data = Status.all
		render json:{data:@data, success:true}
	end
end
