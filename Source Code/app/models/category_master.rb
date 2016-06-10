class CategoryMaster < ActiveRecord::Base
	has_many :room_master,  foreign_key: "category_id"
	has_many :category_price,  foreign_key: "category_id"
end
