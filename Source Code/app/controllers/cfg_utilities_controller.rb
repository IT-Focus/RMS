class CfgUtilitiesController < ApplicationController
	def index
        @data = @data = CfgUtility.all
        render json:{ data:@data , success:true}
    end
    def update    
        begin
            @data = CfgUtility.find(params[:id])
            puts "=============data=#{params[:id]}"
            @data.update_attributes(permit_data_edit)
            # SysAuditrail.create auditrail_type_id:2 , description:"Update CfgUtility Name= #{@data.util_name}", user_id:session[:user_id]
            render json:{ data:@data ,success:true}
        rescue Exception => e
            render json:{ success:false, message:e.message}   
        end
    end

    def permit_data_edit
        params.require(:data).permit(         
            :id,
            :util_name,
            :util_int,
            :util_string,
            :util_boolean,
            :util_date,
            :description,   
        )
    end



end
