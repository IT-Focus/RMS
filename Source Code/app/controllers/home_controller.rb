class HomeController < ApplicationController
  skip_before_filter :check_session, :only => [:login,:logout , :getConfig]


  def get_config
    @data = CfgUtility.all 
    render json:{ success:true , data:@data }
  end
  def login
    
    # p output
    # check license
    @license_service = License::LicenseSv.new
    @username = params[:username]
    @password = params[:password]

    if @license_service.check_license() == false 
      
      
      @message = "Your system has expire or have problem with license, Please contact to admin ."
       render  '/home/login'

    elsif

      if !@username.nil? && !@password.nil?

          @user = SysUser.find_by username:@username

          if @user.nil?
              @message = "Incorrect User name "

              render  '/home/login'
          elsif true # @user.password == @password

              if @user.is_active == false
                  @message = "Your account is deactive in system"

                  render  '/home/login'
                else

                session[:user_id] = @user.id
                session[:user] = @user
                redirect_to root_path
              end

          else
              @message = "Incorrect Password"

              render  '/home/login'
          end
      end
    end
    # @message = "Testing"

  end

  def logout
        reset_session
        render '/home/login'
  end

  def index

    puts "========= render html in putblic page"

  end

  def getUsername
      @user = session[:user]
      render json{username:@user, success:true}
  end

end
