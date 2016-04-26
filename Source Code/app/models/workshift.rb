class Workshift < ActiveRecord::Base
	has_many :cashier,  foreign_key: "workshift_id"
end
