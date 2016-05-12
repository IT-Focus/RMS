class RoomMasterController < ApplicationController
	
	def index
		@@service = Room::AdvanceSearch.new()
		search_by = params[:searchBy]
        search_string = params[:searchString]
		data = @@service.advance_search search_by, search_string

		render json:{data:data, success:true}
	end

  def get_room_monitor
      floor = params[:floor]
      status = params[:status_id]
      @@service = Room::RoomMonitor.new()
      data = @@service.get_room_monitor(floor,status)
      render json:{data:data , success:true}

  end
	def create
		begin
            RoomMaster.transaction do
                @data = RoomMaster.new(permit_data)
                # SysAuditrail.create  description:"Create Floor= #{@data.name}", user_id:session[:user_id]
                @data.status_id = RoomMaster.statuses[:available]
                @data.save

                render json:{ data:@data ,success:true}
            end

        rescue Exception => e

            render json:{ message:e.message ,success:false}
        end
	end

	def update
        begin
            RoomMaster.transaction do
            

                @data = RoomMaster.find(params[:id])

                @data.update_attributes(permit_data_edit)

                render json:{ data:@data ,success:true}
            end

        rescue Exception => e

            render json:{ message:e.message ,success:false}
        end
	end

	private
    def permit_data
        params.require(:data).permit(
           	:room_no,
           	:category_id,
           	:floor_id,
            :status_id,
           	:extn_no,
        )
    end
     def permit_data_edit
        params.require(:data).permit(
            :id,
           	:room_no,
           	:category_id,
           	:floor_id,
           	:status_id,
           	:extn_no,
        )
    end


end
