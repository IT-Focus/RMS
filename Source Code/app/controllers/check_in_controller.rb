class CheckInController < ApplicationController
@@common = Common.new
def index
	@@service = CheckInService::Service.new()

	search_by = params[:searchBy]
  search_string = params[:searchString]

  @advanceSearch = @@service.advance_search search_by, search_string
  render json:{data:@advanceSearch, success:true}
end
def edit
    check_in_id = params[:check_in_id]
    room_id = CheckInDetail.get_room_master_id check_in_id
    
    @data = CheckIn.joins(:check_in_detail).find check_in_id 


    @rental_type = @data.rental_type

    if @rental_type == 'dynamic_plan'
        @check_in_before_update = CheckInDetail.get_check_in_by_room_id room_id
        CheckInDetail.update_check_in_detail @check_in_before_update.id, 1
        @data = CheckIn.joins(:check_in_detail).find check_in_id 
    elsif @rental_type == 'static_plan'
        @checkRoomDuration = CheckInDetail.check_room_duration_of_plan(check_in_id);
        @data = CheckIn.joins(:check_in_detail).find check_in_id 
        if @checkRoomDuration == false
            CheckInDetail.change_room_status_to_late_check_in(room_id);
        end 
    else
    
    end
    
    @data.check_in_time = @data.check_in_time.strftime("%I:%M %p")  


    render json:{ success:true , 
        data:@data ,
        room_master_id: room_id, 
        check_in_time: @data.check_in_time.strftime("%I:%M"), 
        estimated_check_out_time: @data.estimated_check_out_time.strftime("%I:%M")    }
end
def create
        begin
            
            @@service = CheckInService::Service.new()
            @user_id = session[:user_id]
            CheckIn.transaction do
                @data = CheckIn.new(permit_data)
                @data.code = @@common.get_code_with_config("CHECK IN", '') 
                @data.created_by = session[:user_id]
                @data.status_code = CheckIn.statuses[:check_in]
                
                if @data.id
                    puts "==================================test1"
                    @data = CheckIn.find(@data.id)
                    @data.update(edited_by:session[:user_id])
                    @data.update_attributes(permit_data_update)

                  
                    @data.check_in_detail.each do |data|
                      if data.tran_type == "SE"
                            if !data.id.nil?
                            @service_master=@@service.get_service_info data.service_id
                            @service_name = @service_master.service_name
                            @CheckInDetail = CheckInDetail.find data.id
                            @CheckInDetail.update_attributes(
                                description:@service_name,
                                tran_type:'SE'
                            )
                            @CheckInDetail.save
                            end
                        end
                    end    
                render json:{ data:@data ,success:true}
                else
                  puts "================================test2"
                @data.save
                @check_in_id = @data.id
                if @data.save
                    # @checkChargeType=@@service.check_charge_type 1
      
                    @data.check_in_detail.each do |data|
                      # if data.categroy_price_id>0
                        # categoryPrice = CategoryPrice.find data.categroy_price_id
                        # if !categoryPrice.nil?
                        # is_charge_by_rate = categoryPrice.is_charge_rate
                        # end
                      # end
                      #process check charge type
                      
                      if data.tran_type == "RE"
                          # check in type by day 
                          # if is_charge_by_rate==true
                          if @data.rental_type == 'rate'    
                              @@service.check_in_by_day(@check_in_id,data.id,@data.estimated_check_out_date, data.room_master_id, @data.discount,@user_id)
                          # check in type by hour
                          else
                              @@service.check_in_hour  @check_in_id,data.id,@data.check_in_date,data.categroy_price_id,@data.discount,@user_id
                          end
                      else
                          @@service.add_service_items(@data,data,@user_id)
                      end
                      
                      # Process change room status to busy
                      @change_room_status = @@service.change_room_status data.room_master_id
                      if @change_room_status == true
                        # Process insert check in info to room transaction
                        @@commonService = CommonService::Service.new()
                        @insert_to_room_transaction = @@commonService.record_check_in_to_room_transaction(data.room_master_id, @user_id, RoomTransaction.statuses[:check_in])
                        if @insert_to_room_transaction == true
                          # Process keep track user process store into Auditrail 
                          @@service.insert_into_auditrail @user_id, data.room_master.room_no
                        end
                      end
                    end
                end 
                render json:{ data:@data ,success:true}
                end
                
            end

        rescue Exception => e

            render json:{ message:e.message ,success:false}
        end
end

def update
  puts "==================================sdfewfrwrwfwef"
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
          :id,
          :code,
          :arrival_date,
          :customers_id,
          :balance,
          :check_in_time,
          :check_in_date,
          :discount,
          :rental_type,
          :monthly_check_in,
          :estimated_check_out_time,
          :estimated_check_out_date,
          :purpose_of_visit,
          :paid_booking,
          :description,
          :status_code,
          :total_amount,
          :discount_amount,
          :tax_amount,
          :grand_total_amount,
          :created_by,
          :edited_by,

           :check_in_detail_attributes => [ 
              :check_in_id, 
              :room_master_id, 
              :rental_type,  
              :categroy_price_id, 
              :check_in_date,  
              :check_out_date,  
              :description, 
              :adults, 
              :childrens,  
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
              :created_at, 
              :updated_at, 
              :extra_charge, 
              :service_id,
              ],

        )
    end

    def permit_data_update
      params.require(:data).permit(
          :id,
          :code,
          :arrival_date,
          :customers_id,
          :balance,
          :check_in_time,
          :check_in_date,
          :discount,
          :rental_type,
          :monthly_check_in,
          :estimated_check_out_time,
          :estimated_check_out_date,
          :purpose_of_visit,
          :paid_booking,
          :description,
          :status_code,
          :total_amount,
          :discount_amount,
          :tax_amount,
          :grand_total_amount,
          :created_by,
          :edited_by,

           :check_in_detail_attributes => [
              
              :id,  
              :check_in_id, 
              :room_master_id, 
              :rental_type,  
              :categroy_price_id, 
              :check_in_date,  
              :check_out_date,  
              :description, 
              :adults, 
              :childrens,  
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
              :created_at, 
              :updated_at, 
              :extra_charge, 
              :service_id,
              ],

        )
    end
end
