class DiscountConfigController < ApplicationController
	def index
    @@service = DiscountConfig::ServiceIndex.new()
    search_string = params[:searchString]

    @Search = @@service.get_index search_string
    render json:{data:@Search, success:true}
end

def create

        begin
            DiscountConfig.transaction do
                user = session[:user_id]
                @data = DiscountConfig.new(permit_data)
                @data.is_delete=false
                @data.created_by = user
                @data.save

                render json:{ data:@data ,success:true}
            end

        rescue Exception => e

            render json:{ message:e.message ,success:false}
        end

end

def update
           begin
            DiscountConfig.transaction do
            	user = session[:user_id]
                @data = DiscountConfig.find(params[:id])
        		@data.update_attributes(permit_data_edit)
 				@data.edited_by = user
 				@data.save

        		render json:{ data:@data ,success:true}
            end

        rescue Exception => e

            render json:{ message:e.message ,success:false}
        end

end

def destroy
		begin
			DiscountConfig.transaction do
            	user = session[:user_id]
                @data = DiscountConfig.find(params[:id])
        		@data.is_delete=true	
 				@data.deleted_by = user
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
           :code,
           :remark,
           :created_by,
           :edited_by,
           :deleted_by,
           :is_delete,
        )
    end
     def permit_data_edit
        params.require(:data).permit(
           :id,
           :code,
           :remark,
           :created_by,
           :edited_by,
           :deleted_by,
           :is_delete,
        )
    end

end
