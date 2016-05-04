class CashierBalancesController < ApplicationController
def index
    @@service = CashierBalanceService::Service.new()
    user = session[:user_id]
    @data = @@service.get_cashier_balance user
    render json:{data:@data, success:true}
end

def open_cash_drawer 
    @@service = CashierBalanceService::OpenCashDrawer.new()
    user = session[:user_id]


    @CheckCashDrawer = @@service.check_cash_drawer user
    if @CheckCashDrawer == true
        render json:{success:false, message:"Note: You have openned cash drawer, Please close before open again"}
    elsif @CheckCashDrawer == "not member"
        render json:{success:false, message:"Note: Only cashier have permission to access this page!!!"}
    else
        is_admin = @@service.check_is_sys_admin user
        if is_admin == true
             render json:{is_admin:true,success:true}
        else
            cashier = @@service.get_cashier_detail user
            render json:{data:cashier,success:true}
        end
    end

end

def create

        begin
            CashierBalance.transaction do
                @@service = CashierBalanceService::OpenCashDrawer.new()
        
                    @data = CashierBalance.new(permit_data)
                    @data.save
                    render json:{ data:@data ,success:true}
              
                
            end

        rescue Exception => e

            render json:{ message:e.message ,success:false}
        end

end

def update
           begin
            CashierBalance.transaction do
                @data = CashierBalance.find(params[:id])

        		@data.update_attributes(permit_data_edit)

        		render json:{ data:@data ,success:true}
            end

        rescue Exception => e

            render json:{ message:e.message ,success:false}
        end

end

private
    def permit_data
        params.require(:data).permit(
           :cashier_id,
           :opened_date,
           :closed_date,
           :open_balance,
           :close_balance,
        
        )
    end
     def permit_data_edit
        params.require(:data).permit(         
           :id,
           :cashier_id,
           :opened_date,
           :closed_date,
           :open_balance,
           :close_balance,
        )
    end
end
