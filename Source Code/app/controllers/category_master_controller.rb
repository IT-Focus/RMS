class CategoryMasterController < ApplicationController
	def index
		@@service = CategoryMasters::AdvanceSearch.new()
		search_by = params[:searchBy]
    	search_string = params[:searchString]
		data = @@service.advance_search search_by, search_string
		render json:{data:data, success:true}
	end

  def check_people_allowance
        room_master_id = params[:room_master_id]
        puts "==============room_master_id=#{room_master_id}"
  end

	def create
		begin
            CategoryMaster.transaction do
                @data = CategoryMaster.new(permit_data)
                @data.created_by = session[:user_id]
                @data.save

                render json:{data:@data ,success:true}
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
            :no_persons,
            :extra_person_charge,
            :tariff_hour,
            :is_include_tax_hour,
            :tariff_month,
            :is_include_tax_month,
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
                  :is_charge_rate
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
            :no_persons,
            :extra_person_charge,
            :tariff_hour,
            :is_include_tax_hour,
            :tariff_month,
            :is_include_tax_month,
            :created_by,
            :edited_by,

             :category_price_attributes => [
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
                  :is_charge_rate,
                  :is_include_tax,
          ],
        )
    end

end
