class CashiersController < ApplicationController
def index
    @@service = CashierService::Search.new()
    search_string = params[:searchString]

    @Search = @@service.search search_string
    render json:{data:@Search, success:true}
end

def create

        begin
            Cashier.transaction do
                @data = Cashier.new(permit_data)
                # SysAuditrail.create  description:"Create Cashier= #{@data.name}", user_id:session[:user_id]
                @data.save

                render json:{ data:@data ,success:true}
            end

        rescue Exception => e

            render json:{ message:e.message ,success:false}
        end

end

def update
           begin
            Cashier.transaction do
                @data = Cashier.find(params[:id])

        		@data.update_attributes(permit_data_edit)

        		render json:{ data:@data ,success:true}
            end

        rescue Exception => e

            render json:{ message:e.message ,success:false}
        end

end

private
    def permit_data
        params.require(:data).permit(
           	:user_id,
           	:workshift_id,
           	:start_time,
           	:obda,
           	:is_active,
        )
    end
     def permit_data_edit
        params.require(:data).permit(      
           	:id,
           	:user_id,
           	:workshift_id,
           	:start_time,
           	:obda,
           	:is_active,
        )
    end
end
