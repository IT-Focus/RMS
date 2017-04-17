class RoomTransaction < ActiveRecord::Base
enum status:{ 
		check_in: 20 , 
		check_out:21 , 
	}
end
