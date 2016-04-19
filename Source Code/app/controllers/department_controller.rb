class DepartmentController < ApplicationController
    def index
        @data = Department.all

        render json:{ data:@data , success:true}
    end
    def combo
        @data = Department.all
        render json:{ data:@data , success:true }
    end

    def create

        begin
            Department.transaction do
                @data = Department.new(permit_data)
                @data.is_active = true 
                @data.save

                render json:{ data:@data ,success:true}
            end

        rescue Exception => e

            render json:{ message:e.message ,success:false}
        end


    end

    def update
        @data = Department.find(params[:id])

        @data.update_attributes(permit_data)

        render json:{ data:@data ,success:true}

    end
    def destroy

    end

    private
    def permit_data
        params.require(:data).permit(
            "id",
            "name",
            "description"
        )
    end
end
