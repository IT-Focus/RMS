class Customer < ActiveRecord::Base
	
	belongs_to :nationality , foreign_key:"national_id"
   has_many :check_in, foreign_key:'customers_id'

	def self.advance_search search_by,search_string
		data = self.order(:customer_name).group(:customer_name)
		case search_by
   		when 'Customer Name'
   			if !search_string.nil?
   				text = '%' + search_string +'%'
   				data = data.where("customers.customer_name like '#{text}'")
   			end
   		when 'Phone'
   			if !search_string.nil?
   				text = '%' + search_string +'%'
   				data = data.where("customers.phone like '#{text}'")
   			end
   		when 'Passport'
   			if !search_string.nil?
   				text = '%' + search_string +'%'
   				data = data.where("customers.passport_no like '#{text}'")
   			end
   		when 'National No'
   			if !search_string.nil?
   				text = '%' + search_string +'%'
   				data = data.where("customers.national_no like '#{text}'")
   			end
		end

		@data = data.select("customers.*")
		return @data
	end
end
