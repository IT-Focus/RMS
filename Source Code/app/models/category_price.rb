class CategoryPrice < ActiveRecord::Base
	self.table_name = "category_prices"
	 belongs_to :category_master , foreign_key:'category_id'
end
