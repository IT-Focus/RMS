class CustomerController < ApplicationController
	def index

	    search_by = params[:searchBy]
	  	search_string = params[:searchString]

	    @Search = Customer.advance_search search_by,search_string
	    render json:{data:@Search, success:true}
	end

	def create

	        begin
	            Customer.transaction do
	                @data = Customer.new(permit_data)
	                @data.save

	                render json:{ data:@data ,success:true}
	            end

	        rescue Exception => e

	            render json:{ message:e.message ,success:false}
	        end

	end

	def update
	           begin
	            Customer.transaction do
	                @data = Customer.find(params[:id])

	        		@data.update_attributes(permit_data_edit)

	        		render json:{ data:@data ,success:true}
	            end

	        rescue Exception => e

	            render json:{ message:e.message ,success:false}
	        end

	end

	def get_customer
		@customer = Customer.all
		render json:{data:@customer,success:true}
	end

	def get_customer_info
		@customer_id = params[:customer_id]
		@customer = Customer.where id:@customer_id

		render json:{customer:@customer,success:true}
	
	end

	private
	    def permit_data
	        params.require(:data).permit(
	           		:national_id,
	           		:customer_name,
	           		:email,
	           		:address,
	           		:dob,
	           		:city,
	           		:phone,
	           		:mobile,
	           		:national_no,
	           		:passport_no,
	           		:description,
	           		:passport_url,
          			:national_id_url,

	        )
	    end
	     def permit_data_edit
	        params.require(:data).permit(
	           
	           		:id,
	           		:national_id,
	           		:customer_name,
	           		:email,
	           		:address,
	           		:dob,
	           		:city,
	           		:phone,
	           		:mobile,
	           		:national_no,
	           		:passport_no,
	           		:description,
	           		:passport_url,
          			:national_id_url,

	        )
	    end
end
