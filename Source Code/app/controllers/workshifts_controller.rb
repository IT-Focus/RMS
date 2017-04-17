class WorkshiftsController < ApplicationController
def index
    @@service = WorkshiftService::Search.new()
    search_string = params[:searchString]

    @Search = @@service.search search_string
    render json:{data:@Search, success:true}
end
def get_workshift
  data = Workshift.all
  render json:{data:data, success:true}
end

def create

        begin
            Workshift.transaction do
                @data = Workshift.new(permit_data)
                # SysAuditrail.create  description:"Create Workshift= #{@data.name}", user_id:session[:user_id]
                @data.save

                render json:{ data:@data ,success:true}
            end

        rescue Exception => e

            render json:{ message:e.message ,success:false}
        end

end

def check_workshift
    @@service = WorkshiftService::Search.new()

    abbr = params[:abbr]
    workshift_name = params[:workshift_name]

    is_exist = @@service.is_have_record workshift_name, abbr

    if is_exist == true
        render json:{success:false, message:"Duplicated Workshift/Abbr, Please try again!"}
    else
        render json:{success:true}
    end

end

def update
           begin
            Workshift.transaction do
                @data = Workshift.find(params[:id])

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
            :abbr,
           	:name,
           	:start_time,
           	:end_time,
           	:description,
        )
    end
     def permit_data_edit
        params.require(:data).permit(
           
           	:id,
           	:abbr,
           	:name,
           	:start_time,
           	:end_time,
           	:description,
        )
    end
end
