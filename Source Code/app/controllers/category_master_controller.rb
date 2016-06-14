class CategoryMasterController < ApplicationController
	def index
		@@service = CategoryMasters::AdvanceSearch.new()
		search_by = params[:searchBy]
    	search_string = params[:searchString]
		data = @@service.advance_search search_by, search_string
		render json:{data:data, success:true}
	end

	def create
		begin
            CategoryMaster.transaction do
                @data = CategoryMaster.new(permit_data)
                @data.user_id = session[:user_id]
                @data.created_by = session[:user_id]
                @data.save

                render json:{ data:@data ,success:true}
            end

        rescue Exception => e

            render json:{ message:e.message ,success:false}
        end

	end

	def update

        begin
            CategoryMaster.transaction do
                @data = CategoryMaster.find(params[:id])
                @data.update(edited_by:session[:user_id])
                @data.update_attributes(permit_data_update)

                render json:{ data:@data ,success:true}
            end

        rescue Exception => e

            render json:{ message:e.message ,success:false}
        end
  end

	def get_category
		data = CategoryMaster.all
		render json:{data:data, success:true}
	end

	private
    def permit_data
        params.require(:data).permit(
           
           	:code,
           	:name,
           	:is_include_tax,
           	:tariff,
           	:tax,
           	:no_persons,
           	:rent_for_single,
           	:tax_for_single,
           	:extra_person_charge,
           	:tariff_hour,
           	:tax_hour,
           	:rent_for_single_hour,
           	:tax_for_single_hour,
           	:tariff_month,
           	:tax_month,
           	:rent_for_single_month,
           	:tax_for_single_month,
           	:extra_person_charge_month,
           	:user_id,
           	:created_by,
           	:edited_by,

            :category_price_attributes => [

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
          ],
        )
    end
    def permit_data_update
        params.require(:data).permit(
           	:id,
           	:code,
           	:name,
           	:is_include_tax,
           	:tariff,
           	:tax,
           	:no_persons,
           	:rent_for_single,
           	:tax_for_single,
           	:extra_person_charge,
           	:tariff_hour,
           	:tax_hour,
           	:rent_for_single_hour,
           	:tax_for_single_hour,
           	:tariff_month,
           	:tax_month,
           	:rent_for_single_month,
           	:tax_for_single_month,
           	:extra_person_charge_month,
           	:user_id,
           	:created_by,
           	:edited_by,
        )
    end

end
