class CfgCompanyController < ApplicationController
	def index
		data = CfgCompany.find(1)
		render json:{ data:data , success:true , message:'index'}
	end	

	def create
		data = CfgCompany.find(1)
		data.update_attributes(permit_data)
		data.save
		render json:{ data:data , success:true , message:'create'}
	end
	def update
		data = CfgCompany.find(1)
		data.update_attributes(permit_data)
		if data.valid?
			data.save
			render json:{data:data , success:true , message:'update'}	
		else
			render json:{error:data.errors , success:false}	

		end
	end
	private 
	def permit_data
		params.require(:data).permit(		
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
