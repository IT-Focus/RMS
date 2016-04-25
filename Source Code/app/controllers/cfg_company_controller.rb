class CfgCompanyController < ApplicationController
	def index
		data = CfgCompany.find(1)
		render json:{ data:data , success:true}
	end	

	def create
		data = CfgCompany.find(1)
		data.update_attributes(permit_data)
		render json:{ data:data , success:true }
	end
	def update
		data = CfgCompany.find(1)
		data.update_attributes(permit_data)
		if data.valid?
			render json:{data:data , success:true}	
		else
			render json:{error:data.errors , success:false}	

		end
	end
	private 
	def permit_data
		params.permit(		
		:legal_name,
		:legal_name_khmer,
		:company_name,
		:company_name_khmer,
		:tax_no,
		:phone,
		:mobile,
		:website,
		:address,
		:address_khmer,
		:logo_url,
		# :background_url,
		:account_no,
		:account_name,
		:bank_name,
		:vatin,
		:email,
		)
		
	end
end
