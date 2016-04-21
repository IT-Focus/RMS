class FloorController < ApplicationController
def index
    @@service = Floors::Service.new()
    search_by = params[:searchBy]
    search_string = params[:searchString]

    @advanceSearch = @@service.advance_search search_by, search_string
    render json:{data:@advanceSearch, success:true}
end

def create

        begin
            Floor.transaction do
                @data = Floor.new(permit_data)
                # SysAuditrail.create  description:"Create Floor= #{@data.name}", user_id:session[:user_id]
                @data.save

                render json:{ data:@data ,success:true}
            end

        rescue Exception => e

            render json:{ message:e.message ,success:false}
        end

end

def update
           begin
            Floor.transaction do
                @data = Floor.find(params[:id])

        		@data.update_attributes(permit_data_edit)

        		render json:{ data:@data ,success:true}
            end

        rescue Exception => e

            render json:{ message:e.message ,success:false}
        end

end

def get_floors
    data = Floor.all
    render json:{data:data, success:true}

end

private
    def permit_data
        params.require(:data).permit(
            :code,
            :name,
            :description
        )
    end
     def permit_data_edit
        params.require(:data).permit(
            :id,
            :code,
            :name,
            :description
        )
    end

end
