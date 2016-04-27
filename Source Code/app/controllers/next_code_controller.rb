class NextCodeController < ApplicationController
def index
    @@service = NextCodeService::Search.new()
    search_string = params[:searchString]

    @Search = @@service.search search_string
    render json:{data:@Search, success:true}
end

def create

        begin
            NextCode.transaction do
                @data = NextCode.new(permit_data)
                # SysAuditrail.create  description:"Create NextCode= #{@data.name}", user_id:session[:user_id]
                @data.save

                render json:{ data:@data ,success:true}
            end

        rescue Exception => e

            render json:{ message:e.message ,success:false}
        end

end

def update
           begin
            NextCode.transaction do
                @data = NextCode.find(params[:id])

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
           :module,
           :cit,
           :cet,
           :prefix,
           :suffix,
           :length,
        )
    end
     def permit_data_edit
        params.require(:data).permit(
           
           :id,
           :module,
           :cit,
           :cet,
           :prefix,
           :suffix,
           :length,
        )
    end
end
