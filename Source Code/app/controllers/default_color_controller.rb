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
            :reserved_text_color,
            :occupied_text_color,
            :late_checkout_text_color,
            :free_text_color,
        )
    end
     def permit_data_edit
        params.require(:data).permit(
          	:reserved,
          	:occupied,
          	:late_checkout,
          	:free,
          	:edited_by,
            :reserved_text_color,
            :occupied_text_color,
            :late_checkout_text_color,
            :free_text_color,
        )
    end
end
