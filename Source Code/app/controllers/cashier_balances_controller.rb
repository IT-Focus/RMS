class CashierBalancesController < ApplicationController
@@auditrailService = ServiceAuditrail::TrackAuditrail.new()
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
def get_close_balance_info  
  id = params[:id]
  @cashierBalance = CashierBalance.find id 
  # get cashier info
  @cashier =  @cashierBalance.cashier
  @user = @cashier.sys_user
  # get close balance Info
  @check_in = CheckIn.get_sale_by_cashier  @cashierBalance , @user.id
  sale_amount = @check_in.sum('check_ins.total_amount')

  discount_amount = @check_in.sum('check_ins.discount_amount')
  vat_amount = @check_in.sum('check_ins.tax_amount')
  grand_total_amount = @check_in.sum('check_ins.grand_total_amount')
  open_balance = @cashierBalance.open_balance 


  result = { 
    cashier_opened_date:@cashierBalance.opened_date, 
    sale_amount:sale_amount ,
    opening_amount: @cashierBalance.open_balance  ,
    cashierBalance:@cashierBalance ,     
    cashier_name: @user.first_name + @user.last_name, 
    shift:@cashier.workshift.name,
    total_amount: sale_amount + open_balance,
    grand_total_amount:grand_total_amount , 
    discount_amount:discount_amount,
    vat_amount: vat_amount,
    closed_date:Time.now ,
    net_receive_amount: 0  , 
    total_paid: 0, 
    id: id ,
    success:true 
  }

  render json:result
end
def save_close_balance
    id = params[:id]
    begin
      @@service = CashierService::Search.new()
      @cashierBalance = CashierBalance.find id
       # get close balance Info
       puts "=== 1"
        @check_in = CheckIn.get_sale_by_cashier @cashierBalance,@cashierBalance.cashier.user_id
        puts "=== 2"
        grand_total_amount = @check_in.sum('check_ins.grand_total_amount')    
        puts "=== 3"
      @cashierBalance.update_attributes(close_by:session[:user_id] ,close_balance:grand_total_amount,  status:41 , closed_date:Time.now)
        puts "=== 4"
      if @cashierBalance.save
         @cashierDetail = @@service.get_cashier @cashierBalance.cashier.user_id       
            @cashierDetail.each do |f|
                    @username = f.username   
            end
        @@auditrailService.track_action('Close Case Drawer','Update', "Cashier name: #{@username}, Close Amount: #{@cashierBalance.close_balance}", session[:user_id]) 
        render json:{ success:true , message:'Close cashier balance success'}
      else 
        render json:{ success:false , message:@cashierBalance.errors}
      end
       

    rescue Exception => e
      render json:{ success:false , message:e.message}
    end
end

def create

        begin
            @@serviceCashier = CashierService::Search.new()
            CashierBalance.transaction do

                @@service = CashierBalanceService::OpenCashDrawer.new()        
                @data = CashierBalance.new(permit_data)
               if @data.save
                    @cashierDetail = @@serviceCashier.get_cashier @data.cashier.user_id       
                    @cashierDetail.each do |f|
                            @username = f.username   
                    end
                    @@auditrailService.track_action('Open Case Drawer','Create', "Cashier name: #{@username}, Openned Balance: #{@data.open_balance}", session[:user_id]) 
                    render json:{ data:@data ,success:true}             
               else                 
                    render json:{ message:@data.errors ,success:false}             
                  
              end 
            
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

def print_close_cash_drawer
    @@service = CashierService::Search.new()
    _cashier_balacne_id = params[:id]
    @cashierBalance = CashierBalance.find _cashier_balacne_id
        # get cashier info
        @cashier =  @cashierBalance.cashier
        @user = @cashier.sys_user
        # get close balance Info
        @check_in = CheckIn.get_sale_by_cashier  @cashierBalance , @user.id
        @sale_amount = @check_in.sum('check_ins.total_amount')
        @discount_amount = @check_in.sum('check_ins.discount_amount')
        @vat_amount = @check_in.sum('check_ins.tax_amount')
        @grand_total_amount = @check_in.sum('check_ins.grand_total_amount')
        @paid_amount = @check_in.sum('check_ins.paid_booking')
        @open_balance = @cashierBalance.open_balance 
        
        @get_check_in_data_by_cashier = CheckIn.get_total_check_in_per_cashier @cashierBalance, @user.id

        @total_check_in = @get_check_in_data_by_cashier.count
        @total_check_out = CheckIn.get_total_check_out @cashierBalance , @user.id
        @total_cancel = CheckIn.get_total_cancel @cashierBalance , @user.id

    render 'print_close_cash_drawer'
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
