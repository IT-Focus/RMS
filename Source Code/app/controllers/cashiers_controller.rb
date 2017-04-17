class CashiersController < ApplicationController
@@service = CashierService::Search.new()
def index
    search_string = params[:searchString]

    @Search = @@service.search search_string
    render json:{data:@Search, success:true}
end

def get_openAmount
    cashier_id = params[:cashier_id]
    cashier = Cashier.find_by id:cashier_id, is_active:true
    if cashier.nil? 
      open_amount = 0
    else 
      open_amount = cashier.obda
    end
    render json:{open_balance:open_amount, success:true}
end

def get_cashier
    @@checkIsAdminService = CashierBalanceService::OpenCashDrawer.new()
    user = session[:user_id]
    is_admin = @@checkIsAdminService.check_is_sys_admin user
    if is_admin == true
        @Search = @@service.get_cashier_active ""
        render json:{data:@Search, success:true} 
    else
        @Search = @@service.get_cashier user
        render json:{data:@Search, success:true}
    end
end

def create
        @@auditrailService = ServiceAuditrail::TrackAuditrail.new()
        @@service = CashierService::Search.new()
        begin
            Cashier.transaction do
                @data = Cashier.new(permit_data)
               
                  @data.save
                  @get_cashier_detail = @@service.get_cashier @data.user_id

                  @get_cashier_detail.each do |f|
                    @username = f.username
                    @workshift_name = f.workshift_name
                    @obda = f.obda
                  end
                  @@auditrailService.track_action('Create Cashier','Create', "Cashier name: #{@username}, Workshift: #{@workshift_name}, Open Balance: #{@obda} ", session[:user_id])
                  render json:{ data:@data ,success:true}
             
            end

        rescue Exception => e

            render json:{ message:e.message ,success:false}
        end

end

def check_duplicate_cashier
    @@service = CashierService::Search.new()
    user_id = params[:user_id]
    workshift_id = params[:workshift]
    
    @is_duplicate =  @@service.check_dupplicate(user_id, workshift_id)
                
        if @is_duplicate == false

            render json:{success:true}
        else
            render json:{success:false, message:"Warning! This workshift have been assigned to this cashier"}
        end
end

def check_update_duplicate_cashier
    @@service = CashierService::Search.new()
    _cashier_id = params[:cashier_id]
    _user_id = params[:user_id]
    _workshift_id = params[:workshift]

    @is_duplicate = @@service.check_duplicate_update(_cashier_id, _user_id, _workshift_id)

        if @is_duplicate == false
             render json:{success:true}
        else
             render json:{success:false}
        end
end

def update
           begin
            @@auditrailService = ServiceAuditrail::TrackAuditrail.new()
            @@service = CashierService::Search.new()
            Cashier.transaction do
                @data = Cashier.find(params[:id])
                # @get_current_cashier_detail = @@service.get_cashier @data.user_id
                @data.update_attributes(permit_data_edit)
        		    @get_cashier_detail = @@service.get_cashier @data.user_id

                # @get_current_cashier_detail.each do |d|
                #   @old_username = d.username
                #   @old_workshift_name = d.workshift_name
                #   @old_obda = d.obda
                # end

                @get_cashier_detail.each do |f|
                  @username = f.username
                  @workshift_name = f.workshift_name
                  @obda = f.obda
                end
                @@auditrailService.track_action('Update Cashier','Update', "Cashier name: #{@username}, Workshift:#{@workshift_name}, Open Balance: #{@obda} ", session[:user_id])

        		render json:{ data:@data ,success:true}
            end

        rescue Exception => e

            render json:{ message:e.message ,success:false}
        end

end

private
    def permit_data
        params.require(:data).permit(
           	:user_id,
           	:workshift_id,
           	:start_time,
           	:obda,
           	:is_active,
        )
    end
     def permit_data_edit
        params.require(:data).permit(      
           	:id,
           	:user_id,
           	:workshift_id,
           	:start_time,
           	:obda,
           	:is_active,
        )
    end
end
