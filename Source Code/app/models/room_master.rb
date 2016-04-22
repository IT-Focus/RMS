class RoomMaster < ActiveRecord::Base

	belongs_to :floor, foreign_key: "floor_id"
	belongs_to :category_master, foreign_key: "category_id"
	belongs_to :status	, foreign_key:"status_id"
	enum status:{ available: 1 , busy:2 , dirty:3 }

end
