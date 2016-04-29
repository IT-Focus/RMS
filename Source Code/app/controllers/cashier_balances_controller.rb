class CashierBalancesController < ApplicationController
def index
    @@service = CashierBalanceService::Service.new()
    @data = @@service.get_cashier_balance
    render json:{data:@data, success:true}
end

def open_cash_drawer 
    @@service = CashierBalanceService::OpenCashDrawer.new()
    user = session[:user_id]
    puts "==================user=#{user}"

    @CheckCashDrawer = @@service.check_cash_drawer user
    if @CheckCashDrawer == true
        render json:{success:false, message:"Note: You have openned cash drawer, Please close before open again"}
    else
        render json:{success:true}
    end

end

def create

        begin
            CashierBalance.transaction do
                @data = CashierBalance.new(permit_data)
                # SysAuditrail.create  description:"Create CashierBalance= #{@data.name}", user_id:session[:user_id]
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
