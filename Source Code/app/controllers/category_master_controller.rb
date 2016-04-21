class CategoryMasterController < ApplicationController
	def index
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
