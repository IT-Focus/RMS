class CategoryMaster < ActiveRecord::Base
	has_many :room_master,  foreign_key: "category_id"
	has_many :category_price,  foreign_key: "category_id"

	accepts_nested_attributes_for :category_price, :allow_destroy => true
end
