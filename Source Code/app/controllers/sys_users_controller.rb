
class SysUsersController < ApplicationController
    @@s_pss = User::ChangePassword.new()
    def index
        @data = SysUser.where is_admin:false
        # SysUser.all = select * from SysUser
        # SysUser.find(1 ) = select * from SysUser where id=1
        render json:{ data:@data , success:true}
    end

    def create

        begin
            SysUser.transaction do
                @data = SysUser.new(permit_data)
                @data.is_admin = false
                @data.save

                render json:{ data:@data ,success:true}
            end

        rescue Exception => e

            render json:{ message:e.message ,success:false}
        end


    end

    def update
        @data = SysUser.find(params[:id])

        @data.update_attributes(permit_data)

        render json:{ data:@data ,success:true}

    end
    def changePassword
        begin
            if @@s_pss.change_password(params,session[:user_id]) == true
                render json:{ success:true , message:"Change Password Success "}
            else
                render json:{ success:false , message:"Change Password Unsuccess "}
            end

        rescue Exception => e
            render json:{success:false , message:e.message }
        end
    end

    def get_user
         @data = SysUser.where is_admin:false, is_active:true
        # SysUser.all = select * from SysUser
        # SysUser.find(1 ) = select * from SysUser where id=1
        render json:{ data:@data , success:true}
    end
    
    def destroy

    end

    private
    def permit_data
        params.require(:data).permit(
            :id,
            :code,
            :date_join,
            :first_name,
            :last_name,
            :phone,
            :email,
            :username,
            :password,
            :address,
            :is_active,
            :is_admin
        )
    end


end

