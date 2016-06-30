class Status < ActiveRecord::Base
	has_many :room_master,  foreign_key: "status_id"

	
end
