class CitiesController < ApplicationController
def index
    @@service = CityService::Search.new()
    search_string = params[:searchString]

    @Search = @@service.search search_string
    render json:{data:@Search, success:true}
end

def create

        begin
            City.transaction do
                @data = City.new(permit_data)
                # SysAuditrail.create  description:"Create City= #{@data.name}", user_id:session[:user_id]
                @data.save

                render json:{ data:@data ,success:true}
            end

        rescue Exception => e

            render json:{ message:e.message ,success:false}
        end

end

def update
           begin
            City.transaction do
                @data = City.find(params[:id])

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
            :city
        )
    end
     def permit_data_edit
        params.require(:data).permit(
            :id,
           	:city
        )
    end
end
