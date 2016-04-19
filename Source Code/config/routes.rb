Rails.application.routes.draw do


  get 'license/index'
  get 'license/activate'

    get 'home/index'

    get 'home/login'

    root 'home#index'
# administrator menu
    resources :role, :department, :menu, :cfg_company, :cfg_utility, :sys_menus, :sys_users

    get ':controller(/:action(/:id))'
    post ':controller(/:action(/:id))'
end
