class NationalityController < ApplicationController
	def index
        @data = Nationality.all

        render json:{ data:@data , success:true}
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
