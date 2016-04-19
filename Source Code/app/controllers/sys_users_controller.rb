
class SysUsersController < ApplicationController

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

