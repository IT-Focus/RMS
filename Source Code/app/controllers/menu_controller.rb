class MenuController < ApplicationController
    def index
        @data = SysMenu.find_by_sql "select sm.* , sms.menu as parent_menu_name from sys_menus sm  left join sys_menus sms on sm.parent_id = sms.id "
        render json:{ success:true , data:@data}
    end
    def get_menu_by_user
        user  =SysUser.find session[:user_id]

        if user.is_admin == true
            main = SysMenu.where is_leaf:false , is_active:true
            sub = SysMenu.where is_leaf:true , is_active:true
            render json:{ main:main , sub:sub , success:true }
        else
            role_id = user.role_id


            main = SysMenu.where(is_leaf:false , is_active:true)
            sub = SysMenu.joins(:rel_menu_role).where(is_leaf:true , is_active:true).where("rel_menu_roles.role_id = #{role_id}")
            render json:{ main:main , sub:sub , success:true }
        end
    end

    def combo
        begin
            @data = SysMenu.where is_active:true 

            render json:{ success:true , data:@data}
            
        rescue Exception => e
           render json:{success:false , message:e.message} 
        end
    end

    def create

        begin
            SysMenu.transaction do
                @data = SysMenu.new(permit_data)
                @data.save

                render json:{ data:@data ,success:true}
            end

        rescue Exception => e

            render json:{ message:e.message ,success:false}
        end


    end

    def update
        @data = SysMenu.find(params[:id])

        @data.update_attributes(permit_data)

        render json:{ data:@data ,success:true}

    end
    def destroy

    end

    private
    def permit_data
        params.require(:data).permit(
            "id",
            "menu",
            "icon_cls",
            "expand",
            "is_leaf",
            "parent_id",
            "action",
            "is_active",
            "view_index",
            "controller",
            "created_at",
            "updated_at",
        )
    end
end
