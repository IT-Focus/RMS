class ApplicationController < ActionController::Base
 require 'will_paginate/array'
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  # protect_from_forgery with: :exception
  #
  before_filter :check_session
  def check_session
    begin
        if session[:user_id]
          
            if session[:expiry_time] && session[:expiry_time].to_time < 24.hours.ago
                reset_session
                flash[:warning] = 'You was logout.'
                redirect_to '/home/login'
              else
                session[:expiry_time] = Time.now
              end

        else
          #... authenticate

          session[:expiry_time] = Time.now
          flash[:warning] = 'You was logout.'

          redirect_to  '/home/login'
        end
    rescue Exception => e
         
        redirect_to  '/home/login'
    end

  end
end
