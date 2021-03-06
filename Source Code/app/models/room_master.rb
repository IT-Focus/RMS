class RoomMaster < ActiveRecord::Base

	belongs_to :floor, foreign_key: "floor_id"
	belongs_to :category_master, foreign_key: "category_id"
	belongs_to :status	, foreign_key:"status_id"
	has_many :check_in_detail,  foreign_key: "room_no" , primary_key:"room_no"
	has_many :cancel_check_in, foreign_key:"room_no"
	enum status:{ available: 1 , busy:2 , dirty:3 }

	def self.check_room_no _room_no
		@roomMaster = self.where room_no:_room_no
		if @roomMaster.count > 0
			return true
		else
			return false
		end
	end

end
