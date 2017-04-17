class Nationality < ActiveRecord::Base
	has_many :customer,  foreign_key: "national_id"
end
