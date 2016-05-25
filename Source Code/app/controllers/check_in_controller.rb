class CheckInController < ApplicationController
def index
	@data = CheckIn.all
	render json:{data:@data, success:true}
end

def create
        begin
            CheckIn.transaction do
                @data = CheckIn.new(permit_data)
                @data.created_by = session[:user_id]
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
        )
    end
     def permit_data_edit
        params.require(:data).permit(
           :id,
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
        )
    end
end
