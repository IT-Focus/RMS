class CheckInController < ApplicationController
def index
	@data = CheckIn.joins(:check_in_detail).all
	render json:{data:@data, success:true}
end

def create
        begin
            @@service = CheckInService::Service.new()
            CheckIn.transaction do
                @data = CheckIn.new(permit_data)
                @data.created_by = session[:user_id]
                @data.save
                
                # if @data.save
                #     room_master = @data.room_master_id
                #     @@service.change_room_status room_master_id
                # end
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
           :arrival_date,
           :no_person,
           :adult,
           :children,
           :male,
           :female,
           :no_days,
           :balance,
           :no_room,
           :room_master_id,
           :extra_person,
           :customer_name,
           :national_id,
           :charge,
           :check_in_time,
           :email,
           :check_in_date,
           :dob,
           :address,
           :city,
           :phone,
           :mobile,
           :discount,
           :rental_type,
           :hourly_check_in,
           :monthly_check_in,
           :estimated_check_out_time,
           :estimated_check_out_date,
           :purpose_of_visit,
           :paid_booking,
           :created_by,
           :edited_by,
           :description,
           :status_code,

           :check_in_detail_attributes => [
              :check_in_id,
              :service_id,
              :room_master_id,
              :room_no,
              :categroy_price_id,
              :check_in_date,
              :check_out_date,
              :description,
              :qty,
              :unit_price,
              :total_amount,
              :discount,
              :discount_amount,
              :tax,
              :tax_amount,
              :grand_total_amount,
              :created_by,
              :edited_by,
              :tran_type,
              
              ],
        )
    end
end
