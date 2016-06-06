class RoomServiceMasterController < ApplicationController
	def index
		@@service = RoomService::AdvanceSearch.new()
		search_by = params[:searchBy]
    	search_string = params[:searchString]

    	@advanceSearch = @@service.advance_search search_by, search_string
    	render json:{data:@advanceSearch, success:true}

	end

  def combo
        @@service = RoomService::AdvanceSearch.new()
        item_id = params[:item_id]

        @advanceSearch = @@service.get_combo item_id
        render json:{data:@advanceSearch, success:true}
  end

	def create
		begin
            RoomServiceMaster.transaction do
                @data = RoomServiceMaster.new(permit_data)
                @data.created_by = session[:user_id]
                @data.save

                render json:{ data:@data ,success:true}
            end

        rescue Exception => e

            render json:{ message:e.message ,success:false}
        end
	end

	def update
        begin
            RoomServiceMaster.transaction do
            

                @data = RoomServiceMaster.find(params[:id])
                @data.edited_by = session[:user_id]
                @data.update_attributes(permit_data_edit)
                @data.save
                render json:{ data:@data ,success:true}
            end

        rescue Exception => e

            render json:{ message:e.message ,success:false}
        end
	end

	private
    def permit_data
        params.require(:data).permit(
           	:code,
           	:service_name,
           	:indicatoer,
           	:is_include_tax,
           	:tax,
            :abbr,
            :charge_amount,
           	:created_by,
           	:edited_by,
        )
    end
     def permit_data_edit
        params.require(:data).permit(
            :id,
           	:code,
           	:service_name,
           	:is_include_tax,
           	:tax,
           	:created_by,
           	:edited_by,
            :abbr,
            :charge_amount,
        )
    end

end
