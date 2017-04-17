class AuditrailController < ApplicationController
	def index
		@@service = ReportsService::ReportsService.new()

		from_date = params[:from_date]
		to_date = params[:to_date]
		user = params[:user_id]

		@auditrailReport = @@service.auditrail_report(from_date, to_date, user)
		render json:{data:@auditrailReport, success:true}
	end
end
