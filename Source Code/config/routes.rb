Rails.application.routes.draw do


  get 'license/index'
  get 'license/activate'

    get 'home/index'

    get 'home/login'

    root 'home#index'
# administrator menu
    resources :role, :department, :menu, :cfg_company, :cfg_utility, :sys_menus, :sys_users
# Setup
	resources :floor, :category_master, :room_master, :room_service_master, :status
    get ':controller(/:action(/:id))'
    post ':controller(/:action(/:id))'
end
