class SysMenusController < ApplicationController
	def index
        begin
            @data = SysMenu.find_by_sql "select m2.id as id,m2.menu as menu,m1.menu as menu_name,m2.is_active as is_active from sys_menus m1 inner join sys_menus m2 on m1.id=m2.parent_id"
            render json:{ data:@data , success:true}
        rescue Exception => e
            render json:{ success:false , message:e.message}
        end
    end

    def update
        begin
            @data = SysMenu.find(params[:id])
            @data.update_attributes(permit_data)
            SysAuditrail.create auditrail_type_id:2 , description:"Update Menu permission= #{@data.menu}", user_id:session[:user_id]
            render json:{ data:@data ,success:true}
        rescue Exception => e
            render json:{ success:false, message:e.message}
        end
    end

    private
    def permit_data
        params.require(:data).permit(
            :is_active
        )
    end
end
