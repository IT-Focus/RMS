class RoomMaster < ActiveRecord::Base
	belongs_to :status	
	enum status:{ avaliable: 1 , busy:2 , dirty:3 }
end
