class LicenseController < ApplicationController
	skip_before_filter :check_session, :only => [:index , :activate]
  def index
  	@license_service = License::LicenseSv.new
  	@key_code= @license_service.get_key_code()

  end
  def activate
  		secret_key = params[:secret_key] 
  	
  		@license_service = License::LicenseSv.new
  		if @license_service.check_secret_key(secret_key) == true
  			@license_service.write_license_key secret_key
        @message_ok ="License activate success"
      else 
  			@message_error ="Your license incorrect please contact to admin"
  		end 
  		render "index"
  	
  end
end
