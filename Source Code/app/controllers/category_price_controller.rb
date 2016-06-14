class CategoryPriceController < ApplicationController
	def index
		puts "==============================================="
		@@service = CategoryPriceService::Service.new()
		search_by = params[:searchBy]
    search_string = params[:searchString]
		category_id = params[:category_id]
    data = @@service.advance_search search_by, search_string,category_id
		render json:{data:data, success:true}
	end

	def create
		begin
            CategoryPrice.transaction do
                @data = CategoryPrice.new(permit_data)
                @data.save
                render json:{ data:@data ,success:true}
            end

        rescue Exception => e

            render json:{ message:e.message ,success:false}
        end

	end

	def update

        begin
            CategoryPrice.transaction do
                @data = CategoryPrice.find(params[:id])
                @data.update_attributes(permit_data_update)

                render json:{ data:@data ,success:true}
            end

        rescue Exception => e

            render json:{ message:e.message ,success:false}
        end
  end

	private
    def permit_data
        params.require(:data).permit(
           :category_id,
           :name,
           :charge_amount,
           :duration_time,
           :duration_day,
           :allow_late,
           :extra_charge,
           :exd,
           :is_active,
           :seq_no,
           :remark,
           :is_include_tax,
        )
    end
    def permit_data_update
        params.require(:data).permit(
           
           :id,
           :category_id,
           :name,
           :charge_amount,
           :duration_time,
           :duration_day,
           :allow_late,
           :extra_charge,
           :exd,
           :is_active,
           :seq_no,
           :remark,
           :is_include_tax,
           )
    end
end
