class CurrenciesController < ApplicationController
def index
    @@service = CurrencyService::Search.new()
    search_string = params[:searchString]

    @Search = @@service.search search_string
    render json:{data:@Search, success:true}
end

def create

        begin
            Currency.transaction do
                @data = Currency.new(permit_data)
                # SysAuditrail.create  description:"Create Currency= #{@data.name}", user_id:session[:user_id]
                @data.save

                render json:{ data:@data ,success:true}
            end

        rescue Exception => e

            render json:{ message:e.message ,success:false}
        end

end

def update
           begin
            Currency.transaction do
                @data = Currency.find(params[:id])

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
            :currency_name,
           	:currencysyb,
           	:rate,
           	:exchange_rate,
           	:seq_num,
        )
    end
     def permit_data_edit
        params.require(:data).permit(
           
           	:id,
           	:currency_name,
           	:currencysyb,
           	:rate,
           	:exchange_rate,
           	:seq_num,
        )
    end
end
