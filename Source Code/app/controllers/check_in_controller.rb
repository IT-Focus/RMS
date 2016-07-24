class CheckInController < ApplicationController
def index
	@data = CheckIn.joins(:check_in_detail).all
	render json:{data:@data, success:true}
end

def create
        begin
            puts"==================create"
            @@service = CheckInService::Service.new()
            @user_id = session[:user_id]
            CheckIn.transaction do
                @data = CheckIn.new(permit_data)
                
                @data.created_by = session[:user_id]
                @data.status_code = 3
                @data.save
                if @data.save
                    # @checkChargeType=@@service.check_charge_type 1
      
                    @data.check_in_detail.each do |data|
                      categoryPrice = CategoryPrice.find data.categroy_price_id
                      is_charge_by_rate = categoryPrice.is_charge_rate
                      #process check charge type
                      
                      # check in type by day 
                      if is_charge_by_rate==true
                          @@service.check_in_by_day(data.id,@data.estimated_check_out_date, data.categroy_price_id, @data.discount,@user_id)
                      # check in type by hour
                      else
                          @@service.check_in_hour data.id,@data.check_in_date,data.categroy_price_id,@data.discount,@user_id
                      end
                      
                      # Process change room status to busy
                      @change_room_status = @@service.change_room_status data.room_master_id
                      if @change_room_status == true
                        # Process insert check in info to room transaction
                        @@commonService = CommonService::Service.new()
                        @insert_to_room_transaction = @@commonService.record_check_in_to_room_transaction(data.room_master_id, @user_id, @data.status_code)
                        if @insert_to_room_transaction == true
                          # Process keep track user process store into Auditrail 
                          @@service.insert_into_auditrail @user_id, data.room_no
                        end
                      end
                    end
                end 
                render json:{ data:@data ,success:true}
            end

        rescue Exception => e

            render json:{ message:e.message ,success:false}
        end
end

def update
end

def destroy
  puts"==================delete"
        begin
            CheckIn.transaction do
                @data = CheckIn.find(params[:id])
                @data.update(edited_by:session[:user_id])
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
              :room_master_id,
              :service_id,
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

    def permit_data_update
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
