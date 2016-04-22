class Floor < ActiveRecord::Base
	has_many :room_master,  foreign_key: "floor_id"
end
