class CancelCheckInController < ApplicationController
    @@service = CancelCheckinService::Service.new()
    def index
        search_by = params[:searchBy]
        search_string = params[:searchString]

        @data = @@service.get_index search_by, search_string
 
        render json:{ data:@data , success:true}
    end
    
    def create

        begin
            CancelCheckIn.transaction do
                user = session[:user_id]
                @@CancelProcess = @@service.process_cancel_checkin permit_data,user
                render json:{ data:@CancelProcess ,success:true}
            end

        rescue Exception => e

            render json:{ message:e.message ,success:false}
        end


    end

    private
    def permit_data
        params.require(:data).permit(
            :code,
            :check_in_code,
            :check_in_date,
            :room_no,
            :cancel_date,
            :reason,
            :cancelled_by,
        )
    end
    
end
