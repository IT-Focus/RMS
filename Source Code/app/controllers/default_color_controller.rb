class DefaultColorController < ApplicationController
def index
   	data = DefaultColor.find(1)
    render json:{data:data, success:true}
end
def create

        begin
            DefaultColor.transaction do
                @data = DefaultColor.find(1)
                @data.edited_by = session[:user_id]
        		@data.update_attributes(permit_data_edit)
                @data.save

        		render json:{ data:@data ,success:true}
            end

        rescue Exception => e

            render json:{ message:e.message ,success:false}
        end

end

def update
           begin
            DefaultColor.transaction do
                @data = DefaultColor.find(1)
                @data.edited_by = session[:user_id]
        		@data.update_attributes(permit_data_edit)
                @data.save

        		render json:{ data:@data ,success:true}
            end

        rescue Exception => e

            render json:{ message:e.message ,success:false}
        end

end

private
    def permit_data
        params.require(:data).permit(
           	:reserved,
          	:occupied,
          	:late_checkout,
          	:free,
          	:edited_by,
        )
    end
     def permit_data_edit
        params.require(:data).permit(
          	:reserved,
          	:occupied,
          	:late_checkout,
          	:free,
          	:edited_by,
        )
    end
end
