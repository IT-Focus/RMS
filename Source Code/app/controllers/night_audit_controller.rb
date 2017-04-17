class NightAuditController < ApplicationController
	def index

		render json:{ data:[] , success:true}			
	end
	def create
		begin			
			@data = NightAudit.new(permit_data) 			
			@data.created_by = session[:user_id]

			if NightAudit.check_exist_night_audit(@data.date) == true 
				render json:{ success:false , message: "Today you are already run night audit "}
				return false 
			end

			NightAudit.update_night @data.date

			@data.save
			render json:{ data:@data , success:true }
			
		rescue Exception => e
			render json:{ success:false , message: e.message}
		end
		
	end

	private
    def permit_data
        params.require(:data).permit(
            :id,
            :date,
            :comment
        )
    end
	
end
