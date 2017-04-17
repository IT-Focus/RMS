Rails.application.routes.draw do


  get 'license/index'
  get 'license/activate'

    get 'home/index'

    get 'home/login'
  get 'check_outs/print'
  get 'cashier_balances/print_close_cash_drawer'
  get 'cashier_balances/get_close_balance_info'  
    root 'home#index'

# administrator menu
    resources :role, :department, :menu, :cfg_company, :cfg_utilities, :sys_menus, :sys_users
 #  Room Transaction
 resources :check_outs, :customer
# Setup
	resources :floor, :category_master,:category_price, :room_master, :room_service_master, :status, :cities, :currencies, :workshifts, :next_code, :default_color, :discount_config
# Image
	resources :images
# Cashiers
  resources :cashiers, :cashier_balances, :cancel_check_in, :check_in_detail, :check_in
# Report
  resources :auditrail, :reports , :night_audit
    get ':controller(/:action(/:id))'
    post ':controller(/:action(/:id))'
end
