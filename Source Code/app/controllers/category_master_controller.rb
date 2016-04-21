class CategoryMasterController < ApplicationController
	def index
		@@service = CategoryMasters::AdvanceSearch.new()
		search_by = params[:searchBy]
    	search_string = params[:searchString]
		data = @@service.advance_search search_by, search_string
		render json:{data:data, success:true}
	end

	def create
	end

	def update
	end

	def get_category
		data = CategoryMaster.all
		render json:{data:data, success:true}
	end
end
