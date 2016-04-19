class RoleController < ApplicationController
    def index
        @data = Role.all

        render json:{ data:@data , success:true}
    end

    def combo
        @data = Role.where is_active:true
        render json:{ data:@data , success:true }
    end

    def create

        begin
            Role.transaction do
                @data = Role.new(permit_data)
                @data.save

                render json:{ data:@data ,success:true}
            end

        rescue Exception => e

            render json:{ message:e.message ,success:false}
        end


    end

    def update
        @data = Role.find(params[:id])

        @data.update_attributes(permit_data)

        render json:{ data:@data ,success:true}

    end
    def destroy

    end

     def get_menu_list
        begin
            service = Role::Service.new
            data = service.get_menu params
            render json:{ success:true , data:data}
        rescue Exception => e
            puts e.message
            render json:{ success:false , message:"Please contact to admin "}
        end
    end

    private
    def permit_data
        params.require(:data).permit(
            :id,
            :name,
            :description,
            :is_active,
            rel_menu_role_attributes:[
                :id ,
                :menu_id ,
                :_destroy
            ]
        )
    end
end
