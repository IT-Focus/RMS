class ReportsController < ApplicationController
	layout false
	def auditTrail_Report
		@@service = ReportsService::ReportsService.new()
		@@commonService = CommonService::Service.new()

		@from_date = params[:from_date]
		@to_date = params[:to_date]
		@user = params[:user_id]
		
		if !@user.nil?
			@username = 'ALL'
		else
			@username = @@commonService.get_user_name @user
		end
		@auditrailReport = @@service.auditrail_report(@from_date, @to_date, @user)
	end
end
