class RoomMasterController < ApplicationController
	
	def index
    @@service = Room::AdvanceSearch.new()
    search_by = params[:searchBy]
    search_string = params[:searchString]
    data = @@service.advance_search search_by, search_string

    render json:{data:data, success:true}
  end
  
   def check_people_allowance
        @@service = Room::RoomMonitor.new()
        @room_master_id = params[:room_master_id]
        @no_person = params[:no_person]
        @categoryPrice = @@service.checkPeopleAllowance(@room_master_id)
        @p_allowance = @categoryPrice.no_persons
        @extra_person_charge = @categoryPrice.extra_person_charge
        if @p_allowance.to_i >= @no_person.to_i
             render json:{success:true,p_allowance:@p_allowance}
        else
             render json:{p_allowance:@p_allowance,extra_pp_charge:@extra_person_charge,extra_pp:true,success:true,message:"People allowance is #{@p_allowance}! "}
            
        end

        
  end

  def get_room_monitor
      floor = params[:floor]
      status = params[:status_id]
      @@service = Room::RoomMonitor.new()
      data = @@service.get_room_monitor(floor,status)
      render json:{data:data , success:true}

  end

  def get_available_rooms
    @data = RoomMaster.where status_id:1
    render json:{data:@data, success:true}
  end
  
  def create
        begin
          @@auditrailService = ServiceAuditrail::TrackAuditrail.new()
                RoomMaster.transaction do

                  @data = RoomMaster.new(permit_data)
                  @data.status_id = RoomMaster.statuses[:available]
                  @checkRoomNo = RoomMaster.check_room_no @data.room_no
                  if @checkRoomNo == true

                    render json:{success:false, message:"Duplicate Room Number!"}
                  else
                  
                    @data.save
                    @@auditrailService.track_action('Create Room','Create', "Create Room #{@data.room_no}", session[:user_id])
                    render json:{ data:@data ,success:true}
                  end
                  
             
                end
        rescue Exception => e
            render json:{ message:e.message ,success:false}
        end
    end

    def check_room_limit
        @@service = CfgUtilityService::Service.new()
            maximum_room = @@service.get_maximum_room  
            if !maximum_room.nil?
                 if RoomMaster.count > maximum_room and maximum_room !=0
                    render json:{maximum_room:maximum_room , success:false , message:"You're privilege to create #{maximum_room} room only! "}
                 else
                    render json:{success:true}
             
                 end      
            end
    end

	def update
        begin
            @@auditrailService = ServiceAuditrail::TrackAuditrail.new()
            RoomMaster.transaction do
            

                @data = RoomMaster.find(params[:id])
                @new_data = RoomMaster.new(permit_data_edit)
                oldRoomNumber = @data.room_no
                @checkRoomNo = RoomMaster.check_room_no @new_data.room_no

                if @checkRoomNo == true
                  render json:{success:false, msg:"Duplicate Room Number!"}
                    # render json: { error: "No such user; check the submitted email address"}
                else
                  @data.update_attributes(permit_data_edit)
                  @@auditrailService.track_action('Update Room','Update', "Update Room #{oldRoomNumber} to Room #{@data.room_no}", session[:user_id])
                  render json:{ data:@data ,success:true}
                end

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
