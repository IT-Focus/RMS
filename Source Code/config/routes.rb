Rails.application.routes.draw do


  get 'license/index'
  get 'license/activate'

    get 'home/index'

    get 'home/login'

    root 'home#index'
# administrator menu
    resources :role, :department, :menu, :cfg_company, :cfg_utility, :sys_menus, :sys_users
# Setup
	resources :floor, :category_master, :room_master, :room_service_master, :status, :cities, :currencies, :workshifts, :next_code, :default_color, :discount_config
# Image
	resources :images
# Cashiers
  resources :cashiers, :cashier_balances, :cancel_check_in, :check_in_detail, :check_in
    get ':controller(/:action(/:id))'
    post ':controller(/:action(/:id))'
end
